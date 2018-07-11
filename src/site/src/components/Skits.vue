<template>
    <div id="skit-list">
        <div v-for="skit in skits" :key="skit.id" class="skit">
            <p>{{ skit.content }}</p>
            <div class="low-bar">
                <p>
                    <span class="post-date"> {{ new Date(skit.timestamp).toLocaleString() }}</span>
                    <span class="post-replies">Replies {{ skit.replies.length }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Skits',
    props: ['userId'],
    mounted () {
        this.getSkits(this.userId)
    },
    data () {
        return {
            skits: []
        }
    },
    methods: {
        getSkits (userId) {
            let query = ''

            if (typeof userId !== 'undefined' && userId.constructor === Array) {
                query = '?'

                for (let i of userId) {
                    query += 'users=' + i + '&'
                }
                query.substring(query.length, query.lengt - 1)
            } else if (typeof userId === 'number') {
                query += 'users=' + userId
            }

            console.log('Loading skits')
            this.$http.get('http://localhost/api/v1/getskits' + query).then(response => {
                this.skits = response.body.data
            }, response => {
                // error callback
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .skit {
        background: #eeeeee4d;
        width: 20em;
        padding: 1em;
        margin: 1em;
    }
    .skit .low-bar {
        color: #888;
        font-size: 10pt;
    }

    .skit .post-date {
        padding: 0 1em 0 0;
    }

</style>
