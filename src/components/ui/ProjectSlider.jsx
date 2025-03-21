import { useEffect, useRef, useContext, useState } from 'react';
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
    const [selectedProject, setSelectedProject] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        if (isLoading || !animationsComplete) return;

        const swiper = new Swiper(swiperRef.current, {
            modules: [Navigation, EffectCoverflow],
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 3,
            initialSlide: 3,
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
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    initialSlide: 3,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    initialSlide: 3,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    initialSlide: 3,
                }
            }
        });

        return () => {
            if (swiper) swiper.destroy();
        };
    }, [isLoading, animationsComplete]);

    const handleOpenProjectDetails = (project) => {
        setSelectedProject(project);
        setShowFullDescription(false);
    };

    const handleCloseProjectDetails = () => {
        setSelectedProject(null);
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const ProjectSlide = ({ project }) => (
        <div className="swiper-slide">
            <div 
                className="slider-content w-[25rem] h-[28rem] relative overflow-hidden cursor-pointer group"
                onClick={() => handleOpenProjectDetails(project)}
            >
                <img 
                    src={project.image} 
                    alt={`${project.title} preview`} 
                    className="slider-img w-[150%] h-full bg-cover absolute inset-0 top-0 right-0 transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-secondary bg-opacity-90 p-4 transition-all duration-300 group-hover:bg-opacity-95">
                    <h3 className="text-primary text-shadow text-xl text-center mb-1">{project.title}</h3>
                    <p className="text-tertiary text-center text-sm">Click to view details</p>
                </div>
            </div>
        </div>
    );

    return (
        <>
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
                
                <div className="swiper-button-prev flex items-center justify-center text-primary">
                    <ChevronLeft className="w-6 h-6" />
                </div>
                <div className="swiper-button-next flex items-center justify-center text-primary">
                    <ChevronRight className="w-6 h-6" />
                </div>
            </div>

            {/* Project Details Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
                    <div className="bg-secondary rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="relative">
                            <button 
                                onClick={handleCloseProjectDetails}
                                className="absolute top-4 right-4 text-primary hover:text-white p-1 rounded-full bg-secondary bg-opacity-70"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <img 
                                src={selectedProject.image} 
                                alt={selectedProject.title} 
                                className="w-full h-64 object-cover rounded-t-lg"
                            />
                        </div>
                        
                        <div className="p-6">
                            <h2 className="text-primary text-shadow text-2xl md:text-3xl mb-4">{selectedProject.title}</h2>
                            
                            <div className="mb-4">
                                <p className="text-tertiary mb-2">
                                    {selectedProject.description}{' '}
                                    {selectedProject.technologies.map((tech, index) => (
                                        <span key={index} className="text-primary text-shadow font-helvetica font-bold">
                                            {tech}
                                            {index < selectedProject.technologies.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                    .
                                </p>
                                
                                {selectedProject.additionalText && (
                                    <div>
                                        {showFullDescription || selectedProject.additionalText.length < 100 ? (
                                            <p className="text-tertiary">{selectedProject.additionalText}</p>
                                        ) : (
                                            <p className="text-tertiary">
                                                {selectedProject.additionalText.substring(0, 100)}...
                                            </p>
                                        )}
                                        
                                        {selectedProject.additionalText.length >= 100 && (
                                            <button 
                                                onClick={toggleDescription}
                                                className="text-primary underline mt-2 text-sm"
                                            >
                                                {showFullDescription ? 'Show less' : 'Read more'}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex justify-center items-center gap-6 mt-6">
                                {selectedProject.links.live && (
                                    <a 
                                        href={selectedProject.links.live} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-white transition-colors flex flex-col items-center"
                                    >
                                        <Globe className="w-8 h-8 mb-1" />
                                        <span className="text-sm">Live Demo</span>
                                    </a>
                                )}
                                {selectedProject.links.code && (
                                    <a 
                                        href={selectedProject.links.code} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-white transition-colors flex flex-col items-center"
                                    >
                                        <Github className="w-8 h-8 mb-1" />
                                        <span className="text-sm">Source Code</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
