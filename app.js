let gameSeq=[];
let userSeq=[];
let started=false;
let Level=0;
let highScore=0;

//store color for selecting
let btns=["red","green","yellow","purple"];
let h2=document.querySelector("h2")
let h4=document.querySelector("h4")
//const s =prompt("Enter Your Name")
start()
function start(){
    started=false;
    gameSeq=[];
    userSeq=[];
    Level=0;
    
    h2.innerText="Please Enter Any Key to start your game !"
    document.addEventListener("keypress",function(){
        //check game start or not
        if(started==false){
            started=true
            h4.innerText=""
            setTimeout(function(){
                document.querySelector("body").style.backgroundColor="white"
            },121)
            h4.innerText=" Your game is now in full swing and running seamlessly."
            levelUp()
            
        }
    })
}




//function for flace button autometic
function gameflace(ranbtn){
    ranbtn.classList.add("gameflaceClass")        // make flace class
    setTimeout(function(){
        ranbtn.classList.remove("gameflaceClass") //delete flace class after few second
    },100)
}



//function for flace button when user press button
function userflace(userbtn){
    userbtn.classList.add("userflaceClass")        // make flace class
    setTimeout(function(){
        userbtn.classList.remove("userflaceClass") //delete flace class after few second
    },100)
}

//Function for level ups
function levelUp(){
    userSeq=[];
    Level++;
    h2.innerText=`Level : ${Level}`  //pass value of level in  h2 tag
    
    //Select Any Random Button After Level up
    let ranIndex=Math.floor(Math.random()*4);           //select index  0,1,2,3 random  
    let ranColor=btns[ranIndex];                        //select colore  from btns array by ranIndex
    let ranBtn=document.querySelector(`.${ranColor}`)   //Select class for given colore from html file
    gameSeq.push(ranColor)
    console.log(gameSeq)                              //After trigger  buttton add color inside gameSeq array 
    gameflace(ranBtn);                                   //Call function for flace button after click
}




function  compair(len){
    for(let i=0;i<=len;i++){
        if(gameSeq[i]==userSeq[i]){
        }else{
            document.querySelector("body").style.backgroundColor="salmon"
            
            
            h4.innerText=`Your Score : ${Level}`
            h2.innerText=`Game Over ||  Enter any key for new game `
            start()
            return 0;
        }
    }
setTimeout(levelUp,1000)  
}




function btnPress(){                                 //trak button
    let btn=this
    userflace(btn)
    console.log(userSeq)
    usercolor=btn.getAttribute("id")
    userSeq.push(usercolor)
    //console.log(userSeq)
    if(userSeq.length-1==gameSeq.length-1){
        compair(gameSeq.length)

    }else{
        btnPress
    } 
}


let allBtn=document.querySelectorAll(".box")
for(bton of allBtn){
    bton.addEventListener("click",btnPress)
}