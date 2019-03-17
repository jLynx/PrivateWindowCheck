let PrivateWindow = new Promise(function (resolve, reject) {
	try {
		if(navigator.userAgent.includes("Firefox")){
			//Firefox
			var db = indexedDB.open("test");
			db.onerror = function(){resolve(true);};
			db.onsuccess =function(){resolve(false);};
		}  else if(navigator.userAgent.includes("Edge") || navigator.userAgent.includes("Trident") || navigator.userAgent.includes("msie")){
			//Edge or IE
			if(!window.indexedDB && (window.PointerEvent || window.MSPointerEvent))
				resolve(true);
			resolve(false);
		}  else {	//Normally ORP or Chrome
			//Other
			const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
			if (!fs) resolve(null);
			else {
				fs(window.TEMPORARY, 100, function(fs) {
					resolve(false);
				}, function(err) {
					resolve(true);
				});
			}
		}
	}
	catch(err) {
		console.log(err);
		resolve(null);
	}
});

function isPrivateWindow(callback) {
	PrivateWindow.then(function(is_private) {
		console.log(is_private);
		callback(is_private);
	});
}
