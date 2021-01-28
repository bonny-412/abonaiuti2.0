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

    // Start Contact form validator
    $(function () {
        $('#contact_form').validator();
        $('#contact_form').on('submit', function (e) {
            if (!e.isDefaultPrevented()) {
                let url = "contact_form/contact_form.php";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: $(this).serialize(),
                    success: function (data) {
                        let messageAlert = 'alert-' + data.type;
                        let messageText = data.message;
                        let alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                        if (messageAlert && messageText) {
                            $('#contact_form').find('.messages').html(alertBox);
                            $('#contact_form')[0].reset();
                        }
                    }
                });
                return false;
            }
        });
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

            $('.portfolio-item-img a').miniPreview({prefetch: 'none'});
    
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
            $('.form-control')
                .val('')
                .on("focusin", function(){
                    $(this).parent('.form-group').addClass('form-group-focus');
                })
                .on("focusout", function(){
                    if($(this).val().length === 0) {
                        $(this).parent('.form-group').removeClass('form-group-focus');
                    }
                });
        });
    
    })(jQuery);