// Writes public/illustrations/construction-0.svg … construction-5.svg:
// six frames of one building site, from empty lot to finished tower.
// Run with: node scripts/generate-construction-frames.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "../public/illustrations");

const COLORS = {
  yellow: "#f5b700",
  concrete: "#9aa0a6",
  concreteDark: "#6f757b",
  steel: "#37474f",
  glass: "#5b7a8c",
  lit: "#ffd36b",
  ground: "#8d7b68",
  dirt: "#6e5c4a",
};

const GROUND_Y = 760;
const BUILDING_LEFT = 640;
const BUILDING_RIGHT = 1040;
const FLOOR_HEIGHT = 74;
const COLUMN_XS = [640, 773, 906, 1026];

/** Per frame: built floors, floors with facade, crane mast height, load on hook. */
const STAGES = [
  { floors: 0, clad: 0, mast: 260, foundation: false, load: false },
  { floors: 0, clad: 0, mast: 580, foundation: true, load: true },
  { floors: 2, clad: 0, mast: 580, foundation: true, load: true },
  { floors: 4, clad: 1, mast: 580, foundation: true, load: true },
  { floors: 6, clad: 3, mast: 580, foundation: true, load: true },
  { floors: 7, clad: 7, mast: 580, foundation: true, load: false },
];

