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
                  v-for="icon in group.icons"
                  :key="icon.value"
                  type="button"
                  class="icon-option"
                  :class="{ active: next === icon.value }"
                  @click="selectIcon(icon.value)"
                  :title="icon.label"
                >
                  <i :class="icon.value" class="icon-item"></i>
                  <span class="icon-tooltip">{{ icon.label }}</span>
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
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
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const getNext = () => {
      return props.modelValue || props.field.def || '';
    };

    const next = ref(getNext());
    const showPicker = ref(false);
    const pickerPanel = ref(null);

    // 获取图标选项
    const iconOptions = apos.modules['icon-picker-field']?.iconOptions || [];

    const getCurrentIconLabel = () => {
      for (const group of iconOptions) {
        const icon = group.icons.find(icon => icon.value === next.value);
        if (icon) {
          return icon.label;
        }
      }
      return '未选择图标';
    };

    const selectIcon = (iconValue) => {
      next.value = iconValue;
      emit('update:modelValue', next.value);
      closePicker();
    };

    const togglePicker = () => {
      showPicker.value = !showPicker.value;
    };

    const closePicker = () => {
      showPicker.value = false;
    };

    // 点击外部关闭选择器
    const handleClickOutside = (event) => {
      if (pickerPanel.value && !pickerPanel.value.contains(event.target) &&
          !event.target.closest('.toggle-picker-btn')) {
        closePicker();
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    watch(() => props.generation, () => {
      next.value = getNext();
    });

    watch(() => props.modelValue, (newValue) => {
      next.value = newValue || props.field.def || '';
    });

    return {
      next,
      showPicker,
      pickerPanel,
      iconOptions,
      getCurrentIconLabel,
      selectIcon,
      togglePicker,
      closePicker
    };
  }
};
</script>

<style lang="scss" scoped>
.icon-picker-wrapper {
  .current-icon-display {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    padding: 12px;
    background: var(--a-base-1);
    border: 1px solid var(--a-base-3);
    border-radius: 8px;

    .icon-preview {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--a-primary);
      border-radius: 8px;
      color: white;

      .selected-icon {
        font-size: 20px;
      }
    }

    .icon-label {
      font-weight: 500;
      color: var(--a-text-primary);
    }
  }

  .toggle-picker-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: var(--a-primary);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--a-primary-hover, darken(#007acc, 10%));
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .icon-picker-panel {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid var(--a-base-3);
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    margin-top: 8px;
    max-height: 400px;
    overflow-y: auto;

    .icon-picker-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--a-base-3);
      background: var(--a-base-1);

      .picker-title {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--a-text-primary);
      }

      .close-picker {
        background: none;
        border: none;
        color: var(--a-text-muted);
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s ease;

        &:hover {
          background: var(--a-base-2);
          color: var(--a-text-primary);
        }
      }
    }

    .icon-groups {
      padding: 16px 20px;

      .icon-group {
        margin-bottom: 24px;

        &:last-child {
          margin-bottom: 0;
        }

        .group-title {
          margin: 0 0 12px 0;
          font-size: 14px;
          font-weight: 600;
          color: var(--a-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
          gap: 8px;
        }
      }
    }
  }

  .icon-option {
    position: relative;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--a-base-1);
    border: 2px solid var(--a-base-3);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--a-text-muted);

    &:hover {
      background: var(--a-primary);
      border-color: var(--a-primary);
      color: white;
      transform: scale(1.05);
    }

    &.active {
      background: var(--a-primary);
      border-color: var(--a-primary);
      color: white;
      box-shadow: 0 0 0 3px rgba(var(--a-primary-rgb, 0, 122, 204), 0.2);
    }

    .icon-item {
      font-size: 18px;
    }

    .icon-tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: var(--a-base-9);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
      pointer-events: none;
      margin-bottom: 4px;

      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 4px solid transparent;
        border-top-color: var(--a-base-9);
      }
    }

    &:hover .icon-tooltip {
      opacity: 1;
      visibility: visible;
    }
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
}

// 响应式设计
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
  }

  .icon-groups {
    padding: 12px 16px;
  }

  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(44px, 1fr)) !important;
    gap: 6px !important;
  }

  .icon-option {
    width: 44px;
    height: 44px;

    .icon-item {
      font-size: 16px;
    }
  }
}
</style>
