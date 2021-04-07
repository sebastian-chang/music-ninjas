<template>
  <form @submit.prevent="handleLogin">
    <h3>Login</h3>
    <input type="email" placeholder="Email Address" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Login</button>
    <button v-else disabled>Loading</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const { error, login, isPending } = useLogin()
    const router = useRouter()

    const email = ref('')
    const password = ref('')

    const handleLogin = async () => {
      const res = await login(email.value, password.value)
      if (!error.value) {
        console.log('User logged in')
        router.push({ name: 'UserPlaylists' })
      }
    }
    return { email, error, password, handleLogin, isPending }
  }
}
</script>

<style>
</style>
