var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-GvoL4U/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// .wrangler/tmp/bundle-GvoL4U/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// src/utils/responseHelper.ts
var sendResponse = /* @__PURE__ */ __name((data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}, "sendResponse");
var sendError = /* @__PURE__ */ __name((message, status = 500) => {
  return sendResponse({ error: message }, status);
}, "sendError");

// src/controllers/MasterController.ts
var MasterController = class {
  static async handle(request, env, path) {
    try {
      if (path === "/api/master/locations") {
        const { results } = await env.DB.prepare("SELECT * FROM master_locations").all();
        return sendResponse(results);
      }
      if (path === "/api/master/categories") {
        const { results } = await env.DB.prepare("SELECT * FROM master_categories").all();
        return sendResponse(results);
      }
      if (path === "/api/master/trip-types") {
        const { results } = await env.DB.prepare("SELECT * FROM master_trip_types").all();
        return sendResponse(results);
      }
      return sendError("Master endpoint not found", 404);
    } catch (e) {
      return sendError(e.message);
    }
  }
};
__name(MasterController, "MasterController");

// src/controllers/TourController.ts
var TourController = class {
  static async getAllTours(env, url) {
    try {
      const location = url.searchParams.get("location");
      const category = url.searchParams.get("category");
      const type = url.searchParams.get("type");
      const difficulty = url.searchParams.get("difficulty");
      const minPrice = url.searchParams.get("minPrice");
      const maxPrice = url.searchParams.get("maxPrice");
      let query = `
        SELECT 
          t.*, 
          l.city_name as location_name,
          c.category_name,
          tr.type_name as trip_type
        FROM tours t
        LEFT JOIN master_locations l ON t.base_location_id = l.id
        LEFT JOIN master_categories c ON t.category_id = c.id
        LEFT JOIN master_trip_types tr ON t.trip_type_id = tr.id
        WHERE t.is_active = 1
      `;
      let params = [];
      if (location) {
        query += ` AND l.city_code = ?`;
        params.push(location);
      }
      if (category) {
        query += ` AND c.category_name = ?`;
        params.push(category);
      }
      if (type) {
        query += ` AND tr.type_name = ?`;
        params.push(type);
      }
      if (difficulty) {
        query += ` AND t.difficulty_level = ?`;
        params.push(difficulty);
      }
      if (minPrice) {
        query += ` AND t.base_price >= ?`;
        params.push(minPrice);
      }
      if (maxPrice) {
        query += ` AND t.base_price <= ?`;
        params.push(maxPrice);
      }
      query += ` ORDER BY t.created_at DESC`;
      const { results } = await env.DB.prepare(query).bind(...params).all();
      return sendResponse(results);
    } catch (e) {
      return sendError(e.message);
    }
  }
  static async getTourDetail(env, tourCodeOrId) {
    try {
      const tourQuery = await env.DB.prepare(`
        SELECT 
          t.*, 
          l.city_name as location_name,
          c.category_name,
          tr.type_name as trip_type
        FROM tours t
        LEFT JOIN master_locations l ON t.base_location_id = l.id
        LEFT JOIN master_categories c ON t.category_id = c.id
        LEFT JOIN master_trip_types tr ON t.trip_type_id = tr.id
        WHERE t.id = ? OR t.tour_code = ?
      `).bind(tourCodeOrId, tourCodeOrId).first();
      if (!tourQuery) {
        return sendError("Tour not found", 404);
      }
      const tourId = tourQuery.id;
      const { results: pricingTiers } = await env.DB.prepare(`
        SELECT * FROM tour_pricing_tiers WHERE tour_id = ? ORDER BY min_pax ASC
      `).bind(tourId).all();
      const { results: itineraries } = await env.DB.prepare(`
        SELECT * FROM tour_itineraries WHERE tour_id = ? ORDER BY day_number ASC, start_time ASC
      `).bind(tourId).all();
      const { results: addons } = await env.DB.prepare(`
        SELECT * FROM tour_addons WHERE tour_id = ?
      `).bind(tourId).all();
      const { results: surcharges } = await env.DB.prepare(`
        SELECT * FROM tour_surcharges WHERE tour_id = ? AND end_date >= date('now')
      `).bind(tourId).all();
      const payload = {
        ...tourQuery,
        pricing_tiers: pricingTiers,
        itineraries,
        addons,
        surcharges
      };
      return sendResponse(payload);
    } catch (e) {
      return sendError(e.message);
    }
  }
};
__name(TourController, "TourController");

