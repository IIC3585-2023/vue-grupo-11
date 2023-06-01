<script setup>
import { CForm, CFormInput, CCard, CFormCheck, CButton, CCol, CContainer, CRow, CAlert } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import { cilBurn, cilWarning } from '@coreui/icons';
import { ref } from 'vue';
import  router  from '../router/index';
import { sessionStore } from '../stores/session';

const API_URL = 'https://backend-vue.onrender.com';

const email = ref("");
const password = ref("");
const formError = ref(false);

const session = sessionStore();

const loginButtonDisabled = ref(false);

const redirectToHome = () => {
    router.push('/');
}

const loginRequest = async () => {

    //Disable login button
    loginButtonDisabled.value = true;

    const body = {
        email: email.value,
        password: password.value
    }

    const URL = API_URL + '/users/login'

    const res = await fetch(URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if(res.status != 200){
        formError.value = true;
        loginButtonDisabled.value = false;
        return;
    }

    loginButtonDisabled.value = false;

    const responseBody = await res.json();

    session.loggedIn = true;
    session.jwt = responseBody.jwt;
    session.user = responseBody.user;

    redirectToHome();
}

</script>

<template>
    <CForm id="form">
            <!-- text: text under the input box -->
        <p class="fs-1" id="formTitle">Login</p>
        <CFormInput
            type="email"
            id="emailInput"
            label=""
            placeholder="name@example.com"
            text="" 
            aria-describedby="exampleFormControlInputHelpInline"
            :value="email"
            @input="email = $event.target.value"
        />
        <br>
        <CFormInput
            type="password" 
            id="passwordInput"
            placeholder="Password"
            label=""
            :value="password"
            @input="password = $event.target.value"
        />
        <br>
        <div v-if="formError == true">
            <CAlert color="danger" class="d-flex align-items-center">
                <CIcon :icon="cilWarning" class="flex-shrink-0 me-2" width="24" height="24" />
                <div>
                    Error signing up
                </div>
            </CAlert>
        </div>
        <br>
        <CButton id="loginButton" :disabled="loginButtonDisabled" color="primary" @click="loginRequest">Login</CButton>
    </CForm>
</template>

<style scoped>
#form {
    width: 70%; 
    padding-left: 25%; 
    padding-right: 25%;
    padding-top: 10px;
    box-shadow: 10px 10px 5px 12px lightblue;
    margin-left: 15%;
    margin-top: 10px;
}
#emailInput {
    margin-top: 10%;
}
#formTitle{
    padding-left: 25%;
}
#loginButton {
    margin-left: 35%;
    margin-bottom: 15%;
}
</style>