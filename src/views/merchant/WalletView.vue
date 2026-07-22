<template>
  <div class="wallet-view">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Minha Carteira</h2>
        <p>Acompanhe seus saldos, saques e contas bancárias.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" @click="$emit('open-withdraw-modal')">
          Solicitar saque <ArrowRightLeft size="16" />
        </button>
      </div>
    </div>

    <!-- KPIs -->
    <div class="kpi-grid">
      <!-- Card 1 -->
      <div class="kpi-card">
        <div class="kpi-icon-wrapper blue">
          <Wallet size="20" />
        </div>
        <div class="kpi-content">
          <div class="kpi-label">Saldo disponível <Info size="14" class="info-icon" /></div>
          <div class="kpi-value">R$ 48.750,32</div>
          <div class="kpi-trend positive"><ArrowUp size="12" /> 12,5% <span class="trend-text">em relação a ontem</span></div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="kpi-card">
        <div class="kpi-icon-wrapper red">
          <Lock size="20" />
        </div>
        <div class="kpi-content">
          <div class="kpi-label">Saldo bloqueado <Info size="14" class="info-icon" /></div>
          <div class="kpi-value">R$ 5.320,10</div>
          <div class="kpi-trend text-muted text-sm">Valores reservados para saques e chargebacks</div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="kpi-card">
        <div class="kpi-icon-wrapper green">
          <Clock size="20" />
        </div>
        <div class="kpi-content">
          <div class="kpi-label">Saldo a receber (D+1) <Info size="14" class="info-icon" /></div>
          <div class="kpi-value">R$ 16.240,80</div>
          <div class="kpi-trend positive"><ArrowUp size="12" /> 8,3% <span class="trend-text">em relação a ontem</span></div>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="kpi-card">
        <div class="kpi-icon-wrapper blue">
          <ArrowUpRight size="20" />
        </div>
        <div class="kpi-content">
          <div class="kpi-label">Total sacado <Info size="14" class="info-icon" /></div>
          <div class="kpi-value">R$ 124.560,78</div>
          <div class="kpi-trend positive"><ArrowUp size="12" /> 15,7% <span class="trend-text">em relação ao mês anterior</span></div>
        </div>
      </div>
    </div>

    <!-- Contas Bancárias -->
    <div class="section-container mt-4">
      <div class="section-header">
        <div>
          <div class="card-title">Contas bancárias cadastradas</div>
        </div>
        <button class="btn btn-secondary btn-sm" @click="openAddAccount">+ Adicionar conta</button>
      </div>

      <div class="bank-accounts-list">
        <div class="bank-card">
          <div class="bank-logo bb">BB</div>
          <div class="bank-info">
            <strong>Banco do Brasil S.A.</strong>
            <span>Agência 1234-5 • Conta 67890-1</span>
          </div>
          <div class="bank-actions">
            <span class="badge badge-success-light">Conta principal</span>
            <ActionDropdown :actions="bankActions" @action="handleBankAction($event, 'bb')" />
          </div>
        </div>

        <div class="bank-card">
          <div class="bank-logo itau">IT</div>
          <div class="bank-info">
            <strong>Itaú Unibanco S.A.</strong>
            <span>Agência 5678 • Conta 12345-6</span>
          </div>
          <div class="bank-actions">
            <ActionDropdown :actions="bankActions" @action="handleBankAction($event, 'itau')" />
          </div>
        </div>

        <div class="bank-card">
          <div class="bank-logo nubank">NU</div>
          <div class="bank-info">
            <strong>Nu Pagamentos S.A. (NuBank)</strong>
            <span>Agência 0001 • Conta 98765432-1</span>
          </div>
          <div class="bank-actions">
            <ActionDropdown :actions="bankActions" @action="handleBankAction($event, 'nubank')" />
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <AddAccountModal 
      :show="showAddAccountModal" 
      :initialData="editAccountData"
      @close="showAddAccountModal = false; editAccountData = null" 
      @toast="$emit('toast', $event, arguments[1])"
    />
    <GenericActionModal 
      :show="showConfirmModal" 
      :title="confirmTitle"
      :description="confirmDesc"
      :isDestructive="isDestructive"
      @close="showConfirmModal = false"
      @confirm="executeConfirm"
    />
  </div>
