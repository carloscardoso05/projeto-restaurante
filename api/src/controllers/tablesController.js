import tables from "../models/Table.js";

class TableController {
  //GET
  static listTables(req, res) {
    tables.find((error, tables) => {
      if (!error) {
        res.status(200).json(tables);
        return;
      }
      res.status(500).send(`${error.message} - falha ao carregar as mesas`);
    });
  }

  static findTableById(req, res) {
    const { id } = req.params;
    tables.findById(id, (error, table) => {
      if (!error) {
        res.status(200).json(table);
        return;
      }
      res.status(500).send(`${error.message} - falha ao carregar a mesa`);
    });
  }

	// static listOrders(req, res){
	// 	const { id } = req.params;
  //   tables.findById(id, (error, table) => {
  //     if (!error) {
  //       res.status(200).send(table["orders"]);
  //       return;
  //     }
  //     res.status(500).send(`${error.message} - falha ao carregar os pedidos`);
  //   });
	// }

  //POST
  static createTable(req, res) {
    const table = new tables(req.body);
    table.save((error) => {
			if (!error) {
        res.status(201).send(`Mesa criada com sucesso \n ${req.body}`);
        return;
      }
      res.status(500).send(`${error.message} - falha ao criar a mesa`);
		});
  }

	//PUT
	static updateTable
}

export default TableController