-- Insert Locations
INSERT INTO master_locations (city_code, city_name, province) VALUES 
('MLG', 'Malang', 'Jawa Timur'),
('BWI', 'Banyuwangi', 'Jawa Timur'),
('BMO', 'Bromo', 'Jawa Timur');

-- Insert Categories
INSERT INTO master_categories (category_name, description) VALUES 
('Nature & Adventure', 'Outdoor activities and nature exploration'),
('Culture & History', 'Historical sites and cultural experiences'),
('Food & Culinary', 'Local food tours and culinary activities'),
('Family Fun', 'Family-friendly attractions and parks'),
('Photography', 'Scenic spots perfect for photography');

-- Insert Trip Types
INSERT INTO master_trip_types (type_name, description) VALUES 
('Open Trip', 'Join a scheduled group tour'),
('Private Trip', 'Exclusive tour for your own group'),
('Custom Trip', 'Tailor-made itinerary based on your preferences');

-- Insert Transport
INSERT INTO master_transport (transport_code, vehicle_type, max_capacity, base_city_id, price_per_day, include_driver, include_fuel, include_toll_park) VALUES 
('AVZ-MLG', 'Avanza/Xenia', 6, 1, 500000, 1, 1, 0),
('HIC-MLG', 'Hiace/Elf', 14, 1, 1200000, 1, 1, 0),
('AVZ-BWI', 'Avanza/Xenia', 6, 2, 550000, 1, 1, 0);

-- Insert Accommodations
INSERT INTO master_accommodations (accommodation_code, hotel_name, city_id, star_rating, room_type, price_per_night, capacity_per_room, include_breakfast) VALUES 
('HTL-MLG-1', 'Ijen Suites', 1, 4, 'Deluxe', 800000, 2, 1),
('HTL-BWI-1', 'Ketapang Indah', 2, 4, 'Standard', 650000, 2, 1);

-- Insert Tours
INSERT INTO tours (tour_code, tour_name, trip_type_id, category_id, base_location_id, duration_days, duration_nights, base_price, difficulty_level, is_active) VALUES 
('T-BMO-MID', 'Midnight Bromo Sunrise Tour', 1, 1, 3, 1, 0, 350000, 'Moderate', 1),
('T-BWI-IJEN', 'Ijen Blue Fire Trekking', 2, 1, 2, 2, 1, 750000, 'Hard', 1),
('T-MLG-CITY', 'Malang City Sightseeing', 2, 2, 1, 1, 0, 400000, 'Easy', 1),
('T-BMO-2D1N', 'Bromo 2 Days 1 Night Explorer', 1, 1, 3, 2, 1, 1200000, 'Moderate', 1);

-- Insert Tour Pricing Tiers (for Private Trips primarily)
INSERT INTO tour_pricing_tiers (tour_id, min_pax, max_pax, price_per_pax) VALUES 
(2, 2, 3, 900000),
(2, 4, 6, 750000),
(2, 7, 10, 650000),
(3, 2, 4, 500000),
(3, 5, 8, 400000);

-- Insert Itineraries
-- Bromo Midnight
INSERT INTO tour_itineraries (tour_id, day_number, start_time, end_time, activity_title, activity_description) VALUES 
(1, 1, '00:00', '03:00', 'Pickup & Travel to Bromo', 'Pickup from Malang/Surabaya and drive to Bromo transit area'),
(1, 1, '03:00', '06:00', 'Sunrise at Penanjakan', 'Take 4WD Jeep to Penanjakan viewpoint for sunrise'),
(1, 1, '06:00', '08:00', 'Bromo Crater', 'Trek or take a horse to the Bromo Crater'),
(1, 1, '08:00', '10:00', 'Whispering Sands & Teletubbies Hill', 'Explore the sea of sand and savanna'),
(1, 1, '10:00', '13:00', 'Return', 'Drive back to origin city');

-- Malang City
INSERT INTO tour_itineraries (tour_id, day_number, start_time, end_time, activity_title, activity_description) VALUES 
(3, 1, '08:00', '09:00', 'Pickup', 'Pickup from your hotel in Malang'),
(3, 1, '09:00', '11:00', 'Jodipan Colorful Village', 'Walking tour around the famous colorful village'),
(3, 1, '11:30', '13:00', 'Transport Museum', 'Visit Museum Angkut in Batu'),
(3, 1, '13:00', '14:00', 'Lunch', 'Local culinary experience'),
(3, 1, '14:30', '17:00', 'Apple Picking', 'Pick fresh apples straight from the orchard');

-- Insert Addons
INSERT INTO tour_addons (tour_id, addon_name, charge_type, price) VALUES 
(1, 'Horse Ride at Bromo', 'per_pax', 150000),
(2, 'Gas Mask Rental', 'per_pax', 50000),
(3, 'Professional Photographer', 'per_group', 500000);

-- Insert Surcharges (e.g. Eid Holiday)
INSERT INTO tour_surcharges (tour_id, start_date, end_date, surcharge_name, surcharge_type, surcharge_amount) VALUES 
(1, '2024-04-05', '2024-04-15', 'Eid Al-Fitr High Season', 'percentage', 20),
(4, '2024-12-20', '2024-12-31', 'Year End Holiday', 'per_pax', 200000);
