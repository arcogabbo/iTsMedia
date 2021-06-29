import {AudioVideo} from "../src/model/audioVideo"

describe("Audio extensions",()=>{
	it("MP3",()=>{
		let audio=new AudioVideo("../../tests/audio/","level1","mp3",34)

		expect(audio.getExt()!=undefined)
	})

	it("OGG",()=>{
		let audio=new AudioVideo("../../tests/audio/","level1","ogg",34)

		expect(audio.getExt()!=undefined)
	})

	it("GIF NOT SUPPORTED",()=>{
		let audio=new AudioVideo("../../tests/images/","anim","gif",20)

		expect(audio.getExt()==undefined)
	})
})

describe("Video extensions",()=>{
	it("MP4",()=>{
		let audio=new AudioVideo("../../tests/video/","sample","mp4",10)

		expect(audio.getExt()!=undefined)
	})

	it("MKV",()=>{
		let audio=new AudioVideo("../../tests/video/","sample","mkv",10)

		expect(audio.getExt()!=undefined)
	})

	it("GIF NOT SUPPORTED",()=>{
		let audio=new AudioVideo("../../tests/images/","anim","gif",20)

		expect(audio.getExt()==undefined)
	})
})