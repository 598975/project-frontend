<script>
    import { Link } from "svelte-routing";
    import Logout from "../lib/Logout.svelte";
    import Authorization from "../Authorization.svelte";


</script>

<Authorization let:user_email> 
    <main>
        <Logout>Log Out {user_email}</Logout>
        <Link to="/register">Register</Link>
    </main>
</Authorization>