<template>
	<div>
		<div class="container">
		<transition-group name='change'>
			<div v-if="!finished" :key="1">
				<transition-group name="rowChange">
				<div class="row" v-for="(index,n) in curNumber" :key="index">
					<p class="col-md-3 text-center">选择分类项：</p>
					<select class="col-md-3" v-model="pickData[n]">
						<option v-for="data in inputData" v-show='pickData.indexOf(data.name) < 0'>{{data.name}}</option>
					</select >	
					<p class="col-md-3 text-center">输入分类依据：</p>
					<input type="text" class="col-md-3" v-model="value[n]" placeholder="输入分类依据">
				</div>
				</transition-group>
				<div class="row">
					<p class="col-md-2">是否开启模糊匹配</p>
					<div class="col-md-1">
						<selButton @onChange="setIfMohu"></selButton>
					</div>
					<button class="btn btn-primary col-md-offset-1 col-md-2" @click="changeNumber(1)">添加</button>
					<button class="btn btn-danger col-md-offset-1 col-md-2" @click="changeNumber(0)">删除</button>
					<button class="btn btn-info  col-md-offset-1 col-md-2" @click="submitData">提交</button>
				</div>
			</div>
			<div v-if="finished" :key="2">
				<table class="table table-bordered">
					<caption class="text-center caption">
						<span v-for="(text,index) in pickData">{{text}}:{{value[index]}}</span>
						<span>分类表</span>
					</caption>
					<thead>
						<tr>
							<th v-for="(item,key,index) in showData[0]" class="text-center">{{key}}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in showData">
							<td v-for="text in item" class="text-center">{{text}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</transition-group>
		</div>
	</div>
</template>
<script type="text/javascript">
	import selButton from '../SmallComponents/selectButton'
	export default {
		name:'kind',
		components:{
			selButton
		},
		data(){
			return{
				finished:false,
				inputData:[],
				curNumber:1,
				pickData:[''],
				value:[''],
				showData:[],
				isMohu:true
			}
		},
		props:{
			selectId:{
				type:[String,Number],
				require:true
			}
		},
		methods:{
			changeNumber(value){
				if(value > 0)
				{
					if(this.curNumber + 1 <= this.inputData.length)
					{
						this.curNumber ++;
						this.pickData.push('');
						this.value.push('')
					}
				}else{
					if(this.curNumber>1)
					{
						this.curNumber --;
						this.pickData.pop();
						this.value.pop();
					}
				}
			},
			submitData(){
				var sData = [];
				var patt = new RegExp(' ','g');
				for(var i =0;i<this.pickData.length;i++)
				{
				
					if(this.pickData[i] == '' || typeof this.pickData[i] == 'undefined')
					{
						alert('分类选项未选择！');
					}else{
						if(this.value[i].replace(patt,'') == '')
						{
							alert("填空为空！");
						}else{
							this.anlysisData();
						}
					}
				}
			},
			anlysisData(){
				//api getData()
				var unchangeData = this.getData()
				for(var k  = 0; k<this.pickData.length; k++)
				{
					var j = 0;
					if(this.isMohu)
						var patt = new RegExp(this.value[k]);
					else 
						var patt = new RegExp('^'+this.value[k]+'$');
					var Template = this.pickData[k];
					do{
						if(!patt.test( unchangeData[j][Template] ))
						{
							unchangeData.splice(j, 1);
							if(j<unchangeData.length)
								continue;
							else break;
						}else{
							j++;
						}
					}while(j<unchangeData.length)
				}

				this.showData = unchangeData;
				this.finished = true;

			},
			setIfMohu(bool){
				this.isMohu = bool;
			},
			getData(){
				var id = 0;
				var data = [];
				for(var i = 0;i<365;i++)
				{
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
					data.push(mes);
					id++;
				} 
				return data;
			}
		},
		mounted(){
			var getInputData  = {
				'attr':[{
					name:"id",
					value:""
				},{
					name:"time",
					value:""
				},{
					name:"name",
					value:""
				},{
					name:"price",
					value:""
				},{
					name:"content",
					value:""
				}]
			}
			//api getInputData
			this.inputData = getInputData.attr;
		}
	}
</script>
<style type="text/css" scoped>
	.row{
		height: 110px;
		padding: 20px;
		padding-top: 40px;
		margin-top: 20px;
		border:1px solid #ccc;
		border-radius: 10px;
	}
	.rowChange-enter-active,.rowChange-leave-active{
		transition: all .4s;
	}
	.rowChange-enter,.rowChange-leave-to{
		transform: translateX(200px);
		opacity: 0;
	}
	.change-enter-active,.change-leave-active{
		transition: all .4s;
	}
	.change-enter{
		transform: translateY(20%);
		opacity: 0;
	}
	.change-leave-to{
		transform: translateY(-20%);
		opacity: 0;
	}
	.caption{
		margin-bottom: 20px;
	}
	.caption span{
		font-size: 20px;
	}
</style>