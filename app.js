const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const header = $("[data-header]");
const menuToggle = $("[data-menu-toggle]");
const mobileNav = $("[data-mobile-nav]");
const budgetRange = $("[data-budget-range]");
const budgetLabel = $("[data-budget-label]");
const pathTitle = $("[data-path-title]");
const pathCopy = $("[data-path-copy]");
const pathKicker = $("[data-path-kicker]");
const priceRange = $("[data-price-range]");
const priceLabel = $("[data-price-label]");
const savingsLabel = $("[data-savings-label]");
const paletteBoard = $("[data-palette-board]");
const paletteTitle = $("[data-palette-title]");
const paletteCopy = $("[data-palette-copy]");
const craftImage = $("[data-craft-image]");
const craftTitle = $("[data-craft-title]");
const craftCopy = $("[data-craft-copy]");
const lightbox = $("[data-lightbox]");
const lightboxImage = $("[data-lightbox-image]");
const lightboxTitle = $("[data-lightbox-title]");
const closeLightbox = $("[data-close-lightbox]");
const tourLabel = $("[data-tour-label]");

const paths = {
  ready: {
    kicker: "Best starting point",
    title: "Tour available homes in Harvard Oaks and Rowan Grove.",
    copy:
      "Focus on quick confidence: compare finishes, walk the spaces, then review current incentives with the sales team.",
  },
  custom: {
    kicker: "Best starting point",
    title: "Start with Premier or Classic, then edit the plan around your life.",
    copy:
      "Choose the plan family first, then use the design studio to refine color, texture, cabinetry, lighting, and everyday storage.",
  },
  land: {
    kicker: "Best starting point",
    title: "Begin with a build-on-your-land review and site-fit conversation.",
    copy:
      "Map your land constraints, utility needs, and budget range before choosing a Cottage, Classic, or Premier plan direction.",
  },
};

const palettes = {
  heirloom: {
    title: "Heirloom Contrast",
    copy: "Deep green, creamy stone, warm oak, and aged brass for rooms that feel collected.",
    bg: "#eef2ef",
    main: "#223a3f",
    stone: "#d8d3c9",
    metal: "#b9945e",
  },
  light: {
    title: "Light Oak Calm",
    copy: "Soft white, natural oak, misty stone, and black accents for clean family living.",
    bg: "#f7f8f5",
    main: "#f4f2ee",
    stone: "#c8d1cd",
    metal: "#9f8a70",
  },
  moody: {
    title: "Moody Mineral",
    copy: "Charcoal, sage, soapstone tones, and copper warmth for a richer custom feel.",
    bg: "#e7ebe8",
    main: "#26373b",
    stone: "#6f817a",
    metal: "#ed7f26",
  },
};

const craftDetails = {
  structure: {
    image: "https://s3.amazonaws.com/buildercloud/26769ffcf53a8375c530f896864f540c.jpeg",
    title: "Engineered for the way Oklahoma homes live.",
    copy:
      "Post-tension slab engineering, reliable framing practices, and durable exterior materials create the quiet confidence buyers rarely see in a brochure.",
  },
  comfort: {
    image: "https://s3.amazonaws.com/buildercloud/0b8a26218d48c4b6fedffe5a457ddfe5.jpeg",
    title: "Comfort starts inside the walls.",
    copy:
      "Low E windows, thoughtful insulation, and air-conscious details help the home feel steady through hot summers and winter swings.",
  },
  finish: {
    image: "https://s3.amazonaws.com/buildercloud/70f2fed5850ce20fdfa60e236bdf74f9.jpeg",
    title: "The finish palette feels intentional, not accidental.",
    copy:
      "Cabinetry, lighting, hardware, tile, and color are edited together so the home feels personal without becoming chaotic.",
  },
};

function formatCurrency(value, compact = false) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    notation: compact ? "compact" : "standard",
  }).format(value);
}

function monthlyPayment(principal, annualRate) {
  const monthlyRate = annualRate / 100 / 12;
  const months = 360;
  return (principal * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
}

function updateBudget() {
  if (!budgetRange || !budgetLabel) return;
  budgetLabel.textContent = formatCurrency(Number(budgetRange.value), true);
}

function updateCalculator() {
  if (!priceRange || !priceLabel || !savingsLabel) return;
  const price = Number(priceRange.value);
  const financed = price * 0.8;
  const market = monthlyPayment(financed, 6.35);
  const promo = monthlyPayment(financed, 4.99);
  priceLabel.textContent = formatCurrency(price);
  savingsLabel.textContent = `${formatCurrency(Math.round(market - promo))}/mo`;
}

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

$$(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

$$("[data-path]").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = paths[button.dataset.path];
    $$("[data-path]").forEach((item) => item.classList.toggle("is-active", item === button));
    pathKicker.textContent = selected.kicker;
    pathTitle.textContent = selected.title;
    pathCopy.textContent = selected.copy;
  });
});

budgetRange?.addEventListener("input", updateBudget);
priceRange?.addEventListener("input", updateCalculator);
updateBudget();
updateCalculator();

$$("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    $$("[data-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
    $$(".collection-card").forEach((card) => {
      const isVisible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !isVisible);
    });
  });
});

$$("[data-craft]").forEach((button) => {
  button.addEventListener("click", () => {
    const detail = craftDetails[button.dataset.craft];
    $$("[data-craft]").forEach((item) => item.classList.toggle("is-active", item === button));
    craftImage.src = detail.image;
    craftTitle.textContent = detail.title;
    craftCopy.textContent = detail.copy;
  });
});

$$("[data-palette]").forEach((button) => {
  button.addEventListener("click", () => {
    const palette = palettes[button.dataset.palette];
    $$("[data-palette]").forEach((item) => item.classList.toggle("is-active", item === button));
    paletteBoard.style.setProperty("--palette-bg", palette.bg);
    paletteBoard.style.setProperty("--palette-main", palette.main);
    paletteBoard.style.setProperty("--palette-stone", palette.stone);
    paletteBoard.style.setProperty("--palette-metal", palette.metal);
    paletteTitle.textContent = palette.title;
    paletteCopy.textContent = palette.copy;
  });
});

$$("[data-gallery]").forEach((button) => {
  button.addEventListener("click", () => {
    const image = $("img", button);
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = button.dataset.gallery;
    lightbox.showModal();
    document.body.classList.add("locked");
  });
});

closeLightbox?.addEventListener("click", () => lightbox.close());

lightbox?.addEventListener("close", () => {
  document.body.classList.remove("locked");
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

$$("[data-tour-day]").forEach((button) => {
  button.addEventListener("click", () => {
    $$("[data-tour-day]").forEach((item) => item.classList.toggle("is-active", item === button));
    tourLabel.textContent =
      button.dataset.tourDay === "Wednesday"
        ? "Wednesday design preview"
        : `${button.dataset.tourDay} private tour window`;
  });
});

const revealItems = $$(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
