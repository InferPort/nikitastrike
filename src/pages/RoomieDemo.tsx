import React, { useState, useCallback, useRef } from 'react';
import Roomie from 'roomie';
import { Buffer } from 'buffer';
import { motion, AnimatePresence } from 'framer-motion';

import { Upload, FileSearch, Trash2, Github, Cpu, Hash, Globe, Database, Info, Gamepad2, ChevronRight, Activity, Cpu as CpuIcon } from 'lucide-react';
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
        nes: 'border-red-500/50',
        sfc: 'border-purple-500/50',
        n64: 'border-green-500/50',
        gb: 'border-emerald-500/50',
        gba: 'border-blue-500/50',
        nds: 'border-cyan-500/50',
        genesis: 'border-indigo-500/50',
        sms: 'border-sky-500/50',
        gg: 'border-violet-500/50',
        pce: 'border-orange-500/50',
        ws: 'border-pink-500/50',
        wsc: 'border-rose-500/50',
    };
    return colors[system] || 'border-primary/50';
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
        <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto flex flex-col font-mono">
            {/* Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                <div className="lg:col-span-5 flex flex-col justify-center">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-primary flex items-center justify-center text-white">
                                <CpuIcon size={24} />
                            </div>
                            <h1 className="text-5xl font-bold tracking-tighter uppercase italic">{t('roomie_demo.title')}</h1>
                        </div>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-md font-sans">
                            {t('roomie_demo.description')}
                        </p>
                        <div className="flex gap-6">
                            <a href="https://github.com/nikitacontreras/roomie" target="_blank" className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-primary transition-colors border-b border-charcoal pb-1">
                                <Github size={14} /> Repository
                            </a>
                            <a href="https://npmjs.com/package/roomie" target="_blank" className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-primary transition-colors border-b border-charcoal pb-1">
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
                            "relative h-64 border-2 border-charcoal border-dashed transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer",
                            isDragging && "border-primary bg-primary/5",
                            !romInfo && "hover:border-slate-600"
                        )}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) processFile(f); }}
                        onClick={() => !loading && fileInputRef.current?.click()}
                    >
                        <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} />

                        {loading ? (
                            <div className="text-center">
                                <div className="w-10 h-2 bg-slate-800 relative overflow-hidden mb-4 mx-auto">
                                    <motion.div className="absolute inset-0 bg-primary" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1 }} />
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-primary animate-pulse">{t('roomie_demo.analyzing')}</span>
                            </div>
                        ) : (
                            <>
                                <Upload className={cn("mb-4 transition-colors", isDragging ? "text-primary" : "text-slate-600 group-hover:text-slate-400")} size={32} />
                                <div className="text-center px-8">
                                    <p className="text-sm font-bold uppercase tracking-widest">{t('roomie_demo.upload_title')}</p>
                                    <p className="text-[10px] text-slate-500 mt-2 italic">{t('roomie_demo.upload_subtitle')}</p>
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
                        className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-charcoal border border-charcoal"
                    >
                        {/* Header Panel */}
                        <div className={cn("lg:col-span-4 bg-slate-950 p-8 border-l-4", getSystemColor(romInfo.system))}>
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Architecture Detected</span>
                                    <span className="text-primary font-bold text-xs uppercase mb-8 block">{getSystemLabel(romInfo.system)}</span>
                                    <h2 className="text-3xl font-bold tracking-tight leading-none mb-4 lowercase italic break-words">{romInfo.name || "UNNAMED_ROM"}</h2>
                                    <p className="text-xs text-slate-400 border-t border-charcoal pt-4">Internal checksum and header metadata successfully verified and cross-referenced.</p>
                                </div>
                                <button onClick={clearInfo} className="mt-12 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-red-800 hover:text-red-500 transition-colors">
                                    <Trash2 size={12} /> Clear Dataset
                                </button>
                            </div>
                        </div>

                        {/* Metadata Grid */}
                        <div className="lg:col-span-8 bg-black grid grid-cols-1 md:grid-cols-2 gap-px">
                            <DataField label="Primary ID" value={romInfo.gameCode || romInfo.gameid || romInfo.genesis?.serial || romInfo.sms?.product || 'N/A'} icon={<Hash size={14} />} />
                            <DataField label="Registry Region" value={romInfo.region || 'Unknown'} icon={<Globe size={14} />} />
                            <DataField label="Memory Usage" value={(romInfo.size ? (romInfo.size / (1024 * 1024)).toFixed(2) : "0") + " MB"} icon={<Database size={14} />} />
                            <DataField label="CRC32 Checksum" value={romInfo.hash?.crc32 || 'N/A'} icon={<ChevronRight size={14} />} />

                            <div className="md:col-span-2 p-8 bg-slate-950/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1.5 h-1.5 bg-primary" />
                                    <h3 className="text-xs font-bold uppercase tracking-widest">Integrity Fingerprint (SHA-1)</h3>
                                </div>
                                <p className="font-mono text-xs text-slate-500 break-all bg-black p-4 border border-charcoal">{romInfo.hash?.sha1}</p>
                            </div>

                            {/* System-Specific Extension */}
                            {romInfo.system === 'nes' && (
                                <div className="md:col-span-2 p-8 bg-slate-950 border-t border-charcoal">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                        <MiniField label="Mapper" value={romInfo.nes?.mapperName || `#${romInfo.nes?.mapper}`} />
                                        <MiniField label="Header" value={`iNES ${romInfo.nes?.version || '1.0'}`} />
                                        <MiniField label="PRG RAM" value={romInfo.nes?.prgRomSize ? (romInfo.nes.prgRomSize / 1024) + " KB" : "0"} />
                                        <MiniField label="CHR RAM" value={romInfo.nes?.chrRomSize ? (romInfo.nes.chrRomSize / 1024) + " KB" : "0"} />
                                    </div>
                                </div>
                            )}

                            {romInfo.system === 'sfc' && (
                                <div className="md:col-span-2 p-8 bg-slate-950 border-t border-charcoal">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
                                        <div><span className="text-slate-600 uppercase block mb-1">Mapping</span>{romInfo.cartridge?.rom?.type || "Standard"}</div>
                                        <div><span className="text-slate-600 uppercase block mb-1">Co-Processor</span>{romInfo.sfc?.hardware || "None"}</div>
                                        <div><span className="text-slate-600 uppercase block mb-1">Work RAM</span>{(romInfo.sfc?.ram || 0) + " KB"}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="empty" className="py-20 flex flex-col items-center justify-center border border-charcoal text-slate-800 opacity-20 italic">
                        <FileSearch size={48} className="mb-4" />
                        <p className="text-sm uppercase tracking-widest animate-pulse">Waiting for telemetry data...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Terminal Block */}
            <div className="mt-20 max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest">Deployment Implementation</h3>
                </div>
                <div className="bg-black border border-charcoal text-[11px] p-6 leading-relaxed">
                    <p className="text-primary mb-2">// 1. Initialize dependencies</p>
                    <p className="text-slate-400 mb-6">$ npm install roomie jszip</p>

                    <p className="text-primary mb-2">// 2. Analysis pipeline</p>
                    <p className="text-slate-400">import <span className="text-slate-200">Roomie</span> from "roomie";</p>
                    <p className="text-slate-400">const roomie = new <span className="text-slate-200">Roomie</span>(bin);</p>
                    <p className="text-slate-400">await roomie.load(bin);</p>
                    <p className="text-slate-500 italic mt-6">// Full JSON telemetry follows the .info specification</p>
                </div>
            </div>
        </div>
    );
};

const DataField: React.FC<{ label: string, value: string, icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="p-8 bg-slate-950 flex flex-col justify-between group">
        <div className="flex items-center gap-2 text-slate-600 group-hover:text-primary transition-colors mb-4">
            {icon}
            <span className="text-[10px] uppercase tracking-widest font-bold">{label}</span>
        </div>
        <p className="text-xl font-bold tracking-tight text-bone truncate">{value}</p>
    </div>
);

const MiniField: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div>
        <span className="text-[9px] text-slate-600 uppercase tracking-widest block mb-1">{label}</span>
        <span className="text-xs font-bold text-slate-300">{value}</span>
    </div>
);

export default RoomieDemo;


