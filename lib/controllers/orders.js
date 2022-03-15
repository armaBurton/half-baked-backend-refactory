const { Router } = require('express');
const { updateById } = require('../models/Order');
const Order = require('../models/Order');
const pool = require('../utils/pool');


const order = new Order({ product: 'Widget', quantity: 1 });

module.exports = Router()
  .post('/', async (req, res) => {
    const order = await Order.insert({ ...req.body });

    console.log('|| order >', order);
    res.json(order);
  })

  .get('/:id', async (req, res) => {
    const order = { ...req.body };
    await Order.insert(order);
    // const { id } = req.params;
    const getOrderById = await Order.getById(req.params.id);
    res.json(getOrderById);
  })

  .get('/', async (req, res) => {
    const order = { ...req.body };
    await Order.insert(order);
    const getAllOrders = await Order.getAll();
    res.json(getAllOrders);
  })

  .patch('/:id', async (req, res, next) => {
    // await Order.insert({
    //   product: 'Widget',
    //   quantity: 1,
    // });

    try {
      const { id } = req.params;

      const getOrder = await Order.getById(id);

      if (!getOrder) {
        const error = new Error(`Order ${id} not found`);
        error.status = 404;
        throw error;
      }

      const product = req.body.product ?? getOrder.product;
      const quantity = req.body.quantity ?? getOrder.quantity;

      const updateOrder = await Order.updateById(id, { product, quantity });
      const spreadOrder = { ...updateOrder };

      res.send(spreadOrder);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {

    const { id } = req.params;

    const order = await Order.deleteById(id);
    console.log(`|| order >`, order);
    res.json(order);
  });
