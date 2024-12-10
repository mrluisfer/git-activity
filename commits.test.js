const simpleGit = require("simple-git");
const fs = require("fs");
const dayjs = require("dayjs");
jest.mock("simple-git");
jest.mock("fs");

const repoLink = "git@github.com:mrLuisFer/test.git";

describe("Git Commit Generator", () => {
  let gitMock;

  beforeEach(() => {
    gitMock = {
      init: jest.fn().mockResolvedValue(),
      addRemote: jest.fn().mockResolvedValue(),
      add: jest.fn().mockResolvedValue(),
      commit: jest.fn().mockResolvedValue(),
      branch: jest.fn().mockResolvedValue(),
      push: jest.fn().mockResolvedValue(),
    };
    simpleGit.mockReturnValue(gitMock);
    fs.appendFileSync.mockClear();
  });

  test("Inicializa el repositorio y configura el remote correctamente", async () => {
    const script = require("./index");

    // Verifica inicialización y configuración del repositorio
    expect(gitMock.init).toHaveBeenCalledTimes(1);
    expect(gitMock.addRemote).toHaveBeenCalledWith("origin", repoLink);
  });

  test("Genera commits con las fechas y mensajes esperados", async () => {
    const now = dayjs("2024-12-07");
    const commitDate = now.subtract(0, "days").format("YYYY-MM-DD");
    const commitMessage = `Commit 36 on ${commitDate}`;

    // Simula un ciclo de commits
    const commitsToday = 1; // Simula un commit
    fs.appendFileSync.mockImplementation((file, content) => {
      expect(file).toBe("commit.txt");
      expect(content).toBe(`${commitMessage}\n`);
    });

    await gitMock.commit(commitMessage, {
      "--date": `${commitDate}T12:15:10`,
    });

    // Validaciones de llamadas
    expect(fs.appendFileSync).toHaveBeenCalledTimes(commitsToday);
    expect(gitMock.add).toHaveBeenCalledTimes(commitsToday);
    expect(gitMock.commit).toHaveBeenCalledWith(commitMessage, {
      "--date": `${commitDate}T12:15:10`,
    });
  });

  test("Empuja los cambios al repositorio correctamente", async () => {
    const script = require("./index");

    // Verifica que el push fue exitoso
    expect(gitMock.branch).toHaveBeenCalledWith(["-M", "main"]);
    expect(gitMock.push).toHaveBeenCalledWith(["-u", "origin", "main", "-f"]);
  });

  test("Maneja errores correctamente", async () => {
    gitMock.push.mockRejectedValue(new Error("Push failed"));

    try {
      const script = require("./index");
    } catch (error) {
      expect(error.message).toBe("Push failed");
    }
  });
});
