# 最简单的自定义字段示例 (Grade Field)

这是一个基于 ApostropheCMS 官方文档的最简单自定义字段实现示例。

## 功能说明

这个字段允许用户输入学生的期中和期末考试成绩：
- **期中考试**: integer 类型，必填
- **期末考试**: integer 类型，必填

## 实现步骤

### 1. 模块定义 (`index.js`)
```javascript
export default {
  extend: '@apostrophecms/module',
  options: {
    alias: 'gradeField'
  },
  init(self) {
    self.enableBrowserData();
    self.addGradeFieldType();
  },
  methods(self) {
    return {
      addGradeFieldType() {
        self.apos.schema.addFieldType({
          name: 'grade',
          convert: self.convertInput,
          vueComponent: 'InputGradeField'
        });
      },
      // ... 其他方法
    };
  }
};
```

### 2. Vue 组件 (`InputGradeField.vue`)
```vue
<template>
  <AposInputWrapper :field="field" :error="null" :uid="uid" :modifiers="modifiers">
    <template #body>
      <AposSchema
        :schema="gradeSchema"
        :trigger-validation="triggerValidation"
        :generation="generation"
        v-model="gradeSchemaInput"
      />
    </template>
  </AposInputWrapper>
</template>
```

### 3. 字段使用
```javascript
fields: {
  add: {
    grades: {
      type: 'grade',
      label: '成绩'
    }
  }
}
```

## 技术要点

1. **字段类型注册**: 使用 `self.apos.schema.addFieldType()`
2. **数据转换**: 实现 `convert` 方法处理数据验证和存储
3. **Vue 组件**: 使用 `AposInputWrapper` 和 `AposSchema`
4. **浏览器数据**: 通过 `getBrowserData` 传递 schema

## 测试方法

1. 在 advantages-grid-widget 中添加 grade 字段
2. 启动服务器 (`npm run dev`)
3. 进入管理后台编辑 widget
4. 应该能看到两个输入框：期中考试和期末考试

这个实现完全遵循 ApostropheCMS 官方文档，是自定义字段的最小可用示例。
