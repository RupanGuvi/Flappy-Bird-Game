//Basic values and intitalization of dom elements

let speed = 3 , gravity =0.5;
let bird = document.querySelector('.bird')
let img = document.getElementById('bird-1')
let soundout= new Audio('sound effects/soundout.mp3');
let soundplay= new Audio('sound effects/soundplay.mp3');

//getting bird element properties for left,right,top,bottom,x,y,width and height

let birdprops = bird.getBoundingClientRect();

//background properties for left,right,top,bottom,x,y,width and height

let background = document.querySelector('.background').getBoundingClientRect();

let scorevalue = document.querySelector(".value");
let message = document.querySelector(".message");
let scoretitle = document.querySelector(".title");

let gamestatus = 'Start';
img.style.display = 'none';
message.classList.add('msgstyle')

/* Handling the Game's start condition when the 'Enter' key is pressed. 
Event listener for the 'Keydown event. It checks if the 'Enter' key is pressed and 
game status will be start. If both condition are met, It performs the following Operations:- 
1. Removes all elements with the class name 'pipe' from the DOM.
2. Displays the bird image by setting its display style to 'block'.
3. Resets the bird position to top 40% of the viewport height.
4. Sets the game status to 'play'
5. Clears the message,score (title and value)
6. Removes the messagestyle class from message element.
7. call the play() function to start the game.
*/

document.addEventListener('keydown',(e)=>{
    if(e.key=='Enter' && gamestatus !='Play'){
        document.querySelectorAll('.pipe').forEach((e)=>{
            e.remove();
        });
        img.style.display='block';
        bird.style.top='40vh';
        gamestatus='Play';
        message.innerHTML ='';
        scoretitle.innerHTML= "Score: ";
        scorevalue.innerHTML='0';
        message.classList.remove('msgstyle');
        play(); 

    }
});

/*
play() function is responsible for managing the game main logic, including brid movement,
pipe creation, collision detection and game sate handling.

1. The play() function is defined and immediately invoked.
2. Inside the play() function , three nested function (move(),gravity(),createpipe()).
These functions handle the game's core mechanism
3. The move() function is responsible for moving the the piped and checking the collision between 
the bird and the pipes. It uses teh requestAnimationFrame() method to continuosly update the 
position of the pipes.
4. the gravity() function apllies gravity to the bird and handle birds vertical movement.
It listens for keydown and keyup events to control the birds upward movement.
5. the createpipe() function creates new pipes at regular intervals and positions them
randomly on the screen. It also assigns a unique identifier(to increase score) to the pipes that
will increase the score when it passess them.
6. The requestAnimationFrame() method is used to continuosly call the move(), gravity(), and pipe()
function, providing a smooth and efficient game loop.

*/

function play(){
    function move(){
        // move function
        if(gamestatus !='Play') return;
        let pipe = document.querySelectorAll(".pipe");
        pipe.forEach((element)=>{
            let pipeprops = element.getBoundingClientRect();
            birdprops = bird.getBoundingClientRect();

            if(pipeprops.right <=0){
                element.remove()
            }
            else{
                //conditions for collision detection

                if(birdprops.left < pipeprops.left + pipeprops.width &&
                    birdprops.left + birdprops.width > pipeprops.left && birdprops.top < pipeprops.top
                    + pipeprops.height && birdprops.top + birdprops.height > pipeprops.top){
                         
                        gamestatus= 'End';
                        message.innerHTML = "Game Over"+'<br><b>Press Enter to restart the Game<b>';
                        message.classList.add("msgstyle");
                        img.style.display= "none";
                        soundout.play();
                        return;
                    }
                    else{
                        //condition for moving the bird and increasing the score value

                        if(pipeprops.right < birdprops.left && pipeprops.right + speed >= birdprops.left &&
                            element.increase_score == '1'){
                                scorevalue.innerHTML =+ scorevalue.innerHTML + 1;
                                soundplay.play();

                            }
                            element.style.left = pipeprops.left - speed + 'px';
                        
                    }
                
            }
        });
        requestAnimationFrame(move)
    }
    requestAnimationFrame(move);
 // Gravity function
    let bid = 0;
    function applyGravity(){
        if(gamestatus != 'Play')return;
        bid = bid + gravity;
        document.addEventListener("keydown", (e)=>{
           if(e.key == 'ArrowUp' || e.key==' '){
            img.src = "images/Bird-2.png";
            bid = -7.6;
           }
        });

        document.addEventListener("keyup",(e)=>{
            if(e.key == 'ArrowUp' || e.key==' '){
                img.src = "images/Bird.png";
               }
        })
        if(birdprops.top <=0 || birdprops.bottom >= background.bottom){
            gamestatus="End";
            message.style.left= "28vw";
            window.location.reload();
            message.classList.remove("msgstyle");
            return;
        }
        bird.style.top = birdprops.top + bid + "px";
        birdprops = bird.getBoundingClientRect();
        requestAnimationFrame(applyGravity);
    }
    requestAnimationFrame(applyGravity);
  
    //pipe creation function
    let space = 0;
    let pipegap =35;

    function createPipe(){
        if(gamestatus != 'Play')return;
        if(space>115){
            space=0;
            let pipeposition = Math.floor(Math.random() * 43) +8;
            //from top to bottom of pipe
            let pipeinverse = document.createElement('div');
            pipeinverse.className = 'pipe';
            pipeinverse.style.top = pipeposition - 70 + "vh";
            pipeinverse.style.left = "100vw";
           document.body.appendChild(pipeinverse);
           //from bottom to top of pipe
            let pipe = document.createElement("div");
            pipe.className = ".pipe";
            pipe.style.top = pipeposition + pipegap + "vh";
            pipe.style.left = "100vw";
            pipe.increase_score='1';
            document.body.appendChild(pipe);
        }
        space++;
        requestAnimationFrame(createPipe);
    }
    requestAnimationFrame(createPipe);
}