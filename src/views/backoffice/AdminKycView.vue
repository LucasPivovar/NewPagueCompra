<template>
  <div class="admin-kyc-view">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Análises KYC/KYB</h2>
        <p>Revise documentos e aprove novas contas.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-outline-blue"><Settings size="16" /> Configurar regras</button>
      </div>
    </div>

    <!-- Table with Toolbar -->
    <div class="card mt-4">
      <div class="card-header border-bottom" style="padding: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0;">Fila de Análise</h3>
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <!-- Search -->
          <div style="position: relative; width: 280px;">
            <Search size="14" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);" />
            <input type="text" class="form-input" v-model="searchQuery" placeholder="Buscar por cliente ou documento..." style="width: 100%; padding-left: 34px; font-size: 0.85rem;" />
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
                  <label style="font-size: 0.78rem; font-weight: 600; display: block; margin-bottom: 6px; color: var(--text-primary);">Tipo</label>
                  <select class="form-select" v-model="filterType" style="width: 100%; font-size: 0.85rem; cursor: pointer;">
                    <option>Todos</option>
                    <option>PF</option>
                    <option>PJ</option>
                  </select>
                </div>
                <div>
                  <label style="font-size: 0.78rem; font-weight: 600; display: block; margin-bottom: 6px; color: var(--text-primary);">Status</label>
                  <select class="form-select" v-model="filterStatus" style="width: 100%; font-size: 0.85rem; cursor: pointer;">
                    <option>Todos</option>
                    <option>Em análise</option>
                    <option>Aprovado</option>
                  </select>
                </div>
                <div>
                  <label style="font-size: 0.78rem; font-weight: 600; display: block; margin-bottom: 6px; color: var(--text-primary);">Risco</label>
                  <select class="form-select" v-model="filterRisk" style="width: 100%; font-size: 0.85rem; cursor: pointer;">
                    <option>Todos</option>
                    <option>Baixo</option>
                    <option>Médio</option>
                    <option>Alto</option>
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
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Documento</th>
              <th>Risco</th>
              <th>Data de Envio</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredKyc" :key="item.id" @click="openDrawer(item)" class="clickable-row">
              <td class="text-primary">{{ item.client }}</td>
              <td><span class="badge" :class="item.type === 'PJ' ? 'badge-blue' : 'badge-purple'">{{ item.type }}</span></td>
              <td>{{ item.document }}</td>
              <td>
                <span class="badge" :class="getRiskClass(item.risk)">
                  <span class="status-dot"></span> {{ item.risk }}
                </span>
              </td>
              <td>{{ item.date }}</td>
              <td>
                <span class="badge" :class="getStatusClass(item.status)">{{ item.status }}</span>
              </td>
              <td class="text-right text-muted" @click.stop>
                <ActionDropdown :actions="kycActions" @action="handleKycAction($event, item)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Drawer: Revisão de Documentos -->
    <div class="drawer-overlay" v-if="drawerOpen" @click.self="drawerOpen = false">
      <div class="drawer">
        <div class="drawer-header">
          <button class="close-btn" @click="drawerOpen = false"><X size="20" /></button>
          <div class="drawer-title-group">
            <h3>{{ selectedItem.client }}</h3>
            <span>{{ selectedItem.type === 'PJ' ? 'CNPJ' : 'CPF' }}: {{ selectedItem.document }}</span>
          </div>
          <div class="drawer-badges mt-2">
            <span class="badge badge-warning-light">Em análise</span>
            <span class="badge badge-success-light">Risco Baixo</span>
          </div>
        </div>

        <div class="drawer-body flex-1">
          <div class="score-card mb-4">
            <div class="score-circle">
              <div class="score-value text-green">85</div>
            </div>
            <div class="score-info">
              <strong>Score de Confiança</strong>
              <p>Baixo risco de fraude detectado pelos sistemas automatizados.</p>
            </div>
          </div>

          <h4 class="section-title">Documentos enviados</h4>
          
          <div class="doc-review-list mt-3">
            <div class="doc-review-card approved">
              <div class="doc-icon"><FileText size="20" /></div>
              <div class="doc-info">
                <strong>Contrato Social</strong>
                <span class="text-green"><CheckCircle2 size="12" /> Validado automaticamente</span>
              </div>
              <a href="#" class="link-blue text-sm">Visualizar</a>
            </div>

            <div class="doc-review-card pending">
              <div class="doc-icon"><FileText size="20" /></div>
              <div class="doc-info">
                <strong>Comprovante de Endereço</strong>
                <span class="text-amber"><Clock size="12" /> Em análise manual</span>
              </div>
              <a href="#" class="link-blue text-sm">Visualizar</a>
            </div>

            <div class="doc-review-card rejected">
              <div class="doc-icon"><FileText size="20" /></div>
              <div class="doc-info">
                <strong>Documentos dos Sócios</strong>
                <span class="text-red"><AlertCircle size="12" /> Requer atenção</span>
              </div>
              <a href="#" class="link-blue text-sm">Visualizar</a>
            </div>
          </div>

          <div class="form-group mt-4">
            <label>Observações da análise</label>
            <textarea class="form-textarea" rows="4" placeholder="Digite o motivo da rejeição ou observações internas..."></textarea>
          </div>
        </div>

        <div class="drawer-footer">
          <button class="btn btn-outline-red"><XCircle size="16" /> Rejeitar</button>
          <button class="btn btn-outline-amber"><RefreshCcw size="16" /> Solicitar reenvio</button>
          <button class="btn btn-success"><CheckCircle2 size="16" /> Aprovar conta</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Settings, X, FileText, CheckCircle2, Clock, AlertCircle, XCircle, RefreshCcw, Search, SlidersHorizontal, Eye } from 'lucide-vue-next';
