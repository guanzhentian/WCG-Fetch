<template>
	<div>
	<div class="container">
		<div class="formDiv" v-if="isShow">
			<form class="form-horizontal">
				<div class="form-group firstGroup row">

					<h4 class="col-md-4">1.选择生成的图形</h4>
					<div class="col-md-3">
						<select v-model="chartData.kind">
							<option v-for="item in kindData" :value="item.name" >{{item.name}}</option>
						</select>
					</div>
					<div class="col-md-5">
						<img :src="imgPath" class="img-responsive">
					</div>
				</div>
				<div class="form-group secondGroup row">
					<h4 class="col-md-3">2.选择分类项</h4>
					<div class="col-md-3">
						<select v-model="chartData.xAxes">
							<option v-for="item in inputData" :value="item.name" >{{item.name}}</option>
						</select>
					</div>
					<h4 class="col-md-3">3.选择比较项</h4>
					<div class="col-md-3" v-model="chartData.xAxes">
						<select v-model="chartData.yAxex">
							<option v-for="item in inputData" :value="item.name" v-if="chartData.xAxes!=item.name">{{item.name}}</option>
							<option>数量</option>
						</select>
					</div>
				</div>
				<div class="form-group thirdGroup">
					<div class="row">
						<h5 class="col-md-offset-4 col-md-3">3.(可选)添加筛选项</h5>
						<span class="fui-plus col-md-1 mySpan" @click="changeReomve(1)"></span>
						<span class="fui-cross  col-md-1 mySpan" @click="changeReomve(0)"></span>
					</div>
					<transition-group name="filter" tag="div">
						<div class="row oneRow" v-for="(item,index) in chartData.remove" :key="index">
							<h4 class="col-md-3">选择类型</h4>
							<div class="col-md-3">
								<select v-model="item.name">
									<option v-for="option in optionData" :value="option">{{option}}</option>
								</select>
							</div>
							<h4 class="col-md-2">筛选条件</h4>
							<div class="col-md-4">
								<input type="text" name="require" v-model="item.value" placeholder="请输入筛选条件">
							</div>
						</div>
					</transition-group>
				</div>

				<div class="form-group fourGroup">
					<div class="row">
						<h5 class="col-md-offset-3 col-md-3">4.输入分析数量</h5>
						<div class="col-md-3">
							<input type="text" v-model="chartData.number" @change="checkNumber">
						</div>
						<p class="text-muted">(当前可用数据{{curNumber}})</p>
					</div>
				</div>
				<button class="btn btn-primary beginBtn center-block" type="button" @click="creatChart">生成图表</button>
			</form>
		</div>
		<div class="chartDiv" v-if="!isShow">
			
		</div>

		
	</div>
	<transition name="shadow">
		<div v-if="isShadow" class="shadow">
			<div class="loadingImg center-block">
				<img src="../../assets/loading.gif">
			</div>
		</div>
	</transition>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'bar',
		watch:{
			chartData(newValue,oldValue){
				if(this.chartData.number > curNumber)
				{
					this.chartData.number = curNumber;
				}
			}
		},
		computed:{
			imgPath(){
				for(let item in this.kindData)
				{
					if(this.kindData[item].name === this.chartData.kind)
					{
						return this.kindData[item].path
					}
				}
				return null
			},
			optionData(){
				let a = [];
				for(let i in this.inputData)
				{
					if(this.inputData[i].name != this.chartData.xAxes && this.inputData[i].name != this.chartData.yAxex)
					{
						a.push(this.inputData[i].name);
					}
				}
				return a;
			}
		},
		data(){
			return{
				isShow:true,
				isShadow:false,
				chartData:{
					kind:"折线图",
					xAxes:"",
					yAxex:"",
					remove:[],
					number:""
				},
				kindData:[{
					name:"折线图",
					path:require("../../assets/chart2.png")
				},{
					name:"柱状图",
					path:require("../../assets/chart3.png")
				},{
					name:"环形图",
					path:require("../../assets/chart1.png")
				},{
					name:"极地区域图",
					path:require("../../assets/chart4.png")
				},],
				inputData:[],	
				curNumber:100,
				pitruePath:"",
			}
		},
		methods:{
			changeReomve(value)
			{
				if(value>0)
				{
					if(this.chartData.remove.length < this.optionData.length)
					{
						this.chartData.remove.push({
							name:"",
							value:""
						})
					}
				}else{
					this.chartData.remove.pop();
				}
			},
			checkNumber(){
				if(this.chartData.number == Number(this.chartData.number))
				{
					if(this.chartData.number > this.curNumber)
					{
						this.chartData.number = this.curNumber;
					}else if(this.chartData.number < 1)
					{
						this.chartData.number = 1;
					}
				}else{
					this.chartData.number = 1;
				}
			},
			creatChart(){
				this.isShadow = true;
				setTimeout(()=>{this.isShadow = false;},1000);
			}	
		},
		mounted(){
			let getInputData  = {
				'attr':[{
					name:"id",
					value:""
				},{
					name:"time",
					value:""
				},{
					name:"name",
					value:""
				},{
					name:"price",
					value:""
				},{
					name:"content",
					value:""
				}]
			}
			// getInputData api
			this.inputData = getInputData.attr;
		}
	}
</script>
<style type="text/css" scoped>
	h4,h5,h6{
		margin-top:0;
		margin-bottom: 0;
	}
	.form-group{
		border-bottom: 1px solid #ccc;
	}
	.firstGroup{
		height: 260px;
		padding: 10px;
		line-height: 240px;
	}
	.firstGroup img{
		height: 240px;
	}
	.firstGroup h4{
		line-height: 240px;
		margin: 0;
	}
	.secondGroup{
		height: 81px;
		line-height: 61px;
		padding-bottom: 20px;
	}
	.secondGroup h4{
		margin:0px;
		line-height: 61px;
	}
	div.thirdGroup,div.fourGroup{
		padding-top: 20px;
		padding-bottom: 40px;
	}
	div.thirdGroup h5{
		margin-top: 0px;
		margin-bottom: 0px;
	}
	span.mySpan{
		font-size: 20px;
		height: 30px;
		line-height: 30px;
		cursor:pointer;
		transition: all .4s;
	}
	span.mySpan:hover,
	span.mySpan:active{
		color:#1ABC9C;
	}
	div.oneRow{
		margin-top: 30px;
		margin-bottom: 30px;
	}
	.filter-enter-active,.filter-leave-active{
		transition: all 1s;

	}
	.filter-enter,.filter-leave-to{
		transform: translateX(900px);
	}
	.shadow-enter-active,.shadow-leave-active{
		transition: all .4s;
	}
	.shadow-enter,.shadow-leave-to{
		transform: translateY(900px);
	}

	.beginBtn{
		width: 300px;
		font-size: 20px;
		margin-bottom: 50px;
	}
	.shadow{
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: rgba(0,0,0,0.8);
		z-index:99;
		top:50px;
	}
	.loadingImg{
		position: relative;
		top:40%;
		width: 32px;

	}
</style>