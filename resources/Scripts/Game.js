var startAudio = new Audio("resources/Audio/Background Music.mp3");
var loserAudio = new Audio("resources/Audio/Naruto sadness and sorrow.mp3");
var hurtAudio = new Audio("resources/Audio/Ow_Sound.mp3");
var winAudio = new Audio("resources/Audio/WIN sound.mp3");

$(document).ready(function() {
    context = canvas.getContext("2d");
    num_of_balls = $("#n_Balls").val();
    game_time = $("#gameTime").val();
    ghosts_num = $("#n_Monsters").val();
    game_time = parseInt(game_time);
    ghosts_num = parseInt(ghosts_num);
    num_of_balls = parseInt(num_of_balls);

    if(game_time > 180 || game_time < 60){
        game_time=100;
        $("#gameTime").val(100);
    }
    if(ghosts_num > 4 || ghosts_num < 1){
        ghosts_num = 2;
        $("#n_Monsters").val(2);
    }
    if(num_of_balls > 90 || num_of_balls < 50){
        num_of_balls = 60;
        $("#n_Balls").val(60);
    }
})
var num_of_balls;
var game_time;
var ghosts_num;
var context;// = canvas.getContext("2d");
var score;
var start_time;
var time_elapsed;    
var intervalClock;
var intervalGame;
var intervalGhosts;
var intervalPill;
var m_TargetScore = 0;


var m_PillPrevPosition=new Object(); //curernt Position of Pill
var m_ClockPrevPosition=new Object(); //curernt Position of Clock
var m_Bonus=new Object(); //curernt Position of Clock
m_Bonus.num = 13;
var bonus_eaten;

m_PillPrevPosition.i = 500;
m_PillPrevPosition.j = 500;
m_ClockPrevPosition.i = 600;
m_ClockPrevPosition.j = 600;


var board;
//random
var m_GhostNum;
// var m_GhostNum = 4;
var m_TotalBalls;
var m_MaxTime; //= 180;
var m_PacDirection = 4;

var m_PacmanPosition = new Object();
var FirstGhostPosition = new Object(); //Position of First Ghost
var SecondGhostPosition = new Object(); //Position of Second Ghost
var ThirdGhostPosition = new Object(); //Position of Third Ghost
var FourthGhostPosition = new Object(); //Position of Fourth Ghost

var m_special;
var pillEaten;
var timeoutPill;
var timeoutClock;
var clockEaten;

var m_livesUser;
var m_TimesCatched;
var m_GameScore;
var m_PacColor="yellow";
var m_StartTime;
var interval;
var m_PlayerName;

//scores for each ball
var m_FirstBallScore = 5;
var m_SecondBallScore = 15;
var m_ThirdBallScore = 25;

//has the game been completed
var m_GameWon = false;
var m_GameOver = false;

