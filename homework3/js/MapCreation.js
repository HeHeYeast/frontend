var mymap,cup=10,row=10,column=10,personx=0,persony=0,countdown=60;
var map=document.getElementsByClassName('gamemap'),rows=Array(row),cell=Array(row);
var myscore=document.getElementById('score'),mytime=document.getElementById('time');

function myRand(limit) {
    return Math.floor(Math.random()*limit);
}

setInterval(function(){mytime.innerText='time:'+countdown.toString();countdown--;},1000);

function createmap(){
    mymap=new Array(row);
    for(let i=0;i<row;i++) {
        mymap[i]=new Array(column);
        for(let j=0;j<column;j++)
            mymap[i][j]='n';
    }
    for(let i=0;i<cup;i++) {
        let xp=myRand(row),yp=myRand(column);
        while(mymap[xp][yp]==='c'||(xp===0&&yp===0)){
            xp=myRand(row);
            yp=myRand(column);
        }
        mymap[xp][yp]='c';
    }
    mymap[0][0]='p';
    myscore.innerText='score:'+(100-10*cup).toString();
    mytime.innerText='time:'+countdown.toString();
}

function drawmap() {
    for(let i=0;i<row;i++) {
        rows[i]=document.createElement('div');
        map[0].appendChild(rows[i]);
        cell[i]=Array(column);
        for(let j=0;j<column;j++) {
            cell[i][j]=document.createElement('span');
            rows[i].appendChild(cell[i][j]);
            rows[i].setAttribute('class','myrow');
            //let ntop=(i-1)*30,nleft=(j-1)*30;
            //cell[i][j].style.top=ntop.toString+'px';
            //cell[i][j].style.left=nleft.toString+'px';
            cell[i][j].style.width='30px';
            cell[i][j].style.height='30px';
            let cellclass,nimg=document.createElement('img');
            switch(mymap[i][j]) {
                case 'n':
                    cellclass='emptycell';
                    nimg.setAttribute('src','file:///C:/Users/27549/Desktop/%E7%AE%A1%E5%95%B8%E9%87%8E/%E5%89%8D%E7%AB%AF%E5%AE%9E%E8%B7%B5/homework3/img/white.png');
                    break;
                case 'p':
                    cellclass='person';
                    nimg.setAttribute('src','file:///C:/Users/27549/Desktop/%E7%AE%A1%E5%95%B8%E9%87%8E/%E5%89%8D%E7%AB%AF%E5%AE%9E%E8%B7%B5/homework3/img/person.jfif');
                    break;
                case 'c':
                    cellclass='cup';
                    nimg.setAttribute('src','file:///C:/Users/27549/Desktop/%E7%AE%A1%E5%95%B8%E9%87%8E/%E5%89%8D%E7%AB%AF%E5%AE%9E%E8%B7%B5/homework3/img/cup.jpg');
                    break;
            }
            cell[i][j].setAttribute('class',cellclass);
            nimg.style.width='28px';
            nimg.style.border='1px solid black';
            nimg.style.height='28px';
            cell[i][j].appendChild(nimg);
        }
    }
}

createmap();
drawmap();

function check() {//在每步移动之后对整体情况检测
    if(mymap[personx][persony]==='c')
        cup--;
    mymap[personx][persony]='p';
    cell[personx][persony].lastChild.setAttribute('src','file:///C:/Users/27549/Desktop/%E7%AE%A1%E5%95%B8%E9%87%8E/%E5%89%8D%E7%AB%AF%E5%AE%9E%E8%B7%B5/homework3/img/person.jfif');
    myscore.innerText='score:'+(100-10*cup).toString();
    if(cup===0) alert('Congratulation!');
}

document.onkeydown=function(event) {
    var e=event||window.event;
    mymap[personx][persony]='n';
    cell[personx][persony].lastChild.setAttribute('src','file:///C:/Users/27549/Desktop/%E7%AE%A1%E5%95%B8%E9%87%8E/%E5%89%8D%E7%AB%AF%E5%AE%9E%E8%B7%B5/homework3/img/white.png');
    if(e&&e.keyCode===87) {
        if(personx!=0) personx-=1;
    }
    else if(e&&e.keyCode===83){
        if(personx!=9) personx+=1;
    }
    else if(e&&e.keyCode===65) {
        if(persony!=0) persony-=1;
    }
    else if(e&&e.keyCode===68) {
        if(persony!=9) persony+=1;
    }
    check();
}