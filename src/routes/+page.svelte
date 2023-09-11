<script>
    import Header from '../lib/header.svelte';
    import ItemCard from '../lib/ItemCard.svelte';
    import Footer from '../lib/footer.svelte';
    export let data;
  
    console.log(data)
    // let items = [
    //   {
    //     name: 'Product Name 1',
    //     description: 'Description of the product goes here.',
    //     price: '19.99',
    //     image: 'item1.jpg',
    //   },
    //   // Add more items here
    // ];
  </script>
  
  <Header title="Welcome to Our E-Commerce Store" />
  
  <div class="overflow-x-auto w-full ml-5 mr-5">
    <div class="flex">
        {#each data.images as image}
            <div class="mr-5">
                <div>
                    <a class="font-bold text-2xl" href="/images/{images.id}">{images.name}</a>
                    <div class="text-sm mt-1">
                        {images.category} . {images.price} USD
                    </div>
                    <div class="italic text-xs opacity-50 mt-2">
                        posted {new Date(images.created).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                </div>

                <div class="mt-4">
                    {images.description.slice(0, 240)}...
                </div>
            </div>
        {/each}
    </div>
</div>
  
  <Footer />