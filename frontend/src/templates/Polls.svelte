<script>
    import { navigate } from "svelte-routing";
    let question = "";
    let option_1 = "";
    let option_2 = "";
    let options = [];

    async function createPoll() {
        try {
            const publishedAt = new Date();
            const validUntil = new Date();
            validUntil.setFullYear(publishedAt.getFullYear() + 1);
            options = [
                    { 
                        caption: option_1,
                        presentationOrder: 1
                    }, 
                    { 
                        caption: option_2,
                        presentationOrder: 2 
                    }
            ];
            const data = {
                question,
                options
            };
            const res = await fetch("/api/Polls", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data }),
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const result = await res.json();
            return result;
        } catch (error) {
            console.error("Failed to create poll:", error);
            return [];
        }
    }

    async function getPolls() {
        try {
            const res = await fetch("/api/Polls");
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch polls:", error);
            return [];
        }
    }
</script>

<div class="w3-container w3-content" style="max-width: 800px;">
    <!-- <Link to="/register">Register</Link> -->
    <h1 class="w3-center">Polls</h1>
    <ul class="w3-ul">
        {#await getPolls()}
            <p>Loading...</p>
        {:then polls}
            {#each polls as poll}
                <li>{poll.question}</li>
                <li>Published at: {poll.publishedAt}</li>
                <li>
                    Choices:
                    <ul>
                        {#each poll.options as choice}
                            <li>{choice.caption}</li>
                        {/each}
                    </ul>
                </li>
            {/each}
        {:catch error}
            <p>{error.message}</p>
        {/await}
    </ul>
    <form on:submit|preventDefault={createPoll} class="w3-panel">
        <label for="question">Question</label>
        <input type="text" id="question" class="w3-input" required />
        <label for="options">Options</label>
        <input type="text" id="option_1" class="w3-input" required />
        <input type="text" id="option_2" class="w3-input" required />
        <button type="submit" class="w3-button w3-blue">Create Poll</button>
    </form>
</div>
