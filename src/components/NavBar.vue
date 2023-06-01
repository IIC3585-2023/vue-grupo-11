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

</script>
<script>
export default {
    data() {
        // const session = sessionStore();
        // const loggedIn = session.loggedIn;
        return {
            loggedIn: false,
            username: "komplex"
        };
    },
    methods: {
        redirectToLogin: () => {
        router.push('/login')
        },
        redirectToHomePage: () => {
            router.push('/')
        },
        redirectToSignUp: () => {
            router.push('/sign_up')
        },
        signOut: () => {
            console.log("Sign out")
        }
    }
}
</script>

<template>
    <CNavbar expand="lg" color-scheme="light" class="bg-light">
        <CContainer fluid>
            <CNavbarBrand href="" @click="redirectToHomePage">MarketplaceUC</CNavbarBrand>
            <CNavbarToggler @click="visible = !visible"/>
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
            <CDropdown>
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
                        <CDropdownItem @click="redirectToLogin">Sign Out</CDropdownItem>
                    </div>
                </CDropdownMenu>
            </CDropdown>

            </CCollapse>
        </CContainer>
    </CNavbar>
</template>

<style>
</style>