import {PUBLIC_BACKEND_BASE_URL} from '$env/static/public';

export async function checkout(evt) {
    evt.preventDefault()

    const price = evt.target.dataset.price
    const title = evt.target.dataset.title
    const description = evt.target.dataset.description
        const imageData = {
            title: title,
            price: price,
            description: description,
        }
    
    console.log(imageData)
    console.log("here 1")
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/payment', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(imageData)
      });

      console.log("here 2")
      if (resp.status == 200) {
        const res = await resp.json()
        window.location.replace(res);
      } else {
        // const res = await resp.json();
        // if (res.error)
        console.log("FAILED TO CHECKOUT")
        // formErrors = res.error;
    }
    }
  