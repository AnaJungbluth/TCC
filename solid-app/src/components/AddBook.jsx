import { createSignal } from 'solid-js';

export async function createBook(newBook) {
    const BASE_URL = 'http://localhost:3001'; // URL base da sua API

    try {
        const response = await fetch(`${BASE_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao criar livro:', error);
        return null;
    }
}

export default function AddBook({ onBookAdded, onHideForm, onCancel }) {
    const [newBook, setNewBook] = createSignal({ title: '', author: '', year: '', publisher: '' });

    const handleAddBook = async () => {
        const createdBook = await createBook(newBook());
        if (createdBook) {
            onBookAdded(createdBook); // Passa o novo livro como argumento para a função de retorno
            setNewBook({ title: '', author: '', year: '', publisher: '' }); // Limpa os campos de título e autor após adicionar o livro
            onHideForm(); // Oculta o formulário após adicionar o livro
        }
    };

    const handleCancel = () => {
        onCancel(); // Chama a função de cancelar
    };

    return (
        <div className='register-container'>
            <h2 className='register-title'>Adicionar novo livro</h2>
            <input className='register-input' type="text" placeholder="Título" value={newBook().title} onInput={(e) => setNewBook({ ...newBook(), title: e.target.value })} />
            <input className='register-input' type="text" placeholder="Autor(a)" value={newBook().author} onInput={(e) => setNewBook({ ...newBook(), author: e.target.value })} />
            <input className='register-input' type="text" placeholder="Ano de lançmento" value={newBook().year} onInput={(e) => setNewBook({ ...newBook(), year: e.target.value })} />
            <input className='register-input' type="text" placeholder="Editora" value={newBook().publisher} onInput={(e) => setNewBook({ ...newBook(), publisher: e.target.value })} />
            <button className='register-button' onClick={handleAddBook}>Adicionar</button> 
            <button className='register-button' onClick={handleCancel}>Cancelar</button>
        </div>
    );
}
