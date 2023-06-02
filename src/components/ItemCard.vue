<script setup>
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText,
        CCardSubtitle, CCardHeader, CButton, CCardFooter } from "@coreui/vue";
import '@coreui/coreui/dist/css/coreui.min.css'
import { ref } from 'vue'

import { useFavouriteStore } from '../stores/favouriteItems.js'
import { sessionStore } from "../stores/session";

const session = sessionStore();

let currentUserId = null;
if (session.loggedIn) {
    currentUserId = session.user.id;
}

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
});

const {id, title, imgURL, description, author, category, amount, campus, authorId} = props;

const favourite = ref(props.favourite);

const favouriteItems = useFavouriteStore();

const toggleFavourite = () => {
    favourite.value = !favourite.value
    //TODO: Agregar funcion para mantener los favoritos en el store.
    //      Habria que agregar el ID o el item completo cuando se ahce favourite,
    //      y eliminarlo cuando se hace un-favourite\
    if (favourite.value) {
        favouriteItems.addFavourite({
            id, title, imgURL, description, author, category, amount, campus, authorId, favourite
        })
        // console.log(favouriteItems.favourites)
        // console.log(favouriteItems.getFavouriteIds())
    } else {
        favouriteItems.removeById(id)
        // console.log(favouriteItems.getFavouriteIds())
    }
}

const buyItem = () => {
    //TODO: Hacer que esta funcion llame a la api/haga lo que tenga que hacer
    console.log(`Bought item ${id}!`)
}

const contactAuthor = () => {
    //TODO: Hacer que esta funcion haga lo que tiene que hacer
    console.log(`Contacted ${author} (ID: ${authorId})!`)
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
                <img :src="[favourite ? 'src/assets/star-fill.svg' : 'src/assets/star.svg']" v-on:click="toggleFavourite"/>
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
            <div v-if="currentUserId === authorId" class="d-flex justify-content-between">
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