<!-- Homepage of Ecomm -->
<script>
    import Header from '../lib/header.svelte';
    import Footer from '../lib/footer.svelte';
    export let data;
  
    console.log(data)
  
  </script>
  
 

<div id="image-list" class="flex flex-wrap">
    <!-- Product items will be displayed here -->
    {#each data.images as image (image.id)}
        <div class="border border-gray-300 p-4 m-4 text-center flex-shrink-0">
            <a class="font-bold text-2xl" href="/images/{image.id}">{image.title}</a>
            <img class="max-w-xs max-h-xs mx-auto mb-2" src={image.url} alt={image.url} />
            <p>{image.description}</p>
            <p>Price: ${image.price}</p>
        </div>
    {/each}
</div>
  
  <!-- <Footer /> -->