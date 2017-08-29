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
									<input type="datetime-local" v-model='startTime' value="2014-02-01T05:16">
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
									<input type="datetime-local" v-model='endTime' value="2014-02-01T05:16">
								</div>
							</transition>
						</div>
						<div class="row">
							<div class="col-md-6 ">
								<input type="range" min="1" max="100" v-model="fetchNumber" class="pointer">
							</div>
							{{fetchNumber}}
						</div>
					</div>
				</div>
			</div>

			<div class="panel panel-warning" v-if="data.status == 'doing'">
				<div class="panel-heading">
					<h3 class="panel-title">配置爬虫</h3>
				</div>
			</div>

			<div class="panel panel-success" v-if="data.status == 'success'">
				<div class="panel-heading">
					<h3 class="panel-title">爬虫配置</h3>

				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import selectButton from './SmallComponents/selectButton'
	export default{
		props:{
			data:{
				type:Object,
				require:true,
			}
		},
		components:{
			selectButton
		},
		data(){
			return{
				startTime:'',
				endTime:'',
				isShowSetStartTime:false,
				isShowSetEndTime:false,
				curTime:'',
				fetchNumber:1
			}
		},
		methods:{
			closeDiv(){
				this.$emit('closeDetail');
			},
			setTime(){
				var time  = new Date();
				this.curTime = ''+time.getFullYear()+'-';
				if(time.getMonth() < 10)
				{
					this.curTime+='0';
				}
				this.curTime+=time.getMonth()+'-'+time.getDate()+'T'+time.getHours()+':'+time.getMinutes();
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
</style>