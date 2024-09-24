const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // If you need SSL (common with cloud providers)
    }
  }
});

// const sequelize = new Sequelize("quiz_db", "quiz_db_owner", "xObIVEaZDd39", {
//   host: "ep-calm-cake-a56tbi0g.us-east-2.aws.neon.tech",
//   port: 5432,
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   },
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,  // 30 seconds
//     idle: 10000
//   }
// });


sequelize.authenticate()
  .then(() => console.log('Connected to Neon DB'))
  .catch((err) => console.error('Unable to connect to DB:', err));

module.exports = sequelize;



// const { Sequelize } = require('sequelize');
// const config = require('../config/config.js')['development'];

// // const sequelize = new Sequelize(
// //   config.database, 
// //   config.username, 
// //   config.password, {
// //   host: config.host,
// //   port: 5432,
// //   dialect: config.dialect,
// // });

// const sequelize = new Sequelize(
//   "quiz_db", 
//   "quiz_db_owner", 
//   "xObIVEaZDd39", {
//   host: "ep-calm-cake-a56tbi0g.us-east-2.aws.neon.tech",
//   port: 5432,
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false // If you need SSL (common with cloud providers)
//     }
//   }
// });


// // const sequelize = new Sequelize(
// //   "quiz_db", 
// //   "yohanns", 
// //   "809080901", {
// //   host: "localhost",
// //   port: 5432,
// //   dialect: "postgres",
// // });

// // Test the connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection to the database has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// module.exports = sequelize;
