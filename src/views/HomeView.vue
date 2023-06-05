<script setup>
import ItemCard from '../components/ItemCard.vue';
import { ref } from "vue";
import { API_URL } from "../global";
import { CRow, CCol } from '@coreui/vue';
import NavBar from '../components/NavBar.vue';
import { useFavouriteStore } from '../stores/favouriteItems.js';

const favouriteStore = useFavouriteStore()

const loading = ref(true)
let cardProps = []

const getProps = async () => {
    const response = await fetch(`${API_URL}/items`)
    if (response.status === 200) {
        const rawProps = await response.json()
        cardProps = rawProps.map( (item) => {
            return {
                id: item.id,
                title: item.title,
                imgURL: item.imagesURL[0],
                description: item.description,
                author: item.userName,
                category: item.category,
                amount: item.amount,
                campus: item.campus,
                authorId: item.user_id,
                favourite: favouriteStore.favouriteIds.includes(item.id)
            }
        })
        loading.value = false;
    } else {
        console.log('Failed to fetch :(')
    }
}
getProps();
</script>

<template>
  <main>
    <NavBar></NavBar>
    <div v-if="loading">Loading...</div>
    <CRow v-else :xs="{cols: 1}" :md="{cols: 2}" :lg="{cols: 3}" :xxl="{cols: 4}">
        <CCol xs v-for="prop in cardProps" class="d-flex justify-content-center" :key="prop.id">
            <ItemCard 
                :id="prop.id"
                :title="prop.title"
                :imgURL="prop.imgURL"
                :description="prop.description"
                :author="prop.author"
                :category="prop.category"
                :amount="prop.amount"
                :campus="prop.campus"
                :favourite="prop.favourite"
                :authorId="prop.authorId" 
            />
        </CCol>
    </CRow>
  </main>
</template>
