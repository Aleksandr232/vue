<template lang="">
    <form @submit.prevent>
            <h4>создание поста</h4>
            <input 
            v-bind:value="title" 
            @input="title=$event.target.value"
            class="input" 
            type="text"
             placeholder="название поста">
            <input
             v-bind:value="body"
             @input="body=$event.target.value"
             class="input"
              type="text"
              placeholder="описание поста">
             <button  class="btn">Создать</button>
        </form>
</template>
<script>

export default {
  
}
</script>
<style scoped>
.input{
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

form{
    display: flex;
    flex-direction: column;
}

.btn{
    align-self: flex-end;
    margin-top: 15px;
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal
}
</style>