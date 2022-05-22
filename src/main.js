import { createApp } from 'vue'
import router from './router/router';
import components from '@/components/UI'
import App from './App'



const app=createApp(App)

components.forEach(component => {
    app.component(component.name, component)
    
});



 app
    .use(router)
    .mount('#app') 
 