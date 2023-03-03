<script lang="ts">
    import { decryptFileWithPassword } from "../utils";

    export let fileData: ArrayBuffer;
    export let salt: Uint8Array;
    export let iv: Uint8Array;
    export let extension: string;

    let password: string = "";

    const handlePassword = async () => {
        const data = await decryptFileWithPassword(
            fileData,
            salt,
            iv,
            password
        );

        if (data === null) {
            alert("Incorrect password");
            return;
        }

        const blob = new Blob([data], { type: extension });

        const a = document.createElement("a");

        a.setAttribute("download", "test.html");
        a.setAttribute("href", window.URL.createObjectURL(blob));
        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);
    };
</script>

<h1>Hello</h1>
<p>{extension}</p>
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
<div class="mt-4">
    <button
        on:click={handlePassword}
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
        Encrypt
    </button>
</div>
