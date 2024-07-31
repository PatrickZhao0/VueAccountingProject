<template>
    <RouterView/>
 </template>
 
 <script setup>
 import { useRoute } from 'vue-router';
  console.log(useRoute().path);
 </script>