---
name: vengeance-ui
description: Use Vengeance UI motion for buttons, cursor graphics, text flips, and picture-to-picture page changes. Use when animating the construction app, especially the language and phone pages, or when the user mentions Vengeance UI or Vengence UI.
---

# Vengeance UI

Animated React components. Site: https://www.vengenceui.com (the domain spells it "vengence"). Source: https://github.com/Ashutoshx7/VengeanceUI

The user picked this library for graphic motion. Install `flip-text` first. Install other pieces only when a screen needs that motion. Do not install the whole registry.

## Install one component

npx shadcn@latest add https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/NAME.json -y

Registry index: https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/registry.json

Replace NAME with the component name. Read the installed file before using it. If it does not move, the animation CSS is often in the upstream src/app/globals.css. Copy only the rules that component needs.

## What to reach for

Page changes, one picture turning into the next (language page, then phone page):
- interactive-book
- perspective-carousel
- diagonal-carousel
- image-reveal-list
- image-scatter
- folder-preview
- elastic-stack
- reveal-loader

Cursor and pointer graphics:
- cursor-card
- image-trail
- pixelated-image-trail
- interactive-particles
- spotlight-navbar
- ascii-glitch-ripple

Buttons:
- animated-button
- interactive-hover-button
- pop-button
- radial-glow-button
- corner-button
- candy-button
- social-flip-button

Text:
- flip-text (install this first; it is the chosen text motion)
- flip-fade-text
- morph-text
- stagger-text
- liquid-text
- gooey-text-reveal
- kinetic-text-loader

Background motion:
- fluid-morph-bg
- liquid-gradient
- animated-rays
- light-lines
- wave-grid-background
- border-beam
- glow-border-card

## Fit

Keep the construction palette. Do not restyle Landup into the Vengeance landing-page theme. Prefer a few motions that match the page change over filling every control with an effect.
