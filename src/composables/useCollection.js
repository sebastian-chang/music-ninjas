import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {
  const error = ref(null)

  const addDoc = async (chatDoc) => {
    error.value = null

    try {
      await projectFirestore.collection(collection).add(chatDoc)
    }
    catch (err) {
      console.error(err.message)
      error.value = 'Could not send message'
    }
  }

  return { error, addDoc }
}

export default useCollection
