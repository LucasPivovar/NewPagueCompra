<template>
  <div class="modal-backdrop" v-if="show" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h2 class="modal-title">
          {{ isEdit ? (isClient ? 'Editar Cliente' : 'Editar Usuário') : (isClient ? 'Adicionar Cliente' : 'Adicionar Usuário') }}
        </h2>
        <button class="modal-close" @click="$emit('close')">
          <X size="24" />
        </button>
      </div>
      
      <div class="modal-body">
        <p class="text-muted text-sm mb-4">
          {{ isEdit ? `Altere os dados do ${isClient ? 'cliente' : 'usuário'} abaixo.` : `Preencha os dados abaixo para cadastrar um novo ${isClient ? 'cliente' : 'usuário'} na plataforma.` }}
        </p>
        
        <form @submit.prevent="save" class="form-layout">
          <div class="form-group">
            <label>Nome Completo</label>
            <input type="text" class="form-input" placeholder="Ex: João da Silva" required>
          </div>

          <div class="form-group">
            <label>E-mail Corporativo</label>
            <input type="email" class="form-input" placeholder="joao@empresa.com" required>
          </div>

          <div class="form-grid-2" v-if="!isClient">
            <div class="form-group">
              <label>Nível de Acesso</label>
              <select class="form-input" required>
                <option value="admin">Administrador (Total)</option>
                <option value="manager">Gerente (Parcial)</option>
                <option value="viewer" selected>Visualizador (Leitura)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Departamento</label>
              <select class="form-input">
                <option value="financeiro">Financeiro</option>
                <option value="suporte">Suporte</option>
                <option value="tecnologia">Tecnologia</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>
          </div>
          
          <div class="form-grid-2" v-if="isClient">
            <div class="form-group">
              <label>CPF / CNPJ</label>
              <input type="text" class="form-input" placeholder="000.000.000-00" required>
            </div>
            <div class="form-group">
              <label>Telefone</label>
              <input type="text" class="form-input" placeholder="(00) 00000-0000" required>
            </div>
          </div>

          <div class="form-group mt-2">
            <label>Senha Provisória</label>
            <div class="password-box">
              <input type="text" class="form-input" disabled :value="tempPassword">
              <button type="button" class="btn-refresh" @click="generatePassword" title="Gerar nova senha">
                <RefreshCw size="14" />
              </button>
            </div>
            <small class="text-muted mt-1">O {{ isClient ? 'cliente' : 'usuário' }} deverá alterar a senha no primeiro acesso.</small>
          </div>

          <div class="modal-actions mt-4">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
            <button type="submit" class="btn btn-primary">{{ isEdit ? 'Salvar Alterações' : 'Cadastrar' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { X, RefreshCw } from 'lucide-vue-next';

export default {
  name: 'AddUserModal',
  components: { X, RefreshCw },
  props: {
    show: Boolean,
    isClient: {
      type: Boolean,
      default: false
    },
    initialData: {
      type: Object,
      default: null
    }
  },
  computed: {
    isEdit() {
      return !!this.initialData;
    }
  },
  data() {
    return {
      tempPassword: ''
    }
  },
  mounted() {
    this.generatePassword();
  },
  methods: {
    generatePassword() {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
      let pass = "";
      for (let i = 0; i < 10; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      this.tempPassword = pass;
    },
    save() {
      const typeStr = this.isClient ? 'Cliente' : 'Usuário';
      const actionStr = this.isEdit ? 'atualizado' : 'cadastrado';
      this.$emit('toast', `${typeStr} ${actionStr} com sucesso!`, 'success');
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); z-index: 100;
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.modal-card {
  background: white; border-radius: var(--radius-lg);
  width: 100%; max-width: 500px;
  box-shadow: var(--shadow-lg); padding: 32px;
}
.modal-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;
}
.modal-title { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); }
.modal-close { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }

.form-layout { display: flex; flex-direction: column; gap: 16px; }
.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.form-input { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; outline: none; }
.form-input:disabled { background: var(--bg-secondary); }

.password-box { display: flex; gap: 8px; }
.password-box .form-input { flex: 1; letter-spacing: 1px; font-family: monospace; font-size: 1rem; }
.btn-refresh { display: flex; align-items: center; justify-content: center; width: 42px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); cursor: pointer; color: var(--text-secondary); }
.btn-refresh:hover { color: var(--accent-blue); }

.text-muted { color: var(--text-muted); }
.text-sm { font-size: 0.85rem; }
.mb-4 { margin-bottom: 24px; }
.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 24px; }
.mt-1 { margin-top: 4px; }

.modal-actions { display: flex; gap: 12px; }
.btn { flex: 1; padding: 12px; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.btn-secondary { background: white; border-color: var(--border-color); color: var(--text-primary); }
.btn-primary { background: var(--accent-blue); color: white; }
</style>
