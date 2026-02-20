// Preloader
$(document).ready(function () {
    setTimeout(function () {
        $(".wrapper").addClass("loaded");
    }, 2500);
});

// Rotating role text
var firstText = "CTO";
var secondText = "Applied AI Developer";
var thirdText = "Software Developer";
var intervalTime = 600;

function displayText() {
    var roleElement = document.querySelector(".designer");
    if (!roleElement) {
        return;
    }

    roleElement.innerText = firstText;
    setTimeout(function () {
        roleElement.innerText = secondText;
    }, intervalTime * 3);
    setTimeout(function () {
        roleElement.innerText = thirdText;
    }, intervalTime * 5);
}

displayText();
setInterval(displayText, intervalTime * 7);

// Card tabs
var tabsContainer = document.getElementById("icetab-container");
var tabsContainer2 = document.getElementById("icetab-container2");
var contentContainer = document.getElementById("icetab-content");

var tabs = tabsContainer ? tabsContainer.children : [];
var tabs2 = tabsContainer2 ? tabsContainer2.children : [];
var tabcontents = contentContainer ? contentContainer.children : [];

function clearCurrentTab(list) {
    for (var i = 0; i < list.length; i++) {
        list[i].className = "icetab";
    }
}

function clearActiveContent() {
    for (var i = 0; i < tabcontents.length; i++) {
        tabcontents[i].className = "tabcontent";
    }
}

function activateByIndex(index) {
    clearCurrentTab(tabs);
    clearCurrentTab(tabs2);
    clearActiveContent();

    if (tabs[index]) {
        tabs[index].classList.add("current-tab");
    }

    if (tabs2[index]) {
        tabs2[index].classList.add("current-tab");
    }

    if (tabcontents[index]) {
        tabcontents[index].classList.add("tab-active");
    }
}

for (var index = 0; index < tabs.length; index++) {
    (function (tabIndex) {
        tabs[tabIndex].addEventListener("click", function () {
            activateByIndex(tabIndex);
        }, false);
    })(index);
}

for (var index2 = 0; index2 < tabs2.length; index2++) {
    (function (tabIndex) {
        tabs2[tabIndex].addEventListener("click", function () {
            activateByIndex(tabIndex);
        }, false);
    })(index2);
}
// Card tabs end

// Circle button to portfolio section
var circularImageClick = document.getElementsByClassName("circular_text_main");
if (circularImageClick.length > 0) {
    circularImageClick[0].addEventListener("click", function () {
        activateByIndex(1);
    });
}

// Dark/Light Mode Toggle
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    var sunIcon = document.getElementById("sunIcon");
    var moonIcon = document.getElementById("moonIcon");

    if (element.classList.contains("dark-mode")) {
        sunIcon.classList.add("hidden");
        moonIcon.classList.remove("hidden");
        localStorage.setItem("mode", "dark");
    } else {
        moonIcon.classList.add("hidden");
        sunIcon.classList.remove("hidden");
        localStorage.setItem("mode", "light");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var storedMode = localStorage.getItem("mode");
    if (storedMode === "dark") {
        document.body.classList.add("dark-mode");
        var sunIcon = document.getElementById("sunIcon");
        var moonIcon = document.getElementById("moonIcon");
        sunIcon.classList.add("hidden");
        moonIcon.classList.remove("hidden");
    }
});
// Dark/Light Mode Toggle end

// Contact actions
function openMailto(subject, body) {
    var email = "yanis@el-yassiri.com";
    var query = [];

    if (subject) {
        query.push("subject=" + encodeURIComponent(subject));
    }

    if (body) {
        query.push("body=" + encodeURIComponent(body));
    }

    var mailtoUrl = "mailto:" + email;
    if (query.length > 0) {
        mailtoUrl += "?" + query.join("&");
    }

    window.location.href = mailtoUrl;
}

var hireMeBtn = document.querySelector(".hire_me");
if (hireMeBtn) {
    hireMeBtn.addEventListener("click", function (event) {
        event.preventDefault();
        openMailto(
            "Hiring Inquiry - Yanis El Yassiri",
            "Hello Yanis,\n\nI would like to discuss a potential opportunity with you."
        );
    });
}

var contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var statusMessage = document.getElementById("form-status");
        var submitBtn = contactForm.querySelector(".form__btn");
        var buttonText = submitBtn ? submitBtn.innerHTML : "";

        if (statusMessage) {
            statusMessage.textContent = "Sending message...";
            statusMessage.classList.remove("is-success");
            statusMessage.classList.remove("is-error");
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = "<i class=\"fa-regular fa-paper-plane material-icons\"></i>Sending...";
        }

        fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
                "Accept": "application/json"
            }
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Failed to send");
                }

                contactForm.reset();

                var activeStates = contactForm.querySelectorAll(".form.active");
                for (var i = 0; i < activeStates.length; i++) {
                    activeStates[i].classList.remove("active");
                }

                if (statusMessage) {
                    statusMessage.textContent = "Message sent successfully.";
                    statusMessage.classList.add("is-success");
                }
            })
            .catch(function () {
                if (statusMessage) {
                    statusMessage.textContent = "Unable to send the message. Please try again.";
                    statusMessage.classList.add("is-error");
                }
            })
            .then(function () {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = buttonText;
                }
            });
    });
}

// Form focus behavior
$("input").focus(function () {
    $(this).parent().addClass("active");
    $("input").focusout(function () {
        if ($(this).val() === "") {
            $(this).parent().removeClass("active");
        } else {
            $(this).parent().addClass("active");
        }
    });
});
// Form focus behavior end

// Side nav
function openNav() {
    var side = document.getElementById("mySidenav");
    if (side.style.width === "300px") {
        side.style.width = "0px";
    } else {
        side.style.width = "300px";
    }
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
// Side nav end

// Custom cursor
var cursor = document.querySelector(".cursor");
var cursorScale = document.querySelectorAll("a,button,.content_portfolio,.toggle");
var mouseX = 0;
var mouseY = 0;

if (cursor && typeof gsap !== "undefined") {
    gsap.to({}, 0.016, {
        repeat: -1,
        onRepeat: function () {
            gsap.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY
                }
            });
        }
    });

    window.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    cursorScale.forEach(function (link) {
        link.addEventListener("mousemove", function () {
            cursor.classList.add("grow");
            if (link.classList.contains("small")) {
                cursor.classList.remove("grow");
                cursor.classList.add("grow-small");
            }
        });

        link.addEventListener("mouseleave", function () {
            cursor.classList.remove("grow");
            cursor.classList.remove("grow-small");
        });
    });
}
// Custom cursor end

// Whole page scrolling animation
if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    });

    var hiddenElements = document.querySelectorAll(".fade_up");
    hiddenElements.forEach(function (el) {
        observer.observe(el);
    });
}
// Whole page scrolling animation end

// Portfolio project popups
$(document).ready(function () {
    function initProjectCarousel($modal) {
        if (!$.fn.slick) {
            return;
        }

        var $carousel = $modal.find(".project-modal-carousel");
        if (!$carousel.length) {
            return;
        }

        if ($carousel.hasClass("slick-initialized")) {
            $carousel.slick("setPosition");
            return;
        }

        $carousel.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            infinite: true,
            adaptiveHeight: true,
            prevArrow: "<button type=\"button\" class=\"slick-prev project-carousel-arrow\" aria-label=\"Previous image\"><i class=\"ri-arrow-left-s-line\"></i></button>",
            nextArrow: "<button type=\"button\" class=\"slick-next project-carousel-arrow\" aria-label=\"Next image\"><i class=\"ri-arrow-right-s-line\"></i></button>"
        });
    }

    function closeProjectModal($modal) {
        if (!$modal || !$modal.length) {
            return;
        }

        $modal.removeClass("is-on").attr("aria-hidden", "true");
        $("body").removeClass("modal-open");
    }

    $(".view-project-btn").on("click", function (event) {
        event.preventDefault();
        var targetId = $(this).attr("data-target");
        var $targetModal = $("#" + targetId);

        if (!$targetModal.length) {
            return;
        }

        $(".project-overlay.is-on").each(function () {
            closeProjectModal($(this));
        });
        $targetModal.addClass("is-on").attr("aria-hidden", "false");
        $("body").addClass("modal-open");
        initProjectCarousel($targetModal);

        setTimeout(function () {
            var $initialized = $targetModal.find(".project-modal-carousel.slick-initialized");
            if ($initialized.length) {
                $initialized.slick("setPosition");
            }
        }, 10);
    });

    $(".project-modal-close").on("click", function () {
        closeProjectModal($(this).closest(".project-overlay"));
    });

    $(".project-overlay").on("click", function (event) {
        if ($(event.target).is(".project-overlay")) {
            closeProjectModal($(this));
        }
    });

    $(document).on("keydown", function (event) {
        if (event.key === "Escape") {
            closeProjectModal($(".project-overlay.is-on").last());
        }
    });
});
// Portfolio project popups end
