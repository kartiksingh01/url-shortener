const { redisClient } = require("../helper/redisConnection");
const URL = require("../models/URL");
const createRandomURL = require("../helper/createRandomURL");
const createShortURL = async (req, res) => {
  const { long_url } = await req.body;
  //find the url in redis
  let shortUrl = await redisClient.get(long_url);
  if (shortUrl) {
    return res.status(201).json({ message: shortUrl });
  }
  //find url in mongodb
  shortUrl = await URL.findOne({ long_url });
  if (shortUrl) {
    return res.status(201).json({ message: shortUrl });
  }
  let newShortURL = await createRandomURL();
  try {
    let shortUrlCreated = await new URL({
      short_url: newShortURL,
      long_url,
    }).save();
    if (!shortUrlCreated) {
      return res
        .status(500)
        .json({ message: "Short URL cannot be created please try again!" });
    }
    return res.status(201).json({ message: newShortURL });
  } catch (error) {
    console.error(error);
  }
};
const getLongUrl = async (req, res) => {
  let { short_url } = await req.params;
  let longURL = await redisClient.get(`${short_url}`);
  if (longURL) {
    res.json({ message: longURL });
    await URL.findOneAndUpdate({ short_url }, { $inc: { redirects: 1 } });
  } else {
    longURL = await URL.findOne({ short_url });
    if (!longURL) {
      return res.json({ message: "Short URL not found" });
    }
    res.json({ message: longURL.long_url });
    await redisClient.set(short_url, longURL.long_url, "NX", "EX", 3600 * 3);
    await URL.findOneAndUpdate({ short_url }, { $inc: { redirects: 1 } });
  }
};
module.exports = { createShortURL, getLongUrl };