import ActionDropdown from '@/components/ActionDropdown.vue';

export default {
  name: 'AdminKYCView',
  components: { Settings, X, FileText, CheckCircle2, Clock, AlertCircle, XCircle, RefreshCcw, Search, SlidersHorizontal, ActionDropdown },
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
      drawerOpen: false,
      selectedItem: {},
      kycList: [
        { id: 1, client: 'Tech Comércio Ltda', type: 'PJ', document: '12.345.678/0001-90', risk: 'Baixo', date: '21/05/2025, 09:30', status: 'Em análise' },
        { id: 2, client: 'João da Silva', type: 'PF', document: '123.456.789-10', risk: 'Alto', date: '21/05/2025, 08:45', status: 'Em análise' },
        { id: 3, client: 'Loja Exemplo SA', type: 'PJ', document: '98.765.432/0001-10', risk: 'Médio', date: '20/05/2025, 16:20', status: 'Em análise' },
        { id: 4, client: 'Maria Oliveira', type: 'PF', document: '987.654.321-00', risk: 'Baixo', date: '20/05/2025, 14:15', status: 'Em análise' }
      ],
      kycActions: [
        { label: 'Analisar Documentos', icon: Eye, actionName: 'analyze' },
        { label: 'Aprovar', icon: CheckCircle2, actionName: 'approve', colorClass: 'text-green' },
        { label: 'Rejeitar', icon: XCircle, actionName: 'reject', colorClass: 'text-red' }
      ],
      searchQuery: '',
      filterType: 'Todos',
      filterStatus: 'Em análise',
      filterRisk: 'Todos',
      showFilterDropdown: false
    }
  },
  computed: {
    activeFiltersCount() {
      let count = 0;
      if (this.filterType !== 'Todos') count++;
      if (this.filterStatus !== 'Em análise') count++;
      if (this.filterRisk !== 'Todos') count++;
      return count;
    },
    filteredKyc() {
      let filtered = this.kycList;
      if (this.filterType !== 'Todos') {
        filtered = filtered.filter(i => i.type === this.filterType);
      }
      if (this.filterStatus !== 'Todos') {
        filtered = filtered.filter(i => i.status === this.filterStatus);
      }
      if (this.filterRisk !== 'Todos') {
        filtered = filtered.filter(i => i.risk === this.filterRisk);
      }
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(i => 
          i.client.toLowerCase().includes(q) ||
          i.document.toLowerCase().includes(q)
        );
      }
      return filtered;
    }
  },
  methods: {
    clearFilters() {
      this.searchQuery = '';
      this.filterType = 'Todos';
      this.filterStatus = 'Em análise';
      this.filterRisk = 'Todos';
    },
    closeFilterDropdown() {
      this.showFilterDropdown = false;
    },
    handleKycAction(action, item) {
      if (action === 'analyze') {
        this.openDrawer(item);
      } else if (action === 'approve') {
        this.$emit('toast', `Conta de ${item.client} aprovada com sucesso!`, 'success');
      } else if (action === 'reject') {
        this.$emit('toast', `Conta de ${item.client} rejeitada.`, 'error');
      }
    },
    getRiskClass(risk) {
      if (risk === 'Baixo') return 'badge-success-light';
      if (risk === 'Médio') return 'badge-warning-light';
      if (risk === 'Alto') return 'badge-danger-light';
      return '';
    },
    getStatusClass(status) {
      if (status === 'Em análise') return 'badge-warning-light';
      return 'badge-gray';
    },
    openDrawer(item) {
      this.selectedItem = item;
      this.drawerOpen = true;
    }
  }
}
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; }
.page-title-group h2 { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.page-title-group p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }
.btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: var(--radius-md); font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.btn-outline-blue { background: white; border: 1px solid var(--accent-blue-light); color: var(--accent-blue); border-color: #BFDBFE; }

.card { background: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
.mb-4 { margin-bottom: 24px; }
.filters-row { display: flex; gap: 16px; padding: 16px 20px; }
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
.text-blue { color: var(--accent-blue); }

.badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
.badge-blue { background: var(--accent-blue-light); color: var(--accent-blue); }
.badge-purple { background: #F3E8FF; color: #8B5CF6; }
.badge-success-light { background: #ECFDF5; color: #059669; }
.badge-warning-light { background: #FFFBEB; color: #D97706; }
.badge-danger-light { background: #FEF2F2; color: #DC2626; }
.badge-gray { background: #F1F5F9; color: #64748B; }
.status-dot { width: 6px; height: 6px; border-radius: 50%; }
.badge-success-light .status-dot { background: #059669; }
.badge-warning-light .status-dot { background: #D97706; }
.badge-danger-light .status-dot { background: #DC2626; }

/* Drawer */
.drawer-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.4); z-index: 100; display: flex; justify-content: flex-end; }
.drawer { width: 480px; background: white; height: 100%; box-shadow: -4px 0 24px rgba(0,0,0,0.1); display: flex; flex-direction: column; animation: slideIn 0.3s ease-out; }
@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

.drawer-header { padding: 32px 32px 24px 32px; border-bottom: 1px solid var(--border-color); position: relative; }
.close-btn { position: absolute; right: 24px; top: 24px; background: transparent; border: none; color: var(--text-muted); cursor: pointer; }
.drawer-title-group h3 { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.drawer-title-group span { font-size: 0.85rem; color: var(--text-secondary); }
.drawer-badges { display: flex; gap: 8px; }

.drawer-body { padding: 32px; overflow-y: auto; display: flex; flex-direction: column; }
.flex-1 { flex: 1; }

.score-card { display: flex; gap: 20px; align-items: center; padding: 20px; border: 1px solid var(--border-color); border-radius: var(--radius-lg); background: #F8FAFC; }
.score-circle { width: 64px; height: 64px; border-radius: 50%; border: 4px solid #10B981; display: flex; align-items: center; justify-content: center; background: white; }
.score-value { font-size: 1.5rem; font-weight: 800; }
.text-green { color: #10B981; }
.score-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.score-info strong { font-size: 1rem; color: var(--text-primary); }
.score-info p { font-size: 0.8rem; color: var(--text-secondary); margin: 0; line-height: 1.4; }

.section-title { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.mt-3 { margin-top: 16px; }

.doc-review-list { display: flex; flex-direction: column; gap: 12px; }
.doc-review-card { display: flex; align-items: center; gap: 16px; padding: 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: white; }
.doc-review-card.approved { border-color: #A7F3D0; background: #F0FDF4; }
.doc-review-card.pending { border-color: #FDE68A; background: #FFFBEB; }
.doc-review-card.rejected { border-color: #FECACA; background: #FEF2F2; }

.doc-icon { width: 40px; height: 40px; border-radius: 8px; background: white; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--text-muted); }
.doc-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.doc-info strong { font-size: 0.9rem; color: var(--text-primary); }
.doc-info span { font-size: 0.75rem; display: flex; align-items: center; gap: 4px; font-weight: 500; }
.text-amber { color: #D97706; }
.text-red { color: #DC2626; }
.link-blue { color: var(--accent-blue); text-decoration: none; font-size: 0.85rem; font-weight: 600; }

.form-group { display: flex; flex-direction: column; }
.form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px; }
.form-textarea { width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.85rem; outline: none; font-family: inherit; resize: vertical; }
.mt-4 { margin-top: 24px; }

.drawer-footer { padding: 24px 32px; border-top: 1px solid var(--border-color); display: flex; gap: 12px; background: white; }
.btn-outline-red { background: white; border: 1px solid #FECACA; color: var(--accent-red); flex: 1; justify-content: center; }
.btn-outline-amber { background: white; border: 1px solid #FDE68A; color: #D97706; flex: 1; justify-content: center; }
.btn-success { background: #10B981; color: white; flex: 1.5; justify-content: center; }
</style>
