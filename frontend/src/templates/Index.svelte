<script>
    import { Link } from "svelte-routing";
    import Logout from "../lib/Logout.svelte";
    import Authorization from "../Authorization.svelte";
    import Polls from "./Polls.svelte";

    let question = "";
    let option_1 = "";
    let option_2 = "";
    let options = [];

</script>

<Authorization let:user_email>
    <main>
        <Logout>Log Out {user_email}</Logout>
        <Polls />
    </main>
</Authorization>
