module.exports = {
  apps : [{
    name: "drinks",
    script: "./app/Server.js",
    watch: true,
    ignore_watch: ["./config/config.json"], // Don't reload on config file writing
    env: {
      NODE_ENV: "development",
    }
  }]
}