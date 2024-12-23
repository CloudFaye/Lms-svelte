<script lang="ts">
    import {page} from '$app/stores';
	import { Ghost, PencilIcon, Loader2 } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input"
	import Button from "./ui/button/button.svelte";
    import { get } from 'svelte/store';
    import { toast } from "svelte-sonner";
    import * as Form from "$lib/components/ui/form"
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import  { descriptionSchema } from '$lib/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
    let isEditing = false
    import { Textarea } from "$lib/components/ui/textarea"
    
    
    
    export let data:SuperValidated<Infer<typeof descriptionSchema>>
    function toggleEdit (){
        isEditing = !isEditing
    }

    const form = superForm(data, {
        validators: zodClient(descriptionSchema),
        onUpdated({form}) {
        if(form.message){
            if(!form.valid){
                toast.error(form.message)
            }
            else {
                toast.success(form.message)
                toggleEdit()
            }
        }
        
    },

    });
    const {form:formData, enhance, delayed, submitting} = form;
    const pageData = get(page);



</script>

<div class="mt-6 border bg-muted rounded-md p-4">
   <div class='font-medium flex items-center justify-between'>

    Course description
    <button on:click={toggleEdit} aria-label="bds" class="flex gap-3 justify-between" >
        {#if isEditing }
        Cancel 
        {:else}
        <PencilIcon class='size-4 mr-2' />
        Edit description  
     {/if}
    </button>
</div>

{#if !isEditing}
<p class='text-sm mt-2 break-all'>
<!--add initial/default description-->
  No description

</p>
{:else}
<form method="POST" use:enhance class='space-y-4 mt-4' action="/teacher/courses/{$page.params.courseId}/?/updateDescription">
    <Form.Field {form} name="description">
        <Form.Control let:attrs>
         <Form.Label>Description:</Form.Label>
         <Textarea placeholder='This course is....' class="w-full bg-white" {...attrs} bind:value={$formData.description}  />
         <Form.FieldErrors />
        </Form.Control>
      </Form.Field>

      <div class="flex items-center gap-x-2">
        <Form.Button>
            {#if $delayed}
            <Loader2 class='size-6 animate-spin' />
            {:else}
            Save
            {/if}
        </Form.Button>
      </div>
</form>
    
{/if}
</div>