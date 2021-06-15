window.onload=()=>{
	$('#review-title, #review-content').characterCounter();

	M.updateTextFields();

	$('#send-button').on('click',sendFeedback)
}

function sendFeedback(){
	$.ajax({
		method:'post',
		url:'/feedback',
		data:{
			title:$('#review-title').val(),
			content:$('#review-content').val(),
			star:$('#star').val()
		},
		success:(result)=>{
			M.toast({text:result.message})
		},
		error:(xhr,status,error)=>{
			console.error("ERRORE INVIO FEEDBACK: "+error)
			console.log(xhr)
			M.toast({text:xhr.responseText})
		}
	})
}