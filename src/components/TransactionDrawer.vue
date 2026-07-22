<template>
  <div class="drawer-backdrop" v-if="tx" @click.self="$emit('close')">
    <div class="drawer-card">
      <div class="drawer-header">
        <div>
          <h3>Transação {{ tx.id }}</h3>
          <span class="badge badge-success">{{ tx.status }}</span>
        </div>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>

      <div class="drawer-body">
        <div class="tabs-header">
          <button class="tab-btn" :class="{ active: tab === 'resumo' }" @click="tab = 'resumo'">Resumo</button>
          <button class="tab-btn" :class="{ active: tab === 'timeline' }" @click="tab = 'timeline'">Timeline</button>
          <button class="tab-btn" :class="{ active: tab === 'payload' }" @click="tab = 'payload'">Payload</button>
          <button class="tab-btn" :class="{ active: tab === 'webhook' }" @click="tab = 'webhook'">Webhook</button>
        </div>

        <div v-if="tab === 'resumo'" class="detail-section">
          <div class="detail-row"><span>Valor original:</span><span class="font-bold">R$ {{ tx.value.toFixed(2) }}</span></div>
          <div class="detail-row"><span>Taxa de serviço:</span><span>R$ {{ (tx.fee || 2.50).toFixed(2) }}</span></div>
          <div class="detail-row font-bold" style="color: var(--accent-green);"><span>Valor líquido:</span><span>R$ {{ (tx.netValue || tx.value - 2.5).toFixed(2) }}</span></div>
          <hr style="border-color: var(--border-color); margin: 16px 0;">
          <div class="detail-row"><span>Pagador:</span><span>{{ tx.payer }}</span></div>
          <div class="detail-row"><span>End-to-End ID:</span><span style="font-family: monospace; font-size: 0.75rem;">{{ tx.endToEndId || 'E18236130202505211023a1f7g8h9i0' }}</span></div>
          <div class="detail-row"><span>Data/Hora:</span><span>{{ tx.date }}</span></div>
        </div>

        <div v-if="tab === 'timeline'" class="timeline-section">
          <div class="timeline-step">🟢 <strong>08:34:00</strong> - Pix Criado</div>
          <div class="timeline-step">🟡 <strong>08:34:05</strong> - Aguardando Pagamento</div>
          <div class="timeline-step">🟢 <strong>08:34:12</strong> - Pagamento Confirmado</div>
        </div>

        <div v-if="tab === 'payload'" class="code-box">
          <pre>{{ JSON.stringify({ id: tx.id, amount: tx.value, status: tx.status, end_to_end_id: tx.endToEndId }, null, 2) }}</pre>
        </div>

        <div v-if="tab === 'webhook'" class="code-box">
          <pre>{{ JSON.stringify({ event: "pix.paid", target_url: "https://seusite.com/webhooks/pague-compra", http_status: 200 }, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionDrawer',
  props: { tx: Object },
  data() {
    return { tab: 'resumo' }
  }
}
</script>

<style scoped>
.drawer-backdrop {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6); z-index: 120;
  display: flex; justify-content: flex-end;
}
.drawer-card {
  width: 480px; height: 100%; background: var(--bg-secondary);
  border-left: 1px solid var(--border-color); padding: 24px;
  overflow-y: auto; display: flex; flex-direction: column;
}
.drawer-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
.detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.88rem; }
.code-box { background: var(--bg-primary); padding: 16px; border-radius: 8px; font-family: monospace; font-size: 0.8rem; color: #60A5FA; }
.timeline-step { margin-bottom: 12px; font-size: 0.85rem; }
</style>
