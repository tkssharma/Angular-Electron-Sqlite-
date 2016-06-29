
var  fs = require("fs");
var sqlite3 = require("sqlite3").verbose();
var file = "test1.db";

angular.module("formApp").factory("daoService",daoService);

function daoService(){

    function generateRandomUsers () {

        var SEX = ['Male','Female'];
        var RELIGION = ['Christian','Jewish','Other'];
        var FEMALE_NAMES = ['Susan','Cindy','Ally','Brianne','Kristen','Hillary'];
        var MALE_NAMES = ['Brad','John','Jeff','Chris','Ted','Doug','Jordan'];
        var LAST_NAMES = ['Aames','Carruthers','Evans','Fredricks','Hamson','Jones','Richards','Sachs'];

        var users = [];

        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        for (var i = 0; i < 300; i++) {
            var age = getRandomArbitrary(20,51);

            var gender = SEX[getRandomArbitrary(0,SEX.length)];

            var religion = RELIGION[getRandomArbitrary(0,RELIGION.length)];
            var firstName = gender === 'Male' 
            ? MALE_NAMES[getRandomArbitrary(0,MALE_NAMES.length)] 
            : FEMALE_NAMES[getRandomArbitrary(0,FEMALE_NAMES.length)] 
            var lastName = LAST_NAMES[getRandomArbitrary(0,LAST_NAMES.length)];

            var number = getRandomArbitrary(1,6);
            var fileBase = gender === 'Male' ? 'man' : 'girl';
            var avatarImage = `images/${fileBase}${number}.png`;

            users.push({
                userId:'neverguessthis@foo.bar',
            password:'sha1$835a8459$1$23c596cbae62d7fa79b7f37d4c90fb8f963a8cfb', // 'asdf'
            firstName,
            lastName,
            gender,
            age,
            religion,
            avatarImage,
            minPreferredAge:age,
            maxPreferredAge:age,
            preferredReligion:religion,
            preferredGender:gender
        });
        }    

        return users;
    }

    function createNewUser(){
       return new Promise( function (resolve,reject) {

         var exists = fs.existsSync(file);
         var db = new sqlite3.Database(file);

         if (exists) {
          return process.nextTick(() => resolve());
      } else {
          console.log("Creating DB file.");
          fs.openSync(file, "w");
      }

      db.serialize(function() {

          var createTableSql = 
          `create table user(
          id INTEGER PRIMARY KEY,
          user_id TEXT,
          password TEXT,
          first_name TEXT,
          last_name TEXT,
          gender TEXT,
          age INTEGER,
          religion TEXT,
          avatar_image TEXT,
          min_preferred_age INTEGER,
          max_preferred_age INTEGER,
          preferred_religion TEXT,
          preferred_gender TEXT
          )`;

          db.run(createTableSql); 
          
          var insertRowSql = 
          `INSERT INTO user 
          VALUES(
          ?,?,?,?,?,?,
          ?,?,?,?,?,?,?
          )`;

          var stmt = db.prepare(insertRowSql); 
          
          var users = generateRandomUsers();

          users.forEach(function(user){

              stmt.run(null,
                user.userId,
                user.password,
                user.firstName,
                user.lastName,
                user.gender,
                user.age,
                user.religion,
                user.avatarImage,
                user.minPreferredAge,
                user.maxPreferredAge,
                user.preferredReligion,
                user.preferredGender
                );

          });
          stmt.finalize();

              //
              // Debug, dump the newly created fake users.
              //
              db.each("SELECT * FROM user", function(err, row) {
               console.log(row.id + ": " + row.first_name + ' ' + row.last_name);
           });

              //
              // Hack. Only way I could think of (without wasting time) to be able to call "resolve" at the right time.
              //
              db.each("SELECT * from user LIMIT 1", function(err, row) {
               resolve();
           });
          });

      db.close();
  }); 
   }

   function getUser(usrid){
     return new Promise( function (resolve,reject) {
         var db = new sqlite3.Database(file);

         var sql = 
         `SELECT * FROM user 
         WHERE user_id="${usrid}"
         LIMIT 1`;
 
         db.all(sql,function(err,rows) {
          if (err) {
           reject(err);
       } else {
           resolve(rows.length > 0 ? rows[0] : null);
       }
   });

         db.close();
     });
 }
    function deleteUser(usrid){
     return new Promise( function (resolve,reject) {
         var db = new sqlite3.Database(file);

         var sql = 
         `DELETE * FROM user 
         WHERE user_id="${usrid}"`;
 
         db.all(sql,function(err,rows) {
          if (err) {
           reject(err);
       } else {
           resolve(rows.length > 0 ? rows[0] : null);
       }
   });

         db.close();
     });
 }
 function getUserById(id){
     return new Promise( function (resolve,reject) {
         var db = new sqlite3.Database(file);

         var sql = 
         `SELECT * FROM user 
         WHERE id="${id}"
         LIMIT 1`;

         db.all(sql,function(err,rows) {
          if (err) {
           reject(err);
       } else {
           resolve(rows.length > 0 ? rows[0] : null);
       }
   });

         db.close();
     });
 }

 return {
    createNewUser : createNewUser,
    getUser :  getUser,
    getUserById : getUserById,
    deleteUser : deleteUser
 }
}

