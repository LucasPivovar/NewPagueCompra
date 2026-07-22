<template>
  <div class="account-view">
    <div class="page-header">
      <div class="page-title-group">
        <h2>Minha Conta</h2>
        <p>Gerencie suas informações, segurança e preferências.</p>
      </div>
    </div>

    <!-- Tabs Desktop -->
    <div class="tabs desktop-tabs">
      <div class="tab" :class="{ active: currentTab === 'Dados pessoais' }" @click="currentTab = 'Dados pessoais'">Dados pessoais</div>
      <div class="tab" :class="{ active: currentTab === 'Dados da empresa' }" @click="currentTab = 'Dados da empresa'">Dados da empresa</div>
      <div class="tab" :class="{ active: currentTab === 'Documentos' }" @click="currentTab = 'Documentos'">Documentos</div>
      <div class="tab" :class="{ active: currentTab === 'Segurança' }" @click="currentTab = 'Segurança'">Segurança</div>
      <div class="tab" :class="{ active: currentTab === 'Notificações' }" @click="currentTab = 'Notificações'">Notificações</div>
      <div class="tab" :class="{ active: currentTab === 'Taxas e limites' }" @click="currentTab = 'Taxas e limites'">Taxas e limites</div>
    </div>

    <!-- Tabs Mobile (Select) -->
    <div class="mobile-tabs mt-4">
      <select class="form-input" v-model="currentTab" style="width: 100%; font-weight: 600;">
        <option value="Dados pessoais">Dados pessoais</option>
        <option value="Dados da empresa">Dados da empresa</option>
        <option value="Documentos">Documentos</option>
        <option value="Segurança">Segurança</option>
        <option value="Notificações">Notificações</option>
        <option value="Taxas e limites">Taxas e limites</option>
      </select>
    </div>

    <!-- Tab Content -->
    <div v-if="currentTab === 'Dados pessoais'" class="account-grid mt-4">
      <!-- Profile Info Column -->
      <div class="card account-card">
        <div class="card-body pb-0">
          <div class="info-group">
            <span class="info-label">Nome completo</span>
            <span class="info-value">André Cardoso</span>
          </div>
          <div class="info-group">
            <span class="info-label">E-mail</span>
            <span class="info-value">andre.cardoso@email.com</span>
          </div>
          <div class="info-group">
            <span class="info-label">Telefone</span>
            <span class="info-value">(11) 98765-4321</span>
          </div>
          <div class="info-group">
            <span class="info-label">Cargo</span>
            <span class="info-value">Desenvolvedor</span>
          </div>
        </div>
        
        <div class="help-banner mt-4">
          <div class="help-header">
            <Headphones class="help-icon" size="20" />
            <div>
              <h4>Precisa de ajuda?</h4>
              <p>Nossa equipe está pronta para te atender.</p>
            </div>
          </div>
          <button class="btn-help-outline text-white mt-2" @click="showToast('Abertura de ticket em desenvolvimento')">Abrir atendimento <ExternalLink size="14" /></button>
        </div>

        <div class="card-footer">
          <button class="btn btn-outline-blue btn-block" @click="currentTab = 'Dados da empresa'">Editar dados <ExternalLink size="14" /></button>
        </div>
      </div>

      <!-- Documents Column -->
      <div class="card account-card">
        <div class="card-body">
          <h3>Documentos</h3>
          <p class="text-muted mb-4">Atualize seus documentos para manter sua conta em conformidade.</p>

          <div class="doc-list">
            <div class="doc-item">
              <div class="doc-icon blue"><FileText size="16" /></div>
              <div class="doc-details">
                <strong>CPF</strong>
                <span>123.456.789-10</span>
              </div>
              <span class="badge badge-success-light">Aprovado</span>
            </div>
            
            <div class="doc-item">
              <div class="doc-icon blue"><FileText size="16" /></div>
              <div class="doc-details">
                <strong>RG</strong>
                <span>MG-12.345.678</span>
              </div>
              <span class="badge badge-success-light">Aprovado</span>
            </div>

            <div class="doc-item">
              <div class="doc-icon blue"><FileText size="16" /></div>
              <div class="doc-details">
                <strong>Comprovante de endereço</strong>
                <span>Atualizado em 15/05/2025</span>
              </div>
              <span class="badge badge-success-light">Aprovado</span>
            </div>

            <div class="doc-item">
              <div class="doc-icon blue"><FileText size="16" /></div>
              <div class="doc-details">
                <strong>Contrato social</strong>
                <span>Empresa ABC Ltda</span>
              </div>
              <span class="badge badge-success-light">Aprovado</span>
            </div>

            <div class="doc-item">
              <div class="doc-icon outline"><FileText size="16" /></div>
              <div class="doc-details">
                <strong>Procuração <span class="text-muted">(opcional)</span></strong>
                <span>Não enviado</span>
              </div>
              <span class="badge badge-warning-light">Pendente</span>
            </div>
          </div>
        </div>
        <div class="card-footer mt-auto">
          <button class="btn btn-outline-blue btn-block" @click="currentTab = 'Documentos'">Gerenciar documentos <ExternalLink size="14" /></button>
        </div>
      </div>

      <!-- Security Column -->
      <div class="card account-card">
        <div class="card-body">
          <h3>Segurança</h3>
          <p class="text-muted mb-4">Proteja sua conta com boas práticas de segurança.</p>

          <div class="security-list">
            <div class="security-item">
              <div class="security-icon"><Lock size="18" /></div>
              <div class="security-details">
                <strong>Senha</strong>
                <span class="password-dots">••••••••</span>
              </div>
              <a href="#" class="link-blue text-sm" @click.prevent="currentTab = 'Segurança'">Alterar</a>
            </div>

            <div class="security-item">
              <div class="security-icon"><ShieldCheck size="18" /></div>
              <div class="security-details">
                <strong>Autenticação em dois fatores</strong>
                <span class="text-green font-medium">Ativada</span>
              </div>
              <a href="#" class="link-blue text-sm" @click.prevent="currentTab = 'Segurança'">Gerenciar</a>
            </div>

            <div class="security-item">
              <div class="security-icon"><MonitorSmartphone size="18" /></div>
              <div class="security-details">
                <strong>Sessões ativas</strong>
                <span>2 sessões ativas</span>
              </div>
              <a href="#" class="link-blue text-sm" @click.prevent="currentTab = 'Segurança'">Gerenciar</a>
            </div>
          </div>
        </div>
        <div class="card-footer mt-auto">
          <button class="btn btn-outline-blue btn-block" @click="currentTab = 'Segurança'">Ver atividades de segurança <ExternalLink size="14" /></button>
        </div>
      </div>
    </div>

    <!-- Empty State for other tabs removed. Populating tabs: -->
    
    <!-- Dados da empresa -->
    <div v-else-if="currentTab === 'Dados da empresa'" class="card mt-4">
      <div class="card-body">
        <h3>Informações da Empresa</h3>
        <p class="text-muted mb-4">Atualize os dados da sua empresa.</p>
        
        <div class="form-grid-2">
          <div class="form-group">
            <label>Razão Social</label>
            <input type="text" class="form-input" value="Pague Compra Soluções Financeiras Ltda" disabled>
          </div>
          <div class="form-group">
            <label>Nome Fantasia</label>
            <input type="text" class="form-input" value="Pague Compra">
          </div>
          <div class="form-group">
            <label>CNPJ</label>
            <input type="text" class="form-input" v-maska data-maska="##.###.###/####-##" value="12.345.678/0001-90" disabled>
          </div>
          <div class="form-group">
            <label>Inscrição Estadual</label>
            <input type="text" class="form-input" value="Isento">
          </div>
        </div>

        <h3 class="mt-4">Endereço</h3>
        <div class="form-grid-2 mt-2">
          <div class="form-group">
            <label>CEP</label>
            <input type="text" class="form-input" v-maska data-maska="#####-###" v-model="address.cep" @blur="fetchCep">
          </div>
          <div class="form-group">
            <label>Endereço</label>
            <input type="text" class="form-input" v-model="address.logradouro">
          </div>
          <div class="form-group">
            <label>Número</label>
            <input type="text" class="form-input" v-model="address.numero">
          </div>
          <div class="form-group">
            <label>Complemento</label>
            <input type="text" class="form-input" v-model="address.complemento">
          </div>
          <div class="form-group">
            <label>Bairro</label>
            <input type="text" class="form-input" v-model="address.bairro">
          </div>
          <div class="form-group">
            <label>Cidade</label>
            <input type="text" class="form-input" v-model="address.cidade">
          </div>
          <div class="form-group">
            <label>Estado</label>
            <input type="text" class="form-input" v-model="address.estado">
          </div>
        </div>
        <button class="btn btn-primary mt-4" @click="showToast('Dados salvos com sucesso!')">Salvar alterações</button>
      </div>
    </div>

    <!-- Documentos -->
    <div v-else-if="currentTab === 'Documentos'" class="card mt-4">
      <div class="card-body">
        <h3>Meus Documentos</h3>
        <p class="text-muted mb-4">Gerencie os documentos necessários para validação da sua conta.</p>
        
        <div class="doc-list-full">
          <div class="doc-item-full">
            <div class="doc-icon blue"><FileText size="20" /></div>
            <div class="doc-details-full">
              <strong>Contrato Social</strong>
              <span>Enviado em 12/05/2025</span>
            </div>
            <span class="badge badge-success-light">Aprovado</span>
            <button class="btn btn-outline-blue ml-auto" @click="showToast('Visualização de documento em desenvolvimento')">Visualizar</button>
          </div>

          <div class="doc-item-full">
            <div class="doc-icon blue"><FileText size="20" /></div>
            <div class="doc-details-full">
              <strong>Comprovante de Endereço</strong>
              <span>Enviado em 15/05/2025</span>
            </div>
            <span class="badge badge-success-light">Aprovado</span>
            <button class="btn btn-outline-blue ml-auto" @click="showToast('Visualização de documento em desenvolvimento')">Visualizar</button>
          </div>
          
          <div class="doc-item-full">
            <div class="doc-icon outline"><FileText size="20" /></div>
            <div class="doc-details-full">
              <strong>Procuração (Opcional)</strong>
              <span>Não enviado</span>
            </div>
            <span class="badge badge-warning-light">Pendente</span>
            <button class="btn btn-primary ml-auto" @click="showToast('Upload de arquivo em desenvolvimento')">Enviar arquivo</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Segurança -->
    <div v-else-if="currentTab === 'Segurança'" class="card mt-4">
      <div class="card-body">
        <h3>Segurança da Conta</h3>
        <p class="text-muted mb-4">Gerencie senhas e métodos de autenticação.</p>
        
        <div class="security-list-full">
          <div class="security-item-full">
            <div>
              <strong>Alterar Senha</strong>
              <p class="text-muted text-sm mt-1">Sua senha foi alterada pela última vez há 3 meses.</p>
            </div>
            <button class="btn btn-outline-blue" @click="showToast('Alteração de senha em desenvolvimento')">Alterar senha</button>
          </div>

          <div class="security-item-full mt-4 border-top pt-4">
            <div>
              <strong>Autenticação em 2 Fatores (2FA)</strong>
              <p class="text-muted text-sm mt-1">Proteja sua conta com uma camada extra de segurança.</p>
              <span class="badge badge-success-light mt-2">Ativado</span>
            </div>
            <button class="btn btn-outline-red" @click="showToast('Desativação 2FA em desenvolvimento')">Desativar 2FA</button>
          </div>

          <div class="security-item-full mt-4 border-top pt-4">
            <div>
              <strong>Sessões Ativas</strong>
              <p class="text-muted text-sm mt-1">Revise os dispositivos conectados à sua conta.</p>
            </div>
            <button class="btn btn-outline-blue" @click="showToast('Visualização de sessões em desenvolvimento')">Ver dispositivos</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notificações -->
    <div v-else-if="currentTab === 'Notificações'" class="card mt-4">
      <div class="card-body">
        <h3>Preferências de Notificação</h3>
        <p class="text-muted mb-4">Escolha quais avisos você deseja receber no seu e-mail.</p>
        
        <div class="notification-settings">
          <label class="notification-switch">
            <div class="switch-info">
              <strong>Recebimentos Pix</strong>
              <span>Notificar a cada Pix recebido com sucesso.</span>
            </div>
            <input type="checkbox" checked class="toggle-checkbox">
          </label>

          <label class="notification-switch">
            <div class="switch-info">
              <strong>Saques realizados</strong>
              <span>Notificar quando um saque for solicitado ou concluído.</span>
            </div>
            <input type="checkbox" checked class="toggle-checkbox">
          </label>

          <label class="notification-switch">
            <div class="switch-info">
              <strong>Relatórios Diários</strong>
              <span>Receber um resumo financeiro diário por e-mail.</span>
            </div>
            <input type="checkbox" class="toggle-checkbox">
          </label>
        </div>
        <button class="btn btn-primary mt-4" @click="showToast('Preferências salvas com sucesso!')">Salvar preferências</button>
      </div>
    </div>

    <!-- Taxas e Limites -->
    <div v-else-if="currentTab === 'Taxas e limites'" class="card mt-4">
      <div class="card-body">
        <h3>Taxas e Limites</h3>
        <p class="text-muted mb-4">Confira suas condições comerciais atuais.</p>
        
        <div class="rates-grid">
          <div class="rate-card">
            <h4>Taxa Pix In</h4>
            <div class="rate-value">0,99%</div>
            <span class="text-muted text-sm">Por transação recebida</span>
          </div>

          <div class="rate-card">
            <h4>Taxa Pix Out / Saque</h4>
            <div class="rate-value">R$ 1,50</div>
            <span class="text-muted text-sm">Fixo por transação</span>
          </div>
          
          <div class="rate-card">
            <h4>Limite de Saque Diário</h4>
            <div class="rate-value">R$ 50.000,00</div>
            <span class="text-muted text-sm">Consulte nosso suporte para aumentar</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ExternalLink, Headphones, FileText, Lock, ShieldCheck, MonitorSmartphone } from 'lucide-vue-next';