function Start() {

    $('body').addClass('stop-scrolling')
    topFunction();
    
    time_elapsed = new Date();
    loserAudio.pause();
    show_game();
    startAudio.load();
    startAudio.play();

    m_MaxTime = parseInt($("#gameTime").val());
    m_TotalBalls = parseInt($("#n_Balls").val());
    m_GhostNum = parseInt($("#n_Monsters").val());
    m_PlayerName = loginUsernameEntry;

    


    board = [
        [4, 4, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
        [4, 0, 4, 0, 0, 0, 4, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 4],
        [4, 0, 4, 0, 4, 4, 4, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 4],
        [4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 0, 4, 4, 4, 4, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4],
        [4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 4, 0, 4, 0, 4],
        [4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 0, 4, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 4, 0, 0, 4, 0, 4],
        [4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 4, 0, 0, 0, 0, 0, 4, 0, 4, 0, 4, 4, 4, 4, 0, 4],
        [4, 0, 4, 0, 4, 4, 4, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4],
        [4, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 4, 4, 0, 4, 4, 0, 4],
        [4, 0, 4, 4, 4, 0, 4, 4, 4, 0, 4, 0, 0, 0, 4, 4, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 4, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4]
    ]
    document.getElementById("start_game").style.display = "none";
    document.getElementById("start_game_settings").style.display = "none";
    document.getElementById("head_logo").style.display = "none";
    document.getElementById("canvas").style.display = "block";
    m_GameScore = 0;
    m_TimesCatched = 0
    var cnt = 288;
    var food_remain = 29;
    var pacman_remain = 1;
    m_PacColor = "yellow";
    m_livesUser = 5;
    m_StartTime = new Date();
    m_special = 1;
    pillEaten = false;
    bonus_eaten = false;
    clockEaten = false;

    emptyCellbonus = findRandomEmptyCell(board);
    m_Bonus.i = emptyCellbonus[0];
    m_Bonus.j = emptyCellbonus[1];
    board[m_Bonus.i][m_Bonus.j]=13;
    m_Bonus.prev = 0;

    //Ghosts start in corners
    FirstGhostPosition.i = 1;
    FirstGhostPosition.j = 1;
    FirstGhostPosition.prev = 0;
    FirstGhostPosition.num = 3;
    
    if(m_GhostNum > 1){
        SecondGhostPosition.i = 16;
        SecondGhostPosition.j = 16;
        SecondGhostPosition.prev = 0;
        SecondGhostPosition.num = 5;
        board[16][16] = 5;
    }
    if(m_GhostNum > 2){
        ThirdGhostPosition.i = 16;
        ThirdGhostPosition.j = 1;
        ThirdGhostPosition.prev = 0;
        ThirdGhostPosition.num = 6;
        board[16][1] = 6;
    }
    if(m_GhostNum > 3){
        FourthGhostPosition.i = 1;
        FourthGhostPosition.j = 16;
        FourthGhostPosition.prev = 0;
        FourthGhostPosition.num = 10;
        board[1][16] = 10;
    }

    //important
    m_PacmanPosition.i=11;
    m_PacmanPosition.j=11;

    tempRed = Math.floor(0.6 * food_remain);
    tempGreen = Math.floor(0.3 * food_remain);
    tempDragon = Math.floor(0.1 * food_remain);
    food_remain = tempRed + tempGreen + tempDragon;
    
    score = 0;
    m_PacColor="yellow";
    var cnt = 289;
    start_time= new Date();

    for (var i = 0; i < 18; i++) { //18 is the number of rows and columns
        for (var j = 0; j < 18; j++) {
            if (board[i][j] !== 0) {
                continue;
            }
            //place food and pacman
            else {
                var randomNum = Math.random();
                if (randomNum <= 1.0 * food_remain / cnt) {
                    if (tempRed !== 0) {
                        board[i][j] = 7;
                        tempRed--;
                        food_remain--;
                        m_TargetScore += m_FirstBallScore;
                    } else if (tempRed === 0 && tempGreen !== 0) {
                        board[i][j] = 8;
                        tempGreen--;
                        food_remain--;
                        m_TargetScore += m_SecondBallScore;
                    } else if (tempRed === 0 && tempGreen === 0 && tempDragon !== 0) {
                        board[i][j] = 9;
                        tempDragon--;
                        food_remain--;
                        m_TargetScore += m_ThirdBallScore;
                    }
                } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) { //place pacman
                    m_PacmanPosition.i = i;
                    m_PacmanPosition.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
    
    while(food_remain > 0){
        var emptyCell = findRandomEmptyCell(board);
        if (tempRed !== 0) {
            board[emptyCell[0]][emptyCell[1]] = 7;
            tempRed--;
            m_TargetScore += m_FirstBallScore;
        } else if (tempRed === 0 && tempGreen !== 0) {
            board[emptyCell[0]][emptyCell[1]] = 8;
            tempGreen--;
            m_TargetScore += m_SecondBallScore;
        } else if (tempRed === 0 && tempGreen === 0 && tempDragon !== 0) {
            board[emptyCell[0]][emptyCell[1]] = 9;
            tempDragon--;
            m_TargetScore += m_ThirdBallScore;
        }
        food_remain--;
    }

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);

    intervalGame = setInterval(UpdatePosition, 150);
    intervalGhosts = setInterval(UpdatePositionGhosts, 600);
    intervalPill = setInterval(PutPillsOnMap, 10000);
    intervalClock = setInterval(PutClockOnMap, 16000);
}

function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 17) + 1);
    var j = Math.floor((Math.random() * 17) + 1);
    if (board[i][j] === 0) {
        return [i, j];
    } else {
        while (board[i][j] !== 0) {
            i = Math.floor((Math.random() * 17) + 1);
            j = Math.floor((Math.random() * 17) + 1);
        }
    }
    return [i, j];
}

