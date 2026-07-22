<template>
  <div class="modal-backdrop" v-if="show" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h2 class="modal-title">{{ title }}</h2>
        <button class="modal-close" @click="$emit('close')">
          <X size="24" />
        </button>
      </div>
      
      <div class="modal-body">
        <p class="text-muted text-sm mb-4">{{ description }}</p>
        
        <form @submit.prevent="confirm" class="form-layout">
          <!-- Dynamic slot for fields if needed in the future, or generic confirmation for now -->
          <slot></slot>

          <div v-if="requireConfirmation" class="form-group mt-2">
            <label>Para confirmar, digite <strong>CONFIRMAR</strong></label>
            <input type="text" class="form-input" v-model="confirmationText" required>
          </div>

          <div class="modal-actions mt-4">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
            <button type="submit" class="btn btn-primary" :class="buttonClass" :disabled="isConfirmDisabled">
              {{ confirmText }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { X } from 'lucide-vue-next';

export default {
  name: 'GenericActionModal',
  components: { X },
  props: {
    show: Boolean,
    title: { type: String, default: 'Ação' },
    description: { type: String, default: 'Confirme os dados para prosseguir.' },
    confirmText: { type: String, default: 'Confirmar' },
    isDestructive: { type: Boolean, default: false },
    requireConfirmation: { type: Boolean, default: false }
  },
  data() {
    return {
      confirmationText: ''
    }
  },
  computed: {
    buttonClass() {
      return this.isDestructive ? 'btn-danger' : 'btn-primary';
    },
    isConfirmDisabled() {
      if (this.requireConfirmation) {
        return this.confirmationText !== 'CONFIRMAR';
      }
      return false;
    }
  },
  watch: {
    show(newVal) {
      if (newVal) this.confirmationText = '';
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm');
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
  width: 100%; max-width: 440px;
  box-shadow: var(--shadow-lg); padding: 32px;
}
.modal-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;
}
.modal-title { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); }
.modal-close { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }

.form-layout { display: flex; flex-direction: column; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.form-input { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; outline: none; }
.form-input:focus { border-color: var(--accent-blue); }

.text-muted { color: var(--text-muted); }
.text-sm { font-size: 0.85rem; }
.mb-4 { margin-bottom: 24px; }
.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 24px; }

.modal-actions { display: flex; gap: 12px; }
.btn { flex: 1; padding: 12px; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-secondary { background: white; border-color: var(--border-color); color: var(--text-primary); }
.btn-primary { background: var(--accent-blue); color: white; }
.btn-danger { background: var(--accent-red); color: white; }
</style>
