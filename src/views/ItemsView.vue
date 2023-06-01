<script setup>
import ItemCard from '../components/ItemCard.vue';
import { ref } from "vue"
import { API_URL } from "../global"
import { CRow, CCol } from '@coreui/vue'
import { useFavouriteStore } from '../stores/favouriteItems';

const favouriteStore = useFavouriteStore()

// TODO: Llamar a la api para conseguir estos props
const loading = ref(true)
let cardProps = []

const getProps = async () => {
    const response = await fetch(`${API_URL}/items`)
    if (response.status === 200) {
        const rawProps = await response.json()
        console.log(rawProps)
        cardProps = rawProps.map( (item) => {
            return {
                id: item.id,
                title: item.title,
                imgURL: item.imagesURL[0],
                description: item.description,
                author: item.user.userName,
                category: item.category,
                amount: item.amount,
                campus: item.campus,
                authorId: item.user.id,
                favourite: favouriteStore.favouriteIds.includes(item.id)
            }
        })
        loading.value = false;
    } else {
        console.log('Failed to fetch :(')
    }
}
getProps();


// const cardProps = [
//     {
//         id: 1,
//         title: 'Brownies veganos',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
//         author: 'roro47',
//         category: 'Comida',
//         amount: 993450,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1
//     }, {
//         id: 10,
//         title: 'Brownies veganos mejores',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
//         author: 'roro47',
//         category: 'Comida',
//         amount: 99345,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1
//     },
// ]
</script>

<template>
    <div v-if="loading">Loading...</div>
    <CRow v-else :xs="{cols: 1}" :md="{cols: 2}" :lg="{cols: 3}" :xxl="{cols: 4}">
        <CCol xs v-for="prop in cardProps" class="d-flex justify-content-center">
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
</template>
