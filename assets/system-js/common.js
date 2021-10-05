$(document).ready(function(){
    
    $('[data-toggle="tooltip"]').tooltip();
    //ajax loading
    $(document).ajaxStart(function(){
        $("div#ajax_loading").css("display", "block");
    });
    $(document).ajaxComplete(function(){
        $("div#ajax_loading").css("display", "none");
        $('[data-toggle="tooltip"]').tooltip(); 
    });


    try{
        remove_amount_backspace('tran_income');
        remove_amount_backspace('tran_expense');
    }catch(e){
    
    }
    try{
        remove_amount_backspace('pb_tran_expense');
        remove_amount_backspace('pb_tran_income');
    }catch(e){
    
    }
    try{
        remove_amount_backspace('ms_income');
        remove_amount_backspace('ms_expense');
    }catch(e){
    
    }

   
    

    
  

    function remove_amount_backspace(idName){
        var el = document.getElementById(idName); 
        el.addEventListener('keydown', function(event) { 
            const key = event.key; 
            if (key === "Backspace" || key === "Delete") { 
                document.getElementById(idName).value = '';
            } 
        });  
        return true;
    }
    


    window.history.forward(1);





//end of js
});












