import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
        
// Clés Supabase mises à jour pour le nouveau projet d'échange de groupes
const SUPABASE_TABLE_NAME = 'group_swaps'; 
const supabaseUrl = 'https://ymbvaeszbsflffzaxrvf.supabase.co';  
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltYnZhZXN6YnNmbGZmemF4cnZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNzI2MjUsImV4cCI6MjA3NDg0ODYyNX0.20EIK6ugyk-imOh9WSei9LJT8HNzC42TNMzKT_o7_aQ'; 

const supabase = createClient(supabaseUrl, supabaseAnonKey);

let myUserId = localStorage.getItem('myUserId') || crypto.randomUUID();
localStorage.setItem('myUserId', myUserId);

const requestForm = document.getElementById('request-form');
const requestsList = document.getElementById('requests-list');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const messageOkBtn = document.getElementById('message-ok-btn');
const messageCancelBtn = document.getElementById('message-cancel-btn');
const statusMessage = document.getElementById('status-message');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');
const submitSpinner = document.getElementById('submit-spinner');

// Champs de soumission
const submissionVilleInput = document.getElementById('ville');
const submissionCampusActuelInput = document.getElementById('campusActuel');
const submissionGroupeActuelInput = document.getElementById('groupeActuel');
const submissionGroupeSouhaiteInput = document.getElementById('groupeSouhaite');

// Champs de recherche
const searchVilleInput = document.getElementById('searchVille');
const searchCampusInput = document.getElementById('searchCampus');
const searchGroupeActuelInput = document.getElementById('searchGroupeActuel');
const searchGroupeSouhaiteInput = document.getElementById('searchGroupeSouhaite');

const totalRequestsSpan = document.getElementById('total-requests');
const welcomeMessage = document.getElementById('welcome-message');
const acknowledgeBtn = document.getElementById('acknowledge-btn');
const notificationPopUp = document.getElementById('notification-pop-up');
const notificationIcon = document.getElementById('notification-icon');
const notificationMessage = document.getElementById('notification-message');
    
let allRequests = [];

// Définitions des campus (identique au fichier précédent)
const campusOptions = {
    'TANGER': ['TANGER'],
    'RABAT': ['CENTRE 1', 'CENTRE 2', 'AGDAL 1', 'AGDAL 2', 'HASSAN', 'SOUISSI', 'BOUREGRAG'],
    'MARRAKECH': ['CENTRE', 'GUELIZ'],
    'CASABLANCA': ['CENTRE 1', 'CENTRE 2', 'ANFA', 'YOUSSEF', 'LES ORANGERS', 'MAARIF', 'ROUDANI'],
    'FES': ['FES']
};

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


// --- Logique d'affichage et de filtrage (Adaptée) ---

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
    const selectedCampus = searchCampusInput.value.toLowerCase();
    const selectedGroupeActuel = searchGroupeActuelInput.value.toLowerCase().trim();
    const selectedGroupeSouhaite = searchGroupeSouhaiteInput.value.toLowerCase().trim();


    const filteredRequests = allRequests.filter(req => {
        const villeMatch = selectedVille ? req.ville.toLowerCase().includes(selectedVille) : true;
        const campusMatch = selectedCampus ? req.campus.toLowerCase().includes(selectedCampus) : true;
        
        // Recherche de correspondance pour les groupes (utilise includes pour flexibilité)
        const groupeActuelMatch = selectedGroupeActuel ? req.groupe_actuel.toLowerCase().includes(selectedGroupeActuel) : true;
        const groupeSouhaiteMatch = selectedGroupeSouhaite ? req.groupe_souhaite.toLowerCase().includes(selectedGroupeSouhaite) : true;

        return villeMatch && campusMatch && groupeActuelMatch && groupeSouhaiteMatch;
    });

    renderRequests(filteredRequests);
};


// Listeners pour les options de Campus (dans la soumission et la recherche)
submissionVilleInput.addEventListener('change', () => updateCampusOptions(submissionVilleInput, submissionCampusActuelInput));
searchVilleInput.addEventListener('change', () => {
    updateCampusOptions(searchVilleInput, searchCampusInput);
    filterRequests();
});
searchCampusInput.addEventListener('change', filterRequests);
searchGroupeActuelInput.addEventListener('input', filterRequests);
searchGroupeSouhaiteInput.addEventListener('input', filterRequests);


