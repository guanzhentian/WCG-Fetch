<template>
	<div class="basic">
		<div class="content">
			<transition name="changeTrue">
				<div class="true" v-if="show" @click="change(1)">
					<div class="trueLeft text-center">
						<span class="">{{showWord[0]}}</span>
					</div>
					<div class="trueRight">&nbsp; </div>
				</div>
			</transition>
			<transition name="changeFalse">
				<div class="false" v-if="!show" @click="change(0)">
					<div class="falseRight">&nbsp;</div>
					<div class="falseLeft text-center" >
						<span class="">{{showWord[1]}}</span>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:{
			showWord:{
				type:Array,
				default(){
					return ['Yes','No']
				}
			}
		},
		data(){
			return{
				show:true
			}
		},
		methods:{
			change(){
				this.show = !this.show;
				this.$emit("onChange",this.show);
			}
		}
	}
</script>
<style type="text/css" scoped>
	.basic{
		cursor:pointer;
		width: 100%;
		height:100%;
		overflow:hidden;
		border-radius: 10px;
	}
	.content{
		width: 200%;
		height: 100%;
	}
	.true{
		width: 50%;
		float: left;
		background-color: #2C3E50;
		color:#16A085;
		height: 100%;
	}
	.false{
		width: 50%;
		float: left;
		background-color: #BDC3C7;
		color:#ECF0F1;
		min-height: 100%;
	}
	.trueLeft,.falseLeft{
		width: 60%;
		float: left;
		min-height: 100%;
	}
	.trueRight{
		background-color:#16A085;
		width: 40%;
		float: left;
		min-height: 100%;
	}
	.falseRight{
		background-color: #95A5A6;
		float: left;
		width: 40%;
		min-height: 100%;
	}
	.changeTrue-enter-active,.changeTrue-leave-active,.changeFalse-enter-active,.changeFalse-leave-active{
		transition: all .4s;
	}
	.changeTrue-enter,.changeTrue-leave-to{
		transform: translateX(-100%);
		opacity: 0;
	}
	.changeFalse-enter,.changeFalse-leave-to{
		opacity: 0;
	}
	.changeFalse-enter-to,.changeFalse-leave{
		transform: translateX(-100%);
	}
</style>