var bar_flag=false;
function check(table_id,data,tab){
	if(tab.url.indexOf("about:")==0){
		browser.pageAction.hide(table_id);
	}else{
		browser.pageAction.show(table_id);
	}

	var gettingItem = browser.storage.local.get('show_position');
	gettingItem.then(function(item){
		if(item['show_position']=='bar'){
			browser.pageAction.setPopup({
				tabId: table_id,
				popup: "popup/popup.html"
			});
			bar_flag = true;
		}else{
			bar_flag = false;
		}
	},function(){
		bar_flag = false;
	});
}
function draw(str){
	browser.tabs.insertCSS(null,{file:'qrcoder_css.css'});
	browser.tabs.executeScript(null,{code: "var qr_text=\'"+str+"\';"});
	browser.tabs.executeScript(null,{file: "codePanel.js"});
}
function chkExecOK(successFunc,errorFunc){
	var executing = browser.tabs.executeScript(null,{code: "var qrcoder_test=\'\';"});
	executing.then(successFunc,errorFunc);
}

browser.tabs.onUpdated.addListener(check);

browser.menus.create({
	id: "url_qr",
	title: browser.i18n.getMessage('menu_address'),
	contexts: ["all"]
});

browser.menus.create({
	id: "link_qr",
	title: browser.i18n.getMessage('menu_link'),
	contexts: ["link"]
});

browser.menus.create({
	id: "img_qr",
	title: browser.i18n.getMessage('menu_image'),
	contexts: ["image"]
});

browser.menus.create({
	id: "text_qr",
	title: browser.i18n.getMessage('menu_text'),
	contexts: ["selection"]
});

browser.menus.onClicked.addListener(function(info, tab) {
	chkExecOK(null,function(){
		browser.notifications.create({
			"type": "basic",
			"iconUrl": browser.extension.getURL("images/icon.png"),
			"title": browser.i18n.getMessage('show_error_title'),
			"message": browser.i18n.getMessage('show_error'),
			});
			notifications.show();
	});
	var qr_text="";
	if (info.menuItemId == "url_qr") qr_text = info.pageUrl;
	else if(info.menuItemId == "link_qr") qr_text = info.linkUrl;
	else if(info.menuItemId == "img_qr") qr_text = info.srcUrl;
	else if(info.menuItemId == "text_qr") qr_text = info.selectionText;
	if(bar_flag){
		browser.tabs.executeScript(null,{code: "var to_popup_text=\'"+qr_text+"\';"});
		browser.pageAction.openPopup();
	}else{
		draw(qr_text);
	}
});

browser.pageAction.onClicked.addListener(function(tab){
	// if select bar in option, this function not work.
	chkExecOK(null,function(){
		browser.notifications.create({
			"type": "basic",
			"iconUrl": browser.extension.getURL("images/icon.png"),
			"title": browser.i18n.getMessage('show_error_title'),
			"message": browser.i18n.getMessage('show_error'),
			});
			notifications.show();
	});
	draw(tab.url);
});