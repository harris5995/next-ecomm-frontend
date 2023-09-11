<script>
    export let item;
  </script>
  
  <div class="border p-4 m-2 text-center bg-white shadow-md">
    <img src={item.image} alt={item.name} class="max-w-full h-auto mb-2">
    <h2 class="text-lg font-semibold">{item.name}</h2>
    <p>{item.description}</p>
    <span class="font-semibold text-red-600">${item.price}</span>
    <button class="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
      Add to Cart
    </button>
  </div>