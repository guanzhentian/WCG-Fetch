<template>
<div>
	<div class="back">
	</div>
	<div>
		<div class="container">
			<div class="content">
				<div class="row">
					<div class=" col-xs-offset-4 col-xs-3 text-center"><h4>爬取结果</h4></div>
					<div class="top input-group col-xs-3 pull-right">
						<input type="search" name="search" placeholder="搜索" class="search form-control">
						<span class="input-group-btn">
							<button class="btn">
								<span class="fui-search"></span>
							</button>
						</span>
					</div>
				</div>
				
				<div style="margin-top:50px;">
					<table class="table table-striped table-hover">
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
</div>
</template>
<script type="text/javascript">
	export default {
		name:"getData",
		data(){
			return{
				showData:[],
				pageNumber:1,
				curIndex:0,
				curMultiple:1,
				isShow:false
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
			getData(id){
				let testid = id;
				let time ="2017-8-14 17:21";
				let name = 'Name'+id;
				let price = '$'+id;
				let content = '这是第'+id+'个简介';
				let mes = {
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
				let newData = [];
				for(let i = 0;i<48;i++)
				{
					let mes = this.getData(this.curIndex+48*this.curIndex+(this.curMultiple-1)*10+i);
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
				let number = this.getNumber();
				this.pageNumber = Math.ceil(number/48);
				this.getDataFromIndex(0);
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