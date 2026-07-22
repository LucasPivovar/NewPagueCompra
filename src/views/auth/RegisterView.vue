<template>
  <div class="auth-layout-5050">
    <!-- Lado Azul (Formulário) -->
    <div class="auth-side-blue" style="overflow-y: auto;">
      <div class="brand-top">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#3B82F6"/>
          <path d="M2 17L12 22L22 17" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="brand-name">Pague Compra</span>
      </div>

      <div class="auth-form-container">
        <div class="login-card">
          
          <div class="stepper-header mb-4">
            <div class="step-badge">Etapa {{ currentStep }} de 5</div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" :style="{ width: (currentStep / 5 * 100) + '%' }"></div>
            </div>
          </div>

          <h2>Criar sua conta</h2>
          <p class="auth-subtitle">{{ stepTitles[currentStep - 1] }}</p>

          <form @submit.prevent="nextStep" class="auth-form">
            
            <!-- ETAPA 1: Tipo de Conta -->
            <div v-if="currentStep === 1" class="step-content">
              <div class="type-selector">
                <label class="radio-card" :class="{ active: accountType === 'PF' }">
                  <input type="radio" v-model="accountType" value="PF">
                  <User class="mb-2" size="24" />
                  <span>Para Mim (PF)</span>
                  <small>Usar CPF</small>
                </label>
                <label class="radio-card" :class="{ active: accountType === 'PJ' }">
                  <input type="radio" v-model="accountType" value="PJ">
                  <Building2 class="mb-2" size="24" />
                  <span>Para Empresa (PJ)</span>
                  <small>Usar CNPJ</small>
                </label>
              </div>
            </div>

            <!-- ETAPA 2: Dados Básicos -->
            <div v-if="currentStep === 2" class="step-content">
              <div class="form-group">
                <label>Nome Completo / Razão Social</label>
                <input type="text" placeholder="Nome completo ou Razão Social" required>
              </div>

              <div class="form-group mt-3">
                <label v-if="accountType === 'PF'">CPF</label>
                <label v-else>CNPJ</label>
                <input type="text" v-maska :data-maska="accountType === 'PF' ? '###.###.###-##' : '##.###.###/####-##'" :placeholder="accountType === 'PF' ? '000.000.000-00' : '00.000.000/0001-00'" required>
              </div>
              
              <div class="form-group mt-3">
                <label>Telefone</label>
                <input type="text" v-maska data-maska="(##) #####-####" placeholder="(00) 00000-0000" required>
              </div>
            </div>

            <!-- ETAPA 3: Endereço (Busca Automática) -->
            <div v-if="currentStep === 3" class="step-content">
              <div class="form-row flex-gap">
                <div class="form-group flex-1">
                  <label>CEP</label>
                  <input type="text" v-model="cep" v-maska data-maska="#####-###" placeholder="00000-000" required>
                  <small v-if="isLoadingCep" class="text-blue mt-1">Buscando CEP...</small>
                </div>
                <div class="form-group flex-1">
                  <label>Estado (UF)</label>
                  <select class="form-input" v-model="address.uf" required>
                    <option value="" disabled selected>UF</option>
                    <option v-for="uf in ufs" :key="uf" :value="uf">{{ uf }}</option>
                  </select>
                </div>
              </div>

              <div class="form-group mt-3">
                <label>Endereço</label>
                <input type="text" v-model="address.logradouro" placeholder="Rua, Avenida, etc" required>
              </div>

              <div class="form-row flex-gap mt-3">
                <div class="form-group flex-1">
                  <label>Cidade</label>
                  <input type="text" v-model="address.localidade" placeholder="Cidade" required>
                </div>
                <div class="form-group flex-1">
                  <label>Bairro</label>
                  <input type="text" v-model="address.bairro" placeholder="Bairro" required>
                </div>
              </div>
            </div>

            <!-- ETAPA 4: Acesso -->
            <div v-if="currentStep === 4" class="step-content">
              <div class="form-group">
                <label>E-mail</label>
                <input type="email" placeholder="seu@email.com" required>
              </div>
              
              <div class="form-group mt-3">
                <label>Senha</label>
                <div class="password-input">
                  <input :type="showPassword ? 'text' : 'password'" placeholder="••••••••••••" required>
                  <Eye class="eye-icon" size="18" @click="showPassword = !showPassword" />
                </div>
                <small class="text-muted mt-1 d-block">Mínimo de 8 caracteres, contendo números e letras.</small>
              </div>
            </div>

            <!-- ETAPA 5: Termos e Confirmação -->
            <div v-if="currentStep === 5" class="step-content">
              <div class="confirmation-box">
                <CheckCircle2 size="48" color="#10B981" class="mb-3 mx-auto" />
                <h4 class="text-center font-bold mb-2">Quase lá!</h4>
                <p class="text-center text-muted text-sm mb-4">Verifique se as informações inseridas estão corretas e aceite os termos para finalizar o cadastro.</p>
              </div>

              <label class="checkbox-label mt-2">
                <input type="checkbox" required>
                <span>Li e concordo com os <a href="#" class="link-blue">Termos de Uso</a> e <a href="#" class="link-blue">Política de Privacidade</a> da plataforma.</span>
              </label>
            </div>

            <div class="form-actions mt-4 flex-gap">
              <button type="button" v-if="currentStep > 1" class="btn btn-outline-blue flex-1" @click="currentStep--">Voltar</button>
              
              <button type="submit" v-if="currentStep < 5" class="btn btn-primary flex-1">Continuar <ArrowRight size="16" class="ml-2"/></button>
              <button type="button" v-if="currentStep === 5" class="btn btn-primary flex-1" @click="handleRegister">Finalizar Cadastro <Check size="16" class="ml-2"/></button>
            </div>
          </form>

          <p class="auth-footer-text">
            Já tem uma conta? <a href="#" class="link-blue" @click.prevent="$router.push('/auth/login')">Fazer login</a>
          </p>
        </div>
      </div>
    </div>

    <!-- Lado Branco (Conteúdo) -->
    <div class="auth-side-white">
      <div class="info-section">
        <div class="info-illustration">
          <div class="mockup-window">
            <div class="mockup-header"><span></span><span></span><span></span></div>
            <div class="mockup-body">
              <div class="mockup-chart"></div>
              <div class="mockup-bars"><span></span><span></span><span></span></div>
            </div>
            <div class="mockup-mail-icon"><CheckCircle2 size="20" color="white" /></div>
          </div>
        </div>
        
        <h3>Cadastre-se e acesse o painel imediatamente</h3>
        <ul class="feature-list">
          <li><CheckCircle2 size="16" class="check-icon" /> Ativação de conta instantânea</li>
          <li><CheckCircle2 size="16" class="check-icon" /> Teste no ambiente Sandbox grátis</li>
          <li><CheckCircle2 size="16" class="check-icon" /> Taxas transparentes e flexíveis</li>
          <li><CheckCircle2 size="16" class="check-icon" /> Saques automáticos via Pix</li>
        </ul>

        <div class="security-badge">
          <ShieldCheck size="24" class="shield-icon" />
          <div>
            <strong>100% Seguro e Confiável</strong>
            <p>Os dados inseridos são criptografados de ponta a ponta em nossos servidores.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Eye, CheckCircle2, ShieldCheck, User, Building2, ArrowRight, Check } from 'lucide-vue-next';
