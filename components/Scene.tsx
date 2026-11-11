import { useId, type CSSProperties } from "react";

const DAY = {
    "--wall": "#f1f0ea",
    "--arch": "#d9c7a2",
    "--floor": "#b9a98c",
    "--sofa": "#2c5b5c",
    "--lamp": "#a9742c",
    "--sky1": "#9cc4e6",
    "--sky2": "#f6e2b8",
} as CSSProperties;

const NIGHT = {
    "--wall": "#17383c",
    "--arch": "#c79a4f",
    "--floor": "#0f2326",
    "--sofa": "#6e8f84",
    "--lamp": "#f1c76e",
    "--sky1": "#27506e",
    "--sky2": "#e9a45c",
} as CSSProperties;

type Props = { night?: boolean; className?: string };

/** Placeholder illustration. Swap for <Image> with your project photos. */
export default function Scene({ night = false, className }: Props) {
    const gid = `sky-${useId().replace(/:/g, "")}`;

    return (
        <svg
            className={className}
            style={night ? NIGHT : DAY}
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--sky1)" />
                    <stop offset="1" stopColor="var(--sky2)" />
                </linearGradient>
            </defs>
            <rect width="800" height="600" fill="var(--wall)" />
            <path
                d="M290 500V260a110 110 0 0 1 220 0V500Z"
                fill={`url(#${gid})`}
                stroke="var(--arch)"
                strokeWidth="14"
            />
            <g fill="var(--wall)" opacity=".85">
                <rect x="330" y="330" width="22" height="170" />
                <rect x="360" y="290" width="18" height="210" />
                <path d="M400 500V250l5-70 5 70v250Z" />
                <rect x="425" y="340" width="26" height="160" />
                <rect x="458" y="380" width="30" height="120" />
            </g>
            <rect y="480" width="800" height="120" fill="var(--floor)" />
            <ellipse cx="300" cy="545" rx="260" ry="34" fill="var(--arch)" opacity=".7" />
            <rect x="90" y="400" width="300" height="100" rx="46" fill="var(--sofa)" />
            <rect x="110" y="368" width="260" height="64" rx="30" fill="var(--sofa)" opacity=".85" />
            <line x1="610" y1="0" x2="610" y2="170" stroke="var(--lamp)" strokeWidth="3" />
            <circle cx="610" cy="190" r="34" fill="var(--lamp)" />
            <rect x="600" y="410" width="90" height="90" rx="45" fill="var(--arch)" />
            <g fill="#3d6b3a">
                <ellipse cx="700" cy="350" rx="16" ry="62" transform="rotate(-24 700 350)" />
                <ellipse cx="722" cy="350" rx="16" ry="70" />
                <ellipse cx="744" cy="355" rx="16" ry="60" transform="rotate(26 744 355)" />
            </g>
            <rect x="705" y="400" width="40" height="100" rx="8" fill="var(--arch)" />
        </svg>
    );
}