module.exports = onFail => async (ctx, next) => {
    if (ctx.session.user && ctx.session.user.email) return next();
    onFail();
}