const rect = (x, y, w, h, fill, extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;

function backdrop() {
  return `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b9cbd4"/>
      <stop offset="1" stop-color="#f4ece0"/>
    </linearGradient>
  </defs>
  ${rect(0, 0, 1600, 1000, "url(#sky)")}
  <circle cx="300" cy="230" r="90" fill="#fff4d6" opacity="0.8"/>
  <path d="M0 760 V600 H90 V540 H170 V620 H250 V500 H330 V640 H420 V580 H520 V760 Z
           M1160 760 V620 H1230 V560 H1320 V640 H1390 V520 H1470 V600 H1600 V760 Z" fill="#c3ccd1"/>
  ${rect(0, GROUND_Y, 1600, 240, COLORS.ground)}
  <path d="M120 ${GROUND_Y} C180 700 300 700 360 ${GROUND_Y} Z" fill="${COLORS.dirt}"/>
  ${rect(0, GROUND_Y + 60, 1600, 6, "#7a6a59")}`;
}

function surveyStakes() {
  return [BUILDING_LEFT, BUILDING_RIGHT - 20, 840]
    .map(
      (x) => `
  ${rect(x, GROUND_Y - 60, 6, 60, "#5a4632")}
  <path d="M${x + 6} ${GROUND_Y - 60} L${x + 34} ${GROUND_Y - 50} L${x + 6} ${GROUND_Y - 40} Z" fill="#e8642c"/>`,
    )
    .join("");
}

function foundation() {
  return `
  ${rect(BUILDING_LEFT - 20, GROUND_Y - 22, BUILDING_RIGHT - BUILDING_LEFT + 40, 22, COLORS.concreteDark)}
  ${rect(BUILDING_LEFT - 20, GROUND_Y - 26, BUILDING_RIGHT - BUILDING_LEFT + 40, 6, COLORS.yellow)}`;
}

function floorFrame(level, isTop) {
  const slabY = GROUND_Y - 22 - (level + 1) * FLOOR_HEIGHT;
  const columns = COLUMN_XS.map((x) =>
    rect(x, slabY + 14, 14, FLOOR_HEIGHT - 14, COLORS.concrete),
  ).join("");
  const slab = rect(BUILDING_LEFT - 10, slabY, BUILDING_RIGHT - BUILDING_LEFT + 20, 14, COLORS.concrete);
  const edge = isTop ? rect(BUILDING_LEFT - 10, slabY - 5, BUILDING_RIGHT - BUILDING_LEFT + 20, 5, COLORS.yellow) : "";
  return columns + slab + edge;
}

function facade(level, finished) {
  const slabY = GROUND_Y - 22 - (level + 1) * FLOOR_HEIGHT;
  const wall = rect(BUILDING_LEFT + 4, slabY + 14, BUILDING_RIGHT - BUILDING_LEFT - 4, FLOOR_HEIGHT - 14, "#d7d2c8");
  const windows = Array.from({ length: 6 }, (_, i) => {
    const lit = finished && (level * 7 + i * 3) % 5 === 0;
    return rect(BUILDING_LEFT + 22 + i * 64, slabY + 26, 40, 36, lit ? COLORS.lit : COLORS.glass, 'rx="3"');
  }).join("");
  return wall + windows;
}

function scaffolding(floors) {
  const top = GROUND_Y - 22 - floors * FLOOR_HEIGHT;
  const x0 = BUILDING_RIGHT + 14;
  const poles = [0, 40].map((dx) => rect(x0 + dx, top, 5, GROUND_Y - top, "#b07b2c")).join("");
  const boards = Array.from({ length: floors }, (_, i) =>
    rect(x0 - 4, top + i * FLOOR_HEIGHT + FLOOR_HEIGHT - 8, 54, 6, "#d19a3a"),
  ).join("");
  return poles + boards;
}

function roofMark() {
  const roofY = GROUND_Y - 22 - 7 * FLOOR_HEIGHT;
  return `
  ${rect(BUILDING_LEFT + 120, roofY - 34, 160, 22, COLORS.concreteDark, 'rx="4"')}
  ${rect(BUILDING_LEFT + 140, roofY - 60, 160, 22, COLORS.yellow, 'rx="4"')}`;
}

function crane(mastHeight, load) {
  const x = 1180;
  const topY = GROUND_Y - mastHeight;
  const lattice = [];
  for (let y = GROUND_Y; y > topY + 20; y -= 40) {
    lattice.push(`<path d="M${x} ${y} L${x + 36} ${y - 40} M${x + 36} ${y} L${x} ${y - 40}" />`);
  }
  const mast = `
  <g stroke="${COLORS.yellow}" stroke-width="4" fill="none">
    <line x1="${x}" y1="${GROUND_Y}" x2="${x}" y2="${topY}"/>
    <line x1="${x + 36}" y1="${GROUND_Y}" x2="${x + 36}" y2="${topY}"/>
    ${lattice.join("")}
  </g>
  ${rect(x - 20, GROUND_Y - 10, 76, 14, COLORS.steel)}`;

  if (mastHeight < 400) return mast;

  const jibY = topY;
  const jibLeft = 760;
  const jibRight = 1420;
  const hookX = 860;
  const loadY = load ? 330 : 260;
  const jibLattice = [];
  for (let jx = jibLeft; jx < jibRight; jx += 40) {
    jibLattice.push(`<path d="M${jx} ${jibY} L${jx + 20} ${jibY - 22} L${jx + 40} ${jibY}" />`);
  }
  return `${mast}
  <g stroke="${COLORS.yellow}" stroke-width="4" fill="none">
    <line x1="${jibLeft}" y1="${jibY}" x2="${jibRight}" y2="${jibY}"/>
    <line x1="${jibLeft}" y1="${jibY - 22}" x2="${jibRight}" y2="${jibY - 22}"/>
    ${jibLattice.join("")}
    <line x1="${x + 18}" y1="${jibY - 90}" x2="${jibLeft}" y2="${jibY - 22}"/>
    <line x1="${x + 18}" y1="${jibY - 90}" x2="${jibRight}" y2="${jibY - 22}"/>
  </g>
  <path d="M${x + 4} ${jibY - 22} L${x + 18} ${jibY - 96} L${x + 32} ${jibY - 22} Z" fill="${COLORS.yellow}"/>
  ${rect(jibRight - 90, jibY, 70, 50, COLORS.concreteDark)}
  ${rect(x - 6, jibY + 2, 48, 40, COLORS.steel, 'rx="4"')}
  ${rect(x + 2, jibY + 10, 32, 18, "#9fc3d6", 'rx="2"')}
  <line x1="${hookX}" y1="${jibY}" x2="${hookX}" y2="${loadY}" stroke="${COLORS.steel}" stroke-width="3"/>
  ${rect(hookX - 6, loadY, 12, 14, COLORS.steel)}
  ${load ? rect(hookX - 90, loadY + 18, 180, 18, COLORS.concrete) + rect(hookX - 90, loadY + 14, 180, 4, COLORS.yellow) : ""}`;
}

function frame(stage, index) {
  const parts = [backdrop()];
  if (!stage.foundation) parts.push(surveyStakes());
  if (stage.foundation) parts.push(foundation());
  for (let level = 0; level < stage.floors; level++) {
    if (level < stage.clad) parts.push(facade(level, index === STAGES.length - 1));
    parts.push(floorFrame(level, level === stage.floors - 1 && index < STAGES.length - 1));
  }
  if (stage.floors > 2 && stage.floors < 7) parts.push(scaffolding(stage.floors));
  if (index === STAGES.length - 1) parts.push(roofMark());
  parts.push(crane(stage.mast, stage.load));

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
  <title>Construction site, frame ${index + 1} of ${STAGES.length}</title>${parts.join("\n")}
</svg>
`;
}

mkdirSync(OUT_DIR, { recursive: true });
STAGES.forEach((stage, index) => {
  writeFileSync(join(OUT_DIR, `construction-${index}.svg`), frame(stage, index));
});
console.log(`Wrote ${STAGES.length} construction frames to ${OUT_DIR}`);
