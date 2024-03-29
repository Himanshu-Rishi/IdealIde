import fs from "fs";
import { execFileSync, execSync } from "child_process";

const executeCpp = (code, input) => {
  var output;
  try {
    fs.writeFileSync("./operations/files/main.cpp", code);
  } catch (err) {
    return err.toString();
  }
  try {
    execSync("g++ ./operations/files/main.cpp -o ./operations/binaries/main");
  } catch (err) {
    return err.toString();
  }
  try {
    output = execFileSync("./operations/binaries/main", {
      input: input,
      timeout: 5000,
      encoding: "utf-8",
    });
  } catch (err) {
    return err.toString();
  }
  return output;
};

export default executeCpp;