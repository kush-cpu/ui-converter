module.exports = {
  components: {
    "Button": { mui: "Button", chakra: "Button", antd: "Button" },
    "Input": { mui: "TextField", chakra: "Input", antd: "Input" },
    "Card": { mui: "Paper", chakra: "Box", antd: "Card" },
  },

  props: {
    "variant": {
      shadcn: { "outline": "bordered", "default": "contained" },
      mui: { "outline": "outlined", "default": "contained" },
      chakra: { "outline": "outline", "default": "solid" },
      antd: { "outline": "dashed", "default": "default" }
    },
    "size": {
      shadcn: { "lg": "large", "md": "medium", "sm": "small" },
      mui: { "lg": "large", "md": "medium", "sm": "small" },
      chakra: { "lg": "lg", "md": "md", "sm": "sm" },
      antd: { "lg": "large", "md": "middle", "sm": "small" }
    }
  },

  imports: {
    shadcn: '@/components/ui',
    mui: '@mui/material',
    chakra: '@chakra-ui/react',
    antd: 'antd'
  }
};
