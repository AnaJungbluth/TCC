import React, { useState, useEffect } from 'react';

const UpdateBook = ({ book, onUpdateSuccess, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [publisher, setPublisher] = useState('');

  useEffect(() => {
    // Atualiza os estados com os dados do livro quando eles mudam
    setTitle(book.title);
    setAuthor(book.author);
    setYear(book.year);
    setPublisher(book.publisher);
  }, [book]);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    fetch(`http://localhost:3001/books/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, year, publisher }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Book updated successfully');
        onUpdateSuccess(); // Chama a função de retorno de chamada de sucesso
      } else {
        throw new Error('Failed to update book');
      }
    })
    .catch(error => {
      console.error('Error updating book: ', error);
      // Adicione qualquer lógica adicional de tratamento de erro aqui
    });
  };

  const handleCancel = () => {
    // Chama a função de cancelamento passada do componente pai
    onCancel();
  };

  return (
    <div className='register-container'>
      <h2 className='register-title'>Editar livro</h2>
      <form onSubmit={handleSubmit}>
          <input className='register-input' type="text" placeholder='Título' value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className='register-input' type="text" placeholder='Autor(a)' value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input className='register-input' type="text" placeholder='Ano de lançamento' value={year} onChange={(e) => setYear(e.target.value)} />
          <input className='register-input' type="text" placeholder='Editora' value={publisher} onChange={(e) => setPublisher(e.target.value)} />
        <button className='register-button' type="submit">Salvar</button>
        <button className='register-button' type="button" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default UpdateBook;
