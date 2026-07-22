<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="$emit('close')">
    <div class="modal-content notification-modal">
      <div class="modal-header">
        <h3 class="modal-title">Notificações</h3>
        <button class="close-btn" @click="$emit('close')"><X size="20" /></button>
      </div>
      
      <div class="modal-body">
        <div class="notification-list">
          <!-- Notification 1 -->
          <div class="notification-item unread">
            <div class="notif-icon blue">
              <ArrowDownLeft size="16" />
            </div>
            <div class="notif-content">
              <strong>Pix Recebido</strong>
              <p>Você recebeu uma transferência de R$ 1.500,00 de João Silva.</p>
              <span class="notif-time">Agora mesmo</span>
            </div>
          </div>

          <!-- Notification 2 -->
          <div class="notification-item">
            <div class="notif-icon green">
              <CheckCircle size="16" />
            </div>
            <div class="notif-content">
              <strong>Saque Concluído</strong>
              <p>Seu saque de R$ 5.000,00 foi processado com sucesso.</p>
              <span class="notif-time">Há 2 horas</span>
            </div>
          </div>

          <!-- Notification 3 -->
          <div class="notification-item">
            <div class="notif-icon yellow">
              <AlertTriangle size="16" />
            </div>
            <div class="notif-content">
              <strong>Atenção</strong>
              <p>Sua fatura de serviços vence amanhã.</p>
              <span class="notif-time">Ontem, 14:30</span>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-outline-blue btn-block" @click="$emit('close')">Marcar todas como lidas</button>
      </div>
    </div>
  </div>
</template>

<script>
import { X, ArrowDownLeft, CheckCircle, AlertTriangle } from 'lucide-vue-next';

export default {
  name: 'NotificationModal',
  components: { X, ArrowDownLeft, CheckCircle, AlertTriangle },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.notification-modal {
  width: 380px;
  height: 100vh;
  margin: 0;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  background: white;
  animation: slideInRight 0.3s ease;
}

@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.modal-header {
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title { font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.close-btn { background: none; border: none; cursor: pointer; color: var(--text-muted); display: flex; align-items: center; justify-content: center; }

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.notification-list {
  display: flex;
  flex-direction: column;
}

.notification-item {
  display: flex;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.2s;
}
.notification-item:hover { background-color: #F8FAFC; }
.notification-item.unread { background-color: #F0F9FF; }

.notif-icon {
  width: 40px; height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.notif-icon.blue { background: #E0F2FE; color: #0284C7; }
.notif-icon.green { background: #DCFCE7; color: #16A34A; }
.notif-icon.yellow { background: #FEF3C7; color: #D97706; }

.notif-content { flex: 1; }
.notif-content strong { display: block; font-size: 0.9rem; color: var(--text-primary); margin-bottom: 4px; }
.notif-content p { font-size: 0.8rem; color: var(--text-secondary); margin: 0; line-height: 1.4; }
.notif-time { display: block; font-size: 0.7rem; color: var(--text-muted); margin-top: 8px; }

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
}
.btn-block { width: 100%; }
.btn-outline-blue {
  background: white; border: 1px solid #BFDBFE; color: var(--accent-blue); padding: 10px 16px; border-radius: var(--radius-md); font-weight: 600; cursor: pointer;
}
</style>
