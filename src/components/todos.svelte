<script>
    import todosStore from '$stores/todosStore'

    let newtodo = '';

    const addtodo = () => {
        if (newtodo.trim() !== '') {
            todosStore.addtodo({ text: newtodo, completed: false });
            newtodo = '';
        }
    };

    const deletetodo = id => {
        todosStore.deletetodo(id);
    };

    const updatetodo = async (todo) => {
        await todosStore.updatetodo(todo);
    };
</script>
<h1>ToDos List</h1>
<!-- Je créer un simple champ de texte pour ajouter une tâche, et un bouton pour ajouter la tâche à la liste.-->
<input type="text" bind:value={newtodo} placeholder="Ajouter une tâche..." on:keydown={e => e.key === 'Enter' && addtodo()} />
<button on:click={addtodo}>Ajouter</button>

<!-- Ensuite, je crée une liste de tâches avec une case à cocher pour marquer la tâche comme terminée, un bouton pour supprimer la tâche et un bouton pour afficher le JSON de la liste des tâches. -->
<ul>
    {#each $todosStore as todo (todo.id)}
        <li>
            <input type="checkbox" bind:checked={todo.completed} on:change={() => updatetodo(todo)} />
            <span>{todo.text}</span>
            <button on:click={() => deletetodo(todo.id)}>Supprimer</button>
        </li>
    {/each}
</ul>

<!-- BONUS Debug :  J'affiche mon object json récupéré de ma base  -->
<pre id="json">{JSON.stringify($todosStore, undefined, 2)}</pre>

<style>
    ul {
        list-style-type: none;
        padding: 0;
    }
</style>