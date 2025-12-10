// DOM Elemanlarını Al
const colorPicker = document.getElementById("colorPicker");
const thickness = document.getElementById("thickness");
const lengthSlider = document.getElementById("length");
const gap = document.getElementById("gap");
const outline = document.getElementById("outline");
const dot = document.getElementById("dot");
const output = document.getElementById("output");
const preview = document.getElementById("crosshairPreview");

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copyCode");

// 🎯 Önizleme Çizim Fonksiyonu
function updatePreview() {
    preview.innerHTML = "";

    let color = colorPicker.value;
    let thick = Number(thickness.value);
    let len = Number(lengthSlider.value);
    let gp = Number(gap.value);

    // Dikey çizgi
    const vert = document.createElement("div");
    vert.style.position = "absolute";
    vert.style.width = thick + "px";
    vert.style.height = len + "px";
    vert.style.background = color;
    vert.style.left = "50%";
    vert.style.top = `calc(50% - ${gp + len}px)`;
    preview.appendChild(vert);

    const vert2 = document.createElement("div");
    vert2.style.position = "absolute";
    vert2.style.width = thick + "px";
    vert2.style.height = len + "px";
    vert2.style.background = color;
    vert2.style.left = "50%";
    vert2.style.top = `calc(50% + ${gp}px)`;
    preview.appendChild(vert2);

    // Yatay çizgiler
    const hor = document.createElement("div");
    hor.style.position = "absolute";
    hor.style.height = thick + "px";
    hor.style.width = len + "px";
    hor.style.background = color;
    hor.style.top = "50%";
    hor.style.left = `calc(50% - ${gp + len}px)`;
    preview.appendChild(hor);

    const hor2 = document.createElement("div");
    hor2.style.position = "absolute";
    hor2.style.height = thick + "px";
    hor2.style.width = len + "px";
    hor2.style.background = color;
    hor2.style.top = "50%";
    hor2.style.left = `calc(50% + ${gp}px)`;
    preview.appendChild(hor2);

    // Orta nokta
    if (dot.checked) {
        const mid = document.createElement("div");
        mid.style.position = "absolute";
        mid.style.width = "4px";
        mid.style.height = "4px";
        mid.style.borderRadius = "50%";
        mid.style.background = color;
        mid.style.left = "calc(50% - 2px)";
        mid.style.top = "calc(50% - 2px)";
        preview.appendChild(mid);
    }
}

// 🎯 Valorant Kod Üretme
function generateValorantCode() {
    let c = colorPicker.value.replace("#", "");

    let code = `
0;P;${thickness.value};
h;${lengthSlider.value};
m;${gap.value};
c;${c};
d;${dot.checked ? 1 : 0};
o;${outline.checked ? 1 : 0};
`;

    output.value = code;
}

// 🎲 Random Crosshair
function randomCrosshair() {
    colorPicker.value = "#" + Math.floor(Math.random() * 16777215).toString(16);
    thickness.value = Math.floor(Math.random() * 5) + 1;
    lengthSlider.value = Math.floor(Math.random() * 15) + 1;
    gap.value = Math.floor(Math.random() * 10);
    outline.checked = Math.random() > 0.5;
    dot.checked = Math.random() > 0.5;

    updatePreview();
    generateValorantCode();
}

// ⭐ Hazır Presetler
const presets = {
    "Radiant": {
        color: "#ff4655",
        thickness: 2,
        length: 9,
        gap: 4,
        dot: false,
        outline: true
    },
    "Yay": {
        color: "#00ffff",
        thickness: 2,
        length: 10,
        gap: 3,
        dot: false,
        outline: false
    },
    "Sacy": {
        color: "#ffaa00",
        thickness: 2,
        length: 9,
        gap: 2,
        dot: false,
        outline: true
    }
};

// Preset Butonlarına Tıklama
document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let name = btn.innerText.trim();

        if (name === "🎲 Random") {
            randomCrosshair();
            return;
        }

        if (presets[name]) {
            const p = presets[name];
            colorPicker.value = p.color;
            thickness.value = p.thickness;
            lengthSlider.value = p.length;
            gap.value = p.gap;
            dot.checked = p.dot;
            outline.checked = p.outline;

            updatePreview();
            generateValorantCode();
        }
    });
});

// Kod üret butonu
generateBtn.addEventListener("click", generateValorantCode);

// Kopyala
copyBtn.addEventListener("click", () => {
    output.select();
    document.execCommand("copy");
    alert("Kod kopyalandı!");
});

// Slider ve inputlar değiştiğinde sürekli güncelle
document.querySelectorAll("input").forEach(el => {
    el.addEventListener("input", () => {
        updatePreview();
        generateValorantCode();
    });
});

// İlk başta çiz
updatePreview();
generateValorantCode();
