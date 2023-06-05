<script setup>

import { CContainer, CRow, CCol, CCard, CCardImage, CCardBody, CCardTitle, CCardText } from '@coreui/vue';
import { messagingStore } from '../stores/messaging';
import { toRef, reactive } from 'vue';
import { API_URL } from "../global";
import { sessionStore } from '../stores/session';
import { onBeforeMount, onBeforeUnmount } from 'vue';

import personIcon from '../assets/person.png'

const person = personIcon;

const session = sessionStore();

const messaging = messagingStore();

const selectUser = (user) => {
    messaging.selected = true;
    messaging.user = user;
}

const interval = setInterval(() => {
  getUserList();
}, 10000)

onBeforeUnmount(() => {
  clearInterval(interval);
});

const userList = reactive([]);

const getUserList = async () => {

    const URL = API_URL + '/messages/users';
    const token = session.jwt;

    const res = await fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if(res.status != 200){
        return;
    }

    const responseBody = await res.json();

    if(responseBody.length == userList.length) return;
    userList.length = 0

    const userID = session.user.id;


    for(let userPair of responseBody){
        if(userPair.receiver_id != userID){
            let add = true;
            for(let user of userList){
                if(user.id == userPair.receiver_id) add = false
            }
            if(add) userList.push({id: userPair.receiver_id, username: userPair.receiver})
        }
        else{
            let add = true;
            for(let user of userList){
                if(user.id == userPair.sender_id) add = false
            }
            if(add) userList.push({id: userPair.sender_id, username: userPair.sender})
        }
    };
}

getUserList();
</script>

<template>
    <CCard v-for="user in userList" class="mb-3 userCard" @click="() => selectUser(user)">
        <CRow class="g-0 noBorder" >
            <CCol :md="4" class="noBorder">
                <CCardImage style="width: 20%; margin-left: 25%; margin-top: 14%; border-radius: 30% !important;"  class="rounded-0 noBorder" :src="person" />
            </CCol>
            <CCol :md="8" class="noBorder">
            <CCardBody style="margin-top: 2%;" class="noBorder">
                <CCardTitle>{{ user.username}}</CCardTitle>
            </CCardBody>
            </CCol>
        </CRow>
    </CCard>
</template>

<style>
.userCard{
    margin-bottom: 0px !important;
}
.userCard :hover{
    background: #e1e1e1;
    cursor: pointer;
}

</style>