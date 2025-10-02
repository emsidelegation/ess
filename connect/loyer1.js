// ** Important : Remplacez par vos clés Supabase **
const supabaseUrl = 'https://nkcfqaeztbowlpfceaas.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rY2ZxYWV6dGJvd2xwZmNlYWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1ODA5NzUsImV4cCI6MjA3NDE1Njk3NX0.gNbHau9GYzJjhJPcKuGzvzoZBseIxec5EjjGQbSTYnw';

const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

let myUserId = localStorage.getItem('myUserId') || crypto.randomUUID();
localStorage.setItem('myUserId', myUserId);

const requestForm = document.getElementById('request-form');
const requestsList = document.getElementById('requests-list');
const loadingRequests = document.getElementById('loading-requests');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const messageOkBtn = document.getElementById('message-ok-btn');
const statusMessage = document.getElementById('status-message');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');
const submitSpinner = document.getElementById('submit-spinner');
const searchVilleInput = document.getElementById('searchVille');
const searchCampusInput = document.getElementById('searchCampus');
const submissionVilleInput = document.getElementById('ville');
const submissionCampusInput = document.getElementById('campus');
const submissionTypeLogementInput = document.getElementById('type_logement');
const findMatchBtn = document.getElementById('find-match-btn');
const descriptionInput = document.getElementById('description');
const prixInput = document.getElementById('prix');

let allRequests = [];

const campusOptions = {
    'TANGER': ['TANGER'],
    'RABAT': ['CENTRE 1', 'CENTRE 2', 'AGDAL 1', 'AGDAL 2', 'HASSAN', 'SOUISSI', 'BOUREGRAG'],
    'MARRAKECH': ['CENTRE', 'GUELIZ'],
    'CASABLANCA': ['CENTRE 1', 'CENTRE 2', 'ANFA', 'YOUSSEF', 'LES ORANGERS', 'MAARIF', 'ROUDANI'],
    'FES': ['FES']
};

const updateCampusOptions = (villeSelect, campusSelect) => {
    const selectedVille = villeSelect.value;
    campusSelect.innerHTML = '<option value="">Sélectionnez un campus</option>';
    if (!selectedVille || !(selectedVille in campusOptions)) {
        campusSelect.value = '';
        console.log('updateCampusOptions: ville non sélectionnée ou inconnue', selectedVille);
        return;
    }
    const campuses = campusOptions[selectedVille];
    console.log('updateCampusOptions: ville sélectionnée', selectedVille, 'campus:', campuses);
    campuses.forEach(campus => {
        const option = document.createElement('option');
        option.value = campus;
        option.textContent = campus;
        campusSelect.appendChild(option);
    });
    console.log('updateCampusOptions: campusSelect options', campusSelect.options.length);
};

searchVilleInput.addEventListener('change', () => updateCampusOptions(searchVilleInput, searchCampusInput));
submissionVilleInput.addEventListener('change', () => updateCampusOptions(submissionVilleInput, submissionCampusInput));

const setStatusMessage = (message, type) => {
    statusMessage.textContent = message;
    statusMessage.className = 'mb-4 p-4 text-center rounded-lg text-sm font-medium';
    if (type === 'error') {
        statusMessage.classList.add('bg-red-100', 'text-red-700', 'block');
    } else if (type === 'success') {
        statusMessage.classList.add('bg-green-100', 'text-green-700', 'block');
    }
};

const showMessageBox = (message) => {
    messageText.textContent = message;
    messageBox.style.display = 'flex';
};

