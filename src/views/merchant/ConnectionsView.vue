<template>
  <div class="connections-view">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Conexões</h2>
        <p>Gerencie suas credenciais de API e configurações de integração.</p>
      </div>
    </div>

    <!-- Tabs Desktop -->
    <div class="tabs desktop-tabs">
      <div class="tab" :class="{ active: currentTab === 'Produção' }" @click="currentTab = 'Produção'">Produção</div>
      <div class="tab" :class="{ active: currentTab === 'Sandbox' }" @click="currentTab = 'Sandbox'">Sandbox</div>
    </div>

    <!-- Tabs Mobile (Select) -->
    <div class="mobile-tabs mt-4">
      <select class="form-input" v-model="currentTab" style="width: 100%; font-weight: 600;">
        <option value="Produção">Produção</option>
        <option value="Sandbox">Sandbox</option>
      </select>
    </div>

    <div v-if="currentTab === 'Produção'">
      <!-- Credentials Row -->
      <div class="credentials-grid mt-4">
      <div class="cred-card">
        <div class="cred-header">
          <span>Client ID</span> <Info size="14" class="text-muted" />
        </div>
        <div class="cred-value">
          pc_live_8f3d2e7a1c8d4f56 <Copy size="14" class="text-muted" />
        </div>
        <button class="btn-text-blue"><Copy size="14" /> Copiar credencial</button>
      </div>

      <div class="cred-card">
        <div class="cred-header">
          <span>Client Secret</span> <Info size="14" class="text-muted" />
        </div>
        <div class="cred-value">
          •••••••••••••••••••••••••••••••• <Eye size="14" class="text-muted" />
        </div>
        <button class="btn-text-blue"><Copy size="14" /> Copiar credencial</button>
      </div>

      <div class="cred-card">
        <div class="cred-header">
          <span>Token de acesso</span> <Info size="14" class="text-muted" />
        </div>
        <div class="cred-value space-between">
          <span>tok_live_a1b2c3d4e5f6...</span>
          <span class="badge badge-success-light">Ativo</span>
        </div>
        <button class="btn-text-blue"><Copy size="14" /> Copiar credencial</button>
      </div>

      <div class="cred-card min-width">
        <div class="cred-header"><span>Data de criação</span></div>
        <div class="cred-value text-normal">12/05/2025, 14:32</div>
      </div>
      
      <div class="cred-card min-width">
        <div class="cred-header"><span>Último uso</span></div>
        <div class="cred-value text-normal">21/05/2025, 10:23</div>
      </div>

      <div class="cred-card min-width center-content">
        <div class="cred-header"><span>Status</span></div>
        <span class="badge badge-success-light mt-2">Ativo</span>
      </div>
    </div>

    <div class="action-buttons mt-4">
      <button class="btn btn-primary" @click="handleTokenAction('generate')"><RefreshCw size="16" /> Gerar token</button>
      <button class="btn btn-outline-blue" @click="handleTokenAction('renew')"><RefreshCw size="16" /> Renovar token</button>
      <button class="btn btn-outline-red" @click="handleTokenAction('revoke')"><Trash2 size="16" /> Revogar token</button>
    </div>

    <!-- Webhooks Section -->
    <div class="webhooks-container mt-4">
      <div class="webhooks-main card">
        <div class="card-body">
          <h3>Webhooks</h3>
          <p class="text-muted mb-4">Receba notificações em tempo real sobre eventos da sua conta.</p>

          <div class="form-group">
            <label>URL do webhook</label>
            <div class="url-input-row">
              <input type="text" class="form-input" value="https://seusite.com/webhooks/pague-compra">
              <button class="btn btn-outline-blue ml-2">Salvar</button>
            </div>
          </div>

          <label class="mt-4 d-block font-bold">Eventos</label>
          <div class="events-grid mt-2">
            <label class="event-checkbox checked">
              <div class="check-box"><Check size="12" /></div>
              <div class="event-info">
                <strong>PIX criado</strong>
                <span>pix.created</span>
              </div>
            </label>
            <label class="event-checkbox checked">
              <div class="check-box"><Check size="12" /></div>
              <div class="event-info">
                <strong>PIX pago</strong>
                <span>pix.paid</span>
              </div>
            </label>
            <label class="event-checkbox checked">
              <div class="check-box"><Check size="12" /></div>
              <div class="event-info">
                <strong>PIX expirada</strong>
                <span>pix.expired</span>
              </div>
            </label>
            <label class="event-checkbox">
              <div class="check-box empty"></div>
              <div class="event-info">
                <strong>PIX cancelado</strong>
                <span>pix.canceled</span>
              </div>
            </label>
            <label class="event-checkbox checked">
              <div class="check-box"><Check size="12" /></div>
              <div class="event-info">
                <strong>Cobrança criada</strong>
                <span>charge.created</span>
              </div>
            </label>
            <label class="event-checkbox checked">
              <div class="check-box"><Check size="12" /></div>
              <div class="event-info">
                <strong>Cobrança paga</strong>
                <span>charge.paid</span>
              </div>
            </label>
            <label class="event-checkbox">
              <div class="check-box empty"></div>
              <div class="event-info">
                <strong>Cobrança vencida</strong>
                <span>charge.overdue</span>
              </div>
            </label>
            <label class="event-checkbox">
              <div class="check-box empty"></div>
              <div class="event-info">
                <strong>Estorno criado</strong>
                <span>refund.created</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div class="webhooks-test card">
        <div class="card-body">
          <h3>Testar webhook</h3>
          <p class="text-muted mb-4">Envie um evento de teste para a URL configurada.</p>

          <div class="form-group mb-4">
            <label>Selecionar evento</label>
            <div class="select-wrapper">
              <select class="form-select">
                <option>PIX criado (pix.created)</option>
                <option>PIX pago (pix.paid)</option>
              </select>
              <ChevronDown size="16" class="select-icon" />
            </div>
          </div>

          <button class="btn btn-outline-blue btn-block" @click="$emit('toast', 'Evento de teste enviado com sucesso', 'success')"><Send size="16" /> Testar webhook</button>
        </div>
      </div>
    </div>
    </div>
    <div v-if="currentTab === 'Sandbox'">
      <div class="alert alert-warning mt-4 mb-4">
        <Info size="18" />
        <div>
          <strong>Modo Sandbox</strong>
          <p>Utilize estas credenciais apenas para testes. Nenhuma transação real será processada.</p>
        </div>
      </div>
      <!-- Credentials Row -->
      <div class="credentials-grid mt-2">
        <div class="cred-card">
          <div class="cred-header">
            <span>Client ID (Test)</span> <Info size="14" class="text-muted" />
          </div>
          <div class="cred-value">
            pc_test_8f3d2e7a1c8d4f56 <Copy size="14" class="text-muted" />
          </div>
          <button class="btn-text-blue" @click="$emit('toast', 'Copiado para a área de transferência', 'success')"><Copy size="14" /> Copiar credencial</button>
        </div>

        <div class="cred-card">
          <div class="cred-header">
            <span>Client Secret (Test)</span> <Info size="14" class="text-muted" />
          </div>
          <div class="cred-value">
            •••••••••••••••••••••••••••••••• <Eye size="14" class="text-muted" />
          </div>
          <button class="btn-text-blue" @click="$emit('toast', 'Copiado para a área de transferência', 'success')"><Copy size="14" /> Copiar credencial</button>
        </div>

        <div class="cred-card">
          <div class="cred-header">
            <span>Token de acesso (Test)</span> <Info size="14" class="text-muted" />
          </div>
          <div class="cred-value space-between">
            <span>tok_test_a1b2c3d4e5f6...</span>
            <span class="badge badge-warning-light">Ativo</span>
          </div>
          <button class="btn-text-blue" @click="$emit('toast', 'Copiado para a área de transferência', 'success')"><Copy size="14" /> Copiar credencial</button>
        </div>

        <div class="cred-card min-width">
          <div class="cred-header"><span>Data de criação</span></div>
          <div class="cred-value text-normal">12/05/2025, 14:32</div>
        </div>
        
        <div class="cred-card min-width">
          <div class="cred-header"><span>Último uso</span></div>
          <div class="cred-value text-normal">21/05/2025, 10:23</div>
        </div>

        <div class="cred-card min-width center-content">
          <div class="cred-header"><span>Status</span></div>
          <span class="badge badge-warning-light mt-2">Ativo</span>
        </div>
      </div>

      <div class="action-buttons mt-4">
        <button class="btn btn-primary" @click="handleTokenAction('generate')"><RefreshCw size="16" /> Gerar token de teste</button>
        <button class="btn btn-outline-blue" @click="handleTokenAction('renew')"><RefreshCw size="16" /> Renovar token</button>
        <button class="btn btn-outline-red" @click="handleTokenAction('revoke')"><Trash2 size="16" /> Revogar token</button>
      </div>

      <!-- Webhooks Section -->
      <div class="webhooks-container mt-4">
        <div class="webhooks-main card">
          <div class="card-body">
            <h3>Webhooks (Sandbox)</h3>
            <p class="text-muted mb-4">Configure onde você deseja receber eventos de teste.</p>

            <div class="form-group">
              <label>URL do webhook (Testes)</label>
              <div class="url-input-row">
                <input type="text" class="form-input" value="https://seusite.com/webhooks/test/pague-compra">
                <button class="btn btn-outline-blue ml-2" @click="$emit('toast', 'URL salva com sucesso', 'success')">Salvar</button>
              </div>
            </div>

            <label class="mt-4 d-block font-bold">Eventos</label>
            <div class="events-grid mt-2">
              <label class="event-checkbox checked">
                <div class="check-box"><Check size="12" /></div>
                <div class="event-info">
                  <strong>PIX criado</strong>
                  <span>pix.created</span>
                </div>
              </label>
              <label class="event-checkbox checked">
                <div class="check-box"><Check size="12" /></div>
                <div class="event-info">
                  <strong>PIX pago</strong>
                  <span>pix.paid</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <GenericActionModal 
      :show="showActionModal" 
      :title="actionTitle" 
      :description="actionDesc"
      :isDestructive="isDestructive"
      :requireConfirmation="requireConfirm"
      @close="showActionModal = false"
      @confirm="executeAction"
    />
  </div>
