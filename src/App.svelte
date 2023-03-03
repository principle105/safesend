<script lang="ts">
    import { onMount } from "svelte";
    import { themeChange } from "theme-change";
    import FileInput from "./components/FileInput.svelte";
    import IoIosMoon from "svelte-icons/io/IoIosMoon.svelte";
    import IoIosSunny from "svelte-icons/io/IoIosSunny.svelte";
    import Test from "./components/Test.svelte";
    import { encryptFileWithPassword } from "./utils";

    onMount(() => {
        themeChange(false);
    });

    let checked: boolean = localStorage.theme === "light";
    let files: FileList | null = null;

    let password: string = "";
    let confirmPassword: string = "";

    const handleEncryption = async (e: MouseEvent) => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const file = files && files[0];
        files = null;

        if (!file) return;

        e.preventDefault();

        const { data, iv, salt, extension } = await encryptFileWithPassword(
            file,
            password
        );

        const div = document.createElement("div");

        new Test({
            target: div,
            props: {
                fileData: data,
                iv,
                salt,
                extension,
            },
        });

        const blob = new Blob([div.outerHTML], { type: "text/html" });

        const a = document.createElement("a");

        a.setAttribute("download", `encrypted-${file.name}.html`);
        a.setAttribute("href", window.URL.createObjectURL(blob));
        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);
    };
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
            class="w-10 h-10 text-zinc-700 dark:text-zinc-300 cursor-pointer"
            for="checkbox"
        >
            {#if checked}
                <IoIosSunny />
            {:else}
                <IoIosMoon />
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
            bind:value={password}
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
            bind:value={confirmPassword}
            placeholder="•••••••••"
            required
        />
    </div>
    <FileInput bind:files />
    <div class="mt-4">
        <button
            on:click={handleEncryption}
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
