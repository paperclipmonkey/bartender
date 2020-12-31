module.exports = {
  apps : [{
    name: "drinks",
    script: "./Server.js",
    watch: true,
    ignore_watch: ["./config.json"], // Don't reload on config we output
    env: {
      NODE_ENV: "development",
    }
  }]
}