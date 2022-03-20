/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/canvas.js":
/*!********************************!*\
  !*** ./resources/js/canvas.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var colladraw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! colladraw */ "./node_modules/colladraw/build/module/index.js");
/* harmony import */ var _websocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./websocket */ "./resources/js/websocket.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var HandleCanvas = /*#__PURE__*/function () {
  function HandleCanvas() {
    _classCallCheck(this, HandleCanvas);

    this.headerIcons = _toConsumableArray(document.querySelectorAll('.header-icons > li'));
    this.toggleIcons = _toConsumableArray(document.querySelectorAll('.toggle-icon'));
    this.toolsElements = _toConsumableArray(document.querySelectorAll('.tools > li'));
    this.canvas = document.querySelector('#canvas');
    this.cd = new colladraw__WEBPACK_IMPORTED_MODULE_0__["default"](this.canvas);
    this.currentColor = null;
    this.currentTool = null;
    this.websocket = new _websocket__WEBPACK_IMPORTED_MODULE_1__["default"](this.cd);
    this.tools = {
      pen: null,
      rubber: null,
      rectangle: null,
      ellipse: null,
      triangle: null,
      line: null,
      text: null,
      background: null
    };
    this.colors = ['#f3b1af', '#f6d09a', '#fafd90', '#b0d9a0', '#9fd7de', '#a6c3fa', '#e4acec', '#bbb2f9', '#c1c1c1', '#111111'];
    this.handle();
  }

  _createClass(HandleCanvas, [{
    key: "handle",
    value: function handle() {
      this.websocket.init(this.canvas);
      this.handleHeaderIcons();
      this.handlePanels();
    }
  }, {
    key: "handleHeaderIcons",
    value: function handleHeaderIcons() {
      var toggleProfile = function toggleProfile() {
        profile.lastElementChild.classList.toggle('show');
      };

      profile.addEventListener('click', toggleProfile);
    }
  }, {
    key: "handlePanels",
    value: function handlePanels() {
      var _this = this;

      var colorPicker = document.querySelector('#color-picker');

      var changeColor = function changeColor() {
        _this.currentColor = colorPicker.value;
      };

      var changeTool = function changeTool(e) {
        _this.toolsElements.forEach(function (toolElement) {
          toolElement.classList.remove('active');
        });

        var toolElement = e.target;
        toolElement.classList.add('active');
        _this.currentTool = _this.tools[toolElement.id];
      };

      var togglePanel = function togglePanel(e) {
        e.target.parentElement.parentElement.classList.toggle('show');
      };

      this.toggleIcons.forEach(function (toggleIcon) {
        toggleIcon.addEventListener('click', togglePanel);
      });
      colorPicker.addEventListener('input', changeColor);
      this.toolsElements.slice(0, -2).forEach(function (toolElement) {
        toolElement.addEventListener('click', changeTool);
      });
    }
  }]);

  return HandleCanvas;
}();

new HandleCanvas();

/***/ }),

/***/ "./resources/js/websocket.js":
/*!***********************************!*\
  !*** ./resources/js/websocket.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _excluded = ["emitterId"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Websocket = /*#__PURE__*/function () {
  function Websocket(cd) {
    _classCallCheck(this, Websocket);

    this.cd = cd;
  }

  _createClass(Websocket, [{
    key: "init",
    value: function init(canvas) {
      var _this = this;

      var clientId = Math.random().toString(16).slice(2); // let selectedText = null;
      //
      // element-clicked, element-selected, element-deselected, element-moved, element-transform, element-created
      // canvas.addEventListener('element-clicked', (e) => {
      //   console.log('element-clicked', e.detail);
      // });
      //
      // canvas.addEventListener('element-selected', (e) => {
      //   console.log('element-selected', e.detail);
      //
      //   if (e.detail.element instanceof CanvasText) {
      //     selectedText = e.detail.element;
      //   }
      // });
      //
      // canvas.addEventListener('element-deselected', (e) => {
      //   console.log('element-deselected', e.detail);
      //   selectedText = null;
      // });
      //
      // canvas.addEventListener('element-moved', (e) => {
      //   console.log('element-moved', e.detail);
      // });
      //
      // canvas.addEventListener('element-transform', (e) => {
      //   console.log('element-transform', e.detail);
      // });
      //
      // canvas.addEventListener('element-created', (e) => {
      //   console.log('element-created', e.detail);
      // });
      //
      // document.querySelector('#text-input').addEventListener('input', (e) => {
      //   if (selectedText) {
      //     selectedText.text = e.target.value;
      //     colladraw.draw()
      //   }
      // });

      var socket = io('http://localhost:8001');
      var drawingId = 1;
      socket.on('connect', function () {
        console.info('Websocket connected');
        socket.emit('join-drawing', "drawing-".concat(drawingId));
        socket.on('update-drawing', function (_ref) {
          var emitterId = _ref.emitterId,
              data = _objectWithoutProperties(_ref, _excluded);

          if (emitterId !== clientId) {
            _this.cd.load(data);
          }
        });

        var send = function send() {
          socket.emit('update-drawing', {
            data: _this.cd.toJSON(),
            emitterId: clientId,
            room: "drawing-".concat(drawingId)
          });
        };

        canvas.addEventListener('element-created', send);
        canvas.addEventListener('element-moved', send);
        canvas.addEventListener('element-transform', send);
      });
    }
  }]);

  return Websocket;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Websocket);

/***/ }),

/***/ "./node_modules/colladraw/build/module/index.js":
/*!******************************************************!*\
  !*** ./node_modules/colladraw/build/module/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasElement": () => (/* reexport safe */ _lib_canvas_elements_CanvasElement_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "CanvasElementType": () => (/* reexport safe */ _lib_enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_8__.CanvasElementType),
