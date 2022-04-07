const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/sales');
const salesModel = require('../../../models/sales');
const productModel = require('../../../models/products');

describe('4 - Testando os services de Sales', () => {

  const mockSales = [
    {
        "date": "2022-04-05T00:45:14.000Z",
        "productId": 3,
        "quantity": 15
    }
  ]

  describe('Retorna todos as Vendas', () => {

    before(() => {
      sinon.stub(salesModel, 'getAll').resolves(mockSales);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('Retornando todos as vendas', async () => {
      const result = await salesService.getAll();

      expect(result).equals(mockSales);
    });
  });

  describe('Retornando uma Venda através do id', () => {
    describe('Testando condições', () => {
      before(() => {
        sinon.stub(salesModel, 'getById').resolves([]);
      });
  
      after(() => {
        salesModel.getById.restore();
      });
  
      it('Não retornando todos os produtos', async () => {
        const result = await salesService.getById();
  
        expect(result.message).deep.equals({ message: 'Sale not found' });
      });
    });

    describe('Testando fora das condições', () => {
      before(() => {
        sinon.stub(salesModel, 'getById').resolves(mockSales);
      });
  
      after(() => {
        salesModel.getById.restore();
      });
  
      it('Retornando todos os produtos', async () => {
        const result = await salesService.getById();
  
        expect(result.message).equals(mockSales);
      });
    });

    
  });

  describe('Insere uma Venda', () => {
    describe('Testando condições', () => {

      const mockErrorMessage = { message: 'Product not found' };

      const mockInsertSale = [
        {
          "productId": 2,
          "quantity": 15
        },
        {
          "productId": 3,
          "quantity": 10
        }
      ]

      before(() => {
        sinon.stub(productModel, 'getById').resolves();
        sinon.stub(salesModel, 'insertSale').resolves(1);
      });
      
      after(() => {
        productModel.getById.restore();
        salesModel.insertSale.restore();
      });

      it('Não retornando nova venda', async () => {
        const result = await salesService.insertSale(mockInsertSale);

        expect(result.message).deep.equals(mockErrorMessage);
      });

    });

    describe('Testando fora das condições', () => {

      const mockInsertSale = [
          {
            "productId": 2,
            "quantity": 15
          },
          {
            "productId": 3,
            "quantity": 10
          }
        ]

      before(() => {
        sinon.stub(productModel, 'getById').resolves({});
        sinon.stub(salesModel, 'insertSale').resolves(1);
        sinon.stub(salesModel, 'insertSaleProducts').resolves(mockInsertSale);
      });

      after(() => {
        productModel.getById.restore();
        salesModel.insertSale.restore();
        salesModel.insertSaleProducts.restore();
      });

      it('Retornando nova venda', async () => {
        const result = await salesService.insertSale(mockInsertSale);

        expect(result.message).deep.equals({id: 1, itemsSold: mockInsertSale});
      });
    });
  });

  describe('Atualiza uma Venda', () => {

    const mockUpdateSale = [
      {
          "productId": 1,
          "quantity": 14
      }
    ]

    before(() => {
      sinon.stub(salesModel, 'updateById').resolves(1);
    });

    after(() => {
      salesModel.updateById.restore();

    });

    it('Atualizando uma venda', async () => {
      const result = await salesService.updateById(1, mockUpdateSale);

      expect(result.message).to.deep.equals({saleId: 1, itemUpdated: mockUpdateSale});
    });
  });
})