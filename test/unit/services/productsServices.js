const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../services/products');
const productModel = require('../../../models/products');

describe('3 - Testando os services de Products', () => {

  const mockProducts = [
    {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }
  ]

  describe('Retorna todos os Produtos', () => {

    before(() => {
      sinon.stub(productModel, 'getAll').resolves(mockProducts);
    });

    after(() => {
      productModel.getAll.restore();
    });

    it('Retornando todos os produtos', async () => {
      const result = await productService.getAll();

      expect(result).equals(mockProducts);
    });
  });

  describe('Retornando um Produto através do id', () => {
    before(() => {
      sinon.stub(productModel, 'getById').resolves(mockProducts);
    });

    after(() => {
      productModel.getById.restore();
    });

    it('Retornando todos os produtos', async () => {
      const result = await productService.getById();

      expect(result.message).equals(mockProducts);
    });
  });

  describe('Insere um Produto', () => {

    const mockInsertProduct = {
      "id": 4,
      "name": "Martelo do Chapolin",
      "quantity": 1
    }

    before(() => {
      sinon.stub(productModel, 'getByName').resolves(false);
      sinon.stub(productModel, 'insert').resolves(mockInsertProduct);
    });

    after(() => {
      productModel.getByName.restore();
      productModel.insert.restore();

    });

    it('Retornando novo produto', async () => {
      const result = await productService.insert();

      expect(result.message).equals(mockInsertProduct);
    });
  });

  describe('Atualiza um Produto', () => {

    const mockUpdateProduct = {
      "name": "Testando",
      "quantity": 22
  }

    before(() => {
      sinon.stub(productModel, 'update').resolves(1);
    });

    after(() => {
      productModel.update.restore();

    });

    it('Atualizando um produto', async () => {
      const result = await productService.update(1, "Testando", 22);

      expect(result.message).to.deep.equals({id: 1, ...mockUpdateProduct});
    });
  });

  describe('Deleta um Produto', () => {

    const mockUpdateProduct = {
      "name": "Testando",
      "quantity": 22
  }

    before(() => {
      sinon.stub(productModel, 'deleteById').resolves(1);
    });

    after(() => {
      productModel.deleteById.restore();

    });

    it('Deletando um produto', async () => {
      const result = await productService.deleteById(1);

      expect(result).deep.equals({code: 204});
    });
  });
})