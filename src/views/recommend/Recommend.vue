<template>
    <div class="recommend">
        recommend
    </div>
</template>

<script>
import {getRecommendList} from 'api/recommend';

export default {
    name: 'Recommend',
    methods: {
        requestRecommendList () {
            getRecommendList().then((res) => {
                console.log(res.data)
            })
        }
    },
    created () {
        this.requestRecommendList();
    }
}
</script>