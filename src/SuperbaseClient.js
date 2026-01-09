import { createClient } from "@supabase/supabase-js";
const superbaseUrl = import.meta.env.VITE_SUPABASE_URL;
const superbaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const supabase = createClient(superbaseUrl, superbaseKey);
export default supabase;