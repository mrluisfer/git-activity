const simpleGit = require("simple-git");
const fs = require("fs");
const dayjs = require("dayjs");

const totalDays = 366; // Days past to generate commits
const commitFreq = 10; // Commits per day
const variability = false; // Variability in commits per day
const repoLink = "git@github.com:mrLuisFer/test.git"; // Repository link

const git = simpleGit();
const now = dayjs();
let pointer = 0; // Days pointer
let ctr = 1; // Commit counter

(async () => {
  try {
    console.log("Inicializando repositorio...");
    await git.init();
    await git.addRemote("origin", repoLink);

    // Loop to generate commits
    for (let tl = totalDays; tl > 0; tl--) {
      let commitsToday = variability
        ? Math.floor(Math.random() * (commitFreq + 1))
        : commitFreq;

      while (commitsToday > 0) {
        const commitDate = now.subtract(pointer, "days").format("YYYY-MM-DD");
        const commitMessage = `Commit ${ctr} on ${commitDate}`;

        fs.appendFileSync("commit.txt", `${commitMessage}\n`);

        // Commit with the custom date
        console.log(`Haciendo commit ${ctr} en la fecha ${commitDate}`);
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
    console.log("Pushing commits al repositorio...");
    await git.branch(["-M", "main"]);
    await git.push(["-u", "origin", "main", "-f"]);
    console.log("¡Commits enviados exitosamente!");
  } catch (error) {
    console.error("Error:", error);
  }
})();
