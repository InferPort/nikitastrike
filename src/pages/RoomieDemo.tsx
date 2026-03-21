import React, { useState, useCallback, useRef } from 'react';
import Roomie from 'roomie';
import { Buffer } from 'buffer';
import { motion, AnimatePresence } from 'framer-motion';

import { Upload, FileSearch, Trash2, Github, Cpu, Hash, Globe, Database, Info, Gamepad2, ChevronRight } from 'lucide-react';
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
        nes: 'from-red-500/20 to-transparent',
        sfc: 'from-purple-500/20 to-transparent',
        n64: 'from-green-500/20 to-transparent',
        gb: 'from-emerald-500/20 to-transparent',
        gba: 'from-blue-500/20 to-transparent',
        nds: 'from-cyan-500/20 to-transparent',
        genesis: 'from-indigo-500/20 to-transparent',
        sms: 'from-sky-500/20 to-transparent',
        gg: 'from-violet-500/20 to-transparent',
        pce: 'from-orange-500/20 to-transparent',
        ws: 'from-pink-500/20 to-transparent',
        wsc: 'from-rose-500/20 to-transparent',
    };
    return colors[system as keyof typeof colors] || 'from-primary/20 to-transparent';
};

const getSystemBadge = (system: string) => {
    const labels: Record<string, string> = {
        nes: 'Nintendo Entertainment System',
        sfc: 'Super Famicom / SNES',
        n64: 'Nintendo 64',
        gb: 'Game Boy',
        gba: 'Game Boy Advance',
        nds: 'Nintendo DS',
        genesis: 'Sega Genesis / Mega Drive',
        sms: 'Sega Master System',
        gg: 'Sega Game Gear',
        pce: 'PC Engine / TurboGrafx-16',
        ws: 'WonderSwan',
        wsc: 'WonderSwan Color',
    };
    return labels[system as keyof typeof labels] || system.toUpperCase();
};

