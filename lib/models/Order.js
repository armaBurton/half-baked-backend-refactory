const pool = require('../utils/pool');

module.exports = class Order {
  id;
  product;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.product = row.product;
    this.quantity = row.quantity;
  }

  static async insert({ product, quantity }) {
    const { rows } = await pool.query(
      `
        INSERT INTO orders(product, quantity)
        VALUES ($1, $2)
        RETURNING *
      `,
      [product, quantity]
    );

    return new Order(rows[0]);
  }

  static async getAll() {
    // TODO: Implement me
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          orders
      `
    );

    return rows.map((row) => new Order(row));
  }

  static async getById(id) {
    // TODO: Implement me
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          orders
        WHERE
          id=$1
      `,
      [id]
    );
    
    return new Order(rows[0]);
  }

  static async updateById(id, { product, quantity }) {
    // TODO: Implement me
    const { rows } = await pool.query(
      `
        UPDATE
          orders
        SET
          product = $2,
          quantity = $3
        WHERE
          id=$1
        RETURNING
          *
      `,
      [id, product, quantity],
    );

    return new Order(rows[0]);
  }

  static async deleteById(id) {
    // TODO: Implement me
    const { rows } = await pool.query(
      `
        DELETE FROM
          orders
        WHERE
          id=$1
      `,
      [id]
    );
    if (!rows[0]) return null;
    return new Order(rows[0]);
  }
};
