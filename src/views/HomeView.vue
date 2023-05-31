<script setup>
import ItemCard from '../components/ItemCard.vue';
import {CRow, CCol} from '@coreui/vue'

import { useFavouriteStore } from '../stores/favouriteItems.js'

const favouriteStore = useFavouriteStore()

const favouriteItems = favouriteStore.favourites

</script>

<template>
  <main>
    <CRow :xs="{cols: 1}" :md="{cols: 2}" :lg="{cols: 3}" :xxl="{cols: 4}">
        <CCol xs v-for="prop in favouriteItems" class="d-flex justify-content-center">
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