// --- Fonctions utilitaires (Non modifiées) ---

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
    
    // Le champ 'campus' dans la base de données est le campus actuel
    card.innerHTML = `
        <div class="space-y-2">
            <p class="text-green-800 font-bold text-lg"><i class="fas fa-user-graduate mr-2 text-green-500"></i>${data.prenom} ${data.nom}</p>
            <p class="text-gray-700"><i class="fas fa-signal mr-2 text-green-500"></i>Niveau: <span class="font-medium">${data.niveau}</span></p>
            <p class="text-gray-700"><i class="fas fa-city mr-2 text-green-500"></i>Ville: <span class="font-medium">${data.ville}</span></p>
            <p class="text-gray-700"><i class="fas fa-building-columns mr-2 text-green-500"></i>Campus: <span class="font-medium">${data.campus}</span></p>
            <p class="text-gray-700"><i class="fas fa-users mr-2 text-green-500"></i>Groupe actuel: <span class="font-medium">${data.groupe_actuel}</span></p>
            <p class="text-gray-700"><i class="fas fa-arrow-right-arrow-left mr-2 text-green-500"></i>Groupe souhaité: <span class="font-medium text-green-600">${data.groupe_souhaite}</span></p>
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


// --- Logique de soumission (Adaptée) ---

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
        campus: submissionCampusActuelInput.value, // Campus actuel est stocké dans 'campus'
        groupe_actuel: submissionGroupeActuelInput.value.toUpperCase().trim(),
        groupe_souhaite: submissionGroupeSouhaiteInput.value.toUpperCase().trim(),
        numero: document.getElementById('numero').value,
        // *** Changement ici : utilisation de myUserId pour l'insertion ***
        user_id: myUserId 
    };

    try {
        const { count, error: countError } = await supabase
            .from(SUPABASE_TABLE_NAME)
            .select('numero', { count: 'exact' })
            .eq('numero', data.numero);

        if (countError) throw countError;

        if (count > 0) {
            showNotification("Ce numéro de téléphone a déjà été utilisé pour une demande de groupe.", 'error');
            return;
        }
        
        if (data.groupe_actuel === data.groupe_souhaite) {
            showNotification("Le groupe actuel ne peut pas être identique au groupe souhaité.", 'error');
            return;
        }

        const { error } = await supabase
            .from(SUPABASE_TABLE_NAME)
            .insert([data]);

        if (error) {
            // Log l'erreur détaillée pour le débogage
            console.error("Erreur détaillée de Supabase lors de l'insertion:", error);

            // Vérification si c'est une erreur RLS/d'insertion générique
            if (error.code === '42501' || error.message.includes('permission denied')) {
                // Ce message indique le besoin de vérifier le SQL RLS
                setStatusMessage("Échec de la publication (Erreur de permission RLS). Vérifiez les 4 politiques RLS sur la table 'group_swaps'.", 'error');
            } else {
                setStatusMessage(`Échec de la publication. Erreur: ${error.message}`, 'error');
            }
            throw error;
        }
        
        requestForm.reset();
        showNotification("Merci ! Votre demande d'échange de groupe a été publiée avec succès.", 'success');
    } catch (error) {
        // Le catch final s'assure que le bouton est réactivé
        if (error && error.message) {
            console.error("Final catch error:", error.message);
        }
        // Assurez-vous que le message d'erreur est visible
        if (!statusMessage.textContent.includes("Échec")) {
             setStatusMessage("Une erreur inconnue s'est produite lors de la publication.", 'error');
        }
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
                // *** On n'utilise pas auth.uid() ici car on compte sur l'ID de Supabase ***
                const { error } = await supabase
                    .from(SUPABASE_TABLE_NAME)
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
    // URL mise à jour pour echange2
    const url = 'https://aymanefakihi.github.io/emsi-changement-de-campus/echange2.html';
    const tempInput = document.createElement('textarea');
    document.body.appendChild(tempInput);
    tempInput.value = url;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showNotification("Lien du site copié !", 'success');
});

// --- Logique temps réel et chargement initial (Adaptée) ---

const setupRealtimeListener = () => {
    supabase.channel('public-group-changes')
        .on('postgres_changes', 
            { event: 'INSERT', schema: 'public', table: SUPABASE_TABLE_NAME },
            payload => {
                const newRequest = payload.new;
                allRequests.unshift(newRequest); 
                filterRequests();
                totalRequestsSpan.textContent = allRequests.length;
            })
        .on('postgres_changes',
            { event: 'DELETE', schema: 'public', table: SUPABASE_TABLE_NAME },
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
        // Mettre à jour les colonnes pour correspondre au modèle de groupe
        const { data, error } = await supabase
            .from(SUPABASE_TABLE_NAME)
            .select('id, prenom, nom, niveau, ville, campus, groupe_actuel, groupe_souhaite, numero, user_id, created_at')
            .order('created_at', { ascending: false });

        if (error) throw error;
        
        allRequests = data;
        totalRequestsSpan.textContent = allRequests.length;
        filterRequests();
        
    } catch (error) {
        console.error("Erreur détaillée de Supabase lors du chargement initial:", error);
        setStatusMessage("Erreur lors du chargement des demandes. Vérifiez votre connexion et votre configuration Supabase (table group_swaps).", 'error');
    }
};

window.onload = () => {
    const hasAcknowledged = localStorage.getItem('acknowledged_welcome_group'); // Nouvelle clé pour le message de bienvenue
    if (!hasAcknowledged) {
        welcomeMessage.classList.remove('hidden');
    }

    acknowledgeBtn.addEventListener('click', () => {
        welcomeMessage.classList.add('hidden');
        localStorage.setItem('acknowledged_welcome_group', 'true');
    });
    
    // Initialisation des options de campus de soumission/recherche
    updateCampusOptions(submissionVilleInput, submissionCampusActuelInput);
    updateCampusOptions(searchVilleInput, searchCampusInput);

    // Suppression de la vérification générique des clés pour permettre le chargement
    fetchInitialRequests();
    setupRealtimeListener();
    
};
