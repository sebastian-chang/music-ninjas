import { ref } from '@vue/reactivity'
import { projectStorage } from '../firebase/config'
import getUser from './getUser'

const { user } = getUser()

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`
    const storageRef = projectStorage.ref(filePath.value)

    try {
      const res = await storageRef.put(file)
      url.value = await res.ref.getDownloadURL()
    }
    catch (err) {
      console.error(err)
      error.value = err
    }
  }

  const deleteImage = async (filePath) => {
    const storageRef = projectStorage.ref(filePath.value)

    try {
      await storageRef.delete()
      error.value = null
    }
    catch (err) {
      console.error(err)
      error.value = err.message
    }
  }

  return { url, filePath, error, uploadImage, deleteImage }
}

export default useStorage
