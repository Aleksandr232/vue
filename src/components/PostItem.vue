<template >
    <div class="post">
            <div>
                <div>{{post.id}}</div>
                <div> <strong>Название: {{post.title}}</strong></div>
                <div> <strong>Описание: {{post.body}}</strong></div>
            </div>
            <div class="post__btns">
                <button class='btn_delet' @click="$emit('remove', post)">Удалить</button>
            </div>
        </div> 
</template>
<script>
export default {
    props:{
        post:{
            type:Object,
            required: true
        }
    }
}
</script>
<style scoped>
    .post{
       padding: 15px;
        border: 2px solid teal;
        margin-top: 15px; 
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .btn_delet{
        align-self: flex-end;
        padding: 10px 15px;
        background: none;
        color: teal;
        border: 1px solid teal
    }
</style>