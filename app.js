let gameSeq=[];
let userSeq=[];
let started=false;
let Level=0;
let highScore=0;
let restart=0


//store color for selecting
let btns=["red","green","yellow","purple"];
let h2=document.querySelector("h2")
let h4=document.querySelector("h4")
let startBtn=document.querySelector("#startGameBtn")


let btn_click_voice=new Audio("voice/any_btn_click.mp3");
let game_start_sound = new Audio("voice/game_starte_voice.mp3");
let system_click_sound = new Audio("voice/system_Click.mp3");
let player_click_sound = new Audio("voice/player_click.mp3");



//code entry point
start()



function start(){
    // Reset game
    started=false;
    gameSeq=[];
    userSeq=[];
    Level=0;

    highScore = localStorage.getItem('highScore') || 0;    
    h2.innerText=""
    startBtn.addEventListener("click",function(){
        if(started==false){
            game_start_sound.currentTime = 0; // agar repeat ho to sound reset 
            game_start_sound.play();
            // btn_click_voice.play();

            started=true
            

            setTimeout(function(){
            document.querySelector("body").style.background="green"
            },50)

            h4.innerText="Game Play"
            levelUp()
        }
    },2000)
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
    gameSeq.push(ranColor)                              //After trigger  buttton add color inside gameSeq array 
    gameflace(ranBtn);                                   //Call function for flace button after click
}


//function for flace button autometic
function gameflace(ranbtn){
    setTimeout(function(){
        if(started==true){
            ranbtn.classList.add("system-flash");  //apply  property from css
            system_click_sound.currentTime = 0; // If repeat then restart voice
            system_click_sound.play(); 
            
            setTimeout(function(){
                ranbtn.classList.remove("system-flash");    //delete flace class after few second
            },500)
       }
    },800)
}


//Listen box click if click then call btnPress function
let allBtn=document.querySelectorAll(".box")
for(bton of allBtn){
    bton.addEventListener("click",btnPress)
}


//trak button
function btnPress(){                                 
    let btn=this
    userflace(btn)
    console.log(userSeq)
    usercolor=btn.getAttribute("id")
    userSeq.push(usercolor)
    console.log(userSeq)

    // Check user all button clicked or not
    if(userSeq.length-1==gameSeq.length-1){
        compair(gameSeq.length)
    }else{
        btnPress
    } 
}


//function for flace button when user press button
function userflace(userbtn){
    if(started==true){
        userbtn.classList.add("player-clicked");   // shrink effect
        // Play user sound
        player_click_sound.currentTime = 0;
        player_click_sound.play();
        setTimeout(function(){
           userbtn.classList.remove("player-clicked");
        },500)
    }   
}



function  compair(len){
    for(let i=0;i<len;i++){
        if(gameSeq[i]==userSeq[i]){
        }else{
            // Update maxScore
            if(Level > highScore) {
                localStorage.setItem('highScore', Level);
                highScore = Level;
            }
            // Show game over State
            h4.innerText = `Your Score: ${Level}`;
            h2.innerText = `Game Over!`;
            started = false;
            window.location.href = `gameover.html?score=${Level}&max-score=${highScore}`;
            return 0;
        }
    }
setTimeout(levelUp,1000)  
}


// Go to home button
document.getElementById("homeArrow")
homeArrow.onclick = function () {
    window.location.href = "index.html";
};