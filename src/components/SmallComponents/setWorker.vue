<template>
<div>
	<div class="row">
		<label class="col-md-2 col-md-offset-4">
			<button class="btn btn-primary" @click="setWorker(1)">添加Worker</button>
		</label>
		<label class="col-md-2">
			<button class="btn btn-danger" @click="setWorker(0)">删除Worker</button>
		</label>
	</div>
	<transition-group name="showFormRight" >
		<div class="row" v-if="selectWorker.length > 0" v-for="n in selectWorker.length" :key="n">
			<div class="col-md-offset-2 col-md-2">
				选择爬虫
			</div>
			<div class="col-md-2">
				<select v-model="selectWorker[n-1]">
					<option v-for="op in workerData" v-show="!isFound(selectWorker,op)" :value="op">
						{{op.id}}
					</option>
				</select>	
			</div>
			{{selectWorker[n-1].value}}
		</div>
	</transition-group>
</div>
</template>
<script type="text/javascript">
	export default {
		props:{
			workerData:{
				type:Array,
				require:true
			},
			hasWorker:{
				type:Array,
				default(){
					return [];
				}
			}
		},
		watch:{
			selectWorker:function(){
				this.update();
			}
		},
		data(){
			return {
				selectWorker:[]
			}
		},
		methods:{
			setWorker(value)
			{
				if(value > 0)
				{
					if(this.selectWorker.length < this.workerData.length)
						this.selectWorker.push('');
				}else
				{
					if(this.selectWorker.length > 0)
						this.selectWorker.pop();
				}
			},
			update(){
				this.$emit('submit',this.selectWorker);
			},
			isFound(val1,val2){
				for(var i in val1)
				{
					var flag = true;
					for(var j in val2)
					{
						if(val2[j] != val1[i][j])
							flag = false;
					}
					if(flag)
						return flag
				}
			}	
		},
		mounted(){
			this.$nextTick(()=>{
				if(this.hasWorker.length > 0)
				{
					for(var i in this.hasWorker)
					{
						this.selectWorker.push(this.hasWorker[i]);
					}
				}	
			});
		}
	}
</script>
<style type="text/css" scoped>
	.row{
		margin-top: 20px;
		border-bottom: 1px solid #ccc;
		padding-bottom:20px;
	}
</style>