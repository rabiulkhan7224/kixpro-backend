const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres:password@localhost:5432/kixpro?sslmode=disable' });
(async () => {
  await client.connect();
  const res = await client.query("SELECT table_name, column_name FROM information_schema.columns WHERE table_schema='public' AND table_name IN ('products','collections') ORDER BY table_name, ordinal_position");
  console.log(res.rows.map(r => `${r.table_name}.${r.column_name}`).join('\n'));
  await client.end();
})();
