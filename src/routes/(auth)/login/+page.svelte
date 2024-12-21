<script lang="ts">
    import { enhance } from "$app/forms";
    import * as Form from "$lib/components/ui/form";
    import FormButton from "$lib/components/ui/form/form-button.svelte";
    import { Input } from "$lib/components/ui/input";
    import { Loader2 } from "lucide-svelte";
    import { loginSchema } from "$lib/schema.js";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    export let data;
    const form = superForm(data.form, {
        validators: zodClient(loginSchema)
    });
    const {form:formData,  delayed } = form;


    </script>


<div>
    <h3 class="py-5 text-center text-2xl font-semibold">Welcome</h3>
    <form 
        method="POST" 
        action="/login"
        use:enhance>
        <Form.Field {form} name="email">
         <Form.Control let:attrs>
          <Form.Label>Email:</Form.Label>
          <Input class="w-full bg" {...attrs} bind:value={$formData.email} />
          <Form.FieldErrors />
         </Form.Control>
       </Form.Field>

        <Form.Field {form} name="password">
         <Form.Control let:attrs>
          <Form.Label>password</Form.Label>
          <Input class="w-full mb-4" type="password" {...attrs} bind:value={$formData.password} />
          <Form.FieldErrors />
         </Form.Control>
        </Form.Field>

        <Form.Button class="w-full mt-4" type="submit">
            {#if $delayed}
                <Loader2 class="size-6 animate-spin"/>
            {:else}
                Login
            {/if}
        </Form.Button>
    </form>

    <div class = 'my-4 flex items-center'>
        <div class = "flex-grow border-t border-gray-300"></div>
        <div class="mx-4 text-gray-500">OR</div>
        <div class = "flex-grow border-t border-gray-300"></div>
    </div>

    <FormButton variant="secondary" href="/register" class="w-full mt-4">
        Register 
    </FormButton>


</div>