/* harmony export */   "CanvasText": () => (/* reexport safe */ _lib_canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "Ellipse": () => (/* reexport safe */ _lib_canvas_elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Polygon": () => (/* reexport safe */ _lib_canvas_elements_Polygon_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "Rectangle": () => (/* reexport safe */ _lib_canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "Shape": () => (/* reexport safe */ _lib_canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Triangle": () => (/* reexport safe */ _lib_canvas_elements_Triangle_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_Colladraw_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Colladraw.js */ "./node_modules/colladraw/build/module/lib/Colladraw.js");
/* harmony import */ var _lib_canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/canvas_elements/Shape.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Shape.js");
/* harmony import */ var _lib_canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/canvas_elements/Rectangle.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Rectangle.js");
/* harmony import */ var _lib_canvas_elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/canvas_elements/Ellipse.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Ellipse.js");
/* harmony import */ var _lib_canvas_elements_Polygon_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/canvas_elements/Polygon.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Polygon.js");
/* harmony import */ var _lib_canvas_elements_Triangle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/canvas_elements/Triangle.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Triangle.js");
/* harmony import */ var _lib_canvas_elements_CanvasElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/canvas_elements/CanvasElement.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js");
/* harmony import */ var _lib_canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/canvas_elements/CanvasText.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasText.js");
/* harmony import */ var _lib_enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/enums/CanvasElementType.js */ "./node_modules/colladraw/build/module/lib/enums/CanvasElementType.js");









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lib_Colladraw_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxLQUFLLE1BQU0sNkJBQTZCLENBQUM7QUFDaEQsT0FBTyxTQUFTLE1BQU0saUNBQWlDLENBQUM7QUFDeEQsT0FBTyxPQUFPLE1BQU0sK0JBQStCLENBQUM7QUFDcEQsT0FBTyxPQUFPLE1BQU0sK0JBQStCLENBQUM7QUFDcEQsT0FBTyxRQUFRLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEQsT0FBTyxhQUFhLE1BQU0scUNBQXFDLENBQUM7QUFDaEUsT0FBTyxVQUFVLE1BQU8sa0NBQWtDLENBQUM7QUFDM0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFaEUsZUFBZSxTQUFTLENBQUM7QUFDekIsT0FBTyxFQUNILEtBQUssRUFDTCxTQUFTLEVBQ1QsT0FBTyxFQUNQLE9BQU8sRUFDUCxRQUFRLEVBQ1IsYUFBYSxFQUNiLFVBQVUsRUFDVixpQkFBaUIsRUFDcEIsQ0FBQyJ9

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/Colladraw.js":
/*!**************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/Colladraw.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Colladraw)
/* harmony export */ });
/* harmony import */ var _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas_elements/Shape.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Shape.js");
/* harmony import */ var _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums/CanvasElementType.js */ "./node_modules/colladraw/build/module/lib/enums/CanvasElementType.js");
/* harmony import */ var _canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas_elements/Rectangle.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Rectangle.js");
/* harmony import */ var _canvas_elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./canvas_elements/Ellipse.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Ellipse.js");
/* harmony import */ var _canvas_elements_Triangle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./canvas_elements/Triangle.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Triangle.js");
/* harmony import */ var _utils_AnchorConditions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/AnchorConditions.js */ "./node_modules/colladraw/build/module/lib/utils/AnchorConditions.js");
/* harmony import */ var _utils_kebabize_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/kebabize.js */ "./node_modules/colladraw/build/module/lib/utils/kebabize.js");
/* harmony import */ var _canvas_elements_Polygon_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./canvas_elements/Polygon.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Polygon.js");
/* harmony import */ var _events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./events/CanvasEvents.js */ "./node_modules/colladraw/build/module/lib/events/CanvasEvents.js");
/* harmony import */ var _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./canvas_elements/CanvasText.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasText.js");
/* harmony import */ var _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./canvas_elements/Line.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Line.js");
/* harmony import */ var _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/ResizeFunctions.js */ "./node_modules/colladraw/build/module/lib/utils/ResizeFunctions.js");












