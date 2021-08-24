// const { db, Puzzle } = require("./index");
// const Sequelize = require("sequelize");

// const localDB = new Sequelize(`postgres://localhost:5432/past-sb-data`, {
//   logging: false,
//   dialect: "postgres",
//   protocol: "postgres",
//   //   ssl: process.env.DATABASE_URL,
//   //   dialectOptions: {
//   //     ssl: process.env.DATABASE_URL && {
//   //       rejectUnauthorized: false,
//   //       require: true,
//   //     },
//   //   },
// });

// const OldPuzzles = localDB.define("puzzle", {
//   answers: Sequelize.ARRAY(Sequelize.STRING),
//   displayDate: { type: Sequelize.STRING, primaryKey: true },
//   validLetters: Sequelize.ARRAY(Sequelize.CHAR),
//   centerLetter: Sequelize.CHAR,
//   outerLetters: Sequelize.ARRAY(Sequelize.CHAR),
//   pangrams: Sequelize.ARRAY(Sequelize.STRING),
//   printDate: Sequelize.STRING,
// });

// const init = async () => {
//   try {
//     // localDB.authenticate().then(() => console.log(localDB));
//     const all = await OldPuzzles.findAll();

//     all.forEach(async (p) => {
//       Puzzle.create({ ...p.dataValues, nytId: null }).catch((err) =>
//         console.log(err)
//       );
//       //   console.log(p.dataValues);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// init();
