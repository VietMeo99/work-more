// ormconfig.js
require("dotenv/config");

module.exports = {
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "12345",
  database: process.env.DB_NAME || "telegram_alerts",
  port: process.env.DB_PORT || 3306,
  charset: "utf8",
  driver: "mysql",
  synchronize: false,
  entities:
    process.env.NODE_ENV !== "production"
      ? ["**/**.entity.ts"]
      : ["dist/**/*.entity.js"],
  logging: process.env.NODE_ENV !== "production" ? "all" : "error",
  migrations:
    process.env.NODE_ENV !== "production"
      ? ["src/migrations/*.ts"]
      : ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
  },
  connectTimeout: 30000,
  acquireTimeout: 30000,
};
