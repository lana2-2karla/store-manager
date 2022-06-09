const sinon = require("sinon");
const { expect } = require("chai");
const productsService = require("../../../services/productsService");
const productsController = require('../../../controllers/productsController');

describe('Busca todos os produtos no Banco de dados', () => {
    describe('Quando a busca é realizada com sucesso', () => {

        const req = {};
        const res = {};

        beforeEach(() => {

            const resultExecute = [[
                {id: 1, name: "Martelo de Thor", quantity: 10},
                {id: 2, name: "Traje de encolhimento", quantity: 20},
                {id: 3, name: "Escudo do Capitão América", quantity: 30},
            ]];
            sinon.stub(productsService, 'getAllProducts').resolves(resultExecute);

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
          });
        
          afterEach(() => {
            productsService.getAllProducts.restore();
          });

          it("retorna o status com o código 200", async () => {
            await productsController.getAllProductsController(req, res); 
            expect(res.status.calledWith(200)).to.be.equal(true);
          });

          it('é chamado o método "json" passando um array', async () => {
            await productsController.getAllProductsController(req, res);
            expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
          });
    });

    describe('Quando a busca não é realizada com sucesso',() => {
        const req = {};
        const res = {};

        beforeEach(() => {
            const resultExecute = [[]];
            sinon.stub(productsService, 'getAllProducts').resolves(resultExecute);

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(resultExecute);
          });
        
        afterEach(() => {
            productsService.getAllProducts.restore();
          });

        it("retorna o status com o código 200", async () => {
            await productsController.getAllProductsController(req, res);
            expect(res.status.calledWith(200)).to.be.equal(true);
          });

        it('retorna um array vazio', async () => {
          await productsController.getAllProductsController(req, res);
          expect(res.json.calledWith([])).to.be.equal(
              true
            );
        });

    })
})

describe('Busca um produto no Banco de dados', () => {
    describe('Quando a busca é realizada com sucesso', () => {

        const req = { params: {id: 1}};
        const res = {};

        beforeEach(() => {

            const resultExecute = [[
                {id: 1, name: "Martelo de Thor", quantity: 10}
            ]];
            sinon.stub(productsService, 'getAllProducts').resolves(resultExecute);

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
        });
        
            afterEach(() => {
                productsService.getAllProducts.restore();
            });

            it("retorna o status com o código 200", async () => {
                await productsController.getByIdController(req, res); 
                expect(res.status.calledWith(200)).to.be.equal(true);
            });

            it('é chamado o método "json" passando um objeto', async () => {
                await productsController.getByIdController(req, res);
                expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
            });
    })

    describe('Quando a busca não é realizada com sucesso', () => {

        const req = { params: {id: 1}};
        const res = {};

        beforeEach(() => {

            const resultExecute = [[]];
            sinon.stub(productsService, 'getAllProducts').resolves(resultExecute);

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
        });
        
            afterEach(() => {
                productsService.getAllProducts.restore();
            });

        it("retorna o status com o código 404", async () => {
            await productsController.getByIdController(req, res); 
            expect(res.status.calledWith(404)).to.be.equal(true);
        });

        it('retorna a mensagem de erro "products not found"', async () => {
            await productsController.getByIdController(req, res);
            expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
        });

    })
})

describe('Insere produto no banco de dados', () => {
    describe('Quando é inserido com sucesso', () => {

        const req = { body: {name: 'Exemple product A', quantity: 6}};
        const res = {};

        beforeEach(() => {

            const resultExecute = { id: 1, name: 'Exemple product A', quantity: 6};
            sinon.stub(productsService, 'getNewProduct').resolves(resultExecute);

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
        });
        
        afterEach(() => {
            productsService.getNewProduct.restore();
        });

        it("retorna o status com o código 201", async () => {
            await productsController.addProductsController(req, res); 
            expect(res.status.calledWith(201)).to.be.equal(true);
        });

        it('é chamado o método "json" passando um objeto', async () => {
            await productsController.addProductsController(req, res);
            expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
        });
    });

    describe('Quando não é inserido com sucesso', () => {

        const req = { body: {name: 'Exemple product A', quantity: 6}};
        const res = {};

        beforeEach(() => {

            const resultExecute = null;
            sinon.stub(productsService, 'getNewProduct').resolves(resultExecute);

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
        });
        
        afterEach(() => {
            productsService.getNewProduct.restore();
        });

        it("retorna o status com o código 409", async () => {
            await productsController.addProductsController(req, res); 
            expect(res.status.calledWith(409)).to.be.equal(true);
        });

        it('retorna a mensagem de erro "products not found"', async () => {
            await productsController.addProductsController(req, res);
            expect(res.json.calledWith({ message: 'Product already exists' })).to.be.equal(true);
        });

    });
})

describe('Atualiza produdo no Banco de dados', () => {
    describe('Quando é atualizado com sucesso', () => {

        const req = { body: {name: 'Exemple product A', quantity: 6}, params: {id: 1} };
        const res = { };

        beforeEach(() => {

            const resultExecute = 1;
            const result = [[{id: 1, name: "Martelo de Thor", quantity: 10}]]

            sinon.stub(productsService, 'updateProductService').resolves(resultExecute);
            sinon.stub(productsService, 'getAllProducts').resolves(result);

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
        });
        
        afterEach(() => {
            productsService.updateProductService.restore();
            productsService.getAllProducts.restore();
        });

        it("retorna o status com o código 200", async () => {
            await productsController.updateProductsController(req, res); 
            expect(res.status.calledWith(200)).to.be.equal(true);
        });

        it('é chamado o método "json" passando um objeto', async () => {
            await productsController.updateProductsController(req, res);
            expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
        });
    });

    describe('Quando não é atualizado com sucesso', () => {

        const req = { body: {name: 'Exemple product A', quantity: 6}, params: {id: 1}  };
        const res = { };

        beforeEach(() => {

            const resultExecute = null;
            const result = [[{id: 1, name: "Martelo de Thor", quantity: 10}]]

            sinon.stub(productsService, 'updateProductService').resolves(resultExecute);
            sinon.stub(productsService, 'getAllProducts').resolves(result);

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
        });
        
        afterEach(() => {
            productsService.updateProductService.restore();
            productsService.getAllProducts.restore();
        });

        it("retorna o status com o código 404", async () => {
            await productsController.updateProductsController(req, res); 
            expect(res.status.calledWith(404)).to.be.equal(true);
        });

        it('retorna a mensagem de erro "products not found"', async () => {
            await productsController.updateProductsController(req, res);
            expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
        });


    })

})