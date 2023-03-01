<script lang="ts">
    import { themeChange } from "theme-change";
    import { onMount } from "svelte";

    onMount(() => {
        themeChange(false);
    });
</script>

<main class="m-auto w-5/6 sm:w-3/4 lg:w-[51.5%]">
    <h1 class="text-4xl font-semibold dark:text-zinc-50">SafeSend</h1>
    <input
        type="checkbox"
        data-toggle-theme="dark,light"
        checked={localStorage.theme === "light"}
    />
</main>

<style global>
    @tailwind utilities;
    @tailwind components;
    @tailwind base;
</style>
