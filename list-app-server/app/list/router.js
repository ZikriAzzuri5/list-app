const router = require("express").Router();
const auth = require("../../middleware/auth");
const listController = require("./controller");

router.get("/lists", auth, listController.index);

router.post("/lists", auth, listController.create);

router.put("/lists/:id", auth, listController.update);

router.delete("/lists/:id", auth, listController.destroy);

module.exports = router;
