const MEAL = require('../model/meals');

const mealData = require('../data/mealData.json');
const connecteDB = require('../helper/connectDB');

const dbPath = 'mongodb://127.0.0.1:27017/FoodDB';

const pushJsonData = async (data, model) => {
  await model.insertMany(data);
};

const deleteAllData = async (model) => {
  await model.deleteMany();
};

const addAllData = async () => {
  try {
    await pushJsonData(mealData, MEAL);
    console.log('success added  Data');
  } catch (error) {
    console.log(`Error in sending Data ${error}`);
    process.exit(1);
  }
};

const removeAllData = async () => {
  try {
    await deleteAllData(MEAL);
    console.log('success Deleted  Data');
  } catch (error) {
    console.log(`Error in deleting Data ${error}`);
    process.exit(1);
  }
};

const main = async () => {
  const operation = process.argv[2];
  try {
    if (operation === 'add') {
      await connecteDB(dbPath);
      await addAllData();
    } else if (operation === 'delete') {
      await connecteDB(dbPath);
      await removeAllData();
    } else console.log('Plz Enter Valid Operation');
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

main();
