// 文件数据 - 在这里添加你的文件信息
const filesData = [
    {
        id: 1,
        name: "供销大集复盘策略",
        description: "截止2026/03/30无止尽单边下跌的思考",
        category: "document",
        size: "411 kb",
        date: "2026-03-30",
        screenshot: "screenshots/1供销大集.png",
        baiduLink: "https://pan.baidu.com/s/15YO4ql8OVo7ioTcihFhAPQ?pwd=mjuv",
        password: "mjuv",
        downloads: 330
    },
    {
        id: 2,
        name: "K线训练营",
        description: "PANDA-K线分析训练营视频组",
        category: "other",
        size: "1.8 GB",
        date: "2026-01-20",
        screenshot: "screenshots/2PANDA-K.png",
        baiduLink: "https://pan.baidu.com/s/1kFcZ28uO9m2gWyRO1obo-A?pwd=5gqd",
        password: "5gqd",
        downloads: 5230
    },
    {
        id: 3,
        name: "TDX量化策略代码从零开始",
        description: "TDX量化交易策略代码教程，从零开始学习量化交易",
        category: "software",
        size: "5.2 GB",
        date: "2024-02-01",
        screenshot: "screenshots/3TDX.png",
        baiduLink: "https://pan.baidu.com/s/zzzzz",
        password: "video",
        downloads: 89
    },
    {
        id: 4,
        name: "股票AI机器训练实战记录",
        description: "包含深度学习、NLP、计算机视觉等方向的实战项目",
        category: "video",
        size: "8.3 GB",
        date: "2026-02-10",
        screenshot: "screenshots/4.png",
        baiduLink: "https://pan.baidu.com/s/mmmmm",
        password: "ml123",
        downloads: 312
    },
    {
        id: 5,
        name: "大语言模型训练语料库搭建",
        description: "Word、Excel、PPT从入门到精通的视频教程",
        category: "document",
        size: "3.7 GB",
        date: "2026-02-15",
        screenshot: "screenshots/5.png",
        baiduLink: "https://pan.baidu.com/s/nnnnn",
        password: "office",
        downloads: 178
    },
    {
        id: 6,
        name: "PETRADE量化软件包",
        description: "Blender工具",
        category: "software",
        size: "12.5 GB",
        date: "2025-02-20",
        screenshot: "screenshots/6.png",
        baiduLink: "https://pan.baidu.com/s/ppppp",
        password: "3dmodel",
        downloads: 67
    }
];

// 类别映射
const categoryMap = {
    'document': '文档',
    'video': '视频',
    'software': '软件',
    'other': '其他'
};

// 类别图标
const categoryIconMap = {
    'document': 'fa-file-alt',
    'video': 'fa-video',
    'software': 'fa-laptop-code',
    'other': 'fa-folder'
};

// DOM元素
const filesContainer = document.getElementById('files-container');
const searchInput = document.getElementById('search-input');
const categoryBtns = document.querySelectorAll('.category-btn');
const loading = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');
const modal = document.getElementById('file-modal');
const modalClose = document.getElementById('modal-close');
const fileCount = document.getElementById('file-count');
const downloadCount = document.getElementById('download-count');

// 当前筛选状态
let currentCategory = 'all';
let currentSearch = '';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderFiles();
    setupEventListeners();
    updateStats();
});

// 渲染文件列表
function renderFiles() {
    loading.style.display = 'block';
    filesContainer.innerHTML = '';
    
    // 模拟加载延迟
    setTimeout(() => {
        const filteredFiles = filterFiles();
        
        if (filteredFiles.length === 0) {
            loading.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }
        
        emptyState.style.display = 'none';
        
        filteredFiles.forEach((file, index) => {
            const card = createFileCard(file);
            filesContainer.appendChild(card);
            
            // 添加延迟动画
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        loading.style.display = 'none';
    }, 300);
}

// 创建文件卡片
function createFileCard(file) {
    const card = document.createElement('div');
    card.className = 'file-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.3s ease';
    
    card.innerHTML = `
        <div class="file-screenshot">
            ${file.screenshot ? 
                `<img src="${file.screenshot}" alt="${file.name}" onerror="this.parentElement.innerHTML='<i class=\\'fas ${categoryIconMap[file.category]} placeholder-icon\\'></i>'">` : 
                `<i class="fas ${categoryIconMap[file.category]} placeholder-icon"></i>`
            }
            <span class="file-category-badge">${categoryMap[file.category]}</span>
        </div>
        <div class="file-info">
            <h3 class="file-name" title="${file.name}">${file.name}</h3>
            <p class="file-description">${file.description}</p>
            <div class="file-meta">
                <span><i class="fas fa-weight"></i> ${file.size}</span>
                <span><i class="fas fa-download"></i> ${file.downloads}</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openModal(file));
    
    return card;
}

// 筛选文件
function filterFiles() {
    return filesData.filter(file => {
        const matchCategory = currentCategory === 'all' || file.category === currentCategory;
        const matchSearch = file.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          file.description.toLowerCase().includes(currentSearch.toLowerCase());
        return matchCategory && matchSearch;
    });
}

// 打开模态框
function openModal(file) {
    document.getElementById('modal-title').textContent = file.name;
    document.getElementById('modal-category').innerHTML = `<i class="fas fa-tag"></i> ${categoryMap[file.category]}`;
    document.getElementById('modal-size').innerHTML = `<i class="fas fa-weight"></i> ${file.size}`;
    document.getElementById('modal-date').innerHTML = `<i class="fas fa-calendar"></i> ${file.date}`;
    document.getElementById('modal-description').innerHTML = `
        <p>${file.description}</p>
        ${file.password ? `<p style="margin-top: 1rem; color: var(--primary-color);"><i class="fas fa-key"></i> <strong>提取密码：</strong>${file.password}</p>` : ''}
    `;
    
    const screenshotImg = document.getElementById('modal-screenshot');
    if (file.screenshot) {
        screenshotImg.src = file.screenshot;
        screenshotImg.alt = file.name;
        screenshotImg.style.display = 'block';
    } else {
        screenshotImg.style.display = 'none';
    }
    
    const downloadBtn = document.getElementById('modal-download');
    downloadBtn.href = file.baiduLink;
    
    // 保存当前文件数据到按钮，用于复制链接
    downloadBtn.dataset.link = file.baiduLink;
    downloadBtn.dataset.password = file.password || '';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭模态框
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// 复制链接
function copyLink() {
    const downloadBtn = document.getElementById('modal-download');
    const link = downloadBtn.dataset.link;
    const password = downloadBtn.dataset.password;
    
    const text = password ? 
        `链接：${link}\n提取码：${password}` : 
        `链接：${link}`;
    
    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = document.getElementById('btn-copy-link');
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = '<i class="fas fa-check"></i> 已复制';
        
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> 复制链接';
        }, 2000);
    }).catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制');
    });
}

// 更新统计
function updateStats() {
    fileCount.textContent = filesData.length;
    const totalDownloads = filesData.reduce((sum, file) => sum + file.downloads, 0);
    downloadCount.textContent = totalDownloads;
}

// 设置事件监听
function setupEventListeners() {
    // 搜索
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderFiles();
    });
    
    // 类别筛选
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderFiles();
        });
    });
    
    // 关闭模态框
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // ESC关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
    
    // 复制链接按钮
    document.getElementById('btn-copy-link').addEventListener('click', copyLink);
    
    // 导航链接平滑滚动
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 切换显示
                document.querySelectorAll('main > div > section').forEach(s => s.style.display = 'none');
                targetSection.style.display = 'block';
                
                // 更新导航状态
                document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// 工具函数：格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// 工具函数：格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}