messageOkBtn.addEventListener('click', () => {
    messageBox.style.display = 'none';
});

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const createRequestCard = (data) => {
    const card = document.createElement('div');
    card.className = "bg-white p-4 rounded-xl shadow-md border border-green-200 flex flex-col justify-between";

    card.innerHTML = `
        <div class="space-y-2">
            <p class="text-green-800 font-bold text-lg"><i class="fas fa-user-graduate mr-2 text-green-500"></i>${data.prenom} ${data.nom}</p>
            <p class="text-gray-700"><i class="fas fa-chart-bar mr-2 text-green-500"></i>Niveau et filière: <span class="font-medium">${data.niveau}</span></p>
            <p class="text-gray-700"><i class="fas fa-city mr-2 text-green-500"></i>Ville: <span class="font-medium">${data.ville}</span></p>
            <p class="text-gray-700"><i class="fas fa-building-columns mr-2 text-green-500"></i>Campus: <span class="font-medium">${data.campus}</span></p>
            <p class="text-gray-700"><i class="fas fa-home-user mr-2 text-green-500"></i>Type: <span class="font-medium text-green-600">${data.type_logement}</span></p>
            <p class="text-gray-700"><i class="fas fa-sack-dollar mr-2 text-green-500"></i>Prix: <span class="font-medium text-green-600">${data.prix} DH/mois</span></p>
            <p class="text-gray-700"><i class="fas fa-info-circle mr-2 text-green-500"></i>Description: <span class="font-medium">${data.description}</span></p>
            <p class="text-xs text-gray-500 mt-2"><i class="fas fa-clock mr-1"></i>Publié le: ${formatDate(data.created_at)}</p>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <p class="text-sm font-mono text-green-600" id="numero-${data.id}">
                ${data.numero}
            </p>
            <div class="flex items-center space-x-2">
                <button class="contact-btn bg-green-100 text-green-600 px-3 py-1 text-sm rounded-full font-medium hover:bg-green-200 transition duration-200" data-numero="${data.numero}">
                    <i class="fas fa-comment-dots mr-1"></i> Contacter
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
        requestsList.innerHTML = '<p class="col-span-1 md:col-span-2 text-center text-gray-500 p-8">Aucune annonce ne correspond à votre recherche.</p>';
    } else {
        requests.forEach(request => {
            const card = createRequestCard(request);
            requestsList.appendChild(card);
        });
    }

    document.querySelectorAll('.contact-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const numero = e.target.dataset.numero;
            showMessageBox(`Numéro de téléphone: ${numero}. Vous pouvez le copier pour contacter l'étudiant.`);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const requestId = e.target.dataset.id;
            const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?");

            if (confirmDelete) {
                try {
                    const { error } = await supabase
                        .from('logements')
                        .delete()
                        .eq('id', requestId);

                    if (error) throw error;

                    showMessageBox("L'annonce a été supprimée avec succès !");
                } catch (error) {
                    console.error("Erreur de Supabase lors de la suppression:", error);
                    showMessageBox("Échec de la suppression. Veuillez réessayer plus tard.");
                }
            }
        });
    });
};

const filterRequests = () => {
    const selectedVille = searchVilleInput.value.toLowerCase();
    const selectedCampus = searchCampusInput.value.toLowerCase();

    const filteredRequests = allRequests.filter(req => {
        const villeMatch = selectedVille ? req.ville.toLowerCase().includes(selectedVille) : true;
        const campusMatch = selectedCampus ? req.campus.toLowerCase().includes(selectedCampus) : true;
        return villeMatch && campusMatch;
    });

    renderRequests(filteredRequests);
};

searchVilleInput.addEventListener('change', filterRequests);
searchCampusInput.addEventListener('change', filterRequests);

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
        campus: submissionCampusInput.value,
        prix: prixInput.value,
        description: descriptionInput.value,
        type_logement: submissionTypeLogementInput.value,
        numero: document.getElementById('numero').value,
        user_id: myUserId
    };

    try {
        const { error } = await supabase
            .from('logements')
            .insert([data]);

        if (error) throw error;

        requestForm.reset();
        showMessageBox("Votre annonce a été publiée avec succès !");
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
    updateCampusOptions(submissionVilleInput, submissionCampusInput);
});

document.getElementById('copy-link-btn').addEventListener('click', () => {
    const url = 'https://aymanefakihi.github.io/emsi-changement-de-campus/';
    const tempInput = document.createElement('textarea');
    document.body.appendChild(tempInput);
    tempInput.value = url;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showMessageBox("Lien du site copié !");
});

const setupRealtimeListener = () => {
     supabase.channel('public-changes')
        .on('postgres_changes',
            { event: '*', schema: 'public', table: 'logements' },
            payload => {
                console.log('Changement en temps réel:', payload);
                fetchInitialRequests();
            })
        .subscribe();
};

const fetchInitialRequests = async () => {
    loadingRequests.classList.remove('hidden');
    try {
        const { data, error } = await supabase
            .from('logements')
            .select('id, prenom, nom, niveau, ville, campus, prix, description, type_logement, numero, user_id, created_at')
            .order('created_at', { ascending: false });

        if (error) throw error;

        allRequests = data;
        loadingRequests.classList.add('hidden');
        renderRequests(allRequests);

    } catch (error) {
        console.error("Erreur détaillée de Supabase lors du chargement initial:", error);
        loadingRequests.classList.add('hidden');
        setStatusMessage("Erreur lors du chargement des annonces. Vérifiez votre connexion et votre configuration Supabase.", 'error');
    }
};

window.onload = () => {
    // Initialisation dynamique des campus au chargement
    updateCampusOptions(submissionVilleInput, submissionCampusInput);
    updateCampusOptions(searchVilleInput, searchCampusInput);
    if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
        setStatusMessage("Veuillez d'abord configurer vos clés Supabase dans le code.", 'error');
    } else {
        fetchInitialRequests();
        setupRealtimeListener();
    }
};