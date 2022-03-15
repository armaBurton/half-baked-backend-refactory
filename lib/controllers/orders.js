const { Router } = require('express');
const { updateById } = require('../models/Order');
const Order = require('../models/Order');
const pool = require('../utils/pool');

// const order = new Order({ product: 'Widget', quantity: 1 });

module.exports = Router()
  .post('/', async (req, res) => {
    const order = { ...req.body };
    const insertOrder = await Order.insert(order);
    res.json(insertOrder);
  })

  .get('/:id', async (req, res) => {
    const order = { ...req.body };
    await Order.insert(order);
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
    await Order.insert({
      product: 'Widget',
      quantity: 1,
    });

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
    const { rows } = await pool.query(
      'DELETE FROM orders WHERE id=$1 RETURNING *;',
      [req.params.id]
    );

    if (!rows[0]) return null;
    const order = new Order(rows[0]);

    res.json(order);
  });
