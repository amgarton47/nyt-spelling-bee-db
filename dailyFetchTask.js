const { fetchPuzzleData } = require("./index");

const doTask = async () => {
  try {
    console.log("fetching today's data");
    await fetchPuzzleData();
  } catch (err) {
    console.log(err);
  }
};

doTask();
