import { createClient } from '@supabase/supabase-js';

// TODO: 아래 정보를 본인의 Supabase 프로젝트 설정에서 복사해서 붙여넣으세요.
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);