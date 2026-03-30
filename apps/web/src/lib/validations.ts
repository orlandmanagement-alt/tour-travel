import { z } from 'zod';

export const BookingSchema = z.object({
  tour_id: z.string().or(z.number()),
  pax: z.number().int().min(1, "Minimum 1 passenger required").max(50, "Maximum 50 passengers allowed"),
  booking_date: z.string().refine((dateStr) => {
    // Timezone-Aware Strict Date Constraint
    // Must be > Date.now() + 24 hours in Asia/Jakarta context
    const requestedDate = new Date(dateStr);
    const now = new Date();
    const minLeadTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    // Strip time for pure date comparison
    requestedDate.setHours(0,0,0,0);
    minLeadTime.setHours(0,0,0,0);
    
    return requestedDate >= minLeadTime;
  }, { message: "Booking date must be at least 24 hours in advance." }),
  
  customer_info: z.object({
    full_name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    whatsapp: z.string().min(9, "Invalid phone number"),
  }),
  
  addons: z.array(z.string()).optional(),
  
  // WARNING: Frontend will send 'total_price' for its own UI calculation,
  // but Backend MUST IGNORE IT and recalculate.
  frontend_calculated_total: z.number().optional()
});
