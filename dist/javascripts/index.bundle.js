/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./stylesheets/basic.scss":
/*!********************************!*\
  !*** ./stylesheets/basic.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://escena-basica-oculus/./stylesheets/basic.scss?");

/***/ }),

/***/ "./src/pow/index.js":
/*!**************************!*\
  !*** ./src/pow/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _stylesheets_basic_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylesheets/basic.scss */ \"./stylesheets/basic.scss\");\n// import { startVideo } from \"./scripts/startScene\";\r\n\r\n\r\n\r\n// const container = document.getElementById(\"container-menu\");\r\n// const goButton = document.getElementById(\"go-button\");\r\n// const exterior = document.getElementById(\"exterior-button\");\r\n\r\n// export function showContainer() {\r\n//   container.style.display = \"block\";\r\n// }\r\n\r\n// goButton.addEventListener(\"click\", () => {\r\n//   startVideo(\"testfolder/Freire_v02.mp4\");\r\n//   container.style.display = \"none\";\r\n// });\r\n\r\n// exterior.addEventListener(\"click\", () => {\r\n//   window.location.href = getAbsolutePath() + \"/exterior.html\";\r\n// });\r\n\r\nconst butExplore = document.getElementById(\"button-explore\");\r\nbutExplore.addEventListener(\"click\", () => {\r\n  window.location.href = getAbsolutePath() + \"/sphere.html?l=exterior?1\";\r\n});\r\n\r\nfunction getAbsolutePath() {\r\n  var loc = window.location;\r\n  var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf(\"//\"));\r\n  return loc.href.substring(\r\n    0,\r\n    loc.href.length -\r\n      ((loc.pathname + loc.search + loc.hash).length - pathName.length)\r\n  );\r\n}\r\n\n\n//# sourceURL=webpack://escena-basica-oculus/./src/pow/index.js?");

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
/************************************************************************/
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pow/index.js");
/******/ 	
/******/ })()
;