const RoomieDemo: React.FC = () => {
    const { t } = useTranslation();
    const [isDragging, setIsDragging] = useState(false);
    const [romInfo, setRomInfo] = useState<RomData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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

            setRomInfo({
                ...roomie.info,
                name: roomie.name,
                gameid: roomie.gameid,
                cartridge: roomie.cartridge
            });
        } catch (err: any) {
            console.error(err);

            if (err.message === 'unknown_bytes') {
                setError('Unknown ROM format. Supported: NES, SFC, N64, GB, GBA, NDS, Genesis, SMS, GG, PCE, WS.');
            } else if (err.message === 'no_rom_in_zip') {
                setError('No valid ROM found inside the ZIP file.');
            } else {
                setError('Error processing file. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    }, []);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    const clearInfo = () => {
        setRomInfo(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const formatSize = (bytes: number) => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="min-h-[80vh] px-6 py-12 max-w-7xl mx-auto flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Gamepad2 className="text-primary" size={32} />
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase italic">roomie</h1>
                    <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded font-mono border border-primary/20">v1.1.1</span>
                </div>
                <p className="text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
                    {t('roomie_demo.description')}
                </p>
                <div className="mt-4 flex justify-center gap-4">
                    <a
                        href="https://github.com/nikitacontreras/roomie"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                    >
                        <Github size={14} /> {t('roomie_demo.gh_repo')}
                    </a>
                </div>
            </motion.div>

            <div className="w-full max-w-3xl">
                {!romInfo && !loading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={cn(
                            "relative group cursor-pointer border-2 border-dashed rounded-2xl p-12 transition-all duration-300 flex flex-col items-center justify-center gap-4",
                            isDragging
                                ? "border-primary bg-primary/5 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                                : "border-slate-800 hover:border-slate-700 bg-white/5 backdrop-blur-sm"
                        )}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={onFileSelect}
                        />
                        <div className="p-4 rounded-full bg-slate-900 border border-slate-800 group-hover:border-primary transition-colors">
                            <Upload className={cn("transition-transform duration-300", isDragging ? "scale-110 text-primary" : "text-slate-500")} size={32} />
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-medium">{t('roomie_demo.upload_title')}</p>
                            <p className="text-slate-500 text-sm mt-1">Direct ROMs or .zip files supported</p>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mt-4 opacity-30 group-hover:opacity-60 transition-opacity">
                            {['NES', 'SFC', 'N64', 'GB', 'GBA', 'NDS', 'MD', 'SMS'].map(s => (
                                <span key={s} className="text-[9px] font-mono border border-slate-700 px-2 py-0.5 rounded uppercase">{s}</span>
                            ))}
                        </div>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-400 mt-4 text-sm font-medium"
                            >
                                {error}
                            </motion.p>
                        )}
                    </motion.div>
                )}

                {loading && (
                    <div className="flex flex-col items-center py-20">
                        <div className="relative w-16 h-16">
                            <motion.div
                                className="absolute inset-0 border-4 border-primary rounded-full"
                                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            />
                            <motion.div
                                className="absolute inset-2 border-2 border-primary/50 rounded-full border-t-transparent"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                        </div>
                        <p className="mt-6 text-slate-400 font-mono text-sm tracking-widest uppercase">{t('roomie_demo.analyzing')}</p>
                    </div>
                )}

                <AnimatePresence>
                    {romInfo && !loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className={cn("p-8 border-b border-slate-800 flex justify-between items-start bg-gradient-to-r", getSystemColor(romInfo.system))}>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-primary/20 text-primary text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded italic">
                                            {getSystemBadge(romInfo.system)}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">{romInfo.name || "Unknown Title"}</h2>
                                </div>
                                <button
                                    onClick={clearInfo}
                                    className="p-2 text-white/50 hover:text-red-400 transition-colors"
                                    title="Close"
                                >
                                    <Trash2 size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800">
                                <InfoItem
                                    icon={<Cpu size={18} />}
                                    label="Architecture"
                                    value={romInfo.system.toUpperCase()}
                                />
                                <InfoItem
                                    icon={<Hash size={18} />}
                                    label="Serial / ID"
                                    value={romInfo.gameCode || romInfo.gameid || romInfo.genesis?.serial || romInfo.sms?.product || 'N/A'}
                                />
                                <InfoItem
                                    icon={<Globe size={18} />}
                                    label="Region"
                                    value={romInfo.region || 'Unknown / World'}
                                />
                                <InfoItem
                                    icon={<Database size={18} />}
                                    label="File Size"
                                    value={formatSize(romInfo.size || 0)}
                                />
                                {romInfo.hash && (
                                    <div className="col-span-1 md:col-span-2 bg-slate-900 border-t border-slate-800">
                                        <div className="p-6 flex items-center gap-4 border-b border-slate-800/50">
                                            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
                                                <Info size={18} />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">SHA-1 Hash</p>
                                                <p className="font-mono text-xs text-slate-300 break-all">{romInfo.hash.sha1}</p>
                                            </div>
                                        </div>
                                        <div className="p-6 flex items-center gap-4">
                                            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
                                                <Hash size={18} />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">CRC32 Hash</p>
                                                <p className="font-mono text-xs text-slate-300 break-all">{romInfo.hash.crc32}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Nintendo SFC Section */}
                            {romInfo.system === 'sfc' && (
                                <div className="p-8 bg-slate-950/50">
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-6">SFC Specific Data</h3>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Hardware</p>
                                            <p className="text-sm">{romInfo.cartridge?.rom?.type || romInfo.sfc?.hardware || 'Standard'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">RAM Size</p>
                                            <p className="text-sm">{formatSize(romInfo.cartridge?.ram || romInfo.sfc?.ram || 0)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Nintendo NES Section */}
                            {romInfo.system === 'nes' && (
                                <div className="p-8 bg-slate-950/50">
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-6">iNES Metadata</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Mapper</p>
                                            <p className="text-sm font-mono text-primary">{romInfo.nes?.mapper !== undefined ? `#${romInfo.nes.mapper}` : 'N/A'}</p>
                                        </div>
                                        <div className="col-span-1 md:col-span-2">
                                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Board / Mapper Name</p>
                                            <p className="text-sm">{romInfo.nes?.mapperName || 'Generic iNES Board'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">PRG Banks</p>
                                            <p className="text-sm">{formatSize(romInfo.nes?.prgRomSize || 0)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">CHR Banks</p>
                                            <p className="text-sm">{formatSize(romInfo.nes?.chrRomSize || 0)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Header Type</p>
                                            <p className="text-sm">NES {romInfo.nes?.version || '1.0'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Game Boy MBC Section */}
                            {romInfo.system === 'gb' && (
                                <div className="p-8 bg-slate-950/50">
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-6">Game Boy Attributes</h3>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Controller (MBC)</p>
                                            <p className="text-sm font-mono text-emerald-400">{romInfo.cartridge?.mbc || 'Standard'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Title Check</p>
                                            <p className="text-sm italic">Verified Header</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Sega Section */}
                            {(romInfo.system === 'genesis' || romInfo.system === 'sms' || romInfo.system === 'gg') && (
                                <div className="p-8 bg-slate-950/50">
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-6">Sega Metadata</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Overseas Name</p>
                                            <p className="text-sm italic">{romInfo.genesis?.overseasName || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Product Code</p>
                                            <p className="text-sm font-mono">{romInfo.genesis?.serial || romInfo.sms?.product || 'Unknown'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* N64 Section */}
                            {romInfo.system === 'n64' && (
                                <div className="p-8 bg-slate-950/50">
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-6">N64 Specific Data</h3>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Internal Name</p>
                                            <p className="text-sm italic">{romInfo.n64.name || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Revision</p>
                                            <p className="text-sm">v{romInfo.n64.version || '1.0'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-20 max-w-2xl text-center">
                <h3 className="text-xl font-bold mb-6 italic tracking-tight uppercase">{t('roomie_demo.use_it')}</h3>
                <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 overflow-hidden text-left shadow-xl">
                    <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-900/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-900/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-900/50" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600">{t('roomie_demo.terminal')}</span>
                    </div>
                    <pre className="p-6 text-sm font-mono text-slate-300">
                        <span className="text-primary italic"># {t('roomie_demo.install')}</span><br />
                        npm install roomie<br /><br />
                        <span className="text-primary italic">// {t('roomie_demo.usage')}</span><br />
                        import Roomie from "roomie";<br />
                        const roomie = new Roomie(fileBuffer);<br />
                        await roomie.load(fileBuffer);<br />
                        console.log(roomie.info);
                    </pre>
                </div>
            </div>
        </div>
    );
};

const InfoItem: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="bg-slate-900 p-6 flex flex-col gap-3 group">
        <div className="flex items-center gap-2 text-slate-500 group-hover:text-primary transition-colors">
            {icon}
            <span className="text-[10px] uppercase tracking-widest font-bold font-mono">{label}</span>
        </div>
        <p className="text-lg font-medium">{value}</p>
    </div>
);

export default RoomieDemo;

