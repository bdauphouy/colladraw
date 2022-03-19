/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./resources/js/canvas.js ***!
  \********************************/
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// import Colladraw from '../../../client/src/scripts/colladraw/build/module'
// const cd = new Colladraw(document.querySelector('#canvas'))
// import { CanvasElementType } from '../../../client/src/scripts/colladraw/build/module'
var HandleCanvas = /*#__PURE__*/function () {
  function HandleCanvas() {
    _classCallCheck(this, HandleCanvas);

    this.headerIcons = _toConsumableArray(document.querySelectorAll('.header-icons > li'));
    this.toggleIcons = _toConsumableArray(document.querySelectorAll('.toggle-icon'));
    this.toolsElements = _toConsumableArray(document.querySelectorAll('.tools > li'));
    this.currentColor = null;
    this.currentTool = null;
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
      this.toolsElements.forEach(function (toolElement) {
        toolElement.addEventListener('click', changeTool);
      });
    }
  }]);

  return HandleCanvas;
}();

new HandleCanvas();
/******/ })()
;