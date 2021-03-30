//This var is grabbing the inner content of div Game Container

var myGameContainer = document.getElementById("GameContainer");
// var TemplateGamePage = document.getElementById("game-page");
// var templateClon = templateElement.content.cloneNode(true);
// document.getElementById("containerAllLeft").appendChild(templateClon);
// document.getElementById("start-game-button").addEventListener("click", eraseGameContainerDiv);
function eraseGameContainerDiv() {
    // The container.left content will be removed
    while (myGameContainer.firstChild) {
        myGameContainer.removeChild(myGameContainer.firstChild);
    }
    var startTextDiv = document.createElement("div");
    startTextDiv.innerHTML = "Get Ready"
}