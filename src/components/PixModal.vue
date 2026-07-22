<template>
  <div class="modal-backdrop" v-if="show" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-title">Criar cobrança Pix</div>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body">
        <div v-if="!qrGenerated">
          <div style="margin-bottom: 16px;">
            <label class="kpi-label mb-2">Valor da cobrança (R$)</label>
            <input type="number" class="form-input" style="width: 100%; font-size: 1.2rem; font-weight: 700;" v-model="val">
          </div>
          <div style="margin-bottom: 16px;">
            <label class="kpi-label mb-2">Descrição</label>
            <input type="text" class="form-input" style="width: 100%;" v-model="desc" placeholder="Ex: Venda de produto">
          </div>
          <button class="btn btn-primary" style="width: 100%; justify-content: center;" @click="generate">Gerar QR Code Pix</button>
        </div>

        <div v-else style="text-align: center;">
          <div style="width: 180px; height: 180px; background: white; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
            <span style="color: black; font-weight: bold; font-size: 0.9rem;">QR CODE PIX GENERATED</span>
          </div>
          <div class="font-bold mb-2" style="font-size: 1.3rem;">R$ {{ Number(val).toFixed(2) }}</div>
          <p class="text-muted mb-4">Copia e Cola:</p>
          <div style="background: var(--bg-primary); padding: 12px; border-radius: 6px; font-family: monospace; font-size: 0.75rem; word-break: break-all; margin-bottom: 16px;">
            {{ payload }}
          </div>
          <button class="btn btn-primary" style="width: 100%; justify-content: center;" @click="copy">Copiar Código Pix</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PixModal',
  props: { show: Boolean },
  data() {
    return {
      val: 150.00,
      desc: '',
      qrGenerated: false,
      payload: ''
    }
  },
  methods: {
    generate() {
      this.payload = `00020126580014br.gov.bcb.pix0136${Math.random().toString(36).substring(2,15)}520400005303986540${Number(this.val).toFixed(2)}5802BR5920Pague Compra API6009SAO PAULO62070503***6304ABCD`;
      this.qrGenerated = true;
    },
    copy() {
      navigator.clipboard.writeText(this.payload);
      this.$emit('toast', 'Código Pix copiado com sucesso!', 'success');
    }
  }
}
</script>
