// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2oZg2":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "5c1b77e3b71e74eb";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"h7u1C":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _main = require("./classes/main");
var _mainDefault = parcelHelpers.interopDefault(_main);
const app = (0, _mainDefault.default).getInstance();

},{"./classes/main":"8okI8","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8okI8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// window.requestAnimationFrame(step);
parcelHelpers.export(exports, "Main", ()=>Main);
var _timer = require("./timer");
var _timerDefault = parcelHelpers.interopDefault(_timer);
var _controller = require("./controller");
var _controllerDefault = parcelHelpers.interopDefault(_controller);
var _parameters = require("./parameters");
var _parametersDefault = parcelHelpers.interopDefault(_parameters);
class cppMessageSystem {
    constructor(){}
    static getInstance() {
        if (!cppMessageSystem.instance) cppMessageSystem.instance = new cppMessageSystem();
        return cppMessageSystem.instance;
    }
    static #_ = (()=>{
        this.messageQueue = [];
    })();
    static pushMessage(message) {
        cppMessageSystem.messageQueue.push(message);
    }
    static popMessage() {
        if (cppMessageSystem.messageQueue.length > 0) return cppMessageSystem.messageQueue.pop() || "";
        return "";
    }
    static peekMessage() {
        if (cppMessageSystem.messageQueue.length > 0) return cppMessageSystem.messageQueue[cppMessageSystem.messageQueue.length - 1];
        return "";
    }
}
class Main {
    static #_ = (()=>{
        this.paused = false;
    })();
    static getInstance() {
        if (!Main.instance) Main.instance = new Main();
        return Main.instance;
    }
    // emulate C++'s message system because it's definitely differnt from JS so why not
    static messageProcesser() {
        switch(cppMessageSystem.popMessage()){
            case "pause":
                Main.getInstance().pause();
                break;
            case "unpause":
                Main.getInstance().unPause();
                break;
            case "start":
                Main.getInstance().controller = new (0, _controllerDefault.default)(Main.getInstance().pause, Main.getInstance().unPause);
                break;
            case "paint":
                Main.getInstance().controller.render();
                break;
            case "quit":
                Main.getInstance().done = true;
                break;
            default:
                break;
        }
    }
    pause() {
        Main.paused = true;
    // confirm("pause")
    // cppMessageSystem.pushMessage("pause");
    // throw new Error("Method not implemented.");
    }
    unPause() {
        console.log("unpausing");
        Main.paused = false;
        Main.instance.loop();
        // cppMessageSystem.pushMessage("unpause");
        setTimeout(this.loop, 0);
    }
    constructor(){
        this.done = false;
        this.loop = ()=>{
            while(cppMessageSystem.peekMessage() !== "")Main.messageProcesser();
            if (this.controller.getFastRender() || this.timer.readyForNextFrame()) {
                if (!this.controller.update()) {
                    console.error("Error in controller update");
                    this.done = true;
                }
                cppMessageSystem.pushMessage("paint");
            }
            if (this.done) cppMessageSystem.pushMessage("quit");
            if (!Main.paused) setTimeout(this.loop, 0);
        };
        Main.paused = false;
        this.done = false;
        this.timer = new (0, _timerDefault.default)((0, _parametersDefault.default).framesPerSecond);
        this.controller = new (0, _controllerDefault.default)(this.pause, this.unPause);
        setTimeout(this.loop, 0);
    }
}
exports.default = Main;

},{"./timer":"8gUh9","./controller":"7iUMy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./parameters":"j9VLC"}],"8gUh9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _parameters = require("./parameters");
var _parametersDefault = parcelHelpers.interopDefault(_parameters);
class Timer {
    constructor(fps = (0, _parametersDefault.default).framesPerSecond){
        this.currentTime = 0;
        this.lastTime = 0;
        this.nextTime = 0;
        this.frameTime = 0;
        // this strategy is mostly a byproduct of being a port from C++
        this.perfCountFreq = 1000; //ms in a second 
        this.timeElapsed = 0;
        this.fps = 0;
        if (fps) {
            this.fps = fps;
            this.frameTime = this.perfCountFreq / this.fps;
            this.lastTime = new Date().getTime();
            this.currentTime = this.lastTime;
            this.nextTime = this.currentTime + this.frameTime;
        }
    }
    start() {
        this.nextTime = new Date().getTime() + this.frameTime;
    }
    readyForNextFrame() {
        this.currentTime = new Date().getTime();
        if (this.currentTime > this.nextTime) {
            this.timeElapsed = this.currentTime - this.lastTime;
            this.lastTime = this.currentTime;
            this.nextTime = this.currentTime + this.frameTime;
            return true;
        } else return false;
    }
    getTimeElapsed() {
        this.currentTime = new Date().getTime();
        this.timeElapsed = this.currentTime - this.lastTime;
        this.lastTime = this.currentTime;
        return this.timeElapsed;
    }
}
exports.default = Timer;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./parameters":"j9VLC"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"j9VLC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Parameters {
    static #_ = (()=>{
        /* General parameters */ // static windowWidth = 600;
        // static windowHeight = 450;
        this.windowWidth = 400;
    })();
    static #_1 = (()=>{
        this.windowHeight = 400;
    })();
    static #_2 = (()=>{
        this.framesPerSecond = 120;
    })();
    static #_3 = (()=>{
        /* Used for the neural network */ this.numInputs = 4;
    })();
    static #_4 = (()=>{
        this.numHidden = 1;
    })();
    static #_5 = (()=>{
        this.neuronsPerHiddenLayer = 6 //6
        ;
    })();
    static #_6 = (()=>{
        this.numOutputs = 2;
    })();
    static #_7 = (()=>{
        /* for tweeking the sigmoid function */ this.activationResponse = 1 //1
        ;
    })();
    static #_8 = (()=>{
        /* Bias value */ this.bias = -1;
    })();
    static #_9 = (()=>{
        /* limits how fast the sweepers can turn */ this.maxTurnRate = 0.3;
    })();
    static #_10 = (()=>{
        this.maxSpeed = 2;
    })();
    static #_11 = (()=>{
        /* for controlling the size */ this.sweeperScale = 5;
    })();
    static #_12 = (()=>{
        /* controller parameters */ this.numMines = 40 //40
        ;
    })();
    static #_13 = (()=>{
        this.numSweepers = 30 //30; // 30; // 30;
        ;
    })();
    static #_14 = (()=>{
        /* number of time steps we allow for each generation to live */ this.numTicks = 2000 // 2000;
        ;
    })();
    static #_15 = (()=>{
        /* scaling factor for mines */ this.mineScale = 2;
    })();
    static #_16 = (()=>{
        /* Genetic Algorithim parameters */ this.crossoverRate = 0.7 // 0.7 // 1  is no corss over, 0 evety time
        ;
    })();
    static #_17 = (()=>{
        this.mutationRate = 0.05 // 0.1
        ;
    })();
    static #_18 = (()=>{
        /* the maximum amount the ga may mutate each weight by */ this.maxPerturbation = 0.3 //0.3
        ;
    })();
    static #_19 = (()=>{
        /* used for elitism */ this.numElite = 4 //4
        ;
    })();
    static #_20 = (()=>{
        this.numCopiesElite = 1 //1
        ;
    })();
}
exports.default = Parameters;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7iUMy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _vector2D = require("./vector2d");
var _vector2DDefault = parcelHelpers.interopDefault(_vector2D);
var _geneticAlgorithm = require("./geneticAlgorithm");
var _geneticAlgorithmDefault = parcelHelpers.interopDefault(_geneticAlgorithm);
var _mineSweeper = require("./mineSweeper");
var _mineSweeperDefault = parcelHelpers.interopDefault(_mineSweeper);
var _twoDimensionalMatrix = require("./twoDimensionalMatrix");
var _twoDimensionalMatrixDefault = parcelHelpers.interopDefault(_twoDimensionalMatrix);
var _parameters = require("./parameters");
var _parametersDefault = parcelHelpers.interopDefault(_parameters);
var _random = require("../utils/random");
let carCounter = 0;
const numberSweeperVertices = 16;
const sweeperVertices = new Array(numberSweeperVertices);
sweeperVertices[0] = new (0, _vector2DDefault.default)(-1, -1);
sweeperVertices[1] = new (0, _vector2DDefault.default)(-1, 1);
sweeperVertices[2] = new (0, _vector2DDefault.default)(-0.5, 1);
sweeperVertices[3] = new (0, _vector2DDefault.default)(-0.5, -1);
sweeperVertices[4] = new (0, _vector2DDefault.default)(0.5, -1);
sweeperVertices[5] = new (0, _vector2DDefault.default)(1, -1);
sweeperVertices[6] = new (0, _vector2DDefault.default)(1, 1);
sweeperVertices[7] = new (0, _vector2DDefault.default)(0.5, 1);
sweeperVertices[8] = new (0, _vector2DDefault.default)(-0.5, -0.5);
sweeperVertices[9] = new (0, _vector2DDefault.default)(0.5, -0.5);
sweeperVertices[10] = new (0, _vector2DDefault.default)(-0.5, 0.5);
sweeperVertices[11] = new (0, _vector2DDefault.default)(-0.25, 0.5);
sweeperVertices[12] = new (0, _vector2DDefault.default)(-0.25, 1.75);
sweeperVertices[13] = new (0, _vector2DDefault.default)(0.25, 1.75);
sweeperVertices[14] = new (0, _vector2DDefault.default)(0.25, 0.5);
sweeperVertices[15] = new (0, _vector2DDefault.default)(0.5, 0.5);
const numberMineVertices = 4;
const mine = new Array(numberMineVertices);
mine[0] = new (0, _vector2DDefault.default)(-1, -1);
mine[1] = new (0, _vector2DDefault.default)(-1, 1);
mine[2] = new (0, _vector2DDefault.default)(1, 1);
mine[3] = new (0, _vector2DDefault.default)(1, -1);
class Controller {
    constructor(pause, unPause){
        // array of mines
        this.vecMines = [];
        // vertex buffer for the sweeper shape's vertices
        this.sweeperVB = [];
        // vertex buffer for the mine shape's vertices
        this.mineVB = [];
        this.fastRender = false;
        this.iTick = 0;
        this.iGeneration = 0;
        // stores the average fitness per generation for use in graphing.
        this.vecAvFitness = [];
        // stores the best fitness per generation
        this.vecBestFitness = [];
        this.vecMedianFitness = [];
        //-------------------------------------Update-----------------------------
        //
        //	This is the main workhorse. The entire simulation is controlled from here.
        this.update = ()=>{
            //run the sweepers through CParams::iNumTicks amount of cycles. During
            //this loop each sweepers NN is constantly updated with the appropriate
            //information from its surroundings. The output from the NN is obtained
            //and the sweeper is moved. If it encounters a mine its fitness is
            //updated appropriately,
            if (this.iTick++ < (0, _parametersDefault.default).numTicks) this.vecSweepers.forEach((_, i)=>{
                if (!this.vecSweepers[i].update(this.vecMines)) {
                    console.log("error in update, wrong amount of NN inputs");
                    return false;
                }
                const grabHit = this.vecSweepers[i].checkForMine(this.vecMines, (0, _parametersDefault.default).mineScale);
                if (grabHit >= 0) {
                    // we have discovered a mine so increase fitness
                    this.vecSweepers[i].incrementFitness();
                    // mine found so replace the mine with another at a random 
                    // position
                    this.vecMines[grabHit] = new (0, _vector2DDefault.default)((0, _random.randomFloatSpaced)() * this.canvas.width, (0, _random.randomFloatSpaced)() * this.canvas.height);
                }
                this.vecThePopulation[i].dFitness = this.vecSweepers[i].fitness();
            });
            else {
                // update the stats to be used in our stat window
                this.vecAvFitness.push(this.geneticAlgorithm.averageFitness());
                this.vecBestFitness.push(this.geneticAlgorithm.bestFitness());
                this.vecMedianFitness.push(this.geneticAlgorithm.getMedianFitness());
                this.iGeneration++;
                // reset cycles
                this.iTick = 0;
                // run the GA to create a new population
                this.vecThePopulation = this.geneticAlgorithm.epoch(this.vecThePopulation);
                // what are the names of these genomes passed back to us?
                console.log(`Generation ${this.iGeneration} Genome Names:\n\t${this.vecThePopulation.map((g)=>g.getName()).join("\n	")}`);
                // insert the new (hopefully)improved brains back into the sweepers
                // and reset their positions etc
                // this.vecSweepers.length = 0;
                // this.vecSweepers = new Array(this.numberOfSweepers).fill('').map(() => new Minesweeper(carCounter++));
                this.vecSweepers.forEach((_, i)=>{
                    this.vecSweepers[i].putWeights([
                        ...this.vecThePopulation[i].vecWeights
                    ]);
                    this.vecSweepers[i].reset();
                });
            }
            return true;
        };
        const clock = document.createElement("div");
        clock.classList.add("clock");
        this.timepiece = clock;
        this.timepiece.innerText = `Tick: ${this.iGeneration}`;
        const fastRenderLabel = document.createElement("label");
        fastRenderLabel.innerText = "Fast Render";
        const fastRenderSwitch = document.createElement("input");
        fastRenderSwitch.type = "checkbox";
        fastRenderSwitch.checked = false;
        fastRenderSwitch.addEventListener("change", (e)=>{
            // @ts-ignore
            if (e.target.checked) this.fastRender = true;
            else this.fastRender = false;
        });
        fastRenderLabel.appendChild(fastRenderSwitch);
        const label = document.createElement("label");
        label.innerText = "Pause";
        const pauseSwitch = document.createElement("input");
        pauseSwitch.type = "checkbox";
        pauseSwitch.checked = false;
        pauseSwitch.addEventListener("change", (e)=>{
            // @ts-ignore
            if (e.target.checked) {
                console.log("pause in controller");
                this.pause();
            } else {
                console.log("un pause in controller");
                this.unPause();
            }
        });
        label.appendChild(pauseSwitch);
        this.pauseSwitch = pauseSwitch;
        this.pause = pause;
        this.unPause = unPause;
        const canvas = document.createElement("canvas");
        canvas.width = (0, _parametersDefault.default).windowWidth;
        canvas.height = (0, _parametersDefault.default).windowHeight;
        setTimeout(()=>{
            document.body.appendChild(canvas);
            document.body.appendChild(label);
            document.body.appendChild(fastRenderLabel);
        }, 0);
        this.canvas = canvas;
        this.numberOfSweepers = (0, _parametersDefault.default).numSweepers;
        this.numberOfMines = (0, _parametersDefault.default).numMines;
        this.vecThePopulation = [];
        this.vecSweepers = new Array(this.numberOfSweepers).fill("").map(()=>new (0, _mineSweeperDefault.default)(carCounter++));
        this.vecMines = new Array(this.numberOfMines).fill("").map(()=>new (0, _vector2DDefault.default)((0, _random.randomFloatSpaced)() * canvas.width, (0, _random.randomFloatSpaced)() * canvas.height));
        // get the total number of weights used in the sweepers
        // neural network so we can initialise the GA
        this.numberOfWeightsInNN = this.vecSweepers[0].getNumberOfWeights();
        // initialise the Genetic Algorithm class
        this.geneticAlgorithm = new (0, _geneticAlgorithmDefault.default)(this.numberOfSweepers, (0, _parametersDefault.default).mutationRate, (0, _parametersDefault.default).crossoverRate, this.numberOfWeightsInNN);
        // Get the weights from the GA and insert into the sweepers brains
        this.vecThePopulation = this.geneticAlgorithm.getChromos();
        this.vecSweepers.forEach((_, i)=>{
            this.vecSweepers[i].putWeights(this.vecThePopulation[i].vecWeights);
        });
        // fill the vertex buffers
        this.sweeperVB = sweeperVertices.map((v)=>new (0, _vector2DDefault.default)(v.x, v.y));
        this.mineVB = mine.map((v)=>new (0, _vector2DDefault.default)(v.x, v.y));
    }
    render() {
        this.timepiece.innerText = `Generation: ${this.iTick}`;
        const generationText = `Generation: ${this.iGeneration}`;
        const ctx = this.canvas.getContext("2d");
        if (!ctx) {
            console.log("no context");
            return;
        }
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.5;
        ctx.font = "13px arial";
        ctx.closePath();
        ctx.strokeText(generationText, 5, 15);
        if (!this.fastRender) {
            this.vecMines.forEach((_, i)=>{
                ctx.beginPath();
                ctx.strokeStyle = "green";
                ctx.lineWidth = 1;
                const mineVB = this.mineVB.map((v)=>new (0, _vector2DDefault.default)(v.x, v.y));
                this.worldTransform(mineVB, this.vecMines[i]);
                ctx.moveTo(mineVB[0].x, mineVB[0].y);
                for(let vert = 1; vert < mineVB.length; vert++)ctx.lineTo(mineVB[vert].x, mineVB[vert].y);
                ctx.lineTo(mineVB[0].x, mineVB[0].y);
                ctx.stroke();
                ctx.closePath();
            });
            ctx.font = "9px arial";
            this.vecSweepers.forEach((_, i)=>{
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.lineWidth = 1;
                if (i >= (0, _parametersDefault.default).numElite) ctx.strokeStyle = "black";
                const sweeperVB = this.sweeperVB.map((v)=>new (0, _vector2DDefault.default)(v.x, v.y));
                this.vecSweepers[i].worldTransform(sweeperVB);
                ctx.moveTo(sweeperVB[0].x, sweeperVB[0].y);
                for(let vert = 1; vert < sweeperVB.length; vert++)ctx.lineTo(sweeperVB[vert].x, sweeperVB[vert].y);
                ctx.lineTo(sweeperVB[0].x, sweeperVB[0].y);
                ctx.stroke();
                ctx.closePath();
                ctx.strokeText(`Sweeper_${i}`, sweeperVB[0].x - 20, sweeperVB[0].y + 10);
            // confirm("that is one SWEEPER")
            });
            ctx.font = "13px arial";
        // throw new Error("that is one frame");
        } else this.plotStats(ctx);
    // confirm("that is one frame");
    }
    worldTransform(vBuffer, vPos) {
        // create a transformation matrix
        const matTransform = new (0, _twoDimensionalMatrixDefault.default)();
        // scale
        matTransform.scale((0, _parametersDefault.default).mineScale, (0, _parametersDefault.default).mineScale);
        // and translate
        matTransform.translate(vPos.x, vPos.y);
        // now transform the ships vertices
        matTransform.transformPoints(vBuffer);
    }
    plotStats(ctx) {
        if (!ctx) return;
        const newAv = this.geneticAlgorithm.averageFitness();
        const newBest = this.geneticAlgorithm.bestFitness();
        const newMedian = this.geneticAlgorithm.getMedianFitness();
        const s = `Best Fitness: ${newBest}`;
        const s2 = `Average Fitness: ${newAv}`;
        const s3 = `Median Fitness: ${newMedian}`;
        ctx.font = "10px arial";
        ctx.strokeText(s, 5, 30);
        ctx.strokeText(s2, 5, 45);
        ctx.strokeText(s3, 5, 60);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, (0, _parametersDefault.default).windowHeight);
        ctx.lineTo((0, _parametersDefault.default).windowWidth, (0, _parametersDefault.default).windowHeight);
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, (0, _parametersDefault.default).windowHeight);
        for(let i = 0; i <= this.vecAvFitness.length; i++)ctx.lineTo(i * ((0, _parametersDefault.default).windowWidth / (this.vecAvFitness.length + 2)), (0, _parametersDefault.default).windowHeight - this.vecAvFitness[i] * (0, _parametersDefault.default).windowHeight / 20);
        ctx.lineTo(this.vecAvFitness.length * ((0, _parametersDefault.default).windowWidth / (this.vecAvFitness.length + 2)), (0, _parametersDefault.default).windowHeight - newAv * (0, _parametersDefault.default).windowHeight / 20);
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(0, (0, _parametersDefault.default).windowHeight);
        for(let i = 0; i < this.vecBestFitness.length; i++)ctx.lineTo(i * ((0, _parametersDefault.default).windowWidth / (this.vecBestFitness.length + 2)), (0, _parametersDefault.default).windowHeight - this.vecBestFitness[i] * (0, _parametersDefault.default).windowHeight / 20);
        ctx.lineTo(this.vecBestFitness.length * ((0, _parametersDefault.default).windowWidth / (this.vecBestFitness.length + 2)), (0, _parametersDefault.default).windowHeight - newBest * (0, _parametersDefault.default).windowHeight / 20);
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(0, (0, _parametersDefault.default).windowHeight);
        for(let i = 0; i < this.vecMedianFitness.length; i++)ctx.lineTo(i * ((0, _parametersDefault.default).windowWidth / (this.vecMedianFitness.length + 2)), (0, _parametersDefault.default).windowHeight - this.vecMedianFitness[i] * (0, _parametersDefault.default).windowHeight / 20);
        ctx.lineTo(this.vecMedianFitness.length * ((0, _parametersDefault.default).windowWidth / (this.vecMedianFitness.length + 2)), (0, _parametersDefault.default).windowHeight - newMedian * (0, _parametersDefault.default).windowHeight / 20);
        ctx.stroke();
        ctx.closePath();
    }
    // accessor methods
    getFastRender() {
        return this.fastRender;
    }
    setFastRender(value) {
        this.fastRender = value;
    }
    fastRenderToggler() {
        this.fastRender = !this.fastRender;
    }
}
exports.default = Controller;

},{"./vector2d":"gPsFU","./geneticAlgorithm":"1ewjC","./mineSweeper":"fn61y","./twoDimensionalMatrix":"9xMkg","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./parameters":"j9VLC","../utils/random":"1hQBY"}],"gPsFU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Vector2d {
    constructor(a, b){
        this.x = a;
        this.y = b;
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    subtract(vector) {
        if (!vector) return this;
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    multiply(multiplier) {
        this.x *= multiplier;
        this.y *= multiplier;
        return this;
    }
    divide(divisor) {
        this.x /= divisor;
        this.y /= divisor;
        return this;
    }
    // also called length of a 2d vector, 
    // hypotenuse of a right triangle
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        return this.divide(this.magnitude());
    }
    static dot(vector1, vector2) {
        return vector1.x * vector2.x + vector1.y * vector2.y;
    }
    static sign(vector1, vector2) {
        if (vector1.y * vector2.x > vector1.x * vector2.y) return 1;
        else return -1;
    }
    length(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }
}
exports.default = Vector2d;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1ewjC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Genome", ()=>Genome);
var _parameters = require("./parameters");
var _parametersDefault = parcelHelpers.interopDefault(_parameters);
var _random = require("../utils/random");
var _randomDefault = parcelHelpers.interopDefault(_random);
let genomeCoutner = 0;
class Genome {
    static sort(a, b) {
        return a.dFitness - b.dFitness;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    constructor(w = [], dFitness = 0, name = ""){
        this.vecWeights = [];
        this.dFitness = 0;
        this.name = name ? name : `Genome_${genomeCoutner++}`;
        if (w.length < 1) this.dFitness = 0;
        else if (w.length > 0) {
            this.vecWeights = [
                ...w
            ];
            this.dFitness = dFitness;
        }
    }
}
class GeneticAlgorithm {
    constructor(popsize, MutRat, CrossRat, numweights){
        this.vecPop = [];
        this.iPopSize = popsize;
        this.dMutationRate = MutRat;
        this.dCrossoverRate = CrossRat;
        this.iChromoLength = numweights;
        this.medianFitness = 0;
        this.dTotalFitness = 0;
        this.cGeneration = 0;
        this.iFittestGenome = 0;
        this.dBestFitness = 0;
        this.dWorstFitness = 99999999;
        this.dAverageFitness = 0;
        //initialise population with chromosomes consisting of random
        //weights while all fitnesses are zero
        for(let i = 0; i < this.iPopSize; i++){
            this.vecPop.push(new Genome([], 0));
            for(let j = 0; j < this.iChromoLength; j++)this.vecPop[i].vecWeights.push((0, _randomDefault.default)());
        }
    }
    //---------------------------------mutate--------------------------------
    //
    //	mutates a chromosome by perturbing its weights by an amount not 
    //	greater than dMaxPerturbation
    //  this mutates the chromo in place
    //-----------------------------------------------------------------------
    mutate(chromo) {
        // traverse the chromosome and mutate each weight dependent
        // on the mutation rate
        const newChromo = [];
        for(let i = 0; i < chromo.length; i++)// do we perturb this weight?
        if ((0, _randomDefault.default)() < this.dMutationRate) // add or subtract a small value to the weight
        // randomFloat() - randomFloat() returns a value between -1 and 1
        newChromo[i] = chromo[i] + ((0, _randomDefault.default)() - (0, _randomDefault.default)()) * (0, _parametersDefault.default).maxPerturbation;
        else // no mutation
        newChromo[i] = chromo[i];
        return newChromo;
    }
    //----------------------------------getChromoRoulette()------------------
    //
    //	returns a chromo based on roulette wheel sampling
    //
    //-----------------------------------------------------------------------
    getChromoRoulette() {
        //generate a random number between 0 & total fitness count
        const slice = (0, _randomDefault.default)() * this.dTotalFitness;
        //this will be set to the chosen chromosome
        let theChosenOne;
        //go through the chromosomes adding up the fitness so far
        let fitnessSoFar = 0;
        for(let i = 0; i < this.vecPop.length; i++){
            fitnessSoFar += this.vecPop[i].dFitness;
            //if the fitness so far > random number return the chromo at 
            //this point
            if (fitnessSoFar >= slice) {
                theChosenOne = this.vecPop[i];
                break;
            }
        }
        if (typeof theChosenOne === "undefined") throw new Error("not a genome!");
        return new Genome([
            ...theChosenOne.vecWeights
        ], theChosenOne.dFitness, theChosenOne.getName());
    }
    //-------------------------------------crossover()-----------------------
    //	
    //  given parents and storage for the offspring this method performs
    //	crossover according to the GAs crossover rate
    //-----------------------------------------------------------------------
    crossover(mum, dad, baby1, baby2) {
        //just return parents as offspring dependent on the rate
        //or if parents are the same
        if ((0, _randomDefault.default)() > this.dCrossoverRate || mum.join("") === dad.join("")) {
            mum.forEach((x)=>baby1.push(x));
            dad.forEach((x)=>baby2.push(x));
            return;
        }
        //determine a crossover point
        const cp = Math.round((0, _randomDefault.default)() * (mum.length - 1));
        //create the offspring
        for(let i = 0; i < cp; i++){
            baby1.push(mum[i]);
            baby2.push(dad[i]);
        }
        for(let i = cp; i < mum.length; i++){
            baby1.push(dad[i]);
            baby2.push(mum[i]);
        }
        return;
    }
    //-----------------------------------epoch()-----------------------------
    //
    //	takes a population of chromosones and runs the algorithm through one
    //	 cycle.
    //	Returns a new population of chromosones.
    //
    //-----------------------------------------------------------------------
    epoch(oldPop) {
        //assign the given population to the classes population
        console.log(`this.vecPop: ${JSON.stringify(this.vecPop.map((g)=>g.getName()))}`);
        console.log(`oldPops: ${JSON.stringify(oldPop.map((g)=>g.getName()))}`);
        this.vecPop = oldPop;
        //reset the appropriate variables
        this.reset();
        //sort the population (for scaling and elitism)
        this.vecPop.sort(Genome.sort);
        //calculate best, worst, average and total fitness
        this.calculateBestWorstAvTot();
        //create a temporary vector to store new chromosones
        const vecNewPop = [];
        //Now to add a little elitism we shall add in some copies of the
        //fittest genomes. Make sure we add an EVEN number or the roulette
        //wheel sampling will crash
        if (!((0, _parametersDefault.default).numCopiesElite * (0, _parametersDefault.default).numElite % 2)) this.grabNBest((0, _parametersDefault.default).numElite, (0, _parametersDefault.default).numCopiesElite, vecNewPop);
        else console.log("error: numCopiesElite * numElite is not even");
        //now we enter the GA loop
        //repeat until a new population is generated
        console.log(`vecNewPop.length: ${vecNewPop.length} this.iPopSize: ${this.iPopSize}`);
        while(vecNewPop.length < this.iPopSize){
            //grab two chromosones
            const mum = this.getChromoRoulette();
            const dad = this.getChromoRoulette();
            //create some offspring via crossover
            const baby1 = [];
            const baby2 = [];
            this.crossover(mum.vecWeights, dad.vecWeights, baby1, baby2);
            //now we mutate
            const mutieBaby1 = this.mutate(baby1);
            const mutieBaby2 = this.mutate(baby2);
            // console.log(`mutieBaby1: ${JSON.stringify(mutieBaby1)}`)
            //now copy into vecNewPop population
            vecNewPop.push(new Genome([
                ...mutieBaby1
            ], 0));
            vecNewPop.push(new Genome([
                ...mutieBaby2
            ], 0));
        }
        //finished so assign new pop back into m_vecPop
        this.vecPop = vecNewPop;
        oldPop.length = 0;
        return this.vecPop;
    // oldPop = JSON.parse(JSON.stringify(this.vecPop));
    }
    //-------------------------grabNBest----------------------------------
    //
    //	This works like an advanced form of elitism by inserting NumCopies
    //  copies of the NBest most fittest genomes into a population vector
    //--------------------------------------------------------------------
    grabNBest(nBest, numCopies, pop) {
        let nB = nBest;
        //add the required amount of copies of the n most fittest 
        //to the supplied vector
        while(nB--)for(let i = 0; i < numCopies; i++)pop.push(new Genome([
            ...this.vecPop[this.vecPop.length - 1 - nB].vecWeights
        ], 0, this.vecPop[this.vecPop.length - 1 - nB].getName()));
    }
    //-----------------------calculateBestWorstAvTot-----------------------	
    //
    //	calculates the fittest and weakest genome and the average/total 
    //	fitness scores
    //---------------------------------------------------------------------
    calculateBestWorstAvTot() {
        this.dTotalFitness = 0;
        let highestSoFar = 0;
        let lowestSoFar = 9999999;
        this.vecPop.sort(Genome.sort);
        this.medianFitness = this.vecPop[Math.floor(this.vecPop.length / 2)].dFitness;
        for(let i = 0; i < this.vecPop.length; i++){
            //update fittest if necessary
            if (this.vecPop[i].dFitness > highestSoFar) {
                highestSoFar = this.vecPop[i].dFitness;
                this.iFittestGenome = i;
                this.dBestFitness = highestSoFar;
            }
            //update worst if necessary
            if (this.vecPop[i].dFitness < lowestSoFar) {
                lowestSoFar = this.vecPop[i].dFitness;
                this.dWorstFitness = lowestSoFar;
            }
            this.dTotalFitness += this.vecPop[i].dFitness;
        } //next chromo
        this.dAverageFitness = this.dTotalFitness / this.iPopSize;
    }
    //-------------------------reset()------------------------------
    //
    //	resets all the relevant variables ready for a new generation
    //--------------------------------------------------------------
    reset() {
        this.dTotalFitness = 0;
        this.dBestFitness = 0;
        this.dWorstFitness = 9999999;
        this.dAverageFitness = 0;
        this.medianFitness = 0;
    }
    //accessor methods
    getChromos() {
        return this.vecPop;
    }
    getGeneration() {
        return this.cGeneration;
    }
    averageFitness() {
        return this.dTotalFitness / this.iPopSize;
    }
    bestFitness() {
        return this.dBestFitness;
    }
    getMedianFitness() {
        return this.medianFitness;
    }
}
exports.default = GeneticAlgorithm;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./parameters":"j9VLC","../utils/random":"1hQBY"}],"1hQBY":[function(require,module,exports) {
/** this file exists to pipe random through a controllable function for testing */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "randomFloatSpaced", ()=>randomFloatSpaced);
let index = 0;
const randomFloat = ()=>{
    // return (0.005 + (index++ * 0.21 )) % 1;
    // const t = Math.random();
    // console.log(t);
    // return t;
    return Math.random();
};
const randomFloatSpaced = ()=>{
    // return 0.05 * index++;
    return randomFloat();
// return Math.random();
};
exports.default = randomFloat;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fn61y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _neuralNet = require("./neuralNet");
var _neuralNetDefault = parcelHelpers.interopDefault(_neuralNet);
var _vector2D = require("./vector2d");
var _vector2DDefault = parcelHelpers.interopDefault(_vector2D);
var _parameters = require("./parameters");
var _parametersDefault = parcelHelpers.interopDefault(_parameters);
var _twoDimensionalMatrix = require("./twoDimensionalMatrix");
var _twoDimensionalMatrixDefault = parcelHelpers.interopDefault(_twoDimensionalMatrix);
var _clamp = require("../utils/clamp");
var _clampDefault = parcelHelpers.interopDefault(_clamp);
var _random = require("../utils/random");
var _randomDefault = parcelHelpers.interopDefault(_random);
class Minesweeper {
    constructor(i){
        this.getNumberOfWeights = ()=>{
            return this.brain.getNumberOfWeights();
        };
        /*****
     * reset
     * Resets the sweepers position, fitness and rotation
     * 
    */ this.reset = ()=>{
            // this.position = new Vector2d(randomFloat() * Parameters.windowWidth, randomFloat() * Parameters.windowHeight);
            // this.rotation = randomFloat() * 2 * Math.PI;
            this.minesFound = 0;
        };
        /**
     * worldTransform
     * 
     * sets up a translation matrix for the sweeper according to its
     *  scale, rotation and position. Returns the transformed vertices.
     * 
     */ this.worldTransform = (sweeper)=>{
            const matTransform = new (0, _twoDimensionalMatrixDefault.default)();
            matTransform.scale(this.scale, this.scale);
            matTransform.rotate(this.rotation % (2 * Math.PI));
            matTransform.translate(this.position.x, this.position.y);
            matTransform.transformPoints(sweeper);
        };
        /**
     * update() 
     * First we take sensor readings and feed these into the sweepers brain.
    * The inputs are:
    * A vector to the closest mine (x, y)
    * The sweepers 'look at' vector (x, y)
    * We receive two outputs from the brain: leftTrack & rightTrack.
    * Given a force for each track we calculate the resultant rotation 
    * and acceleration and apply to current velocity vector.
    * */ this.update = (mines)=>{
            const inputs = [];
            const closestMine = this.getClosestMine(mines);
            // console.log(`${this.name}\n\tclosestMine: ${closestMine.x},${closestMine.y} \n\t current position: ${this.position.x},${this.position.y}`);
            // alert('pause');
            const closestMineV = new (0, _vector2DDefault.default)(closestMine.x, closestMine.y);
            closestMineV.normalize();
            inputs.push(closestMineV.x);
            inputs.push(closestMineV.y);
            inputs.push(this.lookAt.x);
            inputs.push(this.lookAt.y);
            this.closestMine = mines.map((e)=>`${e.x},${e.y}`).findIndex((e)=>e === `${closestMine.x},${closestMine.y}`);
            const outputs = this.brain.update(inputs);
            if (outputs.length !== (0, _parametersDefault.default).numOutputs) throw new Error(`Outputs length does not match number of outputs ${outputs.length}, ${(0, _parametersDefault.default).numOutputs}`);
            this.leftTrack = outputs[0];
            this.rightTrack = outputs[1];
            let rotForce = this.leftTrack - this.rightTrack;
            rotForce = (0, _clampDefault.default)(rotForce, -(0, _parametersDefault.default).maxTurnRate, (0, _parametersDefault.default).maxTurnRate);
            this.rotation += rotForce;
            this.velocity = this.leftTrack + this.rightTrack;
            this.lookAt.x = -1 * Math.sin(this.rotation);
            this.lookAt.y = Math.cos(this.rotation);
            this.position.add(this.lookAt.multiply(this.velocity));
            if (this.position.x < 0) this.position.x = this.position.x % (0, _parametersDefault.default).windowWidth + (0, _parametersDefault.default).windowWidth;
            if (this.position.x > (0, _parametersDefault.default).windowWidth) this.position.x = this.position.x % (0, _parametersDefault.default).windowWidth;
            if (this.position.y < 0) this.position.y = this.position.y % (0, _parametersDefault.default).windowHeight + (0, _parametersDefault.default).windowHeight;
            if (this.position.y > (0, _parametersDefault.default).windowHeight) this.position.y = this.position.y % (0, _parametersDefault.default).windowHeight;
            return true;
        };
        // xxxxxxxxxx
        this.getClosestMine = (mines)=>{
            let closestMine = 0;
            let closestDistance = Number.MAX_VALUE;
            let distance = 0;
            let vClosestObject = new (0, _vector2DDefault.default)(0, 0);
            for(let i = 0; i < mines.length; i++){
                const temp = new (0, _vector2DDefault.default)(this.position.x, this.position.y);
                // distance = temp.subtract(mines[i]).magnitude();
                distance = temp.length(temp.subtract(mines[i]));
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestMine = i;
                    vClosestObject = temp;
                }
            }
            return vClosestObject;
        };
        this.incrementMinesFound = ()=>{
            this.minesFound++;
        };
        this.getMinesFound = ()=>{
            return this.minesFound;
        };
        this.getPosition = ()=>{
            return new (0, _vector2DDefault.default)(this.position.x, this.position.y);
        };
        this.checkForMine = (mines, size)=>{
            const temp = this.getPosition();
            const distance = temp.subtract(mines[this.closestMine]).magnitude();
            if (distance < size + 5) return this.closestMine;
            return -1;
        };
        this.getName = ()=>{
            return this.name;
        };
        // accessors
        this.incrementFitness = ()=>{
            this.incrementMinesFound();
        };
        this.fitness = ()=>{
            return this.minesFound;
        };
        this.putWeights = (w)=>{
            this.brain.putWeights([
                ...w
            ]);
        };
        // @ts-ignore
        window[`sweeper_${i}`] = this;
        this.name = `Sweeper_${i}`;
        this.brain = new (0, _neuralNetDefault.default)(`Sweeper_${i}`);
        this.position = new (0, _vector2DDefault.default)((0, _randomDefault.default)() * (0, _parametersDefault.default).windowWidth, (0, _randomDefault.default)() * (0, _parametersDefault.default).windowHeight);
        this.rotation = (0, _randomDefault.default)() * 2 * Math.PI;
        this.lookAt = new (0, _vector2DDefault.default)(Math.sin(this.rotation) * -1, Math.cos(this.rotation));
        this.velocity = 0;
        this.minesFound = 0;
        this.scale = (0, _parametersDefault.default).sweeperScale;
        this.closestMine = 0;
        this.leftTrack = 0.16;
        this.rightTrack = 0.16;
    }
}
exports.default = Minesweeper;

},{"./neuralNet":"e2DsB","./vector2d":"gPsFU","./parameters":"j9VLC","./twoDimensionalMatrix":"9xMkg","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../utils/clamp":"7Y4oV","../utils/random":"1hQBY"}],"e2DsB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _neuronLayer = require("./neuronLayer");
var _neuronLayerDefault = parcelHelpers.interopDefault(_neuronLayer);
var _parameters = require("./parameters");
var _parametersDefault = parcelHelpers.interopDefault(_parameters);
// import { dActivationResponse, dBias, iNeuronsPerHiddenLayer, iNumHidden, iNumInputs, iNumOutputs } from "./parameters";
class NeuralNet {
    constructor(name){
        this.neuronLayers = [];
        this.incomingWeights = [];
        this.outgoingWeights = [];
        this.cycles = 0;
        this.name = name;
        this.numInputs = (0, _parametersDefault.default).numInputs;
        this.numOutputs = (0, _parametersDefault.default).numOutputs;
        this.numHiddenLayers = (0, _parametersDefault.default).numHidden;
        this.neuronsPerHiddenLayer = (0, _parametersDefault.default).neuronsPerHiddenLayer;
        this.createNet();
        // @ts-ignore
        window[`neuralNet_${name}`] = this;
    }
    createNet() {
        console.log("CREATING NET", this);
        //create the layers of the network
        if (this.numHiddenLayers > 0) {
            //create first hidden layer
            this.neuronLayers.push(new (0, _neuronLayerDefault.default)(this.neuronsPerHiddenLayer, this.numInputs));
            for(let i = 0; i < this.numHiddenLayers - 1; i++)this.neuronLayers.push(new (0, _neuronLayerDefault.default)(this.neuronsPerHiddenLayer, this.neuronsPerHiddenLayer));
            //create output layer
            this.neuronLayers.push(new (0, _neuronLayerDefault.default)(this.numOutputs, this.numInputs));
        } else //create output layer
        this.neuronLayers.push(new (0, _neuronLayerDefault.default)(this.numOutputs, this.numInputs));
    }
    //	returns the total number of weights needed for the net
    getNumberOfWeights() {
        let weights = 0;
        //for each layer
        for(let i = 0; i < this.numHiddenLayers; i++){
            //for each neuron
            // if(this.neuronLayers.length > 0){
            for(let j = 0; j < this.neuronLayers[i].numNeurons; j++)//for each weight
            for(let k = 0; k < this.neuronLayers[i].vecNeurons[j].numInputs; k++)weights++;
        // }
        }
        return weights;
    }
    //	returns an array containing the weights
    getWeights() {
        // return this.outgoingWeights;
        //this will hold the weights
        const weights = [];
        //for each layer
        for(let i = 0; i < this.numHiddenLayers; i++){
            //for each neuron
            for(let j = 0; j < this.neuronLayers[i].numNeurons; j++)//for each weight
            for(let k = 0; k < this.neuronLayers[i].vecNeurons[j].numInputs; k++)weights.push(this.neuronLayers[i].vecNeurons[j].vecWeight[k]);
        }
        // console.log(`${this.name} has weights: ${JSON.stringify(weights)}`);
        return weights;
    }
    putWeights(weights) {
        // console.log(`putting weights on ${this.name}`);
        // this.incomingWeights = [...weights];
        // this.outgoingWeights = [...weights];
        // return;
        // this.getWeights();
        // console.log(`putting weights on ${this.name}\n${JSON.stringify(weights)}`);
        let cWeight = 0;
        //for each layer
        for(let i = 0; i < this.numHiddenLayers; i++)//for each neuron
        if (this.neuronLayers.length > 0) {
            for(let j = 0; j < this.neuronLayers[i].numNeurons; j++)// this.neuronLayers[i].vecNeurons[j].vecWeight.length = 0;
            //for each weight
            for(let k = 0; k < this.neuronLayers[i].vecNeurons[j].numInputs; k++)// console.log(`layer ${i} neroun ${j} weight ${k} = cWeight index: ${cWeight} ${weights[cWeight]}`);
            this.neuronLayers[i].vecNeurons[j].vecWeight[k] = weights[cWeight++];
        }
        // this.getWeights();
        return;
    }
    update(inputArgs) {
        if (this.incomingWeights.length > 0) {
            // console.log(`putting weights on ${this.name}`);
            let cWeight = 0;
            //for each layer
            for(let i = 0; i < this.numHiddenLayers; i++)//for each neuron
            if (this.neuronLayers.length > 0) {
                for(let j = 0; j < this.neuronLayers[i].numNeurons; j++)// this.neuronLayers[i].vecNeurons[j].vecWeight.length = 0;
                //for each weight
                for(let k = 0; k < this.neuronLayers[i].vecNeurons[j].numInputs; k++)// console.log(`layer ${i} neroun ${j} weight ${k} = cWeight index: ${cWeight} ${weights[cWeight]}`);
                this.neuronLayers[i].vecNeurons[j].vecWeight[k] = this.incomingWeights[cWeight++];
            }
            this.outgoingWeights = [
                ...this.incomingWeights
            ];
            this.incomingWeights.length = 0;
        }
        let inputs = [
            ...inputArgs
        ];
        // stores the resultant outputs from each layer
        let outputs = [];
        let cWeight = 0;
        // first check that we have the correct amount of inputs
        if (inputs.length !== this.numInputs) {
            // just return an empty vector if incorrect.
            console.log(`Error wrong number of inputs, expected ${this.numInputs} got ${inputs.length}`);
            return outputs;
        }
        // For each layer.... (+1 for bias layer)
        for(let i = 0; i < this.numHiddenLayers + 1; i++){
            if (i > 0) inputs = [
                ...outputs
            ];
            outputs.length = 0;
            cWeight = 0;
            // for each neuron sum the (inputs * corresponding weights).
            // Throw the total at our sigmoid function to get the output.
            if (this.neuronLayers.length > 0) {
                for(let j = 0; j < this.neuronLayers[i].numNeurons; j++){
                    let netinput = 0;
                    this.numInputs = this.neuronLayers[i].vecNeurons[j].numInputs;
                    // for (let k=0; k<this.numInputs-1; k++){
                    for(let k = 0; k < this.numInputs - 1; k++){
                        // sum the weights x inputs
                        if (this.name === "Sweeper_0" && k === 0 && i === 0 && j === 0 && this.cycles % 52 === 0) console.log(`Sweeper_0 info:\n\tindex: ${cWeight}\n\tweight:${this.neuronLayers[i].vecNeurons[j].vecWeight[k]}\n\toutgoing weight ${this.outgoingWeights[0]}`);
                        netinput += this.neuronLayers[i].vecNeurons[j].vecWeight[k] * inputs[cWeight++];
                    }
                    // add in the bias
                    netinput += this.neuronLayers[i].vecNeurons[j].vecWeight[this.numInputs - 1] * (0, _parametersDefault.default).bias;
                    // we can store the outputs from each layer as we generate them.
                    // The combined activation is first filtered through the sigmoid
                    // function
                    outputs.push(this.sigmoid(netinput, (0, _parametersDefault.default).activationResponse));
                    cWeight = 0;
                }
                if (this.name === "Sweeper_0") {
                    this.cycles++;
                    if (this.cycles % 100 === 0) this.cycles = 0;
                // this.neuronLayers[i].vecNeurons[j].vecWeight[k] = 0.5;
                }
            }
        }
        return outputs;
    }
    sigmoid(netinput, response) {
        return 1 / (1 + Math.exp(-1 * netinput / response));
    }
}
exports.default = NeuralNet;

},{"./neuronLayer":"heyQS","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./parameters":"j9VLC"}],"heyQS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _neuron = require("./neuron");
var _neuronDefault = parcelHelpers.interopDefault(_neuron);
class NeuronLayer {
    constructor(numNeurons, numInputsPerNeuron){
        //the layer of neurons
        this.vecNeurons = [];
        this.numNeurons = numNeurons;
        this.numInputsPerNeuron = numInputsPerNeuron;
        for(let i = 0; i < numNeurons; i++)this.vecNeurons.push(new (0, _neuronDefault.default)(this.numInputsPerNeuron));
    }
}
exports.default = NeuronLayer;

},{"./neuron":"9HiX7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9HiX7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _random = require("../utils/random");
var _randomDefault = parcelHelpers.interopDefault(_random);
class Neuron {
    constructor(numInputs){
        this.vecWeight = [];
        //we need an additional weight for the bias hence the +1
        this.numInputs = numInputs;
        for(let i = 0; i < numInputs + 1; ++i)this.vecWeight.push((0, _randomDefault.default)());
    }
}
exports.default = Neuron;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../utils/random":"1hQBY"}],"9xMkg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class TwoDimensionalMatrix {
    constructor(){
        this._11 = 1;
        this._12 = 0;
        this._13 = 0;
        this._21 = 0;
        this._22 = 1;
        this._23 = 0;
        this._31 = 0;
        this._32 = 0;
        this._33 = 1;
    }
    consumeMatrix(mIn) {
        this._11 = mIn._11;
        this._12 = mIn._12;
        this._13 = mIn._13;
        this._21 = mIn._21;
        this._22 = mIn._22;
        this._23 = mIn._23;
        this._31 = mIn._31;
        this._32 = mIn._32;
        this._33 = mIn._33;
    }
    TwoDimensionalMatrixMultiply(mIn) {
        const mat_temp = new TwoDimensionalMatrix();
        mat_temp._11 = this._11 * mIn._11 + this._12 * mIn._21 + this._13 * mIn._31;
        mat_temp._12 = this._11 * mIn._12 + this._12 * mIn._22 + this._13 * mIn._32;
        mat_temp._13 = this._11 * mIn._13 + this._12 * mIn._23 + this._13 * mIn._33;
        mat_temp._21 = this._21 * mIn._11 + this._22 * mIn._21 + this._23 * mIn._31;
        mat_temp._22 = this._21 * mIn._12 + this._22 * mIn._22 + this._23 * mIn._32;
        mat_temp._23 = this._21 * mIn._13 + this._22 * mIn._23 + this._23 * mIn._33;
        mat_temp._31 = this._31 * mIn._11 + this._32 * mIn._21 + this._33 * mIn._31;
        mat_temp._32 = this._31 * mIn._12 + this._32 * mIn._22 + this._33 * mIn._32;
        mat_temp._33 = this._31 * mIn._13 + this._32 * mIn._23 + this._33 * mIn._33;
        this.consumeMatrix(mat_temp);
    }
    createIdentity() {
        const matrix = new TwoDimensionalMatrix();
        matrix._11 = 1;
        matrix._22 = 1;
        matrix._33 = 1;
        matrix._12 = 0;
        matrix._13 = 0;
        matrix._21 = 0;
        matrix._23 = 0;
        matrix._31 = 0;
        matrix._32 = 0;
        return matrix;
    }
    translate(x, y) {
        const matrix = this.createIdentity();
        matrix._31 = x;
        matrix._32 = y;
        this.TwoDimensionalMatrixMultiply(matrix);
    }
    scale(xScale, yScale) {
        const matrix = this.createIdentity();
        matrix._11 = xScale;
        matrix._22 = yScale;
        this.TwoDimensionalMatrixMultiply(matrix);
    }
    rotate(angle) {
        const matrix = this.createIdentity();
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        matrix._11 = cos;
        matrix._12 = sin;
        matrix._21 = -1 * sin;
        matrix._22 = cos;
        this.TwoDimensionalMatrixMultiply(matrix);
    }
    transformPoints(points) {
        for(let i = 0; i < points.length; i++){
            const tempX = this._11 * points[i].x + this._21 * points[i].y + this._31;
            const tempY = this._12 * points[i].x + this._22 * points[i].y + this._32;
            points[i].x = tempX;
            points[i].y = tempY;
        }
    }
    reportMatrix() {
        return `
        ${this._11} ${this._12} ${this._13}
        ${this._21} ${this._22} ${this._23}
        ${this._31} ${this._32} ${this._33}`;
    }
}
exports.default = TwoDimensionalMatrix;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7Y4oV":[function(require,module,exports) {
//-------------------------------------Clamp()-----------------------------------------
//
//	clamps the first argument between the second two
//
//-------------------------------------------------------------------------------------
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const clamp = (num, min, max)=>Math.min(Math.max(num, min), max);
exports.default = clamp;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["2oZg2","h7u1C"], "h7u1C", "parcelRequire9860")

//# sourceMappingURL=index.b71e74eb.js.map
