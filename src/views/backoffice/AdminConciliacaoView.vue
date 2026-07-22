<template>
  <div class="admin-conciliacao">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Conciliação Bancária</h2>
        <p>Monitoramento e repasse de valores para os lojistas.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-outline-blue" @click="$emit('toast', 'Geração de relatório em desenvolvimento')"><Download size="16" /> Relatório D-1</button>
      </div>
    </div>

    <div class="metrics-grid mt-4">
      <div class="metric-card">
        <div class="metric-icon blue"><RefreshCw size="24" /></div>
        <div class="metric-info">
          <h3>24 Lotes</h3>
          <span>Processados Hoje</span>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon green"><CheckCircle size="24" /></div>
        <div class="metric-info">
          <h3>100%</h3>
          <span>Taxa de Sucesso</span>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon yellow"><AlertTriangle size="24" /></div>
        <div class="metric-info">
          <h3>2 Avisos</h3>
          <span>Divergências Manuais</span>
        </div>
      </div>
    </div>
    
    <div class="card mt-4">
      <div class="card-header border-bottom" style="padding: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0;">Lotes de Repasse (Liquidação)</h3>
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <!-- Search -->
          <div style="position: relative; width: 280px;">
            <Search size="14" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);" />
            <input type="text" class="form-input" v-model="searchQuery" placeholder="Buscar por ID do lote..." style="width: 100%; padding-left: 34px; font-size: 0.85rem;" />
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
                    <option>Conciliado</option>
                    <option>Com Divergência</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table w-full">
          <thead>
            <tr>
              <th>ID do Lote</th>
              <th>Data de Processamento</th>
              <th>Volume Bruto (R$)</th>
              <th>Volume Líquido (R$)</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lote in filteredLotes" :key="lote.id">
              <td><span class="font-mono text-sm">{{ lote.id }}</span></td>
              <td>{{ lote.data }}</td>
              <td class="text-muted">R$ {{ lote.bruto }}</td>
              <td class="text-green">R$ {{ lote.liquido }}</td>
              <td>
                <span class="badge" :class="'badge-' + lote.statusClass">{{ lote.status }}</span>
              </td>
              <td class="text-right text-muted">
                <ActionDropdown :actions="loteActions" @action="handleLoteAction($event, lote)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { Download, RefreshCw, CheckCircle, AlertTriangle, Search, SlidersHorizontal, Eye } from 'lucide-vue-next';
import ActionDropdown from '@/components/ActionDropdown.vue';

export default {
  name: 'AdminConciliacaoView',
  components: { Download, RefreshCw, CheckCircle, AlertTriangle, Search, SlidersHorizontal, ActionDropdown },
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
      lotes: [
        { id: 'LOT-20260722-01', data: '22/07/2026 10:00', bruto: '5.200.000,00', liquido: '5.148.000,00', status: 'Conciliado', statusClass: 'success-light' },
        { id: 'LOT-20260721-02', data: '21/07/2026 16:30', bruto: '3.100.500,00', liquido: '3.069.495,00', status: 'Conciliado', statusClass: 'success-light' },
        { id: 'LOT-20260721-01', data: '21/07/2026 10:00', bruto: '4.850.200,00', liquido: '4.801.698,00', status: 'Com Divergência', statusClass: 'warning-light' },
        { id: 'LOT-20260720-02', data: '20/07/2026 16:30', bruto: '2.950.000,00', liquido: '2.920.500,00', status: 'Conciliado', statusClass: 'success-light' }
      ],
      loteActions: [
        { label: 'Ver Detalhes', icon: Eye, actionName: 'view' },
        { label: 'Reprocessar', icon: RefreshCw, actionName: 'reprocess' }
      ],
      searchQuery: '',
      filterStatus: 'Todos',
      showFilterDropdown: false
    }
  },
  computed: {
    activeFiltersCount() {
      return this.filterStatus !== 'Todos' ? 1 : 0;
    },
    filteredLotes() {
      let filtered = this.lotes;
      if (this.filterStatus !== 'Todos') {
        filtered = filtered.filter(l => l.status === this.filterStatus);
      }
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(l => l.id.toLowerCase().includes(q));
      }
      return filtered;
    }
  },
  methods: {
    clearFilters() {
      this.searchQuery = '';
      this.filterStatus = 'Todos';
    },
    closeFilterDropdown() {
      this.showFilterDropdown = false;
    },
    handleLoteAction(action, lote) {
      if (action === 'view') {
        this.$emit('toast', `Detalhes do lote ${lote.id}`, 'info');
      } else if (action === 'reprocess') {
        this.$emit('toast', `Reprocessando lote ${lote.id}...`, 'success');
      }
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

.metric-info h3 { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0 0 4px 0; }
.metric-info span { font-size: 0.85rem; color: var(--text-secondary); font-weight: 500; }

.table-responsive { overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; }
.table th, .table td { padding: 16px 24px; text-align: left; border-bottom: 1px solid var(--border-color); }
.table th { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); font-weight: 600; }
.table td { font-size: 0.9rem; color: var(--text-primary); vertical-align: middle; }
.table tbody tr:hover { background-color: #F8FAFC; }

.badge { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; display: inline-block; }
.badge-success-light { background: #ECFDF5; color: #10B981; border: 1px solid #A7F3D0; }
.badge-warning-light { background: #FFFBEB; color: #D97706; border: 1px solid #FDE68A; }

.text-green { color: var(--accent-green); }
.text-muted { color: var(--text-muted); }
.font-mono { font-family: monospace; }
.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }
.text-lg { font-size: 1.1rem; }
.text-sm { font-size: 0.85rem; }
.p-4 { padding: 24px; }
.border-bottom { border-bottom: 1px solid var(--border-color); }
</style>
