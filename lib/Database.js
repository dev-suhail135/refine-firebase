"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatabase = void 0;
var BaseDatabase = /** @class */ (function () {
    function BaseDatabase(options) {
        this.options = options;
        this.getDataProvider = this.getDataProvider.bind(this);
        this.createData = this.createData.bind(this);
        this.createManyData = this.createManyData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.deleteManyData = this.deleteManyData.bind(this);
        this.getList = this.getList.bind(this);
        this.getMany = this.getMany.bind(this);
        this.getOne = this.getOne.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateManyData = this.updateManyData.bind(this);
        this.getAPIUrl = this.getAPIUrl.bind(this);
        this.requestPayloadFactory = this.requestPayloadFactory.bind(this);
        this.responsePayloadFactory = this.responsePayloadFactory.bind(this);
    }
    BaseDatabase.prototype.requestPayloadFactory = function (resource, data) {
        var _a;
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.requestPayloadFactory) {
            return (this.options.requestPayloadFactory(resource, data));
        }
        else {
            return __assign({}, data);
        }
    };
    BaseDatabase.prototype.responsePayloadFactory = function (resource, data) {
        var _a, _b;
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.responsePayloadFactory) {
            return ((_b = this.options) === null || _b === void 0 ? void 0 : _b.responsePayloadFactory(resource, data));
        }
        else {
            return __assign({}, data);
        }
    };
    BaseDatabase.prototype.getAPIUrl = function () {
        return "";
    };
    BaseDatabase.prototype.getDataProvider = function () {
        return {
            create: this.createData,
            createMany: this.createManyData,
            deleteOne: this.deleteData,
            deleteMany: this.deleteManyData,
            getList: this.getList,
            getMany: this.getMany,
            getOne: this.getOne,
            update: this.updateData,
            updateMany: this.updateManyData,
            getApiUrl: this.getAPIUrl,
        };
    };
    return BaseDatabase;
}());
exports.BaseDatabase = BaseDatabase;
