const Sequelize = require('sequelize');

const sequelize = new Sequelize('tutorial' /*database*/, 'irisind' /*username*/, 'qwertyui' /*password*/, {
    host: 'localhost', // mysql server hostname (or ip)
    dialect: 'mysql', // specifies that we are using mysql
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

});



const Models = {};
exports.Models = Models

exports.init = async () => {
    
    // include all model definitions in here
    Models.User = await require('./user')(sequelize);

}
exports.getSequelize = () => sequelize;
