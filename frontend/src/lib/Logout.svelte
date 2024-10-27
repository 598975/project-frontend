<script>
    async function logout() {
        const res = await fetch("/logout", {
            method: "POST",
        });
        if (res.ok) window.location.href = "/";
    }
</script>

<a href="/" on:click|preventDefault={logout}>
    <slot></slot>
</a>