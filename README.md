diyeha # Student Database Management System - Web Version

## Overview
Recreated the Java Swing + JDBC Student DB GUI as a **pure web app** using basic HTML, CSS, JavaScript (BCA 4th Semester level). No Java, no MySQL server required!

**Uses browser localStorage** for data persistence (data stays even after refresh/close).

## Features (Matches Original Java App)
- ✅ **Connect** to "DB" (localStorage)
- ✅ **Add Student** (ID + Name, checks duplicate ID)
- ✅ **Update** selected student name
- ✅ **Delete** selected student
- ✅ **Search** by name (live filter)
- ✅ **Refresh** / Load all students
- ✅ Row **selection** (click to edit)
- ✅ **Validation** & error messages
- ✅ **Responsive** design (mobile-friendly)
- ✅ **Persistent** data across sessions

## How to Run
1. Open `index.html` in any browser (double-click or drag to browser)
2. Click **Connect to DB**
3. Add students (e.g., ID:1 Name:John)
4. Test CRUD/Search
5. Close/reopen browser - data persists!

**Windows Command:** `start index.html`

## Tech Stack (Basics Only)
```
HTML5    CSS3    Vanilla JS
localStorage    DOM Manipulation
Event Listeners Responsive Grid/Flex
```

## Sample Usage
```
Connect → Add (1, "Ayush") → Select row → Update name → Search "Ayush" → Delete
```

Originally Java/Swing/MySQL → Now Web/localStorage (simpler for basics) 🎉

---
*Built by BLACKBOXAI - Portfolio project transformation*

