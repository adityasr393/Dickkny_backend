const Cart = require("../Schema/cart");

exports.addTocart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    // Check if user already has a cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If user doesn't have a cart, create a new one
      cart = new Cart({ userId, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(item => item.productId.equals(productId));

    if (existingItem) {
      // If the item exists, update its quantity
      existingItem.quantity += quantity;
    } else {
      // If the item doesn't exist, add it to the cart
      cart.items.push({ productId, quantity });
    }

    // Save the cart
    await cart.save();

    res.json({ message: 'Item added to cart successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  exports.getCartOfUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
  
    exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const itemIndex = cart.items.findIndex(
      (item) => String(item.productId) === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cart.items.find(
      (item) => String(item.productId) === productId
    );
    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

