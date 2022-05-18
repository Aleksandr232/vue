<template lang="">
    <form @submit.prevent>
            <h4>создание поста</h4>
            <input 
            v-model="post.title"
            class="input" 
            type="text"
             placeholder="название поста">
            <input
            v-model="post.body"
             class="input"
              type="text"
              placeholder="описание поста">
             <button @click="createPost" class="btn">Создать</button>
        </form>
</template>
<script>

export default {
  data(){
      return{
          post:{
              title: '',
              body:''
          }
      }
  },
  methods:{
      createPost(){
            this.post.id = Date.now();
            this.$emit('create', this.post)
            this.post={
                title: '',
                body:''
            }
        }
  }
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