<script>
    let question = "";
    let option_1 = "";
    let option_2 = "";
    let getError = "";
    let createError = "";

    async function createPoll() {
        try {
            const publishedAt = new Date().toISOString();
            const newDate = new Date();
            newDate.setFullYear(newDate.getFullYear() + 1);
            const validUntil = newDate.toISOString();
            const options = [
                {
                    "caption": option_1,
                    "presentationOrder": 1,
                },
                {
                    "caption": option_2,
                    "presentationOrder": 2,
                },
            ];
            const data = {
                question,
                publishedAt,
                validUntil,
                options
            };
            const res = await fetch("/api/Polls", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                createError = "Failed to create poll" + res.status;
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            window.location.reload();
        } catch (error) {
            createError = "Failed to create poll";
            console.error("Failed to create poll:", error);
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
            getError = "Failed to fetch polls";
            return [];
        }
    }

    async function vote(pollId, optionId) {
        try {
            const data = {
                pollId,
                optionId,
                publishedAt: new Date().toISOString(),
            };
            const res = await fetch("/api/Votes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            alert("Vote successful");
        } catch (error) {
            console.error("Failed to vote:", error);
        }
    }
</script>

<div class="w3-container w3-content" style="max-width: 800px;">
    <!-- <Link to="/register">Register</Link> -->
    <h1 class="w3-center">Polls</h1>
    <p>{getError}</p>
    <ul class="w3-ul">
        {#await getPolls()}
            <p>Loading...</p>
        {:then polls}
            {#each polls as poll}
                <div class="w3-panel w3-container w3-card-4">
                    <li>{poll.question}</li>
                    <li>Published at: {poll.publishedAt}</li>
                    <li>
                        Choices:
                        <ul>
                            {#each poll.options as choice}
                                <li>{choice.caption}</li>
                                <form on:submit|preventDefault={() => vote(poll.id, choice.id)}>
                                    <button type="submit" class="w3-button w3-blue">Vote</button>
                                </form>
                            {/each}
                        </ul>
                    </li>
                </div>
            {/each}
        {:catch error}
            <p>{error.message}</p>
        {/await}
    </ul>
    <h2 class="w3-center">Create Poll</h2>
    <p>{createError}</p>
    <form on:submit|preventDefault={createPoll} class="w3-panel">
        <label for="question">Question</label>
        <input
            type="text"
            id="question"
            class="w3-input"
            bind:value={question}
            placeholder="Poll question"
            required
        />
        <label for="options">Options</label>
        <input
            type="text"
            id="option_1"
            class="w3-input"
            bind:value={option_1}
            placeholder="Poll option 1"
            required
        />
        <input
            type="text"
            id="option_2"
            class="w3-input"
            bind:value={option_2}
            placeholder="Poll option 2"
            required
        /> <br>
        <button type="submit" class="w3-button w3-blue">Create Poll</button>
    </form>
</div>
