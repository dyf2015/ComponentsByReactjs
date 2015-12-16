var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('./EvaluateDispatcher.js');
var EvaluateConstants = require('./EvaluateConstants.js');
var CHANGE_EVENT = 'change';

var options = {};
var datas = [];
var allDatas = [];

var EvaluateStore = assign({}, EventEmitter.prototype, {
  	getDatas:function() {
        return datas;
    },
    getAllDatas:function() {
        return allDatas;
    },
  	emitChange:function() {
      	this.emit(CHANGE_EVENT);
  	},
  	addChangeListener:function(callback) {
  		this.on(CHANGE_EVENT, callback);
  	},
  	removeChangeListener:function(callback) {
  		this.removeListener(CHANGE_EVENT, callback);
  	}
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case EvaluateConstants.EVALUATE_SAVE:save(action);break;
        case EvaluateConstants.EVALUATE_SEARCH:search(action);break;
        case EvaluateConstants.EVALUATE_SETOPTIONS:setOptions(action);break;
        default:
    }
});

var saving = false;
var sDatas = new Array();

function save(action) {
    var Request = GetRequest();
    var sum = action.sum;
    var nums = action.numArr.join(",");
    var paras = "";
    for(var i=0;i<options.paras4Edit.length;i++) {
        var para = options.paras4Edit[i];
        paras += "&"+para+"="+Request[para];
    }
    //console.log("sum:"+sum);
    //console.log("nums:"+nums);
    //console.log("paras:"+paras);
    /*
    var sdata = new Object();
    sdata.sum = sum;
    sdata.nums = nums;
    sdata.paras = paras;
    sDatas[sDatas.length] = sdata;
    var nowData = sDatas.pop();
    */

    doSave(sum,nums,paras);
}

function doSave(sum,nums,paras) {
    $.ajax({
        type:"POST",
        //async:false,
        url:options.dataUrl,
        data:"&sum="+sum+"&nums="+nums+paras+"&"+options.dataAction,
        success:function(data) {
            //console.log("data:"+data);
        },
        error:function(datas) {
            //alert("对不起，数据加载出错，请联系管理员！");
        },
        dataType: "json"
    });
}

function search(action) {

}

function setOptions(action) {
    options = action.options;
}

function GetRequest() { 
  var url = location.search; //获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}

module.exports = EvaluateStore;