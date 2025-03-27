// const simpleGit = require("simple-git");
// const fs = require("fs");
// const dayjs = require("dayjs");
import simpleGit from "simple-git";
import * as fs from "node:fs";
// @ts-ignore
import dayjs = require("dayjs");
// @ts-ignore
import chalk = require("chalk");

const totalDays = 10; // Days past to generate commits
const commitFreq = 5; // Commits per day
const variability = false; // Variability in commits per day
const repoLink = "git@github.com:mrLuisFer/test.git"; // Repository link

const git = simpleGit();
const now = dayjs();
let pointer = 0; // Days pointer
let ctr = 1; // Commit counter

function log(title: string, color: (s: string) => string) {
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

      log(
        `Generating ${commitsToday} commits for ${now
          .subtract(pointer, "days")
          .format("YYYY-MM-DD")}`,
        chalk.yellow
      );
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
  } catch (error) {
    log(`An error occurred: ${error}`, chalk.red);
  }
})();