import { vMaska } from "maska/vue"

export default {
  name: 'RegisterView',
  components: { Eye, CheckCircle2, ShieldCheck, User, Building2, ArrowRight, Check },
  directives: { maska: vMaska },
  data() {
    return {
      currentStep: 1,
      stepTitles: [
        'Selecione o tipo de conta que deseja abrir.',
        'Insira seus dados ou os dados da sua empresa.',
        'Preencha o endereço completo.',
        'Crie suas credenciais de acesso.',
        'Aceite os termos para concluir.'
      ],
      showPassword: false,
      accountType: 'PJ', 
      phoneMask: { mask: "(##) #####-####" },
      cepMask: { mask: "#####-###" },
      cep: '',
      isLoadingCep: false,
      address: {
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: ''
      },
      ufs: ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
    }
  },
  computed: {
    documentMask() {
      return this.accountType === 'PF' 
        ? { mask: "###.###.###-##" } 
        : { mask: "##.###.###/####-##" }
    }
  },
  watch: {
    cep(newVal) {
      const cleanCep = newVal.replace(/\D/g, '');
      if (cleanCep.length === 8) {
        this.fetchAddress(cleanCep);
      }
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep < 5) {
        this.currentStep++;
      }
    },
    handleRegister() {
      this.$router.push('/dashboard');
    },
    async fetchAddress(cleanCep) {
      this.isLoadingCep = true;
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          this.address.logradouro = data.logradouro;
          this.address.bairro = data.bairro;
          this.address.localidade = data.localidade;
          this.address.uf = data.uf;
        } else {
          this.$emit('toast', 'CEP não encontrado', 'error');
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      } finally {
        this.isLoadingCep = false;
      }
    }
  }
}
</script>

<style scoped>
.auth-layout-5050 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

/* Lado Azul */
.auth-side-blue {
  background-color: #03102C;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 40px;
}

.brand-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.brand-name { color: white; font-size: 1.25rem; font-weight: 700; }

.auth-form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.login-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  padding: 40px;
  width: 100%;
  max-width: 500px;
}

/* Stepper progress */
.stepper-header { margin-bottom: 24px; }
.step-badge {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--accent-blue);
  margin-bottom: 8px;
}
.progress-bar-bg {
  width: 100%;
  height: 6px;
  background: #E2E8F0;
  border-radius: 3px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: var(--accent-blue);
  transition: width 0.3s ease;
}

