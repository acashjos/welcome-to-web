
const UserController = require('./userControllers');
exports.login = async (ctx, next) => {
    try {

        await UserController.login(ctx);
        ctx.status = 201;
        ctx.body = '';

    } catch (errorMsg) {
        ctx.status = 401;
        ctx.body = { errorMsg };
    };
}

exports.signup = async (ctx, next) => {
    try {
        await UserController.signup(ctx);
        ctx.status = 201;
        ctx.body = '';

    } catch (errorMsg) {
        ctx.status = 401;
        ctx.body = { errorMsg };
    };
}

exports.profile = async (ctx, next) => {

    ctx.status = ctx.session.user ? 200 : 404;
    ctx.body = ctx.session.user || '';
}

exports.updateProfile = async (ctx, next) => {
    try {
        await UserController.update(ctx);
        ctx.status = 201;
        ctx.body = '';

    } catch (errorMsg) {
        ctx.status = 401;
        ctx.body = { errorMsg };
    }

}

exports.signout = async (ctx, next) => {
    await UserController.signout(ctx);
    ctx.status = 201;
    ctx.body = '';
}

exports.unknownEndpoint = async (ctx) => {
    ctx.status = 404;
    ctx.body = "Method not defined";
}