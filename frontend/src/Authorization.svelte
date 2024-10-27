<script>
    import Login from "./templates/Login.svelte";

    let user_email = "";

    async function authenticate() {
        const res = await fetch("/pingauth")

        let auth = false;
        if (res.ok) {
            auth = true;
            let data = await res.json();
            user_email = data.email;
        }

        return auth;
    }
</script>

{#await authenticate()}
    <p>Authenticating...</p>
{:then authenticated}
    {#if authenticated}
        <slot>{user_email}</slot>
    {:else}
        <Login />
    {/if}
{/await}