.login-card h2 { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
.auth-subtitle { color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 24px; }

.auth-form { display: flex; flex-direction: column; gap: 8px; }

.type-selector {
  display: flex;
  gap: 12px;
}
.radio-card {
  flex: 1;
  padding: 24px 12px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
  color: var(--text-secondary);
}
.radio-card input { display: none; }
.radio-card span { font-size: 0.95rem; font-weight: 700; margin-bottom: 4px; color: var(--text-primary); }
.radio-card small { font-size: 0.75rem; color: var(--text-muted); }

.radio-card.active {
  border-color: var(--accent-blue);
  background: #EFF6FF;
}
.radio-card.active svg { color: var(--accent-blue); }

.form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; }
.form-input, .form-group input:not([type="checkbox"]):not([type="radio"]) {
  width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.95rem; outline: none; transition: all 0.2s;
}
.form-input:focus, .form-group input:not([type="checkbox"]):not([type="radio"]):focus {
  border-color: var(--accent-blue); box-shadow: 0 0 0 3px var(--accent-blue-light);
}

.password-input { position: relative; }
.eye-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); cursor: pointer; }

.flex-gap { display: flex; gap: 16px; }
.flex-1 { flex: 1; display: flex; justify-content: center; align-items: center; }
.form-group.flex-1 { display: block; } /* reset form flex */

.checkbox-label { display: flex; align-items: flex-start; gap: 8px; font-size: 0.85rem; color: var(--text-secondary); cursor: pointer; line-height: 1.4; }
.checkbox-label input { width: 16px; height: 16px; margin-top: 2px; accent-color: var(--accent-blue); }

.link-blue { color: var(--accent-blue); font-size: 0.85rem; font-weight: 600; text-decoration: none; }
.link-blue:hover { text-decoration: underline; }

.btn { padding: 12px 24px; font-weight: 600; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; }
.ml-2 { margin-left: 8px; }
.mt-1 { margin-top: 4px; }
.mt-2 { margin-top: 8px; }
.mt-3 { margin-top: 16px; }
.mt-4 { margin-top: 24px; }
.mb-2 { margin-bottom: 8px; }
.mb-3 { margin-bottom: 16px; }
.mb-4 { margin-bottom: 24px; }
.mx-auto { margin-left: auto; margin-right: auto; }
.text-center { text-align: center; }
.font-bold { font-weight: 700; }
.text-blue { color: var(--accent-blue); font-size: 0.75rem; }
.d-block { display: block; }
.text-muted { color: var(--text-muted); }
.text-sm { font-size: 0.85rem; }

.auth-footer-text { text-align: center; margin-top: 30px; font-size: 0.9rem; color: var(--text-secondary); }

/* Lado Branco */
.auth-side-white {
  background-color: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.info-section { max-width: 440px; width: 100%; }
.info-section h3 { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 24px; line-height: 1.3; }

.feature-list { list-style: none; padding: 0; margin: 0 0 40px 0; }
.feature-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.4; }
.check-icon { color: #10B981; flex-shrink: 0; margin-top: 2px; }

.security-badge { display: flex; gap: 16px; align-items: flex-start; background: white; padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
.shield-icon { color: var(--accent-blue); flex-shrink: 0; }
.security-badge strong { font-size: 0.9rem; color: var(--text-primary); display: block; margin-bottom: 4px; }
.security-badge p { font-size: 0.8rem; color: var(--text-muted); margin: 0; line-height: 1.4; }

/* Abstract Mockup Illustration */
.info-illustration { margin-bottom: 50px; position: relative; width: 260px; }
.mockup-window { background: white; border: 1px solid var(--border-color); border-radius: 16px; height: 180px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); position: relative; overflow: visible; }
.mockup-header { height: 32px; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; padding: 0 16px; gap: 6px; }
.mockup-header span { width: 8px; height: 8px; border-radius: 50%; background: #E2E8F0; }
.mockup-header span:nth-child(1) { background: #E2E8F0; }
.mockup-body { padding: 24px; display: flex; align-items: flex-end; justify-content: space-between; height: calc(100% - 32px); }
.mockup-chart { width: 48px; height: 48px; border: 6px solid #10B981; border-right-color: transparent; border-radius: 50%; transform: rotate(45deg); }
.mockup-bars { display: flex; gap: 8px; align-items: flex-end; height: 100%; flex: 1; margin-left: 24px; }
.mockup-bars span { width: 14px; background: #E2E8F0; border-radius: 3px 3px 0 0; }
.mockup-bars span:nth-child(1) { height: 40%; }
.mockup-bars span:nth-child(2) { height: 70%; background: var(--accent-blue-light); }
.mockup-bars span:nth-child(3) { height: 100%; background: var(--accent-blue); }
.mockup-mail-icon { position: absolute; right: -20px; bottom: 20px; background: var(--accent-blue); width: 54px; height: 54px; border-radius: 14px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(29, 97, 242, 0.3); }

@media (max-width: 900px) {
  .auth-layout-5050 { grid-template-columns: 1fr; }
  .auth-side-white { display: none; }
}
</style>
