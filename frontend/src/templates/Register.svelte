<script>
    import { navigate } from "svelte-routing";
    let email = "";
    let password = "";
    let error = "";

    function login() {
        navigate("/login");
    }

    async function submitRegister() {
        const data = { email, password };
        let url = "/register";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const res = await response;
        if (res.ok) error = "Registration successful";
        else {
            const data = await res.json();
            error = data.message || "Registration error";
        }
    }
</script>

<div class="w3-container w3-content" style="max-width: 800px;">
    <h1 class="text-center">Register</h1>
    <form on:submit|preventDefault={submitRegister} class="w3-panel">
        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            bind:value={email}
            class="w3-input"
            required
        />
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            bind:value={password}
            class="w3-input"
            required
        />
        <button type="submit" class="w3-button w3-blue">Register</button>
        <p>{error}</p>
    </form>
    <button on:click={login} class="w3-button w3-blue">Login</button>
</div>
