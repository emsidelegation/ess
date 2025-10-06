// News data (in a real application, this would come from a CMS or API)
const newsData = [
    {
        id: 1,
        title: "Rentrée Scolaire de l’Année Universitaire 2025/2026",
        summary: "Direction Pédagogique: Il est porté à la connaissance des étudiants de la 2ème, 3ème et 4ème Années que la reprise des cours est prévue le Lundi 06/10/2025. Les emplois de Temps seront affichés le Vendredi 03/10/2025.",
        content: "Direction Pédagogique: Il est porté à la connaissance des étudiants de la 2ème, 3ème et 4ème Années que la reprise des cours est prévue le Lundi 06/10/2025. Les emplois de Temps seront affichés le Vendredi 03/10/2025.",
        category: "avis",
        date: "2025-09-30",
        image: "/assets/news1.png",
        featured: true
    },
    {
        id: 2,
        title: "Bonne Rentrée Universitaire 2025/2026",
        summary: "Le Conseil des Délégués de Classe vous souhaite une excellente rentrée universitaire! Nous espérons que ce nouveau semestre sera pour vous synonyme de réussite, d’ambition et de collaboration. Cette année s’annonce riche en initiatives impactantes et en projets collaboratifs visant à accompagner chaque étudiant dans son parcours à l’EMSI. Ensemble, nous continuerons à bâtir une communauté unie, dynamique et engagée. Un communiqué complet sur le début du semestre sera publié d’ici la fin de la semaine. Bonne rentrée à toutes et à tous!",
        content: "Le Conseil des Délégués de Classe vous souhaite une excellente rentrée universitaire! Nous espérons que ce nouveau semestre sera pour vous synonyme de réussite, d’ambition et de collaboration. Cette année s’annonce riche en initiatives impactantes et en projets collaboratifs visant à accompagner chaque étudiant dans son parcours à l’EMSI. Ensemble, nous continuerons à bâtir une communauté unie, dynamique et engagée. Un communiqué complet sur le début du semestre sera publié d’ici la fin de la semaine. Bonne rentrée à toutes et à tous!",
        category: "avis",
        date: "2025-10-06",
        image: "/assets/news1.png",
        featured: true
    },
    
];

// DOM Elements
const newsGrid = document.getElementById('newsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const closeModal = document.getElementById('closeModal');

// State
let currentFilter = 'all';
let displayedNews = 6;
const newsPerLoad = 6;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initFilters();
    initModal();
    initLoadMore();
    renderNews(); // Load the first 6 news automatically on page load
});

