<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { PlusCircle } from 'lucide-svelte';

export let data;
</script>



<div class="p-6">
    <div class="flex items-center py-2">
        <Button href='/teacher/create' class='ml-auto gap-4' >
            <PlusCircle class='size-4 mr-2' /> New course
        </Button>



    </div>
</div>