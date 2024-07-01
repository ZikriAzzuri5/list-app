const router = require("express").Router();
const listController = require("./controller");

router.get("/lists", listController.index);

router.post("/lists", listController.create);

router.put("/lists/:id", listController.update);

router.delete("/lists/:id", listController.destroy);

module.exports = router;
