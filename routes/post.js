const { description } = require("@hapi/joi/lib/types/alternatives");
const { route } = require("./auth");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    posts: {
      title: "My first post",
      description: "Unauthorized data",
    },
  });
});

module.exports = router;
