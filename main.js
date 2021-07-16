const mongoose = require ("mongoose")
const Schema = mongoose.Schema;

// Connecting to DATABASE

const dbURI = "mongodb+srv://hamzatoukabri:02091994@cluster0.ip7oe.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose.connect(
    dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) throw err;
        console.log("connected successfuly");
    }
);

// Create Schema

const personSchema = new Schema(
    {
        name: {
            type: "string",
            required: true,
        },
        age: "number",
        favouriteFoods: ["string"],
    },
    { timestamps: true }
);

const pers = mongoose.model("pers", personSchema);

// Create and Save a Record of a Model

 const newPerson = new pers({
     name :"Hamza",
    age : 26,
    favouriteFoods : ['Spaghetti', 'Kafteji']
 });
 newPerson.save((err, persons)=>{
    if (err) throw err
    console.log(persons)
 })

// Create Many Records with model.create()

 pers.create([
     { name: "Mondher", age: 60, favouriteFoods: ["Loubya", "Khodhra"] },
     { name: "Baya", age: 22,favouriteFoods: ["Pizza", "Cheesecake"] },
     { name: "Ayoub", age: 29, favouriteFoods: ["Mloukheya", "SlataMechouia"] },
     { name: "Thouraya", age: 57, favouriteFoods: ["Coscous", "Tajin"] },
 ]);

 pers.create({
     name: "Mary",
     age: 18,
     favouriteFoods: ["SaladeCesar", "Saumon"],
 });

// Use model.find() to Search Your Database


 pers.find({ name: "Ayoub" }, function (err, persons) {
   if (err) throw err;
   console.log(persons);
 });



//  Use model.findOne() to Return a Single Matching Document from Your Database

 pers.findOne({ favoriteFoods: "Spaghetti" }, function (err, persons) {
    if (err) throw err;
    console.log(persons);
     });


// Use model.findById() to Search Your Database By _id


 let personId = "60f1a85d54ac9f2c20ff76a4";

 pers.findById({ _id: personId }, function (err, persons) {
     if (err) throw err;
     console.log(persons);
 })

// Perform Classic Updates by Running Find, Edit, then Save

 let bayaId = "60f1a94940800c17305b4c6d";
 pers.findByIdAndUpdate(
     bayaId,
     { $push: { favouriteFoods: "Humberger" } },
     function (err, persons) {
         if (err) throw err;
         console.log(persons);
     }
 )

// Perform New Updates on a Document Using model.findOneAndUpdate()

     pers.findOneAndUpdate({name: "Thouraya"}, {$set:{age : 20}}, {new : true}, function (err){
     if (err) throw err;
     console.log("Thouraya was aged 20")
 })


// Delete One Document Using model.findByIdAndRemove
  let mondherID = "60f1a94940800c17305b4c6c";

 pers.findByIdAndRemove(mondherID, function (err){
     if (err) throw err;
     console.log("Mondher was removed")
 })

// Delete Many Documents with model.remove()

 pers.remove({name: "Mary"}, function (err){
     if (err) throw err;
     console.log("Mary was deleted")
 })

// Chain Search Query Helpers to Narrow Search Results

var queryChain = function (done) {
    var likedfood = "burritos";
    pers.find({ favoriteFoods: likedfood })
      .sort({ name: 1 })
      .limit(2)
      .select("-age")
      .exec((err, data) => {
        if (err) throw (err);
        console.log(data);
      });
  };