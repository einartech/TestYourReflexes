// Global - 1 or 2 or 3 - 
var indexPage = 1;

// Globals for timer
var timer = 0;
var startTime;
var finishTime;

// Global interval to change position
var positionRandomInterval;

// Global to store the game-level
var gameLevel = "static";

// Globals to save user scores
var arrayScoresStatic = [];
var arrayScoresMovement = [];
var arrayScoresMovementInsane = [];

var objectScore = {
    username: new String,
    score: 0
}

// Template user-logging - 1 -
var templateElement = document.getElementById("user-logging-page");
var templateClon = templateElement.content.cloneNode(true);
document.getElementById("containerLeft").appendChild(templateClon);
document.getElementById("button-user-page").addEventListener("click", UserNameValidation);
document.getElementById("user-name-text-area").addEventListener("keyup", CheckTextArea);
document.getElementById("game-level-select").addEventListener("change", ChangeRankingBySelector);

// This function changes the container-left according to the page and templates
function TemplateSwitch(){
    var containerLeft = document.getElementById("containerLeft");
    
    // The container.left content will be removed
    while (containerLeft.firstChild) {
        containerLeft.removeChild(containerLeft.firstChild);
    }

    // The template will be inserted in container-left according to the current page.
    switch (indexPage) {
        case 1:
            templateElement = document.getElementById("game-page");
            templateClon = templateElement.content.cloneNode(true);
            document.getElementById("containerLeft").appendChild(templateClon);
            document.getElementById("start-game-button").addEventListener("click", StartGame);

            indexPage++;
            break;
        case 2:
            templateElement = document.getElementById("final-score-page");
            templateClon = templateElement.content.cloneNode(true);
            document.getElementById("containerLeft").appendChild(templateClon);
            document.getElementById("play-again-button").addEventListener("click", TemplateSwitch);
            document.getElementById("play-again-button").addEventListener("click", InitializeRankingScore);

            indexPage++;
            break;
        case 3:
            templateElement = document.getElementById("user-logging-page");
            templateClon = templateElement.content.cloneNode(true);
            document.getElementById("containerLeft").appendChild(templateClon);
            document.getElementById("button-user-page").addEventListener("click", UserNameValidation);
            document.getElementById("user-name-text-area").addEventListener("keyup", CheckTextArea);
            document.getElementById("game-level-select").addEventListener("change", ChangeRankingBySelector);

            indexPage = 1;
            break;
    }
}

// This function starts the game
function StartGame() {
    // Timer reseted from previous game
    timer = 0;
    
    // Button deleted and "Get Ready" message added and shown
    var startButtonElement = document.getElementById("start-game-button");
    startButtonElement.remove();
    document.getElementById("containerLeft").insertAdjacentHTML("afterbegin","<div id='get-ready-message'><h2>Get Ready...</h2></div>");

    // Container Left background is changed
    document.getElementById("containerLeft").style.backgroundImage = "url(Assets/fondo-game.gif)";

    // This function is called after 1 seconds
    setTimeout(RandomShown, 1000);
}

// This function generates the random number and runs the finish game
function RandomShown(){
    var randomNumber = Math.floor(Math.random() * 10000);
    setTimeout(FinishGame, randomNumber);
}

// This function finishes the game
function FinishGame(){
    // "Get Ready" message deleted and stop button added and shown
    var divGetReadyElement = document.getElementById("get-ready-message");
    divGetReadyElement.remove();
    document.getElementById("containerLeft").insertAdjacentHTML("afterbegin","<div id='random-div'><div id='image-wrapper'><img id='stop-game-button' src='Assets/ufo.png'></div></div>");
    document.getElementById("stop-game-button").addEventListener("click", SaveDataAfterFinish);

    startTime = new Date();

    if(gameLevel == "static"){
        document.getElementById("random-div").style.display = "flex";
        document.getElementById("random-div").style.alignItems = "center";
        document.getElementById("random-div").style.justifyContent = "center";
    }
    else if(gameLevel == "movement"){
        document.getElementById("image-wrapper").style.position = "relative";
        ChangeButtonPosition();
        positionRandomInterval = setInterval(ChangeButtonPosition, 1000);
    }
    else if(gameLevel == "movement-insane"){
        document.getElementById("image-wrapper").style.position = "relative";
        ChangeButtonPosition();
        positionRandomInterval = setInterval(ChangeButtonPosition, 900);
    }
}

// This function changes the "stop button" position
function ChangeButtonPosition(){
    var stopButtonWidth = document.getElementById("image-wrapper").getBoundingClientRect().width;
    var stopButtonHeight = document.getElementById("image-wrapper").getBoundingClientRect().height;
    var containerWidth = document.getElementById("containerLeft").getBoundingClientRect().width;
    var containerHeight = document.getElementById("containerLeft").getBoundingClientRect().height;

    var positionX = Math.floor(Math.random() * (containerWidth-stopButtonWidth-65));
    var positionY = Math.floor(Math.random() * (containerHeight-stopButtonHeight-65));

    document.getElementById("image-wrapper").style.left = positionX + "px";
    document.getElementById("image-wrapper").style.top = positionY + "px";
}

// This function saves the time spent and shown in the last page
function SaveTheTime(){
    finishTime = new Date();
    timer = (finishTime - startTime)/1000;

    objectScore.score = timer;

    document.getElementById("score-data").innerHTML = objectScore.score + " seconds";
    document.getElementsByClassName("time-spent")[0].innerHTML = objectScore.score + " seconds";

    clearInterval(positionRandomInterval);
}

