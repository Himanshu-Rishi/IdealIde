const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname + "/code");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

exports.generateFile = async (format, code) => {
  const jobId = uuid();
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCodes + `/${filename}`);
  await fs.writeFileSync(filepath, code);
  return filepath;
};
