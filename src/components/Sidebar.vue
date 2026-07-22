<template>
  <aside class="sidebar" :class="{ 'mobile-open': isOpen }">
    <div class="sidebar-header">
      <div class="brand-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="brand-info">
        <h1>Pague Compra</h1>
        <p>API Pix para o seu negócio</p>
      </div>
    </div>

    <!-- Merchant / Seller Nav -->
    <nav class="sidebar-nav">
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

    <div class="sidebar-footer" style="padding-bottom: 24px;">
      <div class="help-card">
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
    </div>
  </aside>
</template>

<script>
import { Grid, Wallet, FileText, Link2, User, Headset, ExternalLink } from 'lucide-vue-next';

export default {
  name: 'AppSidebar',
  components: {
    Grid, Wallet, FileText, Link2, User, Headset, ExternalLink
  },
  props: {
    currentPortal: String,
    activeTab: String,
    isOpen: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
/* Scoped overrides if necessary, but most will be in main.css */
</style>
