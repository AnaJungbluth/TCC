import { createSignal } from 'solid-js';

const BASE_URL = 'http://localhost:3001'; // URL base da sua API

async function updateBook(updatedBook) {
  try {
      const response = await fetch(`${BASE_URL}/books/${updatedBook.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedBook),
      });
      
      if (!response.ok) {
          throw new Error(`Erro ao atualizar livro: ${response.status} - ${response.statusText}`);
      }
      return true;
  } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      return false;
  }
}


export function UpdateBook({ book, onUpdate, onCancel }) {
    const [updatedBook, setUpdatedBook] = createSignal(book);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateBook(updatedBook());
        onUpdate(updatedBook()); // Atualiza localmente o livro com os novos dados
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedBook((prevBook) => ({ ...prevBook, [name]: value }));
    };

    return (
        <div className='register-container'>
            <h2 className='register-title'>Editar livro</h2>
            <form onSubmit={handleSubmit}>
                    <input className='register-input' type="text" placeholder='Título' name="title" value={updatedBook().title} onInput={handleInputChange} />
                    <input className='register-input' type="text" placeholder='Autor(a)' name="author" value={updatedBook().author} onInput={handleInputChange} />
                    <input className='register-input' type="text" placeholder='Ano de lançamento' name="year" value={updatedBook().year} onInput={handleInputChange} />
                    <input className='register-input' type="text" placeholder='Editora' name="publisher" value={updatedBook().publisher} onInput={handleInputChange} />
                <button className='register-button' type="submit">Salvar</button>
                <button className='register-button' type="button" onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
}


