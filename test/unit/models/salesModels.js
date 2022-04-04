const salesModel = require('../../../models/sales');
const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');

describe('2 - Testando os models de Sales', () => {

  const mockSales =  [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ];

  describe('Retorna todos as Vendas', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([mockSales])
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retornando todos os produtos', async () => {
      const result = await salesModel.getAll();

      expect(result).equals(mockSales);
    });
  });

  describe('Retorna uma Venda através do id', () => {

    const mockSaleById = [
      {
          "date": "2022-04-04T14:47:25.000Z",
          "productId": 1,
          "quantity": 5
      },
      {
          "date": "2022-04-04T14:47:25.000Z",
          "productId": 2,
          "quantity": 10
      }
    ]

    before(() => {
      sinon.stub(connection, 'execute').resolves([mockSaleById])
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retornando pelo id', async () => {
      const result = await salesModel.getById();

      expect(result).equals(mockSaleById);
    });
  });

  describe('Insere uma Venda', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Inserindo nova venda', async () => {
      const result = await salesModel.insertSale();

      expect(result).equals(1);
    });
  });

  describe('Insere e atualiza Produtos na Venda', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([{affectedRows: 1}]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Inserindo produtos na venda', async () => {
      const result = await salesModel.insertSaleProducts()


      expect(result).equals(1);
    });

    it('Atualizando produtos na venda', async () => {
      const result = await salesModel.updateById()

      expect(result).equals(1);
    });
  });
})