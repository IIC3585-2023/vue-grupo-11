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
    <CCard>
        <CForm style="width: 100%; padding-left: 25%; padding-right: 25%;">
                <!-- text: text under the input box -->
            <CFormInput style="margin-top: 10px;"
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
            <CButton :disabled="loginButtonDisabled" style="margin-left: 45%;" color="primary" @click="loginRequest">Login</CButton>
        </CForm>
    </CCard>
</template>