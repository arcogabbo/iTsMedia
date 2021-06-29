import {Image, parse} from "../src/model/image"

describe("Extensions",()=>{
	it("JPG",()=>{
		let img=new Image("../../tests/images/","light","jpg")

		expect(img.getExt()!=undefined)
	})

	it("JPEG",()=>{
		let img=new Image("../../tests/images/","light","jpeg")

		expect(img.getExt()!=undefined)
	})

	it("PNG",()=>{
		let img=new Image("../../tests/images/","dog","png")

		expect(img.getExt()!=undefined)
	})

	it("GIF NOT SUPPORTED",()=>{
		let img=new Image("../../tests/images/","anim","gif")

		expect(img.getExt()==undefined)
	})
})