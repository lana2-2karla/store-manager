const sinon = require("sinon");
const { expect } = require("chai");
const productsService = require("../../../services/productsService");
const productsModel = require('../../../models/productsModel');

describe('Busca um produto no Banco de dados', () => {

  describe('Quando o id é válido e a busca tem sucesso', () => {
    const id = 1;
    beforeEach(() => {
      const resultExecute = [[{id: 1, name: "Martelo de Thor", quantity: 10}]];
      sinon.stub(productsModel, 'getByIdProducts').resolves(resultExecute);
    });
  
    afterEach(() => {
      productsModel.getByIdProducts.restore();
    });

    it('retorna um array', async () => {
      const [response] = await productsService.getAllProducts(id);
      expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const [response] = await productsService.getAllProducts(id);
      expect(response).to.not.be.empty;
    });
  
    it('o array possui itens do tipo objeto', async () => {
      const [response] = await productsService.getAllProducts(id);
      expect(response[0]).to.be.a('object');
    });
    
    it('o array contém apenas 1 objeto', async () => {
      const [response] = await productsService.getAllProducts(id);
      expect(response).to.be.lengthOf(1);
    });

    it('tal objeto possui as propriedades: "id", "name" e "quantity"', async () => {
      const [response] = await productsService.getAllProducts(id);
      expect(response[0]).to.include.all.keys(
        'id',
        'name',
        'quantity',
      );
    });
  })

  describe('Quando o id é inválido e a busca não tem sucesso', () => {
    const id = 5;
    beforeEach(() => {
      const resultExecute = [[]];
      sinon.stub(productsModel, 'getByIdProducts').resolves(resultExecute);
    });
      
    afterEach(() => {
      productsModel.getByIdProducts.restore();
    });
    
    it('retorna um array', async () => {
      const [response] = await productsService.getAllProducts(id);
      expect(response).to.be.an('array');
    });
    
    it('o array está vazio', async () => {
      const [response] = await productsService.getAllProducts(id);
      expect(response).to.be.empty;
    });
  });
})

describe('Busca todos os produtos no banco de dados', () => {

  describe('Quando a busca é realizada com sucesso', () => {
    beforeEach(() => {
      const resultExecute = [[
        {id: 1, name: "Martelo de Thor", quantity: 10},
        {id: 2, name: "Traje de encolhimento", quantity: 20},
        {id: 3, name: "Escudo do Capitão América", quantity: 30},
    ]];
      sinon.stub(productsModel, 'getAllProducts').resolves(resultExecute);
    });
            
    afterEach(() => {
      productsModel.getAllProducts.restore();
    });

    it('retorna um array', async () => {
      const response = await productsService.getAllProducts();
      expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const response = await productsService.getAllProducts();
      expect(response).to.not.be.empty;
    });

    it('o array possui itens do tipo objeto', async () => {
      const [response] = await productsService.getAllProducts();
      expect(response[0]).to.be.a('object');
    });

    it('o array contém todos os objetos', async () => {
      const [response] = await productsService.getAllProducts();
      expect(response).to.be.lengthOf(3);
    });

    it('tais objetos possuem as propriedades: "id", "name" e "quantity"', async () => {
      const [response] = await productsService.getAllProducts();
      expect(response[0]).to.include.all.keys(
        'id',
        'name',
        'quantity',
      );
    });
  });

  describe('Quando a busca não é realizada sucesso', () => {
    beforeEach(() => {
      const resultExecute = [[]];
      sinon.stub(productsModel, 'getAllProducts').resolves(resultExecute);
    });
  
    afterEach(() => {
      productsModel.getAllProducts.restore();
      });

    it('retorna um array', async () => {
      const [response] = await productsService.getAllProducts();
      expect(response).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const [response] = await productsService.getAllProducts();
      expect(response).to.be.lengthOf(0);
    });
  })
})

describe('Insere um produto no banco de dados',() => {

  const name = "Example Product A";
  const quantity = 6;

  describe('Quando é inserido com sucesso', () => {
    beforeEach(() => {
      const result = [];
      const resultExecute = [[{id: 1, name: "Example Product A", quantity: 6}]];
      sinon.stub(productsModel, 'getByNameProducts').resolves(result);
      sinon.stub(productsModel, 'addProducts').resolves(resultExecute);
    });
  
    afterEach(() => {
      productsModel.getByNameProducts.restore();
      productsModel.addProducts.restore();
    });

    it("retorna um objeto", async () => {
      const [response] = await productsService.getNewProduct(name, quantity);
      expect(response[0]).to.be.a("object");
    });

    it('tal objeto possui as propriedades: "id", "name" e "quantity"', async () => {
      const [response] = await productsService.getNewProduct(name, quantity);
      expect(response[0]).to.include.all.keys(
        'id',
        'name',
        'quantity',
      );
    });
  });

  describe('Quando não é inserido com sucesso', () => {

    const name = "Martelo de Thor";

    beforeEach(() => {
      const resultExecute = [[{id: 1, name: "Martelo de Thor", quantity: 10}]];
      sinon.stub(productsModel, 'getByNameProducts').resolves(resultExecute);
    });
  
    afterEach(() => {
      productsModel.getByNameProducts.restore();
    });

    it("retorna nulo", async () => {
      const response = await productsService.getNewProduct(name);
      expect(response).to.be.null;
    });
  });
})

describe('Atualiza produto no Banco de dados', () => {
  const name = "Example Product A";
  const quantity = 6;
  const id = 4

  describe('Quando é atualizado com sucesso',() => {
    beforeEach(() => {
      const result = [];
      const resultExecute = [1];
      sinon.stub(productsModel, 'getByNameProducts').resolves(result);
      sinon.stub(productsModel, 'updateProducts').resolves(resultExecute);
    });
  
    afterEach(() => {
      productsModel.getByNameProducts.restore();
      productsModel.updateProducts.restore();
    });

    it('retorna um número', async () => {
      const [response] = await productsService.updateProductService(name, quantity, id);
      expect(response).to.be.a("number");
    });
    
    it('tal número é igaul a 1', async () => {
      const [response] = await productsService.updateProductService(name, quantity, id);
      expect(response).to.be.equal(1);
    });
  });

  describe('Quando não é atualizado com sucesso',() => {
    const name = "Martelo de Thor";

    beforeEach(() => {
      const resultExecute = [[{id: 1, name: "Martelo de Thor", quantity: 10}]];
      sinon.stub(productsModel, 'getByNameProducts').resolves(resultExecute);
    });
  
    afterEach(() => {
      productsModel.getByNameProducts.restore();
    });

    it("retorna nulo", async () => {
      const response = await productsService.getNewProduct(name);
      expect(response).to.be.null;
    });
  });
});
  

