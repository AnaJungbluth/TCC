import { createSignal } from 'solid-js';

export default function ViewBook({ book, onCancel }) {
    return (
        <div className='register-container'>
            <h2 className='register-title'>Detalhes do livro</h2>
            <p>Título</p>
            <input className='register-input' type="text" value={book.title} disabled />
            <p>Autor</p>
            <input className='register-input' type="text" value={book.author} disabled />
            <p>Ano de lançamento</p>
            <input className='register-input' type="text" value={book.year} disabled />
            <p>Editora</p>
            <input className='register-input' type="text" value={book.publisher} disabled />
            <button className='register-button' onClick={onCancel}>Voltar</button>
        </div>
    );
}
