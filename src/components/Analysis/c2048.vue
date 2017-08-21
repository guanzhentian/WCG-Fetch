<template>
	<div class="container">
		<div class=" gameArea">
			<div v-for="(item,index) in positionData" class="gameBlock text-center " :class="scroeColor(item)" v-text="checkNone(item.value)"></div>
		</div>
		<div class="right">
			<h1>{{scroe}}</h1>
			<button class="btn btn-primary" @click="reStart">restart</button>
		</div>
	</div>
</template>

<script type="text/javascript">
	
	var vm = {
		name:"c2048",
		computed:{
			
		},
		data(){
			return{
				curInv:null,
				scroe:0,
				positionData:[{
					value:0
				},{
					value:0
				},{
					value:0
				},{
					value:0
				},{
					value:0
				},{
					value:0
				},{
					value:0
				},{
					value:0
				},{
					value:0
				},{
					value:0
				},{
					value:0
				},{
					value:0
				},{
					value:0
				},{
					value:0
				},{
					value:0
				},{
					value:0
				},]
			}
		},
		methods:{
			scroeColor(item){
				return{
					'color2':item.value == 2,
					'color4':item.value == 4,
					'color8':item.value == 8,
					'color16':item.value == 16,
					'color32':item.value == 32,
					'color64':item.value == 64,
					'color128':item.value == 128,
					'color256':item.value == 256,
					'color512':item.value == 512,
					'color1024':item.value == 1024,
					'color2048':item.value == 2048,
				}
			},
			checkNone(value){
				if(value === 0 )
				{
					return ' '
				}else{
					return value
				}
			},
			reStart(){
				this.scroe = 0;
				for(let i = 0;i<16;i++)
				{
					this.positionData[i].value = 0;
				}
				let ran1,ran2
				do{
					ran1 = Math.floor(Math.random()*16);
					ran2 = Math.floor(Math.random()*16);
				}while(ran1 == ran2)
				this.positionData[ran1].value = 2;
				this.positionData[ran2].value = 2;
			},
			keyDownFun(keyCode)
			{
				switch (keyCode)
				{
					case 37:
						this.left();
						break;
					case 39:
						this.right();
						break;
					case 38:
						this.top();
						break;
					case 40:
						this.buttom();
						break;
					default:break;
				}
			},
			left(){
				let changeFlag = false;
				for(let row = 0;row<4;row++)
				{
					let rowData = [];
					for(let i = 0;i<4;i++)
					{	let newData = this.positionData[row*4 + i].value;
						rowData.push(newData);
					}
					let index = 0;
					do{
						if(rowData[index]!=0)
						{
							let flowIndex = index + 1;
							do{
								if(rowData[index] === rowData[flowIndex])
								{

									this.scroe +=rowData[flowIndex];
									rowData[index] += rowData[flowIndex];
									rowData[flowIndex] = 0;
									index = flowIndex + 1 ;
									changeFlag = true;
									break;
								}
								else if(rowData[flowIndex] === 0)
								{
									flowIndex++;
									if(flowIndex>rowData.length-1)
										index++;
								}
								else{
									index++;
									break;
								}
							}while(flowIndex <= rowData.length)

							if(index >= rowData.length-1)
								break;
						}
						else
						{
							index++;
						}
					}while(index <= rowData.length-1)
					index = 0;
					let finalIndex = 0;
					do
					{
						if(index>3)
						{
							if(this.positionData[row*4 + finalIndex].value != 0)
								changeFlag = true;
							this.positionData[row*4 + finalIndex].value = 0;
							finalIndex++;
						}
						if(rowData[index] >0)
						{
							this.positionData[row*4 + finalIndex].value = rowData[index];
							finalIndex++;
							index++;
						}
						else{
							index++;
						}
					}while(finalIndex < 4)
				}
				if(changeFlag)
					setTimeout(this.randomOne,100);
				else{
					let Checkflag = true;
					for(let i = 0;i<this.positionData.length;i++)
					{
						if(this.positionData[i].value === 0)
							Checkflag = false;
					}
					if(Checkflag)
					{
						alert("游戏结束！");
						this.reStart();
					}
				}
			},
			right(){
				let changeFlag = false;
				for(let row = 0;row<4;row++)
				{
					let rowData = [];
					for(let i = 0;i<4;i++)
					{	let newData = this.positionData[row*4 + i].value;
						rowData.push(newData);
					}
					let index = rowData.length-1;
					do{
						if(rowData[index]!=0)
						{
							let flowIndex = index - 1;
							do{
								if(rowData[index] === rowData[flowIndex])
								{
									this.scroe +=rowData[flowIndex];
									rowData[index] += rowData[flowIndex];
									rowData[flowIndex] = 0;
									index = flowIndex - 1 ;
									changeFlag = true;
									break;
								}
								else if(rowData[flowIndex] === 0)
								{
									flowIndex--;
									if(flowIndex < 0)
										index -- ;
								}
								else{
									index--;
									break;
								}
							}while(flowIndex >= 0)

							if(index < 0)
								break;
						}
						else
						{
							index--;
						}
					}while(index > 0)
					index = rowData.length-1;
					let finalIndex = rowData.length-1;
					do
					{
						if(index<0)
						{
							if(this.positionData[row*4 + finalIndex].value != 0)
								changeFlag = true;
							this.positionData[row*4 + finalIndex].value = 0;
							finalIndex--;
						}
						if(rowData[index] >0)
						{
							this.positionData[row*4 + finalIndex].value = rowData[index];
							finalIndex--;
							index--;
						}
						else{
							index--;
						}
					}while(finalIndex >=0)
				}
				if(changeFlag)
					setTimeout(this.randomOne,100);
				else{
					let Checkflag = true;
					for(let i = 0;i<this.positionData.length;i++)
					{
						if(this.positionData[i].value === 0)
							Checkflag = false;
					}
					if(Checkflag)
					{
						alert("游戏结束！");
						this.reStart();
					}
				}
			},
			top(){
				let changeFlag = false;
				for(let row = 0;row<4;row++)
				{
					let rowData = [];
					for(let i = 0;i<4;i++)
					{	let newData = this.positionData[row + i*4].value;
						rowData.push(newData);
					}
					let index = 0;
					do{
						if(rowData[index]!=0)
						{
							let flowIndex = index + 1;
							do{
								if(rowData[index] === rowData[flowIndex])
								{
									this.scroe +=rowData[flowIndex];
									rowData[index] += rowData[flowIndex];
									rowData[flowIndex] = 0;
									index = flowIndex + 1 ;
									changeFlag = true;
									break;
								}
								else if(rowData[flowIndex] === 0)
								{
									flowIndex++;
									if(flowIndex>rowData.length-1)
										index++;
								}
								else{
									index++;
									break;
								}
							}while(flowIndex <= rowData.length)

							if(index >= rowData.length-1)
								break;
						}
						else
						{
							index++;
						}
					}while(index <= rowData.length-1)
					index = 0;
					let finalIndex = 0;
					do
					{
						if(index>3)
						{
							if(this.positionData[row + finalIndex*4].value != 0)
								changeFlag = true;
							this.positionData[row+ finalIndex*4].value = 0;
							finalIndex++;
						}
						if(rowData[index] >0)
						{
							this.positionData[row + finalIndex*4].value = rowData[index];
							finalIndex++;
							index++;
						}
						else{
							index++;
						}
					}while(finalIndex < 4)
				}
				if(changeFlag)
					setTimeout(this.randomOne,100);
				else{
					let Checkflag = true;
					for(let i = 0;i<this.positionData.length;i++)
					{
						if(this.positionData[i].value === 0)
							Checkflag = false;
					}
					if(Checkflag)
					{
						alert("游戏结束！");
						this.reStart();
					}
				}
			},
			buttom(){
				let changeFlag = false;
				for(let row = 0;row<4;row++)
				{
					let rowData = [];
					for(let i = 0;i<4;i++)
					{	let newData = this.positionData[row + i*4].value;
						rowData.push(newData);
					}
					let index = rowData.length-1;
					do{
						if(rowData[index]!=0)
						{
							let flowIndex = index - 1;
							do{
								if(rowData[index] === rowData[flowIndex])
								{
									this.scroe +=rowData[flowIndex];
									rowData[index] += rowData[flowIndex];
									rowData[flowIndex] = 0;
									index = flowIndex - 1 ;
									changeFlag = true;
									break;
								}
								else if(rowData[flowIndex] === 0)
								{
									flowIndex--;
									if(flowIndex < 0)
										index -- ;
								}
								else{
									index--;
									break;
								}
							}while(flowIndex >= 0)

							if(index < 0)
								break;
						}
						else
						{
							index--;
						}
					}while(index > 0)
					index = rowData.length-1;
					let finalIndex = rowData.length-1;
					do
					{
						if(index<0)
						{
							if(this.positionData[row + finalIndex*4].value != 0)
								changeFlag = true;
							this.positionData[row+ finalIndex*4 ].value = 0;
							finalIndex--;
						}
						if(rowData[index] >0)
						{
							this.positionData[row + finalIndex*4].value = rowData[index];
							finalIndex--;
							index--;
						}
						else{
							index--;
						}
					}while(finalIndex >=0)
				}
				if(changeFlag)
					setTimeout(this.randomOne,100);
				else{
					let Checkflag = true;
					for(let i = 0;i<this.positionData.length;i++)
					{
						if(this.positionData[i].value === 0)
							Checkflag = false;
					}
					if(Checkflag)
					{
						alert("游戏结束！");
						this.reStart();
					}
				}
			},
			randomOne(){
				let recordeArray = [];
				for(let i = 0;i<this.positionData.length;i++)
				{
					if(this.positionData[i].value === 0)
					{
						recordeArray.push(i);
					}
				}
				if(recordeArray.length === 0 )
				{
					alert("游戏结束！");
					this.reStart();
				}
				else	
					this.positionData[recordeArray[Math.floor(Math.random()*recordeArray.length)]].value=Math.random() > 0.1?2:4;
			}
		},
		mounted(){
			let ran1,ran2;
			do{
				ran1 = Math.floor(Math.random()*16);
				ran2 = Math.floor(Math.random()*16);
			}while(ran1 == ran2)
			this.positionData[ran1].value = 2;
			this.positionData[ran2].value = 2;
			this.$nextTick(()=>{
				document.body.onkeyup = (event)=>{
					event = event || window.event;
					this.keyDownFun(event.keyCode);
				}
				document.body.onkeydown = (event)=>{
					if(event.keyCode >36 && event.keyCode < 41)
						event.preventDefault();
				}
 			});
		}
	}

	export default vm
