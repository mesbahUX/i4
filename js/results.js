/* =========================================================
   RESULTS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const type =
        params.get("type");


    setResultsTitle(type);

    loadResults(type);

});



/* =========================================================
   SET RESULTS TITLE
========================================================= */

// function setResultsTitle(type) {

//     const title =
//         document.querySelector("#results-title");

//     if (!title) {
//         return;
//     }


//     const params =
//         new URLSearchParams(
//             window.location.search
//         );


//     const format =
//         params.get("format");

//     const topic =
//         params.get("topic");

//     const speaker =
//         params.get("speaker");

// const q =
//     params.get("q");
//     /* =========================================
//        فارسی کردن پارامترها
//     ========================================= */

//     const typeTitles = {

//         newest: "تازه",

//         popular: "پربازدید",

//         upcoming: "مناسبت‌های پیش‌رو",

//         filtered: "نتایج فیلتر",

//         saved: "ذخیره شده",

//         history: "تاریخچه"

//     };


//     const formatTitles = {

//         video: "ویدیو",

//         audio: "صوت",

//         playlist: "مجموعه",

//         image: "عکس",

//         text: "کتاب‌ها و مقاله"

//     };
        
//     const topicNames = {

//         quran:
//             "قرآن",

//         ahlulbayt:
//             "چهارده معصوم",

//         prophets:
//             "پیامبران",

//         hadith:
//             "حدیث",

//         history:
//             "تاریخ",

//         seerah:
//             "سیره",

//         arabic:
//             "قواعد عربی",

//         aqeedah:
//             "کلام و عقاید",

//         fiqh:
//             "فقه و احکام",

//         ethics:
//             "اخلاق",

//         family:
//             "خانواده",

//         "islamic-sciences":
//             "علوم اسلامی"

//     };


//     const speakerNames = {

//         speaker1:
//             "سخنران 1",

//         speaker2:
//             "سخنران 2",

//         speaker3:
//             "سخنران 3"

//     };

// const isValidType =
//     Object.prototype.hasOwnProperty.call(
//         typeTitles,
//         type
//     );

// const typeTitle =
//     isValidType
//         ? typeTitles[type]
//         : "نتایج";
// /* =========================================
//    عنوان جستجو
// ========================================= */

// if (type === "search") {

//     title.textContent =
//         q
//             ? `نتایج جستجوی "${q}"`
//             : "نتایج";

//     return;
// }
//     const topicTitle =
//         topicNames[topic] || topic;

//     const speakerTitle =
//         speakerNames[speaker] || speaker;
//     /* =========================================
//        ساخت عنوان
//     ========================================= */

//     const parts = [];


//     /* format */

//     if (format && formatTitles[format]) {

//         parts.push(
//             formatTitles[format]
//         );

//     }


//     /* type */

//     if (typeTitle) {

//         parts.push(
//             typeTitle
//         );

//     }


//     /* =========================================
//        اگر format وجود نداشت
//        بعد از type «ها» اضافه شود
//     ========================================= */

//     let result =
//         parts.join("‌های ");


// if (
//     !format &&
//     typeTitle &&
//     isValidType &&
//     !["filtered", "history"].includes(type)
// ) {

//     result += "‌ها";

// }


//     if (topic) {

//         result +=
//             " درباره‌ی " +
//             topicTitle;

//     }


//     if (speaker) {

//         result +=
//             " از " +
//             speakerTitle;

//     }


//         title.textContent =
//             result;

// }

/* =========================================================
   SET RESULTS TITLE
========================================================= */

