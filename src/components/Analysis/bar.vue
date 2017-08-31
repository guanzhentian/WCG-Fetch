<template>
	<div>
	<div class="container">
		<div class="formDiv" v-show="isShow" :key="1">
			<form class="form-horizontal">
				<div class="form-group firstGroup row">

					<h5 class="col-md-4">1.选择生成的图形</h5>
					<div class="col-md-3">
						<select v-model="chartData.kind">
							<option v-for="item in kindData" :value="item.type" >{{item.name}}</option>
						</select>
					</div>
					<div class="col-md-5">
						<img :src="imgPath" class="img-responsive">
					</div>
				</div>
				<div class="form-group secondGroup row">
					<h5 class="col-md-2">2.选择分类项</h5>
					<div class="col-md-2">
						<select v-model="chartData.xAxes">
							<option v-for="item in inputData" :value="item.name" >{{item.name}}</option>
						</select>
					</div>
					<div class="col-md-2">
						<span>是否删除重复项</span>
					</div>
					<div class="col-md-2">	
						<div class="switchBox" @click="switchShow = !switchShow">
							<div class="testSwitch">
								<transition name="one">
									<div v-if="switchShow" class="switchOne" key="1">
										<p class="text-center switchText">YES</p>
										<div class="rightTrue">&nbsp;</div>
									</div>
								</transition>
								<transition name="two">
									<div v-if="!switchShow" class="switchTwo" key="2">
										<div class="leftFalse">&nbsp;</div>
										<p class="text-center switchText">NO</p>
									</div>
								</transition>
							</div>
						</div>
					</div>
					<h5 class="col-md-2">3.选择比较项</h5>
					<div class="col-md-2" v-model="chartData.xAxes">
						<select v-model="chartData.yAxex">
							<option v-for="item in inputData" :value="item.name" v-if="chartData.xAxes!=item.name">{{item.name}}</option>
							<option>数量</option>
						</select>
					</div>
				</div>
				<div class="form-group thirdGroup">
					<div class="row">
						<h5 class=" col-md-3">4.(可选)添加筛选项</h5>
						<span class="fui-plus col-md-1 mySpan" @click="changeReomve(1)"></span>
						<span class="fui-cross  col-md-1 mySpan" @click="changeReomve(0)"></span>
					</div>
					<transition-group name="filter" tag="div">
						<div class="row oneRow" v-for="(item,index) in chartData.remove" :key="index">
							<h5 class="col-md-3">选择类型</h5>
							<div class="col-md-3">
								<select v-model="item.name">
									<option v-for="option in optionData" :value="option">{{option}}</option>
								</select>
							</div>
							<h5 class="col-md-2">筛选条件</h5>
							<div class="col-md-4">
								<input type="text" name="require" v-model="item.value" placeholder="请输入筛选条件">
							</div>
						</div>
					</transition-group>
				</div>

				<div class="form-group fourGroup">
					<div class="row">
						<h5 class=" col-md-3">5.输入分析数量</h5>
						<div class="col-md-3">
							<input type="text" v-model="chartData.number" @change="checkNumber" @keyup.enter = "creatChart">
						</div>
						<p class="text-muted">(当前可用数据{{curNumber}})</p>
					</div>
				</div>
				<button class="btn btn-primary beginBtn center-block" type="button" @click="creatChart">生成图表</button>	
			</form>
		</div>
		<div class="chartDiv" v-show="!isShow" :key="2">
			<canvas id="myChart"></canvas>
			<button class="btn btn-primary returnBtn center-block" @click="destory">返回</button>
		</div>		
	</div>
	<transition name="shadow">
		<div v-if="isShadow" class="shadow">
			<div class="loadingImg center-block" v-if="isLoading">
				<img src="../../assets/loading.gif">
			</div>
		</div>
	</transition>
	
	</div>
