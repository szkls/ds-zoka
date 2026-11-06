// Builds src/tokens/tokens.css, src/tokens/typography.css and src/tokens/resolved.json
// from the raw Figma exports in tokens/figma/. Run with: npm run tokens
//
// Figma collection  →  CSS custom-property prefix        →  mode switch
// 1a. primitive.color      --rv-<name>   (colors/…)         none
// 1b. primitive.typography --rv-type-<name>                 none
// 1c. primitive.layout     --rv-layout-<name>               none
// 2a. brand                --rv-brand-<name>                html[data-brand="boreal" | "sylva"]
// 3a. semantic.color       --rv-<name>                      html[data-theme="light" | "dark"]
// 3b. semantic.typography  --rv-font-<name>                 none
// 3c. semantic.layout      --rv-<name>                      html[data-device="desktop" | "mobile"]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'));

const prim = read('tokens/figma/primitives.json');
const sem = read('tokens/figma/semantic-color.json');
const rest = read('tokens/figma/semantic-layout-typo-brand.json');

const collections = {
  '1a': { data: prim['1a. primitive.color'], prefix: '', resolveIn: [] },
  '1b': { data: prim['1b. primitive.typography'], prefix: 'type-', resolveIn: [] },
  '1c': { data: prim['1c. primitive.layout'], prefix: 'layout-', resolveIn: [] },
  '2a': { data: rest['2a. brand'], prefix: 'brand-', resolveIn: ['1a', '1b', '1c'], attr: 'data-brand' },
  '3a': { data: sem['3a. semantic.color'], prefix: '', resolveIn: ['3a', '2a', '1a'], attr: 'data-theme' },
  '3b': { data: rest['3b. semantic.typography'], prefix: 'font-', resolveIn: ['3b', '2a', '1b'] },
  '3c': { data: rest['3c. semantic.layout'], prefix: '', resolveIn: ['3c', '2a', '1c'], attr: 'data-device' },
};

const cssName = (col, name) => `--rv-${collections[col].prefix}${name.replace(/\//g, '-')}`;
const index = {}; // col -> name -> { type, values[] }
for (const [col, c] of Object.entries(collections)) {
  index[col] = {};
  for (const row of c.data.vars) {
    const [name, a, b] = row;
    const hasType = typeof a === 'string' && ['COLOR', 'FLOAT', 'STRING', 'BOOLEAN'].includes(a);
    const type = hasType ? a : null;
    const raw = hasType ? b : a;
    const values = Array.isArray(raw) && c.data.modes.length > 1 ? raw : [raw];
    index[col][name] = { type, values };
  }
}

