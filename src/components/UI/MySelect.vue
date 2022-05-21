<template>
    <select v-model="value" @change="changeOption">
        <option disabled value="">Выберите из списка</option>
        <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
        >
        {{option.name}}
        </option>
    </select>
</template>
<script>
export default {
    name:'my-select',
    props:{
        model:{
            type:String
        },
        options:{
            type:Array,
            default:()=>[]
        }
    },
    methods:{
        changeOption(event){
            this.$emit('update:model', event.target.value)
        }
    }
}
</script>
<style scoped>
    
</style>