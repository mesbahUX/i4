/* =========================================================
   CONTENT PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadContent();
});

/* =========================================================
   LOAD CONTENT
========================================================= */

async function loadContent() {

    try {

        const params = new URLSearchParams(
            window.location.search
        );

        const contentId = params.get("id");

        if (!contentId) {
            throw new Error("شناسه محتوا پیدا نشد.");
        }


        const response = await fetch(
            "data/contents2.xml"
        );

        if (!response.ok) {
            throw new Error(
                "XML پیدا نشد. Status: " +
                response.status
            );
        }


        const xmlText = await response.text();

        const xml = new DOMParser().parseFromString(
            xmlText,
            "application/xml"
        );


        if (xml.querySelector("parsererror")) {
            throw new Error(
                "ساختار XML مشکل دارد."
            );
        }


        const content = Array.from(
            xml.querySelectorAll("content")
        ).find(
            item => item.getAttribute("id") === contentId
        );


        if (!content) {
            throw new Error(
                "محتوای موردنظر پیدا نشد."
            );
        }


        renderContent(content);
        updateContentGroupLinks(content);

    }

    catch (error) {

        console.error(
            "CONTENT ERROR:",
            error
        );

        document.body.innerHTML += `
            <div style="
                direction:rtl;
                padding:40px;
                font-family:sans-serif;
                color:red;
            ">
                خطا در بارگذاری محتوا:
                <br><br>
                ${error.message}
            </div>
        `;
    }
}


/* =========================================================
   RENDER CONTENT
========================================================= */

function renderContent(content) {

    renderContentInfo(content);

    const type = getText(content, "type");

    updateContentGroups(type);

    if (type === "video") {
        renderVideo(content);
        return;
    }

    if (type === "audio") {
        renderAudio(content);
        return;
    }

    if (type === "article") {
        console.log(
            "Article layout is not implemented yet."
        );
    }
}


/* =========================================================
   VIDEO
========================================================= */

// function renderVideo(content) {

//     const layout = document.getElementById(
//         "video-layout"
//     );

//     layout.style.display = "block";


//     /* VIDEO */

//     const video = getText(
//         content,
//         "video"
//     );

//     const videoElement = document.getElementById(
//         "content-video"
//     );

//     const videoSource = document.getElementById(
//         "video-source"
//     );

//     if (video) {

//         if (videoSource.src !== video) {
//             videoSource.src = video;
//             videoElement.load();
//         }

//     }

//     initVideoPlayer("content-video");

//     /* TITLE */

//     document.getElementById(
//         "video-title"
//     ).textContent = getText(
//         content,
//         "title"
//     );


//     /* TAGS */

//     renderTags(
//         content,
//         "video-topic"
//     );


//     /* SPEAKER */

//     renderSpeaker(content);


//     /* TRANSCRIPT */

//     renderTranscript(
//         content,
//         "video-transcript-section",
//         "video-transcript",
//         // "video-transcript-more"
//     );


//     /* AUDIO */

