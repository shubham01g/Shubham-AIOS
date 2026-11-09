import { useStore, type Lang } from './store'

/** Flat dictionaries. Add every UI string here; keep keys short and grouped by area. */
const dict: Record<Lang, Record<string, string>> = {
  en: {
    'nav.openApp': 'Open app',
    'demo.guide': 'Demo guide',
    'demo.reset': 'Reset demo',
    'common.accept': 'Accept',
    'common.decline': 'Decline',
    'greet.morning': 'Good morning, {name}',
  },
  '{{LANG2}}': {
    'nav.openApp': '{{...}}',
    'demo.guide': '{{...}}',
    'demo.reset': '{{...}}',
    'common.accept': '{{...}}',
    'common.decline': '{{...}}',
    'greet.morning': '{{...}}',
  },
}

export function useT() {
  const lang = useStore((s) => s.lang)
  return (key: string, vars?: Record<string, string | number>) => {
    let str = dict[lang]?.[key] ?? dict.en[key] ?? key
    if (vars) for (const [k, v] of Object.entries(vars)) str = str.replace(`{${k}}`, String(v))
    return str
  }
}

export const locale = (lang: Lang) => (lang === 'en' ? 'en-{{REGION_CODE}}' : '{{LANG2}}-{{REGION_CODE}}')
export const money = (n: number, lang: Lang) =>
  new Intl.NumberFormat(locale(lang), { style: 'currency', currency: '{{CURRENCY}}', maximumFractionDigits: 0 }).format(n)
