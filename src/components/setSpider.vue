<template>
<div>
	<div class="top">
		<div class="shadow">
			<div class="container content">
				<div class="col-xs-12 form" id="testForm">	
					<form id="child">
						<div class="formDetail container">
							<div class="row content">
								<h3 class="text-center">请输入起始爬取的网址</h3>
							</div>
							<div class="row content">
								<div class="form-group  col-xs-8 col-xs-offset-2">
									<input type="url" name="mainUrl" class="form-control" placeholder="请输入网址" v-model="inputData.mainUrl">
								</div>
							</div>

							<div class="row content col-xs-offset-2">
								<h6 class="switchTxt">是否启用chrome headless(需js渲染获取数据的请开启)</h6>
									<div class="switchBox" @click="changeSwitch">
										<div class="testSwitch">
											<transition name="one">
												<div v-show="switchShow" class="switchOne" key="1">
													<p class="text-center switchText">ON</p>
													<div class="rightTrue">&nbsp;</div>
												</div>
											</transition>
											<transition name="two">
												<div v-show="!switchShow" class="switchTwo" key="2">
													<div class="leftFalse">&nbsp;</div>
													<p class="text-center switchText">OFF</p>
												</div>
											</transition>
										</div>
									</div>
								
							</div>
						</div>
						<div class="formDetail container">
							<div class="row content">
								<h3 class="text-center">请输入详情页的网址</h3>
								<p class="text-muted text-center">只会在匹配详情页网址的URL中进行分析属性</p>
							</div>
							<div class="row content">
								<div class="form-group  col-xs-8 col-xs-offset-2">
									<input type="text" name="detailUrl" class="form-control" placeholder="请输入正则表达式" v-model="inputData.detailUrl">
								</div>
							</div>
						</div>
						<div class="formDetail container">
							<div class="row content">
								<h3 class="text-center">请输入限定网址范围的正则表达式</h3>
								<p class="text-muted text-center">只会在限定网址范围内爬取，可以加快爬取的速度，可输入多个</p>
							</div>
							<div class="content"></div>
							<transition-group name="dataUrlList" tag="div" >
								<div class="row" v-for="(item,index) in inputData.dataUrl" v-bind:key="index">
									<div class="form-group  col-xs-8 col-xs-offset-2">
										<input type="url" class="form-control" placeholder="请输入网址"  v-model ="inputData.dataUrl[index]">
									</div>
								</div>
							</transition-group>
							<div class="row">
								<div class="center-block" style="width:80px;">
									<transition-group name="span">
									<span class="fui-plus aSpan" v-if="inputData.dataUrl.length<5" @click="inputData.dataUrl.push('')" :key='1'></span>
									<span class="fui-trash aSpan" v-if="inputData.dataUrl.length>1" @click="inputData.dataUrl.pop()" :key='2'></span>
									</transition-group>
								</div>
							</div>
						</div>
						<div class="formDetail container">
							<div class="row content">
								<h3 class="text-center">请输入需要爬取的属性值和与之对应的XPATH</h3>
							</div>
							<div class="row">
								<div class="content">
									<transition-group name="dataUrlList" tag="div">
										<div class="form-group  col-xs-9 col-xs-offset-2" v-for="(item,index) in inputData.attr" :key="index">
											<label :for="'attName'+index" class=" col-sm-1 control-label">属性</label>
											<div class="col-sm-3">
												<input type="text" :name="'attName'+index"  class="form-control" placeholder="请输入属性名称" v-model="inputData.attr[index].name">
											</div>
											<label :for="'Xpath'+index" class="col-sm-1 control-label">XPath</label>
											<div class="col-sm-5">
												<input type="text" :name="'Xpath'+index" class="form-control" placeholder="请输入对应的XPATH" v-model="inputData.attr[index].value">
											</div>
										</div>
									</transition-group>
									<div class="row">
										<div class="center-block" style="width:80px;">
											<transition-group name="span">
											<span class="fui-plus aSpan" v-if="inputData.attr.length<5" @click="attrChange(1)" :key='1'></span>
											<span class="fui-trash aSpan" v-if="inputData.attr.length>1" @click="attrChange(0)" :key='2'></span>
											</transition-group>
										</div>
									</div>
								</div>	
							</div>
							<div class="submit">
								<span class="btn btn-primary" @click="submitMessage">提交</span>
							</div>
						</div>
						<div class="fixedRight">
							<ul>
								<li v-for = "(item,index) in targetIndex">
									<span class="fui-checkbox-unchecked" :class="{'active':index == curActive}" @click="setTarget(index,item.value)"></span>
								</li>
							</ul>
						</div>						
					</form>
				</div>	
			</div>
		</div>
	</div>