//     renderVideoAudio(content);
// }
function renderVideo(content) {

    const layout =
        document.getElementById("video-layout");

    layout.style.display = "block";


    /* =====================================================
       VIDEO
    ===================================================== */

    const videoUrl =
        getText(content, "video");

    const videoElement =
        document.getElementById("content-video");

    if (!videoElement || !videoUrl) {
        return;
    }


    /*
     * مستقیماً src را روی خود video قرار می‌دهیم.
     * اینجا دیگر از <source> استفاده نمی‌کنیم.
     */

    // if (videoElement.src !== new URL(
    //     videoUrl,
    //     window.location.href
    // ).href) {

    //     videoElement.src = videoUrl;

    // }
videoElement.src = videoUrl;

    initVideoPlayer("content-video");


    /* =====================================================
       TITLE
    ===================================================== */

    document.getElementById(
        "video-title"
    ).textContent =
        getText(content, "title");


    /* =====================================================
       TAGS
    ===================================================== */

    renderTags(
        content,
        "video-topic"
    );


    /* =====================================================
       SPEAKER
    ===================================================== */

    renderSpeaker(content);


    /* =====================================================
       TRANSCRIPT
    ===================================================== */

    renderTranscript(
        content,
        "video-transcript-section",
        "video-transcript"
    );


    /* =====================================================
       AUDIO
    ===================================================== */

    renderVideoAudio(content);
}
    /* =========================================================
    VIDEO PLAYER
    ========================================================= */

    function initVideoPlayer(videoId) {

    const video =
        document.getElementById(videoId);

    const player =
        document.querySelector(".custom-video-player");

    const playButton =
        document.getElementById("video-play");

    const controlPlayButton =
        document.getElementById("video-control-play");

    const backwardButton =
        document.getElementById("video-skip-backward");

    const forwardButton =
        document.getElementById("video-skip-forward");

    const progress =
        document.getElementById("video-progress");

    const currentTime =
        document.getElementById("video-current-time");

    const duration =
        document.getElementById("video-duration");

    const muteButton =
        document.getElementById("video-mute");

    const volume =
        document.getElementById("video-volume");

    const fullscreenButton =
        document.getElementById("video-fullscreen");

    const speedButton =
        document.getElementById("video-speed");

    const speedMenu =
        document.getElementById("video-speed-menu");

    const pipButton =
        document.getElementById("video-pip");
    if (
        !video ||
        !player ||
        !playButton ||
        !controlPlayButton ||
        !backwardButton ||
        !forwardButton ||
        !progress ||
        !currentTime ||
        !duration
    ) {
        return;
    }


    /* =====================================================
       جلوگیری از چند بار initialization
    ===================================================== */

    if (
        video.dataset.playerInitialized === "true"
    ) {
        return;
    }

    video.dataset.playerInitialized = "true";


    /* =====================================================
       PLAY / PAUSE
    ===================================================== */

    function togglePlay(event) {

        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }


        if (video.paused) {

            video.play();

        } else {

            video.pause();

        }

    }


    playButton.addEventListener(
        "click",
        togglePlay
    );


    controlPlayButton.addEventListener(
        "click",
        togglePlay
    );


    /* =====================================================
       PLAY STATE
    ===================================================== */

    function updatePlayState() {

        if (video.paused) {

            playButton.innerHTML =
                '<i class="fa-solid fa-play"></i>';

            controlPlayButton.innerHTML =
                '<i class="fa-solid fa-play"></i>';

            player.classList.add(
                "video-paused"
            );

        } else {

            playButton.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

            controlPlayButton.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

            player.classList.remove(
                "video-paused"
            );

        }

    }


    video.addEventListener(
        "play",
        updatePlayState
    );

    video.addEventListener(
        "pause",
        updatePlayState
    );


    /* =====================================================
       10 SECONDS BACK
    ===================================================== */

    backwardButton.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            video.currentTime =
                Math.max(
                    0,
                    video.currentTime - 10
                );

        }
    );


    /* =====================================================
       10 SECONDS FORWARD
    ===================================================== */

    forwardButton.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            if (!isNaN(video.duration)) {

                video.currentTime =
                    Math.min(
                        video.duration,
                        video.currentTime + 10
                    );

            }

        }
    );


    /* =====================================================
       DURATION
    ===================================================== */

    video.addEventListener(
        "loadedmetadata",
        () => {

            duration.textContent =
                formatTime(video.duration);

            updateProgress();

        }
    );


    /* =====================================================
       PROGRESS
    ===================================================== */

    function updateProgress() {

        if (
            !video.duration ||
            isNaN(video.duration)
        ) {
            return;
        }


        progress.value =
            (
                video.currentTime /
                video.duration
            ) * 100;


        currentTime.textContent =
            formatTime(
                video.currentTime
            );

    }


    video.addEventListener(
        "timeupdate",
        updateProgress
    );


    /* =====================================================
       SEEK
    ===================================================== */

    progress.addEventListener(
        "input",
        () => {

            if (
                !video.duration ||
                isNaN(video.duration)
            ) {
                return;
            }


            const value =
                Number(progress.value);


            video.currentTime =
                (
                    value / 100
                ) * video.duration;

        }
    );


    /* =====================================================
       MUTE
    ===================================================== */

    if (muteButton) {

        muteButton.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();


                video.muted =
                    !video.muted;


                updateMuteIcon();

            }
        );

    }


    function updateMuteIcon() {

        if (!muteButton) {
            return;
        }


        let icon;


        if (
            video.muted ||
            video.volume === 0
        ) {

            icon =
                "fa-volume-xmark";

        } else if (
            video.volume < 0.5
        ) {

            icon =
                "fa-volume-low";

        } else {

            icon =
                "fa-volume-high";

        }


        muteButton.innerHTML =
            `<i class="fa-solid ${icon}"></i>`;

    }


    /* =====================================================
       VOLUME
    ===================================================== */

    if (volume) {

        volume.addEventListener(
            "input",
            () => {

                video.volume =
                    Number(volume.value);

                video.muted =
                    video.volume === 0;

                updateMuteIcon();

            }
        );

    }

    /* =====================================================
    KEYBOARD CONTROLS
    ===================================================== */

    /*
    * خود پلیر را قابل Focus می‌کنیم
    * تا Space و Arrowها روی خود پلیر دریافت شوند.
    */
    player.tabIndex = 0;


    /* =====================================================
    FOCUS PLAYER
    ===================================================== */

    player.addEventListener(
        "click",
        () => {

            player.focus();

        }
    );


    /* =====================================================
    KEYBOARD
    ===================================================== */

    player.addEventListener(
        "keydown",
        event => {


            /* =================================================
            اگر input / textarea فعال است
            ================================================= */

            const activeElement =
                document.activeElement;

            if (
                activeElement &&
                (
                    activeElement.tagName === "INPUT" ||
                    activeElement.tagName === "TEXTAREA" ||
                    activeElement.isContentEditable
                )
            ) {
                return;
            }


            /* =================================================
            SPACE = PLAY / PAUSE
            ================================================= */

            if (event.code === "Space") {

                event.preventDefault();
                event.stopPropagation();

                togglePlay();

                return;
            }


            /* =================================================
            LEFT = 10 SECONDS BACK
            ================================================= */

            if (event.code === "ArrowLeft") {

                event.preventDefault();
                event.stopPropagation();

                video.currentTime =
                    Math.max(
                        0,
                        video.currentTime - 10
                    );

                return;
            }


            /* =================================================
            RIGHT = 10 SECONDS FORWARD
            ================================================= */

            if (event.code === "ArrowRight") {

                event.preventDefault();
                event.stopPropagation();

                if (!isNaN(video.duration)) {

                    video.currentTime =
                        Math.min(
                            video.duration,
                            video.currentTime + 10
                        );

                }

                return;
            }


            /* =================================================
            UP = VOLUME +10%
            ================================================= */

            if (event.code === "ArrowUp") {

                event.preventDefault();
                event.stopPropagation();

                video.muted = false;

                video.volume =
                    Math.min(
                        1,
                        video.volume + 0.1
                    );


                if (volume) {

                    volume.value =
                        video.volume;

                }


                updateMuteIcon();

                return;
            }


            /* =================================================
            DOWN = VOLUME -10%
            ================================================= */

            if (event.code === "ArrowDown") {

                event.preventDefault();
                event.stopPropagation();

                video.volume =
                    Math.max(
                        0,
                        video.volume - 0.1
                    );


                video.muted =
                    video.volume === 0;


                if (volume) {

                    volume.value =
                        video.volume;

                }


                updateMuteIcon();

                return;
            }

        }
    );
    
    /* =====================================================
    PLAYBACK SPEED
    ===================================================== */

    if (speedButton && speedMenu) {

        speedButton.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                speedMenu.classList.toggle(
                    "show"
                );

            }
        );


        speedMenu
            .querySelectorAll("[data-speed]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();
                        event.stopPropagation();


                        const speed =
                            Number(
                                button.dataset.speed
                            );


                        video.playbackRate =
                            speed;


                        speedButton.textContent =
                            speed + "x";


                        speedMenu.classList.remove(
                            "show"
                        );

                    }
                );

            });


        /* کلیک بیرون از منوی سرعت */

        document.addEventListener(
            "click",
            event => {

                if (
                    !speedMenu.contains(event.target) &&
                    !speedButton.contains(event.target)
                ) {

                    speedMenu.classList.remove(
                        "show"
                    );

                }

            }
        );

    }

    /* =====================================================
       FULLSCREEN
    ===================================================== */

    if (fullscreenButton) {

        fullscreenButton.addEventListener(
            "click",
            async event => {

                event.preventDefault();
                event.stopPropagation();


                if (
                    !document.fullscreenElement
                ) {

                    await player.requestFullscreen();

                } else {

                    await document.exitFullscreen();

                }

            }
        );

    }

