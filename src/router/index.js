import { createRouter, createWebHistory } from 'vue-router'

import MerchantOverviewView from '../views/merchant/OverviewView.vue'
import MerchantWalletView from '../views/merchant/WalletView.vue'
import MerchantStatementsView from '../views/merchant/StatementsView.vue'
import MerchantConnectionsView from '../views/merchant/ConnectionsView.vue'
import MerchantAccountView from '../views/merchant/AccountView.vue'
import AtendimentoView from '../views/shared/AtendimentoView.vue'

import AuthLoginView from '../views/auth/LoginView.vue'
import AuthForgotPasswordView from '../views/auth/ForgotPasswordView.vue'
import AuthRegisterView from '../views/auth/RegisterView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: MerchantOverviewView },
  { path: '/wallet', component: MerchantWalletView },
  { path: '/statements', component: MerchantStatementsView },
  { path: '/connections', component: MerchantConnectionsView },
  { path: '/account', component: MerchantAccountView },
  { path: '/atendimento', component: AtendimentoView },

  { path: '/auth/login', component: AuthLoginView },
  { path: '/auth/forgot-password', component: AuthForgotPasswordView },
  { path: '/auth/register', component: AuthRegisterView },
  
  // Fallback route
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
