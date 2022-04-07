const { expect } = require('chai');
const productsController = require('../../../controllers/products');
const productServices = require('../../../services/products');
const sinon = require('sinon');


describe('5 - Testando os controllers de Products', () => {
  describe('Testando os Try Catches', () => {

    const errorMessage = {
      "message": "Ops, algo deu errado!"
    }

    const mockAll = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }
    ]

    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      response.end = sinon.stub().returns(response);
    });

    describe('getAll try result', () => {
      before(() => {

        sinon.stub(productServices, 'getAll').resolves(mockAll)
      });

      after(() => {
        productServices.getAll.restore();
      });

      it('Sucesso', async () => {
        await productsController.getAll(request, response);

        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(mockAll)).to.be.true;
      });
    });


    describe('getAll catch result', () => {
      before(() => {
        sinon.stub(productServices, 'getAll').rejects(errorMessage)
      });

      after(() => {
        productServices.getAll.restore();
      });

      it('Erro', async () => {
        await productsController.getAll(request, response);

        expect(response.status.calledWith(500)).equal(true);
        expect(response.json.calledWith(errorMessage)).to.be.true;
      });
    });

    describe('getById try result', () => {

      const mockById = mockAll[0];

      before(() => {
        request.params = {};
    
        sinon.stub(productServices, 'getById').resolves({ code: 200, message: mockById });
      });

      after(() => {
        productServices.getById.restore();
      });

      it('Sucesso', async () => {
        await productsController.getById(request, response);

        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(mockById)).to.be.true;
      });
    });

    describe('getById catch result', () => {
      before(() => {
        sinon.stub(productServices, 'getById').rejects(errorMessage)
      });

      after(() => {
        productServices.getById.restore();
      });

      it('Erro', async () => {
        await productsController.getById(request, response);

        expect(response.status.calledWith(500)).equal(true);
        expect(response.json.calledWith(errorMessage)).to.be.true;
      });
    });

    describe('insert try result', () => {

      const mockById = mockAll[0];

      before(() => {
        request.params = {};
        request.body = {};
    
        sinon.stub(productServices, 'insert').resolves({ code: 201, message: mockById });
      });

      after(() => {
        productServices.insert.restore();
      });

      it('Sucesso', async () => {
        await productsController.insert(request, response);

        expect(response.status.calledWith(201)).to.be.true;
        expect(response.json.calledWith(mockById)).to.be.true;
      });
    });

    describe('insert catch result', () => {
      before(() => {
        sinon.stub(productServices, 'insert').rejects(errorMessage)
      });

      after(() => {
        productServices.insert.restore();
      });

      it('Erro', async () => {
        await productsController.insert(request, response);

        expect(response.status.calledWith(500)).equal(true);
        expect(response.json.calledWith(errorMessage)).to.be.true;
      });
    });

    describe('update try result', () => {

      const mockById = mockAll[0];

      before(() => {
        request.params = {};
        request.body = {};
    
        sinon.stub(productServices, 'update').resolves({ code: 200, message: mockById });
      });

      after(() => {
        productServices.update.restore();
      });

      it('Sucesso', async () => {
        await productsController.update(request, response);

        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(mockById)).to.be.true;
      });
    });

    describe('update catch result', () => {
      before(() => {
        sinon.stub(productServices, 'update').rejects(errorMessage)
      });

      after(() => {
        productServices.update.restore();
      });

      it('Erro', async () => {
        await productsController.update(request, response);

        expect(response.status.calledWith(500)).equal(true);
        expect(response.json.calledWith(errorMessage)).to.be.true;
      });
    });

    describe('deleteById try result', () => {

      before(() => {
        request.params = {};
    
        sinon.stub(productServices, 'deleteById').resolves({ code: 204 });
      });

      after(() => {
        productServices.deleteById.restore();
      });

      it('Sucesso', async () => {
        await productsController.deleteById(request, response);

        expect(response.status.calledWith(204)).to.be.true;
        expect(response.end.calledWith()).to.be.true;
      });
    });

    describe('deleteById catch result', () => {
      before(() => {
        sinon.stub(productServices, 'deleteById').rejects(errorMessage)
      });

      after(() => {
        productServices.deleteById.restore();
      });

      it('Erro', async () => {
        await productsController.deleteById(request, response);

        expect(response.status.calledWith(500)).equal(true);
        expect(response.json.calledWith(errorMessage)).to.be.true;
      });
    });
  });
});