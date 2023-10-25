const path = require("path");
const githubLabelSync = require("github-label-sync");
const readline = require("readline");
const ciqlJson = require(`ciql-json`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sourceOption = {
  repo: undefined,
  accessToken: undefined,
  labels: [],
  dryRun: true,
};

const targetOption = {
  repo: undefined,
  accessToken: undefined,
  labels: [],
};

const createLabel = async (answer) => {
  if (answer === "y" || answer === "Y") {
    const labelFile = path.resolve(__dirname + "/github-labels.json");
    ciqlJson.create(targetOption.labels).save(labelFile);
    console.log("Create!!");
  }
  rl.close();
};

const setGitLabel = async () => {
  try {
    // GET
    await githubLabelSync(sourceOption).then((diff) => {
      targetOption.labels = diff.map((label) => label.actual);
    });
    // SET
    await githubLabelSync(sourceOption);
    // create file
    rl.question("github-labels.json을 생성하시겠습니까? (y/n)", createLabel);
  } catch (error) {
    console.error(error);
    rl.close();
  }
};

const init = async () => {
  rl.question(
    "'가져올' 레포지토리 [계정명/저장소 이름]을 입력해주세요: ",
    (repo) => {
      sourceOption.repo = repo;
      rl.question(
        "'업데이트' 할 레포지토리 [계정명/저장소 이름]을 입력해주세요: ",
        (repo) => {
          targetOption.repo = repo;
          rl.question("[엑세스토큰]을 입력해주세요: ", (token) => {
            sourceOption.accessToken = token;
            targetOption.accessToken = token;
            setGitLabel();
          });
        }
      );
    }
  );
};

init();
