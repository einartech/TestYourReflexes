// Global - 1 or 2 or 3 - 
var indexPage = 1;

// Globals for timer
var timer = 0;
var startTime;
var finishTime;
var userName;

// Template user-logging - 1 -
var templateElement = document.getElementById("user-logging-page");
var templateClon = templateElement.content.cloneNode(true);
document.getElementById("containerLeft").appendChild(templateClon);
document.getElementById("button-user-page").addEventListener("click", TemplateSwitch);
document.getElementById("button-user-page").addEventListener("click", SaveTheUserName);


// This function changes the container-left according to the page and templates
function TemplateSwitch() {
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

            indexPage++;
            break;
        case 3:
            templateElement = document.getElementById("user-logging-page");
            templateClon = templateElement.content.cloneNode(true);
            document.getElementById("containerLeft").appendChild(templateClon);
            document.getElementById("button-user-page").addEventListener("click", TemplateSwitch);
            document.getElementById("button-user-page").addEventListener("click", SaveTheUserName);

            indexPage = 1;
            break;
    }
}

/* This function starts the game */
function StartGame() {
    /* Timer reseted from previous game */
    timer = 0;

    /* Button deleted and "Get Ready" message added and shown */
    var startButtonElement = document.getElementById("start-game-button");
    startButtonElement.remove();
    document.getElementById("containerLeft").insertAdjacentHTML("afterbegin", "<div id='get-ready-message'><h2>Get Ready...</h2></div>");

    /* This function is called after 1 seconds */
    setTimeout(RandomShown, 1000);
}

/* This function generates the random number and runs the finish game */
function RandomShown() {
    var randomNumber = Math.floor(Math.random() * 10000);
    setTimeout(FinishGame, randomNumber);
}

/* This function finishes the game */
function FinishGame() {
    /* "Get Ready" message deleted and stop button added and shown */
    var divGetReadyElement = document.getElementById("get-ready-message");
    divGetReadyElement.remove();
    document.getElementById("containerLeft").insertAdjacentHTML("afterbegin", "<button id='stop-game-button' class='gameButtonsClass'>Stop game</button>");
    document.getElementById("stop-game-button").addEventListener("click", TemplateSwitch);
    document.getElementById("stop-game-button").addEventListener("click", SaveTheTime);
    document.getElementById("stop-game-button").addEventListener("click", SaveTheUserName);


    startTime = new Date();
}

/* This function saves the time spent and shown in the last page */
function SaveTheTime() {
    finishTime = new Date();
    timer = (finishTime - startTime) / 1000;

    document.getElementById("score-data").innerHTML = timer + " seconds";
}

function SaveTheUserName() {
    /* This functi0n saves the user results into the right div */
    var savedUserScore = document.getElementById("user-scores").insertAdjacentHTML("afterbegin", "<div><h4>Player</h4><h4>Currently playing</h4></div>");
    var userName = document.getElementById("user-name-text-area").value;
    savedUserScore.value.innerHTML = "HOLA GOwA GOLA "

}