const { nanoid } = require('nanoid');
const books = require('./books')

const addBook = (request, h) => {
    const { 
            name, 
            year, 
            author, 
            summary, 
            publisher, 
            pageCount, 
            readPage, 
            reading, 
        } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updateAt = insertedAt;

    const newBook = {
      id,
      name, 
      year, 
      author, 
      summary, 
      publisher, 
      pageCount, 
      readPage, 
      finished,
      reading,
      insertedAt,
      updateAt,
      };

      if (!name) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })
        .code(400);
        return response;
      }

      if (!name) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        .code(400);
        return response;
      }

    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;  
    if (isSuccess) {
      const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: `${id}`,
          },
        })
        .code(201);
      return response;
    }     
}

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  let bookQuery = books;

  if (name) {
    const nameQuery = name.LowerCase();
    bookQuery = books.filter((b) => b.name.LowerCase().includes(nameQuery));
  }
  if (reading) {
    bookQuery = books.filter((b) => Number(b.reading) === Number(reading)); 
  }
  if (name) {
    bookQuery = books.filter((b) => Number(b.reading) === Number(reading));
  }

  const response = h.response({
    status: 'success',
    data: {
        books: bookQuery.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getBookById = (request, h) => {
  const { id } = request.params;
 
  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
  const response = h.response({
      status: 'success',
      data: {
      book,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookById = (request, h) => {
  const { id } = request.params;

  const { 
    name, 
    year, 
    author, 
    summary, 
    publisher, 
    pageCount, 
    readPage, 
    reading, 
  } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
}   if (readPage > pageCount){
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    })
    response.code(400);
    return response;
  }
    if (index !== -1) {
    books[index] = {
      ...books[index],
      id,
      name, 
      year, 
      author, 
      summary, 
      publisher, 
      pageCount, 
      readPage, 
      reading,
      insertedAt,
      updateAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookById = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = 
      h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = 
    h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
  
module.exports = { 
    addBook,
    getAllBooks,
    getBookById,
    editBookById,
    deleteBookById,
};