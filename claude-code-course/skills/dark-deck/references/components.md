# dark-deck component snippets

All class names come from `assets/template.html`. Colour any box with a `c-*` class:
`c-blue c-cyan c-violet c-pink c-lime c-amber c-orange c-green c-red`.

## Slide shell (required)

```html
<section class="view slide c-blue" data-chapter="6">
  <header class="sh">
    <div class="badge">6</div>
    <div class="sh-text">
      <div class="eyebrow">• Module 06 • Label •</div>
      <h1>Plain words, <span class="em">accent phrase</span></h1>   <!-- .em / .em.warm / .em.mint / .em.neon -->
    </div>
    <div class="simple"><b>In simple words</b><p>One or two plain sentences.</p></div>
  </header>
  <div class="panel">
    <!-- visuals here; panel is a flex column, gap 22px, 640px tall -->
  </div>
  <aside>Speaker notes (press N).</aside>
</section>
```

Layout helpers inside `.panel`: `.row` (horizontal), `.col` (vertical), `.grow` (fill remaining space), `.center`. Script sub-heading: `<div class="sub">Only the top line is <b style="color:var(--cyan)">always</b> loaded</div>`.

## Flow

```html
<div class="flow">
  <div class="box step c-amber"><div class="e">✍️</div><h3>Do it by hand</h3><p>1 email, with Claude</p></div>
  <div class="arrow">→</div>
  <div class="box step c-green"><div class="e">🔁</div><h3>Run 10×</h3><p>same quality</p></div>
</div>
```

## Meter

```html
<div class="box meter c-green"><div class="label">1 · Front matter: always</div><div class="track"><div class="fill" data-w="7"></div></div></div>
```

## Quiz + reveal

```html
<div class="box quiz c-blue"><div class="label c">Quiz</div><div class="q">One draft is bad. What now?</div></div>
<div class="box ans c-green frag peek" data-hint="→  reveal the answer"><div><h3>Fix the skill, not the email.</h3><p>Why, in one line.</p></div></div>
```

`.frag` = hidden until → (invisible). `.frag.peek` = shows a dashed placeholder with `data-hint`; click or → reveals. Content inside a `.peek` must be wrapped in one child element.

## Try bar

```html
<div class="try"><span class="t">Try</span><span class="gt">›</span><code>Prompt text with <span class="ph">[placeholder]</span></code><button class="copy">COPY</button></div>
```

## Cards

```html
<div class="cards">  <!-- or class="cards three" -->
  <div class="box card c-green"><div class="top"><span class="e">🏷️</span><span class="tag">ALWAYS</span></div><h3>Title</h3><p>Short line.</p></div>
</div>
```

## Terminal

```html
<div class="term" style="flex:0 0 560px">
  <div class="bar"><i></i><i></i><i></i><span>~/path</span></div>
<pre><span class="m">$</span> <span class="k">command</span> <span class="s">"string"</span>
<span class="y">folder/</span>  <span class="m"># comment</span></pre>
</div>
```
Colours: `.k` cyan, `.s` lime, `.y` amber, `.v` violet, `.p` pink, `.m` muted. Keep `<pre>` content flush-left.

## Compare

```html
<div class="compare">
  <div class="box c-red"><div class="label c">Before</div><h3>Old way</h3><ul><li>Point</li></ul></div>
  <div class="vs">VS</div>
  <div class="box after c-green"><div class="label c">After</div><h3>New way</h3><ul><li>Point</li></ul></div>
</div>
```

## Stats

```html
<div class="stats">
  <div class="box stat c-cyan"><div class="n" data-count="10" data-suffix="×">0</div><p>faster</p></div>
</div>
```

## Steps timeline (5 columns; change `grid-template-columns` inline for 3–4)

```html
<div class="steps grow">
  <div class="st c-cyan frag"><div class="dot">1</div><div class="box"><div class="e">✍️</div><h3>Step</h3><p>Short line.</p></div></div>
</div>
```

## Big quote

```html
<div class="bigq">
  <div class="mark">“</div>
  <blockquote>Fix the skill,<br><span class="em warm">not the email.</span></blockquote>
  <p class="take frag">→ The takeaway with <b>a highlight</b>.</p>
</div>
```

## Checklist + up next

```html
<ul class="check"><li>Thing done <span>hint</span></li></ul>
<div class="box nextcard c-orange grow"><div class="label c">Up next · Module 7 · 20 min</div><h3>Title</h3><p>One line.</p></div>
```

## DECK config (top of the script)

```js
const DECK = {
  brand: "• Brand • Series name •",
  unit: "Module", current: 6, total: 12,
  countdown: { date: "2027-01-01", label: "to 2027" },  // or null
  finale: { title: "Big <span>goal</span> line", by: "Name · Brand" }, // or null
  chapters: [ { n:6, title:"Skills that sell", mins:25, emoji:"🧩", blurb:"One line.", color:"blue", status:"next" } ]
};
```
Board fits 14 cards (2 rows of 7) including the finale card.
