<script setup>
import ItemCard from '../components/ItemCard.vue';
import { reactive, ref, computed, watch } from 'vue';
import { CRow, CCol, CHeader, CHeaderNav, CNavItem, CNavLink } from '@coreui/vue'
import NavBar from '../components/navbar.vue'

let soldProps = []
let activeProps = []
//TODO: llamar a la api para obtener esta info
const rawProps = [
    {
        id: 1,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'fjquintana',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: null,
    }, {
        id: 2,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'fjquintana',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: null,
    }, {
        id: 3,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'fjquintana',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: null,
    }, {
        id: 4,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'fjquintana',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: null,
    }, {
        id: 5,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'fjquintana',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: null,
    }, {
        id: 6,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'fjquintana',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: null,
    }, {
        id: 7,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'fjquintana',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: null,
    }, {
        id: 8,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'fjquintana',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: null,
    }, {
        id: 9,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'fjquintana',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: null,
    }, {
        id: 10,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'fjquintana',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: null,
    }, {
        id: 11,
        title: 'Brownies veganos mejores',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
        author: 'fjquintana',
        category: 'Comida',
        amount: 99345,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: {
            id: 3,
            userName: 'komplex',
        }
    }, {
        id: 12,
        title: 'Brownies veganos mejores',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
        author: 'fjquintana',
        category: 'Comida',
        amount: 99345,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: {
            id: 3,
            userName: 'komplex',
        }
    }, {
        id: 13,
        title: 'Brownies veganos mejores',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
        author: 'fjquintana',
        category: 'Comida',
        amount: 99345,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: {
            id: 3,
            userName: 'komplex',
        }
    }, {
        id: 14,
        title: 'Brownies veganos mejores',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
        author: 'fjquintana',
        category: 'Comida',
        amount: 99345,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: {
            id: 3,
            userName: 'komplex',
        }
    }, {
        id: 15,
        title: 'Brownies veganos mejores',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
        author: 'fjquintana',
        category: 'Comida',
        amount: 99345,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: {
            id: 3,
            userName: 'komplex',
        }
    }, {
        id: 16,
        title: 'Brownies veganos mejores',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
        author: 'fjquintana',
        category: 'Comida',
        amount: 99345,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: {
            id: 3,
            userName: 'komplex',
        }
    }, {
        id: 17,
        title: 'Brownies veganos mejores',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
        author: 'fjquintana',
        category: 'Comida',
        amount: 99345,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: {
            id: 3,
            userName: 'komplex',
        }
    }, {
        id: 18,
        title: 'Brownies veganos mejores',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
        author: 'fjquintana',
        category: 'Comida',
        amount: 99345,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: {
            id: 3,
            userName: 'komplex',
        }
    }, {
        id: 19,
        title: 'Brownies veganos mejores',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
        author: 'fjquintana',
        category: 'Comida',
        amount: 99345,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: {
            id: 3,
            userName: 'komplex',
        }
    }, {
        id: 20,
        title: 'Brownies veganos mejores',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
        author: 'fjquintana',
        category: 'Comida',
        amount: 99345,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1,
        boughtUser: {
            id: 3,
            userName: 'komplex',
        }
    },
]

soldProps = rawProps.filter( (item) => item.boughtUser !== null)
activeProps = rawProps.filter( (item) => item.boughtUser === null)

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
            />
        </CCol>
    </CRow>
</template>

<style scoped>
.clickableItem {
    cursor:pointer
}
</style>