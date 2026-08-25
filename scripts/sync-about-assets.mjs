import fs from "fs";
import path from "path";

const src = path.join("Vantage Web Assets latest", "About Vantage");

const copies = [
  ["Landing Page Photo.jpg", "public/about/crowd.jpg"],
  ["CEO Office Vantage.jpg", "public/about/studio.jpg"],
  [
    path.join("Our Begining", "Vantage Design Studio 2011.jpg"),
    "public/about/history/design-studio.jpg",
  ],
  [
    path.join(
      "Our Begining",
      "Creative Manager's birthday Vantage Studio, Lahore 2012.jpg"
    ),
    "public/about/history/celebration.jpg",
  ],
  [
    path.join("Our Begining", "Production Team, Vantage 2008.jpg"),
    "public/about/history/production.jpg",
  ],
  [
    path.join("Our Begining", "Offset Operators, Vantage 2005.jpg"),
    "public/about/history/offset.jpg",
  ],
  [
    path.join("Our Begining", "Asif Khan, Master Binder Vantage 2004.jpg"),
    "public/about/history/master-binder.jpg",
  ],
  [
    path.join("Our Begining", "Environment Day, Vantage 2004.jpg"),
    "public/about/history/green-day.jpg",
  ],
  [
    path.join("People Who Built Vantage", "Manzoor Ahmed.jpg"),
    "public/about/pioneers/manzoor-ahmed.jpg",
  ],
  [
    path.join("People Who Built Vantage", "Asif Khan.jpg"),
    "public/about/pioneers/asif-khan.jpg",
  ],
  [
    path.join("People Who Built Vantage", "Muhammad Hafeez.jpg"),
    "public/about/pioneers/muhammad-hafeez.jpg",
  ],
  [
    path.join("People Who Built Vantage", "Aqeel Haider.jpg"),
    "public/about/pioneers/aqeel-haider.jpg",
  ],
  [
    path.join("People Who Built Vantage", "Muhammad Shahid.jpg"),
    "public/about/pioneers/muhammad-shahid.jpg",
  ],
  [
    path.join("People Who Built Vantage", "Zaheer Ahmed.jpg"),
    "public/about/pioneers/zaheer-ahmed.jpg",
  ],
];

for (const [from, to] of copies) {
  const a = path.join(src, from);
  if (!fs.existsSync(a)) throw new Error("missing " + a);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(a, to);
  console.log("ok", to, fs.statSync(to).size);
}

for (const old of [
  "public/about/studio.png",
  "public/about/pioneers/zameer-ahmed.jpg",
]) {
  if (fs.existsSync(old)) {
    fs.unlinkSync(old);
    console.log("removed", old);
  }
}