// src/controllers/BookingController.ts
var BookingController = class {
  static async createBooking(request, env) {
    try {
      const data = await request.json();
      const {
        customer_name,
        customer_email,
        customer_phone,
        tour_id,
        travel_date,
        total_pax,
        addons
        // array of { id: number, quantity: number }
      } = data;
      if (!customer_name || !customer_email || !tour_id || !travel_date || !total_pax) {
        return sendError("Missing required fields", 400);
      }
      const timestamp = (/* @__PURE__ */ new Date()).getTime();
      const bookingCode = `NSTR-${timestamp.toString().substring(5, 13)}-${Math.floor(Math.random() * 1e3)}`;
      const tourQuery = await env.DB.prepare(`SELECT * FROM tours WHERE id = ?`).bind(tour_id).first();
      if (!tourQuery) {
        return sendError("Tour not found", 404);
      }
      let basePriceCalculation = 0;
      if (tourQuery.trip_type_id === 2) {
        const tierQuery = await env.DB.prepare(`
          SELECT price_per_pax FROM tour_pricing_tiers 
          WHERE tour_id = ? AND min_pax <= ? AND max_pax >= ?
        `).bind(tour_id, total_pax, total_pax).first();
        if (tierQuery) {
          basePriceCalculation = tierQuery.price_per_pax * total_pax;
        } else {
          basePriceCalculation = tourQuery.base_price * total_pax;
        }
      } else {
        basePriceCalculation = tourQuery.base_price * total_pax;
      }
      let addonsTotal = 0;
      let addonRecords = [];
      if (addons && Array.isArray(addons)) {
        for (const addonReq of addons) {
          const addonDb = await env.DB.prepare(`SELECT * FROM tour_addons WHERE id = ? AND tour_id = ?`).bind(addonReq.id, tour_id).first();
          if (addonDb) {
            let subtotal = 0;
            if (addonDb.charge_type === "per_pax") {
              subtotal = addonDb.price * addonReq.quantity;
            } else {
              subtotal = addonDb.price * addonReq.quantity;
            }
            addonsTotal += subtotal;
            addonRecords.push({
              addon_id: addonDb.id,
              quantity: addonReq.quantity,
              subtotal
            });
          }
        }
      }
      let surchargeTotal = 0;
      const surchargesDb = await env.DB.prepare(`
        SELECT * FROM tour_surcharges 
        WHERE tour_id = ? AND start_date <= ? AND end_date >= ?
      `).bind(tour_id, travel_date, travel_date).all();
      if (surchargesDb.results) {
        for (const surcharge of surchargesDb.results) {
          if (surcharge.surcharge_type === "flat_fee") {
            surchargeTotal += surcharge.surcharge_amount;
          } else if (surcharge.surcharge_type === "per_pax") {
            surchargeTotal += surcharge.surcharge_amount * total_pax;
          } else if (surcharge.surcharge_type === "percentage") {
            surchargeTotal += basePriceCalculation * surcharge.surcharge_amount / 100;
          }
        }
      }
      const grandTotal = basePriceCalculation + addonsTotal + surchargeTotal;
      const insertBooking = await env.DB.prepare(`
        INSERT INTO bookings (
          booking_reference, customer_name, customer_email, customer_phone, 
          tour_id, travel_date, total_pax, base_price_total, addons_total, 
          surcharge_total, grand_total, payment_status, payment_method
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'bank_transfer')
      `).bind(
        bookingCode,
        customer_name,
        customer_email,
        customer_phone,
        tour_id,
        travel_date,
        total_pax,
        basePriceCalculation,
        addonsTotal,
        surchargeTotal,
        grandTotal
      ).run();
      const newBookingIdStr = insertBooking.meta.last_row_id;
      if (addonRecords.length > 0) {
        const statements = addonRecords.map((record) => {
          return env.DB.prepare(`
            INSERT INTO booking_addons (booking_id, tour_addon_id, quantity, subtotal)
            VALUES (?, ?, ?, ?)
          `).bind(newBookingIdStr, record.addon_id, record.quantity, record.subtotal);
        });
        await env.DB.batch(statements);
      }
      return sendResponse({
        booking_reference: bookingCode,
        grand_total: grandTotal,
        status: "pending"
      }, 201);
    } catch (e) {
      return sendError(e.message);
    }
  }
  static async getBookingStatus(env, reference) {
    try {
      const booking = await env.DB.prepare(`
        SELECT b.*, t.tour_name
        FROM bookings b
        JOIN tours t ON b.tour_id = t.id
        WHERE b.booking_reference = ?
      `).bind(reference).first();
      if (!booking) {
        return sendError("Booking not found", 404);
      }
      const { results: addons } = await env.DB.prepare(`
        SELECT ba.*, ta.addon_name
        FROM booking_addons ba
        JOIN tour_addons ta ON ba.tour_addon_id = ta.id
        WHERE ba.booking_id = ?
      `).bind(booking.id).all();
      return sendResponse({ ...booking, mapped_addons: addons });
    } catch (e) {
      return sendError(e.message);
    }
  }
  static async updatePaymentStatus(request, env, reference) {
    try {
      const { status } = await request.json();
      if (!["pending", "paid", "cancelled", "refunded"].includes(status)) {
        return sendError("Invalid status", 400);
      }
      await env.DB.prepare(`
        UPDATE bookings SET payment_status = ? WHERE booking_reference = ?
      `).bind(status, reference).run();
      return sendResponse({ message: "Status updated successfully" });
    } catch (e) {
      return sendError(e.message);
    }
  }
};
__name(BookingController, "BookingController");

