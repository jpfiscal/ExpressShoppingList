const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError")
const items = require("./fakeDb");

//get list of all shopping items
router.get("/", (req, res) => {
    console.log(res.json(items));
    return res.json({items});
});

//get a specified item in shopping cart
router.get("/:name", (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (foundItem == undefined){
        throw new ExpressError("Item not found", 404);
    }
    res.json({item: foundItem});
});

//modify a single item's name and/or price
router.patch("/:name", (req,res)=>{
    const foundItem = items.find(item => item.name === req.params.name);
    if (foundItem == undefined){
        throw new ExpressError("Item not found", 404);
    }
    foundItem.name = req.body.name;
    foundItem.price = req.body.price;
    res.json({updated: foundItem});
})

//delete an item requested by the user if it exists in the shopping cart
router.delete("/:name", (req,res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (foundItem == undefined){
        throw new ExpressError("Item not found", 404);
    }
    items.splice(foundItem, 1);
    res.json({message: "Deleted"});
})

//add a list item to shopping cart in fakeDB
router.post('/', (req,res,next)=>{
    try{
        const newItem = req.body;
        console.log(`newItem: ${JSON.stringify(newItem)}`); //REMOVE LATER
        items.push(newItem);
        console.log(`fakeDb: ${JSON.stringify(items)}`); // REMOVE LATER
        return res.status(201).json({item:newItem});
    }catch (e){
        return next(e);
    }
});
module.exports = router;