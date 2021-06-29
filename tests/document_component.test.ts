import {Document} from "../src/model/document"

describe("Audio extensions",()=>{
	it("DOCX",()=>{
		let doc=new Document("../../tests/documents/","sample","docx")

		expect(doc.getExt()!=undefined)
	})

	it("MD",()=>{
		let doc=new Document("../../tests/documents/","sample","md")

		expect(doc.getExt()!=undefined)
	})

	it("HTML",()=>{
		let doc=new Document("../../tests/documents/","sample","html")

		expect(doc.getExt()!=undefined)
	})

	it("GFM",()=>{
		let doc=new Document("../../tests/documents/","sample","gfm")

		expect(doc.getExt()!=undefined)
	})

	it("JSON",()=>{
		let doc=new Document("../../tests/documents/","sample","json")

		expect(doc.getExt()!=undefined)
	})

	it("ODT NOT SUPPORTED",()=>{
		let doc=new Document("../../tests/documents/","sample","odt")

		expect(doc.getExt()==undefined)
	})
})