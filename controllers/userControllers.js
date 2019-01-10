
const Models = require('../models').Models;
const Views = require('./viewControllers');
const Utils = require('../utils.js');

exports.login = async (ctx, next) => {


    let email = ctx.request.body.email;
    let password = ctx.request.body.password;

    let user = await Models.User.findOne({ where: { email } });
    if (user) {
        let password_match = await Utils.comparePassword(password, user.password);
        if (password_match) {
            ctx.session.user = JSON.parse(JSON.stringify(user));
            ctx.redirect('/profile');
            console.log('loggedin');
        } else return await ctx.render('login', { errorMsg: "Email or password doesn't match" });

    }


}


exports.signup = async (ctx, next) => {

    // validation
    let firstName = ctx.request.body.firstName;
    let lastName = ctx.request.body.lastName;
    let email = ctx.request.body.email;
    let password = ctx.request.body.password;

    if (ctx.request.body.repassword != password)
        return await Views.signupWithError(ctx, next, { errorMsg: "Password didn't match" });

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
        await ctx.render('signup', { errorMsg: 'User with that email id already exists' });
    else await ctx.render('welcome_new_user', { name: firstName });
    console.log(ctx.request.body);
}

exports.signout = async (ctx, next) => {
    delete ctx.session.user;
    return ctx.redirect('/login');
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
        errorMsg = "Something went wrong. Please check the values you submitted"
    }
    await ctx.render('profile', { ...ctx.session.user, errorMsg });
}