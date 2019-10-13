import {mapGetters, mapMutations,mapActions} from 'vuex';
import {playMode} from 'common/js/config';

import {shuffle} from 'common/js/util';

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

export const playerMixin = {
    methods: {
        changeMode () {
            const mode = (this.mode + 1) % 3; 

            this.setPlayMode(mode);

            var list = null;

            if (mode === playMode.random) {
                list = shuffle(this.sequenceList)
            }else {
                list = this.sequenceList;
            }

            this.resetCurrentIndex(list);
            this.setPlaylist(list);
        },
        resetCurrentIndex (list) {
            var index = list.findIndex((item) => {
                return item.id === this.currentSong.id;
            })
            this.setCurrentIndex(index);

        },
        ...mapMutations({
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlaylist: 'SET_PLAYLIST'
        })
    },
    computed: {
        iconMode () {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
        },
        ...mapGetters([
            'sequenceList',
            'currentSong',
            'playlist',
            'mode'
        ])
    }
}

export const searchMixin = {
    data () {
        return {
            query: '',
            refreshDelay: 100
        }
    },
    computed: {
        ...mapGetters([
            'searchHistory'
        ])
    },
    methods: {
        addQuery(query) {
            this.$refs.searchBox.setQuery(query);
        },
        blurInput () {
            this.$refs.searchBox.blur();
        },
        saveSearch () {
            this.saveSearchHistory(this.query);
        },
        onQueryChange (query) {
            this.query = query;
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory'
        ])
    }
}