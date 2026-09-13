// 展开/收起核心逻辑
function expandCard(cardId) {
    event.stopPropagation();
    const selectedCard = document.getElementById(cardId);
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