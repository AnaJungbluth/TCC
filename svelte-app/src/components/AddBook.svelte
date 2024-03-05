<!-- AddBook.svelte -->
<script>
    import { createEventDispatcher } from "svelte";

    export let onAddSuccess;
    export let onCancel;

    let newBookTitle = "";
    let newBookAuthor = "";
    let newBookYear = ""; // Novo campo para o ano de lançamento
    let newBookPublisher = ""; //

    const dispatch = createEventDispatcher();

    function addBook() {
        // Enviar o novo livro para a API e chamar a função de sucesso
        fetch("http://localhost:3001/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: newBookTitle,
                author: newBookAuthor,
                year: newBookYear,
                publisher: newBookPublisher,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                onAddSuccess(); // Chama a função de sucesso passada pelo componente pai
                resetForm(); // Limpar os campos após adicionar o livro
            })
            .catch((error) => {
                console.error("Error adding book: ", error);
            });
    }

    function resetForm() {
        newBookTitle = "";
        newBookAuthor = "";
        newBookYear = "";
        newBookPublisher = "";
    }

    function cancelAdd() {
        resetForm(); // Limpar os campos ao cancelar a adição
        onCancel(); // Emitir evento de cancelamento para o componente pai
    }
</script>

<div class="register-container">
    <h2 class="register-title">Adicionar livro</h2>
    <form on:submit|preventDefault={addBook}>
        <input
            class="register-input"
            type="text"
            placeholder="Título"
            bind:value={newBookTitle}
        />
        <input
            class="register-input"
            type="text"
            placeholder="Autor(a)"
            bind:value={newBookAuthor}
        />
        <input
            class="register-input"
            type="text"
            placeholder="Ano de lançamento"
            bind:value={newBookYear}
        />
        <input
            class="register-input"
            type="text"
            placeholder="Editora"
            bind:value={newBookPublisher}
        />
        <button class="register-button" type="submit">Adicionar</button>
        <button class="register-button" type="button" on:click={cancelAdd}
            >Cancelar</button
        >
    </form>
</div>
