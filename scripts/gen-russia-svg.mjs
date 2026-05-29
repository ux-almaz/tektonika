import fs from "fs";

const geo = JSON.parse(fs.readFileSync("public/rus-geo.json", "utf8"));
const polygons = geo.features[0].geometry.coordinates;
const rings = polygons.flatMap((polygon) => polygon);

let minLon = Infinity;
let maxLon = -Infinity;
let minLat = Infinity;
let maxLat = -Infinity;

for (const ring of rings) {
  for (const [lon, lat] of ring) {
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
}

const W = 1000;
const H = 520;
const pad = 20;

const proj = ([lon, lat]) => [
  pad + ((lon - minLon) / (maxLon - minLon)) * (W - 2 * pad),
  pad + ((maxLat - lat) / (maxLat - minLat)) * (H - 2 * pad),
];

function ringToPath(ring, step) {
  const pts = ring
    .filter((_, i) => i % step === 0 || i === ring.length - 1)
    .map(proj);
  return `M ${pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ")} Z`;
}

const paths = [];

for (const ring of rings) {
  const lons = ring.map((p) => p[0]);
  const lats = ring.map((p) => p[1]);
  const clon = lons.reduce((a, b) => a + b) / lons.length;
  const span =
    (Math.max(...lons) - Math.min(...lons)) * (Math.max(...lats) - Math.min(...lats));
  if (span < 0.4) continue;
  if (clon > 175) continue;
  if (clon < -170) continue;
  paths.push(ringToPath(ring, clon > 90 ? 14 : 5));
}

const cities = [
  [34.102, 44.954],
  [33.522, 44.616],
  [36.468, 45.356],
  [34.169, 44.497],
  [35.379, 45.032],
];

const pins = cities.map((c) => proj(c).map((n) => +n.toFixed(1)));

const out = { viewBox: `0 0 ${W} ${H}`, paths, pins };
fs.writeFileSync("src/data/russia-map-svg.json", JSON.stringify(out));
console.log("written", paths.length, "paths", pins.length, "pins");
