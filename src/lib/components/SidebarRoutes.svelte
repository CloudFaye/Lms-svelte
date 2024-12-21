<script lang="ts">
	import { ChartNoAxesColumnIncreasing,List } from "lucide-svelte";
	import SidebarItems from "./SidebarItems.svelte";

    const routes = [
        {icon:List,
        label:'courses',
        href: '/teacher/courses'},

        {
        icon:ChartNoAxesColumnIncreasing,
        label:'Analytics',
        href: '/teacher/Analytics' }];
</script>

<div class=" flex flex-col w-full">
    {#each routes as { href, icon, label }}
    <SidebarItems   {icon} {href} {label}  />
    {/each}
</div>