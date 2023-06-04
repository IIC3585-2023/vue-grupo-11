<script setup>
import NavBar from '../components/navbar.vue'
import { sessionStore } from '../stores/session';
import  router  from '../router/index';
import { API_URL } from "../global";
import ChatUserList from '../components/ChatUserList.vue';
import ChatMessages from '../components/ChatMessages.vue'
import { CContainer, CRow, CCol, CCard, CCardImage, CCardBody, CCardTitle, CCardText } from '@coreui/vue';
import { messagingStore } from '../stores/messaging';
import { toRef, watch } from 'vue';

const messaging = messagingStore();
const session = sessionStore();

// messaging.selected = false

const redirectToItems = () => {
    router.push('/login');
}

if(!session.loggedIn){
    redirectToItems();
}

const onBuySetSelected = (userID) => {
    
}

</script>
<template>
    <main>
        <NavBar></NavBar>
        <CContainer style="margin-top: 10px; box-shadow: 10px 5px 5px lightblue; height: 70%; max-height: 600px;">
            <CRow>
                <CCol style="max-width: 35%; max-height: 600px !important; margin-bottom: 0px; overflow:hidden !important; overflow-y:scroll !important;">
                    <ChatUserList v-bind:userList="userList" ></ChatUserList>
                </CCol>
                
                <CCol>
                    <div style="height: 600px; margin-top: 0px;" v-if="messaging.selected == true">
                        <ChatMessages :user="messaging.user">

                        </ChatMessages>
                    </div>
                </CCol>
            </CRow>
        </CContainer>
    </main>
</template>

<style>
</style>