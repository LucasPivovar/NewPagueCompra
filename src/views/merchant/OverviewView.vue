<template>
  <div class="overview-view">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Visão Geral</h2>
        <p>Acompanhe suas movimentações e o desempenho da sua conta.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" @click="$emit('open-pix-modal')">Criar cobrança Pix <Plus size="16" /></button>
        <button class="btn btn-secondary" @click="$router.push('/connections')">Ver documentação da API <ExternalLink size="16" /></button>
      </div>
    </div>

    <!-- KPI Summary Cards -->
    <div class="kpi-grid">
      <!-- Card 1 -->
      <div class="kpi-card">
        <div class="kpi-icon-wrapper blue">
          <Wallet size="20" />
        </div>
        <div class="kpi-content">
          <div class="kpi-label">Saldo disponível <Info size="14" class="info-icon" /></div>
          <div class="kpi-value">R$ 48.750,32</div>
          <div class="kpi-trend positive"><ArrowUp size="12" /> 12,5% <span class="trend-text">em relação a ontem</span></div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="kpi-card">
        <div class="kpi-icon-wrapper green">
          <Clock size="20" />
        </div>
        <div class="kpi-content">
          <div class="kpi-label">Saldo a receber <Info size="14" class="info-icon" /></div>
          <div class="kpi-value">R$ 16.240,80</div>
          <div class="kpi-trend positive"><ArrowUp size="12" /> 8,3% <span class="trend-text">em relação a ontem</span></div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="kpi-card">
        <div class="kpi-icon-wrapper green">
          <Calendar size="20" />
        </div>
        <div class="kpi-content">
          <div class="kpi-label">Recebido no mês <Info size="14" class="info-icon" /></div>
          <div class="kpi-value">R$ 124.560,78</div>
          <div class="kpi-trend positive"><ArrowUp size="12" /> 15,7% <span class="trend-text">em relação ao mês anterior</span></div>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="kpi-card">
        <div class="kpi-icon-wrapper purple">
          <ArrowRightLeft size="20" />
        </div>
        <div class="kpi-content">
          <div class="kpi-label">Transações <Info size="14" class="info-icon" /></div>
          <div class="kpi-value">2.843</div>
          <div class="kpi-trend positive"><ArrowUp size="12" /> 9,2% <span class="trend-text">em relação ao mês anterior</span></div>
        </div>
      </div>

      <!-- Card 5 -->
      <div class="kpi-card">
        <div class="kpi-icon-wrapper green">
          <CheckCircle2 size="20" />
        </div>
        <div class="kpi-content">
          <div class="kpi-label">Pix aprovados <Info size="14" class="info-icon" /></div>
          <div class="kpi-value">2.721</div>
          <div class="kpi-trend positive">95,7% <span class="trend-text">do total</span></div>
        </div>
      </div>

      <!-- Card 6 -->
      <div class="kpi-card">
        <div class="kpi-icon-wrapper orange">
          <Clock3 size="20" />
        </div>
        <div class="kpi-content">
          <div class="kpi-label">Pix pendentes <Info size="14" class="info-icon" /></div>
          <div class="kpi-value">122</div>
          <div class="kpi-trend warning">4,3% <span class="trend-text">do total</span></div>
        </div>
      </div>
    </div>

    <!-- Charts Area -->
    <div class="charts-grid">
      <div class="card chart-card">
        <div class="card-header border-none mb-0">
          <div class="card-title-group">
            <div class="card-title">Volume transacionado <Info size="14" class="info-icon" /></div>
            <div class="chart-value text-blue">R$ 124.560,78</div>
          </div>
          <select class="form-select chart-select">
            <option>Últimos 30 dias</option>
          </select>
        </div>
        <div class="chart-container">
          <canvas id="volumeChart"></canvas>
        </div>
      </div>

      <div class="card chart-card">
        <div class="card-header border-none">
          <div class="card-title">Distribuição das transações <Info size="14" class="info-icon" /></div>
        </div>
        <div class="donut-container">
          <div class="donut-chart-wrapper">
             <canvas id="donutChart"></canvas>
          </div>
          <div class="donut-legend">
            <div class="legend-item">
              <div class="legend-dot green"></div>
              <div class="legend-info">
                <span>Aprovadas</span>
                <strong>2.721 <span class="percent">(95,7%)</span></strong>
              </div>
            </div>
            <div class="legend-item">
              <div class="legend-dot orange"></div>
              <div class="legend-info">
                <span>Pendentes</span>
                <strong>122 <span class="percent">(4,3%)</span></strong>
              </div>
            </div>
            <div class="legend-total mt-3">
              <span>Total</span>
              <strong>2.843</strong>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transactions List -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">Últimas transações <Info size="14" class="info-icon" /></div>
        <a href="#" class="link-blue" @click.prevent="$router.push('/statements')">Ver todas <ChevronRight size="16" /></a>
      </div>
      <div class="table-responsive">
        <table class="table hoverable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Pagador</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tx in recentTransactions" :key="tx.id" class="clickable-row">
              <td class="text-blue">{{ tx.id }}</td>
              <td>{{ tx.payer }}</td>
              <td>R$ {{ tx.value.toFixed(2) }}</td>
              <td>
                <span class="badge" :class="tx.status === 'Aprovado' ? 'badge-success' : 'badge-warning'">
                  <CheckCircle2 size="12" v-if="tx.status === 'Aprovado'" />
                  <Clock3 size="12" v-else />
                  {{ tx.status }}
                </span>
              </td>
              <td>{{ tx.date }}</td>
              <td class="text-right text-muted"><ChevronRight size="16" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { Plus, ExternalLink, Wallet, Info, ArrowUp, Clock, Calendar, ArrowRightLeft, CheckCircle2, Clock3, ChevronRight } from 'lucide-vue-next';
