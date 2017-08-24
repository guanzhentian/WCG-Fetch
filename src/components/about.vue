<template>
	<div class="basic">
		<div class="container">
			<div class="col-sm-4">
				<div class="oneBlock">
					<div class="imgDiv">
						<img src="../assets/pic2.png" class="img-responsive">
					</div>
					<div class="mesDiv">
						<p class="text-center">W</p>
						<p class="text-center">负责分布式以及后端部分</p>
					</div>
				</div>
			</div>
			<div class="col-sm-4">
				<div class="oneBlock">
					<div class="imgDiv">
						<img src="../assets/pic3.png" class="img-responsive">
					</div>
					<div class="mesDiv">
						<p class="text-center">C</p>
						<p class="text-center">负责爬虫部分</p>
					</div>
				</div>
			</div>
			<div class="col-sm-4">
				<div class="oneBlock">
					<div class="imgDiv">
						<img src="../assets/pic1.png" class="img-responsive">
					</div>
					<div class="mesDiv">
						<p class="text-center">G</p>
						<p class="text-center">负责处理前端部分以及url过滤部分</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	
</script>
<style type="text/css" scoped>
	.basic{
		width: 100%;
  		height: 800px;
  		background:rgb(40,47,52) url('../assets/back3.jpg') no-repeat;
 		background-size: 100%;
	}
	.container{
		padding-top:150px;
	}
	.oneBlock{
		margin:0 20px;
		background-color:rgba(255,255,255,0.9);
		height:500px;
		transition: all .4s;
		border-radius: 10px;
		overflow:hidden;
	}
	.oneBlock:hover{
		transform: scale(1.2,1.2);
	}
	.mesDiv{
		padding-top: 30px;
	}
</style>