class Colladraw {
    canvas;
    context;
    grid;
    gridPixelMerge = 5;
    background;
    backgroundColor = '#fafafa';
    state = {
        variables: {},
        history: {
            undo: [],
            redo: []
        }
    };
    onClickLocker = false;
    constructor(canvas, gridPixelMerge = 5) {
        document.head.appendChild(document.createElement('script')).src = 'https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js';
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        this.canvas = {
            canvas,
            elements: []
        };
        this.gridPixelMerge = gridPixelMerge;
        this.context = canvas.getContext('2d');
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, canvas.width, canvas.height);
        this.background = canvas;
        this.addToHistory();
        this.initGrid();
        this.canvas.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.canvas.addEventListener('click', this.onClick.bind(this));
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                if (this.state.selectedElement) {
                    this.removeElement(this.state.selectedElement);
                    this.draw();
                    this.generateGrid();
                    this.state.selectedElement.deselect();
                    this.state.selectedElement = false;
                    this.state.selectionTransform = false;
                }
            }
            if (e.key === 'z' && e.ctrlKey) {
                this.undo();
            }
            if (e.key === 'y' && e.ctrlKey) {
                this.redo();
            }
        });
    }
    initGrid() {
        this.grid = [];
        for (let i = 0; i < this.canvas.canvas.height; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.canvas.canvas.width; j++) {
                this.grid[i].push(null);
            }
        }
    }
    generateGrid() {
        if (this.elements.length > 0) {
            this.elements.forEach((element) => element.generateGrid(this.grid, this.gridPixelMerge));
        }
        else {
            this.initGrid();
        }
    }
    getClickedElement(event) {
        return this.grid[event.offsetY + this.gridPixelMerge - (event.offsetY % this.gridPixelMerge)][event.offsetX + this.gridPixelMerge - (event.offsetX % this.gridPixelMerge)];
    }
    draw(clear = true) {
        if (clear) {
            this.context.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
        }
        const elementsToDraw = this.canvas.elements.concat(this.state.drawing && (this.state.drawing.shape || this.state.drawing.line) ? this.state.drawing.shape ?? this.state.drawing.line : []);
        elementsToDraw.forEach(element => {
            if (element instanceof _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                if (this.state.variables.fillColor) {
                    element.fillColor = this.state.variables.fillColor;
                }
                if (this.state.variables.strokeColor) {
                    element.strokeColor = this.state.variables.strokeColor;
                }
                if (this.state.variables.strokeWidth) {
                    element.strokeWidth = this.state.variables.strokeWidth;
                }
            }
            else if (element instanceof _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__["default"]) {
                if (this.state.variables.fillColor) {
                    element.color = this.state.variables.fillColor;
                }
                if (this.state.variables.font) {
                    element.font = this.state.variables.font;
                }
            }
            element.draw(this.context);
        });
    }
    addElement(element, toAddToHistory = true) {
        this.canvas.elements.push(element);
        this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementCreated(element));
        if (toAddToHistory) {
            this.addToHistory();
        }
    }
    removeElement(elementToDelete) {
        this.canvas.elements = this.canvas.elements.filter(element => element !== elementToDelete);
        this.addToHistory();
    }
    get elements() {
        return this.canvas.elements;
    }
    addToHistory() {
        this.state.history.current = this.toJSON();
        this.state.history.undo.push(this.state.history.current);
    }
    undo() {
        this.state.history.redo.push(this.state.history.current);
        this.state.history.current = this.state.history.undo.pop();
        if (this.state.history.current) {
            this.load(this.state.history.current);
        }
        this.draw();
    }
    redo() {
        this.state.history.undo.push(this.state.history.current);
        this.state.history.current = this.state.history.redo.pop();
        if (this.state.history.current) {
            this.load(this.state.history.current);
        }
        this.draw();
    }
    onMouseDown(event) {
        const clickedElement = this.getClickedElement(event);
        if (!clickedElement) {
            if (this.state.selectedElement)
                this.state.selectedElement.deselect();
            this.state.selectedElement = false;
            this.state.selectionTransform = false;
            this.onClickLocker = true;
            const x = event.offsetX;
            const y = event.offsetY;
            const toolType = this.state.variables.toolType ?? _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.RECTANGLE;
            this.state = {
                ...this.state,
                variables: { toolType },
                // @ts-ignore
                typing: toolType === _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.TEXT ? {
                    ...this.state.typing,
                    text: 'Hello World',
                    font: '20px Arial'
                } : false,
                // @ts-ignore
                drawing: toolType != _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.TEXT ? {
                    ...this.state.drawing,
                    color: '#000',
                    strokeWidth: 1,
                    startPoint: {
                        x: event.offsetX,
                        y: event.offsetY
                    }
                } : false
            };
            if (this.state.variables.toolType) {
                let element;
                switch (this.state.variables.toolType) {
                    case _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.RECTANGLE:
                        element = new _canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__["default"](x, y, 0, 0);
                        break;
                    case _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.ELLIPSE:
                        element = new _canvas_elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_3__["default"](x, y, 0, 0);
                        break;
                    case _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.TRIANGLE:
                        element = new _canvas_elements_Triangle_js__WEBPACK_IMPORTED_MODULE_4__["default"](x, y, 0, 0);
                        break;
                    case _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.LINE:
                        element = new _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__["default"](x, y, 0, 0);
                        break;
                    case _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.TEXT:
                        element = new _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__["default"]('Hello world', x, y, this.state.variables.font ?? '12px Arial');
                        element.y += parseInt(element.font.match(/\d+/)[0] ?? '20');
                        break;
                    case _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.PENCIL:
                        if (this.state.drawing)
                            this.state.drawing.pencil = true;
                        break;
                    case _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.ERASER:
                        if (this.state.drawing)
                            this.state.drawing.eraser = true;
                        break;
                    default:
                        element = new _canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__["default"](x, y, 0, 0);
                        break;
                }
                if (element instanceof _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] || element instanceof _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__["default"]) {
                    if (element instanceof _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                        element.strokeColor = '#000';
                    }
                    else if (element instanceof _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__["default"]) {
                        element.color = '#000';
                    }
                    this.state = {
                        ...this.state,
                        drawing: {
                            ...this.state.drawing,
                            shape: element instanceof _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? element : undefined,
                            line: element instanceof _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__["default"] ? element : undefined
                        }
                    };
                }
                else if (element instanceof _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__["default"]) {
                    element.color = '#000';
                    this.state = {
                        ...this.state,
                        typing: {
                            ...this.state.typing,
                            text: element.text,
                            textElement: element
                        }
                    };
                    this.draw();
                }
            }
        }
        else {
            const gripMargin = 20;
            let anchorFound = false;
            Object.entries(_utils_AnchorConditions_js__WEBPACK_IMPORTED_MODULE_5__["default"]).forEach(([anchorConditionName, anchorCondition]) => {
                if (!anchorFound && !(this.state.selectedElement instanceof _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__["default"]) && anchorCondition(this.grid, gripMargin, event, this.gridPixelMerge)) {
                    this.state = {
                        ...this.state,
                        selectionTransform: {
                            resize: {
                                grip: (0,_utils_kebabize_js__WEBPACK_IMPORTED_MODULE_6__["default"])(anchorConditionName)
                            }
                        }
                    };
                    anchorFound = true;
                }
            });
            if (!anchorFound && this.state.selectedElement) {
                this.state = {
                    ...this.state,
                    selectionTransform: {
                        translate: {
                            grip: {
                                x: event.offsetX - this.state.selectedElement.x,
                                y: event.offsetY - this.state.selectedElement.y
                            }
                        }
                    }
                };
            }
        }
    }
    onMouseMove(event) {
        if (!this.state.selectedElement) {
            const x = event.offsetX;
            const y = event.offsetY;
            if (this.state.drawing) {
                const shouldRedraw = this.elements.some(element => element.selected);
                this.elements.forEach(element => {
                    element.deselect();
                });
                if (shouldRedraw) {
                    this.draw();
                }
            }
            if (this.state.drawing && this.state.drawing.pencil) {
                const point = new _canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__["default"](x, y, 5, 5);
                point.selectable = false;
                this.addElement(point, false);
            }
            else if (this.state.drawing && this.state.drawing.eraser) {
                this.context.globalCompositeOperation = 'destination-out';
                const point = new _canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__["default"](x, y, 5, 5);
                point.fillColor = this.backgroundColor;
                point.strokeColor = this.backgroundColor;
                point.selectable = false;
                this.addElement(point, false);
                this.context.globalCompositeOperation = 'source-over';
            }
            else if (this.state.drawing) {
                this.state = {
                    ...this.state,
                    drawing: {
                        ...this.state.drawing,
                        endPoint: { x, y }
                    }
                };
                if (this.state.drawing && this.state.drawing.shape) {
                    this.state.drawing.shape.width = this.state.drawing.endPoint.x - this.state.drawing.startPoint.x;
                    this.state.drawing.shape.height = this.state.drawing.endPoint.y - this.state.drawing.startPoint.y;
                    this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementMoved(this.state.drawing.shape, event));
                    //   if (this.state.drawing.shape.width < 0) {
                    //     this.state.drawing.shape.width = Math.abs(this.state.drawing.shape.width);
                    //     [this.state.drawing.startPoint.x, this.state.drawing.endPoint.x] = [this.state.drawing.endPoint.x, this.state.drawing.startPoint.x];
                    //     this.state.drawing.shape.x = this.state.drawing.startPoint.x;
                    //   }
                    //
                    //   if (this.state.drawing.shape.height < 0) {
                    //     this.state.drawing.shape.height = Math.abs(this.state.drawing.shape.height);
                    //     [this.state.drawing.startPoint.y, this.state.drawing.endPoint.y] = [this.state.drawing.endPoint.y, this.state.drawing.startPoint.y];
                    //     this.state.drawing.shape.y = this.state.drawing.startPoint.y;
                    //   }
                }
                else if (this.state.drawing && this.state.drawing.line) {
                    this.state.drawing.line.endX = this.state.drawing.endPoint.x;
                    this.state.drawing.line.endY = this.state.drawing.endPoint.y;
                    this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementMoved(this.state.drawing.line, event));
                }
            }
        }
        else if (this.state.selectedElement && this.state.selectionTransform) {
            if (this.state.selectedElement) {
                if (this.state.selectionTransform.translate) {
                    const oldX = this.state.selectedElement.x;
                    const oldY = this.state.selectedElement.y;
                    this.state.selectedElement.x = event.offsetX - this.state.selectionTransform.translate.grip.x;
                    this.state.selectedElement.y = event.offsetY - this.state.selectionTransform.translate.grip.y;
                    if (this.state.selectedElement instanceof _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__["default"]) {
                        this.state.selectedElement.endX = this.state.selectedElement.endX + (this.state.selectedElement.x - oldX);
                        this.state.selectedElement.endY = this.state.selectedElement.endY + (this.state.selectedElement.y - oldY);
                    }
                    this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementMoved(this.state.selectedElement, event));
                    this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementTransformed(this.state.selectedElement, {
                        type: 'translate',
                        x: this.state.selectionTransform.translate.grip.x,
                        y: this.state.selectionTransform.translate.grip.y,
                        oldX,
                        oldY
                    }));
                }
                else if (this.state.selectionTransform.resize) {
                    const oldX = this.state.selectedElement.x;
                    const oldY = this.state.selectedElement.y;
                    const oldWidth = this.state.selectedElement.width;
                    const oldHeight = this.state.selectedElement.height;
                    if (this.state.selectionTransform.resize.grip === 'top-left') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].topLeft(this.state, event);
                    }
                    else if (this.state.selectionTransform.resize.grip === 'top-right') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].topRight(this.state, event);
                    }
                    else if (this.state.selectionTransform.resize.grip === 'bottom-left') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].bottomLeft(this.state, event);
                    }
                    else if (this.state.selectionTransform.resize.grip === 'bottom-right') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].bottomRight(this.state, event);
                    }
                    else if (this.state.selectionTransform.resize.grip === 'top') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].top(this.state, event);
                    }
                    else if (this.state.selectionTransform.resize.grip === 'right') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].right(this.state, event);
                    }
                    else if (this.state.selectionTransform.resize.grip === 'bottom') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].bottom(this.state, event);
                    }
                    else if (this.state.selectionTransform.resize.grip === 'left') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].left(this.state, event);
                    }
                    this.canvas.canvas.dispatchEvent((_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementTransformed(this.state.selectedElement, {
                        type: 'resize',
                        x: this.state.selectedElement.x,
                        y: this.state.selectedElement.y,
                        width: this.state.selectedElement.width,
                        height: this.state.selectedElement.height,
                        oldX,
                        oldY,
                        oldWidth,
                        oldHeight
                    })));
                }
            }
        }
        // if (this.state.selectionTransform || this.state.selectedShape || this.state.typing || this.state.typing) {
        if (Object.values(this.state).some(value => value)) {
            this.draw();
        }
    }
    onMouseUp(_event) {
        if (this.state.drawing && this.state.drawing.shape && this.state.drawing.shape.width !== 0 && this.state.drawing.shape.height !== 0) {
            this.addElement(this.state.drawing.shape);
        }
        else if (this.state.drawing && this.state.drawing.line) {
            this.addElement(this.state.drawing.line);
        }
        else if (this.state.drawing && (this.state.drawing.pencil || this.state.drawing.eraser)) {
            this.addToHistory();
        }
        else if (this.state.typing) {
            this.addElement(this.state.typing.textElement);
        }
        else if (this.state.selectionTransform) {
            // this.initGrid();
            // this.canvas.elements.forEach(element => {
            //   element.generateGrid(this.grid);
            // });
        }
        this.initGrid();
        this.generateGrid();
        if (this.state.drawing)
            (this.state.drawing.shape ?? this.state.drawing.line).select();
        this.state.drawing = false;
        this.state.typing = false;
        this.state.selectionTransform = false;
        this.onClickLocker = false;
    }
    onClick(event) {
        const clickedElement = this.getClickedElement(event);
        if (clickedElement) {
            if (clickedElement.selectable) {
                this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementClicked(clickedElement, event));
                if (!this.state.drawing && !this.state.typing && !this.onClickLocker) {
                    if (this.state.selectedElement) {
                        this.state.selectedElement.deselect();
                    }
                    clickedElement.select();
                    this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementSelected(clickedElement));
                    this.state.selectedElement = clickedElement;
                    this.draw();
                }
            }
        }
        else if (this.state.selectedElement) {
            this.state.selectedElement.deselect();
            this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementDeselected(this.state.selectedElement));
            this.state.selectedElement = false;
            this.draw();
        }
    }
    changeFillColor(color) {
        this.state.variables.fillColor = color;
    }
    changeStrokeColor(color) {
        this.state.variables.strokeColor = color;
    }
    changeStrokeWidth(width) {
        this.state.variables.strokeWidth = width;
    }
    changeToolType(type) {
        this.state.variables.toolType = type;
    }
    toJSON() {
        return {
            timestamp: Date.now(),
            data: {
                elements: this.elements.map(element => element.toJSON())
            }
        };
    }
    load(json) {
        this.canvas.elements = json.data.elements.map(shape => {
            if (shape.type === 'Rectangle') {
                return _canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__["default"].fromJSON(shape);
            }
            else if (shape.type === 'Ellipse') {
                return _canvas_elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_3__["default"].fromJSON(shape);
            }
            else if (shape.type === 'Triangle') {
                return _canvas_elements_Triangle_js__WEBPACK_IMPORTED_MODULE_4__["default"].fromJSON(shape);
            }
            else if (shape.type.match(/Polygon\[\d+]/)) {
                return _canvas_elements_Polygon_js__WEBPACK_IMPORTED_MODULE_7__["default"].fromJSON(shape);
            }
            else if (shape.type === 'Line') {
                return _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__["default"].fromJSON(shape);
            }
            else if (shape.type === 'Text') {
                return _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__["default"].fromJSON(shape);
            }
            return _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(shape);
        });
        this.draw();
    }
    clear() {
        this.canvas.elements = [];
        this.draw();
        this.addToHistory();
        this.generateGrid();
    }
    toDataURL() {
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, 999999, 999999);
        this.draw(false);
        this.elements.forEach((element) => {
            element.deselect();
            this.changeFillColor(element instanceof _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? element.fillColor : element instanceof _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__["default"] || element instanceof _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__["default"] ? element.color : undefined);
            this.changeStrokeColor(element instanceof _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? element.strokeColor : undefined);
            this.changeStrokeWidth(element instanceof _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? element.strokeWidth : undefined);
            this.addElement(element, false);
            this.draw(false);
        });
        return this.canvas.canvas.toDataURL();
    }
    savePNG(name) {
        this.toDataURL();
        const aDownloadLink = document.createElement('a');
        aDownloadLink.download = name ?? 'canvas.png';
        aDownloadLink.href = this.toDataURL();
        aDownloadLink.click();
    }
    savePDF(name) {
        this.canvas.elements.forEach((element) => element.deselect());
        this.draw();
        // @ts-ignore
        const doc = new jspdf.jsPDF(this.canvas.canvas.width > this.canvas.canvas.height ? 'landscape' : 'portrait', 'px', [this.canvas.canvas.width, this.canvas.canvas.height]);
        const image = this.toDataURL();
        doc.addImage(image, 'JPEG', 0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
        doc.save(name ?? 'canvas.pdf');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFkcmF3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9Db2xsYWRyYXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDNUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxTQUFTLE1BQU0sNkJBQTZCLENBQUM7QUFFcEQsT0FBTyxPQUFPLE1BQU0sMkJBQTJCLENBQUM7QUFDaEQsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFFbEQsT0FBTyxnQkFBZ0IsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLFFBQVEsTUFBTSxrQkFBa0IsQ0FBQztBQUV4QyxPQUFPLE9BQU8sTUFBTSwyQkFBMkIsQ0FBQztBQUNoRCxPQUFPLFlBQVksTUFBTSx1QkFBdUIsQ0FBQztBQUVqRCxPQUFPLFVBQVUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLElBQUksTUFBTSx3QkFBd0IsQ0FBQztBQUMxQyxPQUFPLGVBQWUsTUFBTSx5QkFBeUIsQ0FBQztBQUV0RCxNQUFNLENBQUMsT0FBTyxPQUFPLFNBQVM7SUFDNUIsTUFBTSxDQUdKO0lBQ0YsT0FBTyxDQUEyQjtJQUNsQyxJQUFJLENBQWE7SUFDakIsY0FBYyxHQUFXLENBQUMsQ0FBQztJQUMzQixVQUFVLENBQW9CO0lBQzlCLGVBQWUsR0FBVyxTQUFTLENBQUM7SUFDNUIsS0FBSyxHQUFVO1FBQ3JCLFNBQVMsRUFBRSxFQUFFO1FBQ2IsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtTQUNUO0tBQ0YsQ0FBQztJQUNNLGFBQWEsR0FBWSxLQUFLLENBQUM7SUFFdkMsWUFBWSxNQUF5QixFQUFFLGlCQUF5QixDQUFDO1FBQy9ELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFB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

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CanvasElement)
/* harmony export */ });
class CanvasElement {
    x;
    y;
    width;
    height;
    selected = false;
    selectable = true;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(context) {
        if (this.selected) {
            context.fillStyle = '#ff0000';
            context.strokeStyle = '#ff0000';
            context.lineWidth = 2;
            context.moveTo(this.x, this.y);
            context.beginPath();
            context.lineTo(this.x, this.y);
            context.lineTo(this.x + this.width, this.y);
            context.lineTo(this.x + this.width, this.y + this.height);
            context.lineTo(this.x, this.y + this.height);
            context.lineTo(this.x, this.y);
            context.stroke();
            context.closePath();
            const anchorSize = 6;
            context.fillRect(this.x - (anchorSize / 2), this.y - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x - (anchorSize / 2), this.y + this.height - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x + this.width - (anchorSize / 2), this.y - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x + this.width - (anchorSize / 2), this.y + this.height - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x + this.width / 2 - (anchorSize / 2), this.y - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x + this.width / 2 - (anchorSize / 2), this.y + this.height - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x - (anchorSize / 2), this.y + this.height / 2 - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x + this.width - (anchorSize / 2), this.y + this.height / 2 - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x + this.width / 2 - (anchorSize / 2), this.y + this.height / 2 - (anchorSize / 2), anchorSize, anchorSize);
        }
    }
    static fromJSON(_json) {
        throw new Error('Not implemented');
    }
    ;
    select() {
        this.selected = true;
    }
    deselect() {
        this.selected = false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FudmFzRWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FudmFzX2VsZW1lbnRzL0NhbnZhc0VsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxDQUFDLE9BQU8sT0FBZ0IsYUFBYTtJQUN6QyxDQUFDLENBQVM7SUFDVixDQUFDLENBQVM7SUFDVixLQUFLLENBQVM7SUFDZCxNQUFNLENBQVM7SUFDZixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFVBQVUsR0FBWSxJQUFJLENBQUM7SUFFM0IsWUFBc0IsQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYztRQUN2RSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFpQztRQUNwQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDOUIsT0FBTyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7WUFDaEMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFFdEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUVwQixNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFFckIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQy9GLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzdHLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzVHLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDMUgsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2hILE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzlILE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNqSCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM5SCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDbkk7SUFDSCxDQUFDO0lBS0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUEwQjtRQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUFBLENBQUM7SUFFRixNQUFNO1FBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasText.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/CanvasText.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CanvasText)
/* harmony export */ });
/* harmony import */ var _CanvasElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasElement.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js");

