# 🌆 DinnerWorld — CSS Art Scene

A fully hand-built CSS illustration of a retro diner scene at dusk. No canvas, no SVG drawing tools, no image assets (except one small ice cream icon). Every shape, shadow, and light effect is pure HTML + CSS.

---

## 📸 Preview

![DinnerWorld Preview](./preview.gif)

---

## 🗂️ File Structure

```
Art_DinnerWorld/
├── index.html          # Scene markup
├── style.css           # All visual styling & layout
├── script.js           # Ice cream van keyboard controls
├── mediaControls.js    # Convoy animation (play/pause/rewind/fast-forward)
└── Icecream.png        # Ice cream van roof texture (place in same folder)
```

---

## ✨ Features

### 🏢 The Restaurant

- Multi-tiered roofline with rain drip guards and shadow detail
- Neon sign built entirely from CSS — glowing `text-shadow` on "NEW EDDEN DINNER"
- Layered sign body with bulb lights (hover to flicker them off)
- AC units on the side wall with wire conduit
- Glass door frame with mullion detail
- Skewed side-view window to simulate perspective

### 🚗 Vehicle Convoy (Civ Car + Police Car)

Controlled via the media player bar at the bottom of the screen:

| Button          | Action                                                            |
| --------------- | ----------------------------------------------------------------- |
| ⏮ Rewind       | Both cars drive in reverse — they flip on the Y-axis to face left |
| ▶ Play          | Both cars drive forward at normal speed                           |
| ⏸ Pause         | Freezes both cars in place                                        |
| ⏭ Fast Forward | Both cars speed up — toggleable, highlighted green when active    |

- The police car trails the civilian car by a fixed gap in whichever direction they travel
- `rotateY(180deg)` flips both cars to always face the direction of movement
- Cars wrap seamlessly off one edge and re-enter from the other

### 🚐 Ice Cream Van (Player Controlled)

Use the **arrow keys** to drive the ice cream van:

| Key | Action                       |
| --- | ---------------------------- |
| `←` | Move left (van faces left)   |
| `→` | Move right (van faces right) |
| `↑` | Move up slightly             |
| `↓` | Move down slightly           |

- Vertical movement is bounded so the van stays on the road
- `rotateY` simulates turning on a 2D plane

### 🌄 Environment

- Dual mirrored mountain ranges (left + right) with shadow faces and overcast shadows
- Small foreground hill with grass highlight
- 15 individually scaled and positioned palm trees
- Gradient sky, dirt land strip, and dashed road
- Roadside post with neon "DINNER" sign and decorative topper

### 🚨 Police Siren

- Red and blue lights animate independently (`sirenlightRedBeam` / `sirenlightBlueBeam`)
- Door panel glow simulates light bouncing off the car body

---

## 🚀 Getting Started

No build tools, no dependencies, no npm. Just open it:

```bash
# Option 1 — open directly
start index.html

# Option 2 — serve locally (avoids any asset path quirks)
npx serve .
# or
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

> **Note:** `Icecream.png` needs to be in the same folder as `style.css` for the van roof texture to show. If you don't have it, the van still renders — it just won't have the pattern on top.

---

## 🛠️ Built With

- HTML5
- CSS3 (clip-path, custom properties, keyframe animations, transforms, box-shadow layering)
- Vanilla JavaScript (requestAnimationFrame, keyboard events)
- [Font Awesome](https://fontawesome.com/) for media control icons

---

## 📁 Part of

This project lives under the **CSS Art** category in this repo — a collection of scenes and objects built without any drawing tools. Each piece in the collection is self-contained.

---

## 📄 License

Do whatever you want with it. Credit appreciated but not required.
