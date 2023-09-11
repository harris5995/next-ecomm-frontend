

<!-- Contains the stuff that appears on all webpages -->

<script>
  import "../app.css";
  import Header from "../lib/header.svelte";
  import Footer from "../lib/footer.svelte";
  // import Alert from "../lib/Alert.svelte";
</script>

<style>
  main {
    padding-top: 3rem; /* Increase this value as needed */
  }

   /* Add margin-top to Alert to move it down */
   /* .alert-container {
    margin-top: 2rem;  */
    /* Adjust this value to move the Alert down */
  /* } */

</style>

<Header/>
<Footer/>

<!-- <div class="alert-container">
  <Alert/>
</div> -->


<main>
<slot />
</main>