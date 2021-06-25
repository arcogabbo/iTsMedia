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
			M.toast({text:xhr.responseJSON.message})
		}
	})
}