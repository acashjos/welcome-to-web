module.exports = async (ctx, next) => {
    if(ctx.session.user && ctx.session.user.email) return next();

    ctx.redirect('/login');
}