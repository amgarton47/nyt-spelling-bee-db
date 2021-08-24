const { fetchPuzzleData, db } = require("./index");

const doTask = async () => {
  try {
    console.log("fetching today's data");
    await db.sync();
    await fetchPuzzleData();
  } catch (err) {
    console.log(err);
  }
};

doTask();
