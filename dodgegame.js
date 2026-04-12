//property=variable + method=function + array=list + =gameV + =gameM
const CONFIG = {
    maxSpownCounter: 17,
    baddieSpeed: 1.5,
    baddieSize: 30,
    playerSize: 20,
    playerDrawWidth: 60,
    playerDrawHeight: 60,
    playerDrawX:-20,
    playerDrawY:-20,
    assets: {
        background: document.getElementById("background-imige"),
        player: document.getElementById("player-imige"),
        baddy:document.getElementById("baddy-imige"),
    },
    canvas:{
        width: 600,
        height:400,
    }
}



class GameController{
    gameRuning=true;
    spawnCounter=0;

    constructor (){
        gameV.canvas.addEventListener("mousemove", this.updateplayerposition)
        window.addEventListener("keydown",this.keydown)
    }

    keydown = (e) => {
        if (e.key===" "){
            this.gameRuning=!this.gameRuning;
            gameV.canvas.style.cursor=this.gameRuning ? "none" : "default";

        }

        e.preventDefault();
    }

    updateplayerposition = (e) => {
        if (this.gameRuning){
            gameM.player.x=e.offsetX -7.5;
            gameM.player.y=e.offsetY -7.5;
        }
    }

    gameOver() {
        gameM.baddies=[];
        gameV.canvas.style.cursor="default";

    }

    checkAllBaddis(){
        for (let i=0;i<gameM.baddies.length; i++) {
            let result = this.CheckColishin(gameM.player,gameM.baddies[i])
            if(result){
                this.gameOver();
                this.gameRuning=false;
                return;
            }
        }
    }

    addBaddie (x,y) {
        let baddie={
            x,y,
            width:CONFIG.baddieSize,
            height:CONFIG.baddieSize
        };
        gameM.baddies.push(baddie);
    }

    CheckColishin(a,b){
        if (a.x<b.x +b.width&&
            b.x<a.x + a.width&&
            a.y<b.y+b.height&&
            b.y<a.y+a.height) {
            return true
        } else {
            return false
        }
    }
    onTick=()=>{
        if (this.gameRuning){
            this.updateBaddies();
            this.checkAllBaddis();
        }
        gameV.drawGame();
        requestAnimationFrame(this.onTick);
    }

    updateBaddies (){
       this.spawnCounter--;
       if (this.spawnCounter<=0){
            this.spawnCounter=CONFIG.maxSpownCounter;
           this.addBaddie(0, Math.random()*400);
       }
        for (let i=gameM.baddies.length-1; i>=0; i--){
            gameM.baddies[i].x+=CONFIG.baddieSpeed;
            if (gameM.baddies[i].x>600){
                gameM.baddies.splice(i,1);
            }
        }
    }
}

class GameView{
    canvas;
    ctx;
    restartButton = document.getElementById("restart");

    constructor () {
        this.canvas=document.getElementById("game-canvas");
        this.restartButton.addEventListener ("click",()=>{
            gameC.gameRuning=true;
            gameM.baddies=[];
            this.canvas.style.cursor="none";
        })
        this.canvas.style.cursor="none";

        this.ctx=this.canvas.getContext("2d");
        this.canvas.width=CONFIG.canvas.width;
        this.canvas.height=CONFIG.canvas.height;
    }
    
    drawGame (){
        //this.ctx.fillStyle="#42d"
        //this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);//background
         this.ctx.drawImage(CONFIG.assets.background,0,0,CONFIG.canvas.width,CONFIG.canvas.height)

        for(let i=0; i<gameM.baddies.length;i++){
            let obj=gameM.baddies[i];
            //this.ctx.fillStyle="#f09";
            //this.ctx.fillRect(obj.x,obj.y,obj.width,obj.height);  
            this.ctx.drawImage(CONFIG.assets.baddy,obj.x,obj.y,obj.width,obj.height)
        }
       // this.ctx.fillStyle="#d3b";
        //this.ctx.fillRect(gameM.player.x,gameM.player.y,gameM.player.width,gameM.player.height);  // player
        this.ctx.drawImage(CONFIG.assets.player,gameM.player.x+CONFIG.playerDrawX,gameM.player.y+CONFIG.playerDrawY,CONFIG.playerDrawWidth,CONFIG.playerDrawHeight)

    }// i want to eat a pencel this has nothing to do with code
}

class GameModel{
    player= {x:300,y:200,width:CONFIG.playerSize,height:CONFIG.playerSize};
    baddies=[];
}

let gameM=new GameModel();
let gameV=new GameView();
let gameC=new GameController();
 
//initializing scripts
gameC.onTick();
