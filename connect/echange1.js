import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
        
const supabaseUrl = 'https://jropljlziznpzypvxjkw.supabase.co';  
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyb3Bsamx6aXpucHp5cHZ4amt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NjU4MDksImV4cCI6MjA3MzU0MTgwOX0.QVo5bdwTguruXeY5oTmePtcLq__A65zFT7zq0SFT0Lc'; 

const supabase = createClient(supabaseUrl, supabaseAnonKey);

let myUserId = localStorage.getItem('myUserId') || crypto.randomUUID();
localStorage.setItem('myUserId', myUserId);

const requestForm = document.getElementById('request-form');
const requestsList = document.getElementById('requests-list');
const loadingRequests = document.getElementById('loading-requests');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const messageOkBtn = document.getElementById('message-ok-btn');
const messageCancelBtn = document.getElementById('message-cancel-btn');
const statusMessage = document.getElementById('status-message');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');
const submitSpinner = document.getElementById('submit-spinner');

// Mise à jour pour les champs de recherche et de soumission
const searchVilleInput = document.getElementById('searchVille');
const searchCampusDesireInput = document.getElementById('searchCampusDesire'); // Remplacé searchCampusInput
const searchCampusActuelInput = document.getElementById('searchCampusActuel'); // Nouveau champ

const submissionVilleInput = document.getElementById('ville');
const submissionCampusActuelInput = document.getElementById('campusActuel');
const submissionCampusDesireInput = document.getElementById('campusDesire');
const submissionNiveauInput = document.getElementById('niveau');
const totalRequestsSpan = document.getElementById('total-requests');
const welcomeMessage = document.getElementById('welcome-message');
const acknowledgeBtn = document.getElementById('acknowledge-btn');
const notificationPopUp = document.getElementById('notification-pop-up');
const notificationIcon = document.getElementById('notification-icon');
const notificationMessage = document.getElementById('notification-message');
    
let allRequests = [];

const campusOptions = {
    'TANGER': ['TANGER'],
    'RABAT': ['CENTRE 1', 'CENTRE 2', 'AGDAL 1', 'AGDAL 2', 'HASSAN', 'SOUISSI', 'BOUREGRAG'],
    'MARRAKECH': ['CENTRE', 'GUELIZ'],
    'CASABLANCA': ['CENTRE 1', 'CENTRE 2', 'ANFA', 'YOUSSEF', 'LES ORANGERS', 'MAARIF', 'ROUDANI'],
    'FES': ['FES']
};

// Fonction mise à jour pour gérer le remplissage des options de campus
const updateCampusOptions = (villeSelect, campusSelect) => {
    const selectedVille = villeSelect.value;
    const campuses = campusOptions[selectedVille] || [];
    
    // Ajoute l'option "Tous les campus" uniquement pour les filtres (recherche)
    const isSearchField = campusSelect.id.includes('search');
    campusSelect.innerHTML = isSearchField ? '<option value="">Tous les campus</option>' : '<option value="">Sélectionnez un campus</option>';
    
    campuses.forEach(campus => {
        const option = document.createElement('option');
        option.value = campus;
        option.textContent = campus;
        campusSelect.appendChild(option);
    });
};

// Listeners pour mettre à jour les options de campus dans la section de recherche
searchVilleInput.addEventListener('change', () => {
    // Mettre à jour les options de campus actuel ET souhaité dans le filtre
    updateCampusOptions(searchVilleInput, searchCampusActuelInput);
    updateCampusOptions(searchVilleInput, searchCampusDesireInput);
    filterRequests();
});

// Listener pour mettre à jour les options de campus dans la section de soumission
submissionVilleInput.addEventListener('change', () => {
    updateCampusOptions(submissionVilleInput, submissionCampusActuelInput);
    updateCampusOptions(submissionVilleInput, submissionCampusDesireInput);
});

const setStatusMessage = (message, type) => {
    statusMessage.textContent = message;
    statusMessage.className = 'mb-4 p-4 text-center rounded-lg text-sm font-medium';
    if (type === 'error') {
        statusMessage.classList.add('bg-red-100', 'text-red-700', 'block');
    } else if (type === 'success') {
        statusMessage.classList.add('bg-green-100', 'text-green-700', 'block');
    }
};

const showNotification = (message, type) => {
    notificationMessage.textContent = message;
    notificationPopUp.classList.remove('hidden');
    notificationPopUp.classList.remove('bg-green-600', 'bg-red-600');
    notificationIcon.className = '';

    if (type === 'success') {
        notificationPopUp.classList.add('bg-green-600');
        notificationIcon.classList.add('fas', 'fa-check-circle');
    } else if (type === 'error') {
        notificationPopUp.classList.add('bg-red-600');
        notificationIcon.classList.add('fas', 'fa-exclamation-circle');
    }

    notificationPopUp.style.animation = 'none';
    notificationPopUp.offsetHeight; 
    notificationPopUp.style.animation = null; 
    
    setTimeout(() => {
        notificationPopUp.classList.add('hidden');
    }, 3000); 
};

const showMessageBox = (message, isConfirm = false, onConfirm = null) => {
    messageText.textContent = message;
    messageBox.style.display = 'flex';
    if (isConfirm) {
        messageOkBtn.textContent = 'Oui';
        messageCancelBtn.classList.remove('hidden');
        messageOkBtn.onclick = () => {
            messageBox.style.display = 'none';
            if (onConfirm) onConfirm();
        };
        messageCancelBtn.onclick = () => {
            messageBox.style.display = 'none';
        };
    } else {
        messageOkBtn.textContent = 'OK';
        messageCancelBtn.classList.add('hidden');
        messageOkBtn.onclick = () => {
            messageBox.style.display = 'none';
        };
    }
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const createRequestCard = (data) => {
    const card = document.createElement('div');
    card.className = "request-card bg-white p-4 rounded-xl shadow-md border border-green-200 flex flex-col justify-between";
    
    // Le champ 'classe' dans la base de données est en fait le campus actuel (campusActuel)
    card.innerHTML = `
        <div class="space-y-2">
            <p class="text-green-800 font-bold text-lg"><i class="fas fa-user-graduate mr-2 text-green-500"></i>${data.prenom} ${data.nom}</p>
            <p class="text-gray-700"><i class="fas fa-signal mr-2 text-green-500"></i>Niveau: <span class="font-medium">${data.niveau}</span></p>
            <p class="text-gray-700"><i class="fas fa-city mr-2 text-green-500"></i>Ville: <span class="font-medium">${data.ville}</span></p>
            <p class="text-gray-700"><i class="fas fa-building-columns mr-2 text-green-500"></i>Campus actuel: <span class="font-medium">${data.classe}</span></p>
            <p class="text-gray-700"><i class="fas fa-location-arrow mr-2 text-green-500"></i>Campus souhaité: <span class="font-medium text-green-600">${data.campusdesire}</span></p>
            <p class="text-xs text-gray-500 mt-2"><i class="fas fa-clock mr-1"></i>Publié le: ${formatDate(data.created_at)}</p>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <p class="text-sm font-mono text-green-600" id="numero-${data.id}">
                ${data.numero}
            </p>
            <div class="flex items-center space-x-2">
                <button class="copy-btn bg-green-100 text-green-600 px-3 py-1 text-sm rounded-full font-medium hover:bg-green-200 transition duration-200" data-numero="${data.numero}">
                    <i class="fas fa-copy mr-1"></i> Copier
                </button>
                ${data.user_id === myUserId ? `
                    <button class="delete-btn bg-red-100 text-red-600 px-3 py-1 text-sm rounded-full font-medium hover:bg-red-200 transition duration-200" data-id="${data.id}">
                        <i class="fas fa-trash-alt mr-1"></i> Supprimer
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    return card;
};

const renderRequests = (requests) => {
    requestsList.innerHTML = '';
    if (requests.length === 0) {
        requestsList.innerHTML = '<p class="col-span-1 md:col-span-2 text-center text-gray-500 p-8">Aucune demande ne correspond à votre recherche.</p>';
    } else {
        requests.forEach(request => {
            const card = createRequestCard(request);
            requestsList.appendChild(card);
        });
    }
};

const filterRequests = () => {
    const selectedVille = searchVilleInput.value.toLowerCase();
    const selectedCampusActuel = searchCampusActuelInput.value.toLowerCase(); // Nouveau filtre
    const selectedCampusDesire = searchCampusDesireInput.value.toLowerCase(); // Ancien searchCampus

    const filteredRequests = allRequests.filter(req => {
        const villeMatch = selectedVille ? req.ville.toLowerCase().includes(selectedVille) : true;
        // La colonne 'classe' correspond au campus actuel
        const campusActuelMatch = selectedCampusActuel ? req.classe.toLowerCase().includes(selectedCampusActuel) : true;
        // La colonne 'campusdesire' correspond au campus souhaité
        const campusDesireMatch = selectedCampusDesire ? req.campusdesire.toLowerCase().includes(selectedCampusDesire) : true;
        
        return villeMatch && campusActuelMatch && campusDesireMatch;
    });

    renderRequests(filteredRequests);
};

// Listeners pour déclencher le filtre
searchVilleInput.addEventListener('change', filterRequests);
searchCampusActuelInput.addEventListener('change', filterRequests);
searchCampusDesireInput.addEventListener('change', filterRequests);

requestForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    submitBtn.disabled = true;
    submitText.classList.add('hidden');
    submitSpinner.classList.remove('hidden');

    const data = {
        prenom: document.getElementById('prenom').value,
        nom: document.getElementById('nom').value,
        niveau: document.getElementById('niveau').value,
        ville: submissionVilleInput.value,
        classe: submissionCampusActuelInput.value, // Campus actuel est stocké dans 'classe'
        campusdesire: submissionCampusDesireInput.value,
        numero: document.getElementById('numero').value,
        user_id: myUserId
    };

    try {
        const { count, error: countError } = await supabase
            .from('campus_swaps')
            .select('numero', { count: 'exact' })
            .eq('numero', data.numero);

        if (countError) throw countError;

        if (count > 0) {
            showNotification("Ce numéro de téléphone a déjà été utilisé pour une demande.", 'error');
            return;
        }

        const { error } = await supabase
            .from('campus_swaps')
            .insert([data]);

        if (error) throw error;
        
        requestForm.reset();
        showNotification("Merci ! Votre demande a été publiée avec succès.", 'success');
    } catch (error) {
        console.error("Erreur détaillée de Supabase lors de l'insertion:", error);
        setStatusMessage("Échec de la publication. Vérifiez la configuration de votre base de données Supabase.", 'error');
    } finally {
        submitBtn.disabled = false;
        submitText.classList.remove('hidden');
        submitSpinner.classList.add('hidden');
    }
});

