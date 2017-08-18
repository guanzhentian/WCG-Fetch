<template>
	<div class="basic">
		<div class="back"></div>
		<div class="toolbar">
			<ul>
				<router-link v-for="item in pathData" :to="{'path':item.path}" tag="li" class="text-center" v-text="item.text" :key="item.path">
				</router-link>	
			</ul>
			
		</div>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Chart from 'chart.js/dist/Chart.min.js'


	export default {
		name:"anlysis",
		data(){
			return{
				pathData:[{
					path:'/anlysis/process',
					text:'爬取过程'
				},{
					path:'/anlysis/bar',
					text:'图表分析'
				},{
					path:'/anlysis/kind',
					text:'分类分析'
				},
				{
					path:'/anlysis/2048',
					text:'2048'
				}]
			}
		}
	}
</script>
<style type="text/css" scoped>
	.back{
		width: 100%;
		height: 50px;
		width: 100%;
		background:#34495E;
 		background-size: 100%;
	}
	.basic{
		overflow: hidden;
		height:820px;
		margin-bottom: 50px;
	}
	.toolbar{
		float:left;
		background-color: #2C3E50;
		width: 8%;
		height: 800px;
	}
	.toolbar ul{
		list-style: none;
		padding: 0;
	}
	.toolbar ul>li{
		padding:10px 0px;
		border-bottom: 1px solid #BDC3C7;
		transition: all .4s;
		color:#ECF0F1;
		cursor: pointer;
	}
	.toolbar ul>li:hover,
	.toolbar ul>li:active,
	.toolbar ul>li.router-link-active{
		background-color:#E74C3C;
	}
	.content{
		height: 800px;
		background-color: white;
		width: 92%;
		float: left;
		overflow-x: hidden;
		overflow-y: scroll;
	}
</style>