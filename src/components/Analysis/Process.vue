<template>
	<div class="container">
		<div class="col-xs-5 col-xs-offset-1 block text-center middle">
			<h4>已收集URL</h4>
			<h4>……</h4>
		</div>
		<div class="col-xs-5 col-xs-offset-1 block text-center middle">
			<h4>已分析URL</h4>
			<h4>……</h4>
		</div>
		<div class="col-xs-5 col-xs-offset-1 block text-center middle">
			<h4>已获取目标数据</h4>
			<h4>……</h4>
		</div>
		<div class="col-xs-5 col-xs-offset-1 block text-center middle">
			<h4>查看获取到的数据</h4>
			<router-link :to="{path:'/getData'}" tag="a">查看</router-link>
		</div>
		
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'process',
		data(){
			return{
				
			}
		},
		props:{
			selectId:{
				require:true,
				type:[String,Number]
			}
		},
		methods:{
			
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