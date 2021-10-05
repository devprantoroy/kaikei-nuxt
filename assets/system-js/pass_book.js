var loadClientPbTransaction;


$(document).ready(function(){

	

	var base_url = $('input#base_url').val();
	var from_data = $('input#filter_from_date').val();
	var to_data = $('input#filter_to_date').val();

	
	getBankList();

	getPassbookTransactionByBankId(null,from_data,to_data);

	$('div#show_bank_list').click(function(){
		getBankList();
	});

	

	//getBankList--------------------------------------------------------------------------
	function getBankList(){

		$.ajax({
				type: "POST",
				url: base_url+'home/getBankList',
				data: {},
				success: function(data) {
					if(!data){ console.log('error getting bank list'); return false; }
					var myData = JSON.parse(data);
					var bank_content = '';
					var total_balance=0;
					
		   			for(i=0;i<myData.length; i++){
		   				if(!myData[i]['balance']){
		   					myData[i]['balance']=0;
		   				}
		   				total_balance=total_balance+parseInt(myData[i]['balance']);

		   				bank_content +='<tr>';
		   				bank_content += '<td class="col-md-7"><div id="btn_bank" data-bank_id="'+myData[i]['id_bank']+'"  class="bank_list pointer">'+myData[i]['bank_name']+'</div></td>';
		   				bank_content += '<td class="col-md-5 text-right">'+parseInt(myData[i]['balance']).toLocaleString()+'</td>';
		   				bank_content +='</tr>';
		   			}
		   			bank_content +='<tr><td class="text-center">合計</td><td class="text-right">'+total_balance.toLocaleString()+'</td></tr>';
		   			$('tbody#bank_list').html(bank_content);
		   			$('div#bank_list').modal('show');
				},
				error: function() {
					alert('Something Error');
				}
		});
	}


	//addNewBank--------------------------------------------------------------------------
	$('button#addNewBank').click(function(){
		var bank_entry_date = $('input#add_bank_entry_date').val();
		var bank_name = $('input#add_bank_name').val();

		if(!bank_name){
			$('input#add_bank_name').focus();
			return false;
		}
		if(!bank_entry_date){
			$('input#add_bank_entry_date').focus();
			return false;
		}

		$.ajax({
				type: "POST",
				url: base_url+'Action_service/addNewBank',
				data: {bank_name: bank_name, bank_entry_date: bank_entry_date},
				success: function(data) {
					$('div#add_bank_area').hide();
					$('input#add_bank_name').val('');
					getBankList();
				},
				error: function() {
					alert('Something Error');
				}
		});

	});


	//get specific bank tranjection--------------------------------------------------------------------------
	var bank_id;
	$(document).on("click","div#btn_bank", function(){
		bank_id = $(this).data('bank_id');
		$('div#bank_list').modal('hide');
		$('div#passbookPageLeftNavi').hide();
		$('span#bank_title').text('（'+$(this).text()+'）');
		getPassbookTransactionByBankId(bank_id,from_data,to_data);
		resetPassbookEntry();
		$('#passBook').removeClass('hide').addClass('show')

		// popitup(base_url+"home/clients_list_pr/journal")
	
	});


	$('button#filter_tran_by_date').click(function(){

		var from_data = $('input#filter_from_date').val();
		var to_data = $('input#filter_to_date').val();

		if(typeof bank_id != 'undefined'){
			bank_id = bank_id;
		}else{
			bank_id = null;
		}
		getPassbookTransactionByBankId(bank_id,from_data,to_data);

	});
	

	// $(document).ready(function(){
	// 	bank_id = $('input#bank_id').val();

	// 	console.log(bank_id)
	// 	$('div#bank_list').modal('hide');
	// 	// $('span#bank_title').text('（'+$(this).text()+'）');
	// 	getPassbookTransactionByBankId(bank_id);
	// 	resetPassbookEntry();
	// 	$('#passBook').removeClass('hide').addClass('show')

	// 	// popitup(base_url+"home/clients_list_pr/journal")
	
	// });





//delete transaction-------------------------------------------------------------------------------------------
$(".removeTrans").on("click", function(event){
	event.preventDefault();

	$('#home1').hide();
	$('#removeTransPop').removeClass('hide');
	var delUrl = $(this).data('href');
	$('button#delete_tran_submit2').click(function(){
		$.ajax({
			type: "GET",
			url: delUrl,
			data: {},
			success: function(data) {
				$('div#removeTransPop').addClass('hide');
				location.reload();
				// loadTransactionByDate('default');
			},
			error: function() {
				alert('Something Error');
			}
		});
	});
	
});

$(document).on("click", "a.removeTrans", function(event){
	event.preventDefault();

	$('#home1').hide();
	$('#removeTransPop').removeClass('hide');
	var delUrl = $(this).data('href');

	
	$('button#delete_tran_submit2').click(function(){
		$.ajax({
			type: "GET",
			url: delUrl,
			data: {},
			success: function(data) {
				$('div#removeTransPop').addClass('hide');
				location.reload();
				// loadTransactionByDate('default');
			},
			error: function() {
				alert('Something Error');
			}
		});
	});
	
});



	


	function getPassbookTransactionByBankId(bank_id,from_data,to_data){
		// console.log(bank_id,from_data,to_data);
		// return false;
		
		$.ajax({
				type: "POST",
				url: base_url+'home/getPassbookTransactionByBankId',
				data: {bank_id: bank_id, from_date: from_data, to_date: to_data},
				success: function(data) {
					var myData = JSON.parse(data);
		            var pb_tran_content = '';
		            var balance=0;
		            for(i=0;i<myData.length; i++){
		              //console.log(myData[i]['client_name']);
		              if(myData[i]['tran_type']==0){
		              		myData[i]['tran_type']='現金';
		              }else{
		              		myData[i]['tran_type']='預金';
		              }

		              if(myData[i]['cost_type']==0){
		              		myData[i]['cost_type']='固定費';
		              }else{
		              		myData[i]['cost_type']='変動費';
		              }

		              balance=parseInt(balance)+parseInt(myData[i]['income'])-parseInt(myData[i]['expense']);
		              pb_tran_content += '<tr id="pb_tran_list" class="editTable" data-id_pb_tran="'+myData[i]['id_pb_tran']+'">';
		              pb_tran_content += '<td data-toggle="tooltip" title="入力日を押せば月日を変更出来ます" data-tran_id='+myData[i]['id_pb_tran']+' data-field="edit_ms_entry_date">'+myData[i]['pb_tran_entry_date']+'</td>';
		              pb_tran_content += '<td class="text-left">'+myData[i]['client_name']+'</td>';

		              if(myData[i]['tran_type']=='預金'){
		              	pb_tran_content += '<td class="text-center deposit_flg">'+myData[i]['tran_type']+'</td>';
		              }else{
		              	pb_tran_content += '<td class="text-center">'+myData[i]['tran_type']+'</td>';
		              }

		              pb_tran_content += '<td class="text-right" data-tran_id='+myData[i]['id_pb_tran']+' data-field="edit_ms_income">'+number_format(myData[i]['income'])+'</td>';
		              pb_tran_content += '<td class="text-right" data-tran_id='+myData[i]['id_pb_tran']+' data-field="edit_ms_expense">'+number_format(myData[i]['expense'])+'</td>';
		              pb_tran_content += '<td class="text-center">'+myData[i]['sub_name']+'</td>';
		              pb_tran_content += '<td class="text-center">'+myData[i]['cost_type']+'</td>';
		              pb_tran_content += '<td class="numbers text-right">'+Math.abs(balance).toLocaleString()+'</td>';
		              pb_tran_content += '<td class="text-center" data-tran_id='+myData[i]['id_pb_tran']+' data-field="edit_ms_comments">'+myData[i]['pb_tran_comments']+'</td>';
					  pb_tran_content += '<td> <span style="margin-left: 8px;" class="edit_tran glyphicon glyphicon-edit pull-left"></span>  <a href="#" class="removeTrans remove_trans pull-right"  data-href="'+base_url+'Action_service/deletePbTransactionGet/'+myData[i]['id_pb_tran']+'"> <span style="color:red" class="glyphicon glyphicon-trash"></span></i></a> </td>';
		            //   pb_tran_content += '<td class="text-center"><a href="'+base_url+'Action_service/deletePbTransactionGet/'+myData[i]['id_pb_tran']+'"><span style="color:red" class="glyphicon glyphicon-trash"></span></i></a></td>';
		              pb_tran_content += '</tr>';


					//   pb_tran_content += '<tr id="pb_tran_list" data-id_pb_tran="'+myData[i]['id_pb_tran']+'">';
		            //   pb_tran_content += '<td><span class="edit_tran edit_tran_date">'+myData[i]['pb_tran_entry_date']+'</span></td>';
		            //   pb_tran_content += '<td class="text-left">'+myData[i]['client_name']+'</td>';

		            //   if(myData[i]['tran_type']=='預金'){
		            //   	pb_tran_content += '<td class="text-center deposit_flg">'+myData[i]['tran_type']+'</td>';
		            //   }else{
		            //   	pb_tran_content += '<td class="text-center">'+myData[i]['tran_type']+'</td>';
		            //   }

		            //   pb_tran_content += '<td class="text-right">'+number_format(myData[i]['income'])+'</td>';
		            //   pb_tran_content += '<td class="text-right">'+number_format(myData[i]['expense'])+'</td>';
		            //   pb_tran_content += '<td class="text-center">'+myData[i]['sub_name']+'</td>';
		            //   pb_tran_content += '<td class="text-center">'+myData[i]['cost_type']+'</td>';
		            //   pb_tran_content += '<td class="numbers text-right">'+Math.abs(balance).toLocaleString()+'</td>';
		            //   pb_tran_content += '<td class="text-center">'+myData[i]['pb_tran_comments']+'<span class="edit_tran glyphicon glyphicon-edit pull-right"></span>'+'</td>';
		            //   pb_tran_content += '</tr>';
		            }

		            $('tbody#pb_transactions').html(pb_tran_content);	
					if(bank_id){
						popitup(base_url+"home/client_list_bank_wise/"+bank_id);
						// popitup(base_url+"home/client_list_bank_wise/"+bank_id+'/'+from_data+'/'+to_data);
					}
					
					// getClientListBybankId(bank_id)
				},
				error: function() {
					alert('Something Error');
				}
		});

	}

//get specific bank tranjection---------------------------////-------------------------------------------






//load specific client passbook Transaction---------------------------------------------------------------------------------------
loadClientPbTransaction = function(){
	var client_id = $("input#pb_tran_id_client").val();
	
	
	if($("input#bank_id").val() == ''){
		mybankid = bank_id;
	}else{
		mybankid = $("input#bank_id").val();
	}

	if(!mybankid){
		getBankList();
		return false;
	}

	

	if(client_id && mybankid){
		$.ajax({
			type: "POST",
			url: base_url+'home/getPbBankTransactionByClientId',
			data: {client_id: client_id, bank_id: mybankid},
			success: function(data) {
				//console.log(data);

				
				var myData = JSON.parse(data);
	            var pb_tran_content = '';
	            var last_inc=0;
	            var last_exp=0;
	            for(i=0;i<myData.length; i++){
	              //console.log(myData[i]['client_name']);

	              if(myData[i]['tran_type']==0){
	              		myData[i]['tran_type']='現金';
	              }else{
	              		myData[i]['tran_type']='預金';
	              }

	              if(myData[i]['cost_type']==0){
	              		myData[i]['cost_type']='固定費';
	              }else{
	              		myData[i]['cost_type']='変動費';
	              }

	              pb_tran_content += '<tr class="client_pb_tran_row">';
	              pb_tran_content += '<td>'+myData[i]['pb_tran_entry_date']+'</td>';
	              pb_tran_content += '<td class="text-center">'+myData[i]['client_name']+'</td>';
	              pb_tran_content += '<td class="text-center">'+myData[i]['tran_type']+'</td>';
	              pb_tran_content += '<td class="text-right">'+number_format(myData[i]['income'])+'</td>';
	              pb_tran_content += '<td class="text-right">'+number_format(myData[i]['expense'])+'</td>';
	              pb_tran_content += '<td class="text-center">'+myData[i]['sub_name']+'</td>';
	              pb_tran_content += '<td class="text-center">'+myData[i]['cost_type']+'</td>';
	              pb_tran_content += '<td class="text-center">'+myData[i]['pb_tran_comments']+'</td>';
	              pb_tran_content += '</tr>';

	              if(i==0){
	              	last_inc=myData[i]['income'];
	              	last_exp=myData[i]['expense'];
	              }

	            }
	            //console.log(pb_tran_content);
	            $('tr.client_pb_tran_row').remove();
	            $('tr#add_pb_transaction_row').after(pb_tran_content);
	            
	            //last transaction put into input
	            $('input#pb_tran_income').val('');
	            $('input#pb_tran_expense').val('');
	            if(last_inc && last_inc>0){
	            	$('input#pb_tran_income').val(number_format(last_inc));
	            }
	            if(last_exp && last_exp>0){
	            	$('input#pb_tran_expense').val(number_format(last_exp));
	            }

			},
			error: function() {
				alert('Something Error');
			}
		});

	}else{
		console.log('Client ID Not Found!');
	}
}
//-------------------------------------------------------------------------------------------------------------------






//select client------------------------------------------------------------------------------------------------------
$('td#select_clients').click(function(){
	popitup(base_url+'home/clients_list/from_passbook_entry');
		$('div#bank_list').modal('hide');
		$('div#passbookPageLeftNavi').hide();
	// if(bank_id){
	// 	popitup(base_url+'home/clients_list/from_passbook_entry');
	// }else{
	// 	getBankList();
	// }
});
//select client-------------------------------/////-----------------------------------------------------------------






// Add new passbook transaction--------------------------------------------------------------------------------------

	function tranValidation(){

		
		var pb_tran_id_client = $('input#pb_tran_id_client').val();
		var pb_tran_entry_date = $('input#pb_tran_entry_date').val();
		var pb_tran_income = $('input#pb_tran_income').val().replace(/,/g, '');
		var pb_tran_expense = $('input#pb_tran_expense').val().replace(/,/g, '');
		var pb_tran_comments = $('input#pb_tran_comments').val();
		var pb_tran_com_type = $('input#pb_tran_com_type').val();

		
		if(pb_tran_id_client){

			if(!pb_tran_entry_date){
				$('input#pb_tran_entry_date').focus();
				return false;
			}
			if(pb_tran_com_type=='income'){
				if(!pb_tran_income){
					$('input#pb_tran_income').focus();
					return false;
				}
			}else{
				if(!pb_tran_expense){
					$('input#pb_tran_expense').focus();
					return false;
				}
			}
			$('div#add_passbook_transaction_conf_popup').modal('show');
			//alert('input data is valid');
		}
	}



	$('tr#add_pb_transaction_row').find("input").on('keyup', function (e) {
	    if (e.keyCode == 13) {
	        tranValidation();
	    }
	});



	$('button#add_passbook_transaction_submit_conf').click(function(){
		$('div#add_passbook_transaction_conf_popup').modal('hide');
		savePbTransaction();
	});


	function savePbTransaction(){

		if($("input#bank_id").val() == ''){
			mybankid = bank_id;
		}else{
			mybankid = $("input#bank_id").val();
		}
		
		// var mybankid = bank_id;
		if(!mybankid){
			console.log('Please Select A Bank !');
		}

	

		var pb_tran_id_client = $('input#pb_tran_id_client').val();
		var pb_tran_entry_date = $('input#pb_tran_entry_date').val();
		var pb_tran_income = $('input#pb_tran_income').val().replace(/,/g, '');
		var pb_tran_expense = $('input#pb_tran_expense').val().replace(/,/g, '');
		var pb_tran_comments = $('input#pb_tran_comments').val();
		var pb_tran_com_type = $('input#pb_tran_com_type').val();
		if(pb_tran_id_client && mybankid ){

			if(!pb_tran_entry_date){
				$('input#pb_tran_entry_date').focus();
				return false;
			}
			if(pb_tran_com_type=='income'){
				if(!pb_tran_income){
					$('input#pb_tran_income').focus();
					return false;
				}
			}else{
				if(!pb_tran_expense){
					$('input#pb_tran_expense').focus();
					return false;
				}
			}

			
			//save tranjection
			$.ajax({
				type: "POST",
				url: base_url+'Action_service/addPassbookTransaction',
				data: {bank_id: mybankid, pb_tran_id_client: pb_tran_id_client, pb_tran_income:pb_tran_income, pb_tran_expense:pb_tran_expense, pb_tran_comments:pb_tran_comments, pb_tran_entry_date:pb_tran_entry_date},
				success: function(data) {

					// console.log(data);
					// return false;

					$('tr#add_pb_transaction_row').find('input#pb_tran_income').val('');
					$('tr#add_pb_transaction_row').find('input#pb_tran_expense').val('');
					getPassbookTransactionByBankId(mybankid,from_data,to_data);
					//load client tran
					$("input#pb_tran_id_client").click();
					if(pb_tran_com_type=='income'){
						$('tr#add_pb_transaction_row').find('input#pb_tran_income').focus();
					}else{
						$('tr#add_pb_transaction_row').find('input#pb_tran_expense').focus();
					}
				},
				error: function() {
					alert('Something Error');
				}
			});
			/////

		
		}
	}



// Add new passbook transaction-------------------/////--------------------------------------------------------------






//resetPassbookEntry------------------------------------------------------------------------------------------------
function resetPassbookEntry(){
	$('td#select_clients').text('');
	$('td#pb_tran_tran_type').text('');
	$('td#pb_tran_subject_name').text('');
	$('td#pb_tran_cost_type').text('');

	$('input#pb_tran_income').val('');
	$('input#pb_tran_expense').val('');

	$('input#pb_tran_id_client').val('');
	// $('input#pb_tran_entry_date').val('');
	$('input#pb_tran_comments').val('');
	$('input#pb_tran_com_type').val('');
	$('tr.client_pb_tran_row').remove();
}










//edit passbook transaction-------------------------------------------------------------------------------------------
var edit_pb_tran_id;
$(document).on("click","span.edit_tran", function(){

	edit_pb_tran_id = $(this).closest('tr').data('id_pb_tran');
	$('tr#pb_tran_list').closest('tr').css("cssText", "background: none;");
	$(this).closest('tr').css("cssText", "background: yellow !important;");
	var entry_date = $(this).closest('tr').find("td:first").text();
	var client_name = $(this).closest('tr').find('td:eq(1)').text();
	var comments = $(this).closest('tr').find("td:last").text();
	var income = $(this).closest('tr').find('td:eq(3)').text();
	var expense = $(this).closest('tr').find('td:eq(4)').text();

	if(income.replace(/,/g, '') > 0){
		$('input#edit_tran_income').attr('disabled', false);
		$('input#edit_tran_expense').attr('disabled', true);
	}else{
		$('input#edit_tran_income').attr('disabled', true);
		$('input#edit_tran_expense').attr('disabled', false);
	}

	$('input#edit_tran_client_name').val(client_name);
	$('input#edit_tran_entry_date').val(entry_date);
	$('input#edit_tran_comments').val(comments);
	$('input#edit_tran_income').val(income);
	$('input#edit_tran_expense').val(expense);
	$('div#edit_transaction_popup').modal('show');

	if(parseInt(income) > 0){
		$('select#edit_tran_client_name').html($('div#income_clients_content').html());
	}else{
		$('select#edit_tran_client_name').html($('div#expense_clients_content').html());
	}
});



$('button#edit_tran_cancel').click(function(){
	$('tr#pb_tran_list').closest('tr').css("cssText", "background: none;");
});

$('button#edit_tran_submit').click(function(){
	var tran_id = edit_pb_tran_id;
	var income = $('input#edit_tran_income').val().replace(/,/g, '');
	var expense = $('input#edit_tran_expense').val().replace(/,/g, '');
	var tran_comments = $('input#edit_tran_comments').val();
	var tran_entry_date = $('input#edit_tran_entry_date').val();
	var client_id = $('select#edit_tran_client_name').val();

	if(tran_entry_date && (income>0 || expense>0) ){
	}else{
		return false;
	}

	

	$.ajax({
		type: "POST",
		url: base_url+'Action_service/updatePbTransaction',
		data: {tran_id: tran_id, income: income, expense: expense, tran_comments: tran_comments, tran_entry_date: tran_entry_date,client_id : client_id},
		success: function(data) {
			$('div#edit_transaction_popup').modal('hide');
			getPassbookTransactionByBankId(bank_id,from_data,to_data);
			// //make color updated row
			setTimeout(function(){
				$('tr[data-id_pb_tran="' + tran_id + '"]').css("cssText", "background: yellow !important;");
			}, 700);

			setTimeout(function(){
				$('tr[data-id_pb_tran="' + tran_id + '"]').css("cssText", "background: none;");
			}, 6000);
		},
		error: function() {
			alert('Something Error');
		}
	});

});


$('button#delete_tran_submit').click(function(){
	var tran_id = edit_pb_tran_id;
	$.ajax({
		type: "POST",
		url: base_url+'Action_service/deletePbTransaction',
		data: {tran_id: tran_id},
		success: function(data) {
			$('div#edit_transaction_popup').modal('hide');
			getPassbookTransactionByBankId(bank_id,from_data,to_data);
		},
		error: function() {
			alert('Something Error');
		}
	});
});



$('div#edit_transaction_popup').find("input").on('keyup', function (e) {
	    if (e.keyCode == 13) {
	        $('button#edit_tran_submit').click();
	    }
	});


//-------------------------------------------END------------------------------------------------------------------
































//comma input
$(document).on("keyup","input.comma", function(){
  // skip for arrow keys
  if(event.which >= 37 && event.which <= 40) return;
  // format number
  $(this).val(function(index, value) {
	return value
	.replace(/\D/g, "")
	.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	;
  });
});




//Number format
function number_format(str){
	return str.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//end of js
});

