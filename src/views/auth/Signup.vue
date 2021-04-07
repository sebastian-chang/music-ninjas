<template>
  <form @submit.prevent="handleSignup">
    <h3>Sign Up</h3>
    <input type="text" placeholder="Display Name" v-model="displayName" />
    <input type="email" placeholder="Email Address" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign Up</button>
    <button v-else disabled>Loading</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const { error, signup, isPending } = useSignup()
    const router = useRouter()

    const email = ref('')
    const password = ref('')
    const displayName = ref('')

    const handleSignup = async () => {
      const res = await signup(email.value, password.value, displayName.value)
      if (!error.value) {
        console.log('User created')
        router.push({ name: 'UserPlaylists' })
      }
    }
    return { email, error, password, handleSignup, isPending, displayName }
  }
}
</script>

<style>
</style>
