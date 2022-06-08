const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const apiPort = 5000;
const FoodModel = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Francis:Admin123@crud.a0wy9.mongodb.net/food?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
    }
);

app.post("/insert", async (req, res) => {

    const foodName = req.body.foodName;
    const days = req.body.days;
    
    const food = new FoodModel({ foodName: foodName, daysAte: days });
    
    try {
        await food.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err);
    }

});


app.get("/read", async (req, res) => {

    FoodModel.find({}, (err, result) => {
        if(err){
            res.send(err);
        }

        res.send(result);

    });
});


app.put("/update", async (req, res) => {

    const newFoodName = req.body.newFoodName;
    const id = req.body.id;
    
    
    try {
       await FoodModel.findById(id, (err, updatedFood) => {
           updatedFood.foodName = newFoodName; 
           updatedFood.save();
           res.send("update");
       });
    } catch (err) {
        console.log(err);
    }

});






app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))