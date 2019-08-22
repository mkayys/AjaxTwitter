/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
    toggleUser: (id, method) => {
        return $.ajax({
            url: `/users/${id}/follow`,
            method: method,
            dataType: 'json'
        })
    }
};

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");
/* harmony import */ var _api_util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_api_util__WEBPACK_IMPORTED_MODULE_0__);


class FollowToggle {
    constructor($el) {
        // $el is convention that it is a jQuery object
        this.userId = $el.data('user-id');
        this.followState = $el.data('initial-follow-state');

        this.$el = $el;

        this.handleClick = this.handleClick.bind(this);

        this.render();
        this.$el.on('click', this.handleClick);
    }

    render() {

        if (this.followState === 'unfollowed') {
            this.$el.text('Follow!');
            this.$el.removeProp('disabled');
        } else if (this.followState === "followed") {
            this.$el.text('Unfollow!');
            this.$el.removeProp('disabled');
        } else if (this.followState === "following") {
            this.$el.text('following');
            this.$el.prop('disabled', true)
        } else if (this.followState === "unfollowing") {
            this.$el.text('unfollowing');
            this.$el.prop('disabled', true);
        }
    }

    handleClick(e) {
        // handle something (naming convention for function) is just a callback to pass in the event listener

        e.preventDefault();
        let method = (this.followState === "followed") ? 'DELETE' : 'POST';

        this.followState = (this.followState === "followed") ? "unfollowing" : "following";
        this.render();

        _api_util__WEBPACK_IMPORTED_MODULE_0___default.a.toggleUser(this.userId, method)
            .then(
                // by the code: 200 successful
                (res) => {
                    this.followState = (this.followState === "following") ? "followed" : "unfollowed";
                    this.render();
                })
            .fail(
                // need a status code!
                (err) => {
                    console.log('your code broke son');
                }
        );


    }
}

/* harmony default export */ __webpack_exports__["default"] = (FollowToggle);

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _follow_toggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");


$(() => {
    let $buttons = Array.from($('button.follow-toggle'));
    // wrapped in a jQuery object but then the individual buttons are not jQuery objects

    $buttons.forEach( (button) => {
        new _follow_toggle__WEBPACK_IMPORTED_MODULE_0__["default"]($(button));
    })
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map