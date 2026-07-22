import { createRouter, createWebHistory } from 'vue-router'

// Merchant
import MerchantOverviewView from '../views/merchant/OverviewView.vue'
import MerchantWalletView from '../views/merchant/WalletView.vue'
import MerchantStatementsView from '../views/merchant/StatementsView.vue'
import MerchantConnectionsView from '../views/merchant/ConnectionsView.vue'
import MerchantAccountView from '../views/merchant/AccountView.vue'
import AtendimentoView from '../views/shared/AtendimentoView.vue'

// Auth
import AuthLoginView from '../views/auth/LoginView.vue'
import AuthForgotPasswordView from '../views/auth/ForgotPasswordView.vue'
import AuthRegisterView from '../views/auth/RegisterView.vue'

// Backoffice
import AdminOverviewView from '../views/backoffice/AdminOverviewView.vue'
import AdminClientsView from '../views/backoffice/AdminClientsView.vue'
import AdminTransactionsView from '../views/backoffice/AdminTransactionsView.vue'
import AdminExtratosView from '../views/backoffice/AdminExtratosView.vue'
import AdminCobrancasView from '../views/backoffice/AdminCobrancasView.vue'
import AdminKycView from '../views/backoffice/AdminKycView.vue'
import AdminUsersView from '../views/backoffice/AdminUsersView.vue'
import AdminWebhooksView from '../views/backoffice/AdminWebhooksView.vue'
import AdminFeesView from '../views/backoffice/AdminFeesView.vue'
import AdminLogsView from '../views/backoffice/AdminLogsView.vue'
import AdminConciliacaoView from '../views/backoffice/AdminConciliacaoView.vue'
import AdminConfigView from '../views/backoffice/AdminConfigView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },

  // Merchant routes
  { path: '/dashboard', component: MerchantOverviewView },
  { path: '/wallet', component: MerchantWalletView },
  { path: '/statements', component: MerchantStatementsView },
  { path: '/connections', component: MerchantConnectionsView },
  { path: '/account', component: MerchantAccountView },
  { path: '/atendimento', component: AtendimentoView },

  // Auth routes
  { path: '/auth/login', component: AuthLoginView },
  { path: '/auth/forgot-password', component: AuthForgotPasswordView },
  { path: '/auth/register', component: AuthRegisterView },

  // Backoffice routes
  { path: '/admin', redirect: '/admin/overview' },
  { path: '/admin/overview', component: AdminOverviewView },
  { path: '/admin/clients', component: AdminClientsView },
  { path: '/admin/transactions', component: AdminTransactionsView },
  { path: '/admin/extratos', component: AdminExtratosView },
  { path: '/admin/cobrancas', component: AdminCobrancasView },
  { path: '/admin/kyc', component: AdminKycView },
  { path: '/admin/users', component: AdminUsersView },
  { path: '/admin/webhooks', component: AdminWebhooksView },
  { path: '/admin/fees', component: AdminFeesView },
  { path: '/admin/logs', component: AdminLogsView },
  { path: '/admin/conciliacao', component: AdminConciliacaoView },
  { path: '/admin/config', component: AdminConfigView },

  // Fallback
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
