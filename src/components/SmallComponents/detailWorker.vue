<template>
<div class="contanier">
	<div class="col-md-12">
		<h1 class="text-center">{{worker.value}}</h1>
		<p>实时消息：</p>
	</div>
	<div class="col-md-11 log">
		<transition-group name="logChange">
			<p v-for="(item,index) in logData" :key="index">{{item}}<span v-if="index == 0" class="label label-danger" style="margin-left:20px;">最新</span></p>
		</transition-group>
	</div>
</div>
</template>
<script type="text/javascript">
	export default{
		props:{
			worker:{
				type:Object,
				required:true
			}
		},
		data(){
			return{
				logData:[],
				curInv:null
			}	
		},
		watch:{
			worker:function(va1,va2){
				clearInterval(this.curInv);
				this.logData.length = 0;
				if(this.worker != {})
				{
					this.curInv = setInterval(()=>{this.logData.unshift("时间：2017-8-30T15:0"+this.logData.length+" 消息： 这是一条测试消息！来自"+this.worker.value)},1000);
				}
			
			}
		}
	}
</script>
<style type="text/css" scoped>
	.log{
		max-height: 500px;
		overflow:scroll;
		overflow-x: hidden;
		word-break: break-all;
	}
	.logChange-enter-active,.logChange-leave-active{
		transition: all .4s;
	}
</style>
