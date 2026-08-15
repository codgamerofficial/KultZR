const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://thkztuyvpbwwwkppofuf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoa3p0dXl2cGJ3d3drcHBvZnVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjgwNTIyNywiZXhwIjoyMTAyMzgxMjI3fQ.A_g9b-EXj5-CyM54PP9p4iZBeIq_DDFuhI9tOYLElF4';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
  console.log('Testing Supabase REST API connection to thkztuyvpbwwwkppofuf.supabase.co...');
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.log('Supabase connection successful! Table query result:', error.message);
    } else {
      console.log('Supabase connection successful! Products count:', data.length);
    }
  } catch (err) {
    console.error('Error connecting to Supabase:', err);
  }
}

testConnection();
