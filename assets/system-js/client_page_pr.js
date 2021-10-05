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
	
	//set client to tranjection page
	
	$('button#client').click(function(){


		
		$('div#home2').hide();

		var id_client = $(this).data('id_client');
		var client_name = $(this).data('client_name');
		var sub_name = $(this).data('sub_name');
		var tran_type = $(this).data('tran_type');
		var cost_type = $(this).data('cost_type');
		var client_type = $(this).data('client_type');

		$('span#clientName').text(client_name);
		$('div#home1').hide();
		$('div#home5').removeClass('hide');
		$('div#home5').show();

		$("button#client").each(function() {
			if($(this).hasClass('ajaxClass')){
				$(this).removeClass('ajaxClass')
			 }
		});
		$(this).addClass('ajaxClass');		

		$.ajax({
			type: "POST",
			url: base_url+'Report/getHeadClientWise',
			data: {id_client:id_client },
			success: function(data) {
				var jsn = JSON.parse(data);

				// console.log(jsn)

				var id_head_ar = [];
				jQuery.each(jsn, function( i, val ) {
					if(val.id_head == 3 || val.id_head == 16 ){
						
						
						$('span#statementName').text(val.head_title);
						$('#clientJournal').val(val.id_head);
						id_head_ar.push(val.id_head);
					}
				});
				$(".link_btn").each(function() {

					if($(this).hasClass('ajaxClass')){
						$(this).removeClass('ajaxClass')
					 }

					for(var i=0; i<id_head_ar.length; i++){
						var name = id_head_ar[i];
						if(name == $(this).data('id')){
							$(this).addClass('ajaxClass');
						  break;
						}
					  }
				});
			},
			error: function() {
				alert('Something Error');
			}
		});

		

		$('#clientJournal').click(function() {

			var head_id = $(this).val();
			var from_date = $('input#from_date').val();
			var to_date = $('input#to_date').val();

			// $('#home5').hide();
			// $('#home2').removeClass('hide');
			// $('#home2').show();
			
			// $('#okButton').click(function() {
				if(head_id){
					window.location.replace(base_url+'report/management_table/'+head_id+'/general/'+from_date+'/'+to_date+'/from_bs/'+id_client);
				}
			// })
			
		});
	
		

		$('button.ms_btn, tr.link_btn').click(function(){
			var ttl = $(this).closest('tr').data('title');
			var action_type = $(this).closest('tr').data('action');
			var head_id = $(this).closest('tr').data('id');
			var from_date = $('input#from_date').val();
			var to_date = $('input#to_date').val();

			console.log(head_id,id_client,from_date,to_date,ttl);
			$('span#statementName').text(ttl);
			
			$('#home5').hide();
			$('#home2').removeClass('hide');
			$('#home2').show();
			
	
			$('#okButton').click(function() {
				if(action_type=='cash'){
						
					window.location.replace(base_url+'report/management_table/'+head_id+'/general/'+from_date+'/'+to_date+'/from_bs/'+id_client);
				}
				
				if(action_type=='bank_bal'){
					
					window.location.replace(base_url+'report/management_table/'+head_id+'/general/'+from_date+'/'+to_date+'/from_bs/'+id_client);
				}
		
				if(action_type=='lib_loan'){
					
					window.location.replace(base_url+'report/management_table/'+head_id+'/general/'+from_date+'/'+to_date+'/from_bs/'+id_client);
				}
		
				if(action_type==0){
					window.location.replace(base_url+'report/management_table/'+head_id+'/general/'+from_date+'/'+to_date+'/from_bs/'+id_client);
				}
		
				if(action_type=='cf_profit'){
					window.location.replace(base_url+'report/house_hold_acc_book/'+from_date+'/'+to_date+'/from_bs');
				}
			})
			
			
		});



		

		// if(typeof client_type == 'undefined'){
		// 	console.log("ok");
		// 	// popitup(base_url+'report/journal/'+id_client);
		// }else{
			
			// $.ajax({
			// 	type: "POST",
			// 	url: base_url+'Report/getHeadClientWise',
			// 	data: {id_client:id_client },
			// 	success: function(data) {
			// 		var rec = '';
			// 		var pay = '';
			// 		var parse = JSON.parse(data)
			// 		if(data){
	
			// 			// console.log(parse)
						
			// 			var i;
			// 			for (i = 0; i < parse.length; i++) {
			// 				if(parse[i].head_cat == 'asset' && parse[i].head_sub_cat == 'current_asset' && parse[i].action == '0'){
								
	
			// 					rec +=`<li class="list-group-item" style="border: none">
			// 						<a class="journalTable" href="#" data-id="`+parse[i].id_head+`" data-action="`+parse[i].action+`">`+parse[i].head_title+`</a>
			// 					</li>`;
			// 				}
			// 				if(parse[i].head_cat == 'liabilities' && parse[i].head_sub_cat == 'accounts_payable'){
			// 					pay +=`<li class="list-group-item" style="border: none">
			// 						<a class="journalTable" href="#" data-id="`+parse[i].id_head+`" data-action="`+parse[i].action+`">`+parse[i].head_title+`</a>
			// 					</li>`;
			// 				}
			// 			}
			// 			$('#incomeList').html(rec);
			// 			$('#expenseList').html(pay);
	
			// 			$('.journalTable').click(function(e){
			// 				event.preventDefault();
			// 				var id_head = $(this).data('id');
							
			// 				popitup(base_url+'report/journal/'+id_client+'/'+id_head);
			// 			});
	
			// 			return false;
			// 		}
			// 		alert('Something Error');
			// 	},
			// 	error: function() {
			// 		alert('Something Error');
			// 	}
			// });

		// }
		// if(client_type=='income'){
		// 	$('#expenseList').hide();
		// 	$('#incomeList').show();
		// }

		// if(client_type=='expense'){
		// 	$('#incomeList').hide();
		// 	$('#expenseList').show();
		// }
	});


	$('button.ms_btn, tr.link_btn').click(function(){
		var action_type = $(this).closest('tr').data('action');
		var head_id = $(this).closest('tr').data('id');
		var from_date = $('input#from_date').val();
		var to_date = $('input#to_date').val();

		if(action_type=='cf_profit'){
			window.location.replace(base_url+'report/house_hold_acc_book/'+from_date+'/'+to_date+'/from_bs');
		}
		
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
			data: {id_client:id_client, client_name:client_name, tran_type:tran_type, cost_type:cost_type, entry_date:entry_date,linked_sub_id:linked_sub_id },
			success: function(data) {
				opener.location.reload();
				window.top.location=window.top.location;
			},
			error: function() {
				alert('Something Error');
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
				alert('Something Error');
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
			data: {bp_added_date:entry_date, bp_name:client_name, bp_tran_type:tran_type, bp_linked_subject_id:linked_sub_id, bp_cost_type: cost_type},
			success: function(data) {
				window.top.location=window.top.location;
			},
			error: function() {
				alert('Something Error');
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
				alert('Something Error');
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
				alert('Something Error');
			}
		});

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
				alert('Something Error');
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
				alert('Something Error');
			}
		});
    });












});