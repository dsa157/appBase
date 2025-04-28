
DROP TABLE IF EXISTS public.test_table;
CREATE TABLE public.test_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  user_email TEXT,
  test_data TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  test_count INTEGER DEFAULT 0
);

-- Enable Row Level Security if needed
ALTER TABLE public.test_table ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE VIEW public.test_table_with_users AS
SELECT 
  t.*,
  u.email AS user_email,
  u.created_at AS user_created_at
FROM public.test_table t
LEFT JOIN auth.users u ON t.user_id = u.id;