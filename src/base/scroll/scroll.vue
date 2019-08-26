<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    name: "Scroll",
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: null
        },
        listenScroll: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        initScroll () {
            if (!this.$refs.wrapper) return;

            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            })

            if (this.listenScroll) {
                this.scroll.on('scroll', (pos) => {
                    // pos -> 滾動的位置 -> 是負值
                    this.$emit('scroll', pos);
                })
            }
        },
        enable () {
            this.scroll && this.scroll.enable();
        },
        disable () {
            this.scroll && this.scroll.disable();
        },
        refresh () {
            this.scroll && this.scroll.refresh();
        },
        scrollTo () {
            this.scroll && this.scoll.scrollTo.apply(this.scroll, arguments);
        },
        scrollToElement () {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
        }
    },
    watch: {
        data () {
            setTimeout(() => {
                this.refresh();
            },20)
        }
    },
    mounted() {
        setTimeout(() => {
            this.initScroll()
        },20)
    }
}
</script>