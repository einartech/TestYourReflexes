// Global - 1 or 2 or 3 - 
var indexPage = 0;

// Template user-logging - 1 -
var templateUserLogging = document.getElementById("user-logging");
var templateClones = templateUserLogging.content.cloneNode(true);

document.getElementById('containerAllLeft').appendChild(templateClones);

// Template game-screen - 2 -
// var templateGameScreen = document.getElementById("game-screen");
// var templateClones = templateGameScreen.content.cloneNode(true);

// document.getElementById('containerAllLeft').appendChild(templateClones);

// Template final-score - 3 -
// var templateFinalScore = document.getElementById("final-score");
// var templateClones = templateFinalScore.content.cloneNode(true);

// document.getElementById('containerAllLeft').appendChild(templateClones);