</script>

<style type="text/css" scoped>
	.gameArea{
		margin-top: 80px;
		background-color: #BDC3C7;
		min-height: 600px;
		max-width:600px;
		min-width:600px;
		padding: 10px;
		float: left
	}
	.gameBlock{
		float: left;
		background-color:#34495E;
		width: 125px;
		margin: 10px;
		height: 125px;
		line-height: 125px;
		font-size: 35px;
		border-radius: 5px;
		color:#ECF0F1;
		transition: all .4s;
	}
	.right{
		float: left;
		margin-left: 20px;
		width: 30%;
		padding-top: 30%;
	}
	.color2{
		background-color:#F39C12;
		color:#ECF0F1;
	}
	.color4{
		background-color:#F1C40F;
		color:#ECF0F1;
	}
	.color8{
		background-color:#E67E22;
		color:#ECF0F1;
	}
	.color16{
		background-color:#D35400;
		color:#ECF0F1;
	}
	.color32{
		background-color:#E74C3C;
		color:#ECF0F1;
	}
	.color64{
		background-color:#C0392B;
		color:#ECF0F1;
	}
	.color128{
		background-color:#CC6600;
		color:#ECF0F1;
	}
	.color256{
		background-color:#CC6633;
		color:#ECF0F1;
	}
	.color512{
		background-color:#CC6666;
		color:#ECF0F1;
	}
	.color1024{
		background-color:#CC6699;
		color:#ECF0F1;
	}
	.color2048{
		background-color:#CC66CC;
		color:#ECF0F1;
	}
</style>