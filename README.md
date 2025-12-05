# HTML & Sass Project

A modern website template built with HTML and Sass.

## Project Structure

```
School-Project/
├── index.html          # Main HTML file
├── scss/               # Sass source files
│   ├── style.scss      # Main Sass file
│   ├── _variables.scss # Variables (colors, spacing, etc.)
│   ├── _mixins.scss    # Reusable mixins
│   ├── _base.scss      # Base styles
│   ├── components/     # Component styles
│   │   ├── _navbar.scss
│   │   ├── _buttons.scss
│   │   ├── _cards.scss
│   │   └── _forms.scss
│   └── sections/       # Section styles
│       ├── _hero.scss
│       └── _footer.scss
├── css/                # Compiled CSS (auto-generated)
│   └── style.css
└── package.json        # NPM configuration
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Compile Sass

**Watch mode (auto-compile on save):**
```bash
npm run sass
```

**Build once (compressed):**
```bash
npm run build
```

### 3. Open in Browser

Simply open `index.html` in your web browser.

## Features

- ✨ Modern, responsive design
- 🎨 Sass with variables and mixins
- 📱 Mobile-friendly navigation
- 🎯 Reusable components
- 🚀 Easy to customize

## Customization

### Colors

Edit `scss/_variables.scss` to change colors:

```scss
$primary-color: #3498db;
$secondary-color: #2ecc71;
```

### Components

All components are modular and located in `scss/components/`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

Enjoy building! 🎉
