var addNewClient;
var editClient;

$(document).ready(function(){

	$(".clinet_btn").mouseover(function(){
		$('span.clientNamemouseover').text($(this).data('client_name'));
		$('span.subjectNamemouseover').text($(this).data('sub_name'));
		$('#mouseHoverNavi').addClass('show');
		$('div#home1').hide();
	});

	$(".clinet_btn").mouseout(function(){
		$('#mouseHoverNavi').removeClass('show');
	});

	var base_url = $('input#base_url').val();	
	var client_opt=$('input#page_type').val();
	var bank_id =$('input#bank_id').val();
	var from_date =$('input#from_date').val();
	var to_date =$('input#to_date').val();
	
	
	//set client to tranjection page
	$('button#client').click(function(){

		if($('button#client').hasClass('ajaxClass')){
			$('button#client').removeClass('ajaxClass');	
		 }

		// var id_client = $(this).data('id_client');

		var st = $(this).data('sub_name');
		var id_client = $(this).data('id_client');
		var client_name = $(this).data('client_name');
		var sub_name = $(this).data('sub_name');
		var tran_type = $(this).data('tran_type');
		var cost_type = $(this).data('cost_type');
		var client_type = $(this).data('client_type');
		// var bank_id = $(this).data('id_bank');
		var sub_name = $(this).data('sub_name');

		$(".link_btn").each(function() {
			if($(this).hasClass('ajaxClass')){
				$(this).removeClass('ajaxClass');
				
			 }
			if(st == $(this).data('subtitle')){
				$(this).addClass('ajaxClass');
				
			}
			
		});

		$(".link_btn").on('click',function() {
			window.location.replace(base_url+'report/management_table/32/general/2021/01/01/2021/12/31/from_bs/60');
		});

		$(this).addClass('ajaxClass');
		
		// $('div#home1').hide();
		$('#clientName').text(client_name);
		$('#subName').text(sub_name);
		$('div#home5').removeClass('hide');
		$('div#home5').show();


		$('button#client').keypress(function (e) {
			var key = e.which;
			if(key == 13){
				$('#okButton').click(); 
			 }
		});  
	

		if(client_opt=='client_list_bank_wise'){
			$('#okButton').on('click', function() {
				$.ajax({
					type: "POST",
					url: base_url+'home/getPassbookTransactionByBankIdClientId',
					data: {
						id_client: id_client,
						bank_id : bank_id,
						from_date : from_date,
						to_date : to_date,
					},
					success: function(data) {
					
						var myData = JSON.parse(data);
						var pb_tran_content = '';
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
						  pb_tran_content += '<tr id="pb_tran_list" data-id_pb_tran="'+myData[i]['id_pb_tran']+'">';
						  pb_tran_content += '<td>'+myData[i]['pb_tran_entry_date']+'</td>';
						  pb_tran_content += '<td class="text-left">'+myData[i]['client_name']+'</td>';
		
						  if(myData[i]['tran_type']=='預金'){
							  pb_tran_content += '<td class="text-center deposit_flg">'+myData[i]['tran_type']+'</td>';
						  }else{
							  pb_tran_content += '<td class="text-center">'+myData[i]['tran_type']+'</td>';
						  }
		
						  pb_tran_content += '<td class="text-right">'+number_format(myData[i]['income'])+'</td>';
						  pb_tran_content += '<td class="text-right">'+number_format(myData[i]['expense'])+'</td>';
						  pb_tran_content += '<td class="text-center">'+myData[i]['sub_name']+'</td>';
						  pb_tran_content += '<td class="text-center">'+myData[i]['cost_type']+'</td>';
						  pb_tran_content += '<td class="numbers text-right">'+ Math.abs(balance).toLocaleString()+'</td>';
						  pb_tran_content += '<td class="text-center">'+myData[i]['pb_tran_comments']+'<span class="edit_tran glyphicon glyphicon-edit pull-right"></span>'+'</td>';
						  pb_tran_content += '</tr>';
						}
		
		
					if(tran_type==0){
						$('div#select_bank_type_partner').modal('show');
						return false;
					}
		
					if(tran_type==0){
						tran_type='現金';
					}else{
						tran_type='預金';
					}
					if(cost_type==0){
						cost_type='固定費';
					}else{
						cost_type='変動費';
					}
		
					
		
					$("td#select_clients",opener.document).text(client_name);
					$("td#pb_tran_subject_name",opener.document).text(sub_name);
					$("td#pb_tran_tran_type",opener.document).text(tran_type);
					$("td#pb_tran_cost_type",opener.document).text(cost_type);
		
					if(client_type=='income'){
						$("input#pb_tran_income",opener.document).attr('readonly', true);
						$("input#pb_tran_expense",opener.document).attr('readonly', true);
						$("input#pb_tran_income",opener.document).attr('readonly', false);
						$("input#pb_tran_com_type",opener.document).val('income');
						$("input#pb_tran_income",opener.document).focus();
					}else{
						$("input#pb_tran_income",opener.document).attr('readonly', true);
						$("input#pb_tran_expense",opener.document).attr('readonly', true);
						$("input#pb_tran_expense",opener.document).attr('readonly', false);
						$("input#pb_tran_com_type",opener.document).val('expense');
						$("input#pb_tran_expense",opener.document).focus();
					}
					$("input#pb_tran_id_client",opener.document).val(id_client);
					
					//for load passbook client tranjaction in passbook page(parent)
					$("input#pb_tran_id_client",opener.document).click();
					$('tbody.pb_transactions',opener.document).html(pb_tran_content);
		
		
				
				
						window.close();
					},
					error: function() {
						// alert('Something Error');
					}
				});
			});
		}else{
				var id_client = $(this).data('id_client');
				var client_name = $(this).data('client_name');
				var sub_name = $(this).data('sub_name');
				var tran_type = $(this).data('tran_type');
				var cost_type = $(this).data('cost_type');
				var client_type = $(this).data('client_type');
				var entry_date = $(this).data('entry_date');
				var linked_sub_id = $(this).data('linked_sub_id');
				var tran_count = $(this).data('tran_count');
				var id_bank = $(this).data('id_bank');
				var bank_name = $(this).data('bank_name');
	
				$('div#home5').addClass('hide');

				$('input#edit_client_id').val(id_client);
				$('input#edit_client_entry_date').val(entry_date);
				$('input#edit_client_name').val(client_name);
				$("select#client_tran_type").val(tran_type);
				$("select#client_cost_type").val(cost_type);
				$("input#tran_count").val(tran_count);
	
				if(id_bank){
					$('tr#bankSelectSection').show();
					$('select#edit_client_bank_id').html($('div#bank_list_content').html());
					
				}else{
					$('tr#bankSelectSection').hide();
					$('select#edit_client_bank_id').html('');
					// $('select#add_client_bank_id').val('');
				}
	
				$('select#edit_client_bank_id').val(id_bank);
	
				
	
				if(client_type=='income'){
					$('select#client_linked_sub').html($('div#income_subject_content').html());
				}else{
					$('select#client_linked_sub').html($('div#expense_subject_content').html());
				}
	
				$("select#client_linked_sub").val(linked_sub_id);
	
				$('span#edit_client_name').text(client_name);
				$('div#select_client_mgs').hide();
				$('div#client_edit_popup').modal('show');
		}

		
		
		

			// var client_name = $(this).data('client_name');
			// var sub_name = $(this).data('sub_name');
			// var tran_type = $(this).data('tran_type');
			// var cost_type = $(this).data('cost_type');
			// var client_type = $(this).data('client_type');

			// if(tran_type==0){
			// 	tran_type='現金';
			// }else{
			// 	tran_type='預金';
			// }
			// if(cost_type==0){
			// 	cost_type='固定費';
			// }else{
			// 	cost_type='変動費';
			// }

			// $("td#tran_client_name",opener.document).text(client_name);
			// $("td#tran_subject_name",opener.document).text(sub_name);
			// $("td#tran_tran_type",opener.document).text(tran_type);
			// $("td#tran_cost_type",opener.document).text(cost_type);

			// if(client_type=='income'){
			// 	$("input#tran_income",opener.document).attr('readonly', true);
			// 	$("input#tran_expense",opener.document).attr('readonly', true);
			// 	$("input#tran_income",opener.document).attr('readonly', false);
			// 	$("input#tran_com_type",opener.document).val('income');
			// 	$("input#tran_income",opener.document).focus();
			// }else{
			// 	$("input#tran_income",opener.document).attr('readonly', true);
			// 	$("input#tran_expense",opener.document).attr('readonly', true);
			// 	$("input#tran_expense",opener.document).attr('readonly', false);
			// 	$("input#tran_com_type",opener.document).val('expense');
			// 	$("input#tran_expense",opener.document).focus();
			// }
			// $("input#tran_id_client",opener.document).val(id_client);

			// //for load client tranjaction in main page(parent)
			// $("input#tran_id_client",opener.document).click();
			// window.close();

		// console.log(id_client)

	

	});





	// editClient ----------------------------------------------------------------
	editClient = function(element){
		if(client_opt!='edit'){
			$(element).css('color','yellow');
			client_opt='edit';
			$('div#select_client_mgs').show();
		}else{
			$(element).css('color','white');
			client_opt = $('input#page_type').val();
			$('div#select_client_mgs').hide();
		}
	}

	$('button#edit_client_submit').click(function(){
		var id_client = $('input#edit_client_id').val();
		var entry_date = $('input#edit_client_entry_date').val();
		var client_name = $('input#edit_client_name').val();
		var tran_type = $('select#client_tran_type').val();
		var linked_sub_id = $('select#client_linked_sub').val();
		var cost_type = $('select#client_cost_type').val();
		var bank_id = $('select#edit_client_bank_id').val();

	

		if(!entry_date){
			$('input#edit_client_entry_date').focus();
			return false;
		}
		if(!client_name){
			$('input#edit_client_name').focus();
			return false;
		}
		
		$.ajax({
			type: "POST",
			url: base_url+'Action_service/updateClient',
			data: {id_client:id_client, client_name:client_name, tran_type:tran_type, cost_type:cost_type, entry_date:entry_date,linked_sub_id:linked_sub_id, id_bank: bank_id },
			success: function(data) {
				opener.location.reload();
				window.top.location=window.top.location;
			},
			error: function() {
				// alert('Something Error');
			}
		});

	});

	$('button#delete_client_submit').click(function(){
		var tran_count = $("input#tran_count").val();
		if(tran_count==0){
			 $('div#client_edit_popup').modal('hide');
			 $('div#delete_client_submit_conf_popup').modal('show');
		}else{
			$('div#client_edit_popup').modal('hide');
			$('div#unable_to_delete_mgs_popup').modal('show');
		}
	});

	$('button#delete_client_submit_conf').click(function(){
		$('div#delete_client_submit_conf_popup').modal('hide');
		var id_client = $('input#edit_client_id').val();
		$.ajax({
			type: "POST",
			url: base_url+'Action_service/DeleteClient',
			data: {id_client:id_client},
			success: function(data) {
				window.top.location=window.top.location;
			},
			error: function() {
				// alert('Something Error');
			}
		});

	});

	//------------------------------------//////----------------------------------







	// addClient ----------------------
	addNewClient = function(element){
		$('div#add_new_client').modal('show');
		if( $('select#select_client_type').val() =='income'){
			$('select#add_client_linked_sub').html($('div#income_subject_content').html());
		}else{
			$('select#add_client_linked_sub').html($('div#expense_subject_content').html());
		}
	}

	//select client type
	$('select#select_client_type').on('change', function() {
		if( this.value =='income'){
			$('select#add_client_linked_sub').html($('div#income_subject_content').html());
		}else if(this.value =='receivable'){
			$('select#add_client_linked_sub').html($('div#receivable_subject_content').html());
		}else if(this.value =='payable'){
			$('select#add_client_linked_sub').html($('div#payble_subject_content').html());
		}else{
			$('select#add_client_linked_sub').html($('div#expense_subject_content').html());
		}
		//Roy added
	});


	$('button#add_new_client_submit').click(function() {
		var client_name = $('input#add_client_name').val();
		var tran_type = $('select#add_client_tran_type').val();
		var cost_type = $('select#add_client_cost_type').val();
		var linked_sub_id = $('select#add_client_linked_sub').val();
		var entry_date = $('input#add_client_entry_date').val();
		var bank_id = $('select#add_client_bank_id').val();

		if(!entry_date){
			$('input#add_client_entry_date').focus();
			return false;
		}
		if(!client_name){
			$('input#add_client_name').focus();
			return false;
		}
		$('div#add_new_client').modal('hide');

		
		$.ajax({
			type: "POST",
			url: base_url+'Action_service/addNewBusinessPartner',
			data: {bp_added_date:entry_date, bp_name:client_name, bp_tran_type:tran_type, bp_linked_subject_id:linked_sub_id, bp_cost_type: cost_type,bp_bank:bank_id},
			success: function(data) {
				window.top.location=window.top.location;
			},
			error: function() {
				// alert('Something Error');
			}
		});

		
	});



	//subject_options------------------add edit delete--------------------------------------------------------------------------------------------
	$('button#subject_options').click(function(){
		$('div#subject_options_1').modal('show');
	});

	$('input[name="sub_type"]').click(function(){
		if(this.value=='expense'){
			$('div#inc_sub_name_input_area').hide();
			$('div#exp_sub_name_input_area').show();
		}else{
			$('div#exp_sub_name_input_area').hide();
			$('div#inc_sub_name_input_area').show();
		}
	});

	$('button#save_subject').click(function(){
		if($('input[name="sub_type"]:checked').val()){
			if($('input[name="sub_type"]:checked').val()=='income'){
				var sub_name = $('input#inc_sub_name').val();
				var sub_type = $('input[name="sub_type"]:checked').val();
			}else{
				var sub_name = $('input#exp_sub_name').val();
				var sub_type = $('input[name="sub_type"]:checked').val();
			}
			if(sub_name){
					$('div#add_subject_1').modal('hide');
					addNewSubject(sub_name, sub_type);
			}else{
				if($('input[name="sub_type"]:checked').val()=='income'){
					$('input#inc_sub_name').focus();
				}else{
					$('input#exp_sub_name').focus();
				}
			}

		}else{
			return false;
		}
	});

	function addNewSubject(sub_name, sub_type){
		$.ajax({
			type: "POST",
			url: base_url+'Action_service/addNewSubject',
			data: {sub_name:sub_name, sub_type:sub_type},
			success: function(data) {
				$('span#write_subject').text(sub_name);
				$('div#subject_added_mgs').modal('show');
				opener.location.reload();
			},
			error: function() {
				// alert('Something Error');
			}
		});
	}


	//edit_delete subject with view--------------------------------------------------------------------------------------------
	$('button.btn_subject_list').click(function(){
		$('div#subject_options_1').modal('hide');
		var btn_type = $(this).data('type');
		$.ajax({
			type: "POST",
			url: base_url+'home/getSubjectListByType',
			data: {sub_type:btn_type},
			success: function(data) {
				var myData = JSON.parse(data);
		        var sub_content = '';
		        if(btn_type=='income'){
		        	var sub_cat = '売上科目';
		        }else{
		        	var sub_cat = '費用科目';
		        }

		        sub_content+='<div data-sub_cat="'+sub_cat+'" class="popup" id="subject_'+btn_type+'" style="right: 15px; width: 350px; background: rgb(254, 255, 214); max-height: 670px; border: 3px solid black; overflow-y: auto; display: block;">';
		        sub_content+='<div style="border: 1px solid #b7b7b7; width: 100%; font-size: 18px; text-align: center; padding: 4px 4px;">'+sub_cat+' <button id="close_sub_div" class="btn btn-danger btn-xs pull-right">戻る</button> </div>';
		        for(i=0;i<myData.length; i++){
		        	sub_content += '<div id="edit_subject" data-sub_id="'+myData[i]['id']+'" style="cursor: pointer; padding-left: 8px; font-size: 17px; border: 1px solid #b7b7b7; width: 50%; float: left;" >'+myData[i]['sub_name']+'</div>';
		        }
		        sub_content +='</div>';
		        $('div#ajax_content').html(sub_content);
		        $('div#subject_'+btn_type).show();
			},
			error: function() {
				// alert('Something Error');
			}
		});

	});

	$('select#add_client_tran_type').on('change', function() {

		if( this.value == 1){
			$('tr#bankSelectSection').show();
			$('select#add_client_bank_id').html($('div#bank_list_content').html());
			return false;
		}else{
			$('tr#bankSelectSection').hide();
			$('select#add_client_bank_id').html('');
			$('select#add_client_bank_id').val('');
			return false;
		}

		//Roy added
	});


	 $(document).on("click","button#close_sub_div",function() {
        $('div#subject_income').hide();
        $('div#subject_expense').hide();
        $('div#subject_options_1').modal('show');
    });


	 $(document).on("click","div#edit_subject",function() {
	 	$(this).closest('div.popup').hide();
        var sub_cat = $(this).closest('div.popup').data('sub_cat');
        var sub_id = $(this).data('sub_id');
        var subject = $(this).text();

		var reservedSubject = ['売上', 'その他売上','原価消耗品','原価処理費','給与手当','賞与','福利厚生費','旅費交通費','賃借料','水道光熱費','広告宣伝費','事務用品費','接待交際費','保守修繕費','配送費','外注費'];

		if(jQuery.inArray(subject, reservedSubject) !== -1){
			alert('予約済みの件名');
		}else{
			$('span#write_subject_cat').text(sub_cat);
			$('td#old_sub_name').text(subject);
			$('input#subject_id_for_edit').val(sub_id);
			$('input#new_sub_name').attr('placeholder', sub_cat+'（損益科目）名');
			$('div#subject_edit_1').modal('show');
		}
		
		// if((subject != 'その他収入') && (subject != '原価・買掛支払')){
		// 	$('span#write_subject_cat').text(sub_cat);
		// 	$('td#old_sub_name').text(subject);
		// 	$('input#subject_id_for_edit').val(sub_id);
		// 	$('input#new_sub_name').attr('placeholder', sub_cat+'（損益科目）名');
		// 	$('div#subject_edit_1').modal('show');
		// }else{
		// 	alert('予約済みの件名');
		// }

    });

	$('button#exit_subject_edit').click(function(){
	 	$('div#ajax_content').find('div.popup').show();
    });


    $('button#edit_subject_submit').click(function(){
	 	var sub_name =  $('input#new_sub_name').val();
	 	var sub_id =  $('input#subject_id_for_edit').val();
	 	if(!sub_name){
	 		$('input#new_sub_name').focus();
	 		return false;
	 	}
	 	$('div#subject_edit_1').modal('hide');
	 	$.ajax({
			type: "POST",
			url: base_url+'Action_service/updateSubject',
			data: {sub_name:sub_name, sub_id:sub_id},
			success: function(data) {
				$('span#write_up_subject').text(sub_name+' を更新しました。');
				$('div#subject_update_mgs').modal('show');
				opener.location.reload();
			},
			error: function() {
				// alert('Something Error');
			}
		});
    });


    $('button#delete_subject_submit').click(function(){
	 	var sub_id =  $('input#subject_id_for_edit').val();
	 	var sub_name = $('td#old_sub_name').text();
	 	$('div#subject_edit_1').modal('hide');
	 	$.ajax({
			type: "POST",
			url: base_url+'Action_service/deleteSubject',
			data: {sub_id:sub_id},
			success: function(data) {
				$('span#write_up_subject').text(sub_name+' を削除しました。');
				$('div#subject_update_mgs').modal('show');
				opener.location.reload();
			},
			error: function() {
				// alert('Something Error');
			}
		});
    });





	function number_format(str){
		return str.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}






});