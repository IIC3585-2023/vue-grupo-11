<script setup>
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText,
        CCardSubtitle, CCardHeader, CButton, CCardFooter } from "@coreui/vue";
import '@coreui/coreui/dist/css/coreui.min.css'
import { ref } from 'vue'
import  router  from '../router/index'
import { useFavouriteStore } from '../stores/favouriteItems.js'
import { sessionStore } from "../stores/session";
import { API_URL } from "../global.js";
import { messagingStore } from '../stores/messaging';
import starEmptyIcon from '../assets/star.svg'
import starFilledIcon from '../assets/star-fill.svg'

const session = sessionStore();
const messaging = messagingStore();

let currentUserId = null;
let token = ''
if (session.loggedIn) {
    currentUserId = session.user.id;
    token = session.jwt
}

const starEmpty = starEmptyIcon;
const starFilled = starFilledIcon

const props = defineProps({
    id: Number,
    title: String,
    imgURL: String,
    description: String,
    author: String,
    authorId: Number,
    category: String,
    amount: Number,
    campus: String,
    favourite: Boolean,
    bought: {
        type: Boolean,
        default: false,
    },
    buyerId: {
        type: Number,
        default: -1,
    },
    buyerUsername: {
        type: String,
        default: '',
    }
});

const {id, title, imgURL, description, author, category, amount,
    campus, authorId, bought, buyerId, buyerUsername} = props;

const favourite = ref(props.favourite);

const favouriteItems = useFavouriteStore();

const redirectToMessages = () => {
    router.push('/messages');
};

const setMessagingUser = () => {
    messaging.selected = true;
    messaging.user = {
        username: author,
        id: authorId
    }
}

const sendBuyMessage = async () => {
    const targetID = authorId;
    const body = {
        receiver_id: targetID, 
        text: `Hola, acabo de comprar tu item ${title}`
    }
    
    const response = await fetch(`${API_URL}/messages   `, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const responseBody = await response.json()
    if(response.status == 200){
        console.log("Buy message sent");
    }
    else{
        console.log(responseBody)
        console.log("Error sending message");
    }
}

const sendContactMessage = async () => {
    const targetID = authorId;
    const body = {
        receiver_id: targetID, 
        text: `Hola, estoy interesado en tu item ${title}`
    }
    
    const response = await fetch(`${API_URL}/messages   `, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const responseBody = await response.json()
    if(response.status == 200){
        console.log("Buy message sent");
    }
    else{
        console.log(responseBody)
        console.log("Error sending message");
    }
}

const toggleFavourite = () => {
    favourite.value = !favourite.value
    //TODO: Agregar funcion para mantener los favoritos en el store.
    //      Habria que agregar el ID o el item completo cuando se ahce favourite,
    //      y eliminarlo cuando se hace un-favourite\
    if (favourite.value) {
        favouriteItems.addFavourite({
            id, title, imgURL, description, author, category, amount, campus, authorId, favourite, bought, buyerId, buyerUsername
        })
        // console.log(favouriteItems.favourites)
        // console.log(favouriteItems.getFavouriteIds())
    } else {
        favouriteItems.removeById(id)
        // console.log(favouriteItems.getFavouriteIds())
    }
}

const buyItem = async () => {
    if (currentUserId) {
        const response = await fetch(`${API_URL}/items/buy`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({id: id})
        });
        if (response.status === 200) {
            console.log('Response OK, item bought!');

            await sendBuyMessage();
            setMessagingUser();
            redirectToMessages();
            //TODO: Redirect a los mensajes.
        }
        else {
            console.log('Could not buy item.')
        }
    }
    else {
        console.log('You are not logged in, could not buy')
    }
}

const contactAuthor = async () => {
    //TODO: Hacer que esta funcion haga lo que tiene que hacer
    console.log(`Contacted ${author} (ID: ${authorId})!`)
    await sendContactMessage();
    setMessagingUser();
    redirectToMessages();
}

const contactBuyer = () => {
    //TODO: Hacer que esta funcion haga lo que tenga que hacer
    console.log(`Contacted ${buyerUsername} (ID: ${buyerId})!`)
}

const editItem = () => {
    //TODO: Hacer que esta funcion haga lo que tenga que hacer
    console.log(`Tried to edit item ${id}!`)
}
</script>


<template>
    <CCard style="max-width: 24rem">
        <CCardHeader>
            <div class="d-flex justify-content-between">
                {{ author }}
                <!-- {{ id }} -->
                <img :src="[favourite ? starFilled : starEmpty]" v-on:click="toggleFavourite"/>
            </div>
            {{ campus }}
        </CCardHeader>
        <CCardImage orientation="top" v-bind:src="imgURL" />
        <CCardBody>
            <CCardTitle>{{ title }}</CCardTitle>
            <CCardSubtitle class="mb-2">{{ category }}</CCardSubtitle>
            <CCardText>{{ description }}</CCardText>
            <CCardTitle>{{ new Intl.NumberFormat('es-cl', { style: 'currency', currency: 'CLP' }).format(amount) }}</CCardTitle>
        </CCardBody>
        <CCardFooter v-if="!(currentUserId === null)">
            <div v-if='bought' class="d-flex justify-content-between">
                <CCardText>Comprado por {{ buyerUsername }}</CCardText>
                <CButton color="info" variant="outline" v-on:click="contactBuyer">Contacto</CButton>
            </div>
            <div v-else-if="currentUserId === authorId" class="d-flex justify-content-between">
                <CButton color="warning" variant="outline" v-on:click="editItem">Editar</CButton>
            </div>
            <div v-else class="d-flex justify-content-between">
                <CButton color="success" variant="outline" v-on:click="buyItem">Comprar</CButton>
                <CButton color="info" variant="outline" v-on:click="contactAuthor">Contacto</CButton>
            </div>
        </CCardFooter>
    </CCard>
</template>

<style scoped>
.card {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>