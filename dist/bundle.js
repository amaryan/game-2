/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  type: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.AUTO,\n  parent: 'content',\n  width: 800,\n  height: 800,\n  transparent: true,\n  localStorageName: 'phaseres6webpack',\n  physics: {\n    default: 'arcade',\n    arcade: {\n      gravity: {\n        y: 150\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scenes_Boot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/Boot */ \"./src/scenes/Boot.js\");\n/* harmony import */ var _scenes_Splash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/Splash */ \"./src/scenes/Splash.js\");\n/* harmony import */ var _scenes_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/Game */ \"./src/scenes/Game.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\nvar gameConfig = Object.assign(_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n  scene: [_scenes_Boot__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _scenes_Splash__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _scenes_Game__WEBPACK_IMPORTED_MODULE_3__[\"default\"]]\n});\n\nvar Game =\n/*#__PURE__*/\nfunction (_Phaser$Game) {\n  _inherits(Game, _Phaser$Game);\n\n  function Game() {\n    _classCallCheck(this, Game);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Game).call(this, gameConfig));\n  }\n\n  return Game;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Game);\n\nwindow.game = new Game();\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/scenes/Boot.js":
/*!****************************!*\
  !*** ./src/scenes/Boot.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webfontloader */ \"./node_modules/webfontloader/webfontloader.js\");\n/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webfontloader__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'BootScene'\n    }));\n  }\n\n  _createClass(_default, [{\n    key: \"preload\",\n    value: function preload() {\n      this.fontsReady = false;\n      this.fontsLoaded = this.fontsLoaded.bind(this);\n      this.add.text(100, 100, 'loading fonts...'); // this.load.image('loaderBg', './assets/images/loader-bg.png')\n      //this.load.image('loaderBar', './assets/images/loader-bar.png')\n      // this.load.json('fontJSON','../../assets/font.json');\n      //Con esto importamos la fuente que esta ya creada\n      // const fontJSON = this.cache.json.get('fontJSON');\n      // this.cache.bitmapFont.add('pixel',Phaser.GameObjects.RetroFont.Parse(this,fontJSON));\n      // this.scene.start('Menu');\n\n      webfontloader__WEBPACK_IMPORTED_MODULE_1___default.a.load({\n        google: {\n          families: ['Bangers', 'Fredoka One']\n        },\n        active: this.fontsLoaded\n      });\n    }\n  }, {\n    key: \"update\",\n    value: function update() {\n      if (this.fontsReady) {\n        this.scene.start('SplashScene');\n      }\n    }\n  }, {\n    key: \"fontsLoaded\",\n    value: function fontsLoaded() {\n      this.fontsReady = true;\n    }\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./src/scenes/Boot.js?");

/***/ }),

