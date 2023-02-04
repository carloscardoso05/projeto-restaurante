import tables from "../models/Table.js";
import recipes from "../models/Recipe.js";

async function validateOrder(order){
    if (typeof order.recipe === 'string') {
        const recipe = await recipes.findById(order.recipe)
        const validOrder = {
            note: order.note,
            recipe: recipe
        }
        return validOrder
    } 
    return order
}

class OrderController {
  //GET
  static async listOrders(req, res) {
    const { tableId } = req.params;
    try {
      const table = await tables.findOne({ _id: tableId });
      const orders = table.orders;
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).send(`${error.message} - Falha ao carregar os pedidos`);
    }
  }

  static async findOrderById(req, res) {
    const { tableId, orderId } = req.params;
    try {
      const table = await tables.findOne({ _id: tableId });
      const order = table.orders.find(
        (order) => order._id.toString() === orderId
      );
      res.status(200).json(order);
    } catch (error) {
      res.status(500).send(`${error.message} - Falha ao carregar o pedido`);
    }
  }

  //POST
  static async createOrder(req, res) {
    const { tableId } = req.params;
    try {
      const table = await tables.findOne({ _id: tableId });
      const order = await validateOrder(req.body)
      table.orders.push(order)
      table.save()
      res.status(201).send("Criada com sucesso");
    } catch (error) {
      res.status(500).send(`${error.message} - Falha ao carregar o pedido`);
    }
  }
}

export default OrderController;