/* =====================================================
   PICTURE IN PICTURE
===================================================== */

if (pipButton) {

    pipButton.addEventListener(
        "click",
        async event => {

            event.preventDefault();
            event.stopPropagation();

            try {

                if (
                    document.pictureInPictureElement
                ) {

                    await document.exitPictureInPicture();

                } else {

                    await video.requestPictureInPicture();

                }

            } catch (error) {

                console.error(
                    "PiP Error:",
                    error
                );

            }

        }
    );

}
    /* =====================================================
       FULLSCREEN ICON
    ===================================================== */

    document.addEventListener(
        "fullscreenchange",
        () => {

            if (!fullscreenButton) {
                return;
            }


            fullscreenButton.innerHTML =
                document.fullscreenElement

                    ? '<i class="fa-solid fa-compress"></i>'

                    : '<i class="fa-solid fa-expand"></i>';

        }
    );


    /* =====================================================
       CLICK ON VIDEO
    ===================================================== */

    video.addEventListener(
        "click",
        togglePlay
    );


    /* =====================================================
       END
    ===================================================== */

    video.addEventListener(
        "ended",
        () => {

            progress.value = 0;

            currentTime.textContent =
                "00:00";

            updatePlayState();

        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updatePlayState();
    updateMuteIcon();

}

/* =========================================================
   VIDEO AUDIO
========================================================= */

function renderVideoAudio(content) {

    const section = document.getElementById(
        "video-audio-section"
    );

    const audio = getText(
        content,
        "audio"
    );

    if (!audio) {
        section.style.display = "none";
        return;
    }


    section.style.display = "block";


    /* COVER */

    // const cover = getText(
    //     content,
    //     "cover"
    // );

    // const coverElement = document.getElementById(
    //     "video-audio-cover"
    // );

    // if (cover) {
    //     coverElement.src = cover;
    // }


    /* AUDIO */

    const source = document.getElementById(
        "video-audio-source"
    );

    const audioElement = document.getElementById(
        "video-audio"
    );

    document.getElementById(
        "video-audio-title"
    ).textContent = "صوت " +getText(
        content,
        "title"
    );

    source.src = audio;
    audioElement.load();


    /* PLAYER */

    initAudioPlayer(
        "video-audio",
        "video-audio-play",
        "video-audio-progress",
        "video-audio-current",
        "video-audio-duration"
    );
}


/* =========================================================
   AUDIO ONLY
========================================================= */

function renderAudio(content) {

    const layout = document.getElementById(
        "audio-layout"
    );

    layout.style.display = "block";


    /* COVER */

    const cover = getText(
        content,
        "cover"
    );

    if (cover) {

        document.getElementById(
            "audio-cover"
        ).src = cover;

    }

    /* TITLE */

    document.getElementById(
        "audio-title"
    ).textContent = getText(
        content,
        "title"
    );

renderSpeaker(
    content,
    "audio-speaker",
    "audio-speaker-name",
    "audio-speaker-initial"
);
/* TAGS */

renderTags(
    content,
    "audio-tags"
);
    /* SPEAKER + TAGS */

    // renderAudioTags(content);


    /* AUDIO */

    const audio = getText(
        content,
        "audio"
    );

    const source = document.getElementById(
        "audio-source"
    );

    const audioElement = document.getElementById(
        "content-audio"
    );


    source.src = audio;
    audioElement.load();


    initAudioPlayer(
        "content-audio",
        "audio-play",
        "audio-progress-bar",
        "audio-current",
        "audio-duration"
    );


    /* TRANSCRIPT */

    renderTranscript(
        content,
        "audio-transcript-section",
        "audio-transcript",
        // "audio-transcript-more"
    );
}


/* =========================================================
   AUDIO PLAYER
========================================================= */

function initAudioPlayer(
    audioId,
    playId,
    progressId,
    currentId,
    durationId
) {

    const audio = document.getElementById(audioId);
    const playButton = document.getElementById(playId);
    const progress = document.getElementById(progressId);
    const currentTime = document.getElementById(currentId);
    const duration = document.getElementById(durationId);

    const speedButton = document.getElementById(
        audioId === "content-audio"
            ? "audio-speed"
            : "video-audio-speed"
    );

    const speedMenu = document.getElementById(
        audioId === "content-audio"
            ? "audio-speed-menu"
            : "video-audio-speed-menu"
    );

    const prevButton = document.getElementById(
        audioId === "content-audio"
            ? "audio-prev"
            : "video-audio-prev"
    );

    const nextButton = document.getElementById(
        audioId === "content-audio"
            ? "audio-next"
            : "video-audio-next"
    );

    if (
        !audio ||
        !playButton ||
        !progress ||
        !currentTime ||
        !duration
    ) {
        return;
    }


    /* جلوگیری از چند بار Event */

    if (audio.dataset.initialized === "true") {
        return;
    }

    audio.dataset.initialized = "true";


    /* PLAY / PAUSE */

    playButton.onclick = () => {

        if (audio.paused) {

            audio.play();

            playButton.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

        } else {

            audio.pause();

            playButton.innerHTML =
                '<i class="fa-solid fa-play"></i>';
        }
    };

    /* 10 SECONDS BACK / FORWARD */

    if (prevButton) {
        prevButton.onclick = () => {
            audio.currentTime = Math.max(
                0,
                audio.currentTime - 10
            );
        };
    }

    if (nextButton) {
        nextButton.onclick = () => {
            audio.currentTime = Math.min(
                audio.duration,
                audio.currentTime + 10
            );
        };
    }


    /* DURATION */

    audio.addEventListener(
        "loadedmetadata",
        () => {

            duration.textContent =
                formatTime(audio.duration);

        }
    );


    /* PROGRESS */

    audio.addEventListener(
        "timeupdate",
        () => {

            if (!audio.duration) {
                return;
            }

            progress.value =
                (
                    audio.currentTime /
                    audio.duration
                ) * 100;

            currentTime.textContent =
                formatTime(
                    audio.currentTime
                );
        }
    );


    /* SEEK */

    progress.addEventListener("input", () => {

        if (
            !audio.duration ||
            isNaN(audio.duration)
        ) {
            return;
        }

        const value = Number(progress.value);

        audio.currentTime =
            (value / 100) * audio.duration;
    });

    /* =====================================================
    PLAYBACK SPEED
    ===================================================== */

    if (speedButton && speedMenu) {

        speedButton.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                speedMenu.classList.toggle("show");

            }
        );


        speedMenu
            .querySelectorAll("[data-speed]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();
                        event.stopPropagation();

                        const speed =
                            Number(button.dataset.speed);

                        audio.playbackRate =
                            speed;

                        speedButton.textContent =
                            speed + "x";

                        speedMenu.classList.remove(
                            "show"
                        );

                    }
                );

            });


        /* بستن منو با کلیک بیرون */

        document.addEventListener(
            "click",
            event => {

                if (
                    !speedMenu.contains(event.target) &&
                    !speedButton.contains(event.target)
                ) {

                    speedMenu.classList.remove(
                        "show"
                    );

                }

            }
        );

    }

    /* END */

    audio.addEventListener(
        "ended",
        () => {

            playButton.innerHTML =
                '<i class="fa-solid fa-play"></i>';

            progress.value = 0;

            currentTime.textContent =
                "00:00";
        }
    );
}


