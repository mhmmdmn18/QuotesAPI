const { nanoid } = require('nanoid');
const quotes = require('./quotes');

const addQuoteHandler = (request, h) => {
  const { quote, author } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newQuote = {
    quote, author, id, createdAt, updatedAt,
  };

  quotes.push(newQuote);

  const isSuccess = quotes.filter((quote) => quote.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Kutipan berhasil ditambahkan',
      data: {
        quoteId: id,
      },
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

// const getAllQuotesHandler = () => (quotes);

const getAllQuotesHandler = () => ({
  status: 'success',
  data: {
    quotes,
  },
});

const getQuoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const quote = quotes.filter((n) => n.id === id)[0];
 
  // if (quote !== undefined) {
  //   return quote;
  // }

  if (quote !== undefined) {
    return {
      status: 'success',
      data: {
        quote,
      },
    };
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Kutipan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editQuoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const { quote, author } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = quotes.findIndex((quote) => quote.id === id);
  
  if (index !== -1) {
    quotes[index] = {
      ...quotes[index],
      quote,
      author,
      updatedAt,
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

const deleteQuoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = quotes.findIndex((quote) => quote.id === id);
 
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

module.exports = { addQuoteHandler, getAllQuotesHandler, getQuoteByIdHandler, editQuoteByIdHandler, deleteQuoteByIdHandler };