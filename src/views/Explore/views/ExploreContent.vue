<template>
    <div>
        This is Scatter Plot for Content
        <button @click.prevent="$emit('onHoverPresident')">Click me </button>

        <div v-for="(item, index) of presidentsData " :key="index">
            <div @click="$emit('onPresidentSelected', item)" @mouseenter="$emit('onPresidentHover', item)">
                 {{item.Name}} - {{item.Year}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        presidentsData: {
            type: Array,
            required: true
        }
    },
}
</script>

