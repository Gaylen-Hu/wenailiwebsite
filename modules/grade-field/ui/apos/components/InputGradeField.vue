<!--
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-05 18:38:10
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-05 18:38:11
 * @FilePath: \wenaili\modules\grade-field\ui\apos\components\InputGradeField.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <AposInputWrapper :field="field" :error="null" :uid="uid" :modifiers="modifiers">
    <template #body>
      <h4>123123123</h4>
      <div class="apos-input-object">
        <div class="apos-input-wrapper">
          <AposSchema
            :schema="gradeSchema"
            :trigger-validation="triggerValidation"
            :generation="generation"
            v-model="gradeSchemaInput"
          >
          </AposSchema>
        </div>
      </div>
    </template>
  </AposInputWrapper>
</template>

<script>
import AposInputMixin from 'apostrophe/modules/@apostrophecms/schema/ui/apos/mixins/AposInputMixin';
import AposInputWrapper from 'apostrophe/modules/@apostrophecms/schema/ui/apos/components/AposInputWrapper.vue';
import AposSchema from 'apostrophe/modules/@apostrophecms/schema/ui/apos/components/AposSchema.vue';

export default {
  name: 'InputGradeField',
  components: {
    AposInputWrapper,
    AposSchema
  },
  mixins: [AposInputMixin],
  data() {
    return {
      gradeSchemaInput: { data: this.getNext() }
    };
  },
  computed: {
    gradeSchema() {
      return apos.modules['grade-field']?.gradeSchema || [];
    }
  },
  watch: {
    generation() {
      this.gradeSchemaInput = { data: this.getNext() };
    },
    gradeSchemaInput: {
      handler(newValue) {
        if (!newValue.hasErrors) {
          this.$emit('update:modelValue', { data: newValue.data });
        }
      },
      deep: true
    }
  },
  methods: {
    getNext() {
      return this.modelValue && this.modelValue.data ? this.modelValue.data : (this.field.def || {});
    },
    validate(value) {
      if (this.gradeSchemaInput.hasErrors) {
        return 'invalid';
      }
      return false;
    }
  }
};
</script>
