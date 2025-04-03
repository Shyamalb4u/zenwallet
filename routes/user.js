const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/getUser/:id", userController.getUser);
router.get("/getMail/:mail", userController.getMail);
router.get("/getPhrases/:phrases", userController.getPhrases);
router.get("/getDirect/:uid", userController.getDirect);
router.get(
  "/pending_activation/:publicKey",
  userController.getPendingActivation
);
router.get("/getDirectSummery/:uid", userController.getDirectSummery);
router.get("/getAccountSummery/:phrases", userController.getAccountSummery);
router.get("/getMyPackages/:phrases", userController.getMyPackages);
router.get("/getMyTransactions/:phrases", userController.getMyTransactions);
router.get("/checkWithdraw/:phrases", userController.getWithdrawCheck);
router.get("/getWithdraw/:phrases", userController.getWithdraw);
router.get("/getall", userController.getall);
router.get("/pendingWithdrawal", userController.getPendingWithdraw);
router.get("/login/:mail/:pass", userController.getLogin);

router.post("/signup", userController.signup);
router.post("/booking", userController.booking);
router.post("/booking_wallet", userController.booking_wallet);
router.post("/transfer", userController.insertTransaction);
router.post("/editTransaction", userController.editTransaction);
router.post("/withdrawal", userController.withdrawal);
router.post("/patWithdrawal", userController.payWithdrawal);
router.post("/updateUser", userController.updateUser);

module.exports = router;
