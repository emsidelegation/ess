// Resources data
const resourcesData = [
    {
        id: 1,
        title: "Fiche Filières",
        description: "Présentation des 5 filières de l’EMSI : Présentation de la filière, Objectifs du programme, Options disponibles, Structure du cursus, Débouchés professionnels, Présentation de l’EMSI.",
        category: "",
        type: "",
        size: "",
        url: "https://drive.google.com/drive/folders/1MJuR1LLPVx9Pe5jiPr-LZvwVgq8kit7r?usp=drive_link",
        featured: false
    },
    {
        id: 2,
        title: "Orientation",
        description: "Guide et présentation des filières, avec aide pour le choix de l’orientation.",
        category: "",
        type: "",
        size: "",
        url: "https://drive.google.com/drive/folders/1NNJnFYP18v1_NWFVaMr2tKY7z4eM1sgk?usp=drive_link",
        featured: false
    },
    {
        id: 3,
        title: "Ressources Carrier Center",
        description: "Guide de carrière fourni par le Centre de Carrière, avec des modèles de CV et de lettres de motivation.",
        category: "",
        type: "",
        size: "",
        url: "https://drive.google.com/drive/folders/1KUdnlfFhrlkdQk4oxpVWS13PojsDfseM?usp=drive_link",
        featured: false
    },
    {
        id: 4,
        title: "Brochure EMSI",
        description: "",
        category: "",
        type: "",
        size: "",
        url: "https://drive.google.com/file/d/1sCyxrVC0VdvfxEotqE8_6DonQQWACw-9/view?usp=drive_link",
        featured: false
    },
    {
        id: 5,
        title: "Guide Coursera",
        description: "Procédure d’inscription sur la plateforme Coursera.",
        category: "",
        type: "",
        size: "",
        url: "https://drive.google.com/file/d/1RBmjkOodIbrcfCb1Hs5bla6LrzVyQDZR/view?usp=drive_link",
        featured: false
    },
    {
        id: 6,
        title: "Tutoriel Coursera ",
        description: "Tutoriel de la procédure d’inscription sur la plateforme Coursera.",
        category: "",
        type: "",
        size: "",
        url: "https://emsicorp-my.sharepoint.com/personal/a_jade_emsi_ma/_layouts/15/stream.aspx?id=%2Fpersonal%2Fa%5Fjade%5Femsi%5Fma%2FDocuments%2FETUDIANT%20EMSI%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E4ecb4c04%2D0421%2D48aa%2D9782%2D8aaa9bdc3fdd&ga=1",
        featured: false
    },
    {
        id: 7,
        title: "Rapport Mini Projet",
        description: "",
        category: "",
        type: "",
        size: "",
        url: "https://drive.google.com/file/d/10VA-3L-S4qJjnWV9plQ_99iM9We4GrDo/view?usp=drive_link",
        featured: false
    },
    
];

// DOM Elements
const resourcesGrid = document.getElementById('resourcesGrid');
const categoryButtons = document.querySelectorAll('.category-btn');

// State
let currentCategory = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderResources();
    initCategoryFilters();
});

// Render resources
function renderResources() {
    const filteredResources = getFilteredResources();
    
    resourcesGrid.innerHTML = '';
    
    filteredResources.forEach(resource => {
        const resourceCard = createResourceCard(resource);
        resourcesGrid.appendChild(resourceCard);
    });
}

// Create resource card element
function createResourceCard(resource) {
    const card = document.createElement('div');
    card.className = 'resource-card';
    card.setAttribute('data-category', resource.category);
    
    if (resource.featured) {
        card.classList.add('featured');
    }
    
    const fileIcon = getFileIcon(resource.type);
    
    card.innerHTML = `
        <div class="resource-icon">
            <i class="${fileIcon}"></i>
        </div>
        <div class="resource-content">
            <h3 class="resource-title">${resource.title}</h3>
            <p class="resource-description">${resource.description}</p>
            <div class="resource-meta">
                <span class="resource-category">${resource.category}</span>
                <span class="resource-size">${resource.size}</span>
            </div>
        </div>
        <div class="resource-action">
            <a href="${resource.url}" download class="download-btn">
                <i class="fas fa-download"></i>
                Download
            </a>
        </div>
    `;
    
    return card;
}