function setResultsTitle(type) {

    const title =
        document.querySelector("#results-title");

    if (!title) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const format =
        params.get("format");

    const topic =
        params.get("topic");

    const speaker =
        params.get("speaker");

    const q =
        params.get("q");


    /* =========================================
       فارسی کردن پارامترها
    ========================================= */

    const typeTitles = {

        newest: "تازه‌ها",

        popular: "پربازدید‌ها",

        upcoming: "مناسبت‌های پیش‌رو",

        filtered: "نتایج فیلتر",

        saved: "ذخیره شده",

        history: "تاریخچه"

    };


    const formatTitles = {

        video: "ویدیو",

        audio: "صوت",

        playlist: "مجموعه",

        image: "عکس",

        book: "کتاب‌ها و مقاله"

    };


    const topicNames = {

        quran:
            "قرآن",

        ahlulbayt:
            "چهارده معصوم",

        prophets:
            "پیامبران",

        hadith:
            "حدیث",

        history:
            "تاریخ",

        seerah:
            "سیره",

        arabic:
            "قواعد عربی",

        aqeedah:
            "کلام و عقاید",

        fiqh:
            "فقه و احکام",

        ethics:
            "اخلاق",

        family:
            "خانواده",

        "islamic-sciences":
            "علوم اسلامی"

    };


    const speakerNames = {

        speaker1:
            "سخنران 1",

        speaker2:
            "سخنران 2",

        speaker3:
            "سخنران 3"

    };


    /* =========================================
       عنوان جستجو
    ========================================= */

    if (type === "search") {

        title.textContent =
            q
                ? `نتایج جستجوی "${q}"`
                : "نتایج";

        return;
    }


    /* =========================================
       عنوان‌های فارسی
    ========================================= */

    const typeTitle =
        typeTitles[type];

    const formatTitle =
        formatTitles[format];

    const topicTitle =
        topicNames[topic] || topic;

    const speakerTitle =
        speakerNames[speaker] || speaker;


    /* =========================================
       ساخت عنوان
       
       ترتیب:
       type - format - topic - speaker
    ========================================= */

    const parts = [];


    if (typeTitle) {

        parts.push(
            typeTitle
        );

    }


    if (formatTitle) {

        parts.push(
            formatTitle
        );

    }


    if (topicTitle) {

        parts.push(
            topicTitle
        );

    }


    if (speakerTitle) {

        parts.push(
            speakerTitle
        );

    }


    /* =========================================
       اگر هیچ کدام وجود نداشت
    ========================================= */

    title.textContent =
        parts.length
            ? parts.join(" - ")
            : "نتایج";

}

/* =========================================================
   LOAD RESULTS
========================================================= */