</div>
</template>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<script type="text/javascript">
import axios from 'axios'
	export default {
		name:"setSpider",
		data(){
			return{
				scrollTime:null,
				curDownInv:null,
				curUpInv:null,
				target:0,
				curActive:0,
				switchShow:true,
				targetIndex:[{
					value:0
				},{
					value:700	
				},{
					value:1400
				},{
					value:2100
				}],
				inputData:{
					mainUrl:"",
					method:"chrome",
					detailUrl:"",
					dataUrl:[""],
					attr:[{
						name:"",
						value:""
					}]
				}
			}
		},
		methods:{
			scroll(event){	
				event = event || window.event;
				event.stopPropagation();			
				var time = new Date();
				if(time-this.scrollTime>800)
				{
					if(window.event.wheelDelta<0)
					{
						if(this.target < this.targetIndex[this.targetIndex.length-1].value)
						{
							this.target += 700;
							this.scrollTo(1);
						}
					}else{
						if(this.target >=  this.targetIndex[1].value)
						{
							this.target -= 700;
							this.scrollTo(-1);
						}
					}
					this.scrollTime = time;				
				}
			},
			scrollTo(data){
				if(data > 0)
				{
					if(this.curActive < (this.targetIndex.length-1))
						this.curActive ++;
					if(this.curUpInv != null)
					{
						clearInterval(this.curUpInv);
						this.curUpInv = null;
					}
					if(this.curDownInv === null)
					{
						this.curDownInv = setInterval(()=>{
						if(document.getElementById('child').scrollTop != this.target)
						{
							document.getElementById('child').scrollTop += 10 ;
						}else{
							clearInterval(this.curDownInv);
							
							this.curDownInv = null;
						}
						},5);
					}
				}
				else
				{
					if(this.curActive > 0)
						this.curActive -- ;
					if(this.curDownInv != null)
					{
						clearInterval(this.curDownInv);
						this.curDownInv = null;
					}
					if(this.curUpInv === null)
					{
						this.curUpInv = setInterval(()=>{
						if(document.getElementById('child').scrollTop != this.target)
						{
							document.getElementById('child').scrollTop -= 10 ;
						}else{

							clearInterval(this.curUpInv);
							this.curUpInv = null;
						}
						},5);
					}
				}	
			},
			setTarget(index,data){
				if(index > this.curActive)
				{
					clearInterval(this.curUpInv);
					clearInterval(this.curDownInv);
					this.target = data;
					this.scrollTo(1);
				}
				else if(index < this.curActive)
				{
					clearInterval(this.curUpInv);
					clearInterval(this.curDownInv);
					this.target = data;
					this.scrollTo(-1);
				}

				this.curActive = index;
			},
			changeSwitch(){
				this.switchShow = !this.switchShow;
				if(this.switchShow === false)
					this.inputData.method="request";
				else
					this.inputData.method="chrome";
			},
			attrChange(val)
			{
				if(val>0)
				{
					var data = {
						name:'',
						value:''
					}
					this.inputData.attr.push(data);
				}else{
					this.inputData.attr.pop();
				}
			},
			checkData(){
				var patt = new RegExp(" ",'g');
				this.inputData.mainUrl = this.inputData.mainUrl.replace(patt,'');
				if( this.inputData.mainUrl == '')
				{
					alert("请输入爬取网址");
					return false
				}
				this.inputData.detailUrl = this.inputData.detailUrl.replace(patt,'');
				if( this.inputData.detailUrl == '')
				{
					alert("请输入详情页网址");
					return false
				}
				for(var i in this.inputData.dataUrl)
				{
					if(this.inputData.dataUrl[i].replace(patt,'') == '')
					{
						alert('有空的限制正则表达式栏未填入，请填写！');
						return false
					}
				}
				for(var i in this.inputData.attr)
				{	
					if(this.inputData.attr[i].name.replace(patt,'') == '')
					{
						alert("请输入属性名称");
						return false
					}
					if(this.inputData.attr[i].value.replace(patt,'') == '')
					{
						alert("请输入属性对应的XPATH");
						return false
					}
				}
				return true
			},
			submitMessage(){
				if(this.checkData())
				{
					var date = new Date();
					this.inputData.time = date.toLocaleString();
					this.inputData.status = 'wait';
					axios.post('/api/setSpider',this.inputData)
					.then(function(res){
						alert("提交成功！");
						window.location.reload();
					})
					.catch(function(error){
						console.error(error);
					});
				}
				
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.scrollTime = new Date();
				this.target = document.getElementById('child').scrollTop;
				//document.getElementById('child').addEventListener('scroll',this.scroll);
				document.getElementById('child').onmousewheel = this.scroll;
			}); 
		}
	}