class CanvasText extends _CanvasElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    text;
    font;
    color;
    constructor(text, x, y, font) {
        super(x, y, 0, 0);
        this.text = text;
        this.font = font;
    }
    draw(context) {
        context.font = this.font;
        context.fillStyle = this.color;
        this.width = context.measureText(this.text).width;
        this.height = parseInt(this.font.match(/\d+/)[0] ?? '20');
        context.fillText(this.text, this.x, this.y);
        if (this.selected) {
            context.fillStyle = '#ff0000';
            context.strokeStyle = '#ff0000';
            context.lineWidth = 2;
            context.moveTo(this.x, this.y + 3);
            context.beginPath();
            context.lineTo(this.x, this.y + 3);
            context.lineTo(this.x + this.width, this.y + 3);
            context.stroke();
            context.closePath();
        }
    }
    generateGrid(canvasGrid, gridPixelMerge) {
        let minI = this.y - this.height;
        minI -= (minI % gridPixelMerge);
        let minJ = this.x;
        minJ -= (minJ % gridPixelMerge);
        let maxI = this.y;
        maxI += (gridPixelMerge - (maxI % gridPixelMerge));
        let maxJ = this.x + this.width;
        maxJ += (gridPixelMerge - (maxJ % gridPixelMerge));
        for (let i = minI; i <= maxI; i += gridPixelMerge) {
            for (let j = minJ; j <= maxJ; j += gridPixelMerge) {
                canvasGrid[i][j] = this;
            }
        }
    }
    toJSON() {
        return {
            type: "Text",
            x: this.x,
            y: this.y,
            text: this.text,
            font: this.font,
            color: this.color,
        };
    }
    static fromJSON(json) {
        const text = new CanvasText(json.text, json.x, json.y, json.font);
        text.color = json.color;
        return text;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FudmFzVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FudmFzX2VsZW1lbnRzL0NhbnZhc1RleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFJNUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsYUFBYTtJQUNuRCxJQUFJLENBQVM7SUFDYixJQUFJLENBQVM7SUFDYixLQUFLLENBQVM7SUFFZCxZQUNFLElBQVksRUFDWixDQUFTLEVBQ1QsQ0FBUyxFQUNULElBQVk7UUFFWixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFpQztRQUNwQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDekIsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRS9CLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2xELElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBRTFELE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1QyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDOUIsT0FBTyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7WUFDaEMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDdEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFbkMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEQsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFRCxZQUFZLENBQUMsVUFBc0IsRUFBRSxjQUFzQjtRQUN6RCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDaEMsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBRW5ELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxJQUFJLGNBQWMsRUFBRTtZQUNqRCxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsSUFBSSxjQUFjLEVBQUU7Z0JBQ2pELFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDekI7U0FDRjtJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTztZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFzQjtRQUNwQyxNQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FDekIsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLElBQUksQ0FDVixDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGIn0=

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Ellipse.js":
/*!****************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Ellipse.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ellipse)
/* harmony export */ });
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Shape.js");

