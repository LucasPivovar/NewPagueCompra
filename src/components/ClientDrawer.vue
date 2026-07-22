<template>
  <div class="drawer-backdrop" v-if="client" @click.self="$emit('close')">
    <div class="drawer-card">
      <div class="drawer-header">
        <div>
          <h3>{{ client.name }}</h3>
          <span class="badge badge-success">{{ client.status || 'Ativo' }}</span>
        </div>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>

      <div class="drawer-body">
        <div class="kpi-grid mb-4">
          <div class="kpi-card">
            <div>
              <div class="kpi-label">Saldo em carteira</div>
              <div class="kpi-value">R$ {{ (client.balance || 12450.32).toFixed(2) }}</div>
            </div>
          </div>
          <div class="kpi-card">
            <div>
              <div class="kpi-label">Volume mensal</div>
              <div class="kpi-value">R$ {{ (client.volume || 245680.32).toFixed(2) }}</div>
            </div>
          </div>
        </div>

        <div class="card mb-4" style="margin-bottom: 20px;">
          <div class="card-title mb-2">Limites Operacionais</div>
          <div class="detail-row"><span>Pix por transação:</span><span class="font-bold">R$ 10.000,00</span></div>
          <div class="detail-row"><span>Saque diário:</span><span class="font-bold">R$ 50.000,00</span></div>
        </div>

        <div class="card" style="margin-bottom: 20px;">
          <div class="card-title mb-2">Conexões Ativas</div>
          <div class="detail-row"><span>API Status:</span><span class="badge badge-success">Produção Ativa</span></div>
          <div class="detail-row"><span>Webhooks:</span><span class="badge badge-info">2 Endpoints</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientDrawer',
  props: { client: Object }
}
</script>

<style scoped>
.drawer-backdrop {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6); z-index: 120;
  display: flex; justify-content: flex-end;
}
.drawer-card {
  width: 500px; height: 100%; background: var(--bg-secondary);
  border-left: 1px solid var(--border-color); padding: 24px;
  overflow-y: auto; display: flex; flex-direction: column;
}
.drawer-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
.detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.88rem; }
</style>
