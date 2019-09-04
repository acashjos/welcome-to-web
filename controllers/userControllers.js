
const Models = require('../models').Models;
const Utils = require('../utils.js');

exports.login = async (ctx) => {

    let email = ctx.request.body.email;
    let password = ctx.request.body.password;
    let user = await Models.User.findOne({ where: { email } });
    if (user) {
        let password_match = await Utils.comparePassword(password, user.password);
        if (password_match) {
            ctx.session.user = JSON.parse(JSON.stringify(user));
            return true;
        } else throw "Email or password doesn't match"
        //return await ctx.render('login', { errorMsg: "Email or password doesn't match" });

    }


}


exports.signup = async (ctx) => {

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
    // await ctx.render('signup', { errorMsg: 'User with that email id already exists' });

    else return user;
}

exports.signout = async (ctx, next) => {
    delete ctx.session.user;
    return;
}

exports.update = async (ctx, next) => {


    let user = await Models.User.findOne({ where: { email: ctx.session.user.email } });
    console.log('ctx.request.body,', ctx.request.body)

    // validation
    user.firstName = ctx.request.body.firstName || user.firstName;
    user.lastName = ctx.request.body.lastName || user.lastName;
    user.email = ctx.request.body.email || user.email;
    let password = ctx.request.body.password;
    let oldpassword = ctx.request.body.oldpassword;

    if (password && oldpassword && ctx.request.body.repassword == password) {
        let password_match = await Utils.comparePassword(oldpassword, ctx.session.user.password);

        if (password_match)
            user.password = await Utils.hashPassword(password);
    }

    try {

        await user.save();
        // update in session
        ctx.session.user = JSON.parse(JSON.stringify(user));

    } catch (e) {
        console.log(e);
        throw "Something went wrong. Please check the values you submitted"
    }
    return true;
}