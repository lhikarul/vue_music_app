import {mapGetters} from 'vuex';

export const playlistMixin = {
    methods: {
        handlePlaylist () {
            throw new Error('component must implement handlePlaylist method');
        }
    },
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    watch: {
        playlist (newVal) {
            this.handlePlaylist(newVal);
        }
    },
    mounted () {
        this.handlePlaylist(this.playlist);
    },
    activated() {
        this.handlePlaylist(this.playlist);
    }
}