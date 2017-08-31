<template>
	<div class="basic">
		<div class="back"></div>
		<div class="toolbar" :class="{'left':isShow}">		
			<ul >
				<li v-for="item in pathData" @click="currentView = item.path" class="text-center" :class="{'acitve':currentView == item.path}" v-text="item.text" :key="item.path" >
				</li>	
			</ul>				
			<div class="right">
				<span class="fui-triangle-right-large " @click="isShow = !isShow"></span>
			</div>
		</div>
		
		<div class="content">
			<transition name="componentChange" mode="out-in">
				<component :is="currentView" :selectId='selectValue.id'></component>
			</transition>	
		</div>
		<selectSpider @onSelect="select" v-if="isSelectShow"></selectSpider>
	</div>
</template>
<script type="text/javascript">
import Process from './Analysis/process'
import bar from './Analysis/bar'
import kind from './Analysis/kind'
import c2048 from './Analysis/c2048'
import selectSpider from './selectSpider'	

import axios from 'axios'


	export default {
		name:"anlysis",
		components:{
			Process,
			bar,
			kind,
			c2048,
			selectSpider
		},
		data(){
			return{
				isSelectShow:true,
				currentView:'Process',
				isShow:true,
				pathData:[{
					path:'Process',
					text:'爬取过程'
				},{
					path:'bar',
					text:'图表分析'
				},{
					path:'kind',
					text:'分类分析'
				},
				{
					path:'c2048',
					text:'2048'
				}],
				showData:[],
				selectValue:{}
			}
		},
		methods:{
			select(item){
				this.selectValue = item;
				this.isSelectShow = false;
				axios.post('/api/getAllData',{
						id:item.id
				})
				.then((res)=>{
					console.log(res.data);
					this.showData = res.data;		
				})
				.catch(function(err){
					console.error(err);
				})
			},	
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
	li.acitve {
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
	.toolbarChange-enter-active,.toolbarChange-leave-active,.componentChange-enter-active,.componentChange-leave-active{
		transition: all .4s;
	}
	.toolbarChange-enter,.toolbarChange-leave-to{
		transform: translateX(-150px);
	}
	.componentChange-enter{
		transform: translateY(20%);
		opacity: 0;
	}
	.componentChange-leave-to{
		transform: translateY(-20%);
		opacity: 0;
	}
</style>