async function loadResults(type) {

    const file =
        "data/contents2.xml";


    try {

        const response =
            await fetch(file);


        if (!response.ok) {

            throw new Error(
                `Failed to load ${file}`
            );

        }


        const xmlText =
            await response.text();


        const parser =
            new DOMParser();


        const xml =
            parser.parseFromString(
                xmlText,
                "application/xml"
            );


        /* =========================================
           بررسی خطای XML
        ========================================= */

        const parserError =
            xml.querySelector("parsererror");


        if (parserError) {

            throw new Error(
                "ساختار XML صحیح نیست."
            );

        }

/* =========================================
   همه محتواها
========================================= */

let items =
    [...xml.querySelectorAll("content")];


/* =========================================
   PLAYLISTS
========================================= */

let playlists = [];

try {

    const playlistResponse =
        await fetch("data/playlists.xml");


    if (playlistResponse.ok) {

        const playlistText =
            await playlistResponse.text();


        const playlistXML =
            parser.parseFromString(
                playlistText,
                "application/xml"
            );


        playlists =
            [
                ...playlistXML.querySelectorAll("playlist")
            ];

    }

} catch (error) {

    console.error(
        "Error loading playlists:",
        error
    );

}
/* =========================================================
   IMAGES
========================================================= */

let images = [];

try {

    const imageResponse =
        await fetch("data/images.xml");

    if (imageResponse.ok) {

        const imageText =
            await imageResponse.text();

        const imageXML =
            parser.parseFromString(
                imageText,
                "application/xml"
            );

        images = [
            ...imageXML.querySelectorAll("image")
        ];

    }

} catch (error) {

    console.error(
        "Error loading images:",
        error
    );

}
/* =========================================================
   BOOKS
========================================================= */

let books = [];

try {

    const bookResponse =
        await fetch("data/books.xml");

    if (bookResponse.ok) {

        const bookText =
            await bookResponse.text();

        const bookXML =
            parser.parseFromString(
                bookText,
                "application/xml"
            );

        books = [
            ...bookXML.querySelectorAll("book")
        ];

    }

} catch (error) {

    console.error(
        "Error loading books:",
        error
    );

}

/* =========================================================
   SAVED / HISTORY
   فقط IDهای مربوط به نوع صفحه را از XML نگه می‌داریم
   بقیه منطق Results بدون تغییر ادامه پیدا می‌کند.
========================================================= */

if (
    type === "saved" ||
    type === "history"
) {

    /* =========================================
       CONTENT IDS
    ========================================= */

    const contentStorageKey =
        type === "saved"
            ? "mesbah_saved_contents"
            : "mesbah_history";


    let contentIds = [];


    try {

        const stored =
            JSON.parse(
                localStorage.getItem(
                    contentStorageKey
                ) || "[]"
            );


        contentIds =
            stored.map(item => {

                /*
                 * mesbah_history ممکن است
                 * آبجکت یا ID ساده باشد.
                 */

                if (
                    typeof item === "object" &&
                    item !== null
                ) {

                    return String(item.id);

                }

                return String(item);

            });

    } catch {

        contentIds = [];

    }


    /* =========================================
       فقط محتواهای دارای ID
    ========================================= */

    items =
        contentIds
            .map(id =>
                items.find(
                    item =>
                        item.getAttribute("id") === id
                )
            )
            .filter(Boolean)
            .reverse();

    /* =========================================
       PLAYLIST IDS
    ========================================= */

    const playlistStorageKey =
        type === "saved"
            ? "mesbah_saved_playlists"
            : "mesbah_history_playlists";


    let playlistIds = [];


    try {

        playlistIds =
            JSON.parse(
                localStorage.getItem(
                    playlistStorageKey
                ) || "[]"
            )
            .map(id => String(id));

    } catch {

        playlistIds = [];

    }


/* =========================================
   فقط مجموعه‌های دارای ID
========================================= */

playlists =
    playlistIds
        .map(id =>
            playlists.find(
                playlist =>
                    playlist.getAttribute("id") === id
            )
        )
        .filter(Boolean)
        .reverse();

/* =========================================
   BOOK IDS
   فقط در saved / history
========================================= */

const bookStorageKey =
    type === "saved"
        ? "mesbah_saved_books"
        : "mesbah_history_books";


let bookIds = [];


try {

    bookIds =
        JSON.parse(
            localStorage.getItem(
                bookStorageKey
            ) || "[]"
        )
        .map(item => {

            if (
                typeof item === "object" &&
                item !== null
            ) {

                return String(item.id);

            }

            return String(item);

        });

} catch {

    bookIds = [];

}


/* =========================================
   فقط کتاب‌های دارای ID
========================================= */

books =
    bookIds
        .map(id =>
            books.find(
                book =>
                    book.getAttribute("id") === id
            )
        )
        .filter(Boolean)
        .reverse();
/* =========================================
   IMAGE IDS
   فقط در saved / history
========================================= */

const imageStorageKey =
    type === "saved"
        ? "mesbah_saved_images"
        : "mesbah_history_images";


let imageIds = [];


try {

    imageIds =
        JSON.parse(
            localStorage.getItem(
                imageStorageKey
            ) || "[]"
        )
        .map(item => {

            if (
                typeof item === "object" &&
                item !== null
            ) {

                return String(item.id);

            }

            return String(item);

        });

} catch {

    imageIds = [];

}


/* =========================================
   فقط عکس‌های دارای ID
========================================= */

images =
    imageIds
        .map(id =>
            images.find(
                image =>
                    image.getAttribute("id") === id
            )
        )
        .filter(Boolean)
        .reverse();
}
        /* =========================================
           فقط برای تعیین پنجره باز/بسته
        ========================================= */

        const params =
            new URLSearchParams(
                window.location.search
            );


        const format =
            params.get("format") ||
            params.get("formatf");


        /* =========================================
           نمایش
        ========================================= */

        renderResults(
            items,
            playlists,
            books,
            images,
            type,
            format
        );


    } catch (error) {

        console.error(
            "Error loading results:",
            error
        );

    }

}


