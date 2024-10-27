<script>
  import { Router, Route } from 'svelte-routing';
  import Authorization from './Authorization.svelte';
  import Login from './templates/Login.svelte';
  import Register from './templates/Register.svelte';
  import Index from './templates/Index.svelte';
</script>

<Router>
  <Route path="/" component={Index} />
  <Route path="/login" component={Login} />
  <Route path="/register" component={Register} />
</Router>