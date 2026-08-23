setInterval(function() {document.querySelector("#timeElement").innerHTML = new Date().toLocaleString()}, 1000);

/*dragElement(document.querySelector("#welcomeWindow"));
dragElement(document.querySelector("#tsaWindow"));*/
function dragElement(element) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;
    if (document.getElementById(element.id + "Header")) {
        document.getElementById(element.id + "Header").onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }
    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;
    }
    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }
    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function setupWindow(windowName) {
    var window = document.querySelector("#" + windowName);
    var windowClose = document.querySelector("#" + windowName + "Close");
    var windowOpen = document.querySelector("#" + windowName + "Open");
    windowClose.addEventListener("click", function() {
        closeWindow(window);
    });
    windowOpen.addEventListener("click", function() {
        openWindow(window);
    });
    addWindowTapHandling(window);
    dragElement(window);
}
var welcomeWindow = document.querySelector("#welcomeWindow");
var tsaWindow = document.querySelector("#tsaWindow");
setupWindow("welcomeWindow");
setupWindow("tsaWindow");
function closeWindow(element) {
    element.style.display = "none";
}
function openWindow(element) {
    element.style.display = "flex";
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
}/*
var welcomeWindowClose = document.querySelector("#welcomeWindowClose");
var welcomeWindowOpen = document.querySelector("#welcomeWindowOpen");
var tsaWindowClose = document.querySelector("#tsaWindowClose");
var tsaWindowOpen = document.querySelector("#tsaIcon");
welcomeWindowClose.addEventListener("click", function() {
    closeWindow(welcomeWindow);
});
welcomeWindowOpen.addEventListener("click", function() {
    openWindow(welcomeWindow);
});
tsaWindowClose.addEventListener("click", function() {
    closeWindow(tsaWindow);
});
tsaWindowOpen.addEventListener("click", function() {
    openWindow(tsaWindow);
});*/

var selectedIcon = undefined;
function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}
function deselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
}
function handleIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element);
        openWindow(element);
    } else {
        selectIcon(element);
    }
}

var biggestIndex = 0;
function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
}
function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
    deselectIcon(selectedIcon)
}
var topBar = document.querySelector("#topBar");