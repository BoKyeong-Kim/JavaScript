const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/chat-db";

MongoClient.connect(url, function(err, db){
    if(err) throw err;
    const dbo = db.db("chat-db");
   /* DB 생성
   dbo.createCollection("customers", function(err,res){
       if (err) throw err;
       console.log("Database created!");
       db.close();
   });
   */
    /* 데이터 insert
    var myobj = { name: "school", address: "path way 39" };
        dbo.collection("customers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    */
    
    // customers 데이터 확인
    dbo.collection("customers").find({}).toArray(function(err, result){
        if (err) throw err;
        console.log(result);
        db.close();
    });
    
    /* myquery로 조건을 주어 데이터 삭제
    var myquery = { address: 'Highway 37' };
    dbo.collection("customers").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
    
  });*/
})