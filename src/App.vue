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
       />
        
         
    </div>
    
    
</template>


<script>
import PostFrom from "./components/PostFrom.vue";
import PostList from "./components/PostList.vue";
import MyDialog from "./components/UI/MyDialog.vue";



export default{
    components:{
    PostList,
    PostFrom,
    MyDialog,
    
},
    data(){
        return{
            posts:[
                {
                    id:1,
                    title:'Javascript',
                    body: 'Описание поста'
                },
                 {
                    id:2,
                    title:'Javascript 2',
                    body: 'Описание поста 2'
                },
                 {
                    id:3,
                    title:'Javascript 3',
                    body: 'Описание поста 3'
                }
                
            ],
            dialogVisable:false
            
           
            
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
         }
    
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
    border: 1px solid teal
}


</style>