function PutPillsOnMap(){
    pillEaten = false;
    emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]]=11; //pill
    m_PillPrevPosition.i = emptyCell[0];
    m_PillPrevPosition.j = emptyCell[1];
    timeoutPill = setTimeout(()=> {
        console.log("Clearing Pill from "+m_PillPrevPosition.i+","+m_PillPrevPosition.j);
        if(!pillEaten)
            board[m_PillPrevPosition.i][m_PillPrevPosition.j]=0; //pill
        // m_PillPrevPosition.i = -1;
        // m_PillPrevPosition.j = -1;
    }, 5000);
}

function PutClockOnMap(){
    clockEaten = false;
    emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]]=12; //clock
    m_ClockPrevPosition.i = emptyCell[0];
    m_ClockPrevPosition.j = emptyCell[1];
    timeoutClock = setTimeout(()=> {
        if(!clockEaten)
            board[m_ClockPrevPosition.i][m_ClockPrevPosition.j]=0; //clock
    }, 5000);
}

function GetKeyPressed() {
    if (keysDown[38]) {
        return 1;
    }
    if (keysDown[40]) { 
        return 2;
    }
    if (keysDown[37]) { 
        return 3;
    }
    if (keysDown[39]) { 
        return 4;
    }
}
//Allow the user to enter random game values
function Randomize() {
    m_GhostNum = getRandomIntInclusive(1,4);
    m_TotalBalls = Math.floor(Math.random() * 41) + 50;
    m_MaxTime = 60 + Math.floor(Math.random() * 150);

    $("#n_Balls").val(m_TotalBalls);
    $("#gameTime").val(m_MaxTime);
    $("#n_Monsters").val(m_GhostNum);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function Draw() {
    canvas.width=canvas.width; //clean board
    if(time_elapsed > 90){
        startAudio.play();
    }
    lblScore.value = m_GameScore;
    lblTime.value = m_MaxTime-time_elapsed;
    
    LivesLeft.value = m_livesUser;
    PlayerNameLabel.value = m_PlayerName;
    TargetScore.value = m_TargetScore;

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < 18; i++) {
        for (var j = 0; j < 18; j++) {
            var center = new Object();
            center.x = i * 40 + 30;
            center.y = j * 40 + 30;
            if (board[i][j] == 2) {
                //UP
                if (m_PacDirection === 1) {
                    context.beginPath();
                    context.arc(center.x, center.y, 20, 1.85 * Math.PI, 1.45 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = m_PacColor; //color 
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 5, center.y + 13, 4, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color 
                    context.fill();
                }
                //Down
                if (m_PacDirection === 2) {
                    context.beginPath();
                    context.arc(center.x, center.y, 20, 0.6 * Math.PI, 0.3 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = m_PacColor; //color 
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 10, center.y + 3, 4, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color 
                    context.fill();
                }
                //Left
                if (m_PacDirection === 3) {
                    context.beginPath();
                    context.arc(center.x, center.y, 20, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = m_PacColor; //color 
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 5, center.y - 13, 4, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color 
                    context.fill();
                }
                //Right
                if (m_PacDirection === 4) {
                    context.beginPath();
                    context.arc(center.x, center.y, 20, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = m_PacColor; //color 
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 5, center.y - 13, 4, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color 
                    context.fill();
                }
            }
            else if (board[i][j] === 7) {
                base_image = new Image();
                base_image.src = "resources/images/RedBall.png";
                context.drawImage(base_image, center.x-10, center.y-10, 20, 20);
            } else if (board[i][j] === 8) {

                base_image = new Image();
                base_image.src = "resources/images/GreenBall.png";
                context.drawImage(base_image, center.x-10, center.y-10, 20, 20);
            } else if (board[i][j] === 9) {
                base_image = new Image();
                base_image.src = "resources/images/Dragonball.png";
                context.drawImage(base_image, center.x-10, center.y-10, 20, 20);
            }
            //draw Ghost1
            else if (board[i][j] === 3) {
                var base_image = new Image();
                base_image.src = "resources/ghost1.png";
                context.drawImage(base_image, center.x - 20, center.y - 20, 40, 40);
            }
            //draw Wall
            else if (board[i][j] === 4 ) {
                base_image = new Image();
                base_image.src = "resources/Images/wall7.png";
                context.drawImage(base_image, center.x - 20, center.y - 20, 40, 40);
            }
            //draw Ghost2
            else if (board[i][j] === 5 && m_GhostNum > 1) {
                base_image = new Image();
                base_image.src = "resources/Images/ghost2.png";
                context.drawImage(base_image, center.x - 20, center.y - 20, 40, 40);
            }
            //draw Ghost3
            else if (board[i][j] === 6 && m_GhostNum > 2) {
                base_image = new Image();
                base_image.src = "resources/Images/ghost3.png";
                context.drawImage(base_image, center.x - 20, center.y - 20, 40, 40);
            }
            //draw Ghost4
            else if (board[i][j] === 10 && m_GhostNum > 3) {
                base_image = new Image();
                base_image.src = "resources/Images/ghost4.png";
                context.drawImage(base_image, center.x - 20, center.y - 20, 40, 40);
            }
            else if (board[i][j] === 11) {
                base_image = new Image();
                base_image.src = "resources/Images/Pill.jpg";
                context.drawImage(base_image, center.x-20, center.y-20, 40, 40);
            }
            else if (board[i][j] === 12) {
                base_image = new Image();
                    base_image.src = "resources/Images/ClockPeterPan.jpg";
                    context.drawImage(base_image, center.x-20, center.y-20, 40, 40);
            }
            else if (board[i][j] === 13) {
                base_image = new Image();
                base_image.src = "resources/Images/bonus.png";
                context.drawImage(base_image, center.x-20, center.y-20, 40, 40);
            }
        }
    }        
}

function UpdatePositionGhosts() {
    //Ghost1: 3, Ghost2:5, Ghost3:6, Ghost4:10
    if (m_GhostNum === 1) {
        GhostMovement(FirstGhostPosition);
    }
    else if (m_GhostNum === 2) {
        GhostMovement(FirstGhostPosition);
        GhostMovement(SecondGhostPosition);
    }
    else if (m_GhostNum === 3) {
        GhostMovement(FirstGhostPosition);
        GhostMovement(SecondGhostPosition);
        GhostMovement(ThirdGhostPosition);
    }
    else if (m_GhostNum === 4) {
        GhostMovement(FirstGhostPosition);
        GhostMovement(SecondGhostPosition);
        GhostMovement(ThirdGhostPosition);
        GhostMovement(FourthGhostPosition);
    }
}

function UpdatePosition() {
    if(!bonus_eaten){
        BonusMovement();
    }
    board[m_PacmanPosition.i][m_PacmanPosition.j]=0;
    var x = GetKeyPressed()
    if (x == 1) {
        if (m_PacmanPosition.j > 0 && board[m_PacmanPosition.i][m_PacmanPosition.j - 1] != 4) {
            m_PacmanPosition.j--;
            m_PacDirection = 1;
        }
    }
    //Move Pacman Down
    if (x == 2) {
        if (m_PacmanPosition.j < 17 && board[m_PacmanPosition.i][m_PacmanPosition.j + 1] !== 4) {
            m_PacmanPosition.j++;
            m_PacDirection = 2;
        }
    }
    //Move Pacman To The Left
    if (x == 3) {
        if (m_PacmanPosition.i > 0 && board[m_PacmanPosition.i - 1][m_PacmanPosition.j] !== 4) {
            m_PacmanPosition.i--;
            m_PacDirection = 3;
        }
    }
    //Move Pacman To The Right
    if (x == 4) {
        if (m_PacmanPosition.i < 17 && board[m_PacmanPosition.i + 1][m_PacmanPosition.j] !== 4) {
            m_PacmanPosition.i++;
            m_PacDirection = 4;
        }
    }
    
    if (board[m_PacmanPosition.i][m_PacmanPosition.j] === 7) {
        m_GameScore = m_GameScore + m_FirstBallScore;
    }
    if (board[m_PacmanPosition.i][m_PacmanPosition.j] === 8) {
        m_GameScore = m_GameScore + m_SecondBallScore;
    }
    if (board[m_PacmanPosition.i][m_PacmanPosition.j] === 9) {
        m_GameScore = m_GameScore + m_ThirdBallScore;
    }
    board[m_PacmanPosition.i][m_PacmanPosition.j]=2;

    var currentTime=new Date();
    time_elapsed=(currentTime-start_time)/1000;

    if(m_PacmanPosition.i === m_PillPrevPosition.i && m_PacmanPosition.j === m_PillPrevPosition.j){
        if(m_livesUser < 5){
            m_livesUser++;
        }
        m_PillPrevPosition.i=-1;
        m_PillPrevPosition.j=-1;
        pillEaten = true;
        clearTimeout(timeoutPill);
    }

    if(m_PacmanPosition.i === m_ClockPrevPosition.i && m_PacmanPosition.j === m_ClockPrevPosition.j){
        m_MaxTime=m_MaxTime+10;
        m_ClockPrevPosition.i=-1;
        m_ClockPrevPosition.j=-1;
        clockEaten=true;
        clearTimeout(timeoutClock);
    }

    if(m_PacmanPosition.i === m_Bonus.i && m_PacmanPosition.j === m_Bonus.j){
        m_Bonus.i=-1;
        m_Bonus.j=-1;
        m_Bonus.prev = 0;
        m_GameScore = m_GameScore + 50;
        bonus_eaten = true;
    }


    if ((m_PacmanPosition.i === FirstGhostPosition.i && m_PacmanPosition.j === FirstGhostPosition.j) || (m_PacmanPosition.i === SecondGhostPosition.i && m_PacmanPosition.j === SecondGhostPosition.j) || ((m_PacmanPosition.i == ThirdGhostPosition.i && m_PacmanPosition.j == ThirdGhostPosition.j) || ((m_PacmanPosition.i == FourthGhostPosition.i && m_PacmanPosition.j == FourthGhostPosition.j)))) {
        hurtAudio.play();
        board[m_PacmanPosition.i][m_PacmanPosition.j] = 0;
        board[FirstGhostPosition.i][FirstGhostPosition.j] = FirstGhostPosition.prev;
        FirstGhostPosition.i = 1;
        FirstGhostPosition.j = 1;
        board[FirstGhostPosition.i][FirstGhostPosition.j] = 3;
        
        FirstGhostPosition.prev = 0;

        if(m_GhostNum > 1){
            SecondGhostPosition.prev = 0;
            board[SecondGhostPosition.i][SecondGhostPosition.j] = SecondGhostPosition.prev;
            
            SecondGhostPosition.i = 16;
            SecondGhostPosition.j = 16;
            board[SecondGhostPosition.i][SecondGhostPosition.j] = 5;
        }
        if(m_GhostNum > 2){
            ThirdGhostPosition.prev = 0;
            board[ThirdGhostPosition.i][ThirdGhostPosition.j] = ThirdGhostPosition.prev;
            ThirdGhostPosition.i = 16;
            ThirdGhostPosition.j = 1;
            board[ThirdGhostPosition.i][ThirdGhostPosition.j] = 6;
            
        }
        if(m_GhostNum > 3){
            FourthGhostPosition.prev = 0;
            board[FourthGhostPosition.i][FourthGhostPosition.j] = FourthGhostPosition.prev;
            FourthGhostPosition.i = 1;
            FourthGhostPosition.j = 16;
            board[FourthGhostPosition.i][FourthGhostPosition.j] = 10;
        }

        m_GameScore -= 10;
        m_TargetScore -= 10;
        m_TimesCatched++;
        m_livesUser--;
        
        board[m_PacmanPosition.i][m_PacmanPosition.j] = 0;
        
        emptyCell = findRandomEmptyCell(board);
        m_PacmanPosition.i = emptyCell[0];
        m_PacmanPosition.j = emptyCell[1];
        board[m_PacmanPosition.i][m_PacmanPosition.j]=2;

        board[m_Bonus.i][m_Bonus.j] = m_Bonus.prev;
        emptyCellbonus = findRandomEmptyCell(board);
        m_Bonus.i = emptyCellbonus[0];
        m_Bonus.j = emptyCellbonus[1];
        board[m_Bonus.i][m_Bonus.j]=13;
        m_Bonus.prev = 0;
       
    }
    if (m_livesUser === 0 || (time_elapsed >= m_MaxTime)) {
        stopGame();
        loserAudio.play();
        window.alert("Loser!!!");
    }
    if (m_GameScore >= m_TargetScore) {
        m_TargetScore = 0;
        stopGame();
        winAudio.play();
        window.alert("Winner!!!");
    }
    else{
        Draw();
    }
}
function stopGame() {
    startAudio.pause();
    window.clearInterval(intervalClock);
    window.clearInterval(intervalGame);
    window.clearInterval(intervalGhosts);
    window.clearInterval(intervalPill);
    document.getElementById("canvas").style.display = "none";
    document.getElementById("start_game").style.display = "block";
}
function BonusMovement() {
    board[m_Bonus.i][m_Bonus.j] = m_Bonus.prev;
    var success = false;
    while(!success){
        var bonus_move = Math.floor(Math.random() * 5);
        b_move = bonus_move;
        if(b_move===1){
            if(board[m_Bonus.i + 1][m_Bonus.j] !== 3 && board[m_Bonus.i + 1][m_Bonus.j] !== 4 && board[m_Bonus.i + 1][m_Bonus.j] !== 5 && board[m_Bonus.i + 1][m_Bonus.j] !== 6 && board[m_Bonus.i + 1][m_Bonus.j] !== 10){
                m_Bonus.prev = board[m_Bonus.i+1][m_Bonus.j];
                board[m_Bonus.i+1][m_Bonus.j] = m_Bonus.num;
                m_Bonus.i++;
                success=true;
            }
        }
        else if(b_move===2){
            if( board[m_Bonus.i][m_Bonus.j + 1] !== 3 && board[m_Bonus.i][m_Bonus.j + 1] !== 4 && board[m_Bonus.i][m_Bonus.j + 1] !== 5 && board[m_Bonus.i][m_Bonus.j + 1] !== 6 && board[m_Bonus.i][m_Bonus.j + 1] !== 10){
                m_Bonus.prev = board[m_Bonus.i][m_Bonus.j+1];
                board[m_Bonus.i][m_Bonus.j+1] = m_Bonus.num;
                m_Bonus.j++;
                success=true;
            }
        }
        else if(b_move===3){
            if(board[m_Bonus.i-1][m_Bonus.j] !== 3 && board[m_Bonus.i - 1][m_Bonus.j] !== 4 && board[m_Bonus.i - 1][m_Bonus.j] !== 5 && board[m_Bonus.i-1][m_Bonus.j] !== 6 && board[m_Bonus.i-1][m_Bonus.j] !== 10){
                m_Bonus.prev = board[m_Bonus.i-1][m_Bonus.j];
                board[m_Bonus.i-1][m_Bonus.j] = m_Bonus.num;
                m_Bonus.i--;
                success=true;
            }
        }
        else if(b_move===4){
            if(board[m_Bonus.i][m_Bonus.j - 1] !== 3 && board[m_Bonus.i][m_Bonus.j - 1] !== 4 && board[m_Bonus.i][m_Bonus.j - 1] !== 5 && board[m_Bonus.i][m_Bonus.j - 1] !== 6 && board[m_Bonus.i][m_Bonus.j - 1] !== 10){
                m_Bonus.prev = board[m_Bonus.i][m_Bonus.j-1];
                board[m_Bonus.i][m_Bonus.j-1] = m_Bonus.num;
                m_Bonus.j--;
                success=true;
            }
        }
    }
}


function GhostMovement(GhostPosition) {
    //anyway
    board[GhostPosition.i][GhostPosition.j] = GhostPosition.prev;
    if(GhostPosition.prev===2){
        board[GhostPosition.i][GhostPosition.j] = 0;
    }
    //movment
    if(m_PacmanPosition.i > GhostPosition.i && board[GhostPosition.i + 1][GhostPosition.j] !== 13 && board[GhostPosition.i + 1][GhostPosition.j] !== 3 && board[GhostPosition.i + 1][GhostPosition.j] !== 4 && board[GhostPosition.i + 1][GhostPosition.j] !== 5 && board[GhostPosition.i + 1][GhostPosition.j] !== 6 && board[GhostPosition.i + 1][GhostPosition.j] !== 10){
        GhostPosition.prev = board[GhostPosition.i+1][GhostPosition.j];
        board[GhostPosition.i+1][GhostPosition.j] = GhostPosition.num;
        GhostPosition.i++;
    }
    else if(m_PacmanPosition.j > GhostPosition.j&& board[GhostPosition.i][GhostPosition.j + 1] !== 13 && board[GhostPosition.i][GhostPosition.j + 1] !== 3 && board[GhostPosition.i][GhostPosition.j + 1] !== 4 && board[GhostPosition.i][GhostPosition.j + 1] !== 5 && board[GhostPosition.i][GhostPosition.j + 1] !== 6 && board[GhostPosition.i][GhostPosition.j + 1] !== 10){
        GhostPosition.prev = board[GhostPosition.i][GhostPosition.j+1];
        board[GhostPosition.i][GhostPosition.j+1] = GhostPosition.num;
        GhostPosition.j++;
    }
    else if(m_PacmanPosition.i < GhostPosition.i&& board[GhostPosition.i - 1][GhostPosition.j] !== 13 && board[GhostPosition.i - 1][GhostPosition.j] !== 3 && board[GhostPosition.i-1][GhostPosition.j] !== 4 && board[GhostPosition.i-1][GhostPosition.j] !== 5 && board[GhostPosition.i-1][GhostPosition.j] !== 6 && board[GhostPosition.i-1][GhostPosition.j] !== 10){
        GhostPosition.prev = board[GhostPosition.i-1][GhostPosition.j];
        board[GhostPosition.i-1][GhostPosition.j] = GhostPosition.num;
        GhostPosition.i--;
    }
    else if(m_PacmanPosition.j < GhostPosition.j&& board[GhostPosition.i][GhostPosition.j - 1] !== 13 && board[GhostPosition.i][GhostPosition.j - 1] !== 3 && board[GhostPosition.i][GhostPosition.j - 1] !== 4 && board[GhostPosition.i][GhostPosition.j - 1] !== 5 && board[GhostPosition.i][GhostPosition.j - 1] !== 6 && board[GhostPosition.i][GhostPosition.j - 1] !== 10){
        GhostPosition.prev = board[GhostPosition.i][GhostPosition.j-1];
        board[GhostPosition.i][GhostPosition.j-1] = GhostPosition.num;
        GhostPosition.j--;
    }
    else{
        if(board[GhostPosition.i + 1][GhostPosition.j] !== 13 && board[GhostPosition.i + 1][GhostPosition.j] !== 3 && board[GhostPosition.i + 1][GhostPosition.j] !== 4 && board[GhostPosition.i + 1][GhostPosition.j] !== 5 && board[GhostPosition.i + 1][GhostPosition.j] !== 6 && board[GhostPosition.i + 1][GhostPosition.j] !== 10){
            GhostPosition.prev = board[GhostPosition.i+1][GhostPosition.j];
            board[GhostPosition.i+1][GhostPosition.j] = GhostPosition.num;
            GhostPosition.i++;
        }
        else if( board[GhostPosition.i][GhostPosition.j + 1] !== 13 && board[GhostPosition.i][GhostPosition.j + 1] !== 3 && board[GhostPosition.i][GhostPosition.j + 1] !== 4 && board[GhostPosition.i][GhostPosition.j + 1] !== 5 && board[GhostPosition.i][GhostPosition.j + 1] !== 6 && board[GhostPosition.i][GhostPosition.j + 1] !== 10){
            GhostPosition.prev = board[GhostPosition.i][GhostPosition.j+1];
            board[GhostPosition.i][GhostPosition.j+1] = GhostPosition.num;
            GhostPosition.j++;
        }
        else if(board[GhostPosition.i - 1][GhostPosition.j] !== 13 && board[GhostPosition.i - 1][GhostPosition.j] !== 3 && board[GhostPosition.i - 1][GhostPosition.j] !== 4 && board[GhostPosition.i - 1][GhostPosition.j] !== 5 && board[GhostPosition.i-1][GhostPosition.j] !== 6 && board[GhostPosition.i-1][GhostPosition.j] !== 10){
            GhostPosition.prev = board[GhostPosition.i-1][GhostPosition.j];
            board[GhostPosition.i-1][GhostPosition.j] = GhostPosition.num;
            GhostPosition.i--;
        }
        else if(board[GhostPosition.i][GhostPosition.j - 1] !== 13 && board[GhostPosition.i][GhostPosition.j - 1] !== 3 && board[GhostPosition.i][GhostPosition.j - 1] !== 4 && board[GhostPosition.i][GhostPosition.j - 1] !== 5 && board[GhostPosition.i][GhostPosition.j - 1] !== 6 && board[GhostPosition.i][GhostPosition.j - 1] !== 10){
            GhostPosition.prev = board[GhostPosition.i][GhostPosition.j-1];
            board[GhostPosition.i][GhostPosition.j-1] = GhostPosition.num;
            GhostPosition.j--;
        }
    }
}
