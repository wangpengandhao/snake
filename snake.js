function Snake(){
	this.sence=document.querySelector('.sence');
	this.snake=['2_0','3_0','4_0'];
	this.direction=40;
	this.flag={'2_0':true,'3_0':true,'4_0':true};
	this.food='';
}
Snake.prototype={
	start:function(){
		this.drawSence();
		this.drawSnake();
		this.key();
		this.dropFood();
		this.move();
	},
	drawSence:function(){
		for(let i=0;i<20;i++){
			for(let j=0;j<20;j++){
				this.sence.innerHTML+=`<div class="block" id="${i}_${j}"></div>`;
			}
		}
	},
	drawSnake:function(){
		this.snake.forEach(element=>{
			document.getElementById(element).classList.add('hot');
		})
	},
	move:function(){
		let that=this;
		this.t=setInterval(function(){
			let oldt=that.snake[that.snake.length-1];
			let arr=oldt.split('_');
			let newt='';
			if(that.direction==37){
				newt=`${arr[0]*1}_${arr[1]*1-1}`;
			}
			else if(that.direction==38){
				newt=`${arr[0]*1-1}_${arr[1]*1}`;
			}
			else if(that.direction==39){
				newt=`${arr[0]*1}_${arr[1]*1+1}`;
			}
			else if(that.direction==40){
				newt=`${arr[0]*1+1}_${arr[1]*1}`;
			}
			let newarr=newt.split('_');
			if(newarr[1]*1<0||newarr[1]*1>19||newarr[0]*1<0||newarr[0]*1>19||that.flag[newt]){
				clearInterval(that.t)
				alert('真笨');
			}
			if(newt==that.food){
				that.snake.push(newt);
				console.log(that.snake);
				that.flag[newt]=true;
				document.getElementById(that.food).style.background='';
				that.dropFood();
			}else{
				that.flag[newt]=true;
				that.snake.push(newt);
				let weiba=that.snake.shift();
				delete that.flag[weiba];
				document.getElementById(weiba).classList.remove('hot');
			}
			that.drawSnake();
		},400)
	},
	key:function(){
		let that=this;
		document.onkeydown=function(e){
			let keycode=e.keyCode;
			
			if(Math.abs(keycode-that.direction)==2){
				return;
			}
			that.direction=keycode;
		}
	},
	dropFood:function(){
		let x=Math.floor(Math.random()*20);
		let y=Math.floor(Math.random()*20);
		do{
			x=Math.floor(Math.random()*20);
			y=Math.floor(Math.random()*20);
		}while(this.flag[`${x}_${y}`])
		this.food=`${x}_${y}`;
		document.getElementById(this.food).style.background='red';
	}
}
