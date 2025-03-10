<script setup>

</script>

<template>
  <v-row class="mt-15 flex-column">
    <v-col class="d-flex justify-center align-center flex-column text-center">
      <v-btn
          class="px-16 py-5 d-flex justify-center align-center"
          style="color: var(--button-green)"
          readonly
          elevation="0"
          variant="flat"
          color="var(--light-green)"
      ><div class="text-h6">О нас</div></v-btn>
      <div class="text-h2 mt-5 d-sm-none d-none d-md-flex">Программное обеспечение<br/> Интенсивосчет</div>
      <div class="text-h4 mt-5 d-md-none">Программное обеспечение<br/> Интенсивосчет</div>
      <div class="text-subtitle-1 mt-10">Программное обеспечение TrafficData Air для оценки дорожного трафика и параметров дорожного движения, предназначенное для компаний, которые проводят большое количество транспортных изысканий с помощью квадрокоптеров, занимаются транспортным планирование и моделированием.</div>
    </v-col>
  </v-row>
  <v-row dense class="flex-row" >
    <v-col
        v-for="(variant, i) in about_us_card"
        :key="i"
        cols="12"
        md="4"
    >
      <v-card
          color="var(--light-green)"
          variant="elevated"
          class="mx-auto"
          style="color: var(--button-green);height: 100%"
      >
        <v-card-item>
          <div>
            <v-btn class="text-none" color="var(--button-green)" style="color: white" readonly>
              <div class="text-subtitle-1 mb-1">
                {{i+1}}
              </div>
            </v-btn>
            <div class="text-subtitle-1 mb-1 mt-10">
              {{ variant }}
            </div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AboutUs',
  data: () => ({
    "about_us_card": ["Надежность работы – благодаря нейросетевым технологиям точность достигает 99%",
      'Универсальность — работает при различных оптических схемах и в сложных погодных условиях',
      'Обработка до 100 видеопотоков одновременно, режим ускоренной обработки видеофайлов',
      'Отслеживание направления движения транспортных средств на перекрестках (маршрут движения)',
      'Не требует специального развертывания инфраструктуры, может использовать уже установленные камеры',
      'Экспорт статистики в форматах docx, xlsx, xml, csv и автоматическая отправка отчетов по расписанию на диск, Email, FTP'
    ]
  })
}
</script>

<style scoped>

</style>