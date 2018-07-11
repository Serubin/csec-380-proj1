<template>
    <div class="home">
        <Skits />
    </div>
</template>

<script>
import Skits from './Skits'
export default {
    name: 'Home',
    data () {
        return {
        }
    },
    components: {
        Skits
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.home {
    text-align: center;
}
</style>
