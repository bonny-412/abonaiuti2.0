(function($) {
    "use strict";

    // Start Hide Mobile menu
    function mobileMenuHide() {
        let windowWidth = $(window).width(),
            siteHeader = $('#site_header');
        if (windowWidth < 1025) {
            siteHeader.addClass('mobile-menu-hide');
            $('.menu-toggle').removeClass('open');
            setTimeout(function(){
                siteHeader.addClass('animate');
            }, 500);
        } else {
            siteHeader.removeClass('animate');
        }
    }
    // End Hide Mobile menu

    // Start function to DarkMode
    function activeDarkMode(isDarkMode) {
        if(isDarkMode) {
            $('#input-dark-mode').prop( "checked", true );
            document.body.classList.toggle('white');
            $('.fa-lightbulb').css("color", "#efef0b");
        }else {
            $('#input-dark-mode').prop( "checked", false );
            document.body.classList.toggle('white');
            $('.fa-lightbulb').css("color", "#b5b6b7");
        }
    }
    //End function to DarkMode

    function calcoloParametriDinamici() {
        const progettiPersonali = 7;
        const etaAnni = calcoloAnni('1997-12-27');
        const esperienzaLavorativaAnni = calcoloAnni('2018-03-18');

        $('#spanEta').text(etaAnni);
        $('#spanAnniEsperienza').text(esperienzaLavorativaAnni + '+');
        $('#spanProgettiPersonali').text(progettiPersonali + '+');
    }

    function calcoloAnni(dataDaCalcolare) {
        const currentDate = new Date();
        const data = new Date(dataDaCalcolare);
        const anniInMilliseconds = currentDate - data;
        //Converto i millisecondi in anni
        const anni = anniInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
        //Arrotondo per intero all'anno più vicino
        const roundAge = Math.floor(anni);

        console.log(roundAge);
        return roundAge;
    }

    // Start function to return submit
    const processForm = form => {
        const data = new FormData(form)
        data.append('form-name', 'contact_form');
        fetch('/', {
            method: 'POST',
            body: data,
        }).then(() => {
            modalOpen("Messaggio inviato!", "Grazie per avermi contattato, risponderò al più presto.", true);
        }).catch(error => {
            modalOpen("OoooPS!", "Mi dispiace, ma si è verificato un errore durante l'invio del messaggio. Riprovare più tardi.", false);
        });
    }
    //End function to return submit

    // Start function modal
    function modalOpen(title, message, esito) {
        $('.modal-wrapper').addClass('open');
        if(title != null && message != null) {
            $('.modal-title').text(title);
            $('.modal-msg').text(message);
        }
        $('.modal').addClass('in');
        if(esito) {
            $('.modal-image').append('<i class="far fa-check-circle fa-3x"></i>');
        }else {
            $('.modal-image').append('<i class="far fa-times-circle fa-3x"></i>');
        }
        $('#contact_form')[0].reset();
    };

    function modalClose() {
        $('.modal').removeClass('in');
        $('.modal-wrapper').removeClass('open');
        $('.modal-image').empty();
    };
// End function modal

    // Start Contact form validator
    $(function () {
        $('#contact_form').validator();
    });
    // End Contact form validator
    
    //On Window load & Resize
    $(window).on('load', function() { //Load
        // Animation on Page Loading
        $(".preloader").fadeOut( 800, "linear" );
        // initializing page transition.
        let ptPage = $('.animated-sections');
        if (ptPage[0]) {
            PageTransitions.init({
                menu: 'ul.main-menu',
            });
        }
    }).on('resize', function() { //Resize
        mobileMenuHide();
    });

    // On Document Load
    $(document).on('ready', function() {
        var isDarkMode = true;

        calcoloParametriDinamici();

        // Mobile menu
        $('.menu-toggle').on("click", function () {
            $('#site_header').addClass('animate');
            $('#site_header').toggleClass('mobile-menu-hide');
            $('.menu-toggle').toggleClass('open');
        });
        // Mobile menu hide on main menu item click
        $('.main-menu').on("click", "a", function (e) {
            if($(this).attr('id') != 'darkMode') {
                mobileMenuHide();
            }
        });
        // Sidebar toggle
        $('.sidebar-toggle').on("click", function () {
            $('#blog-sidebar').toggleClass('open');
        });

        $('#darkMode').on('click', function() {
            activeDarkMode(isDarkMode);
            if(isDarkMode) {
                isDarkMode = false;
            }else {
                isDarkMode = true;
            }
        });

        $('#input-dark-mode').on('click', function() {
            activeDarkMode(isDarkMode);
            if(isDarkMode) {
                isDarkMode = false;
            }else {
                isDarkMode = true;
            }
        });

        init_pointer({
            pointerColor: "#04b4e0",
            ringSize: 15,
            ringClickSize: 10
        });

        //Start Typed text
        let elements = document.getElementsByClassName('txt-rotate');
        for (let i=0; i<elements.length; i++) {
            let toRotate = elements[i].getAttribute('data-rotate');
            let period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        let css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
        //End Typed text

        //Form Controls
        $('.form-control').val('').on("focusin", function(){
            $(this).parent('.form-group').addClass('form-group-focus');
        }).on("focusout", function(){
            if($(this).val().length === 0) {
                $(this).parent('.form-group').removeClass('form-group-focus');
            }
        });

        const emailForm = document.querySelector('.contact-form')
        if (emailForm) {
            emailForm.addEventListener('submit', e => {
                if($('.btn-send').hasClass( "disabled" ) == false) {
                    e.preventDefault();
                    processForm(emailForm);
                }else {
                    return false;
                }
            });
        }
        $('.-close').click(modalClose);
        
    });
    
    })(jQuery);