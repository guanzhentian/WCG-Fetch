<template>
	<div class="detailDiv">
		<span class="fui-cross closeSpan" @click="closeDiv"></span>
		<div class="container detailContainer">		
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h3 class="panel-title">基本信息</h3>
				</div>
				<div class="panel-body">
					<table class="table table-bordered">
						<tbody>
							<tr>
								<td class="text-center">
									爬虫创建时间
								</td>
								<td class="text-center">
									{{data.time}}
								</td>	
							</tr>
							<tr>
								<td class="text-center">
									起始爬取网址
								</td>
								<td class="text-center">
									{{data.mainUrl}}
								</td>	
							</tr>
							<tr>
								<td class="text-center">
									爬取方法
								</td>
								<td class="text-center">
									{{data.method}}
								</td>	
							</tr>
							<tr>
								<td class="text-center">
									详情页的网址
								</td>
								<td class="text-center">
									{{data.detailUrl}}
								</td>	
							</tr>
							<tr>
								<td class="text-center">
									限定网址范围的正则表达式
								</td>
								<td class="text-center">
									<p v-for="item in data.dataUrl">{{item}}</p>	
								</td>	
							</tr>
							<tr>
								<td class="text-center">
									爬取的属性值和与之对应的XPATH
								</td>
								<td >
									<div v-for="item in data.attr">
										<div class="col-md-2 col-primary" >
											属性:
										</div>
										<div class="col-md-4">
											{{item.name}}
										</div>
										<div class="col-md-2  col-primary">
											XPATH:
										</div>
										<div class="col-md-4">
											{{item.value}}
										</div>
									</div>	
								</td>	
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="panel panel-info" v-if="data.status == 'wait'">
				<div class="panel-heading">
					<h3 class="panel-title">爬虫配置信息</h3>
				</div>
				<div class='container'>
					<div class="container">
						<setWorker :workerData ="workerData" @submit="workerFinished"></setWorker>
						<div class="row">
							<div class="col-md-offset-4 col-md-2">
								<button class="btn btn-warning" @click="submitSetting">开始爬取</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="panel panel-warning" v-if="data.status == 'doing'">
				<div class="panel-heading">
					<h3 class="panel-title">配置爬虫</h3>
				</div>
				<div class="container">
					<div class="row">
						<div class="col-md-4">
							起始爬取时间为：
						</div>
						<div class="col-md-4">
							{{data.startTime}}
						</div>
					</div>
					<div class="row">
						<div class="col-md-2">
							爬虫工作信息:
						</div>
						<div class="col-md-2">
							<span @click="showDetailWorker()" class="btn btn-default setBtn	">点击查看</span>
						</div>
					</div>
					<transition name="showFormRight">
						<div class="row" v-show="isShowDetailWorker">
							<button class="btn btn-danger btn-sm closeBtn col-md-2 col-md-offset-9"@click="changeWorker">关闭</button>
							<div class="col-md-12">
								<detailWorker :worker="showWorker"></detailWorker>
							</div>
						</div>
					</transition>
					<div class="row">
						<button class="col-md-2 btn btn-warning" style="color:#383838" @click="isShowChangeWorker = true">修改Worker配置</button>
						<button class="col-md-offset-1 col-md-2 btn btn-danger" @click="endSpider">结束爬取</button>
					</div>
					<transition name="showFormRight">
						<div class="row" v-if="isShowChangeWorker">
							<div class="col-md-12 text-center">
								Worker配置
							</div>
							<div class="col-md-12">
								<setWorker :workerData ="workerData" @submit="workerFinished" :hasWorker="data.selectWorker"></setWorker>
							</div>
							<div class="col-md-offset-4 col-md-2">
								<button class="btn btn-warning " @click="resetWorker">修改</button>
							</div>
							<div class="col-md-2">
								<button class="btn btn-danger" @click="isShowChangeWorker = false">取消修改</button>	
							</div>
						</div>
					</transition>
				</div>
			</div>

			<div class="panel panel-success" v-if="data.status == 'success'">
				<div class="panel-heading">
					<h3 class="panel-title">爬虫配置</h3>
				</div>
				<div class="container">
					<div class="row">
						<div class="col-md-4">
							起始爬取时间为：
						</div>
						<div class="col-md-4">
							{{data.startTime}}
						</div>
					</div>
					<div class="row">
						<div class="col-md-4">
							结束爬取时间为：
						</div>
						<div class="col-md-4">
							{{data.endTime}}
						</div>	
					</div>
					<div class="row">
						<button class="btn btn-primary col-md-offset-4 col-md-4" @click="watchData">查看爬取数据</button>
					</div>
					<div class="row">
						<button class="btn btn-primary col-md-offset-4 col-md-4" @click="anlysisData">分析数据</button>
					</div>
					<transition name="showFormRight">
						<div class="row" v-if="isWatchData">
							<getData :transData='oldData' class="col-md-11" ></getData>
						</div>
					</transition>
					<transition name="showFormRight">
						<div class=" row" v-if="isAnalysisData">
							<div class="col-md-10">
								<kind :basicData='oldData' :selectId="data.id" class="" ></kind>
							</div>
							
						</div>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import selectButton from './SmallComponents/selectButton'
