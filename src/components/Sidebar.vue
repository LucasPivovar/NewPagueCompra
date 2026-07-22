<template>
  <aside class="sidebar" :class="{ 'mobile-open': isOpen }">
    <div class="sidebar-header">
      <img src="/download.png" alt="Pague Compra" class="sidebar-logo-full" />
    </div>

    <!-- Merchant / Seller Nav -->
    <nav class="sidebar-nav" v-if="currentPortal !== 'backoffice'">
      <a class="nav-item" :class="{ active: activeTab === 'visao-geral' }" @click="$emit('change-tab', 'visao-geral')">
        <Grid class="nav-icon" size="18" /> Visão Geral
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'carteira' }" @click="$emit('change-tab', 'carteira')">
        <Wallet class="nav-icon" size="18" /> Minha Carteira
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'extratos' }" @click="$emit('change-tab', 'extratos')">
        <FileText class="nav-icon" size="18" /> Extratos
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'conexoes' }" @click="$emit('change-tab', 'conexoes')">
        <Link2 class="nav-icon" size="18" /> Conexões
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'minha-conta' }" @click="$emit('change-tab', 'minha-conta')">
        <User class="nav-icon" size="18" /> Minha Conta
      </a>
    </nav>

    <!-- Backoffice Admin Nav -->
    <nav class="sidebar-nav" v-if="currentPortal === 'backoffice'">
      <a class="nav-item" :class="{ active: activeTab === 'admin-overview' }" @click="$emit('change-tab', 'admin-overview')">
        <Grid class="nav-icon" size="18" /> Visão Geral
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'admin-clients' }" @click="$emit('change-tab', 'admin-clients')">
        <Users class="nav-icon" size="18" /> Clientes
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'admin-transactions' }" @click="$emit('change-tab', 'admin-transactions')">
        <ArrowRightLeft class="nav-icon" size="18" /> Transações
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'admin-cobrancas' }" @click="$emit('change-tab', 'admin-cobrancas')">
        <Receipt class="nav-icon" size="18" /> Cobranças
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'admin-extratos' }" @click="$emit('change-tab', 'admin-extratos')">
        <FileText class="nav-icon" size="18" /> Extratos
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'admin-kyc' }" @click="$emit('change-tab', 'admin-kyc')">
        <ShieldCheck class="nav-icon" size="18" /> KYC / Docs
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'admin-users' }" @click="$emit('change-tab', 'admin-users')">
        <User class="nav-icon" size="18" /> Usuários
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'admin-webhooks' }" @click="$emit('change-tab', 'admin-webhooks')">
        <Webhook class="nav-icon" size="18" /> Webhooks
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'admin-fees' }" @click="$emit('change-tab', 'admin-fees')">
        <BadgeDollarSign class="nav-icon" size="18" /> Taxas
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'admin-logs' }" @click="$emit('change-tab', 'admin-logs')">
        <ScrollText class="nav-icon" size="18" /> Logs
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'admin-conciliacao' }" @click="$emit('change-tab', 'admin-conciliacao')">
        <Scale class="nav-icon" size="18" /> Conciliação
      </a>
      <a class="nav-item" :class="{ active: activeTab === 'admin-config' }" @click="$emit('change-tab', 'admin-config')">
        <Settings class="nav-icon" size="18" /> Configurações
      </a>
    </nav>

    <div class="sidebar-footer" style="padding-bottom: 24px;">
      <div class="help-card" v-if="currentPortal !== 'backoffice'">
        <div class="help-header">
          <Headset class="help-icon" size="20" />
          <div>
            <h4>Precisa de ajuda?</h4>
            <p>Nossa equipe está pronta<br>para te atender.</p>
          </div>
        </div>
        <button class="btn-help-outline" @click="$emit('change-tab', 'atendimento')">
          Abrir atendimento <ExternalLink size="14" />
        </button>
      </div>

      <a class="nav-item logout-item" @click="$emit('logout')">
        <LogOut class="nav-icon" size="18" /> Sair
      </a>
    </div>
  </aside>
</template>

<script>
import { Grid, Wallet, FileText, Link2, User, Headset, ExternalLink, Users, ArrowRightLeft, Receipt, ShieldCheck, Settings, ScrollText, Scale, BadgeDollarSign, Webhook, LogOut } from 'lucide-vue-next';

export default {
  name: 'AppSidebar',
  components: {
    Grid, Wallet, FileText, Link2, User, Headset, ExternalLink,
    Users, ArrowRightLeft, Receipt, ShieldCheck, Settings, ScrollText, Scale, BadgeDollarSign, Webhook, LogOut
  },
  props: {
    currentPortal: String,
    activeTab: String,
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change-tab', 'switch-portal', 'logout', 'close-sidebar']
}
</script>

<style scoped>
.switch-portal-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: calc(100% - 32px);
  margin: 0 16px 12px 16px;
  padding: 8px 12px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
  color: rgba(255,255,255,0.8);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.switch-portal-btn:hover {
  background: rgba(255,255,255,0.15);
  color: white;
}
</style>
