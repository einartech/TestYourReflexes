function eraseGameContainerDiv() {

    //Appending template to the AllLeft div (html tree)
    // and grabbing the GameContainer div
    var TemplateGamePage = document.getElementById("game-page");
    var templateClone = TemplateGamePage.content.cloneNode(true);
    document.getElementById("containerAllLeft").appendChild(templateClone);
    document.getElementById("start-game-button").addEventListener("click", eraseGameContainerDiv);
    var myGameContainer = document.getElementById("GameContainer");

    console.log("Game conatiner before while: ",myGameContainer.firstChild);
    // The container.left content will be removed
    while (myGameContainer.firstChild) {
        myGameContainer.removeChild(myGameContainer.firstChild);
        console.log("Game conatiner: ",myGameContainer.firstChild);
    }
    var startTextDiv = document.createElement("div");
    myGameContainer.appendChild(startTextDiv);
    startTextDiv.innerHTML = "Get Ready...";
}