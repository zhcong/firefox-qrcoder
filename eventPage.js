function check(table_id,data,tab){
	if(tab.url.indexOf("about:")==0){
		browser.pageAction.hide(table_id);
	}else{
		browser.pageAction.show(table_id);
	}
}
function draw(str){
	browser.tabs.insertCSS(null,{file:'qrcoder_css.css'});
	browser.tabs.executeScript(null,{file: "codePanel.js"});
	browser.tabs.executeScript(null,{code: "var qr_text=\'"+str+"\';"});
}
function chkExecOK(successFunc,errorFunc){
	var executing = browser.tabs.executeScript(null,{code: "var test=\'\';"});
	executing.then(successFunc,errorFunc);
}

browser.tabs.onUpdated.addListener(check);

browser.contextMenus.create({'title':browser.i18n.getMessage('menu_address'),'contexts':['page'],'onclick':function(info,tab){
	chkExecOK(null,function(){
		browser.notifications.create({
			"type": "basic",
			"iconUrl": browser.extension.getURL("images/icon.png"),
			"title": browser.i18n.getMessage('show_error_title'),
			"message": browser.i18n.getMessage('show_error'),
			});
			notifications.show();
	});
	draw(info.pageUrl);
}});
browser.contextMenus.create({'title':browser.i18n.getMessage('menu_link'),'contexts':['link'],'onclick':function(info,tab){
	chkExecOK(null,function(){
		browser.notifications.create({
			"type": "basic",
			"iconUrl": browser.extension.getURL("images/icon.png"),
			"title": browser.i18n.getMessage('show_error_title'),
			"message": browser.i18n.getMessage('show_error'),
			});
			notifications.show();
	});
	draw(info.linkUrl);
}});
browser.contextMenus.create({'title':browser.i18n.getMessage('menu_text'),'contexts':['selection'],'onclick':function(info,tab){
	chkExecOK(null,function(){
		browser.notifications.create({
			"type": "basic",
			"iconUrl": browser.extension.getURL("images/icon.png"),
			"title": browser.i18n.getMessage('show_error_title'),
			"message": browser.i18n.getMessage('show_error'),
			});
			notifications.show();
	});
	draw(info.pageUrl);
}});
browser.contextMenus.create({'title':browser.i18n.getMessage('menu_image'),'contexts':['image'],'onclick':function(info,tab){
	chkExecOK(null,function(){
		browser.notifications.create({
			"type": "basic",
			"iconUrl": browser.extension.getURL("images/icon.png"),
			"title": browser.i18n.getMessage('show_error_title'),
			"message": browser.i18n.getMessage('show_error'),
			});
			notifications.show();
	});
	draw(info.srcUrl);
}});
browser.pageAction.onClicked.addListener(function(tab){
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