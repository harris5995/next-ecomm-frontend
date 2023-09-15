<!-- Homepage of Ecomm -->
<script>
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
  import { getTokenFromLocalStorage } from '../lib/auth.js';
	import { checkout } from '../lib/checkout.js';
  export let data;

// async function checkout() {
//       const imageData = {
//           title: data.images.title,
//           description: data.images.description,
//           price: data.images.price 
//       };

//       const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/payment', {
//           method: 'POST',
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/json',
//         // Authorization: `Bearer ${accessToken}`
//       },
//       body: JSON.stringify(imageData)
//     });

//     if (resp.status == 200) {
//       const res = await resp.json()
//       window.location.replace(res
//       );
//     } else {
//       // const res = await resp.json();
//       // if (res.error)
//       console.log("FAILED TO CHECKOUT")
//       // formErrors = res.error;
//   }
//   }

</script>



<div id="image-list" class="flex flex-wrap">
  {#each data.images as image}
      <div class="border border-gray-300 p-4 m-4 text-center flex-shrink-0">
          <a class="font-bold text-2xl" href="/images/{image.id}">{image.title}</a>
          <img class="max-w-xs max-h-xs mx-auto mb-2" src={image.url} alt={image.url} />
          <p>{image.description}</p>
          <p>Price: ${image.price}</p>
          <button on:click={checkout} onclick="" data-title={image.title} data-price={image.price} data-description={image.description} class="btn" >Checkout</button>
        </div>
  {/each}
</div>