/* =========================================================
   TAGS
========================================================= */

function renderTags(
    content,
    containerId
) {

    const container = document.getElementById(
        containerId
    );

    if (!container) {
        return;
    }


    container.innerHTML = "";


    content.querySelectorAll(
        "tags > tag"
    ).forEach(tagElement => {

        const tagName =
            tagElement.textContent.trim();

        if (!tagName) {
            return;
        }


        const tag =
            document.createElement("a");

        tag.className = "content-tag";

        tag.href =
            "results.html?topic=" +
            encodeURIComponent(tagName);

        tag.textContent = tagName;

        container.appendChild(tag);
    });
}


/* =========================================================
   AUDIO TAGS
========================================================= */

// function renderAudioTags(content) {

//     const container = document.getElementById(
//         "audio-tags"
//     );

//     if (!container) {
//         return;
//     }


//     container.innerHTML = "";


//     /* SPEAKER */

//     const speaker = getText(
//         content,
//         "speaker"
//     );

//     if (speaker) {

//         const speakerTag =
//             document.createElement("a");

//         speakerTag.className =
//             "content-tag";

//         // speakerTag.href =
//         //     "speakers.html?speaker=" +
//         //     encodeURIComponent(speaker);

//         speakerTag.textContent = speaker;

//         container.appendChild(
//             speakerTag
//         );
//     }


