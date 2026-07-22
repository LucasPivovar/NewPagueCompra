<template>
  <div class="admin-fees-view">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Taxas e Limites</h2>
        <p>Configure as taxas padrão e limites globais da plataforma.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary"><Save size="16" /> Salvar alterações</button>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-body">
        <h3 class="section-title mb-4">Taxas Padrão (Pix)</h3>
        
        <div class="form-grid">
          <div class="form-group">
            <label>Taxa por recebimento (Fixa)</label>
            <div class="input-with-icon">
              <span class="currency-prefix">R$</span>
              <input type="text" class="form-input with-prefix" value="0,99">
            </div>
          </div>
          <div class="form-group">
            <label>Taxa por recebimento (Percentual)</label>
            <div class="input-with-icon">
              <input type="text" class="form-input with-suffix" value="0,00">
              <span class="percent-suffix">%</span>
            </div>
          </div>
          <div class="form-group">
            <label>Tarifa de Saque</label>
            <div class="input-with-icon">
              <span class="currency-prefix">R$</span>
              <input type="text" class="form-input with-prefix" value="6,50">
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="card mt-4">
      <div class="card-body">
        <h3 class="section-title mb-4">Limites Globais (Prevenção a Fraude)</h3>
        
        <div class="form-grid">
          <div class="form-group">
            <label>Limite diário padrão (Recebimento)</label>
            <div class="input-with-icon">
              <span class="currency-prefix">R$</span>
              <input type="text" class="form-input with-prefix" value="100.000,00">
            </div>
          </div>
          <div class="form-group">
            <label>Limite de saque por operação</label>
            <div class="input-with-icon">
              <span class="currency-prefix">R$</span>
              <input type="text" class="form-input with-prefix" value="10.000,00">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Save } from 'lucide-vue-next';

export default {
  name: 'AdminFeesView',
  components: { Save }
}
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; }
.page-title-group h2 { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.page-title-group p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }
.btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: var(--radius-md); font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.btn-primary { background: var(--accent-blue); color: white; }

.card { background: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
.card-body { padding: 24px; }
.section-title { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.mb-4 { margin-bottom: 24px; }
.mt-4 { margin-top: 24px; }

.form-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.form-group { display: flex; flex-direction: column; }
.form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px; }

.input-with-icon { position: relative; display: flex; align-items: center; }
.currency-prefix { position: absolute; left: 14px; font-size: 0.85rem; font-weight: 600; color: var(--text-muted); }
.percent-suffix { position: absolute; right: 14px; font-size: 0.85rem; font-weight: 600; color: var(--text-muted); }
.form-input { width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.95rem; outline: none; }
.form-input.with-prefix { padding-left: 40px; }
.form-input.with-suffix { padding-right: 40px; }
</style>
