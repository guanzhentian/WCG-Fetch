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
							<tr v-for="item in realShow">
								<td v-for="detail in item">{{detail}}</td>
							</tr>
						</tbody>
						</table>
					</div>
					
				</div>

				<div class="col-xs-offset-3">
					<ul class="pagination">
						<li ><a class="fui-arrow-left" @click="changeMultiple(-1)"></a></li>
						<li v-for="(n,index) in endNumber"><a :class="{'active':index == curIndex }" @click="changeShow(index)">{{n+(curMultiple-1)*10}}</a></li>
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
import axios from 'axios'
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
				selectValue:null
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
			},
			realShow(){
				if(this.curIndex+(this.curMultiple-1)*10+48 > this.showData.length)
				{
					return this.showData.slice(this.curIndex*48+(this.curMultiple-1)*10*48,this.showData.length)
				}
				return this.showData.slice(this.curIndex*48+(this.curMultiple-1)*10*48,this.curIndex*48+(this.curMultiple-1)*10*48+48)
			},

		},
		methods:{
			changeShow(val){
				this.curIndex = val;
			},
			select(item){
				this.selectValue = item;
				this.isSelectShow = false;
				axios.post('/api/getAllData',{
						id:item.id
				})
				.then((res)=>{
					this.showData = res.data;
					var number = this.showData.length;
					this.pageNumber = Math.ceil(number/48);
				
				})
				.catch(function(err){
					console.error(err);
				})
			},	
			changeMultiple(flag)
			{
				console.log(this.endNumber,this.multipleNumber)
				if(flag>0)
				{
					if (this.curMultiple < this.multipleNumber)
					{
						
						this.curMultiple++;
						this.curIndex = 0;
					}
				}
				else
				{
					if (this.curMultiple > 1)
					{
						this.curMultiple -- ;
						this.curIndex = 0;
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