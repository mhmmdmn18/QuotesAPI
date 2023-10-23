const { nanoid } = require('nanoid');
const quotes = require('./quotes');

// Add/POST Quote
const addQuoteHandler = (request, h) => {
  const { quote, author } = request.payload;
  const id = nanoid(16);

  const newQuote = {
    quote, author, id,
  };

  quotes.push(newQuote);

  const isSuccess = quotes.filter((q) => q.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Kutipan berhasil ditambahkan',
      data: {
        quoteId: id,
      }
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Kutipan gagal ditambahkan',
  });
  response.code(500);
  return response;

};

// GET All Quotes
const getAllQuotesHandler = () => (quotes);

// GET Quote by Id
const getQuoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const quote = quotes.filter((q) => q.id === id)[0];
 
  if (quote !== undefined) {
    return quote;
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Kutipan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Edit/PUT Quote by Id
const editQuoteByIdHandler = (request, h) => {
  const { quote, author } = request.payload;
  const { id } = request.params;
  const index = quotes.findIndex((q) => q.id === id);
  
  if (index !== -1) {
    quotes[index] = {
      ...quotes[index],
      quote,
      author,
    };
    const response = h.response({
      status: 'success',
      message: 'Kutipan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui Kutipan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// DELETE Quote by Id
const deleteQuoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = quotes.findIndex((q) => q.id === id);
 
  if (index !== -1) {
    quotes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Kutipan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Kutipan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = { 
  addQuoteHandler, 
  getAllQuotesHandler, 
  getQuoteByIdHandler, 
  editQuoteByIdHandler, 
  deleteQuoteByIdHandler,
};