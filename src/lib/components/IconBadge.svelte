<script lang="ts">
    import { cn } from '$lib/utils';
    import type { Icon as LucideIcon } from 'lucide-svelte';
    import type { ComponentType } from 'svelte';
    import { tv, type VariantProps } from 'tailwind-variants';

    const iconVariants = tv({
        base: 'rounded-full flex items-center justify-center',
        variants: {
            variant: {
                default: 'bg-sky-100 text-sky-700',
                success: 'bg-emerald text-emerald-700'  // Fixed typo in emerald
            },
            size: {
                default: 'p-2 size-10',
                sm: 'p-1 size-6'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    });

    type IconVariantsProps = VariantProps<typeof iconVariants>;
    
    interface Props extends IconVariantsProps {
        icon: ComponentType<LucideIcon>;
    }

    export let variant: Props['variant'] = 'default';
    export let size: Props['size'] = 'default';
    export let icon: ComponentType<LucideIcon>;
</script>

<div class={cn(iconVariants({ variant, size }))}>
    <svelte:component this={icon} />
</div>