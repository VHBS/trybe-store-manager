const { expect } = require('chai');
const salesController = require('../../../controllers/sales');
const saleServices = require('../../../services/sales');
const sinon = require('sinon');

describe('6 - Testando os controllers de Sales', () => {
  describe('Testando os Try Catches', () => {
    
    const errorMessage = {
      "message": "Ops, algo deu errado!"
    };

    const mockAll = [
      {
          "saleId": 1,
          "date": "2022-04-05T15:25:34.000Z",
          "productId": 1,
          "quantity": 5
      }
    ];

    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      response.end = sinon.stub().returns(response);
    });

    describe('getAll try result', () => {
      before(() => {

        sinon.stub(saleServices, 'getAll').resolves(mockAll)
      });

      after(() => {
        saleServices.getAll.restore();
      });

      it('Sucesso', async () => {
        await salesController.getAll(request, response);

        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(mockAll)).to.be.true;
      });
    });

    describe('getAll catch result', () => {
      before(() => {

        sinon.stub(saleServices, 'getAll').rejects(errorMessage)
      });

      after(() => {
        saleServices.getAll.restore();
      });

      it('Erro', async () => {
        await salesController.getAll(request, response);

        expect(response.status.calledWith(500)).equal(true);
        expect(response.json.calledWith(errorMessage)).to.be.true;
      });
    });

    describe('getById try result', () => {

      const mockById = [
        {
            "date": "2022-04-05T15:25:34.000Z",
            "productId": 3,
            "quantity": 15
        }
      ];

      before(() => {
        request.params = {};

        sinon.stub(saleServices, 'getById').resolves({ code: 200, message: mockById })
      });

      after(() => {
        saleServices.getById.restore();
      });

      it('Sucesso', async () => {
        await salesController.getById(request, response);

        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(mockAll)).to.be.true;
      });
    });

    describe('getById catch result', () => {
      before(() => {
        request.params = {};

        sinon.stub(saleServices, 'getById').rejects(errorMessage)
      });

      after(() => {
        saleServices.getById.restore();
      });

      it('Erro', async () => {
        await salesController.getById(request, response);

        expect(response.status.calledWith(500)).equal(true);
        expect(response.json.calledWith(errorMessage)).to.be.true;
      });
    });

    describe('insert try result', () => {

      const mockInsert = {
        "id": 3,
        "itemsSold": [
            {
                "productId": 2,
                "quantity": 15
            }
        ]
      }

      before(() => {
        request.params = {};

        sinon.stub(saleServices, 'insertSale').resolves({ code: 201, message: mockInsert })
      });

      after(() => {
        saleServices.insertSale.restore();
      });

      it('Sucesso', async () => {
        await salesController.insert(request, response);

        expect(response.status.calledWith(201)).to.be.true;
        expect(response.json.calledWith(mockInsert)).to.be.true;
      });
    });

    describe('insert catch result', () => {
      before(() => {
        request.params = {};

        sinon.stub(saleServices, 'insertSale').rejects(errorMessage)
      });

      after(() => {
        saleServices.insertSale.restore();
      });

      it('Erro', async () => {
        await salesController.insert(request, response);

        expect(response.status.calledWith(500)).equal(true);
        expect(response.json.calledWith(errorMessage)).to.be.true;
      });
    });

    describe('updateById try result', () => {

      const mockUpdate = {
        "saleId": "1",
        "itemUpdated": [
            {
                "productId": 1,
                "quantity": 14
            }
        ]
      };

      before(() => {
        request.params = {};

        sinon.stub(saleServices, 'updateById').resolves({ code: 200, message: mockUpdate })
      });

      after(() => {
        saleServices.updateById.restore();
      });

      it('Sucesso', async () => {
        await salesController.updateById(request, response);

        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(mockUpdate)).to.be.true;
      });
    });

    describe('updateById catch result', () => {
      before(() => {
        request.params = {};

        sinon.stub(saleServices, 'updateById').rejects(errorMessage)
      });

      after(() => {
        saleServices.updateById.restore();
      });

      it('Erro', async () => {
        await salesController.updateById(request, response);

        expect(response.status.calledWith(500)).equal(true);
        expect(response.json.calledWith(errorMessage)).to.be.true;
      });
    });

  });
});