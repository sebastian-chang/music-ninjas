import { ref } from "@vue/reactivity"
import { projectAuth } from "../firebase/config"

const error = ref(null)

const logout = async () => {
  error.value = null
  try {
    await projectAuth.signOut()
  }
  catch (err) {
    console.error(erro)
    error.value = err.message
  }
  error.value = null
}

const useLogout = () => {
  return { error, logout }
}

export default useLogout
