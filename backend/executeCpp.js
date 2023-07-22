const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "/outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

exports.executeCpp = async (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outpath = path.join(outputPath, `/${jobId}.out`);
  return new Promise((resolve, reject) => {
    exec( 
      `g++ ${filepath} -o ${outpath} && cd ${outputPath} && ./${jobId}.out`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr );
        resolve(stdout );
      }
    );
  });
};
