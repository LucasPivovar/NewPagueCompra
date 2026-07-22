<template>
  <div class="admin-webhooks">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Webhooks</h2>
        <p>Monitoramento de filas, disparos e falhas nos webhooks de clientes.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-outline-blue" @click="$emit('toast', 'Filtros em desenvolvimento')">Filtrar por Lojista</button>
      </div>
    </div>
    
    <div class="metrics-grid mt-4">
      <div class="metric-card">
        <div class="metric-icon green"><CheckCircle size="24" /></div>
        <div class="metric-info">
          <h3>99.98%</h3>
          <span>Taxa de Sucesso (Hoje)</span>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon blue"><Send size="24" /></div>
        <div class="metric-info">
          <h3>14.592</h3>
          <span>Eventos Disparados</span>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon yellow"><Clock size="24" /></div>
        <div class="metric-info">
          <h3>142ms</h3>
          <span>Tempo Médio Resposta</span>
        </div>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header border-bottom" style="padding: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0;">Histórico de Disparos</h3>
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <!-- Search -->
          <div style="position: relative; width: 280px;">
            <Search size="14" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted);" />
            <input type="text" class="form-input" v-model="searchQuery" placeholder="Buscar por ID ou lojista..." style="width: 100%; padding-left: 34px; font-size: 0.85rem;" />
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
                  <label style="font-size: 0.78rem; font-weight: 600; display: block; margin-bottom: 6px; color: var(--text-primary);">Status HTTP</label>
                  <select class="form-select" v-model="filterStatus" style="width: 100%; font-size: 0.85rem; cursor: pointer;">
                    <option>Todos</option>
                    <option>200 OK</option>
                    <option>500 Error</option>
                  </select>
                </div>
                <div>
                  <label style="font-size: 0.78rem; font-weight: 600; display: block; margin-bottom: 6px; color: var(--text-primary);">Evento</label>
                  <select class="form-select" v-model="filterEvento" style="width: 100%; font-size: 0.85rem; cursor: pointer;">
                    <option>Todos</option>
                    <option>charge.paid</option>
                    <option>charge.created</option>
                    <option>charge.expired</option>
                    <option>transfer.completed</option>
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
              <th>ID do Evento</th>
              <th>Lojista</th>
              <th>Tipo de Evento</th>
              <th>Endpoint de Destino</th>
              <th>Status HTTP</th>
              <th>Data e Hora</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="wh in filteredWebhooks" :key="wh.id">
              <td><span class="font-mono text-sm">{{ wh.id }}</span></td>
              <td>{{ wh.lojista }}</td>
              <td>{{ wh.evento }}</td>
              <td><span class="text-xs font-mono text-muted">{{ wh.endpoint }}</span></td>
              <td>
                <span class="badge" :class="'badge-' + wh.statusClass">{{ wh.status }}</span>
              </td>
              <td class="text-sm text-muted">{{ wh.data }}</td>
              <td class="text-right text-muted">
                <ActionDropdown :actions="webhookActions" @action="handleWebhookAction($event, wh)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer p-4 border-top flex justify-between items-center">
        <span class="text-sm text-muted">Mostrando 5 últimos disparos globais</span>
        <div class="pagination flex gap-2">
          <button class="btn btn-outline-blue text-sm" @click="$emit('toast', 'Página anterior')">Anterior</button>
          <button class="btn btn-outline-blue text-sm" @click="$emit('toast', 'Próxima página')">Próxima</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircle, Send, Clock, Search, SlidersHorizontal, RefreshCw, Eye } from 'lucide-vue-next';
import ActionDropdown from '@/components/ActionDropdown.vue';

export default {
  name: 'AdminWebhooksView',
  components: { CheckCircle, Send, Clock, Search, SlidersHorizontal, ActionDropdown },
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
      webhooks: [
        { id: 'EVT-a1b2c3d4', lojista: 'Loja do João', evento: 'charge.paid', endpoint: 'https://loja.com/webhooks/pix', status: '200 OK', statusClass: 'success-light', data: '22/07/2026 14:30:12' },
        { id: 'EVT-e5f6g7h8', lojista: 'Tech Store', evento: 'transfer.completed', endpoint: 'https://api.tech.com/pague-compra', status: '200 OK', statusClass: 'success-light', data: '22/07/2026 14:28:45' },
        { id: 'EVT-i9j0k1l2', lojista: 'Mercadinho SP', evento: 'charge.paid', endpoint: 'https://sys.mercadinho.com/wh', status: '500 Error', statusClass: 'error-light', data: '22/07/2026 14:25:00' },
        { id: 'EVT-m3n4o5p6', lojista: 'Pague Compra', evento: 'charge.expired', endpoint: 'https://pague.com/hooks/in', status: '200 OK', statusClass: 'success-light', data: '22/07/2026 14:20:33' },
        { id: 'EVT-q7r8s9t0', lojista: 'Loja do João', evento: 'charge.created', endpoint: 'https://loja.com/webhooks/pix', status: '200 OK', statusClass: 'success-light', data: '22/07/2026 14:15:10' }
      ],
      webhookActions: [
        { label: 'Re-enviar evento', icon: RefreshCw, actionName: 'resend' },
        { label: 'Ver Payload', icon: Eye, actionName: 'payload' }
      ],
      searchQuery: '',
      filterStatus: 'Todos',
      filterEvento: 'Todos',
      showFilterDropdown: false
    }
  },
  computed: {
    activeFiltersCount() {
      let count = 0;
      if (this.filterStatus !== 'Todos') count++;
      if (this.filterEvento !== 'Todos') count++;
      return count;
    },
    filteredWebhooks() {
      let filtered = this.webhooks;
      if (this.filterStatus !== 'Todos') {
        filtered = filtered.filter(w => w.status === this.filterStatus);
      }
      if (this.filterEvento !== 'Todos') {
        filtered = filtered.filter(w => w.evento === this.filterEvento);
      }
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(w => 
          w.id.toLowerCase().includes(q) ||
          w.lojista.toLowerCase().includes(q)
        );
      }
      return filtered;
    }
  },
  methods: {
    clearFilters() {
      this.searchQuery = '';
      this.filterStatus = 'Todos';
      this.filterEvento = 'Todos';
    },
    closeFilterDropdown() {
      this.showFilterDropdown = false;
    },
    handleWebhookAction(action, wh) {
      if (action === 'resend') {
        this.$emit('toast', `Re-enviando evento ${wh.id}...`, 'success');
      } else if (action === 'payload') {
        this.$emit('toast', `Payload do evento ${wh.id}`, 'info');
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
.badge-error-light { background: #FEF2F2; color: #EF4444; border: 1px solid #FECACA; }

.text-xs { font-size: 0.75rem; }
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
</style>
