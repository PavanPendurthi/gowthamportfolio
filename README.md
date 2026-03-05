# Gowtham Manukonda — Portfolio

## Folder Structure
```
gowtham-portfolio/
├── index.html        ← Main HTML file
├── css/
│   └── style.css     ← All styles
├── js/
│   └── main.js       ← All JavaScript (cursor, timecode, counters, lightbox, scroll)
└── README.md
```

## How to Edit in VS Code

1. Open the `gowtham-portfolio` folder in VS Code
2. Install the **Live Server** extension for live preview
3. Right-click `index.html` → "Open with Live Server"

## Adding Your Videos
In `index.html`, find each `<!-- ROLL 01 -->` comment and:
- Replace `YOUR_YOUTUBE_ID_X` with your YouTube video ID
- Replace `YOUR CATEGORY` with e.g. `FREELANCE`, `CINEMATOGRAPHY`
- Replace `Your Video Title Here` with your actual title
- Add thumbnail: replace the placeholder div with:
  `<img src="https://i.ytimg.com/vi_webp/YOUR_ID/maxresdefault.webp" alt="Title" loading="lazy"/>`

## Adding Your Photos
In `index.html`, find each `<!-- STILL 01 -->` comment and:
- Replace `YOUR_PHOTO_X.jpg` with your image path or URL
- You can place images in an `images/` folder and reference them as `images/photo1.jpg`

## Hosting (Free)
- **Netlify**: Drag the whole folder to https://app.netlify.com/drop
- **GitHub Pages**: Push to a repo, enable Pages in Settings
- **Vercel**: Import the folder at https://vercel.com
