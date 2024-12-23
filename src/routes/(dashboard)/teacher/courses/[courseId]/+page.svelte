<script lang="ts">
    import IconBadge from "$lib/components/IconBadge.svelte";
    import * as Alert from "$lib/components/ui/alert"
    import { AlertTriangle, CircleDollarSign, DollarSign, File, LayoutDashboard, ListChecksIcon } from "lucide-svelte";
	import { buttonVariants } from '$lib/components/ui/button';
	import TitleForm from '$lib/components/TitleForm.svelte';
	import  DescriptionForm  from "$lib/components/DescriptionForm.svelte";
    export let data;
$: course = data.course

$: requiredFields =[
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.category,
    course.expand?.['chapters(course)']?.some((chapter)=> chapter.isPublished)
];

$: totalFields = requiredFields.length
$: completedFields = requiredFields.filter(Boolean).length
$: completedText = `(${completedFields}/${totalFields})`;
$: isComplete = requiredFields.every(Boolean)

</script>


{#if !course.isPublished}
<Alert.Root class='bg-yellow-200/80 border border-yellow-300 rounded-none'>
    <AlertTriangle class='size-4' />
  <Alert.Title>Heads up!</Alert.Title>
  <Alert.Description>
    this course is un-published. it will not be visible to students 
  </Alert.Description>
</Alert.Root>
{/if}

<div class="p-6">
    <div class="flex items-center justify-between">
        <div class="flex-col gap-y-2">
        <h1 class=" text-2xl font-semibold">Course skeleton</h1>
        <span class="text-sm text-muted-foreground">Complete all fields {completedText}</span></div>

        // actions

    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div class="">
            <div class="flex items-center gap-x-2">

                <IconBadge icon={LayoutDashboard}/>
                <h2 class="text-lg  tracking-tight font-medium">Customise your course</h2>
            </div>
           <TitleForm data={data.titleForm} />
           <DescriptionForm data={data.descriptionForm} />
           <!--image form-->
           <!--category form-->

        </div>
        <div class="space-y-6">
            <div>
                <div class='flex items-center gap-x-2'>
                    <IconBadge icon={ListChecksIcon} size="default"/>
                    <h2 class="text-lg  tracking-tight font-medium">Course chapters </h2> 
                </div>
                <!--chapter form component-->
            </div>
            <div>
                <div class="flex items-center gap-x-2">
                    <IconBadge icon={DollarSign} />
                   <h2 class="text-lg  tracking-tight font-medium">Sell your course</h2> 
                </div>
            </div>

            <!--price form component-->

        </div>

        <div>
            
        <!--vhapter form component--> 
        </div>
        <div class='flex items-center gap-x-2'>
            <IconBadge icon={File}/>

           <h2 class="text-lg  tracking-tight font-medium">Resources and attachment</h2> 
        </div>

    </div>
</div>