import Chart from 'chart.js/auto';

export default {
  name: 'MerchantOverviewView',
  components: { Plus, ExternalLink, Wallet, Info, ArrowUp, Clock, Calendar, ArrowRightLeft, CheckCircle2, Clock3, ChevronRight },
  data() {
    return {
      recentTransactions: [
        { id: 'PIX-8f3d2e7a1c', payer: 'João da Silva', value: 250.00, status: 'Aprovado', date: '21/05/2025, 10:23' },
        { id: 'PIX-b7a91d3f4e', payer: 'Maria Oliveira', value: 1480.00, status: 'Aprovado', date: '21/05/2025, 09:47' },
        { id: 'PIX-d4c6b2a9e7', payer: 'Empresa ABC Ltda', value: 3250.00, status: 'Aprovado', date: '21/05/2025, 09:15' },
        { id: 'PIX-e98f1a7b2d', payer: 'Carlos Mendes', value: 180.00, status: 'Pendente', date: '21/05/2025, 08:56' },
        { id: 'PIX-a1b2c3d4e5', payer: 'Juliana Costa', value: 520.00, status: 'Aprovado', date: '21/05/2025, 08:34' }
      ],
      volumeChartInstance: null,
      donutChartInstance: null
    }
  },
  mounted() {
    this.initCharts();
  },
  beforeUnmount() {
    if (this.volumeChartInstance) this.volumeChartInstance.destroy();
    if (this.donutChartInstance) this.donutChartInstance.destroy();
  },
  methods: {
    initCharts() {
      // Volume Chart
      const volCtx = document.getElementById('volumeChart').getContext('2d');
      const gradient = volCtx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, 'rgba(29, 97, 242, 0.2)');
      gradient.addColorStop(1, 'rgba(29, 97, 242, 0)');

      this.volumeChartInstance = new Chart(volCtx, {
        type: 'line',
        data: {
          labels: ['21/04', '26/04', '01/05', '06/05', '11/05', '16/05', '21/05'],
          datasets: [{
            label: 'Volume (R$)',
            data: [2000, 4500, 2500, 6000, 4000, 8500, 11000],
            borderColor: '#1D61F2',
            backgroundColor: gradient,
            borderWidth: 2,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#1D61F2',
            pointBorderWidth: 2,
            pointRadius: 4,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { borderDash: [4, 4], color: '#E2E8F0' },
              ticks: {
                callback: function(value) { return 'R$ ' + (value/1000) + 'k'; },
                color: '#94A3B8',
                font: { size: 11 }
              }
            },
            x: {
              grid: { display: false },
              ticks: { color: '#94A3B8', font: { size: 11 } }
            }
          }
        }
      });

      // Donut Chart
      const donutCtx = document.getElementById('donutChart').getContext('2d');
      this.donutChartInstance = new Chart(donutCtx, {
        type: 'doughnut',
        data: {
          labels: ['Aprovadas', 'Pendentes'],
          datasets: [{
            data: [2721, 122],
            backgroundColor: ['#10B981', '#F59E0B'],
            borderWidth: 0,
            cutout: '75%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } }
        }
      });
    }
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
}
.page-title-group h2 { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.page-title-group p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }
.page-header-actions { display: flex; gap: 12px; }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
}
.btn-primary { background: var(--accent-blue); color: white; }
.btn-secondary { background: white; border-color: var(--border-color); color: var(--accent-blue); }

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}
.kpi-card {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  gap: 16px;
  box-shadow: var(--shadow-sm);
}
.kpi-icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.kpi-icon-wrapper.blue { background: var(--accent-blue-light); color: var(--accent-blue); }
.kpi-icon-wrapper.green { background: #ECFDF5; color: #10B981; }
.kpi-icon-wrapper.purple { background: #F3E8FF; color: #8B5CF6; }
.kpi-icon-wrapper.orange { background: #FFFBEB; color: #D97706; }

.kpi-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.kpi-label { font-size: 0.85rem; color: var(--text-secondary); font-weight: 600; display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.info-icon { color: var(--text-muted); }
.kpi-value { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.kpi-trend { font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 4px; }
.kpi-trend.positive { color: var(--accent-green); }
.kpi-trend.warning { color: var(--accent-amber); }
.trend-text { color: var(--text-muted); font-weight: 500; }

.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}
.chart-card {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.border-none { border-bottom: none; margin-bottom: 0; }
.mb-0 { margin-bottom: 0; }
.card-title { font-size: 1.05rem; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 8px; }
.chart-value { font-size: 1.25rem; font-weight: 700; margin-top: 4px; }
.text-blue { color: var(--accent-blue); }
.chart-select { padding: 6px 12px; font-size: 0.8rem; border-radius: var(--radius-md); }

.chart-container {
  height: 240px;
  width: 100%;
  margin-top: 20px;
}

.donut-container {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-top: 20px;
}
.donut-chart-wrapper {
  width: 140px;
  height: 140px;
  position: relative;
  margin: 0 auto;
  flex-shrink: 0;
}
.donut-legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.legend-item { display: flex; gap: 12px; align-items: flex-start; }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; margin-top: 4px; }
.legend-dot.green { background: #10B981; }
.legend-dot.orange { background: #F59E0B; }
.legend-info { display: flex; flex-direction: column; gap: 2px; }
.legend-info span { font-size: 0.8rem; color: var(--text-secondary); }
.legend-info strong { font-size: 0.9rem; color: var(--text-primary); }
.percent { color: var(--text-muted); font-weight: 500; font-size: 0.8rem; }
.legend-total {
  border-top: 1px solid var(--border-color);
  padding-top: 12px;
  display: flex;
  flex-direction: column;
}
.legend-total span { font-size: 0.8rem; color: var(--text-secondary); }
.legend-total strong { font-size: 1.1rem; color: var(--text-primary); }

.link-blue { display: flex; align-items: center; gap: 4px; color: var(--accent-blue); text-decoration: none; font-size: 0.85rem; font-weight: 600; }

.table-responsive { width: 100%; overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; text-align: left; }
.table th { padding: 14px 16px; border-bottom: 1px solid var(--border-color); font-size: 0.8rem; font-weight: 600; color: var(--text-primary); }
.table td { padding: 16px; border-bottom: 1px solid var(--border-color); font-size: 0.85rem; color: var(--text-secondary); }
.hoverable tbody tr:hover { background: var(--bg-primary); cursor: pointer; }
.font-bold { font-weight: 600; }
.text-right { text-align: right; }

.badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
.badge-success { background: #ECFDF5; color: #059669; }
.badge-warning { background: #FFFBEB; color: #D97706; }
</style>
