(function ($) {
	function DataCenter() {
			
	}

	//NOTE: provide all the ajax interface here
	$.extend(DataCenter.prototype, {
        //获取url中的参数
		getQueryString: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        //获取父级url的参数
        getFatherQueryString: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.parent.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        //判断是否为正整数
        isPositiveNum: function (s){
            var re = /^[0-9]*[1-9][0-9]*$/;
            return re.test(s);
        },
        //判断是否为正实
        isJdmoney: function(money){
            var t=/^\d+(\.\d+)?$/; 
            return t.test(money) 
        }

	});

	$.getComming = function () {
		return new DataCenter();
	};

})(jQuery);
