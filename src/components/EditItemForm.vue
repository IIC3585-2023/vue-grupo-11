<script setup>
import { CForm, CFormInput, CCard, CFormCheck, CButton, CCol, CContainer, CRow, CAlert, CFormSelect, CCardImage } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import { cilWarning } from '@coreui/icons';
import { ref } from 'vue';
import  router  from '../router/index'
import '@coreui/coreui/dist/css/coreui.min.css'
import { sessionStore } from '../stores/session';
import UploadWidget from "./UploadWidget.vue";
import { useRoute } from 'vue-router';

const loading = ref(true)

const session = sessionStore();
const route = useRoute();
const itemId = ref(route.params.id)._value;

// Form data
const id = ref(-1);
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
    router.push('/');
}

const loadSession = () => {
    if(!session.loggedIn){
        redirectToItemsPage();
        return;
    }

    token.value = session.jwt;
}

const updateImgURL = (secureUrl) => {
  imgURL.value = secureUrl;
};

const swapSignUpButtonState = () => {
    signUpButtonDisabled.value = !signUpButtonDisabled.value;
}

const API_URL = 'https://backend-vue.onrender.com';
const formError = ref(false);

const createItemRequest = async () => {
    swapSignUpButtonState();

    const body = {
        "title": title.value,
        "description": description.value,
        "category": category.value,
        "amount": parseInt(amount.value),
        "campus": campus.value,
        "imagesURL": [imgURL.value]
    }

    console.log(body);

    const URL = API_URL + `/items/${itemId}`;
    const res = await fetch(URL, {
        method: 'PUT',
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

const deleteItemRequest = async () => {
    const URL = API_URL + `/items/${itemId}`;
    const res = await fetch(URL, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token.value}`,
        },
    });

    const resJson = await res.json();
    console.log(resJson);

    if(res.status == 200){
        redirectToItemsPage();
        return;
    }

}

function updateImgURLHandler(secureUrl) {
    imgURL.value = secureUrl;
}

const loadItem = async () => {console.log(itemId)
    const response = await fetch(`${API_URL}/items/${itemId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.status === 200) {
        const rawProps = await response.json();
        console.log(rawProps)
        
        if (rawProps.length > 0) {
            id.value =  rawProps[0].id;
            title.value =  rawProps[0].title;
            imgURL.value =  rawProps[0].imagesURL[0];
            description.value =  rawProps[0].description;
            category.value =  rawProps[0].category;
            amount.value =  rawProps[0].amount;
            campus.value =  rawProps[0].campus;
            console.log(imgURL)

            if (session.user.id != id.value) {
                console.log("cant edit")
                redirectToItemsPage();
            } else {
                // can edit
            }

        } else {
            console.log('No item found');
            redirectToItemsPage();
            // Handle the case where no item is found
        }

    } else {
        console.log('Failed to fetch :(')
        redirectToItemsPage();
    }
    
    loading.value = false;
}

loadSession();
loadItem();
</script>

<template>

    <div v-if="loading">Loading...</div>
    <div v-else>
        <CForm id="form">
                <!-- text: text under the input box -->
            <p class="fs-1" id="formTitle">Edit Item</p>
            <CFormInput 
                v-model="title"
                label="Title" 
                type="text" 
                placeholder="Item name" 
                aria-label="default input example"
                @input="title = $event.target.value"
            />
            <br>
            
            <CCardImage v-bind:src="imgURL" class="scaled-image" />
            <div></div>
            <br>
            <UploadWidget :updateImgURL="updateImgURLHandler" />
            <br>

            <CFormInput 
                v-model="description"
                label="Description" 
                type="text" 
                placeholder="Description" 
                aria-label="default input example"
                @input="description = $event.target.value"
            />
            <br>

            <CFormInput 
                v-model="amount"
                label="Price" 
                type="number" 
                placeholder="9999" 
                aria-label="default input example"
                min="0"
                @input="amount = $event.target.value"
            />
            <br>
            
            <CFormSelect  v-model="category" aria-label="Default select example" @input="category = $event.target.value">
                <option>Categories</option>
                <option value="Computadores y Electronica">Computadores y Electronica</option>
                <option value="Ropa">Ropa</option>
                <option value="Comida">Comida</option>
                <option value="Otros">Otros</option>
            </CFormSelect>
            <br>

            <CFormInput 
                v-model="campus"
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
                Update item
            </CButton>
            <CButton :disabled="signUpButtonDisabled" id="signupButton" color="danger" @click="deleteItemRequest">
                Delete item
            </CButton>
            <br>
            
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
.scaled-image {
  max-width: 200px; /* Set the maximum width you want for the image */
  height: auto; /* Maintain the image's aspect ratio */
}
</style>