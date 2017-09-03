<template>
	<div class="container">
		<div class="col-xs-5 col-xs-offset-1 block text-center middle">
			<h4>已收集URL</h4>
			<h4>{{showData.collectUrl}}</h4>
		</div>
		<div class="col-xs-5 col-xs-offset-1 block text-center middle">
			<h4>已分析URL</h4>
			<h4>{{showData.anlysisUrl}}</h4>
		</div>
		<div class="col-xs-5 col-xs-offset-1 block text-center middle">
			<h4>已获取目标数据</h4>
			<h4>{{showData.dataNumber}}</h4>
		</div>
		<div class="col-xs-5 col-xs-offset-1 block text-center middle">
			<h4>查看获取到的数据</h4>
			<router-link :to="{path:'/getData'}" tag="a">查看</router-link>
		</div>
		
	</div>
</template>
<script type="text/javascript">
import axios from 'axios'
	export default {
		name:'process',
		data(){
			return{
				showData:{
					collectUrl:0,
					anlysisUrl:0,
					dataNumber:0
				},
				curInv:null
			}
		},
		watch:{
			selectId:function(){
				clearInterval(this.curInv);
				this.getMessage();
				this.curInv = setInterval(this.getMessage,3000);
			}
		}
		,
		props:{
			selectId:{
				require:true,
				type:[String,Number]
			}
		},
		methods:{
			getMessage(){
				if(this.$route.path != '/anlysis')
				{
					clearInterval(this.curInv);
					return ;
				}
				axios.post('/api/getSpiderData',{
					id:this.selectId
				}).then((res)=>{
					this.showData = res.data;
				}).catch((err)=>{
					console.error(err);
				})
			}
		},
		mounted(){
			this.getMessage();
		}
	}
</script>
<style type="text/css">
	.block{
		margin-top: 30px;
		height: 300px;
		padding-top: 50px;
		border:1px solid #BDC3C7;
		border-radius: 30px;
	}
	.middle{
		padding-top: 80px;
	}
</style>