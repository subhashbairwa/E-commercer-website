import userModel from '../models/userModel.js'

// Add product to user cart
const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId; // ✅ FIXED here
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update user cart
const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const userId = req.userID;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        if (cartData[itemId]) {
            if (quantity === 0) {
                // Remove the size if quantity is 0
                delete cartData[itemId][size];
                // If no sizes left, remove the product id
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            } else {
                cartData[itemId][size] = quantity;
            }

            // Clean up: Remove any product ids with empty objects or only __v field
            for (const id in cartData) {
                const sizes = Object.keys(cartData[id]);
                if (
                    sizes.length === 0 ||
                    (sizes.length === 1 && sizes[0] === "__v")
                ) {
                    delete cartData[id];
                }
            }

            await userModel.findByIdAndUpdate(userId, { cartData });
            res.json({ success: true, message: "Cart Updated" });
        } else {
            res.json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get user cart data
const getUserCart = async (req, res) => {
    try {
        const userId = req.userID;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };