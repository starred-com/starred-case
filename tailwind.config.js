/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      white: colors.gray[0],
      brand: {
        base: {
          10: colors.gray[10],
          20: colors.gray[20],
          30: colors.gray[30],
          40: colors.gray[40],
          50: colors.gray[50],
          60: colors.gray[60],
          70: colors.gray[70],
          80: colors.gray[80],
          90: colors.gray[90],
          100: colors.gray[100]
        },
        primary: {
          10: colors.lightGreen[10],
          20: colors.lightGreen[20],
          30: colors.lightGreen[30],
          40: colors.lightGreen[40],
          50: colors.lightGreen[50],
          60: colors.lightGreen[60],
          70: colors.lightGreen[70],
          80: colors.lightGreen[80],
          90: colors.lightGreen[90],
          100: colors.lightGreen[100]
        },
        secondary: {
          0: colors.gray[10],
          10: colors.gray[10],
          20: colors.gray[20],
          30: colors.gray[30],
          40: colors.gray[40],
          50: colors.gray[50],
          60: colors.gray[60],
          70: colors.gray[70],
          80: colors.gray[80],
          90: colors.gray[90],
          100: colors.gray[100],
          110: colors.gray[110]
        },
        success: {
          10: colors.green[10],
          20: colors.green[20],
          30: colors.green[30],
          40: colors.green[40],
          50: colors.green[50],
          60: colors.green[60],
          70: colors.green[70],
          80: colors.green[80],
          90: colors.green[90],
          100: colors.green[100]
        },
      },
      background: {
        static: {
          layer: {
            0: colors.gray[0],
            1: colors.gray[0],
            2: colors.gray[20]
          },
          primary: {
            dark: colors.lightGreen[90]
          }
        },
        interactive: {
          // primary
          primary: colors.lightGreen[50],
          primaryHovered: colors.lightGreen[60],
          primaryPressed: colors.lightGreen[70],
          primariySubtle: colors.lightGreen[20],
          primarySubtleHovered: colors.lightGreen[30],
          primarySubtlePressed: colors.lightGreen[40],
          // secondary
          secondary: colors.gray[80],
          secondaryHovered: colors.gray[90],
          secondaryPressed: colors.gray[100],
          secondarySubtle: colors.gray[10],
          secondarySubtleHovered: colors.gray[20],
          secondarySubtlePressed: colors.gray[30],
          // success
          success: colors.green[60],
          successHovered: colors.green[70],
          successPressed: colors.green[80],
          successSubtle: colors.green[10],
          successSubtleHovered: colors.green[20],
          successSubtlePressed: colors.green[30],
          // ghost
          ghost: colors.gray[0],
          ghostHovered: colors.gray[20],
          ghostPressed: colors.gray[30],
          // navigation
          navigation: colors.gray[0],
          navigationHovered: colors.gray[10],
          navigationPressed: colors.gray[20],
          // disabled
          disabled: colors.gray[30],
          // read-only
          readOnly: colors.gray[20]
        }
      },
      border: {
        layer: {
          1: colors.gray[30],
          inBetween: colors.gray[20]
        },
        interactive: {
          // primary
          primary: colors.lightGreen[60],
          // secondary
          secondarySubtle: colors.gray[30],
          secondarySubtleHovered: colors.gray[60],
          secondarySubtlePressed: colors.gray[80]
        }
      },
      foreground: {
        static: {
          // dark
          dark: {
            body: colors.gray[60],
            bodyImportant: colors.gray[80],
            label: colors.gray[80],
            display: colors.gray[80],
            head: colors.gray[80],
            title: colors.gray[80],
            primary: colors.lightGreen[90]
          },
          // light
          light: {
            body: colors.gray[0],
            label: colors.gray[0],
            display: colors.gray[0],
            head: colors.gray[0],
            title: colors.gray[0],
            primary: colors.lightGreen[60]
          },
          // neutral
          detail: colors.gray[50],
          quiet: colors.gray[40],
        },
        interactive: {
          // primary
          primary: colors.lightGreen[90],
          primaryHovered: colors.lightGreen[90],
          primaryPressed: colors.lightGreen[100],
          primariySubtle: colors.lightGreen[90],
          primarySubtleHovered: colors.lightGreen[100],
          primarySubtlePressed: colors.lightGreen[100],
          // secondary
          secondary: colors.gray[0],
          secondaryHovered: colors.gray[0],
          secondaryPressed: colors.gray[0],
          secondarySubtle: colors.gray[80],
          secondarySubtleHovered: colors.gray[90],
          secondarySubtlePressed: colors.gray[100],
          // success
          success: colors.gray[0],
          successHovered: colors.gray[0],
          successPressed: colors.gray[0],
          successSubtle: colors.green[90],
          successSubtleHovered: colors.green[100],
          successSubtlePressed: colors.green[100],
          // info
          info: colors.gray[0],
          infoHovered: colors.gray[0],
          infoPressed: colors.gray[0],
          // warning
          warningPressed: colors.gray[0],
          // error
          error: colors.gray[0],
          errorHovered: colors.gray[0],
          errorPressed: colors.gray[0],
          // ghost
          ghost: colors.gray[80],
          ghostHovered: colors.gray[90],
          ghostPressed: colors.gray[100],
          // navigation
          navigation: colors.gray[60],
          navigationHovered: colors.gray[70],
          navigationPressed: colors.gray[80],
          navigationQuiet: colors.gray[40],
          // disabled
          disabled: colors.gray[40],
          // read-only
          readOnly: colors.gray[80]

        }
      },
      ...colors
    },
    letterSpacing: {
      tighter: '-0.01em',
      tight: '-0.02em',
      normal: '0em',
      wide: '0.04em',
      wider: '0.05em',
      widest: '.06em'
    },
    fontSize: {
      xs: '.750rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontFamily: {
      sans: ['Roboto Flex', 'system-ui']
    },
  },
  variants: {},
  plugins: [
    // ...
  ]

}
