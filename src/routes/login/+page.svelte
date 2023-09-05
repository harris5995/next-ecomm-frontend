<script>
    import { authenticateUser } from "../../lib/auth";
    import { goto } from '$app/navigation';
  
    async function signIn(evt) {
      evt.preventDefault();
  
      const userData = {
        email: evt.target['email'].value,
        password: evt.target['password'].value,
      };
  
        const res = await authenticateUser(userData.email, userData.password);
        if (res.success) {
          goto('/');
  
        } else {
        }
      }
  </script>

<div class="flex justify-center items-center mt-20">
    <form on:submit={signIn} class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
  
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-semibold mb-2" for="email">
          Email
        </label>
        <input class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="johndoe">
      </div>
  
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-semibold mb-2" for="password">
          Password
        </label>
        <input class="shadow appearance-none rounded-lg w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="**********">
      </div>
  
      <div class="flex items-center justify-center">
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-10 rounded-lg focus:outline-none focus:shadow-outline"
          
        >
          
          Sign In
        </button>
      </div>
    </form>
  </div>