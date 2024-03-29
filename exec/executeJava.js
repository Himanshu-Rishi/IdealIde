import fs from "fs";
import { execFileSync, execSync } from "child_process";

const executeJava = (code, input) => {
  var pre, output;
  try {
    fs.writeFileSync("./operations/files/main.java", code);
  } catch (err) {
    return err.toString();
  }
  try {
    execSync("javac ./operations/files/main.java");
    execSync(
      "mv ./operations/files/main.class ./operations/binaries/main.class"
    );
  } catch (err) {
    return err.toString();
  }
  try {
    output = execFileSync("java", ["-cp", "./operations/binaries", "main"], {
      input: input,
      timeout: 5000,
      encoding: "utf-8",
    });
  } catch (err) {
    return err.toString();
  }
  return output;
};

export default executeJava;
