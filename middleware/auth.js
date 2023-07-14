const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = (req,res,next) => {
    try{
        const token = req.header("Authorizaton");
        const user = jwt.verify(token,'8ytrdfghbvfde34567ytdcvyr57465rtfgjf47gy4557tyfghchgtue4348768fdchgyr5437097ttrfchvr5676865343wdghjf5xdy46tcrs7re4ech6u53tdytr56ehgu');
        User.findByPk(user.userId)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => console.log(err))
    }catch(err){
        console.log(err);
        return res.status(401).json({sucess:false})
    }
}

