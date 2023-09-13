<script>
	import { getUserId, LoggedIn } from '../../../lib/auth.js';
    import { getTokenFromLocalStorage } from '../../../lib/auth.js';

    export let data;

    async function deletePost(id) {
        const accessToken = getTokenFromLocalStorage();

        console.log(data.images.id)
        console.log(accessToken)

        // try {
            console.log(1)
            const response = await fetch(`/images/${data.images.id}`, {
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
            if (response.ok) {
                goto('/');
            }
        // } catch (error) {
        //     console.error('An error occurred while deleting the post:', error);
        // }
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
            </div>

    </div>