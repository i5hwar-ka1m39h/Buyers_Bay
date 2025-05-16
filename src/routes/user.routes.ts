import { Router } from "express";
import userController from "../controllers/user.controller";
import { verifyJWT } from "../middleware/verifyJwt.middleware";

const router = Router()


router.route("/register").post(userController.registerUser)

router.route("/login").post(userController.loginUser);


router.route("/refresh").post(verifyJWT, userController.resetToken);


router.route("/logout").post(verifyJWT, userController.logOut)


export default router;