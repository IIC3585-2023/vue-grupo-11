<script setup> 
import { CNavbar } from '@coreui/vue';
import { CContainer } from '@coreui/vue';
import { CNavbarBrand } from '@coreui/vue';
import { CNavbarToggler } from '@coreui/vue';
import { CCollapse } from '@coreui/vue';
import { CNavItem } from '@coreui/vue';
import { CNavLink } from '@coreui/vue';
import { CDropdown } from '@coreui/vue';
import { CDropdownMenu } from '@coreui/vue';
import { CDropdownToggle } from '@coreui/vue';
import { CDropdownItem } from '@coreui/vue';
import { CNavbarNav } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import { cilPeople } from '@coreui/icons';
import  router  from '../router/index'
import '@coreui/coreui/dist/css/coreui.min.css'
import { sessionStore } from '../stores/session';
import { ref } from 'vue';

const session = sessionStore();

const loggedIn = ref(false);
const username = ref("");

const redirectToHomePage = () => {
    router.push('/');
}

const redirectToLogin = () => {
    router.push('/login');
}

const redirectToSignUp = () => {
    router.push('/sign_up')
}

const loadSession = () => {
    if(!session.loggedIn){
        return;
    }

    loggedIn.value = session.loggedIn;
    username.value = session.user.userName;

}

const signOut = () => {
    loggedIn.value = false;
    username.value = false;
    session.$reset();
    redirectToLogin();
}

loadSession();

</script>

<template>
    <CNavbar expand="lg" color-scheme="light" class="bg-light">
        <CContainer fluid>
            <CNavbarBrand href="" @click="redirectToHomePage">MarketplaceUC</CNavbarBrand>
            <CNavbarToggler />
            <CCollapse class="navbar-collapse" :visible="visible">
            <CNavbarNav>
                <CNavItem>
                    <CNavLink href="#" active>
                        Items
                    </CNavLink>
                </CNavItem>
                    <div v-if="loggedIn === true">
                        <CNavItem>
                            <CNavLink href="#" active>
                                Messages
                            </CNavLink>
                        </CNavItem>
                    </div>
                
            </CNavbarNav>
            <CDropdown id="sessionIcon">
                <CDropdownToggle color="primary">
                    <CIcon :icon="cilPeople" size="xl"/>
                </CDropdownToggle>
                <CDropdownMenu :id="sessionIcon">
                    <div v-if="loggedIn !== true">
                        <CDropdownItem @click="redirectToLogin">Login</CDropdownItem>
                        <CDropdownItem @click="redirectToSignUp">Sign up</CDropdownItem>
                    </div>
                    <div v-else>
                        <CDropdownItem>{{ username }}</CDropdownItem>
                        <CDropdownItem @click="signOut">Sign Out</CDropdownItem>
                    </div>
                </CDropdownMenu>
            </CDropdown>

            </CCollapse>
        </CContainer>
    </CNavbar>
</template>

<style scoped>
#sessionIcon {
    margin-left: 80%;
}
</style>