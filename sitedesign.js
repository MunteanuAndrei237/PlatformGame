let cvs=byId("game");
let cvsct=byId("canvascontainer");
let ctx=cvs.getContext("2d");
let startingtop=innerHeight/8+100;
let startingleft=innerWidth/2-200;
cvsct.style="position:fixed;margin: 0 auto;text-align: center;align-items: right;justify-content: space-between;width:400px;height:700px;background-color:white;top:"+startingtop+"px;left:"+startingleft+"px;";
cvs.style="position:absolute;background-color:black;margin: 0 auto;text-align: center;align-items: center;width:400px;height:10000px;top:0px;left:0px;";
//resize
function resizeing(){
    let startingtop=innerHeight/8+100;
    let startingleft=innerWidth/2-200;
    cvsct.style.top=startingtop+"px";
    cvsct.style.left=startingleft+"px";
    progressbar.style.left=(startingleft+50)+"px";
    progressbar.style.top=(startingtop+700)+"px";
    onelifetext.style.left=(startingleft+60)+"px";
    onelifetext.style.top=(startingtop-40)+"px";
}
//byid/classname
function byId(id){
    return document.getElementById(id);
}
function byclass(id)
{
    return document.getElementsByClassName(id)[0];
}
//screen
let menu=byclass("menu");
let menubutton=byclass("menubutton");
let menuopened=false;
menubutton.addEventListener("click",openmenu)
function openmenu(){
    if(menuopened==false)
    {
        menu.className+=" menu1";
        menuopened=true;
    }
    else if(menuopened==true)
    {
        menu.className=menu.className.replace(" menu1","");
        menuopened=false;
    }
}
menu.addEventListener("mouseleave",function(){
    menu.className=menu.className.replace(" menu1","");
})
let onelifemode=byId("onelifemode");
let onelifetext=byId("onelifetext");
onelifetext.style.left=(startingleft+60)+"px";
onelifetext.style.top=(startingtop-40)+"px";
let booleanonelife=false;
onelifemode.addEventListener("click",onelifemodee)
//allow audio
let yes=byId("yes");
let no=byId("no");
let allowaudio=byId("allowaudio")
yes.addEventListener("click",function(){
    allowaudio.style.display="none";
    defaultsound.play();
})
no.addEventListener("click",function(){
    allowaudio.style.display="none";
    audio=false;
    audiotext.innerHTML="Audio:off";
})
//audio
let jumpsound=byId("jumpsound");
let winningsound=byId("winningsound");
let losingsound=byId("losingsound");
let defaultsound=byId("defaultsound");
//settings button
let audio=true;
let circleopened=false;
let settings=byclass("settings");
let noncircle=byclass("noncircle");
let circle=byclass("circle");
let audiotext=byId("circletext");
settings.addEventListener("click",openset);
function openset(){
    if(circleopened==false)
    {
    noncircle.className+=" circle";
    circleopened=true;
    }
    else if(circleopened==true)
    {
        noncircle.className=noncircle.className.replace(" circle","");
        circleopened=false;
    }
}
noncircle.addEventListener("mouseleave",closeset)
function closeset(){
    noncircle.className=noncircle.className.replace(" circle","");
}
audiotext.addEventListener("click",audioonoff);
function audioonoff(){
if(audio==true)
{
    audiotext.innerHTML="Audio:off";
    audio=false;
 defaultsound.pause();
}
else if(audio==false)
{
    audiotext.innerHTML="Audio:on";
    audio=true;
defaultsound.play();
}
}
//default
let goingright8=[];
let check7=[];
let levelstarted=false;
let level=1;
let nr=0;
let pass500=0;
let platforms=[];
let ss=[];
let trasnparent=byId("transparency9");
//me
let imgsqright=new Image();
let imgsqleft=new Image();
imgsqright.src="astronautright.png";
imgsqleft.src="astronautleft.png";
let me={
    width:25,
    height:37,
    img:imgsqright,
    x:300,
    y:9900,
    speed:0,
    maxspeed:5,
    friction:0.1,
    jump:13,
    defaultgravity:0.3,
    gravity:0.3,
    fallspeed:0,
    falling:false,
    watching:"right",
    bottom:0,
    right:0,
    //const
    defaultgravity:0.3
}
//moving
function walking(){
        //friction
        if(me.speed<0)
        me.speed=me.speed+me.friction;
        else if(me.speed>0)
        me.speed=me.speed-me.friction;
        if(me.speed<0.2 && me.speed>-0.2)
        me.speed=0;
         //update
        me.x=me.x+me.speed;
        me.y=me.y+me.fallspeed;
        me.fallspeed=me.fallspeed+me.gravity;
        //fall
        if(me.fallspeed>0)
        me.falling=true;
        else
        me.falling=false;
        //bottomright
        me.bottom=me.y+me.height;
        me.right=me.x+me.width;
        //move
        if(dreapta==true){
            me.img=imgsqleft;
            if(Math.abs(me.speed)<me.maxspeed)
            me.speed-=0.6;}
            else if(stanga==true){
        me.img=imgsqright;
        if(Math.abs(me.speed)<me.maxspeed)
        me.speed+=0.6;}
}
//controls
var dreapta=false;
var stanga=false;
function keys(evt){
    switch(evt.key){    
    case "a": case "A": case "ArrowLeft":
        if(level!=3)
        dreapta=true;
        else
        stanga=true;
        break;
        case"d": case"D": case"ArrowRight":
        if(level!=3)
        stanga=true;
        else
        dreapta=true;
        break;
    }
};
function keys2(evt){
    switch(evt.key){    
        case "a": case "A": case "ArrowLeft":
            if(level!=3)
            dreapta=false;
            else
            stanga=false;
            break;
            case"d": case"D": case"ArrowRight":
            if(level!=3)
            stanga=false;
            else
            dreapta=false;
            break;  
}
}
function jump(){
if(audio==true)
jumpsound.play();
if(level!=5)
me.fallspeed=-10;
else
me.fallspeed=-20;
}
//onelifemode
function onelifemodee(){
    if(booleanonelife==false)
    {
        booleanonelife=true;
        onelifemode.innerHTML="One-life mode:On";
        onelifetext.style.display="block";
        selectlevel.style.display="none";
        for(let i=1;i<=9;i++)
    levelselector["a"+i].style.display="none";
    level=1;
    showpreview(1);  
}
    else if(booleanonelife==true)
    {
     booleanonelife=false;
     onelifemode.innerHTML="One-life mode:Off";
     onelifetext.style.display="none";
    selectlevel.style.display="block";
    for(let i=1;i<=9;i++)
    levelselector["a"+i].style.display="block";
    }
}
//winlosepreviewlevels
let trya=byId("tryagain");
let nextl=byId("nextlevel");
let playl=byId("playlevel");
let textl=byId("textlevel");
let textt=byId("textt");
let description=byId("description");
let levelselector = {};
for(let i=1;i<=9;i++)
{
    levelselector["a"+i]=byId("a"+i);
    levelselector["a"+i].addEventListener("click",function(){
        levelstarted=false;
        trasnparent.style.display="none";
        var idx = this.id.replace("a","");
        level=idx;
        showpreview(level);
    })
}
//levels
function nextlevel(){
    level++;
    if(level>9)
    level=1;
    showpreview(level);
}
function samelevel(){
    showpreview(level); 
}
function showpreview(level){
    trya.style.display="none"; 
    nextl.style.display="none";
    inair();
        textl.innerHTML="Level "+level;
        if(level==1) description.innerHTML="Let's start with something easy";
        else if(level==2) description.innerHTML="Let's shrink the platforms";
        else if(level==3) description.innerHTML="Reversed controls";
        else if(level==4) description.innerHTML="Let's start from the top";
        else if(level==5) description.innerHTML="Gravity changed";   
        else if(level==6) description.innerHTML="You have only one try";
        else if(level==7) description.innerHTML="Think fast";
        else if(level==8) description.innerHTML="Let's move the platforms";
        else if(level==9) description.innerHTML="In the darkness";
    playl.style.top=1200+"px";
    textt.style.display="block";
    playl.addEventListener("click",startlevel)
}
function startlevel(){
    nr=30;
    if(level==7)
    {
    for(i=1;i<=nr;i++)
    check7[i]=0;
    }
    else if(level==8)
    {
    for(i=1;i<=nr;i++)
    goingright8[i]=true;
    }
    ss=[];
    levelstarted=true;
    cvsct.style.backgroundColor="white";
    me.x=300;
    pass500=0;
    if(level !=4)
    {
    me.y=10000-me.height;}
    else if(level==4)
    me.y=10000-nr*150;
    if(level!=5)
    me.defaultgravity=0.3;
    else{
        me.defaultgravity=0.5;
        me.gravity=0.5;
    }
    particles=[];
    load();
}
//load
function load(){  
    for(let i=1;i<=nr;i++)
    {
        platforms[i]=new Platform(10000-i*150);
        if(level==7)
        {
        ss[i]=platforms[i].left;
        platforms[i].left=450;
        }
    } 
    if(level!=4)
    {flag.top=platforms[nr].top-40;
        flag.left=platforms[nr].left;
    }
       else
       {
           flag.top=platforms[1].top-40;
            flag.left=platforms[1].left; 
       }
    if(level==9)
       trasnparent.style.display="block";

       for(let i=0;i<=1000;i++)
    {
        particles[i]=new Particle(Math.floor(Math.random()*398),(5000+Math.floor(Math.random()*5000)),0.6);
    }
}
//platforms
let pimg=new Image();
pimg.src="platform5.png";
class Platform{
    constructor(top){
    this.top=top;
    if(level==1 || level ==6 || level==8)
    {
        this.width=85+Math.floor(Math.random()*35);
        this.left=Math.floor(Math.random()*281);
    }
    else if(level==2 || level ==5 || level==4)
    {
        this.width=40+Math.floor(Math.random()*10);
        this.left=Math.floor(Math.random()*351);
    }
    else if(level==7 || level==9 || level==3)
    {
        this.width=70+Math.floor(Math.random()*20);
        this.left=Math.floor(Math.random()*311);
    }
    this.img=pimg;
    }
}
//drawingplatforms
function drawplatforms(){
    for(let i=1;i<=nr;i++)
{
ctx.drawImage(platforms[i].img,0,0,174,50,platforms[i].left,platforms[i].top,platforms[i].width,20);
if(level==7)
startmovingfromrighttoleft(i);
}
}
//fromrighttoleft7
function startmovingfromrighttoleft(i)
{
    if(platforms[i].left>=ss[i] && check7[i]==1)
    platforms[i].left-=5;
}
//delete after getting out of screen
function deleteold(){
for(let i=1;i<=nr;i++){
    if(level!=4)
    {
if(platforms[i].top>me.y+400)
    {
    ctx.clearRect(platforms[i].left,platforms[i].top,platforms[i].width,20);
    platforms.splice(i,1);
    nr--;
    if(level==8)
    goingright8.splice(i,1);
    else if(level==7)
    ss.splice(i,1);
    }
}
if(level==4){
if(platforms[i].top<me.y-400)
    {
        ctx.clearRect(platforms[i].left,platforms[i].top,platforms[i].width,20);
        platforms.splice(i,1);
        nr--;
    }}
  else  if(level==7)
    {
        if(me.y-150<platforms[i].top)
        {
            check7[i]=1;
        }
    }
    if(level==8)
    {
             goingleftright(i);
             if(platforms[i].left+platforms[i].width>=400)
             {
                goingright8[i]=false;
                }
             else if(platforms[i].left<=0)
             goingright8[i]=true;
    }
}
}
function goingleftright(i)
{
    if(goingright8[i]==true)
    platforms[i].left+=4;
    else if(goingright8[i]==false)
    platforms[i].left-=4;
}
//marginscreen
function marginscreen(){
    if(me.x<-me.width/2)
me.x=400-me.width/2;
else if(me.x>400-me.width/2 && me.x<600)
me.x=-me.width/2;
}
//colision
function colision(){
for(let i=1;i<=nr;i++)
{
    if(me.bottom>platforms[i].top && me.bottom<platforms[i].top+20 && me.x<(platforms[i].left+platforms[i].width) && me.right>platforms[i].left)
    {
        if(me.falling==true)
        {me.gravity=0;
        me.fallspeed=0;
        jump();
        if(level==6)
        {
                    pass500=1;
                    if(nr!=1)
                    {ctx.clearRect(platforms[i].left,platforms[i].top,platforms[i].width,20);
                    platforms.splice(i,1);
                    nr--;
                    }
        }
        }
    }
    else
    me.gravity=me.defaultgravity;
}
    //pass500 and level9
    if(pass500==0 && me.bottom>cvs.height)
    {
        me.fallspeed=0;
        jump();
    }
    if(me.bottom<9500)
    {
        pass500=1;
        if(level==9)
        trasnparent.style.background="radial-gradient(at "+Math.floor(me.x)+"px "+350+"px,rgb(0,0,0,0.32) 70px,  rgb(0,0,0,1) 30% )";
    }
    else if(level==9)
    trasnparent.style.background="radial-gradient(at "+Math.floor(me.x)+"px "+550+"px,rgb(0,0,0,0.32) 70px,  rgb(0,0,0,1) 30% )";

}
//particles
let particles=[];
class Particle{
constructor(particlex,particley,particlesize)
{
    this.x=particlex;
    this.y=particley;
    this.size=particlesize;
}
}
//drawparticles
function drawparticles(){
    for(let i=0;i<=1000;i++)
    {
        if(Math.abs(me.y-particles[i].y)<=700 && pass500==0)
        {
        ctx.beginPath();
        ctx.arc(particles[i].x,particles[i].y,particles[i].size, 0,Math.PI * 2,false);
        ctx.fillStyle="white";
        ctx.fill();
        }
        else if(Math.abs(me.y-particles[i].y)<=350)
        {
            ctx.beginPath();
            ctx.arc(particles[i].x,particles[i].y,particles[i].size, 0,Math.PI * 2,false);
            ctx.fillStyle="white";
            ctx.fill();
            }
    }
}
//progress
let progressbar=byId("progressbar");
progressbar.style.left=(startingleft+50)+"px";
progressbar.style.top=(startingtop+700)+"px";
let colorp=byId("colorprogress");
//colorfill
function colorfill(){
    if(me.y!=1000)
    {
    if(((9900-me.y)/((9900-flag.top)/100))<0.5)
    colorp.style.width="0%";
    else if(((9900-me.y)/((9900-flag.top)/100))>98.2)
    colorp.style.width="100%";
    else
    colorp.style.width=((9900-me.y)/((9900-flag.top)/100))+"%";
    }
    else
    colorp.style.width="0%";
}
//in air
function inair(){
    ctx.clearRect(0,0,400,10200)
    me.y=1000;
    me.bottom=me.y+me.height;
    me.fallspeed=0;
    me.gravity=0;
    me.defaultgravity=0;
    me.speed=0;
    me.x=200-me.width;
    me.right=200;
}
//flag
let flagimg=new Image(40,40);
flagimg.src="flag.png";
flag={
    img:flagimg,
    left:0,
    top:0
}
function checkflag(){
    if(level==7 || level==8)
    flag.left=platforms[nr].left;
    //win
if(me.x<flag.left+40 && me.right>flag.left && me.y<flag.top+40 && me.bottom>flag.top)
{
    if(booleanonelife==true)
    {
        nextlevel(level);
    }
    else
    {
    textt.style.display="none";
    inair();
    trya.style.display="block";
    trya.style.top=(me.y-280)+"px";
    nextl.style.display="block";
    nextl.style.top=(me.y+200)+"px";
    }
    for(let i=1;i<=nr;i++){
            ctx.clearRect(platforms[i].left,platforms[i].top,platforms[i].width,20);
            platforms.splice(i,1);
            nr--;
    }
    if(audio==true)
    winningsound.play();
    levelstarted=false;
    if(level==9)
    trasnparent.style.display="none";
}
ctx.drawImage(flag.img,0,0,400,400,flag.left,flag.top,40,40);
}
 //checklose
 function checklose(){
    if(me.y>10100)
    {
        if(audio==true)
        losingsound.play();
        levelstarted=false;
        if(level==9)
        trasnparent.style.display="none";
        if(booleanonelife==true)
        {
            level=1;
            showpreview(1);
            onelifetext.innerHTML="Congrats man!You re good!";
            window.setTimeout(function(){
                onelifetext.innerHTML="You have only one life!";
            },3500)
        }
        else
        {
    textt.style.display="none";
    inair();
    cvsct.style.backgroundColor="black";
    trya.style.display="block";
    trya.style.top=(me.y-280)+"px";
    trya.style.left="124px";
}
}
}
//update
function update(){
    ctx.clearRect(0,3000,400,10000);
    ctx.clearRect(Math.floor(me.x),Math.floor(me.y),me.width,me.height);
    marginscreen();
    walking();
    cvsct.scrollTop=me.y-350;
    if(levelstarted==true)
  {colision();
    deleteold();
    checklose();
    checkflag();
    colorfill();
    drawplatforms();
   drawparticles();
  }
    ctx.drawImage(me.img,0,0,60,92,Math.floor(me.x),Math.floor(me.y),me.width,me.height); 
}
//load
window.addEventListener("load",function(){
    window.addEventListener("keydown",keys);
    window.addEventListener("keyup",keys2);
    window.addEventListener("resize",resizeing,false);
    nextl.addEventListener("click",nextlevel);
    trya.addEventListener("click",samelevel);
    showpreview(level);
})
setInterval(update,1000/60);