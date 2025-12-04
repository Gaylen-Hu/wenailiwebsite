<template>
   <h2>hello world</h2>
</template>

<script>
import AposInputMixin from 'apostrophe/modules/@apostrophecms/schema/ui/apos/mixins/AposInputMixin';
import AposInputWrapper from 'apostrophe/modules/@apostrophecms/schema/ui/apos/components/AposInputWrapper.vue';
import AposSchema from 'apostrophe/modules/@apostrophecms/schema/ui/apos/components/AposSchema.vue';

console.log('InputColorGradientField loaded, AposSchema:', !!AposSchema);

export default {
  name: 'InputColorGradientField',
  components: {
    AposInputWrapper,
    AposSchema
  },
  mixins: [AposInputMixin],
  data() {
    return {
      next: this.getNext(),
      gradientSchemaInput: { data: this.getNext() }
    };
  },
  computed: {
    gradientSchema() {
      // 确保 apos 和模块数据存在
      if (typeof apos !== 'undefined' && apos.modules && apos.modules['color-gradient']) {
        return apos.modules['color-gradient'].gradientSchema || [];
      }
      return [];
    },
    gradient() {
      try {
        // Ensure we have valid data before creating gradient
        if (!this.next || !this.next.colors || !Array.isArray(this.next.colors) || this.next.colors.length === 0) {
          return 'linear-gradient(90deg, #ff0000 0%, #0000ff 100%)';
        }

        const angle = this.next.angle || 90;

        // Build the gradient string from the angle and color stops
        const colorStops = this.next.colors.map(color => {
          return `${color.color || '#ff0000'} ${color.stop || 0}%`;
        }).join(', ');

        return `linear-gradient(${angle}deg, ${colorStops})`;
      } catch (error) {
        console.error('Gradient computation error:', error);
        return 'linear-gradient(90deg, #ff0000 0%, #0000ff 100%)';
      }
    }
  },
  watch: {
    generation() {
      this.next = this.getNext();
      this.gradientSchemaInput = { data: this.next };
    },
    gradientSchemaInput: {
      handler(newValue) {
        if (!newValue.hasErrors) {
          this.next = newValue.data;
          this.$emit('update:modelValue', { data: this.next });
        }
      },
      deep: true
    }
  },
  methods: {
    getNext() {
      return this.modelValue && this.modelValue.data ? this.modelValue.data : (this.field.def || {
        angle: 90,
        colors: [
          { color: '#d0021bff', stop: 0 },
          { color: '#4a11ffff', stop: 100 }
        ]
      });
    },
    validate(value) {
      if (this.gradientSchemaInput.hasErrors) {
        return 'invalid';
      }
      return false;
    }
  },
  mounted() {
    console.log('InputColorGradientField mounted');
    console.log('Field:', this.field);
    console.log('ModelValue:', this.modelValue);
    console.log('GradientSchema:', this.gradientSchema);

    this.$nextTick(() => {
      // Force reactivity update
      this.next = { ...this.next };
      console.log('After reactivity update:', this.next);
    });
  }
};
</script>

<style lang="scss" scoped>
.gradient-preview {
  height: 200px;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 20px;
  transition: background 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

li {
  list-style: none;
}

.apos-input-object {
  border-left: 1px solid var(--a-base-9);
}

.apos-input-wrapper {
  margin: 20px 0 0 19px;
}

.apos-input-object ::deep .apos-schema .apos-field {
  margin-bottom: 30px;
}

.span-right {
  float: right;
}
</style>