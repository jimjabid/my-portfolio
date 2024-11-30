import { useEffect, useRef, useContext } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { useAnimation } from '../../hooks/useAnimation';
import { projectsData } from '../../data/projects';
import { Globe, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { LoadingContext } from '../../context/LoadingContext';

export function ProjectSlider() {
    const swiperRef = useRef(null);
    const { isLoading, animationsComplete } = useContext(LoadingContext);
    const { animateProjectSlider, handleProjectHover, handleProjectLeave } = useAnimation();

    useEffect(() => {
        if (isLoading || !animationsComplete) return;

        const swiper = new Swiper(swiperRef.current, {
            modules: [Navigation, Pagination, EffectCoverflow],
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 3,
            initialSlide: 1,
            loop: true,
            spaceBetween: 30,
            observer: true,
            observeParents: true,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                renderNext: () => `
                    <div class="flex items-center justify-center w-full h-full">
                        <ChevronRight class="w-4 h-4 text-primary" />
                    </div>
                `,
                renderPrev: () => `
                    <div class="flex items-center justify-center w-full h-full">
                        <ChevronLeft class="w-4 h-4 text-primary" />
                    </div>
                `
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }
        });

     

        return () => {
            if (swiper) swiper.destroy();
        };
    }, [isLoading, animationsComplete]);

    const ProjectSlide = ({ project }) => (
        <div className="swiper-slide">
            <div 
                className="slider-content w-[25rem] h-[28rem] relative overflow-hidden"
                onMouseEnter={(e) => handleProjectHover(e.currentTarget, e.currentTarget.querySelector('.show-project'))}
                onMouseLeave={(e) => handleProjectLeave(e.currentTarget, e.currentTarget.querySelector('.show-project'))}
            >
                <div className="absolute w-full h-full p-5 bg-secondary flex justify-center items-center flex-col inset-0 top-0 left-0 z-10 scale-y-0 show-project origin-top-left">
                    <h1 className="text-primary text-shadow sm:text-[30px] text-center tracking-[1.5px]">
                        {project.title}
                    </h1>
                    <p className="font-helvetica font-medium md:text-[18.8px] text-center p-5 text-tertiary">
                        {project.description}
                        {project.technologies.map((tech, index) => (
                            <span key={index} className="text-primary text-shadow font-helvetica font-bold">
                                {tech}
                            </span>
                        )).reduce((prev, curr) => [prev, ', ', curr])}
                        . {project.additionalText}
                    </p>
                    <div className="flex justify-center items-center gap-5">
                        {project.links.live && (
                            <a 
                                href={project.links.live} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary text-shadow font-medium underline md:text-[30px] xs:text-[25px] text-[15px] flex flex-col items-center"
                            >
                                <Globe className="w-6 h-6" />
                                <span className="block md:text-[15px] text-[10px]">Live</span>
                            </a>
                        )}
                        {project.links.code && (
                            <a 
                                href={project.links.code} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary text-shadow font-medium underline md:text-[30px] xs:text-[25px] text-[15px] flex flex-col items-center"
                            >
                                <Github className="w-6 h-6" />
                                <span className="block md:text-[15px] text-[10px]">Code</span>
                            </a>
                        )}
                    </div>
                </div>
                <img 
                    src={project.image} 
                    alt={`${project.title} preview`} 
                    className="slider-img w-[150%] h-full bg-cover absolute inset-0 top-0 right-0" 
                />
            </div>
        </div>
    );

    return (
        <div 
            ref={swiperRef} 
            className={`projects-container swiper lg:mt-[300px] mt-56 ${
                isLoading || !animationsComplete ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ transition: 'opacity 0.3s ease-in-out' }}
        >
            <div className="swiper-wrapper">
                {projectsData.map((project) => (
                    <ProjectSlide key={project.id} project={project} />
                ))}
            </div>
            
            <div className="swiper-pagination"></div>
            
            <div className="swiper-button-prev flex items-center justify-center">
                <ChevronLeft className="w-4 h-4 text-primary" />
            </div>
            <div className="swiper-button-next flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-primary" />
            </div>
        </div>
    );
}
