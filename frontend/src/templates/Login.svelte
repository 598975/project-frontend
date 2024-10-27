<script>
    import { navigate } from "svelte-routing";
    let email = "";
    let password = "";
    let error = "";
    let remember = false;

    function register() {
        navigate("/register");
    }

    async function submitLogin() {
        const data = { email, password };
        let url = "/login";
        if (remember) {
            url += "?useCookies=true";
        } else {
            url += "?useSessionCookies=true";
        }
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const res = await response;
        if (res.ok) window.location.href = "/";
        else {
            const data = await res.json();
            error = data.message || "Login error";
        }
    }
</script>

<div class="w3-container w3-content" style="max-width: 800px;">
    <h1 class="text-center">Login</h1>
    <form on:submit|preventDefault={submitLogin} class="w3-panel">
        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} class="w3-input" />
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            bind:value={password}
            class="w3-input"
            required
        />
        <label for="remember">Remember me</label>
        <input type="checkbox" id="remember" bind:checked={remember} required />
        <br />
        <button type="submit" class="w3-button w3-blue">Login</button>
        <p>{error}</p>
    </form>
    <button on:click={register} class="w3-button w3-blue">Register</button>
</div>
