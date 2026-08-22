const router = require("express").Router();
const ctrl = require("../controllers/reviewController");
const auth = require("../middlewares/auth");

router.get("/count", ctrl.getCount);
router.get("/:productId", ctrl.getForProduct);
router.post("/:productId", auth, ctrl.create);
router.delete("/:id", auth, ctrl.remove);

module.exports = router;