// Central image registry. Components reference images by key (e.g. "hero-finance-district")
// so the underlying asset can be swapped from one place without touching component code.

const modules = import.meta.glob("./*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const images = {};
for (const path in modules) {
  const key = path.replace("./", "").replace(/\.(jpg|jpeg|png|webp)$/, "");
  images[key] = modules[path];
}

export const getImage = (key) => images[key] ?? null;

export default images;
