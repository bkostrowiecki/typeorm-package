"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqljsQueryRunner = void 0;
var tslib_1 = require("tslib");
var QueryRunnerAlreadyReleasedError_1 = require("../../error/QueryRunnerAlreadyReleasedError");
var AbstractSqliteQueryRunner_1 = require("../sqlite-abstract/AbstractSqliteQueryRunner");
var Broadcaster_1 = require("../../subscriber/Broadcaster");
var QueryFailedError_1 = require("../../error/QueryFailedError");
/**
 * Runs queries on a single sqlite database connection.
 */
var SqljsQueryRunner = /** @class */ (function (_super) {
    tslib_1.__extends(SqljsQueryRunner, _super);
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function SqljsQueryRunner(driver) {
        var _this = _super.call(this) || this;
        _this.driver = driver;
        _this.connection = driver.connection;
        _this.broadcaster = new Broadcaster_1.Broadcaster(_this);
        return _this;
    }
    // -------------------------------------------------------------------------
    // Public methods
    // -------------------------------------------------------------------------
    /**
     * Commits transaction.
     * Error will be thrown if transaction was not started.
     */
    SqljsQueryRunner.prototype.commitTransaction = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.commitTransaction.call(this)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.driver.autoSave()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Executes a given SQL query.
     */
    SqljsQueryRunner.prototype.query = function (query, parameters) {
        var _this = this;
        if (parameters === void 0) { parameters = []; }
        if (this.isReleased)
            throw new QueryRunnerAlreadyReleasedError_1.QueryRunnerAlreadyReleasedError();
        return new Promise(function (ok, fail) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var databaseConnection, queryStartTime, statement, maxQueryExecutionTime, queryEndTime, queryExecutionTime, result;
            return tslib_1.__generator(this, function (_a) {
                databaseConnection = this.driver.databaseConnection;
                this.driver.connection.logger.logQuery(query, parameters, this);
                queryStartTime = +new Date();
                try {
                    statement = databaseConnection.prepare(query);
                    if (parameters) {
                        parameters = parameters.map(function (p) { return typeof p !== 'undefined' ? p : null; });
                        statement.bind(parameters);
                    }
                    maxQueryExecutionTime = this.driver.connection.options.maxQueryExecutionTime;
                    queryEndTime = +new Date();
                    queryExecutionTime = queryEndTime - queryStartTime;
                    if (maxQueryExecutionTime && queryExecutionTime > maxQueryExecutionTime)
                        this.driver.connection.logger.logQuerySlow(queryExecutionTime, query, parameters, this);
                    result = [];
                    while (statement.step()) {
                        result.push(statement.getAsObject());
                    }
                    statement.free();
                    ok(result);
                }
                catch (e) {
                    if (statement) {
                        statement.free();
                    }
                    this.driver.connection.logger.logQueryError(e, query, parameters, this);
                    fail(new QueryFailedError_1.QueryFailedError(query, parameters, e));
                }
                return [2 /*return*/];
            });
        }); });
    };
    return SqljsQueryRunner;
}(AbstractSqliteQueryRunner_1.AbstractSqliteQueryRunner));
exports.SqljsQueryRunner = SqljsQueryRunner;

//# sourceMappingURL=SqljsQueryRunner.js.map
