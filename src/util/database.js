const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense_tracker','root','Salman@121',{
    dialect : 'mysql',
    host : 'localhost',
    //logging : false
})

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;