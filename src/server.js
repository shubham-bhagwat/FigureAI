const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());

// Oracle Database Configuration
const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  connectString: 'your_connection_string',
};

// Endpoint to fetch KPI details from Oracle
app.post('/api/kpiDetails', async (req, res) => {
  const { kpiTitle } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM your_table WHERE kpiTitle = :kpiTitle`,
      [kpiTitle]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error executing Oracle query:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
