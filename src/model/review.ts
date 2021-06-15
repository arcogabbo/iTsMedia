import * as db from "./db"

export async function insertReview(title: string, review:string, star:string){
	let q="INSERT INTO reviews (title,review,star) VALUES(?,?,?)"
	let result=await db.query(q,[title,review,star])
	return result
}