const express = require("express");
const Users = require("../Models/user");
const router = express.Router();
const moment = require("moment");

/* adding a new user */

router.post("/new-user", async (req, res) => {
  try {
    const newUser = new Users({
      userName: req.body.username,
      exercise: [],
    });
    const user = await newUser.save();
    res.json({ username: user.userName, _id: user.id });
  } catch (err) {
    console.error(err);
    res.send("Error occured while creating a new user");
  }
});

/* TO SHOW ALL THE USERS  */

router.get("/users", async (req, res) => {
  let allUsers = []
  try {
    const users = await Users.find({})
    console.log(users);
    allUsers = users.map((user)=>{
      return {
        username :user.userName,
        _id:user._id 
      }
    })
    res.json(allUsers);
    }
  catch {
    res.send("no user found");
  }
});


/* add a exercise */

router.post("/add", async (req, res) => {
  let recDate = req.body.date;
//   // validate Date input
  if (recDate === '') {
     let newDate = Date.now();
     recDate =  moment(newDate).format('YYYY-MM-DD');
   }
  else if (!moment(req.body.date, 'YYYY-MM-DD',true).isValid()) {
     res.json(`${recDate} is an invalid date. Please enter a valid date in the format YYYY-MM-DD`);
     return;
   }
  checkVaidation(req, res); // validating the data
  try {
    const existUser = await Users.findById(req.body.userId);
    const dataObject = {
      description: req.body.description,
      duration: req.body.duration,
      date: recDate,
    };
    existUser.exercise = existUser.exercise.concat([dataObject]);
    await existUser.save();
    res.json({
      _id: existUser.id,
      username: existUser.userName,
      date: recDate,
      duration: req.body.duration,
      description: req.body.description,
    });
  } catch (err) {
    console.error(err);
    res.send("ERROR whie saving the exercise");
  }
});

/* logs */

router.get("/log?:userId", (req, res) => {
  if (req.query == {}) {
    findLogs(req, res); // if from and todate query is not given
  } else {
    findLogs(req, res, true); // if from and todate query is given
  }
});

async function findLogs(req, res, queryValue = false) {
  try {
    const user = await Users.findById(req.query.userId);
    if (queryValue == false) {
      res.json({
        _id: req.query.userId,
        username: user.userName,
        count: user.exercise.length,
        log: user.exercise,
      });
    } else {
      console.log(req.query);
      let results = user.exercise;
      let fromDate = new Date(req.query.from); // from date
      let toDate = new Date(req.query.to); // todate
      let limit = req.query.limit; // limit
      if (isValidDate(toDate)) {
        results = results.filter(
          (item) => item.date >= fromDate && item.date <= toDate
        );
        //check if just from defined
      } else if (isValidDate(fromDate)) {
        results = results.filter((item) => item.date >= fromDate);
      }
      //apply limit if defined and applicable
      if (!isNaN(limit) && results.length > limit) {
        results = results.slice(0, limit);
      }
      res.json({
        _id: req.query.userId,
        username: user.userName,
        count: results.length,
        log: results,
      });
    }
  } catch (err) {
    console.error(err);
    res.send("invlaid uid or date params");
  }
}
/* validate the date */
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

async function checkVaidation(req, res) {
  //userid check
  const user = await Users.findById(req.body.userId).exec();
  if (!user) {
    res.send("userId does not exist"); // checking the user is the database
  }
  const duration = +req.body.duration;
  if (isNaN(duration) || duration == "") {
    res.send("Duration should be a numbers or not be left empty"); // checking the duration is a number
  }
  if (req.body.description == "") {
    res.send("Description should not be left empty"); // checking the duration is a number
  }
  
  
}

module.exports = router;
