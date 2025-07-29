-- Enable RLS on tables (if not already enabled)
ALTER TABLE public.portfolio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create public policies for portfolio_images table
CREATE POLICY "Allow public read access to portfolio images"
ON public.portfolio_images FOR SELECT
USING (true);

CREATE POLICY "Allow public insert to portfolio images"
ON public.portfolio_images FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public update to portfolio images"
ON public.portfolio_images FOR UPDATE
USING (true);

CREATE POLICY "Allow public delete from portfolio images"
ON public.portfolio_images FOR DELETE
USING (true);

-- Create public policies for contact_submissions table
CREATE POLICY "Allow public insert to contact submissions"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);

-- Only allow reading contact submissions for admin use
CREATE POLICY "Allow public read access to contact submissions"
ON public.contact_submissions FOR SELECT
USING (true);