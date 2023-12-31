const { 
  addQuoteHandler, 
  getAllQuotesHandler, 
  getQuoteByIdHandler, 
  editQuoteByIdHandler, 
  deleteQuoteByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return 'Hello World!';
    }
  },
  {
    method: 'POST',
    path: '/quotes',
    handler: addQuoteHandler,
  },
  {
    method: 'GET',
    path: '/quotes',
    handler: getAllQuotesHandler,
  },
  {
    method: 'GET',
    path: '/quotes/{id}',
    handler: getQuoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/quotes/{id}',
    handler: editQuoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/quotes/{id}',
    handler: deleteQuoteByIdHandler,
  }
];
 
module.exports = routes;