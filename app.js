const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");

const dbconfig = require("./dbconfig");
const userRouter = require("./routes/user");
const schedule = require("node-schedule");
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const job = schedule.scheduleJob("30 18 * * *", async function () {
  //   console.log("The answer to life, the universe, and everything!");
  try {
    const result = await new sql.Request().execute("DailyAchievement_Release");
  } catch (err) {
    throw err;
  }
});
app.use("/api", userRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 8080;
sql.connect(dbconfig, (err) => {
  if (err) {
    throw err;
  }
  app.listen(PORT);
  console.log(`app is running on port ${PORT}`);
});
