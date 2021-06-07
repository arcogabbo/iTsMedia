import {Router}  from "express";
import * as img_controller from "../controller/img_controller";

const router=Router();

router.put("/img", img_controller.updateImg);
export default router;
