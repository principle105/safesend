<script lang="ts">
    import { onMount } from "svelte";
    import { themeChange } from "theme-change";
    import FileInput from "./components/FileInput.svelte";
    import IoMdSunny from "svelte-icons/io/IoMdSunny.svelte";
    import IoMdMoon from "svelte-icons/io/IoMdMoon.svelte";

    onMount(() => {
        themeChange(false);
    });

    let checked = localStorage.theme === "light";
</script>

<main class="mx-auto w-5/6 sm:w-3/4 lg:w-[51.5%] mt-9">
    <div class="flex justify-between mb-6 items-center">
        <h1 class="text-4xl font-semibold dark:text-zinc-50">SafeSend</h1>
        <input
            type="checkbox"
            id="checkbox"
            class="hidden"
            data-toggle-theme="dark,light"
            bind:checked
        />
        <label
            class="w-9 h-9 text-zinc-700 dark:text-zinc-300 cursor-pointer"
            for="checkbox"
        >
            {#if checked}
                <IoMdSunny />
            {:else}
                <IoMdMoon />
            {/if}
        </label>
    </div>
    <div class="mb-6">
        <label
            for="password"
            class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
        >
            Password
        </label>
        <input
            type="password"
            id="password"
            class="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
        />
    </div>
    <div class="mb-6">
        <label
            for="confirm_password"
            class="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
        >
            Confirm password
        </label>
        <input
            type="password"
            id="confirm_password"
            class="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
        />
    </div>
    <FileInput />
    <div class="mt-4">
        <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
            Encrypt
        </button>
    </div>
</main>

<style global>
    @tailwind utilities;
    @tailwind components;
    @tailwind base;
</style>
