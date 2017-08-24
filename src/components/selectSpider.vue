<template>
<div class="shadow" >
	<div class="select">
		<p class="text-center">选择爬虫</p>
		<select class="Select" v-model="selectValue">
			<option v-for="item in inputData">
				{{item.mainUrl}}
			</option>
		</select>
		<button class="btn btn-primary choseBtn center-block" @click="chosen">选择完毕</button>
	</div>
</div>
</template>
<script type="text/javascript">
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
			var getInputData = [{
				'mainUrl':'baidu.com'
			},{
				'mainUrl':'taobao.com'
			},{
				'mainUrl':'tamll.com'
			}]
			//api getInputData
			if(getInputData.length > 0)
			{
				this.inputData = getInputData;
			}else{
				alert("没有正在运行的爬虫！");
				this.$router.push('/setSpider');
			}
			

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