const express = require('express');
const { resolve } = require('path');

const app = express();

const port = 3010;

app.use(express.static('static'));

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalPrice = newItemPrice + cartTotal;
  res.send(totalPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let result;
  if (isMember === 'true') {
    let discount = (cartTotal * 10) / 100;
    let netDiscount = cartTotal - discount;
    result = 'Discount is applied ' + netDiscount.toString();
  } else {
    result = 'No! discount is not applied ' + cartTotal.toString();
  }
  res.send(result);
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let discount = (cartTotal * 5) / 100;
  res.send(discount.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shipppingMethod;
  let distance = parseFloat(req.query.distance);
  if (shippingMethod === 'standard') {
    res.send((distance / 50).toString());
  } else {
    res.send((distance / 100).toString());
  }
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let totalCost = weight * distance * 0.1;
  res.send(totalCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
