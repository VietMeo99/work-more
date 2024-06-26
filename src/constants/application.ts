const basePath = "/";

export default {
  url: {
    basePath,
  },
  timers: {
    userCookieExpiry: "720h",
  },
  env: {
    authSecret: process.env.TOKEN_SECRET_KEY || "token_key",
  },
  authorizationIgnorePath: ["/", "/auth/login", "/auth/register"],
  publicPath: "/public",
};
