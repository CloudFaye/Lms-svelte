<script lang="ts">
	import {ModeWatcher} from "mode-watcher";
	import '@fontsource-variable/noto-sans';
	import '../app.css';
	import { Toaster } from "$lib/components/ui/sonner";
	let { children } = $props();
</script>


<Toaster richColors closeButton />
<ModeWatcher />
 <main class='h-screen'> {@render children()}</main>
	

 


 

	

 



