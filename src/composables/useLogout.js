import { ref } from "@vue/reactivity"
import { projectAuth } from "../firebase/config"

const error = ref(null)
const isPending = ref(false)

const logout = async () => {
  error.value = null
  isPending.value = true
  try {
    await projectAuth.signOut()
    isPending.value = false
  }
  catch (err) {
    console.error(erro)
    error.value = err.message
    isPending.value = false
  }
  error.value = null
}

const useLogout = () => {
  return { error, logout, isPending }
}

export default useLogout
