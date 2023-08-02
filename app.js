const express = require("express")
const dotenv = require("dotenv");
const cors = require("cors");
const runroutes = require("./routes/code/runRoutes");
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

connectToDb();

app.use('/api/run', runroutes);

app.get('/', (req, res)=>
{
    res.send("Ideal Ide is running...")
})

app.listen(process.env.PORT, ()=>
{
    console.log(`Server is running at port http://localhost:${process.env.PORT}`);
})