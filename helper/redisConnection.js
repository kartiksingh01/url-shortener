const redis = require("redis");
const redisClient = redis.createClient();
const redisConnection = async () => {
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  let redisConnected = await redisClient.connect();
  if (redisConnected) {
    console.log("Redis Connected");
  } else {
    console.log("Failed to connect Redis");
  }
};
module.exports = { redisConnection, redisClient };