import { vMaska } from "maska/vue";

export default {
  name: 'MerchantAccountView',
  components: { ExternalLink, Headphones, FileText, Lock, ShieldCheck, MonitorSmartphone },
  directives: { maska: vMaska },
  data() {
    return {
      currentTab: 'Dados pessoais',
      address: {
        cep: '01310-100',
        logradouro: 'Av. Paulista',
        numero: '1000',
        complemento: 'Conj. 123',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP'
      }
    }
  },
  methods: {
    showToast(msg) {
      alert(msg); // Placeholder for a global toast later
    },
    async fetchCep() {
      const cepClean = this.address.cep.replace(/\D/g, '');
      if (cepClean.length === 8) {
        try {
          const res = await fetch(`https://viacep.com.br/ws/${cepClean}/json/`);
          const data = await res.json();
          if (!data.erro) {
            this.address.logradouro = data.logradouro;
            this.address.bairro = data.bairro;
            this.address.cidade = data.localidade;
            this.address.estado = data.uf;
          }
        } catch(e) {
          console.error("Erro ao buscar CEP", e);
        }
      }
    }
  }
}
</script>

<style scoped>
.page-header { margin-bottom: 16px; }
.page-title-group h2 { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.page-title-group p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }

.tabs { display: flex; border-bottom: 1px solid var(--border-color); gap: 24px; }
.tab { padding: 12px 4px; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; border-bottom: 2px solid transparent; }
.tab.active { color: var(--accent-blue); border-bottom-color: var(--accent-blue); }

