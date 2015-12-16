var Row = require("../Row.js");
var Col = require("../Col.js");
var Panel = require("../Panel.js");
var PanelCell = require("../PanelCell.js");
var PanelGroupStore = require('./PanelGroupStore.js');
var PanelGroupActions = require('./PanelGroupActions.js');

var PanelGroup = React.createClass({
	getInitialState:function() {
	    return {
	    	allDatas:[],
	   		datas:[],
	   	}
	},
	componentDidMount:function() {
	  	PanelGroupStore.addChangeListener(this.doRender); //监听表格变化
		PanelGroupActions.setOptions(this.props.options);
	},
	componentWillUnmount:function() {  
	  	PanelGroupStore.removeChangeListener(this.doRender); //监听表格变化
	},
	doRender:function() {
		this.setState({
			allDatas:PanelGroupStore.getAllDatas(),
			datas:PanelGroupStore.getDatas(),
		});
	},
	render:function() {
		var options = this.props.options;
		var renderArr = new Array();
		var renderArrFlag = 0;
		var datas = this.state.datas;
		var allDatas = this.state.allDatas;
		//console.log("datas.length:"+datas.length);
		for(var i=0;i<allDatas.length;i++) {
			var head = allDatas[i];
			//console.log("head.pId:"+head.pId);
			if(head.pId==options.dataRootId) {
				var dataArr = new Array();
				var dataArrFlag = 0;
				for(var j=0;j<datas.length;j++) {
					var data = datas[j];
					if(data.pId==head.id) {
						var id = data.id;
						var target = options.cell.target==null?"_blank":options.cell.target;
						var url = options.cell.url;
						var r = /([^\[\]]+)(?=\])/g;
						var m = r.exec(url);
						if(m) {
							for(var k=1;k<m.length;k++) {
								var mValue = eval("data."+m[k]);
								url = url.replace("["+m[k]+"]",mValue);
							}
						}
						if(id.indexOf(options.cell.prefix)==0&&""!=options.cell.prefix) {
							id = id.substring(2);
						}
						dataArr[dataArrFlag++] = <PanelCell><a className="text-primary" href={url} target={target}>{data.name}</a></PanelCell>;
					}
				}
				if(dataArrFlag>0)
					renderArr[renderArrFlag++] = <Panel title={head.name}>{dataArr}</Panel>;
			}
		}
		return (
			<Row otherClass="row-top">
    			<Col>
    				{renderArr}
    			</Col>
    		</Row>
		)
	}
});

module.exports = PanelGroup;