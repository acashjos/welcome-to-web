
const Sequelize = require('sequelize');
module.exports = async (sequelize) => {
    const User = sequelize.define('user', {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        }
    });

    await User.sync();
    // Table created
    return User;
};