.mt-4 { margin-top: 24px; }
.mb-4 { margin-bottom: 24px; }
.pb-0 { padding-bottom: 0; }
.mt-2 { margin-top: 8px; }
.mt-auto { margin-top: auto; }

.account-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: stretch; }
.card { background: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; }
.card-body { padding: 24px; flex: 1; }
.card-body h3 { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.text-muted { color: var(--text-muted); }
.text-sm { font-size: 0.8rem; }
.font-medium { font-weight: 500; }
.text-green { color: var(--accent-green); }

.info-group { display: flex; flex-direction: column; gap: 4px; margin-bottom: 20px; }
.info-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }
.info-value { font-size: 0.95rem; font-weight: 600; color: var(--text-primary); }

.help-banner { background: #03102C; border-radius: var(--radius-md); padding: 20px; margin: 0 24px 24px 24px; display: flex; flex-direction: column; }
.help-header { display: flex; align-items: flex-start; gap: 12px; }
.help-icon { color: white; opacity: 0.5; margin-top: 2px; }
.help-header h4 { color: white; font-size: 0.9rem; font-weight: 600; margin-bottom: 4px; }
.help-header p { color: #94A3B8; font-size: 0.75rem; line-height: 1.3; }
.btn-help-outline { background: transparent; border: 1px solid rgba(255,255,255,0.2); border-radius: var(--radius-md); padding: 8px 12px; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: space-between; }
.text-white { color: white; }

.card-footer { padding: 20px 24px; border-top: 1px solid var(--border-color); }
.btn-outline-blue { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 16px; border-radius: var(--radius-md); font-size: 0.85rem; font-weight: 600; cursor: pointer; background: transparent; border: 1px solid #BFDBFE; color: var(--accent-blue); }
.btn-block { width: 100%; }

.doc-list { display: flex; flex-direction: column; gap: 16px; }
.doc-item { display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid var(--border-color); border-radius: var(--radius-md); }
.doc-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.doc-icon.blue { background: var(--accent-blue-light); color: var(--accent-blue); }
.doc-icon.outline { background: white; border: 1px solid var(--border-color); color: var(--text-muted); }
.doc-details { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.doc-details strong { font-size: 0.85rem; color: var(--text-primary); }
.doc-details span { font-size: 0.7rem; color: var(--text-muted); }
.badge { display: inline-flex; align-items: center; padding: 4px 8px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; }
.badge-success-light { background: #ECFDF5; color: #10B981; border: 1px solid #A7F3D0; }
.badge-warning-light { background: #FFFBEB; color: #D97706; border: 1px solid #FDE68A; }

.security-list { display: flex; flex-direction: column; gap: 16px; }
.security-item { display: flex; align-items: center; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color); }
.security-item:last-child { border-bottom: none; padding-bottom: 0; }
.security-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); background: #F8FAFC; border-radius: 8px; }
.security-details { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.security-details strong { font-size: 0.9rem; color: var(--text-primary); }
.security-details span { font-size: 0.8rem; color: var(--text-secondary); }
.password-dots { font-size: 1rem !important; letter-spacing: 2px; line-height: 0.8; margin-top: 4px; }
.link-blue { color: var(--accent-blue); text-decoration: none; font-weight: 600; }

/* New Tab Styles */
.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.form-input { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; outline: none; }
.form-input:disabled { background-color: var(--bg-secondary); color: var(--text-muted); cursor: not-allowed; }
.btn-primary { background: var(--accent-blue); color: white; border: none; padding: 10px 20px; border-radius: var(--radius-md); font-size: 0.9rem; font-weight: 600; cursor: pointer; }
.btn-outline-red { background: transparent; border: 1px solid #FECACA; color: var(--accent-red); padding: 8px 16px; border-radius: var(--radius-md); font-size: 0.85rem; font-weight: 600; cursor: pointer; }

.doc-list-full { display: flex; flex-direction: column; gap: 16px; }
.doc-item-full { display: flex; align-items: center; gap: 16px; padding: 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); }
.doc-details-full { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.ml-auto { margin-left: auto; }

.security-list-full { display: flex; flex-direction: column; }
.security-item-full { display: flex; align-items: center; justify-content: space-between; }
.border-top { border-top: 1px solid var(--border-color); }
.pt-4 { padding-top: 24px; }

.notification-settings { display: flex; flex-direction: column; gap: 24px; }
.notification-switch { display: flex; align-items: center; justify-content: space-between; cursor: pointer; }
.switch-info { display: flex; flex-direction: column; gap: 4px; }
.toggle-checkbox { width: 44px; height: 24px; appearance: none; background: var(--border-color); border-radius: 12px; position: relative; cursor: pointer; transition: 0.3s; }
.toggle-checkbox::before { content: ''; position: absolute; width: 20px; height: 20px; border-radius: 50%; background: white; top: 2px; left: 2px; transition: 0.3s; }
.toggle-checkbox:checked { background: var(--accent-blue); }
.toggle-checkbox:checked::before { transform: translateX(20px); }

.rates-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.rate-card { padding: 20px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: #F8FAFC; }
.rate-card h4 { font-size: 0.85rem; color: var(--text-primary); margin-bottom: 8px; font-weight: 600; }
.rate-value { font-size: 1.5rem; font-weight: 700; color: var(--accent-blue); margin-bottom: 8px; }
</style>
