<template>
  <div class="admin-overview">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Visão Geral</h2>
        <p>Acompanhe o desempenho da plataforma em tempo real.</p>
      </div>
      <div class="page-header-actions">
        <select class="form-select w-auto"><option>Últimos 30 dias</option></select>
        <button class="btn btn-outline-blue"><Download size="16" /> Exportar relatório</button>
      </div>
    </div>

    <!-- 8 KPIs -->
    <div class="kpi-grid-4">
      <div class="kpi-card">
        <div class="kpi-icon-wrapper blue"><Wallet size="20" /></div>
        <div class="kpi-content">
          <div class="kpi-label">Volume transacionado</div>
          <div class="kpi-value">R$ 1.724.560,78</div>
          <div class="kpi-trend positive"><ArrowUp size="12" /> 18,6% <span class="trend-text">em relação ao período anterior</span></div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrapper teal"><Receipt size="20" /></div>
        <div class="kpi-content">
          <div class="kpi-label">Receita em taxas</div>
          <div class="kpi-value">R$ 45.680,32</div>
          <div class="kpi-trend positive"><ArrowUp size="12" /> 16,3% <span class="trend-text">em relação ao período anterior</span></div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrapper blue"><Users size="20" /></div>
        <div class="kpi-content">
          <div class="kpi-label">Clientes ativos</div>
          <div class="kpi-value">1.842</div>
          <div class="kpi-trend positive"><ArrowUp size="12" /> 12,7% <span class="trend-text">em relação ao período anterior</span></div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrapper amber"><ClipboardList size="20" /></div>
        <div class="kpi-content">
          <div class="kpi-label">Cadastros pendentes</div>
          <div class="kpi-value">38</div>
          <div class="kpi-trend warning"><ArrowUp size="12" /> 26,3% <span class="trend-text">em relação ao período anterior</span></div>
        </div>
      </div>
      
      <div class="kpi-card">
        <div class="kpi-icon-wrapper green-outline"><CheckCircle2 size="20" /></div>
        <div class="kpi-content">
          <div class="kpi-label">Pix aprovados</div>
          <div class="kpi-value">18.672</div>
          <div class="kpi-trend positive"><ArrowUp size="12" /> 15,8% <span class="trend-text">em relação ao período anterior</span></div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrapper red-outline"><XCircle size="20" /></div>
        <div class="kpi-content">
          <div class="kpi-label">Pix recusados</div>
          <div class="kpi-value">246</div>
          <div class="kpi-trend danger"><ArrowUp size="12" /> 8,4% <span class="trend-text">em relação ao período anterior</span></div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrapper amber-outline"><CreditCard size="20" /></div>
        <div class="kpi-content">
          <div class="kpi-label">Saques pendentes</div>
          <div class="kpi-value">112</div>
          <div class="kpi-trend warning"><ArrowUp size="12" /> 5,7% <span class="trend-text">em relação ao período anterior</span></div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrapper green-solid"><Wallet size="20" /></div>
        <div class="kpi-content">
          <div class="kpi-label">Saldo total em carteira</div>
          <div class="kpi-value">R$ 1.248.932,45</div>
          <div class="kpi-trend positive"><ArrowUp size="12" /> 9,4% <span class="trend-text">em relação ao período anterior</span></div>
        </div>
      </div>
    </div>

    <!-- Charts & Activity -->
    <div class="dashboard-panels">
      <div class="card panel-chart">
        <div class="card-header border-none mb-0">
          <h3 class="card-title">Volume transacionado</h3>
          <select class="form-select w-auto"><option>Diário</option></select>
        </div>
        <div class="chart-container">
          <canvas id="adminVolumeChart"></canvas>
        </div>
      </div>

      <div class="card panel-donut">
        <div class="card-header border-none mb-0">
          <h3 class="card-title">Distribuição por tipo de transação</h3>
        </div>
        <div class="donut-content mt-2">
          <div class="donut-wrapper"><canvas id="adminDonutChart"></canvas></div>
          <div class="donut-legend-right">
            <div class="legend-row">
              <div class="legend-label"><span class="dot green"></span> Pix</div>
              <div class="legend-pct">75,6%</div>
              <div class="legend-val">R$ 1.303.712,45</div>
            </div>
            <div class="legend-row">
              <div class="legend-label"><span class="dot orange"></span> Saques</div>
              <div class="legend-pct">12,7%</div>
              <div class="legend-val">R$ 219.008,20</div>
            </div>
            <div class="legend-row">
              <div class="legend-label"><span class="dot red"></span> Transferências</div>
              <div class="legend-pct">7,9%</div>
              <div class="legend-val">R$ 136.420,13</div>
            </div>
            <div class="legend-row">
              <div class="legend-label"><span class="dot purple"></span> Outros</div>
              <div class="legend-pct">3,8%</div>
              <div class="legend-val">R$ 65.420,00</div>
            </div>
            <div class="legend-total-row mt-2">
              <div class="legend-label">Total</div>
              <div class="legend-val font-bold">R$ 1.724.560,78</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card panel-activity">
        <div class="card-header border-none mb-0">
          <h3 class="card-title">Atividades recentes</h3>
          <a href="#" class="link-blue text-sm">Ver todas <ChevronRight size="14" /></a>
        </div>
        <div class="activity-list mt-2">
          <div class="activity-item">
            <div class="activity-icon green"><UserPlus size="14" /></div>
            <div class="activity-info">
              <strong>Novo cliente cadastrado</strong>
              <span>Tech Comércio Ltda</span>
            </div>
            <div class="activity-time">21/05/2025, 10:21</div>
          </div>
          <div class="activity-item">
            <div class="activity-icon green"><CheckCircle2 size="14" /></div>
            <div class="activity-info">
              <strong>Pix recebido</strong>
              <span>R$ 2.950,00 de João da Silva</span>
            </div>
            <div class="activity-time">21/05/2025, 10:18</div>
          </div>
          <div class="activity-item">
            <div class="activity-icon orange"><ArrowUpRight size="14" /></div>
            <div class="activity-info">
              <strong>Saque solicitado</strong>
              <span>R$ 5.200,00 por Maria Oliveira</span>
            </div>
            <div class="activity-time">21/05/2025, 10:16</div>
          </div>
          <div class="activity-item">
            <div class="activity-icon red"><AlertCircle size="14" /></div>
            <div class="activity-info">
              <strong>Webhook falhou</strong>
              <span>pix.recebido — Cliente: Loja Exemplo</span>
            </div>
            <div class="activity-time">21/05/2025, 10:15</div>
          </div>
          <div class="activity-item">
            <div class="activity-icon purple"><ArrowRightLeft size="14" /></div>
            <div class="activity-info">
              <strong>Limite alterado</strong>
              <span>Cliente: Empresa ABC Ltda</span>
            </div>
            <div class="activity-time">21/05/2025, 10:12</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Wallet, Receipt, Users, ClipboardList, CheckCircle2, XCircle, CreditCard, ArrowUp, Download, ChevronRight, UserPlus, ArrowUpRight, AlertCircle, ArrowRightLeft } from 'lucide-vue-next';
