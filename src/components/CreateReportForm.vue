<script setup>
import { VFileUpload } from 'vuetify/labs/VFileUpload'
</script>

<template>
  <div>
    <div class="text-h5 font-weight-bold pa-10">
      Загрузить видео
    </div>
    <form class="px-10">
      <v-text-field
          label="Номер учетного пункта"
          required
      ></v-text-field>
      <v-text-field
          label="Километр"
          required
      ></v-text-field>
      <v-text-field
          label="Регион"
          required
      ></v-text-field>
      <v-text-field
          label="Дорога"
          required
      ></v-text-field>
      <div class="text-subtitle-1">Загрузите видеоролик (доступные форматы: mp4, avi)*</div>
      <div class="mb-5">
      <v-file-upload
          clearable
          density="comfortable"
          variant="comfortable"
          title="Выберите или перетащите файл"
          browse-text="Local Filesystem"
          divider-text="or choose locally"
      ></v-file-upload></div>
      <v-btn
          class="me-4 mb-4 text-none px-15"
          color="var(--button-green)"
          style="color: white"
          size="large"
      >
        Отправить
      </v-btn>
    </form>
  </div>
</template>

<script>
  export default {
    name: "CreateReportForm",
    components: {
      VFileUpload,
    },
    data: () => ({

    })
  }
</script>

<style scoped>

</style>