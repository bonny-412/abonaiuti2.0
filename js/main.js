(function($) {
    "use strict";    
        // Hide Mobile menu
        function mobileMenuHide() {
            var windowWidth = $(window).width(),
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
        // /Hide Mobile menu
    
        // Custom scroll
        function customScroll() {
            var windowWidth = $(window).width();
            if (windowWidth > 1024) {
                $('.animated-section, .single-page-content').each(function() {
                    $(this).perfectScrollbar();
                });
            } else {
                $('.animated-section, .single-page-content').each(function() {
                    $(this).perfectScrollbar('destroy');
                });
            }
        }
        // /Custom scroll
    
        // Contact form validator
        $(function () {
    
            $('#contact_form').validator();
    
            $('#contact_form').on('submit', function (e) {
                if (!e.isDefaultPrevented()) {
                    var url = "contact_form/contact_form.php";
    
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: $(this).serialize(),
                        success: function (data)
                        {
                            var messageAlert = 'alert-' + data.type;
                            var messageText = data.message;
    
                            var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
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
        // /Contact form validator
    
        //On Window load & Resize
        $(window).on('load', function() { //Load
                // Animation on Page Loading
                $(".preloader").fadeOut( 800, "linear" );
    
                // initializing page transition.
                var ptPage = $('.animated-sections');
                if (ptPage[0]) {
                    PageTransitions.init({
                        menu: 'ul.main-menu',
                    });
                }
            })
            .on('resize', function() { //Resize
                 mobileMenuHide();
                 $('.animated-section').each(function() {
                    $(this).perfectScrollbar('update');
                });
                customScroll();
            });
    
    
        // On Document Load
        $(document).on('ready', function() {  
            // Mobile menu
            $('.menu-toggle').on("click", function () {
                $('#site_header').addClass('animate');
                $('#site_header').toggleClass('mobile-menu-hide');
                $('.menu-toggle').toggleClass('open');
            });
    
            // Mobile menu hide on main menu item click
            $('.main-menu').on("click", "a", function (e) {
                mobileMenuHide();
            });
                
            // Sidebar toggle
            $('.sidebar-toggle').on("click", function () {
                $('#blog-sidebar').toggleClass('open');
            });

            init_pointer({
                pointerColor: "#04b4e0",
                ringSize: 15,
                ringClickSize: 10
            });

            $('.portfolio-item-img a').miniPreview({prefetch: 'none'});
    
            customScroll();

            /*==================================================================
            [ Typed text ]*/
            var elements = document.getElementsByClassName('txt-rotate');
            for (var i=0; i<elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-rotate');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtRotate(elements[i], JSON.parse(toRotate), period);
                }
            }
            // INJECT CSS
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
            document.body.appendChild(css);
    
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