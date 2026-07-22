<template>
  <div class="admin-users">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Usuários e Acessos</h2>
        <p>Gerencie sua equipe, níveis de acesso e permissões (RBAC).</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" @click="showAddModal = true"><Plus size="16" /> Adicionar Usuário</button>
      </div>
    </div>
    
    <div class="card mt-4">
      <div class="card-header border-bottom p-4 flex justify-between items-center flex-wrap gap-4">
        <div class="search-bar" style="flex: 1; min-width: 250px;">
          <input type="text" class="form-input" v-model="searchQuery" placeholder="Buscar por nome ou e-mail" style="width: 100%;">
        </div>
        <div class="filter-group flex items-center gap-2">
          <label class="text-sm font-medium text-secondary">Cargo</label>
          <select class="form-select" v-model="filterCargo">
            <option>Todos</option>
            <option>Administrador</option>
            <option>Operador de Risco</option>
            <option>Suporte</option>
            <option>Desenvolvedor</option>
          </select>
        </div>
        <div class="filter-group flex items-center gap-2">
          <label class="text-sm font-medium text-secondary">Status</label>
          <select class="form-select" v-model="filterStatus">
            <option>Todos</option>
            <option>Ativo</option>
            <option>Bloqueado</option>
          </select>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>E-mail</th>
              <th>Cargo / Função</th>
              <th>Status</th>
              <th>Último Acesso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar-sm">{{ user.nome.charAt(0) }}</div>
                  <span>{{ user.nome }}</span>
                </div>
              </td>
              <td class="text-muted">{{ user.email }}</td>
              <td>{{ user.cargo }}</td>
              <td>
                <span class="badge" :class="'badge-' + user.statusClass">{{ user.status }}</span>
              </td>
              <td class="text-sm text-muted">{{ user.ultimoAcesso }}</td>
              <td>
                <button class="btn-text text-sm" @click="handleAction('edit', user)">Editar</button>
                <button v-if="user.status === 'Ativo'" class="btn-text text-red text-sm ml-2" @click="handleAction('block', user)">Bloquear</button>
                <button v-else class="btn-text text-green text-sm ml-2" @click="handleAction('unblock', user)">Desbloquear</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <AddUserModal :show="showAddModal" :initialData="editUserData" @close="showAddModal = false; editUserData = null" @toast="(m,t) => $emit('toast', m, t)" />
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
import { Plus } from 'lucide-vue-next';
import AddUserModal from '@/components/AddUserModal.vue';
import GenericActionModal from '@/components/GenericActionModal.vue';

export default {
  name: 'AdminUsersView',
  components: { Plus, AddUserModal, GenericActionModal },
  data() {
    return {
      showAddModal: false,
      editUserData: null,
      showActionModal: false,
      actionTitle: '',
      actionDesc: '',
      isDestructive: false,
      requireConfirm: false,
      users: [
        { id: 1, nome: 'André Cardoso', email: 'andre.cardoso@paguecompra.com', cargo: 'Administrador', status: 'Ativo', statusClass: 'success-light', ultimoAcesso: 'Agora mesmo' },
        { id: 2, nome: 'Mariana Souza', email: 'mariana.souza@paguecompra.com', cargo: 'Operador de Risco', status: 'Ativo', statusClass: 'success-light', ultimoAcesso: 'Há 2 horas' },
        { id: 3, nome: 'Lucas Ferraz', email: 'lucas.ferraz@paguecompra.com', cargo: 'Suporte', status: 'Ativo', statusClass: 'success-light', ultimoAcesso: 'Ontem, 16:45' },
        { id: 4, nome: 'Thiago Mendes', email: 'thiago.mendes@paguecompra.com', cargo: 'Desenvolvedor', status: 'Bloqueado', statusClass: 'error-light', ultimoAcesso: '20/07/2026 10:15' }
      ],
      searchQuery: '',
      filterCargo: 'Todos',
      filterStatus: 'Todos'
    }
  },
  computed: {
    filteredUsers() {
      let filtered = this.users;
      if (this.filterCargo !== 'Todos') {
        filtered = filtered.filter(u => u.cargo === this.filterCargo);
      }
      if (this.filterStatus !== 'Todos') {
        filtered = filtered.filter(u => u.status === this.filterStatus);
      }
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(u => 
          u.nome.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
        );
      }
      return filtered;
    }
  },
  methods: {
    handleAction(action, user) {
      if (action === 'edit') {
        this.editUserData = user;
        this.showAddModal = true;
      } else if (action === 'block') {
        this.actionTitle = 'Bloquear Usuário';
        this.actionDesc = `O usuário ${user.nome} perderá acesso imediato ao sistema.`;
        this.isDestructive = true;
        this.requireConfirm = true;
        this.showActionModal = true;
      } else if (action === 'unblock') {
        this.actionTitle = 'Desbloquear Usuário';
        this.actionDesc = `O usuário ${user.nome} terá seu acesso restaurado.`;
        this.isDestructive = false;
        this.requireConfirm = false;
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
.table-responsive { overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; }
.table th, .table td { padding: 16px 24px; text-align: left; border-bottom: 1px solid var(--border-color); }
.table th { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); font-weight: 600; }
.table td { font-size: 0.9rem; color: var(--text-primary); vertical-align: middle; }
.table tbody tr:hover { background-color: #F8FAFC; }

.badge { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; display: inline-block; }
.badge-success-light { background: #ECFDF5; color: #10B981; border: 1px solid #A7F3D0; }
.badge-error-light { background: #FEF2F2; color: #EF4444; border: 1px solid #FECACA; }

.avatar-sm {
  width: 32px;
  height: 32px;
  background: var(--accent-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
}

.text-red { color: var(--accent-red); }
.text-green { color: var(--accent-green); }
.font-medium { font-weight: 500; }
.text-sm { font-size: 0.85rem; }
.text-muted { color: var(--text-muted); }
.p-4 { padding: 24px; }
.border-bottom { border-bottom: 1px solid var(--border-color); }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-3 { gap: 12px; }
.ml-2 { margin-left: 8px; }
.mt-4 { margin-top: 24px; }
.btn-text { background: transparent; border: none; font-weight: 600; color: var(--accent-blue); cursor: pointer; }
.btn-text:hover { text-decoration: underline; }

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
