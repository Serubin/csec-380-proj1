<template>
    <div class="navbar">
        <div id="logo">Skitter</div>
        <div id="right-side">
            <ul id="nav-list">
                <li v-for="link in links" :key="link.href">
                    <router-link :to="{ path: link.href}"> {{ link.title }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data () {
        return {
            links: [
                {
                    href: 'skits',
                    title: 'Skits'
                },
                {
                    href: '/',
                    title: 'Home'
                }
            ]
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

    .navbar {
        width: 100%;
        z-index: 1000;

        position: fixed;
        left: 0px;
        top: 0px;

        margin: auto;
        padding: 5px 1em;

        color: #666666;
        box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    }

    #logo {
        float: left;
    }

    #right-side {
        padding: 0 1.5em;
    }

    #nav-list {
        list-style: none;
        display: inline;
    }

    #nav-list li {
        float: right;
        padding: 0 10px;
    }

    #nav-list li a {
        color: #666666;
    }

</style>
