import { useEffect, useRef } from 'react';
import type { MotionValue } from 'framer-motion';
import type * as THREE from 'three';

interface Props {
    heroRef: React.RefObject<HTMLDivElement | null>;
    aboutRef: React.RefObject<HTMLDivElement | null>;
    expRef: React.RefObject<HTMLDivElement | null>;
    projectsRef: React.RefObject<HTMLDivElement | null>;
    ossRef: React.RefObject<HTMLDivElement | null>;
    contactRef: React.RefObject<HTMLDivElement | null>;
    heroProgress: MotionValue<number>;
    aboutProgress: MotionValue<number>;
    expProgress: MotionValue<number>;
    projectsProgress: MotionValue<number>;
    ossProgress: MotionValue<number>;
    contactProgress: MotionValue<number>;
}

interface SectionLayer {
    ref: React.RefObject<HTMLDivElement | null>;
    progress: MotionValue<number>;
    group: THREE.Group;
    update: (elapsed: number, scrollVal: number) => void;
}

const PortfolioScene: React.FC<Props> = ({
    heroRef, aboutRef, expRef, projectsRef, ossRef, contactRef,
    heroProgress, aboutProgress, expProgress, projectsProgress, ossProgress, contactProgress,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let animId: number;
        let renderer: THREE.WebGLRenderer;
        let scene: THREE.Scene;
        let camera: THREE.PerspectiveCamera;
        let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;
        const layers: SectionLayer[] = [];

        const init = async () => {
            const THREE = await import('three');

            renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.2;

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x141517);

            camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 50);
            camera.position.set(0, 0, 8);
            camera.lookAt(0, 0, 0);

            const ambient = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambient);
            const dirLight = new THREE.DirectionalLight(0x4a8eff, 1.5);
            dirLight.position.set(5, 8, 5);
            scene.add(dirLight);
            const fillLight = new THREE.DirectionalLight(0xc97a3a, 0.5);
            fillLight.position.set(-4, -2, 3);
            scene.add(fillLight);

            /* ── Hero: sweeps from left → center → right while pulsing ── */
            const initHero = () => {
                const g = new THREE.Group();
                const nodeCount = 22;
                const positions: { x: number; y: number; z: number }[] = [];
                const minDist = 1.2, radius = 4.5;
                let attempts = 0;
                while (positions.length < nodeCount && attempts < 2000) {
                    const p = { x: (Math.random() - 0.5) * radius * 2, y: (Math.random() - 0.5) * radius * 2, z: (Math.random() - 0.5) * radius * 2 };
                    if (Math.sqrt(p.x*p.x + p.y*p.y + p.z*p.z) > radius) { attempts++; continue; }
                    if (!positions.some(q => Math.sqrt((p.x - q.x)**2 + (p.y - q.y)**2 + (p.z - q.z)**2) < minDist)) positions.push(p);
                    attempts++;
                }
                const adj: number[][] = positions.map(() => []);
                for (let i = 0; i < positions.length; i++) {
                    const dists = positions.map((p, j) => ({ j, d: Math.sqrt((p.x - positions[i].x)**2 + (p.y - positions[i].y)**2 + (p.z - positions[i].z)**2) })).filter(x => x.j !== i).sort((a, b) => a.d - b.d);
                    for (let k = 0; k < Math.min(2 + Math.floor(Math.random() * 2), dists.length); k++) { const j = dists[k].j; if (!adj[i].includes(j)) { adj[i].push(j); adj[j].push(i); } }
                }
                const visited = new Set<number>(), stack = [0];
                while (stack.length > 0) { const v = stack.pop()!; if (visited.has(v)) continue; visited.add(v); for (const n of adj[v]) { if (!visited.has(n)) stack.push(n); } }
                if (visited.size < positions.length) { for (let i = 1; i < positions.length; i++) { if (!visited.has(i)) { const closest = positions.map((p, j) => ({ j, d: Math.sqrt((p.x - positions[i].x)**2 + (p.y - positions[i].y)**2 + (p.z - positions[i].z)**2) })).filter(x => visited.has(x.j)).sort((a, b) => a.d - b.d)[0]; if (closest) { adj[i].push(closest.j); adj[closest.j].push(i); visited.add(i); } } } }
                const edges: { from: number; to: number }[] = [];
                const seen = new Set<string>();
                for (let i = 0; i < adj.length; i++) { for (const j of adj[i]) { const key = Math.min(i, j) + '-' + Math.max(i, j); if (!seen.has(key)) { seen.add(key); edges.push({ from: i, to: j }); } } }
                const nodes = positions.map((p, i) => ({ position: p, isHub: adj[i].length >= 4 }));

                const meshes: THREE.Mesh[] = [];
                for (const node of nodes) {
                    const m = new THREE.Mesh(new THREE.SphereGeometry(node.isHub ? 0.18 : 0.1, 16, 16), new THREE.MeshStandardMaterial({ color: node.isHub ? 0xc97a3a : 0x4a8eff, metalness: 0.7, roughness: 0.2, emissive: node.isHub ? 0xc97a3a : 0x4a8eff, emissiveIntensity: 0.15 }));
                    m.position.set(node.position.x, node.position.y, node.position.z); g.add(m); meshes.push(m);
                }
                const epos: number[] = [];
                for (const edge of edges) { epos.push(nodes[edge.from].position.x, nodes[edge.from].position.y, nodes[edge.from].position.z, nodes[edge.to].position.x, nodes[edge.to].position.y, nodes[edge.to].position.z); }
                const egeo = new THREE.BufferGeometry(); egeo.setAttribute('position', new THREE.Float32BufferAttribute(epos, 3));
                const eMat = new THREE.LineBasicMaterial({ color: 0x4a8eff, transparent: true, opacity: 0.05 });
                g.add(new THREE.LineSegments(egeo, eMat));

                const packetCount = 20;
                const pkts: { edgeIdx: number; t: number; speed: number; dir: number }[] = [];
                const ppos = new Float32Array(packetCount * 3);
                for (let i = 0; i < packetCount; i++) {
                    const ei = Math.floor(Math.random() * edges.length);
                    pkts.push({ edgeIdx: ei, t: Math.random(), speed: 0.002 + Math.random() * 0.004, dir: Math.random() > 0.5 ? 1 : -1 });
                }
                const pgeo = new THREE.BufferGeometry(); pgeo.setAttribute('position', new THREE.Float32BufferAttribute(ppos, 3));
                const pp = new THREE.Points(pgeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
                g.add(pp);

                return { group: g, update: (elapsed: number, scrollVal: number) => {
                    const sweep = -2 + scrollVal * 4;
                    g.position.set(sweep, -scrollVal * 1.5, 0);
                    g.scale.setScalar(1 - scrollVal * 0.15);

                    const speedMul = 1 + scrollVal * 4;
                    for (let i = 0; i < pkts.length; i++) {
                        const pkt = pkts[i]; const edge = edges[pkt.edgeIdx];
                        const from = nodes[edge.from].position, to = nodes[edge.to].position;
                        pkt.t += pkt.speed * pkt.dir * speedMul;
                        if (pkt.t > 1) { pkt.t = 0; const ce = edges.map((e, idx) => ({ idx, e })).filter(({ e }) => e.from === edge.to || e.to === edge.to); if (ce.length > 0) { const n = ce[Math.floor(Math.random() * ce.length)]; pkt.edgeIdx = n.idx; pkt.dir = Math.random() > 0.5 ? 1 : -1; } }
                        else if (pkt.t < 0) { pkt.t = 1; const ce = edges.map((e, idx) => ({ idx, e })).filter(({ e }) => e.from === edge.from || e.to === edge.from); if (ce.length > 0) { const n = ce[Math.floor(Math.random() * ce.length)]; pkt.edgeIdx = n.idx; pkt.dir = Math.random() > 0.5 ? 1 : -1; } }
                        ppos[i * 3] = from.x + (to.x - from.x) * pkt.t; ppos[i * 3 + 1] = from.y + (to.y - from.y) * pkt.t; ppos[i * 3 + 2] = from.z + (to.z - from.z) * pkt.t;
                    }
                    pgeo.attributes.position.needsUpdate = true;

                    const pulse = 0.15 + Math.sin(elapsed * 1.5) * 0.1 + scrollVal * 0.4;
                    for (let i = 0; i < meshes.length; i++) { const mat = meshes[i].material as THREE.MeshStandardMaterial; mat.emissiveIntensity = nodes[i].isHub ? pulse * 0.8 : pulse * 0.5; }

                    eMat.opacity = 0.05 + scrollVal * 0.12;
                }};
            };

            /* ── About: servers fly in from alternating sides ── */
            const initAbout = () => {
                const g = new THREE.Group();
                const gSize = 6, gDiv = 16;
                const gpos: number[] = [];
                for (let i = 0; i <= gDiv; i++) { const t = (i / gDiv - 0.5) * gSize; gpos.push(t, -1, -gSize/2, t, -1, gSize/2, -gSize/2, -1, t, gSize/2, -1, t); }
                const ggeo = new THREE.BufferGeometry(); ggeo.setAttribute('position', new THREE.Float32BufferAttribute(gpos, 3));
                const gridMat = new THREE.LineBasicMaterial({ color: 0x4a8eff, transparent: true, opacity: 0.02 });
                g.add(new THREE.LineSegments(ggeo, gridMat));

                const srvPositions = [[-1.8,0.2,0],[1.5,-0.1,0.5],[-0.5,0.4,-1.2],[2.2,-0.3,-0.8],[-2.5,-0.2,1.0],[0.8,0.1,1.5],[-1.0,-0.5,-0.3],[2.8,0.3,-1.5]];
                const boxes: THREE.LineSegments[] = [];
                for (const p of srvPositions) {
                    const w = 0.5 + Math.random() * 0.3, h = 0.6 + Math.random() * 0.5;
                    const box = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, 0.4)), new THREE.LineBasicMaterial({ color: 0x4a8eff, transparent: true, opacity: 0.06 }));
                    box.position.set(p[0], p[1] + h/2, p[2]);
                    box.scale.setScalar(0);
                    g.add(box);
                    boxes.push(box);
                }

                const connMat = new THREE.LineBasicMaterial({ color: 0xc97a3a, transparent: true, opacity: 0 });
                const connPositions: number[] = [];
                for (let i = 0; i < srvPositions.length; i++) {
                    for (let j = i + 1; j < srvPositions.length; j++) {
                        const dx = srvPositions[i][0] - srvPositions[j][0];
                        const dy = (srvPositions[i][1] + 0.3) - (srvPositions[j][1] + 0.3);
                        const dz = srvPositions[i][2] - srvPositions[j][2];
                        if (Math.sqrt(dx*dx + dy*dy + dz*dz) < 4) {
                            connPositions.push(
                                srvPositions[i][0], srvPositions[i][1] + 0.3, srvPositions[i][2],
                                srvPositions[j][0], srvPositions[j][1] + 0.3, srvPositions[j][2]
                            );
                        }
                    }
                }
                if (connPositions.length > 0) {
                    const cgeo = new THREE.BufferGeometry(); cgeo.setAttribute('position', new THREE.Float32BufferAttribute(connPositions, 3));
                    g.add(new THREE.LineSegments(cgeo, connMat));
                }

                return { group: g, update: (_elapsed: number, scrollVal: number) => {
                    g.position.y = -scrollVal * 1.2;
                    gridMat.opacity = 0.02 + scrollVal * 0.04;

                    for (let i = 0; i < boxes.length; i++) {
                        const side = i % 2 === 0 ? -1 : 1;
                        const reveal = Math.min(1, Math.max(0, scrollVal * boxes.length - i * 0.5));
                        const entryX = (1 - reveal) * 4 * side;
                        boxes[i].position.x = srvPositions[i][0] + entryX;
                        boxes[i].scale.setScalar(reveal);
                    }

                    connMat.opacity = scrollVal * 0.05;
                }};
            };

            /* ── Experience: spline sweeps left→right, particles stream across ── */
            const initExp = () => {
                const g = new THREE.Group();
                const wps = [{ x:-2.5, y:-2, z:-0.3 }, { x:-1.2, y:-1, z:0.8 }, { x:0, y:0, z:-0.5 }, { x:1.2, y:1, z:0.6 }, { x:2.5, y:2, z:-0.2 }];
                function catmull(t: number) { const i = Math.floor(t), f = t - i; const p0 = wps[Math.max(0, Math.min(i-1, wps.length-1))], p1 = wps[Math.max(0, Math.min(i, wps.length-1))], p2 = wps[Math.max(0, Math.min(i+1, wps.length-1))], p3 = wps[Math.max(0, Math.min(i+2, wps.length-1))]; return { x: 0.5 * ((2*p1.x) + (-p0.x+p2.x)*f + (2*p0.x-5*p1.x+4*p2.x-p3.x)*f*f + (-p0.x+3*p1.x-3*p2.x+p3.x)*f*f*f), y: 0.5 * ((2*p1.y) + (-p0.y+p2.y)*f + (2*p0.y-5*p1.y+4*p2.y-p3.y)*f*f + (-p0.y+3*p1.y-3*p2.y+p3.y)*f*f*f), z: 0.5 * ((2*p1.z) + (-p0.z+p2.z)*f + (2*p0.z-5*p1.z+4*p2.z-p3.z)*f*f + (-p0.z+3*p1.z-3*p2.z+p3.z)*f*f*f) }; }
                const cpts: number[] = []; for (let t = 0; t <= wps.length - 1; t += 0.02) { const p = catmull(t); cpts.push(p.x, p.y, p.z); }
                const cgeo = new THREE.BufferGeometry(); cgeo.setAttribute('position', new THREE.Float32BufferAttribute(cpts, 3));
                const splineMat = new THREE.LineBasicMaterial({ color: 0x4a8eff, transparent: true, opacity: 0.04 });
                g.add(new THREE.Line(cgeo, splineMat));

                const dotMeshes: THREE.Mesh[] = [];
                const dotMaterials: THREE.MeshBasicMaterial[] = [];
                for (const wp of wps) {
                    const mat = new THREE.MeshBasicMaterial({ color: 0x4a8eff, transparent: true, opacity: 0.08 });
                    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), mat);
                    dot.position.set(wp.x, wp.y, wp.z); g.add(dot);
                    dotMeshes.push(dot);
                    dotMaterials.push(mat);
                    const gp: number[] = [wp.x, wp.y, wp.z, wp.x, -2.5, wp.z];
                    const ggeo = new THREE.BufferGeometry(); ggeo.setAttribute('position', new THREE.Float32BufferAttribute(gp, 3));
                    const guideMat = new THREE.LineBasicMaterial({ color: 0x4a8eff, transparent: true, opacity: 0 });
                    g.add(new THREE.LineSegments(ggeo, guideMat));
                    (dotMeshes as any).guideMats ??= []; (dotMeshes as any).guideMats.push(guideMat);
                }

                const activeMat = new THREE.MeshBasicMaterial({ color: 0xc97a3a, transparent: true, opacity: 0 });
                const activeDot = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), activeMat);
                activeDot.position.set(wps[0].x, wps[0].y, wps[0].z);
                g.add(activeDot);

                const pcount = 60, pdata: { t: number; speed: number; off: number; phase: number }[] = [];
                const ppos = new Float32Array(pcount * 3);
                for (let i = 0; i < pcount; i++) pdata.push({ t: Math.random() * (wps.length - 1), speed: 0.003 + Math.random() * 0.005, off: (Math.random() - 0.5) * 0.4, phase: Math.random() * Math.PI * 2 });
                const pgeo = new THREE.BufferGeometry(); pgeo.setAttribute('position', new THREE.Float32BufferAttribute(ppos, 3));
                const pp = new THREE.Points(pgeo, new THREE.PointsMaterial({ color: 0x4a8eff, size: 0.025, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, depthWrite: false }));
                g.add(pp);

                return { group: g, update: (elapsed: number, scrollVal: number) => {
                    const sweepX = -2 + scrollVal * 4;
                    g.position.set(sweepX, -scrollVal * 1.2, 0);

                    const progIx = scrollVal * (wps.length - 1);
                    const pos = catmull(progIx);
                    activeDot.position.set(pos.x, pos.y, pos.z);
                    activeMat.opacity = 0.1 + scrollVal * 0.4;

                    for (let i = 0; i < wps.length; i++) {
                        const dist = Math.abs(i - progIx);
                        const baseOp = 0.04 + (1 - Math.min(dist, 1)) * 0.25;
                        dotMaterials[i].opacity = scrollVal > 0.01 ? baseOp : 0.04;
                        const guideMat = (dotMeshes as any).guideMats[i];
                        guideMat.opacity = scrollVal > 0.5 ? (scrollVal - 0.5) * 0.06 : 0;
                    }

                    splineMat.opacity = 0.03 + scrollVal * 0.05;

                    const speedMul = 0.5 + scrollVal * 3;
                    for (let i = 0; i < pcount; i++) {
                        const p = pdata[i]; p.t += p.speed * speedMul;
                        if (p.t >= wps.length - 1) p.t = 0;
                        const ppPos = catmull(p.t);
                        const spread = 0.05 + scrollVal * 0.25;
                        ppos[i*3] = ppPos.x + Math.sin(p.t * 3 + p.phase) * spread;
                        ppos[i*3+1] = ppPos.y + Math.cos(p.t * 3 + p.phase * 0.7) * spread * 0.5;
                        ppos[i*3+2] = ppPos.z + Math.sin(p.t * 2 + p.phase * 1.3) * spread * 0.3;
                    }
                    pgeo.attributes.position.needsUpdate = true;
                    (pp.material as THREE.PointsMaterial).opacity = 0.1 + scrollVal * 0.25;
                }};
            };

            /* ── Projects: each panel flies in from a different direction ── */
            const initProjects = () => {
                const g = new THREE.Group();
                const pd = [{x:-2.0,y:0.8,z:0,w:2.0,h:1.4,ry:0.1},{x:1.8,y:1.0,z:-0.5,w:1.6,h:1.2,ry:-0.08},{x:-1.5,y:-1.2,z:0.3,w:1.8,h:1.0,ry:0.06},{x:2.2,y:-0.8,z:-0.2,w:1.4,h:1.4,ry:-0.12}];
                const phases: number[] = [];
                const oy: number[] = [];
                const planes: THREE.Mesh[] = [];
                const entryDirs = [[-1, 0.8], [1, -0.5], [-0.6, -1], [0.7, 0.6]];

                for (let i = 0; i < pd.length; i++) {
                    const d = pd[i];
                    const cv = document.createElement('canvas'); cv.width = 128; cv.height = 96; const ctx = cv.getContext('2d')!;
                    ctx.fillStyle = '#0d1117'; ctx.fillRect(0, 0, 128, 96);
                    ctx.strokeStyle = '#1a3050'; ctx.lineWidth = 0.5;
                    for (let x = 6; x < 128; x += 10) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 96); ctx.stroke(); }
                    for (let y = 6; y < 96; y += 10) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(128, y); ctx.stroke(); }
                    ctx.fillStyle = '#1a3a6f'; ctx.fillRect(8, 8, 35, 20); ctx.fillStyle = '#2a4a8f'; ctx.fillRect(50, 8, 28, 20); ctx.fillStyle = '#0f2545'; ctx.fillRect(85, 8, 35, 20);
                    ctx.fillStyle = '#1a3050'; ctx.fillRect(8, 36, 112, 14);
                    ctx.fillStyle = '#1a3a6f'; ctx.fillRect(8, 58, 50, 14); ctx.fillStyle = '#2a4a8f'; ctx.fillRect(65, 58, 55, 14);
                    const tex = new THREE.CanvasTexture(cv); tex.needsUpdate = true;
                    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
                    const m = new THREE.Mesh(new THREE.PlaneGeometry(d.w, d.h), mat);
                    m.position.set(d.x, d.y, d.z); m.rotation.set(0.5, d.ry, 0.02); g.add(m);
                    planes.push(m);
                    phases.push(Math.random() * Math.PI * 2);
                    oy.push(d.y);
                }

                return { group: g, update: (elapsed: number, scrollVal: number) => {
                    g.position.y = -scrollVal * 1.2;
                    for (let i = 0; i < planes.length; i++) {
                        const reveal = Math.min(1, Math.max(0, scrollVal * planes.length - i * 0.5));
                        const dir = entryDirs[i];
                        const entryX = (1 - reveal) * 3.5 * dir[0];
                        const entryY = (1 - reveal) * 2.5 * dir[1];
                        planes[i].position.x = pd[i].x + entryX;
                        planes[i].position.y = pd[i].y + entryY + Math.sin(elapsed * 0.15 + phases[i]) * 0.04 * reveal;
                        const mat = planes[i].material as THREE.MeshBasicMaterial;
                        mat.opacity = reveal * 0.14;
                        planes[i].rotation.x = (1 - reveal) * 1.2 + reveal * 0.04;
                    }
                }};
            };

            /* ── OSS: stars stream in from top-right, form cluster, exit bottom-left ── */
            const initOSS = () => {
                const g = new THREE.Group();
                const sc = 150;
                const sdata: { x: number; y: number; z: number; r: number; theta: number; phi: number }[] = [];
                const spos = new Float32Array(sc * 3);
                for (let i = 0; i < sc; i++) {
                    const r = 1.5 + Math.random() * 3.5, theta = Math.random() * Math.PI * 2, phi = Math.acos(2*Math.random() - 1);
                    const x = r * Math.sin(phi) * Math.cos(theta), y = r * Math.cos(phi) * 0.8, z = r * Math.sin(phi) * Math.sin(theta);
                    spos[i*3] = x; spos[i*3+1] = y; spos[i*3+2] = z;
                    sdata.push({ x, y, z, r, theta, phi });
                }
                const sgeo = new THREE.BufferGeometry(); sgeo.setAttribute('position', new THREE.Float32BufferAttribute(spos, 3));
                const sMat = new THREE.PointsMaterial({ color: 0x4a8eff, size: 0.04, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true });
                g.add(new THREE.Points(sgeo, sMat));

                return { group: g, update: (elapsed: number, scrollVal: number) => {
                    const driftX = 2.5 - scrollVal * 5;
                    const driftY = 1.5 - scrollVal * 3;
                    g.position.set(driftX, driftY - scrollVal * 1.2, 0);
                    g.scale.setScalar(1 + scrollVal * 0.6);

                    const posArr = sgeo.attributes.position.array as Float32Array;
                    const spiral = scrollVal * 0.5;
                    for (let i = 0; i < sc; i++) {
                        const breathe = 1 + Math.sin(elapsed * 0.2 + i * 0.3) * 0.1;
                        const bx = sdata[i].x * breathe, by = sdata[i].y * breathe, bz = sdata[i].z * breathe;
                        const ang = Math.atan2(bz, bx) + spiral * 2;
                        const rad = Math.sqrt(bx * bx + bz * bz);
                        posArr[i*3] = rad * Math.cos(ang) * (1 + spiral * by * 0.2);
                        posArr[i*3+1] = by * (1 - spiral * 0.3);
                        posArr[i*3+2] = rad * Math.sin(ang) * (1 + spiral * by * 0.2);
                    }
                    sgeo.attributes.position.needsUpdate = true;
                    sMat.opacity = 0.15 + scrollVal * 0.35;
                    sMat.size = 0.03 + scrollVal * 0.04;
                }};
            };

            /* ── Contact: orbital system drifts right while rings spin up & particles converge ── */
            const initContact = () => {
                const g = new THREE.Group();
                const glow = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color: 0xc97a3a, transparent: true, opacity: 0.15 }));
                g.add(glow);
                const glow2 = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 12), new THREE.MeshBasicMaterial({ color: 0xc97a3a, transparent: true, opacity: 0.05 }));
                g.add(glow2);

                const rings: THREE.Mesh[] = [];
                for (let i = 0; i < 3; i++) {
                    const r = 0.5 + i * 0.35;
                    const ring = new THREE.Mesh(new THREE.RingGeometry(r - 0.015, r, 32), new THREE.MeshBasicMaterial({ color: i === 1 ? 0x4a8eff : 0xc97a3a, transparent: true, opacity: 0.04, side: THREE.DoubleSide, depthWrite: false }));
                    ring.rotation.x = Math.PI/3 + i*0.25; ring.rotation.z = i*0.3; g.add(ring);
                    rings.push(ring);
                }

                const pc = 100;
                const pdata: { ox: number; oy: number; oz: number; speed: number; phase: number }[] = [];
                const ppos = new Float32Array(pc * 3);
                for (let i = 0; i < pc; i++) {
                    const r = 1.5 + Math.random() * 3, a = Math.random() * Math.PI * 2, h = (Math.random() - 0.5) * 3.5;
                    pdata.push({ ox: Math.cos(a)*r, oy: h, oz: Math.sin(a)*r, speed: 0.08 + Math.random()*0.2, phase: Math.random()*Math.PI*2 });
                    ppos[i*3] = Math.cos(a)*r; ppos[i*3+1] = h; ppos[i*3+2] = Math.sin(a)*r;
                }
                const pgeo = new THREE.BufferGeometry(); pgeo.setAttribute('position', new THREE.Float32BufferAttribute(ppos, 3));
                const pMat = new THREE.PointsMaterial({ color: 0xc97a3a, size: 0.035, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true });
                g.add(new THREE.Points(pgeo, pMat));

                return { group: g, update: (elapsed: number, scrollVal: number) => {
                    const drift = -1.5 + scrollVal * 3;
                    g.position.set(drift, -scrollVal * 1.2, 0);

                    const converge = scrollVal * 0.7;
                    for (let i = 0; i < pc; i++) {
                        const p = pdata[i]; const w = Math.sin(elapsed * p.speed + p.phase) * 0.2;
                        const dist = Math.sqrt(p.ox*p.ox + p.oy*p.oy + p.oz*p.oz);
                        ppos[i*3] = p.ox * (1 - converge) + w * p.ox / (1 + dist);
                        ppos[i*3+1] = p.oy * (1 - converge * 0.4) + w * 0.3;
                        ppos[i*3+2] = p.oz * (1 - converge) + w * p.oz / (1 + dist);
                    }
                    pgeo.attributes.position.needsUpdate = true;
                    pMat.opacity = 0.15 + scrollVal * 0.35;

                    const pulse = 0.15 + Math.sin(elapsed * 0.5) * 0.08 + scrollVal * 0.15;
                    (glow.material as THREE.Material).opacity = pulse;
                    (glow2.material as THREE.Material).opacity = pulse * 0.3;
                    glow.scale.setScalar(1 + Math.sin(elapsed * 0.3) * 0.15 + scrollVal * 0.6);

                    for (let i = 0; i < 3; i++) {
                        const ring = rings[i];
                        (ring.material as THREE.MeshBasicMaterial).opacity = 0.04 + scrollVal * 0.1;
                        ring.rotation.x += 0.004 * (i + 1) * (1 + scrollVal * 2);
                        ring.rotation.z += 0.003 * (i + 1) * (1 + scrollVal * 2);
                    }
                }};
            };

            const layerDefs: { ref: typeof heroRef; progress: MotionValue<number>; init: () => { group: THREE.Group; update: (elapsed: number, scrollVal: number) => void } }[] = [
                { ref: heroRef, progress: heroProgress, init: initHero },
                { ref: aboutRef, progress: aboutProgress, init: initAbout },
                { ref: expRef, progress: expProgress, init: initExp },
                { ref: projectsRef, progress: projectsProgress, init: initProjects },
                { ref: ossRef, progress: ossProgress, init: initOSS },
                { ref: contactRef, progress: contactProgress, init: initContact },
            ];

            for (const ld of layerDefs) {
                const { group, update } = ld.init();
                group.visible = false;
                scene.add(group);
                layers.push({ ref: ld.ref as React.RefObject<HTMLDivElement | null>, progress: ld.progress, group, update });
            }

            window.addEventListener('mousemove', onMouseMove);
            animate();
        };

        function onMouseMove(e: MouseEvent) {
            targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
            targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        }

        function animate() {
            animId = requestAnimationFrame(animate);
            const elapsed = performance.now() / 1000;

            mouseX += (targetMouseX - mouseX) * 0.03;
            mouseY += (targetMouseY - mouseY) * 0.03;

            let totalVisible = 0;
            for (const layer of layers) {
                const el = layer.ref.current;
                if (!el) { layer.group.visible = false; continue; }
                const rect = el.getBoundingClientRect();
                const viewH = window.innerHeight;
                const overlap = Math.max(0, Math.min(rect.bottom, viewH) - Math.max(rect.top, 0));
                const visibleRatio = overlap / Math.min(viewH, rect.height);
                const wasVisible = layer.group.visible;

                if (visibleRatio > 0.3 && !wasVisible) {
                    layer.group.visible = true;
                    const g = layer.group;
                    g.scale.setScalar(0.8);
                    g.scale.setScalar(1);
                } else if (visibleRatio <= 0.1 && wasVisible) {
                    layer.group.visible = false;
                }

                if (visibleRatio > 0.3 || wasVisible) {
                    totalVisible++;
                    const scrollVal = Math.min(Math.max(layer.progress.get(), 0), 1);
                    layer.group.rotation.x = mouseY * 0.08 + Math.sin(elapsed * 0.06) * 0.04;
                    layer.group.rotation.y = mouseX * 0.15 + elapsed * 0.05;
                    layer.update(elapsed, scrollVal);
                }
            }

            if (totalVisible > 0) {
                renderer.render(scene, camera);
            }
        }

        const onResize = () => {
            if (!camera || !renderer) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);
        init();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            if (renderer) renderer.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
};

export default PortfolioScene;
