<template>
    <div class="recommend">
        <div v-if="recommendsList.length" class="recommend-content">
            <div class="slider-wrapper">
                <slider>
                    <div v-for="item in recommendsList" :key="item.id">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl">
                        </a>
                    </div>
                </slider>
            </div>
            <div class="recommend-list">
                <div class="recommend-list-title">熱門歌單推薦</div>
                <ul>
                    <li class="recommend-list-item">
                        <div class="item-image">
                            <img src="" alt="">
                        </div>
                        <div class="item-cotent"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {ERR_OK} from 'api/config';
import {getRecommendList} from 'api/recommend';

import Slider from 'base/slider/slider';

export default {
    name: 'Recommend',
    components: {
        Slider
    },
    data () {
        return {
            recommendsList: []
        }
    },
    methods: {
        requestRecommendList () {
            getRecommendList().then((res) => {

                if (res.code === ERR_OK) {
                    this.recommendsList = res.data.slider;
                }

            })
        }
    },
    created () {
        this.requestRecommendList();
    }
}
</script>

<style lang="scss" scoped>
    .recommend {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
    }
</style>