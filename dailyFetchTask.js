const { fetchPuzzleData } = require("./index");

const doTask = async () => {
  console.log("fetching today's data");
  await fetchPuzzleData();
};

doTask();
