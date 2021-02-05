<template>
    <div :style="styleObj">
        <Table :height="height" :columns="columns" :data="cityData"></Table>
    </div>
</template>

<script>
export default {
    name: 'mapDataTable',
    data () {
        return {
            columns: [
                {
                    title: this.$t('home.city'),
                    key: 'name'
                },
                {
                    title:  this.$t('home.k'),
                    key: 'value',
                    sortable: true
                }
            ]
        };
    },
    props: {
        cityData: Array,
        styleObj: Object,
        height: String
    }
};
</script>
