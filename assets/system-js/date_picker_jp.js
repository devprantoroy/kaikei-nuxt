$(document).ready(function(){

    $.fn.datepicker.dates['en'] = {
        days: ["日", "月", "火", "水", "木", "金", "土"],
        daysShort: ["日", "月", "火", "水", "木", "金", "土"],
        daysMin: ["日", "月", "火", "水", "木", "金", "土"],
        months: ["１月", "２月", "３月", "４月", "５月", "６月", "７月", "８月", "９月", "１０月", "１１月  ", "１２月"],
        monthsShort: ["１月", "２月", "３月", "４月", "５月", "６月", "７月", "８月", "９月", "１０月", "１１月 ", "１２月"],
        today: "Today",
        clear: "Clear",
        format: "mm/dd/yyyy",
        titleFormat: "MM yyyy年", /* Leverages same syntax as 'format' */
        weekStart: 0
    };

    //for common
    $('input[name="date"]').datepicker({
        format: 'yyyy/mm/dd',
        autoclose: true,
        todayHighlight: true,
        orientation: "auto",
        useCurrent: false,
    }); 


    //for ms table
    $('input[name="date_ms"]').datepicker({
        format: 'yyyy/mm/dd',
        autoclose: true,
        todayHighlight: true,
        // orientation: "top left",
        useCurrent: false,
    });

    //for common
    $('input[name="month-only"]').datepicker({
        format: "yyyy/mm/",
        viewMode: "months", 
        minViewMode: "months",
        autoclose: true,
        todayHighlight: true,
        orientation: "auto",
        useCurrent: false,
    });



    
//end of doc ready func 
});