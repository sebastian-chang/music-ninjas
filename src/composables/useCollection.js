import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {
  const error = ref(null)
  const isPending = ref(false)

  const addDoc = async (chatDoc) => {
    error.value = null
    isPending.value = true

    try {
      await projectFirestore.collection(collection).add(chatDoc)
      isPending.value = false
    }
    catch (err) {
      console.error(err.message)
      error.value = 'Could not send message'
      isPending.value = false
    }
  }

  return { error, addDoc, isPending }
}

export default useCollection
