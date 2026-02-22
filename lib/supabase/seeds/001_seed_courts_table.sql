-- Insert test data
INSERT INTO courts (name, type, price_per_hour) VALUES
  ('Sân 1', 'Indoor', 100000),
  ('Sân 2', 'Outdoor', 80000),
  ('Sân 3', 'Indoor', 120000);

UPDATE courts SET pitch_size = 'Sân 5' WHERE name = 'Sân 1';
UPDATE courts SET pitch_size = 'Sân 5' WHERE name = 'Sân 3';
UPDATE courts SET pitch_size = 'Sân 7' WHERE name = 'Sân 2';
