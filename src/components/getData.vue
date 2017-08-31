<template>
<div>
	<div class="back">
	</div>
	<div>
		<div class="container">
			<div class="content">
				<div class="row">
					<div class=" col-xs-offset-4 col-xs-3 text-center"><h4>爬取结果</h4></div>
				</div>
				
				<div style="margin-top:50px;" class="row">
					<div class="col-md-11">
						<table class="table table-bordered ">
						<thead>
							<tr>
								<th v-for="(item,key) in showData[0]">{{key}}</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in showData">
								<td v-for="detail in item">{{detail}}</td>
							</tr>
						</tbody>
						</table>
					</div>
					
				</div>

				<div class="col-xs-offset-3">
					<ul class="pagination">
						<li ><a class="fui-arrow-left" @click="changeMultiple(-1)"></a></li>
						<li v-for="(n,index) in endNumber"><a :class="{'active':index == curIndex }" @click="getDataFromIndex(index)">{{n+(curMultiple-1)*10}}</a></li>
						<li><a class="fui-arrow-right" @click="changeMultiple(+1)"></a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<selectSpider @onSelect="select" v-if="isSelectShow"></selectSpider>
</div>
</template>
<script type="text/javascript">
	import selectSpider from './selectSpider'

	export default {
		props:{
			transData:{
				type:Array
			}
		},
		name:"getData",
		components:{
			selectSpider
		},
		data(){
			return{
				showData:[],
				pageNumber:1,
				curIndex:0,
				curMultiple:1,
				isShow:false,
				isSelectShow:true,
				selectId:null
			}
		},
		computed:{
			endNumber(){
				if(this.pageNumber - this.curMultiple*10 >= 0)
					return 10
				else
					return this.pageNumber%10
			},
			multipleNumber(){
				return Math.ceil(this.pageNumber/10)
			}
		},
		methods:{
			select(id){
				this.selectId = id;
				this.isSelectShow = false;
			},
			getData(id){
				var testid = id;
				var time ="2017-8-14 17:21";
				var name = 'Name'+id;
				var price = '$'+id;
				var content = '这是第'+id+'个简介';
				var mes = {
					"id":testid,
					"time":time,
					"name":name,
					"price":price,
					"content":content
				};
				return mes;
			},
			getNumber(){
				return 48*58;
			},
			getDataFromIndex(index){
				if(typeof index != 'undefined' && index != null)
					this.curIndex = index;
				var newData = [];
				for(var i = 0;i<48;i++)
				{
					var mes = this.getData(this.curIndex+48*this.curIndex+(this.curMultiple-1)*10+i);
					newData.push(mes);
				}
				this.showData = newData;
			},
			changeMultiple(flag)
			{
				if(flag>0)
				{
					if (this.curMultiple < this.multipleNumber)
					{
						
						this.curMultiple++;
						this.getDataFromIndex(0);
					}
				}
				else
				{
					if (this.curMultiple > 1)
					{
						this.curMultiple -- ;
						this.getDataFromIndex(0);
					}
				}
			}
		},
		mounted:function(){
			this.$nextTick(()=>{
				if(this.transData != null  && this.transData.length > 0)
				{

					this.isSelectShow = false;
					this.pageNumber = Math.ceil(this.transData.length/48);
					this.showData = this.transData;
				}else{
					var number = this.getNumber();
					this.pageNumber = Math.ceil(number/48);
					this.getDataFromIndex(0);
				}
				
			});
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
	.content{
		min-height: 700px;
		overflow: hidden;
	}
	.top{
		padding-top:20px; 
		
	}
	.pagination li>a{
		background-color: #34495E;
		cursor: pointer;
	}
	.pagination li>a:hover,
	.pagination li>a:active{
		background-color: #8E44AD;
	}
	.pagination li>a.active {
		background-color: #8E44AD;
	}

</style>