var loadTransactionByDate;
var loadClientTransaction;



$(document).ready(function(){

	var base_url = $('input#base_url').val();



	function tranValidation(){
		var tran_id_client = $('input#tran_id_client').val();
		var tran_entry_date = $('input#tran_entry_date').val();
		var tran_income = $('input#tran_income').val().replace(/,/g, '');
		var tran_expense = $('input#tran_expense').val().replace(/,/g, '');
		var tran_comments = $('input#tran_comments').val();
		var tran_com_type = $('input#tran_com_type').val();
		if(tran_id_client){

			if(!tran_entry_date){
				$('input#tran_entry_date').focus();
				return false;
			}
			if(tran_com_type=='income'){
				if(!tran_income){
					$('input#tran_income').focus();
					return false;
				}
			}else{
				if(!tran_expense){
					$('input#tran_expense').focus();
					return false;
				}
			}
			$('div#add_transaction__conf_popup').modal('show');
		}
	}



	$('tr#add_transaction_row').find("input").on('keyup', function (e) {
	    if (e.keyCode == 13) {
	        tranValidation();
	    }
	});

	//enter button conf click
	$(document).on('keyup', function (e) {
	    if (e.keyCode == 13) {
	        if( $('div#add_transaction__conf_popup').is(":visible") ){
	        	$('button#add_transaction_submit_conf').click();
	        }
	    }
	});

	$('button#add_transaction_submit_conf').click(function(){
		$('div#add_transaction__conf_popup').modal('hide');
		saveTransaction();
	});


	function saveTransaction(){
		
		var tran_id_client = $('input#tran_id_client').val();
		var tran_entry_date = $('input#tran_entry_date').val();
		var tran_income = $('input#tran_income').val().replace(/,/g, '');
		var tran_expense = $('input#tran_expense').val().replace(/,/g, '');
		var tran_comments = $('input#tran_comments').val();
		var tran_com_type = $('input#tran_com_type').val();


		// console.log(tran_entry_date,$('input#filter_to_date').val());
		// return false;


		if(tran_id_client){

			if(!tran_entry_date){
				$('input#tran_entry_date').focus();
				return false;
			}
			if(tran_com_type=='income'){
				if(!tran_income){
					$('input#tran_income').focus();
					return false;
				}
			}else{
				if(!tran_expense){
					$('input#tran_expense').focus();
					return false;
				}
			}

			//save tranjection
			$.ajax({
				type: "POST",
				url: base_url+'Action_service/addTransaction',
				data: {tran_id_client: tran_id_client, tran_income:tran_income, tran_expense:tran_expense, tran_comments:tran_comments, tran_entry_date:tran_entry_date},
				success: function(data) {
					// console.log(data);
					$('tr#add_transaction_row').find('input#tran_income').val('');
					$('tr#add_transaction_row').find('input#tran_expense').val('');
					loadTransactionByDate('default_two');

					//load client tran
					$("input#tran_id_client").click();
					if(tran_com_type=='income'){
						$('tr#add_transaction_row').find('input#tran_income').focus();
					}else{
						$('tr#add_transaction_row').find('input#tran_expense').focus();
					}
				},
				error: function() {
					alert('Something Error');
				}
			});
			/////

		
		}
	}





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








	//load loadTransactionByDate----------------------------------------------------
	loadTransactionByDate = function(type){
			var from_date;
			var to_date;
			if(type=='default'){
				if($('input#filter_from_date').val() && $('input#filter_to_date').val()){
					from_date = $('input#filter_from_date').val();
					to_date = $('input#filter_to_date').val();
				}else{
					return false;
				}
				
			}else if(type=='default_two'){
				from_date = $('input#tran_entry_date').val();
				to_date = $('input#filter_to_date').val();
			}else{
				if($('input#filter_from_date').val() && $('input#filter_to_date').val() ){
					from_date = $('input#filter_from_date').val();
					to_date = $('input#filter_to_date').val();
				}else{
					$('input#filter_from_date').focus();
					return false;
				}
			}
			$.ajax({
				type: "POST",
				url: base_url+'home/getTransactionByDate',
				data: {from_date: from_date, to_date: to_date},
				success: function(data) {
					//console.log(data);
					if(!data){ console.log('error getting transaction list'); return false; }
					var myData = JSON.parse(data);
		            var tran_content = '';
		            var balance=0;
		            for(i=0;i<myData.length; i++){
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

		              tran_content += '<tr id="transaction_list" data-id_tran='+myData[i]['id_tran']+' >';
		              tran_content += '<td data-toggle="tooltip" title="入力日を押せば月日を変更出来ます">'+myData[i]['tran_entry_date']+'</td>';
		            //   tran_content += '<td data-toggle="tooltip" title="入力日を押せば月日を変更出来ます"><span class="edit_tran edit_tran_date">'+myData[i]['tran_entry_date']+'</span></td>';
		              tran_content += '<td>'+myData[i]['client_name']+'</td>';

		              if(myData[i]['tran_type']=='預金'){
		              	tran_content += '<td class="text-center deposit_flg">'+myData[i]['tran_type']+'</td>';
		              }else{
		              	tran_content += '<td class="text-center">'+myData[i]['tran_type']+'</td>';
		              }

		              tran_content += '<td class="text-right">'+number_format(myData[i]['income'])+'</td>';
		              tran_content += '<td class="text-right">'+number_format(myData[i]['expense'])+'</td>';
		              tran_content += '<td class="text-center">'+myData[i]['sub_name']+'</td>';
		              tran_content += '<td class="text-center">'+myData[i]['cost_type']+'</td>';
		              tran_content += '<td class="numbers text-right">'+balance.toLocaleString()+'</td>';
		              tran_content += '<td class="text-center">'+myData[i]['tran_comments']+'</td>';
		              tran_content += '<td >  <span style="margin-left: 8px;" class="edit_tran glyphicon glyphicon-edit pull-left"></span>  <a href="#" class="removeTrans pull-right"  data-href="'+base_url+'Action_service/deleteTransactionGet/'+myData[i]['id_tran']+'"><span style="color:red" class="glyphicon glyphicon-trash"></span></i></a></td>';
		            //   tran_content += '<td class="text-center">'+myData[i]['tran_comments']+'<span class="edit_tran glyphicon glyphicon-edit pull-right"></span> </td>';
		              tran_content += '</tr>';
		            }

		            $('tbody#all_transactions').html(tran_content);
		            //cash & check calculation
		            getPassbookCashCheck(from_date,to_date);
				},
				error: function() {
					alert('Something Error');
				}
			});

	}
	//----------------------------------------------------------------------------------------------------


	// getPassbookCashCheck-----------------------------------------------------------------------------
	function getPassbookCashCheck(from_date,to_date){
		$.ajax({
			type: "POST",
			url: base_url+'home/getPassbookCashCheck',
			data: {from_date: from_date, to_date: to_date},
			success: function(data) {
				var myData = JSON.parse(data);
				var tran_content;
				tran_content += '<tr> <td colspan="6" style="border: none !important;"></td><td class="text-center" style="color: blue;" >現金残</td><td class="text-right">'+number_format(myData['cash'].toLocaleString())+'</td><td style="border: none !important;"></td><td style="border: none !important;"></td></tr>';
				tran_content += '<tr> <td colspan="6" style="border: none !important;"></td><td class="text-center" style="color: blue;" >預金残</td><td class="text-right">'+number_format(myData['check'].toLocaleString())+'</td><td style="border: none !important;"></td><td style="border: none !important;"></td></tr>';

				$('table.tranjection').append(tran_content);

			},
			error: function() {
				console.log('Something Error in js getPassbookCashCheck function');
			}
		});

	}
	// getPassbookCashCheck------------------------------////-------------------------------------------




	function SortByDate(x,y) {
      return ((x.tran_entry_date == y.tran_entry_date) ? 0 : ((x.tran_entry_date < y.tran_entry_date) ? 1 : -1 ));
    }

	
	//load specific client Transaction---------------------------------------------------------------------------------------
	loadClientTransaction = function(){
		var client_id = $("input#tran_id_client").val();
		if(client_id){
			$.ajax({
				type: "POST",
				url: base_url+'home/getTransactionByClientId',
				data: {client_id: client_id},
				success: function(data) {
					//console.log(data);
					var myData = JSON.parse(data);
					myData.sort(SortByDate);
					console.log(myData);
		            var tran_content = '';
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

		              tran_content += '<tr class="client_tran_row">';
		              tran_content += '<td data-tran_id="'+myData[i]['id_tran']+'" data-field="edit_ms_entry_date">'+myData[i]['tran_entry_date']+'</td>';
		              tran_content += '<td class="text-center">'+myData[i]['client_name']+'</td>';
		              tran_content += '<td class="text-center">'+myData[i]['tran_type']+'</td>';
		              tran_content += '<td class="text-right" data-tran_id="'+myData[i]['id_tran']+'" data-field="edit_ms_income">'+number_format(myData[i]['income'])+'</td>';
		              tran_content += '<td class="text-right" data-tran_id="'+myData[i]['id_tran']+'" data-field="edit_ms_expense">'+number_format(myData[i]['expense'])+'</td>';
		              tran_content += '<td class="text-center">'+myData[i]['sub_name']+'</td>';
		              tran_content += '<td class="text-center">'+myData[i]['cost_type']+'</td>';
		              tran_content += '<td class="text-center" data-tran_id="'+myData[i]['id_tran']+'" data-field="edit_ms_comments">'+myData[i]['tran_comments']+'</td>';
		              tran_content += '</tr>';

		              if(i==0){
		              	last_inc=myData[i]['income'];
		              	last_exp=myData[i]['expense'];
		              }

		            }

		            //console.log(tran_content);
		            $('tr.client_tran_row').remove();
		            $('tr#add_transaction_row').after(tran_content);
		            
		            //last transaction put into input
		            $('input#tran_income').val('');
		            $('input#tran_expense').val('');
		            if(last_inc && last_inc>0){
		            	$('input#tran_income').val(number_format(last_inc));
		            }
		            if(last_exp && last_exp>0){
		            	$('input#tran_expense').val(number_format(last_exp));
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















//edit transaction-------------------------------------------------------------------------------------------
var edit_tran_id;

$('.edit_tran').on('click', function(){
	edit_tran_id = $(this).closest('tr').data('id_tran');
	$('tr#transaction_list').closest('tr').css("cssText", "background: none;");
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

$(document).on("click","span.edit_tran", function(){

	edit_tran_id = $(this).closest('tr').data('id_tran');

	$('tr#transaction_list').closest('tr').css("cssText", "background: none;");
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
	$('tr#transaction_list').closest('tr').css("cssText", "background: none;");
});

$('button#edit_tran_submit').click(function(){
	var tran_id = edit_tran_id;
	var income = $('input#edit_tran_income').val().replace(/,/g, '');
	var expense = $('input#edit_tran_expense').val().replace(/,/g, '');
	var tran_comments = $('input#edit_tran_comments').val();
	var tran_entry_date = $('input#edit_tran_entry_date').val();
	var client_id = $('select#edit_tran_client_name').val();


	// console.log(client_id);
	// return false;
	if(tran_entry_date && (income>0 || expense>0) ){
	}else{
		return false;
	}

	$.ajax({
		type: "POST",
		url: base_url+'Action_service/updateTransaction',
		data: {tran_id: tran_id, income: income, expense: expense, tran_comments: tran_comments, tran_entry_date: tran_entry_date, client_id:client_id},
		success: function(data) {
			$('div#edit_transaction_popup').modal('hide');
			// loadTransactionByDate('default');
			location.reload();
			//roy san added
			//make color updated row
			setTimeout(function(){
				$('tr[data-id_tran="' + tran_id + '"]').css("cssText", "background: yellow !important;");
			}, 700);

			setTimeout(function(){
				$('tr[data-id_tran="' + tran_id + '"]').css("cssText", "background: none;");
			}, 6000);

		},
		error: function() {
			alert('Something Error');
		}
	});

});


$('button#delete_tran_submit').click(function(){
	var tran_id = edit_tran_id;
	$.ajax({
		type: "POST",
		url: base_url+'Action_service/deleteTransaction',
		data: {tran_id: tran_id},
		success: function(data) {
			$('div#edit_transaction_popup').modal('hide');
			loadTransactionByDate('default');
		},
		error: function() {
			alert('Something Error');
		}
	});
});



// $('div#edit_transaction_popup').find("input").on('keyup', function (e) {
// 	    if (e.keyCode == 13) {
// 	        $('button#edit_tran_submit').click();
// 	    }
// 	});


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