const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const trashTool = document.querySelector(".cta-items-trash");
const downloadTool = document.querySelector(".cta-items-download");
const uploadTool = document.querySelector(".cta-items-upload");
const profileIcon = document.querySelector(".cta-items-profile");


const hideRightPanel = document.querySelector(".arrow-right-panel");
const hideLeftPanel = document.querySelector(".arrow-left-panel");

const showRightPanel = document.querySelector(".arrow-show-tools");
const showLeftPanel = document.querySelector(".arrow-show-colors")

const toolsRightPanel = document.querySelector(".tools-right-panel");
const toolsIcons = document.querySelector(".tools-icons");

const toolsLeftPanel = document.querySelector(".color-left-panel");
const colorIcons = document.querySelector(".color-palette");

const penTool = document.querySelector(".pen");
const rubberTool = document.querySelector(".rubber");
const rectangleTool = document.querySelector(".rectangle");
const ellipseTool = document.querySelector(".ellipse");
const triangleTool = document.querySelector(".triangle");
const lineTool = document.querySelector(".line");
const textTool = document.querySelector(".typo");
const paintTool = document.querySelector(".paint-bucket");
const UndoArrow = document.querySelector(".to-left-arrow");
const RestoreArrow = document.querySelector(".to-right-arrow");

// PANELS cachées
const typoChoices = document.querySelector(".typo-choices");
const profilePanel = document.querySelector(".profile-panel");

// taille du canvas - à voir plus tard. 
let isPainting = false;
let lineWidth = 5;

function startDrawing(e) {
    isPainting = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX,e.clientY);
}

function finishedDrawing() {
    isPainting = false;
}

function draw(e) {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = 5;
    ctx.lineTo(e.clientX, e.clientY);
    console.log(e.clientX, e.clientY);
    ctx.stroke();

}


// FONCTIONS POUR LE PANEL 

function openTypoTools() {
    if(getComputedStyle(typoChoices).display === 'none'){
        typoChoices.style.display = 'block';

    } else if(getComputedStyle(typoChoices).display === 'block'){
        typoChoices.style.display = 'none';
} };

function openProfilePanel() {
    if(getComputedStyle(profilePanel).display === 'none'){
        profilePanel.style.display = 'flex';

    } else if(getComputedStyle(profilePanel).display === 'flex'){
        profilePanel.style.display = 'none';
}
}

function ToggleRightPanel(){

    if(getComputedStyle(showRightPanel).display === 'none'){
        showRightPanel.style.display = 'block';

    } else if(getComputedStyle(showRightPanel).display === 'block'){
        showRightPanel.style.display = 'none';
    }

    if(getComputedStyle(hideRightPanel).display === 'block') {
        hideRightPanel.style.display = 'none';
    } else if (getComputedStyle(hideRightPanel).display === 'none') {
        hideRightPanel.style.display = 'block';
    
    }

    if(getComputedStyle(toolsIcons).display === 'grid') {
        toolsIcons.style.display = 'none';
    } else if (getComputedStyle(toolsIcons).display === 'none') {
        toolsIcons.style.display = 'grid';
    }

    if (toolsRightPanel.style.paddingBottom == '0px') {
        toolsRightPanel.style.paddingBottom = '3rem';
    } else{
        toolsRightPanel.style.paddingBottom = '0px';
    }
}

function ToggleLeftPanel(){

    if(getComputedStyle(showLeftPanel).display === 'none'){
        showLeftPanel.style.display = 'block';

    } else if(getComputedStyle(showLeftPanel).display === 'block'){
        showLeftPanel.style.display = 'none';
    }

    if(getComputedStyle(hideLeftPanel).display === 'block') {
        hideLeftPanel.style.display = 'none';
    } else if (getComputedStyle(hideLeftPanel).display === 'none') {
        hideLeftPanel.style.display = 'block';
    
    }

    if(getComputedStyle(colorIcons).display === 'grid') {
        colorIcons.style.display = 'none';
    } else if (getComputedStyle(colorIcons).display === 'none') {
        colorIcons.style.display = 'grid';
    }     
}




// EVENEMENTS 

// CANVAS EVENEMENTS

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup",finishedDrawing);
canvas.addEventListener("mousemove", draw);

// AUTRES EVENEMENTS (PANELS)

textTool.addEventListener("click", openTypoTools);
profileIcon.addEventListener("click",openProfilePanel);

hideRightPanel.addEventListener("click", ToggleRightPanel);
showRightPanel.addEventListener("click", ToggleRightPanel);

hideLeftPanel.addEventListener("click", ToggleLeftPanel);
showLeftPanel.addEventListener("click", ToggleLeftPanel);