/* =========================================================
   RENDER RESULTS
========================================================= */

function renderResults(
    items,
    playlists,
    books,
    images,
    resultType,
    format
) {

    const container =
        document.querySelector(".results-grid");


    if (!container) {
        return;
    }


    container.innerHTML = "";



    const videos = [];
    const audios = [];
    const playlistItems = playlists;
    const bookItems = books;
    const imageItems = images;

    /* =========================================
       جدا کردن محتوا فقط برای نمایش در پنجره مربوطه
       این فیلتر جستجو نیست
    ========================================= */

    items.forEach(item => {

        const itemType =
            getXMLValue(
                item,
                "type"
            );


        if (itemType === "video") {

            videos.push(item);

        }

        else if (itemType === "audio") {

            audios.push(item);

        }

    });
    /* =========================================
    تعیین پنجره‌های قابل نمایش
    ========================================= */

    let showVideo = false;
    let showAudio = false;
    let showPlaylist = false;
    let showBook = false;
    let showImage = false;

    if (format === "video") {

        showVideo = true;

    }

    else if (format === "audio") {

        showAudio = true;

    }

    else if (format === "playlist") {

        showPlaylist = true;

    }

    else if (format === "book") {

        showBook = true;

    }
    else if (format === "image") {

        showImage = true;

    }
    else {

        showVideo = true;
        showAudio = true;
        showPlaylist = true;
        showBook = true;
        showImage = true;
    }
    /* =========================================
    لیست‌های پخش
    ========================================= */

    if (showPlaylist && playlistItems.length) {

        container.appendChild(

            createResultsSection(
                "مجموعه‌ها",
                playlistItems,
                "playlist",
                true
            )

        );

    }

    /* =========================================
    کتاب‌ها
    ========================================= */

    if (showBook && bookItems.length) {

        container.appendChild(

            createResultsSection(
                "کتاب‌ها",
                bookItems,
                "book",
                true
            )

        );

    }
    /* =========================================
    عکس‌ها
    ========================================= */

    if (showImage && imageItems.length) {

        container.appendChild(

            createResultsSection(
                "عکس‌ها",
                imageItems,
                "image",
                true
            )

        );

    }
    /* =========================================
    ویدئوها
    ========================================= */

    if (showVideo && videos.length) {

        container.appendChild(

            createResultsSection(
                "ویدئوها",
                videos,
                "video",
                true
            )

        );

    }


    /* =========================================
    صوت‌ها
    ========================================= */

    if (showAudio && audios.length) {

        container.appendChild(

            createResultsSection(
                "صوت‌ها",
                audios,
                "audio",
                true
            )

        );

    }

    /* =========================================
    اگر فقط یک سکشن وجود داشت، هدرش مخفی شود
    ========================================= */

    const sections =
        container.querySelectorAll(".results-section");

    if (sections.length === 1) {

        sections[0]
            .querySelector(".results-section-header")
            ?.remove();

    }
    /* =========================================
       بدون محتوا
    ========================================= */

    if (
        !videos.length &&
        !audios.length &&
        !playlistItems.length &&
        !bookItems.length &&
        !imageItems.length
    ) {

        container.innerHTML = `

            <div class="results-empty">

                محتوایی برای نمایش پیدا نشد.

            </div>

        `;

    }

}