document.getElementById('clear-form-btn').addEventListener('click', () => {
    requestForm.reset();
});

requestsList.addEventListener('click', async (e) => {
    if (e.target.closest('.delete-btn')) {
        const deleteButton = e.target.closest('.delete-btn');
        const requestId = deleteButton.dataset.id;
        showMessageBox("Êtes-vous sûr de vouloir supprimer cette demande ?", true, async () => {
            try {
                const { error } = await supabase
                    .from('campus_swaps')
                    .delete()
                    .eq('id', requestId);

                if (error) throw error;
                
                showNotification("La demande a été supprimée avec succès !", 'success');
            } catch (error) {
                console.error("Erreur de Supabase lors de la suppression:", error);
                showMessageBox("Échec de la suppression. Veuillez réessayer plus tard.");
            }
        });
    }

    if (e.target.closest('.copy-btn')) {
        const copyButton = e.target.closest('.copy-btn');
        const numero = copyButton.dataset.numero;
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = numero;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showNotification("Numéro copié !", 'success');
    }
});

document.getElementById('copy-link-btn').addEventListener('click', () => {
    // Note: Mettre à jour l'URL si elle change
    const url = 'https://aymanefakihi.github.io/emsi-changement-de-campus/';
    const tempInput = document.createElement('textarea');
    document.body.appendChild(tempInput);
    tempInput.value = url;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showNotification("Lien du site copié !", 'success');
});

const setupRealtimeListener = () => {
    supabase.channel('public-changes')
        .on('postgres_changes', 
            { event: 'INSERT', schema: 'public', table: 'campus_swaps' },
            payload => {
                const newRequest = payload.new;
                allRequests.unshift(newRequest); 
                filterRequests();
                totalRequestsSpan.textContent = allRequests.length;
            })
        .on('postgres_changes',
            { event: 'DELETE', schema: 'public', table: 'campus_swaps' },
            payload => {
                const deletedId = payload.old.id;
                allRequests = allRequests.filter(req => req.id !== deletedId);
                filterRequests();
                totalRequestsSpan.textContent = allRequests.length;
            })
        .subscribe();
};

const fetchInitialRequests = async () => {
    try {
        const { data, error } = await supabase
            .from('campus_swaps')
            .select('id, prenom, nom, niveau, ville, classe, campusdesire, numero, user_id, created_at')
            .order('created_at', { ascending: false });

        if (error) throw error;
        
        allRequests = data;
        totalRequestsSpan.textContent = allRequests.length;
        filterRequests();
        
    } catch (error) {
        console.error("Erreur détaillée de Supabase lors du chargement initial:", error);
        setStatusMessage("Erreur lors du chargement des demandes. Vérifiez votre connexion et votre configuration Supabase.", 'error');
    }
};

window.onload = () => {
    const hasAcknowledged = localStorage.getItem('acknowledged_welcome');
    if (!hasAcknowledged) {
        welcomeMessage.classList.remove('hidden');
    }

    acknowledgeBtn.addEventListener('click', () => {
        welcomeMessage.classList.add('hidden');
        localStorage.setItem('acknowledged_welcome', 'true');
    });
    
    // Initialisation des options de campus de recherche pour la ville par défaut/toutes les villes
    updateCampusOptions(searchVilleInput, searchCampusActuelInput);
    updateCampusOptions(searchVilleInput, searchCampusDesireInput);


    if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
        setStatusMessage("Veuillez d'abord configurer vos clés Supabase dans le code.", 'error');
    } else {
        fetchInitialRequests();
        setupRealtimeListener();
    }
};