//     /* TAGS */

//     renderTags(
//         content,
//         "audio-tags"
//     );
// }


/* =========================================================
   SPEAKER
========================================================= */

function renderSpeaker(
    content,
    speakerId = "video-speaker",
    nameId = "video-speaker-name",
    initialId = "speaker-initial"
) {

    const speaker = getText(
        content,
        "speaker"
    );

    const speakerElement =
        document.getElementById(
            speakerId
        );


    if (!speakerElement) {
        return;
    }


    if (!speaker) {

        speakerElement.style.display = "none";

        return;
    }


    speakerElement.style.display = "";


    /* NAME */

    document.getElementById(
        nameId
    ).textContent = speaker;


    /* INITIAL */

    document.getElementById(
        initialId
    ).textContent =
        speaker.charAt(0);
}


/* =========================================================
   TRANSCRIPT
========================================================= */

// function renderTranscript(
//     content,
//     sectionId,
//     textId,
//     buttonId
// ) {

//     const section = document.getElementById(
//         sectionId
//     );

//     if (!section) {
//         return;
//     }


//     const transcript = getText(
//         content,
//         "transcript"
//     );


//     if (!transcript) {

//         section.style.display = "none";

//         return;
//     }


//     section.style.display = "";


//     const text = document.getElementById(
//         textId
//     );

