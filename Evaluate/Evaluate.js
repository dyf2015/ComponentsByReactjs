var Star = require('../Star.js');
var Row = require('../Row.js');
var Col = require('../Col.js');
var Stars = require('./Stars.js');
var EvaluateStore = require('./EvaluateStore.js');
var EvaluateActions = require('./EvaluateActions.js');

var Evaluate = React.createClass({
	getInitialState:function() {
		if(this.props.options.opType=="edit") {
			return {
				numArr:new Array(),
				num:0,
			}
		}
		else {
			return {
				numArr:this.props.nums,
				num:this.props.sum
			}
		}
	},
	componentDidMount:function() {
	  	//EvaluateStore.addChangeListener(this.doRender); //监听表格变化
		EvaluateActions.setOptions(this.props.options);
	},
	componentWillUnmount:function() {  
	  	//EvaluateStore.removeChangeListener(this.doRender); //监听表格变化
	},
	render:function() {
		var numArr = this.state.numArr;
		var num = this.state.num;
		console.log(numArr);

		var itemArr = new Array();
		var items = this.props.options.items;
		for(var i=0;i<items.length;i++) {
			var item = items[i];
			var opType = this.props.options.opType;
			console.log(numArr[i]);
			if(opType=="edit")
				itemArr[i] = <Stars n={i} opType={opType} setNum={this.setNum.bind(this,i)} num={0} title={item.title} />;
			else
				itemArr[i] = <Stars n={i} opType={opType} num={numArr[i]} title={item.title} />;
		}
		return <Row otherClass="row-top">
			   <Col xs={10} otherClass="col-sm-offset-1">
			   <Row otherClass="row-line">
				   	<Col xs={3} otherClass="col-right-line">
					   	<div className="eval-left">{this.props.options.title}</div>
					  	<div className="eval-left">{num}</div>
					   	<div className="eval-left">
						   	<Star choose={num>=1} />
						   	<Star choose={num>=2} />
						   	<Star choose={num>=3} />
						   	<Star choose={num>=4} />
						   	<Star choose={num==5} />
					   	</div>
				   	</Col>
				   	<Col xs={9}>
				   		{itemArr}
				   	</Col>
			   </Row>
			   </Col>
			   </Row>;
	},
	setNum:function(n,num) {
		var items = this.props.options.items;
		var numArr = this.state.numArr;
		numArr[n] = num;
		var numSum = 0;
		for(var i=0;i<items.length;i++) {
			if(numArr[i]) {
				numSum += parseFloat(numArr[i]);
			}
		}
		numSum = (numSum/items.length).toFixed(1);
		EvaluateActions.save(numSum,numArr);
		this.setState({
			numArr:numArr,
			num:numSum
		});
	}
});

module.exports = Evaluate;