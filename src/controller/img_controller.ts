import {Router} from "express";

function updateImg(req, res)
{
	console.log(req.body.X);
	res.status(200).send("ok");
}

export {updateImg}
