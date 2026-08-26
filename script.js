setInterval(function() {document.querySelector("#timeElement").innerHTML = new Date().toLocaleString()}, 1000);

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
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
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
var topBar = document.querySelector("#topBar");
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
}

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

var tsaContent = [{
        title: "Data Science 2026",
        content: `
            <h2>Data Science and Analytics 2026</h2>
            <p>Project Description</p>`
    },
    {
        title: "Test",
        content: `
            <h2>Test Content</h2>
            <p>Description</p>`
    },
    {
        title: "Test 2",
        content: `
            <h2>Test 2</h2>
            <p>a</p>
            <p>b</p>
            <p>c</c>
            <p>d</p>
            <p>e<br><br><br><br><br><br><br><br><br><br><br>f<br><br><br><br><br><br>g</p>`
    }
]
function setTSAContent(index) {
    var content = document.querySelector("#tsaContent");
    content.innerHTML = tsaContent[index].content;
}
setTSAContent(0);
function addToTSASidebar(index) {
    var sidebar = document.querySelector("#tsaSidebar");
    var entry = tsaContent[index];
    var newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <p class="sidebarItem">
            ${entry.title}    
        </p>`
    newDiv.addEventListener("click", function () {
        setTSAContent(index);
    })
    sidebar.appendChild(newDiv);
}
for (let i = 0; i < tsaContent.length; i++) {
    addToTSASidebar(i);
}