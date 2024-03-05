import React, { useState } from 'react';

const AddBook = ({ onAddSuccess, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [publisher, setPublisher] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, year, publisher }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Book added: ', data);
      // Limpa os campos após adicionar um novo livro com sucesso
      setTitle('');
      setAuthor('');
      setYear('');
      setPublisher('');
      onAddSuccess(); 
    })
    .catch(error => {
      console.error('Error adding book: ', error);
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className='register-container'>
      <h2 className='register-title'>Adicionar novo Livro</h2>
      <form onSubmit={handleSubmit}>
          <input className='register-input' placeholder='Título' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className='register-input' placeholder='Autor(a)' type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input className='register-input' placeholder='Ano de lançamento' type="text" value={year} onChange={(e) => setYear(e.target.value)} />
          <input className='register-input' placeholder='Editora' type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
        <button className='register-button' type="submit">Adicionar</button>
        <button className='register-button' type="button" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default AddBook;
