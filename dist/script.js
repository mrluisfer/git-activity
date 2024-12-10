"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const simpleGit = require("simple-git");
// const fs = require("fs");
// const dayjs = require("dayjs");
const simple_git_1 = __importDefault(require("simple-git"));
const fs = __importStar(require("fs"));
// @ts-ignore
const dayjs = require("dayjs");
// @ts-ignore
const chalk = require("chalk");
const totalDays = 366; // Days past to generate commits
const commitFreq = 10; // Commits per day
const variability = false; // Variability in commits per day
const repoLink = "git@github.com:mrLuisFer/test.git"; // Repository link
const git = (0, simple_git_1.default)();
const now = dayjs();
let pointer = 0; // Days pointer
let ctr = 1; // Commit counter
function log(title, color) {
    console.log(color(`\n${title}`));
}
(async () => {
    try {
        log("Initializing repository...", chalk.green);
        const { existing } = await git.init();
        if (!existing) {
            await git.addRemote("origin", repoLink);
        }
        // Loop to generate commits
        for (let tl = totalDays; tl > 0; tl--) {
            let commitsToday = variability
                ? Math.floor(Math.random() * (commitFreq + 1))
                : commitFreq;
            log(`Generating ${commitsToday} commits for ${now
                .subtract(pointer, "days")
                .format("YYYY-MM-DD")}`, chalk.yellow);
            while (commitsToday > 0) {
                const commitDate = now.subtract(pointer, "days").format("YYYY-MM-DD");
                const commitMessage = `Commit ${ctr} on ${commitDate}`;
                fs.appendFileSync("commit.txt", `${commitMessage}\n`);
                // Commit with the custom date
                log(`Commit ${ctr} on ${commitDate}`, chalk.blue);
                await git.add(".");
                await git.commit(commitMessage, {
                    "--date": `${commitDate}T12:15:10`,
                });
                commitsToday--;
                ctr++;
            }
            pointer++;
        }
        // Push changes
        log("Pushing commits to the repository...", chalk.blue);
        await git.branch(["-M", "main"]);
        await git.push(["-u", "origin", "main", "-f"]);
        log("Commits sent successfully!", chalk.green);
    }
    catch (error) {
        log(`An error occurred: ${error}`, chalk.red);
    }
})();
//# sourceMappingURL=script.js.map