const unit = (col, name, v) => {
  if (typeof v !== 'number') return v;
  if (/opacity/.test(name)) return String(v / 100); // Figma stores opacity tokens as percentages
  if (/weight\//.test(name) || /^weight/.test(name)) return String(v);
  if (/letter-spacing/.test(name)) return `${v}px`;
  return `${v}px`;
};

const refOf = (v) => (typeof v === 'string' && /^\{.+\}$/.test(v) ? v.slice(1, -1) : null);

const resolveRef = (col, ref) => {
  for (const target of collections[col].resolveIn) if (index[target][ref]) return target;
  throw new Error(`Unresolved alias {${ref}} from collection ${col}`);
};

// Produce CSS text and a resolved map (per mode) for programmatic use
const resolvedJson = {};
const lines = [];
const block = (selector, decls) => { lines.push(`${selector} {`); for (const d of decls) lines.push(`  ${d}`); lines.push('}', ''); };

for (const [col, c] of Object.entries(collections)) {
  const modes = c.data.modes;
  resolvedJson[col] = { modes, vars: {} };
  for (let m = 0; m < modes.length; m++) {
    const decls = [];
    for (const [name, { type, values }] of Object.entries(index[col])) {
      const v = values[Math.min(m, values.length - 1)];
      const ref = refOf(v);
      let css;
      if (ref) { const target = resolveRef(col, ref); css = `var(${cssName(target, ref)})`; }
      else if (type === 'STRING' || typeof v === 'string' && !/^#/.test(v)) css = /^[\w-]+$/.test(String(v)) && !/^\d/.test(String(v)) && name !== 'device' ? `"${v}"` : (name === 'device' ? `"${v}"` : String(v));
      else css = unit(col, name, v);
      if (typeof v === 'string' && /^#[0-9a-f]{8}$/i.test(v)) css = v; // 8-digit hex (alpha) is valid CSS Color 4
      decls.push(`${cssName(col, name)}: ${css};`);
      (resolvedJson[col].vars[name] ||= { type, css: cssName(col, name), values: [] }).values.push(ref ? `{${ref}}` : v);
    }
    let selector;
    if (modes.length === 1) selector = ':root';
    else selector = m === 0 ? `:root, [${c.attr}="${modes[m].toLowerCase()}"]` : `[${c.attr}="${modes[m].toLowerCase()}"]`;
    lines.unshift(`/* ${c.data.name || col} — mode ${modes[m]} */`); lines.shift();
    lines.push(`/* ${col} ${Object.keys(index[col]).length ? '' : ''}mode: ${modes[m]} */`);
    block(selector, decls);
  }
}

// Effect styles → box-shadow custom properties (--rv-shadow-xs, --rv-focus-ring-brand …)
// Figma paints effects[0] at the bottom; CSS paints the first box-shadow on top, so the list is reversed.
const effectDecls = [];
for (const [name, effects] of rest.effectStyles) {
  const parts = effects.map((e) => {
    const n = (x) => (refOf(x) ? `var(${cssName(resolveRef('3c', refOf(x)), refOf(x))})` : `${x}px`);
    const color = refOf(e.color) ? `var(${cssName('3a', refOf(e.color))})` : e.color;
    return `${e.x === 0 ? '0' : n(e.x)} ${e.y === 0 ? '0' : n(e.y)} ${e.blur === 0 ? '0' : n(e.blur)} ${n(e.spread)} ${color}`;
  });
  effectDecls.push(`--rv-${name.replace(/\//g, '-')}: ${parts.reverse().join(', ')};`);
}
lines.push('/* Effect styles (Figma) as box-shadow values */');
block(':root', effectDecls);

mkdirSync(resolve(root, 'src/tokens'), { recursive: true });
writeFileSync(resolve(root, 'src/tokens/tokens.css'), `/* Generated by scripts/build-tokens.mjs — do not edit. Source: tokens/figma/*.json (Figma "DS - Test"). */\n\n${lines.join('\n')}`);

// Text styles → utility classes .rv-text-{size}-{weight} (Figma text styles "sm/medium" etc.)
const ts = rest.textStyles;
const t = ['/* Generated by scripts/build-tokens.mjs — Figma text styles {size}/{weight} */', '', ':root { font-family: var(--rv-font-family-sans), system-ui, sans-serif; }', ''];
for (const size of Object.keys(ts.sizes)) {
  for (const [w, [wName]] of Object.entries(ts.weights)) {
    t.push(`.rv-text-${size}-${w} { font-family: var(--rv-font-family-sans), system-ui, sans-serif; font-size: var(--rv-font-size-${size}); line-height: var(--rv-font-line-height-${size}); font-weight: var(--rv-font-weight-${wName}); letter-spacing: 0; }`);
  }
}
writeFileSync(resolve(root, 'src/tokens/typography.css'), t.join('\n') + '\n');

// Resolved JSON + TS name lists for agents / typing
writeFileSync(resolve(root, 'src/tokens/resolved.json'), JSON.stringify(resolvedJson, null, 1));
const names = {};
for (const col of Object.keys(collections)) names[col] = Object.keys(index[col]);
const tsOut = [
  '// Generated by scripts/build-tokens.mjs — token names per Figma collection.',
  `export const tokenNames = ${JSON.stringify(names, null, 1)} as const;`,
  `export const textStyles = ${JSON.stringify(Object.keys(ts.sizes).flatMap((s) => Object.keys(ts.weights).map((w) => `${s}/${w}`)))} as const;`,
  `export const effectStyles = ${JSON.stringify(rest.effectStyles.map((e) => e[0]))} as const;`,
  '/** Figma token name → CSS custom property, e.g. cssVar("background/brand/base") === "var(--rv-background-brand-base)" */',
  'export function cssVar(figmaName: string, collection: "3a" | "3c" | "3b" | "2a" | "1a" | "1b" | "1c" = "3a"): string {',
  '  const prefix: Record<string, string> = { "1a": "", "1b": "type-", "1c": "layout-", "2a": "brand-", "3a": "", "3b": "font-", "3c": "" };',
  '  return `var(--rv-${prefix[collection]}${figmaName.replace(/\\//g, "-")})`;',
  '}',
  '',
];
writeFileSync(resolve(root, 'src/tokens/index.ts'), tsOut.join('\n'));
console.log('tokens: ', Object.entries(index).map(([k, v]) => `${k}=${Object.keys(v).length}`).join(' '), '| effects', rest.effectStyles.length, '| text styles', Object.keys(ts.sizes).length * Object.keys(ts.weights).length);
