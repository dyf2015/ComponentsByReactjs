var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('./TableDispatcher.js');
var TableConstants = require('./TableConstants.js');
var CHANGE_EVENT = 'change';

var options = {};
var allDatas = [];
var datas = [];
var count = 0;
var loading = false;
var msg = "";
var haveAllData = false;
var page = {
    maxNum:1,
    nowPage:1,
    maxPage:1,
    pageNum:10,
    nowMinNum:1,
    nowMaxNum:1,
    getMaxNum:function() {
        return this.maxNum;
    },
    setMaxNum:function(maxNum) {
        this.maxNum = maxNum;
        this.maxPage = parseInt(this.maxNum/this.pageNum)+(this.maxNum%this.pageNum!=0?1:0); //计算页数
        //console.log("maxPage:"+this.maxPage+" maxNum:"+this.maxNum);
    },
    getNowPage:function() {
        return this.nowPage;
    },
    setNowPage:function(nowPage) {
        this.nowPage = nowPage;
        this.nowMaxNum = this.maxNum<this.nowPage*this.pageNum?this.maxNum:(this.nowPage*this.pageNum);
        this.nowMinNum = this.nowPage>1?(this.nowPage-1)*this.pageNum+1:1;
        //this.nowMinNum = nowMaxNum-pageNum+1;
    },
    getMaxPage:function() {
        return this.maxPage;
    },
    getPageNum:function() {
        return this.pageNum;
    },
    setPageNum:function(pageNum) {
        this.pageNum = pageNum;
    },
    getNowMinNum:function() {
        return this.nowMinNum;
    },
    getNowMaxNum:function() {
        return this.nowMaxNum;
    }
};

var TableStore = assign({}, EventEmitter.prototype, {
  	getDatas:function() {
        if(!haveAllData)
  	        return datas;
        else
            return datas.slice(page.nowMinNum-1,page.nowMaxNum);
    },
    getPage:function() {
        return page;
    },
    getLoading:function() {
        return loading;
    },
    getMsg:function() {
        return msg;
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

function doSearchAll() {
    $.ajax({
        type:"POST",
        //async:false,
        url:options.dataUrl,
        data:$("#"+options.formId).serialize()+"&"+options.dataAction,
        success:function(data) {
              datas = eval("data."+options.dataName);
              allDatas = datas;
              count = eval("data."+options.countName);
              page.setPageNum(options.pageNum);
              page.setMaxNum(count);
              page.setNowPage(1);
              haveAllData = true;
              loading = false;
              TableStore.emitChange(CHANGE_EVENT); //触发回调事件
        },
        error:function(datas) {
            //alert("对不起，数据加载出错，请联系管理员！");
        },
        dataType: "json"
    });
}

function doSearch(min,max,now) {
  	$.ajax({
        type:"POST",
        //async:false,
        url:options.dataUrl,
        data:$("#"+options.formId).serialize()+"&"+options.dataAction+"&min="+min+"&max="+max,
        success:function(data) {
              datas = eval("data."+options.dataName);
              count = eval("data."+options.countName);
              if(count>options.maxSearchNum) {
                  options.quickSearch = false;
              }
              if(!options.quickSearch) {
                  page.setPageNum(options.pageNum);
                  page.setMaxNum(count);
                  page.setNowPage(now);
              }
              haveAllData = false;
              if(!options.quickSearch) {
                  loading = false;
              }
              if(options.quickSearch) {
                  msg = "正在获取数据[所有]...";
                  TableStore.emitChange(CHANGE_EVENT); //触发回调事件
                  doSearchAll();
              }
        },
        error:function(datas) {
            //alert("对不起，数据加载出错，请联系管理员！");
        },
        dataType: "json"
      });
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

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case TableConstants.TABLE_SEARCH:
            loading = true;
            msg = "正在获取数据[第一页]...";
            TableStore.emitChange(CHANGE_EVENT); //触发回调事件
            doSearch(1,page.pageNum,1);
        break;
        case TableConstants.TABLE_GOPAGE:
            loading = true;
            msg = "正在获取数据[分页]...";
            TableStore.emitChange(CHANGE_EVENT); //触发回调事件
            page.setNowPage(action.newPage);
            if(!options.quickSearch)
                doSearch(page.nowMinNum,page.nowMaxNum,action.newPage);
            else {
                loading = false;
                TableStore.emitChange(CHANGE_EVENT); //触发回调事件
            }
        break;
        case TableConstants.TABLE_SEARCHBYKEY:
            if(options.quickSearch) {
                loading = true;
                msg = "正在获取数据[关键字]...";
                TableStore.emitChange(CHANGE_EVENT);
                filter(action.key);
                page.setMaxNum(datas.length);
                page.setNowPage(1);
                loading = false;
                TableStore.emitChange(CHANGE_EVENT);
            }
        break;
        case TableConstants.TABLE_SETOPTIONS:
            options = action.options;
        break;
        default:
    }
});

module.exports = TableStore;