<template>
<div class="contanier">
	<div class="col-md-12">
		<h1 class="text-center">{{worker.value}}</h1>
	
	</div>
	<div class="col-md-11 log">
		<transition name="logChange">
			<!-- <p v-for="(item,index) in logData" :key="index">{{item}}<span v-if="index == 0" class="label label-danger" style="margin-left:20px;">最新</span></p> -->
			<getData :transData='logData' v-if="ready" title="实时消息"></getData>
		</transition>
	</div>
</div>
</template>
<script type="text/javascript">
import axios from 'axios'
import getData from '../getData'

	export default{
		props:{
			worker:{
				type:Object,
				required:true
			}
		},
		components:{
			getData
		},
		data(){
			return{
				logData:[],
				curInv:null,
				ready:false
			}	
		},
		methods:{
			getMessage(){
				axios.post('/api/getMessageFromId',{
					id:this.worker.id
				},{
					timeout:500
				}).then((res)=>{
					console.log(res.data);
					this.logData = res.data;
					console.log(this.logData)
					this.ready = true;
				}).catch((err)=>{
					console.error(err);
				})
			}
		},
		watch:{
			worker:function(){
				this.ready = false;
				this.logData.length = 0;	
				this.getMessage();
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
