import React from 'react';
import { products } from '../data/products';

// A curated list of 18 completely unique lifestyle and detail images of luxury interiors/furniture details.
// Each photo is linked to a specific product to allow opening its detail drawer, but the image is unique.
const inspirationGallery = [
  {
    src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
    tag: "Aesthetics",
    title: "Symphony of Form & Shadow",
    desc: "Warm light diffusing across soft oatmeal bouclé upholstery and ash wood framing.",
    productId: "liv-01"
  },
  {
    src: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=1200&q=80",
    tag: "Texture",
    title: "Tactile Linen Seating",
    desc: "Beautiful Belgian linen textures catching afternoon light on the occasional lounge chair.",
    productId: "liv-03"
  },
  {
    src: "https://www.corliving.com/cdn/shop/files/LFT-515-B_env1.jpg?v=1727195881&width=1946",
    tag: "Space",
    title: "Fluted Walnut Credenza",
    desc: "Seamless wood joinery floating gracefully in a modern architectural living space.",
    productId: "liv-04"
  },
  {
    src: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
    tag: "Craft",
    title: "Sculptural Curves",
    desc: "Ergonomic curvature and warm oak detailing crafted with absolute precision.",
    productId: "din-02"
  },
  {
    src: "https://images.thdstatic.com/productImages/9ad7666f-ffc6-4acd-9b85-2068f502db7b/svn/rust-safavieh-ottomans-ott1307b-64_600.jpg",
    tag: "Lounge",
    title: "Sun-drenched Corners",
    desc: "A soft Sienna bouclé accent pouf designed for slow living and morning relaxation.",
    productId: "liv-05"
  },
  {
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    tag: "Rest",
    title: "The Silent Bedroom",
    desc: "Plush upholstered canopy bed, balanced tones, and quiet details to slow down the mind.",
    productId: "bed-01"
  },
  {
    src: "https://www.orangetree.in/cdn/shop/files/KotaroTravertineTable1.jpg?v=1722852136",
    tag: "Material",
    title: "Honed Travertine Table",
    desc: "Solid architectural travertine coffee table highlighting natural geological layers.",
    productId: "liv-02"
  },
  {
    src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
    tag: "Detail",
    title: "Daylight Patterns",
    desc: "Gentle shadows dancing across natural fibers and warm wood dining finishes.",
    productId: "din-01"
  },
  {
    src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
    tag: "Solitude",
    title: "Bedside Sanctuary",
    desc: "A minimal teak nightstand hosting essential stories and warm nocturnal lighting.",
    productId: "bed-02"
  },
  {
    src: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=80",
    tag: "Storage",
    title: "Alabaster Fluted Dresser",
    desc: "Clean-lined dresser with wrap-around fluting details crafted from bleached ash wood.",
    productId: "bed-03"
  },
  {
    src: "https://images.unsplash.com/photo-1486946255434-2466348c2166?auto=format&fit=crop&w=1200&q=80",
    tag: "Joinery",
    title: "The Art of Woodworking",
    desc: "Exquisite hand-carved desk joints celebrating the resilience and beauty of timber.",
    productId: "of-01"
  },
  {
    src: "https://img.zcdn.com.au/lf/50/hash/38080/20749494/4/150cm+Premium+Magnus+Travertine+Stone+Sideboard.jpg",
    tag: "Credenza",
    title: "Travertine Stone Sideboard",
    desc: "A monumental dining sideboard framed by honed stone and solid white oak cabinetry.",
    productId: "din-03"
  },
  {
    src: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
    tag: "Seating",
    title: "Saddle Leather Barstool",
    desc: "Architectural barstool featuring curved steel rods topped with hand-stitched leather.",
    productId: "din-04"
  },
  {
    src: "https://whalenfurniture.com/wp-content/uploads/2024/11/BH1425004710017_LS-01.jpg",
    tag: "Bookshelf",
    title: "Archway Walnut Bookshelf",
    desc: "Modern vertical shelving carved from solid American walnut boards.",
    productId: "of-03"
  },
  {
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    tag: "Office",
    title: "The Inspired Studio",
    desc: "A clutter-free study desk and cognac leather chair for creative focus and clarity.",
    productId: "of-02"
  },
  {
    src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    tag: "Seating",
    title: "Chalk Linen Bench",
    desc: "A minimalist bedroom bench upholstered in organic flax linen on walnut base arches.",
    productId: "bed-04"
  },
  {
    src: "https://m.media-amazon.com/images/I/712TAjA4AuL.jpg",
    tag: "Leisure",
    title: "Braided Cord Garden Chairs",
    desc: "Open-air styling and weather-defying cords woven over modern aluminum frames.",
    productId: "out-04"
  },
  {
    src: "https://vetrofurniture.com.au/storage/10986/conversions/67d742f8b8b25_67d742636e0db_CRE03-DT-+-CRE03-CON-+-CRE03-CT-+-CRE03-ST-zoom.jpg",
    tag: "Stone",
    title: "Crete Travertine Accent Table",
    desc: "A stunning hand-carved travertine table featuring natural organic patterns and a premium fluted finish.",
    productId: "out-05"
  }
];

const heightVariants = ['260px', '340px', '420px', '300px', '380px', '280px'];

export default function InspirationMasonry({ onOpenDetail }) {
  // Map the static gallery objects to active product references
  const masonryItems = inspirationGallery.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product: product || products[0] // Fallback in case of mismatch
    };
  });

  return (
    <section className="masonry-section" id="inspiration-section">
      <div className="section-headline">
        <p className="headline-sub">Visual Inspiration</p>
        <h2 className="headline-main">The Aurelia Gallery</h2>
        <p className="headline-text">
          Immerse yourself in a curated gallery of textures, forms, and materials. Every grain of wood, every weave of linen — captured beautifully.
        </p>
      </div>

      <div className="masonry-container">
        {masonryItems.map((item, idx) => (
          <div
            className="masonry-item"
            key={idx}
            onClick={() => onOpenDetail(item.product)}
          >
            <img
              src={item.src}
              alt={item.title}
              className="masonry-img"
              style={{ height: heightVariants[idx % heightVariants.length] }}
              loading="lazy"
            />
            <div className="masonry-overlay">
              <span className="masonry-tag">{item.tag}</span>
              <p className="masonry-title">{item.title}</p>
              <p className="masonry-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
