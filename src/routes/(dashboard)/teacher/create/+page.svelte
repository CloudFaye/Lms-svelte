<script lang="ts">
	import { titleSchema } from '$lib/schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
    import * as Form from "$lib/components/ui/form"
    import { Input } from "$lib/components/ui/input"
	import FormFieldErrors from '$lib/components/ui/form/form-field-errors.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Loader2 } from 'lucide-svelte';
    
    

export let data;

const form = superForm(data.form, {
    validators: zodClient(titleSchema)
})

const {form: formData, enhance, delayed, submitting } = form;
</script>

<div class="max-w-5xl mx-auto md:justify-center md:items-center  h-full border p-6">
    <div>
        <h1 class='text-2xl'>Name your course</h1>
        <p class='text-muted-foreground text-sm'>Oluwaseun, its time to create a new course</p>
        <form action='teacher/create' use:enhance  method="POST" class='space-y-8 mt-8'>
            <Form.Field {form} name="title">
                <Form.Control let:attrs>
                 <Form.Label>Title</Form.Label>
                 <Input class="w-full bg" {...attrs} bind:value={$formData.title} />
                 <Form.FieldErrors />
                </Form.Control>
                <Form.Description>What would you teach</Form.Description>
                <FormFieldErrors />
              </Form.Field>

              <div class="flex items-center gap-x-2">
                <Button variant='ghsot' href=''>Cancel</Button>
                <Form.Button> 
                    {#if $delayed}
                    <Loader2 class='size-6 animate-spin' />
                    {:else}
                    continue
                    {/if}
                </Form.Button>
            
                
              </div>

        </form>
    </div>
</div>