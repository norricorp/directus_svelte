<script>
  import { Router, Route } from "svelte-navigator";
  import Header from "./components/Header.svelte";
  import Info from "./components/Info.svelte";
  import Footer from "./components/Footer.svelte";

  import Home from "./routes/Home.svelte";
  import ResetPW from "./routes/ResetPW.svelte";
  import Article from "./routes/Article.svelte";
  import Coverpage from "./routes/Coverpage.svelte";
  import NotFound from "./routes/NotFound.svelte";

  import { authenticated} from './stores'


  // http://localhost:8055/admin/reset-password?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5Abm9ycmljb3JwLmY5LmNvLnVrIiwic2NvcGUiOiJwYXNzd29yZC1yZXNldCIsImhhc2giOiIyMzg0MWU5YiIsImlhdCI6MTY3OTA0NDQwMywiZXhwIjoxNjc5MTMwODAzLCJpc3MiOiJkaXJlY3R1cyJ9.8_JdBAJdMrgOwaj7oFKvGtsMj5nCtc8ESRwy0yWKK7I
  // should become
  // http://localhost:3000/resetpw/eyJhbGciOiJI
  
</script>

<div class="layout">
  <Router>
    <Header />
    <Route path="/">
        <Coverpage/>
        <Info infoMembers = {false}/> 
    </Route> 
    <Route path="/resetpw" >
      <Coverpage/>
      <ResetPW />
    </Route>  
    <Route path="/everyone" primary={false}>
      <Home members = {false}/>
    </Route>
    <Route path="/membersonly" primary={false}>
      {#if $authenticated}
        <Home members = {true}/>
      {/if}
    </Route>
    <Route path="/articles/:id">
      <Article />
    </Route>
    <Route path="*">
      <NotFound />
    </Route>
  </Router>
   
  <Footer />
</div>
