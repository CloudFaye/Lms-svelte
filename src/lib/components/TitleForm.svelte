<script lang="ts">
import { Button } from "$lib/components/ui/button"
import * as Form from "$lib/components/ui/form"
import { Input } from "$lib/components/ui/input"
import { get } from 'svelte/store';
import { page } from "$app/stores";
import { titleSchema } from "$lib/schema";
import { Loader2, Pencil } from "lucide-svelte";
import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
import { zodClient } from "sveltekit-superforms/adapters";
import { toast } from "svelte-sonner";
type TitleSchema = typeof titleSchema
export let data: SuperValidated<Infer<TitleSchema>>
const form = superForm(data,{
    validators: zodClient(titleSchema),
    resetForm: false,
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

const {form:formData, enhance, delayed, submitting} = form

let isEditing = false;
function toggleEdit(){
    isEditing =!isEditing
};
const pageData = get(page);
</script>

<div class="mt-6 border bg-muted rounded-md p-4">
    <div class="font-medium flex items-center justify-between">
        Course title 
        <button on:click={toggleEdit} aria-label="bds" class="flex gap-3 justify-between" >
            {#if isEditing}
            Cancel
                {:else}
                <Pencil class='size-4 mt-1'/>
                Edit title
            {/if}
        </button>


        <!--<Button on:click= {toggleEdit} type='Button' variant='outline'>-->
            
    </div>

    {#if !isEditing}
        <p class='mt-2 text-sm '>{data.data.title}</p>
        {:else}
        <form action="/teacher/courses/{$page.params.courseId}/?/updateTitle" method="POST" 
        use:enhance
        class='space-y-4 mt-4'>

        <Form.Field {form} name="title">
            <Form.Control let:attrs>
             <Form.Label>Title:</Form.Label>
             <Input placeholder='e.g Advanced web dev' class="w-full bg-white" {...attrs} bind:value={$formData.title} />
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