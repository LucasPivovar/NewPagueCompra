<template>
  <div class="admin-clients-view">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Clientes & Sellers</h2>
        <p>Gerencie os lojistas e monitore o status das contas.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" @click="showAddModal = true">Adicionar Cliente <Plus size="16" /></button>
      </div>
    </div>

    <!-- Filters -->
    <div class="card mb-4">
      <div class="card-body filters-row">
        <div class="search-input-wrapper">
          <Search size="16" class="search-icon" />
          <input type="text" class="form-input search-input" v-model="searchQuery" placeholder="Buscar por nome, email ou documento...">
        </div>
        <div class="filter-group">
          <label>Status</label>
          <select class="form-select" v-model="filterStatus">
            <option>Todos</option>
            <option>Ativo</option>
            <option>Pendente</option>
            <option>Bloqueado</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Tipo</label>
          <select class="form-select" v-model="filterType">
            <option>Todos</option>
            <option>PF</option>
            <option>PJ</option>
          </select>
        </div>
        <button class="btn btn-outline-blue ml-auto"><Download size="16" /> Exportar</button>
      </div>
    </div>

    <!-- Table -->
    <div class="card">
      <div class="table-responsive">
        <table class="table hoverable">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Documento</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Data de Cadastro</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in filteredClients" :key="client.id" @click="openDrawer(client)" class="clickable-row">
              <td class="text-primary">{{ client.name }}</td>
              <td>{{ client.email }}</td>
              <td>{{ client.document }}</td>
              <td>
                <span class="badge" :class="client.type === 'PJ' ? 'badge-blue' : 'badge-purple'">{{ client.type }}</span>
              </td>
              <td>
                <span class="badge" :class="getStatusClass(client.status)">
                  <span class="status-dot"></span> {{ client.status }}
                </span>
              </td>
              <td>{{ client.date }}</td>
              <td class="text-right text-muted">
                <ActionDropdown :actions="clientActions" @action="handleAction($event, client)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-footer">
        <span class="pagination-info">Mostrando 1 a 10 de 1.842 registros</span>
        <div class="pagination-controls">
          <button class="page-btn"><ChevronLeft size="16" /></button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <span class="page-ellipsis">...</span>
          <button class="page-btn">185</button>
          <button class="page-btn"><ChevronRight size="16" /></button>
        </div>
      </div>
    </div>

    <!-- Client Drawer overlay -->
    <div class="drawer-overlay" v-if="drawerOpen" @click.self="drawerOpen = false">
      <div class="drawer">
        <div class="drawer-header">
          <button class="close-btn" @click="drawerOpen = false"><X size="20" /></button>
          <div class="drawer-title-group">
            <h3>{{ selectedClient.name }}</h3>
            <span>{{ selectedClient.type === 'PJ' ? 'CNPJ' : 'CPF' }}: {{ selectedClient.document }}</span>
          </div>
          <div class="drawer-badges mt-2">
            <span class="badge badge-success-light">Ativo</span>
            <span class="badge badge-blue">{{ selectedClient.type }}</span>
          </div>
        </div>

        <div class="drawer-actions">
          <button class="btn btn-outline-blue flex-1"><Key size="16" /> Resetar senha</button>
          <button class="btn btn-outline-red flex-1"><Lock size="16" /> Bloquear conta</button>
        </div>

        <div class="drawer-tabs">
          <div class="drawer-tab" :class="{ active: currentTab === 'Informações' }" @click="currentTab = 'Informações'">Informações</div>
          <div class="drawer-tab" :class="{ active: currentTab === 'Documentos' }" @click="currentTab = 'Documentos'">Documentos (KYB)</div>
          <div class="drawer-tab" :class="{ active: currentTab === 'Taxas' }" @click="currentTab = 'Taxas'">Taxas</div>
          <div class="drawer-tab" :class="{ active: currentTab === 'Transações' }" @click="currentTab = 'Transações'">Transações</div>
        </div>

        <div class="drawer-body">
          <div v-if="currentTab === 'Informações'">
            <div class="info-section">
              <h4>Dados de contato</h4>
              <div class="info-grid">
                <div class="info-item">
                  <span>E-mail</span>
                  <strong>{{ selectedClient.email }}</strong>
                </div>
                <div class="info-item">
                  <span>Telefone</span>
                  <strong>(11) 98765-4321</strong>
                </div>
                <div class="info-item">
                  <span>Responsável</span>
                  <strong>Carlos Souza</strong>
                </div>
              </div>
            </div>

            <div class="info-section mt-4">
              <h4>Endereço</h4>
              <div class="info-item full">
                <strong>Rua das Indústrias, 1000 - Galpão 3<br>Distrito Industrial, São Paulo - SP<br>CEP: 01234-567</strong>
              </div>
            </div>

            <div class="info-section mt-4">
              <div class="section-header-flex">
                <h4>Limites atuais</h4>
                <a href="#" class="link-blue text-sm">Editar limites</a>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <span>Limite diário Pix</span>
                  <strong class="text-primary font-bold text-lg">R$ 50.000,00</strong>
                </div>
                <div class="info-item">
                  <span>Limite de saque</span>
                  <strong class="text-primary font-bold text-lg">R$ 10.000,00</strong>
                </div>
              </div>
            </div>
          </div>
          <div v-else style="text-align: center; padding: 40px 20px;">
            <h4 style="color: var(--text-primary);">Aba {{ currentTab }}</h4>
            <p style="color: var(--text-secondary); font-size: 0.85rem;">O conteúdo desta aba estará disponível em breve.</p>
          </div>
        </div>
      </div>
    </div>
    <AddUserModal :show="showAddModal" :isClient="true" :initialData="editClientData" @close="showAddModal = false; editClientData = null" @toast="(m,t) => $emit('toast', m, t)" />
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
import { Plus, Search, Download, ChevronLeft, ChevronRight, X, Key, Lock, Edit, Trash2 } from 'lucide-vue-next';
import AddUserModal from '@/components/AddUserModal.vue';
import ActionDropdown from '@/components/ActionDropdown.vue';
import GenericActionModal from '@/components/GenericActionModal.vue';

