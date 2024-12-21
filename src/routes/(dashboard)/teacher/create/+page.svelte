<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

export let data;

const form = superForm(data.form, {
    validators: zodClient()
})
</script>

<div class="max-w-5xl mx-auto md:items-center md:justify-center h-full border p-6">
    <div>
        <h1 class= 'text-2xl'>Name your course</h1>
        <p class='text-muted-foreground text-sm'>Oluwaseun, its time to create a new course</p>
        <form action='teacher/create' method="POST" class='space-y-8 mt-8'>

        </form>
    </div>
</div>