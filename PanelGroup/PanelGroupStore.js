var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('./PanelGroupDispatcher.js');
var PanelGroupConstants = require('./PanelGroupConstants.js');
var CHANGE_EVENT = 'change';

var options = {};
var datas = [];
var allDatas = [];

var PanelGroupStore = assign({}, EventEmitter.prototype, {
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

function search(action) {
    if(options.dataCustom==null) {
        //console.log("options.dataUrl:"+options.dataUrl);
        //console.log("options.dataAction:"+options.dataAction);
        $.ajax({
            type:"POST",
            //async:false,
            url:options.dataUrl,
            data:options.dataAction,
            success:function(data) {
                //console.log(data);
                /*
                datas = eval("data."+options.dataName);
                allDatas = datas;
                count = eval("data."+options.countName);
                page.setPageNum(options.pageNum);
                page.setMaxNum(count);
                page.setNowPage(1);
                haveAllData = true;
                loading = false;
                */
                datas = data;
                allDatas = data;
                PanelGroupStore.emitChange(CHANGE_EVENT); //触发回调事件
            },
            error:function(datas) {
                alert("对不起，数据加载出错，请联系管理员！");
            },
            dataType: "json"
        });
    }
    else {
        datas = options.dataCustom;
        allDatas = options.dataCustom;
        PanelGroupStore.emitChange(CHANGE_EVENT);
    }
}

function searchByKey(action) {
    filter(action.key);
    PanelGroupStore.emitChange(CHANGE_EVENT);
}

function filter(key) {
    if(key=="") {
        datas = allDatas;
    }
    else {
        datas = [];
        var flag = 0;
        for(var i=0;i<allDatas.length;i++) {
            var data = allDatas[i];
            for(var p in data) {
                if(data[p]) {
                    if(data[p].indexOf(key)>=0) {
                        datas[flag++] = data;
                        break;
                    }
                }
            }
        }
    }
}

function setOptions(action) {
    options = action.options;
    search(action);
}

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case PanelGroupConstants.PANELGROUP_SEARCH:search(action);break;
        case PanelGroupConstants.PANELGROUP_SEARCHBYKEY:searchByKey(action);break;
        case PanelGroupConstants.PANELGROUP_SETOPTIONS:setOptions(action);break;
        default:
    }
});

module.exports = PanelGroupStore;