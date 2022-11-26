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
      CREATE TABLE IF NOT EXISTS"userlogindetails" (
                "id" SERIAL,
                PRIMARY KEY ("id"),
                "name" VARCHAR,
                "email"  VARCHAR
      );`);

      pool.query(`
      CREATE TABLE IF NOT EXISTS "registerdetails" (
                "id" SERIAL,
                PRIMARY KEY ("id"),
                "name" VARCHAR,
                "email"  VARCHAR,
                "password" VARCHAR,
                "mobile"  VARCHAR,
                "address" VARCHAR     
                );`);


         pool.query(`
           CREATE TABLE IF NOT EXISTS "feedbackdetails" (         
                          "id" SERIAL,
                          PRIMARY KEY ("id"),
                          "firstname" VARCHAR,
                          "lastname"  VARCHAR,
                          "email_id" VARCHAR,
                          "message"  VARCHAR
                         
                          );`);
          

                          pool.query(`
                          CREATE TABLE IF NOT EXISTS "productdetails" (         
                                         "id" SERIAL,
                                         PRIMARY KEY ("id"),
                                         "bottomcolor" VARCHAR,
                                         "bottomfabric"  VARCHAR,
                                         "bottomlength" VARCHAR,
                                         "topcolor"  VARCHAR,
                                         "topfabric" VARCHAR,
                                         "toplength" VARCHAR,
                                         "topcolor" VARCHAR,
                                         "dupattafabric"  VARCHAR,
                                         "liningfabric" VARCHAR,
                                        "liningcolor"  VARCHAR,
                                        "sleveetype"  VARCHAR,
                                        "netquantity" VARCHAR,
                                        "pattern" VARCHAR,
                                        "ornamentation" VARCHAR,
                                        "bottomdesign" VARCHAR,
                                        "duppatalength" VARCHAR,
                                        "neck"  VARCHAR,
                                        "sleveelength" VARCHAR,
                                        "ocaasion" VARCHAR,
                                        "print/patterntype" VARCHAR,
                                        "topdesign" VARCHAR,
                                        "toplength" VARCHAR,
                                        "type" VARCHAR,
                                        "otherrequirements" VARCHAR

                                         );`);
                         


        let users = [];
        let user_registration=[];
        let user_feed=[];
        let user_product=[];

        app.use(cors());


      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());
      app.get("/", (req, res) => {
        res.sendFile("C:\Users\Amit Gautam\Desktop\Stitch_Project\Temaplates\Loggin.html");
      });
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
          const text = 'INSERT INTO userlogindetails( name, email) VALUES( $1, $2) RETURNING *'
          const values = [uname, email]
          pool.query(text, values);
        }

        catch(err){
          console.log(err.messages)
        }


        res.send({"Message":"User login successful"});
      });

      app.get('/user', (req, res) => {
             res.json(users);
             console.log(json.dumps({"data": users}))

      });
       
      let user_registrations=[];
      app.post('/user/register', (req, res) => {
        console.log(req.body)
        const registration_detail = req.body;
        console.log(registration_detail,"preeet");
        user_registrations.push(registration_detail)
        console.log("ppppppppppp",user_registrations)
        data =registration_detail;
        dict = Object.values(data)
        console.log("datatttt", dict)
        // id = "1"
        uname = dict[0]
        email = dict[1]
        mobile=dict[2]
        address=dict[3]
        password=dict[4]
        

        try{
          const text = 'INSERT INTO registerdetails( name, email,mobile,address,password) VALUES( $1, $2, $3, $4, $5) RETURNING *'
          const values = [uname, email,mobile,address,password]
          pool.query(text, values);
        }

        catch(err){
          console.log(err.messages)
        }


        res.send({ "Message": "User registration successful"});
      });

      app.get('/user', (req, res) => {
             res.json(users);
             console.log(json.dumps({"Message": "User login successful" }))

      });

      app.get('/user/register', (req, res) => {
        res.json(user_registrations);
        console.log(json.dumps({"Message": "User registration successful"}))

 });
      


      app.listen(port,()=> console.log('hello world app listening on port ${port}!'));

// /////////////////code of product////////////
      let user_feeds=[];
      app.post('/user/feeds', (req, res) => {
        console.log(req.body)
        const feed_detail = req.body;
        console.log(feed_detail,"preeet");
        user_feeds.push(feed_detail)
        console.log("ppppppppppp",user_feeds)
        data =feed_detail;
        dict = Object.values(data)
        console.log("datatttt", dict)
        // id = "1"
        bottomcolor = dict[0]
        bottomfabric = dict[1]
        bottomlength = dict[2]
        topcolor = dict[3]
        topfabric = dict[4]
        toplength = dict[5]
        topcolor = dict[6]
        dupattafabric =  dict[7]
        liningfabric = dict[8]
       liningcolor = dict[9]
       sleveetype =  dict[10]
       netquantity = dict[11]
       pattern = dict[12]
       ornamentation = dict[13]
       bottomdesign = dict[14]
       duppatalength = dict[15]
       neck = dict[16]
       sleveelength = dict[17]
       ocaasion = dict[18]
       printpatterntype = dict[19]
       topdesign = dict[20]
       toplength = dict[21]
       type =dict[22]
       otherrequirements = dict[23]
        console.log(firstname, lastname, email, mname)
        

        try{
          const text = 'INSERT INTO feedbackdetails(firstname, lastname, email_id, message) VALUES( $1, $2, $3, $4) RETURNING *'
          const values = [firstname, lastname, email, mname]
          pool.query(text, values);
        }

        catch(err){
          console.log(err.messages)
        }


        res.send({ "Message": "User feedback successful"});
      });

      app.get('/user', (req, res) => {
             res.json(users);
             console.log(json.dumps({"Message": "User login successful" }))

      });

      app.get('/user/feeds', (req, res) => {
        res.json(user_feeds);
        console.log(json.dumps({"Message": "User Product successful"}))

 });
      

 // /////////////////code of feedback////////////
 let user_products=[];
 app.post('/user/products', (req, res) => {
   console.log(req.body)
   const product_detail = req.body;
   console.log(product_detail,"preeet");
   user_products.push(product_detail)
   console.log("ppppppppppp",user_products)
   data =product_detail;
   dict = Object.values(data)
   console.log("datatttt", dict)
   // id = "1"
   firstname = dict[0]
   lastname = dict[1]
   email=dict[2]
   mname=dict[3]
   console.log(firstname, lastname, email, mname)
   

   try{
     const text = 'INSERT INTO feedbackdetails(firstname, lastname, email_id, message) VALUES( $1, $2, $3, $4) RETURNING *'
     const values = [firstname, lastname, email, mname]
     pool.query(text, values);
   }

   catch(err){
     console.log(err.messages)
   }


   res.send({ "Message": "User products successful"});
 });

 app.get('/user', (req, res) => {
        res.json(users);
        console.log(json.dumps({"Message": "User products successful" }))

 });

 app.get('/user/feeds', (req, res) => {
   res.json(user_products);
   console.log(json.dumps({"Message": "User Product successful"}))

});
 

     







      