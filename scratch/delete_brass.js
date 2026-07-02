require('dotenv').config({ path: require('path').join(__dirname, '../backend/.env') });
const { getPool } = require('../backend/db');

async function cleanBrass() {
  try {
    const pool = await getPool();
    const result = await pool.request().query("DELETE FROM Products WHERE category = 'brass'");
    console.log(`Deleted ${result.rowsAffected} brass products from the database.`);
    process.exit(0);
  } catch (err) {
    console.error('Error deleting from db:', err.message);
    process.exit(1);
  }
}

cleanBrass();