// Get file icon based on file type
function getFileIcon(type) {
    const icons = {
        'pdf': 'fas fa-file-pdf',
        'word': 'fas fa-file-word',
        'excel': 'fas fa-file-excel',
        'powerpoint': 'fas fa-file-powerpoint',
        'image': 'fas fa-file-image',
        'video': 'fas fa-file-video',
        'audio': 'fas fa-file-audio',
        'archive': 'fas fa-file-archive',
        'code': 'fas fa-file-code',
        'text': 'fas fa-file-alt'
    };
    return icons[type] || 'fas fa-file';
}

// Get filtered resources based on current category
function getFilteredResources() {
    if (currentCategory === 'all') {
        return resourcesData.sort((a, b) => {
            // Featured resources first, then alphabetical
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return a.title.localeCompare(b.title);
        });
    }
    return resourcesData
        .filter(resource => resource.category === currentCategory)
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
            
            // Re-render resources
            renderResources();
        });
    });
}

// Add CSS for resources-specific styles
const resourcesStyles = `
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
    
    .resource-categories {
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
    
    .resources-section {
        padding: 3rem 2rem;
        background: var(--light-gray);
    }
    
    .resources-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
    }
    
    .resource-card {
        background: var(--white);
        border-radius: var(--border-radius);
        padding: 2rem;
        box-shadow: var(--shadow);
        transition: var(--transition);
        display: flex;
        flex-direction: column;
        border: 2px solid var(--dark-green); /* dark green outline for resource boxes */
    }
    
    .resource-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    
    .resource-card.featured {
        border: 2px solid var(--primary-green);
        position: relative;
    }
    
    .resource-card.featured::before {
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
    
    .resource-icon {
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
    
    .resource-content {
        flex: 1;
        margin-bottom: 1.5rem;
    }
    
    .resource-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--dark-green);
        margin-bottom: 1rem;
        line-height: 1.3;
    }
    
    .resource-description {
        color: var(--medium-gray);
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    .resource-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .resource-category {
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
    
    .resource-size {
        color: var(--medium-gray);
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .resource-action {
        margin-top: auto;
    }
    
    .download-btn {
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
    
    .download-btn:hover {
        background: var(--dark-green);
        transform: translateY(-2px);
        box-shadow: var(--shadow);
    }
    
    .quick-downloads {
        background: var(--white);
        padding: 3rem 2rem;
    }
    
    .quick-downloads h2 {
        text-align: center;
        font-size: 2rem;
        font-weight: 700;
        color: var(--dark-green);
        margin-bottom: 2rem;
    }
    
    .download-links {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
    }
    
    .download-link {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        background: var(--light-gray);
        border-radius: var(--border-radius);
        text-decoration: none;
        color: var(--dark-green);
        transition: var(--transition);
        border: 2px solid transparent;
    }
    
    .download-link:hover {
        background: var(--primary-green);
        color: var(--white);
        transform: translateY(-3px);
        box-shadow: var(--shadow-lg);
    }
    
    .download-link i:first-child {
        font-size: 2rem;
        color: var(--primary-green);
        transition: var(--transition);
    }
    
    .download-link:hover i:first-child {
        color: var(--white);
    }
    
    .download-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .download-title {
        font-weight: 600;
        font-size: 1.1rem;
    }
    
    .download-size {
        font-size: 0.875rem;
        opacity: 0.8;
    }
    
    .download-link i:last-child {
        font-size: 1.2rem;
        opacity: 0.7;
    }
    
    @media (max-width: 768px) {
        .page-header h1 {
            font-size: 2rem;
        }
        
        .resources-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .resource-card {
            padding: 1.5rem;
        }
        
        .category-filters {
            gap: 0.5rem;
        }
        
        .category-btn {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
        }
        
        .download-links {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .download-link {
            padding: 1rem;
        }
        
        .download-link i:first-child {
            font-size: 1.5rem;
        }
    }
`;

// Inject resources styles
const styleSheet = document.createElement('style');
styleSheet.textContent = resourcesStyles;
document.head.appendChild(styleSheet);