// Render news items
function renderNews() {
    const filteredNews = getFilteredNews();
    const newsToShow = filteredNews.slice(0, displayedNews);
                category: "notes",
    newsGrid.innerHTML = '';
    
    newsToShow.forEach(news => {
        const newsCard = createNewsCard(news);
        newsGrid.appendChild(newsCard);
    });
    
    // Show/hide load more button
    if (displayedNews >= filteredNews.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Create news card element
function createNewsCard(news) {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.setAttribute('data-category', news.category);
    
    const formattedDate = formatDate(news.date);
    const categoryClass = `category-${news.category}`;
    
    // Map category to display label
    let categoryLabel = news.category;
    if (news.category === 'notes') categoryLabel = 'Notes';
    else if (news.category === 'avis') categoryLabel = 'Avis aux Étudiants';
    else if (news.category === 'miseajour') categoryLabel = 'Mise à Jour';
    card.innerHTML = `
        <div class="news-image">
            <img src="${news.image}" alt="${news.title}" loading="lazy">
            <div class="news-category ${categoryClass}">${categoryLabel}</div>
        </div>
        <div class="news-content">
            <h3 class="news-title">${news.title}</h3>
            <p class="news-summary">${news.summary}</p>
            <div class="news-meta">
                <span class="news-date">
                    <i class="fas fa-calendar"></i>
                    ${formattedDate}
                </span>
                <button class="read-more-btn" data-id="${news.id}">
                    Read More <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Get filtered news based on current filter
function getFilteredNews() {
    if (currentFilter === 'all') {
        return newsData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return newsData
        .filter(news => news.category === currentFilter)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Initialize filter functionality
function initFilters() {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter and reset displayed count
            currentFilter = this.getAttribute('data-filter');
            displayedNews = newsPerLoad;
            
            // Re-render news
            renderNews();
        });
    });
}

// Initialize modal functionality
function initModal() {
    // Close modal when clicking outside
    newsModal.addEventListener('click', function(e) {
        if (e.target === newsModal) {
            closeModalFunction();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && newsModal.classList.contains('open')) {
            closeModalFunction();
        }
    });
    
    // Close modal button
    closeModal.addEventListener('click', closeModalFunction);
    
    // Handle read more button clicks
    document.addEventListener('click', function(e) {
        if (e.target.closest('.read-more-btn')) {
            const newsId = parseInt(e.target.closest('.read-more-btn').getAttribute('data-id'));
            openModal(newsId);
        }
    });
}

// Open modal with news content
function openModal(newsId) {
    const news = newsData.find(item => item.id === newsId);
    if (!news) return;
    
    // Populate modal content
    document.getElementById('modalTitle').textContent = news.title;
    document.getElementById('modalDate').textContent = formatDate(news.date);
    // Map category to display label for modal
    let modalCategoryLabel = news.category;
    if (news.category === 'notes') modalCategoryLabel = 'Notes';
    else if (news.category === 'avis') modalCategoryLabel = 'Avis aux Étudiants';
    else if (news.category === 'miseajour') modalCategoryLabel = 'Mise à Jour';
    document.getElementById('modalCategory').textContent = modalCategoryLabel;
    document.getElementById('modalText').innerHTML = `<p>${news.content}</p>`;
    
    // Set modal image
    const modalImage = document.getElementById('modalImage');
    modalImage.innerHTML = `<img src="${news.image}" alt="${news.title}">`;
    
    // Show modal
    newsModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModalFunction() {
    newsModal.classList.remove('open');
    document.body.style.overflow = '';
}

// Initialize load more functionality
function initLoadMore() {
    loadMoreBtn.addEventListener('click', function() {
        displayedNews += newsPerLoad;
        renderNews();
    });
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Add CSS for news-specific styles
const newsStyles = `
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
    
    .news-filter {
        background: var(--white);
        padding: 2rem;
        border-bottom: 1px solid var(--light-gray);
    }
    
    .filter-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    .filter-btn {
        padding: 0.75rem 1.5rem;
        border: 2px solid var(--primary-green);
        background: var(--white);
        color: var(--primary-green);
        border-radius: var(--border-radius);
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .filter-btn:hover,
    .filter-btn.active {
        background: var(--primary-green);
        color: var(--white);
    }
    
    .news-section {
        padding: 3rem 2rem;
        background: var(--light-gray);
    }
    
    .news-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }
    
    .news-card {
        background: var(--white);
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--shadow);
        transition: var(--transition);
    }
    
    .news-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    
    .news-image {
        position: relative;
        height: 200px;
        overflow: hidden;
    }
    
    .news-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition);
    }
    
    .news-card:hover .news-image img {
        transform: scale(1.05);
    }
    
    .news-category {
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .category-announcements, .category-avis {
        background: var(--primary-green);
        color: var(--white);
    }
    
    .category-events, .category-notes {
        background: #ff6b35;
        color: var(--white);
    }
    
    .category-updates, .category-miseajour {
        background: #4a90e2;
        color: var(--white);
    }
    
    .news-content {
        padding: 1.5rem;
    }
    
    .news-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--dark-green);
        margin-bottom: 1rem;
        line-height: 1.3;
    }
    
    .news-summary {
        color: var(--medium-gray);
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }
    
    .news-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .news-date {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--medium-gray);
        font-size: 0.875rem;
    }
    
    .read-more-btn {
        background: none;
        border: none;
        color: var(--primary-green);
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: var(--transition);
    }
    
    .read-more-btn:hover {
        color: var(--dark-green);
        gap: 0.75rem;
    }
    
    .load-more-container {
        text-align: center;
    }
    
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
    }
    
    .modal.open {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-content {
        background: var(--white);
        border-radius: var(--border-radius);
        max-width: 800px;
        max-height: 90vh;
        width: 90%;
        overflow-y: auto;
        transform: scale(0.9);
        transition: var(--transition);
    }
    
    .modal.open .modal-content {
        transform: scale(1);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 2rem 2rem 1rem;
        border-bottom: 1px solid var(--light-gray);
    }
    
    .modal-header h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--dark-green);
        margin: 0;
        flex: 1;
        margin-right: 1rem;
    }
    
    .close-modal {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--medium-gray);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: var(--transition);
    }
    
    .close-modal:hover {
        background: var(--light-gray);
        color: var(--dark-green);
    }
    
    .modal-body {
        padding: 1rem 2rem 2rem;
    }
    
    .modal-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
    }
    
    .modal-date,
    .modal-category {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .modal-date {
        background: var(--light-gray);
        color: var(--dark-gray);
    }
    
    .modal-category {
        background: var(--primary-green);
        color: var(--white);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .modal-image {
        margin-bottom: 1.5rem;
        border-radius: var(--border-radius);
        overflow: hidden;
    }
    
    .modal-image img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
    
    .modal-text {
        color: var(--dark-gray);
        line-height: 1.7;
        font-size: 1.1rem;
    }
    
    @media (max-width: 768px) {
        .page-header h1 {
            font-size: 2rem;
        }
        
        .news-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .filter-buttons {
            gap: 0.5rem;
        }
        
        .filter-btn {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
        }
        
        .modal-content {
            width: 95%;
            max-height: 95vh;
        }
        
        .modal-header {
            padding: 1.5rem 1.5rem 1rem;
        }
        
        .modal-header h2 {
            font-size: 1.25rem;
        }
        
        .modal-body {
            padding: 1rem 1.5rem 1.5rem;
        }
        
        .modal-image img {
            height: 200px;
        }
    }
`;

// Inject news styles
const styleSheet = document.createElement('style');
styleSheet.textContent = newsStyles;
document.head.appendChild(styleSheet);


