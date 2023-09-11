//JS of Homepage

import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

export async function load({ fetch }) {
  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/images',{
    method: 'GET',
    mode: 'cors',
    headers:{
        'Content-Type': 'application/json'
    }
  })

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