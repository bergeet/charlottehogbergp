
-- Create a table for storing portfolio images
CREATE TABLE public.portfolio_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  collection TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true);

-- Create storage policy for public read access
CREATE POLICY "Public read access for portfolio images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Create storage policy for authenticated upload
CREATE POLICY "Allow authenticated uploads to portfolio images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- Create storage policy for authenticated updates
CREATE POLICY "Allow authenticated updates to portfolio images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- Create storage policy for authenticated deletes
CREATE POLICY "Allow authenticated deletes from portfolio images"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');
