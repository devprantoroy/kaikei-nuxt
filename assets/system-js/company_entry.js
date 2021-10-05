$(document).ready(function(){

	var base_url = $('input#base_url').val();
	var this_td;

	//control client entry screen
	$('button#show_new_client_entry').click(function(){

		
		if( $('div#new_client_reg').is(":visible") ){
			$('div#new_client_reg').fadeOut('fast');
		}else{
			// $('input#bp_added_date').val('');
			$('input#bp_name').val('');
			$('input#bp_linked_subject_id').val('');
			$('input#bp_linked_subject').val('');
			$('td#write_income_type').text('');
			$('td#write_expense_type').text('');
			$('select#bp_tran_type').prop('selectedIndex',0);
			$('select#bp_cost_type').prop('selectedIndex',0);
			$('div#new_client_reg').fadeIn('fast');
			//window.scrollBy(0,180);
		}
	});




	$('input#bp_linked_subject').click(function(){
		this_td = $(this).closest('td');

		if( $(this_td).closest('tr').find('input#bp_name').val() ){
			$('span#bp_choose_bp_name').text($(this_td).closest('tr').find('input#bp_name').val());
			$('div#bp_choose_subject_type').show();
		}else{
			alert('取引先	 入力してください');
			$(this_td).closest('tr').find('input#bp_name').focus();
		}
	});

	//bp_choose_sub_list_income
	$('div#bp_choose_sub_list_income').click(function(){
		$(this_td).closest('tr').find('input#bp_linked_subject').val($(this).data('name'));
		$(this_td).closest('tr').find('input#bp_linked_subject_id').val($(this).data('sub_id'));
		$(this_td).closest('tr').find('td#write_income_type').text('');
		$(this_td).closest('tr').find('td#write_expense_type').text('');
		$(this_td).closest('tr').find('td#write_income_type').text('収入');
		$('div#income_subject_list').hide();
	});
	//bp_choose_sub_list_expense
	$('div#bp_choose_sub_list_expense').click(function(){
		$(this_td).closest('tr').find('input#bp_linked_subject').val($(this).data('name'));
		$(this_td).closest('tr').find('input#bp_linked_subject_id').val($(this).data('sub_id'));
		$(this_td).closest('tr').find('td#write_income_type').text('');
		$(this_td).closest('tr').find('td#write_expense_type').text('');
		$(this_td).closest('tr').find('td#write_expense_type').text('支出');
		$('div#expense_subject_list').hide();
	});


	$('button#save_bp').click(function(){
		var bp_added_date = $(this).closest('tr').find('input#bp_added_date').val();
		var bp_name = $(this).closest('tr').find('input#bp_name').val();
		var bp_tran_type = $(this).closest('tr').find('select#bp_tran_type').val();
		var bp_linked_subject_id = $(this).closest('tr').find('input#bp_linked_subject_id').val();
		var bp_cost_type = $(this).closest('tr').find('select#bp_cost_type').val();

		

		//form validatation
		if(!bp_added_date){
			$(this).closest('tr').find('input#bp_added_date').focus();
			return false;
		}
		if(!bp_name){
			$(this).closest('tr').find('input#bp_name').focus();
			return false;
		}
		if(!bp_linked_subject_id){
			$(this).closest('tr').find('input#bp_linked_subject').focus();
			return false;
		}
		if(bp_added_date && bp_name && bp_tran_type && bp_linked_subject_id && bp_cost_type){
			addNewBusinessPartner(bp_added_date, bp_name, bp_tran_type, bp_linked_subject_id, bp_cost_type);
			//clear form data
			$(this).closest('tr').find('input#bp_added_date').val('');
			$(this).closest('tr').find('input#bp_name').val('');
			$(this).closest('tr').find('input#bp_linked_subject_id').val('');
			$(this).closest('tr').find('input#bp_linked_subject').val('');
			$(this).closest('tr').find('td#write_income_type').text('');
			$(this).closest('tr').find('td#write_expense_type').text('');

			$(this).closest('tr').find('select#bp_tran_type').prop('selectedIndex',0);
			$(this).closest('tr').find('select#bp_cost_type').prop('selectedIndex',0);
		}
	});

	function addNewBusinessPartner(bp_added_date, bp_name, bp_tran_type, bp_linked_subject_id, bp_cost_type,bp_bank = null){
		//console.log(bp_added_date+'--'+bp_name+'--'+bp_tran_type+'--'+bp_linked_subject_id+'--'+bp_cost_type);

		
		if(bp_bank != null){
			$.ajax({
				type: "POST",
				url: base_url+'Action_service/addNewBusinessPartner',
				data: {bp_added_date:bp_added_date, bp_name:bp_name, bp_tran_type:bp_tran_type, bp_linked_subject_id:bp_linked_subject_id, bp_cost_type: bp_cost_type,bp_bank: bp_bank},
				success: function(data) {
					console.log(data);
					$('div#added_client_success').show();
				},
				error: function() {
					alert('Something Error');
				}
			});
		}else{
			$.ajax({
				type: "POST",
				url: base_url+'Action_service/addNewBusinessPartner',
				data: {bp_added_date:bp_added_date, bp_name:bp_name, bp_tran_type:bp_tran_type, bp_linked_subject_id:bp_linked_subject_id, bp_cost_type: bp_cost_type},
				success: function(data) {
					
					$('div#added_client_success').show();
				},
				error: function() {
					alert('Something Error');
				}
			});
		}
	
	}









	//for passbook
	$('button#save_bp_bank').click(function(){
		var bp_added_date = $(this).closest('tr').find('input#bp_added_date').val();
		var bp_name = $(this).closest('tr').find('input#bp_name').val();
		var bp_bank = $(this).closest('tr').find('select#bp_bank_id').val();
		var bp_tran_type = '1';
		var bp_linked_subject_id = $(this).closest('tr').find('input#bp_linked_subject_id').val();
		var bp_cost_type = $(this).closest('tr').find('select#bp_cost_type').val();

		
		
		//form validatation
		if(!bp_added_date){
			$(this).closest('tr').find('input#bp_added_date').focus();
			return false;
		}
		if(!bp_name){
			$(this).closest('tr').find('input#bp_name').focus();
			return false;
		}
		if(!bp_linked_subject_id){
			$(this).closest('tr').find('input#bp_linked_subject').focus();
			return false;
		}
		

		if(bp_added_date && bp_name && bp_tran_type && bp_linked_subject_id && bp_cost_type){
			addNewBusinessPartner(bp_added_date, bp_name, bp_tran_type, bp_linked_subject_id, bp_cost_type, bp_bank);
			//clear form data
			$(this).closest('tr').find('input#bp_added_date').val('');
			$(this).closest('tr').find('input#bp_name').val('');
			$(this).closest('tr').find('input#bp_linked_subject_id').val('');
			$(this).closest('tr').find('input#bp_linked_subject').val('');
			$(this).closest('tr').find('td#write_income_type').text('');
			$(this).closest('tr').find('td#write_expense_type').text('');

			$(this).closest('tr').find('select#bp_tran_type').prop('selectedIndex',0);
			$(this).closest('tr').find('select#bp_cost_type').prop('selectedIndex',0);
		}
	});





});