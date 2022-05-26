const express = require("express");

const fetch = require("node-fetch");
const { pipeline } = require("node:stream");
const { promisify } = require("node:util");

const router = express.Router();

const streamPipeline = promisify(pipeline);

router.get("/code.jquery.com/*", async (req, res) => {
  const url =
    "https://code.jquery.com" +
    req.originalUrl.replace("/proxy/code.jquery.com", "");

  const resp = await fetch(url);

  if (!resp.ok) return res.status(500).send();

  await streamPipeline(resp.body, res);
});

router.get("/api.mapbox.com/*", async (req, res) => {
  const url =
    "https://api.mapbox.com" +
    req.originalUrl.replace("/proxy/api.mapbox.com", "");

  const resp = await fetch(url);

  if (!resp.ok) return res.status(500).send();

  await streamPipeline(resp.body, res);
});

module.exports = { router };
