<script setup>
import ItemCard from '../components/ItemCard.vue';
import {CRow, CCol} from '@coreui/vue'

// TODO: Llamar a la api para conseguir estos props
const cardProps = [
    {
        id: 1,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'roro47',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1
    }, {
        id: 2,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'roro47',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1
    }, {
        id: 3,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'roro47',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1
    }, {
        id: 4,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'roro47',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1
    }, {
        id: 5,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'roro47',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1
    }, {
        id: 6,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'roro47',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1
    }, {
        id: 7,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'roro47',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1
    }, {
        id: 8,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'roro47',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1
    }, {
        id: 9,
        title: 'Brownies veganos',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR.',
        author: 'roro47',
        category: 'Comida',
        amount: 993450,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1
    }, {
        id: 10,
        title: 'Brownies veganos mejores',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
        author: 'roro47',
        category: 'Comida',
        amount: 99345,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1
    }, {
        id: 11,
        title: 'Brownies veganos mejores',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
        author: 'roro47',
        category: 'Comida',
        amount: 99345,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1
    }, {
        id: 12,
        title: 'Brownies veganos mejores',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
        author: 'roro47',
        category: 'Comida',
        amount: 99345,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1
    }, {
        id: 13,
        title: 'Brownies veganos mejores',
        imgURL: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
        description: 'Brownies exquisitos muito bom para comprar 9.990 con tarjeta CMR. Mejor que los de arriba',
        author: 'roro47',
        category: 'Comida',
        amount: 99345,
        campus: 'San Joaquin',
        favourite: false,
        authorId: 1
    }, 
]
</script>

<template>
    <CRow :xs="{cols: 1}" :md="{cols: 2}" :lg="{cols: 3}" :xxl="{cols: 4}">
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
