import React, { useEffect } from 'react';
import { AppLayout } from './components/AppLayout';
import { Section } from './components/Section';
import { ProjectCard } from './components/ProjectCard';
import { RepoCard } from './components/RepoCard';
import { Contact } from './components/Contact';
import { projects } from './data/projects';
import { repos } from './data/repos';
import { experience } from './data/experience';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
    const { t, i18n } = useTranslation();
    const currentLang = (i18n.language.split('-')[0] || 'en') as 'en' | 'es';

    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <AppLayout>
            {/* Home Section */}
            <section className="min-h-[90vh] flex flex-col justify-center px-6 max-w-7xl mx-auto border-b border-charcoal" id="home">
                <div className="max-w-4xl">
                    <h2 className="text-primary font-medium tracking-[0.2em] uppercase mb-4 text-sm">{t('hero.role')}</h2>
                    <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
                        Nicolás <br /> Pinzón Contreras
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed">
                        {t('hero.description')}
                    </p>
                    <div className="mt-12 flex flex-wrap gap-12">
                        <div className="flex flex-col border-l-2 border-primary pl-4">
                            <span className="text-xs uppercase tracking-widest text-slate-500 mb-1">{t('hero.tag_role')}</span>
                            <span className="font-medium">{t('hero.role')}</span>
                        </div>
                        <div className="flex flex-col border-l-2 border-primary pl-4">
                            <span className="text-xs uppercase tracking-widest text-slate-500 mb-1">{t('hero.tag_focus')}</span>
                            <span className="font-medium">{t('hero.tag_focus_val')}</span>
                        </div>
                        <div className="flex flex-col border-l-2 border-primary pl-4">
                            <span className="text-xs uppercase tracking-widest text-slate-500 mb-1">{t('hero.tag_spec')}</span>
                            <span className="font-medium">{t('hero.tag_spec_val')}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <Section id="about" className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                    <h3 className="text-3xl font-bold sticky top-24 uppercase tracking-tight">{t('about.title').split(' ').map((word, i) => <React.Fragment key={i}>{word} {i === 0 && <br />}</React.Fragment>)}</h3>
                </div>
                <div className="md:col-span-8">
                    <div className="prose prose-invert max-w-none text-slate-300 space-y-8 text-lg leading-relaxed">
                        <p>{t('about.p1')}</p>
                        <p>{t('about.p2')}</p>
                    </div>
                </div>
            </Section>

            {/* Experience Section */}
            <section className="py-32 px-6 max-w-7xl mx-auto border-b border-charcoal" id="experience">
                <h3 className="text-3xl font-bold mb-16 uppercase tracking-tight text-primary">{t('experience.title')}</h3>
                <div className="space-y-24 relative">
                    {experience.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-8 relative">
                            <div className="hidden md:block timeline-line left-[20.5%]"></div>
                            <div className="md:col-span-3 text-slate-500 font-medium">{item.year}</div>
                            <div className="md:col-span-1 relative">
                                <div className="timeline-dot hidden md:block"></div>
                            </div>
                            <div className="md:col-span-8">
                                <h4 className="text-2xl font-bold mb-2">{item.title[currentLang]}</h4>
                                <div className="text-primary font-medium mb-6 uppercase tracking-wider text-sm">{item.company}</div>
                                <ul className="space-y-4 text-slate-400">
                                    {item.responsibilities[currentLang].map((resp, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                                            <span>{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Professional Projects Section */}
            <Section id="professional-projects" title={t('projects.title')} subtitle={t('projects.subtitle')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </Section>

            {/* OSS & Tools Section */}
            <Section id="oss-tools" title={t('oss.title')} subtitle={t('oss.subtitle')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
                    {repos.map((repo, index) => (
                        <RepoCard key={index} repo={repo} />
                    ))}
                </div>
            </Section>

            {/* Contact Section */}
            <section className="py-32 px-6 max-w-7xl mx-auto border-b border-charcoal" id="contact">
                <Contact />
            </section>
        </AppLayout>
    );
};

export default App;
