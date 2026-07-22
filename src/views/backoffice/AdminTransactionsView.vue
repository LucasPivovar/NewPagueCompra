<template>
  <div class="admin-tx-view">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Transações</h2>
        <p>Monitore todas as movimentações da plataforma em tempo real.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-outline-blue"><Download size="16" /> Exportar XLSX</button>
      </div>
    </div>

    <!-- Tabs Desktop -->
    <div class="tabs desktop-tabs">
      <div class="tab" :class="{ active: currentTab === 'Pix recebidos' }" @click="currentTab = 'Pix recebidos'">Pix recebidos</div>
      <div class="tab" :class="{ active: currentTab === 'Saques solicitados' }" @click="currentTab = 'Saques solicitados'">Saques solicitados</div>
      <div class="tab" :class="{ active: currentTab === 'Estornos' }" @click="currentTab = 'Estornos'">Estornos</div>
      <div class="tab" :class="{ active: currentTab === 'Falhas' }" @click="currentTab = 'Falhas'">Falhas</div>
    </div>

    <!-- Tabs Mobile (Select) -->
    <div class="mobile-tabs mt-4">
      <select class="form-input" v-model="currentTab" style="width: 100%; font-weight: 600;">
        <option value="Pix recebidos">Pix recebidos</option>
        <option value="Saques solicitados">Saques solicitados</option>
        <option value="Estornos">Estornos</option>
        <option value="Falhas">Falhas</option>
      </select>
    </div>

    <div v-if="currentTab === 'Pix recebidos'">
      <!-- Table with Toolbar -->
      <div class="card mt-4">
        <div class="card-header-toolbar" style="padding: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; border-bottom: 1px solid var(--border-color);">
          <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0;">Lista de Transações</h3>
          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            <!-- Search -->
            <div style="position: relative; width: 280px;">
              <Search size="14" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);" />
              <input type="text" class="form-input" v-model="searchQuery" placeholder="Buscar por ID, pagador ou recebedor..." style="width: 100%; padding-left: 34px; font-size: 0.85rem;" />
            </div>
            <!-- Filtros Dropdown -->
            <div style="position: relative;" v-click-outside="closeFilterDropdown">
              <button class="btn btn-outline-blue" style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 8px 14px; font-size: 0.85rem;" @click.stop="showFilterDropdown = !showFilterDropdown">
                <SlidersHorizontal size="15" />
                Filtros
                <span v-if="activeFiltersCount > 0" class="active-badge">{{ activeFiltersCount }}</span>
              </button>
              <div v-if="showFilterDropdown" style="position: absolute; top: calc(100% + 8px); right: 0; width: 260px; z-index: 100; background: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                  <strong style="font-size: 0.9rem;">Filtros</strong>
                  <button style="border: none; background: transparent; color: var(--accent-blue); font-size: 0.8rem; cursor: pointer;" @click="clearFilters">Limpar</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: 14px;">
                  <div>
                    <label style="font-size: 0.78rem; font-weight: 600; display: block; margin-bottom: 6px; color: var(--text-primary);">Status</label>
                    <select class="form-select" v-model="filterStatus" style="width: 100%; font-size: 0.85rem; cursor: pointer;">
                      <option>Todos</option>
                      <option>Aprovado</option>
                      <option>Pendente</option>
                    </select>
                  </div>
                  <div>
                    <label style="font-size: 0.78rem; font-weight: 600; display: block; margin-bottom: 6px; color: var(--text-primary);">Ordenar por</label>
                    <select class="form-select" v-model="sortBy" style="width: 100%; font-size: 0.85rem; cursor: pointer;">
                      <option>Mais recentes</option>
                      <option>Mais antigos</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div class="table-responsive">
        <table class="table hoverable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Pagador</th>
              <th>Recebedor</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tx in paginatedTransactions" :key="tx.id" @click="openDrawer(tx)" class="clickable-row">
              <td class="text-primary">{{ tx.id }}</td>
              <td><span class="badge badge-green-light">Pix</span></td>
              <td>
                <div class="person-info">
                  <strong>{{ tx.payer.name }}</strong>
                  <span>{{ tx.payer.doc }}</span>
                </div>
              </td>
              <td>
                <div class="person-info">
                  <strong>{{ tx.receiver.name }}</strong>
                  <span>{{ tx.receiver.doc }}</span>
                </div>
              </td>
              <td>R$ {{ tx.amount.toFixed(2) }}</td>
              <td>
                <span class="badge" :class="getStatusClass(tx.status)">
                  <span class="status-dot"></span> {{ tx.status }}
                </span>
              </td>
              <td>{{ tx.date }}</td>
              <td class="text-right text-muted">
                <ActionDropdown :actions="txActions" @action="handleAction($event, tx)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-footer" style="padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
        <span class="pagination-info" style="font-size: 0.85rem; color: var(--text-secondary);">Mostrando {{ filteredTransactions.length > 0 ? (currentPage - 1) * pageSize + 1 : 0 }} a {{ Math.min(currentPage * pageSize, filteredTransactions.length) }} de {{ filteredTransactions.length }} registros</span>
        <div class="pagination-controls" style="display: flex; gap: 4px; align-items: center;">
          <button class="page-btn" :disabled="currentPage === 1" @click="prevPage"><ChevronLeft size="16" /></button>
          <button v-for="p in totalPages" :key="p" class="page-btn" :class="{ active: currentPage === p }" @click="goToPage(p)">{{ p }}</button>
          <button class="page-btn" :disabled="currentPage === totalPages || totalPages === 0" @click="nextPage"><ChevronRight size="16" /></button>
        </div>
      </div>
    </div>

    <!-- Drawer: Detalhes da Transação -->
    <div class="drawer-overlay" v-if="drawerOpen" @click.self="drawerOpen = false">
      <div class="drawer">
        <div class="drawer-header">
          <button class="close-btn" @click="drawerOpen = false"><X size="20" /></button>
          <div class="drawer-title-group">
            <h3>{{ selectedTx.id }}</h3>
            <span>Pix recebido em {{ selectedTx.date }}</span>
          </div>
          <div class="drawer-badges mt-2">
            <span class="badge badge-success-light">Aprovado</span>
          </div>
        </div>

        <div class="drawer-body flex-1">
          <h4 class="section-title mb-4">Fluxo da transação</h4>
          
          <div class="transaction-flow">
            <!-- Pagador -->
            <div class="flow-step">
              <div class="flow-icon-wrapper blue"><User size="16" /></div>
              <div class="flow-content">
                <span class="flow-label">Pagador</span>
                <div class="flow-card">
                  <div class="flow-card-header">
                    <strong>{{ selectedTx.payer?.name }}</strong>
                  </div>
                  <div class="flow-card-details">
                    <span>Banco: NuBank</span>
                    <span>CPF: {{ selectedTx.payer?.doc }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Processamento -->
            <div class="flow-step">
              <div class="flow-icon-wrapper purple"><RefreshCw size="16" /></div>
              <div class="flow-content">
                <span class="flow-label">Processamento</span>
                <div class="flow-card">
                  <div class="flow-card-header">
                    <strong>Pague Compra</strong>
                  </div>
                  <div class="flow-card-details">
                    <span class="text-red">Taxa cobrada: R$ 0,99 (0,99%)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recebedor -->
            <div class="flow-step last">
              <div class="flow-icon-wrapper green"><Building2 size="16" /></div>
              <div class="flow-content">
                <span class="flow-label">Recebedor</span>
                <div class="flow-card">
                  <div class="flow-card-header">
                    <strong>{{ selectedTx.receiver?.name }}</strong>
                  </div>
                  <div class="flow-card-details">
                    <span>CNPJ: {{ selectedTx.receiver?.doc }}</span>
                    <span class="text-green font-bold">Valor líquido repassado: R$ {{ (selectedTx.amount - 0.99).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="drawer-footer">
          <button class="btn btn-outline-red"><RotateCcw size="16" /> Solicitar estorno</button>
          <button class="btn btn-primary"><Download size="16" /> Baixar comprovante</button>
        </div>
      </div>
    </div>
    </div>
    <div v-else class="card mt-4">
      <div class="card-body" style="text-align: center; padding: 60px;">
        <h3 style="color: var(--text-primary); margin-bottom: 8px;">Sem dados</h3>
        <p style="color: var(--text-secondary);">Não há informações disponíveis para "{{ currentTab }}" no momento.</p>
        <button class="btn btn-primary mt-4" @click="currentTab = 'Pix recebidos'">Voltar para Pix Recebidos</button>
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
import { Download, Search, X, User, RefreshCw, Building2, RotateCcw, Eye, RotateCcw as RefundIcon, SlidersHorizontal } from 'lucide-vue-next';
import ActionDropdown from '@/components/ActionDropdown.vue';
import GenericActionModal from '@/components/GenericActionModal.vue';

export default {
  name: 'AdminTransactionsView',
  components: { Download, Search, X, User, RefreshCw, Building2, RotateCcw, ActionDropdown, GenericActionModal, SlidersHorizontal },
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event, el)
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  },
  data() {
    return {
      currentTab: 'Pix recebidos',
      drawerOpen: false,
      selectedTx: {},
      showActionModal: false,
      actionTitle: '',
      actionDesc: '',
      isDestructive: false,
      requireConfirm: false,
      txActions: [
        { label: 'Ver Detalhes', icon: Eye, actionName: 'view' },
        { label: 'Estornar', icon: RefundIcon, actionName: 'refund', colorClass: 'text-red' }
      ],
      transactions: [
        { id: 'PIX-8f3d2e7a1c', payer: { name: 'João da Silva', doc: '123.***.***-10' }, receiver: { name: 'Tech Comércio Ltda', doc: '12.345.678/0001-90' }, amount: 100.00, status: 'Aprovado', date: '21/05/2025, 10:23' },
        { id: 'PIX-a1b2c3d4e5', payer: { name: 'Maria Oliveira', doc: '987.***.***-00' }, receiver: { name: 'Loja Exemplo SA', doc: '98.765.432/0001-10' }, amount: 2500.00, status: 'Aprovado', date: '21/05/2025, 09:47' },
        { id: 'PIX-c9d8e7f6a5', payer: { name: 'Carlos Mendes', doc: '456.***.***-22' }, receiver: { name: 'Tech Comércio Ltda', doc: '12.345.678/0001-90' }, amount: 45.50, status: 'Aprovado', date: '21/05/2025, 09:15' },
        { id: 'PIX-b2n3m4k5l6', payer: { name: 'Juliana Costa', doc: '321.***.***-88' }, receiver: { name: 'Serviços ABC Eireli', doc: '11.222.333/0001-44' }, amount: 1200.00, status: 'Pendente', date: '21/05/2025, 08:56' }
      ],
      searchQuery: '',
      filterStatus: 'Todos',
      sortBy: 'Mais recentes',
      showFilterDropdown: false,
      currentPage: 1,
      pageSize: 3,
    }
  },
  computed: {
    activeFiltersCount() {
      let count = 0;
      if (this.filterStatus !== 'Todos') count++;
      if (this.sortBy !== 'Mais recentes') count++;
      return count;
    },
    filteredTransactions() {
      let filtered = this.transactions;
      if (this.filterStatus !== 'Todos') {
        filtered = filtered.filter(t => t.status === this.filterStatus);
      }
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(t => 
          t.id.toLowerCase().includes(q) ||
          t.payer.name.toLowerCase().includes(q) ||
          t.receiver.name.toLowerCase().includes(q)
        );
      }
      if (this.sortBy === 'Mais antigos') {
        return [...filtered].reverse();
      }
      return filtered;
    },
    totalPages() {
      return Math.ceil(this.filteredTransactions.length / this.pageSize) || 1;
    },
    paginatedTransactions() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredTransactions.slice(start, start + this.pageSize);
    }
  },
  methods: {
    clearFilters() {
      this.searchQuery = '';
      this.filterStatus = 'Todos';
      this.sortBy = 'Mais recentes';
      this.currentPage = 1;
    },
    closeFilterDropdown() {
      this.showFilterDropdown = false;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    goToPage(p) {
      this.currentPage = p;
    },
    getStatusClass(status) {
      if (status === 'Aprovado') return 'badge-success-light';
      if (status === 'Pendente') return 'badge-warning-light';
      return '';
    },
    openDrawer(tx) {
      this.selectedTx = tx;
      this.drawerOpen = true;
    },
    handleAction(action, tx) {
      if (action === 'view') {
        this.openDrawer(tx);
      } else if (action === 'refund') {
        this.actionTitle = 'Solicitar Estorno';
        this.actionDesc = `Você está solicitando o estorno da transação ${tx.id} no valor de R$ ${tx.amount.toFixed(2)}. Esta ação não pode ser desfeita.`;
        this.isDestructive = true;
        this.requireConfirm = true;
        this.showActionModal = true;
      }
    },
    executeAction() {
      this.$emit('toast', 'Ação processada com sucesso!', 'success');
    }
  }
}
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; }
.page-title-group h2 { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.page-title-group p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }
.page-header-actions { display: flex; gap: 12px; }

