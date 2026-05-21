<script lang="ts">
	import { todos } from '$lib/todos.svelte';
	import TodoItem from '$lib/components/TodoItem.svelte';

	let newText = $state('');

	function addTodo() {
		const trimmed = newText.trim();
		if (!trimmed) return;
		todos.add(trimmed);
		newText = '';
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') addTodo();
	}
</script>

<svelte:head>
	<title>To Do</title>
</svelte:head>

<main>
	<h1>To Do</h1>

	<div class="add-row">
		<input
			type="text"
			placeholder="What needs doing?"
			bind:value={newText}
			onkeydown={handleKeydown}
		/>
		<button onclick={addTodo}>Add</button>
	</div>

	{#if todos.items.length === 0}
		<p class="empty">No todos yet — add one above.</p>
	{:else}
		<ul>
			{#each todos.items as todo (todo.id)}
				<TodoItem {todo} onEdit={todos.edit} onDelete={todos.remove} />
			{/each}
		</ul>
	{/if}
</main>

<style>
	main {
		max-width: 600px;
		margin: 3rem auto;
		padding: 0 1rem;
	}

	h1 {
		font-family: 'Fraunces', serif;
		font-size: 2.25rem;
		font-weight: 700;
		color: var(--text);
		margin-bottom: 1.5rem;
		letter-spacing: -0.02em;
	}

	.add-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.add-row input {
		flex: 1;
		padding: 0.5rem 0.75rem;
		font-size: 1rem;
		font-family: inherit;
		color: var(--text);
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 6px;
		outline: none;
	}

	.add-row input::placeholder {
		color: var(--text-muted);
	}

	.add-row input:focus {
		border-color: var(--accent);
		box-shadow: 0 0 0 2px rgba(139, 94, 60, 0.18);
	}

	.add-row button {
		padding: 0.5rem 1.25rem;
		font-size: 1rem;
		font-family: inherit;
		font-weight: 500;
		background: var(--accent);
		color: #fff;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}

	.add-row button:hover {
		background: var(--accent-hover);
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.empty {
		color: var(--text-muted);
		text-align: center;
		margin-top: 2rem;
	}
</style>
