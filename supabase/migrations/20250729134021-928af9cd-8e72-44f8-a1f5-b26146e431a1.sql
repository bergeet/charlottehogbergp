-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow authenticated uploads to portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates to portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes from portfolio images" ON storage.objects;

-- Create public policies for portfolio images management
CREATE POLICY "Allow public uploads to portfolio images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Allow public updates to portfolio images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Allow public deletes from portfolio images"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio-images');