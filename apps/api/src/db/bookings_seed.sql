-- Insert Mock Bookings
INSERT INTO bookings (booking_reference, tour_id, customer_name, customer_email, customer_phone, travel_date, total_pax, base_price_total, grand_total, payment_status, created_at) VALUES 
('NSTR-9428', 1, 'Bima Santoso', 'bima@email.com', '081234567890', '2024-04-10', 2, 700000, 700000, 'paid', '2024-03-31 02:45:00'),
('NSTR-9429', 2, 'Sarah Miller', 'sarah@email.com', '081234567891', '2024-04-15', 1, 900000, 950000, 'pending', '2024-03-31 03:00:00'),
('NSTR-9430', 3, 'Andi Wijaya', 'andi@email.com', '081234567892', '2024-04-20', 4, 1600000, 2100000, 'paid', '2024-03-31 03:15:00');

-- Insert Mock Custom Trip Requests
INSERT INTO custom_trip_requests (request_reference, customer_name, customer_email, customer_phone, base_location_id, travel_date, duration_days, total_pax, status, created_at) VALUES 
('REQ-001', 'Jessica Love', 'jessica@email.com', '081234567893', 3, '2024-05-01', 3, 2, 'new', '2024-03-31 04:00:00');
