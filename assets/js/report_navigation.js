$(document).ready(function(){
	var base_url = $('input#base_url').val();
	

	//for_bs
	$('button#bs_report').click(function(){
		var peroid;
		if(localStorage['bs_prd_from_date'] && localStorage['bs_prd_to_date']){
			peroid = localStorage['bs_prd_from_date']+'/'+localStorage['bs_prd_to_date'];
		}else{
			var date = new Date(); 
			date.getDate()
			peroid = date.getFullYear()+'/'+'01'+'/01/'+date.getFullYear()+'/'+12+'/'+'31';
		// 	localStorage['bs_prd_from_date']='2021/01/01';
		// 	localStorage['bs_prd_to_date']='2021/12/31';
		}
		// location.href = base_url+'report/balance_sheet/'+peroid;
		return popitup(base_url+'report/balance_sheet/'+peroid);

		// console.log(localStorage);
	});


	

	$('button.divRefresh').click(function(evt){
		if(window.location.href == base_url+'home'){
			window.location.reload();
		}
	});














});