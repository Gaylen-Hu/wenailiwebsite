<template>
  <AposInputWrapper :field="field" :error="effectiveError" :uid="uid" :display-options="displayOptions" :modifiers="modifiers">
    <template #body>
      <div class="apos-input-object">
        <div class="apos-input-wrapper">
          <!-- Gradient preview section -->
          <div
            id="color-square"
            :style="{ background: gradient }"
            class="gradient-preview"
          />
          <!-- Schema form for editing gradient properties -->
          <AposSchema
            :schema="gradientSchema"
            :trigger-validation="triggerValidation"
            :generation="generation"
            v-model="gradientSchemaInput"
          > 
          </AposSchema>
        </div>
      </div>
    </template>
  </AposInputWrapper>
</template>

<script>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import AposInputMixin from 'apostrophe/modules/@apostrophecms/schema/ui/apos/mixins/AposInputMixin';
import AposInputWrapper from 'apostrophe/modules/@apostrophecms/schema/ui/apos/components/AposInputWrapper.vue';
import AposSchema from 'apostrophe/modules/@apostrophecms/schema/ui/apos/components/AposSchema.vue';

export default {
  name: 'InputColorGradientField',
  components: {
    AposInputWrapper,
    AposSchema
  },
  mixins: [AposInputMixin],
  props: {
    // The generation prop is used to trigger validation in parent components
    generation: {
      type: Number,
      required: false,
      default: null
    },
    // The model value containing our gradient data
    modelValue: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    // Get initial gradient data from props or use defaults
    const getNext = () => {
      return props.modelValue.data ?? (props.field.def || {
        angle: 90,
        colors: [
          { color: '#d0021bff', stop: 0 },
          { color: '#4a11ffff', stop: 100 }
        ]
      });
    };

    // Create reactive state for the gradient data
    const next = ref(getNext());

    // Get the schema from Apostrophe modules
    const gradientSchema = apos.modules['color-gradient'].gradientSchema;

    // Create the input for the schema form
    const gradientSchemaInput = ref({ data: next.value });

    /**
     * Vue 3 Reactivity Note:
     * In Vue 3, reactivity for initial values sometimes needs an explicit trigger.
     * The onMounted hook with nextTick ensures our gradient is properly rendered
     * after the component is fully mounted.
     */
    onMounted(() => {
      nextTick(() => {
        // Create a new object reference to force reactivity
        next.value = { ...next.value };
      });
    });

    // Watch for generation changes from parent component
    watch(() => props.generation, () => {
      next.value = getNext();
      gradientSchemaInput.value = { data: next.value };
    });

    // Watch for internal schema input changes
    watch(gradientSchemaInput, (newValue) => {
      if (!newValue.hasErrors) {
        next.value = newValue.data;
        // Emit update to parent component
        emit('update:modelValue', { data: next.value });
      }
    }, { deep: true });

    // Validator function for the gradient data
    function validate(value) {
      if (gradientSchemaInput.value.hasErrors) {
        return 'invalid';
      }
      return false;
    }

    /**
     * Compute the CSS gradient string from our data
     * This dynamically creates a linear-gradient CSS function
     * based on the angle and colors in our data.
     */
    const gradient = computed(() => {
      // Ensure we have valid data before creating gradient
      if (!next.value.colors || !next.value.angle) {
        return '';
      }

      // Build the gradient string from the angle and color stops
      const gradientString = next.value.colors.reduce((acc, curr, i, colors) => {
        acc += `${curr.color} ${curr.stop}%`;
        // Add comma between color stops, or close parenthesis for the last stop
        if (i !== colors.length - 1) {
          acc += ', ';
        } else {
          acc += ')';
        }

        return acc;
      }, `linear-gradient(${next.value.angle}deg, `);

      return gradientString;
    });

    // Return values for the template
    return {
      next,
      gradientSchema,
      gradientSchemaInput,
      getNext,
      gradient,
      validate
    };
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