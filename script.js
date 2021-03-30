// Global - 1 or 2 or 3 - 
var indexPage = 1;

// Template user-logging - 1 -
var templateElement = document.getElementById("user-logging-page");
var templateClon = templateElement.content.cloneNode(true);
document.getElementById('containerAllLeft').appendChild(templateClon);
document.getElementById("button-user-page").addEventListener("click", TemplateSwitch);

// This function changes the container-left according to the page and templates
function TemplateSwitch() {
    var containerLeft = document.getElementById("containerAllLeft");

    // The container.left content will be removed
    while (containerLeft.firstChild) {
        containerLeft.removeChild(containerLeft.firstChild);
    }

    // The template will be inserted in container-left according to the current page.
    switch (indexPage) {
        case 1:
            templateElement = document.getElementById("game-page");
            templateClon = templateElement.content.cloneNode(true);
            document.getElementById("containerAllLeft").appendChild(templateClon);
            // document.getElementById("start-game-button").addEventListener("click", TemplateSwitch);
            document.getElementById("start-game-button").addEventListener("click", eraseGameContainerDiv);

            indexPage++;
            break;
        case 2:
            templateElement = document.getElementById("final-score-page");
            templateClon = templateElement.content.cloneNode(true);
            document.getElementById("containerAllLeft").appendChild(templateClon);
            document.getElementById("play-again-button").addEventListener("click", TemplateSwitch);

            indexPage++;
            break;
        case 3:
            templateElement = document.getElementById("user-logging-page");
            templateClon = templateElement.content.cloneNode(true);
            document.getElementById("containerAllLeft").appendChild(templateClon);
            document.getElementById("button-user-page").addEventListener("click", TemplateSwitch);

            indexPage = 1;
            break;
    }
}