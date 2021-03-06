"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyHasActiveConnectionError = void 0;
var tslib_1 = require("tslib");
/**
 * Thrown when consumer tries to recreate connection with the same name, but previous connection was not closed yet.
 */
var AlreadyHasActiveConnectionError = /** @class */ (function (_super) {
    tslib_1.__extends(AlreadyHasActiveConnectionError, _super);
    function AlreadyHasActiveConnectionError(connectionName) {
        var _this = _super.call(this) || this;
        _this.name = "AlreadyHasActiveConnectionError";
        Object.setPrototypeOf(_this, AlreadyHasActiveConnectionError.prototype);
        _this.message = "Cannot create a new connection named \"" + connectionName + "\", because connection with such name " +
            "already exist and it now has an active connection session.";
        return _this;
    }
    return AlreadyHasActiveConnectionError;
}(Error));
exports.AlreadyHasActiveConnectionError = AlreadyHasActiveConnectionError;

//# sourceMappingURL=AlreadyHasActiveConnectionError.js.map