//     const button = document.getElementById(
//         buttonId
//     );


//     text.textContent = transcript;

//     text.classList.add("collapsed");
//     text.classList.remove("expanded");


//     button.innerHTML =
//         `بیشتر
//          <i class="fa-solid fa-chevron-down"></i>`;


//     button.onclick = () => {

//         const expanded =
//             text.classList.toggle(
//                 "expanded"
//             );

//         text.classList.toggle(
//             "collapsed",
//             !expanded
//         );


//         button.innerHTML = expanded

//             ? `بستن
//                <i class="fa-solid fa-chevron-up"></i>`

//             : `بیشتر
//                <i class="fa-solid fa-chevron-down"></i>`;
//     };
// }

function renderTranscript(
    content,
    sectionId,
    textId
) {

    const section =
        document.getElementById(sectionId);

    if (!section) {
        return;
    }


    const transcript =
        getText(
            content,
            "transcript"
        );


    if (!transcript) {

        section.style.display = "none";

        return;
    }


    section.style.display = "";


    const text =
        document.getElementById(textId);

    if (!text) {
        return;
    }


    text.textContent = transcript;
}

/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {
        return "00:00";
    }


    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);


    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );
}


/* =========================================================
   XML HELPER
========================================================= */

function getText(
    parent,
    selector
) {

    const element =
        parent.querySelector(selector);

    return element
        ? element.textContent.trim()
        : "";
}

