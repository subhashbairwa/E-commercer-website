import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus,verifyStripe} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
const orderRouter = express.Router()
import authUser from '../middleware/auth.js'

// admin features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// payment features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// user feature
orderRouter.post('/userorders',authUser, userOrders)

//Verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter
