// Community links data
const communityData = [
    {
        id: 1,
        title: "EMSI Student Forum",
        description: "Official student discussion forum for academic discussions, event announcements, and peer support.",
        category: "forums",
        url: "https://forum.emsi.edu",
        icon: "fas fa-comments",
        members: "500+",
        featured: true
    },
    {
        id: 2,
        title: "Alumni Network",
        description: "Connect with EMSI graduates for mentorship, career advice, and professional opportunities.",
        category: "alumni",
        url: "https://alumni.emsi.edu",
        icon: "fas fa-users",
        members: "1200+",
        featured: true
    },
    {
        id: 3,
        title: "Study Groups Hub",
        description: "Find and join study groups for various subjects and courses.",
        category: "forums",
        url: "https://study.emsi.edu",
        icon: "fas fa-book",
        members: "300+",
        featured: false
    },
    {
        id: 4,
        title: "Career Development Network",
        description: "Professional networking platform for internships, jobs, and career guidance.",
        category: "professional",
        url: "https://careers.emsi.edu",
        icon: "fas fa-briefcase",
        members: "800+",
        featured: false
    },
    {
        id: 5,
        title: "EMSI Discord Server",
        description: "Real-time chat server for instant communication and community building.",
        category: "social",
        url: "https://discord.gg/emsi",
        icon: "fab fa-discord",
        members: "400+",
        featured: true
    },
    {
        id: 6,
        title: "Facebook Group",
        description: "Social media group for sharing photos, updates, and casual conversations.",
        category: "social",
        url: "https://facebook.com/groups/emsi",
        icon: "fab fa-facebook",
        members: "600+",
        featured: false
    },
    {
        id: 7,
        title: "LinkedIn Alumni Group",
        description: "Professional networking group for current students and alumni.",
        category: "professional",
        url: "https://linkedin.com/groups/emsi-alumni",
        icon: "fab fa-linkedin",
        members: "900+",
        featured: false
    },
    {
        id: 8,
        title: "Reddit Community",
        description: "Discussion forum for memes, advice, and general student life topics.",
        category: "social",
        url: "https://reddit.com/r/emsi",
        icon: "fab fa-reddit",
        members: "250+",
        featured: false
    },
    {
        id: 9,
        title: "Telegram Group",
        description: "Messaging group for quick updates and informal discussions.",
        category: "social",
        url: "https://t.me/emsi_students",
        icon: "fab fa-telegram",
        members: "350+",
        featured: false
    },
    {
        id: 10,
        title: "Slack Workspace",
        description: "Professional communication platform for project collaboration and team discussions.",
        category: "professional",
        url: "https://emsi.slack.com",
        icon: "fab fa-slack",
        members: "200+",
        featured: false
    },
    {
        id: 11,
        title: "Instagram Community",
        description: "Visual content sharing platform for campus life, events, and student stories.",
        category: "social",
        url: "https://instagram.com/emsi_students",
        icon: "fab fa-instagram",
        members: "700+",
        featured: false
    },
    {
        id: 12,
        title: "YouTube Channel",
        description: "Video content including campus tours, event recordings, and student testimonials.",
        category: "social",
        url: "https://youtube.com/emsi",
        icon: "fab fa-youtube",
        members: "150+",
        featured: false
    },
    {
        id: 13,
        title: "TikTok Community",
        description: "Short-form video content showcasing student life and campus culture.",
        category: "social",
        url: "https://tiktok.com/@emsi_students",
        icon: "fab fa-tiktok",
        members: "100+",
        featured: false
    },
    {
        id: 14,
        title: "GitHub Organization",
        description: "Code repository and collaboration platform for programming projects and assignments.",
        category: "professional",
        url: "https://github.com/emsi-students",
        icon: "fab fa-github",
        members: "180+",
        featured: false
    },
    {
        id: 15,
        title: "Eventbrite Group",
        description: "Event discovery and registration platform for campus events and activities.",
        category: "forums",
        url: "https://eventbrite.com/emsi",
        icon: "fas fa-calendar",
        members: "400+",
        featured: false
    },
    {
        id: 16,
        title: "Meetup Group",
        description: "Local meetup platform for organizing study sessions, social events, and networking.",
        category: "forums",
        url: "https://meetup.com/emsi-students",
        icon: "fas fa-handshake",
        members: "120+",
        featured: false
    }
];

// DOM Elements
const communityGrid = document.getElementById('communityGrid');
const categoryButtons = document.querySelectorAll('.category-btn');

// State
let currentCategory = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderCommunities();
    initCategoryFilters();
});

// Render communities
function renderCommunities() {
    const filteredCommunities = getFilteredCommunities();
    
    communityGrid.innerHTML = '';
    
    filteredCommunities.forEach(community => {
        const communityCard = createCommunityCard(community);
        communityGrid.appendChild(communityCard);
    });
}

// Create community card element
function createCommunityCard(community) {
    const card = document.createElement('div');
    card.className = 'community-card';
    card.setAttribute('data-category', community.category);
    
    if (community.featured) {
        card.classList.add('featured');
    }
    
    card.innerHTML = `
        <div class="community-icon">
            <i class="${community.icon}"></i>
        </div>
        <div class="community-content">
            <h3 class="community-title">${community.title}</h3>
            <p class="community-description">${community.description}</p>
            <div class="community-meta">
                <span class="community-category">${community.category}</span>
                <span class="community-members">${community.members} members</span>
            </div>
        </div>
        <div class="community-action">
            <a href="${community.url}" target="_blank" rel="noopener noreferrer" class="join-btn">
                <i class="fas fa-external-link-alt"></i>
                Join Community
            </a>
        </div>
    `;
    
    return card;
}

