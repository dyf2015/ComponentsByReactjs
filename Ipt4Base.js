var Ipt4Base = React.createClass({
	getInitialState:function() {
	    return {
	   		show:false,
	   		ids:"",
	   		names:""
	   	}
	},
	show:function(e) {
		this.setState({show:!this.state.show});
	},
	onCheckTree:function(event,treeId,treeNode,msg) {
		var checkedNodes = $.fn.zTree.getZTreeObj(treeId).getCheckedNodes(true);
		var idArr = new Array();
		var nameArr = new Array();
		var flag = 0;
		for(var i=0;i<checkedNodes.length;i++) {
			var node = checkedNodes[i];
			var id = node.id;
			var name = node.name;
			if(id.indexOf(this.props.prefix)==0) {
				id = id.substring(2);
				idArr[flag] = id;
				nameArr[flag] = name;
				flag++;
			}
		}
		var ids = idArr.join(",");
		var names = nameArr.join("、");
		//console.log("ids:"+ids);
		//console.log("names:"+names);
		this.setState({ids:ids,names:names});
	},
	componentDidMount:function() {
		//console.log("this.props.dateUrl:"+this.props.dateUrl);
		//console.log("this.props.otherPara:"+this.props.otherPara);
		var chkStyle = "checkbox";
		if(!this.props.isMult) chkStyle = "radio";
		var zNodes = [{name:"请选择", id:this.props.topPrefix+"0", isParent:true, icon:(this.props.topIconUrl), nocheck:true}];
		var setting = {
			async: {
				enable: this.props.ifAsync,
				url:(this.props.dataUrl),
				autoParam:[this.props.dataKey],
				otherParam:this.props.otherPara,
				type:"post",
				dataType: "json"
			},
			check: {
				enable: this.props.ifCheck,
				chkStyle: chkStyle,
				chkboxType: { "Y": "s", "N": "s" },
				radioType:"all"
			},
			callback: {
				beforeAsync:null,
				onAsyncSuccess:null,
				onAsyncError:null,
				onCheck:this.onCheckTree
			},
			view:{
				showLine:false
			}
		};
		$.fn.zTree.init($('#'+this.props.name),setting,zNodes);
	},
	render:function() {
		var className = "div-downlist"
		if(!this.state.show) {
			className += " hidden";
		}
		return <div>
			   <div onClick={this.show} className="input-group input-group-sm">
				  <input type="text" className="form-control input-sm" placeholder="" value={this.state.names} disabled />
				  <input type="hidden" name={this.props.name} value={this.state.ids} />
				  <span className="input-group-addon">
				  <a className="glyphicon glyphicon-th-large" href="javascript:void(0)"></a>
				  </span>
			   </div>
			   <div className={className}>
			   	   <div id={this.props.name} className="ztree"></div>
			   </div>
			   </div>;
	}
});

module.exports = Ipt4Base;