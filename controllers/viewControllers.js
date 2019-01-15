const UserController = require('./userControllers');

exports.welcome = async (ctx, next) => {

    const payload = {
        title: 'Welcome',
        user: 'John',
        serverName: "Akash's computer"
    };

    await ctx.render('welcome', payload);
};

exports.about = async (ctx, next) => {

    const payload = {
        companyName: "Irisind"
    };
    await ctx.render('about', payload);
};

exports.contact = async (ctx, next) => {

    const payload = {
        companyName: "Irisind"
    };
    await ctx.render('contact', payload);
};

exports.loginPage = async (ctx, next) => {
    await ctx.render('login', { errorMsg: '' });
};

exports.login = async (ctx, next) => {
    try {
        let email = ctx.request.body.email;
        let password = ctx.request.body.password;
        await UserController.login(email, password);
        ctx.redirect('/profile');
    } catch (errorMsg) {
        return await ctx.render('login', { errorMsg });
    };
}

exports.signupPage = async (ctx, next) => {
    await ctx.render('signup', { errorMsg: '' });
};

exports.signup = async (ctx, next, payload) => {
    try {
        let { firstName } = await UserController.signup(ctx);
        await ctx.render('welcome_new_user', { name: firstName });
    } catch (errorMsg) {
        await ctx.render('signup', { errorMsg });
    }
}

exports.profile = async (ctx, next) => {
    await ctx.render('profile', { ...ctx.session.user, errorMsg: "" });
}

exports.updateProfile = async (ctx, next) => {

    try {
        await UserController.update(ctx);
        await ctx.render('profile', { ...ctx.session.user });

    } catch (errorMsg) {
        await ctx.render('profile', { ...ctx.session.user, errorMsg });
    }

}