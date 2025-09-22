# EMSI Class Representative Council Website

A modern, responsive, and accessible website for the EMSI Class Representative Council built with HTML, CSS, and JavaScript.

## 🎨 Design Features

- **Color Scheme**: Green (#0f9d58) and white (#ffffff) with dark green (#0a2212) accents
- **Modern UI**: Clean, academic design with rounded corners and soft shadows
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: Semantic HTML, keyboard navigation, ARIA labels, and high contrast support

## 🏗️ Structure & Navigation

### Header
- **Logo**: Circular shield-shaped logo with graduation cap icon
- **Navigation**: Desktop navigation bar with active page indicators
- **Mobile Menu**: Hamburger menu that opens a slide-out sidebar

### Sidebar Navigation
- Slide-out menu accessible via hamburger button
- Contains all navigation links including Community Links, Email Updates, and Report
- Closes on outside click, escape key, or link selection

### Persistent Report Button
- Always visible floating button in the top-right corner
- Links directly to the Report page
- Responsive design that adapts to mobile screens

## 📄 Pages & Content

### 1. Home (`index.html`)
- **Hero Section**: Welcome message with call-to-action buttons
- **Highlight Cards**: Events, Services, and Resources overview
- **Quick Stats**: Student representation statistics
- **Floating Animation**: Animated hero graphic

### 2. News (`news.html`)
- **Dynamic Content**: News articles with filtering by category
- **Modal System**: Click to read full articles in popup modals
- **Categories**: All News, Events, Announcements, Updates
- **Load More**: Pagination for better performance

### 3. Services (`services.html`)
- **Service Grid**: External service links with descriptions
- **Categories**: Academic, Support, Technology, Wellness
- **Quick Access**: Direct links to common services
- **Featured Services**: Highlighted important services

### 4. Resources (`resources.html`)
- **Downloadable Items**: PDFs, documents, and guides
- **Categories**: Academic, Forms, Guides, Schedules
- **Quick Downloads**: Featured resource downloads
- **File Type Icons**: Visual indicators for different file types

### 5. About (`about.html`)
- **Mission Statement**: Council's purpose and goals
- **Core Values**: Representation, Inclusivity, Innovation, Integrity
- **Leadership Team**: Council members with roles
- **History**: Background and achievements

### 6. Contact (`contact.html`)
- **Contact Methods**: Email, WhatsApp, Instagram, LinkedIn
- **Contact Form**: Comprehensive form with validation
- **Office Hours**: Location and meeting information
- **Map Integration**: Campus map placeholder

### 7. Community Links (`community.html`)
- **Community Platforms**: Student forums, alumni networks, social media
- **Categories**: Forums, Alumni, Social Media, Professional
- **Featured Communities**: Highlighted important platforms
- **Quick Join**: Direct access to popular communities

### 8. Email Updates (`updates.html`)
- **Newsletter Signup**: Comprehensive subscription form
- **Preferences**: Customizable email preferences
- **Archive**: Recent newsletter examples
- **Unsubscribe**: Easy opt-out options

### 9. Report (`report.html`)
- **Issue Reporting**: Detailed form for problems and suggestions
- **File Upload**: Support for attachments
- **Categories**: Academic, Facility, Service, Safety, etc.
- **Priority Levels**: Low, Medium, High, Critical
- **Guidelines**: Best practices for reporting
- **Emergency Contacts**: Direct access to urgent help

## 🛠️ Technical Features

### JavaScript Functionality
- **Sidebar Management**: Open/close with smooth animations
- **Form Validation**: Client-side validation with error messages
- **Dynamic Content**: News and services populated from JavaScript data
- **Filtering**: Category-based filtering for news, services, resources, and communities
- **Modal System**: Popup modals for detailed content viewing
- **File Upload**: Drag-and-drop file upload with preview
- **Smooth Scrolling**: Animated scrolling for anchor links

### CSS Features
- **CSS Variables**: Consistent color scheme and spacing
- **Flexbox & Grid**: Modern layout techniques
- **Animations**: Smooth transitions and hover effects
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: High contrast mode and reduced motion support

### Form Handling
- **Validation**: Required fields, email format, file types
- **Submission**: Mailto fallback for form submissions
- **User Feedback**: Success messages and error handling
- **Privacy**: GDPR-compliant privacy policy integration

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

### Mobile Optimizations
- Hamburger menu for navigation
- Stacked layouts for forms and grids
- Touch-friendly button sizes
- Optimized typography scaling
- Simplified report button on mobile

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **ARIA Labels**: Screen reader support
- **Focus Management**: Visible focus indicators
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user motion preferences
- **Alt Text**: Descriptive alt text for images

## 🚀 Getting Started

1. **Clone or Download**: Get the project files
2. **Open in Browser**: Open `index.html` in a web browser
3. **Local Server** (Optional): Use a local server for full functionality
4. **Customize**: Modify content, colors, and links as needed

## 📁 File Structure

```
├── index.html          # Home page
├── news.html           # News page
├── services.html       # Services page
├── resources.html      # Resources page
├── about.html          # About page
├── contact.html        # Contact page
├── community.html      # Community links page
├── updates.html        # Email updates page
├── report.html         # Report page
├── styles.css          # Main stylesheet
├── script.js           # Main JavaScript file
├── news.js             # News page functionality
├── services.js         # Services page functionality
├── resources.js        # Resources page functionality
├── community.js        # Community page functionality
└── README.md           # Project documentation
```

## 🎯 Key Features Implemented

✅ **Header with Logo & Navigation**
✅ **Slide-out Sidebar Menu**
✅ **Persistent Report Button**
✅ **Responsive Design**
✅ **Accessibility Features**
✅ **Form Validation**
✅ **Dynamic Content**
✅ **Modal System**
✅ **File Upload**
✅ **Newsletter Signup**
✅ **Contact Forms**
✅ **Social Media Integration**
✅ **Professional Design**

## 🔧 Customization

### Colors
Update CSS variables in `styles.css`:
```css
:root {
    --primary-green: #0f9d58;
    --dark-green: #0a2212;
    --white: #ffffff;
    /* ... other variables */
}
```

### Content
- **News**: Update `newsData` array in `news.js`
- **Services**: Update `servicesData` array in `services.js`
- **Resources**: Update `resourcesData` array in `resources.js`
- **Communities**: Update `communityData` array in `community.js`

### Forms
- **Contact Form**: Modify form fields in `contact.html`
- **Report Form**: Customize report categories and fields
- **Newsletter**: Update subscription preferences

## 📞 Support

For questions or issues with the website:
- **Email**: contact@emsi-crc.com
- **Report Issues**: Use the Report page on the website
- **Documentation**: Refer to this README file

## 📄 License

This project is built for the EMSI Class Representative Council. All rights reserved.

---

**Built for the EMSI community** 🎓


