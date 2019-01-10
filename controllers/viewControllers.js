
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

exports.login = async (ctx, next) => {
    await ctx.render('login', {errorMsg:''});
};


exports.signup = async (ctx, next) => {
    await ctx.render('signup',{errorMsg:''});
};

exports.signupWithError = async (ctx, next, payload) => {
    await ctx.render('signup', payload);
}

exports.profile = async (ctx, next) => {
    await ctx.render('profile', {...ctx.session.user, errorMsg: "" });
}