</script>
<style type="text/css" scoped>
	.top{
		width: 100%;
		height: 850px;
		background:rgb(40,47,52) url('../assets/back4.jpg') no-repeat;
 		background-size: 100%;
 		color: #ECF0F1;
	}
	.shadow{
		width: 100%;
		height: 100%;
		/* background-color: rgba(51, 51, 51, 0.3) */
	}
	.content{
		padding-top: 100px;
	}
	.form{
		height: 700px;
		border-radius: 10px;
		background-color: rgba(255,255,255,0.1);
		overflow: hidden;
		padding: 0;
		position: relative;
	}
	.formDetail{
		width: 100%;
		height: 100%;
		color: #ECF0F1;
		overflow:hidden;
	}
	#child{
		padding-right:27px;
		top:0;
    	width: 100%;
   		height: 100%;
   		overflow-y: hidden;
   		padding-right: 17px; /* Increase/decrease this value for cross-browser compatibility */
	}
	.fixedRight{
		position: absolute;
		right: 20px;
		top:300px;
		
	}
	.fixedRight ul{
		list-style: none;
	}
	.fixedRight span{
		transition: all .4s;
		cursor: pointer;
		color: #2C3E50;
	}
	.fixedRight  span.active{
		color:#1ABC9C;
	}
	.fixedRight span:hover{
		color:#1ABC9C;
	}	
	.aSpan {
		cursor: pointer;
		margin-right: 20px;
		font-size: 20px;
		transition: all 0.3s ;
	}
	.aSpan:hover  {
		color:#1ABC9C;
		font-size:30px;
	}
	.dataUrlList-enter-active, .dataUrlList-leave-active,.span-enter-active,.span-leave-active{
		transition: all .3s;
	}
	.dataUrlList-enter,.dataUrlList-leave-to{
		transform: translateX(800px);
	}
	.span-enter,.span-leave-to{
		opacity: 0
	}
	.span-enter-to,.span-leave{
		opacity: 1
	}
	.submit{
		position: absolute;
		bottom: 20px;
		right: 20px;
	}
	.submit span{
		width:80px;
		cursor: pointer;
	}
	.switchBox{
		border-radius: 20px;
		height: 30px;
		display: inline-block;
		padding:0px;
		cursor: pointer;
		width: 100px;
		overflow:hidden;
		float: left;
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
		height: 100%;
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
		border-radius: 20px;
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
		border-radius: 20px;
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
</style>