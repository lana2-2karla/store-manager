const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const productsModel = require("../../../models/productsModel");

describe('Busca todos os produtos do Banco de dados', () => {

  describe('Quando não há produtos a serem listados', () => {
    before(() => {
      const resultExecute = [[]];
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });
  
    after(() => {
      connection.execute.restore();
      });

    it('retorna um array', async () => {
      const [response] = await productsModel.getAllProducts();
      expect(response).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const [response] = await productsModel.getAllProducts();
      expect(response).to.be.empty;
    });
})

  describe('Quando há produtos a serem listados', () => {
    before(() => {
      const resultExecute = [[
        {id: 1, name: "Martelo de Thor", quantity: 10},
        {id: 2, name: "Traje de encolhimento", quantity: 20},
        {id: 3, name: "Escudo do Capitão América", quantity: 30},
      ]];
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });
        
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.not.be.empty;
    });

    it('o array possui itens do tipo objeto', async () => {
      const [response] = await productsModel.getAllProducts();
      expect(response[0]).to.be.a('object');
    });

    it('o array contém todos os objetos', async () => {
      const [response] = await productsModel.getAllProducts();
      expect(response).to.be.lengthOf(3);
    });
    })
})

describe('Insere novo produto no Banco de dados', () => {

  const name = "Example Product A";
  const quantity = 6;

  before(() => {
    const resultExecute = [{id: 1, name: "Example Product A", quantity: 6}];
    sinon.stub(connection, 'execute').resolves(resultExecute);
  });
  
  after(() => {
    connection.execute.restore();
  });
  
  describe('Quando é inserido com sucesso', () => {

    it("retorna um objeto", async () => {
      const response = await productsModel.addProducts(name, quantity);
      expect(response).to.be.a("object");
    });

    it('tal objeto possui as propriedades: "id", "name" e "quantity"', async () => {
      const response = await productsModel.addProducts(name, quantity);
      expect(response).to.include.all.keys(
        'id',
        'name',
        'quantity',
      );
    });

  })

})

describe('Atualiza produto no Banco de dados', () => {
  const name = "Example Product A";
  const quantity = 6;
  const id = 4

  before(() => {
    const resultExecute = [{ affectedRows: 1}];
    sinon.stub(connection, 'execute').resolves(resultExecute);
  });
  
  after(() => {
    connection.execute.restore();
  });

  describe('Quando é atualizado com sucesso', () => {

    it('retorna um número', async () => {
      const response = await productsModel.updateProducts(name, quantity, id);
      expect(response).to.be.a("number");
    });
    
    it('tal número é igaul a 1', async () => {
      const response = await productsModel.updateProducts(name, quantity, id);
      expect(response).to.be.equal(1);
    });

  })

})