// This function checks the first User Validation
function UserNameValidation(){
    var userNameTextArea = document.getElementById("user-name-text-area");

    if(userNameTextArea.value == ""){
        userNameTextArea.style.backgroundColor = "#FFA084";
        userNameTextArea.style.border = "3px solid red";
        userNameTextArea.setAttribute("placeholder", "Insert a user name...");
    }
    else{
        InsertUserScores();
        TemplateSwitch();
    }
}

// This function checks continuosly the user validation
function CheckTextArea(){
    var userNameTextArea = document.getElementById("user-name-text-area");

    if(userNameTextArea.value == ""){
        userNameTextArea.style.backgroundColor = "#FFA084";
        userNameTextArea.style.border = "3px solid red";
        userNameTextArea.setAttribute("placeholder", "Insert a user name...");
    }
    else{
        userNameTextArea.style.border = "";
        userNameTextArea.style.backgroundColor = "";
        userNameTextArea.removeAttribute("placeholder");
    }
}

// This function inserts the username and creates the div in the user-score space
function InsertUserScores(){
    objectScore.username = document.getElementById("user-name-text-area").value;

    document.getElementById("user-scores").insertAdjacentHTML("afterbegin", "<div><h4 class='user-name'></h4><h4 class='time-spent'></h4></div>");
    document.getElementsByClassName("user-name")[0].innerHTML = objectScore.username;
    document.getElementsByClassName("time-spent")[0].innerHTML = "Currently playing...";
}

// This function removes the background gif when game finish
function ResetBackground(){
    document.getElementById("containerLeft").style.backgroundImage = "";
}

function RankingSort(){
    var objectScoreCopy = Object.assign({}, objectScore);

    if(gameLevel == "static"){
        arrayScoresStatic.push(objectScoreCopy);
        arrayScoresStatic.sort(function(a,b){return b.score - a.score});
    }
    else if(gameLevel == "movement"){
        arrayScoresMovement.push(objectScoreCopy);
        arrayScoresMovement.sort(function(a,b){return b.score - a.score});
    }
    else if(gameLevel == "movement-insane"){
        arrayScoresMovementInsane.push(objectScoreCopy);
        arrayScoresMovementInsane.sort(function(a,b){return b.score - a.score});
    }
}

function SaveDataAfterFinish(){
    ResetBackground();
    TemplateSwitch();
    SaveTheTime();
    RankingSort();
    UpdateRanking();
}

function ChangeRankingBySelector(){
    // Save the value of the selector
    gameLevel = document.getElementById("game-level-select").value;

    UpdateRanking();
}

function UpdateRanking(){
    var userScoresDiv = document.getElementById("user-scores");

    // The user-scores content will be removed
    while (userScoresDiv.firstChild) {
        userScoresDiv.removeChild(userScoresDiv.firstChild);
    }

    if(gameLevel == "static"){
        for(i=0 ; i<arrayScoresStatic.length ; i++){
            document.getElementById("user-scores").insertAdjacentHTML("afterbegin", "<div><h4 class='user-name'></h4><h4 class='time-spent'></h4></div>");
            document.getElementsByClassName("user-name")[0].innerHTML = "#" + `${arrayScoresStatic.length - i}`+ " " + arrayScoresStatic[i].username;
            document.getElementsByClassName("time-spent")[0].innerHTML = arrayScoresStatic[i].score + " seconds";
        }
    }
    else if(gameLevel == "movement"){
        for(i=0 ; i<arrayScoresMovement.length ; i++){
            document.getElementById("user-scores").insertAdjacentHTML("afterbegin", "<div><h4 class='user-name'></h4><h4 class='time-spent'></h4></div>");
            document.getElementsByClassName("user-name")[0].innerHTML = "#" + `${arrayScoresMovement.length - i}`+ " " + arrayScoresMovement[i].username;
            document.getElementsByClassName("time-spent")[0].innerHTML = arrayScoresMovement[i].score + " seconds";
        }
    }
    else if(gameLevel == "movement-insane"){
        for(i=0 ; i<arrayScoresMovementInsane.length ; i++){
            document.getElementById("user-scores").insertAdjacentHTML("afterbegin", "<div><h4 class='user-name'></h4><h4 class='time-spent'></h4></div>");
            document.getElementsByClassName("user-name")[0].innerHTML = "#" + `${arrayScoresMovementInsane.length - i}`+ " " + arrayScoresMovementInsane[i].username;
            document.getElementsByClassName("time-spent")[0].innerHTML = arrayScoresMovementInsane[i].score + " seconds";
        }
    }
}

function InitializeRankingScore(){
    var userScoresDiv = document.getElementById("user-scores");
    gameLevel = "static";

    // The user-scores content will be removed
    while (userScoresDiv.firstChild) {
        userScoresDiv.removeChild(userScoresDiv.firstChild);
    }

    for(i=0 ; i<arrayScoresStatic.length ; i++){
        document.getElementById("user-scores").insertAdjacentHTML("afterbegin", "<div><h4 class='user-name'></h4><h4 class='time-spent'></h4></div>");
        document.getElementsByClassName("user-name")[0].innerHTML = "#" + `${arrayScoresStatic.length - i}`+ " " + arrayScoresStatic[i].username;
        document.getElementsByClassName("time-spent")[0].innerHTML = arrayScoresStatic[i].score + " seconds";
    }
}