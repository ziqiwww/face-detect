var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function initModels() {
    return __awaiter(this, void 0, void 0, function () {
        var imgDom, inputFile, startDet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, initDet()];
                case 1:
                    _a.sent();
                    imgDom = document.getElementById('imgDom');
                    inputFile = document.getElementById('inputFile');
                    inputFile.disabled = false;
                    inputFile.addEventListener("change", function (event) {
                        if (event.target.files[0]) {
                            imgDom.src = URL.createObjectURL(event.target.files[0]);
                            downloadCanvasImage("imgDom", "srcImgLink", "srcImg");
                        }
                    });
                    startDet = document.getElementById("startDet");
                    startDet.addEventListener("click", function (event) {
                        detect('imgDom', 'canvasDet').then(function (bboxes) {
                            console.log(bboxes);
                            var detTab = document.getElementById("detTab");
                            var htmlStr = "";
                            htmlStr += "<thead>\n                <tr>\n                    <th>\u7F16\u53F7</th>\n                    <th>\u5DE6\u4E0A\u5750\u6807</th>\n                    <th>\u53F3\u4E0B\u5750\u6807</th>\n                    <th>\u786E\u4FE1\u5EA6</th>\n                </tr>\n             </thead>";
                            detTab.innerHTML = htmlStr;
                            htmlStr = "<tbody>";
                            for (var i = 0; i < bboxes.length; i++) {
                                htmlStr +=
                                    "\n            <tr>\n            <td>".concat(i, "</td>\n            <td>(").concat(bboxes[i].x1, ", ").concat(bboxes[i].y1, ")</td>\n            <td>(").concat(bboxes[i].x2, ", ").concat(bboxes[i].y2, ")</td>\n            <td>").concat(bboxes[i].score.toFixed(5) * 100, "%</td>\n            </tr>\n            ");
                            }
                            htmlStr += "<tr><td>\u68C0\u6D4B\u5230\u7684\u4EBA\u8138\u603B\u6570\uFF1A".concat(bboxes.length, "</td></tr>");
                            htmlStr += "</tbody>";
                            detTab.innerHTML += htmlStr;
                        });
                    });
                    return [2 /*return*/, null];
            }
        });
    });
}
function downloadCanvasImage(imgID, srcImgLinkId, name) {
    /*
    * Input: image id to be downloaded,
    *        link id the image is to be stored in
    *        name of the final download link
    * Intro: the function while
    * */
    var image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL('image/png');
        // 生成一个a元素
        var a = document.getElementById(srcImgLinkId);
        a.download = name || 'downLoadImg';
        // 将生成的URL设置为a.href属性
        a.href = url;
        // console.log(a.href);
    };
    image.src = document.getElementById(imgID).src;
}
window.onload = initModels;
