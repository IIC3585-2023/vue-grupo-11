<script setup>
import { CContainer, CRow, CCol, CCard, CCardImage, CCardBody, CCardTitle, CCardText, CForm, CFormInput } from '@coreui/vue';
import { messagingStore } from '../stores/messaging';
import '@coreui/coreui/dist/css/coreui.min.css'
import { onBeforeMount, onBeforeUnmount, reactive } from 'vue';
import { API_URL } from '../global';
import { sessionStore } from '../stores/session';
import { ref } from 'vue';
import personIcon from '../assets/person.png';

const person = personIcon;

const messaging = messagingStore();
const session = sessionStore();

const messages = reactive([]);

const inputMessage = ref("");

messaging.$subscribe((mutation, state) => {
  getMessages();
});

const interval = setInterval(() => {
  getMessages();
}, 5000)

onBeforeUnmount(() => {
  clearInterval(interval);
});

const addMessage = (text, receiver_id) => {
  const message = {
    text: text,
    receiver_id: receiver_id,
    sender_id: session.user.id,
  };

  messages.push(message)
}

const sendMessage = async () => {
  const messageText = inputMessage.value;
  inputMessage.value = ""
  const receiverID = messaging.user.id;

  addMessage(messageText, receiverID)

  const URL = API_URL + '/messages';
  const token = session.jwt;

  const body = {
    text: messageText,
    receiver_id: receiverID
  }

  const res = await fetch(URL, {
    method: 'POST',
    headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  if(res.status != 200){
    console.log("Error");
  }

  const responseBody = await res.json();
}

const getMessages = async () => {

  const userID = messaging.user.id;

  const URL = API_URL + `/messages/${userID}`;
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
  console.log(responseBody)
  messages.length = 0;

  if(messages.length == responseBody.length){
    return;
  }

  for(let message of responseBody){
    const date = new Date(message.createdAt);
    message.time = date.toLocaleTimeString('en-US');
    messages.push(message)
  };
};

getMessages();

</script>

<script>
</script>

<template>
<CContainer style="height: 95%;">
  <CRow class="allign-items-start" style="height: 8%; max-height: 50px; width: 100%; border-bottom: 3px solid #bbb;">
    <div id="username" style="font-weight: bold; margin-bottom: 10%;">
      {{ messaging.user.username }}
    </div>
  </CRow>
  <CContainer style="overflow-y:scroll; overflow-x: hidden; height: 80%;">
    <CRow v-for="message in messages" class="allign-items-middle" style="max-height: 600px;">
      <div v-if="message.sender_id != session.user.id" class="container" style="max-height: 100px;">
        <img :src="person" alt="Avatar">
        <p>{{ message.text }}</p>
        <span class="time-right">{{ message.time }}</span>
      </div>

      <div v-else class="container darker">
        <img :src="person" alt="Avatar" class="right" style="max-height: 100px;">
        <p>{{ message.text }}</p>
        <span class="time-left">{{ message.time }}</span>
      </div>
    </CRow>
  </CContainer>
  <CRow class="allign-items-end" style="">
    <!-- <CForm style="width: 80%; margin-top: 10px; border-top: #bbb;"> -->
          <CFormInput
              style="margin-left: 10px; width: 80%;margin-top: 10px; border-top: #bbb;"
              type="text"
              id="exampleFormControlInput1"
              aria-describedby="exampleFormControlInputHelpInline"
              :value="inputMessage"
              @input="inputMessage = $event.target.value"
              v-on:keyup.enter="sendMessage"
          />
    <!-- </CForm> -->
    <img @click="sendMessage" src="../assets/send-button.png" style="max-width: 8%; margin-left: 5%; cursor: pointer; margin-top: 8px;" />
  </CRow>
</CContainer>
</template>

<style>

.ownMessage {
  min-height: 10%; 
  text-align: right; 
  background-color: rgb(37, 211, 102); 
  height: 10%; 
  max-width: 40%; 
  border-radius: 20px; 
  margin-left: 55%; 
  margin-top: 10px; 
  margin-bottom: 10px;
}

.messageList {
  display: flex;
  overflow:hidden !important; 
  overflow-y:scroll !important; 
  height: 80%; 
  max-height: 100%;
}
.container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}
/* Darker chat container */
.darker {
  border-color: #ccc;
  background-color: #ddd;
}

/* Clear floats */
.container::after {
  content: "";
  clear: both;
  display: table;
}

/* Style images */
.container img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

/* Style the right image */
.container img.right {
  float: right;
  margin-left: 20px;
  margin-right:0;
}

/* Style time text */
.time-right {
  float: right;
  color: #aaa;
}

/* Style time text */
.time-left {
  float: left;
  color: #999;
}


</style>