document.addEventListener('DOMContentLoaded', function () {
	var queryInfo = {
		active: true,
		currentWindow: true
	};
	browser.tabs.query(queryInfo, function(tabs) {
		show_popup(tabs[0].url,false);
	});
});