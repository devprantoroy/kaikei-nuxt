localStorage['window']='no';
function popitup(url) {
	localStorage['window']='yes';
	var h = screen.height-90;
	var w = screen.width-0;
	newwindow=window.open(url,'name','scrollbars=yes,resizable=yes,top=0,left=0,width='+w+',height='+h);
	if (window.focus) {newwindow.focus()}
	return false;


	// $(body).load(url);
}

function popup_half(url) {
	if(localStorage['window']=='yes'){
		newwindow.close();
	}
	var h = screen.height-175;
	var w = screen.width-370;
	newwindow=window.open(url,'name','scrollbars=yes,resizable=yes,top=65,left=400,width='+w+',height='+h);
	if (window.focus) {newwindow.focus()}
	return false;
}