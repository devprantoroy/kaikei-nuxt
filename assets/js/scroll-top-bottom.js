


// $("div#scroll_area").scroll(function() { 
//     if($("div#scroll_area").scrollTop()  >50 ){
//         $('i#back_bottom').hide();
//         $('i#back_top').show();
//     }else{
//         $('i#back_bottom').show();
//         $('i#back_top').hide();
//     }
// });




function topFunction() {
    $("div#scroll_area").animate({ scrollTop: 0 }, "fast");
		return false;
}
function bottomFunction() {
    $("div#scroll_area").animate({ scrollTop: $('table.scroll_content').height() }, "slow");
		return false;
}