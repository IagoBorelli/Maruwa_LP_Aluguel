gsap.registerPlugin(ScrollTrigger);

        const heroMedia = gsap.utils.toArray('.hero-media');

        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "+=100%",
                scrub: 1,
                pin: true,
            }
        });

        heroTl.to(heroMedia, { filter: "brightness(0.7) saturate(1.2)", duration: 1 }, 0);
        heroTl.to("#hero-content, .scroll-indicator", { opacity: 0, y: -50, duration: 1 }, 0);

        heroMedia.forEach((media) => {
            gsap.to(media, {
                scale: 1.15,
                ease: "none",
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "+=100%",
                    scrub: true
                }
            });
        });

        gsap.fromTo(".hero-anim",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, stagger: 0.3, ease: "power4.out", delay: 0.2 }
        );

        const typingTextElement = document.getElementById('typing-text');
        const textToType = "Villas, apartamentos e bangalôs cuidadosamente selecionados nos lugares mais desejados de Guarajuba, Praia do Forte e Itacimirim – Litoral Norte da Bahia.";
        let charIndex = 0;
        let typingSpeed = 50;

        function typeEffect() {
            if (charIndex < textToType.length) {
                typingTextElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, typingSpeed);
            }
        }
        setTimeout(typeEffect, 1500);

        gsap.utils.toArray('.gs-reveal').forEach(function (elem) {
            gsap.fromTo(elem,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                    }
                }
            );
        });

        gsap.fromTo(".auth-card",
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: "#auth-container",
                    start: "top 85%"
                },
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            }
        );

        gsap.fromTo(".badge-anim",
            { scale: 0.8, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: "#badges-container",
                    start: "top 85%"
                },
                scale: 1,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)"
            }
        );

        const swiper = new Swiper('.propertySwiper', {
            slidesPerView: 1.1,
            spaceBetween: 10,
            centeredSlides: true,
            loop: true,
            grabCursor: true,
            pagination: {
                el: '.propertySwiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: { slidesPerView: 1.8, spaceBetween: 30, centeredSlides: true },
                1024: { slidesPerView: 2, spaceBetween: 40, centeredSlides: false }
            }
        });
        
        const testimonialSwiper = new Swiper('.testimonialSwiper', {
            slidesPerView: "auto",
            spaceBetween: 24,
            grabCursor: true,
            loop: true,
            speed: 6000, 
            autoplay: {
                delay: 0, 
                disableOnInteraction: false,
                pauseOnMouseEnter: true, 
            },
            pagination: {
                el: '.testimonialSwiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.testimonial-next',
                prevEl: '.testimonial-prev',
            },
            breakpoints: {
                0: {
                    spaceBetween: 16
                },
                768: {
                    spaceBetween: 24
                }
            }
        });

        let modalSwiperInstance = null;

        function openPropertyModal(title, location, desc, images) {
            const modal = document.getElementById('propertyModal');
            const overlay = document.getElementById('modalOverlay');
            const content = document.getElementById('modalContent');
            const wrapper = document.getElementById('modalSwiperWrapper');

            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalLocation').textContent = location;
            document.getElementById('modalDesc').textContent = desc;

            if (modalSwiperInstance) {
                modalSwiperInstance.destroy(true, true);
            }

            wrapper.innerHTML = images.map(img => `<div class="swiper-slide"><img src="${img}" class="w-full h-full object-cover"></div>`).join('');

            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                overlay.classList.remove('opacity-0');
                content.classList.remove('opacity-0', 'scale-95');
                content.classList.add('opacity-100', 'scale-100');
            }, 10);

            modalSwiperInstance = new Swiper('.modalSwiper', {
                loop: true,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: '.modalSwiper .swiper-button-next',
                    prevEl: '.modalSwiper .swiper-button-prev'
                },
                pagination: {
                    el: '.modalSwiper .swiper-pagination',
                    clickable: true
                },
                grabCursor: true
            });
        }

        function closePropertyModal() {
            const modal = document.getElementById('propertyModal');
            const overlay = document.getElementById('modalOverlay');
            const content = document.getElementById('modalContent');

            overlay.classList.add('opacity-0');
            content.classList.remove('opacity-100', 'scale-100');
            content.classList.add('opacity-0', 'scale-95');

            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.style.overflow = '';
            }, 500);
        }

        function openImageModal(src) {
            const modal = document.getElementById('imageModal');
            const overlay = document.getElementById('imageModalOverlay');
            const img = document.getElementById('expandedImg');

            img.src = src;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                overlay.classList.remove('opacity-0');
                overlay.classList.add('opacity-100');
                img.classList.remove('scale-95', 'opacity-0');
                img.classList.add('scale-100', 'opacity-100');
            }, 10);
        }

        function closeImageModal() {
            const modal = document.getElementById('imageModal');
            const overlay = document.getElementById('imageModalOverlay');
            const img = document.getElementById('expandedImg');

            overlay.classList.remove('opacity-100');
            overlay.classList.add('opacity-0');
            img.classList.remove('scale-100', 'opacity-100');
            img.classList.add('scale-95', 'opacity-0');

            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.style.overflow = '';
                img.src = '';
            }, 300);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (!document.getElementById('propertyModal').classList.contains('hidden')) {
                    closePropertyModal();
                }
                if (!document.getElementById('imageModal').classList.contains('hidden')) {
                    closeImageModal();
                }
            }
        });

        window.addEventListener('load', () => {
            const firstContent = document.querySelector('.accordion-content');
            if (firstContent) firstContent.style.height = firstContent.scrollHeight + 'px';
        });

        function toggleAccordion(btn) {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.icon');
            const isOpen = content.style.height && content.style.height !== '0px';

            document.querySelectorAll('.accordion-content').forEach(el => {
                el.style.height = '0px';
                el.previousElementSibling.querySelector('.icon').textContent = '+';
                el.previousElementSibling.querySelector('.icon').style.transform = 'rotate(0deg)';
                el.previousElementSibling.classList.remove('text-bronze');
                el.previousElementSibling.querySelector('span:first-child').classList.remove('text-bronze');
            });

            if (!isOpen) {
                content.style.height = content.scrollHeight + 'px';
                icon.textContent = '-';
                icon.style.transform = 'rotate(180deg)';
                btn.classList.add('text-bronze');
                btn.querySelector('span:first-child').classList.add('text-bronze');

                const mediaType = btn.getAttribute('data-type');
                const mediaSrc = btn.getAttribute('data-src');
                const imgElement = document.getElementById('exp-img');
                const videoElement = document.getElementById('exp-video');

                if (mediaType === 'video') {
                    gsap.to(imgElement, { opacity: 0, duration: 0.4 });
                    if (!videoElement.src.includes(mediaSrc)) {
                        videoElement.src = mediaSrc;
                    }
                    gsap.to(videoElement, { opacity: 1, duration: 0.4, delay: 0.1 });
                } else if (mediaType === 'image') {
                    gsap.to(videoElement, { opacity: 0, duration: 0.4 });
                    videoElement.pause();

                    if (imgElement.src !== mediaSrc) {
                        gsap.to(imgElement, {
                            opacity: 0.2,
                            duration: 0.2,
                            onComplete: () => {
                                imgElement.src = mediaSrc;
                                gsap.to(imgElement, { opacity: 1, duration: 0.4 });
                            }
                        });
                    } else {
                        gsap.to(imgElement, { opacity: 1, duration: 0.4, delay: 0.1 });
                    }
                }
            }
        }

        function toggleFaq(btn) {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            const isOpen = content.style.height && content.style.height !== '0px';

            document.querySelectorAll('.faq-content').forEach(el => {
                el.style.height = '0px';
                const prevBtn = el.previousElementSibling;
                if (prevBtn) {
                    const prevIcon = prevBtn.querySelector('.faq-icon');
                    if (prevIcon) {
                        prevIcon.textContent = '+';
                        prevIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });

            if (!isOpen) {
                content.style.height = content.scrollHeight + 'px';
                icon.textContent = '-';
                icon.style.transform = 'rotate(180deg)';
            }
        }

        flatpickr("#data", {
            mode: "range",
            dateFormat: "d/m/Y",
            minDate: "today",
            locale: "pt",
            onChange: function (selectedDates, dateStr, instance) {
                if (selectedDates.length === 2) {
                    const diffTime = Math.abs(selectedDates[1] - selectedDates[0]);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays < 2) {
                        alert("A estadia mínima permitida é de 2 noites. Por favor, ajuste o período.");
                        instance.clear();
                    }
                }
            }
        });

        document.getElementById('bookingForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            btn.innerHTML = 'Enviando...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.innerHTML = 'Solicitar Disponibilidade';
                btn.style.opacity = '1';
                document.getElementById('form-feedback').classList.remove('hidden');
                this.reset();

                setTimeout(() => {
                    document.getElementById('form-feedback').classList.add('hidden');
                }, 4000);
            }, 1500);
        });

        const mobileExpSwiper = new Swiper('.mobileExpSwiper', {
            slidesPerView: "auto",
            spaceBetween: 12,
            centeredSlides: true,
            grabCursor: true,
            loop: false,
            pagination: {
                el: '.mobileExpSwiper .swiper-pagination',
                clickable: true,
            },
            on: {
                slideChange: function () {
                    closeAllMobileAccordions();
                    document.querySelectorAll('.mobileExpSwiper video').forEach(v => v.pause());
                }
            }
        });

        function toggleMobileAccordion(btn) {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.mobile-icon');
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

            closeAllMobileAccordions();

            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.opacity = "1";
                btn.classList.add('text-bronze');
                icon.textContent = '-';
                icon.style.transform = 'rotate(180deg)';
            }
        }

        function closeAllMobileAccordions() {
            document.querySelectorAll('.mobile-accordion-content').forEach(el => {
                el.style.maxHeight = '0px';
                el.style.opacity = '0';
                const prevBtn = el.previousElementSibling;
                if (prevBtn) {
                    prevBtn.classList.remove('text-bronze');
                    const prevIcon = prevBtn.querySelector('.mobile-icon');
                    if (prevIcon) {
                        prevIcon.textContent = '+';
                        prevIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            const limite = 141;

            const depoimentos = document.querySelectorAll('#depoimentos p.italic');

            depoimentos.forEach(p => {
                const textoOriginal = p.textContent.trim();

                if (textoOriginal.length > limite) {
                    const textoVisivel = textoOriginal.substring(0, limite);
                    const textoOculto = textoOriginal.substring(limite);

                    p.innerHTML = `
                        <span class="texto-visivel">${textoVisivel}...</span>
                        <span class="texto-oculto hidden">${textoOculto}</span>
                        <button class="btn-ler-mais text-bronze font-semibold uppercase text-[10px] tracking-widest ml-1 hover:underline cursor-pointer">Continuar lendo</button>
                    `;

                    const btn = p.querySelector('.btn-ler-mais');
                    const spanOculto = p.querySelector('.texto-oculto');
                    const spanVisivel = p.querySelector('.texto-visivel');

                    btn.addEventListener('click', () => {
                        spanVisivel.textContent = textoVisivel;
                        spanOculto.classList.remove('hidden');
                        btn.style.display = 'none';
                    });
                }
            });
        });