class Ellipse extends _Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }
    generateGrid(canvasGrid, gridPixelMerge) {
        let minI = this.y;
        minI -= (minI % gridPixelMerge);
        let minJ = this.x;
        minJ -= (minJ % gridPixelMerge);
        let maxI = this.y + this.height;
        maxI += (gridPixelMerge - (maxI % gridPixelMerge));
        let maxJ = this.x + this.width;
        maxJ += (gridPixelMerge - (maxJ % gridPixelMerge));
        for (let i = minI; i <= maxI; i += gridPixelMerge) {
            for (let j = minJ; j <= maxJ; j += gridPixelMerge) {
                canvasGrid[i][j] = this;
            }
        }
    }
    draw(context) {
        if (this.width < 0) {
            this.width = 0;
        }
        super.draw(context, () => {
            context.ellipse(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, this.height / 2, 0, 0, 2 * Math.PI);
            context.stroke();
            context.fill();
        });
    }
    toJSON() {
        return {
            type: 'Ellipse',
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            fillColor: this.fillColor,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth,
        };
    }
    static fromJSON(json) {
        const ellipse = new Ellipse(json.x, json.y, json.width, json.height);
        ellipse.fillColor = json.fillColor;
        ellipse.strokeColor = json.strokeColor;
        ellipse.strokeWidth = json.strokeWidth;
        return ellipse;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxsaXBzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FudmFzX2VsZW1lbnRzL0VsbGlwc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBSTVCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBUSxTQUFRLEtBQUs7SUFDeEMsWUFBWSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQzdELEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsWUFBWSxDQUFDLFVBQXNCLEVBQUUsY0FBc0I7UUFDekQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2hDLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUVuRCxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsSUFBSSxjQUFjLEVBQUU7WUFDakQsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLElBQUksY0FBYyxFQUFFO2dCQUNqRCxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ3pCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQWlDO1FBQ3BDLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDaEI7UUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZILE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNqQixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU87WUFDTCxJQUFJLEVBQUUsU0FBc0I7WUFDNUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBaUI7UUFDL0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdkMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FDRiJ9

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Line.js":
/*!*************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Line.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Line)
/* harmony export */ });
/* harmony import */ var _CanvasElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasElement.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js");

