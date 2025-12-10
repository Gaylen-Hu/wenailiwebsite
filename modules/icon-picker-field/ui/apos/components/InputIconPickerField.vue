<template>
  <AposInputWrapper :field="field" :error="null" :uid="uid" :modifiers="modifiers">
    <template #body>
      <div class="icon-picker-wrapper">
        <!-- 当前选中的图标预览 -->
        <div class="current-icon-display" v-if="next">
          <div class="icon-preview">
            <i :class="next" class="selected-icon"></i>
          </div>
          <span class="icon-label">{{ getCurrentIconLabel() }}</span>
        </div>

        <!-- 图标选择面板 -->
        <div class="icon-picker-panel" v-show="showPicker" ref="pickerPanel">
          <div class="icon-picker-header">
            <h4 class="picker-title">选择图标</h4>
            <button type="button" class="close-picker" @click="closePicker">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>

          <div class="icon-groups">
            <div v-for="group in iconOptions" :key="group.label" class="icon-group">
              <h5 class="group-title">{{ group.label }}</h5>
              <div class="icon-grid">
                <button
                  v-for="iconItem in group.icons"
                  :key="iconItem.value"
                  type="button"
                  class="icon-option"
                  :class="{ active: next === iconItem.value }"
                  @click="selectIcon(iconItem.value)"
                  :title="iconItem.label"
                >
                  <i :class="iconItem.value" class="icon-item"></i>
                  <span class="icon-tooltip">{{ iconItem.label }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 切换按钮 -->
        <button type="button" class="toggle-picker-btn" @click="togglePicker">
          <i class="fa-solid fa-palette"></i>
          {{ showPicker ? '收起选择器' : '选择图标' }}
        </button>
      </div>
    </template>
  </AposInputWrapper>
</template>

<script>
import AposInputMixin from 'apostrophe/modules/@apostrophecms/schema/ui/apos/mixins/AposInputMixin';
import AposInputWrapper from 'apostrophe/modules/@apostrophecms/schema/ui/apos/components/AposInputWrapper.vue';

export default {
  name: 'InputIconPickerField',
  components: {
    AposInputWrapper
  },
  mixins: [AposInputMixin],
  props: {
    generation: {
      type: Number,
      required: false,
      default: null
    },
    modelValue: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      next: this.getNext(),
      showPicker: false,
      pickerPanel: null
    };
  },
  computed: {
    iconOptions() {
      return apos.modules['icon-picker-field']?.iconOptions || [];
    }
  },
  watch: {
    generation() {
      this.next = this.getNext();
    },
    modelValue(newValue) {
      // 处理Apostrophe传递的不同格式的modelValue
      let value = newValue;
      if (typeof value === 'object' && value !== null && 'data' in value) {
        // widget子字段格式: {data: '...', error: '...'}
        value = value.data;
      }
      this.next = value || this.field.def || '';
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    getNext() {
      // 处理Apostrophe传递的不同格式的modelValue
      let value = this.modelValue;
      if (typeof value === 'object' && value !== null && 'data' in value) {
        // widget子字段格式: {data: '...', error: '...'}
        value = value.data;
      }
      return value || this.field.def || '';
    },
    getCurrentIconLabel() {
      for (const group of this.iconOptions) {
        const foundIcon = group.icons.find(iconItem => iconItem.value === this.next);
        if (foundIcon) {
          return foundIcon.label;
        }
      }
      return '未选择图标';
    },
    selectIcon(iconValue) {
      this.next = iconValue;
      // 根据modelValue的格式决定emit的格式
      if (typeof this.modelValue === 'object' && this.modelValue !== null && 'data' in this.modelValue) {
        // widget子字段格式: 发出包含data的对象
        this.$emit('update:modelValue', { data: this.next });
      } else {
        // piece/page字段格式: 直接发出值
        this.$emit('update:modelValue', this.next);
      }
      this.closePicker();
    },
    togglePicker() {
      this.showPicker = !this.showPicker;
    },
    closePicker() {
      this.showPicker = false;
    },
    handleClickOutside(event) {
      if (!event.target) return;

      const isClickInsidePicker = this.pickerPanel && this.pickerPanel.contains(event.target);
      const isClickOnToggleBtn = event.target.closest('.toggle-picker-btn');

      if (this.pickerPanel && !isClickInsidePicker && !isClickOnToggleBtn) {
        this.closePicker();
      }
    },
    validate(value) {
      // 处理可能的对象格式参数
      let actualValue = value;
      if (typeof value === 'object' && value !== null && 'data' in value) {
        actualValue = value.data;
      }

      // 对于图标选择器，基本验证：检查值是否为字符串且不为空
      if (typeof actualValue !== 'string' || !actualValue.trim()) {
        return 'required';
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-picker-wrapper {
  position: relative;

  .current-icon-display {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
    padding: 16px 20px;
    background: linear-gradient(135deg, var(--a-base-1) 0%, rgba(var(--a-primary-rgb, 0, 122, 204), 0.05) 100%);
    border: 2px solid var(--a-base-3);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    &:hover {
      border-color: var(--a-primary);
      box-shadow: 0 4px 16px rgba(var(--a-primary-rgb, 0, 122, 204), 0.15);
      transform: translateY(-1px);
    }

    .icon-preview {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--a-primary) 0%, var(--a-primary-hover, darken(#007acc, 10%)) 100%);
      border-radius: 12px;
      color: white;
      box-shadow: 0 4px 12px rgba(var(--a-primary-rgb, 0, 122, 204), 0.3);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
        transform: translateX(-100%);
        transition: transform 0.6s ease;
      }

      &:hover::before {
        transform: translateX(100%);
      }

      .selected-icon {
        font-size: 24px;
        position: relative;
        z-index: 1;
        transition: transform 0.2s ease;
      }

      &:hover .selected-icon {
        transform: scale(1.1);
      }
    }

    .icon-label {
      font-weight: 600;
      color: var(--a-text-primary);
      font-size: 15px;
      letter-spacing: 0.25px;
    }
  }

  .toggle-picker-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    background: linear-gradient(135deg, var(--a-primary) 0%, var(--a-primary-hover, darken(#007acc, 10%)) 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(var(--a-primary-rgb, 0, 122, 204), 0.25);
    position: relative;
    overflow: hidden;
    letter-spacing: 0.25px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(var(--a-primary-rgb, 0, 122, 204), 0.35);

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(var(--a-primary-rgb, 0, 122, 204), 0.25);
    }

    i {
      font-size: 16px;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover i {
      transform: rotate(15deg);
    }
  }

  .icon-picker-panel {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 2px solid var(--a-base-3);
    border-radius: 16px;
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.1),
      0 8px 16px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    z-index: 1000;
    margin-top: 12px;
    max-height: 480px;
    overflow-y: auto;
    backdrop-filter: blur(20px);
    animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: top center;

    .icon-picker-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 2px solid var(--a-base-3);
      background: linear-gradient(135deg, var(--a-base-1) 0%, rgba(var(--a-primary-rgb, 0, 122, 204), 0.02) 100%);
      border-radius: 14px 14px 0 0;

      .picker-title {
        margin: 0;
        font-size: 18px;
        font-weight: 700;
        color: var(--a-text-primary);
        letter-spacing: 0.25px;
        display: flex;
        align-items: center;
        gap: 8px;

        &::before {
          content: '🎨';
          font-size: 20px;
        }
      }

      .close-picker {
        background: none;
        border: none;
        color: var(--a-text-muted);
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;

        i {
          font-size: 16px;
        }

        &:hover {
          background: var(--a-base-2);
          color: var(--a-text-primary);
          transform: rotate(90deg);
        }

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(var(--a-primary-rgb, 0, 122, 204), 0.1);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;
        }

        &:hover::before {
          width: 32px;
          height: 32px;
        }
      }
    }

    .icon-groups {
      padding: 20px 24px;

      .icon-group {
        margin-bottom: 32px;

        &:last-child {
          margin-bottom: 0;
        }

        .group-title {
          margin: 0 0 16px 0;
          font-size: 13px;
          font-weight: 700;
          color: var(--a-text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 8px;

          &::before {
            content: '';
            width: 4px;
            height: 4px;
            background: var(--a-primary);
            border-radius: 50%;
          }
        }

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(52px, 1fr));
          gap: 12px;
          animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }
    }
  }

  .icon-option {
    position: relative;
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--a-base-1) 0%, rgba(255, 255, 255, 0.8) 100%);
    border: 2px solid var(--a-base-3);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: var(--a-text-muted);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, transparent 0%, rgba(var(--a-primary-rgb, 0, 122, 204), 0.1) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      background: linear-gradient(135deg, var(--a-primary) 0%, var(--a-primary-hover, darken(#007acc, 10%)) 100%);
      border-color: var(--a-primary);
      color: white;
      transform: translateY(-2px) scale(1.08);
      box-shadow: 0 8px 20px rgba(var(--a-primary-rgb, 0, 122, 204), 0.25);

      &::before {
        opacity: 1;
      }
    }

    &.active {
      background: linear-gradient(135deg, var(--a-primary) 0%, var(--a-primary-hover, darken(#007acc, 10%)) 100%);
      border-color: var(--a-primary);
      color: white;
      box-shadow:
        0 0 0 3px rgba(var(--a-primary-rgb, 0, 122, 204), 0.3),
        0 4px 12px rgba(var(--a-primary-rgb, 0, 122, 204), 0.2);
      animation: pulse 2s infinite;

      &::after {
        content: '✓';
        position: absolute;
        top: -2px;
        right: -2px;
        width: 16px;
        height: 16px;
        background: white;
        color: var(--a-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        border: 2px solid var(--a-primary);
      }
    }

    .icon-item {
      font-size: 20px;
      position: relative;
      z-index: 1;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover .icon-item {
      transform: scale(1.2);
    }

    .icon-tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(4px);
      background: var(--a-base-9);
      color: white;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
      margin-bottom: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1001;

      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: var(--a-base-9);
      }
    }

    &:hover .icon-tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }
  }
}

// CSS 动画
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 3px rgba(var(--a-primary-rgb, 0, 122, 204), 0.3), 0 4px 12px rgba(var(--a-primary-rgb, 0, 122, 204), 0.2);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(var(--a-primary-rgb, 0, 122, 204), 0.2), 0 4px 12px rgba(var(--a-primary-rgb, 0, 122, 204), 0.1);
  }
}

// 深色模式支持
@media (prefers-color-scheme: dark) {
  .icon-picker-panel {
    background: var(--a-base-9);
    border-color: var(--a-base-7);
  }

  .icon-picker-header {
    background: var(--a-base-8);
    border-color: var(--a-base-7);
  }

  .current-icon-display {
    background: linear-gradient(135deg, var(--a-base-8) 0%, rgba(var(--a-primary-rgb, 0, 122, 204), 0.1) 100%);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .current-icon-display {
    padding: 14px 16px;
    gap: 14px;

    .icon-preview {
      width: 44px;
      height: 44px;

      .selected-icon {
        font-size: 20px;
      }
    }

    .icon-label {
      font-size: 14px;
    }
  }

  .toggle-picker-btn {
    padding: 10px 16px;
    font-size: 13px;
  }
}

@media (max-width: 640px) {
  .icon-picker-panel {
    position: fixed;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    margin: 0;
    max-height: none;
    z-index: 10000;
    border-radius: 12px;
  }

  .icon-picker-header {
    padding: 16px 20px;

    .picker-title {
      font-size: 16px;

      &::before {
        font-size: 18px;
      }
    }
  }

  .icon-groups {
    padding: 16px 20px;
  }

  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(48px, 1fr)) !important;
    gap: 10px !important;
  }

  .icon-option {
    width: 48px;
    height: 48px;

    .icon-item {
      font-size: 18px;
    }
  }
}
</style>
