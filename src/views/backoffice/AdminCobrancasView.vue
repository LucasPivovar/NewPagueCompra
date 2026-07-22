<template>
  <div class="admin-cobrancas">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Cobranças Pix</h2>
        <p>Gerencie as cobranças emitidas pela API e links de pagamento.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-outline-blue" @click="$emit('toast', 'Filtros em desenvolvimento')">Filtros Avançados</button>
      </div>
    </div>
    
    <div class="card mt-4">
      <div class="card-header border-bottom p-4 flex justify-between items-center flex-wrap gap-4">
        <div class="search-bar" style="flex: 1; min-width: 250px;">
          <input type="text" class="form-input" v-model="searchQuery" placeholder="Buscar por Lojista, Pagador ou TxId" style="width: 100%;">
        </div>
        <div class="filter-group flex items-center gap-2">
          <label class="text-sm font-medium text-secondary">Status</label>
          <select class="form-select" v-model="filterStatus">
            <option>Todos</option>
            <option>Paga</option>
            <option>Pendente</option>
            <option>Expirada</option>
          </select>
        </div>
        <div class="filter-group flex items-center gap-2">
          <label class="text-sm font-medium text-secondary">Ordenar por</label>
          <select class="form-select" v-model="sortBy">
            <option>Mais recentes</option>
            <option>Mais antigos</option>
          </select>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table w-full">
          <thead>
            <tr>
              <th>TxId / Chave</th>
              <th>Lojista Emitente</th>
              <th>Pagador</th>
              <th>Valor (R$)</th>
              <th>Status</th>
              <th>Expiração</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cob in filteredCobrancas" :key="cob.id">
              <td><a href="#" class="link-blue font-mono text-sm" @click.prevent="$emit('toast', 'Detalhes da cobrança')">{{ cob.id }}</a></td>
              <td>{{ cob.lojista }}</td>
              <td>
                <div class="flex flex-col">
                  <span>{{ cob.pagadorNome }}</span>
                  <span class="text-xs text-muted">{{ cob.pagadorDoc }}</span>
                </div>
              </td>
              <td class="text-blue">R$ {{ cob.valor }}</td>
              <td>
                <span class="badge" :class="'badge-' + cob.statusClass">{{ cob.status }}</span>
              </td>
              <td class="text-sm text-muted">{{ cob.expiracao }}</td>
              <td>
                <ActionDropdown :actions="cobActions" @action="handleAction($event, cob)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer p-4 border-top flex justify-between items-center">
        <span class="text-sm text-muted">Mostrando 5 de 8.210 cobranças</span>
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
import { Copy, XCircle } from 'lucide-vue-next';
import ActionDropdown from '@/components/ActionDropdown.vue';
import GenericActionModal from '@/components/GenericActionModal.vue';

export default {
  name: 'AdminCobrancasView',
  components: { ActionDropdown, GenericActionModal },
  data() {
    return {
      showActionModal: false,
      actionTitle: '',
      actionDesc: '',
      isDestructive: false,
      requireConfirm: false,
      cobActions: [
        { label: 'Copiar Link', icon: Copy, actionName: 'copy' },
        { label: 'Cancelar', icon: XCircle, actionName: 'cancel', colorClass: 'text-red' }
      ],
      cobrancas: [
        { id: 'txid_a9b8c7d6e5', lojista: 'Loja do João', pagadorNome: 'Maria Silva', pagadorDoc: '***.456.789-**', valor: '1.500,00', status: 'Paga', statusClass: 'success-light', expiracao: '22/07/2026 14:00' },
        { id: 'txid_f1e2d3c4b5', lojista: 'Tech Store', pagadorNome: 'Carlos Almeida', pagadorDoc: '***.123.456-**', valor: '4.200,50', status: 'Pendente', statusClass: 'warning-light', expiracao: '22/07/2026 18:30' },
        { id: 'txid_z9y8x7w6v5', lojista: 'Pague Compra', pagadorNome: 'Ana Souza', pagadorDoc: '***.987.654-**', valor: '350,00', status: 'Paga', statusClass: 'success-light', expiracao: '21/07/2026 10:15' },
        { id: 'txid_m1n2o3p4q5', lojista: 'Mercadinho SP', pagadorNome: 'José Mendes', pagadorDoc: '***.333.444-**', valor: '89,90', status: 'Expirada', statusClass: 'error-light', expiracao: '20/07/2026 09:00' },
        { id: 'txid_r5s6t7u8v9', lojista: 'Tech Store', pagadorNome: 'Fernanda Lima', pagadorDoc: '***.555.666-**', valor: '1.200,00', status: 'Pendente', statusClass: 'warning-light', expiracao: '23/07/2026 23:59' }
      ],
      searchQuery: '',
      filterStatus: 'Todos',
      sortBy: 'Mais recentes'
    }
  },
  computed: {
    filteredCobrancas() {
      let filtered = this.cobrancas;
      if (this.filterStatus !== 'Todos') {
        filtered = filtered.filter(c => c.status === this.filterStatus);
      }
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(c => 
          c.id.toLowerCase().includes(q) ||
          c.lojista.toLowerCase().includes(q) ||
          c.pagadorNome.toLowerCase().includes(q)
        );
      }
      if (this.sortBy === 'Mais antigos') {
        return [...filtered].reverse();
      }
      return filtered;
    }
  },
  methods: {
    handleAction(action, cob) {
      if (action === 'copy') {
        this.$emit('toast', 'Link copiado para a área de transferência!', 'success');
      } else if (action === 'cancel') {
        this.actionTitle = 'Cancelar Cobrança';
        this.actionDesc = `Você está prestes a cancelar a cobrança ${cob.id}. Ela não poderá mais ser paga.`;
        this.isDestructive = true;
        this.requireConfirm = true;
        this.showActionModal = true;
      }
    },
    executeAction() {
      this.$emit('toast', 'Cobrança cancelada com sucesso!', 'success');
    }
  }
}
</script>

<style scoped>
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

.text-blue { color: var(--accent-blue); }
.font-mono { font-family: monospace; }
.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }
.text-lg { font-size: 1.1rem; }
.text-xs { font-size: 0.75rem; }
.p-4 { padding: 24px; }
.border-bottom { border-bottom: 1px solid var(--border-color); }
.border-top { border-top: 1px solid var(--border-color); }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: 8px; }
.cursor-pointer { cursor: pointer; }

.search-bar input {
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  width: 300px;
  outline: none;
}
.search-bar input:focus { border-color: var(--accent-blue); }
</style>
