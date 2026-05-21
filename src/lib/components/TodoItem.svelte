<script lang="ts">
	import type { Todo } from '$lib/todos.svelte';

	interface Props {
		todo: Todo;
		onEdit: (id: string, text: string) => void;
		onDelete: (id: string) => void;
	}

	let { todo, onEdit, onDelete }: Props = $props();

	let editing = $state(false);
	let editText = $state('');
	let editInput = $state<HTMLInputElement | null>(null);

	function startEdit() {
		editText = todo.text;
		editing = true;
	}

	$effect(() => {
		if (editing) editInput?.focus();
	});

	function saveEdit() {
		const trimmed = editText.trim();
		if (trimmed) onEdit(todo.id, trimmed);
		editing = false;
	}

	function cancelEdit() {
		editing = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') saveEdit();
		if (e.key === 'Escape') cancelEdit();
	}

	const createdAt = $derived(
		new Intl.DateTimeFormat('en-US', {
			dateStyle: 'medium',
			timeStyle: 'short'
		}).format(new Date(todo.createdAt))
	);
</script>

<li class="todo-item">
	{#if editing}
		<input
			class="edit-input"
			type="text"
			bind:value={editText}
			bind:this={editInput}
			onkeydown={handleKeydown}
		/>
		<div class="actions">
			<button onclick={saveEdit}>Save</button>
			<button onclick={cancelEdit}>Cancel</button>
		</div>
	{:else}
		<div class="content">
			<span class="text">{todo.text}</span>
			<span class="date">Created {createdAt}</span>
		</div>
		<div class="actions">
			<button onclick={startEdit}>Edit</button>
			<button class="delete" onclick={() => onDelete(todo.id)}>Delete</button>
		</div>
	{/if}
</li>

<style>
	.todo-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: var(--surface);
		box-shadow: 0 1px 3px rgba(46, 31, 15, 0.06);
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.text {
		font-size: 1rem;
		color: var(--text);
	}

	.date {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.edit-input {
		flex: 1;
		padding: 0.4rem 0.6rem;
		font-size: 1rem;
		font-family: inherit;
		color: var(--text);
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 6px;
		outline: none;
	}

	.edit-input:focus {
		border-color: var(--accent);
		box-shadow: 0 0 0 2px rgba(139, 94, 60, 0.18);
	}

	.actions {
		display: flex;
		gap: 0.4rem;
		flex-shrink: 0;
	}

	button {
		padding: 0.3rem 0.75rem;
		font-size: 0.85rem;
		font-family: inherit;
		border: 1px solid var(--border);
		border-radius: 6px;
		background: var(--bg);
		cursor: pointer;
		color: var(--text);
	}

	button:hover {
		background: var(--surface);
	}

	button.delete {
		border-color: var(--danger-border);
		color: var(--danger);
	}

	button.delete:hover {
		background: #fdf0ea;
	}
</style>
