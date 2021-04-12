<template>
    <div>
        This is Scatter Plot for Content
        <!--button @click.prevent="$emit('onHoverPresident')">Click me </button-->

        <div v-for="(item, index) of presidentsData " :key="index">
            <div @click="$emit('onPresidentSelected', item)" @mouseenter="$emit('onPresidentHover', item)" :class="selectedPresidentDetails.Id === item.Id && $style.activePresident">
                {{item.Name}} - {{item.Year}}
            </div>
            <!--this is a div temporary, it could have been button, scatterplot goes here-->
        </div>
    </div>
</template>
<script>
export default {
    props: {
        presidentsData: {
            type: Array,
            required: true
        },
        selectedPresidentDetails: {
            type: Object,
            default: () => ({})
        }
    },
}
</script>
<style module>
.activePresident {
    font-weight: bold;
    color: indigo;
}
</style>