/***/ "./src/scenes/Game.js":
/*!****************************!*\
  !*** ./src/scenes/Game.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _sprites_Character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sprites/Character */ \"./src/sprites/Character.js\");\n/* harmony import */ var _sprites_Texts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sprites/Texts */ \"./src/sprites/Texts.js\");\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n/* globals __DEV__ */\n\n/* globals __DEV__ */\n\n\n\nvar mouseInput;\nvar giraffeTween;\nvar alienTween;\nvar firstY = 0;\nvar firstX = 0;\nvar position = false;\nvar text;\nvar textTime;\nvar timedEvent;\nvar finalText;\nvar bear;\nvar monkey;\nvar crocodile;\nvar alien;\nvar giraffe;\nvar moose;\nvar button1;\nvar downloadText;\nvar titleText;\nvar heart1;\nvar heart2;\nvar heart3;\nvar alienTween;\nvar alienLife = 3;\nvar byeCards;\nvar spotlight;\nvar dog, frog, gorilla;\n\nvar GameScene =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(GameScene, _Phaser$Scene);\n\n  function GameScene() {\n    _classCallCheck(this, GameScene);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(GameScene).call(this, {\n      key: 'GameScene'\n    }));\n  }\n\n  _createClass(GameScene, [{\n    key: \"init\",\n    value: function init() {}\n  }, {\n    key: \"preload\",\n    value: function preload() {}\n  }, {\n    key: \"create\",\n    value: function create() {\n      //El fondo y el audio\n      var audio = this.sound.add('backAudio', {\n        loop: true\n      }); //Bajamos el volumen del audio e iniciamos\n\n      audio.volume = audio.volume - 0.9;\n      audio.play(); //Recogemos las acciones de raton en la variable\n\n      mouseInput = this.input; //Fondo\n\n      this.add.image(400, 300, 'background'); //Los diferentes textos que iran apareciendo\n\n      createTexts(this);\n      titleText = this.titleText;\n      finalText = this.finalText;\n      downloadText = this.downloadText; //Creamos los personajes\n\n      createChars(this); //Funcion donde arrastramos el oso y cambiamos y controlamos posicion\n\n      dragBear(); //Aqui tenemos el temporizador de 7 segundos\n\n      timedEvent = this.time.addEvent({\n        delay: 7000,\n        callback: startBattle,\n        callbackScope: this\n      }); //Creamos este overlay para que se vea una capa transparente que usaremos para dar efecto tutorial al principio del juego\n\n      var rt = this.add.renderTexture(0, 0, 800, 800);\n      tutorialMask(this, rt);\n      tweensOutBattle(this, rt); //Aqui añadimos un timeline que son varios tweens encadenados y realizados en orden de instancia\n\n      giraffeTween = this.tweens.createTimeline();\n      alienTween = this.tweens.createTimeline(); //En este metodo estan definidos los timeline\n\n      defineTweenLine(this);\n    }\n  }]);\n\n  return GameScene;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);\n\nfunction tutorialMask(scenes, rt) {\n  //Rellenamos este overlay con color y la transaparencia\n  rt.fill(0x000000, 0.5); //Esto será el circulo que hara de foco al oso \n\n  spotlight = scenes.make.sprite({\n    x: 80,\n    y: 700,\n    key: \"circle\",\n    add: false\n  }); //Creamos la mascara \n\n  var mask = rt.createBitmapMask(spotlight);\n  mask.invertAlpha = true;\n  rt.setMask(mask);\n} //Funcion que indica lo que sucede en la batalla\n\n\nfunction startBattle() {\n  //Cambiamos el contenido del texto\n  this.text.setText('Click to start!');\n  this.textTime.destroy(); //Si el usuario no movio la ficha se coloca sola\n\n  bear.y = 500;\n  bear.x = 400; //Cuando el usuario haga click se inicia la partida\n\n  this.input.on('pointerdown', function (pointer) {\n    //Quitamos el texto cuando el usuario da click en cualquier lado\n    this.text.setText(''); //Animaciones dentro de la batalla\n\n    byeCards = this.tweens.add({\n      targets: [gorilla, dog, frog],\n      //Animacion de salida de juego de los animales no utilizados\n      duration: 1000,\n      y: 1000,\n      rotation: 0.4,\n      onComplete: function onComplete() {\n        gorilla.destroy();\n        dog.destroy();\n        frog.destroy();\n      }\n    });\n    this.tweens.add({\n      targets: bear,\n      //Animacion del oso atacando hacia la posicion del alien\n      y: 300,\n      duration: 500,\n      onUpdateCallback: killAlien,\n      callbackScope: this.scene,\n      onComplete: function onComplete() {\n        alien.setAlpha(0.8);\n        heart1.destroy(); //hit.play()\n      },\n      ease: function ease(t) {\n        return Math.pow(Math.sin(t * 3), 3);\n      },\n      delay: 1000,\n      repeat: 0\n    });\n    this.tweens.add({\n      targets: monkey,\n      //Animacion del mono atacando hacia la posicion del alien\n      y: 300,\n      x: monkey.x - 150,\n      duration: 500,\n      onStart: killAlien,\n      onComplete: function onComplete() {\n        alien.setAlpha(0.5);\n        heart2.destroy(); //hit.play()\n      },\n      ease: function ease(t) {\n        return Math.pow(Math.sin(t * 3), 3);\n      },\n      delay: 1600,\n      repeat: 0\n    });\n    this.tweens.add({\n      targets: crocodile,\n      //Animacion del cocodrilo atacando hacia la posicion del alien\n      y: 300,\n      x: crocodile.x + 150,\n      duration: 400,\n      onStart: function onStart() {\n        return heart3.destroy();\n      },\n      ease: function ease(t) {\n        return Math.pow(Math.sin(t * 3), 3);\n      },\n      onComplete: killAlien,\n      delay: 2400,\n      repeat: 0\n    });\n  }, this);\n}\n\nfunction tweensOutBattle(scene, rt) {\n  //Aqui pondremos los diferentes tweens\n  scene.tweens.add({\n    targets: [bear, spotlight],\n    //Animacion del oso y circulo indicando la accion de arrastrar\n    duration: 1000,\n    repeat: 1,\n    x: 400,\n    y: 500,\n    yoyo: true,\n    ease: 'Sine.easeInOut',\n    onComplete: function onComplete() {\n      scene.text.setColor('#641E16');\n      scene.textTime.setText('The battle starts in 5 seconds');\n      rt.destroy();\n    }\n  });\n  scene.tweens.add({\n    targets: [alien, heart1, heart2, heart3],\n    //Movimiento de izquierda a derecha del alien con los corazones\n    duration: 800,\n    x: '500',\n    repeat: -1,\n    yoyo: true,\n    ease: 'Sine.easeInOut',\n    delay: function delay(i, total, target) {\n      return i * 100;\n    }\n  });\n  scene.tweens.add(_defineProperty({\n    targets: [dog, frog, gorilla, bear, crocodile, monkey, spotlight],\n    //Movimiento de los animales haciendo una pequeña rotacion\n    duration: 1000,\n    repeat: -1,\n    yoyo: true,\n    rotation: 0.4,\n    delay: 500,\n    ease: 'Sine.easeInOut'\n  }, \"delay\", function delay(i, total, target) {\n    return i * 100;\n  }));\n}\n\nfunction dragBear() {\n  //Damos al oso la posibilidad de que el usuario lo arrastre\n  bear.setInteractive({\n    draggable: true\n  }); //Funcion que indica lo que pasara cuando se arrastre al oso  \n\n  bear.on('drag', function (pointer, gameObject, dragX, dragY) {\n    //Arrastro dependiendo de la posicion del raton\n    bear.x = mouseInput.x;\n    bear.y = mouseInput.y; //controlo que no se salga sus dos posibles casillas\n\n    if (bear.y < 650 || bear.x > 150) {\n      bear.y = 500;\n      bear.x = 400;\n    } else {\n      bear.y = 700;\n      bear.x = 80;\n    }\n  });\n}\n\nfunction killAlien() {\n  console.log(alien.life);\n\n  if (alienLife > 0) {\n    alienLife--;\n    alienTween.play();\n    console.log('La vida del alien es de: ' + alienLife);\n  }\n\n  if (alienLife == 0) {\n    giraffeTween.play();\n  }\n}\n\nfunction finalScreen(scene) {\n  //Eliminamos los objetos que no van a ser usados mas\n  bear.destroy();\n  crocodile.destroy();\n  monkey.destroy();\n  alien.destroy();\n  scene.titleText.setText('SAFARY ATTACK');\n  scene.finalText.setText('VICTORY!!!').setVisible(true);\n  scene.downloadText.setVisible(true);\n  button1.visible = true;\n  giraffe.rotation = +0.5;\n  moose.rotation = -0.5;\n  giraffe.setVisible(true);\n  moose.setVisible(true);\n  console.log(this);\n}\n\nfunction defineTweenLine(scene) {\n  alienTween.add({\n    targets: alien,\n    //Retroceso del alien al ser \"golpeado\"\n    duration: 300,\n    y: alien.y - 40,\n    yoyo: true,\n    delay: 900,\n    repeat: 2,\n    ease: 'Power1'\n  });\n  giraffeTween.add({\n    targets: alien,\n    //Animacion de \"caida\" del alien al morir\n    duration: 1000,\n    angle: 360,\n    y: 2000,\n    completeDelay: 500\n  });\n  giraffeTween.add({\n    targets: [crocodile, bear, monkey],\n    //Animacion de celebracion al haber ganado al alien\n    duration: 200,\n    y: monkey.y - 50,\n    yoyo: true,\n    repeat: 3,\n    ease: 'Power0',\n    onComplete: function onComplete() {\n      return finalScreen(scene);\n    }\n  });\n  giraffeTween.add({\n    targets: finalText,\n    //El texto de victoria se desliza hasta su poscion en el centro de la pantalla \n    x: 200,\n    duration: 200,\n    ease: 'Power3'\n  });\n  giraffeTween.add({\n    targets: titleText,\n    //El titulo del juego se desliza desde su posicion al centro de la pantalla\n    delay: 500,\n    x: 190,\n    duration: 400,\n    ease: 'Power3'\n  });\n  giraffeTween.add({\n    targets: [giraffe, moose],\n    // Animacion de los animales de la pantalla final dando botes\n    duration: 1000,\n    y: '180',\n    repeat: -1,\n    yoyo: true,\n    ease: 'Power1'\n  });\n}\n\nfunction createChars(scene) {\n  dog = new _sprites_Character__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    scene: scene,\n    x: 300,\n    y: 690,\n    asset: 'dog'\n  });\n  frog = new _sprites_Character__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    scene: scene,\n    x: 500,\n    y: 700,\n    asset: 'frog'\n  });\n  gorilla = new _sprites_Character__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    scene: scene,\n    x: 700,\n    y: 700,\n    asset: 'gorilla'\n  });\n  bear = new _sprites_Character__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    scene: scene,\n    x: 80,\n    y: 700,\n    asset: 'bear'\n  });\n  crocodile = new _sprites_Character__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    scene: scene,\n    x: 180,\n    y: 500,\n    asset: 'crocodile'\n  });\n  button1 = new _sprites_Character__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    scene: scene,\n    x: 400,\n    y: 500,\n    asset: 'button'\n  });\n  giraffe = new _sprites_Character__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    scene: scene,\n    x: 530,\n    y: 220,\n    asset: 'giraffe'\n  });\n  moose = new _sprites_Character__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    scene: scene,\n    x: 330,\n    y: 220,\n    asset: 'moose'\n  });\n  heart1 = new _sprites_Character__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    scene: scene,\n    x: 350,\n    y: 110,\n    asset: 'heart'\n  });\n  heart2 = new _sprites_Character__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    scene: scene,\n    x: 400,\n    y: 110,\n    asset: 'heart'\n  });\n  heart3 = new _sprites_Character__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    scene: scene,\n    x: 450,\n    y: 110,\n    asset: 'heart'\n  });\n  alien = new _sprites_Character__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    scene: scene,\n    x: 400,\n    y: 200,\n    asset: 'alien'\n  });\n  monkey = new _sprites_Character__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    scene: scene,\n    x: 640,\n    y: 500,\n    asset: 'monkey'\n  });\n  giraffe.setVisible(false);\n  moose.setVisible(false);\n  button1.visible = false;\n  button1.scaleX = 2.5;\n}\n\nfunction createTexts(scene) {\n  scene.text = new _sprites_Texts__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n    scene: scene,\n    x: 250,\n    y: 380,\n    text: 'DRAG THE BEAR TO THE BOARD',\n    style: {\n      font: '30px Fredoka One',\n      fill: '#74A016'\n    }\n  });\n  scene.textTime = new _sprites_Texts__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n    scene: scene,\n    x: 32,\n    y: 32,\n    text: '',\n    style: {\n      font: '30px Fredoka One',\n      fill: '#74A016'\n    }\n  });\n  scene.finalText = new _sprites_Texts__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n    scene: scene,\n    x: 1000,\n    y: 360,\n    text: 'VICTORYYYY',\n    style: {\n      font: '60px Fredoka One',\n      fill: '#C85213'\n    }\n  }).setOrigin(0, 0).setAlign('center');\n  scene.titleText = new _sprites_Texts__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n    scene: scene,\n    x: -1000,\n    y: 290,\n    text: '',\n    style: {\n      font: '60px Fredoka One',\n      fill: '#74A016'\n    }\n  }).setOrigin(0, 0);\n  scene.downloadText = new _sprites_Texts__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n    scene: scene,\n    x: 270,\n    y: 477,\n    text: 'DOWNLOAD HERE',\n    style: {\n      font: '30px Fredoka One',\n      fill: '#DA6134'\n    }\n  }).setVisible(false).setDepth(3);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameScene);\n\n//# sourceURL=webpack:///./src/scenes/Game.js?");

