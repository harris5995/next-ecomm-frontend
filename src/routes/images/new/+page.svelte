<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    let formErrors = {};
    import { getTokenFromLocalStorage, getUserId } from '../../../lib/auth.js';
    import { goto } from '$app/navigation'
    import { uploadMedia } from '../../../lib/s3-uploader.js'
	// import { alerts } from '../../../lib/alertStore.js';
    // import Spinner from '../../../lib/Spinner.svelte';
    // import { statusSpinner } from '../../../lib/spinner';

    function postSignUp() {
        //image usccess alert
        goto('/');
    } 

    // Add this line to track whether the button is clicked
    // let isLoading = false; 

    async function uploadImages(evt) {
        const id = getUserId()

        //evt.preventDefault()

        // Start the spinner
        // statusSpinner.set(true);
        // isLoading = true;
        console.log(1)
        const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
        const accessToken = getTokenFromLocalStorage();
        const imageData = {
            id: id,
            title: evt.target['title'].value,
            description: evt.target['description'].value,
            price: evt.target['price'].value,   
            url: fileUrl,
        };

        const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/item', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(imageData)
      });
  
      if (resp.status == 200) {
        postSignUp();
      } else {
      const res = await resp.json();
      if (res.error)
      formErrors = res.error;
    }
}

//Upload Media function

</script>

<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<h1 class="text-center text-3xl font-bold">Sell Your Items</h1>

<div class="flex justify-center items-center mt-8">
    <form on:submit={uploadImages} class="w-1/3">
        <div class="form-control w-full">
            <label class="label" for="title">
                <span class="label-text">Title</span>
            </label>
            <input type="text" name="title" placeholder="Maggi" class="input input-bordered w-full" required />
            {#if 'title' in formErrors}
            <label class="label" for="title">
                <span class="label-text-alt text-red-500">{formErrors['title'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="price">
                <span class="label-text">Price</span>
            </label>
            <input type="number" name="price" placeholder="RM 9999" class="input input-bordered w-full" required />
            {#if 'price' in formErrors}
            <label class="label" for="price">
                <span class="label-text-alt text-red-500">{formErrors['price'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="description">
                <span class="label-text">Description</span>
            </label>
            <input type="input" name="description" placeholder="Delicious" class="input input-bordered w-full" required />
            {#if 'description' in formErrors}
            <label class="label" for="description">
                <span class="label-text-alt text-red-500">{formErrors['description'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="file">
                <span class="label-text">Upload File</span>
            </label>
            <div class="relative">
                <input type="file" name="file" class="file-input file-input-bordered file-input-accent w-full max-w-xs" />
            </div>
            {#if 'file' in formErrors}
            <label class="label" for="file">
                <span class="label-text-alt text-red-500">{formErrors['file'].message}</span>
            </label>
            {/if}
        </div>
        
        <div class="form-control w-full mt-8">
            <button class="btn btn-md bg-white text-black">
                Submit
            </button>
        </div>
    </form>
</div>






