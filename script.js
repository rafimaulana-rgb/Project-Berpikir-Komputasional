        /* MOCK ROUTE DATA STORAGE */
        const ROUTE_DATABASE = {
            lebaran: [
                {
                    id: 'L1', operator: 'Sinar Jaya Executive', type: 'bus', category: 'direct', badge: 'Anti-Gagal Pass', badgeColor: 'bg-emerald-600',
                    origin: 'Jakarta', originDetail: 'Terminal Pulo Gebang', dest: 'Yogyakarta', destDetail: 'Terminal Giwangan',
                    depTime: '06:30', arrTime: '15:30', duration: '9 jam', price: 450000, seatsAvailable: 3, totalSeats: 32, radarRoute: false
                },
                {
                    id: 'L2', operator: 'KAI Argo Lawu (Executive)', type: 'train', category: 'direct', badge: 'Sold Out Utama', badgeColor: 'bg-red-600',
                    origin: 'Jakarta', originDetail: 'Stasiun Gambir', dest: 'Yogyakarta', destDetail: 'Stasiun Tugu',
                    depTime: '08:00', arrTime: '14:15', duration: '6 jam 15m', price: 620000, seatsAvailable: 0, totalSeats: 50, radarRoute: false
                },
                {
                    id: 'L3', operator: 'Priority Radar: Kereta Argo + Feeder Shuttle', type: 'shuttle', category: 'radar', badge: '✨ Jalur Alternatif Mudik', badgeColor: 'bg-terracotta-600 animate-pulse',
                    origin: 'Jakarta', originDetail: 'Gambir &rarr; Transit Cirebon', dest: 'Yogyakarta', destDetail: 'Drop Point Malioboro',
                    depTime: '08:30', arrTime: '15:45', duration: '7 jam 15m', price: 520000, seatsAvailable: 8, totalSeats: 16, radarRoute: true,
                    radarSegments: [
                        { mode: 'Kereta Argo Cirebon', detail: 'Gambir &rarr; Stasiun Cirebon (08:30 - 11:15)' },
                        { mode: 'Feeder Shuttle Executive', detail: 'Cirebon &rarr; Jogja via Toll Trans-Jawa (11:45 - 15:45)' }
                    ]
                },
                {
                    id: 'L4', operator: 'Sumber Alam VIP Class', type: 'bus', category: 'direct', badge: 'Mudik Comfort', badgeColor: 'bg-gold-600',
                    origin: 'Jakarta', originDetail: 'Terminal Kampung Rambutan', dest: 'Yogyakarta', destDetail: 'Terminal Giwangan',
                    depTime: '17:00', arrTime: '03:00 (+1 hr)', duration: '10 jam', price: 420000, seatsAvailable: 5, totalSeats: 36, radarRoute: false
                }
            ],
            nataru: [
                {
                    id: 'N1', operator: 'Tami Jaya Suite Class (Sleeper)', type: 'bus', category: 'direct', badge: 'New Year Special', badgeColor: 'bg-blue-600',
                    origin: 'Jakarta', originDetail: 'Terminal Kalideres', dest: 'Yogyakarta', destDetail: 'Terminal Giwangan',
                    depTime: '18:00', arrTime: '03:00 (+1 hr)', duration: '9 jam', price: 550000, seatsAvailable: 2, totalSeats: 22, radarRoute: false
                },
                {
                    id: 'N2', operator: 'KAI Taksaka Malam (Luxury)', type: 'train', category: 'direct', badge: 'Liburan Nataru', badgeColor: 'bg-indigo-600',
                    origin: 'Jakarta', originDetail: 'Stasiun Gambir', dest: 'Yogyakarta', destDetail: 'Stasiun Tugu',
                    depTime: '21:00', arrTime: '03:30 (+1 hr)', duration: '6 jam 30m', price: 750000, seatsAvailable: 4, totalSeats: 30, radarRoute: false
                },
                {
                    id: 'N3', operator: 'Priority Radar: Bus Patas + Shuttle Feeder Nataru', type: 'shuttle', category: 'radar', badge: '✨ Transit Cepat Nataru', badgeColor: 'bg-amber-600 animate-pulse',
                    origin: 'Jakarta', originDetail: 'Pulo Gebang &rarr; Transit Semarang', dest: 'Yogyakarta', destDetail: 'Pool Shuttle Sleman',
                    depTime: '07:30', arrTime: '16:00', duration: '8 jam 30m', price: 490000, seatsAvailable: 6, totalSeats: 16, radarRoute: true,
                    radarSegments: [
                        { mode: 'Bus Express Trans-Jawa', detail: 'Jakarta &rarr; Semarang (07:30 - 13:00)' },
                        { mode: 'Shuttle Feeder Nataru', detail: 'Semarang &rarr; Yogyakarta (13:30 - 16:00)' }
                    ]
                }
            ],
            standard: [
                {
                    id: 'S1', operator: 'Rosalia Indah Double Decker', type: 'bus', category: 'direct', badge: 'Reguler Trip', badgeColor: 'bg-slate-700',
                    origin: 'Jakarta', originDetail: 'Terminal Pondok Pinang', dest: 'Yogyakarta', destDetail: 'Terminal Giwangan',
                    depTime: '07:00', arrTime: '16:00', duration: '9 jam', price: 280000, seatsAvailable: 12, totalSeats: 48, radarRoute: false
                },
                {
                    id: 'S2', operator: 'KAI Fajar Utama Solo', type: 'train', category: 'direct', badge: 'Ekonomi Premium', badgeColor: 'bg-slate-700',
                    origin: 'Jakarta', originDetail: 'Stasiun Pasar Senen', dest: 'Yogyakarta', destDetail: 'Stasiun Lempuyangan',
                    depTime: '05:55', arrTime: '13:00', duration: '7 jam 05m', price: 320000, seatsAvailable: 15, totalSeats: 80, radarRoute: false
                }
            ]
        };

        /* STATE VARIABLES */
        let activeSeason = 'lebaran'; // Default fallback
        let activeVehicleFilter = 'all';
        let activeCategoryFilter = 'all';
        let isRadarEnabled = true;
        let selectedRoute = null;
        let selectedSeat = '2B';
        let seatTimerInterval = null;
        let myBookedTickets = [];

        /* INITIALIZATION & SEASON DETECTOR LOGIC */
        window.addEventListener('DOMContentLoaded', () => {
            detectAutomaticSeason();
            renderSearchResults();
        });

        /* Core Automated Season Detector JS Logic */
        function detectAutomaticSeason() {
            const today = new Date();
            const month = today.getMonth() + 1; // 1 - 12
            const date = today.getDate();
            const year = today.getFullYear();

            document.getElementById('footer-year').innerText = year;

            /* Season Rules:
               1. Nataru (Libur Tahun Baru): Dec 1 to Jan 10
               2. Mudik Lebaran / Idul Fitri: Dynamic Islamic Calendar approximation
                  - Lebaran 2026: ~March 20 (Peak Mudik: Mar 10 - Apr 5)
                  - Lebaran 2027: ~March 10 (Peak Mudik: Feb 25 - Mar 25)
               3. Standard / School Holiday: Rest of the year
            */
            let detected = 'standard';

            if (month === 12 || (month === 1 && date <= 10)) {
                detected = 'nataru';
            } else if ((year === 2026 && month === 3) || (year === 2027 && (month === 2 || month === 3))) {
                detected = 'lebaran';
            } else {
                // If standard time, default to highest hype season (Lebaran) for showcase, or standard
                detected = 'lebaran'; 
            }

            applySeasonTheme(detected, true);
        }

        /* Manual Switcher Trigger */
        function manualSeasonSwitch(seasonVal) {
            if (seasonVal === 'auto') {
                detectAutomaticSeason();
            } else {
                applySeasonTheme(seasonVal, false);
            }
            renderSearchResults();
        }

        /* Apply UI Visual Changes Based on Active Season */
        function applySeasonTheme(season, isAuto) {
            activeSeason = season;

            const heroSec = document.getElementById('hero-section');
            const mainHeader = document.getElementById('main-header');
            const topBar = document.getElementById('top-announcement-bar');
            const seasonPill = document.getElementById('season-badge-pill');
            const seasonBannerText = document.getElementById('season-banner-text');
            const seasonYearBadge = document.getElementById('season-year-badge');
            const heroPillIcon = document.getElementById('hero-pill-icon');
            const heroPillText = document.getElementById('hero-pill-text');
            const heroTitle = document.getElementById('hero-title');
            const heroDesc = document.getElementById('hero-description');
            
            const countdownHeaderIcon = document.getElementById('countdown-header-icon');
            const countdownHeaderTitle = document.getElementById('countdown-header-title');
            const countdownSeasonTag = document.getElementById('countdown-season-tag');
            const demandPercentageText = document.getElementById('demand-percentage-text');
            const demandProgressBar = document.getElementById('demand-progress-bar');
            
            const perksBadge = document.getElementById('perks-badge');
            const perksTitle = document.getElementById('perks-title');
            const perksDesc = document.getElementById('perks-desc');
            const perkMealTitle = document.getElementById('perk-meal-title');
            const perkMealSub = document.getElementById('perk-meal-sub');

            const dateInput = document.getElementById('date-input');

            // Reset background pattern classes
            heroSec.classList.remove('season-pattern-lebaran', 'season-pattern-nataru', 'season-pattern-standard');

            if (season === 'lebaran') {
                heroSec.classList.add('season-pattern-lebaran');
                topBar.className = "bg-gradient-to-r from-terracotta-600 via-gold-600 to-terracotta-700 text-white text-xs md:text-sm py-2 px-4 shadow-md relative z-50 transition-all duration-500";
                mainHeader.className = "sticky top-0 z-40 bg-teal-900/95 backdrop-blur-md border-b border-gold-500/20 text-white shadow-lg transition-all duration-500";
                
                seasonPill.innerText = isAuto ? "AUTOMATIC DETECTED: LEBARAN" : "MUDIK LEBARAN MODE";
                seasonBannerText.innerHTML = "War Tiket Mudik Idul Fitri Peak Season! Aktifkan <b>Priority Mudik Radar</b> untuk rute alternatif!";
                seasonYearBadge.innerText = "MUDIK LEBARAN";

                heroPillIcon.className = "fa-solid fa-mosque text-gold-400";
                heroPillText.innerText = "Spesial Musim Mudik Lebaran Idul Fitri";
                heroTitle.innerHTML = `Jangan Biarkan Kehabisan Tiket Membatalkan <span class="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-terracotta-500 to-gold-300">Rindu Kampung Halaman.</span>`;
                heroDesc.innerHTML = `TitikTemu.id hadir dengan <b>Priority Mudik Radar</b>. Ketika rute bus atau kereta utama habis, sistem menyusun kombinasi transit cepat agar Anda <b>100% pasti pulang mudik!</b>`;

                countdownHeaderIcon.className = "fa-solid fa-moon text-gold-400 text-lg";
                countdownHeaderTitle.innerText = "Hitung Mundur Mudik Lebaran";
                countdownSeasonTag.innerText = "H-Lebaran";

                demandPercentageText.innerText = "SANGAT TINGGI (96%)";
                demandProgressBar.style.width = "96%";

                perksBadge.innerText = "Spesial Mudik Care";
                perksTitle.innerText = "Lengkapi Mudikmu dengan 'Oleh-Oleh Baggage Pass' & Takjil / Sahur Meal";
                perksDesc.innerText = "Bawa kardus kue kering & buah tangan keluarga tanpa rasa khawatir bagasi berlebih. Termasuk makanan hangat sahur / buka puasa saat perjalanan.";
                perkMealTitle.innerHTML = `<i class="fa-solid fa-utensils text-gold-600 mr-1"></i> Paket Sahur / Buka Puasa`;
                perkMealSub.innerText = "Nasi Kotak + Teh Warm Hangat";

                dateInput.value = "2027-03-24";
                startCountdownTimer(new Date(2027, 2, 24, 8, 0, 0));

            } else if (season === 'nataru') {
                heroSec.classList.add('season-pattern-nataru');
                topBar.className = "bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-700 text-white text-xs md:text-sm py-2 px-4 shadow-md relative z-50 transition-all duration-500";
                mainHeader.className = "sticky top-0 z-40 bg-navy-900/95 backdrop-blur-md border-b border-sky-500/20 text-white shadow-lg transition-all duration-500";

                seasonPill.innerText = isAuto ? "AUTOMATIC DETECTED: NATARU" : "LIBUR NATARU MODE";
                seasonBannerText.innerHTML = "Liburan Tahun Baru & Natal! Booking tiket keluarga sebelum harga melonjak!";
                seasonYearBadge.innerText = "LIBUR NATARU";

                heroPillIcon.className = "fa-solid fa-champagne-glasses text-sky-300";
                heroPillText.innerText = "Spesial Libur Natal & Tahun Baru (Nataru)";
                heroTitle.innerHTML = `Sambut Tahun Baru Bersama Keluarga <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-amber-300 to-gold-400">Tanpa Kehabisan Tiket.</span>`;
                heroDesc.innerHTML = `Mudik Libur Tahun Baru lebih nyaman dengan armada VIP Sleeper Bus & Kereta Eksekutif TitikTemu.id. Disertai <b>Priority Radar Transfer</b>.`;

                countdownHeaderIcon.className = "fa-solid fa-glass-water-droplet text-sky-400 text-lg";
                countdownHeaderTitle.innerText = "Hitung Mundur Malam Tahun Baru";
                countdownSeasonTag.innerText = "H-Tahun Baru";

                demandPercentageText.innerText = "TINGGI (88%)";
                demandProgressBar.style.width = "88%";

                perksBadge.innerText = "Spesial Nataru Care";
                perksTitle.innerText = "Paket Liburan Tahun Baru & Bagasi Koper Ekstra";
                perksDesc.innerText = "Nikmati perjalanan akhir tahun dengan bagasi koper liburan tambahan & voucher cafe tempat istirahat jalur liburan.";
                perkMealTitle.innerHTML = `<i class="fa-solid fa-mug-hot text-sky-600 mr-1"></i> Bekal Hangat Nataru`;
                perkMealSub.innerText = "Kopi / Cokelat Hangat + Roti Snack";

                dateInput.value = "2026-12-28";
                startCountdownTimer(new Date(2026, 11, 31, 23, 59, 59));

            } else { // Standard / School Holiday
                heroSec.classList.add('season-pattern-standard');
                topBar.className = "bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-700 text-white text-xs md:text-sm py-2 px-4 shadow-md relative z-50 transition-all duration-500";
                mainHeader.className = "sticky top-0 z-40 bg-indigo-950/95 backdrop-blur-md border-b border-indigo-500/20 text-white shadow-lg transition-all duration-500";

                seasonPill.innerText = isAuto ? "AUTOMATIC DETECTED: REGULER" : "MUDIK REGULER MODE";
                seasonBannerText.innerHTML = "Perjalanan Reguler & Libur Sekolah. Nikmati diskon tiket fleksibel!";
                seasonYearBadge.innerText = "HOLIDAY TRIP";

                heroPillIcon.className = "fa-solid fa-umbrella-beach text-pink-300";
                heroPillText.innerText = "Spesial Liburan & Perjalanan Reguler";
                heroTitle.innerHTML = `Jelajahi Kota Favoritmu Dengan <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300">Pilihan Moda Terlengkap.</span>`;
                heroDesc.innerHTML = `Pesan tiket bus, kereta, dan travel antar kota dengan jaminan kursi langsung dan fleksibilitas jadwal.`;

                countdownHeaderIcon.className = "fa-solid fa-plane-departure text-purple-300 text-lg";
                countdownHeaderTitle.innerText = "Hitung Mundur Weekend Getaway";
                countdownSeasonTag.innerText = "Weekend";

                demandPercentageText.innerText = "NORMAL (62%)";
                demandProgressBar.style.width = "62%";

                perksBadge.innerText = "Standard Holiday Care";
                perksTitle.innerText = "Jaminan Kenyamanan Rute Regular & Family Trip";
                perksDesc.innerText = "Pilihan fleksibel pengubahan jadwal & proteksi bagasi aman selama perjalanan liburan keluarga.";
                perkMealTitle.innerHTML = `<i class="fa-solid fa-burger text-amber-600 mr-1"></i> Bekal Perjalanan Reguler`;
                perkMealSub.innerText = "Snack Box + Air Mineral";

                dateInput.value = "2026-11-15";
                startCountdownTimer(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000));
            }
        }

        /* Countdown Timer Handler */
        let cdInterval = null;
        function startCountdownTimer(targetDate) {
            if (cdInterval) clearInterval(cdInterval);

            function update() {
                const now = new Date();
                const diff = targetDate - now;

                if (diff <= 0) {
                    document.getElementById('cd-days').innerText = '00';
                    document.getElementById('cd-hours').innerText = '00';
                    document.getElementById('cd-mins').innerText = '00';
                    document.getElementById('cd-secs').innerText = '00';
                    return;
                }

                const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((diff % (1000 * 60)) / 1000);

                document.getElementById('cd-days').innerText = d < 10 ? '0' + d : d;
                document.getElementById('cd-hours').innerText = h < 10 ? '0' + h : h;
                document.getElementById('cd-mins').innerText = m < 10 ? '0' + m : m;
                document.getElementById('cd-secs').innerText = s < 10 ? '0' + s : s;
            }
            update();
            cdInterval = setInterval(update, 1000);
        }

        /* Radar Mode Toggle Handlers */
        function toggleRadarMode() {
            isRadarEnabled = !isRadarEnabled;
            updateRadarUI();
            renderSearchResults();
        }

        function toggleRadarFromCheck(checked) {
            isRadarEnabled = checked;
            updateRadarUI();
            renderSearchResults();
        }

        function updateRadarUI() {
            const statusTxt = document.getElementById('radar-status-text');
            const statusTxt2 = document.getElementById('radar-status-text-2');
            const chk = document.getElementById('radar-checkbox');
            
            if (isRadarEnabled) {
                if(statusTxt) { statusTxt.innerText = 'AKTIF'; statusTxt.className = 'text-emerald-400'; }
                if(statusTxt2) { statusTxt2.innerText = 'AKTIF'; statusTxt2.className = 'text-emerald-700'; }
                if(chk) chk.checked = true;
            } else {
                if(statusTxt) { statusTxt.innerText = 'NONAKTIF'; statusTxt.className = 'text-gray-400'; }
                if(statusTxt2) { statusTxt2.innerText = 'NONAKTIF'; statusTxt2.className = 'text-gray-500'; }
                if(chk) chk.checked = false;
            }
        }

        /* Vehicle Filter Tabs */
        function selectVehicle(type) {
            activeVehicleFilter = type;
            document.querySelectorAll('.vehicle-tab').forEach(btn => {
                btn.classList.remove('bg-terracotta-600', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-600');
            });
            event.currentTarget.classList.remove('bg-gray-100', 'text-gray-600');
            event.currentTarget.classList.add('bg-terracotta-600', 'text-white');
            renderSearchResults();
        }

        /* Filter Pills Handler */
        function filterResults(category) {
            activeCategoryFilter = category;
            document.querySelectorAll('.filter-pill').forEach(btn => {
                btn.classList.remove('bg-teal-900', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700');
            });
            event.currentTarget.classList.remove('bg-white', 'text-gray-700');
            event.currentTarget.classList.add('bg-teal-900', 'text-white');
            renderSearchResults();
        }

        /* Swap Origin & Destination */
        function swapLocations() {
            const originSelect = document.getElementById('origin-select');
            const destSelect = document.getElementById('dest-select');
            const temp = originSelect.value;
            originSelect.value = destSelect.value;
            destSelect.value = temp;
        }

        /* Search Form Submit */
        function handleSearch(e) {
            e.preventDefault();
            const origin = document.getElementById('origin-select').value;
            const dest = document.getElementById('dest-select').value;
            const date = document.getElementById('date-input').value;

            document.getElementById('route-summary-text').innerHTML = 
                `Menampilkan jadwal keberangkatan untuk <b>${origin} &rarr; ${dest}</b> (${date})`;
            
            renderSearchResults();
        }

        /* Render Search Results Dynamically from Active Season DB */
        function renderSearchResults() {
            const container = document.getElementById('tickets-list');
            container.innerHTML = '';

            const dataset = ROUTE_DATABASE[activeSeason] || ROUTE_DATABASE['standard'];

            let filtered = dataset.filter(route => {
                if (!isRadarEnabled && route.radarRoute) return false;
                if (activeVehicleFilter !== 'all' && route.type !== activeVehicleFilter) return false;
                if (activeCategoryFilter === 'direct' && route.radarRoute) return false;
                if (activeCategoryFilter === 'radar' && !route.radarRoute) return false;
                return true;
            });

            document.getElementById('results-count-badge').innerText = `${filtered.length} Rute Ditemukan`;

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-12 bg-white rounded-3xl border border-gray-200">
                        <i class="fa-solid fa-ban text-4xl text-gray-300 mb-3 block"></i>
                        <h3 class="font-bold text-gray-700">Rute Tidak Ditemukan / Sold Out</h3>
                        <p class="text-xs text-gray-500 mt-1">Coba aktifkan 'Priority Mudik Radar' untuk mencari rute transit alternatif.</p>
                    </div>
                `;
                return;
            }

            filtered.forEach(route => {
                const card = document.createElement('div');
                card.className = `glass-card rounded-3xl p-5 border transition-all hover:shadow-xl relative overflow-hidden ${
                    route.radarRoute ? 'border-terracotta-400 bg-amber-50/40' : 'border-gray-200'
                }`;

                const isSoldOut = route.seatsAvailable === 0;

                card.innerHTML = `
                    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        
                        <div class="space-y-3 flex-grow">
                            <div class="flex items-center gap-2">
                                <span class="text-[10px] text-white font-bold px-2.5 py-0.5 rounded-full ${route.badgeColor}">
                                    ${route.badge}
                                </span>
                                <span class="text-xs text-gray-500 font-semibold uppercase tracking-wider">${route.type.toUpperCase()}</span>
                            </div>

                            <h3 class="font-bold text-base sm:text-lg text-gray-900">${route.operator}</h3>

                            <div class="flex items-center gap-3 text-xs">
                                <div>
                                    <span class="font-bold text-sm text-gray-900">${route.depTime}</span>
                                    <span class="block text-[11px] text-gray-500">${route.originDetail}</span>
                                </div>
                                <div class="flex-grow flex flex-col items-center px-2">
                                    <span class="text-[10px] text-gray-400 font-medium mb-1">${route.duration}</span>
                                    <div class="w-full flex items-center gap-1">
                                        <div class="w-2 h-2 rounded-full bg-teal-800"></div>
                                        <div class="h-[2px] w-full bg-gradient-to-r from-teal-800 via-terracotta-500 to-gold-500"></div>
                                        <i class="fa-solid fa-chevron-right text-[10px] text-gold-600"></i>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <span class="font-bold text-sm text-gray-900">${route.arrTime}</span>
                                    <span class="block text-[11px] text-gray-500">${route.destDetail}</span>
                                </div>
                            </div>

                            ${route.radarRoute ? `
                                <div class="text-[11px] text-amber-900 bg-amber-100/70 p-2 rounded-xl border border-amber-200 flex items-center gap-2">
                                    <i class="fa-solid fa-lightbulb text-gold-600"></i>
                                    <span><b>Radar Multi-Modal Link:</b> Jalur alternatif gabungan bebas kehabisan tiket!</span>
                                </div>
                            ` : ''}
                        </div>

                        <div class="flex lg:flex-col justify-between items-end gap-3 border-t lg:border-t-0 lg:border-l border-gray-200 pt-3 lg:pt-0 lg:pl-6 shrink-0">
                            <div class="text-left lg:text-right">
                                <span class="text-[10px] text-gray-400 block">Harga Tiket</span>
                                <span class="text-xl font-bold font-serif text-terracotta-700">Rp ${route.price.toLocaleString('id-ID')}</span>
                                <span class="block text-[10px] ${isSoldOut ? 'text-red-600 font-bold' : 'text-emerald-700 font-medium'} mt-0.5">
                                    ${isSoldOut ? 'HABIS / SOLD OUT' : `Sisa ${route.seatsAvailable} Kursi Terkunci`}
                                </span>
                            </div>

                            <button 
                                onclick="openBookingModal('${route.id}')" 
                                ${isSoldOut ? 'disabled' : ''}
                                class="px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md flex items-center gap-2 ${
                                    isSoldOut 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                    : 'bg-terracotta-600 hover:bg-terracotta-700 text-white hover:shadow-lg active:scale-95'
                                }">
                                <i class="fa-solid fa-chair"></i>
                                ${isSoldOut ? 'Habis' : 'Pilih Kursi'}
                            </button>
                        </div>

                    </div>
                `;

                container.appendChild(card);
            });
        }

        /* Open Booking Modal & Live Seat Lock Visualizer */
        function openBookingModal(routeId) {
            const dataset = ROUTE_DATABASE[activeSeason] || ROUTE_DATABASE['standard'];
            selectedRoute = dataset.find(r => r.id === routeId);
            if (!selectedRoute) return;

            document.getElementById('modal-route-title').innerText = `${selectedRoute.operator} (${selectedRoute.origin} - ${selectedRoute.dest})`;

            const radarContainer = document.getElementById('modal-radar-visual');
            const radarSegList = document.getElementById('radar-segments-container');
            if (selectedRoute.radarRoute && selectedRoute.radarSegments) {
                radarContainer.classList.remove('hidden');
                radarSegList.innerHTML = selectedRoute.radarSegments.map((seg, idx) => `
                    <div class="flex items-center gap-2 text-xs text-amber-950 font-medium">
                        <span class="w-5 h-5 rounded-full bg-terracotta-600 text-white flex items-center justify-center text-[10px] font-bold">${idx+1}</span>
                        <span><b>${seg.mode}:</b> ${seg.detail}</span>
                    </div>
                `).join('');
            } else {
                radarContainer.classList.add('hidden');
            }

            renderSeatsGrid(selectedRoute.totalSeats);
            startSeatLockTimer();

            document.getElementById('perk-baggage').checked = false;
            document.getElementById('perk-meal').checked = false;
            document.getElementById('perk-lounge').checked = false;

            updateTotalModalPrice();
            document.getElementById('booking-modal').classList.remove('hidden');
        }

        function closeBookingModal() {
            document.getElementById('booking-modal').classList.add('hidden');
            if (seatTimerInterval) clearInterval(seatTimerInterval);
        }

        /* Render Simulated Seat Grid */
        function renderSeatsGrid(totalSeats) {
            const grid = document.getElementById('seats-grid');
            grid.innerHTML = '';
            selectedSeat = '2B';

            for (let i = 1; i <= Math.min(totalSeats, 20); i++) {
                const seatNo = `${Math.ceil(i/2)}${i % 2 === 1 ? 'A' : 'B'}`;
                const isOccupied = i === 1 || i === 4 || i === 7;
                const isSelected = seatNo === selectedSeat;

                const btn = document.createElement('button');
                btn.type = 'button';
                btn.disabled = isOccupied;
                btn.className = `p-2.5 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
                    isOccupied 
                    ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed' 
                    : isSelected 
                    ? 'bg-terracotta-600 text-white border-terracotta-700 shadow-md scale-105' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-terracotta-500'
                }`;

                btn.innerHTML = `<i class="fa-solid fa-chair text-sm mb-1"></i> ${seatNo}`;
                btn.onclick = () => selectSeat(seatNo, btn);
                grid.appendChild(btn);
            }
        }

        function selectSeat(seatNo, element) {
            selectedSeat = seatNo;
            document.querySelectorAll('#seats-grid button:not([disabled])').forEach(b => {
                b.className = 'p-2.5 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border bg-white text-gray-700 border-gray-300 hover:border-terracotta-500';
            });
            element.className = 'p-2.5 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border bg-terracotta-600 text-white border-terracotta-700 shadow-md scale-105';
        }

        /* Live Seat Lock Counter (15 Minutes) */
        function startSeatLockTimer() {
            if (seatTimerInterval) clearInterval(seatTimerInterval);
            let duration = 15 * 60;
            const timerDisplay = document.getElementById('seat-timer');

            seatTimerInterval = setInterval(() => {
                let minutes = parseInt(duration / 60, 10);
                let seconds = parseInt(duration % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                timerDisplay.innerText = minutes + ":" + seconds;

                if (--duration < 0) {
                    clearInterval(seatTimerInterval);
                    alert("Waktu kunci kursi telah habis. Silakan pilih kembali.");
                    closeBookingModal();
                }
            }, 1000);
        }

        /* Dynamic Price Calculation */
        function updateTotalModalPrice() {
            if (!selectedRoute) return;
            let total = selectedRoute.price;

            if (document.getElementById('perk-baggage').checked) total += 35000;
            if (document.getElementById('perk-meal').checked) total += 45000;
            if (document.getElementById('perk-lounge').checked) total += 25000;

            document.getElementById('modal-total-price').innerText = `Rp ${total.toLocaleString('id-ID')}`;
        }

        /* Process Checkout */
        function processCheckout() {
            const passengerName = document.getElementById('passenger-name').value;
            if (!passengerName) {
                alert("Mohon isi nama pemudik!");
                return;
            }

            const code = 'MDK-' + Math.floor(100000 + Math.random() * 900000);
            
            const perks = [];
            if (document.getElementById('perk-baggage').checked) perks.push("Oleh-Oleh Baggage Pass (+20kg)");
            if (document.getElementById('perk-meal').checked) perks.push("Bekal / Meal Pass Perjalanan");
            if (document.getElementById('perk-lounge').checked) perks.push("Rest Area VIP Lounge");
            if (perks.length === 0) perks.push("Standar Bagasi (15kg)");

            document.getElementById('ticket-code').innerText = code;
            document.getElementById('ticket-operator').innerText = selectedRoute.operator;
            document.getElementById('ticket-seats-detail').innerText = `Pemudik: ${passengerName} • Kursi: ${selectedSeat}`;
            document.getElementById('ticket-origin-detail').innerText = `${selectedRoute.origin} (${selectedRoute.originDetail})`;
            document.getElementById('ticket-dep-time').innerText = `${selectedRoute.depTime} WIB`;
            document.getElementById('ticket-dest-detail').innerText = `${selectedRoute.dest} (${selectedRoute.destDetail})`;
            document.getElementById('ticket-arr-time').innerText = `${selectedRoute.arrTime} WIB`;

            const perksContainer = document.getElementById('ticket-perks-list');
            perksContainer.innerHTML = perks.map(p => `<li>${p}</li>`).join('');

            closeBookingModal();
            document.getElementById('ticket-modal').classList.remove('hidden');

            myBookedTickets.push({
                code,
                operator: selectedRoute.operator,
                passengerName,
                seat: selectedSeat
            });
        }

        function closeTicketModal() {
            document.getElementById('ticket-modal').classList.add('hidden');
        }

        function downloadTicketSimulated() {
            alert("E-Ticket Boarding Pass berhasil diunduh ke format PDF!");
        }

        function openTicketHistoryModal() {
            if (myBookedTickets.length === 0) {
                alert("Anda belum memiliki tiket aktif. Silakan cari dan pesan tiket terlebih dahulu.");
            } else {
                document.getElementById('ticket-modal').classList.remove('hidden');
            }
        }
    