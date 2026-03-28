// Sample Data
const assets = [
    { name: "Subscribe", type: "video", subscribe: "GreenScreen", url: "video/Kishan.mp4" },
    { name: "Person", type: "video", person: "GreenScreen", url: "video/kittu_Bittu.mp4" },
    { name: "Cinematic Transition", type: "sound", oracestra: "Transition", url: "audio/mixkit-epic-orchestra-transition-2290.wav" },
    { name: "Rain", type: "sound", rain : "Nature", url: "audio/mixkit-rain-and-thunder-storm-2390.wav" },
    { name: "Butterfly", type: "video", butterfly: "GreenScreen", url: "video/pinterest_1774698447137.mp4" },
    { name: "Foot Steps", type: "sound", footsteps : "Nature", url: "audio/mixkit-footsteps-on-tall-grass-532.wav" },
    { name: "Keybord Typing", type: "sound", Typing : "Trending", url: "audio/mixkit-keyboard-typing-1386.wav" },
    { name: "Rocket Woosh", type: "sound", woosh : "Trending", url: "audio/mixkit-fast-rocket-whoosh-1714.wav" },
    { name: "Classic Alarm", type: "sound", alarm : "Trending", url: "audio/mixkit-classic-alarm-995.wav" },
    { name: "Futuristic Hum", type: "sound", futuristichum : "Trending", url: "audio/mixkit-technological-futuristic-hum-2133.wav" },
    { name: "Funny Hen", type: "sound", funnyhen : "Funny", url: "audio/AQOLkeI7TfyYsILQvIvy7jiR2vcpBA5Uxk7xqstfA3PcCOcHdQhdf5dCno6AiBsihlrPcdL-rI3OiQOlpfLVA3qU4jdaWgyECBxEprg.mp4" },
    { name: "Emoji", type: "video", Emoji: "GreenScreen", url: "video/Shadow.mp4" },
    { name: "GTA", type: "video", GTA: "GreenSceen", url: "video/Shadow(1).mp4" },
];

let currentType = 'video';
let currentCat = 'All';

// Enter the main app
function enterStudio() {
    document.body.classList.add('show-main');
    renderCats();
    render();
}

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('open');
    overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
}

// Set Media Type (Video/Sound)
function setType(type) {
    currentType = type;
    currentCat = 'All';
    renderCats();
    render();
    toggleSidebar();
}

// Set Category
function setCategory(cat) {
    currentCat = cat;
    render();
    toggleSidebar();
}

// Load Categories Dynamically
function renderCats() {
    const categories = currentType === 'video' 
        ? ['Nature', 'Funny', 'Trending'] 
        : ['Funny', 'Trending', 'Transition', 'Cinema', 'Bird', 'Nature'];
    
    let html = `<div class="nav-item" onclick="setCategory('All')">All Items</div>`;
    categories.forEach(c => {
        html += `<div class="nav-item" onclick="setCategory('${c}')" style="font-size: 0.9rem; margin-left:10px;">• ${c}</div>`;
    });
    document.getElementById('cat-links').innerHTML = html;
}

// Main Render Function
function render() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const container = document.getElementById('content');
    
    const filtered = assets.filter(item => {
        const typeMatch = item.type === currentType;
        const catMatch = currentCat === 'All' || item.cat === currentCat;
        const searchMatch = item.name.toLowerCase().includes(searchTerm);
        return typeMatch && catMatch && searchMatch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:gray;">No assets found.</p>`;
        return;
    }

    container.innerHTML = filtered.map(item => `
        <div class="asset-card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h2 style="font-size:1.2rem;">${item.name}</h2>
                <span style="color:var(--primary); font-size:0.8rem; background:#007aff22; padding:4px 10px; border-radius:15px;">${item.cat}</span>
            </div>
            ${item.type === 'video' 
                ? `<video controls src="${item.url}"></video>` 
                : `<audio controls src="${item.url}"></audio>`}
            <button class="download-btn" onclick="handleDownload('${item.name}')">Free Download</button>
        </div>
    `).join('');
}

function handleDownload(name) {
    alert(`Downloading ${name}... \nNote: In a live site, this would start the file transfer.`);
}