DROP TABLE IF EXISTS custom_trip_requests;
DROP TABLE IF EXISTS booking_addons;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS tour_surcharges;
DROP TABLE IF EXISTS tour_addons;
DROP TABLE IF EXISTS tour_itineraries;
DROP TABLE IF EXISTS tour_pricing_tiers;
DROP TABLE IF EXISTS tours;
DROP TABLE IF EXISTS master_accommodations;
DROP TABLE IF EXISTS master_destinations;
DROP TABLE IF EXISTS master_transport;
DROP TABLE IF EXISTS master_trip_types;
DROP TABLE IF EXISTS master_categories;
DROP TABLE IF EXISTS master_addons;
DROP TABLE IF EXISTS master_locations;

CREATE TABLE master_locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city_code TEXT NOT NULL UNIQUE,
  city_name TEXT NOT NULL,
  province TEXT NOT NULL
);

CREATE TABLE master_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_name TEXT NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE master_addons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  addon_name TEXT NOT NULL,
  location_id INTEGER REFERENCES master_locations(id) ON DELETE CASCADE,
  charge_type TEXT NOT NULL CHECK(charge_type IN ('per_pax', 'per_group')),
  default_price INTEGER NOT NULL
);

CREATE TABLE master_trip_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type_name TEXT NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE master_transport (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transport_code TEXT NOT NULL UNIQUE,
  vehicle_type TEXT NOT NULL,
  max_capacity INTEGER NOT NULL,
  base_city_id INTEGER REFERENCES master_locations(id),
  price_per_day INTEGER NOT NULL,
  include_driver BOOLEAN NOT NULL DEFAULT 1,
  include_fuel BOOLEAN NOT NULL DEFAULT 1,
  include_toll_park BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE master_destinations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destination_code TEXT NOT NULL UNIQUE,
  destination_name TEXT NOT NULL,
  city_id INTEGER REFERENCES master_locations(id),
  category_id INTEGER REFERENCES master_categories(id),
  price_wni INTEGER NOT NULL DEFAULT 0,
  price_wna INTEGER NOT NULL DEFAULT 0,
  est_duration_hours INTEGER NOT NULL,
  operational_hours TEXT
);

CREATE TABLE master_accommodations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  accommodation_code TEXT NOT NULL UNIQUE,
  hotel_name TEXT NOT NULL,
  city_id INTEGER REFERENCES master_locations(id),
  star_rating INTEGER NOT NULL,
  room_type TEXT NOT NULL,
  price_per_night INTEGER NOT NULL,
  capacity_per_room INTEGER NOT NULL,
  include_breakfast BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE tours (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tour_code TEXT NOT NULL UNIQUE,
  tour_name TEXT NOT NULL,
  trip_type_id INTEGER REFERENCES master_trip_types(id),
  category_id INTEGER REFERENCES master_categories(id),
  base_location_id INTEGER REFERENCES master_locations(id),
  duration_days INTEGER NOT NULL,
  duration_nights INTEGER NOT NULL,
  base_price INTEGER NOT NULL DEFAULT 0,
  difficulty_level TEXT,
  average_rating REAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tour_reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tour_id INTEGER REFERENCES tours(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tour_pricing_tiers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tour_id INTEGER REFERENCES tours(id) ON DELETE CASCADE,
  min_pax INTEGER NOT NULL,
  max_pax INTEGER NOT NULL,
  price_per_pax INTEGER NOT NULL
);

CREATE TABLE tour_itineraries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tour_id INTEGER REFERENCES tours(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  activity_title TEXT NOT NULL,
  activity_description TEXT
);

CREATE TABLE tour_addons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tour_id INTEGER REFERENCES tours(id) ON DELETE CASCADE,
  addon_name TEXT NOT NULL,
  charge_type TEXT NOT NULL CHECK(charge_type IN ('per_pax', 'per_group')),
  price INTEGER NOT NULL
);

CREATE TABLE tour_surcharges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tour_id INTEGER REFERENCES tours(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  surcharge_name TEXT NOT NULL,
  surcharge_type TEXT NOT NULL CHECK(surcharge_type IN ('per_pax', 'flat_fee', 'percentage')),
  surcharge_amount INTEGER NOT NULL
);

CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_reference TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  tour_id INTEGER REFERENCES tours(id),
  travel_date DATE NOT NULL,
  total_pax INTEGER NOT NULL,
  base_price_total INTEGER NOT NULL,
  addons_total INTEGER NOT NULL DEFAULT 0,
  surcharge_total INTEGER NOT NULL DEFAULT 0,
  grand_total INTEGER NOT NULL,
  payment_status TEXT NOT NULL CHECK(payment_status IN ('pending', 'paid', 'cancelled', 'refunded')),
  payment_method TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE booking_addons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
  tour_addon_id INTEGER REFERENCES tour_addons(id),
  quantity INTEGER NOT NULL,
  subtotal INTEGER NOT NULL
);

CREATE TABLE custom_trip_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_reference TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  base_location_id INTEGER REFERENCES master_locations(id),
  travel_date DATE NOT NULL,
  duration_days INTEGER NOT NULL,
  total_pax INTEGER NOT NULL,
  requested_destinations TEXT,
  accommodation_preference TEXT,
  status TEXT NOT NULL CHECK(status IN ('new', 'quoted', 'accepted', 'rejected')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  affiliate_code TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'user' CHECK(role IN ('user', 'agent', 'admin')),
  nusa_poin INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
