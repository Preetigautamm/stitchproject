  const { Pool } = require('pg')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const path=require('path')
app.use(express.static(path.join(__dirname,'Temaplates')))
app.use(express.static(path.join(__dirname,'Temaplates/product1_images/webimages/homepageimages')))
console.log(__dirname )
const pool = new Pool({
  user: 'userdb',
  host: 'localhost',
  database: 'userdb',
  password: 'userdb',
  port: 5432,
})

pool.query(`
      CREATE TABLE IF NOT EXISTS"userlogindetails" (
                "id" SERIAL,
                PRIMARY KEY ("id"),
                "name" VARCHAR,
                "email"  VARCHAR
      );`);



        let users = [];


        app.use(cors());


      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());

      app.post('/user', (req, res) => {
      
        const user_detail = req.body;
       
        users.push(user_detail)
        data = user_detail
        dict = Object.values(data)
        console.log("datatttt", dict)
        // id = "1"
        uname = dict[0]
        email = dict[1]
        

        try{
          const text = 'INSERT INTO userlogindetails( name, email) VALUES( $1, $2) RETURNING *'
          const values = [uname, email]
          pool.query(text, values);
        }

        catch(err){
          console.log(err.messages)
        }
        res.sendFile('Temaplates/secondpage.html', { root: __dirname });
      });

      app.get('/user', (req, res) => {
        res.sendFile('secondpage.html', { root: __dirname });
             

      });

      app.listen(port,()=> console.log('hello world app listening on port ${port}!'));



      