class Line extends _CanvasElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    endX;
    endY;
    color;
    constructor(x, y, endX, endY) {
        super(x, y, 0, 0);
        this.endX = endX;
        this.endY = endY;
    }
    getCoordinates(startX = this.x, startY = this.y, endX = this.endX, endY = this.endY) {
        return [
            [startX, startY],
            [endX, endY]
        ];
    }
    generateGrid(canvasGrid, gridPixelMerge) {
        let minI = Math.min(this.y, this.endY);
        minI -= (minI % gridPixelMerge);
        let minJ = Math.min(this.x, this.endX);
        minJ -= (minJ % gridPixelMerge);
        let maxI = Math.max(this.y, this.endY);
        maxI += (gridPixelMerge - (maxI % gridPixelMerge));
        let maxJ = Math.max(this.x, this.endX);
        maxJ += (gridPixelMerge - (maxJ % gridPixelMerge));
        for (let i = minI; i <= minJ; i += gridPixelMerge) {
            for (let j = minJ; j <= maxJ; j += gridPixelMerge) {
                canvasGrid[i][j] = this;
            }
        }
    }
    draw(context) {
        this.width = Math.abs(this.x - this.endX);
        this.height = Math.abs(this.y - this.endY);
        context.strokeStyle = this.color || '#000';
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.endX, this.endY);
        context.lineWidth = 10;
        context.stroke();
        context.closePath();
        super.draw(context);
    }
    static fromJSON(json) {
        const line = new Line(json.x, json.y, json.endX, json.endY);
        line.color = json.color;
        return line;
    }
    toJSON() {
        return {
            type: 'Line',
            x: this.x,
            y: this.y,
            endX: this.endX,
            endY: this.endY,
            color: this.color
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FudmFzX2VsZW1lbnRzL0xpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFHNUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxJQUFLLFNBQVEsYUFBYTtJQUM3QyxJQUFJLENBQVM7SUFDYixJQUFJLENBQVM7SUFDYixLQUFLLENBQVU7SUFFZixZQUFZLENBQVMsRUFBRSxDQUFTLEVBQUUsSUFBWSxFQUFFLElBQVk7UUFDMUQsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCxjQUFjLENBQUMsU0FBaUIsSUFBSSxDQUFDLENBQUMsRUFBRSxTQUFpQixJQUFJLENBQUMsQ0FBQyxFQUFFLE9BQWUsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFlLElBQUksQ0FBQyxJQUFJO1FBQ2pILE9BQU87WUFDTCxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDaEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1NBQ2IsQ0FBQztJQUNKLENBQUM7SUFFRCxZQUFZLENBQUMsVUFBc0IsRUFBRSxjQUFzQjtRQUN6RCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUks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

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Polygon.js":
/*!****************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Polygon.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Polygon)
/* harmony export */ });
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Shape.js");

class Polygon extends _Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    sidesNumber;
    polygonName;
    coordinates;
    constructor(x, y, width, height, sidesNumber, polygonName) {
        super(x, y, width, height);
        this.sidesNumber = sidesNumber;
        this.polygonName = polygonName;
    }
    getCoordinates(startX = this.x, startY = this.y) {
        const coordinates = [];
        for (let i = 0; i < this.sidesNumber; i++) {
            coordinates.push([startX + this.width * Math.cos(i * 2 * Math.PI / this.sidesNumber), startY + this.height * Math.sin(i * 2 * Math.PI / this.sidesNumber)]);
        }
        return coordinates;
    }
    generateGrid(canvasGrid, gridPixelMerge) {
        let minI = Math.min(...this.coordinates.map(coordinate => coordinate[1]));
        minI -= (minI % gridPixelMerge);
        let minJ = Math.min(...this.coordinates.map(coordinate => coordinate[0]));
        minJ -= (minJ % gridPixelMerge);
        let maxI = Math.max(...this.coordinates.map(coordinate => coordinate[1]));
        maxI += (gridPixelMerge - (maxI % gridPixelMerge));
        let maxJ = Math.max(...this.coordinates.map(coordinate => coordinate[0]));
        maxJ += (gridPixelMerge - (maxJ % gridPixelMerge));
        for (let i = minI; i <= maxI; i += gridPixelMerge) {
            for (let j = minJ; j <= maxJ; j += gridPixelMerge) {
                canvasGrid[i][j] = this;
            }
        }
    }
    draw(context) {
        this.coordinates = this.getCoordinates();
        super.draw(context, () => {
            context.moveTo(this.coordinates[0][0], this.coordinates[0][1]);
            [...this.coordinates.slice(1, this.coordinates.length), this.coordinates[0]].forEach(([x, y]) => {
                context.lineTo(x, y);
                context.stroke();
                context.fill();
            });
        });
    }
    toJSON() {
        return {
            type: this.polygonName ?? `Polygon[${this.sidesNumber}]`,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            fillColor: this.fillColor,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth,
        };
    }
    static fromJSON(json) {
        if (json.type === 'Ellipse' || json.type === 'Pencil' || json.type === 'Eraser') {
            throw new Error('Cannot convert ellipse to polygon');
        }
        const polygon = new Polygon(json.x, json.y, json.width, json.height, parseInt(json.type.match(/\d+/)[0]), json.type);
        polygon.fillColor = json.fillColor;
        polygon.strokeColor = json.strokeColor;
        polygon.strokeWidth = json.strokeWidth;
        return polygon;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9seWdvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FudmFzX2VsZW1lbnRzL1BvbHlnb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBSzVCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBUSxTQUFRLEtBQUs7SUFDeEMsV0FBVyxDQUFTO0lBQ3BCLFdBQVcsQ0FBcUI7SUFDeEIsV0FBVyxDQUFhO0lBRWhDLFlBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUFFLFdBQW1CLEVBQUUsV0FBK0I7UUFDbkgsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzdDLE1BQU0sV0FBVyxHQUFlLEVBQUUsQ0FBQztRQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENB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

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Rectangle.js":
/*!******************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Rectangle.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Rectangle)
/* harmony export */ });
/* harmony import */ var _Polygon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Polygon.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Polygon.js");

class Rectangle extends _Polygon_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y, width, height) {
        super(x, y, width, height, 4, 'Rectangle');
    }
    getCoordinates(startX = this.x, startY = this.y) {
        return [
            [startX, startY],
            [startX + this.width, startY],
            [startX + this.width, startY + this.height],
            [startX, startY + this.height]
        ];
    }
    static fromJSON(json) {
        const rectangle = new Rectangle(json.x, json.y, json.width, json.height);
        rectangle.fillColor = json.fillColor;
        rectangle.strokeColor = json.strokeColor;
        rectangle.strokeWidth = json.strokeWidth;
        return rectangle;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjdGFuZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9jYW52YXNfZWxlbWVudHMvUmVjdGFuZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQztBQUdoQyxNQUFNLENBQUMsT0FBTyxPQUFPLFNBQVUsU0FBUSxPQUFPO0lBQzVDLFlBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYztRQUM3RCxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsY0FBYyxDQUFDLFNBQWlCLElBQUksQ0FBQyxDQUFDLEVBQUUsU0FBaUIsSUFBSSxDQUFDLENBQUM7UUFDN0QsT0FBTztZQUNMLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUNoQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztZQUM3QixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzNDLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQy9CLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFpQjtRQUMvQixNQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekUsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3JDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekMsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGIn0=

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Shape.js":
/*!**************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Shape.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Shape)
/* harmony export */ });
/* harmony import */ var _CanvasElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasElement.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js");

