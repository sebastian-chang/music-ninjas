<template>
  <form @submit.prevent="handleCreate">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title" />
    <textarea
      required
      placeholder="Playlist description"
      v-model="description"
    ></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleFileChange" />
    <div class="error">{{ fileError }}</div>
    <button v-if="!isPending">Create Playlist</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useCollection from '../../composables/useCollection'
import getUser from '../../composables/getUser'
import useStorage from '../../composables/useStorage'
import { timeStamp } from '../../firebase/config.js'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const { filePath, url, uploadImage } = useStorage()
    const { error, addDoc } = useCollection('playlists')
    const { user } = getUser()
    const router = useRouter()

    const title = ref('')
    const description = ref('')
    const coverImage = ref(null)
    const fileError = ref(null)
    const isPending = ref(false)

    // Allowed file types
    const fileTypes = ['image/png', 'image/jpeg']

    const handleCreate = async () => {
      if (coverImage.value) {
        isPending.value = true
        await uploadImage(coverImage.value)
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timeStamp(),
        })
        isPending.value = false
        if (!error.value) {
          router.push({ name: 'PlaylistDetails', params: { id: res.id } })
        }
      }
    }

    const handleFileChange = (event) => {
      const fileSelected = event.target.files[0]

      if (fileSelected && fileTypes.includes(fileSelected.type)) {
        coverImage.value = fileSelected
        fileError.value = null
      }
      else {
        coverImage.value = null
        fileError.value = 'Please select an image file(png, jpeg)'
      }
      console.log(coverImage.value)
    }

    return { title, description, handleCreate, handleFileChange, fileError, isPending }
  }
}
</script>

<style>
form {
  background: white;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
