import tables from "../models/Table.js";

class TableController {
  //GET
  static async listTables(req, res) {
    try {
      const allTables = await tables.find()
      res.status(200).json(allTables)
    } catch (error) {
      res.status(500).send(`${error.message} - Falha ao encontrar as mesas`)
    }
  }

  static async findTableById(req, res) {
    const { tableId } = req.params;
    try {
      const table = await tables.findOne({"_id": tableId})
      if (table === null) throw new Error("Esse Id não corresponde a nenhuma mesa")
      res.status(200).json(table)
    } catch (error) {
      res.status(500).send(`${error.message} - Falha ao encontrar a mesa`)
    }
  }

  //POST
  static async createTable(req, res) {
    try {
      const table = new tables(req.body);
      await table.save()
      res.status(200).send(`Mesa criada com sucesso \n ${table}`)
    } catch (error) {
      res.status(500).send(`${error.message} - Falha ao criar a mesa`)
    }
  }

  //PUT
  static async updateTable(req, res) {
    const { tableId } = req.params;
    try {
      let table = await tables.findOne({ "_id": tableId})
      await table.updateOne({$set: req.body})
      res.status(201).send(`Mesa atualizada com sucesso`)
    } catch (error) {
      res.status(500).send(`${error.message} - Falha ao atualizar a mesa`)
    }
  }

  //DELETE
  static async deleteTable(req, res) {
    const { tableId } = req.params;
    try {
      const table = await tables.findOne({ "_id": tableId})
      await table.delete()
      res.status(201).send(`Mesa com id ${tableId} apagada com sucesso`)
    } catch (error) {
      res.status(500).send(`${error.message} - Falha ao apagar a mesa`)
    }
  }
}

export default TableController;
