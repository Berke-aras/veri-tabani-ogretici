// Ses değişkenleri
let volume = 0.5;

// Sayfa kaydırma kontrolü
window.addEventListener("scroll", function () {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("visible");
    } else {
        scrollTopBtn.classList.remove("visible");
    }
});

// Yukarı çık fonksiyonu
function scrollToTop() {
    playClickSound();
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

// Ses fonksiyonları
function playSuccessSound() {
    const audio = new Audio();
    audio.volume = volume;
    // Başarı sesi için frekans oluşturma
    const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

    gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

function playClickSound() {
    const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(volume * 0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function setVolume(value) {
    volume = value / 100;
    document.getElementById("volumeText").textContent = value + "%";
}

// Ses kontrol paneli toggle
function toggleAudioPanel() {
    const panel = document.getElementById("audioPanel");
    const toggle = document.getElementById("audioToggle");
    const controls =
        document.getElementById("audioControls") ||
        document.querySelector(".audio-controls");

    if (panel.classList.contains("collapsed")) {
        // Açılıyor
        panel.classList.remove("collapsed");
        toggle.innerHTML = '<i class="fas fa-chevron-down"></i>';
        if (controls) {
            controls.classList.add("expanded");
        }
    } else {
        // Kapanıyor - minimize et
        panel.classList.add("collapsed");
        toggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        if (controls) {
            controls.classList.remove("expanded");
        }
    }
}

// Sayfa yüklendiğinde ses kontrollerini küçük başlat
window.addEventListener("load", function () {
    const panel = document.getElementById("audioPanel");
    const toggle = document.getElementById("audioToggle");

    if (panel && toggle) {
        panel.classList.add("collapsed");
        toggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
});

// Ses dersleri menüsü toggle
function toggleAudioMenu() {
    const menu = document.getElementById("audioLessonsMenu");
    const btn = document.getElementById("audioMenuBtn");

    menu.classList.toggle("show");

    if (menu.classList.contains("show")) {
        btn.innerHTML =
            '<i class="fas fa-headphones"></i> Ses Dersleri <i class="fas fa-chevron-up"></i>';
    } else {
        btn.innerHTML =
            '<i class="fas fa-headphones"></i> Ses Dersleri <i class="fas fa-chevron-down"></i>';
    }
}

function playVeriGirisiSound() {
    const audio = document.getElementById("veriGirisiSound");
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch((e) => console.log("Ses oynatılamadı:", e));
}

function playVeriGirisiSound2() {
    const audio = document.getElementById("veriGirisiSound2");
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch((e) => console.log("Ses oynatılamadı:", e));
}

// Gelişmiş Ses Oynatıcı Fonksiyonları
let currentAudio = null;
let updateInterval = null;

function loadLesson(audioId, title) {
    playClickSound();

    // Önceki sesi durdur
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Yeni sesi yükle
    currentAudio = document.getElementById(audioId);
    currentAudio.volume = volume;

    // Player'ı göster
    document.getElementById("audioPlayer").style.display = "block";
    document.getElementById("currentLessonTitle").textContent = title;

    // Event listener'ları ekle
    currentAudio.addEventListener("loadedmetadata", updateTotalTime);
    currentAudio.addEventListener("timeupdate", updateProgress);
    currentAudio.addEventListener("ended", () => {
        document.getElementById("playPauseBtn").innerHTML =
            '<i class="fas fa-play"></i>';
        currentAudio.currentTime = 0;
        updateProgress();
    });

    // Başlangıç değerleri
    updateTotalTime();
    updateProgress();
    document.getElementById("playPauseBtn").innerHTML =
        '<i class="fas fa-play"></i>';
}

function togglePlayPause() {
    if (!currentAudio) return;

    playClickSound();

    if (currentAudio.paused) {
        currentAudio.play();
        document.getElementById("playPauseBtn").innerHTML =
            '<i class="fas fa-pause"></i>';
        startProgressUpdates();
    } else {
        currentAudio.pause();
        document.getElementById("playPauseBtn").innerHTML =
            '<i class="fas fa-play"></i>';
        stopProgressUpdates();
    }
}

function stopAudio() {
    if (!currentAudio) return;

    playClickSound();
    currentAudio.pause();
    currentAudio.currentTime = 0;
    document.getElementById("playPauseBtn").innerHTML =
        '<i class="fas fa-play"></i>';
    updateProgress();
    stopProgressUpdates();
}

function skipBackward() {
    if (!currentAudio) return;

    playClickSound();
    currentAudio.currentTime = Math.max(0, currentAudio.currentTime - 10);
    updateProgress();
}

function skipForward() {
    if (!currentAudio) return;

    playClickSound();
    currentAudio.currentTime = Math.min(
        currentAudio.duration,
        currentAudio.currentTime + 10
    );
    updateProgress();
}

function changeSpeed(speed) {
    if (!currentAudio) return;

    playClickSound();
    currentAudio.playbackRate = parseFloat(speed);
}

function setLessonVolume(value) {
    volume = value / 100;
    document.getElementById("lessonVolumeText").textContent = value + "%";
    if (currentAudio) {
        currentAudio.volume = volume;
    }
}

function seekAudio(value) {
    if (!currentAudio || !currentAudio.duration) return;

    const seekTime = (value / 100) * currentAudio.duration;
    currentAudio.currentTime = seekTime;
    updateProgress();
}

function updateProgress() {
    if (!currentAudio || !currentAudio.duration) return;

    const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    document.getElementById("progressFill").style.width = progress + "%";
    document.getElementById("progressSlider").value = progress;

    // Şu anki zamanı güncelle
    const currentMinutes = Math.floor(currentAudio.currentTime / 60);
    const currentSeconds = Math.floor(currentAudio.currentTime % 60);
    document.getElementById(
        "currentTime"
    ).textContent = `${currentMinutes}:${currentSeconds
        .toString()
        .padStart(2, "0")}`;
}

function updateTotalTime() {
    if (!currentAudio || !currentAudio.duration) return;

    const totalMinutes = Math.floor(currentAudio.duration / 60);
    const totalSeconds = Math.floor(currentAudio.duration % 60);
    document.getElementById(
        "totalTime"
    ).textContent = `${totalMinutes}:${totalSeconds
        .toString()
        .padStart(2, "0")}`;
}

function startProgressUpdates() {
    if (updateInterval) clearInterval(updateInterval);
    updateInterval = setInterval(updateProgress, 500);
}

function stopProgressUpdates() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}

function closePlayer() {
    playClickSound();

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    document.getElementById("audioPlayer").style.display = "none";
    stopProgressUpdates();
}

// Veritabanı Şeması Modal
function toggleSchemaViewer() {
    playClickSound();
    const modal = document.getElementById("schemaModal");
    modal.classList.toggle("show");

    // Escape tuşu ile kapatma
    if (modal.classList.contains("show")) {
        document.addEventListener("keydown", handleModalEscape);
    } else {
        document.removeEventListener("keydown", handleModalEscape);
    }
}

function closeModalOnBackdrop(event) {
    if (event.target === event.currentTarget) {
        toggleSchemaViewer();
    }
}

function handleModalEscape(event) {
    if (event.key === "Escape") {
        const modal = document.getElementById("schemaModal");
        if (modal.classList.contains("show")) {
            toggleSchemaViewer();
        }
    }
}

// Click-based SQL Builder
let queryTokens = [];

function toggleToken(element) {
    playClickSound();
    const token = element.getAttribute("data-token");

    if (element.classList.contains("selected")) {
        // Remove token
        element.classList.remove("selected");
        const index = queryTokens.indexOf(token);
        if (index > -1) {
            queryTokens.splice(index, 1);
        }
    } else {
        // Add token
        element.classList.add("selected");
        queryTokens.push(token);

        // Visual feedback
        element.style.transform = "scale(1.1)";
        setTimeout(() => {
            element.style.transform = "";
        }, 200);
    }

    updateQueryDisplay();
}

function updateQueryDisplay() {
    const queryZone = document.getElementById("queryTokens");
    const queryPreview = document.getElementById("queryPreview");

    if (queryTokens.length === 0) {
        queryZone.innerHTML = `
                                <p style="color: rgba(255,255,255,0.7); text-align: center; width: 100%; margin: 60px 0;">
                                    🎮 Yukarıdaki komutlara tıklayarak SQL sorgunu oluştur!<br>
                                    <small>💡 İpucu: SELECT ve FROM ile başla</small>
                                </p>
                            `;
        queryPreview.innerHTML =
            '<span style="color: rgba(255,255,255,0.7);">Sorgun burada görünecek...</span>';
        return;
    }

    // Build query tokens display
    let tokensHTML = "";
    queryTokens.forEach((token, index) => {
        tokensHTML += `
                                <div class="query-token">
                                    <span>${token}</span>
                                    <button class="token-remove" onclick="removeToken(${index})">×</button>
                                </div>
                            `;
    });

    queryZone.innerHTML = tokensHTML;

    // Update query preview
    const formattedQuery = formatQuery(queryTokens.join(" "));
    queryPreview.innerHTML = `<span style="color: #68d391;">${formattedQuery};</span>`;
}

function removeToken(index) {
    playClickSound();
    const removedToken = queryTokens[index];
    queryTokens.splice(index, 1);

    // Remove selected class from corresponding button
    const buttons = document.querySelectorAll(".sql-block");
    buttons.forEach((button) => {
        if (button.getAttribute("data-token") === removedToken) {
            button.classList.remove("selected");
        }
    });

    updateQueryDisplay();
}

function formatQuery(query) {
    // Basic SQL formatting with HTML line breaks
    return query
        .replace(/SELECT/g, "<br>SELECT")
        .replace(/FROM/g, "<br>FROM")
        .replace(/WHERE/g, "<br>WHERE")
        .replace(/GROUP BY/g, "<br>GROUP BY")
        .replace(/HAVING/g, "<br>HAVING")
        .replace(/ORDER BY/g, "<br>ORDER BY")
        .replace(/INNER JOIN/g, "<br>INNER JOIN")
        .replace(/LEFT JOIN/g, "<br>LEFT JOIN")
        .replace(/RIGHT JOIN/g, "<br>RIGHT JOIN")
        .replace(/^<br>/, "") // Remove first line break
        .trim();
}

function runQuery() {
    playSuccessSound();
    const resultTable = document.getElementById("resultTable");
    const successMessage = document.getElementById("successMessage");

    if (queryTokens.length === 0) {
        playClickSound();
        alert("❌ Önce SQL komutları ekleyin!");
        return;
    }

    // Başarı mesajı göster
    successMessage.classList.add("show");
    setTimeout(() => {
        successMessage.classList.remove("show");
    }, 3000);

    // Daha zengin örnek sonuç tabloları oluştur
    const sampleResults = generateSampleResults();

    resultTable.innerHTML = `
                            <div class="table-visual" style="width: 100%; background: white; color: #333;">
                                ${sampleResults.html}
                            </div>
                            <div style="padding: 15px; text-align: center; color: #48bb78; font-weight: bold; background: rgba(72, 187, 120, 0.1); border-radius: 8px; margin-top: 10px;">
                                ✅ Sorgu başarıyla çalıştırıldı! ${
                                    sampleResults.count
                                } kayıt bulundu.
                                <br><small>⏱️ Çalışma süresi: ${Math.random().toFixed(
                                    2
                                )} ms</small>
                            </div>
                        `;
}

function generateSampleResults() {
    const query = queryTokens.join(" ").toLowerCase();
    let results = [];
    let columns = [];

    // Analyze query to generate appropriate results
    if (query.includes("count")) {
        columns = ["Sayım"];
        results = [{ Sayım: Math.floor(Math.random() * 100) + 10 }];
    } else if (query.includes("avg")) {
        columns = ["Ortalama"];
        results = [{ Ortalama: (Math.random() * 30 + 70).toFixed(2) }];
    } else if (query.includes("max")) {
        columns = ["Maksimum"];
        results = [{ Maksimum: Math.floor(Math.random() * 100) + 80 }];
    } else if (query.includes("min")) {
        columns = ["Minimum"];
        results = [{ Minimum: Math.floor(Math.random() * 50) + 20 }];
    } else if (query.includes("group by")) {
        if (query.includes("sehir")) {
            columns = ["Şehir", "Sayı"];
            results = [
                { Şehir: "Ankara", Sayı: 25 },
                { Şehir: "İstanbul", Sayı: 35 },
                { Şehir: "İzmir", Sayı: 18 },
            ];
        }
    } else {
        // Default student results
        columns = ["Ad", "Soyad", "Şehir", "Yaş"];
        const names = [
            "Ahmet",
            "Ayşe",
            "Mehmet",
            "Fatma",
            "Ali",
            "Zeynep",
            "Murat",
            "Elif",
        ];
        const surnames = [
            "Yılmaz",
            "Kaya",
            "Demir",
            "Çelik",
            "Şahin",
            "Koç",
            "Arslan",
            "Doğan",
        ];
        const cities = ["Ankara", "İstanbul", "İzmir", "Bursa", "Antalya"];

        for (let i = 0; i < 6; i++) {
            results.push({
                Ad: names[Math.floor(Math.random() * names.length)],
                Soyad: surnames[Math.floor(Math.random() * surnames.length)],
                Şehir: cities[Math.floor(Math.random() * cities.length)],
                Yaş: Math.floor(Math.random() * 15) + 18,
            });
        }
    }

    // Generate HTML
    let html = '<div class="table-row">';
    columns.forEach((col) => {
        html += `<div class="table-cell"><strong>${col}</strong></div>`;
    });
    html += "</div>";

    results.forEach((row) => {
        html += '<div class="table-row">';
        columns.forEach((col) => {
            html += `<div class="table-cell">${row[col]}</div>`;
        });
        html += "</div>";
    });

    return { html, count: results.length };
}

function clearQuery() {
    playClickSound();

    // Clear all selections
    const buttons = document.querySelectorAll(".sql-block");
    buttons.forEach((button) => {
        button.classList.remove("selected");
    });

    queryTokens = [];
    updateQueryDisplay();

    const resultTable = document.getElementById("resultTable");
    resultTable.innerHTML = `
                            <div style="padding: 40px 20px; text-align: center; color: rgba(255,255,255,0.7);">
                                📊 Sorguyu çalıştır ve sonuçları gör!<br>
                                <small>💡 SELECT ve FROM ekleyerek başla</small>
                            </div>
                        `;
}

function generateRandomQuery() {
    playClickSound();
    clearQuery();

    const randomQueries = [
        ["SELECT", "*", "FROM", "Ogrenciler"],
        ["SELECT", "Ad, Soyad", "FROM", "Ogrenciler", "WHERE", "Yas > 20"],
        ["SELECT", "COUNT(*)", "FROM", "Ogrenciler", "GROUP BY", "Sehir"],
        [
            "SELECT",
            "Sehir",
            "COUNT(*)",
            "FROM",
            "Ogrenciler",
            "GROUP BY",
            "Sehir",
            "ORDER BY",
            "COUNT(*) DESC",
        ],
        ["SELECT", "AVG(FinalNotu)", "FROM", "Notlar"],
        [
            "SELECT",
            "Ad, Soyad",
            "FROM",
            "Ogrenciler",
            "WHERE",
            "Sehir = 'Istanbul'",
            "ORDER BY",
            "Ad ASC",
        ],
    ];

    const selectedQuery =
        randomQueries[Math.floor(Math.random() * randomQueries.length)];

    selectedQuery.forEach((token) => {
        queryTokens.push(token);

        // Find and select the corresponding button
        const buttons = document.querySelectorAll(".sql-block");
        buttons.forEach((button) => {
            if (button.getAttribute("data-token") === token) {
                button.classList.add("selected");
            }
        });
    });

    updateQueryDisplay();

    // Auto run after short delay
    setTimeout(() => {
        runQuery();
    }, 1000);
}

// Custom Aggregate Function Builder
function addCustomAggregate() {
    playClickSound();

    const funcSelect = document.getElementById("aggregateFunction");
    const columnInput = document.getElementById("aggregateColumn");

    const func = funcSelect.value;
    const column = columnInput.value.trim();

    if (!column) {
        alert("❌ Lütfen bir sütun adı girin!");
        return;
    }

    let token;
    if (func === "COUNT(DISTINCT") {
        token = `COUNT(DISTINCT ${column})`;
    } else {
        token = `${func}(${column})`;
    }

    // Create a temporary button-like element and toggle it
    const tempElement = {
        getAttribute: () => token,
        classList: {
            contains: () => false,
            add: () => {},
            remove: () => {},
        },
        style: {},
    };

    // Add to tokens
    queryTokens.push(token);
    updateQueryDisplay();

    // Clear input
    columnInput.value = "";

    // Visual feedback
    columnInput.style.background = "#48bb78";
    setTimeout(() => {
        columnInput.style.background = "white";
    }, 500);

    playSuccessSound();
}

// Quick Add Aggregate Functions
function quickAddAggregate(func, column) {
    playClickSound();

    let token = `${func}(${column})`;

    // Add to tokens
    queryTokens.push(token);
    updateQueryDisplay();

    playSuccessSound();
}

// Allow Enter key in aggregate input
document.addEventListener("DOMContentLoaded", function () {
    // Add event listener for Enter key in aggregate input (will be added after DOM loads)
    setTimeout(() => {
        const aggregateInput = document.getElementById("aggregateColumn");
        if (aggregateInput) {
            aggregateInput.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomAggregate();
                }
            });
        }
    }, 500);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        playClickSound();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Hover efektleri için ek animasyonlar
document.querySelectorAll(".section").forEach((section) => {
    section.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)";
    });

    section.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
    });
});

// SQL komutlarına click to copy özelliği
document.querySelectorAll(".sql-command").forEach((cmd) => {
    cmd.style.cursor = "pointer";
    cmd.title = "Kopyalamak için tıkla";

    cmd.addEventListener("click", function () {
        playClickSound();
        const text = this.innerText;
        navigator.clipboard.writeText(text).then(() => {
            const originalBg = this.style.background;
            this.style.background = "#48bb78";
            setTimeout(() => {
                this.style.background = originalBg;
            }, 500);
        });
    });
});

// Klavye kısayolları
document.addEventListener("keydown", function (e) {
    // Ctrl+Enter ile sorgu çalıştır
    if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        runQuery();
    }

    // Escape ile temizle
    if (e.key === "Escape") {
        clearQuery();
    }

    // Home tuşu ile en üste çık
    if (e.key === "Home") {
        e.preventDefault();
        scrollToTop();
    }
});
