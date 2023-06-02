<script setup>
import { CForm, CFormInput, CCard, CFormCheck, CButton, CCol, CContainer, CRow, CAlert, CFormSelect } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import { cilWarning } from '@coreui/icons';
import { ref } from 'vue';
import  router  from '../router/index'
import '@coreui/coreui/dist/css/coreui.min.css'
import { sessionStore } from '../stores/session';

const session = sessionStore();

// Form data
const title = ref("");
const imgURL = ref("");
const description = ref("");
const category = ref("");
const amount = ref("");
const campus = ref("");

// session data
const token = ref("");
const error = ref("");

const signUpButtonDisabled= ref(false);

const redirectToItemsPage = () => {
    router.push('/items');
}

const loadSession = () => {
    if(!session.loggedIn){
        return;
    }

    token.value = session.jwt;
}

const swapSignUpButtonState = () => {
    signUpButtonDisabled.value = !signUpButtonDisabled.value;
}

const API_URL = 'https://backend-vue.onrender.com';
const formError = ref(false);

const createItemRequest = async () => {
    //Disable SignUp Button
    swapSignUpButtonState();

    const body = {
        "title": title.value,
        "description": description.value,
        "category": category.value,
        "amount": parseInt(amount.value),
        "campus": campus.value,
        "imagesURL": ["https://falabella.scene7.com/is/image/Falabella/gsc_118377877_2074332_1?wid=240&hei=240&qlt=70&fmt=webp"]
    }

    console.log(body);

    const URL = API_URL + '/items';
    const res = await fetch(URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token.value}`,
        },
        body: JSON.stringify(body)
    });

    const resJson = await res.json();
    console.log(resJson);

    if(res.status != 200){
        swapSignUpButtonState()
        formError.value = true;
        error.value = resJson[0];
        return;
    }

    redirectToItemsPage();
}

    loadSession();
</script>

<template>
    <div>
    <CForm id="form">
            <!-- text: text under the input box -->
        <p class="fs-1" id="formTitle">List an item for sale</p>
        <CFormInput 
            label="Title" 
            type="text" 
            placeholder="Item name" 
            aria-label="default input example"
            @input="title = $event.target.value"
        />
        <br>
        
        <CFormInput
            type="file" 
            @input="imgURL = $event.target.value"
        />
        <br>

        <CFormInput 
            label="Description" 
            type="text" 
            placeholder="Description" 
            aria-label="default input example"
            @input="description = $event.target.value"
        />
        <br>

        <CFormInput 
            label="Price" 
            type="number" 
            placeholder="9999" 
            aria-label="default input example"
            min="0"
            @input="amount = $event.target.value"
        />
        <br>
        
        <CFormSelect aria-label="Default select example" @input="category = $event.target.value">
            <option>Categories</option>
            <option value="Computadores y Electronica">Computadores y Electronica</option>
            <option value="Ropa">Ropa</option>
            <option value="Comida">Comida</option>
            <option value="Otros">Otros</option>
        </CFormSelect>
        <br>

        <CFormInput 
            label="Campus" 
            type="text" 
            placeholder="San Joaquin" 
            aria-label="default input example"
            @input="campus = $event.target.value"
        />
        <br>
        
        <div v-if="formError == true">
            <CAlert color="danger" class="d-flex align-items-center">
                <CIcon :icon="cilWarning" class="flex-shrink-0 me-2" width="24" height="24" />
                <div>
                    {{ error }} 
                </div>
            </CAlert>
        </div>
        <CButton :disabled="signUpButtonDisabled" id="signupButton" color="primary" @click="createItemRequest">
            List item
        </CButton>
        
    </CForm>
</div>
</template>

<style>
#form {
    width: 70%; 
    padding-left: 15%; 
    padding-right: 15%;
    padding-top: 10px;
    box-shadow: 10px 10px 5px 12px lightblue;
    margin-left: 15%;
    margin-top: 10px;
}
#emailInput {
    margin-top: 10%;
}
#formTitle{
    padding-left: 20%;
}
#signupButton {
    margin-left: 35%;
    margin-bottom: 5%;
}
</style>