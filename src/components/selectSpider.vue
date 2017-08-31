<template>
<div class="shadow" >
	<div class="select">
		<p class="text-center">选择爬虫</p>
		<select class="Select" v-model="selectValue">
			<option v-for="item in inputData" :value="item">
				{{item.mainUrl}}
			</option>
		</select>
		<button class="btn btn-primary choseBtn center-block" @click="chosen">选择完毕</button>
	</div>
</div>
</template>
<script type="text/javascript">
import axios from 'axios'
	export default {
		data(){
			return{
				inputData:[],
				selectValue:null,
			}
		},
		methods:{
			chosen(){
				if(this.selectValue == null)
				{
					alert("请选择爬虫！")
				}
				else
				{
					this.$emit('onSelect',this.selectValue);
				}
			}
		},
		mounted(){
			axios.get('/api/getDoSpider')
			.then((res)=>{
				this.inputData = res.data;
			})
			.catch(function(err){
				console.error(err);
			})
		}
	}
</script>
<style type="text/css" scoped>
	div.shadow{
		position: fixed;
		top:-60px;
		left: 0px;
		z-index: 110;
		width: 100%;
		height: 150%;
		background-color: rgba(0,0,0,0.8);
	}
	div.select{
		position: relative;
		top:25%;
		left: 40%;
		width: 300px;
		height: 150px;
		background-color: white;
	}
	.choseBtn{
		margin-top: 20px;
		width: 200px;
		height:40px;
	}
	.Select{
		width: 200px;
		margin-left: 50px;
	}
</style>