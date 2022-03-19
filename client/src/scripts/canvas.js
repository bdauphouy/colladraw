import Colladraw, { CanvasElementType, CanvasText } from "./colladraw/build/module/index"

const canvas = document.querySelector('#canvas');
const colladraw = new Colladraw(canvas);

// Panel

// panel from header
const trashTool = document.querySelector(".cta-items-trash");
const downloadTool = document.querySelector(".cta-items-download");
const uploadTool = document.querySelector(".cta-items-upload");
const profileIcon = document.querySelector(".cta-items-profile");

// panels from main page

const hideRightPanel = document.querySelector(".arrow-right-panel");
const hideLeftPanel = document.querySelector(".arrow-left-panel");

const showRightPanel = document.querySelector(".arrow-show-tools");
const showLeftPanel = document.querySelector(".arrow-show-colors")

const toolsRightPanel = document.querySelector(".tools-right-panel");
const toolsIcons = document.querySelector(".tools-icons");

const toolsLeftPanel = document.querySelector(".color-left-panel");
const colorIcons = document.querySelector(".color-palette");

// Hidden panels 

const typoChoices = document.querySelector(".typo-choices");
const firstFont = document.querySelector(".first-font");
const secondFont = document.querySelector(".second-font");
const thirdFont = document.querySelector(".third-font");

const profilePanel = document.querySelector(".profile-panel");

// tools from tools right panel
const pen = document.querySelector(".pen");
const rubber = document.querySelector(".rubber");
const rectangle = document.querySelector(".rectangle");
const ellipse = document.querySelector(".ellipse");
const triangle = document.querySelector(".triangle");
const line = document.querySelector(".line");
const textTool = document.querySelector(".typo");
const changeIcon = document.querySelector('.change-icon');
const UndoArrow = document.querySelector(".to-left-arrow");
const RestoreArrow = document.querySelector(".to-right-arrow");

// colors from color panel
const red = document.querySelector('.color-1');
const orange = document.querySelector('.color-2');
const yellow = document.querySelector('.color-3');
const green = document.querySelector('.color-4');
const cyan = document.querySelector('.color-5');
const blue = document.querySelector('.color-6');
const purple = document.querySelector('.color-7');
const pink = document.querySelector('.color-8');
const grey = document.querySelector('.color-9');
const black = document.querySelector('.color-10');

const colorPalette = document.querySelectorAll("ul.color-palette > li");

// Color piker : 
const CoverColorPiker = document.querySelector('.color-piker-covering');
const RealColorPiker = document.querySelector('.color-piker');


// FONCTIONS POUR LE PANEL 

function openTypoTools() {
    if(getComputedStyle(typoChoices).display === 'none'){
        typoChoices.style.display = 'block';

    } else if(getComputedStyle(typoChoices).display === 'block'){
        typoChoices.style.display = 'none';}

        colladraw.changeToolType(CanvasElementType.TEXT);
 };


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

    if(getComputedStyle(typoChoices).display === 'block'){
        typoChoices.style.display = 'none';}

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

// Change the state of the color piker covering div
function ColoringCoverPiker(e) {
    console.log(e.target.value)
    let ColorFromPiker = e.target.value;
    CoverColorPiker.style.backgroundColor = ColorFromPiker;  
}

function EndColoringCoverPiker() {
    CoverColorPiker.style.backgroundColor = "#fff"; 
}

// CANVAS FUNCTIONS

// CREATE FORMS FROM PANEL

function createRectangle(){
    colladraw.changeToolType(CanvasElementType.RECTANGLE);
}

function createTriangle(){
    colladraw.changeToolType(CanvasElementType.TRIANGLE);
}

function createEllipse() {
    colladraw.changeToolType(CanvasElementType.ELLIPSE);
}

function createLine() {
    colladraw.changeToolType(CanvasElementType.LINE);
}

// Define if you want to fill or coloring the stroke 

