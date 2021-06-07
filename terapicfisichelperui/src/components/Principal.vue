<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="150"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Terapic Fisic Helper
        </h1>

        <p class="subheading font-weight-regular">
          Descubre que le sucede a tu cuerpo, y como puedes solucionar tus molestias
          conectate con los mejores profesionales en rehabilitación
          <br>¡Desde la comodidad de tu hogar!
          <a
            href="https://terapic-fisic-helper.github.io/Landing-Page/"
            target="_blank"
          >Nuesto Landing Page</a>
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Nuestro objetivo
          <br>es aliviar tus malestares 
        </h2>

        <v-row justify="center">
          <a class="subheading mx-3" target="_blank">
            Para el Paciente
          </a>
          <a class="subheading mx-3" target="_blank">
            Para el Terapista -
            <br>Centro de Terapia
          </a>
          <a class="subheading mx-3" target="_blank">
            Para el Familiar
          </a>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Únete hoy a nuestra comunidad de pacientes satisfechos
        </h2>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Las mejores features en nuestra Web App
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Principal',

    data: () => ({
    }),
  }
</script>
