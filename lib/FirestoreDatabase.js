"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreDatabase = void 0;
var firestore_1 = require("firebase/firestore");
var Database_1 = require("./Database");
var FirestoreDatabase = /** @class */ (function (_super) {
    __extends(FirestoreDatabase, _super);
    function FirestoreDatabase(options, database) {
        var _this = _super.call(this, options) || this;
        _this.database = database || (0, firestore_1.getFirestore)(options === null || options === void 0 ? void 0 : options.firebaseApp);
        _this.getCollectionRef = _this.getCollectionRef.bind(_this);
        _this.getFilterQuery = _this.getFilterQuery.bind(_this);
        return _this;
    }
    FirestoreDatabase.prototype.getCollectionRef = function (resource) {
        return (0, firestore_1.collection)(this.database, resource);
    };
    FirestoreDatabase.prototype.getDocRef = function (resource, id) {
        return (0, firestore_1.doc)(this.database, resource, id);
    };
    FirestoreDatabase.prototype.getFilterQuery = function (_a) {
        var resource = _a.resource, sort = _a.sort, filters = _a.filters;
        var ref = this.getCollectionRef(resource);
        var queryFilter = filters === null || filters === void 0 ? void 0 : filters.map(function (filter) {
            var operator = getFilterOperator(filter.operator);
            return (0, firestore_1.where)(filter.field, operator, filter.value);
        });
        var querySorter = sort === null || sort === void 0 ? void 0 : sort.map(function (sorter) { return (0, firestore_1.orderBy)(sorter.field, sorter.order); });
        if ((queryFilter === null || queryFilter === void 0 ? void 0 : queryFilter.length) && (querySorter === null || querySorter === void 0 ? void 0 : querySorter.length)) {
            return firestore_1.query.apply(void 0, __spreadArray(__spreadArray([ref], queryFilter, false), querySorter, false));
        }
        else if (queryFilter === null || queryFilter === void 0 ? void 0 : queryFilter.length) {
            return firestore_1.query.apply(void 0, __spreadArray([ref], queryFilter, false));
        }
        else if (querySorter === null || querySorter === void 0 ? void 0 : querySorter.length) {
            return firestore_1.query.apply(void 0, __spreadArray([ref], querySorter, false));
        }
        else {
            return ref;
        }
    };
    FirestoreDatabase.prototype.createData = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var ref, payload, docRef, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        ref = this.getCollectionRef(args.resource);
                        payload = this.requestPayloadFactory(args.resource, args.variables);
                        return [4 /*yield*/, (0, firestore_1.addDoc)(ref, payload)];
                    case 1:
                        docRef = _a.sent();
                        data = __assign({ id: docRef.id }, payload);
                        return [2 /*return*/, { data: data }];
                    case 2:
                        error_1 = _a.sent();
                        Promise.reject(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FirestoreDatabase.prototype.createManyData = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.createData(args)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, { data: data }];
                    case 2:
                        error_2 = _a.sent();
                        Promise.reject(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FirestoreDatabase.prototype.deleteData = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var ref, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        ref = this.getDocRef(args.resource, args.id);
                        return [4 /*yield*/, (0, firestore_1.deleteDoc)(ref)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        Promise.reject(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FirestoreDatabase.prototype.deleteManyData = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    args.ids.forEach(function (id) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.deleteData({ resource: args.resource, id: id });
                            return [2 /*return*/];
                        });
                    }); });
                }
                catch (error) {
                    Promise.reject(error);
                }
                return [2 /*return*/];
            });
        });
    };
    FirestoreDatabase.prototype.getList = function (args) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var ref, data_1, current, limit, querySnapshot, error_4;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        ref = this.getFilterQuery(args);
                        data_1 = [];
                        current = (_b = (_a = args.pagination) === null || _a === void 0 ? void 0 : _a.current) !== null && _b !== void 0 ? _b : 1;
                        limit = ((_c = args.pagination) === null || _c === void 0 ? void 0 : _c.pageSize) || 10;
                        return [4 /*yield*/, (0, firestore_1.getDocs)(ref)];
                    case 1:
                        querySnapshot = _d.sent();
                        querySnapshot.forEach(function (document) {
                            data_1.push(_this.responsePayloadFactory(args.resource, __assign({ id: document.id }, document.data())));
                        });
                        return [2 /*return*/, { data: data_1 }];
                    case 2:
                        error_4 = _d.sent();
                        Promise.reject(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FirestoreDatabase.prototype.getMany = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var ref, data_2, querySnapshot, error_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        ref = this.getCollectionRef(args.resource);
                        data_2 = [];
                        return [4 /*yield*/, (0, firestore_1.getDocs)(ref)];
                    case 1:
                        querySnapshot = _a.sent();
                        querySnapshot.forEach(function (document) {
                            if (args.ids.includes(document.id)) {
                                data_2.push(_this.responsePayloadFactory(args.resource, __assign({ id: document.id }, document.data())));
                            }
                        });
                        return [2 /*return*/, { data: data_2 }];
                    case 2:
                        error_5 = _a.sent();
                        Promise.reject(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FirestoreDatabase.prototype.getOne = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var docRef, docSnap, data, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!(args.resource && args.id)) return [3 /*break*/, 2];
                        docRef = this.getDocRef(args.resource, args.id);
                        return [4 /*yield*/, (0, firestore_1.getDoc)(docRef)];
                    case 1:
                        docSnap = _a.sent();
                        data = this.responsePayloadFactory(args.resource, __assign(__assign({}, docSnap.data()), { id: docSnap.id }));
                        return [2 /*return*/, { data: data }];
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        Promise.reject(error_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FirestoreDatabase.prototype.updateData = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var ref, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!(args.id && args.resource)) return [3 /*break*/, 2];
                        ref = this.getDocRef(args.resource, args.id);
                        return [4 /*yield*/, (0, firestore_1.updateDoc)(ref, this.requestPayloadFactory(args.resource, args.variables))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, { data: args.variables }];
                    case 3:
                        error_7 = _a.sent();
                        Promise.reject(error_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FirestoreDatabase.prototype.updateManyData = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    args.ids.forEach(function (id) { return __awaiter(_this, void 0, void 0, function () {
                        var ref;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    ref = this.getDocRef(args.resource, id);
                                    return [4 /*yield*/, (0, firestore_1.updateDoc)(ref, this.requestPayloadFactory(args.resource, args.variables))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                catch (error) {
                    Promise.reject(error);
                }
                return [2 /*return*/];
            });
        });
    };
    return FirestoreDatabase;
}(Database_1.BaseDatabase));
exports.FirestoreDatabase = FirestoreDatabase;
function getFilterOperator(operator) {
    switch (operator) {
        case "lt":
            return "<";
        case "lte":
            return "<=";
        case "gt":
            return ">";
        case "gte":
            return ">=";
        case "eq":
            return "==";
        case "ne":
            return "!=";
        case "nin":
            return "not-in";
        case "in":
        default:
            return "in";
    }
}
