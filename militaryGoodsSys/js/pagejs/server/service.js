(function ($) {
	function DataCenter() {
		this._ajax = function (type, subUrl, data, success, error, context) {
			var _options = {
				type: type,
				url: subUrl,
				dataType: 'json',
				success: success,
				error: error,
				data: data
			};

			if(_options.type.toUpperCase() == "GET") {
				_options.url += ((_options.url.indexOf("?") > -1 ? "" : "?") + "&_t=" + (new Date).getTime());
			}

			if(context) {
				_options.context =  context;
			}

      		return $.ajax(_options);
		};

		this._get = function (url, data, success, error, context) {
			return this._ajax("GET", url, data, success, error, context);
		};

		this._post = function (url, data, success, error, context) {
			return this._ajax("POST", url, data, success, error, context);	
		};

		this._put = function(url, data, success, error, context) {
			var defaults = { _method: "put" };
			defaults = $.extend(defaults, data);
			return this._post(url, defaults, success, error, context);
		};

		this._delete = function(url, data, success, error, context) {
			var defaults = { _method: "delete" };
			defaults = $.extend(defaults, data);
			return this._post(url, defaults, success, error, context);
		};		
	}

	//NOTE: provide all the ajax interface here
	$.extend(DataCenter.prototype, {
		getIndex_v1Info: function (userid, success, error, context) {
            var url = "../../websrvZniot/statis?userId="+userid;
			return this._get(url, {}, success, error, context);
		},
		getRoomInfo: function (userid, success, error, context) {
			var url = "../../websrvZniot/versir?userId="+userid;
			return this._get(url, {}, success, error, context);
		},
        getItemsInfo: function (userid, success, error, context) {
			var url = "../../websrvZniot/chopsur?userId="+userid;
			return this._get(url, {}, success, error, context);
		},
        getStromsInfo: function (data, success, error, context) {
			var url = "../../websrvZniot/stroms";
			return this._get(url, data, success, error, context);
		},
        addStromsInfo: function (data, success, error, context) {
			var url = "../../websrvZniot/strmgr";
			return this._post(url, data, success, error, context);
		}
	});

	$.getDataCenterIntance = function () {
		return new DataCenter();
	};

})(jQuery);
