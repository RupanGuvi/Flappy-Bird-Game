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
    if(e.key=='Enter' && gamestatus !='play'){
        document.querySelectorAll('.pipe').forEach((e)=>{
            e.remove();
        });
        img.style.display='block';
        bird.style.top='40vh';
        gamestatus='Play';
        message.innerHTML ='';
        title.innerHTML= "Score: ";
        value.innerHTML='0';
        message.classList.remove('msgstyle');
        play(); 

    }
});