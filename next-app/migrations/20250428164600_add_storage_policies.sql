-- Enable storage management for authenticated users
DROP POLICY IF EXISTS "Allow authenticated bucket creation" ON storage.buckets;
CREATE POLICY "Allow authenticated bucket creation" 
ON storage.buckets 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated bucket access" ON storage.buckets;
CREATE POLICY "Allow authenticated bucket access" 
ON storage.buckets 
FOR SELECT 
TO authenticated 
USING (true);

-- Enable CRUD operations on test_table for authenticated users
DROP POLICY IF EXISTS "Allow test_table access" ON public.test_table;
CREATE POLICY "Allow test_table access" 
ON public.test_table 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
