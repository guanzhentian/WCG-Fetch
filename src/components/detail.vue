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
						<div class="row">
							<label class="col-md-2 text-center">选择开始时间:</label>
							<label class="col-md-2 text-center">是否立即开始</label>
							<div class="col-md-1 sel">
								<selectButton @onChange="isShowSetStartTime = !isShowSetStartTime"></selectButton>
							</div>
							<transition name="showFormRight">
								<div class="col-md-6" v-if="isShowSetStartTime">
									<input type="datetime-local" v-model='startTime' >
								</div>
							</transition>
						</div>
						<div class="row">
							<label class="col-md-2 text-center">选择结束时间:</label>
							<label class="col-md-2 text-center">是否手动结束</label>
							<div class="col-md-1 sel">
								<selectButton @onChange="isShowSetEndTime = !isShowSetEndTime"></selectButton>
							</div>
							<transition name="showFormRight">
								<div class="col-md-6" v-if="isShowSetEndTime">
									<input type="datetime-local" v-model='endTime' >
								</div>
							</transition>
						</div>
						<setWorker :workerData ="workerData" @submit="workerFinished"></setWorker>
						<div class="row">
							<label class=" col-md-4">
								是否强制执行(将其他worker工作停止)
							</label>
							<label class="col-md-1">
								<selectButton @onChange='isForce = !isForce'></selectButton>
							</label>
						</div>
						<div class="row">
							<div class="col-md-offset-4 col-md-2">
								<button class="btn btn-warning" @click="submitSetting">配置完成</button>
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
							设定起始爬取时间为：
						</div>
						<div class="col-md-4">
							{{task.startTime}}
						</div>
					</div>
					<div class="row">
						<div class="col-md-4">
							设定结束爬取时间为：
						</div>
						<div class="col-md-4">
							{{task.endTime}}
						</div>	
					</div>
					<div class="row">
						<div class="col-md-4">
							是否为强制执行：
						</div>
						<div class="col-md-4">
							{{task.isForce}}
						</div>
					</div>
					<div class="row">
						<div class="col-md-2">
							Worker详细信息:
						</div>
						<div class="col-md-2" v-for="item in task.selectWorker">
							<span @click="showDetailWorker(item)" class="btn btn-default setBtn">{{item.id,item.value}}</span>
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
								<setWorker :workerData ="workerData" @submit="workerFinished" :hasWorker="task.selectWorker"></setWorker>
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
							{{task.startTime}}
						</div>
					</div>
					<div class="row">
						<div class="col-md-4">
							结束爬取时间为：
						</div>
						<div class="col-md-4">
							{{task.endTime}}
						</div>	
					</div>
					<div class="row">
						<div class="col-md-4">
							是否为强制执行：
						</div>
						<div class="col-md-4">
							{{task.isForce}}
						</div>
					</div>
					<div class="row">
						<button class="btn btn-primary col-md-offset-4 col-md-4" @click="watchData">查看爬取数据</button>
					</div>
					<transition name="showFormRight">
						<div class="row" v-if="isWatchData">
							<getData :transData='oldData' class="col-md-11" ></getData>
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

	export default{
		props:{
			data:{
				type:Object,
				require:true,
			}
		},
		watch:{
			data:function(){
				if(this.data.status == 'doing' || this.data.status == 'success')
				{
					this.task = {
						startTime:"2017-8-30T14:12",
						endTime: "2017-8-30T15:12",
						isForce:true,
						selectWorker:[{
							id:'3',
							value:'这是第三个worker'
						},{
							id:'2',
							value:'这是第二个worker'
						}]
					}
				}
				this.endTime = null;
				this.selectWorker = [];
				this.oldData = [];
				this.isWatchData = false;
			}
		},
		components:{
			selectButton,
			detailWorker,
			setWorker,
			getData
		},
		data(){
			return{
				startTime:'',
				endTime:null,
				isShowSetStartTime:false,
				isShowSetEndTime:false,
				curTime:'',
				workerData:[],
				selectWorker:[],
				isForce:true,
				isShowDetailWorker:false,
				showWorker:{},
				task:{},
				isShowChangeWorker:false,
				oldData:[],
				isWatchData:false
			}
		},
		methods:{
			closeDiv(){
				this.$emit('closeDetail');
			},
			setTime(){
				var time  = new Date();
				this.curTime = ''+time.getFullYear()+'-';
				if(time.getMonth() < 9)
				{
					this.curTime+='0';
				}
				this.curTime+= (time.getMonth()+1)+'-'+time.getDate()+'T';
				if(time.getHours()<10)
				{
					this.curTime +='0';
				}
				this.curTime+=time.getHours()+':'+time.getMinutes();
			},
			workerFinished(item){
				this.selectWorker = item;
			},
			checkData(){
				if(this.isShowSetStartTime == true)
				{
					if(this.startTime <this.curTime)
					{
						alert('开始时间有误，请重新填写！');
						return false
					}
				}
				if(this.isShowSetEndTime == true)
				{
					console.log(this.endTime);
					if(this.endTime == null)
					{
						alert('请填写结束时间！');
						return false;
					}
					if(this.endTime <= this.startTime)
					{
						alert('结束时间有误，请重新填写');
						return false;
					}
				}
				if(this.selectWorker.length < 1)
				{
					alert('请添加worker');
					return false;
				}else{
					for(var i in this.selectWorker)
					{
						if(this.selectWorker[i] == '')
						{
							alert('请选择worker');
							return false;
						}
					}
				}
				return true
			},
			submitSetting(){
				
				if(this.checkData())
				{
					var data = {
						startTime:this.startTime,
						endTime:this.endTime,
						selectWorker:this.selectWorker,
						isForce:this.isForce
					}
					//api

				}
			},
			showDetailWorker(item)
			{
				this.isShowDetailWorker = true;
				this.showWorker = item;
			},
			changeWorker(){
				this.isShowDetailWorker = false;
				this.showWorker = {};
			},
			resetWorker(){
				console.log(this.selectWorker);
				this.task.selectWorker = [];
				for(var i in this.selectWorker)
				{
					this.task.selectWorker.push(this.selectWorker[i]);
				}
				this.isShowChangeWorker = false;
			},
			endSpider(){
				//api
			},
			watchData(){
				this.oldData.length = 0;
				this.oldData.push(this.data);	
				this.isWatchData = true;
			}
		},
		mounted(){
			this.setTime();
			this.startTime = this.curTime;
			setInterval(()=>{
				this.setTime();
				if(!this.isShowSetStartTime)
				{
					this.startTime = this.curTime;
				}
			},6000)


			//实时更新可用数量 获取可用worker

			this.workerData = [{
				id:'1',
				value:'这是第一个worker'
			},{
				id:'2',
				value:'这是第二个worker'
			},{
				id:'3',
				value:'这是第三个worker'
			},{
				id:'4',
				value:'这是第四个worker'
			},{
				id:'5',
				value:'这是第五个worker'
			}]

			///
			
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