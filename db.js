// Initlializing connection string
var dbConfig = {
    user: "sa",
    password: "test1234",
    server: "localhost",
    database: "sms",
    port: process.env.PORT || 1433
};

module.exports = dbConfig;