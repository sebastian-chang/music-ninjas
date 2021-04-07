import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getDocument = (collection, id) => {
  const error = ref(null)
  const document = ref(null)

  const documentRef = projectFirestore.collection(collection).doc(id)

  const unsub = documentRef.onSnapshot(doc => {
    if (doc.data()) {
      document.value = { ...doc.data(), id: doc.id }
      error.value = null
    }
    else {
      error.value = 'Document does not exist'
    }
  }, err => {
    console.error(err.message)
    document.value = null
    error.value = 'Could not fetch document'
  })

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stoppped component unmounted
    onInvalidate(() => unsub())
  })

  return { document, error }
}

export default getDocument
