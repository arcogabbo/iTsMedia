import {app} from '../src/app'
import supertest from 'supertest'

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
		const result=await request.post('/file')
		expect(result.statusCode).toEqual(400)
	})

	it('File must be <= 8Mb',async()=>{
		const result=await request.post('/file').attach('toUpload',__dirname+'/images/landscape.jpg')
		//payload too large
		expect(result.statusCode).toEqual(413)
	})

	it('File test',async()=>{
		const result=await request.post('/file').attach('toUpload',__dirname+'/images/light.jpg')
		//payload OK
		expect(result.statusCode).toEqual(200)
	})
})

describe("PUT", () => {
	it('/img valid operations',async()=>{
		//put on /file without id or filename should return 400 status code
		const result=await request.put('/file')
		expect(result.statusCode).toEqual(400)
	})
})