/* ==========================================================================
   PAGUE COMPRA SEGURA - API SERVICE LAYER (Ready for Backend Integration)
   ========================================================================== */

export const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'https://api.paguecompra.com.br/v1';

export const apiService = {
  // --- Merchant Data ---
  async getDashboardMetrics() {
    return {
      saldoDisponivel: 48750.32,
      saldoBloqueado: 5320.10,
      saldoAReceber: 16240.80,
      recebidoNoMes: 124560.78,
      totalSacado: 124560.78,
      transacoesTotal: 2843,
      pixAprovadosCount: 2721,
      pixPendentesCount: 122
    };
  },

  async getTransactions(filters = {}) {
    console.log('Fetching transactions with filters:', filters);
    return [
      { id: 'PIX-8f3d2e7a1c', payer: 'João da Silva', value: 250.00, fee: 2.50, netValue: 247.50, status: 'Aprovado', date: '21/05/2025, 10:23', type: 'Entrada' },
      { id: 'SAC-a91b3c4d5e', payer: 'Saque para conta bancária', value: 2500.00, fee: 6.50, netValue: 2493.50, status: 'Concluído', date: '21/05/2025, 09:47', type: 'Saída' },
      { id: 'PIX-d4c6b2a9e7', payer: 'Empresa ABC Ltda', value: 3250.00, fee: 13.00, netValue: 3237.00, status: 'Aprovado', date: '21/05/2025, 09:15', type: 'Entrada' },
      { id: 'PIX-e98f1a7b2d', payer: 'Carlos Mendes', value: 180.00, fee: 1.80, netValue: 178.20, status: 'Pendente', date: '21/05/2025, 08:56', type: 'Entrada' },
      { id: 'PIX-a1b2c3d4e5', payer: 'Juliana Costa', value: 520.00, fee: 5.20, netValue: 514.80, status: 'Aprovado', date: '21/05/2025, 08:34', type: 'Entrada' }
    ];
  },

  async createPixCharge(chargeData) {
    const payload = `00020126580014br.gov.bcb.pix0136${Math.random().toString(36).substring(2, 15)}520400005303986540${Number(chargeData.value).toFixed(2)}5802BR5920Pague Compra API6009SAO PAULO62070503***6304ABCD`;
    return {
      id: `PIX-${Math.random().toString(36).substring(2, 10)}`,
      value: chargeData.value,
      description: chargeData.description,
      payload,
      status: 'PENDING',
      expiresIn: 600
    };
  },

  async requestWithdrawal(withdrawData) {
    return {
      success: true,
      transactionId: `SAC-${Math.random().toString(36).substring(2, 10)}`,
      netAmount: Math.max(0, withdrawData.amount - 6.50),
      timestamp: new Date().toISOString()
    };
  },

  // --- API & Webhook Simulation ---
  async triggerTestWebhook(event) {
    return {
      status: 200,
      event,
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      payload: {
        event_type: event,
        data: { charge_id: 'PIX-8f3d2e7a1c', amount: 250.00, status: 'PAID' }
      }
    };
  },

  // --- Backoffice Compliance KYC ---
  async getKycQueue() {
    return [
      {
        id: 'ANA-25-000123',
        applicantName: 'ACME Soluções Ltda.',
        applicantType: 'KYB (Pessoa Jurídica)',
        documentNumber: 'CNPJ: 12.345.678/0001-90',
        requestedDate: '21/05/2025 09:41',
        riskLevel: 'Média',
        status: 'Pendente',
        documents: ['Contrato Social (Válido)', 'Comprovante Endereço (Válido)', 'Doc Representante (Válido)'],
        selfieUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 'ANA-25-000122',
        applicantName: 'João da Silva',
        applicantType: 'KYC (Pessoa Física)',
        documentNumber: 'CPF: 123.456.789-09',
        requestedDate: '21/05/2025 08:15',
        riskLevel: 'Baixa',
        status: 'Em análise',
        documents: ['Documento Identidade (Válido)', 'Comprovante Endereço (Válido)'],
        selfieUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      }
    ];
  }
};
