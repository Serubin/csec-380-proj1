<template>
    <div id="user">
        <div id="profile-column">

            <img src="" style="background: #ccc;" width="100" height="100">
            <p>Username</p>

        </div>
        <div id="skits-column">
            <Skits :userId="userId" />
        </div>
    </div>
</template>

<script>
import Skits from './Skits'

export default {
    name: 'UserPage',
    props: ['userId'],
    mounted () {
    },
    data () {
        return {
        }
    },
    methods: {
    },
    components: {
        Skits
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #user {
        display: flex;
        margin: 1em 5em;
    }

    #user img {
        background: #ccc;
    }

    #profile-column {
        padding: 1em 2em;
        flex: 0.4 auto;
        display: flex;
    }

    #profile-column p {
        height: 2em;
        margin: 0.5em 0 0 1em;
    }

</style>
