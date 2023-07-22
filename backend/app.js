const express = require("express")
const dotenv = require("dotenv");
const cors = require("cors");
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");
const { connectToDb } = require("./db/connect");
const Job = require("./models/Job")
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
dotenv.config();

connectToDb();

app.get('/', (req, res)=>
{
    res.send("Ideal Ide is running...")
})

app.post('/', async(req, res)=>
{
    const {language = "cpp", code } = req.body;
    if(code == undefined)
    {
        res.status(400).json({success: false, error: "Code is empty..!"})
    }
    let job;
    try {
      // generate file
      const filePath = await generateFile(language, code);

      // store file in database
      job = await new Job({language, filePath}).save();
      const jobId = job["_id"];

      // executing the file 
      let output;
      job["startedAt"] = new Date();
      if(language == "cpp")
      {
        output = await executeCpp(filePath);
      }
      else if (language == "py") {
        output = await executePy(filePath);
      }
      job["completedAt"] = new Date();
      job["status"] = "success";
      job["output"] = output;
      await job.save();
      return res.status(200).json({jobId, filePath, output });
    } catch (error) {
      job["completedAt"] = new Date();
      job["status"] = "error";
      job["output"] = JSON.stringify(error);
      await job.save();
      res.status(500).json({error})
    }
})


app.get("/status", async (req, res) => {
  const jobId = req.query.id;

  if (jobId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }

  const job = await Job.findById(jobId);

  if (job === undefined) {
    return res.status(400).json({ success: false, error: "couldn't find job" });
  }

  return res.status(200).json({ success: true, job });
});

app.listen(process.env.PORT, ()=>
{
    console.log(`Server is running at port http://localhost:${process.env.PORT}`);
})