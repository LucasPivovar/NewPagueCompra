<template>
  <div class="admin-extratos">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Extratos e Relatórios</h2>
        <p>Visão completa das movimentações de todos os clientes.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-outline-blue" @click="$emit('toast', 'Filtros avançados em desenvolvimento')">Filtrar por Lojista</button>
        <button class="btn btn-outline-blue" @click="$emit('toast', 'Exportação em desenvolvimento')"><Download size="16" /> Exportar PDF</button>
      </div>
    </div>
    
    <div class="metrics-grid mt-4">
      <div class="metric-card">
        <div class="metric-icon blue"><Activity size="24" /></div>
        <div class="metric-info">
          <h3>R$ 4.590.320,00</h3>
          <span>Total Movimentado (Hoje)</span>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon green"><Wallet size="24" /></div>
        <div class="metric-info">
          <h3>R$ 1.250.000,00</h3>
          <span>Repasses Liberados</span>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon yellow"><Clock size="24" /></div>
        <div class="metric-info">
          <h3>R$ 840.150,00</h3>
          <span>Saldo Retido Global</span>
        </div>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header border-bottom p-4">
        <h3 class="text-lg">Histórico Global de Repasses</h3>
      </div>
      <div class="card-body filters-row" style="padding: 16px 24px; display: flex; gap: 16px; align-items: center; border-bottom: 1px solid var(--border-color);">
        <div class="search-input-wrapper" style="flex: 1; position: relative; max-width: 400px;">
          <input type="text" class="form-input" style="width: 100%; padding: 8px 12px;" v-model="searchQuery" placeholder="Buscar por ID ou empresa...">
        </div>
        <div class="filter-group" style="display: flex; align-items: center; gap: 8px;">
          <label style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">Status</label>
          <select class="form-select" v-model="filterStatus" style="padding: 8px 12px;">
            <option>Todos</option>
            <option>Concluído</option>
            <option>Em Processamento</option>
            <option>Falhou</option>
          </select>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table w-full">
          <thead>
            <tr>
              <th>ID Transação</th>
              <th>Lojista / Empresa</th>
              <th>Tipo</th>
              <th>Valor (R$)</th>
              <th>Status</th>
              <th>Data e Hora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tx in filteredTransactions" :key="tx.id">
              <td><a href="#" class="link-blue font-mono text-sm" @click.prevent="$emit('toast', 'Detalhes da transação')">{{ tx.id }}</a></td>
              <td>
                <div class="flex items-center gap-2">
                  <div class="avatar-sm">{{ tx.empresa.charAt(0) }}</div>
                  <span>{{ tx.empresa }}</span>
                </div>
              </td>
              <td>{{ tx.tipo }}</td>
              <td :class="tx.tipo === 'Saque' ? 'text-red' : 'text-green'">
                {{ tx.tipo === 'Saque' ? '-' : '+' }} R$ {{ tx.valor }}
              </td>
              <td>
                <span class="badge" :class="'badge-' + tx.statusClass">{{ tx.status }}</span>
              </td>
              <td class="text-sm text-muted">{{ tx.data }}</td>
              <td>
                <ActionDropdown :actions="txActions" @action="handleAction($event, tx)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer p-4 border-top flex justify-between items-center">
        <span class="text-sm text-muted">Mostrando 5 de 14.592 registros</span>
        <div class="pagination flex gap-2">
          <button class="btn btn-outline-blue text-sm" @click="$emit('toast', 'Página anterior')">Anterior</button>
          <button class="btn btn-outline-blue text-sm" @click="$emit('toast', 'Próxima página')">Próxima</button>
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
import { Download, Activity, Wallet, Clock, Eye, XCircle } from 'lucide-vue-next';
import ActionDropdown from '@/components/ActionDropdown.vue';
import GenericActionModal from '@/components/GenericActionModal.vue';

export default {
  name: 'AdminExtratosView',
  components: { Download, Activity, Wallet, Clock, ActionDropdown, GenericActionModal },
  data() {
    return {
      showActionModal: false,
      actionTitle: '',
      actionDesc: '',
      isDestructive: false,
      requireConfirm: false,
      txActions: [
        { label: 'Ver Detalhes', icon: Eye, actionName: 'view' },
        { label: 'Cancelar', icon: XCircle, actionName: 'cancel', colorClass: 'text-red' }
      ],
      transactions: [
        { id: 'TX-8849201', empresa: 'Pague Compra', tipo: 'Recebimento Pix', valor: '1.500,00', status: 'Concluído', statusClass: 'success-light', data: '22/07/2026 14:30' },
        { id: 'TX-8849202', empresa: 'Loja do João', tipo: 'Saque', valor: '5.000,00', status: 'Em Processamento', statusClass: 'warning-light', data: '22/07/2026 14:15' },
        { id: 'TX-8849203', empresa: 'Tech Store', tipo: 'Recebimento Pix', valor: '350,00', status: 'Concluído', statusClass: 'success-light', data: '22/07/2026 14:10' },
        { id: 'TX-8849204', empresa: 'Pague Compra', tipo: 'Estorno', valor: '120,00', status: 'Falhou', statusClass: 'error-light', data: '22/07/2026 13:45' },
        { id: 'TX-8849205', empresa: 'Mercadinho SP', tipo: 'Recebimento Pix', valor: '45,90', status: 'Concluído', statusClass: 'success-light', data: '22/07/2026 13:20' }
      ],
      searchQuery: '',
      filterStatus: 'Todos'
    }
  },
  computed: {
    filteredTransactions() {
      let filtered = this.transactions;
      if (this.filterStatus !== 'Todos') {
        filtered = filtered.filter(t => t.status === this.filterStatus);
      }
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(t => 
          t.id.toLowerCase().includes(q) ||
          t.empresa.toLowerCase().includes(q)
        );
      }
      return filtered;
    }
  },
  methods: {
    handleAction(action, tx) {
      if (action === 'view') {
        this.$emit('toast', 'Detalhes da transação em desenvolvimento', 'info');
      } else if (action === 'cancel') {
        this.actionTitle = 'Cancelar Repasse';
        this.actionDesc = `Você está cancelando a transação ${tx.id}. O valor não será repassado.`;
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
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.metric-card {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow-sm);
}

.metric-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric-icon.blue { background: #E0F2FE; color: #0284C7; }
.metric-icon.green { background: #DCFCE7; color: #16A34A; }
.metric-icon.yellow { background: #FEF3C7; color: #D97706; }

.metric-info h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.metric-info span {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.table-responsive { overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; }
.table th, .table td { padding: 16px 24px; text-align: left; border-bottom: 1px solid var(--border-color); }
.table th { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); font-weight: 600; }
.table td { font-size: 0.9rem; color: var(--text-primary); vertical-align: middle; }
.table tbody tr:hover { background-color: #F8FAFC; }

.badge { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; display: inline-block; }
.badge-success-light { background: #ECFDF5; color: #10B981; border: 1px solid #A7F3D0; }
.badge-warning-light { background: #FFFBEB; color: #D97706; border: 1px solid #FDE68A; }
.badge-error-light { background: #FEF2F2; color: #EF4444; border: 1px solid #FECACA; }

.text-red { color: var(--accent-red); }
.text-green { color: var(--accent-green); }
.font-mono { font-family: monospace; }
.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }
.text-lg { font-size: 1.1rem; }
.p-4 { padding: 24px; }
.border-bottom { border-bottom: 1px solid var(--border-color); }
.border-top { border-top: 1px solid var(--border-color); }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: 8px; }

.avatar-sm {
  width: 28px;
  height: 28px;
  background: var(--accent-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}
</style>
