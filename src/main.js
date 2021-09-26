import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import useFirebaseAuth from '@/common/auth'
import '@/tailwind.css'

const { authCheck } = useFirebaseAuth();

const app = createApp(App);

authCheck()
  .then(() => {
    app.use(router);
    return router.isReady();
  })
  .then(() => {
    app.mount("#app")
  });


