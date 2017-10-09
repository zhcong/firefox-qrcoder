function check(table_id,data,tab){
	if(tab.url.indexOf("addons.mozilla.org") >= 0){
		chrome.pageAction.hide(table_id);
	}else{
		chrome.pageAction.show(table_id);
	}
};
function draw(str,tab){
	chrome.tabs.executeScript(null,{code: "var qr_text=\'"+str+"\'"});
	chrome.tabs.insertCSS(null,{file:'qrcoder_css.css'});
	chrome.tabs.executeScript(null,{file: "codePanel.js"});
}

chrome.tabs.onUpdated.addListener(check);

chrome.contextMenus.create({'title':chrome.i18n.getMessage('menu_address'),'contexts':['page'],'onclick':function(info,tab){
	draw(info.pageUrl,tab);
}});
chrome.contextMenus.create({'title':chrome.i18n.getMessage('menu_link'),'contexts':['link'],'onclick':function(info,tab){
	draw(info.linkUrl,tab);
}});
chrome.contextMenus.create({'title':chrome.i18n.getMessage('menu_text'),'contexts':['selection'],'onclick':function(info,tab){
	draw(info.selectionText,tab);
}});
chrome.contextMenus.create({'title':chrome.i18n.getMessage('menu_image'),'contexts':['image'],'onclick':function(info,tab){
	draw(info.srcUrl,tab);
}});
chrome.pageAction.onClicked.addListener(function(tab){
	draw(tab.url,tab);
});