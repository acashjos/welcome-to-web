
const Models = require('../models').Models;
// const Views = require('./viewControllers');
const Utils = require('../utils.js');

exports.login = async (email, password) => {


    let user = await Models.User.findOne({ where: { email } });
    if (user) {
        let password_match = await Utils.comparePassword(password, user.password);
        if (password_match) {
            ctx.session.user = JSON.parse(JSON.stringify(user));

            console.log('loggedin');
        } else throw "Email or password doesn't match";

    }


}


exports.signup = async (ctx, next) => {

    // validation
    let firstName = ctx.request.body.firstName;
    let lastName = ctx.request.body.lastName;
    let email = ctx.request.body.email;
    let password = ctx.request.body.password;

    if (ctx.request.body.repassword != password)
        throw "Password didn't match";

    // need a detailed lecture on Promises?
    let hashedPass = await Utils.hashPassword(password);

    console.log('Models', Models)
    let [user, created] = await Models.User.findOrCreate({
        where: { email },
        defaults: {
            firstName,
            lastName,
            email,
            password: hashedPass,
        }
    });

    if (created === false)
        throw 'User with that email id already exists';
    else return user;

}

exports.signout = async (ctx, next) => {
    delete ctx.session.user;
}

exports.update = async (ctx, next) => {


    let user = await Models.User.findOne({ where: { email: ctx.session.user.email } });


    // validation
    user.firstName = ctx.request.body.firstName;
    user.lastName = ctx.request.body.lastName;
    user.email = ctx.request.body.email;
    let password = ctx.request.body.password;
    let oldpassword = ctx.request.body.oldpassword;

    if (password && oldpassword && ctx.request.body.repassword == password) {
        let password_match = await Utils.comparePassword(oldpassword, ctx.session.user.password);

        if (password_match)
            user.password = await Utils.hashPassword(password);
    }

    let errorMsg = '';
    try {

        await user.save();
        // update in session
        ctx.session.user = JSON.parse(JSON.stringify(user));

    } catch (e) {
        throw "Something went wrong. Please check the values you submitted"
    }
}