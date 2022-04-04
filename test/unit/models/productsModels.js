const productModel = require('../../../models/products');
const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');

describe('Testando os models de Products', () => {

  const mockProduct = [{ "id": 1, "name": "produto", "quantity": 100 }];

  describe('Retorna todos os Produtos', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([mockProduct])
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retornando todos os produtos', async () => {
      const result = await productModel.getAll();

      expect(result).equals(mockProduct);
    });
  });

  describe('Retorna um Produto através do id', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([mockProduct])
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retornando pelo id', async () => {
      const result = await productModel.getById();

      expect(result.id).equals(1);
      expect(result).equals(...mockProduct);
    });
  });

  describe('Retorna um Produto através do nome', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([mockProduct])
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retornando pelo name', async () => {
      const result = await productModel.getByName();

      expect(result.name).equals("produto");
    });
  });

  describe('Insere um Produto', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retornando novo produto', async () => {
      const result = await productModel.insert();

      expect(result.id).equals(1);
    });
  });

  describe('Atualiza um Produto', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([{affectedRows: 1}]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Atualizando um produto', async () => {
      const result = await productModel.update();

      expect(result).equals(1);
    });
  });

  describe('Deleta um Produto', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([{affectedRows: 1}]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Deletando um produto', async () => {
      const result = await productModel.deleteById();

      expect(result).equals(1);
    });
  });
})