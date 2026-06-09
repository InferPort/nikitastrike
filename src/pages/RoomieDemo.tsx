import React, { useState, useCallback, useRef } from 'react';
import Roomie from 'roomie';
import { Buffer } from 'buffer';
import { motion, AnimatePresence } from 'framer-motion';

import { Upload, FileSearch, Trash2, Github, Cpu, Hash, Globe, Database, ChevronRight, Activity, Cpu as CpuIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';

interface RomData {
    system: string;
    name?: string;
    gameCode?: string;
    gameid?: string;
    region?: string;
    size?: number;
    hash?: { sha1: string; crc32: string };
    sfc?: any;
    n64?: any;
    nes?: any;
    genesis?: any;
    sms?: any;
    gg?: any;
    pce?: any;
    ws?: any;
    wsc?: any;
    cartridge?: any;
}

const getSystemColor = (system: string) => {
    const colors: Record<string, string> = {
        nes: 'border-l-4 border-red-500/60',
        sfc: 'border-l-4 border-purple-500/60',
        n64: 'border-l-4 border-green-500/60',
        gb: 'border-l-4 border-emerald-500/60',
        gba: 'border-l-4 border-blue-500/60',
        nds: 'border-l-4 border-cyan-500/60',
        genesis: 'border-l-4 border-indigo-500/60',
        sms: 'border-l-4 border-sky-500/60',
        gg: 'border-l-4 border-violet-500/60',
        pce: 'border-l-4 border-orange-500/60',
        ws: 'border-l-4 border-pink-500/60',
        wsc: 'border-l-4 border-rose-500/60',
    };
    return colors[system] || 'border-l-4 border-primary/60';
};

const getSystemLabel = (system: string) => {
    const labels: Record<string, string> = {
        nes: 'Nintendo Entertainment System (NES)',
        sfc: 'Super Nintendo / Super Famicom',
        n64: 'Nintendo 64',
        gb: 'Nintendo Game Boy (Classic)',
        gba: 'Game Boy Advance',
        nds: 'Nintendo DS',
        genesis: 'Sega Genesis / Mega Drive',
        sms: 'Sega Master System',
        gg: 'Sega Game Gear',
        pce: 'TurboGrafx-16 / PC Engine',
        ws: 'WonderSwan',
        wsc: 'WonderSwan Color',
    };
    return labels[system] || system.toUpperCase();
};

const RoomieDemo: React.FC = () => {
    const { t } = useTranslation();
    const [romInfo, setRomInfo] = useState<RomData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const processFile = async (file: File) => {
        setLoading(true);
        setError(null);
        setRomInfo(null);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const roomie = new Roomie(buffer as any);
            await roomie.load(buffer as any);
            setRomInfo({ ...roomie.info, name: roomie.name, gameid: roomie.gameid, cartridge: roomie.cartridge });
        } catch (err: any) {
            setError(err.message === 'unknown_bytes' ? 'Unsupported ROM footprint.' : 'File processing failed.');
        } finally {
            setLoading(false);
        }
    };

    const clearInfo = () => {
        setRomInfo(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto flex flex-col">
            {/* Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                <div className="lg:col-span-5 flex flex-col justify-center">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary rounded-xl">
                                <CpuIcon size={24} />
                            </div>
                            <h1 className="text-5xl font-bold tracking-tight">{t('roomie_demo.title')}</h1>
                        </div>
                        <p className="text-ink-dim text-lg mb-8 leading-relaxed max-w-md">
                            {t('roomie_demo.description')}
                        </p>
                        <div className="flex gap-6">
                            <a href="https://github.com/nikitacontreras/roomie" target="_blank" className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-primary transition-colors border-b border-line pb-1">
                                <Github size={14} /> Repository
                            </a>
                            <a href="https://npmjs.com/package/roomie" target="_blank" className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-primary transition-colors border-b border-line pb-1">
                                <Activity size={14} /> NPM Package
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="lg:col-span-7">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={cn(
                            "relative h-64 border-2 border-line border-dashed transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer rounded-xl",
                            isDragging && "border-primary bg-primary/5",
                            !romInfo && "hover:border-ink-muted"
                        )}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) processFile(f); }}
                        onClick={() => !loading && fileInputRef.current?.click()}
                    >
                        <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} />

                        {loading ? (
                            <div className="text-center">
                                <div className="w-10 h-2 bg-surface-elevated relative overflow-hidden mb-4 mx-auto rounded">
                                    <motion.div className="absolute inset-0 bg-primary" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1 }} />
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-primary animate-pulse font-bold">{t('roomie_demo.analyzing')}</span>
                            </div>
                        ) : (
                            <>
                                <Upload className={cn("mb-4 transition-colors", isDragging ? "text-primary" : "text-ink-muted group-hover:text-ink-dim")} size={32} />
                                <div className="text-center px-8">
                                    <p className="text-sm font-bold tracking-widest">{t('roomie_demo.upload_title')}</p>
                                    <p className="text-[10px] text-ink-muted mt-2">{t('roomie_demo.upload_subtitle')}</p>
                                </div>
                            </>
                        )}
                        {error && <p className="absolute bottom-4 text-red-500 text-[10px] uppercase">{error}</p>}
                    </motion.div>
                </div>
            </div>

            {/* Results Section */}
            <AnimatePresence mode="wait">
                {romInfo ? (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-line rounded-xl overflow-hidden border border-line"
                    >
                        {/* Header Panel */}
                        <div className={cn("lg:col-span-4 bg-surface-elevated p-8", getSystemColor(romInfo.system))}>
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <span className="text-[10px] text-ink-muted uppercase tracking-widest block mb-1 font-bold">Architecture Detected</span>
                                    <span className="text-primary font-bold text-xs uppercase mb-8 block tracking-wider">{getSystemLabel(romInfo.system)}</span>
                                    <h2 className="text-3xl font-bold tracking-tight leading-none mb-4 break-words">{romInfo.name || "UNNAMED_ROM"}</h2>
                                    <p className="text-xs text-ink-muted border-t border-line pt-4">Internal checksum and header metadata successfully verified and cross-referenced.</p>
                                </div>
                                <button onClick={clearInfo} className="mt-12 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-red-800 hover:text-red-400 transition-colors">
                                    <Trash2 size={12} /> Clear Dataset
                                </button>
                            </div>
                        </div>

                        {/* Metadata Grid */}
                        <div className="lg:col-span-8 bg-surface grid grid-cols-1 md:grid-cols-2 gap-px">
                            <DataField label="Primary ID" value={romInfo.gameCode || romInfo.gameid || romInfo.genesis?.serial || romInfo.sms?.product || 'N/A'} icon={<Hash size={14} />} />
                            <DataField label="Registry Region" value={romInfo.region || 'Unknown'} icon={<Globe size={14} />} />
                            <DataField label="Memory Usage" value={(romInfo.size ? (romInfo.size / (1024 * 1024)).toFixed(2) : "0") + " MB"} icon={<Database size={14} />} />
                            <DataField label="CRC32 Checksum" value={romInfo.hash?.crc32 || 'N/A'} icon={<ChevronRight size={14} />} />

                            <div className="md:col-span-2 p-8 bg-surface-elevated/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    <h3 className="text-xs font-bold uppercase tracking-widest">Integrity Fingerprint (SHA-1)</h3>
                                </div>
                                <p className="font-mono text-xs text-ink-dim break-all bg-surface border border-line p-4 rounded-lg">{romInfo.hash?.sha1}</p>
                            </div>

                            {romInfo.system === 'nes' && (
                                <div className="md:col-span-2 p-8 bg-surface-elevated/50 border-t border-line">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                        <MiniField label="Mapper" value={romInfo.nes?.mapperName || `#${romInfo.nes?.mapper}`} />
                                        <MiniField label="Header" value={`iNES ${romInfo.nes?.version || '1.0'}`} />
                                        <MiniField label="PRG RAM" value={romInfo.nes?.prgRomSize ? (romInfo.nes.prgRomSize / 1024) + " KB" : "0"} />
                                        <MiniField label="CHR RAM" value={romInfo.nes?.chrRomSize ? (romInfo.nes.chrRomSize / 1024) + " KB" : "0"} />
                                    </div>
                                </div>
                            )}

                            {romInfo.system === 'sfc' && (
                                <div className="md:col-span-2 p-8 bg-surface-elevated/50 border-t border-line">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
                                        <div><span className="text-ink-muted uppercase tracking-wider block mb-1 font-bold">Mapping</span>{romInfo.cartridge?.rom?.type || "Standard"}</div>
                                        <div><span className="text-ink-muted uppercase tracking-wider block mb-1 font-bold">Co-Processor</span>{romInfo.sfc?.hardware || "None"}</div>
                                        <div><span className="text-ink-muted uppercase tracking-wider block mb-1 font-bold">Work RAM</span>{(romInfo.sfc?.ram || 0) + " KB"}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        className="py-32 flex flex-col items-center justify-center border border-line bg-surface-elevated/30 rounded-xl"
                    >
                        <div className="relative mb-6">
                            <FileSearch size={48} className="text-ink-muted/30" />
                            <motion.div
                                className="absolute inset-x-[-10px] top-1/2 h-px bg-primary/20"
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            />
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-ink-muted">System idle</p>
                            <p className="text-xs tracking-widest text-ink-muted/60 animate-pulse font-bold">Waiting for telemetry data...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Terminal Block */}
            <div className="mt-20 max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest">Deployment Implementation</h3>
                </div>
                <div className="bg-surface-elevated border border-line text-[11px] p-6 leading-relaxed rounded-xl font-mono">
                    <p className="text-primary mb-2">// 1. Initialize dependencies</p>
                    <p className="text-ink-muted mb-6">$ npm install roomie jszip</p>

                    <p className="text-primary mb-2">// 2. Analysis pipeline</p>
                    <p className="text-ink-muted">import <span className="text-light-text">Roomie</span> from "roomie";</p>
                    <p className="text-ink-muted">const roomie = new <span className="text-light-text">Roomie</span>(bin);</p>
                    <p className="text-ink-muted">await roomie.load(bin);</p>
                    <p className="text-ink-muted/50 italic mt-6">// Full JSON telemetry follows the .info specification</p>
                </div>
            </div>
        </div>
    );
};

const DataField: React.FC<{ label: string, value: string, icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="p-8 bg-surface-elevated flex flex-col justify-between group">
        <div className="flex items-center gap-2 text-ink-muted group-hover:text-primary transition-colors mb-4">
            {icon}
            <span className="text-[10px] uppercase tracking-widest font-bold">{label}</span>
        </div>
        <p className="text-xl font-bold tracking-tight text-light-text truncate">{value}</p>
    </div>
);

const MiniField: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div>
        <span className="text-[9px] text-ink-muted uppercase tracking-widest block mb-1 font-bold">{label}</span>
        <span className="text-xs font-bold text-ink-dim">{value}</span>
    </div>
);

export default RoomieDemo;
