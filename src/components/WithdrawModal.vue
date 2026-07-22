<template>
  <div class="modal-backdrop" v-if="show" @click.self="$emit('close')">
    <div class="modal-card large">
      <div class="modal-header">
        <h2 class="modal-title">Solicitação de saque</h2>
        <button class="modal-close" @click="$emit('close')">
          <X size="24" />
        </button>
      </div>
      <p class="modal-subtitle">Preencha os dados para solicitar um saque.</p>

      <div class="modal-body modal-split">
        <!-- Left Sidebar Stepper -->
        <div class="modal-sidebar">
          <div class="vertical-stepper">
            <div class="step-item" :class="{ active: step === 1, completed: step > 1 }">
              <div class="step-indicator">
                <Check v-if="step > 1" size="14" />
                <span v-else>1</span>
              </div>
              <span class="step-label">Informações do saque</span>
            </div>
            <div class="step-item" :class="{ active: step === 2, completed: step > 2 }">
              <div class="step-indicator">
                <Check v-if="step > 2" size="14" />
                <span v-else>2</span>
              </div>
              <span class="step-label">Revisão e confirmação</span>
            </div>
            <div class="step-item" :class="{ active: step === 3 }">
              <div class="step-indicator">
                <span>3</span>
              </div>
              <span class="step-label">Solicitação realizada</span>
            </div>
          </div>

          <div class="info-alert blue mt-4">
            <div class="alert-header">
              <Info size="20" class="text-blue" />
              <strong>Como funciona?</strong>
            </div>
            <ul>
              <li>Saques em dias úteis até 16h são processados no mesmo dia.</li>
              <li>Após as 16h, finais de semana e feriados, o processamento ocorre no próximo dia útil.</li>
              <li>O valor cai na conta destino em até 1 dia útil após o processamento.</li>
            </ul>
          </div>
        </div>

        <!-- Middle Content -->
        <div class="modal-content">
          <div class="form-grid-2">
            <div class="form-group">
              <label>Valor do saque</label>
              <input type="text" class="input-lg" v-model="amountFormatted" @input="updateAmount">
              <span class="hint-text text-green">Saldo disponível: R$ 48.750,32</span>
            </div>
            <div class="form-group">
              <label>Conta de destino</label>
              <div class="select-account-mock">
                <div class="bank-logo bb">BB</div>
                <div class="bank-details">
                  <strong>Banco do Brasil S.A.</strong>
                  <span>Agência 1234-5 • Conta 67890-1</span>
                </div>
                <ChevronDown size="16" class="text-muted" />
              </div>
            </div>
          </div>

          <div class="fees-grid mt-4">
            <div class="fee-card">
              <span>Tarifa do saque</span>
              <strong>R$ 6,50</strong>
              <a href="#" class="link-blue text-sm mt-1">Tabela de tarifas <ExternalLink size="12" /></a>
            </div>
            <div class="fee-card">
              <span>Valor líquido a receber</span>
              <strong class="text-green">R$ {{ (Math.max(0, amount - 6.5)).toLocaleString('pt-BR', {minimumFractionDigits: 2}) }}</strong>
            </div>
          </div>

          <div class="form-group mt-4">
            <label>Código de confirmação</label>
            <p class="text-sm text-secondary mb-2">Digite o código de 6 dígitos enviado para seu e-mail</p>
            <div class="code-input-row">
              <input type="text" placeholder="000000" v-maska data-maska="######" v-model="otp">
              <button class="btn btn-outline-blue">Enviar código novamente (58s)</button>
            </div>
          </div>

          <div class="status-info-box mt-4">
            <strong>Sobre o status do saque</strong>
            <ul>
              <li><span class="dot blue"></span> <strong>Em processamento:</strong> seu saque foi recebido e está sendo processado.</li>
              <li><span class="dot yellow"></span> <strong>Enviado para banco:</strong> o valor foi enviado ao banco e está em trânsito.</li>
              <li><span class="dot green"></span> <strong>Concluído:</strong> o valor foi creditado na conta destino.</li>
              <li><span class="dot red"></span> <strong>Cancelado:</strong> o saque foi cancelado e o valor retornará ao saldo disponível.</li>
            </ul>
          </div>
        </div>

        <!-- Right Sidebar Summary -->
        <div class="modal-summary">
          <div class="summary-card">
            <h3>Resumo do saque</h3>
            <div class="summary-row">
              <span>Valor do saque</span>
              <span>R$ {{ amount.toLocaleString('pt-BR', {minimumFractionDigits: 2}) }}</span>
            </div>
            <div class="summary-row">
              <span>Tarifa</span>
              <span>− R$ 6,50</span>
            </div>
            <div class="summary-row total">
              <span>Valor líquido</span>
              <strong class="text-green">R$ {{ (Math.max(0, amount - 6.5)).toLocaleString('pt-BR', {minimumFractionDigits: 2}) }}</strong>
            </div>

            <div class="summary-divider"></div>
            
            <div class="summary-section">
              <span>Conta destino</span>
              <strong>Banco do Brasil S.A.</strong>
              <span>Agência 1234-5 • Conta 67890-1</span>
            </div>

            <div class="summary-section mt-3">
              <span>Previsão de processamento</span>
              <strong>21/05/2025 até 16:00</strong>
            </div>
          </div>

          <div class="security-badge mt-4">
            <ShieldCheck size="24" class="text-green" />
            <div>
              <strong>Seus dados estão protegidos.</strong>
              <p>Utilizamos criptografia e seguimos os mais altos padrões de segurança.</p>
            </div>
          </div>

          <div class="modal-actions mt-4">
            <button class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
            <button class="btn btn-primary" @click="confirm">Continuar</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { X, Check, Info, ChevronDown, ExternalLink, ShieldCheck } from 'lucide-vue-next';
