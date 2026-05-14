import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { fontFamily: { syne: ['Syne','sans-serif'], onest: ['Onest','sans-serif'], mono: ['"JetBrains Mono"','monospace'] } } },
}
export default config
