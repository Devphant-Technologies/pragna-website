"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/ui/SectionHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ProcessNode = {
  id: string;
  name: string;
  color: string;
  angle: number;
  ring: 1 | 2;
};

const PROCESSES: ProcessNode[] = [
  { id: "chlorination", name: "Chlorination", color: "#7EC242", angle: 0, ring: 1 },
  { id: "coupling", name: "Coupling Reaction", color: "#94A3B8", angle: 60, ring: 1 },
  { id: "amination", name: "Amination", color: "#A3E635", angle: 120, ring: 1 },
  { id: "condensation", name: "Condensation Reaction", color: "#38BDF8", angle: 180, ring: 1 },
  { id: "grignard", name: "Grignard Reactions", color: "#F472B6", angle: 240, ring: 1 },
  { id: "hydrogenation", name: "Hydrogenation Reaction", color: "#0575D7", angle: 300, ring: 1 },
  { id: "bromination", name: "Bromination", color: "#FB7185", angle: 30, ring: 2 },
  { id: "oxidation", name: "Oxidation", color: "#84CC16", angle: 90, ring: 2 },
  { id: "friedel", name: "Friedel-Crafts Alkylation", color: "#FB923C", angle: 150, ring: 2 },
  { id: "photo", name: "Photochemical Reactions", color: "#BEF264", angle: 210, ring: 2 },
  { id: "catalytic", name: "Catalytic Reaction", color: "#CBD5E1", angle: 270, ring: 2 },
  { id: "nitration", name: "Nitration", color: "#29B6F6", angle: 330, ring: 2 },
];

const RING_RADIUS = { 1: 24, 2: 40 };

function polarToPercent(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
  };
}

function formatIndian(value: number) {
  const str = Math.round(value).toString();
  const last3 = str.slice(-3);
  const rest = str.slice(0, -3);
  return rest ? `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${last3}` : last3;
}

