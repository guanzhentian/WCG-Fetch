<template>
	<div class="detailDiv">
		<span class="fui-cross closeSpan" @click="closeDiv"></span>
		<div class="container detailContainer">		
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h3 class="panel-title">基本信息</h3>
				</div>
				<div class="panel-body">
					<div class="col-md-offset-1 col-md-offset-5">
								
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:{
			data:{
				type:Object,
				require:true,
			}
		},
		methods:{
			closeDiv(){
				this.$emit('closeDetail');
			}
		}
	}
</script>
<style type="text/css" scoped>
	.detailDiv{
		width: 100%;
		height: 100%;
		position: fixed;
		top:0;
		left: 0;
		background-color: rgba(0,0,0,0.2);
		z-index: 101;
		padding-top: 30px;
	}
	.detailContainer{
		background-color: white;
		min-height: 800px;
	}
	.closeSpan{
		cursor: pointer;
		transition: all .4s;
		position: absolute;
		top:-13px;
		right:100px;
		font-size: 50px
	}
	.closeSpan:hover{
		color:#1ABC9C;
		transform: rotate(180deg);
	}
</style>