class Shape extends _CanvasElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    fillColor;
    strokeColor;
    strokeWidth;
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.width = width;
        this.height = height;
    }
    draw(context, _draw = () => { }) {
        context.lineWidth = this.strokeWidth || 0;
        context.strokeStyle = this.strokeColor || '#000';
        context.fillStyle = this.fillColor || '#000';
        context.beginPath();
        _draw();
        context.closePath();
        super.draw(context);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NhbnZhc19lbGVtZW50cy9TaGFwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUU1QyxNQUFNLENBQUMsT0FBTyxPQUFnQixLQUFNLFNBQVEsYUFBYTtJQUN2RCxTQUFTLENBQVU7SUFDbkIsV0FBVyxDQUFVO0lBQ3JCLFdBQVcsQ0FBVTtJQUVyQixZQUFzQixDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQ3ZFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQWlDLEVBQUUsUUFBa0IsR0FBRyxFQUFFLEdBQUUsQ0FBQztRQUNoRSxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUM7UUFDakQsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQztRQUU3QyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFcEIsS0FBSyxFQUFFLENBQUM7UUFFUixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFcEIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Triangle.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Triangle.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Triangle)
/* harmony export */ });
/* harmony import */ var _Polygon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Polygon.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Polygon.js");

class Triangle extends _Polygon_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y, width, height) {
        super(x, y, width, height, 3, 'Triangle');
    }
    getCoordinates(startX = this.x, startY = this.y) {
        return [
            [startX, startY],
            [startX + this.width, startY],
            [startX + this.width / 2, startY + this.height]
        ];
    }
    static fromJSON(json) {
        const rectangle = new Triangle(json.x, json.y, json.width, json.height);
        rectangle.fillColor = json.fillColor;
        rectangle.strokeColor = json.strokeColor;
        rectangle.strokeWidth = json.strokeWidth;
        return rectangle;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJpYW5nbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NhbnZhc19lbGVtZW50cy9UcmlhbmdsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxXQUFXLENBQUM7QUFHaEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxRQUFTLFNBQVEsT0FBTztJQUMzQyxZQUFZLENBQVMsRUFBRSxDQUFTLEVBQUUsS0FBYSxFQUFFLE1BQWM7UUFDN0QsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELGNBQWMsQ0FBQyxTQUFpQixJQUFJLENBQUMsQ0FBQyxFQUFFLFNBQWlCLElBQUksQ0FBQyxDQUFDO1FBQzdELE9BQU87WUFDTCxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDaEIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7WUFDN0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDaEQsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQWlCO1FBQy9CLE1BQU0sU0FBUyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RSxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDckMsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3pDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/enums/CanvasElementType.js":
/*!****************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/enums/CanvasElementType.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasElementType": () => (/* binding */ CanvasElementType)
/* harmony export */ });
var CanvasElementType;
(function (CanvasElementType) {
    CanvasElementType["RECTANGLE"] = "rectangle";
    CanvasElementType["ELLIPSE"] = "ellipse";
    CanvasElementType["TRIANGLE"] = "triangle";
    CanvasElementType["POLYGON"] = "polygon";
    CanvasElementType["TEXT"] = "text";
    CanvasElementType["LINE"] = "line";
    CanvasElementType["PENCIL"] = "pencil";
    CanvasElementType["ERASER"] = "eraser";
})(CanvasElementType || (CanvasElementType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FudmFzRWxlbWVudFR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2VudW1zL0NhbnZhc0VsZW1lbnRUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBTixJQUFZLGlCQVNYO0FBVEQsV0FBWSxpQkFBaUI7SUFDM0IsNENBQXVCLENBQUE7SUFDdkIsd0NBQW1CLENBQUE7SUFDbkIsMENBQXFCLENBQUE7SUFDckIsd0NBQW1CLENBQUE7SUFDbkIsa0NBQWEsQ0FBQTtJQUNiLGtDQUFhLENBQUE7SUFDYixzQ0FBaUIsQ0FBQTtJQUNqQixzQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBVFcsaUJBQWlCLEtBQWpCLGlCQUFpQixRQVM1QiJ9

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/events/CanvasEvents.js":
/*!************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/events/CanvasEvents.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    CanvasElementClicked: (element, mouseevent) => new CustomEvent('element-clicked', {
        detail: { element, mouseevent }
    }),
    CanvasElementSelected: (element) => new CustomEvent('element-selected', {
        detail: { element }
    }),
    CanvasElementDeselected: (element) => new CustomEvent('element-deselected', {
        detail: { element }
    }),
    CanvasElementMoved: (element, mouseevent) => new CustomEvent('element-moved', {
        detail: { element, mouseevent }
    }),
    CanvasElementTransformed: (element, transformation) => new CustomEvent('element-transform', {
        detail: { element, transformation }
    }),
    CanvasElementCreated: (element) => new CustomEvent('element-created', {
        detail: { element }
    }),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FudmFzRXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9ldmVudHMvQ2FudmFzRXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCQSxlQUFlO0lBQ2Isb0JBQW9CLEVBQUUsQ0FBQyxPQUFzQixFQUFFLFVBQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFxRCxpQkFBaUIsRUFBRTtRQUMvSixNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFO0tBQ2hDLENBQUM7SUFFRixxQkFBcUIsRUFBRSxDQUFDLE9BQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUE2QixrQkFBa0IsRUFBRTtRQUNqSCxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUU7S0FDcEIsQ0FBQztJQUVGLHVCQUF1QixFQUFFLENBQUMsT0FBc0IsRUFBRSxFQUFFLENBQUMsSUFBSSxXQUFXLENBQTZCLG9CQUFvQixFQUFFO1FBQ3JILE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRTtLQUNwQixDQUFDO0lBRUYsa0JBQWtCLEVBQUUsQ0FBQyxPQUFzQixFQUFFLFVBQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFxRCxlQUFlLEVBQUU7UUFDM0osTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRTtLQUNoQyxDQUFDO0lBRUYsd0JBQXdCLEVBQUUsQ0FBQyxPQUFzQixFQUFFLGNBQW1DLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFrRSxtQkFBbUIsRUFBRTtRQUMvTCxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFO0tBQ3BDLENBQUM7SUFFRixvQkFBb0IsRUFBRSxDQUFDLE9BQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUE2QixpQkFBaUIsRUFBRTtRQUMvRyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUU7S0FDcEIsQ0FBQztDQUNILENBQUEifQ==

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/utils/AnchorConditions.js":
/*!***************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/utils/AnchorConditions.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const fixEventOffset = (event, gridPixelMerge) => {
    return {
        offsetX: event.offsetX + gridPixelMerge - (event.offsetX % gridPixelMerge),
        offsetY: event.offsetY + gridPixelMerge - (event.offsetY % gridPixelMerge)
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    topLeft: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x && cell.x < offsetX + gripMargin && offsetY - gripMargin < cell.y && cell.y < offsetY + gripMargin;
            });
        });
    },
    topRight: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x + cell.width && cell.x + cell.width < offsetX + gripMargin && offsetY - gripMargin < cell.y && cell.y < offsetY + gripMargin;
            });
        });
    },
    bottomLeft: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x && cell.x < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height && cell.y + cell.height < offsetY + gripMargin;
            });
        });
    },
    bottomRight: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x + cell.width && cell.x + cell.width < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height && cell.y + cell.height < offsetY + gripMargin;
            });
        });
    },
    left: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x && cell.x < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height / 2 && cell.y + cell.height / 2 < offsetY + gripMargin;
            });
        });
    },
    right: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x + cell.width && cell.x + cell.width < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height / 2 && cell.y + cell.height / 2 < offsetY + gripMargin;
            });
        });
    },
    bottom: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x + cell.width / 2 && cell.x + cell.width / 2 < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height && cell.y + cell.height < offsetY + gripMargin;
            });
        });
    },
    top: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x + cell.width / 2 && cell.x + cell.width / 2 < offsetX + gripMargin && offsetY - gripMargin < cell.y;
            });
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5jaG9yQ29uZGl0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdXRpbHMvQW5jaG9yQ29uZGl0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLGNBQWMsR0FBRyxDQUFDLEtBQWlCLEVBQUUsY0FBc0IsRUFHL0QsRUFBRTtJQUNGLE9BQU87UUFDTCxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sR0FBRyxjQUFjLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztRQUMxRSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sR0FBRyxjQUFjLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztLQUMzRSxDQUFDO0FBQ0osQ0FBQyxDQUFBO0FBRUQsZUFBZTtJQUNiLE9BQU8sRUFBRSxDQUFDLElBQWdCLEVBQUUsVUFBa0IsRUFBRSxLQUFpQixFQUFFLGNBQXNCLEVBQUUsRUFBRTtRQUMzRixNQUFNLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxHQUFHLGNBQWMsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFakUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDckIsT0FBTyxJQUFJLElBQUksT0FBTyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLFVBQVUsSUFBSSxPQUFPLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsVUFBVSxDQUFBO1lBQ2pKLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsUUFBUSxFQUFFLENBQUMsSUFBZ0IsRUFB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

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/utils/ResizeFunctions.js":
/*!**************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/utils/ResizeFunctions.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../canvas_elements/Line.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Line.js");

const ResizeFunctions = {
    topLeft: (state, event) => {
        ResizeFunctions.top(state, event);
        ResizeFunctions.left(state, event);
    },
    topRight: (state, event) => {
        ResizeFunctions.top(state, event);
        ResizeFunctions.right(state, event);
    },
    bottomLeft: (state, event) => {
        ResizeFunctions.bottom(state, event);
        ResizeFunctions.left(state, event);
    },
    bottomRight: (state, event) => {
        ResizeFunctions.bottom(state, event);
        ResizeFunctions.right(state, event);
    },
    left: (state, event) => {
        if (state.selectedElement) {
            state.selectedElement.width = state.selectedElement.width + state.selectedElement.x - event.offsetX;
            state.selectedElement.x = event.offsetX;
        }
    },
    right: (state, event) => {
        if (state.selectedElement) {
            state.selectedElement.width = event.offsetX - state.selectedElement.x;
            if (state.selectedElement instanceof _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                state.selectedElement.endX = event.offsetX;
            }
        }
    },
    bottom: (state, event) => {
        if (state.selectedElement) {
            state.selectedElement.height = event.offsetY - state.selectedElement.y;
            if (state.selectedElement instanceof _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                state.selectedElement.endY = event.offsetY;
            }
        }
    },
    top: (state, event) => {
        if (state.selectedElement) {
            state.selectedElement.height = state.selectedElement.height + state.selectedElement.y - event.offsetY;
            state.selectedElement.y = event.offsetY;
        }
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResizeFunctions);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzaXplRnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi91dGlscy9SZXNpemVGdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxJQUFJLE1BQU0seUJBQXlCLENBQUM7QUFFM0MsTUFBTSxlQUFlLEdBQUc7SUFDdEIsT0FBTyxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUMzQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsUUFBUSxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUM1QyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsVUFBVSxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUM5QyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsV0FBVyxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUMvQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsSUFBSSxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUN4QyxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDekIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNwRyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUNELEtBQUssRUFBRSxDQUFDLEtBQVksRUFBRSxLQUFpQixFQUFFLEVBQUU7UUFDekMsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdEUsSUFBSSxLQUFLLENBQUMsZUFBZSxZQUFZLElBQUksRUFBRTtnQkFDekMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUM1QztTQUNGO0lBQ0gsQ0FBQztJQUNELE1BQU0sRUFBRSxDQUFDLEtBQVksRUFBRSxLQUFpQixFQUFFLEVBQUU7UUFDMUMsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdkUsSUFBSSxLQUFLLENBQUMsZUFBZSxZQUFZLElBQUksRUFBRTtnQkFDekMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUM1QztTQUNGO0lBQ0gsQ0FBQztJQUNELEdBQUcsRUFBRSxDQUFDLEtBQVksRUFBRSxLQUFpQixFQUFFLEVBQUU7UUFDdkMsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDdEcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUN6QztJQUNILENBQUM7Q0FDRixDQUFBO0FBRUQsZUFBZSxlQUFlLENBQUMifQ==

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/utils/kebabize.js":
/*!*******************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/utils/kebabize.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ViYWJpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3V0aWxzL2tlYmFiaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQSJ9

/***/ }),

