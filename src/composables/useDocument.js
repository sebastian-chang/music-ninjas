import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useDocument = (collection, id) => {
  const error = ref(null)
  const isPending = ref(false)

  const documentRef = projectFirestore.collection(collection).doc(id)

  const deleteDoc = async () => {
    isPending.value = true
    error.value = null
    try {
      const res = await documentRef.delete()
      isPending.value = false

      return res
    }
    catch (err) {
      console.error(err)
      isPending.value = false
      error.value = 'Could not delete document'
    }
  }

  const updateDoc = async (updatedSongs) => {
    isPending.value = true
    error.value = null
    try {
      const res = await documentRef.update(updatedSongs)
      isPending.value = false

      return res
    }
    catch (err) {
      console.error(err)
      isPending.value = false
      error.value = 'Could not update document'
    }
  }

  return { error, isPending, deleteDoc, updateDoc }
}


export default useDocument
