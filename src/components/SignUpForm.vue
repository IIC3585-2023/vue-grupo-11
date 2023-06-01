<script setup>
import { CForm, CFormInput, CCard, CFormCheck, CButton, CCol, CContainer, CRow, CAlert } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import { cilWarning } from '@coreui/icons';
import { ref } from 'vue';
import  router  from '../router/index'



const email = ref("");
const username = ref("");
const password = ref("");
const rememberMe = ref(false);
const signUpButtonDisabled= ref(false);

const redirectToLogin = () => {
    router.push('/login');
}

const swapSignUpButtonState = () => {
    signUpButtonDisabled.value = !signUpButtonDisabled.value;
}

const API_URL = 'https://backend-vue.onrender.com';
const formError = ref(false);

const signUpRequest = async () => {

    //Disable SignUp Button
    swapSignUpButtonState();

    const body = {
        email: email.value,
        username: username.value,
        password: password.value
    }
    console.log(body, email.value)
    const URL = API_URL + '/users/sign_up';
    const res = await fetch(URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if(res.status != 200){
        swapSignUpButtonState()
        formError.value = true;
        return;
    }

    redirectToLogin();
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
                label="" 
                type="text" 
                placeholder="Username" 
                aria-label="default input example"
                @input="username = $event.target.value"
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
            <CButton :disabled="signUpButtonDisabled" style="margin-left: 45%;" color="primary" @click="signUpRequest">
                Sign Up
            </CButton>
            
        </CForm>
    </CCard>
</template>