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
      <div class="section-header" style="flex-wrap: wrap; gap: 12px;">
        <div class="card-title">Contas bancárias cadastradas</div>

        <div style="display: flex; gap: 12px; align-items: center; margin-left: auto; flex-wrap: wrap;">
          <!-- Search Input -->
          <div style="position: relative; width: 220px;">
            <Search size="14" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);" />
            <input type="text" class="form-input" v-model="searchBank" placeholder="Buscar conta..." style="width: 100%; padding-left: 34px; font-size: 0.8rem;" />
          </div>

          <!-- Filtros Button -->
          <div style="position: relative;" v-click-outside="closeBankFilter">
            <button class="btn btn-secondary btn-sm" style="display: flex; align-items: center; gap: 6px;" @click.stop="showBankFilter = !showBankFilter">
              <SlidersHorizontal size="14" />
              Filtros
              <span v-if="bankFilterStatus !== 'Todos'" style="background: var(--accent-blue); color: white; border-radius: 50%; width: 16px; height: 16px; font-size: 0.65rem; display: flex; align-items: center; justify-content: center;">1</span>
            </button>
            <!-- Popover -->
            <div v-if="showBankFilter" style="position: absolute; top: calc(100% + 8px); right: 0; width: 220px; z-index: 100; background: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <strong style="font-size: 0.85rem;">Filtros</strong>
                <button style="border: none; background: transparent; color: var(--accent-blue); font-size: 0.75rem; cursor: pointer;" @click="bankFilterStatus = 'Todos'">Limpar</button>
              </div>
              <div>
                <label style="font-size: 0.75rem; font-weight: 600; display: block; margin-bottom: 6px;">Status</label>
                <select class="form-select" v-model="bankFilterStatus" style="font-size: 0.8rem; width: 100%; cursor: pointer;">
                  <option>Todos</option>
                  <option>Principal</option>
                  <option>Secundária</option>
                </select>
              </div>
            </div>
          </div>

          <button class="btn btn-secondary btn-sm" @click="openAddAccount">+ Adicionar conta</button>
        </div>
      </div>

      <div class="bank-accounts-list">
        <div class="bank-card" v-for="account in filteredBankAccounts" :key="account.id">
          <div class="bank-logo" :class="account.logoClass">{{ account.logoText }}</div>
          <div class="bank-info">
            <strong>{{ account.name }}</strong>
            <span>Agência {{ account.agency }} • Conta {{ account.account }}</span>
          </div>
          <div class="bank-actions">
            <span v-if="account.isMain" class="badge badge-success-light">Conta principal</span>
            <ActionDropdown :actions="bankActions" @action="handleBankAction($event, account.id)" />
          </div>
        </div>
        <div v-if="filteredBankAccounts.length === 0" style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          Nenhuma conta encontrada.
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
import { Wallet, Info, ArrowUp, Lock, Clock, ArrowUpRight, ArrowRightLeft, Edit, Trash2, CheckCircle2, Search, SlidersHorizontal } from 'lucide-vue-next';
import AddAccountModal from '@/components/AddAccountModal.vue';
import ActionDropdown from '@/components/ActionDropdown.vue';
import GenericActionModal from '@/components/GenericActionModal.vue';

export default {
  name: 'MerchantWalletView',
  components: { Wallet, Info, ArrowUp, Lock, Clock, ArrowUpRight, ArrowRightLeft, AddAccountModal, ActionDropdown, GenericActionModal, Search, SlidersHorizontal },
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event, el);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  },
  data() {
    return {
      searchBank: '',
      showBankFilter: false,
      bankFilterStatus: 'Todos',
      showAddAccountModal: false,
      editAccountData: null,
      showConfirmModal: false,
      confirmTitle: '',
      confirmDesc: '',
      isDestructive: false,
      bankAccounts: [
        { id: 'bb', name: 'Banco do Brasil S.A.', agency: '1234-5', account: '67890-1', logoClass: 'bb', logoText: 'BB', isMain: true },
        { id: 'itau', name: 'Itaú Unibanco S.A.', agency: '5678', account: '12345-6', logoClass: 'itau', logoText: 'IT', isMain: false },
        { id: 'nubank', name: 'Nu Pagamentos S.A. (NuBank)', agency: '0001', account: '98765432-1', logoClass: 'nubank', logoText: 'NU', isMain: false }
      ],
      bankActions: [
        { label: 'Tornar principal', icon: CheckCircle2, actionName: 'set-main' },
        { label: 'Editar conta', icon: Edit, actionName: 'edit' },
        { label: 'Excluir', icon: Trash2, actionName: 'delete', colorClass: 'text-red' }
      ]
    }
  },
  computed: {
    filteredBankAccounts() {
      let list = this.bankAccounts;
      if (this.searchBank) {
        const q = this.searchBank.toLowerCase();
        list = list.filter(a => a.name.toLowerCase().includes(q) || a.account.includes(q) || a.agency.includes(q));
      }
      if (this.bankFilterStatus === 'Principal') {
        list = list.filter(a => a.isMain);
      } else if (this.bankFilterStatus === 'Secundária') {
        list = list.filter(a => !a.isMain);
      }
      return list;
    }
  },
  methods: {
    openAddAccount() {
      this.editAccountData = null;
      this.showAddAccountModal = true;
    },
    closeBankFilter() {
      this.showBankFilter = false;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
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
.form-input { padding: 8px 12px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.85rem; outline: none; background: white; }
.form-select { padding: 8px 12px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.85rem; outline: none; background: white; }
.btn-secondary { background: white; border: 1px solid var(--border-color); color: var(--text-secondary); }
.btn-sm { padding: 6px 12px; font-size: 0.8rem; }

.section-container { }
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
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
