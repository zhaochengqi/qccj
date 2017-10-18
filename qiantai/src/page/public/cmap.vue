<template>
 <c-map :mapData="myMapData"></c-map>
</template>

<script> 
import CMap from 'vue-cmap'

export default {
 data() {
 return {
 myMapData: [
 { name: "安徽", value: 200, children: [] }
 ]
 }
 },
 components: { CMap }
}
</script>