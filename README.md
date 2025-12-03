# 📋 Kanban Board

A fully functional Interactive Kanban Board (Trello-style) built with React, featuring drag-and-drop functionality, dark mode SaaS styling, and localStorage persistence.

![Kanban Board](https://img.shields.io/badge/React-18.2-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **🎯 Drag & Drop**: Seamlessly move tasks between columns and reorder within columns using `@hello-pangea/dnd`
- **🌙 Dark Mode**: Modern SaaS-style dark theme with smooth hover effects
- **💾 LocalStorage Persistence**: All tasks are automatically saved and persist after page refresh
- **📝 Task Management**: 
  - Add new tasks with a simple click
  - Delete tasks with a hover-visible trash icon
  - Priority tags (High/Medium/Low) with color coding
- **📊 Three Default Columns**: "To Do", "In Progress", and "Done"
- **🎨 Beautiful UI**: Clean, modern interface with smooth animations and visual feedback

## 🚀 Tech Stack

- **React 18.2** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **@hello-pangea/dnd** - Drag and drop functionality
- **Lucide React** - Beautiful icons
- **LocalStorage** - Data persistence

## 📦 Installation

1. **Clone the repository** (or navigate to the project directory)

```bash
cd "Kanban Board"
```

2. **Install dependencies**

```bash
npm install
```

Note: This project uses `--legacy-peer-deps` flag (configured in `.npmrc`) to handle peer dependency conflicts.

3. **Start the development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🏗️ Project Structure

```
Kanban Board/
├── src/
│   ├── components/
│   │   ├── KanbanBoard.jsx    # Main board component with drag-and-drop logic
│   │   ├── Column.jsx          # Column component with add task functionality
│   │   └── TaskCard.jsx        # Individual task card component
│   ├── App.jsx                 # Root app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind CSS imports
├── index.html                  # HTML entry point
├── package.json                # Project dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # This file
```

## 🎮 Usage

### Adding a Task

1. Click the **"Add Task"** button at the bottom of any column
2. Enter your task title in the input field
3. Press **Enter** or click **"Add"** to create the task
4. Press **Esc** or click **"Cancel"** to cancel

### Moving Tasks

1. **Drag and drop** any task card to move it between columns
2. **Drag and drop** within the same column to reorder tasks
3. Visual feedback is provided during dragging

### Deleting Tasks

1. **Hover** over a task card to reveal the trash icon
2. Click the **trash icon** to delete the task

### Priority Tags

Each task is automatically assigned a random priority tag:
- 🔴 **High** (Red)
- 🟠 **Medium** (Orange)
- 🟢 **Low** (Green)

## 💾 Data Persistence

All board data (columns and tasks) is automatically saved to browser LocalStorage. Your tasks will persist even after:
- Closing the browser
- Refreshing the page
- Restarting your computer

To clear all data, you can clear your browser's LocalStorage for this domain.

## 🎨 Customization

### Changing Column Names

Edit the `defaultColumns` array in `src/components/KanbanBoard.jsx`:

```jsx
const defaultColumns = [
  { id: 'todo', title: 'Your Custom Title', tasks: [] },
  // ...
]
```

### Styling

The project uses Tailwind CSS. You can customize colors, spacing, and other styles by modifying:
- `tailwind.config.js` - Tailwind configuration
- Component files - Tailwind utility classes

### Priority Colors

Priority tag colors can be customized in `src/components/KanbanBoard.jsx`:

```jsx
const priorityColors = {
  High: 'bg-red-500',      // Change to any Tailwind color
  Medium: 'bg-orange-500',
  Low: 'bg-green-500'
}
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 Notes

- This project uses React 18.2 and is compatible with modern browsers
- The drag-and-drop library `@hello-pangea/dnd` is a maintained fork of `react-beautiful-dnd`
- All data is stored locally in the browser - no backend required

## 🐛 Troubleshooting

### Dependency Installation Issues

If you encounter peer dependency conflicts, the project is configured to use `--legacy-peer-deps` automatically via `.npmrc`.

### Port Already in Use

If port 5173 is in use, Vite will automatically select the next available port. Check your terminal for the correct URL.

### LocalStorage Issues

If tasks aren't persisting, check:
1. Browser LocalStorage is enabled
2. No browser extensions are blocking LocalStorage
3. You're not in incognito/private mode

## 📄 License

MIT License - feel free to use this project in your portfolio!

## 👨‍💻 Author

Built as a portfolio project demonstrating modern React development practices.

---

**Happy organizing! 📋✨**

