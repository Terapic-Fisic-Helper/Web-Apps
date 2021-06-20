<style>
:root {
  --main-bg-color: #00695c;
  --main-bg-lgh-color: #439889;
  --main-bg-drk-color: #003d33;
  --secondary-bg-color: #80cbc4;
  --secondary-bg-lgh-color: #b2fef7;
  --secondary-bg-drk-color: #4f9a94;
  /* --main-color-text: #0277bd; */
  --main-color-text: #0277bd;
  --secondary-color-text: #000;
}

h1,
h2 {
  font-family: "Lora", serif;
  color: var(--main-color-text);
  font-size: 1.5em;
  text-transform: uppercase;
  font-weight: bold;
  text-shadow: 1px 1px 1px var(--secondary-color-text);
  line-height: 0.75;
  align-self: center;
  margin: 0;
}

p {
  color: var(--secondary-color-text);
  /* border: 2px solid var(--main-bg-drk-color); */
  margin-bottom: 50px;
  font-family: "Roboto", serif;
  /* background-color: var(--secondary-bg-drk-color); */
  padding: 0 20px 20px;
  font-size: 1.5em;
  text-shadow: 1px 1px 1px var(--secondary-color-text);
}

#links-design a:hover,
#links-design a:focus,
#links-design-below a:hover,
#links-design-below a:focus {
  text-decoration: none;
  color: var(--secondary-color-text-color-text);
}

#links-design a {
  text-decoration: none;
  color: var(--main-color-text);
  text-shadow: 1px 1px 1px var(--secondary-color-text);
}

#links-design-below a {
  text-decoration: none;
  color: var(--main-color-text);
  text-shadow: 1px 1px 1px var(--secondary-color-text);
  font-size: 1.5em;
}

#image-back {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#image-back::before {
  content: "";
  background: url("../assets/fisioterapia.jpg") no-repeat;
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.3;
  /* background-position: center;
  background-size: cover;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
  opacity: 70%; */
}

.relative-img {
  position: relative;
}
</style>
<template>
  <!-- <v-img id="image-back"> -->
  <v-container id="image-back">
    <!-- <v-img id="image-back" :src="require('../assets/fisioterapia.jpg')">
    </v-img> -->
    <v-row class="text-center relative-img">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          weight="100"
          height="100"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Terapic Fisic Helper
        </h1>

        <p class="subheading font-weight-regular" id="links-design">
          Descubre que le sucede a tu cuerpo, y como puedes solucionar tus
          molestias conectate con los mejores profesionales en rehabilitación
          <br />¡Desde la comodidad de tu hogar!
          <a
            href="https://terapic-fisic-helper.github.io/Landing-Page/"
            target="_blank"
            >Nuesto Landing Page</a
          >
        </p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Nuestro objetivo
          <br />es aliviar tus malestares
        </h2>

        <v-row justify="center" id="links-design-below">
          <a class="subheading mx-3" target="_blank">
            Para el Paciente
          </a>
          <a class="subheading mx-3" target="_blank">
            Para el Terapista -
            <br />Centro de Terapia
          </a>
          <a class="subheading mx-3" target="_blank">
            Para el Familiar
          </a>
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Únete hoy a nuestra comunidad de pacientes satisfechos
        </h2>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Las mejores features en nuestra Web App
        </h2>
      </v-col>
    </v-row>
  </v-container>
  <!-- </v-img> -->
</template>

<script>
export default {
  name: "Principal",

  data: () => ({}),
};
</script>
