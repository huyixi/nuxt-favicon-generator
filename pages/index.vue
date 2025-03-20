<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Favicon Generator</h1>

    <div class="mb-8">
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input type="file" @change="handleFileUpload" accept="image/*" class="hidden" ref="fileInput">
        <button @click="$refs.fileInput.click()" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Upload Image
        </button>
        <p class="mt-2 text-gray-600">Supported formats: PNG, JPG, SVG (Max 5MB)</p>
      </div>
    </div>

    <div v-if="preview" class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Preview</h2>
      <img :src="preview" alt="Preview" class="max-w-xs">
      <button @click="generateFavicons" class="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
        Generate Favicons
      </button>
    </div>

    <div v-if="favicons.length" class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Generated Favicons</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="favicon in favicons" :key="favicon.size" class="border p-4 rounded">
          <img :src="favicon.url" :alt="`${favicon.size}x${favicon.size}`">
          <p class="mt-2 text-sm text-gray-600">{{ favicon.size }}x{{ favicon.size }}</p>
          <a :href="favicon.url" download class="mt-2 block text-blue-500 hover:text-blue-600">
            Download
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const fileInput = ref(null)
const preview = ref(null)
const favicons = ref([])

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      preview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const generateFavicons = async () => {
  // This would typically call your server API to generate the favicons
  // For now, we'll just simulate the response
  favicons.value = [
    { size: 16, url: preview.value },
    { size: 32, url: preview.value },
    { size: 48, url: preview.value },
    { size: 96, url: preview.value },
    { size: 144, url: preview.value },
    { size: 192, url: preview.value }
  ]
}
</script>