/***/ "./resources/scss/not-found.scss":
/*!***************************************!*\
  !*** ./resources/scss/not-found.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/index.scss":
/*!***********************************!*\
  !*** ./resources/scss/index.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/global.scss":
/*!************************************!*\
  !*** ./resources/scss/global.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/login.scss":
/*!***********************************!*\
  !*** ./resources/scss/login.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/drawing.scss":
/*!*************************************!*\
  !*** ./resources/scss/drawing.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/profile.scss":
/*!*************************************!*\
  !*** ./resources/scss/profile.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/canvas": 0,
/******/ 			"css/global": 0,
/******/ 			"css/profile": 0,
/******/ 			"css/drawing": 0,
/******/ 			"css/login": 0,
/******/ 			"css/index": 0,
/******/ 			"css/not-found": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/global","css/profile","css/drawing","css/login","css/index","css/not-found"], () => (__webpack_require__("./resources/js/canvas.js")))
/******/ 	__webpack_require__.O(undefined, ["css/global","css/profile","css/drawing","css/login","css/index","css/not-found"], () => (__webpack_require__("./resources/scss/index.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/global","css/profile","css/drawing","css/login","css/index","css/not-found"], () => (__webpack_require__("./resources/scss/global.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/global","css/profile","css/drawing","css/login","css/index","css/not-found"], () => (__webpack_require__("./resources/scss/login.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/global","css/profile","css/drawing","css/login","css/index","css/not-found"], () => (__webpack_require__("./resources/scss/drawing.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/global","css/profile","css/drawing","css/login","css/index","css/not-found"], () => (__webpack_require__("./resources/scss/profile.scss")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/global","css/profile","css/drawing","css/login","css/index","css/not-found"], () => (__webpack_require__("./resources/scss/not-found.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;