/* =========================================================
   CONTENT INFO
========================================================= */

function renderContentInfo(content) {

    document
        .querySelectorAll("[data-content-info]")
        .forEach(element => {

            const infoType =
                element.dataset.contentInfo;

            const value =
                getText(content, infoType);

            if (!value) {
                return;
            }

            element.appendChild(
                document.createTextNode(
                    " " + value
                )
            );
        });
}

/* =========================================================
   CONTENT GROUP
========================================================= */

function updateContentGroups(type) {

    const contentGroups =
        document.querySelectorAll(".content-group");

    if (!contentGroups.length) {
        return;
    }


    contentGroups.forEach(group => {

        const rows =
            group.querySelectorAll(
                ":scope > .content-row"
            );

        if (!rows.length) {
            return;
        }


        /* =================================================
           VIDEO
        ================================================= */

        if (type === "video") {

            /*
             * دسکتاپ:
             * ردیف اول مخفی شود چون همان محتوا
             * در سایدبار نمایش داده می‌شود.
             *
             * موبایل:
             * سایدبار وجود ندارد، پس ردیف اول نمایش داده شود.
             */

            if (window.innerWidth > 700) {

                rows[0].style.display = "none";

            } else {

                rows[0].style.display = "";

            }

            return;
        }


        /* =================================================
           AUDIO / OTHER
        ================================================= */

        rows[0].style.display = "";

    });
}

/* =========================================================
   UPDATE CONTENT GROUP LINKS
========================================================= */

function updateContentGroupLinks(content) {

    const contentGroups =
        document.querySelectorAll(".content-group");

    if (!contentGroups.length) {
        return;
    }


    contentGroups.forEach(group => {

        const rows =
            group.querySelectorAll(
                ":scope > .content-row"
            );


        rows.forEach(row => {

            const slider =
                row.querySelector(
                    ".content-slider"
                );

            const viewAll =
                row.querySelector(
                    ".view-all"
                );


            if (!slider || !viewAll) {
                return;
            }


            /* =================================================
               FORMAT
            ================================================= */

            const format =
                slider.dataset.type;


            if (!format) {
                return;
            }


            /* =================================================
               FILTER
            ================================================= */

            const filter =
                slider.dataset.filter;


            if (!filter) {
                return;
            }


            /* =================================================
               VALUE FROM CURRENT CONTENT
            ================================================= */

            const value =
                getText(
                    content,
                    filter
                );


            if (!value) {
                return;
            }


            /* =================================================
               BUILD URL
            ================================================= */

            const params =
                new URLSearchParams();

            params.set(
                "format",
                format
            );

            params.set(
                filter,
                value
            );


            viewAll.href =
                `results.html?${params.toString()}`;

        });

    });

}