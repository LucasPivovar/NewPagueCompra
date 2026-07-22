<template>
  <div class="action-dropdown" ref="dropdown" @click.stop>
    <div @click="toggle" class="trigger-container">
      <slot name="trigger">
        <button class="icon-btn-plain">
          <MoreVertical size="18" />
        </button>
      </slot>
    </div>

    <Transition name="fade">
      <div v-if="isOpen" class="dropdown-menu" :class="position">
        <div 
          v-for="(action, index) in actions" 
          :key="index"
          class="dropdown-item"
          :class="action.colorClass || ''"
          @click="handleAction(action)"
        >
          <component :is="action.icon" size="14" v-if="action.icon" class="action-icon" />
          <span>{{ action.label }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { MoreVertical } from 'lucide-vue-next';

export default {
  name: 'ActionDropdown',
  components: { MoreVertical },
  props: {
    actions: {
      type: Array,
      required: true
    },
    position: {
      type: String,
      default: 'bottom-right' // 'bottom-right', 'bottom-left'
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  mounted() {
    document.addEventListener('click', this.close);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.close);
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    close() {
      if (this.isOpen) this.isOpen = false;
    },
    handleAction(action) {
      if (action.actionName) {
        this.$emit('action', action.actionName);
      }
      this.isOpen = false;
    }
  }
}
</script>

<style scoped>
.action-dropdown {
  position: relative;
  display: inline-block;
}

.trigger-container {
  display: flex;
}

.icon-btn-plain {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: 0.2s;
}
.icon-btn-plain:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  min-width: 160px;
  padding: 8px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.dropdown-menu.bottom-right {
  right: 0;
}
.dropdown-menu.bottom-left {
  left: 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: 0.2s;
  white-space: nowrap;
}

.dropdown-item:hover {
  background: var(--bg-secondary);
}

.dropdown-item.text-red {
  color: var(--accent-red);
}
.dropdown-item.text-red:hover {
  background: #FEF2F2;
}
.dropdown-item.text-blue {
  color: var(--accent-blue);
}
.dropdown-item.text-blue:hover {
  background: #EFF6FF;
}

.action-icon {
  opacity: 0.7;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
