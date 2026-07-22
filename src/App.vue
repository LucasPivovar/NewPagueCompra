<template>
  <div class="app-wrapper">
    <!-- Sidebar Component (Hide on auth pages) -->
    <AppSidebar 
      v-if="!isAuthPage"
      :currentPortal="currentPortal" 
      :activeTab="currentRouteTab" 
      :isOpen="isSidebarOpen"
      @change-tab="navigateToTab"
      @switch-portal="switchPortal"
      @logout="$router.push('/auth/login')"
      @close-sidebar="isSidebarOpen = false"
    />

    <!-- Overlay do mobile -->
    <div v-if="isSidebarOpen && !isAuthPage" class="sidebar-overlay" @click="isSidebarOpen = false"></div>

    <!-- Main Content Area -->
    <main class="main-content" :class="{ 'with-sidebar': !isAuthPage }">
      <!-- Header Component (Hide on auth pages) -->
      <AppHeader 
        v-if="!isAuthPage"
        :currentPortal="currentPortal" 
        :theme="theme" 
        @toggle-theme="toggleTheme"
        @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
        @open-notifications="showNotifications = true"
        @logout="$router.push('/auth/login')"
      />

      <div class="page-container" :class="{ 'auth-page-padding': isAuthPage }">
        <router-view v-slot="{ Component }">
          <transition name="page-fade" mode="out-in">
            <component 
              :is="Component" 
              :wallet="wallet"
              :transactions="transactions"
              @open-pix-modal="showPixModal = true"
              @open-withdraw-modal="showWithdrawModal = true"
              @toast="triggerToast"
            />
          </transition>
        </router-view>
      </div>
    </main>

    <!-- Modals -->
    <PixModal :show="showPixModal" @close="showPixModal = false" @toast="triggerToast" />
    <WithdrawModal :show="showWithdrawModal" @close="showWithdrawModal = false" @withdraw-completed="handleWithdraw" @toast="triggerToast" />
    <NotificationModal :isOpen="showNotifications" @close="showNotifications = false" />

    <!-- Toast Notifications Container -->
    <div class="toast-container">
      <div v-for="t in toasts" :key="t.id" class="toast" :class="t.type">
        <span>{{ t.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
import AppSidebar from './components/Sidebar.vue';
import PixModal from './components/PixModal.vue';
import WithdrawModal from './components/WithdrawModal.vue';
import NotificationModal from './components/NotificationModal.vue';
import { apiService } from './services/api.js';

export default {
  name: 'App',
  components: { AppHeader, AppSidebar, PixModal, WithdrawModal, NotificationModal },
  data() {
    return {
      theme: 'light',
      isSidebarOpen: false,
      showPixModal: false,
      showWithdrawModal: false,
      showNotifications: false,
      wallet: {
        saldoDisponivel: 48750.32,
        saldoBloqueado: 5320.10,
        saldoAReceber: 16240.80,
        recebidoNoMes: 124560.78,
        totalSacado: 124560.78
      },
      transactions: [],
      toasts: []
    }
  },
  computed: {
    isAuthPage() {
      return this.$route.path.startsWith('/auth');
    },
    currentPortal() {
      return this.$route.path.startsWith('/admin') ? 'backoffice' : 'merchant';
    },
    currentRouteTab() {
      const p = this.$route.path;
      // Merchant tabs
      if (p === '/dashboard') return 'visao-geral';
      if (p === '/wallet') return 'carteira';
      if (p === '/statements') return 'extratos';
      if (p === '/connections') return 'conexoes';
      if (p === '/account') return 'minha-conta';
      if (p === '/atendimento') return 'atendimento';
      // Backoffice tabs
      if (p === '/admin/overview') return 'admin-overview';
      if (p === '/admin/clients') return 'admin-clients';
      if (p === '/admin/transactions') return 'admin-transactions';
      if (p === '/admin/cobrancas') return 'admin-cobrancas';
      if (p === '/admin/extratos') return 'admin-extratos';
      if (p === '/admin/kyc') return 'admin-kyc';
      if (p === '/admin/users') return 'admin-users';
      if (p === '/admin/webhooks') return 'admin-webhooks';
      if (p === '/admin/fees') return 'admin-fees';
      if (p === '/admin/logs') return 'admin-logs';
      if (p === '/admin/conciliacao') return 'admin-conciliacao';
      if (p === '/admin/config') return 'admin-config';
      return 'visao-geral';
    }
  },
  async mounted() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.transactions = await apiService.getTransactions();
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.theme);
      this.triggerToast(`Tema alterado para ${this.theme === 'dark' ? 'Escuro' : 'Claro'}`, 'info');
    },
    switchPortal() {
      if (this.currentPortal === 'merchant') this.$router.push('/admin/overview');
      else this.$router.push('/dashboard');
    },
    navigateToTab(tab) {
      const map = {
        // Merchant
        'visao-geral': '/dashboard',
        'carteira': '/wallet',
        'extratos': '/statements',
        'conexoes': '/connections',
        'minha-conta': '/account',
        'atendimento': '/atendimento',
        // Backoffice
        'admin-overview': '/admin/overview',
        'admin-clients': '/admin/clients',
        'admin-transactions': '/admin/transactions',
        'admin-cobrancas': '/admin/cobrancas',
        'admin-extratos': '/admin/extratos',
        'admin-kyc': '/admin/kyc',
        'admin-users': '/admin/users',
        'admin-webhooks': '/admin/webhooks',
        'admin-fees': '/admin/fees',
        'admin-logs': '/admin/logs',
        'admin-conciliacao': '/admin/conciliacao',
        'admin-config': '/admin/config'
      };
      if (map[tab]) this.$router.push(map[tab]);
      this.isSidebarOpen = false;
    },
    handleWithdraw(amount) {
      this.wallet.saldoDisponivel -= amount;
      this.wallet.totalSacado += amount;
      this.transactions.unshift({
        id: `SAC-${Math.random().toString(36).substring(2,8)}`,
        payer: 'Saque Conta Bancária',
        value: amount,
        status: 'Concluído',
        date: new Date().toLocaleString('pt-BR'),
        type: 'Saída'
      });
    },
    triggerToast(message, type = 'info') {
      const id = Date.now();
      this.toasts.push({ id, message, type });
      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t.id !== id);
      }, 4000);
    }
  }
}
</script>
