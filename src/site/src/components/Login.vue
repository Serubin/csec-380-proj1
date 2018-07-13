<template>
    <div id="login">
        <div id="login-box">
            <p>Username</p>
            <input type="text" name="username" id="username" v-model="username" /><br/>
            <p>Password</p>
            <input type="password" name="password" id="password" v-model="password" @keyup.enter="doLogin"/><br/>
            <button id="login" @click="doLogin">Log in</button>
        </div>
    </div>
</template>

<script>
import Skits from './Skits'

export default {
    name: 'Login',
    mounted () {
    },
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        doLogin () {
            this.$http.post('/v1/Authenticate',
                {username: this.username, password: this.password}).then(response => {
                console.log(response)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    components: {
        Skits
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #login {
        margin: 3em auto;
        text-align: center;
    }
    p {
        margin: 1em 0 0.5em 0;
    }

    input {
        border-radius: .4rem;
        box-shadow: none;
        box-sizing: inherit;
        appearance: none;
        background-color: transparent;
        border: 0.01em solid #d1d1d1;
        outline: 0;
        padding: .6em 1.0em;
        transition: 0.3s border-color ease-in-out;
    }

    input:focus {
        border-color: #999;
    }
</style>