/***/ }),

/***/ "./src/scenes/Splash.js":
/*!******************************!*\
  !*** ./src/scenes/Splash.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'SplashScene'\n    }));\n  }\n\n  _createClass(_default, [{\n    key: \"preload\",\n    value: function preload() {\n      //\n      // load your assets\n      //\n      this.load.image('background', 'src/assets/build_assets/images/bg/backgroundColorFall.png');\n      this.load.image('alien', 'src/assets/build_assets/images/characters/shipBlue_manned.png');\n      this.load.image('bear', 'src/assets/build_assets/images/characters/bear.png');\n      this.load.image('crocodile', 'src/assets/build_assets/images/characters/crocodile.png');\n      this.load.image('dog', 'src/assets/build_assets/images/characters/dog.png');\n      this.load.image('frog', 'src/assets/build_assets/images/characters/frog.png');\n      this.load.image('gorilla', 'src/assets/build_assets/images/characters/gorilla.png');\n      this.load.image('monkey', 'src/assets/build_assets/images/characters/monkey.png');\n      this.load.image('button', 'src/assets/build_assets/images/shapes/button.png');\n      this.load.image('moose', 'src/assets/build_assets/images/characters/moose.png');\n      this.load.image('giraffe', 'src/assets/build_assets/images/characters/giraffe.png');\n      this.load.image('heart', 'src/assets/build_assets/images/shapes/heart.png');\n      this.load.image('circle', 'src/assets/build_assets/images/shapes/circle.png');\n      this.load.audio('backAudio', 'src/assets/build_assets/sounds/bckMusic.mp3');\n    }\n  }, {\n    key: \"create\",\n    value: function create() {\n      this.scene.start('GameScene');\n    }\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./src/scenes/Splash.js?");

/***/ }),

