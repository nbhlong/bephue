# Claude Code CLI Guide: Bep Hue Frontend Implementation

## Recommended Workflow

### Step 1: Initial Analysis & Tailwind Setup

```bash
claude-code "I have a brand analysis document for Bep Hue restaurant in resources/files/bep-hue-brand-analysis.md. Please:

1. Read the brand analysis document
2. Already having tailwind.config.js in resources/files with a custom theme including:
   - All color palette values (primary, secondary, accents)
   - Typography settings for Vietnamese text
   - Custom spacing that reflects traditional proportions
   - Shadow styles for depth
3. Update tailwind.config.js if needed then using this config for frontend
4. Add any necessary font imports
5. Show me the color palette as a visual reference"
```

**Expected Output:**

- `tailwind.config.js` with full color system
- Font configuration
- Custom utilities for Vietnamese aesthetics
- Color palette preview

---

### Step 2: Component Styling

```bash
claude-code "Based on the Bep Hue brand analysis, update the following components to match the aesthetic:

1. Navigation bar - use cream background with dark brown text, red accent on active items
2. Hero section - use warm backgrounds with signature red CTAs
3. Menu cards - cream cards with subtle shadows, bamboo-inspired borders
4. Buttons - primary (red), secondary (cream with brown text)
5. Footer - dark brown background with cream text

Keep the traditional Vietnamese feel with natural, warm materials."
```

---

### Step 3: Food Menu Section

```bash
claude-code "Create a food menu section component for Bep Hue that:

1. Uses a grid layout for menu items
2. Each item has: food image, Vietnamese name, English description, price
3. Style with cream backgrounds, bamboo-gold accents
4. Add 'Best Seller' badges in signature red
5. Include hover effects (subtle scale, warm glow)
6. Make it responsive (1 col mobile, 2 col tablet, 3 col desktop)
7. Add traditional Vietnamese decorative borders (subtle)

Reference the brand analysis for exact colors and aesthetic principles."
```

---

### Step 4: About/Story Section

```bash
claude-code "Design an 'About' or 'Story' section that:

1. Uses the warm cream background (#F5EBD9)
2. Includes text about Hue's imperial cuisine heritage
3. Has a decorative Vietnamese pattern in the background (very subtle)
4. Uses proper typography hierarchy (serif headings, sans body)
5. Optional: Side-by-side image and text layout on desktop
6. Maintains authentic, warm, inviting tone

Follow the brand voice guidelines in the analysis document."
```

---

### Step 5: Responsive & Polish

```bash
claude-code "Review all components and ensure:

1. Mobile-first responsive design
2. Vietnamese diacritics display correctly
3. Proper color contrast for accessibility (WCAG AA)
4. Smooth transitions and hover states
5. Consistent spacing using Tailwind scale
6. Images have proper aspect ratios for food photography

Test on mobile (375px), tablet (768px), and desktop (1440px) viewports."
```

---

## Best Practices for Claude Code CLI

### ✅ DO:

1. **Reference the analysis document** - Always mention "based on the brand analysis" so Claude uses the comprehensive guidelines

2. **Be specific about colors** - Use hex codes: "signature red #D44638" not just "red"

3. **Describe the aesthetic** - "warm, traditional Vietnamese, bamboo materials" helps Claude understand the vibe

4. **Mention responsive behavior** - Specify breakpoints and layouts

5. **Request previews** - Ask Claude to show color palettes or component previews

6. **Iterate in stages** - Do setup → components → polish rather than everything at once

### ❌ DON'T:

1. **Be vague** - "Make it look Vietnamese" → Instead: "Use bamboo gold accents (#D4A574) and traditional ceramic blue (#2F4F6F)"

2. **Skip the brand doc** - Always have Claude read the analysis first

3. **Forget Vietnamese text** - Mention diacritics support

4. **Ignore accessibility** - Always request WCAG compliance

5. **Rush it** - Better to do it in stages and review

---

## Quick Reference: Key Brand Elements

**Colors:**

- Red: `#D44638`
- Cream: `#F5EBD9`
- Brown: `#4A3829`

**Aesthetic:**

- Warm, traditional, authentic
- Natural materials (bamboo, wood, ceramic)
- Imperial Hue heritage
- Refined rustic

**Typography:**

- Serif for headings
- Sans-serif for body
- Vietnamese diacritics support essential

**Layout:**

- Generous whitespace (cream)
- Grid-based
- Traditional patterns as subtle backgrounds
- Food photography prominent

---

## Summary

The key to great results with Claude Code CLI for Bep Hue is:

1. **Always reference the brand analysis document** - It contains comprehensive guidelines
2. **Be specific with colors and materials** - Use hex codes and describe the aesthetic
3. **Work iteratively** - Setup → Components → Polish
4. **Think warm and traditional** - Not modern/minimalist, but refined Vietnamese heritage
5. **Test responsively** - Always check mobile, tablet, desktop
6. **Maintain authenticity** - Every element should feel connected to Hue's culinary culture

Good luck with your implementation! 🍜✨