export default {
  name: 'AdminClientsView',
  components: { Plus, Search, Download, ChevronLeft, ChevronRight, X, Key, Lock, AddUserModal, ActionDropdown, GenericActionModal },
  data() {
    return {
      currentTab: 'Informações',
      drawerOpen: false,
      selectedClient: {},
      showAddModal: false,
      editClientData: null,
      showActionModal: false,
      actionTitle: '',
      actionDesc: '',
      isDestructive: false,
      requireConfirm: false,
      clientActions: [
        { label: 'Editar Cliente', icon: Edit, actionName: 'edit' },
        { label: 'Excluir', icon: Trash2, actionName: 'delete', colorClass: 'text-red' }
      ],
      clients: [
        { id: 1, name: 'Tech Comércio Ltda', email: 'contato@techcomercio.com.br', document: '12.345.678/0001-90', type: 'PJ', status: 'Ativo', date: '10/05/2025' },
        { id: 2, name: 'João da Silva', email: 'joao.silva@email.com', document: '123.456.789-10', type: 'PF', status: 'Ativo', date: '12/05/2025' },
        { id: 3, name: 'Loja Exemplo SA', email: 'financeiro@lojaexemplo.com.br', document: '98.765.432/0001-10', type: 'PJ', status: 'Pendente', date: '20/05/2025' },
        { id: 4, name: 'Maria Oliveira', email: 'maria.oliveira@email.com', document: '987.654.321-00', type: 'PF', status: 'Bloqueado', date: '15/04/2025' },
        { id: 5, name: 'Serviços ABC Eireli', email: 'atendimento@servicosabc.com.br', document: '11.222.333/0001-44', type: 'PJ', status: 'Ativo', date: '01/05/2025' }
      ],
      searchQuery: '',
      filterStatus: 'Todos',
      filterType: 'Todos'
    }
  },
  computed: {
    filteredClients() {
      let filtered = this.clients;
      if (this.filterStatus !== 'Todos') {
        filtered = filtered.filter(c => c.status === this.filterStatus);
      }
      if (this.filterType !== 'Todos') {
        filtered = filtered.filter(c => c.type === this.filterType);
      }
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(c => 
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.document.toLowerCase().includes(q)
        );
      }
      return filtered;
    }
  },
  methods: {
    getStatusClass(status) {
      if (status === 'Ativo') return 'badge-success-light';
      if (status === 'Pendente') return 'badge-warning-light';
      if (status === 'Bloqueado') return 'badge-danger-light';
      return '';
    },
    openDrawer(client) {
      this.selectedClient = client;
      this.drawerOpen = true;
    },
    handleAction(action, client) {
      if (action === 'edit') {
        this.editClientData = client;
        this.showAddModal = true;
      } else if (action === 'delete') {
        this.actionTitle = 'Excluir Cliente';
        this.actionDesc = `Tem certeza que deseja excluir o cliente ${client.name}? Esta ação não pode ser desfeita.`;
        this.isDestructive = true;
        this.requireConfirm = true;
        this.showActionModal = true;
      }
    },
    executeAction() {
      this.$emit('toast', 'Ação concluída com sucesso!', 'success');
    }
  }
}
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; }
.page-title-group h2 { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.page-title-group p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }
.page-header-actions { display: flex; gap: 12px; }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: var(--radius-md); font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.btn-primary { background: var(--accent-blue); color: white; }
.btn-outline-blue { background: white; border: 1px solid var(--accent-blue-light); color: var(--accent-blue); border-color: #BFDBFE; }
.btn-outline-red { background: white; border-color: #FECACA; color: var(--accent-red); }

.card { background: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
.mb-4 { margin-bottom: 24px; }

.filters-row { display: flex; align-items: center; gap: 16px; padding: 16px 20px; }
.search-input-wrapper { position: relative; flex: 1; max-width: 400px; }
.search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
.search-input { width: 100%; padding: 10px 14px 10px 40px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.85rem; outline: none; }
.filter-group { display: flex; align-items: center; gap: 8px; }
.filter-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); }
.form-select { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.85rem; outline: none; background: white; min-width: 120px; }
.ml-auto { margin-left: auto; }

.table-responsive { width: 100%; overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; text-align: left; }
.table th { padding: 16px 20px; border-bottom: 1px solid var(--border-color); font-size: 0.75rem; text-transform: uppercase; font-weight: 600; color: var(--text-muted); background: #F8FAFC; }
.table td { padding: 16px 20px; border-bottom: 1px solid var(--border-color); font-size: 0.85rem; color: var(--text-secondary); }
.hoverable tbody tr:hover { background: var(--bg-primary); cursor: pointer; }
.font-bold { font-weight: 600; }
.text-primary { color: var(--text-primary); }
.text-muted { color: var(--text-muted); }
.text-right { text-align: right; }

.badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
.badge-blue { background: var(--accent-blue-light); color: var(--accent-blue); }
.badge-purple { background: #F3E8FF; color: #8B5CF6; }
.badge-success-light { background: #ECFDF5; color: #059669; }
.badge-warning-light { background: #FFFBEB; color: #D97706; }
.badge-danger-light { background: #FEF2F2; color: #DC2626; }
.status-dot { width: 6px; height: 6px; border-radius: 50%; }
.badge-success-light .status-dot { background: #059669; }
.badge-warning-light .status-dot { background: #D97706; }
.badge-danger-light .status-dot { background: #DC2626; }

.pagination-footer { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; }
.pagination-info { font-size: 0.85rem; color: var(--text-secondary); }
.pagination-controls { display: flex; gap: 4px; align-items: center; }
.page-btn { min-width: 32px; height: 32px; border: 1px solid var(--border-color); background: white; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; color: var(--text-secondary); cursor: pointer; }
.page-btn.active { background: var(--accent-blue); color: white; border-color: var(--accent-blue); }
.page-ellipsis { margin: 0 4px; color: var(--text-muted); }

/* Drawer */
.drawer-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.4); z-index: 100; display: flex; justify-content: flex-end; }
.drawer { width: 480px; background: white; height: 100%; box-shadow: -4px 0 24px rgba(0,0,0,0.1); display: flex; flex-direction: column; animation: slideIn 0.3s ease-out; }
@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

.drawer-header { padding: 32px 32px 24px 32px; border-bottom: 1px solid var(--border-color); position: relative; }
.close-btn { position: absolute; right: 24px; top: 24px; background: transparent; border: none; color: var(--text-muted); cursor: pointer; }
.drawer-title-group h3 { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.drawer-title-group span { font-size: 0.85rem; color: var(--text-secondary); }
.drawer-badges { display: flex; gap: 8px; }

.drawer-actions { display: flex; gap: 12px; padding: 24px 32px; border-bottom: 1px solid var(--border-color); }
.flex-1 { flex: 1; justify-content: center; }

.drawer-tabs { display: flex; padding: 0 32px; border-bottom: 1px solid var(--border-color); gap: 24px; }
.drawer-tab { padding: 16px 0; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; }
.drawer-tab.active { color: var(--accent-blue); border-bottom-color: var(--accent-blue); }

.drawer-body { padding: 32px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 32px; }
.info-section h4 { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; }
.section-header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.section-header-flex h4 { margin-bottom: 0; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.info-item { display: flex; flex-direction: column; gap: 4px; }
.info-item.full { grid-column: span 2; }
.info-item span { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }
.info-item strong { font-size: 0.9rem; color: var(--text-primary); line-height: 1.4; }
.text-lg { font-size: 1.25rem !important; }
.link-blue { color: var(--accent-blue); text-decoration: none; font-weight: 600; }
.text-sm { font-size: 0.8rem; }
</style>
