const { Pool } = require('pg')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const pool = new Pool({
  user: 'userdb',
  host: 'localhost',
  database: 'userdb',
  password: 'userdb',
  port: 5432,
})

pool.query(`
      CREATE TABLE IF NOT EXISTS"userregistrationdetails" (
                "id" SERIAL,
                PRIMARY KEY ("id"),
                "username" VARCHAR,
                "email"  VARCHAR,
                "password" VARCHAR,
                "mobile" INTEGER,
                "address" VARCHAR
      );`);



        let users = [];


        app.use(cors());


      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());

      app.post('/user', (req, res) => {
        console.log(req.body)
        const user_detail = req.body;
        console.log(user_detail);
        users.push(user_detail)
        data = user_detail
        dict = Object.values(data)
        console.log("datatttt", dict)
        // id = "1"
        uname = dict[0]
        email = dict[1]
        

        try{
            const text = 'INSERT INTO userlogindetails( name, email,password,mobile,address) VALUES( $1, $2, $3, $4, $5) RETURNING *'
          const values = [uname, email,password,mobile,address]
          pool.query(text, values);
        }

        catch(err){
          console.log(err.messages)
        }


        res.send({ 'name':uname, 'email':email, 'password':password, 'mobile':mobile, 'address':address});
      });

      app.get('/user', (req, res) => {
             res.json(users);
             console.log(json.dumps({"data": users}))

      });

      app.listen(port,()=> console.log('hello world app listening on port ${port}!'));



      