</template>

<script>
import { Wallet, Info, ArrowUp, Lock, Clock, ArrowUpRight, ArrowRightLeft, Edit, Trash2, CheckCircle2 } from 'lucide-vue-next';
import AddAccountModal from '@/components/AddAccountModal.vue';
import ActionDropdown from '@/components/ActionDropdown.vue';
import GenericActionModal from '@/components/GenericActionModal.vue';

export default {
  name: 'MerchantWalletView',
  components: { Wallet, Info, ArrowUp, Lock, Clock, ArrowUpRight, ArrowRightLeft, AddAccountModal, ActionDropdown, GenericActionModal },
  data() {
    return {
      showAddAccountModal: false,
      editAccountData: null,
      showConfirmModal: false,
      confirmTitle: '',
      confirmDesc: '',
      isDestructive: false,
      bankActions: [
        { label: 'Tornar principal', icon: CheckCircle2, actionName: 'set-main' },
        { label: 'Editar conta', icon: Edit, actionName: 'edit' },
        { label: 'Excluir', icon: Trash2, actionName: 'delete', colorClass: 'text-red' }
      ]
    }
  },
  methods: {
    openAddAccount() {
      this.editAccountData = null;
      this.showAddAccountModal = true;
    },
    handleBankAction(action, accountId) {
      if (action === 'set-main') {
        this.$emit('toast', 'Conta definida como principal com sucesso!', 'success');
      } else if (action === 'edit') {
        this.editAccountData = { id: accountId };
        this.showAddAccountModal = true;
      } else if (action === 'delete') {
        this.confirmTitle = 'Excluir conta bancária';
        this.confirmDesc = `Tem certeza que deseja excluir esta conta bancária (${accountId})? Essa ação não pode ser desfeita.`;
        this.isDestructive = true;
        this.showConfirmModal = true;
      }
    },
    executeConfirm() {
      this.$emit('toast', 'Conta excluída com sucesso!', 'success');
    }
  }
}
</script>

<style scoped>
.wallet-view {
  display: flex;
  flex-direction: column;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
}
.page-title-group h2 { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.page-title-group p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }
.page-header-actions { display: flex; gap: 12px; }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
}
.btn-primary { background: var(--accent-blue); color: white; }
.btn-outline-blue { background: transparent; border: 1px solid var(--accent-blue); color: var(--accent-blue); }

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}
.kpi-card {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  gap: 16px;
  box-shadow: var(--shadow-sm);
}
.kpi-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.kpi-icon-wrapper.blue { background: var(--accent-blue-light); color: var(--accent-blue); }
.kpi-icon-wrapper.green { background: #ECFDF5; color: #10B981; }
.kpi-icon-wrapper.red { background: #FEF2F2; color: #EF4444; }

.kpi-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.kpi-label { font-size: 0.85rem; color: var(--text-secondary); font-weight: 600; display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.info-icon { color: var(--text-muted); }
.kpi-value { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.kpi-trend { font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 4px; }
.kpi-trend.positive { color: var(--accent-green); }
.trend-text { color: var(--text-muted); font-weight: 500; }
.text-muted { color: var(--text-muted); }
.text-sm { font-size: 0.75rem; font-weight: 500; }

.mt-4 { margin-top: 24px; }
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.section-header h3 { font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.section-header p { font-size: 0.85rem; }

.bank-accounts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.bank-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}
.bank-logo {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  margin-right: 16px;
}
.bank-logo.bb { background: #FCE700; color: #003087; }
.bank-logo.itau { background: #EC7000; color: white; }
.bank-logo.nubank { background: #8A05BE; color: white; }

.bank-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.bank-info strong { font-size: 0.95rem; color: var(--text-primary); }
.bank-info span { font-size: 0.85rem; color: var(--text-secondary); }

.bank-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
.badge { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
.badge-success-light { background: #ECFDF5; color: #10B981; border: 1px solid #A7F3D0; }

.icon-btn-plain { background: transparent; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; }
</style>
