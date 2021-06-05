import { Router } from 'express';
const router=Router()

router.get("/",(req,res)=>{
	console.log("visitato")
	res.send("ciao")
})

export default router