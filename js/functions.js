var utils = {
		/**
		 * Gets array of request parameters (key-value pairs)
		 * @param url
		 * @returns {Array}
		 */
		getPageRequestData : function(url) {
			var params = [];
			if (url) {
				var urlParamsPart = url;
				// remove url part with ? and split url on key-value pairs
				if(url.indexOf("?") != -1) {
					urlParamsPart = url.split("?")[1];
					if (typeof(urlParamsPart) !== 'undefined') {
						var parts = urlParamsPart.split('&');	
						for (var i = 0; i < parts.length; i++) {
							var keyVal = parts[i].split('=');
							if (!keyVal[0]) continue;
							params[keyVal[0]] = keyVal[1] || "";
						}
					}
				}
			}
			return params;
		},
		makeUrlParams: function(obj) {
			var result = "";
			for (var key in obj) {
				if (result) {
					result += "&";
				}
				result += key + "=" + obj[key];
			}
			return result ? "?" + result : "";
		},
		isUrl: function(value) {
			var pattern = new RegExp('^' +
				'(?:(?:https?|ftp)://)?' + //protocols
				'(?:\\S+(?::\\S*)?@)?' + //username::password
				'(?:' +
				'(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' + //ip - part 1
				'(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' + //ip - part 2
				'(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' + //ip - part 3
				'|' +
				'(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
				'(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
				'(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
				')?' +
				'(?::\\d{2,5})?' +
				'(?:/\\S*)?' +
				'$',
				'i');
			return pattern.test(value);
		},
		isRecipeUrl: function(value) {
			var pattern = new RegExp('/reteta\/[a-zA-Z0-9-_]*\-[0-9]');
			return pattern.test(value);
		},
		urlToRecipeID: function(value) {			
			var m = /reteta\/[a-zA-Z0-9-_]*\-(\d+)/.exec(value);
			if (typeof(m[1]) !== 'undefined') {
				return parseInt(m[1]);
			}
		},
		in_array: function (what, where) {
			var flag = false;
			for (var i = 0; i < where.length; i++) {
				if (what == where[i]) {
					flag = true;
					break;
				}
			}
			return flag;
		},
		removeFromArray(array, value) {
			for( var i = 0; i < array.length; i++){ 
				if (array[i] == value) {
					array.splice(i, 1); 
				}
			}
		}
}