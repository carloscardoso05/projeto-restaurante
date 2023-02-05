import tables from "../models/Table.js";
import recipes from "../models/Recipe.js";

//valida o pedido para que o POST ou PUT possa ser feito tanto com o _id da receita no banco de dados quanto com uma receita inserida diretamente no corpo da requisição

async function validateOrder(order) {
  if (typeof order.recipe === "string") {
    const recipe = await recipes.findById(order.recipe);
    const validOrder = {
      note: order.note,
      recipe: recipe,
    };
    console.log(validOrder);
    return validOrder;
  }
  return order;
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
      const order = await validateOrder(req.body);
      table.orders.push(order);
      await table.save();
      res.status(201).send("Pedido adicionado com sucesso");
    } catch (error) {
      res.status(500).send(`${error.message} - Falha ao adicionar o pedido`);
    }
  }

  //PUT
  static async updateOrder(req, res) {
    const { tableId, orderId } = req.params;
    try {
      //busca a mesa e o index do pedido nela
      const table = await tables.findOne({ _id: tableId });
      const newOrder = await validateOrder(req.body);
      const orderIndex = table.orders.findIndex(
        (order) => order._id.toString() === orderId
      );
      const oldOrderPrice = table.order[orderIndex].recipe.price;
      const newOrderPrice = newOrder.recipe.price;

      //insere o novo pedido no index do antigo pedido
      table.orders[orderIndex] = newOrder;
      table.orders[orderIndex]._id = orderId;

      //atualiza a conta da mesa
      table.bill -= oldOrderPrice;
      table.bill += newOrderPrice;

      await table.save();
      res.status(201).send("Pedido atualizado com sucesso");
    } catch (error) {
      res.status(500).send(`${error.message} - Falha ao atualizar o pedido`);
    }
  }

  //DELETE
  static async deleteOrder(req, res) {
    const { tableId, orderId } = req.params;
    try {
      //busca a mesa e o preço do pedido
      const table = await tables.findOne({ _id: tableId });
      const orderPrice = table.orders.find(order => order._id.toString() === orderId).recipe.price;
      table.orders = table.orders.filter(order => order._id.toString() !== orderId)

      //atualiza a conta da mesa
      table.bill -= orderPrice;

      await table.save();
      res.status(201).send("Pedido apagado com sucesso");
    } catch (error) {
      res.status(500).send(`${error.message} - Falha ao apagar o pedido`);
    }
  }
}

export default OrderController;
