
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