"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
// const simpleGit = require("simple-git");
// const fs = require("fs");
// const dayjs = require("dayjs");
var simple_git_1 = require("simple-git");
var fs = require("fs");
var chalk = require("chalk");
// @ts-ignore
var dayjs = require("dayjs");
var totalDays = 366; // Days past to generate commits
var commitFreq = 10; // Commits per day
var variability = false; // Variability in commits per day
var repoLink = "git@github.com:mrLuisFer/test.git"; // Repository link
var git = (0, simple_git_1.default)();
var now = dayjs();
var pointer = 0; // Days pointer
var ctr = 1; // Commit counter
function log(title, color) {
    console.log(color("\n".concat(title)));
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var existing, tl, commitsToday, commitDate, commitMessage, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 13, , 14]);
                log("Initializing repository...", chalk.green);
                return [4 /*yield*/, git.init()];
            case 1:
                existing = (_a.sent()).existing;
                if (!!existing) return [3 /*break*/, 3];
                return [4 /*yield*/, git.addRemote("origin", repoLink)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                tl = totalDays;
                _a.label = 4;
            case 4:
                if (!(tl > 0)) return [3 /*break*/, 10];
                commitsToday = variability
                    ? Math.floor(Math.random() * (commitFreq + 1))
                    : commitFreq;
                log("Generating ".concat(commitsToday, " commits for ").concat(now
                    .subtract(pointer, "days")
                    .format("YYYY-MM-DD")), chalk.yellow);
                _a.label = 5;
            case 5:
                if (!(commitsToday > 0)) return [3 /*break*/, 8];
                commitDate = now.subtract(pointer, "days").format("YYYY-MM-DD");
                commitMessage = "Commit ".concat(ctr, " on ").concat(commitDate);
                fs.appendFileSync("commit.txt", "".concat(commitMessage, "\n"));
                // Commit with the custom date
                log("Commit ".concat(ctr, " on ").concat(commitDate), chalk.blue);
                return [4 /*yield*/, git.add(".")];
            case 6:
                _a.sent();
                return [4 /*yield*/, git.commit(commitMessage, {
                        "--date": "".concat(commitDate, "T12:15:10"),
                    })];
            case 7:
                _a.sent();
                commitsToday--;
                ctr++;
                return [3 /*break*/, 5];
            case 8:
                pointer++;
                _a.label = 9;
            case 9:
                tl--;
                return [3 /*break*/, 4];
            case 10:
                // Push changes
                log("Pushing commits to the repository...", chalk.blue);
                return [4 /*yield*/, git.branch(["-M", "main"])];
            case 11:
                _a.sent();
                return [4 /*yield*/, git.push(["-u", "origin", "main", "-f"])];
            case 12:
                _a.sent();
                log("Commits sent successfully!", chalk.green);
                return [3 /*break*/, 14];
            case 13:
                error_1 = _a.sent();
                log("An error occurred: ".concat(error_1), chalk.red);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); })();
