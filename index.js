const express = require("express");
const app = express();
const PORT = process.env.PORT || 4747;

const requestPromise = require("request-promise");
const cheerio = require("cheerio");
const url = "https://www.nytimes.com/puzzles/spelling-bee";

const cron = require("node-cron");

const dbName =
  process.env.DATABASE_URL || `postgres://localhost:5432/spelling-bee-data`;

const Sequelize = require("sequelize");
const db = new Sequelize(dbName, {
  logging: false,
  //   ssl: true,
  //   dialectOptions: {
  //     ssl: true,
  //   },
});

const Puzzle = db.define("puzzle", {
  displayDate: Sequelize.STRING,
  printDate: { type: Sequelize.STRING, primaryKey: true },
  centerLetter: Sequelize.CHAR,
  outerLetters: Sequelize.ARRAY(Sequelize.CHAR),
  validLetters: Sequelize.ARRAY(Sequelize.CHAR),
  pangrams: Sequelize.ARRAY(Sequelize.STRING),
  answers: Sequelize.ARRAY(Sequelize.STRING),
  nytId: Sequelize.INTEGER,
});

// current date, month, and year
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2),
  month = ("0" + (date_ob.getMonth() + 1)).slice(-2),
  year = date_ob.getFullYear();

const isValidDate = (dateString) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateString;
};

const fetchPuzzleData = async () => {
  requestPromise(url)
    .then((html) => {
      const $ = cheerio.load(html);
      const letterList = $("div .pz-game-screen");
      const elem = $(letterList).find("script");

      const beeData = JSON.parse(
        $(elem).contents().text().replace("window.gameData = ", "")
      );

      return beeData;
    })
    .then(async (beeData) => {
      await Puzzle.findOrCreate({
        // date in YYYY-MM-DD format
        where: { printDate: year + "-" + month + "-" + date },
        defaults: {
          ...beeData.today,
          nytId: beeData.today.id,
        },
      });
      //   Puzzle.create({ ...beeData.yesterday, nytId: beeData.yesterday.id });
    })
    .catch((err) => console.log(err));
};

app.get("/", (req, res, next) => {
  res.send('Visit "/{YYYY-MM-DD}" for that day\'s spelling bee data!');
});

app.get("/:date", async (req, res, next) => {
  const date = req.params.date;

  try {
    if (isValidDate(date)) {
      const beeData = await Puzzle.findByPk(date);

      if (beeData) {
        res.send(beeData);
      } else {
        res.send("data not available for that day");
      }
    } else {
      res.send('Please enter a date in "YYYY-MM-DD" format.');
    }
  } catch (err) {
    next(err);
  }
});

app.get("*", (err, req, res, next) => {
  console.log(err);
  res.send(err.message);
});

const init = async () => {
  await db.sync();
  //   fetchPuzzleData();
  const job = cron.schedule("0 3 * * *", () => fetchPuzzleData());

  const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  //   setTimeout(() => {
  //     server.close(() => {
  //       console.log("server shutting down");
  //       job.stop();
  //     });
  //   }, 5000);
};

init();