export default function ManufacturingInfographic() {
  const sectionRef = useRef<HTMLElement>(null);
  const infraRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [areaValue, setAreaValue] = useState(0);
  const [volumeValue, setVolumeValue] = useState(0);

  const nodes = useMemo(
    () =>
      PROCESSES.map((process) => ({
        ...process,
        ...polarToPercent(process.angle, RING_RADIUS[process.ring]),
      })),
    []
  );

  const hub = { x: 50, y: 50 };
  const inner = nodes.filter((n) => n.ring === 1);
  const outer = nodes.filter((n) => n.ring === 2);

  const links = useMemo(() => {
    const hubLinks = nodes.map((n) => ({ from: hub, to: n, strong: n.ring === 1 }));
    const ringLinks = inner.map((innerNode, i) => ({
      from: innerNode,
      to: outer[i],
      strong: false,
    }));
    const neighborLinks = inner.map((innerNode, i) => ({
      from: innerNode,
      to: inner[(i + 1) % inner.length],
      strong: false,
    }));
    return [...hubLinks, ...ringLinks, ...neighborLinks];
  }, [nodes]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-node",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        }
      );

      const obj = { area: 0, volume: 0 };
      gsap.to(obj, {
        area: 300000,
        volume: 2000,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: infraRef.current, start: "top 80%" },
        onUpdate: () => {
          setAreaValue(obj.area);
          setVolumeValue(obj.volume);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const active = nodes.find((n) => n.id === activeId) ?? null;

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-[#07111f] py-20 md:py-28"
      >
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(41,182,246,0.55) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#29B6F6]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-[#7EC242]/10 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-16">
            <SectionHeader
              badge="Plant Chemistry"
              title="Process"
              highlight="Capabilities"
              subtitle="A live reaction map of the core chemistries running across our manufacturing network — hover a node to trace the pathway."
              align="center"
              light
            />
          </div>

          {/* Mobile / tablet honeycomb */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
            {nodes.map((node) => (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveId(activeId === node.id ? null : node.id)}
                className="process-node min-h-[88px] rounded-2xl border border-white/10 px-3 py-4 text-center text-[13px] font-semibold leading-snug text-white opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform duration-300"
                style={{
                  background: `linear-gradient(160deg, ${node.color} 0%, ${node.color}cc 100%)`,
                  transform: activeId === node.id ? "scale(1.03)" : undefined,
                }}
              >
                {node.name}
              </button>
            ))}
          </div>

          {/* Desktop constellation */}
          <div className="relative mx-auto hidden aspect-[1.35/1] w-full max-w-5xl overflow-visible lg:block">
            <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {links.map((link, i) => {
                const fromId = "id" in link.from ? String((link.from as { id?: string }).id ?? "") : "";
                const toId = "id" in link.to ? String((link.to as { id?: string }).id ?? "") : "";
                const lit = !active || fromId === active.id || toId === active.id;
                return (
                  <line
                    key={i}
                    x1={link.from.x}
                    y1={link.from.y}
                    x2={link.to.x}
                    y2={link.to.y}
                    stroke={lit ? "rgba(126,194,66,0.55)" : "rgba(148,163,184,0.18)"}
                    strokeWidth={link.strong ? 0.35 : 0.18}
                    className="transition-all duration-300"
                  />
                );
              })}
              {nodes.map((node) => (
                <circle
                  key={`${node.id}-dot`}
                  cx={node.x}
                  cy={node.y}
                  r="0.7"
                  fill={node.color}
                  opacity={0.9}
                />
              ))}
            </svg>

            <div
              className="process-node absolute z-20 flex h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#7EC242]/40 bg-[#0B1E36] text-center opacity-0 shadow-[0_0_40px_rgba(126,194,66,0.25)]"
              style={{ left: "50%", top: "50%" }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7EC242]">
                Core Map
              </span>
              <span className="mt-1 px-3 text-sm font-semibold leading-tight text-white">
                {active ? active.name : "12 Processes"}
              </span>
            </div>

            {nodes.map((node) => (
              <button
                key={node.id}
                type="button"
                onMouseEnter={() => setActiveId(node.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(node.id)}
                onBlur={() => setActiveId(null)}
                className="process-node absolute z-10 w-[132px] -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 opacity-0"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <span
                  className="flex h-[118px] w-[132px] items-center justify-center px-3 text-center text-[12px] font-semibold leading-snug text-[#07111f] shadow-[0_12px_24px_rgba(0,0,0,0.28)] transition-transform duration-300"
                  style={{
                    background: node.color,
                    clipPath:
                      "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
                    transform: activeId === node.id ? "scale(1.08)" : "scale(1)",
                    filter:
                      activeId && activeId !== node.id
                        ? "saturate(0.45) brightness(0.75)"
                        : "none",
                  }}
                >
                  {node.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={infraRef}
        className="relative overflow-hidden bg-[#90D5FF] py-20 md:py-24"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(13,13,57,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,57,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-16">
            <SectionHeader
              badge="Plant Systems"
              title="Site"
              highlight="Infrastructure"
              subtitle="A schematic view of land, reactor volume, equipment range and utility envelope — read as a plant dashboard, not a spec sheet."
              align="center"
            />
          </div>

          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-[28px] bg-[#07111f] p-8 text-white shadow-xl">
              <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full border border-white/10" />
              <div className="absolute -right-2 top-10 h-20 w-20 rounded-full border border-[#7EC242]/30" />
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7EC242]">
                Total Area
              </p>
              <p className="mt-3 font-sans text-4xl font-extrabold tabular-nums md:text-5xl">
                {formatIndian(areaValue)}
                <span className="ml-2 text-lg font-medium text-white/60">Sq. mtr</span>
              </p>
              <p className="mt-2 text-sm text-white/55">3,00,000 sq. mtr manufacturing footprint</p>
            </div>

            <div className="relative overflow-hidden rounded-[28px] bg-[#07111f] p-8 text-white shadow-xl">
              <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-[#29B6F6]/10 blur-2xl" />
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#29B6F6]">
                Capacity in Volume
              </p>
              <p className="mt-3 font-sans text-4xl font-extrabold tabular-nums md:text-5xl">
                {Math.round(volumeValue).toLocaleString()}
                <span className="ml-2 text-lg font-medium text-white/60">kl</span>
              </p>
              <p className="mt-2 text-sm text-white/55">2,000 kl installed reactor volume</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="rounded-[28px] bg-white/70 p-6 shadow-lg backdrop-blur-sm md:p-8 lg:col-span-7">
              <h3 className="mb-8 text-xs font-bold uppercase tracking-[0.22em] text-[#0D0D39]">
                Equipment Capacity
              </h3>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                <ReactorTank
                  label="SSR"
                  range="4 kl – 12.5 kl"
                  fill={62}
                  color="from-[#0575D7] to-[#29B6F6]"
                />
                <ReactorTank
                  label="GLR"
                  range="3 kl – 20 kl"
                  fill={100}
                  color="from-[#7EC242] to-[#9AD95C]"
                />
                <ReactorTank
                  label="Hydrogenation"
                  range="4 kl – 10 kl"
                  fill={50}
                  color="from-[#FB923C] to-[#F472B6]"
                  badges={["20 Bar", "40 Bar"]}
                />
              </div>
            </div>

            <div className="rounded-[28px] bg-white/70 p-6 shadow-lg backdrop-blur-sm md:p-8 lg:col-span-5">
              <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-[#0D0D39]">
                Utility Envelope
              </h3>
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                −30°C to 250°C
              </p>
              <div className="relative mb-10 h-3 rounded-full bg-gradient-to-r from-[#38BDF8] via-[#7EC242] to-[#FB923C]">
                {[
                  { pos: 0, label: "−30°C" },
                  { pos: 14, label: "10°C" },
                  { pos: 57, label: "130°C" },
                  { pos: 100, label: "250°C" },
                ].map((tick) => (
                  <span
                    key={tick.label}
                    className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#0D0D39] shadow"
                    style={{ left: `${tick.pos}%` }}
                    title={tick.label}
                  />
                ))}
              </div>
              <ul className="space-y-3">
                {[
                  { name: "Chilling", value: "Up to −30°C" },
                  { name: "Cooling", value: "Up to 10°C" },
                  { name: "Steam", value: "130°C (LPS)" },
                  { name: "Thermic Heater", value: "Up to 250°C" },
                  { name: "Nitrogen", value: "Inert blanketing" },
                ].map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between rounded-2xl bg-[#07111f] px-4 py-3 text-sm text-white"
                  >
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-xs font-medium text-[#9AD95C]">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ReactorTank({
  label,
  range,
  fill,
  color,
  badges,
}: {
  label: string;
  range: string;
  fill: number;
  color: string;
  badges?: string[];
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4 h-44 w-[72px] overflow-hidden rounded-t-[40px] rounded-b-xl border-[3px] border-[#0D0D39]/20 bg-[#e8f4ff]">
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${color} transition-all duration-1000`}
          style={{ height: `${fill}%` }}
        />
        <div className="absolute inset-x-2 top-3 h-2 rounded-full bg-white/50" />
        <div className="absolute inset-x-0 bottom-0 h-2 bg-[#0D0D39]/20" />
      </div>
      <p className="text-sm font-bold text-[#0D0D39]">{label}</p>
      <p className="mt-1 text-xs font-medium text-slate-600">{range}</p>
      {badges && (
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-[#0D0D39] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
            >
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
