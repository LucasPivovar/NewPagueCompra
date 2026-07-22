<template>
  <div class="admin-logs">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Logs e Auditoria</h2>
        <p>Histórico completo de ações realizadas no Backoffice.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-outline-blue" @click="$emit('toast', 'Filtros em desenvolvimento')">Filtrar por Período</button>
      </div>
    </div>
    
    <div class="card mt-4">
      <div class="card-header border-bottom" style="padding: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0;">Logs do Sistema</h3>
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <!-- Search -->
          <div style="position: relative; width: 280px;">
            <Search size="14" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);" />
            <input type="text" class="form-input" v-model="searchQuery" placeholder="Buscar por usuário ou ação..." style="width: 100%; padding-left: 34px; font-size: 0.85rem;" />
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
                  <label style="font-size: 0.78rem; font-weight: 600; display: block; margin-bottom: 6px; color: var(--text-primary);">Nível</label>
                  <select class="form-select" v-model="filterNivel" style="width: 100%; font-size: 0.85rem; cursor: pointer;">
                    <option>Todos</option>
                    <option>Info</option>
                    <option>Aviso</option>
                    <option>Crítico</option>
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
              <th>Data e Hora</th>
              <th>Usuário</th>
              <th>Ação Realizada</th>
              <th>IP de Origem</th>
              <th>Nível</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in filteredLogs" :key="log.id">
              <td class="text-sm text-muted font-mono">{{ log.data }}</td>
              <td>{{ log.usuario }}</td>
              <td>{{ log.acao }}</td>
              <td class="text-sm font-mono text-muted">{{ log.ip }}</td>
              <td>
                <span class="badge" :class="'badge-' + log.nivelClass">{{ log.nivel }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer p-4 border-top flex justify-between items-center">
        <span class="text-sm text-muted">Mostrando últimos 6 logs (Tempo Real)</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Search, SlidersHorizontal } from 'lucide-vue-next';

export default {
  name: 'AdminLogsView',
  components: { Search, SlidersHorizontal },
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
      logs: [
        { id: 1, data: '22/07/2026 14:32:10', usuario: 'André Cardoso', acao: 'Alterou o status do lote LOT-20260722-01 para "Conciliado"', ip: '189.120.45.10', nivel: 'Info', nivelClass: 'info-light' },
        { id: 2, data: '22/07/2026 14:15:05', usuario: 'Sistema', acao: 'Falha na comunicação com CIP (Bacen)', ip: '127.0.0.1', nivel: 'Crítico', nivelClass: 'error-light' },
        { id: 3, data: '22/07/2026 12:45:00', usuario: 'Mariana Souza', acao: 'Bloqueou o lojista ID 4892 (Suspeita de Fraude)', ip: '177.200.10.5', nivel: 'Aviso', nivelClass: 'warning-light' },
        { id: 4, data: '22/07/2026 10:30:22', usuario: 'Sistema', acao: 'Lote de repasse LOT-20260722-01 gerado automaticamente', ip: '127.0.0.1', nivel: 'Info', nivelClass: 'info-light' },
        { id: 5, data: '22/07/2026 09:10:00', usuario: 'João Pedro', acao: 'Login realizado com sucesso', ip: '201.55.10.22', nivel: 'Info', nivelClass: 'info-light' },
        { id: 6, data: '22/07/2026 09:05:15', usuario: 'João Pedro', acao: 'Falha de login (Senha incorreta)', ip: '201.55.10.22', nivel: 'Aviso', nivelClass: 'warning-light' }
      ],
      searchQuery: '',
      filterNivel: 'Todos',
      showFilterDropdown: false
    }
  },
  computed: {
    activeFiltersCount() {
      return this.filterNivel !== 'Todos' ? 1 : 0;
    },
    filteredLogs() {
      let filtered = this.logs;
      if (this.filterNivel !== 'Todos') {
        filtered = filtered.filter(l => l.nivel === this.filterNivel);
      }
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(l => 
          l.usuario.toLowerCase().includes(q) ||
          l.acao.toLowerCase().includes(q)
      return filtered;
    }
  },
  methods: {
    clearFilters() {
      this.searchQuery = '';
      this.filterNivel = 'Todos';
    },
    closeFilterDropdown() {
      this.showFilterDropdown = false;
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
.badge-info-light { background: #EFF6FF; color: #3B82F6; border: 1px solid #BFDBFE; }
.badge-warning-light { background: #FFFBEB; color: #D97706; border: 1px solid #FDE68A; }
.badge-error-light { background: #FEF2F2; color: #EF4444; border: 1px solid #FECACA; }

.font-mono { font-family: monospace; }
.font-medium { font-weight: 500; }
.text-sm { font-size: 0.85rem; }
.text-muted { color: var(--text-muted); }
.p-4 { padding: 24px; }
.border-bottom { border-bottom: 1px solid var(--border-color); }
.border-top { border-top: 1px solid var(--border-color); }
.flex { display: flex; }
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
