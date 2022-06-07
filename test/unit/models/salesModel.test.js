const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const salesModel = require("../../../models/salesModel");

describe('Busca todas as vendas do Banco de dados', () => {

  describe('Quando não há vendas a serem listadas', () => {
    before(() => {
      const resultExecute = [[]];
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });
  
    after(() => {
      connection.execute.restore();
      });

    it('retorna um array', async () => {
      const [response] = await salesModel.getAllSales();
      expect(response).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const [response] = await salesModel.getAllSales();
      expect(response).to.be.empty;
    });
})

  describe('Quando há vendas a serem listadas', () => {
    before(() => {
      const resultExecute = [[
        {
          saleId: 1,
          date: "2022-06-01T13:34:09.000Z",
          productId: 1,
          quantity: 5
        },
        {
          saleId: 1,
          date: "2022-06-01T13:34:09.000Z",
          productId: 2,
          quantity: 10
        },
        {
          saleId: 2,
          date: "2022-06-01T13:34:09.000Z",
          productId: 3,
          quantity: 15
        }
      ]];
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });
        
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await salesModel.getAllSales();
      expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const response = await salesModel.getAllSales();
      expect(response).to.not.be.empty;
    });

    it('o array possui itens do tipo objeto', async () => {
      const [response] = await salesModel.getAllSales();
      expect(response[0]).to.be.a('object');
    });

    it('o array contém todos os objetos', async () => {
      const [response] = await salesModel.getAllSales();
      expect(response).to.be.lengthOf(3);
    });
    })
})

describe('Insere nova venda de produtos no Banco de dados', () => {

  const saleId = 3;
  const productId = 2;
  const quantity = 6;
  
  before(() => {
    const resultExecute = [{insertId: 1}];
    sinon.stub(connection, 'execute').resolves(resultExecute);
  });
  
  after(() => {
    connection.execute.restore();
  });
  
  describe('Quando é inserida com sucesso', () => {

    it("retorna um objeto", async () => {
      const response = await salesModel.addSalesProducts(saleId, productId, quantity);
      expect(response).to.be.a("object");
    });

    it('tal objeto possui as propriedades: "productId" e "quantity"', async () => {
      const response = await salesModel.addSalesProducts(saleId, productId, quantity);
      expect(response).to.include.all.keys(
        'productId',
        'quantity',
      );
    });

  })

})

describe('Atualiza venda no Banco de dados', () => {
    const saleId = 3;
    const productId = 2;
    const quantity = 6;

  before(() => {
    const resultExecute = [{ affectedRows: 1}];
    sinon.stub(connection, 'execute').resolves(resultExecute);
  });
  
  after(() => {
    connection.execute.restore();
  });

  describe('Quando é atualizado com sucesso', () => {

    it('retorna um número', async () => {
      const response = await salesModel.updateSalesProducts(saleId, productId, quantity);
      expect(response).to.be.a("number");
    });
    
    it('tal número é igaul a 1', async () => {
      const response = await salesModel.updateSalesProducts(saleId, productId, quantity);
      expect(response).to.be.equal(1);
    });

  })

})