<script>
    export let id;
    export let bookData;
    export let onUpdateSuccess;
    export let onCancel;

    let title = "";
    let author = "";
    let year = "";
    let publisher = "";
    let titleInput;
    let authorInput;
    let yearInput;
    let publisherInput;

    $: {
        if (bookData) {
            title = bookData.title;
            author = bookData.author;
            year = bookData.year;
            publisher = bookData.publisher;
        }
    }

    const updateBook = async () => {
        const response = await fetch(`http://localhost:3001/books/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, author, year, publisher }),
        });
        if (response.ok) {
            onUpdateSuccess();
            console.log("Livro atualizado com sucesso");
        } else {
            console.error("Erro de rede ou exceção:", error);
        }
    };

    function handleTitleInput(event) {
        title = event.target.value;
    }

    function handleAuthorInput(event) {
        author = event.target.value;
    }

    function handleYearInput(event) {
        year = event.target.value;
    }

    function handlePublisherInput(event) {
        publisher = event.target.value;
    }

    function cancelUpdate() {
        onCancel(); 
    }
</script>

<div class="register-container">
    <h2 class="register-title">Editar livro</h2>
    <input
        class="register-input"
        type="text"
        placeholder="Título"
        bind:this={titleInput}
        on:input={handleTitleInput}
        value={title}
    />
    <input
        class="register-input"
        type="text"
        placeholder="Autor(a)"
        bind:this={authorInput}
        on:input={handleAuthorInput}
        value={author}
    />
    <input
        class="register-input"
        type="text"
        placeholder="Ano de lançamento"
        bind:this={yearInput}
        on:input={handleYearInput}
        value={year}
    />
    <input
        class="register-input"
        type="text"
        placeholder="Editora"
        bind:this={publisherInput}
        on:input={handlePublisherInput}
        value={publisher}
    />
    <button class="register-button" on:click={() => updateBook(id)}
        >Salvar</button
    >
    <button class="register-button" type="button" on:click={cancelUpdate}
        >Cancelar</button
    >
</div>