/* =========================================================
   CREATE RESULTS SECTION
========================================================= */

function createResultsSection(
    title,
    items,
    sectionType,
    isOpen = true
) {

    const section =
        document.createElement("section");


    section.className =
        `results-section results-${sectionType}-section` +
        (isOpen ? " is-open" : "");


    /* =========================================
       HEADER
    ========================================= */

    const header =
        document.createElement("button");


    header.type = "button";

    header.className =
        "results-section-header";

    header.setAttribute(
        "aria-expanded",
        isOpen
    );


    header.innerHTML = `

        <div class="results-section-title">

            <h2>
                ${title}
            </h2>

           <!-- <span class="results-count">
                ${items.length} نتیجه
            </span> -->

        </div>


        <i class="
            fa-solid
            ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}
            results-section-arrow
        "></i>
    `;


    /* =========================================
       CONTENT
    ========================================= */

    const content =
        document.createElement("div");


    content.className =
        "results-section-content";


    /* =========================================
       GRID
    ========================================= */

    const grid =
        document.createElement("div");


    grid.className =
        `results-items-grid results-${sectionType}-grid`;


    /* =========================================
       تعداد اولیه
    ========================================= */

    const initialCount = 12
        // sectionType === "video"
        //     ? 8
        //     : sectionType === "audio"
        //         ? 12
        //         : 8;


    let visibleCount =
        Math.min(
            initialCount,
            items.length
        );


    renderSectionItems(
        grid,
        items,
        visibleCount
    );


    content.appendChild(grid);


    // =========================================
    // نمایش نتایج بیشتر / کمتر
    // =========================================

    if (items.length > visibleCount) {

        const moreButton =
            document.createElement("button");

        moreButton.type = "button";

        moreButton.className =
            "results-more-btn";

        moreButton.innerHTML = `

            <span>
                نمایش نتایج بیشتر
            </span>

            <i class="
                fa-solid
                fa-chevron-down
            "></i>

        `;


        moreButton.addEventListener(
            "click",
            () => {

                /* اگر هنوز همه نتایج نمایش داده نشده */
                if (visibleCount < items.length) {

                    visibleCount =
                        Math.min(
                            visibleCount + initialCount,
                            items.length
                        );

                    renderSectionItems(
                        grid,
                        items,
                        visibleCount,
                    );


                    /* اگر همه نتایج نمایش داده شد */
                    if (
                        visibleCount >=
                        items.length
                    ) {

                        moreButton.querySelector("span")
                            .textContent =
                            "نمایش نتایج کمتر";

                        moreButton.querySelector("i")
                            .className =
                            "fa-solid fa-chevron-up";
                    }

                }

                /* اگر همه نمایش داده شده، برگرد به حالت اولیه */
                else {

                    visibleCount =
                        initialCount;

                    renderSectionItems(
                        grid,
                        items,
                        visibleCount,
                    );


                    moreButton.querySelector("span")
                        .textContent =
                        "نمایش نتایج بیشتر";

                    moreButton.querySelector("i")
                        .className =
                        "fa-solid fa-chevron-down";
                }

            }
        );


        content.appendChild(
            moreButton
        );
    }


    /* =========================================
       باز و بسته شدن
    ========================================= */

    header.addEventListener("click", () => {

        const isOpen =
            section.classList.toggle("is-open");


        header.setAttribute(
            "aria-expanded",
            isOpen
        );


        const arrow =
            header.querySelector(
                ".results-section-arrow"
            );


        arrow.classList.toggle(
            "fa-chevron-up",
            isOpen
        );


        arrow.classList.toggle(
            "fa-chevron-down",
            !isOpen
        );

    });


    section.appendChild(header);

    section.appendChild(content);


    return section;

}


/* =========================================================
   RENDER SECTION ITEMS
========================================================= */

