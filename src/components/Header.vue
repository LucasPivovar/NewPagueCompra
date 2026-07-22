<template>
  <header class="topbar">
    <div class="topbar-left">
      <button class="mobile-menu-btn" @click="$emit('toggle-sidebar')">
        <Menu size="24" />
      </button>
      <div class="topbar-search">
        <Search class="search-icon" size="18" />
        <input type="text" placeholder="Buscar por transações...">
      </div>
    </div>

    <div class="topbar-actions">
      <div class="notification-wrapper" @click="$emit('open-notifications')">
        <Bell class="notification-icon" size="22" />
        <span class="notification-dot" v-if="notificationsCount > 0">{{ notificationsCount }}</span>
      </div>

      <div class="user-profile-wrapper" @click="toggleDropdown" v-click-outside="closeDropdown">
        <div class="user-profile">
          <div class="avatar">AC</div>
          <div class="user-info">
            <span class="user-name">André C.</span>
            <span class="user-role">API Pague Compra</span>
          </div>
          <ChevronDown class="dropdown-icon" size="16" />
        </div>
        
        <!-- Dropdown Menu -->
        <div class="profile-dropdown" v-if="isDropdownOpen">
          <a class="dropdown-item text-red" @click="$emit('logout')">
            <LogOut size="16" /> Sair
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { Search, Bell, ChevronDown, LogOut, Menu } from 'lucide-vue-next';

export default {
  name: 'AppHeader',
  components: {
    Search, Bell, ChevronDown, LogOut, Menu
  },
  props: {
    currentPortal: String,
    theme: String
  },
  data() {
    return {
      notificationsCount: 3,
      isDropdownOpen: false
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    }
  },
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el.clickOutsideEvent = function (event) {
          if (!(el == event.target || el.contains(event.target))) {
            binding.value(event, el)
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      },
    }
  }
}
</script>

<style scoped>
/* Scoped css for header adjustments */
.topbar {
  height: 72px;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 30;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.mobile-menu-btn {
  display: none;
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 4px;
}

.topbar-search {
  position: relative;
  width: 420px;
  max-width: 100%;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: var(--text-muted);
}

.topbar-search input {
  width: 100%;
  padding: 10px 14px 10px 42px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.88rem;
  transition: all 0.2s;
}
.topbar-search input:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px var(--accent-blue-light);
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.notification-wrapper {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

.notification-dot {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: var(--accent-blue);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--bg-secondary);
}

.user-profile-wrapper {
  position: relative;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding-left: 24px;
  border-left: 1px solid var(--border-color);
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent-blue);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-primary);
}

.user-role {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.dropdown-icon {
  color: var(--text-muted);
  margin-left: 4px;
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  min-width: 180px;
  padding: 8px 0;
  z-index: 50;
  animation: fadeIn 0.15s ease-out;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background-color: var(--bg-card-hover);
}

.dropdown-item.text-red {
  color: var(--accent-red);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .topbar {
    padding: 0 16px;
  }
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .topbar-search {
    display: none; /* Ocultar no mobile para poupar espaço */
  }
  .user-info {
    display: none; /* Ocultar nome no mobile */
  }
  .user-profile {
    padding-left: 12px;
  }
}
</style>
