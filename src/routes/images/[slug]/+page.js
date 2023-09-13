//File loads the images directory

import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

export async function load({ fetch, params }) {
  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/images/${params.slug}`,{
    method: 'GET',
    mode: 'cors',
    headers:{
        'Content-Type': 'application/json'
    }  
  });

  const res = await resp.json();
  if (resp.status == 200) {
    return {
      images: res
    }
  } else {
    return {
      images: []
    }
  }
}