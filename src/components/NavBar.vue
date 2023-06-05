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
import { RouterLink } from 'vue-router';
import { CNavbarNav } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import { cilPeople } from '@coreui/icons';
import  router  from '../router/index';
import '@coreui/coreui/dist/css/coreui.min.css';
import { sessionStore } from '../stores/session';
import { useFavouriteStore } from '../stores/favouriteItems.js'
import { ref } from 'vue';

const session = sessionStore();
const favouriteItems = useFavouriteStore();

const toggleNavbar = ref(false);

const loggedIn = ref(false);
const username = ref("");

const redirectToHomePage = () => {
    router.push('/');
}

const redirectToItemsPage = () => {
    router.push('/items')
}

const redirectToLogin = () => {
    router.push('/login');
}

const redirectToSignUp = () => {
    router.push('/sign_up')
}

const redirectToMessages = () => {
    router.push('/messages');
}
const redirectToMyItemsView = () => {
    router.push('/my_items')
}
const redirectCreateItem = () => {
    router.push('/create_item')
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
    favouriteItems.reset();
    redirectToLogin();
}

loadSession();

</script>

<template>
    <CNavbar expand="lg" color-scheme="light" class="bg-light">
        <CContainer fluid class="position-relative">
            <CNavbarBrand class="clickableItem" @click="redirectToHomePage">MarketplaceUC</CNavbarBrand>
            <CNavbarToggler @click="toggleNavbar = !toggleNavbar"/>
            <CCollapse class="navbar-collapse" :visible="toggleNavbar">
            <CNavbarNav>
                <CNavItem v-if="loggedIn">
                    <CNavLink class="clickableItem" active @click="redirectToItemsPage">
                        Favourite Items
                    </CNavLink>
                </CNavItem>
                <div v-if="loggedIn === true">
                    <CNavItem>
                        <CNavLink class="clickableItem" active @click="redirectToMessages">
                            Messages
                        </CNavLink>
                    </CNavItem>
                </div>
                <CNavItem v-if="loggedIn">
                    <CNavLink class="clickableItem" active @click="redirectToMyItemsView">
                        My Items
                    </CNavLink>
                </CNavItem>
                <div v-if="loggedIn === true">
                    <CNavItem>
                        <CNavLink class="clickableItem" active @click="redirectCreateItem">
                            Create Item
                        </CNavLink>
                    </CNavItem>
                </div>
                <div v-if="toggleNavbar === true">
                    <CDropdownItem style="margin-bottom: 10px;">{{ 'Username:  ' + username }}</CDropdownItem>
                    <CDropdownItem @click="signOut">Sign Out</CDropdownItem>
                </div>
            </CNavbarNav>
            <div v-if="toggleNavbar === false">
                <CDropdown id="iconDropdown" class="position-absolute top-0 end-0">
                    <CDropdownToggle color="primary">
                        <CIcon :icon="cilPeople" size="xl"/>
                    </CDropdownToggle>
                    <CDropdownMenu>
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
            </div>

            </CCollapse>
        </CContainer>
    </CNavbar>
</template>

<style scoped>
#sessionIcon {
    margin-left: 80%;
}
.clickableItem {
    cursor:pointer
}
#iconDropdown {
    margin-right: 15px;
}
</style>