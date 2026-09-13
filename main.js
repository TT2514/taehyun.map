// 1. 初始化 Leaflet 地图
const map = L.map('map', {
    zoomControl: false 
}).setView([37.5665, 126.9780], 11);

// 使用完全免费、无任何 API 水印的干净底图
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 2. 所有打卡点的经纬度与对应卡片 ID 映射（共21个点）
const spots = [
    { id: 'card1', lat: 37.5739, lng: 126.9890 },
    { id: 'card2', lat: 37.5218, lng: 127.0326 },
    { id: 'card3', lat: 37.5234, lng: 127.0251 },
    { id: 'card4', lat: 37.5085, lng: 127.0268 },
    { id: 'card5', lat: 37.5240, lng: 127.0410 },
    { id: 'card6', lat: 37.5245, lng: 127.0350 },
    { id: 'card7', lat: 37.5320, lng: 127.0160 },
    { id: 'card8', lat: 37.4780, lng: 127.1260 },
    { id: 'card9', lat: 37.5390, lng: 127.0790 },
    { id: 'card10', lat: 37.5512, lng: 126.9882 },
    { id: 'card11', lat: 37.5500, lng: 126.9770 },
    { id: 'card12', lat: 37.5450, lng: 126.9200 },
    { id: 'card13', lat: 37.5250, lng: 126.9240 },
    { id: 'card14', lat: 37.5900, lng: 127.0580 },
    { id: 'card15', lat: 37.4850, lng: 126.5400 },
    { id: 'card16', lat: 35.1600, lng: 129.1600 },
    { id: 'card17', lat: 35.1587, lng: 129.1604 },
    { id: 'card18', lat: 38.2080, lng: 128.6050 },
    { id: 'card19', lat: 38.2040, lng: 128.5910 },
    { id: 'card20', lat: 38.1940, lng: 128.6030 },
    { id: 'card21', lat: 38.1800, lng: 128.5600 }
];

// 3. 在地图上批量生成粉色小圆点并绑定联动事件
spots.forEach(spot => {
    const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: '<div style="background-color: #fc8bab; width: 14px; height: 14px; border: 2px solid #fff; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3); cursor: pointer;"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7]
    });

    const marker = L.marker([spot.lat, spot.lng], { icon: customIcon }).addTo(map);

    marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        expandCard(spot.id);
        const cardElement = document.getElementById(spot.id);
        if (cardElement) {
            cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

// 4. 卡片展开/收起核心逻辑
function expandCard(cardId) {
    event && event.stopPropagation && event.stopPropagation();
    const selectedCard = document.getElementById(cardId);
    if (!selectedCard) return;
    const isActive = selectedCard.classList.contains('active');

    // 关闭其他卡片
    document.querySelectorAll('.spot-card').forEach(card => {
        card.classList.remove('active');
    });

    // 切换当前卡片状态
    if (!isActive) {
        selectedCard.classList.add('active');
    }
}

// 点击页面空白处收起所有卡片
function handleBodyClick(event) {
    document.querySelectorAll('.spot-card').forEach(card => {
        card.classList.remove('active');
    });
}

// 5. 复制地址功能
function copyText(elementId) {
    const textEl = document.getElementById(elementId);
    if (!textEl) return;
    const text = textEl.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.innerText;
        btn.innerText = '✅ 已复制';
        setTimeout(() => {
            btn.innerText = originalText;
        }, 1500);
    }).catch(err => {
        console.error('复制失败', err);
    });
}
