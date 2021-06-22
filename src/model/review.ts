import * as db from "./db"

export async function insertReview(title: string, review:string, star:string){
	const q="INSERT INTO reviews (title,review,star) VALUES(?,?,?)"
	let result=await db.query(q,[title,review,star])
	return result
}

export async function getReviews(){
	const q="SELECT title,review,star, DATE_FORMAT(review_date, '%d-%m-%y') as review_date FROM reviews"
	let result=await db.query(q,[])
	return result
}