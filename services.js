// Services data
const servicesData = [
    {
        id: 1,
        title: "Student Portal",
        description: "Access your academic records, grades, course schedules, and important announcements all in one place.",
        category: "academic",
        url: "https://portal.emsi.edu",
        icon: "fas fa-graduation-cap",
        featured: true
    },
    {
        id: 2,
        title: "Library Management System",
        description: "Search and reserve books, access digital resources, and manage your library account online.",
        category: "academic",
        url: "https://library.emsi.edu",
        icon: "fas fa-book",
        featured: false
    },
    {
        id: 3,
        title: "Academic Calendar",
        description: "Stay updated with important dates, deadlines, holidays, and academic events throughout the year.",
        category: "academic",
        url: "https://calendar.emsi.edu",
        icon: "fas fa-calendar-alt",
        featured: true
    },
    {
        id: 4,
        title: "Course Registration",
        description: "Register for courses, view prerequisites, and manage your academic schedule for each semester.",
        category: "academic",
        url: "https://registration.emsi.edu",
        icon: "fas fa-clipboard-list",
        featured: false
    },
    {
        id: 5,
        title: "Student Email System",
        description: "Access your official student email account for communication with faculty and administration.",
        category: "technology",
        url: "https://mail.emsi.edu",
        icon: "fas fa-envelope",
        featured: false
    },
    {
        id: 6,
        title: "Learning Management System",
        description: "Access course materials, submit assignments, participate in discussions, and track your progress.",
        category: "technology",
        url: "https://lms.emsi.edu",
        icon: "fas fa-laptop",
        featured: true
    },
    {
        id: 7,
        title: "WiFi Network Access",
        description: "Connect to the campus WiFi network with your student credentials for internet access.",
        category: "technology",
        url: "https://wifi.emsi.edu",
        icon: "fas fa-wifi",
        featured: false
    },
    {
        id: 8,
        title: "Student Support Center",
        description: "Get help with academic, technical, and administrative issues from our dedicated support team.",
        category: "support",
        url: "https://support.emsi.edu",
        icon: "fas fa-hands-helping",
        featured: true
    },
    {
        id: 9,
        title: "Career Services",
        description: "Access job opportunities, resume building tools, interview preparation, and career counseling.",
        category: "support",
        url: "https://careers.emsi.edu",
        icon: "fas fa-briefcase",
        featured: false
    },
    {
        id: 10,
        title: "Financial Aid Portal",
        description: "Apply for scholarships, view financial aid status, and manage student loan information.",
        category: "support",
        url: "https://finaid.emsi.edu",
        icon: "fas fa-dollar-sign",
        featured: false
    },
    {
        id: 11,
        title: "Counseling Services",
        description: "Access mental health support, academic counseling, and personal development resources.",
        category: "wellness",
        url: "https://counseling.emsi.edu",
        icon: "fas fa-heart",
        featured: true
    },
    {
        id: 12,
        title: "Health Services",
        description: "Schedule appointments, access health records, and find information about campus health services.",
        category: "wellness",
        url: "https://health.emsi.edu",
        icon: "fas fa-user-md",
        featured: false
    },
    {
        id: 13,
        title: "Fitness Center",
        description: "Access gym facilities, fitness classes, and wellness programs available to all students.",
        category: "wellness",
        url: "https://fitness.emsi.edu",
        icon: "fas fa-dumbbell",
        featured: false
    },
    {
        id: 14,
        title: "Housing Portal",
        description: "Apply for on-campus housing, manage room assignments, and access housing-related services.",
        category: "support",
        url: "https://housing.emsi.edu",
        icon: "fas fa-home",
        featured: false
    },
    {
        id: 15,
        title: "Transportation Services",
        description: "Access campus shuttle schedules, parking permits, and transportation-related information.",
        category: "support",
        url: "https://transport.emsi.edu",
        icon: "fas fa-bus",
        featured: false
    },
    {
        id: 16,
        title: "Dining Services",
        description: "View meal plans, dining hall hours, menus, and manage your dining account balance.",
        category: "support",
        url: "https://dining.emsi.edu",
        icon: "fas fa-utensils",
        featured: false
    }
];

// DOM Elements
const servicesGrid = document.getElementById('servicesGrid');
const categoryButtons = document.querySelectorAll('.category-btn');

// State
let currentCategory = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderServices();
    initCategoryFilters();
});

// Render services
function renderServices() {
    const filteredServices = getFilteredServices();
    
    servicesGrid.innerHTML = '';
    
    filteredServices.forEach(service => {
        const serviceCard = createServiceCard(service);
        servicesGrid.appendChild(serviceCard);
    });
}

// Create service card element
function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.setAttribute('data-category', service.category);
    
    if (service.featured) {
        card.classList.add('featured');
    }
    
    card.innerHTML = `
        <div class="service-icon">
            <i class="${service.icon}"></i>
        </div>
        <div class="service-content">
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
            <div class="service-category">${service.category}</div>
        </div>
        <div class="service-action">
            <a href="${service.url}" target="_blank" rel="noopener noreferrer" class="service-btn">
                Open Service
                <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `;
    
    return card;
}

