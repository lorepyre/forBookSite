document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('input[type="text"]');
    const searchButton = document.querySelector('.button-explore-books');
    const booksContainer = document.querySelector('.book-carousel');
    const searchResultsSection = document.querySelector('.search-results');
    const searchResultsContainer = document.querySelector('.search-results-container');
    const scrollLink = document.querySelector('.scroll-link');
    const contactLink = document.querySelector('a[href="#contact"]'); // "Əlaqə" linki üçün seçici
    const footerSection = document.querySelector('.footer'); // Footer bölməsi üçün seçici
    // "Kitabları kəşf et" düyməsini tapırıq
    const exploreButton = document.querySelector('.button-explore-books');

    exploreButton.addEventListener('click', function() {
        const featuredBooksSection = document.querySelector('.featured-books');
        
        // Bölməyə sürüşdürürük
        featuredBooksSection.scrollIntoView({
            behavior: 'smooth', 
            block: 'start' 
        });
    });

    searchButton.addEventListener('click', function () {
        const query = searchInput.value.trim();
        if (query) {
            searchResultsSection.style.display = 'block'; 
            fetchBooks(query);
        }
    });

    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchResultsSection.style.display = 'block'; 
                fetchBooks(query);
            }
        }
    });

    searchInput.addEventListener('input', function () {
        if (searchInput.value.trim() === '') {
            searchResultsSection.style.display = 'none'; 
        }
    });

    scrollLink.addEventListener('click', function (event) {
        event.preventDefault();  
        document.querySelector('#hero').scrollIntoView({
            behavior: 'smooth'
        });
    });

    contactLink.addEventListener('click', function (event) {
        event.preventDefault(); // Varsayılan davranışı dayandırır
        footerSection.scrollIntoView({
            behavior: 'smooth', // Hamar sürüşmə effekti
            block: 'start' // Başdan başlamaq üçün
        });
    });
    
    // Kitabların məlumatları
    const books = [
        {
            title: "Hüseyn Cavid - İblis",
            author: "Hüseyn Cavid",
            link: "book1.html",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1336532251i/13640044.jpg"
        },
        {
            title: "Cəlil Məmmədquluzadə - Ölülər",
            author: "Cəlil Məmmədquluzadə",
            link: "book2.html",
            image: "https://mir.az/uploads/posts/2024-05/b40120ee5d_kitablarmiraz-31.webp"
        },
        {
            title: "Məhəmməd Əmin Rəsulzadə - Əsrimizin Siyavuşu",
            author: "Məhəmməd Əmin Rəsulzadə",
            link: "book3.html",
            image: "https://www.1001kitab.az/product-images/671bfbbbb13d7.jpg"
        },
        {
            title: "Hüseyn Cavid - Ana",
            author: "Hüseyn Cavid",
            link: "book4.html",
            image: "https://kitabevim.az/wp-content/uploads/2024/04/2022-08-24-11-39-121661326752.jpg"
        },
        {
            title: "Cəlil Məmmədquluzadə - Poçt qutusu",
            author: "Cəlil Məmmədquluzadə",
            link: "book5.html",
            image: "https://static.insales-cdn.com/images/products/1/3706/302591610/Celil_Memmedquluzade_Poct_Qutusu_Esas.png"
        },
        {
            title: "Hüseyn Cavid - Şeyx Sənan",
            author: "Hüseyn Cavid",
            link: "book6.html",
            image: "https://static.insales-cdn.com/images/products/1/3159/649096279/SHEYX_SENAN_qapaq.jpg"
        },
        {
            title: "Cəfər Cabbarlı - Od gəlini",
            author: "Cəfər Cabbarlı",
            link: "book7.html",
            image: "https://novella.az/wp-content/uploads/2021/03/Od-g%C9%99lini.jpeg"
        },
        
            {
                title: "Cəfər Cabbarlı - Oqtay Eloğlu",
                author: "Cəfər Cabbarlı",
                link: "book8.html",
                image: "https://static.insales-cdn.com/images/products/1/4129/420139041/Cabbarli_Oqtay_Eloglu_qapaq_Esas.png"
            },
        {
            title: "Əlisa Nicat - Gəncəli müdrik",
            author: "Əlisa Nicat",
            link: "book9.html",
            image: "https://upload.wikimedia.org/wikipedia/az/e/ea/G%C9%99nc%C9%99li_m%C3%BCdrik_%28roman%29.jpg"
        },
        {
            title: "Abbasqulu ağa Bakıxanov - Gülüstani-İrəm",
            author: "Abbasqulu ağa Bakıxanov",
            link: "book10.html",
            image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Page_of_the_manuscript_of_Gulistani_Irem_2.png"
        },
        {
            title: "Mikayıl Müşfiq - Əbədiyyət nəğməsi",
            author: "Mikayıl Müşfiq",
            link: "book11.html",
            image: "https://static.insales-cdn.com/r/4M1WfOD4dLo/rs:fit:570:570:1/q:80/plain/images/products/1/4898/227373858/Mikayil_Musfiq_mini_Esas.png@webp"
        }
    ];

    // Axtarış funksiyası
    function searchBooks() {
        const input = document.querySelector('input[type="text"]').value.toLowerCase();
        const resultsContainer = document.querySelector('.search-results-container');
        
        // Hide results if input is empty
        if (input === "") {
            resultsContainer.innerHTML = "";
            return;
        }

        // Axtarış nəticələrini sıfırlamaq
        resultsContainer.innerHTML = "";

        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(input) || book.author.toLowerCase().includes(input)
        );

        if (filteredBooks.length > 0) {
            filteredBooks.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.classList.add('book-result');
                bookElement.innerHTML = `
                    <a href="${book.link}">
                        <img src="${book.image}" alt="${book.title}">
                        <h3>${book.title}</h3>
                        <p>${book.author}</p>
                    </a>
                `;
                resultsContainer.appendChild(bookElement);
            });
        } else {
            resultsContainer.innerHTML = "<p>Heç bir nəticə tapılmadı.</p>";
        }
    }

    // Axtarış inputu üzərində dinləyici əlavə etmək
    document.querySelector('input[type="text"]').addEventListener('input', searchBooks);
});
searchButton.addEventListener('click', function () {
    const query = searchInput.value.trim();
    if (query) {
        searchResultsSection.style.display = 'block'; // Axtarış nəticələrini göstər
        fetchBooks(query);
    }
});