function renderSectionItems(
    grid,
    items,
    visibleCount
) {

    grid.innerHTML = "";

    items
        .slice(0, visibleCount)
        .forEach(item => {

            const card =
                createCard(item);

            if (card) {
                grid.appendChild(card);
            }

        });

}

/* =========================================================
   SAVED PAGE
   حذف فوری کارت پس از لغو ذخیره
========================================================= */

document.addEventListener(
    "click",
    event => {

        const params =
            new URLSearchParams(
                window.location.search
            );

        if (params.get("type") !== "saved") {
            return;
        }

        const saveButton =
            event.target.closest(
                ".save-action, " +
                ".playlist-card-save-button, " +
                ".book-card-save-button, " +
                ".image-card-save-button"
            );

        if (!saveButton) {
            return;
        }

        const card =
            saveButton.closest(
                ".content-card, " +
                ".playlist-card, " +
                ".book-card, " +
                ".image-card"
            );

        if (!card) {
            return;
        }

        let storageKey = "";
        let itemId = "";

        if (saveButton.matches(".save-action")) {

            storageKey = "mesbah_saved_contents";
            itemId = saveButton.dataset.contentId;

        } else if (
            saveButton.matches(".playlist-card-save-button")
        ) {

            storageKey = "mesbah_saved_playlists";
            itemId = saveButton.dataset.playlistId;

        } else if (
            saveButton.matches(".book-card-save-button")
        ) {

            storageKey = "mesbah_saved_books";
            itemId = saveButton.dataset.bookId;

        } else if (
            saveButton.matches(".image-card-save-button")
        ) {

            storageKey = "mesbah_saved_images";
            itemId = saveButton.dataset.imageId;

        }

        if (!storageKey || !itemId) {
            return;
        }

        /*
         * وضعیت ذخیره قبل از کلیک
         * اگر ذخیره بوده، کلیک باید آن را لغو کند.
         */

        let savedItems = [];

        try {

            savedItems = JSON.parse(
                localStorage.getItem(storageKey) || "[]"
            );

            if (!Array.isArray(savedItems)) {
                savedItems = [];
            }

        } catch {

            savedItems = [];

        }

        const wasSaved =
            savedItems.some(item => {

                const id =
                    typeof item === "object" && item !== null
                        ? (
                            item.id ??
                            item.imageId ??
                            item.bookId ??
                            item.playlistId ??
                            item.contentId
                        )
                        : item;

                return String(id) === String(itemId);

            });

        /*
         * فقط در صورت لغو ذخیره کارت حذف شود.
         * بررسی در فریم بعدی، پس از اجرای تابع ذخیره.
         */

        if (wasSaved) {

            requestAnimationFrame(() => {

                let currentItems = [];

                try {

                    currentItems = JSON.parse(
                        localStorage.getItem(storageKey) || "[]"
                    );

                    if (!Array.isArray(currentItems)) {
                        currentItems = [];
                    }

                } catch {

                    currentItems = [];

                }

                const stillSaved =
                    currentItems.some(item => {

                        const id =
                            typeof item === "object" && item !== null
                                ? (
                                    item.id ??
                                    item.imageId ??
                                    item.bookId ??
                                    item.playlistId ??
                                    item.contentId
                                )
                                : item;

                        return String(id) === String(itemId);

                    });

                if (!stillSaved) {
                    removeSavedCard(card);
                }

            });

        }

    },
    true
);


/* =========================================================
   REMOVE SAVED CARD
========================================================= */

function removeSavedCard(card) {

    if (!card) return;

    card.remove();

    const container =
        document.querySelector(".results-grid");

    if (!container) return;

    const remainingCards =
        container.querySelectorAll(
            ".content-card, " +
            ".playlist-card, " +
            ".book-card, " +
            ".image-card"
        );

    if (!remainingCards.length) {

        container.innerHTML = `
            <div class="results-empty">
                محتوایی برای نمایش پیدا نشد.
            </div>
        `;

    }

}
