import {app} from '../src/app'
import supertest from 'supertest'
import {query} from "../src/model/db"

const request=supertest(app)

describe("GET", () => {
	it("Home test", async () => {
	const result = await request.get("/");
	expect(result.statusCode).toEqual(200);
	})

	it("Generic download should be 404",async ()=>{
		const result=await request.get('/download')
		expect(result.statusCode).toEqual(404)
	})

	it("Filename too short",async()=>{
		const result=await request.get('/download/x')
		expect(result.statusCode).toEqual(404)
	})
})

describe("POST", () => {
	it('File url without uploading should not be possible',async()=>{
		let result=await request.post('/file')
		expect(result.statusCode).toEqual(400)

		result=await request.post('/clifile')
		expect(result.statusCode).toEqual(400)
	})

	it('File must be <= 8Mb',async()=>{
		let result=await request.post('/file').attach('toUpload',__dirname+'/images/landscape.jpg')
		//payload too large
		expect(result.statusCode).toEqual(413)

		result=await request.post('/clifile').attach('toUpload',__dirname+'/images/landscape.jpg')
		//payload too large
		expect(result.statusCode).toEqual(413)
	})

	it('File test',async()=>{
		let result=await request.post('/file').attach('toUpload',__dirname+'/images/light.jpg')
		//payload OK
		expect(result.statusCode).toEqual(200)

		result=await request.post('/clifile').attach('toUpload',__dirname+'/images/light.jpg')
		//payload OK
		expect(result.statusCode).toEqual(200)
	})

	it('Extension unsupported',async()=>{
		let result=await request.post('/file').attach('toUpload',__dirname+'/images/anim.gif')
		expect(result.statusCode).toEqual(400)

		result=await request.post('/clifile').attach('toUpload',__dirname+'/images/anim.gif')
		expect(result.statusCode).toEqual(400)
	})
	it('Feedback parameters', async()=>{
		let result = await request.post("/feedback");
		expect(result.statusCode).toEqual(400);

		result = await request.post("/feedback").type("form").send({title: "test title", content: "test content"});
		expect(result.statusCode).toEqual(200);
		
		//stars should be <6 && >0
		result = await request.post("/feedback").type("form").send({star: 7, title: "test title", content: "test content"});
		expect(result.statusCode).toEqual(400);
	})
})

describe("PUT", () => {
	it('/img valid operations',async()=>{
		//put on /file without id or filename should return 400 status code
		const result=await request.put('/file')
		expect(result.statusCode).toEqual(400)
	})

	it('No actions on img test',async()=>{
		let result=await request.post('/file').attach('toUpload',__dirname+'/images/light.jpg')
		//payload OK
		expect(result.statusCode).toEqual(200)

		//if a filename is passed but no actions are provided the original image is returned
		result=await request.put("/file").type("form").send({fileName: "8088a60c5aa3a645eecde964eb14d306.jpg"})
		expect(result.statusCode).toEqual(200)
	})
})

describe("DATABASE", ()=>{
	it("Query test", async()=>{
		let q = "select * from reviews";
		let result = await query(q, []);
		expect(result).toBeDefined();
	})
})
