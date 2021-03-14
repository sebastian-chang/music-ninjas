import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection) => {
  const error = ref(null)
  const chatDocs = ref(null)

  const collectionRef = projectFirestore.collection(collection).orderBy('createdAt')

  const unsub = collectionRef.onSnapshot(snap => {
    const results = []
    snap.docs.forEach(doc => {
      doc.data().createdAt && results.push({
        ...doc.data(),
        id: doc.id,
      })
    })
    chatDocs.value = results
    error.value = null
  }, err => {
    console.error(err.message)
    chatDocs.value = null
    error.value = 'Could not fetch data'
  })

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stoppped component unmounted
    onInvalidate(() => unsub())
  })

  return { chatDocs, error }
}

export default getCollection
