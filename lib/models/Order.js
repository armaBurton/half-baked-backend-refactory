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
        SELECT
          *
        FROM
          orders
        WHERE
          id=$1
      `,
      [id]
    );
    console.log('|| rows >', rows);
    rows[0].product = product;
    rows[0].quantity = quantity;
    console.log('|| rows >', rows);

    return new Order(row[0]);
  }

  static async deleteById(id) {
    // TODO: Implement me
  }
};
