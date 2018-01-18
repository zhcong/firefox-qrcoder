// init the window
window.onload=function (){
	var show_label_text = browser.i18n.getMessage('show_label_text');
	var page_text = browser.i18n.getMessage('page_text');
	var bar_text = browser.i18n.getMessage('bar_text');
	document.getElementById("show_label").innerHTML = show_label_text + ":&emsp;";
	document.getElementById("page").innerHTML = page_text + ":&emsp;";
	document.getElementById("bar").innerHTML = bar_text;

	document.getElementById("page_value").onclick=function (){
		let options_items = {};
		options_items['show_position'] = "page";
		browser.storage.local.set(options_items);
		document.getElementById("alert").innerHTML = browser.i18n.getMessage('option_alert');
	}
	document.getElementById("bar_value").onclick=function (){
		let options_items = {};
		options_items['show_position'] = "bar";
		browser.storage.local.set(options_items);
		document.getElementById("alert").innerHTML = browser.i18n.getMessage('option_alert');
	}
	load();
}

function load(){
	var gettingItem = browser.storage.local.get('show_position');
	gettingItem.then(function(item){
		if(item['show_position']=='bar'){
			document.getElementById("bar_value").checked=true;
		}else{
			document.getElementById("page_value").checked=true;
		}
	}, null);
}