const { Client } = require('pg');
const dotenv = require('dotenv');

// Load appropriate .env file based on environment
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });

async function checkConnection() {
  console.log('Testing Database Connection...');
  console.log(`URL: ${process.env.DATABASE_URL ? 'Configured' : 'Missing'}`);
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for NeonDB
  });

  try {
    await client.connect();
    const res = await client.query('SELECT NOW()');
    console.log('✅ Database connection successful:', res.rows[0].now);
    await client.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ Database connection failed:');
    console.error(err.message);
    process.exit(1); // Fail the build intentionally
  }
}

checkConnection();
