<template>
<transition-group name="change" tag="div" mode="out-in">
	<div class="basic" :key='1' v-if="login">
		<div class="content center-block" >
			<h4 class="text-center">登录</h4>
			<form class="form-horizontal">
				<div class="form-group">
					<label class="col-md-2 control-label">账号</label>
					<div class="col-md-9">
						<input type="text" name="" class="form-control" placeholder="请输入账号" v-model="name" >
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-2 control-label">密码</label>
					<div class="col-md-9">
						<input type="password" name="" class="form-control" placeholder="请输入密码" v-model="password"  @keyup.enter = "submit">
					</div>
				</div>
				<button class="btn btn-primary col-md-offset-8 col-md-3" type="button" @click="submit" :class="{'disabled':enableLogin}">登录</button>
			</form>
		</div>
	</div>
	<div class="controlDiv" :key="2" v-if="!login">
	<header class="navbar navbar-default">
      <div class="navbar-header">
        <router-link tag="a" class="navbar-brand" :to='{path:"/"}'>WCG Fetch</router-link> 
      </div>
      <div class="container">
        <ul class="nav navbar-nav">
            <li><a>后台管理</a></li>
        </ul>
      </div>
   	</header>
		<div class="container">
			<div class="row spying">
				<p style="font-size:25px">正在爬取的爬虫</p>
				<div class="col-md-3 oneBlock" v-for="(item,index) in doingData">
					<div class="hold" >
						<p @mouseover="change(index)">时间：{{item.time}}</p>
						<p>网址: {{item.url}}</p>
					</div>
					<div class="shadow" v-if=" shadow[index] " @mouseout="change(index)">
						<p class="text-center">查看详情</p>
					</div>
				</div>
			</div>
			<div class="row" >
				<p style="font-size:25px">等待爬取的爬虫</p>
				<div class="col-md-3 oneBlock" v-for="(item,index) in waitData">
					<div class="hold">						
						<p>时间：{{item.time}}</p>
						<p>网址: {{item.url}}</p>
					</div>
					<div class="shadow" v-show="shadow[doingData.length+index]">
						<p class="text-center">查看详情</p>
					</div>
				</div>
				<div class="col-md-3 oneBlock">
					<router-link tag="a" :to="{path:'/setSpider'}">
						<div class="hold addHold">
							<p class="text-center">添加</p>
							<div class="center-block" style="width:41px">
								<img src="../assets/png1.png" >
							</div>
						</div>
					</router-link>
				</div>
			</div>
			<div class="row" >
				<p style="font-size:25px">爬取完成的爬虫</p>
				<div class="col-md-3 oneBlock" v-for="(item,index) in successData">
					<div class="hold">
						<p>时间：{{item.time}}</p>
						<p>网址: {{item.url}}</p>
					</div>
					<div class="shadow" v-show="shadow[doingData.length+waitData.length+index]">
						<p class="text-center">查看详情</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</transition-group>
</template>
<script type="text/javascript">
	export default {
		computed:{
			enableLogin(){
				var  patt = new RegExp(' ','g');
				if(this.name.replace(patt,'') == ''|| this.password.replace(patt,'') == '')
				{
					return true
				}
				else
				{
					return false
				}
			}
		},
		data(){
			return{
				name:"",
				password:"",
				login:false,
				successData:[],
				waitData:[],
				doingData:[],
				shadow:[]
			}
		},
		methods:{
			submit(){
				//api put name password
				
				if(this.name == "test" && this.password == "test")
				{
					this.login = false;
				}
			},
			test(){
				alert('yes');
			},
			change(index)
			{
				console.log(this.shadow[index] );
				this.shadow[index] = !this.shadow[index];
				this.shadow.splice(2,0);
				console.log(this.shadow);
			}
		},
		mounted(){
			var data = [{
				time:'2017/8/25 15:40',
				url:'baidu.com'
			},{
				time:'2017/8/25 15:40',
				url:'google.com'
			}];
			this.successData = data;
			this.waitData = data;
			this.doingData = data;
			var length = this.successData.length + this.waitData.length+this.doingData.length;
			do{
				this.shadow.push(true);
				length--;
			}while(length > 0)
			
		}
	}
</script>
<style type="text/css" scoped>
	p{
		word-break: break-all;
	}
	.basic{
		width: 100%;
  		height: 800px;
  		background:rgb(40,47,52) url('../assets/back3.jpg') no-repeat;
 		background-size: 100%;
 		padding-top: 150px;
	}
	.content{
		padding-top: 70px;
		background-color: rgba(255,255,255,0.87);
		width: 450px;
		min-height:500px;
	}
	.form-horizontal{
		margin-top: 50px;
	}
	h4{
		color:#1ABC9C;
	}
	.change-enter-active,.change-leave-active{
		transition:all .4s;
	}
	.change-enter{
		opacity: 0;
		transform: translateY(-300px);
	}
	.change-leave-to{
		transform: translateY(300px);
		opacity: 0;
	}
	.controlDiv{
		padding-bottom: 50px;
	}
	.oneBlock{
		margin-bottom: 20px;
	}
	.hold{
		cursor: pointer;
		min-height: 150px;
		transition: all .4s;
		border-radius: 10px;
		overflow: hidden;
		width: 100%;
		color:#383838;
		border:1px solid #ccc;
		padding: 20px;
	}
	.hold:hover{
		transform: translateY(-8px);
		box-shadow: 0px 5px 5px #888888;
	}

	.navbar-default{
		background-color: white;
		border-bottom:1px solid #CCC;
	}
	.addHold{
		border:0px;
	}
	.addHold:hover{
		color:#1ABC9C;
	}
	.shadow{
		position: absolute;
		top:0;
		left:0;
		margin-right:15px;
		margin-left: 15px;
		width: 90%;
		height: 100%;	
		padding: 20px;
		padding-top: 50px;
		background-color: rgba(0,0,0,0.8);
		color:white;
		cursor: pointer;
	}
</style>