import { vMaska } from "maska/vue";

export default {
  name: 'WithdrawModal',
  components: { X, Check, Info, ChevronDown, ExternalLink, ShieldCheck },
  directives: { maska: vMaska },
  props: { show: Boolean },
  data() {
    return {
      step: 2, // matching the image state
      amount: 2500.00,
      amountFormatted: 'R$ 2.500,00',
      otp: ''
    }
  },
  methods: {
    updateAmount(e) {
      let val = e.target.value.replace(/\D/g, '');
      if (!val) val = '0';
      this.amount = parseInt(val) / 100;
      this.amountFormatted = 'R$ ' + this.amount.toLocaleString('pt-BR', {minimumFractionDigits: 2});
    },
    confirm() {
      if (this.otp.length < 6) {
        this.$emit('toast', 'Digite um código OTP de 6 dígitos', 'warning');
        return;
      }
      this.step = 3;
      this.$emit('withdraw-completed', this.amount);
      this.$emit('toast', 'Saque processado com sucesso!', 'success');
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); z-index: 100;
  display: flex; align-items: center; justify-content: center; padding: 40px;
}
.modal-card.large {
  background: white;
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 1100px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  padding: 32px 0 0 0;
}
.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 32px; margin-bottom: 8px;
}
.modal-title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); }
.modal-close { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }
.modal-subtitle { padding: 0 32px; color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 32px; }

.modal-split {
  display: flex;
  border-top: 1px solid var(--border-color);
}
.modal-sidebar {
  width: 260px;
  padding: 32px;
  border-right: 1px solid var(--border-color);
  background: var(--bg-primary);
}
.modal-content {
  flex: 1;
  padding: 32px;
}
.modal-summary {
  width: 340px;
  padding: 32px;
  background: var(--bg-primary);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

/* Stepper */
.vertical-stepper { display: flex; flex-direction: column; gap: 24px; }
.step-item { display: flex; align-items: center; gap: 12px; opacity: 0.5; }
.step-item.active, .step-item.completed { opacity: 1; }
.step-indicator { width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--text-muted); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }
.step-item.active .step-indicator { background: var(--accent-blue-light); border-color: var(--accent-blue); color: var(--accent-blue); }
.step-item.completed .step-indicator { background: var(--accent-blue); border-color: var(--accent-blue); color: white; }
.step-label { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }
.step-item.active .step-label { color: var(--accent-blue); }

