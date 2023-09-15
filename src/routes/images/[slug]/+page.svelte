<script>
	import { getUserId, LoggedIn } from '../../../lib/auth.js';
    import { getTokenFromLocalStorage } from '../../../lib/auth.js';
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
    import { goto } from '$app/navigation';

    export let data;

    async function deletePost(id) {
        const accessToken = getTokenFromLocalStorage();

        console.log(data.images.id)
        console.log(accessToken)

        // try {
            console.log(1)
            const response = await fetch(PUBLIC_BACKEND_BASE_URL + `/images/${data.images.id}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({id})
                })
        // },
            console.log(2)
            if (response.status == 200) {
                goto('/');
            }
        // } catch (error) {
        //     console.error('An error occurred while deleting the post:', error);
        // }
    }

    async function checkout() {
        const accessToken = getTokenFromLocalStorage()
        const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/', {
            method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(imageData)
      });

      if (resp.status == 200) {
        window.location.replace(
        "",
        );
      } else {
        const res = await resp.json();
        if (res.error)
        console.log(res.error)
        formErrors = res.error;
    }
    }

</script>

{#if $LoggedIn && getUserId() == data.images.user_id}
    <div>
        <button class="btn">
            <a href = '/images/${data.images.id}/editForm'>Edit Post</a> 
        </button>
        <button class="btn" on:click={deletePost(data.images.id)}>
            Delete Post
        </button>      
    </div>
    {/if }

    <div id="image-list" class="flex flex-wrap">
            <div class="border border-gray-300 p-4 m-4 text-center flex-shrink-0">
                <a class="font-bold text-2xl" href="/images/{data.images.id}">{data.images.title}</a>
                <img class="max-w-xs max-h-xs mx-auto mb-2" src={data.images.url} alt={data.images.url} />
                <p>{data.images.description}</p>
                <p>Price: ${data.images.price}</p>
                <!-- Checkout button below -->
                <form action="/" method="POST">
                    <button on:click={checkout} data-title={data.images.title} data-price={data.images.price} data-descripiton={data.images.descripiton} class="btn" >Checkout</button>
                  </form>
            </div>

    </div>


