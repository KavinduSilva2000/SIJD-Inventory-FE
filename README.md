
# SIJD Inventory Management System - Frontend UI

A responsive and feature-rich web frontend for inventory management, built with HTML, CSS, and JavaScript. This UI interacts with a secure Spring Boot backend API and offers real-time stock tracking, live charts, and a seamless user experience.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup & Usage](#setup--usage)
- [UI Screens](#ui-screens)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Project Overview
The **SIJD Inventory Management UI** is designed to manage stock-in/out, view reports, analyze inventory trends, and export data. It complements the backend API and delivers a user-centric dashboard for real-time inventory insights.

## ✨ Features

### Core UI Features
✅ Login system (with token-based session handling)  
✅ Real-time Dashboard Statistics  
✅ Inventory Stock Management (In/Out)  
✅ Interactive Data Tables with Pagination and Search  
✅ Modal-based Record Editing & Deletion  
✅ Export Data as CSV  
✅ Charts for Stock Analysis (Chart.js)

### Advanced UX/UI
🧩 Modular JS (split into logical files)  
📱 Fully responsive (desktop, tablet, mobile)  
🎨 Themed design with animations  
📊 Visual reports with graphs  
🔒 Token-based session persistence

## 🛠️ Technology Stack
- **HTML5** for structure
- **CSS3** (custom styles) for UI design
- **JavaScript (Vanilla)** for logic and interaction
- **Chart.js** for data visualization
- **Font Awesome** for icons

## 🗂 Project Structure

```
├── index.html               # Main HTML layout
├── styles.css               # UI and layout styling
└── js/
    ├── auth_and_session.js
    ├── charts_and_reports.js
    ├── config_and_state.js
    ├── dashboard_logic.js
    ├── modals_and_ui.js
    ├── stock_management.js
    └── utils.js
```
Frontend Development Team
     - Kavindu Silva - Frontend Developer & Project Manager 
          -GitHub: @KavinduSilva2000
          -Role: Developer 
          -Frontend Responsibilities:HTML Structure(Index),CSS,auth_and_session JavaScript
      -Shanmugam Janani - Frontend Developer & DevOps 
          -GitHub: @
          -Role: Developer
          -Frontend Responsibilities:charts_and_reports JavaScript,config_and_state JavaScript,dashboard_logic JavaScript
      -Pawan Banuka - Frontend Developer & Reviewer 
          -GitHub: @pawanBperera
          -Role: Developer 
          -Frontend Responsibilities:modals_and_ui,stock_management JavaScript,utils JavaScript


## ⚙️ Setup & Usage

1. **Clone Repository**
```bash
git clone https://github.com/your-username/sijd-inventory-ui.git
cd sijd-inventory-ui
```

2. **Serve HTML Locally**
You can open `index.html` directly in your browser or use a local server like:

```bash
# Python 3.x
python -m http.server 8000
# Visit http://localhost:8000
```

3. **API Configuration**
Update the API base URL in `config_and_state.js` if different from:
```js
const API_BASE_URL = 'http://localhost:8080/sijd/api/v1';
```

4. **Login Credentials**
Default Admin credentials (ensure user exists in backend):
- Email: `admin@sijd.com`
- Password: `admin@123`

## 📸 UI Screens
- Login Page
- Real-Time Dashboard
- Stock In/Out Tabs
- Inventory Overview
- Reports & Charts

## 🤝 Contributing

We welcome contributions to improve this UI!

**Steps:**
1. Fork the repo
2. Create a branch (`feature/your-feature`)
3. Commit changes with clear messages
4. Push and create a pull request

## 📝 License
This project is licensed under the MIT License.
