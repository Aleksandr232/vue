<template>
    <div class="app">
        <h1>Страница с постами </h1>
        <button class="btn" @click="showDialog">Создать пост</button>
        <MyDialog v-model:show="dialogVisable">
            <PostFrom
            @create="createPost"
        />
        </MyDialog>
        
       <PostList 
       :posts="posts"
       @remove="removePost"
       v-if="!isPostsLoading"
       />
        
         <div v-else>Идет загрузка...</div>
    </div>
    
    
</template>


<script>
import PostFrom from "./components/PostFrom.vue";
import PostList from "./components/PostList.vue";
import MyDialog from "./components/UI/MyDialog.vue";
import axios from 'axios'



export default{
    components:{
    PostList,
    PostFrom,
    MyDialog,
    
},
    data(){
        return{
            posts:[],
            dialogVisable:false,
            isPostsLoading: false
            
           
            
        }
        
    },
    methods:{
        createPost(post){
            this.posts.push(post);
            this.dialogVisable=false;
         },
         removePost(post){
             this.posts=this.posts.filter(p=>p.id !== post.id)
         },
         showDialog(){
             this.dialogVisable=true
         },
         async  fetchPosts(){
             try{
                 this.isPostsLoading=true;
                 setTimeout(async()=>{
                 const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
                 this.posts=response.data;
                 this.isPostsLoading=false;
             }, 1000)
             }catch(e){
                 alert('ошибка')
             }finally{
                 this.isPostsLoading=false
             }
         
         }
    
    },
    mounted(){
        this.fetchPosts();
    }
}
</script>


<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}





.app{
    padding: 20px;
}

.btn{
    align-self: flex-end;
    margin-top: 15px;
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
    margin-top: 15px
}


</style>