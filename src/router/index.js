import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemsView from '../views/ItemsView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'  
import MessageView from '../views/MessageView.vue'
import MyItemsView from '../views/MyItemsView.vue'
import CreateItemView from '../views/CreateItemView.vue'  
import EditItemView from '../views/EditItemView.vue'  


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/items',
      name: 'items',
      component: ItemsView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/sign_up',
      name: 'sign_up',
      component: SignUpView
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessageView
    },
    {
      path: '/my_items',
      name: 'my_items',
      component: MyItemsView
    },
    {
      path: '/create_item',
      name: 'create_item',
      component: CreateItemView
    },
    {
      path: '/edit_item/:id',
      name: 'edit_item',
      component: EditItemView
    }
  ]
})

export default router
