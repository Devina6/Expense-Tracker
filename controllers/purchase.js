const Razorpay = require('razorpay');
const Order = require('../models/order');
require('dotenv').config();

exports.purchasepremium = (req,res,next) => {
    try{
        let rzp = new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500;

        rzp.orders.create({amount,currency:"INR"},(err,order) => {
            if(err){
                req.user.createOrder({orderId:order.id,status:'FAILURE'})
                    .then(()=>{
                        throw new Error(JSON.stringify(err));
                    })
                    .catch(err => {
                        throw new Error(err);
                      });
            }
            req.user.createOrder({orderId:order.id,status:'PENDING'})
            .then(()=>{
                return res.json({order,key_id:rzp.key_id});
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => console.log(err))
    }
    catch(err){
        console.log(err);
        res.status(403).json({message:"Something went wrong",error:err})
    }
}

exports.updateTransactionStatus = (req,res,next) => {
    try{
        const{payment_id,order_id} = req.body;
        Order.findOne({where:{orderId:order_id}})
            .then(order => {
                order.update({paymentId:payment_id,status:"SUCCESSFUL"})
                    .then( () => {
                        req.user.update({ispremiumuser:true})
                            .then( () =>{
                                return res.status(202).json({success:true,message:"Transaction Successful"})
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
    catch(err){
        console.log(err);
        res.status(403).json({message:"Something went wrong",error:err})
    }
}
