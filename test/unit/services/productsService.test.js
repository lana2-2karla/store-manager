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
  

