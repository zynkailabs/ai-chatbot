const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        montserrat: 'var(--font-montserrat)'
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        headerBackground: 'hsl(var(--header-background))',
        userInputArea: 'hsl(var(--user-input-area))',
        userChatBubble: 'hsl(var(--user-chat-bubble))',
        assistantChatBubble: 'hsl(var(--assistant-chat-bubble))',
        textPrimary: 'hsl(var(--text-primary))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        },
        'slide-from-left': {
          '0%': {
            transform: 'translateX(-100%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        'slide-to-left': {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-100%)'
          }
        }
      },
      animation: {
        'slide-from-left':
          'slide-from-left 0.3s cubic-bezier(0.82, 0.085, 0.395, 0.895)',
        'slide-to-left':
          'slide-to-left 0.25s cubic-bezier(0.82, 0.085, 0.395, 0.895)',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.textPrimary'),
            '--tw-prose-headings': theme('colors.textPrimary'),
            '--tw-prose-lead': theme('colors.textPrimary'),
            '--tw-prose-links': theme('colors.textPrimary'),
            '--tw-prose-bold': theme('colors.textPrimary'),
            '--tw-prose-counters': theme('colors.textPrimary'),
            '--tw-prose-bullets': theme('colors.textPrimary'),
            '--tw-prose-hr': theme('colors.textPrimary'),
            '--tw-prose-quotes': theme('colors.textPrimary'),
            '--tw-prose-quote-borders': theme('colors.textPrimary'),
            '--tw-prose-captions': theme('colors.textPrimary'),
            '--tw-prose-code': theme('colors.textPrimary'),
            '--tw-prose-pre-code': theme('colors.textPrimary'),
            '--tw-prose-pre-bg': theme('colors.textPrimary.DEFAULT'),
            '--tw-prose-th-borders': theme('colors.textPrimary'),
            '--tw-prose-td-borders': theme('colors.textPrimary'),
            '--tw-prose-invert-body': theme('colors.textPrimary'),
            '--tw-prose-invert-headings': theme('colors.textPrimary'),
            '--tw-prose-invert-lead': theme('colors.textPrimary'),
            '--tw-prose-invert-links': theme('colors.textPrimary'),
            '--tw-prose-invert-bold': theme('colors.textPrimary'),
            '--tw-prose-invert-counters': theme('colors.textPrimary'),
            '--tw-prose-invert-bullets': theme('colors.textPrimary'),
            '--tw-prose-invert-hr': theme('colors.textPrimary'),
            '--tw-prose-invert-quotes': theme('colors.textPrimary'),
            '--tw-prose-invert-quote-borders': theme('colors.textPrimary'),
            '--tw-prose-invert-captions': theme('colors.textPrimary'),
            '--tw-prose-invert-code': theme('colors.textPrimary'),
            '--tw-prose-invert-pre-code': theme('colors.textPrimary'),
            '--tw-prose-invert-pre-bg': theme('colors.textPrimary.DEFAULT'),
            '--tw-prose-invert-th-borders': theme('colors.textPrimary'),
            '--tw-prose-invert-td-borders': theme('colors.textPrimary')
          }
        }
      })
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
}
