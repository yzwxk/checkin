const mysql = require('mysql2/promise');

const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'daily_checkin',
};

// function getTodayDateString() {
//     return moment().format('YYYY-MM-DD');
// }

async function query(sql, params = []) {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute(sql, params);
    connection.end();
    return results;
}

module.exports = { query };