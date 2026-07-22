<template>
  <div class="atendimento-view">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Central de Atendimento</h2>
        <p>Abra chamados, acompanhe tickets ou tire dúvidas com nossa equipe.</p>
      </div>
    </div>
    
    <div class="card mt-4">
      <div class="card-body">
        <h3 class="font-bold text-lg mb-4">Abrir Novo Chamado</h3>
        <p class="text-muted text-sm mb-6">Nossa equipe responderá em até 24 horas úteis.</p>

        <form class="support-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Assunto</label>
            <select class="form-input">
              <option value="" disabled selected>Selecione um tópico...</option>
              <option>Dúvidas sobre integração</option>
              <option>Problemas com saque</option>
              <option>Contestação de cobrança</option>
              <option>Outros assuntos</option>
            </select>
          </div>
          <div class="form-group mt-4">
            <label>Mensagem detalhada</label>
            <textarea class="form-input" rows="5" placeholder="Descreva seu problema com o máximo de detalhes possível..."></textarea>
          </div>
          <div class="form-group mt-4">
            <label>Anexos (Opcional)</label>
            <div class="file-upload">
              <UploadCloud class="text-muted" size="24" />
              <span class="text-sm text-muted mt-2">Clique ou arraste arquivos aqui (Max 5MB)</span>
            </div>
          </div>
          <div class="mt-6">
            <button type="submit" class="btn btn-primary">Enviar Mensagem</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { UploadCloud } from 'lucide-vue-next';

export default {
  name: 'AtendimentoView',
  components: { UploadCloud },
  methods: {
    handleSubmit() {
      this.$emit('toast', 'Seu chamado foi aberto com sucesso! Número do ticket: #TK-84920', 'success');
      this.$router.push('/dashboard');
    }
  }
}
</script>

<style scoped>
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.form-input { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; outline: none; width: 100%; max-width: 600px; resize: vertical; }
.form-input:focus { border-color: var(--accent-blue); }

.file-upload {
  max-width: 600px;
  border: 2px dashed var(--border-color);
  border-radius: var(--radius-md);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: var(--bg-secondary);
  transition: all 0.2s;
}
.file-upload:hover { border-color: var(--accent-blue); background: #EFF6FF; }

.font-bold { font-weight: 700; }
.text-lg { font-size: 1.1rem; }
.text-sm { font-size: 0.85rem; }
.text-muted { color: var(--text-muted); }
.mb-4 { margin-bottom: 16px; }
.mb-6 { margin-bottom: 24px; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
</style>
