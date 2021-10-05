$(document).ready(function(){
	var base_url = $('input#base_url').val();

	$('.container-fluid').on('click',function(){
		
		$('div#settlement_execution').hide();
	});

	
	$('div#balanceSheetPageLeftNavi').show();
	$('div#balanceSheetPageLeftNavi').removeClass('hide');
	$('tr.borrowing-allowance').hide();
	$('tr.unpaid-allowance').show();
	$('div#settlement_execution').show();

	$('button#statement').click(function(){
		$('div#balanceSheetPageStatement').modal('show');
		$('tr.borrowing-allowance').show();
		$('div#settlement_execution').hide();
		$('div#balanceSheetPageLeftNavi').hide();
	});

	$('.reserveClick').on('click',function(){
		$('div#balanceSheetPageLeftNavi').hide();
		$('div#settlement_execution').hide();
		$("#reserveClickNavi").removeClass('hide');
	});


//---------unpaid-allowance popup control-------------------------------------------------------
	// $('button#unpaid-allowance').click(function(){
	// 	$('tr.unpaid-allowance').show();
	// 	$('div#settlement_execution').show();
	// 	$('div#balanceSheetPageLeftNavi').show();
	// 	$('div#balanceSheetPageLeftNavi').removeClass('hide');
	// 	localStorage['unpaid_allowance_sts']=1;
	// });
	// $('button#unpaid-allowance_exit').click(function(){
	// 	$('tr.unpaid-allowance').hide();
	// 	$('div#settlement_execution').hide();
	// 	// $('div#balanceSheetPageLeftNavi').hide();
	// 	localStorage['unpaid_allowance_sts']=0;
	// });

	// if(localStorage['unpaid_allowance_sts']==1){
	// 	$('tr.unpaid-allowance').show();
	// 	$('div#settlement_execution').show();
	// 	$('div#balanceSheetPageLeftNavi').show();
	// 	$('div#balanceSheetPageLeftNavi').removeClass('hide');
	// }else{
	// 	$('tr.unpaid-allowance').hide();
	// 	$('div#settlement_execution').hide();
	// 	// $('div#balanceSheetPageLeftNavi').hide();
	// }
//---------unpaid-allowance popup control-------------------------------------------------------



//---------Navigate to management_sheet---------------------------------------------------------
	$('button.ms_btn, tr.link_btn').click(function(){
		var action_type = $(this).closest('tr').data('action');
		var head_id = $(this).closest('tr').data('id');
		var from_date = $('input#from_date').val();
		var to_date = $('input#to_date').val();


		// console.log(action_type);
		


		if(action_type=='cash'){
					
			window.location.replace(base_url+'report/management_table/'+head_id+'/general/'+from_date+'/'+to_date+'/from_bs');
		}
		
		if(action_type=='bank_bal'){
			
			window.location.replace(base_url+'report/management_table/'+head_id+'/general/'+from_date+'/'+to_date+'/from_bs');
		}

		if(action_type=='lib_loan'){
			
			window.location.replace(base_url+'report/management_table/'+head_id+'/general/'+from_date+'/'+to_date+'/from_bs');
		}

		if(action_type==0){
			window.location.replace(base_url+'report/management_table/'+head_id+'/general/'+from_date+'/'+to_date+'/from_bs');
		}

		if(action_type=='cf_profit'){
			window.location.replace(base_url+'report/house_hold_acc_book/'+from_date+'/'+to_date+'/from_bs');
		}



		
	});





//---------BS report period settings---------------------------------------------------------
	var from_date = localStorage['bs_prd_from_date'];
	var to_date = localStorage['bs_prd_to_date'];
	$('input#from_bs_preiod_date').val(from_date);
	$('input#to_bs_preiod_date').val(to_date);
	$('span#from_date_write').text(from_date);
	$('span#to_date_write').text(to_date);
	
	if(localStorage['settlement_popup_sts']=='show'){
		$('div#settlement_popup_0').show();
	}

	$('button#settlement_popup_0_yes').click(function(){
		localStorage['settlement_popup_sts']='hide';
		// do few change in parent window.
	});

	var lastday = function(y,m){
		return  new Date(y, m, 0).getDate();
	}

	//onchange to from_bs_preiod_date
	$('input#from_bs_preiod_date').on('change keyup paste', function () {
		//$('div#select_date_ins').hide();
	   	var f_date = $(this).val()+'01';
	   	setTimeout(function() {
	   		$('input#from_bs_preiod_date').val(f_date);
    	}, 30);

    	var date = $(this).val();
    	var to_date;
    	var month = date.slice(5, -1);
	   	var year = date.slice(0, -4);
	   	var day;

	   	month= parseInt(month)-1;
	   	if(month<10){
	   		month='0'+month;
	   	}

	   	if(month==0){
	   		year=year;
	   		month=12;
	   		day=lastday(year,month);
	   		to_date=year+'/'+month+'/'+day;

	   	}else{
	   		year= parseInt(year)+1;
	   		month=month;
	   		day=lastday(year,month);
	   		to_date=year+'/'+month+'/'+day;
	   	}
	   	$('input#to_bs_preiod_date').val(to_date);

	   	setTimeout(function() {
	   		fatchPiscle();
    	}, 50);
	   	
	});


	var fatchPiscle =  function () {
	   	if( $('input#from_bs_preiod_date').val() ){
	   		$('input#from_date_write').val($('input#from_bs_preiod_date').val())
	   		$('input#to_date_write').val($('input#to_bs_preiod_date').val())
	   		$('div#settlement_popup_1').hide();
	   		$('div#settlement_popup_2').show();
	   	}
	};


	$('button#settlement_popup_2_confirm').on('click', function () {
		$('span#from_date_write').text($('input#from_bs_preiod_date').val());
   		$('span#to_date_write').text($('input#to_bs_preiod_date').val());
	   	$('div#settlement_popup_2').hide();
	   	$('div#settlement_popup_3').show();
		// //from & to


		// console.log($('input#from_bs_preiod_date').val())


	   	localStorage['bs_prd_from_date']=$('input#from_bs_preiod_date').val();
	   	localStorage['bs_prd_to_date']=$('input#to_bs_preiod_date').val();
	});



	// var myEle = document.getElementById("settlement_popup_0");
	// if(myEle){
	// 	$('#settlement_execution').addClass('bottom-150')
	// }

	//------------add new subject-------------------//

	$(document).on('click', '#addTitle', function(){
		$('#subject_options_1').modal('show');
		// $('#addSub').modal('show');

		$('#add_new_title_submit').on('click', function(){
			var title = $('#add_state_name').val();
			var type = $('#add_state_type').val();
			if(type != '' && title != ''){

				// console.log(title,type,base_url);
				// return false;
				$.ajax({
					type: "POST",
					url: base_url+'Action_service/addNewStatementHead',
					data: {head_title:title, head_sub_cat:type},
					success: function(data) {
						opener.location.reload();
						// $('div#added_client_success').show();
					},
					error: function() {
						alert('Something Error');
					}
				});

			}

			
		})
		
	});


	$('.delTitle').on('click', function() {
		var tableID = $(this).data('id');
		$('#delModal').removeClass('hide');
		$('#subject_options_23').modal('hide');
		$('#statementName').text($(this).data('title'));

		
		$('#okButtonDel').on('click', function() {
			console.log(tableID);
			$.ajax({
				type: "POST",
				url: base_url+'Action_service/deleteStatementHead',
				data: {head_id:tableID},
				success: function(data) {
					
					opener.location.reload();
					// $('div#added_client_success').show();
				},
				error: function() {
					alert('Something Error');
				}
			});
	
			
		});
		
	});



	





});