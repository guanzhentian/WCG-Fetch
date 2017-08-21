<template>
	<div class="basic">
		<div class="back"></div>
		<div class="toolbar" :class="{'left':isShow}">		
			<ul >
				<router-link v-for="item in pathData" :to="{'path':item.path}" tag="li" class="text-center" v-text="item.text" :key="item.path">
				</router-link>	
			</ul>				
			<div class="right">
				<span class="fui-triangle-right-large " @click="isShow = !isShow"></span>
			</div>
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
				isShow:true,
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
		overflow-x: hidden;
		min-height:700px;
	}
	.toolbar{
		position: relative;
		float:left;
		background-color: #2C3E50;
		position: absolute;
		left:0;
		width: 150px;
		height: 800px;
		transition: all .4s;
		z-index: 100;
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
		min-height: 800px;
		background-color: white;
		width: 92%;
		float: left;
	}
	.right{
		position: absolute;
		right:-34px;
	}
	.left{
		left:-150px;
	}
	div.right span{
		font-size: 40px;
		cursor: pointer;
	}
	.toolbarChange-enter-active,.toolbarChange-leave-active{
		transition: all .4s;
	}
	.toolbarChange-enter,.toolbarChange-leave-to{
		transform: translateX(-150px);
	}
</style>