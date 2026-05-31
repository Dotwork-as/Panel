import { definePreset } from '@primeng/themes'
import { LaraBaseDesignTokens } from '@primeng/themes/lara/base'
import { Preset } from '@primeng/themes/types'
import { ThemeService } from './theme.service'
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service'
import Lara from '@primeng/themes/lara'
const themeConfig = new ThemeService(new LocalStorageService())
const lara_base: Preset<LaraBaseDesignTokens> = {
  primitive: {
    borderRadius: {
      none: '0',
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
      ...themeConfig.config.primeng.primitive.borderRadius
    },
    emerald: {
      50: 'var(--color-emerald-50)',
      100: 'var(--color-emerald-100)',
      200: 'var(--color-emerald-200)',
      300: 'var(--color-emerald-300)',
      400: 'var(--color-emerald-400)',
      500: 'var(--color-emerald-500)',
      600: 'var(--color-emerald-600)',
      700: 'var(--color-emerald-700)',
      800: 'var(--color-emerald-800)',
      900: 'var(--color-emerald-900)',
      950: 'var(--color-emerald-950)'
    },
    green: {
      50: 'var(--color-success-50)',
      100: 'var(--color-success-100)',
      200: 'var(--color-success-200)',
      300: 'var(--color-success-300)',
      400: 'var(--color-success-400)',
      500: 'var(--color-success-500)',
      600: 'var(--color-success-600)',
      700: 'var(--color-success-700)',
      800: 'var(--color-success-800)',
      900: 'var(--color-success-900)',
      950: 'var(--color-success-950)'
    },
    lime: {
      50: 'var(--color-lime-50)',
      100: 'var(--color-lime-100)',
      200: 'var(--color-lime-200)',
      300: 'var(--color-lime-300)',
      400: 'var(--color-lime-400)',
      500: 'var(--color-lime-500)',
      600: 'var(--color-lime-600)',
      700: 'var(--color-lime-700)',
      800: 'var(--color-lime-800)',
      900: 'var(--color-lime-900)',
      950: 'var(--color-lime-950)'
    },
    red: {
      50: 'var(--color-danger-50)',
      100: 'var(--color-danger-100)',
      200: 'var(--color-danger-200)',
      300: 'var(--color-danger-300)',
      400: 'var(--color-danger-400)',
      500: 'var(--color-danger-500)',
      600: 'var(--color-danger-600)',
      700: 'var(--color-danger-700)',
      800: 'var(--color-danger-800)',
      900: 'var(--color-danger-900)',
      950: 'var(--color-danger-950)'
    },
    orange: {
      50: 'var(--color-warning-50)',
      100: 'var(--color-warning-100)',
      200: 'var(--color-warning-200)',
      300: 'var(--color-warning-300)',
      400: 'var(--color-warning-400)',
      500: 'var(--color-warning-500)',
      600: 'var(--color-warning-600)',
      700: 'var(--color-warning-700)',
      800: 'var(--color-warning-800)',
      900: 'var(--color-warning-900)',
      950: 'var(--color-warning-950)'
    },
    amber: {
      50: 'var(--color-amber-50)',
      100: 'var(--color-amber-100)',
      200: 'var(--color-amber-200)',
      300: 'var(--color-amber-300)',
      400: 'var(--color-amber-400)',
      500: 'var(--color-amber-500)',
      600: 'var(--color-amber-600)',
      700: 'var(--color-amber-700)',
      800: 'var(--color-amber-800)',
      900: 'var(--color-amber-900)',
      950: 'var(--color-amber-950)'
    },
    yellow: {
      50: 'var(--color-yellow-50)',
      100: 'var(--color-yellow-100)',
      200: 'var(--color-yellow-200)',
      300: 'var(--color-yellow-300)',
      400: 'var(--color-yellow-400)',
      500: 'var(--color-yellow-500)',
      600: 'var(--color-yellow-600)',
      700: 'var(--color-yellow-700)',
      800: 'var(--color-yellow-800)',
      900: 'var(--color-yellow-900)',
      950: 'var(--color-yellow-950)'
    },
    teal: {
      50: 'var(--color-teal-50)',
      100: 'var(--color-teal-100)',
      200: 'var(--color-teal-200)',
      300: 'var(--color-teal-300)',
      400: 'var(--color-teal-400)',
      500: 'var(--color-teal-500)',
      600: 'var(--color-teal-600)',
      700: 'var(--color-teal-700)',
      800: 'var(--color-teal-800)',
      900: 'var(--color-teal-900)',
      950: 'var(--color-teal-950)'
    },
    cyan: {
      50: 'var(--color-cyan-50)',
      100: 'var(--color-cyan-100)',
      200: 'var(--color-cyan-200)',
      300: 'var(--color-cyan-300)',
      400: 'var(--color-cyan-400)',
      500: 'var(--color-cyan-500)',
      600: 'var(--color-cyan-600)',
      700: 'var(--color-cyan-700)',
      800: 'var(--color-cyan-800)',
      900: 'var(--color-cyan-900)',
      950: 'var(--color-cyan-950)'
    },
    sky: {
      50: 'var(--color-info-50)',
      100: 'var(--color-info-100)',
      200: 'var(--color-info-200)',
      300: 'var(--color-info-300)',
      400: 'var(--color-info-400)',
      500: 'var(--color-info-500)',
      600: 'var(--color-info-600)',
      700: 'var(--color-info-700)',
      800: 'var(--color-info-800)',
      900: 'var(--color-info-900)',
      950: 'var(--color-info-950)'
    },
    blue: {
      50: 'var(--color-blue-50)',
      100: 'var(--color-blue-100)',
      200: 'var(--color-blue-200)',
      300: 'var(--color-blue-300)',
      400: 'var(--color-blue-400)',
      500: 'var(--color-blue-500)',
      600: 'var(--color-blue-600)',
      700: 'var(--color-blue-700)',
      800: 'var(--color-blue-800)',
      900: 'var(--color-blue-900)',
      950: 'var(--color-blue-950)'
    },
    indigo: {
      50: 'var(--color-indigo-50)',
      100: 'var(--color-indigo-100)',
      200: 'var(--color-indigo-200)',
      300: 'var(--color-indigo-300)',
      400: 'var(--color-indigo-400)',
      500: 'var(--color-indigo-500)',
      600: 'var(--color-indigo-600)',
      700: 'var(--color-indigo-700)',
      800: 'var(--color-indigo-800)',
      900: 'var(--color-indigo-900)',
      950: 'var(--color-indigo-950)'
    },
    violet: {
      50: 'var(--color-violet-50)',
      100: 'var(--color-violet-100)',
      200: 'var(--color-violet-200)',
      300: 'var(--color-violet-300)',
      400: 'var(--color-violet-400)',
      500: 'var(--color-violet-500)',
      600: 'var(--color-violet-600)',
      700: 'var(--color-violet-700)',
      800: 'var(--color-violet-800)',
      900: 'var(--color-violet-900)',
      950: 'var(--color-violet-950)'
    },
    purple: {
      50: 'var(--color-purple-50)',
      100: 'var(--color-purple-100)',
      200: 'var(--color-purple-200)',
      300: 'var(--color-purple-300)',
      400: 'var(--color-purple-400)',
      500: 'var(--color-purple-500)',
      600: 'var(--color-purple-600)',
      700: 'var(--color-purple-700)',
      800: 'var(--color-purple-800)',
      900: 'var(--color-purple-900)',
      950: 'var(--color-purple-950)'
    },
    fuchsia: {
      50: 'var(--color-fuchsia-50)',
      100: 'var(--color-fuchsia-100)',
      200: 'var(--color-fuchsia-200)',
      300: 'var(--color-fuchsia-300)',
      400: 'var(--color-fuchsia-400)',
      500: 'var(--color-fuchsia-500)',
      600: 'var(--color-fuchsia-600)',
      700: 'var(--color-fuchsia-700)',
      800: 'var(--color-fuchsia-800)',
      900: 'var(--color-fuchsia-900)',
      950: 'var(--color-fuchsia-950)'
    },
    pink: {
      50: 'var(--color-pink-50)',
      100: 'var(--color-pink-100)',
      200: 'var(--color-pink-200)',
      300: 'var(--color-pink-300)',
      400: 'var(--color-pink-400)',
      500: 'var(--color-pink-500)',
      600: 'var(--color-pink-600)',
      700: 'var(--color-pink-700)',
      800: 'var(--color-pink-800)',
      900: 'var(--color-pink-900)',
      950: 'var(--color-pink-950)'
    },
    rose: {
      50: 'var(--color-rose-50)',
      100: 'var(--color-rose-100)',
      200: 'var(--color-rose-200)',
      300: 'var(--color-rose-300)',
      400: 'var(--color-rose-400)',
      500: 'var(--color-rose-500)',
      600: 'var(--color-rose-600)',
      700: 'var(--color-rose-700)',
      800: 'var(--color-rose-800)',
      900: 'var(--color-rose-900)',
      950: 'var(--color-rose-950)'
    },
    slate: {
      50: 'var(--color-surface_light-50)',
      100: 'var(--color-surface_light-100)',
      200: 'var(--color-surface_light-200)',
      300: 'var(--color-surface_light-300)',
      400: 'var(--color-surface_light-400)',
      500: 'var(--color-surface_light-500)',
      600: 'var(--color-surface_light-600)',
      700: 'var(--color-surface_light-700)',
      800: 'var(--color-surface_light-800)',
      900: 'var(--color-surface_light-900)',
      950: 'var(--color-surface_light-950)'
    },
    gray: {
      50: 'var(--color-gray-50)',
      100: 'var(--color-gray-100)',
      200: 'var(--color-gray-200)',
      300: 'var(--color-gray-300)',
      400: 'var(--color-gray-400)',
      500: 'var(--color-gray-500)',
      600: 'var(--color-gray-600)',
      700: 'var(--color-gray-700)',
      800: 'var(--color-gray-800)',
      900: 'var(--color-gray-900)',
      950: 'var(--color-gray-950)'
    },
    zinc: {
      100: 'var(--color-surface_dark-100)',
      200: 'var(--color-surface_dark-200)',
      300: 'var(--color-surface_dark-300)',
      400: 'var(--color-surface_dark-400)',
      500: 'var(--color-surface_dark-500)',
      600: 'var(--color-surface_dark-600)',
      700: 'var(--color-surface_dark-700)',
      800: 'var(--color-surface_dark-800)',
      900: 'var(--color-surface_dark-900)',
      950: 'var(--color-surface_dark-950)'
    },
    neutral: {
      50: 'var(--color-neutral-50)',
      100: 'var(--color-neutral-100)',
      200: 'var(--color-neutral-200)',
      300: 'var(--color-neutral-300)',
      400: 'var(--color-neutral-400)',
      500: 'var(--color-neutral-500)',
      600: 'var(--color-neutral-600)',
      700: 'var(--color-neutral-700)',
      800: 'var(--color-neutral-800)',
      900: 'var(--color-neutral-900)',
      950: 'var(--color-neutral-950)'
    },
    stone: {
      50: 'var(--color-stone-50)',
      100: 'var(--color-stone-100)',
      200: 'var(--color-stone-200)',
      300: 'var(--color-stone-300)',
      400: 'var(--color-stone-400)',
      500: 'var(--color-stone-500)',
      600: 'var(--color-stone-600)',
      700: 'var(--color-stone-700)',
      800: 'var(--color-stone-800)',
      900: 'var(--color-stone-900)',
      950: 'var(--color-stone-950)'
    },
    ...themeConfig.config.colors
  },
  semantic: {
    ...themeConfig.config.primeng.semantic,
    colorScheme: {
      ...themeConfig.config.primeng.semantic.colorScheme,
      light: {
        ...themeConfig.config.primeng.semantic.colorScheme.light,
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}'
        }
      },
      dark: {
        ...themeConfig.config.primeng.semantic.colorScheme.dark,
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}'
        }
      }
    }
  },
  components: {
    card: {
      css: `
        .p-card {
          overflow-x: auto;
        }
        .p-card-title+.p-card-content, .p-card-subtitle+.p-card-content {
          margin-block-start: 1rem;
        }
      `
    },
    divider: {
      css: `
        .no-padding {
          .p-divider-content {
            padding: 0;
          }
        }
      `
    },
    confirmdialog: {
      css: `
        .p-dialog {
          min-width: 30rem;
        }
      `
    },
    panelmenu: {
      submenu: {
        indent: '1.75rem'
      },
      css: `
        .submenu-without-indent {
          .p-panelmenu-submenu {
            padding: 0;
          }
        }
      `
    }
  }
}

const theme = definePreset(Lara, lara_base)
export default theme
