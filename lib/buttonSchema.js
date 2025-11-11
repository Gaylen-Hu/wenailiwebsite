/**
 * Button Schema - 按钮字段模式
 * 基于 enhanced-button 开源库，提供丰富的按钮样式和特效
 */
import linkSchema from './linkSchema.js';

const button = {
  ...linkSchema,
  variant: {
    type: 'select',
    label: '按钮变体',
    help: '选择按钮的基础样式',
    required: true,
    choices: [
      {
        label: '🔵 默认（主色调）',
        value: 'default'
      },
      {
        label: '⚪ 空心边框',
        value: 'outline'
      },
      {
        label: '🟣 次要样式',
        value: 'secondary'
      },
      {
        label: '👻 幽灵按钮',
        value: 'ghost'
      },
      {
        label: '🔗 链接样式',
        value: 'link'
      },
      {
        label: '🔴 危险操作',
        value: 'destructive'
      }
    ],
    def: 'default'
  },
  effect: {
    type: 'select',
    label: '视觉效果',
    help: '为按钮添加特殊的动画效果',
    choices: [
      {
        label: '无效果',
        value: 'none'
      },
      {
        label: '✨ 闪光效果',
        value: 'shine'
      },
      {
        label: '💫 悬停闪光',
        value: 'shineHover'
      },
      {
        label: '💍 环形悬停',
        value: 'ringHover'
      },
      {
        label: '🫧 右侧波浪',
        value: 'gooeyRight'
      },
      {
        label: '🌊 左侧波浪',
        value: 'gooeyLeft'
      },
      {
        label: '📏 下划线',
        value: 'underline'
      },
      {
        label: '📐 悬停下划线',
        value: 'hoverUnderline'
      },
      {
        label: '🌈 渐变流动',
        value: 'gradientSlideShow'
      }
    ],
    def: 'none'
  },
  size: {
    type: 'select',
    label: '尺寸',
    help: '选择按钮的大小',
    required: true,
    choices: [
      {
        label: '小号',
        value: 'sm'
      },
      {
        label: '默认',
        value: 'default'
      },
      {
        label: '大号',
        value: 'lg'
      }
    ],
    def: 'default'
  },
  icon: {
    type: 'select',
    label: '图标',
    help: '为按钮添加图标（可选）',
    choices: [
      {
        label: '无图标',
        value: ''
      },
      {
        label: '➡️ 右箭头',
        value: 'arrow-right'
      },
      {
        label: '⬅️ 左箭头',
        value: 'arrow-left'
      },
      {
        label: '⬆️ 上箭头',
        value: 'arrow-up'
      },
      {
        label: '⬇️ 下箭头',
        value: 'arrow-down'
      },
      {
        label: '📥 下载',
        value: 'download'
      },
      {
        label: '🔗 外部链接',
        value: 'external-link'
      },
      {
        label: '✓ 对勾',
        value: 'check'
      },
      {
        label: '✕ 关闭',
        value: 'times'
      },
      {
        label: '⚙️ 设置',
        value: 'cog'
      },
      {
        label: '👤 用户',
        value: 'user'
      },
      {
        label: '🔍 搜索',
        value: 'search'
      },
      {
        label: '❤️ 心形',
        value: 'heart'
      },
      {
        label: '⭐ 星号',
        value: 'star'
      },
      {
        label: '🏠 首页',
        value: 'home'
      }
    ],
    def: ''
  },
  iconPlacement: {
    type: 'select',
    label: '图标位置',
    help: '图标显示在文字的左侧或右侧',
    choices: [
      {
        label: '左侧',
        value: 'left'
      },
      {
        label: '右侧',
        value: 'right'
      }
    ],
    def: 'right',
    if: {
      $or: [
        { icon: { $ne: '' } },
        { icon: { $exists: true } }
      ]
    }
  },
  fullWidth: {
    type: 'boolean',
    label: '全宽按钮',
    help: '按钮占据容器的全部宽度',
    def: false
  },
  disabled: {
    type: 'boolean',
    label: '禁用状态',
    help: '禁用按钮，使其不可点击',
    def: false
  }
};

export default { button };