.info-alert { background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: var(--radius-md); padding: 16px; }
.alert-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.text-blue { color: var(--accent-blue); }
.info-alert ul { margin: 0; padding-left: 16px; }
.info-alert li { font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.4; }

/* Middle Form */
.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px; }
.input-lg { width: 100%; padding: 14px 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 1.1rem; font-weight: 600; outline: none; }
.hint-text { font-size: 0.75rem; font-weight: 600; margin-top: 6px; display: block; }
.text-green { color: var(--accent-green); }

.select-account-mock { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: white; cursor: pointer; }
.bank-logo { width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; font-size: 0.75rem; }
.bank-logo.bb { background: #FCE700; color: #003087; }
.bank-details { flex: 1; display: flex; flex-direction: column; }
.bank-details strong { font-size: 0.85rem; color: var(--text-primary); }
.bank-details span { font-size: 0.7rem; color: var(--text-secondary); }

.fees-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.fee-card { border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; display: flex; flex-direction: column; }
.fee-card span { font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 4px; }
.fee-card strong { font-size: 1.1rem; color: var(--text-primary); }
.link-blue { color: var(--accent-blue); text-decoration: none; display: flex; align-items: center; gap: 4px; }
.text-sm { font-size: 0.75rem; }

.code-input-row { display: flex; gap: 12px; }
.code-input-row input { flex: 1; padding: 12px 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 1rem; letter-spacing: 2px; }
.btn-outline-blue { padding: 0 16px; border: 1px solid var(--accent-blue); color: var(--accent-blue); background: transparent; border-radius: var(--radius-md); font-weight: 600; font-size: 0.85rem; cursor: pointer; }

.status-info-box { background: var(--bg-primary); border-radius: var(--radius-md); padding: 16px; }
.status-info-box > strong { font-size: 0.85rem; color: var(--text-primary); display: block; margin-bottom: 12px; }
.status-info-box ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.status-info-box li { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--text-secondary); }
.dot { width: 6px; height: 6px; border-radius: 50%; }
.dot.blue { background: var(--accent-blue); }
.dot.yellow { background: var(--accent-amber); }
.dot.green { background: var(--accent-green); }
.dot.red { background: var(--accent-red); }

/* Right Summary */
.summary-card { background: white; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px; }
.summary-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 16px; color: var(--text-primary); }
.summary-row { display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px; }
.summary-row.total { padding-top: 12px; border-top: 1px dashed var(--border-color); margin-top: 4px; margin-bottom: 0; font-size: 0.9rem; }
.summary-divider { height: 1px; background: var(--border-color); margin: 20px 0; }
.summary-section { display: flex; flex-direction: column; gap: 4px; }
.summary-section span { font-size: 0.8rem; color: var(--text-secondary); }
.summary-section strong { font-size: 0.85rem; color: var(--text-primary); }
.mt-3 { margin-top: 16px; }

.security-badge { display: flex; gap: 12px; align-items: flex-start; padding: 16px; background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: var(--radius-md); }
.security-badge strong { font-size: 0.85rem; color: #065F46; display: block; margin-bottom: 4px; }
.security-badge p { font-size: 0.75rem; color: #047857; margin: 0; line-height: 1.4; }

.modal-actions { display: flex; gap: 12px; margin-top: auto; }
.btn { flex: 1; padding: 12px; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.btn-secondary { background: white; border-color: var(--border-color); color: var(--text-primary); }
.btn-primary { background: var(--accent-blue); color: white; }
</style>
