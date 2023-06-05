<script setup>
import ItemCard from '../components/ItemCard.vue';
import { reactive, ref, computed, watch } from 'vue';
import { API_URL } from "../global";
import { CRow, CCol, CHeader, CHeaderNav, CNavItem, CNavLink } from '@coreui/vue'
import { sessionStore } from '../stores/session.js';
import { useFavouriteStore } from '../stores/favouriteItems.js';
import NavBar from '../components/NavBar.vue'

let soldProps = []
let activeProps = []
const loading = ref(true)

const session = sessionStore();
const favouriteStore = useFavouriteStore()

if (!session.loggedIn) {
    router.push('/')
}

const token = session.jwt

//TODO: llamar a la api para obtener esta info
const getProps = async () => {
    const response = await fetch(`${API_URL}/items/sold`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.status === 200) {
        const rawProps = await response.json();
        const parsedProps = rawProps.map( (item) => {
            return {
                id: item.item_id,
                title: item.title,
                imgURL: item.imagesURL[0],
                description: item.description,
                author: item.user_username,
                category: item.category,
                amount: item.amount,
                campus: item.campus,
                authorId: item.user_id,
                favourite: favouriteStore.favouriteIds.includes(item.id),
                buyerId: item.buyer_id,
                buyerUsername: item.buyer_username
            }
        })
        soldProps = parsedProps.filter( (item) => item.buyerId !== null);
        activeProps = parsedProps.filter( (item) => item.buyerId === null);
        loading.value = false;
    } else {
        console.log('Failed to fetch :(')
    }
}
getProps();

// const rawProps = [
//     {
//         id: 1,
//         title: 'Brownies veganos',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 993450,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: null,
//     }, {
//         id: 2,
//         title: 'Brownies veganos',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 993450,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: null,
//     }, {
//         id: 3,
//         title: 'Brownies veganos',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 993450,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: null,
//     }, {
//         id: 4,
//         title: 'Brownies veganos',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 993450,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: null,
//     }, {
//         id: 5,
//         title: 'Brownies veganos',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 993450,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: null,
//     }, {
//         id: 6,
//         title: 'Brownies veganos',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 993450,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: null,
//     }, {
//         id: 7,
//         title: 'Brownies veganos',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 993450,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: null,
//     }, {
//         id: 8,
//         title: 'Brownies veganos',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 993450,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: null,
//     }, {
//         id: 9,
//         title: 'Brownies veganos',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 993450,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: null,
//     }, {
//         id: 10,
//         title: 'Brownies veganos',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 993450,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: null,
//     }, {
//         id: 11,
//         title: 'Brownies veganos mejores',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 99345,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: {
//             id: 3,
//             userName: 'komplex',
//         }
//     }, {
//         id: 12,
//         title: 'Brownies veganos mejores',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 99345,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: {
//             id: 3,
//             userName: 'komplex',
//         }
//     }, {
//         id: 13,
//         title: 'Brownies veganos mejores',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 99345,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: {
//             id: 3,
//             userName: 'komplex',
//         }
//     }, {
//         id: 14,
//         title: 'Brownies veganos mejores',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 99345,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: {
//             id: 3,
//             userName: 'komplex',
//         }
//     }, {
//         id: 15,
//         title: 'Brownies veganos mejores',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 99345,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: {
//             id: 3,
//             userName: 'komplex',
//         }
//     }, {
//         id: 16,
//         title: 'Brownies veganos mejores',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 99345,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: {
//             id: 3,
//             userName: 'komplex',
//         }
//     }, {
//         id: 17,
//         title: 'Brownies veganos mejores',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 99345,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: {
//             id: 3,
//             userName: 'komplex',
//         }
//     }, {
//         id: 18,
//         title: 'Brownies veganos mejores',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 99345,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: {
//             id: 3,
//             userName: 'komplex',
//         }
//     }, {
//         id: 19,
//         title: 'Brownies veganos mejores',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 99345,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: {
//             id: 3,
//             userName: 'komplex',
//         }
//     }, {
//         id: 20,
//         title: 'Brownies veganos mejores',
//         imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
//         description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
//         author: 'fjquintana',
//         category: 'Comida',
//         amount: 99345,
//         campus: 'San Joaquin',
//         favourite: false,
//         authorId: 1,
//         boughtUser: {
//             id: 3,
//             userName: 'komplex',
//         }
//     },
// ]


const currentView = ref('active');

const changeViewToActive = () => {
    currentView.value = 'active'
}

const changeViewToSold = () => {
    currentView.value = 'sold'
}
</script>

<template>
    <NavBar></NavBar>
    <div v-if="loading">Loading...</div>
    <div v-else>
        <CHeader>
            <CHeaderNav>
                <CNavItem>
                    <CNavLink class="clickableItem" active @click="changeViewToActive">
                        Active sales
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink class="clickableItem" active @click="changeViewToSold">
                        Past sales
                    </CNavLink>
                </CNavItem>
            </CHeaderNav>
        </CHeader>
        <CRow v-if="currentView === 'active'" :xs="{cols: 1}" :md="{cols: 2}" :lg="{cols: 3}" :xxl="{cols: 4}">
            <CCol xs v-for="prop in activeProps" class="d-flex justify-content-center" :key="prop.id">
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
        <CRow v-else-if="currentView === 'sold'" :xs="{cols: 1}" :md="{cols: 2}" :lg="{cols: 3}" :xxl="{cols: 4}">
            <CCol xs v-for="prop in soldProps" class="d-flex justify-content-center" :key="prop.id">
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
                    :bought="true"
                    :buyerId="prop.buyerId"
                    :buyerUsername="prop.buyerUsername"
                />
            </CCol>
        </CRow>
    </div>
</template>

<style scoped>
.clickableItem {
    cursor:pointer
}
</style>