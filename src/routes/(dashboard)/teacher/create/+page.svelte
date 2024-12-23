<script lang="ts">
	import { titleSchema } from '$lib/schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
    import * as Form from "$lib/components/ui/form"
    import { Input } from "$lib/components/ui/input"
	import FormFieldErrors from '$lib/components/ui/form/form-field-errors.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Loader2 } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import FormButton from '$lib/components/ui/form/form-button.svelte';

    
    export let data;   



const form = superForm(data.form, { 
    validators: zodClient(titleSchema),
    onUpdated({form}){
        if(form.message) {if(!form.valid && $submitting){
            toast.error(form.message || 'Hey, check form for errors');
            
        } }
    }

});

 const {form: formData, enhance, delayed, submitting, allErrors, message } = form;



</script>

<div class="max-w-5xl  mx-auto flex md:justify-center md:items-center  h-full border p-6">
    <div class='w-[32rem]'>
        <h1 class='text-2xl'>Name your course</h1>
        <p class='text-muted-foreground text-sm'>Oluwaseun, its time to create a new course</p>
        <form action='/teacher/create' use:enhance  method="POST" class='space-y-8 mt-8'>
            <Form.Field {form}  name="title">
                <Form.Control let:attrs>
                 <Form.Label>Title</Form.Label>
                 <Input class="w-full bg" {...attrs} bind:value={$formData.title} />
                 <Form.FieldErrors />
                </Form.Control>
                <Form.Description>What would you teach</Form.Description>
                <FormFieldErrors />
              </Form.Field>

              

              <div class="flex items-center gap-x-2">
                <Button variant='ghost'>Cancel</Button>
                <FormButton > {#if $delayed} <Loader2 class='size-6 animate-spin' /> {:else}  continue {/if} </FormButton>
            
                
              </div>

        </form>
    </div>
</div>