// Get filtered services based on current category
function getFilteredServices() {
    if (currentCategory === 'all') {
        return servicesData.sort((a, b) => {
            // Featured services first, then alphabetical
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return a.title.localeCompare(b.title);
        });
    }
    return servicesData
        .filter(service => service.category === currentCategory)
        .sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return a.title.localeCompare(b.title);
        });
}

// Initialize category filter functionality
function initCategoryFilters() {
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update category
            currentCategory = this.getAttribute('data-category');
            
            // Re-render services
            renderServices();
        });
    });
}

// Add CSS for services-specific styles
const servicesStyles = `
    .page-header {
        background: linear-gradient(135deg, var(--light-gray) 0%, var(--white) 100%);
        padding: 4rem 2rem 2rem;
        text-align: center;
    }
    
    .page-header h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--dark-green);
        margin-bottom: 1rem;
    }
    
    .page-header p {
        font-size: 1.2rem;
        color: var(--medium-gray);
        max-width: 600px;
        margin: 0 auto;
    }
    
    .services-categories {
        background: var(--white);
        padding: 2rem;
        border-bottom: 1px solid var(--light-gray);
    }
    
    .category-filters {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    .category-btn {
        padding: 0.75rem 1.5rem;
        border: 2px solid var(--primary-green);
        background: var(--white);
        color: var(--primary-green);
        border-radius: var(--border-radius);
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
        text-transform: capitalize;
    }
    
    .category-btn:hover,
    .category-btn.active {
        background: var(--primary-green);
        color: var(--white);
    }
    
    .services-section {
        padding: 3rem 2rem;
        background: var(--light-gray);
    }
    
    .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
    }
    
    .service-card {
        background: var(--white);
        border-radius: var(--border-radius);
        padding: 2rem;
        box-shadow: var(--shadow);
        transition: var(--transition);
        display: flex;
        flex-direction: column;
        border: 1px solid var(--light-gray);
    }
    
    .service-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    
    .service-card.featured {
        border: 2px solid var(--primary-green);
        position: relative;
    }
    
    .service-card.featured::before {
        content: 'Featured';
        position: absolute;
        top: -10px;
        right: 20px;
        background: var(--primary-green);
        color: var(--white);
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .service-icon {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, var(--primary-green), var(--dark-green));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--white);
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }
    
    .service-content {
        flex: 1;
        margin-bottom: 1.5rem;
    }
    
    .service-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--dark-green);
        margin-bottom: 1rem;
        line-height: 1.3;
    }
    
    .service-description {
        color: var(--medium-gray);
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    .service-category {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        background: var(--light-gray);
        color: var(--dark-green);
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .service-action {
        margin-top: auto;
    }
    
    .service-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--primary-green);
        color: var(--white);
        padding: 0.75rem 1.5rem;
        border-radius: var(--border-radius);
        text-decoration: none;
        font-weight: 600;
        transition: var(--transition);
        width: 100%;
        justify-content: center;
    }
    
    .service-btn:hover {
        background: var(--dark-green);
        transform: translateY(-2px);
        box-shadow: var(--shadow);
    }
    
    .quick-access {
        background: var(--white);
        padding: 3rem 2rem;
    }
    
    .quick-access h2 {
        text-align: center;
        font-size: 2rem;
        font-weight: 700;
        color: var(--dark-green);
        margin-bottom: 2rem;
    }
    
    .quick-links {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
    }
    
    .quick-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem 1rem;
        background: var(--light-gray);
        border-radius: var(--border-radius);
        text-decoration: none;
        color: var(--dark-green);
        transition: var(--transition);
        border: 2px solid transparent;
    }
    
    .quick-link:hover {
        background: var(--primary-green);
        color: var(--white);
        transform: translateY(-3px);
        box-shadow: var(--shadow-lg);
    }
    
    .quick-link i {
        font-size: 2rem;
        color: var(--primary-green);
        transition: var(--transition);
    }
    
    .quick-link:hover i {
        color: var(--white);
    }
    
    .quick-link span {
        font-weight: 600;
        text-align: center;
    }
    
    @media (max-width: 768px) {
        .page-header h1 {
            font-size: 2rem;
        }
        
        .services-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .service-card {
            padding: 1.5rem;
        }
        
        .category-filters {
            gap: 0.5rem;
        }
        
        .category-btn {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
        }
        
        .quick-links {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }
        
        .quick-link {
            padding: 1.5rem 0.5rem;
        }
        
        .quick-link i {
            font-size: 1.5rem;
        }
    }
    
    @media (max-width: 480px) {
        .quick-links {
            grid-template-columns: 1fr;
        }
    }
`;

// Inject services styles
const styleSheet = document.createElement('style');
styleSheet.textContent = servicesStyles;
document.head.appendChild(styleSheet);


