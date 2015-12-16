var Row = require('../Row.js');
var Col = require('../Col.js');
var TableStore = require('./TableStore.js');
var TableActions = require('./TableActions.js');
//var Immutable = require('immutable');

var Table = React.createClass({
	getInitialState:function() {
	    return {
	   		cols:[],
	   		datas:[],
	   		page:[],
	   		loading:true,
	   		msg:"数据获取中[第一页]...",
	   	}
	},
	shouldComponentUpdate:function(nextProps,nextState) {
		//console.log("nowState:"+this.state.datas);
		//console.log("nextState:"+nextState.datas);
		return true;
	},
	componentDidUpdate:function() {
		var footable = $('.footable').data('footable');
		if(footable) {
			footable.redraw();	
		}
		else {
			$(".footable").footable();
		}
	},
	componentDidMount:function() {
		TableActions.setOptions(this.props.options);
	  	TableStore.addChangeListener(this.doRender); //监听表格变化
	},
	componentWillUnmount:function() {  
	  	TableStore.removeChangeListener(this.doRender); //监听表格变化
	},
	doRender:function() {
		this.setState({
			cols:this.props.options.cols,
			datas:TableStore.getDatas(),
			page:TableStore.getPage(),
			loading:TableStore.getLoading(),
			msg:TableStore.getMsg(),
		});
	},
	goPage:function(newPage) {
		TableActions.goPage(newPage);
	},
	render:function() {
		var cols = this.state.cols
		var page = this.state.page;
		var datas = this.state.datas;
		var isLoading = this.state.loading;
		var msg = this.state.msg;
		//console.log(isLoading);
		//console.log(page);
		//表头计算
		var arrTh = [];
		for(var i=0;i<cols.length;i++) {
			var col = cols[i];
			var dataHide = col.dataHide;
			arrTh[i] = <th data-hide={dataHide} key={i}>{col.label}</th>;
		}
		//表体计算
		var arrTr = [];
		for(var i=0;i<datas.length;i++) {
			var data = datas[i];
			var arrTd = [];
			for(var j=0;j<cols.length;j++) {
				var col = cols[j];
				if(null!=col.url) {
					var target = "_blank";
					var url = col.url;
					var r = /([^\[\]]+)(?=\])/g;
					var m = r.exec(url);
					if(m) {
						for(var k=1;k<m.length;k++) {
							var mValue = eval("data."+m[k]);
							url = url.replace("["+m[k]+"]",mValue);
						}
					}
					if(null!=col.target) {
						target = col.target;
					}
					arrTd[j] = <td key={j}><a href={url} target={target}>{eval("data."+col.name)}</a></td>;
				}
				else {
					arrTd[j] = <td key={j}>{eval("data."+col.name)}</td>;
				}
			}
			arrTr[i] = <tr key={i}>{arrTd}</tr>;
		}
		//分页计算
		var pageArr = [];
		for(var i=1;i<=5;i++) {
			if(page.nowPage<=3) {
				if(i<=page.maxPage) {
					var className4LiNew = page.nowPage==i?"active":"";
					pageArr[i-1] = <li key={i-1} className={className4LiNew}>
					<a href="javascript:void(0)" onClick={this.goPage.bind(this,i)}>{i}</a></li>;
				}
			}
			else if(page.nowPage>3) {
				if(i+(page.nowPage-3)<=page.maxPage) {
					var className4LiNew = i==3?"active":"";
					pageArr[i-1] = <li key={i-1} className={className4LiNew}>
					<a href="javascript:void(0)" onClick={this.goPage.bind(this,i+(page.nowPage-3))}>{i+(page.nowPage-3)}</a></li>;	
				}
			}
		}
		var arrLoading = <tr><td className="success" colSpan={arrTh.length}><span><img src="/cloudStore/images/loading.gif" width="25px" heigth="25px" /></span> {msg}</td></tr>;
		if(datas.length==0&&!isLoading) {
			arrLoading = <tr><td className="success" colSpan={arrTh.length}>暂无数据</td></tr>;
		}
		else if(!isLoading) arrLoading = "";
		return (
			<Row otherClass="row-top" show={0}>
	    		<Col>
	    			<table className="footable table table-complex table-bordered dyfTable">
	    				<thead><tr>{arrTh}</tr></thead>
	    				<tbody>{arrTr}</tbody>
	    				<tfoot>{arrLoading}</tfoot>
					</table>
					<nav>
					  <ul className="pagination">
					    <li>
					      <a href="javascript:void(0)" onClick={this.goPage.bind(this,1)} aria-label="Previous">
					        <span aria-hidden="true">&laquo;</span>
					      </a>
					    </li>
					    {pageArr}
					    <li>
					      <a href="javascript:void(0)" onClick={this.goPage.bind(this,page.maxPage)} aria-label="Next">
					        <span aria-hidden="true">&raquo;</span>
					      </a>
					    </li>
					    <li>
					      <a href="javascript:void(0)" aria-label="Next">
					        <span aria-hidden="true">{page.maxPage}页/{page.maxNum}条</span>
					      </a>
					    </li>
					  </ul>
					</nav>
	    		</Col>
	    	</Row>
		)
	}
});

module.exports = Table;