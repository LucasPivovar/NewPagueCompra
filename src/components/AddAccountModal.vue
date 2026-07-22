<template>
  <div class="modal-backdrop" v-if="show" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h2 class="modal-title">{{ isEdit ? 'Editar conta bancária' : 'Adicionar conta bancária' }}</h2>
        <button class="modal-close" @click="$emit('close')">
          <X size="24" />
        </button>
      </div>
      
      <div class="modal-body">
        <p class="text-muted text-sm mb-4">{{ isEdit ? 'Altere os dados da conta bancária abaixo.' : 'Adicione uma nova conta bancária para receber seus repasses e realizar saques.' }}</p>
        
        <form @submit.prevent="save" class="form-layout">
          <div class="form-group">
            <label>Instituição Bancária</label>
            <select class="form-input" required>
              <option value="" disabled selected>Selecione o banco</option>
              <option value="001">001 - Banco do Brasil S.A.</option>
              <option value="341">341 - Itaú Unibanco S.A.</option>
              <option value="033">033 - Banco Santander (Brasil) S.A.</option>
              <option value="104">104 - Caixa Econômica Federal</option>
              <option value="237">237 - Banco Bradesco S.A.</option>
              <option value="260">260 - Nu Pagamentos S.A. (Nubank)</option>
              <option value="077">077 - Banco Inter S.A.</option>
            </select>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label>Agência (sem dígito)</label>
              <input type="text" class="form-input" placeholder="0000" maxlength="4" required>
            </div>
            <div class="form-group">
              <label>Conta com dígito</label>
              <input type="text" class="form-input" placeholder="000000-0" required>
            </div>
          </div>

          <div class="form-group">
            <label>Tipo de Conta</label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" name="accountType" value="corrente" checked>
                <span>Conta Corrente</span>
              </label>
              <label class="radio-label">
                <input type="radio" name="accountType" value="poupanca">
                <span>Conta Poupança</span>
              </label>
            </div>
          </div>
          
          <div class="form-group mt-2">
            <label>Apelido da conta (opcional)</label>
            <input type="text" class="form-input" placeholder="Ex: Conta principal da empresa">
          </div>

          <div class="modal-actions mt-4">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
            <button type="submit" class="btn btn-primary">{{ isEdit ? 'Salvar Alterações' : 'Adicionar Conta' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { X } from 'lucide-vue-next';

export default {
  name: 'AddAccountModal',
  components: { X },
  props: {
    show: Boolean,
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
  methods: {
    save() {
      this.$emit('toast', this.isEdit ? 'Conta bancária atualizada com sucesso!' : 'Conta bancária adicionada com sucesso!', 'success');
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

.radio-group { display: flex; gap: 16px; }
.radio-label { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: var(--text-secondary); cursor: pointer; }
.radio-label input { accent-color: var(--accent-blue); width: 16px; height: 16px; }

.text-muted { color: var(--text-muted); }
.text-sm { font-size: 0.85rem; }
.mb-4 { margin-bottom: 24px; }
.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 24px; }

.modal-actions { display: flex; gap: 12px; }
.btn { flex: 1; padding: 12px; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.btn-secondary { background: white; border-color: var(--border-color); color: var(--text-primary); }
.btn-primary { background: var(--accent-blue); color: white; }
</style>