</template>

<script>
import { Info, Copy, Eye, RefreshCw, Trash2, Check, ChevronDown, Send } from 'lucide-vue-next';
import GenericActionModal from '@/components/GenericActionModal.vue';

export default {
  name: 'MerchantConnectionsView',
  components: { Info, Copy, Eye, RefreshCw, Trash2, Check, ChevronDown, Send, GenericActionModal },
  data() {
    return {
      currentTab: 'Produção',
      showActionModal: false,
      actionTitle: '',
      actionDesc: '',
      isDestructive: false,
      requireConfirm: false,
      currentAction: null
    }
  },
  methods: {
    handleTokenAction(action) {
      this.currentAction = action;
      if (action === 'generate') {
        this.actionTitle = 'Gerar Novo Token';
        this.actionDesc = 'Ao gerar um novo token, certifique-se de atualizar suas integrações. Deseja continuar?';
        this.isDestructive = false;
        this.requireConfirm = false;
      } else if (action === 'renew') {
        this.actionTitle = 'Renovar Token';
        this.actionDesc = 'O token atual será invalidado em 24h e um novo será gerado. Deseja continuar?';
        this.isDestructive = false;
        this.requireConfirm = false;
      } else if (action === 'revoke') {
        this.actionTitle = 'Revogar Token';
        this.actionDesc = 'CUIDADO: Revogar este token quebrará as integrações ativas imediatamente. Tem certeza?';
        this.isDestructive = true;
        this.requireConfirm = true;
      }
      this.showActionModal = true;
    },
    executeAction() {
      let msg = 'Ação concluída!';
      if (this.currentAction === 'generate') msg = 'Novo token gerado com sucesso!';
      if (this.currentAction === 'renew') msg = 'Token renovado com sucesso!';
      if (this.currentAction === 'revoke') msg = 'Token revogado com sucesso!';
      
      this.$emit('toast', msg, 'success');
    }
  }
}
</script>

