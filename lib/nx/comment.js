"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.CommentType = void 0;
var utils_1 = require("utils");
var base_class_1 = require("./base-class");
var CommentType;
(function (CommentType) {
    CommentType[CommentType["Normal"] = 0] = "Normal";
    CommentType[CommentType["Label"] = 1] = "Label";
    CommentType[CommentType["SentenceId"] = 2] = "SentenceId";
})(CommentType = exports.CommentType || (exports.CommentType = {}));
var Comment = (function (_super) {
    __extends(Comment, _super);
    function Comment(sent, body) {
        var _this = _super.call(this, "Comment") || this;
        _this.sent = sent;
        _this.body = body;
        _this.type = CommentType.Normal;
        var label = body.match(utils_1.RE.commentLabel);
        var sentId = body.match(utils_1.RE.commentSentId);
        if (label) {
            var dedupedLabels_1 = [];
            label[3].split(/\s/).forEach(function (label) {
                if (label && dedupedLabels_1.indexOf(label) === -1)
                    dedupedLabels_1.push(label);
            });
            _this.type = CommentType.Label;
            _this.labels = dedupedLabels_1;
        }
        else if (sentId) {
            _this.type = CommentType.SentenceId;
            _this.id = sentId[2];
        }
        return _this;
    }
    Comment.prototype.serialize = function () { return this.body; };
    return Comment;
}(base_class_1.NxBaseClass));
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map