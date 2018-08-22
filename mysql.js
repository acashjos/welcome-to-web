
const mysql = require('mysql');
// const mysqlConfig = 'mysql://irisind:qwertyui@localhost:3306/tutorial';
const mysqlConfig = {
    host: 'localhost',
    user: 'irisind',
    password: 'qwertyui',
    database: 'tutorial'
};
const connection = mysql.createConnection(mysqlConfig);

exports.connection = connection;

// exports.quickQuery = function (query) {
//     return new Promise((resolve, reject) => {
//         connection.connect();

//         connection.query(query, function (error, results, fields) {
//             if (error) return reject(error);

//             connection.end();
//             resolve(results);
//         });

//     });
// }