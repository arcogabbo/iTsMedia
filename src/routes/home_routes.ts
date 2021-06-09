import { Router } from 'express';
import * as mainController from "../controller/main_controller";
const router=Router()

//rendering to the home page
router.get("/", mainController.home);
//rendering to the page where the user can modify the image
router.post("/file", mainController.modifyPage);

router.get("/download/:filename", mainController.downloadFile);
export default router;