import detailWorker from './SmallComponents/detailWorker'
import setWorker from './SmallComponents/setWorker'
import getData from './getData'
import axios from 'axios'
import kind from './Analysis/kind'

	export default{
		props:{
			data:{
				type:Object,
				require:true,
			}
		},
		watch:{
			data:function(){
				axios.get('/api/getWorker')
				.then((res)=>{
					console.log(res.data);
					this.workerData = res.data;
				})
				.catch((err)=>{
					console.error(err);
				})
				this.selectWorker = 1;
				this.oldData = [];
				this.isWatchData = false;
			},
		},
		components:{
			selectButton,
			detailWorker,
			setWorker,
			getData,
			kind
		},
		data(){
			return{
				workerData:{},
				selectWorker:1,
				isShowDetailWorker:false,
				showWorker:{},
				item:{},
				isShowChangeWorker:false,
				oldData:[],
				isWatchData:false,
				isAnalysisData:false
			}
		},
		methods:{
			closeDiv(){
				this.isWatchData = false;
				this.isAnalysisData = false;
				this.isShowDetailWorker  = false;
				this.$emit("reGetMessage");
				this.$emit('closeDetail');
			},
			workerFinished(item){
				this.selectWorker = item;
			},
			checkData(){
				if(this.selectWorker < 1)
				{
					alert('请添加worker');
					return false;
				}
				return true
			},
			submitSetting(){
				
				if(this.checkData())
				{
					var finaldata = {
						selectWorker:this.selectWorker,
						id:this.data.id
					}
					axios.post('/api/startSpider',finaldata)
					.then((res)=>{				
					})
					.catch((err)=>{
						console.error(err);
					})
					//api
					setTimeout(()=>{
						this.workerData = {};
						console.log("call form setTimeout")
						this.closeDiv();
					},500)
				}
			},
			showDetailWorker(item)
			{
				this.isShowDetailWorker = true;
				this.showWorker = this.data;
			},
			changeWorker(){
				this.showWorker = {};
				setTimeout(()=>{this.isShowDetailWorker = false;}, 10);
					
			},
			resetWorker(){
				axios.post('/api/changeSpiderWorker',{
					id:this.data.id,
					selectWorker:this.selectWorker
				}).then((res)=>{
					if(res.data.message == 'success')
					{
						alert('修改成功！');
						this.isShowChangeWorker = false;
						this.closeDiv();
					}
				}).catch((err)=>{
					console.error(err);
				})
				
			},
			endSpider(){
				//api
				axios.post('/api/closeSpider',{
					id:this.data.id
				}).then((res)=>{
					if(res.data.message == 'success')
					{
						alert('成功关闭！');
						this.closeDiv();
					}
				}).catch((err)=>{
					console.error(err);
				})
			},
			watchData(){
				if(this.isWatchData)
				{
					this.isWatchData = false;
				}else{
					this.oldData.length = 0;
					axios.post('/api/getAllData',{
						id:this.data.id
					}).then((res)=>{
						this.oldData = res.data;
						this.isWatchData = true;
					}).catch((err)=>{
						console.error(err);
					})	
				}
				
				
			},
			anlysisData(){
				if(this.isAnalysisData)
				{
					this.isAnalysisData = false;
				}else{
					this.oldData.length = 0;
					axios.post('/api/getAllData',{
						id:this.data.id
					}).then((res)=>{
						this.oldData = res.data;
						this.isAnalysisData = true;
					}).catch((err)=>{
						console.error(err);
					})	
				}
				
				
			}
		},
		mounted(){		
		}
	}
</script>
<style type="text/css" scoped>
	.detailDiv{
		width: 100%;
		height: 100%;
		position: fixed;
		top:0;
		left: 0;
		background-color: rgba(0,0,0,0.2);
		z-index: 101;
		padding-top: 30px;
		overflow-y: scroll;

	}
	.detailContainer{
		background-color: ;
		min-height: 800px;
	}
	.closeSpan{
		cursor: pointer;
		transition: all .4s;
		position: absolute;
		top:-13px;
		right:100px;
		font-size: 50px
	}
	.closeSpan:hover{
		color:#1ABC9C;
		transform: rotate(180deg);
	}
	.panel{
		padding-bottom: 30px;
	}
	td>p{
		margin-bottom: 0px;
	}
	.border-right{
		height: 100%;
		border-right: 1px solid #ccc;
		width: 500px;
		text-align: center
	}
	.col-primary{
		color:#3498DB;
	}
	.jumbotron{
		border:1px solid #ccc;
	}
	.sel{
		padding-top: 3px;
	}
	.showFormRight-enter-active,.showFormRight-leave-to{
		transition: all .4s;
	}
	.showFormRight-enter,.showFormRight-leave-to{
		transform: translateX(200px);
		opacity: 0;
	}
	.row{
		margin-top: 20px;
		border-bottom: 1px solid #ccc;
		padding-bottom:20px;
	}
	.pointer{
		cursor: pointer;
	}
	.setBtn{
		width: 100%;
		margin-bottom: 10px;
	}
	.closeBtnp{

	}
</style>