// src/controllers/CustomTripController.ts
var CustomTripController = class {
  static async sumbitRequest(request, env) {
    try {
      const data = await request.json();
      const {
        customer_name,
        customer_email,
        customer_phone,
        base_location_id,
        travel_date,
        duration_days,
        total_pax,
        requested_destinations,
        accommodation_preference
      } = data;
      if (!customer_name || !customer_email || !travel_date || !total_pax) {
        return sendError("Missing required fields", 400);
      }
      const timestamp = (/* @__PURE__ */ new Date()).getTime();
      const requestCode = `REQ-${timestamp.toString().substring(5, 13)}-${Math.floor(Math.random() * 1e3)}`;
      await env.DB.prepare(`
        INSERT INTO custom_trip_requests (
          request_reference, customer_name, customer_email, customer_phone,
          base_location_id, travel_date, duration_days, total_pax,
          requested_destinations, accommodation_preference, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
      `).bind(
        requestCode,
        customer_name,
        customer_email,
        customer_phone,
        base_location_id,
        travel_date,
        duration_days,
        total_pax,
        requested_destinations,
        accommodation_preference
      ).run();
      return sendResponse({
        reference: requestCode,
        status: "new"
      }, 201);
    } catch (e) {
      return sendError(e.message);
    }
  }
  static async listRequests(env) {
    try {
      const { results } = await env.DB.prepare(`
        SELECT r.*, l.city_name
        FROM custom_trip_requests r
        LEFT JOIN master_locations l ON r.base_location_id = l.id
        ORDER BY r.created_at DESC
      `).all();
      return sendResponse(results);
    } catch (e) {
      return sendError(e.message);
    }
  }
  static async sendQuote(request, env, reference) {
    try {
      await env.DB.prepare(`
        UPDATE custom_trip_requests SET status = 'quoted' WHERE request_reference = ?
      `).bind(reference).run();
      return sendResponse({ success: true, message: "Quote generated and sent" });
    } catch (e) {
      return sendError(e.message);
    }
  }
};
__name(CustomTripController, "CustomTripController");

// src/controllers/AdminController.ts
var AdminController = class {
  static async getDashboardMetrics(env) {
    try {
      const { results: revenueResults } = await env.DB.prepare(`
        SELECT SUM(grand_total) as total_revenue
        FROM bookings
        WHERE payment_status = 'paid'
      `).all();
      const totalRevenue = revenueResults[0]?.total_revenue || 0;
      const { results: pendingResults } = await env.DB.prepare(`
        SELECT COUNT(id) as pending_orders
        FROM bookings
        WHERE payment_status = 'pending'
      `).all();
      const pendingOrders = pendingResults[0]?.pending_orders || 0;
      const { results: customTripResults } = await env.DB.prepare(`
        SELECT COUNT(id) as new_custom_requests
        FROM custom_trip_requests
        WHERE status = 'new'
      `).all();
      const newCustomRequests = customTripResults[0]?.new_custom_requests || 0;
      return sendResponse({
        total_revenue: totalRevenue,
        pending_orders: pendingOrders,
        new_custom_requests: newCustomRequests
      });
    } catch (e) {
      return sendError(e.message);
    }
  }
};
__name(AdminController, "AdminController");

// src/index.ts
var src_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    if (method === "OPTIONS") {
      return sendResponse({}, 200);
    }
    try {
      if (path.startsWith("/api/master")) {
        return await MasterController.handle(request, env, path);
      }
      if (path === "/api/tours" && method === "GET") {
        return await TourController.getAllTours(env, url);
      }
      const tourIdMatch = path.match(/^\/api\/tours\/([a-zA-Z0-9_-]+)$/);
      if (tourIdMatch && method === "GET") {
        return await TourController.getTourDetail(env, tourIdMatch[1]);
      }
      if (path === "/api/bookings" && method === "POST") {
        return await BookingController.createBooking(request, env);
      }
      const bookingRefMatch = path.match(/^\/api\/bookings\/([a-zA-Z0-9_-]+)$/);
      if (bookingRefMatch && method === "GET") {
        return await BookingController.getBookingStatus(env, bookingRefMatch[1]);
      }
      const bookingStatusMatch = path.match(/^\/api\/bookings\/([a-zA-Z0-9_-]+)\/status$/);
      if (bookingStatusMatch && method === "PUT") {
        return await BookingController.updatePaymentStatus(request, env, bookingStatusMatch[1]);
      }
      if (path === "/api/custom-trips" && method === "POST") {
        return await CustomTripController.sumbitRequest(request, env);
      }
      if (path === "/api/custom-trips" && method === "GET") {
        return await CustomTripController.listRequests(env);
      }
      const customTripQuoteMatch = path.match(/^\/api\/custom-trips\/([a-zA-Z0-9_-]+)\/quote$/);
      if (customTripQuoteMatch && method === "PUT") {
        return await CustomTripController.sendQuote(request, env, customTripQuoteMatch[1]);
      }
      if (path === "/api/admin/metrics" && method === "GET") {
        return await AdminController.getDashboardMetrics(env);
      }
      return sendError("Not Found", 404);
    } catch (e) {
      console.error(e);
      return sendError("Internal Server Error: " + e.message, 500);
    }
  }
};

// ../../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-GvoL4U/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-GvoL4U/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
