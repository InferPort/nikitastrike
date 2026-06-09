import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProjectCard } from '../components/ProjectCard';
import { RepoCard } from '../components/RepoCard';
import { projects } from '../data/projects';
import { repos } from '../data/repos';
import { experience } from '../data/experience';
import { CheckCircle2, Terminal, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PortfolioScene from '../components/PortfolioScene';

const heroContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: 0.3 },
    },
};

const letterReveal = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
    },
};

const heroFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
};

const fromLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const fromRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const fadeUpStagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const Home: React.FC = () => {
    const { t, i18n } = useTranslation();
    const currentLang = (i18n.language.split('-')[0] || 'en') as 'en' | 'es';

    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const expRef = useRef(null);
    const projectsRef = useRef(null);
    const ossRef = useRef(null);
    const contactRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const { scrollYProgress: aboutProgress } = useScroll({
        target: aboutRef, offset: ['start end', 'end start'],
    });
    const { scrollYProgress: expProgress } = useScroll({
        target: expRef, offset: ['start end', 'end start'],
    });
    const { scrollYProgress: projectsProgress } = useScroll({
        target: projectsRef, offset: ['start end', 'end start'],
    });
    const { scrollYProgress: ossProgress } = useScroll({
        target: ossRef, offset: ['start end', 'end start'],
    });
    const { scrollYProgress: contactProgress } = useScroll({
        target: contactRef, offset: ['start end', 'end start'],
    });

    const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <>
            <PortfolioScene
                heroRef={heroRef}
                aboutRef={aboutRef}
                expRef={expRef}
                projectsRef={projectsRef}
                ossRef={ossRef}
                contactRef={contactRef}
                heroProgress={scrollYProgress}
                aboutProgress={aboutProgress}
                expProgress={expProgress}
                projectsProgress={projectsProgress}
                ossProgress={ossProgress}
                contactProgress={contactProgress}
            />

            {/* ── Hero ── */}
            <section ref={heroRef} className="relative z-10 min-h-screen flex items-center px-6 overflow-hidden" id="home">
                <div className="absolute inset-0 bg-gradient-to-t from-[#141517] via-[#141517]/40 to-transparent pointer-events-none" />

                <motion.div
                    className="max-w-5xl mx-auto relative z-10 text-center"
                    style={{ y: contentY, opacity: contentOpacity }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/60 backdrop-blur-sm border border-line/50 text-primary text-[11px] font-bold tracking-[0.15em] mb-8 mx-auto"
                    >
                        <Terminal size={12} />
                        {t('hero.role')}
                    </motion.div>

                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-6 whitespace-nowrap"
                        initial="hidden"
                        animate="visible"
                        variants={heroContainer}
                    >
                        {'Nicolás Pinzón Contreras'.split('').map((char, i) => (
                            <motion.span
                                key={i}
                                variants={letterReveal}
                                className="inline-block"
                                style={{
                                    background: 'linear-gradient(135deg, #ffffff 30%, #4a8eff 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-lg md:text-xl text-ink-dim max-w-2xl mx-auto font-light leading-relaxed mb-12"
                    >
                        {t('hero.description')}
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap justify-center gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={heroContainer}
                    >
                        {[
                            { dot: 'bg-primary', label: t('hero.tag_role'), value: t('hero.role') },
                            { dot: 'bg-primary/60', label: t('hero.tag_focus'), value: t('hero.tag_focus_val') },
                            { dot: 'bg-warm-accent', label: t('hero.tag_spec'), value: t('hero.tag_spec_val') },
                        ].map((item) => (
                            <motion.div
                                key={item.label}
                                variants={heroFadeUp}
                                className="flex items-center gap-3"
                                whileHover={{ y: -2 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                <motion.div
                                    className={`w-2 h-2 rounded-full ${item.dot}`}
                                    whileHover={{ scale: 2 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                />
                                <div className="flex flex-col items-start">
                                    <span className="text-[9px] uppercase tracking-[0.15em] text-ink-muted font-bold">{item.label}</span>
                                    <span className="text-sm font-medium">{item.value}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* ── About ── */}
            <section
                className="relative z-10 min-h-screen flex items-center py-32 px-6 overflow-hidden"
                id="about"
                ref={aboutRef}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#141517]/80 via-[#141517]/40 to-[#141517]/90 pointer-events-none" />
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
                    <motion.div
                        className="md:col-span-4"
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <h3 className="text-3xl font-bold tracking-tight">{t('about.title')}</h3>
                    </motion.div>
                    <motion.div
                        className="md:col-span-8"
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <div className="text-ink-dim space-y-6 text-lg leading-relaxed max-w-prose-narrow">
                            <p>{t('about.p1')}</p>
                            <p>{t('about.p2')}</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Experience ── */}
            <section
                className="relative z-10 min-h-screen flex items-center py-32 px-6 overflow-hidden"
                id="experience"
                ref={expRef}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#141517]/80 via-[#141517]/40 to-[#141517]/90 pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="absolute left-[20.5%] top-0 bottom-0 hidden md:block">
                        <div className="w-px h-full bg-line" />
                    </div>

                    <motion.h3
                        className="text-3xl font-bold tracking-tight mb-16"
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    >{t('experience.title')}</motion.h3>

                    <div className="space-y-20">
                        {experience.map((item, i) => (
                            <motion.div
                                key={item.company}
                                className="grid grid-cols-1 md:grid-cols-12 gap-8 relative"
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                                <div className="md:col-span-3">
                                    <span className="text-sm text-ink-muted font-medium">{item.year}</span>
                                </div>
                                <motion.div
                                    className="hidden md:block absolute left-[20.5%] top-0"
                                    whileHover={{ scale: 2 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                >
                                    <motion.div
                                        className="w-3 h-3 rounded-full bg-primary -translate-x-[5px] border-2 border-surface"
                                        animate={{
                                            boxShadow: [
                                                '0 0 0 0 rgba(74, 142, 255, 0.4)',
                                                '0 0 0 10px rgba(74, 142, 255, 0)',
                                            ],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeOut',
                                        }}
                                    />
                                </motion.div>
                                <div className="md:col-span-8 md:col-start-5">
                                    <h4 className="text-2xl font-bold mb-1">{item.title[currentLang]}</h4>
                                    <span className="text-sm text-primary font-medium tracking-wide block mb-6">{item.company}</span>
                                    <ul className="space-y-3">
                                        {item.responsibilities[currentLang].map((resp, j) => (
                                            <motion.li
                                                key={j}
                                                className="flex items-start gap-3 text-ink-dim leading-relaxed"
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: j * 0.08 }}
                                            >
                                                <motion.div
                                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                                >
                                                    <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                                                </motion.div>
                                                <span>{resp}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Projects ── */}
            <section
                className="relative z-10 min-h-screen flex items-center py-32 px-6 overflow-hidden"
                id="professional-projects"
                ref={projectsRef}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#141517]/80 via-[#141517]/40 to-[#141517]/90 pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <h3 className="text-3xl font-bold tracking-tight mb-3">{t('projects.title')}</h3>
                        <p className="text-ink-muted text-sm tracking-widest font-medium">{t('projects.subtitle')}</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── OSS & Tools ── */}
            <section
                className="relative z-10 min-h-screen flex items-center py-32 px-6 overflow-hidden"
                id="oss-tools"
                ref={ossRef}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#141517]/80 via-[#141517]/40 to-[#141517]/90 pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <h3 className="text-3xl font-bold tracking-tight mb-3">{t('oss.title')}</h3>
                        <p className="text-ink-muted text-sm tracking-widest font-medium">{t('oss.subtitle')}</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {repos.map((repo, i) => (
                            <motion.div
                                key={repo.name}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                                <RepoCard repo={repo} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Contact ── */}
            <section
                className="relative z-10 min-h-screen flex items-center py-32 px-6 overflow-hidden"
                id="contact"
                ref={contactRef}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#141517]/80 via-[#141517]/40 to-[#141517]/90 pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-prose-narrow">
                        <motion.span
                            className="text-[9px] uppercase tracking-[0.15em] text-ink-muted font-bold mb-4 block"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        >Contact</motion.span>
                        <motion.h3
                            className="text-3xl font-bold tracking-tight mb-6"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        >{t('contact.title')}</motion.h3>
                        <motion.p
                            className="text-ink-dim text-lg leading-relaxed mb-10"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        >{t('contact.description')}</motion.p>
                        <motion.a
                            href="mailto:me@nikitastrike.co"
                            className="text-3xl md:text-5xl font-bold tracking-tight hover:text-primary transition-colors duration-300 block mb-12"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            me@nikitastrike.co
                        </motion.a>
                        <motion.div
                            className="flex flex-wrap gap-8 pt-8 border-t border-line"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            {[
                                { label: 'GitHub', href: 'https://github.com/nikitacontreras' },
                                { label: 'LinkedIn', href: 'https://linkedin.com/in/nikitastrike' },
                                { label: 'ORCID', href: 'https://orcid.org/0009-0006-9512-6504', mono: true },
                            ].map((link) => (
                                <motion.a
                                    key={link.label}
                                    className={`text-sm text-ink-muted hover:text-primary transition-colors font-medium flex items-center gap-1.5 ${link.mono ? 'font-mono' : ''}`}
                                    href={link.href}
                                    target="_blank"
                                    whileHover={{ x: 4, scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                >
                                    {link.label} <ArrowUpRight size={12} />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
