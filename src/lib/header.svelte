<!-- File creates navbar for website -->

<script>
    import { LoggedIn } from "./auth.js";
    import { logOut } from "./auth.js";
    // import Theme from "./Theme.svelte";
  
</script> 

<nav class="bg-gray-900 text-white p-4 flex justify-between items-center">

  <a href="/" class=" text-3xl rounded-full px-4 py-2 font-semibold btn-accent">
    NEXT Photos
  </a>
  
  <div class="flex-1"></div>

  <div class="flex items-center space-x-4">

    <div class="flex space-x-4 items-center">
      {#if $LoggedIn == true}
        <a href="/images/new" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
          Create New Listing
        </a>
        <button on:click={logOut} class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
          Log Out
        </button>
        <!-- <Theme/> -->
      {:else}
        <a href="/users/new" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
          Register
        </a>
        <a href="/login" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
          Log In
        </a>
        <!-- <Theme/> -->
      {/if}
    </div>
   
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    width: 100%;
  }
</style>

<!-- 
<nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div class="text-2xl font-bold">Company Name</div>
    <div class="space-x-4">
      <button class="bg-navy-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn">
        Sign Up
      </button>
      <button class="bg-navy-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn">
        Sign In
      </button>
    </div>
  </nav> -->