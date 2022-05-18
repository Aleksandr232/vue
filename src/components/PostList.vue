<template lang="">
        <div class="post" v-for="post in posts" :key="post">
            <div> <strong>Название: {{post.title}}</strong></div>
            <div> <strong>Описание: {{post.body}}</strong></div>
        </div> 
</template>
<script>
export default {
   props:{
       posts:{
           type: Array,
           required:true
       }
   }
}
</script>

<style scoped>
    .post{
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
}
</style>