document.getElementById('uploadExcel').addEventListener('change', handleFile);

// Функция открытия галереи
function openGallery(index) {
    const images = [
        { src: 'images/tshirt.jpg', alt: 'Футболка' },
        { src: 'images/jeans.jpg', alt: 'Джинсы' },
        { src: 'images/hoodies.jpg', alt: 'Толстовка' }
    ];

    // Проверяем, существует ли изображение с таким индексом
    if (index < 0 || index >= images.length) {
        console.error('Неверный индекс изображения');
        return;
    }

    // Получаем модальное окно и вставляем данные
    const modal = document.getElementById('galleryModal');
    const galleryImage = document.getElementById('galleryImage');
    galleryImage.src = images[index].src;
    galleryImage.alt = images[index].alt;

    modal.style.display = 'block'; // Показываем модальное окно
}

// Функция закрытия галереи
function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'none'; // Скрываем модальное окно
}


function handleFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Чтение первого листа Excel
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Конвертация данных Excel в JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData); // Проверяем данные в консоли
        displayProducts(jsonData);
    };
    reader.readAsArrayBuffer(file);
}

function displayProducts(products) {
    const container = document.getElementById('product-container'); // Убедитесь, что id совпадает с вашим HTML
    container.innerHTML = ''; // Очищаем контейнер перед добавлением новых данных

    products.forEach(product => {
        const name = product['Название товара'] || 'Без названия';
        const category = product['Категория'] || 'Без категории';
        const price = product['Цена'] || 'Цена не указана';
        const image = product['Изображение'] || '';
        const description = product['Описание'] || 'Описание отсутствует';

        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <div class="product-card">
                ${image ? `<img src="${image}" alt="${name}" class="product-image">` : ''}
                <h3>${name}</h3>
                <p>Категория: ${category}</p>
                <p>Цена: ${price}</p>
                <p>${description}</p>
            </div>
        `;

        container.appendChild(card);
    });

    // Отображаем контейнер после загрузки данных
    container.classList.add('loaded');
}

<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

function openCategory(category) {
    window.location.href = `categories/${category}/index.html`;
}
