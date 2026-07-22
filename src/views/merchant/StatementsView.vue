<template>
  <div class="statements-view">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Extratos</h2>
        <p>Consulte o histórico completo de movimentações da sua conta.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-outline-blue" @click="$emit('toast', 'Exportação em desenvolvimento')">Exportar <ChevronDown size="16" /></button>
        <button class="btn btn-outline-blue" @click="$emit('toast', 'Download CSV em desenvolvimento')"><FileText size="16" /> CSV</button>
        <button class="btn btn-outline-blue" @click="$emit('toast', 'Download PDF em desenvolvimento')"><FileText size="16" /> PDF</button>
      </div>
    </div>

    <!-- Filtros avançados -->
    <div class="card filters-card mb-4">
      <div class="card-header border-none pb-0">
        <h3 class="filters-title">Filtros avançados</h3>
      </div>
      <div class="card-body">
        <div class="filters-grid">
          <div class="form-group">
            <label>Período</label>
            <div class="date-range-input">
              <input type="text" placeholder="01/05/2025">
              <Calendar size="16" class="text-muted" />
              <span class="separator">+</span>
              <input type="text" placeholder="21/05/2025">
              <Calendar size="16" class="text-muted" />
            </div>
          </div>
          <div class="form-group">
            <label>Tipo de movimentação</label>
            <select class="form-select" v-model="filterType">
              <option>Todos</option>
              <option>Cobrança Pix recebida</option>
              <option>Saque para conta bancária</option>
              <option>Tarifa de saque</option>
              <option>Bloqueio de saldo</option>
            </select>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select class="form-select" v-model="filterStatus">
              <option>Todos</option>
              <option>Aprovado</option>
              <option>Concluído</option>
              <option>Pendente</option>
              <option>Bloqueado</option>
            </select>
          </div>
          <div class="form-group">
            <label>Busca geral</label>
            <input type="text" class="form-input" v-model="searchQuery" placeholder="Buscar por descrição ou ID">
          </div>
          <div class="form-group">
            <label>Ordenar por</label>
            <select class="form-select" v-model="sortBy">
              <option>Mais recentes</option>
              <option>Mais antigos</option>
            </select>
          </div>
          <div class="filter-actions">
            <button class="btn btn-text" @click="clearFilters">Limpar filtros</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabela de extratos -->
    <div class="card">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>ID</th>
              <th>Entrada</th>
              <th>Saída</th>
              <th>Saldo</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tx, idx) in filteredStatements" :key="idx">
              <td>{{ tx.date }}</td>
              <td>{{ tx.description }}</td>
              <td><a href="#" class="link-blue">{{ tx.id }}</a></td>
              <td :class="{'text-green': tx.in !== '–'}">{{ tx.in }}</td>
              <td>{{ tx.out }}</td>
              <td>{{ tx.balance }}</td>
              <td>
                <span class="badge" :class="getBadgeClass(tx.status)">
                  <CheckCircle2 size="12" v-if="tx.status === 'Aprovado' || tx.status === 'Concluído'" />
                  <Clock size="12" v-else-if="tx.status === 'Pendente' || tx.status === 'Bloqueado'" />
                  {{ tx.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination-footer">
        <span class="pagination-info">Mostrando 1 a 8 de 120 registros</span>
        <div class="pagination-controls">
          <button class="page-btn"><ChevronLeft size="16" /></button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <span class="page-ellipsis">...</span>
          <button class="page-btn">15</button>
          <button class="page-btn"><ChevronRight size="16" /></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronDown, FileText, Calendar, ChevronLeft, ChevronRight, CheckCircle2, Clock } from 'lucide-vue-next';

export default {
  name: 'MerchantStatementsView',
  components: { ChevronDown, FileText, Calendar, ChevronLeft, ChevronRight, CheckCircle2, Clock },
  data() {
    return {
      searchQuery: '',
      filterType: 'Todos',
      filterStatus: 'Todos',
      sortBy: 'Mais recentes',
      statements: [
        { date: '21/05/2025, 10:23', description: 'Cobrança Pix recebida', id: 'PIX-8f3d2e7a1c', in: 'R$ 250,00', out: '–', balance: 'R$ 48.750,32', status: 'Aprovado' },
        { date: '21/05/2025, 09:47', description: 'Saque para conta bancária', id: 'SAC-a91b3c4d5e', in: '–', out: 'R$ 2.500,00', balance: 'R$ 48.500,32', status: 'Concluído' },
        { date: '21/05/2025, 09:15', description: 'Cobrança Pix recebida', id: 'PIX-d4c6b2a9e7', in: 'R$ 1.480,00', out: '–', balance: 'R$ 51.000,32', status: 'Aprovado' },
        { date: '21/05/2025, 08:56', description: 'Tarifa de saque', id: 'TAR-7f6e5d4c3b', in: '–', out: 'R$ 6,50', balance: 'R$ 49.520,32', status: 'Concluído' },
        { date: '21/05/2025, 08:34', description: 'Cobrança Pix recebida', id: 'PIX-e98f1a7b2d', in: 'R$ 180,00', out: '–', balance: 'R$ 49.526,82', status: 'Aprovado' },
        { date: '21/05/2025, 07:42', description: 'Bloqueio de saldo', id: 'BLO-6a5b4c3d2e', in: '–', out: 'R$ 500,00', balance: 'R$ 49.346,82', status: 'Bloqueado' },
        { date: '20/05/2025, 22:11', description: 'Cobrança Pix recebida', id: 'PIX-b1a2c3d4e5', in: 'R$ 520,00', out: '–', balance: 'R$ 49.846,82', status: 'Aprovado' },
        { date: '20/05/2025, 18:35', description: 'Saque para conta bancária', id: 'SAC-5e4d3c2b1a', in: '–', out: 'R$ 1.000,00', balance: 'R$ 49.326,82', status: 'Concluído' }
      ]
    }
  },
  computed: {
    filteredStatements() {
      let filtered = this.statements;
      
      if (this.filterType !== 'Todos') {
        filtered = filtered.filter(t => t.description === this.filterType);
      }
      
      if (this.filterStatus !== 'Todos') {
        filtered = filtered.filter(t => t.status === this.filterStatus);
      }
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(t => 
          t.description.toLowerCase().includes(query) || 
          t.id.toLowerCase().includes(query)
        );
      }
      
      if (this.sortBy === 'Mais recentes') {
        // Mock sorting since dates are formatted strings, in a real scenario parse Date
        return filtered; 
      } else if (this.sortBy === 'Mais antigos') {
        return [...filtered].reverse();
      }
      
      return filtered;
    }
  },
  methods: {
    getBadgeClass(status) {
      if (status === 'Aprovado' || status === 'Concluído') return 'badge-success';
      if (status === 'Bloqueado' || status === 'Pendente') return 'badge-warning';
      return '';
    },
    clearFilters() {
      this.searchQuery = '';
      this.filterType = 'Todos';
      this.filterStatus = 'Todos';
      this.sortBy = 'Mais recentes';
    }
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
}
.page-title-group h2 { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.page-title-group p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }
.page-header-actions { display: flex; gap: 12px; }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: var(--radius-md); font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.btn-outline-blue { background: transparent; border: 1px solid var(--accent-blue-light); color: var(--accent-blue); border-color: #BFDBFE; }
.btn-text { background: transparent; color: var(--text-secondary); border: none; font-size: 0.85rem; padding: 0; }
.btn-text:hover { color: var(--text-primary); }

.card { background: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
.mb-4 { margin-bottom: 24px; }
.pb-0 { padding-bottom: 0; }
.border-none { border-bottom: none; }
.filters-title { font-size: 1rem; font-weight: 700; color: var(--text-primary); padding: 20px 20px 0 20px; margin: 0; }
.card-body { padding: 20px; }

.filters-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  align-items: end;
}
.form-group { display: flex; flex-direction: column; }
.form-group label { font-size: 0.8rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px; }
.filters-grid > div:nth-child(1) { grid-column: span 2; }
.filters-grid > div:nth-child(2) { grid-column: span 1; }
.filters-grid > div:nth-child(3) { grid-column: span 1; }
.filters-grid > div:nth-child(4) { grid-column: span 2; }
.filters-grid > div:nth-child(5) { grid-column: span 2; }
.filter-actions { grid-column: span 4; display: flex; justify-content: flex-end; padding-bottom: 12px; }

.form-input, .form-select { width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.85rem; outline: none; }

.date-range-input { display: flex; align-items: center; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0 14px; background: white; }
.date-range-input input { border: none; padding: 10px 0; outline: none; width: 100px; font-size: 0.85rem; }
.text-muted { color: var(--text-muted); }
.separator { margin: 0 12px; color: var(--text-muted); }

.table-responsive { width: 100%; overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; text-align: left; }
.table th { padding: 16px 20px; border-bottom: 1px solid var(--border-color); font-size: 0.75rem; text-transform: uppercase; font-weight: 600; color: var(--text-muted); background: #F8FAFC; }
.table td { padding: 16px 20px; border-bottom: 1px solid var(--border-color); font-size: 0.85rem; color: var(--text-secondary); }
.font-bold { font-weight: 600; color: var(--text-primary); }
.text-green { color: var(--accent-green); }
.link-blue { color: var(--accent-blue); text-decoration: none; font-weight: 500; }

.badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
.badge-success { background: #ECFDF5; color: #059669; }
.badge-warning { background: #FFFBEB; color: #D97706; }

.pagination-footer { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; }
.pagination-info { font-size: 0.85rem; color: var(--text-secondary); }
.pagination-controls { display: flex; gap: 4px; align-items: center; }
.page-btn { min-width: 32px; height: 32px; border: 1px solid var(--border-color); background: white; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; color: var(--text-secondary); cursor: pointer; }
.page-btn.active { background: var(--accent-blue); color: white; border-color: var(--accent-blue); }
.page-ellipsis { margin: 0 4px; color: var(--text-muted); }
</style>
