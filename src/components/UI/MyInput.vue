<template>
    <div>
        <input :value="value" @input="updateInput" type="text" class="input">
    </div>
</template>
<script>
export default {
    name:'my-input',
    props:{
        value:[String, Number]
    },
    methods:{
        updateInput(event){
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>
<style >
    
</style>