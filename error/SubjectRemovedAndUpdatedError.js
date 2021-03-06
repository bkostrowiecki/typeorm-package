"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectRemovedAndUpdatedError = void 0;
var tslib_1 = require("tslib");
/**
 * Thrown when same object is scheduled for remove and updation at the same time.
 */
var SubjectRemovedAndUpdatedError = /** @class */ (function (_super) {
    tslib_1.__extends(SubjectRemovedAndUpdatedError, _super);
    function SubjectRemovedAndUpdatedError(subject) {
        var _this = _super.call(this) || this;
        _this.name = "SubjectRemovedAndUpdatedError";
        Object.setPrototypeOf(_this, SubjectRemovedAndUpdatedError.prototype);
        _this.message = "Removed entity \"" + subject.metadata.name + "\" is also scheduled for update operation. " +
            "Make sure you are not updating and removing same object (note that update or remove may be executed by cascade operations).";
        return _this;
    }
    return SubjectRemovedAndUpdatedError;
}(Error));
exports.SubjectRemovedAndUpdatedError = SubjectRemovedAndUpdatedError;

//# sourceMappingURL=SubjectRemovedAndUpdatedError.js.map
