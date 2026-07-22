<template>
  <div class="auth-layout-5050">
    <!-- Lado Azul (Formulário) -->
    <div class="auth-side-blue">
      <div class="brand-top">
        <img src="/download.png" alt="Pague Compra" style="height: 52px; width: auto;" />
      </div>

      <div class="auth-form-container">
        <div class="login-card">
          <div class="back-link mb-6">
            <a href="#" @click.prevent="$router.push('/auth/login')" class="link-muted">
              <ArrowLeft size="16" /> Voltar para o login
            </a>
          </div>

          <h2>Esqueceu a senha?</h2>
          <p class="auth-subtitle">Informe seu e-mail de cadastro e enviaremos instruções para redefinir sua senha.</p>

          <form @submit.prevent="handleReset" class="auth-form" v-if="!emailSent">
            <div class="form-group">
              <label>E-mail</label>
              <input type="email" placeholder="seu@email.com" required>
            </div>
            
            <button type="submit" class="btn btn-primary btn-block btn-lg mt-3">Enviar link de recuperação</button>
          </form>
          
          <div v-else class="success-state">
            <div class="success-icon">
              <MailCheck size="40" color="#10B981" />
            </div>
            <h3>E-mail enviado!</h3>
            <p>Se houver uma conta associada a este e-mail, você receberá um link de redefinição em instantes.</p>
            <button @click="$router.push('/auth/login')" class="btn btn-outline-blue btn-block mt-4">Voltar ao login</button>
          </div>

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
            <div class="mockup-mail-icon"><ShieldCheck size="20" color="white" /></div>
          </div>
        </div>
        
        <h3>Recuperação segura de conta</h3>
        <ul class="feature-list">
          <li><CheckCircle2 size="16" class="check-icon" /> Proteção contra acesso não autorizado</li>
          <li><CheckCircle2 size="16" class="check-icon" /> Link temporário de uso único</li>
          <li><CheckCircle2 size="16" class="check-icon" /> Notificações de segurança em tempo real</li>
        </ul>

        <div class="security-badge">
          <ShieldCheck size="24" class="shield-icon" />
          <div>
            <strong>100% Seguro e Confiável</strong>
            <p>Nenhuma senha é armazenada em texto plano. Sua segurança é nossa prioridade.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowLeft, MailCheck, CheckCircle2, ShieldCheck } from 'lucide-vue-next';

export default {
  name: 'ForgotPasswordView',
  components: { ArrowLeft, MailCheck, CheckCircle2, ShieldCheck },
  data() {
    return {
      emailSent: false
    }
  },
  methods: {
    handleReset() {
      // Simulate API call
      setTimeout(() => {
        this.emailSent = true;
      }, 800);
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
  background: radial-gradient(circle at 35% 35%, #004d4d 0%, #003838 80%);
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 40px;
}

.brand-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: auto;
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
  padding: 50px 40px;
  width: 100%;
  max-width: 440px;
}

.login-card h2 { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
.auth-subtitle { color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 32px; line-height: 1.5; }

.auth-form { display: flex; flex-direction: column; gap: 20px; }
.form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px; }
.form-group input {
  width: 100%; padding: 12px 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.95rem; outline: none; transition: all 0.2s;
}
.form-group input:focus { border-color: var(--accent-blue); box-shadow: 0 0 0 3px var(--accent-blue-light); }

.link-muted { color: var(--text-muted); font-size: 0.85rem; font-weight: 500; text-decoration: none; display: flex; align-items: center; gap: 6px; }
.link-muted:hover { color: var(--accent-blue); }

.btn-block { width: 100%; justify-content: center; }
.btn-lg { padding: 14px; font-size: 1rem; }
.mt-3 { margin-top: 16px; }
.mt-4 { margin-top: 24px; }
.mb-6 { margin-bottom: 24px; }

.success-state {
  text-align: center;
  padding: 20px 0;
}
.success-icon {
  width: 80px;
  height: 80px;
  background: #ECFDF5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
}
.success-state h3 { font-size: 1.35rem; color: var(--text-primary); margin-bottom: 12px; }
.success-state p { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5; }

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