function colorStrokeFill() {
    if (changeIcon.src.match("/public/icons/background.svg")) {
        changeIcon.src = "/public/icons/border.svg";
    } else {
        changeIcon.src = "/public/icons/background.svg";
    }
}


// Change the color of a selected element

// From picker

function fillColorFromPiker(e) {
    console.log(e.target.value);
    let SelectedElement = colladraw.elements.find((element) => element.selected);
    if(SelectedElement) {
        SelectedElement.fillColor = e.target.value;
        colladraw.draw();
    }
}

// Attente de création de la fonction dans shape.ts
function StrokeColorFromPiker(e) {
    console.log(e.target.value);
    let SelectedElement = colladraw.elements.find((element) => element.selected);
    if(SelectedElement) {
        SelectedElement.strokeColor = e.target.value;
        colladraw.draw();
    }
}

function LineTextColor(e) {
    console.log(e.target.value);
    let SelectedElement = colladraw.elements.find((element) => element.selected);
    if(SelectedElement) {
        SelectedElement.color = e.target.value;
        colladraw.draw();
    }
}


// From palette (fill a form, color a stroke, color text/line elements)
function fillColorFromPalette(e) {
    let SelectedElement = colladraw.elements.find((element) => element.selected);
    let ChosenColor = getComputedStyle(e.target).backgroundColor;
    if(SelectedElement) {
        SelectedElement.fillColor = ChosenColor;
        colladraw.draw();
    }
}

function strokeColorFromPalette(e) {
    let SelectedElement = colladraw.elements.find((element) => element.selected);
    let ChosenColor = getComputedStyle(e.target).backgroundColor;
    if(SelectedElement) {
        SelectedElement.strokeColor = ChosenColor;
        colladraw.draw();
    }
}

function LineTextColorFromPalette(e) {
    let SelectedElement = colladraw.elements.find((element) => element.selected);
    let ChosenColor = getComputedStyle(e.target).backgroundColor;
    if(SelectedElement) {
        SelectedElement.color = ChosenColor;
        colladraw.draw();
    }
}

// PANELS EVENTS 

textTool.addEventListener("click", openTypoTools);
profileIcon.addEventListener("click",openProfilePanel);

hideRightPanel.addEventListener("click", ToggleRightPanel);
showRightPanel.addEventListener("click", ToggleRightPanel);

hideLeftPanel.addEventListener("click", ToggleLeftPanel);
showLeftPanel.addEventListener("click", ToggleLeftPanel);

CoverColorPiker.addEventListener("mouseenter", ColoringCoverPiker);
CoverColorPiker.addEventListener("click", EndColoringCoverPiker);
RealColorPiker.addEventListener("input", ColoringCoverPiker)
// CANVAS EVENTS

// Setting with input and/or change the color once we choose a color in the color piker
RealColorPiker.addEventListener("input", fillColorFromPiker)
RealColorPiker.addEventListener("input", StrokeColorFromPiker)
RealColorPiker.addEventListener("input", LineTextColor)
// RealColorPiker.addEventListener("change", updateColorFromPiker);

colorPalette.forEach(colorPicked => {
    colorPicked.addEventListener('click', fillColorFromPalette);
    console.log(colorPicked)
} );

colorPalette.forEach(colorPicked => {
    colorPicked.addEventListener('click', strokeColorFromPalette);
    console.log(colorPicked)
} );

colorPalette.forEach(colorPicked => {
    colorPicked.addEventListener('click', LineTextColorFromPalette);
    console.log(colorPicked)
} );

// Creating forms once we click on icons
rectangle.addEventListener("click", createRectangle);
triangle.addEventListener("click", createTriangle);
ellipse.addEventListener("click", createEllipse);
line.addEventListener("click", createLine);
// Once we select the element created in canvas, we can apply these events to them

// Trash tool event : clear the board 
trashTool.addEventListener("click",() => {
    colladraw.elements = [];
    colladraw.draw();
})

changeIcon.addEventListener('click', colorStrokeFill)

