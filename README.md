#AngularJS and Electron App

### simple CRUD operation on sqlite 

Electron app :- It's easier than you think
If you can build a website, you can build a desktop app. Electron is a framework for creating native applications with web technologies like JavaScript, HTML, and CSS. It takes care of the hard parts so you can focus on the core of your application.

```
use latest verion of node v5.x use nvm :)
npm install
npm start and see electron desktop app running 

```
Opening data connection to sqlite

```
function connection(){
       return new Promise( function (resolve,reject) {
         var exists = fs.existsSync(file);
         var db = new sqlite3.Database(file);
         if (exists) {
          return process.nextTick(() => resolve());
      } else {
          console.log("Creating DB file.");
          fs.openSync(file, "w");
      }
  }

```
Adding Data using angular form to sqlite file store

```
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
```
sqlite query to Fecth data and return result using promise

```
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
 ```

Contact
====================
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/MARTIN2.png" />](http://gennexttraining.herokuapp.com/)
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/github.png" />](https://github.com/tkssharma)
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/mail.png" />](mailto:tarun.softengg@gmail.com)
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/linkedin.png" />](https://www.linkedin.com/in/tkssharma)
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/twitter.png" />](https://twitter.com/tkssharma)