<template>
  <NavBar />
  <div class="d-flex flex-wrap justify-content-center p-5 gap-5 fade-in widget-container">
    
    <iframe class="watch"
      width="402"
      height="261"
      style="
        padding: 0 !important;
        margin: 0 !important;
        border: none !important;
        background: none !important;
        background: transparent !important;
      "
      marginheight="0"
      marginwidth="0"
      frameborder="0"
      scrolling="no"
      comment="/*defined*/"
      src="https://dayspedia.com/if/digit/?v=1&iframe=eyJ3LTEyIjp0cnVlLCJ3LTExIjp0cnVlLCJ3LTEzIjp0cnVlLCJ3LTE0Ijp0cnVlLCJ3LTE1Ijp0cnVlLCJ3LTExMCI6dHJ1ZSwidy13aWR0aC0wIjpmYWxzZSwidy13aWR0aC0xIjpmYWxzZSwidy13aWR0aC0yIjp0cnVlLCJ3LTE2IjoiNDhweCIsInctMTkiOiI2NCIsInctMTciOiIxNiIsInctMjEiOnRydWUsImJnaW1hZ2UiOi0xLCJiZ2ltYWdlU2V0IjpmYWxzZSwidy0yMWMwIjoiI2ZmZmZmZiIsInctMCI6dHJ1ZSwidy0zIjp0cnVlLCJ3LTNjMCI6IiNkMWQxZDEiLCJ3LTNiMCI6IjEiLCJ3LTYiOiIjMzQzNDM0Iiwidy0yMCI6dHJ1ZSwidy00IjoiIzAwN2RiZiIsInctMTgiOmZhbHNlLCJ3LXdpZHRoLTJjLTAiOiI0MDIiLCJ3LTExNSI6ZmFsc2V9&lang=es&cityid=375"
    ></iframe>
    <div id="ww_4637b5e097394" v='1.3' loc='auto' a='{"t":"horizontal","lang":"en","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'>More forecasts: <a href="https://oneweather.org/sydney/30_days/" id="ww_4637b5e097394_u" target="_blank">Weather forecast Sydney 30 days</a></div>
  </div>

  <FooterBar />
</template>

<script setup>
// Importar el componente NavBar desde la ruta "../components/Nav.vue"
import NavBar from "../components/Nav.vue";

// Importar el componente FooterBar desde la ruta "../components/Footer.vue"
import FooterBar from "../components/Footer.vue";
</script>

<style scoped></style>
