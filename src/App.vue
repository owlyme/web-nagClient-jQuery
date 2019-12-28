<template>
    <div id="app" >
        <router-view></router-view>
    </div>
</template>

<script>
// :class="langStyle"
// import langStyle from "@/i18n/lang/style.js"
// export default {
//     computed: {
//         langStyle() {
//             return langStyle[localStorage.langStyle]
//         }
//     }
// }
</script>

<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>