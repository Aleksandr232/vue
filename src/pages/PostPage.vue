<template>
    <div >
        <h1>Страница с постами </h1>
        <MyInput 
            v-model="searchQuery"
            
        />
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
       :posts="sortedAndSearchedPosts"
       @remove="removePost"
       v-if="!isPostsLoading"
       />
        
         <div v-else>Идет загрузка...</div>
         <div ref="observer" class="observer"></div>
         <!-- <div class="page__wrapper">
             <div v-for="pageNumber in totalPages"
             :key="pageNumber"
             class="page"
             :class="{
                 'current__page': page === pageNumber
             }"
             @click="changePage(pageNumber)"
             >{{pageNumber}}</div>
         </div> -->
    </div>
    
    
</template>


<script>
import PostFrom from "@/components/PostFrom.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MySelect from "@/components/UI/MySelect.vue";
import axios from 'axios'
import MyInput from "@/components/UI/MyInput.vue";





export default{
    components:{
    PostList,
    PostFrom,
    MyDialog,
    MySelect,
    MyInput
},
    data(){
        return{
            posts:[],
            dialogVisable:false,
            isPostsLoading: false,
            selectedSort:"",
            searchQuery:'',
            page:1,
            limit:10,
            totalPages:0,
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
        /*  changePage(pageNumber){
             this.page=pageNumber
         }, */
         async  fetchPosts(){
             try{
                 this.isPostsLoading=true;
                 setTimeout(async()=>{
                 const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                     params:{
                         _page:this.page,
                         _limit:this.limit
                     }
                 })
                 this.totalPages=Math.ceil(response.headers['x-total-count'] / this.limit)
                 this.posts=response.data;
                 this.isPostsLoading=false;
             }, 1000)
             }catch(e){
                 alert('ошибка')
             }finally{
                 this.isPostsLoading=false
             }
         
         },
         async  loadMorePosts(){
             try{
                 this.page += 1;
                 setTimeout(async()=>{
                 const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                     params:{
                         _page:this.page,
                         _limit:this.limit
                     }
                 })
                 this.totalPages=Math.ceil(response.headers['x-total-count'] / this.limit)
                 this.posts=[...this.posts, ...response.data];
             }, 1000)
             }catch(e){
                 alert('ошибка')
             }
         
         }
    
    },
    mounted(){
        this.fetchPosts();
        console.log(this.$refs.observer);
        const options={
            rootMargin:'0px',
            threshold:1.0
        }
        const callback = (entries, observer)=>{
            if(entries,observer[0].isIntersecting && this.page < this.totalPages){
               this.loadMorePosts()
            }
        };
        const observer = new IntersectionObserver(callback, options)
        observer.observe(this.$refs.observer)
    },
    computed:{
        sortedPosts(){
            return[...this.posts].sort((post1, post2)=>post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
            
        },
        sortedAndSearchedPosts(){
            return this.sortedPosts.filter(post=>post.title.toLowerCase().includes(this.searchQuery.toLocaleLowerCase()))
        }
    },
    watch:{
       /* page(){
           this.fetchPosts()
       } */
    }
}
</script>


<style>


.app_btns{
    display: flex;
    justify-content: space-between;
    margin-top: 15px
}




.btn{
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
    
}

.page__wrapper{
    display: flex;
    margin-top: 15px;
}

.page{
    border: 1px solid black;
    padding: 10px;
}

.current__page{
    border: 4px solid green;
}

.observer{
    height: 30px;
    background:
}

</style>