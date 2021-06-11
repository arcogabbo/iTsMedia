import {Router} from "express";
import * as audio_controller from "../controller/audio_controller";
const router=Router();

router.put("/audio", audio_controller.updateAudio);
export default router;