/***/ "./src/sprites/Character.js":
/*!**********************************!*\
  !*** ./src/sprites/Character.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Character; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\n\n\nvar Character =\n/*#__PURE__*/\nfunction (_Phaser$GameObjects$S) {\n  _inherits(Character, _Phaser$GameObjects$S);\n\n  function Character(_ref) {\n    var _this;\n\n    var scene = _ref.scene,\n        x = _ref.x,\n        y = _ref.y,\n        asset = _ref.asset;\n\n    _classCallCheck(this, Character);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Character).call(this, scene, x, y, asset));\n    scene.add.existing(_assertThisInitialized(_assertThisInitialized(_this)));\n    return _this;\n  }\n\n  return Character;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.GameObjects.Sprite);\n\n\n\n//# sourceURL=webpack:///./src/sprites/Character.js?");

/***/ }),

/***/ "./src/sprites/Texts.js":
/*!******************************!*\
  !*** ./src/sprites/Texts.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Texts; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\n\n\nvar Texts =\n/*#__PURE__*/\nfunction (_Phaser$GameObjects$T) {\n  _inherits(Texts, _Phaser$GameObjects$T);\n\n  function Texts(_ref) {\n    var _this;\n\n    var scene = _ref.scene,\n        x = _ref.x,\n        y = _ref.y,\n        text = _ref.text,\n        style = _ref.style;\n\n    _classCallCheck(this, Texts);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Texts).call(this, scene, x, y, text, style));\n    scene.add.existing(_assertThisInitialized(_assertThisInitialized(_this)));\n    return _this;\n  }\n\n  return Texts;\n}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.GameObjects.Text);\n\n\n\n//# sourceURL=webpack:///./src/sprites/Texts.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! C:\\Users\\agora\\Documents\\Clases\\Practicas\\Proyecto Phaser 1\\Salvacion Phaser 3 StoryBoard\\amaryan.github.io-master\\src\\main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ })

/******/ });