<style scoped>
.page-header { margin-bottom: 16px; }
.page-title-group h2 { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.page-title-group p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }

.tabs { display: flex; border-bottom: 1px solid var(--border-color); gap: 24px; }
.tab { padding: 12px 4px; font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; border-bottom: 2px solid transparent; }
.tab.active { color: var(--accent-blue); border-bottom-color: var(--accent-blue); }

.mt-4 { margin-top: 24px; }
.mb-4 { margin-bottom: 24px; }
.mt-2 { margin-top: 8px; }

.credentials-grid { display: flex; gap: 16px; flex-wrap: wrap; }
.cred-card { background: white; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; display: flex; flex-direction: column; flex: 1; min-width: 200px; }
.cred-card.min-width { min-width: 120px; flex: 0.5; }
.cred-header { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 600; color: var(--text-primary); margin-bottom: 12px; }
.text-muted { color: var(--text-muted); }
.cred-value { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-bottom: 12px; }
.cred-value.text-normal { font-weight: 500; color: var(--text-secondary); }
.cred-value.space-between { justify-content: space-between; }
.badge { display: inline-flex; align-items: center; padding: 4px 8px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; }
.badge-success-light { background: #ECFDF5; color: #10B981; border: 1px solid #A7F3D0; }
.center-content { align-items: center; justify-content: center; }

.btn-text-blue { background: transparent; border: none; color: var(--accent-blue); display: flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 600; padding: 0; cursor: pointer; margin-top: auto; }

.action-buttons { display: flex; gap: 12px; }
.btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: var(--radius-md); font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.btn-primary { background: var(--accent-blue); color: white; }
.btn-outline-blue { background: white; border-color: var(--accent-blue-light); color: var(--accent-blue); border: 1px solid #BFDBFE; }
.btn-outline-red { background: white; border-color: #FECACA; color: var(--accent-red); }
.btn-block { width: 100%; justify-content: center; }

.webhooks-container { display: flex; gap: 24px; align-items: flex-start; }
.webhooks-main { flex: 2; }
.webhooks-test { flex: 1; }

.card { background: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
.card-body { padding: 24px; }
.card-body h3 { font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.card-body p { font-size: 0.85rem; }

.form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px; }
.url-input-row { display: flex; align-items: center; }
.form-input { flex: 1; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; outline: none; }
.ml-2 { margin-left: 12px; }
.d-block { display: block; }
.font-bold { font-weight: 600; font-size: 0.85rem; }

.events-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.event-checkbox { display: flex; gap: 10px; padding: 12px; border: 1px solid var(--border-color); border-radius: var(--radius-md); cursor: pointer; background: white; }
.event-checkbox.checked { border-color: var(--accent-blue-light); background: #F8FAFC; }
.check-box { width: 16px; height: 16px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; background: var(--accent-blue); margin-top: 2px; }
.check-box.empty { background: white; border: 1px solid var(--border-color); }
.event-info { display: flex; flex-direction: column; }
.event-info strong { font-size: 0.8rem; color: var(--text-primary); }
.event-info span { font-size: 0.7rem; color: var(--text-muted); }

.select-wrapper { position: relative; }
.form-select { width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; appearance: none; outline: none; background: white; }
.select-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; }

.alert { padding: 16px; border-radius: var(--radius-md); display: flex; align-items: flex-start; gap: 12px; }
.alert-warning { background-color: #FFFBEB; border: 1px solid #FDE68A; color: #92400E; }
.alert-warning p { font-size: 0.85rem; margin-top: 4px; color: #B45309; }
</style>
