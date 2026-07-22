<template>
  <div class="auth-layout-5050">
    <!-- Lado Azul (Formulário) -->
    <div class="auth-side-blue">
      <div class="brand-top">
        <img src="/download.png" alt="Pague Compra" style="height: 52px; width: auto;" />
      </div>

      <div class="auth-form-container">
        <div class="login-card">
          <h2>Bem-vindo de volta</h2>
          <p class="auth-subtitle">Acesse sua conta para continuar</p>

          <form @submit.prevent="handleLogin" class="auth-form">
            <div class="form-group">
              <label>E-mail</label>
              <input type="email" placeholder="seu@email.com" required>
            </div>
            
            <div class="form-group">
              <label>Senha</label>
              <div class="password-input">
                <input :type="showPassword ? 'text' : 'password'" placeholder="••••••••••••" required>
                <Eye class="eye-icon" size="18" @click="showPassword = !showPassword" />
              </div>
            </div>

            <div class="form-row flex-between mt-2">
              <label class="checkbox-label">
                <input type="checkbox" checked>
                <span>Lembrar de mim</span>
              </label>
              <a href="#" class="link-blue" @click.prevent="$router.push('/auth/forgot-password')">Esqueci minha senha</a>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-lg mt-3">Entrar</button>
          </form>

          <p class="auth-footer-text">
            Ainda não tem uma conta? <a href="#" class="link-blue" @click.prevent="$router.push('/auth/register')">Criar conta</a>
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
            <div class="mockup-mail-icon"><Mail size="20" color="white" /></div>
          </div>
        </div>
        
        <h3>API Pix completa para<br>seu negócio crescer</h3>
        <ul class="feature-list">
          <li><CheckCircle2 size="16" class="check-icon" /> Cobranças Pix com conciliação automática</li>
          <li><CheckCircle2 size="16" class="check-icon" /> Webhooks em tempo real</li>
          <li><CheckCircle2 size="16" class="check-icon" /> Ambiente seguro e confiável</li>
          <li><CheckCircle2 size="16" class="check-icon" /> Documentação completa e suporte dedicado</li>
        </ul>

        <div class="security-badge">
          <ShieldCheck size="24" class="shield-icon" />
          <div>
            <strong>Segurança de nível financeiro</strong>
            <p>Seus dados protegidos com criptografia<br>e conformidade LGPD.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Eye, Mail, CheckCircle2, ShieldCheck } from 'lucide-vue-next';

export default {
  name: 'LoginView',
  components: { Eye, Mail, CheckCircle2, ShieldCheck },
  data() {
    return {
      showPassword: false
    }
  },
  methods: {
    handleLogin() {
      this.$router.push('/dashboard');
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
.brand-name {
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
}

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
.auth-subtitle { color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 32px; }

.auth-form { display: flex; flex-direction: column; gap: 20px; }
.form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px; }
.form-group input:not([type="checkbox"]) {
  width: 100%; padding: 12px 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.95rem; outline: none; transition: all 0.2s;
}
.form-group input:focus { border-color: var(--accent-blue); box-shadow: 0 0 0 3px var(--accent-blue-light); }

.password-input { position: relative; }
.eye-icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); cursor: pointer; }

.flex-between { display: flex; justify-content: space-between; align-items: center; }
.checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-secondary); cursor: pointer; }
.checkbox-label input { width: 16px; height: 16px; accent-color: var(--accent-blue); }

.link-blue { color: var(--accent-blue); font-size: 0.85rem; font-weight: 600; text-decoration: none; }
.link-blue:hover { text-decoration: underline; }

.btn-block { width: 100%; justify-content: center; }
.btn-lg { padding: 14px; font-size: 1rem; }
.mt-2 { margin-top: 8px; }
.mt-3 { margin-top: 16px; }

.auth-footer-text { text-align: center; margin-top: 40px; font-size: 0.9rem; color: var(--text-secondary); }

/* Lado Branco */
.auth-side-white {
  background-color: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.info-section {
  max-width: 440px;
  width: 100%;
}
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
  .auth-side-white { display: none; /* Esconde a parte branca em telas menores */ }
}
</style>
