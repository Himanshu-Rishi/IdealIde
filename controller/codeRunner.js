import asyncHandler from "express-async-handler";
import executeCpp from "../exec/executeCpp";
import executePy from "../exec/executePy";
import executeJs from "../exec/executeJs";
import executeJava from "../exec/executeJava";

const codeController = asyncHandler(async (req, res) => {
  const { code, language, input } = req.body;
  var op;
  switch (language) {
    case "cpp":
      op = executeCpp(code, input);
      break;
    case "py":
      op = ex(code, input);
      break;
    case "js":
      op = executeJs(code, input);
      break;
    case "java":
      op = executeJava(code, input);
      break;
    default:
      return res.status(400);
  }
  return res.send({ op });
});

export default codeController;