</template>
<script type="text/javascript">
	
	import Chart from 'chart.js/dist/Chart.min.js'
	import axios from 'axios'
	export default {
		name:'bar',
		props:{
			selectId:{
				require:true,
				type:[String,Number]
			},
			basicData:{
				default:[]
			}
		},
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
				for(var item in this.kindData)
				{
					if(this.kindData[item].type === this.chartData.kind)
					{
						return this.kindData[item].path
					}
				}
				return null
			},
			optionData(){
				var a = [];
				for(var i in this.inputData)
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
					kind:"bar",
					xAxes:"",
					yAxex:"",
					remove:[],
					number:""
				},
				curChart:null,
				isLoading:false,
				switchShow:true,
				kindData:[{
					name:"柱状图",
					path:require("../../assets/chart3.png"),
					type:"bar"
				},{
					name:"环形图",
					path:require("../../assets/chart1.png"),
					type:"pie"
				},{
					name:"极地区域图",
					path:require("../../assets/chart4.png"),
					type:"polarArea"
				},],
				inputData:[],	
				curNumber:0,
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
			checkData(){
				if(this.chartData.xAxes == "" || this.chartData.yAxex == '' || this.chartData.number == '')
				{
					return false
				}
				for(var i = 0;i<this.chartData.remove.length;i++)
				{
					if(this.chartData.remove[i].name == '' || this.chartData.remove[i].value == '')
					{
						return false
					}
				}
				return true
			},
			handleData(){
				//getData() api

				var data  = [];
				var id = 0 ;
				var timeIndex = 0;
				data = this.basicData.slice(0,this.chartData.number);
				
				//remove data

				for(var k  = 0; k<this.chartData.remove.length; k++)
				{
					var j = 0;
					var patt = new RegExp(String(this.chartData.remove[k].value));
					var Template = this.chartData.remove[k].name;
					do{
						if(!patt.test( data[j][Template] ))
						{
							data.splice(j, 1);
							if(j<data.length)
								continue;
							else break;
						}else{
							j++;
						}
					}while(j<data.length)
				}

				//change data to chart's data
				var buildData = {
					labels:[],
					data:[]
				}
				var targetX = this.chartData.xAxes;
				var targetY = this.chartData.yAxex;
				var patt = /\d+/;
				for(var j = 0;j<data.length;j++)
				{
					var index = buildData.labels.indexOf(data[j][targetX]);
					if( index == -1)
					{						
						if(targetY == '数量')
						{
							buildData.labels.push(data[j][targetX]);
							buildData.data.push(1);
						}
						else
						{
							var result = patt.exec(data[j][targetY]);
							if(result != null)
							{
								buildData.labels.push(data[j][targetX]);
								buildData.data.push(result[0]);
							}
							
						}
					}else{
						if(targetY == '数量')
						{
							buildData.data[index]++;				
						}
						else
						{
							if(!this.switchShow)
							{	
								var result = patt.exec(data[j][targetY]);
								if(result != null)
								{
									buildData.labels.push(data[j][targetX]+"重复名"+buildData.labels.length);
									buildData.data.push(result[0]);
								}
							}	
						}
					}
				}

				return buildData;
			},
			creatChart(){
				if(this.checkData())
				{	
					this.isLoading = true;
					this.isShadow = true;
					var finalData  = this.handleData();
					this.isShow = false;
					this.isShadow = false;
					this.isLoading = false;
					//配置图表属性
					var bgColor = [];
					for(var i = 0;i<finalData.labels.length;i++)
					{
						var word = '#';
						for(var j = 0;j<6;j++)
						{
							var site = Math.floor(Math.random()*16);
							switch(site)
							{
								case 10:word+='A';
										break;
								case 11:word+='B';
										break;		
								case 12:word+='C';
										break;
								case 13:word+='D';
										break;
								case 14:word+='E';
										break;
								case 15:word+='F';
										break;
								default:word+=site;
									break;
							}
						}
						bgColor.push(word);
					}
					var ctx = document.getElementById('myChart').getContext('2d');
					this.curChart = new Chart(ctx, {
					    // The type of chart we want to create
					    type:this.chartData.kind,
					    // The data for our dataset
					    data: {
					        labels:finalData.labels,
					        datasets: [{
					            data:finalData.data,
					        	backgroundColor:bgColor
					        }],
					        
					    },
					    // Configuration options go here
					    options: {
					    	responsiveAnimationDuration:2000,
					    	legend:{
					    		labels:{
					    			
					    		}
					    	},
					    	title: {
					            display: true,
					            text: this.chartData.xAxes+' - '+this.chartData.yAxex+" 图",
					            fontSize:20,
					            fontColor:'#34495E',
					            padding:20
					        },
					    	onClick(){
					    		//alert("yes!");
					    	},
					    	scales: {
			                    xAxes: [{
			                        display: true,
			                        scaleLabel: {
			                            display: true,
			                            labelString: this.chartData.xAxes
			                        }
			                    }],
			                    yAxes: [{
			                        display: true,
			                        scaleLabel: {
			                            display: true,
			                            labelString: this.chartData.yAxex
			                        }
			                    }]
			                }
					    }
					});
					
				}
				else{
					alert("填写错误！请查看！")
				}
			},
			destory(){
				this.curChart.destroy();
				this.isShow = !this.isShow;
			}
		},
		mounted(){
			axios.post('/api/getSpiderData',{
				id:this.selectId
			})
			.then((res)=>{
				this.inputData = res.data.attr;
			})
			.catch((err)=>{
				console.error(err)
			});
			// getInputData api
			//this.inputData = getInputData.attr;
			// getNumber api
			this.curNumber = this.basicData.length;
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
		line-height: 240px;
	}
	.firstGroup img{
		height: 240px;
	}
	.firstGroup h5{
		line-height: 240px;
		margin: 0;
	}
	.secondGroup{
		height: 81px;
		line-height: 61px;
		padding-bottom: 20px;
	}
	.secondGroup h5{
		margin:0px;
		line-height: 61px;
	}
	div.thirdGroup,div.fourGroup{
		padding-top: 20px;
		padding-bottom: 40px;
		padding-left: 10px;
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
		transition: all .4s;

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
	.returnBtn{
		width: 300px;
		font-size: 20px;
		margin-top: 50px;
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
	.switchBox{
		border-radius: 20px;
		height: 30px;
		margin-top: 15px;
		display: inline-block;
		padding:0px;
		cursor: pointer;
		width: 100px;
		overflow:hidden;
	}
	.switchTxt{
		float: left;
		margin:0;
		margin-right: 30px;
	}
	.testSwitch{
		width: 200px;
	}
	.switchOne{
		width: 100px;
		height: 30px;
		background-color: #2C3E50;
		color:#16A085;
		border-radius: 20px;
		float: left;
	}
	.switchTwo{
		width: 100px;
		height: 100%;
		background-color: #BDC3C7;
		color:#ECF0F1;
		border-radius: 20px;
		float: left;
	}
	.rightTrue{
		background-color:#16A085;
		width: 40%;
		float: left;
	}
	.switchText{
		width: 60%;
		height: 30px;
		float: left;
	}
	.leftFalse{
		background-color: #95A5A6;
		float: left;
		width: 40%;
	}
	.one-enter-active,.one-leave-active,.two-enter-active,.two-leave-active{
		transition: 0.2s;
	}
	.one-enter{
		transform: translateX(-100px);
	}
	.one-leave-to{
		transform: translateX(-100px);
	}
	.two-enter-to{
		transform: translateX(-100px);
	}
	.chartDiv{
		width: 100%;
	}
</style>