import Chart from 'chart.js/auto';

export default {
  name: 'AdminOverviewView',
  components: { Wallet, Receipt, Users, ClipboardList, CheckCircle2, XCircle, CreditCard, ArrowUp, Download, ChevronRight, UserPlus, ArrowUpRight, AlertCircle, ArrowRightLeft },
  data() {
    return {
      volumeChart: null,
      donutChart: null
    }
  },
  mounted() {
    this.initCharts();
  },
  beforeUnmount() {
    if (this.volumeChart) this.volumeChart.destroy();
    if (this.donutChart) this.donutChart.destroy();
  },
  methods: {
    initCharts() {
      // Line chart
      const volCtx = document.getElementById('adminVolumeChart').getContext('2d');
      this.volumeChart = new Chart(volCtx, {
        type: 'line',
        data: {
          labels: ['21/04', '26/04', '01/05', '06/05', '11/05', '16/05', '21/05'],
          datasets: [{
            data: [20, 45, 25, 60, 40, 85, 110],
            borderColor: '#005858', backgroundColor: 'rgba(0, 88, 88, 0.1)', borderWidth: 2, fill: true, tension: 0.4,
            pointBackgroundColor: '#fff', pointBorderColor: '#005858', pointRadius: 4
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
          scales: {
            y: { grid: { borderDash: [4, 4] }, ticks: { callback: v => 'R$ '+v+'k', font: { size: 10 } } },
            x: { grid: { display: false }, ticks: { font: { size: 10 } } }
          }
        }
      });

      // Donut chart
      const donutCtx = document.getElementById('adminDonutChart').getContext('2d');
      this.donutChart = new Chart(donutCtx, {
        type: 'doughnut',
        data: {
          labels: ['Pix', 'Saques', 'Transferências', 'Outros'],
          datasets: [{
            data: [75.6, 12.7, 7.9, 3.8],
            backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
            borderWidth: 0, cutout: '75%'
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
      });
    }
  }
}
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; }
.page-title-group h2 { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.page-title-group p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }
.page-header-actions { display: flex; gap: 12px; }

.btn-outline-blue { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1px solid var(--accent-blue-light); border-radius: var(--radius-md); color: var(--accent-blue); background: white; font-weight: 600; font-size: 0.85rem; cursor: pointer; border-color: #BFDBFE; }
.form-select { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.85rem; outline: none; background: white; }
.w-auto { width: auto; }

.kpi-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.kpi-card { background: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px; display: flex; gap: 16px; box-shadow: var(--shadow-sm); }
.kpi-icon-wrapper { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-icon-wrapper.blue { background: var(--accent-blue-light); color: var(--accent-blue); }
.kpi-icon-wrapper.teal { background: #F0FDF4; color: #14B8A6; }
.kpi-icon-wrapper.amber { background: #FFFBEB; color: #D97706; }
.kpi-icon-wrapper.green-outline { background: white; border: 1px solid #10B981; color: #10B981; }
.kpi-icon-wrapper.red-outline { background: white; border: 1px solid #EF4444; color: #EF4444; }
.kpi-icon-wrapper.amber-outline { background: white; border: 1px solid #F59E0B; color: #F59E0B; }
.kpi-icon-wrapper.green-solid { background: #10B981; color: white; }

.kpi-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.kpi-label { font-size: 0.85rem; color: var(--text-secondary); font-weight: 600; margin-bottom: 4px; }
.kpi-value { font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.kpi-trend { font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 4px; }
.kpi-trend.positive { color: var(--accent-green); }
.kpi-trend.warning { color: var(--accent-amber); }
.kpi-trend.danger { color: var(--accent-red); }
.trend-text { color: var(--text-muted); font-weight: 500; }

.dashboard-panels { display: grid; grid-template-columns: 2fr 1.5fr 1.5fr; gap: 16px; }
.card { background: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); padding: 24px; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.border-none { border-bottom: none; }
.mb-0 { margin-bottom: 0; }
.card-title { font-size: 1.05rem; font-weight: 700; color: var(--text-primary); }

.chart-container { height: 220px; width: 100%; margin-top: 16px; }

.donut-content { display: flex; flex-direction: column; gap: 24px; height: 100%; }
.donut-wrapper { height: 140px; margin: 0 auto; width: 100%; display: flex; justify-content: center; }
.donut-legend-right { display: flex; flex-direction: column; gap: 12px; }
.legend-row { display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; }
.legend-label { display: flex; align-items: center; gap: 6px; color: var(--text-secondary); width: 100px; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.green { background: #10B981; }
.dot.orange { background: #F59E0B; }
.dot.red { background: #EF4444; }
.dot.purple { background: #8B5CF6; }
.legend-pct { color: var(--text-muted); width: 40px; text-align: right; }
.legend-val { color: var(--text-primary); font-weight: 600; flex: 1; text-align: right; }
.legend-total-row { display: flex; justify-content: space-between; border-top: 1px solid var(--border-color); padding-top: 12px; font-size: 0.85rem; }
.font-bold { font-weight: 700; }

.activity-list { display: flex; flex-direction: column; gap: 16px; }
.activity-item { display: flex; gap: 12px; align-items: flex-start; }
.activity-icon { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
.activity-icon.green { background: #ECFDF5; color: #10B981; }
.activity-icon.orange { background: #FFFBEB; color: #D97706; }
.activity-icon.red { background: #FEF2F2; color: #EF4444; }
.activity-icon.purple { background: #F3E8FF; color: #8B5CF6; }
.activity-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.activity-info strong { font-size: 0.8rem; color: var(--text-primary); }
.activity-info span { font-size: 0.7rem; color: var(--text-secondary); line-height: 1.3; }
.activity-time { font-size: 0.7rem; color: var(--text-muted); white-space: nowrap; }

.link-blue { display: inline-flex; align-items: center; gap: 4px; color: var(--accent-blue); text-decoration: none; font-size: 0.85rem; font-weight: 600; }
.mt-2 { margin-top: 8px; }
</style>
