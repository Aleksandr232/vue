<template>
    <div class="app">
        <h1>Страница с постами </h1>
        <div class="app_btns">
            <button class="btn" @click="showDialog">Создать пост</button>
            <MySelect
               v-model="selectedSort" 
               :options="sortOptions"
            />
        </div>
        <MyDialog v-model:show="dialogVisable">
            <PostFrom
            @create="createPost"
        />
        </MyDialog>
        
       <PostList 
       :posts="sortedPosts"
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
import MySelect from "./components/UI/MySelect.vue";
import axios from 'axios'




export default{
    components:{
    PostList,
    PostFrom,
    MyDialog,
    MySelect
},
    data(){
        return{
            posts:[],
            dialogVisable:false,
            isPostsLoading: false,
            selectedSort:"",
            sortOptions:[
                {value:'title', name:'По названию'},
                {value:'body', name:'По содержимому'},
            ]
            
           
            
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
    },
    computed:{
        sortedPosts(){
            return[...this.posts].sort((post1, post2)=>post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
            
        }
    },
    watch:{

    }
}
</script>


<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


.app_btns{
    display: flex;
    justify-content: space-between;
    margin-top: 15px
}




.app{
    padding: 20px;
}

.btn{
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
    
}


</style>