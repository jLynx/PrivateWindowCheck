function CheckPrivateWindow() {

    let PrivateWindow = new Promise(function (resolve, reject) {
        try {
            if(navigator.userAgent.includes("Firefox")){
                //Firefox
                var db = indexedDB.open("test");
                db.onerror = function(){resolve(true);};
                db.onsuccess =function(){resolve(false);};
            }  else if(navigator.userAgent.includes("Edge") || navigator.userAgent.includes("Trident")){
                //Edge or IE
                if(!window.indexedDB && (window.PointerEvent || window.MSPointerEvent))
                    resolve(true);
                resolve(false);
            // } else if(navigator.userAgent.includes("ORP") || navigator.userAgent.includes("Chrome")) {
            }  else {
                //Other
                const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
                if (!fs) resolve(null);
                else fs(window.TEMPORARY, 100, ()=>resolve(false), ()=>resolve(true));
            }
        }
        catch(err) {
            resolve(null);
        }
    });

    Promise.all([PrivateWindow]).then(function (values) {
        console.log(values[0]);
    });
}

CheckPrivateWindow();
