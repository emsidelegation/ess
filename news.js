// News data (in a real application, this would come from a CMS or API)
const newsData = [
    {
        id: 1,
        title: "Welcome to the New Academic Year 2024-2025",
        summary: "Join us as we kick off another exciting academic year with new initiatives and opportunities for student engagement.",
        content: "We're thrilled to welcome all students to the new academic year! This year, we have several exciting initiatives planned including enhanced student support services, new community events, and improved communication channels. Our council is committed to representing your interests and ensuring your voice is heard throughout the academic year.",
        category: "announcements",
        date: "2024-09-15",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
        featured: true
    },
    {
        id: 2,
        title: "Student Council Elections - Nominations Open",
        summary: "Nominations are now open for various student council positions. Make your voice heard by running for office!",
        content: "The time has come to elect new representatives for the upcoming term. We're looking for passionate students who want to make a difference in our community. Positions available include Class Representatives, Event Coordinators, and Communication Officers. Nomination forms are available at the student affairs office and online.",
        category: "announcements",
        date: "2024-09-12",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
        featured: false
    },
    {
        id: 3,
        title: "Fall Festival 2024 - Save the Date",
        summary: "Mark your calendars for our annual Fall Festival featuring food, games, and entertainment for the entire EMSI community.",
        content: "Join us for our biggest event of the semester! The Fall Festival will feature local food vendors, carnival games, live music, and much more. This is a great opportunity to connect with fellow students, faculty, and staff in a fun, relaxed environment. Admission is free for all EMSI students.",
        category: "events",
        date: "2024-09-10",
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
        featured: true
    },
    {
        id: 4,
        title: "New Study Spaces Available in Library",
        summary: "The library has opened new collaborative study spaces equipped with modern technology and comfortable seating.",
        content: "We're excited to announce the opening of new study spaces in the main library. These areas feature modern technology, comfortable seating, and are designed to support both individual and group study. The spaces are available on a first-come, first-served basis and are open during regular library hours.",
        category: "updates",
        date: "2024-09-08",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
        featured: false
    },
    {
        id: 5,
        title: "Mental Health Awareness Week",
        summary: "Join us for a week of activities focused on mental health awareness and student wellness resources.",
        content: "Mental health is a priority for our community. This week, we'll be hosting various activities including workshops, guest speakers, and wellness activities. Learn about available resources, coping strategies, and how to support your peers. All activities are free and open to all students.",
        category: "events",
        date: "2024-09-05",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
        featured: false
    },
    {
        id: 6,
        title: "Updated Academic Calendar Available",
        summary: "The updated academic calendar for the fall semester is now available with all important dates and deadlines.",
        content: "Please review the updated academic calendar which includes all important dates, deadlines, and holidays for the fall semester. Key dates include midterm exams, registration periods, and semester breaks. The calendar is available in both digital and print formats.",
        category: "updates",
        date: "2024-09-03",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
        featured: false
    },
    {
        id: 7,
        title: "Student Feedback Survey Results",
        summary: "Thank you to all students who participated in our recent feedback survey. Here are the results and our action plan.",
        content: "We received over 300 responses to our student feedback survey. The results show strong satisfaction with most services, with areas for improvement identified in communication and event planning. We're implementing several changes based on your feedback, including a new communication app and more diverse event programming.",
        category: "updates",
        date: "2024-08-30",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        featured: false
    },
    {
        id: 8,
        title: "Career Fair 2024 - Registration Open",
        summary: "Registration is now open for our annual career fair featuring top employers and networking opportunities.",
        content: "Don't miss this opportunity to connect with potential employers and explore career opportunities. The career fair will feature companies from various industries, resume review sessions, and networking workshops. Early registration is recommended as spaces are limited.",
        category: "events",
        date: "2024-08-28",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop",
        featured: true
    }
];

// DOM Elements
const newsGrid = document.getElementById('newsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const newsModal = document.getElementById('newsModal');
const closeModal = document.getElementById('closeModal');

// State
let currentFilter = 'all';
let displayedNews = 6;
const newsPerLoad = 6;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderNews();
    initFilters();
    initModal();
    initLoadMore();
});

// Render news items
function renderNews() {
    const filteredNews = getFilteredNews();
    const newsToShow = filteredNews.slice(0, displayedNews);
    
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
    
    card.innerHTML = `
        <div class="news-image">
            <img src="${news.image}" alt="${news.title}" loading="lazy">
            <div class="news-category ${categoryClass}">${news.category}</div>
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
    document.getElementById('modalCategory').textContent = news.category;
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
    
    .category-announcements {
        background: var(--primary-green);
        color: var(--white);
    }
    
    .category-events {
        background: #ff6b35;
        color: var(--white);
    }
    
    .category-updates {
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


