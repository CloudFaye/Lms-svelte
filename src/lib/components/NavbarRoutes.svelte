<script lang="ts">
import {Button} from "$lib/components/ui/button";
import LogOut from "lucide-svelte/icons/Log-out";
  import * as Avatar from "$lib/components/ui/avatar";

     
</script>

<div class="flex gap-x-2 ml-auto">

    <Button Href="/" size="sm" variant="ghost">
     <LogOut/>
     Exit
    </Button>

    <Avatar.Root>
      <Avatar.Image src="https://github.com/cloudfaye.png" alt="@Faye" />
      <Avatar.Fallback>FS</Avatar.Fallback>
    </Avatar.Root>
    
<form method="POST" action="/?/logout">
    <Button class='bg-green-600 hover:bg-green-800' size='sm' type='submit'>Logout</Button> 
</form>


</div>