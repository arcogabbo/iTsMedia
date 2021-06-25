import {DbItem} from "./db"

export class DbReview extends DbItem{

	async insertReview(title: string, review:string, star:string){
		const q="INSERT INTO reviews (title,review,star) VALUES(?,?,?)"
		let result=await this.query(q,[title,review,star])
		return result
	}

	async getReviews(){
		const q="SELECT title,review,star, DATE_FORMAT(review_date, '%d-%m-%y') as review_date FROM reviews"
		let result=await this.query(q,[])
		return result
	}
}