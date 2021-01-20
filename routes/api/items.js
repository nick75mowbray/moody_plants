const express = require("express");
const router = express.Router();

// item model
const Item = require('../../models/item');

router.get('/', (req, res)=> {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});


module.exports = router;
