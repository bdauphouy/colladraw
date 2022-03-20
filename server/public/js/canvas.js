/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./resources/js/canvas.js":
/*!********************************!*\
  !*** ./resources/js/canvas.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var colladraw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! colladraw */ "./node_modules/colladraw/build/module/index.js");
/* harmony import */ var _websocket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./websocket */ "./resources/js/websocket.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    var _this = this;

    _classCallCheck(this, HandleCanvas);

    this.tools = {
      pen: colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.PENCIL,
      rubber: colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.ERASER,
      rectangle: colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.RECTANGLE,
      ellipse: colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.ELLIPSE,
      triangle: colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.TRIANGLE,
      line: colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.LINE,
      text: colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.TEXT,
      background: null
    };
    this.colors = ['#f3b1af', '#f6d09a', '#fafd90', '#b0d9a0', '#9fd7de', '#a6c3fa', '#e4acec', '#bbb2f9', '#c1c1c1', '#111111'];
    this.fonts = ['Times New Roman', 'Impact', 'Comic Sans MS'];
    this.headerIcons = _toConsumableArray(document.querySelectorAll('.header-icons > li'));
    this.toggleIcons = _toConsumableArray(document.querySelectorAll('.toggle-icon'));
    this.toolsElements = _toConsumableArray(document.querySelectorAll('.tools > li'));
    this.colorsElements = _toConsumableArray(document.querySelectorAll('.colors > li'));
    this.fontsElements = _toConsumableArray(document.querySelectorAll('.fonts > li'));
    this.fontsPanel = document.querySelector('.fonts');
    this.savingText = document.querySelector('#saving-text');
    this.canvas = document.querySelector('#canvas');
    this.cd = new colladraw__WEBPACK_IMPORTED_MODULE_1__["default"](this.canvas);
    this.currentColor = null;
    this.currentTool = null;
    this.currentFont = this.fonts[0];
    this.websocket = new _websocket__WEBPACK_IMPORTED_MODULE_2__["default"](this.cd, this.drawingId, this.username);
    this.handle();
    setInterval(function () {
      return _this.saveDrawing(_this.cd);
    }, 10000);
    if (window.drawingSaved) this.cd.load(window.drawingSaved);
  }

  _createClass(HandleCanvas, [{
    key: "drawingId",
    get: function get() {
      return location.pathname.split('/')[2];
    }
  }, {
    key: "username",
    get: function get() {
      var _window$username;

      return (_window$username = window.username) !== null && _window$username !== void 0 ? _window$username : new URLSearchParams(location.search).get('name');
    }
  }, {
    key: "saveDrawing",
    value: function () {
      var _saveDrawing = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(cd) {
        var _this2 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.savingText.innerText = 'Saving...';
                _context.next = 3;
                return fetch("/api/drawings/".concat(this.drawingId, "/save"), {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    drawing: cd.toJSON()
                  })
                });

              case 3:
                this.savingText.innerText = 'Saved.';
                setTimeout(function () {
                  _this2.savingText.innerText = '';
                }, 2000);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveDrawing(_x) {
        return _saveDrawing.apply(this, arguments);
      }

      return saveDrawing;
    }()
  }, {
    key: "handle",
    value: function handle() {
      this.websocket.init(this.canvas);
      this.handleHeaderIcons();
      this.handlePanels();
      this.handleSave();
      this.handleWindowResize();
    }
  }, {
    key: "handleWindowResize",
    value: function handleWindowResize() {
      var _this3 = this;

      var resizeCanvas = function resizeCanvas() {
        _this3.canvas.width = window.innerWidth;
        _this3.canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', resizeCanvas);
    }
  }, {
    key: "handleHeaderIcons",
    value: function handleHeaderIcons() {
      var _this4 = this;

      var profileButton = document.querySelector('#profile');
      var downloadButton = document.querySelector('#download');
      var logoutButton = document.querySelector('#logout');
      var shareButton = document.querySelector('#share');
      var saveButton = document.querySelector('#save');
      var deleteButton = document.querySelector('#delete');

      var share = function share(e) {
        if (!['DIV', 'H3', 'INPUT'].includes(e.target.tagName)) {
          shareButton.lastElementChild.classList.toggle('show');
        }

        var urlToShare = "".concat(location.origin, "/?ask=true&session=").concat(location.href.split('/').at(-1));
        shareButton.lastElementChild.lastElementChild.value = urlToShare;
      };

      var logout = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(e) {
          var csrfToken, res;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                  e.preventDefault();
                  _context2.next = 4;
                  return fetch('/logout', {
                    method: 'POST',
                    headers: {
                      'X-CSRF-TOKEN': csrfToken
                    }
                  });

                case 4:
                  res = _context2.sent;

                  if (res.ok) {
                    location.pathname = '/';
                  }

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function logout(_x2) {
          return _ref.apply(this, arguments);
        };
      }();

      var toggleProfile = function toggleProfile() {
        downloadButton.lastElementChild.classList.remove('show');
        profileButton.lastElementChild.classList.toggle('show');
      };

      var toggleDownload = function toggleDownload() {
        profileButton.lastElementChild.classList.remove('show');
        downloadButton.lastElementChild.classList.toggle('show');
      };

      saveButton.addEventListener('click', function () {
        return _this4.saveDrawing(_this4.cd);
      });
      shareButton.addEventListener('click', share);
      downloadButton.addEventListener('click', toggleDownload);

      if (profileButton) {
        profileButton.addEventListener('click', toggleProfile);
      }

      if (logoutButton) {
        logoutButton.addEventListener('click', logout);
      }
    }
  }, {
    key: "handleSave",
    value: function handleSave() {
      var _this5 = this;

      var pdfButton = document.querySelector('#save-pdf');
      var pngButton = document.querySelector('#save-png');
      var uuid = window.location.pathname.split('/').at(-1);
      var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

      var download = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3(format) {
          var res, blob, a;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return fetch("/api/drawings/".concat(uuid, "/export?format=").concat(format), {
                    method: 'POST',
                    body: JSON.stringify({
                      image: _this5.cd.toDataURL()
                    }),
                    headers: {
                      'X-CSRF-TOKEN': csrfToken,
                      'Content-Type': 'application/json'
                    }
                  });

                case 2:
                  res = _context3.sent;
                  _context3.next = 5;
                  return res.blob();

                case 5:
                  blob = _context3.sent;
                  a = document.createElement('a');
                  a.href = URL.createObjectURL(blob);
                  a.download = uuid.split('-')[0];
                  a.click();

                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function download(_x3) {
          return _ref2.apply(this, arguments);
        };
      }();

      pdfButton.addEventListener('click', function () {
        return download('pdf');
      });
      pngButton.addEventListener('click', function () {
        return download('png');
      });
    }
  }, {
    key: "handlePanels",
    value: function handlePanels() {
      var _this6 = this;

      var colorPicker = document.querySelector('#color-picker');
      var undoButton = document.querySelector('#undo');
      var redoButton = document.querySelector('#redo');

      var changeColor = function changeColor(e, type) {
        var selectedShape = _this6.cd.elements.find(function (el) {
          return el.selected;
        });

        if (type === 'picker') {
          _this6.currentColor = colorPicker.value;
        } else {
          var index = Number(e.target.className.at(-1)) - 1;
          _this6.currentColor = _this6.colors[index];
        }

        if (selectedShape) {
          selectedShape.fillColor = _this6.currentColor;

          _this6.cd.draw();
        }
      };

      var changeTool = function changeTool(e) {
        _this6.toolsElements.forEach(function (toolElement) {
          toolElement.classList.remove('active');
        });

        _this6.fontsPanel.classList.remove('show');

        var toolElement = e.target;
        toolElement.classList.add('active');
        _this6.currentTool = _this6.tools[toolElement.id];

        _this6.cd.changeToolType(_this6.currentTool);
      };

      var changeFont = function changeFont(e) {
        _this6.fontsElements.forEach(function (fontElement) {
          fontElement.classList.remove('active');
        });

        var fontButton = e.target.firstElementChild;
        fontButton.parentElement.classList.add('active');
        _this6.currentFont = fontButton.innerText;

        _this6.cd.changeFont("30px ".concat(_this6.currentFont));

        _this6.cd.draw();
      };

      var toggleFonts = function toggleFonts(e) {
        _this6.fontsPanel.classList.toggle('show');
      };

      var togglePanel = function togglePanel(e) {
        e.target.parentElement.parentElement.classList.toggle('show');

        _this6.fontsPanel.classList.remove('show');
      };

      var undo = function undo() {
        _this6.cd.undo();
      };

      var redo = function redo() {
        _this6.cd.redo();
      };

      this.toggleIcons.forEach(function (toggleIcon) {
        toggleIcon.addEventListener('click', togglePanel);
      });
      colorPicker.addEventListener('input', function (e) {
        return changeColor(e, 'picker');
      });
      this.colorsElements.forEach(function (colorElement) {
        colorElement.addEventListener('click', function (e) {
          return changeColor(e, 'palette');
        });
      });
      this.toolsElements.slice(0, -2).forEach(function (toolElement) {
        toolElement.addEventListener('click', changeTool);
      });
      this.fontsElements.forEach(function (fontElement) {
        fontElement.addEventListener('click', changeFont);
      });
      document.querySelector('#text').addEventListener('click', toggleFonts);
      undoButton.addEventListener('click', undo);
      redoButton.addEventListener('click', redo);
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

"use strict";
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Websocket = /*#__PURE__*/function () {
  function Websocket(cd, drawingId, username) {
    _classCallCheck(this, Websocket);

    _defineProperty(this, "_events", []);

    this.cd = cd;
    this.drawingId = drawingId;
    this.username = username;
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

      var socket = io("http://localhost:8001");
      socket.on("connect", function () {
        console.info("Websocket connected");
        socket.emit("join-drawing", {
          room: "drawing-".concat(_this.drawingId),
          username: _this.username
        });
        window.addEventListener('beforeunload', function (e) {
          socket.emit("leave-drawing", {
            room: "drawing-".concat(_this.drawingId),
            username: _this.username
          });
        });
        socket.on('user-joined', function (_ref) {
          var username = _ref.username;

          var userJoinedEvent = _this._events.find(function (event) {
            return event.name === 'user-joined';
          });

          if (userJoinedEvent) {
            userJoinedEvent.callback(username);
          }
        });
        socket.on('user-left', function (_ref2) {
          var username = _ref2.username;

          var userLeftEvent = _this._events.find(function (event) {
            return event.name === 'user-left';
          });

          if (userLeftEvent) {
            userLeftEvent.callback(username);
          }
        });
        socket.on("update-drawing", function (_ref3) {
          var emitterId = _ref3.emitterId,
              data = _objectWithoutProperties(_ref3, _excluded);

          if (emitterId !== clientId) {
            _this.cd.load(data);
          }
        });

        var send = function send() {
          socket.emit("update-drawing", {
            data: _this.cd.toJSON(),
            emitterId: clientId,
            room: "drawing-".concat(_this.drawingId)
          });
        };

        canvas.addEventListener("element-created", send);
        canvas.addEventListener("element-moved", send);
        canvas.addEventListener("element-transform", send);
      });
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      this._events.push({
        event: event,
        callback: callback
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

"use strict";
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

"use strict";
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
        canvas.addEventListener('anchor-point-hovered', (e) => {
            if (e.detail.anchorPoint === 'top') {
                document.body.style.cursor = 'ns-resize';
            }
            else if (e.detail.anchorPoint === 'bottom') {
                document.body.style.cursor = 'ns-resize';
            }
            else if (e.detail.anchorPoint === 'left') {
                document.body.style.cursor = 'ew-resize';
            }
            else if (e.detail.anchorPoint === 'right') {
                document.body.style.cursor = 'ew-resize';
            }
            else if (e.detail.anchorPoint === 'topLeft') {
                document.body.style.cursor = 'nwse-resize';
            }
            else if (e.detail.anchorPoint === 'topRight') {
                document.body.style.cursor = 'nesw-resize';
            }
            else if (e.detail.anchorPoint === 'bottomLeft') {
                document.body.style.cursor = 'nesw-resize';
            }
            else if (e.detail.anchorPoint === 'bottomRight') {
                document.body.style.cursor = 'nwse-resize';
            }
            else {
                document.body.style.cursor = 'default';
            }
        });
        canvas.addEventListener('anchor-point-leave', () => {
            document.body.style.cursor = 'default';
        });
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
        if (this.state.selectedElement) {
            let anchorFound = false;
            Object.entries(_utils_AnchorConditions_js__WEBPACK_IMPORTED_MODULE_5__["default"]).forEach(([anchorConditionName, anchorCondition]) => {
                if (!anchorFound && !(this.state.selectedElement instanceof _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__["default"]) && anchorCondition(this.grid, 20, event, this.gridPixelMerge)) {
                    this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasAnchorPointHovered(anchorConditionName, event));
                    anchorFound = true;
                }
            });
            if (!anchorFound) {
                this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasAnchorPointLeave(event));
            }
        }
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
    changeFont(font) {
        this.state.variables.font = font;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFkcmF3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9Db2xsYWRyYXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDNUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxTQUFTLE1BQU0sNkJBQTZCLENBQUM7QUFFcEQsT0FBTyxPQUFPLE1BQU0sMkJBQTJCLENBQUM7QUFDaEQsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFFbEQsT0FBTyxnQkFBZ0IsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLFFBQVEsTUFBTSxrQkFBa0IsQ0FBQztBQUV4QyxPQUFPLE9BQU8sTUFBTSwyQkFBMkIsQ0FBQztBQUNoRCxPQUFPLFlBQWtDLE1BQU0sdUJBQXVCLENBQUM7QUFFdkUsT0FBTyxVQUFVLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxJQUFJLE1BQU0sd0JBQXdCLENBQUM7QUFDMUMsT0FBTyxlQUFlLE1BQU0seUJBQXlCLENBQUM7QUFFdEQsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFTO0lBQzVCLE1BQU0sQ0FHSjtJQUNGLE9BQU8sQ0FBMkI7SUFDbEMsSUFBSSxDQUFhO0lBQ2pCLGNBQWMsR0FBVyxDQUFDLENBQUM7SUFDM0IsVUFBVSxDQUFvQjtJQUM5QixlQUFlLEdBQVcsU0FBUyxDQUFDO0lBQzVCLEtBQUssR0FBVTtRQUNyQixTQUFTLEVBQUUsRUFBRTtRQUNiLE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxFQUFFO1lBQ1IsSUFBSSxFQUFFLEVBQUU7U0FDVDtLQUNGLENBQUM7SUFDTSxhQUFhLEdBQVksS0FBSyxDQUFDO0lBRXZDLFlBQVksTUFBeUIsRUFBRSxpQkFBeUIsQ0FBQztRQUMvRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLHNEQUFzRCxDQUFDO1FBRXpILE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNsQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFFcEMsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNaLE1BQU07WUFDTixRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUM7UUFDRixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUVyQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBRXpCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFdEUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDekQsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxLQUFLLEVBQUU7Z0JBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7YUFDMUM7aUJBQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7Z0JBQzVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7YUFDMUM7aUJBQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxNQUFNLEVBQUU7Z0JBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7YUFDMUM7aUJBQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxPQUFPLEVBQUU7Z0JBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7YUFDMUM7aUJBQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7Z0JBQzdDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7YUFDNUM7aUJBQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxVQUFVLEVBQUU7Z0JBQzlDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7YUFDNUM7aUJBQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxZQUFZLEVBQUU7Z0JBQ2hELFFBQVEsQ0FBQyxJQUFJLENB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

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CanvasText)
/* harmony export */ });
/* harmony import */ var _CanvasElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasElement.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js");

class CanvasText extends _CanvasElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    text;
    font;
    color;
    highlightColor;
    highlighted;
    constructor(text, x, y, font) {
        super(x, y, 0, 0);
        this.text = text;
        this.font = font;
    }
    draw(context) {
        if (this.highlighted) {
            this.highlight(context, false);
        }
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
    highlight(context, redraw = true) {
        context.fillStyle = this.highlightColor;
        context.globalCompositeOperation = 'multiply';
        context.fillRect(this.x, this.y - this.height, this.width, this.height);
        context.globalCompositeOperation = 'source-over';
        if (redraw) {
            this.draw(context);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FudmFzVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FudmFzX2VsZW1lbnRzL0NhbnZhc1RleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFJNUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsYUFBYTtJQUNuRCxJQUFJLENBQVM7SUFDYixJQUFJLENBQVM7SUFDYixLQUFLLENBQVM7SUFDZCxjQUFjLENBQVM7SUFDdkIsV0FBVyxDQUFVO0lBRXJCLFlBQ0UsSUFBWSxFQUNaLENBQVMsRUFDVCxDQUFTLEVBQ1QsSUFBWTtRQUVaLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQWlDO1FBQ3BDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNoQztRQUVELE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN6QixPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFFMUQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUM5QixPQUFPLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztZQUNoQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVuQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoRCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDakIsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUVELFlBQVksQ0FBQyxVQUFzQixFQUFFLGNBQXNCO1FBQ3pELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoQyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFFbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLElBQUksY0FBYyxFQUFFO1lBQ2pELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxJQUFJLGNBQWMsRUFBRTtnQkFDakQsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzthQUN6QjtTQUNGO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FBQyxPQUFpQyxFQUFFLFNBQWtCLElBQUk7UUFDakUsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxVQUFVLENBQUM7UUFDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RSxPQUFPLENBQUMsd0JBQXdCLEdBQUcsYUFBYSxDQUFDO1FBRWpELElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTztZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFzQjtRQUNwQyxNQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FDekIsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLElBQUksQ0FDVixDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGIn0=

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Ellipse.js":
/*!****************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Ellipse.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
        let minI = this.height < 0 ? this.y + this.height : this.y;
        minI -= (minI % gridPixelMerge);
        let minJ = this.width < 0 ? this.x + this.width : this.x;
        minJ -= (minJ % gridPixelMerge);
        let maxI = this.height < 0 ? this.y : this.y + this.height;
        maxI += (gridPixelMerge - (maxI % gridPixelMerge));
        let maxJ = this.width < 0 ? this.x : this.x + this.width;
        maxJ += (gridPixelMerge - (maxJ % gridPixelMerge));
        for (let i = minI; i <= maxI; i += gridPixelMerge) {
            for (let j = minJ; j <= maxJ; j += gridPixelMerge) {
                canvasGrid[i][j] = this;
            }
        }
    }
    draw(context) {
        super.draw(context, () => {
            context.ellipse(Math.abs(this.x + this.width / 2), Math.abs(this.y + this.height / 2), Math.abs(this.width / 2), Math.abs(this.height / 2), 0, 0, 2 * Math.PI);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxsaXBzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FudmFzX2VsZW1lbnRzL0VsbGlwc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBSTVCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBUSxTQUFRLEtBQUs7SUFDeEMsWUFBWSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQzdELEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsWUFBWSxDQUFDLFVBQXNCLEVBQUUsY0FBc0I7UUFDekQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzRCxJQUFJLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUMs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

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Line.js":
/*!*************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Line.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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
        let maxI = this.height > 0 ? Math.max(...this.coordinates.map(coordinate => coordinate[1])) : minI + Math.abs(this.height);
        maxI += (gridPixelMerge - (maxI % gridPixelMerge));
        let maxJ = Math.max(...this.coordinates.map(coordinate => coordinate[0]));
        maxJ += (gridPixelMerge - (maxJ % gridPixelMerge));
        console.log(`(${minJ}, ${minI}), (${maxJ}, ${maxI})`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9seWdvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FudmFzX2VsZW1lbnRzL1BvbHlnb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBSzVCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBUSxTQUFRLEtBQUs7SUFDeEMsV0FBVyxDQUFTO0lBQ3BCLFdBQVcsQ0FBcUI7SUFDeEIsV0FBVyxDQUFhO0lBRWhDLFlBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUFFLFdBQW1CLEVBQUUsV0FBK0I7UUFDbkgsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzdDLE1BQU0sV0FBVyxHQUFlLEVBQUUsQ0FBQztRQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0o7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRUQsWUFBWSxDQUFDLFVBQXNCLEVBQUUsY0FBc0I7UUFDekQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzSCxJQUFJLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFFLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBRW5ELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEtBQUssSUFBSSxPQUFPLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRXRELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxJQUFJLGNBQWMsRUFBRTtZQUNqRCxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsSUFBSSxjQUFjLEVBQUU7Z0JBQ2pELFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDekI7U0FDRjtJQUNILENBQUM7SUFFRCxJQUFJLENBQUMsT0FBaUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFekMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFL0QsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUM5RixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckIsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNqQixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsSUFBSSxDQUFDLFdBQVcsR0FBMkI7WUFDaEYsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBaUI7UUFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUMvRSxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7U0FDdEQ7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNySCxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbkMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN2QyxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Rectangle.js":
/*!******************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Rectangle.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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
    CanvasAnchorPointClicked: (anchorPoint, mouseevent) => new CustomEvent('anchor-point-clicked', {
        detail: { anchorPoint, mouseevent }
    }),
    CanvasAnchorPointHovered: (anchorPoint, mouseevent) => new CustomEvent('anchor-point-hovered', {
        detail: { anchorPoint, mouseevent }
    }),
    CanvasAnchorPointLeave: (mouseevent) => new CustomEvent('anchor-point-leave', {
        detail: { mouseevent }
    }),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FudmFzRXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9ldmVudHMvQ2FudmFzRXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBCQSxlQUFlO0lBQ2Isb0JBQW9CLEVBQUUsQ0FBQyxPQUFzQixFQUFFLFVBQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFxRCxpQkFBaUIsRUFBRTtRQUMvSixNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFO0tBQ2hDLENBQUM7SUFFRixxQkFBcUIsRUFBRSxDQUFDLE9BQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUE2QixrQkFBa0IsRUFBRTtRQUNqSCxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUU7S0FDcEIsQ0FBQztJQUVGLHVCQUF1QixFQUFFLENBQUMsT0FBc0IsRUFBRSxFQUFFLENBQUMsSUFBSSxXQUFXLENBQTZCLG9CQUFvQixFQUFFO1FBQ3JILE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRTtLQUNwQixDQUFDO0lBRUYsa0JBQWtCLEVBQUUsQ0FBQyxPQUFzQixFQUFFLFVBQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFxRCxlQUFlLEVBQUU7UUFDM0osTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRTtLQUNoQyxDQUFDO0lBRUYsd0JBQXdCLEVBQUUsQ0FBQyxPQUFzQixFQUFFLGNBQW1DLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFrRSxtQkFBbUIsRUFBRTtRQUMvTCxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFO0tBQ3BDLENBQUM7SUFFRixvQkFBb0IsRUFBRSxDQUFDLE9BQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUE2QixpQkFBaUIsRUFBRTtRQUMvRyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUU7S0FDcEIsQ0FBQztJQUVGLHdCQUF3QixFQUFFLENBQUMsV0FBd0IsRUFBRSxVQUFzQixFQUFFLEVBQUUsQ0FBQyxJQUFJLFdBQVcsQ0FBdUQsc0JBQXNCLEVBQUU7UUFDNUssTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRTtLQUNwQyxDQUFDO0lBRUYsd0JBQXdCLEVBQUUsQ0FBQyxXQUF3QixFQUFFLFVBQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUF1RCxzQkFBc0IsRUFBRTtRQUM1SyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFO0tBQ3BDLENBQUM7SUFFRixzQkFBc0IsRUFBRSxDQUFDLFVBQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUE2QixvQkFBb0IsRUFBRTtRQUNwSCxNQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUU7S0FDdkIsQ0FBQztDQUNILENBQUEifQ==

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/utils/AnchorConditions.js":
/*!***************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/utils/AnchorConditions.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
        console.log(offsetX, offsetY);
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

"use strict";
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

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/index.scss":
/*!***********************************!*\
  !*** ./resources/scss/index.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/global.scss":
/*!************************************!*\
  !*** ./resources/scss/global.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/login.scss":
/*!***********************************!*\
  !*** ./resources/scss/login.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/drawing.scss":
/*!*************************************!*\
  !*** ./resources/scss/drawing.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/profile.scss":
/*!*************************************!*\
  !*** ./resources/scss/profile.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
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