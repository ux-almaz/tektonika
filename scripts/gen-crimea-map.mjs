import fs from "fs";
import https from "https";

const GEO_PATH = "public/ne-countries.geojson";
const GEO_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson";

async function ensureGeo() {
  if (fs.existsSync(GEO_PATH)) return;
  await new Promise((resolve, reject) => {
    const file = fs.createWriteStream(GEO_PATH);
    https
      .get(GEO_URL, (res) => {
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", reject);
  });
}

await ensureGeo();
const geo = JSON.parse(fs.readFileSync(GEO_PATH, "utf8"));
const russia = geo.features.find(
  (f) => f.properties?.ADMIN === "Russia" || f.properties?.ISO_A2 === "RU",
);

if (!russia) {
  console.error("Russia feature not found");
  process.exit(1);
}

/** Крым + юг России (Тамань, Кубань) — тот же зум, севернее */
const B = { minLon: 31.75, maxLon: 40.55, minLat: 43.85, maxLat: 47.12 };
const W = 1000;
const H = 640;
const pad = 20;

const proj = ([lon, lat]) => [
  pad + ((lon - B.minLon) / (B.maxLon - B.minLon)) * (W - 2 * pad),
  pad + ((B.maxLat - lat) / (B.maxLat - B.minLat)) * (H - 2 * pad),
];

const rings = russia.geometry.coordinates.flatMap((polygon) => polygon);
const paths = [];

for (const ring of rings) {
  const clipped = ring.filter(
    ([lon, lat]) =>
      lon >= B.minLon && lon <= B.maxLon && lat >= B.minLat && lat <= B.maxLat,
  );
  if (clipped.length < 4) continue;

  const lons = clipped.map((p) => p[0]);
  const lats = clipped.map((p) => p[1]);
  const lonSpan = Math.max(...lons) - Math.min(...lons);
  const latSpan = Math.max(...lats) - Math.min(...lats);
  if (lonSpan > 9 || latSpan > 3.5) continue;

  const step = clipped.length > 120 ? Math.ceil(clipped.length / 80) : 1;
  const pts = clipped
    .filter((_, i) => i % step === 0 || i === clipped.length - 1)
    .map(proj);
  if (pts.length < 4) continue;

  const d = `M ${pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ")} Z`;
  if (d.length > 80) paths.push(d);
}

const cities = [
  [33.367, 45.19, "Евпатория"],
  [33.522, 44.616, "Севастополь"],
  [34.1, 44.948, "Симферополь"],
  [34.169, 44.497, "Ялта"],
  [36.468, 45.356, "Керчь"],
];

const pins = cities.map(([lon, lat, label]) => {
  const [x, y] = proj([lon, lat]);
  return {
    label,
    left: `${((x / W) * 100).toFixed(2)}%`,
    top: `${((y / H) * 100).toFixed(2)}%`,
  };
});

const out = {
  viewBox: `0 0 ${W} ${H}`,
  paths: paths.sort((a, b) => b.length - a.length),
  pins,
};

fs.writeFileSync("src/data/crimea-map-svg.json", JSON.stringify(out));
console.log("paths:", out.paths.length, "pins:", pins.length);
