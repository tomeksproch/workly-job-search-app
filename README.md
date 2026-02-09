# 🚀 Workly.

**Workly** is a modern web application designed to give you full control over your job search process. Say goodbye to messy spreadsheets – it's time for a visual career management system.

![Workly Hero Preview](public/hero-images/hero1.png)

## ✨ Key Features

* **Kanban System** – Manage applications through intuitive columns: *Wishlist*, *Applied*, *Interview*, and *Offer*.
* **Modern Landing Page** – A refreshed interface utilizing a Bento Grid layout and premium entrance animations.
* **Dynamic Tabs** – Smooth switching between dashboard views with instant interface previews.
* **Fully Responsive** – The app runs smoothly on every device, from smartphones to wide monitors.
* **Secure Authentication** – Login and registration system complete with a dedicated user menu and avatars.

## 🛠️ Tech Stack

* **Frontend:** Next.js 15 (App Router), React, Tailwind CSS
* **UI Components:** Shadcn/UI, Lucide React (icons)
* **Animations:** Framer Motion
* **Backend & Auth:** Better-Auth, Next.js API Routes
* **Database:** MongoDB + Mongoose

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/twoj-nick/workly.git](https://github.com/twoj-nick/workly.git)
cd workly
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration

**Create a .env.local file in the root directory and add your keys::**
```bash
MONGODB_URI=twoj_link_do_mongodb
BETTER_AUTH_SECRET=twoj_sekret
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Run the project
```bash
npm run dev
```

**The application will be available at: http://localhost:3000**