.tabs { display: flex; border-bottom: 1px solid var(--border-color); gap: 24px; }
.tab { padding: 12px 4px; font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; border-bottom: 2px solid transparent; }
.tab.active { color: var(--accent-blue); border-bottom-color: var(--accent-blue); }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: var(--radius-md); font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.btn-primary { background: var(--accent-blue); color: white; }
.btn-outline-blue { background: white; border: 1px solid var(--accent-blue-light); color: var(--accent-blue); border-color: #BFDBFE; }
.btn-outline-red { background: white; border: 1px solid #FECACA; color: var(--accent-red); }

.card { background: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
.mb-4 { margin-bottom: 24px; }
.mt-4 { margin-top: 24px; }
.filters-row { display: flex; align-items: center; gap: 16px; padding: 16px 20px; }
.search-input-wrapper { position: relative; flex: 1; max-width: 400px; }
.search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
.search-input { width: 100%; padding: 10px 14px 10px 40px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.85rem; outline: none; }
.filter-group { display: flex; align-items: center; gap: 8px; }
.filter-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); }
.form-select { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.85rem; outline: none; background: white; min-width: 140px; }

.table-responsive { width: 100%; overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; text-align: left; }
.table th { padding: 16px 20px; border-bottom: 1px solid var(--border-color); font-size: 0.75rem; text-transform: uppercase; font-weight: 600; color: var(--text-muted); background: #F8FAFC; }
.table td { padding: 16px 20px; border-bottom: 1px solid var(--border-color); font-size: 0.85rem; color: var(--text-secondary); }
.hoverable tbody tr:hover { background: var(--bg-primary); cursor: pointer; }
.font-bold { font-weight: 600; }
.text-primary { color: var(--text-primary); }
.text-muted { color: var(--text-muted); }
.text-right { text-align: right; }

.person-info { display: flex; flex-direction: column; gap: 2px; }
.person-info strong { font-size: 0.85rem; color: var(--text-primary); }
.person-info span { font-size: 0.75rem; color: var(--text-muted); }

.badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
.badge-green-light { background: #ECFDF5; color: #059669; }
.badge-success-light { background: #ECFDF5; color: #059669; }
.badge-warning-light { background: #FFFBEB; color: #D97706; }
.status-dot { width: 6px; height: 6px; border-radius: 50%; }
.badge-success-light .status-dot { background: #059669; }
.badge-warning-light .status-dot { background: #D97706; }

/* Drawer */
.drawer-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.4); z-index: 100; display: flex; justify-content: flex-end; }
.drawer { width: 480px; background: white; height: 100%; box-shadow: -4px 0 24px rgba(0,0,0,0.1); display: flex; flex-direction: column; animation: slideIn 0.3s ease-out; }
@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

.drawer-header { padding: 32px 32px 24px 32px; border-bottom: 1px solid var(--border-color); position: relative; }
.close-btn { position: absolute; right: 24px; top: 24px; background: transparent; border: none; color: var(--text-muted); cursor: pointer; }
.drawer-title-group h3 { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.drawer-title-group span { font-size: 0.85rem; color: var(--text-secondary); }
.drawer-badges { display: flex; gap: 8px; }

.drawer-body { padding: 32px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
.section-title { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0; }

.transaction-flow { display: flex; flex-direction: column; position: relative; margin-left: 20px; }
.transaction-flow::before { content: ''; position: absolute; left: 16px; top: 20px; bottom: 40px; width: 2px; background: var(--border-color); z-index: 1; }
.flow-step { display: flex; gap: 20px; position: relative; z-index: 2; margin-bottom: 32px; }
.flow-step.last { margin-bottom: 0; }
.flow-icon-wrapper { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: white; border: 2px solid; flex-shrink: 0; }
.flow-icon-wrapper.blue { border-color: var(--accent-blue); color: var(--accent-blue); }
.flow-icon-wrapper.purple { border-color: #8B5CF6; color: #8B5CF6; }
.flow-icon-wrapper.green { border-color: #10B981; color: #10B981; }
.flow-content { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.flow-label { font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; }

.flow-card { background: white; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; box-shadow: var(--shadow-sm); }
.flow-card-header { margin-bottom: 8px; }
.flow-card-header strong { font-size: 0.95rem; color: var(--text-primary); }
.flow-card-details { display: flex; flex-direction: column; gap: 4px; font-size: 0.8rem; color: var(--text-secondary); }
.text-red { color: var(--accent-red); font-weight: 500; }
.text-green { color: var(--accent-green); }

.drawer-footer { padding: 24px 32px; border-top: 1px solid var(--border-color); display: flex; gap: 12px; background: white; }
.drawer-footer .btn { flex: 1; justify-content: center; }
</style>
