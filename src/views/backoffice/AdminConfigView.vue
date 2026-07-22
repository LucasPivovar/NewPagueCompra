<template>
  <div class="admin-config">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Configurações Globais</h2>
        <p>Ajustes do sistema, limites padrão e chaves PIX da Pague Compra.</p>
      </div>
    </div>
    
    <div class="card mt-4">
      <div class="card-body">
        <h3 class="font-bold text-lg mb-4">Chaves Operacionais PIX</h3>
        <p class="text-muted text-sm mb-4">As contas de repasse para conciliação global.</p>
        
        <div class="form-grid-2">
          <div class="form-group">
            <label>Chave Pix de Entrada (Recebimento)</label>
            <input type="text" class="form-input" v-maska data-maska="##.###.###/####-##" value="12.345.678/0001-90" disabled>
          </div>
          <div class="form-group">
            <label>Banco (Recebimento)</label>
            <input type="text" class="form-input" value="Banco ABC S.A." disabled>
          </div>
          <div class="form-group mt-2">
            <label>Chave Pix de Saída (Repasse / Saque)</label>
            <input type="text" class="form-input" v-maska data-maska="##.###.###/####-##" value="12.345.678/0002-00" disabled>
          </div>
          <div class="form-group mt-2">
            <label>Banco (Repasse)</label>
            <input type="text" class="form-input" value="Banco XYZ S.A." disabled>
          </div>
        </div>
        <button class="btn btn-outline-blue mt-4" @click="$emit('toast', 'Modificação de chaves operacionais restrita', 'error')">Alterar Chaves</button>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-body">
        <h3 class="font-bold text-lg mb-4">Parâmetros do Sistema</h3>
        <p class="text-muted text-sm mb-4">Defina regras de compliance e limites globais para novos usuários.</p>
        
        <div class="form-grid-2">
          <div class="form-group">
            <label>Taxa de Saque Padrão (R$)</label>
            <input type="text" class="form-input" value="1,50">
          </div>
          <div class="form-group">
            <label>Taxa Pix In Padrão (%)</label>
            <input type="text" class="form-input" value="0,99">
          </div>
          <div class="form-group">
            <label>Limite de Saque Inicial (R$)</label>
            <input type="text" class="form-input" value="50.000,00">
          </div>
          <div class="form-group">
            <label>Tempo de Expiração do QR Code (min)</label>
            <input type="number" class="form-input" value="60">
          </div>
        </div>
        
        <div class="notification-settings mt-6">
          <label class="notification-switch">
            <div class="switch-info">
              <strong>Manutenção Programada</strong>
              <span class="text-sm text-muted">Exibe um aviso amarelo em todos os painéis e bloqueia webhooks temporariamente.</span>
            </div>
            <input type="checkbox" class="toggle-checkbox">
          </label>
        </div>

        <button class="btn btn-primary mt-4" @click="$emit('toast', 'Parâmetros atualizados com sucesso', 'success')">Salvar Configurações</button>
      </div>
    </div>
  </div>
</template>

<script>
import { vMaska } from "maska/vue";

export default { 
  name: 'AdminConfigView',
  directives: { maska: vMaska }
}
</script>

<style scoped>
.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.form-input { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; outline: none; }
.form-input:disabled { background-color: var(--bg-secondary); color: var(--text-muted); cursor: not-allowed; }

.notification-settings { display: flex; flex-direction: column; gap: 24px; border-top: 1px solid var(--border-color); padding-top: 24px; }
.notification-switch { display: flex; align-items: center; justify-content: space-between; cursor: pointer; }
.switch-info { display: flex; flex-direction: column; gap: 4px; }
.toggle-checkbox { width: 44px; height: 24px; appearance: none; background: var(--border-color); border-radius: 12px; position: relative; cursor: pointer; transition: 0.3s; }
.toggle-checkbox::before { content: ''; position: absolute; width: 20px; height: 20px; border-radius: 50%; background: white; top: 2px; left: 2px; transition: 0.3s; }
.toggle-checkbox:checked { background: var(--accent-red); }
.toggle-checkbox:checked::before { transform: translateX(20px); }

.text-muted { color: var(--text-muted); }
.text-sm { font-size: 0.85rem; }
.font-bold { font-weight: 700; }
.text-lg { font-size: 1.1rem; }
.mb-4 { margin-bottom: 24px; }
.mt-4 { margin-top: 24px; }
.mt-2 { margin-top: 8px; }
.mt-6 { margin-top: 32px; }
</style>
