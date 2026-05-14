# Videos Folder

Upload your BEE Lab session recordings here.

## Folder Structure

```
videos/
├── boys/
│   ├── session-01-ohms-law.mp4
│   ├── session-02-series-parallel.mp4
│   ├── session-03-capacitors.mp4
│   └── session-04-inductors.mp4
└── girls/
    ├── session-01-ohms-law.mp4
    ├── session-02-series-parallel.mp4
    ├── session-03-capacitors.mp4
    └── session-04-inductors.mp4
```

## How to Get the Raw URL

1. Push your `.mp4` file to this folder
2. Navigate to the file on GitHub
3. Click the **Raw** button
4. Copy the URL — it will look like:
   `https://raw.githubusercontent.com/Arunodoy-45/BEE-lab-archive/main/videos/boys/session-01-ohms-law.mp4`
5. Paste this URL into the Admin Panel when adding a new video

## Notes

- GitHub supports files up to **100MB** via the web UI
- For files larger than 100MB, use **Git LFS** or the command line:
  ```bash
  git add videos/boys/session-01.mp4
  git commit -m "Add Session 01 boys"
  git push
  ```