// Get filtered communities based on current category
function getFilteredCommunities() {
    if (currentCategory === 'all') {
        return communityData.sort((a, b) => {
            // Featured communities first, then alphabetical
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return a.title.localeCompare(b.title);
        });
    }
    return communityData
        .filter(community => community.category === currentCategory)
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
            
            // Re-render communities
            renderCommunities();
        });
    });
}

// Add CSS for community-specific styles
const communityStyles = `
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
    
    .community-categories {
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
    
    .community-section {
        padding: 3rem 2rem;
        background: var(--light-gray);
    }
    
    .community-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
    }
    
    .community-card {
        background: var(--white);
        border-radius: var(--border-radius);
        padding: 2rem;
        box-shadow: var(--shadow);
        transition: var(--transition);
        display: flex;
        flex-direction: column;
        border: 1px solid var(--light-gray);
    }
    
    .community-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    
    .community-card.featured {
        border: 2px solid var(--primary-green);
        position: relative;
    }
    
    .community-card.featured::before {
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
    
    .community-icon {
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
    
    .community-content {
        flex: 1;
        margin-bottom: 1.5rem;
    }
    
    .community-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--dark-green);
        margin-bottom: 1rem;
        line-height: 1.3;
    }
    
    .community-description {
        color: var(--medium-gray);
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    .community-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .community-category {
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
    
    .community-members {
        color: var(--medium-gray);
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .community-action {
        margin-top: auto;
    }
    
    .join-btn {
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
    
    .join-btn:hover {
        background: var(--dark-green);
        transform: translateY(-2px);
        box-shadow: var(--shadow);
    }
    
    .featured-communities {
        background: var(--white);
        padding: 3rem 2rem;
    }
    
    .featured-communities h2 {
        text-align: center;
        font-size: 2rem;
        font-weight: 700;
        color: var(--dark-green);
        margin-bottom: 2rem;
    }
    
    .featured-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }
    
    .featured-card {
        background: var(--light-gray);
        border-radius: var(--border-radius);
        padding: 2rem;
        text-align: center;
        transition: var(--transition);
        border: 2px solid transparent;
    }
    
    .featured-card:hover {
        background: var(--primary-green);
        color: var(--white);
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    
    .featured-icon {
        width: 80px;
        height: 80px;
        background: var(--primary-green);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--white);
        font-size: 2rem;
        margin: 0 auto 1.5rem;
        transition: var(--transition);
    }
    
    .featured-card:hover .featured-icon {
        background: var(--white);
        color: var(--primary-green);
    }
    
    .featured-card h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: var(--dark-green);
        transition: var(--transition);
    }
    
    .featured-card:hover h3 {
        color: var(--white);
    }
    
    .featured-card p {
        color: var(--medium-gray);
        margin-bottom: 1.5rem;
        line-height: 1.6;
        transition: var(--transition);
    }
    
    .featured-card:hover p {
        color: var(--white);
    }
    
    .featured-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--white);
        color: var(--primary-green);
        padding: 0.75rem 1.5rem;
        border-radius: var(--border-radius);
        text-decoration: none;
        font-weight: 600;
        transition: var(--transition);
    }
    
    .featured-card:hover .featured-link {
        background: var(--dark-green);
        color: var(--white);
    }
    
    .quick-join {
        background: var(--light-gray);
        padding: 3rem 2rem;
    }
    
    .quick-join h2 {
        text-align: center;
        font-size: 2rem;
        font-weight: 700;
        color: var(--dark-green);
        margin-bottom: 2rem;
    }
    
    .join-links {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
    }
    
    .join-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem 1rem;
        background: var(--white);
        border-radius: var(--border-radius);
        text-decoration: none;
        color: var(--dark-green);
        transition: var(--transition);
        border: 2px solid transparent;
    }
    
    .join-link:hover {
        background: var(--primary-green);
        color: var(--white);
        transform: translateY(-3px);
        box-shadow: var(--shadow-lg);
    }
    
    .join-link i {
        font-size: 2rem;
        color: var(--primary-green);
        transition: var(--transition);
    }
    
    .join-link:hover i {
        color: var(--white);
    }
    
    .join-link span {
        font-weight: 600;
        text-align: center;
    }
    
    @media (max-width: 768px) {
        .page-header h1 {
            font-size: 2rem;
        }
        
        .community-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .community-card {
            padding: 1.5rem;
        }
        
        .category-filters {
            gap: 0.5rem;
        }
        
        .category-btn {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
        }
        
        .featured-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .join-links {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }
        
        .join-link {
            padding: 1.5rem 0.5rem;
        }
        
        .join-link i {
            font-size: 1.5rem;
        }
    }
    
    @media (max-width: 480px) {
        .join-links {
            grid-template-columns: 1fr;
        }
    }
`;

// Inject community styles
const styleSheet = document.createElement('style');
styleSheet.textContent = communityStyles;
document.head.appendChild(styleSheet);


