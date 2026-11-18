(() => {
  "use strict";

  const DB_NAME = "folio-atelier";
  const DB_VERSION = 1;
  const STORE_NAME = "projects";
  const PROJECT_KEY = "current";
  const SAVE_DELAY = 420;

  const ICONS = {
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    layers: '<path d="m12.83 2.18 8 4a1 1 0 0 1 0 1.79l-8 4a2 2 0 0 1-1.66 0l-8-4a1 1 0 0 1 0-1.79l8-4a2 2 0 0 1 1.66 0Z"/><path d="m3 12 8 4a2 2 0 0 0 1.66 0l8-4"/><path d="m3 17 8 4a2 2 0 0 0 1.66 0l8-4"/>',
    layout: '<rect width="18" height="7" x="3" y="3" rx="1"/><rect width="9" height="7" x="3" y="14" rx="1"/><rect width="5" height="7" x="16" y="14" rx="1"/>',
    "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/><path d="M8 9h2"/>',
    palette: '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-.95-.5-1.3-.38-.44-.62-1-.62-1.7 0-1.38 1.12-2.5 2.5-2.5H18a4 4 0 0 0 4-4 9.7 9.7 0 0 0-10-8.5Z"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.83 1c0 2-3 2-3 4"/><path d="M12 17h.01"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    "external-link": '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
    smartphone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
    maximize: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    "lock-small": '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    unlock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    "arrow-left": '<path d="m15 18-6-6 6-6"/>',
    "arrow-right": '<path d="m9 18 6-6-6-6"/>',
    "arrow-up": '<path d="m18 15-6-6-6 6"/>',
    "arrow-down": '<path d="m6 9 6 6 6-6"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    "eye-off": '<path d="m2 2 20 20"/><path d="M6.7 6.7C3.7 8.6 2 12 2 12s3.5 7 10 7c1.8 0 3.4-.5 4.7-1.2"/><path d="M10.6 5.1A11.4 11.4 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 0 1-4.2-4.2"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z"/><path d="m9 12 2 2 4-4"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    "chevron-right": '<path d="m9 18 6-6-6-6"/>',
    "arrow-up-right": '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    location: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    sparkles: '<path d="m12 3-1.2 3.1L8 7.3l2.8 1.2L12 12l1.2-3.5L16 7.3l-2.8-1.2L12 3Z"/><path d="m5 13-.8 2.2L2 16l2.2.8L5 19l.8-2.2L8 16l-2.2-.8L5 13Z"/><path d="m19 14-.6 1.4L17 16l1.4.6L19 18l.6-1.4L21 16l-1.4-.6L19 14Z"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>',
    crop: '<path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/>',
    dots: '<circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/>'
  };

  const THEME_PRESETS = {
    clay: {
      label: "陶土与纸",
      colors: {
        bg: "#f1eee6",
        surface: "#dfd8ca",
        text: "#181a16",
        muted: "#6a6b64",
        accent: "#d75536",
        line: "#c9c2b3"
      },
      font: "serif",
      layout: "editorial",
      coverRatio: "landscape",
      radius: 3,
      density: "comfortable"
    },
    grove: {
      label: "墨绿工作室",
      colors: {
        bg: "#e7e8e1",
        surface: "#cfd4c7",
        text: "#1b251c",
        muted: "#606b5e",
        accent: "#8b4c30",
        line: "#b7bfaf"
      },
      font: "serif",
      layout: "compact",
      coverRatio: "portrait",
      radius: 2,
      density: "comfortable"
    },
    blue: {
      label: "蓝灰编辑",
      colors: {
        bg: "#edf0f1",
        surface: "#d6dee2",
        text: "#17242a",
        muted: "#657177",
        accent: "#3f7191",
        line: "#c6d0d5"
      },
      font: "sans",
      layout: "editorial",
      coverRatio: "portrait",
      radius: 1,
      density: "compact"
    },
    mono: {
      label: "黑白档案",
      colors: {
        bg: "#f0efeb",
        surface: "#d9d8d2",
        text: "#151515",
        muted: "#666661",
        accent: "#b0472f",
        line: "#c6c4bd"
      },
      font: "sans",
      layout: "list",
      coverRatio: "landscape",
      radius: 0,
      density: "compact"
    }
  };

  const ELEMENTS = {};
  const ASSET_CACHE = new Map();
  let state;
  let activePanel = "profile";
  let selectedAlbumId = "";
  let currentAlbum = null;
  let currentImageIndex = 0;
  let currentVariant = "main";
  let unlockTargetId = "";
  let saveTimer = 0;
  let toastTimer = 0;
  let hoverPreviewTimer = 0;
  let hoverCloseTimer = 0;
  let hoveredAlbumId = "";
  let hoveredVariant = "main";
  let hoveredCard = null;
  let cropTarget = null;
  let cropDrag = null;
  let imagePickerTarget = null;
  let db = null;
  let isHydrating = false;
  const collapsedSections = new Set();

  function icon(name, size = 16) {
    const paths = ICONS[name] || ICONS.help;
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  }

  function hydrateIcons(root = document) {
    root.querySelectorAll("[data-icon]").forEach((slot) => {
      const name = slot.dataset.icon;
      slot.innerHTML = icon(name, name === "lock-small" ? 10 : 16);
      slot.removeAttribute("data-icon");
    });
  }

  function uid(prefix = "item") {
    if (globalThis.crypto?.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  function clone(value) {
    return typeof structuredClone === "function"
      ? structuredClone(value)
      : JSON.parse(JSON.stringify(value));
  }

  function createInitialState() {
    return {
      version: 17,
      profile: {
        name: "林知遥",
        displayName: "LIN ZHIYAO",
        role: "品牌与数字产品设计师",
        kicker: "INDEPENDENT DESIGNER / SHANGHAI",
        intro: "在策略、视觉与数字体验之间，为文化和新消费品牌建立清晰而有温度的识别系统。",
        introSize: 17,
        about: "我的工作从理解业务与人的真实处境开始。通过品牌策略、视觉系统和交互原型，把复杂的信息收束成可被感知、可被使用、也可持续生长的设计。",
        location: "上海，中国",
        email: "hello@linzhiyao.design",
        emailLink: false,
        website: "linzhiyao.design",
        availability: "2026 年 12 月起可接洽",
        hero: "./assets/sample-type.jpg",
        heroFrame: normalizeFrame(),
        watermark: "DESIGN",
        heroBlur: 18,
        heroOpacity: 0.7
      },
      theme: {
        preset: "clay",
        bg: "#f1eee6",
        surface: "#dfd8ca",
        text: "#181a16",
        muted: "#6a6b64",
        accent: "#d75536",
        line: "#c9c2b3",
        font: "serif",
        layout: "editorial",
        coverRatio: "landscape",
        radius: 3,
        density: "comfortable"
      },
      modules: [
        {
          id: uid("module"),
          type: "project",
          kicker: "SELECTED PROJECTS",
          title: "精选项目深度解析",
          description: "从项目策略到视觉落地，展开完整的设计判断与执行过程。",
          details: "项目背景\n从业务目标、受众与使用场景出发，建立清晰的设计问题。\n\n设计策略\n将抽象的品牌诉求转化为可执行的视觉原则与体验框架。\n\n执行与结果\n完成从概念探索、系统搭建到最终交付的完整过程。",
          targetAlbumId: "",
          size: "half"
        },
        {
          id: uid("module"),
          type: "skill",
          kicker: "VISUAL WORKFLOW",
          title: "商业视觉工作流",
          description: "从创意构思到商业交付，用稳定流程控制质量与效率。",
          details: "需求梳理\n确认商业目标、传播场景、交付规格与评审节点。\n\n视觉探索\n通过情绪板、关键词与多路径草图建立视觉方向。\n\n系统化交付\n建立组件、规范与素材结构，确保内容可以持续扩展。",
          targetAlbumId: "",
          size: "half"
        }
      ],
      sections: {
        modules: {
          visible: true
        },
        portfolio: {
          kicker: "PORTFOLIO LIBRARY",
          title: "分类作品集",
          intro: "按项目类型浏览完整案例。每个作品集可以独立设置访问密码。"
        },
        about: {
          kicker: "ABOUT",
          title: "关于我",
          body: "我的工作从理解业务与人的真实处境开始。通过品牌策略、视觉系统和交互原型，把复杂的信息收束成可被感知、可被使用、也可持续生长的设计。",
          strengths: "品牌策略与视觉系统\n数字产品与交互体验\n跨团队协作与项目推进",
          visible: true
        },
        contact: {
          kicker: "START A CONVERSATION",
          headline: "",
          note: "欢迎联系讨论品牌系统、网站体验与视觉设计项目。请附上项目背景、范围、期望时间与预算区间。",
          headlineSize: 76,
          visible: true
        }
      },
      customModules: [
        {
          id: uid("story"),
          kicker: "HOW I WORK",
          title: "我的工作方式",
          body: "先理解业务目标和使用场景，再用清晰的设计原则推动落地。重视过程沟通、交付质量与后续扩展。",
          visible: true
        }
      ],
      categoryMeta: {},
      albums: [
        {
          id: uid("album"),
          title: "ARC / 品牌系统",
          subtitle: "ARC CULTURAL CENTER",
          category: "品牌视觉",
          year: "2026",
          summary: "为一座城市文化机构建立视觉语言、导视系统与线上内容框架，让知识生产被更轻松地看见。",
          cover: "./assets/sample-object.jpg",
          password: "",
          passwordHint: "",
          visible: true,
          images: [
            { id: uid("image"), title: "视觉规范与组件系统", src: "./assets/sample-object.jpg" },
            { id: uid("image"), title: "色彩研究", src: "./assets/sample-form.jpg" },
            { id: uid("image"), title: "印刷与物料测试", src: "./assets/sample-type.jpg" }
          ],
          aplusImages: [
            { id: uid("image"), title: "A+ 品牌叙事", src: "./assets/sample-type.jpg" },
            { id: uid("image"), title: "A+ 模块展开", src: "./assets/sample-studio.jpg" }
          ]
        },
        {
          id: uid("album"),
          title: "NORTH ROOM / 空间叙事",
          subtitle: "NORTH ROOM STUDIO",
          category: "空间与导视",
          year: "2025",
          summary: "围绕自然光、材料与工作方式，为一个独立创作空间设计导视与数字名片。",
          cover: "./assets/sample-studio.jpg",
          password: "",
          passwordHint: "",
          visible: true,
          images: [
            { id: uid("image"), title: "空间与材质", src: "./assets/sample-studio.jpg" },
            { id: uid("image"), title: "导视系统", src: "./assets/sample-type.jpg" }
          ],
          aplusImages: [
            { id: uid("image"), title: "A+ 空间体验", src: "./assets/sample-form.jpg" }
          ]
        },
        {
          id: uid("album"),
          title: "NOCTURNE / 私密提案",
          subtitle: "PRIVATE PRODUCT DIRECTION",
          category: "数字体验",
          year: "2025",
          summary: "一份面向合作方的未公开产品方向提案，包含视觉探索、体验框架与发布节奏。",
          cover: "./assets/sample-form.jpg",
          password: "folio2026",
          passwordHint: "演示密码：folio2026",
          visible: true,
          images: [
            { id: uid("image"), title: "概念光谱", src: "./assets/sample-form.jpg" },
            { id: uid("image"), title: "产品界面研究", src: "./assets/sample-object.jpg" }
          ]
        },
        {
          id: uid("album"),
          title: "MATERIAL / 视觉研究",
          subtitle: "MATERIAL STUDIES",
          category: "品牌视觉",
          year: "2024",
          summary: "从纸张、油墨与数字色彩之间寻找共通语汇，形成一组可用于品牌延展的视觉研究。",
          cover: "./assets/sample-type.jpg",
          password: "",
          passwordHint: "",
          visible: true,
          images: [
            { id: uid("image"), title: "纸张与油墨", src: "./assets/sample-type.jpg" },
            { id: uid("image"), title: "工作现场", src: "./assets/sample-studio.jpg" }
          ],
          aplusImages: [
            { id: uid("image"), title: "A+ 材质叙事", src: "./assets/sample-object.jpg" }
          ]
        }
      ]
    };
  }

  function normalizeImageList(list) {
    return Array.isArray(list)
      ? list
          .filter((image) => image && image.src)
          .map((image) => ({
            id: image.id || uid("image"),
            title: String(image.title || "作品图"),
            src: String(image.src)
          }))
      : [];
  }

  function albumImages(album, variant = "main") {
    if (variant === "aplus") return album?.variants?.aplus || [];
    return album?.variants?.main || album?.images || [];
  }

  function setAlbumImages(album, variant, images) {
    if (!album.variants) album.variants = { main: [], aplus: [] };
    album.variants[variant] = images;
    if (variant === "main") album.images = images;
  }

  function normalizeFrame(frame) {
    return {
      x: Math.max(0, Math.min(100, Number(frame?.x ?? 50))),
      y: Math.max(0, Math.min(100, Number(frame?.y ?? 50))),
      zoom: Math.max(1, Math.min(3, Number(frame?.zoom ?? 1)))
    };
  }

  function frameStyle(frame) {
    const safe = normalizeFrame(frame);
    return `object-position:${safe.x}% ${safe.y}%;transform:scale(${safe.zoom});transform-origin:${safe.x}% ${safe.y}%`;
  }

  function backgroundFrameStyle(frame) {
    const safe = normalizeFrame(frame);
    return `background-position:${safe.x}% ${safe.y}%;--hero-origin-x:${safe.x}%;--hero-origin-y:${safe.y}%;--hero-zoom:${safe.zoom}`;
  }

  function normalizeCategoryCount(value, min, max, fallback) {
    const parsed = Number(value);
    return Number.isFinite(parsed)
      ? Math.max(min, Math.min(max, Math.round(parsed)))
      : fallback;
  }

  function normalizeAlbumLayoutRecord(value, fallback = {}) {
    const record = value && typeof value === "object" && !Array.isArray(value) ? value : {};
    const layout = (typeof value === "string" ? value : record.layout ?? fallback.layout) === "grid" ? "grid" : "split";
    return {
      layout,
      stripCount: normalizeCategoryCount(record.stripCount ?? fallback.stripCount, 1, 3, 3),
      gridCount: normalizeCategoryCount(record.gridCount ?? fallback.gridCount, 3, 4, 3)
    };
  }

  function normalizeCategoryImageLabels(labels) {
    if (!labels || typeof labels !== "object" || Array.isArray(labels)) return {};
    const normalized = {};
    for (const [key, value] of Object.entries(labels)) {
      if (!key || !value || typeof value !== "object" || Array.isArray(value)) continue;
      const label = {};
      if (typeof value.text === "string") label.text = value.text.slice(0, 40);
      if (value.size !== undefined && value.size !== null) {
        label.size = normalizeCategoryCount(value.size, 10, 42, 19);
      }
      normalized[key] = label;
    }
    return normalized;
  }

  function normalizeAlbumRecord(album) {
    const mainImages = normalizeImageList(
      Array.isArray(album.variants?.main) ? album.variants.main : album.images
    );
    const aplusImages = normalizeImageList(album.variants?.aplus || album.aplusImages);
    return {
      id: album.id || uid("album"),
      title: String(album.title || "未命名作品集"),
      subtitle: String(album.subtitle || ""),
      category: String(album.category || "SELECTED WORK"),
      year: String(album.year || new Date().getFullYear()),
      summary: String(album.summary || ""),
      cover: String(album.cover || ""),
      password: String(album.password || ""),
      passwordHint: String(album.passwordHint || ""),
      visible: album.visible !== false,
      coverFrame: normalizeFrame(album.coverFrame),
      stripFrames: album.stripFrames && typeof album.stripFrames === "object" ? album.stripFrames : {},
      images: mainImages,
      variants: {
        main: mainImages,
        aplus: aplusImages
      }
    };
  }

  function normalizeState(raw) {
    const base = createInitialState();
    if (!raw || typeof raw !== "object") raw = base;
    const theme = { ...base.theme, ...(raw.theme || {}) };
    const albums = Array.isArray(raw.albums)
      ? raw.albums.map(normalizeAlbumRecord)
      : base.albums.map(normalizeAlbumRecord);
    const baseModules = Array.isArray(raw.modules)
      ? raw.modules.map((module, index) => ({
          id: module.id || uid("module"),
          type: module.type || (index === 1 ? "skill" : "project"),
          kicker: String(module.kicker || (index === 1 ? "VISUAL WORKFLOW" : "SELECTED PROJECTS")),
          title: String(module.title || (index === 1 ? "商业视觉工作流" : "精选项目深度解析")),
          description: String(module.description || ""),
          details: String(module.details || ""),
          targetAlbumId: String(module.targetAlbumId || ""),
          size: module.size === "full" ? "full" : "half",
          cardHeight: Math.max(180, Math.min(620, Number(module.cardHeight) || 222)),
          visible: module.visible !== false
        }))
      : base.modules;
    const sections = {
      modules: {
        ...base.sections.modules,
        ...(raw.sections?.modules || {}),
        visible: raw.sections?.modules?.visible !== false
      },
      portfolio: {
        ...base.sections.portfolio,
        ...(raw.sections?.portfolio || {}),
        intro: raw.sections?.portfolio?.intro && raw.sections.portfolio.intro !== raw.profile?.intro
          ? raw.sections.portfolio.intro
          : base.sections.portfolio.intro
      },
      about: {
        ...base.sections.about,
        ...(raw.sections?.about || {}),
        visible: raw.sections?.about?.visible !== false
      },
      contact: {
        ...base.sections.contact,
        ...(raw.sections?.contact || {}),
        headlineSize: Math.max(32, Math.min(96, Number(raw.sections?.contact?.headlineSize ?? base.sections.contact.headlineSize))),
        visible: raw.sections?.contact?.visible !== false
      }
    };
    const customModules = Array.isArray(raw.customModules)
      ? raw.customModules.map((module) => ({
          id: module.id || uid("story"),
          kicker: String(module.kicker || "CUSTOM MODULE"),
          title: String(module.title || "自定义模块"),
          body: String(module.body || ""),
          visible: module.visible !== false
        }))
      : base.customModules;
    const categoryMeta = raw.categoryMeta && typeof raw.categoryMeta === "object"
      ? { ...raw.categoryMeta }
      : {};
    for (const album of albums) {
      const name = album.category || "其他作品";
      if (!categoryMeta[name]) {
        categoryMeta[name] = {
          title: name,
          description: "",
          banner: "",
          bannerFrame: normalizeFrame(),
          layout: "split",
          visible: true
        };
      }
      categoryMeta[name].bannerFrame = normalizeFrame(categoryMeta[name].bannerFrame);
      categoryMeta[name].visible = categoryMeta[name].visible !== false;
      categoryMeta[name].layout = categoryMeta[name].layout === "grid" ? "grid" : "split";
      categoryMeta[name].gridCount = normalizeCategoryCount(categoryMeta[name].gridCount, 3, 4, 3);
      categoryMeta[name].stripCount = normalizeCategoryCount(categoryMeta[name].stripCount, 1, 3, 3);
      categoryMeta[name].imageLabels = normalizeCategoryImageLabels(categoryMeta[name].imageLabels);
      if (!categoryMeta[name].albumLayouts || typeof categoryMeta[name].albumLayouts !== "object") {
        categoryMeta[name].albumLayouts = {};
      }
      categoryMeta[name].albumLayouts[album.id] = normalizeAlbumLayoutRecord(
        categoryMeta[name].albumLayouts[album.id],
        categoryMeta[name]
      );
    }
    return {
      version: 17,
      profile: {
        ...base.profile,
        ...(raw.profile || {}),
        heroFrame: normalizeFrame(raw.profile?.heroFrame),
        introSize: Math.max(12, Math.min(28, Number(raw.profile?.introSize ?? base.profile.introSize))),
        emailLink: raw.profile?.emailLink === true
      },
      theme,
      modules: baseModules,
      sections,
      customModules,
      categoryMeta,
      albums
    };
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttr(value) {
    return escapeHTML(value).replace(/`/g, "&#096;");
  }

  function safeCssColor(value, fallback) {
    return /^#[0-9a-f]{6}$/i.test(String(value || "")) ? value : fallback;
  }

  function initials(name) {
    const text = String(name || "").trim();
    if (!text) return "F";
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length > 1) return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase();
    return text.slice(0, 2).toUpperCase();
  }

  function containsCjk(value) {
    return /[\u3400-\u9fff]/.test(String(value || ""));
  }

  function visibleAlbums() {
    return state.albums.filter((album) => album.visible !== false);
  }

  function getAlbum(id) {
    return state.albums.find((album) => album.id === id);
  }

  function ensureCategoryMeta() {
    if (!state.categoryMeta || typeof state.categoryMeta !== "object") state.categoryMeta = {};
    for (const album of state.albums) {
      const name = album.category || "其他作品";
      if (!state.categoryMeta[name]) {
        state.categoryMeta[name] = {
          title: name,
          description: "",
          banner: "",
          bannerFrame: normalizeFrame(),
          layout: "split",
          visible: true
        };
      }
      state.categoryMeta[name].bannerFrame = normalizeFrame(state.categoryMeta[name].bannerFrame);
      state.categoryMeta[name].visible = state.categoryMeta[name].visible !== false;
      state.categoryMeta[name].layout = state.categoryMeta[name].layout === "grid" ? "grid" : "split";
      state.categoryMeta[name].gridCount = normalizeCategoryCount(state.categoryMeta[name].gridCount, 3, 4, 3);
      state.categoryMeta[name].stripCount = normalizeCategoryCount(state.categoryMeta[name].stripCount, 1, 3, 3);
      state.categoryMeta[name].imageLabels = normalizeCategoryImageLabels(state.categoryMeta[name].imageLabels);
      if (!state.categoryMeta[name].albumLayouts || typeof state.categoryMeta[name].albumLayouts !== "object") {
        state.categoryMeta[name].albumLayouts = {};
      }
      state.categoryMeta[name].albumLayouts[album.id] = normalizeAlbumLayoutRecord(
        state.categoryMeta[name].albumLayouts[album.id],
        state.categoryMeta[name]
      );
    }
    return state.categoryMeta;
  }

  function isPrivateAlbum(album) {
    return Boolean(album?.password || album?.encrypted || album?.private);
  }

  function setNested(target, path, value) {
    const parts = path.split(".");
    let cursor = target;
    for (let index = 0; index < parts.length - 1; index += 1) {
      cursor = cursor[parts[index]];
    }
    cursor[parts.at(-1)] = value;
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) {
        reject(new Error("IndexedDB unavailable"));
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function readStoredProject() {
    if (!db) return null;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const request = transaction.objectStore(STORE_NAME).get(PROJECT_KEY);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async function writeStoredProject(project) {
    if (!db) return;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      transaction.objectStore(STORE_NAME).put(project, PROJECT_KEY);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  function setSaveState(mode, text) {
    ELEMENTS.saveState.classList.toggle("is-saving", mode === "saving");
    ELEMENTS.saveState.classList.toggle("is-error", mode === "error");
    ELEMENTS.saveState.querySelector("span:last-child").textContent = text;
  }

  function saveSoon() {
    if (isHydrating) return;
    setSaveState("saving", "保存中…");
    clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      saveNow().catch(() => {
        setSaveState("error", "保存失败");
        showToast("浏览器暂时无法保存项目，请先导出项目文件。", true);
      });
    }, SAVE_DELAY);
  }

  async function saveNow() {
    clearTimeout(saveTimer);
    try {
      await writeStoredProject(state);
      setSaveState("saved", "已自动保存");
    } catch (error) {
      setSaveState("error", "保存失败");
      throw error;
    }
  }

  async function init() {
    cacheElements();
    hydrateIcons();
    bindGlobalEvents();
    try {
      db = await openDatabase();
      const stored = await readStoredProject();
      state = normalizeState(stored);
    } catch {
      state = createInitialState();
      setSaveState("error", "仅本次会话保存");
    }
    isHydrating = true;
    renderPanel();
    renderPreview();
    isHydrating = false;
    if (!db) showToast("未检测到本地数据库，请用导出的项目文件备份内容。", true);
  }

  function cacheElements() {
    ELEMENTS.saveState = document.querySelector("#save-state");
    ELEMENTS.panelKicker = document.querySelector("#panel-kicker");
    ELEMENTS.panelTitle = document.querySelector("#panel-title");
    ELEMENTS.panelDescription = document.querySelector("#panel-description");
    ELEMENTS.panelContent = document.querySelector("#panel-content");
    ELEMENTS.sitePreview = document.querySelector("#site-preview");
    ELEMENTS.previewBrowser = document.querySelector("#preview-browser");
    ELEMENTS.previewSummary = document.querySelector("#preview-summary");
    ELEMENTS.albumDialog = document.querySelector("#album-dialog");
    ELEMENTS.albumDialogTitle = document.querySelector("#album-dialog-title");
    ELEMENTS.albumDialogKicker = document.querySelector("#album-dialog-kicker");
    ELEMENTS.albumMainImage = document.querySelector("#album-main-image");
    ELEMENTS.albumImageCaption = document.querySelector("#album-image-caption");
    ELEMENTS.albumThumbnails = document.querySelector("#album-thumbnails");
    ELEMENTS.albumVariantTabs = document.querySelector("#album-variant-tabs");
    ELEMENTS.unlockDialog = document.querySelector("#unlock-dialog");
    ELEMENTS.unlockForm = document.querySelector("#unlock-form");
    ELEMENTS.unlockTitle = document.querySelector("#unlock-title");
    ELEMENTS.unlockAlbumName = document.querySelector("#unlock-album-name");
    ELEMENTS.unlockPassword = document.querySelector("#unlock-password");
    ELEMENTS.unlockMessage = document.querySelector("#unlock-message");
    ELEMENTS.featureDialog = document.querySelector("#feature-dialog");
    ELEMENTS.featureDialogKicker = document.querySelector("#feature-dialog-kicker");
    ELEMENTS.featureDialogTitle = document.querySelector("#feature-dialog-title");
    ELEMENTS.featureDialogDescription = document.querySelector("#feature-dialog-description");
    ELEMENTS.featureDialogBody = document.querySelector("#feature-dialog-body");
    ELEMENTS.hoverPreview = document.querySelector("#site-hover-preview");
    ELEMENTS.cropDialog = document.querySelector("#crop-dialog");
    ELEMENTS.cropTitle = document.querySelector("#crop-title");
    ELEMENTS.cropRatioLabel = document.querySelector("#crop-ratio-label");
    ELEMENTS.cropStage = document.querySelector("#crop-stage");
    ELEMENTS.cropImage = document.querySelector("#crop-image");
    ELEMENTS.cropSelection = document.querySelector("#crop-selection");
    ELEMENTS.cropZoom = document.querySelector("#crop-zoom");
    ELEMENTS.cropZoomOutput = document.querySelector("#crop-zoom-output");
    ELEMENTS.imagePickerDialog = document.querySelector("#image-picker-dialog");
    ELEMENTS.imagePickerTitle = document.querySelector("#image-picker-title");
    ELEMENTS.imagePickerDescription = document.querySelector("#image-picker-description");
    ELEMENTS.imagePickerGrid = document.querySelector("#image-picker-grid");
    ELEMENTS.helpDialog = document.querySelector("#help-dialog");
    ELEMENTS.projectFileInput = document.querySelector("#project-file-input");
    ELEMENTS.assetFileInput = document.querySelector("#asset-file-input");
    ELEMENTS.toast = document.querySelector("#toast");
    ELEMENTS.progressOverlay = document.querySelector("#progress-overlay");
    ELEMENTS.progressTitle = document.querySelector("#progress-title");
    ELEMENTS.progressDetail = document.querySelector("#progress-detail");
  }

  function bindGlobalEvents() {
    document.addEventListener("click", handleDocumentClick);
    ELEMENTS.panelContent.addEventListener("input", handlePanelInput);
    ELEMENTS.panelContent.addEventListener("change", handlePanelChange);
    ELEMENTS.sitePreview.addEventListener("click", handlePreviewClick);
    ELEMENTS.sitePreview.addEventListener("pointerover", handlePreviewPointerOver);
    ELEMENTS.sitePreview.addEventListener("pointerdown", handleModuleEditPointerDown);
    ELEMENTS.hoverPreview.addEventListener("pointerenter", clearHoverCloseTimer);
    ELEMENTS.hoverPreview.addEventListener("click", handleHoverPreviewClick);
    ELEMENTS.cropStage.addEventListener("pointerdown", handleCropPointerDown);
    ELEMENTS.cropStage.addEventListener("pointermove", handleCropPointerMove);
    ELEMENTS.cropStage.addEventListener("pointerup", handleCropPointerUp);
    ELEMENTS.cropStage.addEventListener("pointercancel", handleCropPointerUp);
    ELEMENTS.cropImage.addEventListener("load", handleCropImageLoad);
    ELEMENTS.cropZoom.addEventListener("input", handleCropZoom);
    ELEMENTS.cropDialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeCropEditor();
    });
    ELEMENTS.cropDialog.addEventListener("click", (event) => {
      if (event.target === ELEMENTS.cropDialog) closeCropEditor();
    });
    ELEMENTS.imagePickerDialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeImagePicker();
    });
    ELEMENTS.imagePickerDialog.addEventListener("click", (event) => {
      if (event.target === ELEMENTS.imagePickerDialog) closeImagePicker();
    });
    document.addEventListener("pointermove", handleHoverPointerMove);
    ELEMENTS.unlockForm.addEventListener("submit", handleUnlockSubmit);
    ELEMENTS.assetFileInput.addEventListener("change", handleAssetFileInput);
    ELEMENTS.projectFileInput.addEventListener("change", handleProjectFileInput);
    ELEMENTS.albumDialog.addEventListener("click", (event) => {
      if (event.target === ELEMENTS.albumDialog) closeAlbumViewer();
    });
    ELEMENTS.unlockDialog.addEventListener("click", (event) => {
      if (event.target === ELEMENTS.unlockDialog) closeUnlockDialog();
    });
    ELEMENTS.featureDialog.addEventListener("click", (event) => {
      if (event.target === ELEMENTS.featureDialog) ELEMENTS.featureDialog.close();
    });
    window.addEventListener("resize", () => {
      if (ELEMENTS.previewBrowser.dataset.viewport === "mobile") {
        ELEMENTS.previewBrowser.classList.toggle("is-mobile", window.innerWidth < 600);
      }
    });
  }

  function panelMeta() {
    if (activePanel === "works" && selectedAlbumId) {
      return {
        kicker: "WORKS / UPLOAD",
        title: "上传套图",
        description: "在独立页面管理封面、主副图和 A+ 图片；返回作品集列表后继续调整分类布局。"
      };
    }
    if (activePanel === "works") {
      return {
        kicker: "WORKS / 02",
        title: "作品集",
        description: "为每组作品建立独立页面，也可以为未公开内容设置访问密码。"
      };
    }
    if (activePanel === "modules") {
      return {
        kicker: "MODULES / 03",
        title: "首页模块",
        description: "自由新增、删除或拖动首页模块，并设置每个模块的宽度与详情内容。"
      };
    }
    if (activePanel === "content") {
      return {
        kicker: "CONTENT / 04",
        title: "页面内容",
        description: "编辑分类作品区、关于模块和个人评价，也可以继续添加自定义内容模块。"
      };
    }
    if (activePanel === "theme") {
      return {
        kicker: "APPEARANCE / 05",
        title: "外观与版式",
        description: "选择一个起点，再调整颜色、字体、作品比例和信息密度。"
      };
    }
    return {
      kicker: "PROFILE / 01",
      title: "个人资料",
      description: "先建立你的基础信息，再添加作品集与访问密码。"
    };
  }

  function renderPanel() {
    const meta = panelMeta();
    ELEMENTS.panelKicker.textContent = meta.kicker;
    ELEMENTS.panelTitle.textContent = meta.title;
    ELEMENTS.panelDescription.textContent = meta.description;
    document.querySelectorAll(".rail-button[data-panel]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.panel === activePanel);
    });

    if (activePanel === "works") {
      ELEMENTS.panelContent.innerHTML = selectedAlbumId ? albumEditorMarkup() : worksPanelMarkup();
    } else if (activePanel === "modules") {
      ELEMENTS.panelContent.innerHTML = modulesPanelMarkup();
    } else if (activePanel === "content") {
      ELEMENTS.panelContent.innerHTML = contentPanelMarkup();
    } else if (activePanel === "theme") {
      ELEMENTS.panelContent.innerHTML = themePanelMarkup();
    } else {
      ELEMENTS.panelContent.innerHTML = profilePanelMarkup();
    }
    hydrateIcons(ELEMENTS.panelContent);
    setupCollapsibleSections();
    bindDropTargets();
    updateMediaPreviewMeta();
    updatePreviewSummary();
  }

  function profilePanelMarkup() {
    const profile = state.profile;
    return `
      <div class="form-section">
        <div class="section-title">
          <h2>首页视觉</h2>
          <span>HERO</span>
        </div>
        ${mediaUploadMarkup({
          src: profile.hero,
          action: "upload-hero",
          cropAction: "crop-hero",
          drop: "hero",
          frame: profile.heroFrame,
          previewLabel: "首页横幅",
          previewSize: "1920×400",
          title: "更换头部背景",
          hint: "自动模糊处理，不会直接作为照片展示",
          emptyTitle: "点击或拖入一张头部背景",
          emptyHint: "JPG、PNG、WebP，建议有丰富色彩或纹理"
        })}
        <label class="field">
          <span>背景水印文字</span>
          <input type="text" data-bind="profile.watermark" value="${escapeAttr(profile.watermark || "DESIGN")}" placeholder="例如：DESIGN" maxlength="24" />
        </label>
        <label class="field">
          <span>背景模糊</span>
          <span class="range-row">
            <input type="range" min="0" max="36" step="1" value="${Number(profile.heroBlur ?? 18)}" data-bind="profile.heroBlur" />
            <output class="range-output">${Number(profile.heroBlur ?? 18)} px</output>
          </span>
        </label>
        <label class="field">
          <span>背景可见度</span>
          <span class="range-row">
            <input type="range" min="0.15" max="1" step="0.05" value="${Number(profile.heroOpacity ?? 0.7)}" data-bind="profile.heroOpacity" />
            <output class="range-output">${Math.round(Number(profile.heroOpacity ?? 0.7) * 100)}%</output>
          </span>
        </label>
      </div>

      <div class="form-section">
        <div class="section-title">
          <h2>基本资料</h2>
          <span>IDENTITY</span>
        </div>
        <label class="field">
          <span>姓名 / 品牌名</span>
          <input type="text" data-bind="profile.name" value="${escapeAttr(profile.name)}" placeholder="例如：林知遥" />
        </label>
        <label class="field">
          <span>英文名或字母标记</span>
          <input type="text" data-bind="profile.displayName" value="${escapeAttr(profile.displayName)}" placeholder="例如：LIN ZHIYAO" />
        </label>
        <label class="field">
          <span>职业角色</span>
          <input type="text" data-bind="profile.role" value="${escapeAttr(profile.role)}" placeholder="例如：品牌与数字产品设计师" />
        </label>
        <label class="field">
          <span>首页短句</span>
          <textarea data-bind="profile.intro" placeholder="用一两句话说明你做什么、为谁创造价值">${escapeHTML(profile.intro)}</textarea>
        </label>
        <label class="field">
          <span>首页短句字号</span>
          <span class="range-row">
            <input type="range" min="12" max="28" step="1" value="${Number(profile.introSize ?? 17)}" data-bind="profile.introSize" />
            <output class="range-output">${Number(profile.introSize ?? 17)} px</output>
          </span>
          <small>推荐使用 16–18 px，可根据短句长度调整。</small>
        </label>
        <label class="field">
          <span>顶部小标题</span>
          <input type="text" data-bind="profile.kicker" value="${escapeAttr(profile.kicker)}" placeholder="INDEPENDENT DESIGNER / SHANGHAI" />
        </label>
      </div>

      <div class="form-section">
        <div class="section-title">
          <h2>关于与联系</h2>
          <span>ABOUT</span>
        </div>
        <label class="field">
          <span>关于你</span>
          <textarea data-section-field="about.body" placeholder="介绍你的工作方法、关注领域或经历">${escapeHTML(state.sections.about.body)}</textarea>
        </label>
        <div class="field-grid">
          <label class="field">
            <span>所在城市</span>
            <input type="text" data-bind="profile.location" value="${escapeAttr(profile.location)}" placeholder="上海，中国" />
          </label>
          <label class="field">
            <span>当前状态</span>
            <input type="text" data-bind="profile.availability" value="${escapeAttr(profile.availability)}" placeholder="可接洽新项目" />
          </label>
        </div>
        <label class="field">
          <span>联系邮箱</span>
          <input type="email" data-bind="profile.email" value="${escapeAttr(profile.email)}" placeholder="hello@example.com" />
        </label>
        <div class="switch-row">
          <span class="switch-row-copy">
            <strong>邮箱地址可点击</strong>
            <small>关闭后底部地址只作为文字展示，不触发邮件客户端</small>
          </span>
          <button class="toggle" type="button" role="switch" aria-pressed="${profile.emailLink === true}" aria-label="邮箱地址可点击" data-action="toggle-email-link"></button>
        </div>
        <label class="field">
          <span>个人网站 / 社交主页</span>
          <input type="text" data-bind="profile.website" value="${escapeAttr(profile.website)}" placeholder="your.site" />
        </label>
      </div>
    `;
  }

  function worksPanelMarkup() {
    const meta = ensureCategoryMeta();
    const categories = [...new Set(state.albums.map((album) => album.category || "其他作品"))];
    const portfolio = state.sections.portfolio;
    const albumRow = (album) => `
      <div class="album-list-item ${album.visible === false ? "is-hidden" : ""}">
        <button class="album-list-main" type="button" data-action="select-album" data-album-id="${escapeAttr(album.id)}">
          <span class="album-list-thumb">
            ${album.cover ? `<img src="${escapeAttr(album.cover)}" alt="" />` : ""}
          </span>
          <span class="album-list-copy">
            <span class="album-copy-head">
              <strong>${escapeHTML(album.title || "未命名作品集")}</strong>
            </span>
            <span class="album-copy-meta">${escapeHTML(album.category || "SELECTED WORK")} · ${escapeHTML(album.year)} · ${albumImages(album, "main").length} 主图${albumImages(album, "aplus").length ? ` · ${albumImages(album, "aplus").length} A+` : ""}</span>
            <span class="album-upload-hint">进入上传套图页面 ${icon("arrow-right", 9)}</span>
          </span>
        </button>
        <span class="album-list-meta">
          <span class="mini-badge ${isPrivateAlbum(album) ? "is-locked" : "is-public"}">
            ${icon(isPrivateAlbum(album) ? "lock" : "check", 10)}
            ${isPrivateAlbum(album) ? "加密" : "公开"}
          </span>
          <span class="album-visibility-control">
            <span class="album-visibility-label">${album.visible === false ? "隐藏" : "公开"}</span>
            <button class="toggle" type="button" role="switch" aria-pressed="${album.visible !== false}" aria-label="${album.visible === false ? "显示" : "隐藏"}作品集" data-action="toggle-album-list-visible" data-album-id="${escapeAttr(album.id)}"></button>
          </span>
        </span>
      </div>
    `;
    const categoryModules = categories.map((name) => {
      const item = meta[name] || {};
      const albums = state.albums.filter((album) => (album.category || "其他作品") === name);
      const banner = item.banner || albums[0]?.cover || "";
      return `
        <section class="form-section category-module-editor" data-category-setting="${escapeAttr(name)}">
          <div class="section-title category-module-header">
            <h2>${escapeHTML(item.title || name)}</h2>
            <div class="category-header-actions">
              <span class="category-header-count">${albums.length} 个作品集</span>
              <button class="category-visibility-button ${item.visible === false ? "is-hidden" : ""}" type="button" role="switch" aria-pressed="${item.visible !== false}" aria-label="${item.visible === false ? "展示" : "隐藏"}这个分类" data-action="toggle-category-visible" data-category-name="${escapeAttr(name)}">
                <span class="category-visibility-copy">${item.visible === false ? "隐藏" : "展示"}</span>
                <span class="toggle" aria-hidden="true"></span>
              </button>
            </div>
          </div>
          ${mediaUploadMarkup({
            src: banner,
            action: "upload-category-banner",
            cropAction: "crop-category-banner",
            drop: "category-banner",
            categoryName: name,
            frame: item.bannerFrame,
            previewLabel: "横幅",
            previewSize: "页面宽幅",
            title: "更换分类横幅",
            hint: "宽幅图片效果更好",
            emptyTitle: "上传分类横幅",
            emptyHint: "默认使用该分类第一个作品封面"
          })}
          <label class="field">
            <span>横幅标题</span>
            <input type="text" data-category-field="title" value="${escapeAttr(item.title || name)}" />
          </label>
          <label class="field">
            <span>分类说明</span>
            <textarea class="textarea-compact" data-category-field="description" placeholder="说明这个分类覆盖的项目类型">${escapeHTML(item.description || "")}</textarea>
          </label>
          <div class="album-list">
            ${albums.map((album) => `
              <div class="album-editor-group" data-album-editor-group="${escapeAttr(album.id)}">
                ${albumRow(album)}
                ${albumLayoutControlsMarkup(album, categoryAlbumLayout(item, album.id))}
                ${categoryStripEditorMarkup(categoryAlbumEntries(album, item), item)}
              </div>
            `).join("")}
          </div>
        </section>
      `;
    }).join("");

    return `
      <div class="form-section category-section-settings">
        <div class="section-title">
          <h2>分类作品区</h2>
          <span>SECTION</span>
        </div>
        <label class="field">
          <span>小标题</span>
          <input type="text" data-section-field="portfolio.kicker" value="${escapeAttr(portfolio.kicker)}" />
        </label>
        <label class="field">
          <span>主标题</span>
          <input type="text" data-section-field="portfolio.title" value="${escapeAttr(portfolio.title)}" />
        </label>
        <label class="field">
          <span>右侧说明</span>
          <textarea class="textarea-compact" data-section-field="portfolio.intro">${escapeHTML(portfolio.intro)}</textarea>
        </label>
      </div>
      <div class="album-list-header">
        <p>${state.albums.length} 个作品集</p>
        <button class="button button-primary" type="button" data-action="add-album">
          ${icon("plus", 14)}<span>新建作品集</span>
        </button>
      </div>
      <div class="category-module-list">${categoryModules}</div>
    `;
  }

  function albumLayoutControlsMarkup(album, settings) {
    const layout = settings.layout === "grid" ? "grid" : "split";
    return `
      <div class="album-layout-editor" data-album-layout-editor="${escapeAttr(album.id)}">
        <div class="field-grid">
          <label class="field">
            <span>作品布局</span>
            <select data-album-layout-field="layout">
              <option value="split" ${layout === "split" ? "selected" : ""}>左主图 + 右侧长条</option>
              <option value="grid" ${layout === "grid" ? "selected" : ""}>1:1 正方形网格</option>
            </select>
          </label>
          <label class="field">
            <span>${layout === "grid" ? "正方形数量" : "横幅数量"}</span>
            <select data-album-layout-field="${layout === "grid" ? "gridCount" : "stripCount"}">
              ${layout === "grid"
                ? `
                  <option value="3" ${settings.gridCount === 3 ? "selected" : ""}>3 个</option>
                  <option value="4" ${settings.gridCount === 4 ? "selected" : ""}>4 个</option>
                `
                : `
                  <option value="1" ${settings.stripCount === 1 ? "selected" : ""}>1 个</option>
                  <option value="2" ${settings.stripCount === 2 ? "selected" : ""}>2 个</option>
                  <option value="3" ${settings.stripCount === 3 ? "selected" : ""}>3 个</option>
                `}
            </select>
          </label>
        </div>
        <div class="category-layout-note">${icon("layout", 14)}<span>${layout === "grid" ? `此作品集使用响应式 ${settings.gridCount} 格正方形布局` : `此作品集使用左侧 1:1 主图 + 右侧最多 ${settings.stripCount} 条横幅`}</span></div>
      </div>
    `;
  }

  function categoryStripEditorMarkup(entries, meta = {}) {
    if (!entries.length) {
      return `
        <div class="category-strip-editor-list is-empty">
          <div class="category-strip-editor-head">
            <strong>作品集展示图片</strong>
            <span>0 张</span>
          </div>
          <p>这个作品集暂时没有可用于右侧展示的额外图片。</p>
        </div>
      `;
    }
    return `
      <div class="category-strip-editor-list">
        <div class="category-strip-editor-head">
          <strong>作品集展示图片</strong>
          <span>${entries.length} 张</span>
        </div>
        ${entries.map(({ album, image, assetId, variant }) => {
          const src = image?.src || album.cover || albumImages(album, "main")[0]?.src || "";
          const title = image?.title || album.title;
          const label = categoryImageLabel(meta, album, image);
          return `
            <div class="category-strip-editor-item">
              <span class="category-strip-editor-thumb">${src ? `<img src="${escapeAttr(src)}" alt="" style="${escapeAttr(frameStyle(categoryStripFrame(album, image)))}" />` : ""}</span>
              <span class="category-strip-editor-copy"><strong>${escapeHTML(title)}</strong><small>${escapeHTML(album.title)}</small></span>
              <span class="category-strip-editor-actions">
                <button class="button button-secondary" type="button" data-action="crop-category-strip" data-album-id="${escapeAttr(album.id)}" data-strip-id="${escapeAttr(assetId)}">${icon("crop", 13)}<span>调整</span></button>
                <button class="button button-secondary" type="button" data-action="choose-replacement-image" data-album-id="${escapeAttr(album.id)}" data-image-id="${escapeAttr(assetId)}" data-image-variant="${escapeAttr(variant || "main")}">${icon("image", 13)}<span>替换</span></button>
              </span>
              <div class="category-label-controls">
                <label class="category-label-field">
                  <span>角标文字</span>
                  <input type="text" maxlength="40" value="${escapeAttr(label.text)}" data-category-label-field="text" data-category-name="${escapeAttr(meta.title || album.category || "其他作品")}" data-label-key="${escapeAttr(label.key)}" placeholder="可输入中文或英文" />
                </label>
                <label class="category-label-size">
                  <span>字号</span>
                  <input type="range" min="10" max="42" step="1" value="${label.size}" data-category-label-field="size" data-category-name="${escapeAttr(meta.title || album.category || "其他作品")}" data-label-key="${escapeAttr(label.key)}" />
                  <output>${label.size} px</output>
                </label>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function modulesPanelMarkup() {
    return `
      <div class="module-panel-header">
        <p>${state.modules.length} 个首页模块</p>
        <button class="button button-primary" type="button" data-action="add-module">
          ${icon("plus", 14)}<span>新增模块</span>
        </button>
      </div>
      <div class="switch-row module-section-visibility">
        <span class="switch-row-copy">
          <strong>显示首页模块区</strong>
          <small>关闭后整个模块区域隐藏，后续内容自动上移</small>
        </span>
        <button class="toggle" type="button" role="switch" aria-pressed="${state.sections.modules.visible !== false}" aria-label="显示首页模块区" data-action="toggle-modules-section-visible"></button>
      </div>
      <div class="module-panel-intro">
        <span>${icon("layout", 18)}</span>
        <p>拖动右侧预览卡片右下角，可以调整半宽/整行与高度。</p>
      </div>
      ${state.modules.map((module, index) => `
        <section class="form-section module-editor" data-module-editor="${escapeAttr(module.id)}">
          <div class="module-editor-toolbar">
            <strong>首页模块 ${String(index + 1).padStart(2, "0")}</strong>
            <span class="module-editor-tools">
              <button class="icon-button icon-button-sm icon-button-danger" type="button" data-action="remove-module" data-module-id="${escapeAttr(module.id)}" aria-label="删除模块" title="删除模块">${icon("trash", 12)}</button>
            </span>
          </div>
          <label class="field">
            <span>模块小标题</span>
            <input type="text" data-module-field="kicker" value="${escapeAttr(module.kicker)}" placeholder="SELECTED PROJECTS" />
          </label>
          <label class="field">
            <span>模块标题</span>
            <input type="text" data-module-field="title" value="${escapeAttr(module.title)}" placeholder="精选项目深度解析" />
          </label>
          <label class="field">
            <span>一句说明</span>
            <textarea class="textarea-compact" data-module-field="description" placeholder="从项目策略到视觉落地">${escapeHTML(module.description)}</textarea>
          </label>
          <label class="field">
            <span>点击后的详细文字</span>
            <textarea data-module-field="details" placeholder="每段之间空一行">${escapeHTML(module.details)}</textarea>
          </label>
          <label class="field">
            <span>详情绑定</span>
            <select data-module-field="targetAlbumId">
              <option value="" ${!module.targetAlbumId ? "selected" : ""}>不绑定，只展示上面的详细文字</option>
              ${state.albums.map((album) => `
                <option value="${escapeAttr(album.id)}" ${module.targetAlbumId === album.id ? "selected" : ""}>${escapeHTML(album.title)}${isPrivateAlbum(album) ? "（加密）" : ""}</option>
              `).join("")}
            </select>
            <small>绑定后点击模块会直接进入该作品集；加密作品集仍需输入密码。</small>
          </label>
          <label class="field">
            <span>模块宽度</span>
            <select data-module-field="size">
              <option value="half" ${module.size !== "full" ? "selected" : ""}>半宽</option>
              <option value="full" ${module.size === "full" ? "selected" : ""}>整行宽度</option>
            </select>
          </label>
          <div class="switch-row module-visibility-row">
            <span class="switch-row-copy">
              <strong>首页展示</strong>
              <small>关闭后保留内容，但不在预览和发布页显示</small>
            </span>
            <button class="toggle" type="button" role="switch" aria-pressed="${module.visible !== false}" aria-label="在首页展示此模块" data-action="toggle-module-visible" data-module-id="${escapeAttr(module.id)}"></button>
          </div>
          <button class="button button-secondary button-wide" type="button" data-action="preview-module" data-module-id="${escapeAttr(module.id)}">
            ${icon("eye", 15)}<span>预览模块详情</span>
          </button>
        </section>
      `).join("")}
    `;
  }

  function contentPanelMarkup() {
    const about = state.sections.about;
    const contact = state.sections.contact;
    return `
      <div class="form-section">
        <div class="section-title">
          <h2>关于 / 个人评价</h2>
          <span>ABOUT</span>
        </div>
        <div class="content-guidance">
          ${icon("sparkles", 18)}
          <p>面向面试官和部门主管，建议写“专业定位、工作方式、可验证的经验”，少用空泛的自我评价。</p>
        </div>
        <div class="switch-row">
          <span class="switch-row-copy">
            <strong>显示关于模块</strong>
            <small>关闭后首页不会显示这一段</small>
          </span>
          <button class="toggle" type="button" role="switch" aria-pressed="${about.visible !== false}" aria-label="显示关于模块" data-action="toggle-about-visible"></button>
        </div>
        <div class="field-grid">
          <label class="field">
            <span>小标题</span>
            <input type="text" data-section-field="about.kicker" value="${escapeAttr(about.kicker)}" placeholder="ABOUT" />
          </label>
          <label class="field">
            <span>标题</span>
            <input type="text" data-section-field="about.title" value="${escapeAttr(about.title)}" placeholder="关于我" />
          </label>
        </div>
        <label class="field">
          <span>介绍正文</span>
          <textarea data-section-field="about.body">${escapeHTML(about.body)}</textarea>
        </label>
        <label class="field">
          <span>核心优势（每行一项）</span>
          <textarea data-section-field="about.strengths" placeholder="品牌策略与视觉系统&#10;数字产品与交互体验">${escapeHTML(about.strengths)}</textarea>
        </label>
      </div>

      <div class="form-section">
        <div class="section-title">
          <h2>底部联系模块</h2>
          <span>CONTACT</span>
        </div>
        <div class="switch-row">
          <span class="switch-row-copy">
            <strong>显示联系模块</strong>
            <small>关闭后首页不会显示这一整段</small>
          </span>
          <button class="toggle" type="button" role="switch" aria-pressed="${contact.visible !== false}" aria-label="显示联系模块" data-action="toggle-contact-visible"></button>
        </div>
        <label class="field">
          <span>小标题</span>
          <input type="text" data-section-field="contact.kicker" value="${escapeAttr(contact.kicker)}" placeholder="START A CONVERSATION" />
        </label>
        <label class="field">
          <span>主文案</span>
          <input type="text" data-section-field="contact.headline" value="${escapeAttr(contact.headline)}" placeholder="${escapeAttr(state.profile.email || "hello@your.site")}" />
          <small>留空时自动使用个人资料中的联系邮箱</small>
        </label>
        <label class="field">
          <span>补充说明</span>
          <textarea class="textarea-compact" data-section-field="contact.note" placeholder="例如：欢迎联系讨论品牌、网站与视觉项目">${escapeHTML(contact.note)}</textarea>
        </label>
        <label class="field">
          <span>主文案字号</span>
          <span class="range-row">
            <input type="range" min="32" max="96" step="1" value="${Number(contact.headlineSize)}" data-section-field="contact.headlineSize" />
            <output class="range-output">${Number(contact.headlineSize)} px</output>
          </span>
        </label>
      </div>

      <div class="form-section">
        <div class="module-panel-header">
          <p>${state.customModules.length} 个自定义模块</p>
          <button class="button button-primary" type="button" data-action="add-custom-module">
            ${icon("plus", 14)}<span>新增内容</span>
          </button>
        </div>
        ${state.customModules.map((module, index) => `
          <div class="custom-module-editor" data-custom-module="${escapeAttr(module.id)}">
            <div class="module-editor-toolbar">
              <strong>自定义模块 ${String(index + 1).padStart(2, "0")}</strong>
              <span class="module-editor-tools">
                <button class="icon-button icon-button-sm" type="button" data-action="move-custom-up" data-custom-id="${escapeAttr(module.id)}" aria-label="上移" title="上移">${icon("arrow-up", 12)}</button>
                <button class="icon-button icon-button-sm" type="button" data-action="move-custom-down" data-custom-id="${escapeAttr(module.id)}" aria-label="下移" title="下移">${icon("arrow-down", 12)}</button>
                <button class="icon-button icon-button-sm icon-button-danger" type="button" data-action="remove-custom-module" data-custom-id="${escapeAttr(module.id)}" aria-label="删除内容" title="删除内容">${icon("trash", 12)}</button>
              </span>
            </div>
            <label class="field">
              <span>小标题</span>
              <input type="text" data-custom-field="kicker" value="${escapeAttr(module.kicker)}" placeholder="HOW I WORK" />
            </label>
            <label class="field">
              <span>标题</span>
              <input type="text" data-custom-field="title" value="${escapeAttr(module.title)}" placeholder="我的工作方式" />
            </label>
            <label class="field">
              <span>内容</span>
              <textarea data-custom-field="body">${escapeHTML(module.body)}</textarea>
            </label>
            <div class="switch-row">
              <span class="switch-row-copy"><strong>显示此模块</strong><small>关闭后不在发布页显示</small></span>
              <button class="toggle" type="button" role="switch" aria-pressed="${module.visible !== false}" aria-label="显示此模块" data-action="toggle-custom-visible" data-custom-id="${escapeAttr(module.id)}"></button>
            </div>
          </div>
        `).join("") || `<div class="empty-inline">${icon("file-text", 22)}<span>还没有自定义模块</span></div>`}
      </div>
    `;
  }

  function imageTilesMarkup(album, variant) {
    const images = albumImages(album, variant);
    return images.length
      ? images.map((image, index) => `
          <div class="image-tile">
            <img src="${escapeAttr(image.src)}" alt="${escapeAttr(image.title)}" />
            <span class="image-tile-index">${String(index + 1).padStart(2, "0")}</span>
            <span class="image-tile-actions">
              <button class="icon-button" type="button" data-action="move-image-left" data-image-id="${escapeAttr(image.id)}" data-image-variant="${variant}" aria-label="向前移动" title="向前移动">${icon("arrow-left", 12)}</button>
              <button class="icon-button" type="button" data-action="move-image-right" data-image-id="${escapeAttr(image.id)}" data-image-variant="${variant}" aria-label="向后移动" title="向后移动">${icon("arrow-right", 12)}</button>
              <button class="icon-button icon-button-danger" type="button" data-action="delete-image" data-image-id="${escapeAttr(image.id)}" data-image-variant="${variant}" aria-label="删除图片" title="删除图片">${icon("trash", 12)}</button>
            </span>
          </div>
        `).join("")
      : `<div class="empty-inline" style="grid-column:1/-1">${icon("image", 22)}<span>还没有图片<br>点击下方按钮上传</span></div>`;
  }

  function albumEditorMarkup() {
    const album = getAlbum(selectedAlbumId);
    if (!album) {
      selectedAlbumId = "";
      return worksPanelMarkup();
    }
    return `
      <div class="album-editor-head">
        <button class="back-button" type="button" data-action="back-to-albums">${icon("arrow-left", 14)}<span>全部作品</span></button>
        <div class="album-editor-actions">
          <button class="icon-button icon-button-sm" type="button" data-action="duplicate-album" aria-label="复制作品集" title="复制作品集">${icon("copy", 13)}</button>
          <button class="icon-button icon-button-sm icon-button-danger" type="button" data-action="delete-album" aria-label="删除作品集" title="删除作品集">${icon("trash", 13)}</button>
        </div>
      </div>

      <div class="form-section">
        <div class="section-title">
          <h2>作品信息</h2>
          <span>${escapeHTML(album.year)}</span>
        </div>
        <label class="field">
          <span>作品集标题</span>
          <input type="text" data-album-field="title" value="${escapeAttr(album.title)}" placeholder="例如：ARC / 品牌系统" />
        </label>
        <label class="field">
          <span>副标题</span>
          <input type="text" data-album-field="subtitle" value="${escapeAttr(album.subtitle)}" placeholder="项目英文名或客户名称" />
        </label>
        <div class="field-grid">
          <label class="field">
            <span>类别</span>
            <input type="text" data-album-field="category" value="${escapeAttr(album.category)}" placeholder="BRAND IDENTITY" />
          </label>
          <label class="field">
            <span>年份</span>
            <input type="text" data-album-field="year" value="${escapeAttr(album.year)}" placeholder="2026" />
          </label>
        </div>
        <label class="field">
          <span>项目简介</span>
          <textarea data-album-field="summary" placeholder="说明项目背景、你的角色和设计结果">${escapeHTML(album.summary)}</textarea>
        </label>
      </div>

      <div class="form-section">
        <div class="section-title">
          <h2>封面</h2>
          <span>COVER</span>
        </div>
        ${mediaUploadMarkup({
          src: album.cover,
          action: "upload-cover",
          cropAction: "crop-cover",
          drop: "cover",
          albumId: album.id,
          frame: album.coverFrame,
          previewLabel: "封面",
          previewSize: "1:1 页面贴片",
          title: "更换作品封面",
          hint: "公开作品会直接显示；加密作品会以锁定纹样代替",
          emptyTitle: "点击或拖入封面图片",
          emptyHint: "没有封面时会自动使用第一张作品图"
        })}
        <div class="switch-row">
          <span class="switch-row-copy">
            <strong>在首页显示</strong>
            <small>关闭后不会出现在发布页面</small>
          </span>
          <button class="toggle" type="button" role="switch" aria-pressed="${album.visible !== false}" aria-label="在首页显示" data-action="toggle-album-visible"></button>
        </div>
      </div>

      <div class="form-section">
        <div class="section-title">
          <h2>访问密码</h2>
          <span>ACCESS</span>
        </div>
        <label class="field">
          <span>密码（留空则公开）</span>
          <span class="input-with-action">
            <input type="password" data-album-field="password" value="${escapeAttr(album.password)}" maxlength="128" autocomplete="off" placeholder="设置一个访问密码" />
            <button class="field-action" type="button" data-action="toggle-album-password">显示</button>
          </span>
          <small>修改密码后需重新导出发布页。发布页只保存本组作品图的加密数据。</small>
        </label>
        <label class="field">
          <span>密码提示（可选）</span>
          <input type="text" data-album-field="passwordHint" value="${escapeAttr(album.passwordHint)}" placeholder="例如：请联系我获取密码" />
        </label>
      </div>

      <div class="form-section">
        <div class="section-title">
          <h2>主副图</h2>
          <span>${albumImages(album, "main").length} IMAGES</span>
        </div>
        <p class="field-note">用于作品卡片封面、鼠标悬停预览和客户提案主视觉。</p>
        <div class="image-grid">${imageTilesMarkup(album, "main")}</div>
        <button class="button button-secondary button-wide" type="button" data-action="add-main-media" data-drop="media" data-variant="main" data-album-id="${escapeAttr(album.id)}">
          ${icon("upload", 15)}<span>上传主副图</span>
        </button>
      </div>

      <div class="form-section">
        <div class="section-title">
          <h2>A+ / 详情页</h2>
          <span>${albumImages(album, "aplus").length} IMAGES</span>
        </div>
        <p class="field-note">同一作品集的 A+ 长图或详情内容，会作为悬停预览的第二个标签。</p>
        <div class="image-grid">${imageTilesMarkup(album, "aplus")}</div>
        <button class="button button-secondary button-wide" type="button" data-action="add-aplus-media" data-drop="media" data-variant="aplus" data-album-id="${escapeAttr(album.id)}">
          ${icon("upload", 15)}<span>上传 A+ 图片</span>
        </button>
      </div>
    `;
  }

  function mediaUploadMarkup({ src, action, cropAction, drop, albumId = "", categoryName = "", frame, previewLabel = "图片", previewSize = "", title, hint, emptyTitle, emptyHint }) {
    const hasImage = Boolean(src);
    const scopeAttributes = `${albumId ? ` data-album-id="${escapeAttr(albumId)}"` : ""}${categoryName ? ` data-category-name="${escapeAttr(categoryName)}"` : ""}`;
    return `
      <div class="media-upload ${hasImage ? "has-image" : "is-empty"}" data-drop="${escapeAttr(drop)}"${scopeAttributes}>
        ${hasImage ? `
          <img src="${escapeAttr(src)}" alt="" style="${escapeAttr(frameStyle(frame))}" data-media-image />
          <span class="media-upload-badge" data-media-meta data-label="${escapeAttr(previewLabel)}" data-size="${escapeAttr(previewSize)}">${escapeHTML(previewLabel)} · ${escapeHTML(previewSize || "加载中")}${previewSize ? " ✓" : ""}</span>
          <span class="media-upload-actions">
            <button class="media-upload-action" type="button" data-action="${escapeAttr(cropAction)}"${scopeAttributes}>调整</button>
            <button class="media-upload-action" type="button" data-action="${escapeAttr(action)}"${scopeAttributes}>替换</button>
          </span>
        ` : `
          <button class="media-upload-empty" type="button" data-action="${escapeAttr(action)}"${scopeAttributes}>
            <span class="media-upload-copy">
              ${icon("upload", 20)}
              <strong>${escapeHTML(emptyTitle)}</strong>
              <small>${escapeHTML(emptyHint)}</small>
            </span>
          </button>
        `}
      </div>
    `;
  }

  function updateMediaPreviewMeta() {
    ELEMENTS.panelContent.querySelectorAll("[data-media-meta]").forEach((meta) => {
      const image = meta.closest(".media-upload")?.querySelector("[data-media-image]");
      if (!image) return;
      const apply = () => {
        if (meta.dataset.size) {
          meta.textContent = `${meta.dataset.label} · ${meta.dataset.size} ✓`;
          return;
        }
        if (!image.naturalWidth || !image.naturalHeight) return;
        meta.textContent = `${meta.dataset.label} · ${image.naturalWidth}×${image.naturalHeight} ✓`;
      };
      if (image.complete) apply();
      else image.addEventListener("load", apply, { once: true });
    });
  }

  function setupCollapsibleSections() {
    const sections = [...ELEMENTS.panelContent.querySelectorAll(".form-section, .custom-module-editor")];
    sections.forEach((section, index) => {
      const header = section.querySelector(":scope > .section-title, :scope > .module-editor-toolbar");
      if (!header || header.querySelector(".section-collapse-toggle")) return;
      const stableId = section.dataset.moduleEditor || section.dataset.customModule || section.dataset.categorySetting || section.querySelector("[data-category-setting]")?.dataset.categorySetting || index;
      const key = `${activePanel}:${stableId}`;
      const title = header.querySelector("h2, strong");
      const toggle = document.createElement("i");
      toggle.className = "section-collapse-toggle";
      toggle.innerHTML = `<b>收起</b>${icon("chevron-right", 12)}`;
      toggle.setAttribute("aria-hidden", "true");
      if (title) title.insertAdjacentElement("afterend", toggle);
      else header.prepend(toggle);

      header.classList.add("is-collapsible-header");
      header.setAttribute("role", "button");
      header.setAttribute("tabindex", "0");
      header.title = "点击折叠或展开此分组";

      const setCollapsed = (collapsed) => {
        section.classList.toggle("is-collapsed", collapsed);
        header.setAttribute("aria-expanded", String(!collapsed));
        const toggleLabel = toggle.querySelector("b");
        if (toggleLabel) toggleLabel.textContent = collapsed ? "展开" : "收起";
        if (collapsed) collapsedSections.add(key);
        else collapsedSections.delete(key);
      };

      const toggleSection = (event) => {
        if (event.target.closest(".module-editor-tools, button, input, textarea, select")) return;
        event.preventDefault();
        setCollapsed(!section.classList.contains("is-collapsed"));
      };

      header.addEventListener("click", toggleSection);
      header.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") toggleSection(event);
      });

      const headerText = title?.textContent.trim() || "";
      let locateSelector = "";
      if (activePanel === "profile" && ["首页视觉", "基本资料"].includes(headerText)) locateSelector = ".site-resume-banner";
      if (activePanel === "profile" && headerText === "关于与联系") locateSelector = "#site-about";
      if (activePanel === "works" && headerText.startsWith("分类")) locateSelector = "#site-work";
      if (activePanel === "modules" && headerText.startsWith("首页模块")) locateSelector = "#site-projects";
      if (activePanel === "content" && headerText.startsWith("关于")) locateSelector = "#site-about";
      if (activePanel === "content" && headerText === "底部联系模块") locateSelector = "#site-contact";
      if (activePanel === "content" && header.querySelector("[data-custom-module]")) locateSelector = "#site-story";
      if (!locateSelector && activePanel === "content" && section.matches(".custom-module-editor")) locateSelector = "#site-story";
      if (locateSelector) {
        const locateButton = document.createElement("button");
        locateButton.type = "button";
        locateButton.className = "section-locate-button";
        locateButton.textContent = "定位";
        locateButton.title = "在实时预览中定位";
        locateButton.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const target = ELEMENTS.sitePreview.querySelector(locateSelector);
          if (!target) {
            showToast("该模块当前已关闭，请先开启显示。", true);
            return;
          }
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        toggle.insertAdjacentElement("afterend", locateButton);
      }

      const body = document.createElement("div");
      body.className = "section-collapse-body";
      [...section.childNodes].forEach((node) => {
        if (node !== header) body.append(node);
      });
      section.append(body);

      const collapsed = collapsedSections.has(key);
      setCollapsed(collapsed);
    });
  }

  function themePanelMarkup() {
    const theme = state.theme;
    const presets = Object.entries(THEME_PRESETS).map(([id, preset]) => `
      <button class="preset-button ${theme.preset === id ? "is-active" : ""}" type="button" data-theme-preset="${id}">
        <span class="preset-swatches">
          <i style="background:${preset.colors.bg}"></i>
          <i style="background:${preset.colors.surface}"></i>
          <i style="background:${preset.colors.accent}"></i>
          <i style="background:${preset.colors.text}"></i>
        </span>
        <strong>${escapeHTML(preset.label)}</strong>
      </button>
    `).join("");
    const colorRow = (label, key) => `
      <div class="color-row">
        <span class="color-swatch">
          <input type="color" value="${escapeAttr(theme[key])}" data-color="${key}" aria-label="${escapeAttr(label)}" />
        </span>
        <label>${escapeHTML(label)}</label>
        <input class="color-value" type="text" value="${escapeAttr(theme[key])}" data-color-text="${key}" aria-label="${escapeAttr(label)}色值" />
      </div>
    `;
    return `
      <div class="form-section">
        <div class="section-title">
          <h2>配色起点</h2>
          <span>PALETTE</span>
        </div>
        <div class="preset-grid">${presets}</div>
      </div>

      <div class="form-section">
        <div class="section-title">
          <h2>颜色</h2>
          <span>CUSTOM</span>
        </div>
        ${colorRow("页面背景", "bg")}
        ${colorRow("内容底色", "surface")}
        ${colorRow("正文颜色", "text")}
        ${colorRow("辅助文字", "muted")}
        ${colorRow("强调色", "accent")}
        ${colorRow("分隔线", "line")}
      </div>

      <div class="form-section">
        <div class="section-title">
          <h2>版式</h2>
          <span>LAYOUT</span>
        </div>
        <label class="field">
          <span>标题字体</span>
          <select data-bind="theme.font">
            <option value="serif" ${theme.font === "serif" ? "selected" : ""}>编辑衬线体</option>
            <option value="sans" ${theme.font === "sans" ? "selected" : ""}>现代无衬线体</option>
            <option value="mono" ${theme.font === "mono" ? "selected" : ""}>等宽档案感</option>
          </select>
        </label>
        <label class="field">
          <span>作品排列</span>
          <select data-bind="theme.layout">
            <option value="editorial" ${theme.layout === "editorial" ? "selected" : ""}>编辑错落双列</option>
            <option value="compact" ${theme.layout === "compact" ? "selected" : ""}>紧凑三列</option>
            <option value="list" ${theme.layout === "list" ? "selected" : ""}>横向列表</option>
          </select>
        </label>
        <label class="field">
          <span>作品封面比例</span>
          <select data-bind="theme.coverRatio">
            <option value="landscape" ${theme.coverRatio === "landscape" ? "selected" : ""}>横向 4:3</option>
            <option value="portrait" ${theme.coverRatio === "portrait" ? "selected" : ""}>纵向 3:4</option>
            <option value="square" ${theme.coverRatio === "square" ? "selected" : ""}>方形 1:1</option>
          </select>
        </label>
        <label class="field">
          <span>信息密度</span>
          <select data-bind="theme.density">
            <option value="comfortable" ${theme.density === "comfortable" ? "selected" : ""}>舒展留白</option>
            <option value="compact" ${theme.density === "compact" ? "selected" : ""}>紧凑信息</option>
          </select>
        </label>
        <label class="field">
          <span>图片圆角</span>
          <span class="range-row">
            <input type="range" min="0" max="18" step="1" value="${Number(theme.radius)}" data-bind="theme.radius" />
            <output class="range-output" id="radius-output">${Number(theme.radius)} px</output>
          </span>
        </label>
      </div>

      <div class="form-section">
        <div class="section-title">
          <h2>发布说明</h2>
          <span>EXPORT</span>
        </div>
        <div class="security-note">
          ${icon("shield", 20)}
          <p><strong>私密作品采用浏览器端加密。</strong>导出页不包含密码明文；访客输入密码后才解密对应图片。若需要防暴力破解、密码随时远程失效或访问日志，需要连接服务端。</p>
        </div>
        <button class="button button-secondary button-wide" type="button" data-action="reset-theme">恢复当前配色预设</button>
      </div>
    `;
  }

  function updatePreviewSummary() {
    const visible = visibleAlbums();
    const privateCount = visible.filter(isPrivateAlbum).length;
    ELEMENTS.previewSummary.textContent = `${visible.length} 个作品集${privateCount ? ` · ${privateCount} 个加密` : ""}`;
  }

  function themeVars(theme) {
    const bg = safeCssColor(theme.bg, "#f1eee6");
    const surface = safeCssColor(theme.surface, "#dfd8ca");
    const text = safeCssColor(theme.text, "#181a16");
    const muted = safeCssColor(theme.muted, "#6a6b64");
    const accent = safeCssColor(theme.accent, "#d75536");
    const line = safeCssColor(theme.line, "#c9c2b3");
    const radius = Math.max(0, Math.min(18, Number(theme.radius) || 0));
    return [
      `--site-bg:${bg}`,
      `--site-surface:${surface}`,
      `--site-text:${text}`,
      `--site-muted:${muted}`,
      `--site-accent:${accent}`,
      `--site-line:${line}`,
      `--site-radius:${radius}px`
    ].join(";");
  }

  function applyTheme(element, theme, profile) {
    element.setAttribute("style", themeVars(theme));
    element.dataset.layout = theme.layout || "editorial";
    element.dataset.font = theme.font || "serif";
    element.dataset.density = theme.density || "comfortable";
    element.style.setProperty("--font-display", theme.font === "sans"
      ? '"Aptos Display", "Segoe UI", "Microsoft YaHei", sans-serif'
      : theme.font === "mono"
        ? '"Cascadia Mono", Consolas, "Microsoft YaHei", monospace'
        : 'Georgia, "Times New Roman", "Songti SC", serif');
    element.dataset.profile = profile?.name || "";
  }

  function albumCardMarkup(album) {
    const privateAlbum = isPrivateAlbum(album);
    const cover = album.cover || "";
    const image = cover
      ? `<img src="${escapeAttr(cover)}" alt="${escapeAttr(album.title)}封面" loading="lazy" style="${escapeAttr(frameStyle(album.coverFrame))}" />`
      : "";
    const lock = privateAlbum
      ? `<span class="site-album-lock"><span>${icon("lock", 17)}</span></span>`
      : image;
    const mainCount = Number(album.imageCount ?? albumImages(album, "main").length);
    const aplusCount = Number(album.aplusCount ?? albumImages(album, "aplus").length);
    return `
      <button class="site-album" type="button" data-album-id="${escapeAttr(album.id)}" data-ratio="${escapeAttr(state.theme.coverRatio)}" aria-label="${privateAlbum ? "解锁并查看" : "查看"}${escapeAttr(album.title)}">
        <span class="site-album-media">${lock}</span>
        <span class="site-album-info">
          <span class="site-album-title">${escapeHTML(album.title)}</span>
          <span class="site-album-year">${escapeHTML(album.year || "")}</span>
          <span class="site-album-summary">${escapeHTML(album.summary || album.subtitle || "")}</span>
          <span class="site-album-tags">
            <span class="site-album-tag">${escapeHTML(album.category || "SELECTED WORK")}</span>
            <span class="site-album-tag">${privateAlbum ? icon("lock", 9) + "PRIVATE" : `${mainCount} 主图${aplusCount ? ` · ${aplusCount} A+` : ""}`}</span>
          </span>
        </span>
      </button>
    `;
  }

  function featureModuleMarkup(module, index, editing = false) {
    const linkedAlbum = module.targetAlbumId
      ? state.albums.find((album) => album.id === module.targetAlbumId)
      : null;
    const cardHeight = Math.max(180, Math.min(620, Number(module.cardHeight) || 222));
    return `
      <div class="site-feature-module ${module.size === "full" ? "is-full" : ""} ${editing ? "is-editing" : ""}" data-module-edit-card="${escapeAttr(module.id)}" style="--module-height:${cardHeight}px">
        <button class="site-feature-card site-feature-card-${index % 2 === 0 ? "project" : "workflow"}" type="button" data-module-id="${escapeAttr(module.id)}">
          <span class="site-feature-copy">
            <span class="site-feature-kicker"><i></i>${escapeHTML(module.kicker || "SELECTED PROJECTS")}</span>
            <span class="site-feature-title">${escapeHTML(module.title || "精选项目深度解析")}</span>
            <span class="site-feature-description">${escapeHTML(module.description || "")}</span>
            <span class="site-feature-action">${linkedAlbum ? "进入作品集" : "查看完整内容"} ${icon("arrow-right", 12)}</span>
          </span>
          <span class="site-feature-art" aria-hidden="true">
            <i class="feature-orbit"></i>
            <i class="feature-node feature-node-a">${icon(index === 0 ? "layers" : "sparkles", 17)}</i>
            <i class="feature-node feature-node-b">${icon(index === 0 ? "folder" : "check", 13)}</i>
            <i class="feature-line"></i>
          </span>
        </button>
        ${editing ? `
          <span class="site-module-resize" data-module-resize="${escapeAttr(module.id)}" aria-hidden="true"></span>
        ` : ""}
      </div>
    `;
  }

  function categoryStripAssetId(image = null) {
    return image?.id || "cover";
  }

  function categoryImageLabelKey(album, image = null) {
    return `${album?.id || "album"}:${categoryStripAssetId(image)}`;
  }

  function categoryImageLabel(meta, album, image = null) {
    const key = categoryImageLabelKey(album, image);
    const saved = meta?.imageLabels?.[key] || {};
    const fallbackText = image?.title || album?.title || "";
    const fallbackSize = categoryAlbumLayout(meta, album?.id).layout === "grid" ? 19 : 21;
    return {
      key,
      text: typeof saved.text === "string" ? saved.text : fallbackText,
      size: normalizeCategoryCount(saved.size, 10, 42, fallbackSize)
    };
  }

  function categoryLabelStyle(label) {
    return `--category-label-size:${label.size}px`;
  }

  function categoryStripFrame(album, image = null) {
    const assetId = categoryStripAssetId(image);
    return normalizeFrame(album?.stripFrames?.[assetId]);
  }

  function uniqueCategoryEntries(candidates, count) {
    const entries = [];
    const seenSources = new Set();
    for (const entry of candidates) {
      const src = entry.image?.src || entry.album?.cover || albumImages(entry.album, "main")[0]?.src || "";
      const identity = src || `${entry.album?.id || "album"}:${entry.assetId || "cover"}`;
      if (seenSources.has(identity)) continue;
      seenSources.add(identity);
      entries.push(entry);
      if (entries.length >= count) break;
    }
    return entries;
  }

  function albumStripEntries(album, count = 3) {
    const limit = normalizeCategoryCount(count, 1, 3, 3);
    if (!album) return [];
    const primarySource = album.cover || albumImages(album, "main")[0]?.src || "";
    const aplusEntries = albumImages(album, "aplus")
      .filter((image) => image?.src)
      .map((image) => ({
        album,
        image,
        assetId: categoryStripAssetId(image),
        variant: "aplus"
      }));
    const mainEntries = albumImages(album, "main")
      .filter((image) => image?.src && image.src !== primarySource)
      .map((image) => ({
        album,
        image,
        assetId: categoryStripAssetId(image),
        variant: "main"
      }));
    return uniqueCategoryEntries([...aplusEntries, ...mainEntries], limit);
  }

  function categoryAlbumEntries(album, meta = {}) {
    if (!album) return [];
    const settings = categoryAlbumLayout(meta, album.id);
    if (settings.layout !== "grid") {
      return albumStripEntries(album, settings.stripCount);
    }
    return uniqueCategoryEntries([
      ...albumImages(album, "main").map((image) => ({
        album,
        image,
        assetId: categoryStripAssetId(image),
        variant: "main"
      })),
      ...albumImages(album, "aplus").map((image) => ({
        album,
        image,
        assetId: categoryStripAssetId(image),
        variant: "aplus"
      }))
    ], settings.gridCount);
  }

  function categoryAlbumLayout(meta, albumId) {
    return normalizeAlbumLayoutRecord(meta?.albumLayouts?.[albumId], meta);
  }

  function categoryGridEntries(items, count = 3) {
    const limit = normalizeCategoryCount(count, 3, 4, 3);
    const candidates = [];
    for (const album of items) {
      candidates.push(
        { album, image: null, assetId: "cover", variant: "cover" },
        ...albumImages(album, "main").map((image) => ({ album, image, assetId: categoryStripAssetId(image), variant: "main" })),
        ...albumImages(album, "aplus").map((image) => ({ album, image, assetId: categoryStripAssetId(image), variant: "aplus" }))
      );
    }
    return uniqueCategoryEntries(candidates, limit);
  }

  function categoryStripMarkup(album, image = null, meta = {}) {
    const privateAlbum = isPrivateAlbum(album);
    const src = privateAlbum ? "" : image?.src || album.cover || albumImages(album, "main")[0]?.src || "";
    const title = image?.title || album.title;
    const countLabel = `${albumImages(album, "main").length} 主图${albumImages(album, "aplus").length ? ` · ${albumImages(album, "aplus").length} A+` : ""}`;
    const label = categoryImageLabel(meta, album, image);
    return `
      <button class="site-category-strip" type="button" data-album-id="${escapeAttr(album.id)}" data-preview-variant="aplus" data-category-strip-key="${escapeAttr(`${album.id}:${categoryStripAssetId(image)}`)}">
        <span class="site-category-strip-media">
          ${src ? `<img src="${escapeAttr(src)}" alt="${escapeAttr(title)}" loading="lazy" style="${escapeAttr(frameStyle(categoryStripFrame(album, image)))}" />` : `<span class="site-category-strip-lock">${icon("lock", 15)}</span>`}
        </span>
        <span class="site-category-strip-copy">
          <small>${escapeHTML(album.category || "SELECTED WORK")}</small>
          ${label.text ? `<strong style="${escapeAttr(categoryLabelStyle(label))}">${escapeHTML(label.text)}</strong>` : ""}
          <span>${privateAlbum ? "PRIVATE · 点击解锁" : countLabel}</span>
        </span>
      </button>
    `;
  }

  function categorySquareMarkup(album, image = null, meta = {}) {
    const privateAlbum = isPrivateAlbum(album);
    const src = privateAlbum ? "" : image?.src || album.cover || albumImages(album, "main")[0]?.src || "";
    const title = image?.title || album.title;
    const label = categoryImageLabel(meta, album, image);
    return `
      <button class="site-category-square" type="button" data-album-id="${escapeAttr(album.id)}" data-preview-variant="main" data-category-strip-key="${escapeAttr(`${album.id}:${categoryStripAssetId(image)}`)}">
        ${src ? `<img src="${escapeAttr(src)}" alt="${escapeAttr(title)}" loading="lazy" style="${escapeAttr(frameStyle(categoryStripFrame(album, image)))}" />` : `<span class="site-category-strip-lock">${icon("lock", 18)}</span>`}
        <span class="site-category-square-copy">
          <small>${escapeHTML(album.category || "SELECTED WORK")}</small>
          ${label.text ? `<strong style="${escapeAttr(categoryLabelStyle(label))}">${escapeHTML(label.text)}</strong>` : ""}
        </span>
      </button>
    `;
  }

  function categoryGroupsMarkup(albums, categoryMeta = {}) {
    const groups = new Map();
    albums.forEach((album) => {
      const category = album.category || "其他作品";
      if (!groups.has(category)) groups.set(category, []);
      groups.get(category).push(album);
    });
    return [...groups.entries()]
      .filter(([category]) => categoryMeta?.[category]?.visible !== false)
      .map(([category, items], index) => {
      const meta = categoryMeta?.[category] || {};
      const visibleItems = items.filter((album) => album.visible !== false);
      const lead = visibleItems[0] || items[0];
      const banner = meta.banner || lead?.cover || "";
      const projectRows = visibleItems.map((album) => {
        const settings = categoryAlbumLayout(meta, album.id);
        if (settings.layout === "grid") {
          const squares = categoryGridEntries([album], settings.gridCount)
            .map(({ image }) => categorySquareMarkup(album, image, meta));
          return `
            <article class="site-category-project site-category-project-grid" data-project-album="${escapeAttr(album.id)}" data-grid-count="${settings.gridCount}" style="--grid-count:${settings.gridCount}">
              <div class="site-category-square-grid">${squares.join("")}</div>
            </article>
          `;
        }
        const strips = albumStripEntries(album, settings.stripCount)
          .map(({ image }) => categoryStripMarkup(album, image, meta));
        return `
          <article class="site-category-project" data-project-album="${escapeAttr(album.id)}" data-strip-count="${strips.length}" style="--strip-count:${Math.max(1, strips.length)}">
            <div class="site-category-lead">${albumCardMarkup(album)}</div>
            <div class="site-category-rail">${strips.join("")}</div>
          </article>
        `;
      }).join("");
      const emptyMarkup = `<div class="site-category-empty">${icon("eye-off", 20)}<strong>此分类下的作品集当前已隐藏</strong><span>在上方作品集中打开展示开关后，这里会恢复完整项目行。</span></div>`;
      const showcaseMarkup = !visibleItems.length
        ? emptyMarkup
        : `<div class="site-category-projects">${projectRows}</div>`;
      const projectSummary = visibleItems.length === items.length
        ? `${String(items.length).padStart(2, "0")} PROJECTS`
        : `${String(visibleItems.length).padStart(2, "0")} / ${String(items.length).padStart(2, "0")} PROJECTS`;
      return `
        <section class="site-category-block">
          <header class="site-category-head">
            <div>
              <span>${String(index + 1).padStart(2, "0")}</span>
              <h3>${escapeHTML(meta.title || category)}</h3>
            </div>
            <p>${projectSummary}</p>
          </header>
          <div class="site-category-showcase">
            <div class="site-category-banner" data-category-banner="${escapeAttr(category)}">
              ${banner ? `<img src="${escapeAttr(banner)}" alt="${escapeAttr(meta.title || category)}分类横幅" loading="lazy" style="${escapeAttr(frameStyle(meta.bannerFrame))}" />` : ""}
              <div class="site-category-banner-copy">
                <span>${escapeHTML(meta.title || category)}</span>
                <p>${escapeHTML(meta.description || "点击左侧主图或右侧贴片查看完整作品。")}</p>
              </div>
            </div>
            ${showcaseMarkup}
          </div>
        </section>
      `;
      }).join("");
  }

  function portfolioMarkup(project, options = {}) {
    const profile = project.profile || {};
    const albums = Array.isArray(project.albums) ? project.albums : [];
    const modules = Array.isArray(project.modules)
      ? project.modules.filter((module) => module.visible !== false)
      : [];
    const modulesVisible = project.sections?.modules?.visible !== false;
    const moduleEditing = options.moduleEditing === true;
    const email = profile.email || "";
    const heroImage = profile.hero ? `background-image:url('${escapeAttr(profile.hero)}')` : "";
    const heroFrame = backgroundFrameStyle(profile.heroFrame);
    const blur = Math.max(0, Math.min(36, Number(profile.heroBlur ?? 18)));
    const opacity = Math.max(0.15, Math.min(1, Number(profile.heroOpacity ?? 0.7)));
    const introSize = Math.max(12, Math.min(28, Number(profile.introSize ?? 17)));
    const portfolioSection = project.sections?.portfolio || {
      kicker: "PORTFOLIO LIBRARY",
      title: "分类作品集",
      intro: profile.intro || ""
    };
    const aboutSection = project.sections?.about || {
      kicker: "ABOUT",
      title: "关于我",
      body: profile.about || "",
      strengths: "",
      visible: true
    };
    const contactSection = project.sections?.contact || {
      kicker: "START A CONVERSATION",
      headline: "",
      note: "",
      headlineSize: 76,
      visible: true
    };
    const contactHeadline = contactSection.headline || email || "hello@your.site";
    const contactSize = Math.max(32, Math.min(96, Number(contactSection.headlineSize) || 76));
    const customModules = Array.isArray(project.customModules)
      ? project.customModules.filter((module) => module.visible !== false)
      : [];
    const categoryMarkup = albums.length
      ? categoryGroupsMarkup(albums, project.categoryMeta || {})
      : `<div class="site-empty">${icon("image", 28)}<strong>添加你的第一组作品</strong><span>在左侧“作品”中上传图片，实时预览会立即显示在这里。</span></div>`;
    return `
      <div class="site-wrap">
        <nav class="site-nav site-nav-top" aria-label="作品集导航">
          <span class="site-monogram">${escapeHTML(initials(profile.name))}</span>
          <span class="site-nav-name">${escapeHTML(profile.displayName || profile.name || "YOUR NAME")}</span>
          <span class="site-nav-links">
            <button type="button" data-scroll="site-projects">Projects</button>
            <button type="button" data-scroll="site-work">Portfolio</button>
            <button type="button" data-scroll="site-about">About</button>
          </span>
        </nav>
        <div class="site-portfolio-frame">
          <header class="site-resume-banner" style="--hero-blur:${blur}px;--hero-opacity:${opacity};--hero-intro-size:${introSize}px">
            <span class="site-banner-bg" style="${escapeAttr(`${heroImage};${heroFrame}`)}" aria-hidden="true"></span>
            <span class="site-banner-tint" aria-hidden="true"></span>
            <span class="site-banner-watermark ${containsCjk(profile.watermark) ? "is-cjk" : ""}" aria-hidden="true">${escapeHTML(profile.watermark || "DESIGN")}</span>
            <div class="site-resume-content">
              <p class="site-resume-kicker"><i></i>${escapeHTML(profile.kicker || "VISUAL DESIGNER / PORTFOLIO")}</p>
              <h1>${escapeHTML(profile.name || "你的名字")}</h1>
              ${profile.intro ? `<p class="site-resume-intro">${escapeHTML(profile.intro)}</p>` : ""}
              <div class="site-resume-meta">
                <span>${icon("user", 12)}${escapeHTML(profile.role || "设计师 / 创意工作者")}</span>
                <b></b>
                <span>${icon("location", 12)}${escapeHTML(profile.location || "Shanghai")}</span>
                ${email ? `<b></b><span>${icon("mail", 12)}${escapeHTML(email)}</span>` : ""}
              </div>
            </div>
            <div class="site-resume-footer">
              <span>${escapeHTML(profile.role || "VISUAL DESIGNER")}</span>
              <i></i>
            </div>
          </header>

          ${modulesVisible && (modules.length || moduleEditing) ? `
            <section class="site-feature-grid" id="site-projects" aria-label="主要项目与技能">
              ${modules.length
                ? modules.map((module, index) => featureModuleMarkup(module, index, moduleEditing)).join("")
                : `<div class="site-empty">${icon("layout", 28)}<strong>添加首页模块</strong><span>在左侧“模块”中设置主项目与技能入口。</span></div>`}
            </section>
          ` : ""}

          <section class="site-category-section" id="site-work">
            <div class="site-category-section-head">
              <div>
                <p class="site-kicker">${escapeHTML(portfolioSection.kicker)}</p>
                <h2>${escapeHTML(portfolioSection.title)}</h2>
              </div>
              <p>${escapeHTML(portfolioSection.intro || "按项目类型浏览完整案例。每个作品集可以独立设置访问密码。")}</p>
            </div>
            <div class="site-category-list">${categoryMarkup}</div>
          </section>

          ${aboutSection.visible !== false ? `
            <section class="site-about" id="site-about">
              <div class="site-about-inner">
                <div class="site-about-label">
                  <span>${escapeHTML(aboutSection.kicker || "ABOUT")}</span>
                  <strong>${escapeHTML(aboutSection.title || "关于我")}</strong>
                  <i></i>
                </div>
                <div class="site-about-copy">
                  <blockquote>${escapeHTML(aboutSection.body || "写下一段能让人理解你如何思考和工作的介绍。")}</blockquote>
                  ${String(aboutSection.strengths || "").trim() ? `
                    <div class="site-strengths">
                      ${String(aboutSection.strengths).split("\n").filter(Boolean).map((line) => `<span>${escapeHTML(line.trim())}</span>`).join("")}
                    </div>
                  ` : ""}
                  <div class="site-about-details">
                    <div>
                      <span class="site-detail-label">Base</span>
                      <span class="site-detail-value">${escapeHTML(profile.location || "Shanghai, CN")}</span>
                    </div>
                    <div>
                      <span class="site-detail-label">Availability</span>
                      <span class="site-detail-value">${escapeHTML(profile.availability || "Open for projects")}</span>
                    </div>
                    <div>
                      <span class="site-detail-label">Website</span>
                      <span class="site-detail-value">${escapeHTML(profile.website || "your.site")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ` : ""}

          ${customModules.length ? `
            <section class="site-story-section" id="site-story">
              <div class="site-story-head">
                <p class="site-kicker">MORE ABOUT ME</p>
                <h2>补充内容</h2>
              </div>
              <div class="site-story-grid">
                ${customModules.map((module) => `
                  <article class="site-story-card">
                    <span>${escapeHTML(module.kicker || "CUSTOM MODULE")}</span>
                    <h3>${escapeHTML(module.title || "自定义模块")}</h3>
                    <p>${escapeHTML(module.body || "").replace(/\n/g, "<br>")}</p>
                  </article>
                `).join("")}
              </div>
            </section>
          ` : ""}

          ${contactSection.visible !== false ? `<section class="site-contact" id="site-contact" style="--contact-size:${contactSize}px">
            <div class="site-contact-main">
              <p class="site-kicker">${escapeHTML(contactSection.kicker || "START A CONVERSATION")}</p>
              ${profile.emailLink === true && email ? `<a href="mailto:${escapeAttr(email)}" aria-label="发送邮件">` : `<div class="site-contact-address">`}
                <span>${escapeHTML(contactHeadline)}</span>
                ${icon("arrow-up-right", 42)}
              ${profile.emailLink === true && email ? `</a>` : `</div>`}
            </div>
            <div class="site-contact-footer-row">
              <div class="site-contact-meta">
                <span>${escapeHTML(profile.displayName || profile.name || "YOUR NAME")}</span>
                <span>${escapeHTML(profile.website || "YOUR WEBSITE")}</span>
                ${options.year ? `<span>${escapeHTML(options.year)}</span>` : ""}
              </div>
              <aside class="site-contact-template">
                <span>PROJECT INVITATION</span>
                <p>${escapeHTML(contactSection.note || "欢迎联系讨论品牌系统、网站体验与视觉设计项目。请附上项目背景、范围、期望时间与预算区间。")}</p>
              </aside>
            </div>
          </section>` : ""}

          <footer class="site-footer">
            <span>© ${new Date().getFullYear()} ${escapeHTML(profile.name || "YOUR NAME")}</span>
            <span>PORTFOLIO TEMPLATE / FOLIO ATELIER</span>
          </footer>
        </div>
      </div>
    `;
  }

  function renderPreview() {
    ensureCategoryMeta();
    applyTheme(ELEMENTS.sitePreview, state.theme, state.profile);
    ELEMENTS.sitePreview.innerHTML = portfolioMarkup(state, {
      year: new Date().getFullYear(),
      moduleEditing: activePanel === "modules"
    });
    updatePreviewSummary();
  }

  function handlePanelInput(event) {
    const target = event.target;
    if (target.matches("[data-bind]")) {
      const value = target.type === "range" ? Number(target.value) : target.value;
      setNested(state, target.dataset.bind, value);
      if (target.type === "range") {
        const output = target.closest(".range-row")?.querySelector("output");
        if (output) {
          output.textContent = target.dataset.bind === "profile.heroOpacity"
            ? `${Math.round(value * 100)}%`
            : target.dataset.bind === "theme.radius"
              ? `${value} px`
              : `${value} px`;
        }
      }
      if (target.dataset.bind === "theme.font" || target.dataset.bind === "theme.layout") {
        state.theme.preset = "custom";
      }
      renderPreview();
      saveSoon();
    }

    if (target.matches("[data-album-field]")) {
      const album = getAlbum(selectedAlbumId);
      if (!album) return;
      album[target.dataset.albumField] = target.value;
      renderPreview();
      saveSoon();
    }

    if (target.matches("[data-module-field]")) {
      const editor = target.closest("[data-module-editor]");
      const module = state.modules.find((item) => item.id === editor?.dataset.moduleEditor);
      if (!module) return;
      module[target.dataset.moduleField] = target.value;
      renderPreview();
      saveSoon();
    }

    if (target.matches("[data-section-field]")) {
      setNested(state.sections, target.dataset.sectionField, target.value);
      if (target.type === "range") {
        const output = target.closest(".range-row")?.querySelector("output");
        if (output) output.textContent = `${target.value} px`;
      }
      renderPreview();
      saveSoon();
    }

    if (target.matches("[data-category-field]")) {
      const card = target.closest("[data-category-setting]");
      const name = card?.dataset.categorySetting;
      if (!name) return;
      ensureCategoryMeta();
      state.categoryMeta[name][target.dataset.categoryField] = target.value;
      renderPreview();
      if (target.matches('select[data-category-field="layout"], select[data-category-field="gridCount"], select[data-category-field="stripCount"]')) {
        renderPanel();
      }
      saveSoon();
    }

    if (target.matches("[data-album-layout-field]")) {
      const layoutEditor = target.closest("[data-album-layout-editor]");
      const card = target.closest("[data-category-setting]");
      const name = card?.dataset.categorySetting;
      const albumId = layoutEditor?.dataset.albumLayoutEditor;
      if (!name || !albumId) return;
      ensureCategoryMeta();
      const category = state.categoryMeta[name];
      if (!category.albumLayouts || typeof category.albumLayouts !== "object") category.albumLayouts = {};
      const settings = categoryAlbumLayout(category, albumId);
      const field = target.dataset.albumLayoutField;
      settings[field] = field === "layout"
        ? (target.value === "grid" ? "grid" : "split")
        : normalizeCategoryCount(target.value, field === "gridCount" ? 3 : 1, field === "gridCount" ? 4 : 3, settings[field]);
      category.albumLayouts[albumId] = settings;
      renderPreview();
      if (target.matches("select")) renderPanel();
      saveSoon();
    }

    if (target.matches("[data-category-label-field]")) {
      const card = target.closest("[data-category-setting]");
      const name = card?.dataset.categorySetting;
      const key = target.dataset.labelKey;
      if (!name || !key) return;
      ensureCategoryMeta();
      const category = state.categoryMeta[name];
      if (!category.imageLabels || typeof category.imageLabels !== "object") category.imageLabels = {};
      const label = category.imageLabels[key] || {};
      const field = target.dataset.categoryLabelField;
      label[field] = field === "size" ? normalizeCategoryCount(target.value, 10, 42, 21) : target.value;
      category.imageLabels[key] = label;
      if (target.type === "range") {
        const output = target.closest(".category-label-size")?.querySelector("output");
        if (output) output.textContent = `${label.size} px`;
      }
      renderPreview();
      saveSoon();
    }

    if (target.matches("[data-custom-field]")) {
      const editor = target.closest("[data-custom-module]");
      const module = state.customModules.find((item) => item.id === editor?.dataset.customModule);
      if (!module) return;
      module[target.dataset.customField] = target.value;
      renderPreview();
      saveSoon();
    }

    if (target.matches("[data-color]")) {
      state.theme[target.dataset.color] = target.value;
      state.theme.preset = "custom";
      const textInput = ELEMENTS.panelContent.querySelector(`[data-color-text="${target.dataset.color}"]`);
      if (textInput) textInput.value = target.value;
      renderPreview();
      saveSoon();
    }

    if (target.matches("[data-color-text]")) {
      const value = target.value.trim();
      if (/^#[0-9a-f]{6}$/i.test(value)) {
        state.theme[target.dataset.colorText] = value;
        state.theme.preset = "custom";
        const colorInput = ELEMENTS.panelContent.querySelector(`[data-color="${target.dataset.colorText}"]`);
        if (colorInput) colorInput.value = value;
        renderPreview();
        saveSoon();
      }
    }
  }

  function handlePanelChange(event) {
    const target = event.target;
    if (target.matches("[data-bind]")) {
      saveSoon();
    }
    if (target.matches("[data-album-field]")) {
      renderPanel();
      renderPreview();
      saveSoon();
    }
    if (target.matches("[data-module-field]")) {
      renderPanel();
      renderPreview();
      saveSoon();
    }
    if (target.matches("[data-category-field], [data-album-layout-field], [data-custom-field], [data-section-field]")) {
      saveSoon();
    }
    if (target.matches("[data-color-text]") && !/^#[0-9a-f]{6}$/i.test(target.value.trim())) {
      target.value = state.theme[target.dataset.colorText];
      showToast("请输入六位十六进制色值，例如 #d75536。", true);
    }
  }

  function handleDocumentClick(event) {
    const panelButton = event.target.closest("[data-panel]");
    if (panelButton) {
      const previousPanel = activePanel;
      activePanel = panelButton.dataset.panel;
      selectedAlbumId = "";
      renderPanel();
      if (previousPanel === "modules" || activePanel === "modules") renderPreview();
      return;
    }

    const presetButton = event.target.closest("[data-theme-preset]");
    if (presetButton) {
      applyThemePreset(presetButton.dataset.themePreset);
      return;
    }

    const viewportButton = event.target.closest("[data-viewport]");
    if (viewportButton) {
      setPreviewViewport(viewportButton.dataset.viewport);
      return;
    }

    const albumButton = event.target.closest("[data-action='select-album']");
    if (albumButton) {
      selectedAlbumId = albumButton.dataset.albumId;
      activePanel = "works";
      renderPanel();
      return;
    }

    const thumbnail = event.target.closest("[data-image-index]");
    if (thumbnail) {
      currentImageIndex = Number(thumbnail.dataset.imageIndex);
      renderAlbumViewer();
      return;
    }

    const viewerVariant = event.target.closest("[data-album-viewer-variant]");
    if (viewerVariant && currentAlbum) {
      currentVariant = viewerVariant.dataset.albumViewerVariant;
      currentImageIndex = 0;
      renderAlbumViewer();
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;
    const action = actionButton.dataset.action;
    handleAction(action, actionButton);
  }

  function handleAction(action, element) {
    switch (action) {
      case "import-project":
        ELEMENTS.projectFileInput.value = "";
        ELEMENTS.projectFileInput.click();
        break;
      case "export-project":
        exportProjectFile();
        break;
      case "publish-site":
        publishSite();
        break;
      case "open-preview-page":
        openPreviewPage();
        break;
      case "open-help":
        ELEMENTS.helpDialog.showModal();
        break;
      case "close-help":
        ELEMENTS.helpDialog.close();
        break;
      case "reset-project":
        resetProject();
        break;
      case "add-album":
        addAlbum();
        break;
      case "back-to-albums":
        selectedAlbumId = "";
        renderPanel();
        break;
      case "duplicate-album":
        duplicateAlbum();
        break;
      case "delete-album":
        deleteAlbum();
        break;
      case "toggle-album-visible":
        toggleAlbumVisible(element);
        break;
      case "toggle-album-list-visible":
        toggleAlbumListVisible(element.dataset.albumId, element);
        break;
      case "toggle-category-visible": {
        ensureCategoryMeta();
        const category = state.categoryMeta[element.dataset.categoryName];
        if (category) {
          category.visible = category.visible === false;
          element.setAttribute("aria-pressed", String(category.visible));
          element.setAttribute("aria-label", `${category.visible ? "隐藏" : "展示"}这个分类`);
          element.classList.toggle("is-hidden", !category.visible);
          const label = element.querySelector(".category-visibility-copy");
          if (label) label.textContent = category.visible ? "展示" : "隐藏";
          renderPreview();
          saveSoon();
        }
        break;
      }
      case "upload-hero":
        chooseAsset("hero");
        break;
      case "crop-hero":
        openCropEditor("hero", "profile");
        break;
      case "upload-cover":
        chooseAsset("cover");
        break;
      case "upload-category-banner":
        chooseAsset("category-banner", "main", element.dataset.categoryName || "");
        break;
      case "crop-category-banner":
        openCropEditor("category-banner", element.dataset.categoryName || "");
        break;
      case "crop-cover":
        openCropEditor("cover", selectedAlbumId);
        break;
      case "crop-category-strip":
        openCropEditor("category-strip", element.dataset.albumId, element.dataset.stripId || "cover");
        break;
      case "choose-replacement-image":
        openImagePicker(
          element.dataset.albumId || "",
          element.dataset.imageId || "",
          element.dataset.imageVariant || "main"
        );
        break;
      case "close-image-picker":
        closeImagePicker();
        break;
      case "select-replacement-image":
        selectReplacementImage(element.dataset.imageId || "");
        break;
      case "cancel-crop":
        closeCropEditor();
        break;
      case "reset-crop":
        resetCropEditor();
        break;
      case "save-crop":
        saveCropEditor();
        break;
      case "add-main-media":
        chooseAsset("media", "main");
        break;
      case "add-aplus-media":
        chooseAsset("media", "aplus");
        break;
      case "remove-hero":
        state.profile.hero = "";
        renderPanel();
        renderPreview();
        saveSoon();
        break;
      case "remove-cover": {
        const album = getAlbum(selectedAlbumId);
        if (album) album.cover = "";
        renderPanel();
        renderPreview();
        saveSoon();
        break;
      }
      case "toggle-album-password":
        togglePasswordInput(element, "[data-album-field='password']");
        break;
      case "toggle-email-link":
        state.profile.emailLink = !state.profile.emailLink;
        element.setAttribute("aria-pressed", String(state.profile.emailLink));
        renderPreview();
        saveSoon();
        break;
      case "toggle-unlock-password":
        togglePasswordInput(element, "#unlock-password");
        break;
      case "move-image-left":
        moveImage(element.dataset.imageId, -1, element.dataset.imageVariant || "main");
        break;
      case "move-image-right":
        moveImage(element.dataset.imageId, 1, element.dataset.imageVariant || "main");
        break;
      case "delete-image":
        deleteImage(element.dataset.imageId, element.dataset.imageVariant || "main");
        break;
      case "reset-theme":
        resetTheme();
        break;
      case "close-album":
        closeAlbumViewer();
        break;
      case "previous-image":
        showPreviousImage();
        break;
      case "next-image":
        showNextImage();
        break;
      case "close-unlock":
        closeUnlockDialog();
        break;
      case "preview-module": {
        const module = state.modules.find((item) => item.id === element.dataset.moduleId);
        if (module) openModule(module);
        break;
      }
      case "close-feature":
        ELEMENTS.featureDialog.close();
        break;
      case "add-module":
        addModule();
        break;
      case "remove-module":
        removeModule(element.dataset.moduleId);
        break;
      case "toggle-module-visible": {
        const module = state.modules.find((item) => item.id === element.dataset.moduleId);
        if (module) {
          module.visible = module.visible === false;
          element.setAttribute("aria-pressed", String(module.visible));
          renderPreview();
          saveSoon();
        }
        break;
      }
      case "toggle-modules-section-visible":
        state.sections.modules.visible = state.sections.modules.visible === false;
        element.setAttribute("aria-pressed", String(state.sections.modules.visible));
        renderPreview();
        saveSoon();
        break;
      case "toggle-about-visible":
        state.sections.about.visible = !state.sections.about.visible;
        element.setAttribute("aria-pressed", String(state.sections.about.visible));
        renderPreview();
        saveSoon();
        break;
      case "toggle-contact-visible":
        state.sections.contact.visible = !state.sections.contact.visible;
        element.setAttribute("aria-pressed", String(state.sections.contact.visible));
        renderPreview();
        saveSoon();
        break;
      case "add-custom-module":
        addCustomModule();
        break;
      case "remove-custom-module":
        removeCustomModule(element.dataset.customId);
        break;
      case "move-custom-up":
        moveCustomModule(element.dataset.customId, -1);
        break;
      case "move-custom-down":
        moveCustomModule(element.dataset.customId, 1);
        break;
      case "toggle-custom-visible": {
        const module = state.customModules.find((item) => item.id === element.dataset.customId);
        if (module) {
          module.visible = !module.visible;
          element.setAttribute("aria-pressed", String(module.visible));
          renderPreview();
          saveSoon();
        }
        break;
      }
      default:
        break;
    }
  }

  function setPreviewViewport(viewport) {
    document.querySelectorAll("[data-viewport]").forEach((button) => {
      if (button.closest(".segmented-control")) {
        button.classList.toggle("is-active", button.dataset.viewport === viewport);
      }
    });
    ELEMENTS.previewBrowser.dataset.viewport = viewport;
    ELEMENTS.previewBrowser.classList.toggle("is-mobile", viewport === "mobile");
  }

  function applyThemePreset(presetId) {
    const preset = THEME_PRESETS[presetId];
    if (!preset) return;
    state.theme = {
      preset: presetId,
      ...clone(preset.colors),
      font: preset.font,
      layout: preset.layout,
      coverRatio: preset.coverRatio,
      radius: preset.radius,
      density: preset.density
    };
    renderPanel();
    renderPreview();
    saveSoon();
  }

  function resetTheme() {
    const preset = THEME_PRESETS[state.theme.preset] || THEME_PRESETS.clay;
    state.theme = {
      preset: THEME_PRESETS[state.theme.preset] ? state.theme.preset : "clay",
      ...clone(preset.colors),
      font: preset.font,
      layout: preset.layout,
      coverRatio: preset.coverRatio,
      radius: preset.radius,
      density: preset.density
    };
    renderPanel();
    renderPreview();
    saveSoon();
    showToast("已恢复当前配色预设。");
  }

  function addAlbum() {
    const album = {
      id: uid("album"),
      title: "未命名作品集",
      subtitle: "NEW PROJECT",
      category: "SELECTED WORK",
      year: String(new Date().getFullYear()),
      summary: "补充项目背景、你的角色以及最终成果。",
      cover: "",
      coverFrame: normalizeFrame(),
      password: "",
      passwordHint: "",
      visible: true,
      images: [],
      variants: {
        main: [],
        aplus: []
      }
    };
    state.albums.unshift(album);
    selectedAlbumId = album.id;
    activePanel = "works";
    renderPanel();
    renderPreview();
    saveSoon();
  }

  function addModule() {
    const index = state.modules.length;
    state.modules.push({
      id: uid("module"),
      type: index % 2 === 0 ? "project" : "skill",
      kicker: index % 2 === 0 ? "SELECTED PROJECTS" : "VISUAL WORKFLOW",
      title: `新模块 ${String(index + 1).padStart(2, "0")}`,
      description: "补充模块说明，点击后可以展示详细文字或绑定作品集。",
      details: "模块说明\n在这里填写点击模块后展示的详细内容。",
      targetAlbumId: "",
      size: "half",
      cardHeight: 222,
      visible: true
    });
    activePanel = "modules";
    renderPanel();
    renderPreview();
    saveSoon();
  }

  function removeModule(moduleId) {
    state.modules = state.modules.filter((module) => module.id !== moduleId);
    renderPanel();
    renderPreview();
    saveSoon();
  }

  function addCustomModule() {
    state.customModules.push({
      id: uid("story"),
      kicker: "CUSTOM MODULE",
      title: "新的内容模块",
      body: "填写工作方法、项目经验、个人优势或其他希望面试官了解的内容。",
      visible: true
    });
    renderPanel();
    renderPreview();
    saveSoon();
  }

  function removeCustomModule(customId) {
    state.customModules = state.customModules.filter((module) => module.id !== customId);
    renderPanel();
    renderPreview();
    saveSoon();
  }

  function moveCustomModule(customId, direction) {
    const index = state.customModules.findIndex((module) => module.id === customId);
    const next = index + direction;
    if (index < 0 || next < 0 || next >= state.customModules.length) return;
    [state.customModules[index], state.customModules[next]] = [state.customModules[next], state.customModules[index]];
    renderPanel();
    renderPreview();
    saveSoon();
  }

  function duplicateAlbum() {
    const source = getAlbum(selectedAlbumId);
    if (!source) return;
    const copy = clone(source);
    copy.id = uid("album");
    copy.title = `${source.title}（副本）`;
    copy.images = copy.images.map((image) => ({ ...image, id: uid("image") }));
    copy.variants = {
      main: copy.images,
      aplus: (copy.variants?.aplus || []).map((image) => ({ ...image, id: uid("image") }))
    };
    const index = state.albums.findIndex((album) => album.id === source.id);
    state.albums.splice(index + 1, 0, copy);
    selectedAlbumId = copy.id;
    renderPanel();
    renderPreview();
    saveSoon();
    showToast("已复制作品集。");
  }

  function deleteAlbum() {
    const album = getAlbum(selectedAlbumId);
    if (!album) return;
    if (!window.confirm(`确定删除“${album.title}”吗？此操作无法撤销。`)) return;
    state.albums = state.albums.filter((item) => item.id !== album.id);
    selectedAlbumId = "";
    renderPanel();
    renderPreview();
    saveSoon();
    showToast("作品集已删除。");
  }

  function toggleAlbumVisible(button) {
    const album = getAlbum(selectedAlbumId);
    if (!album) return;
    album.visible = !album.visible;
    button.setAttribute("aria-pressed", String(album.visible));
    renderPreview();
    saveSoon();
  }

  function toggleAlbumListVisible(albumId, button) {
    const album = getAlbum(albumId);
    if (!album) return;
    album.visible = album.visible === false;
    button.setAttribute("aria-pressed", String(album.visible));
    button.setAttribute("aria-label", `${album.visible ? "隐藏" : "显示"}作品集`);
    const row = button.closest(".album-list-item");
    row?.classList.toggle("is-hidden", !album.visible);
    const label = row?.querySelector(".album-visibility-label");
    if (label) label.textContent = album.visible ? "公开" : "隐藏";
    renderPreview();
    saveSoon();
  }

  function togglePasswordInput(button, selector) {
    const input = selector.startsWith("#")
      ? document.querySelector(selector)
      : ELEMENTS.panelContent.querySelector(selector);
    if (!input) return;
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    button.textContent = show ? "隐藏" : "显示";
  }

  function openImagePicker(albumId, imageId, variant) {
    const album = getAlbum(albumId);
    const images = albumImages(album, variant);
    if (!album || !images.length) {
      showToast("当前作品集没有可选择的已上传图片。", true);
      return;
    }
    imagePickerTarget = { albumId, imageId, variant };
    const variantLabel = variant === "aplus" ? "A+ 图片" : "主副图";
    ELEMENTS.imagePickerTitle.textContent = `选择替换的${variantLabel}`;
    ELEMENTS.imagePickerDescription.textContent = `${album.title} · 已上传 ${images.length} 张${variantLabel}，选择后会替换当前展示位置。`;
    ELEMENTS.imagePickerGrid.innerHTML = images.map((image, index) => `
      <button class="image-picker-item ${image.id === imageId ? "is-current" : ""}" type="button" data-action="select-replacement-image" data-image-id="${escapeAttr(image.id)}">
        <span class="image-picker-thumb">
          <img src="${escapeAttr(image.src)}" alt="${escapeAttr(image.title)}" style="${escapeAttr(frameStyle(categoryStripFrame(album, image)))}" />
          <span>${String(index + 1).padStart(2, "0")}</span>
        </span>
        <strong>${escapeHTML(image.title || `图片 ${index + 1}`)}</strong>
        <small>${image.id === imageId ? "当前展示" : "选择这张图片"}</small>
      </button>
    `).join("");
    ELEMENTS.imagePickerDialog.showModal();
  }

  function closeImagePicker() {
    imagePickerTarget = null;
    if (ELEMENTS.imagePickerDialog.open) ELEMENTS.imagePickerDialog.close();
  }

  function selectReplacementImage(replacementId) {
    if (!imagePickerTarget || !replacementId) return;
    const { albumId, imageId, variant } = imagePickerTarget;
    const album = getAlbum(albumId);
    if (!album) {
      closeImagePicker();
      return;
    }
    const images = [...albumImages(album, variant)];
    if (replacementId === imageId) {
      closeImagePicker();
      return;
    }
    const replacementIndex = images.findIndex((image) => image.id === replacementId);
    if (replacementIndex < 0) {
      closeImagePicker();
      return;
    }
    const [replacement] = images.splice(replacementIndex, 1);
    const targetIndex = images.findIndex((image) => image.id === imageId);
    if (targetIndex < 0) {
      closeImagePicker();
      return;
    }
    images.splice(targetIndex, 0, replacement);
    setAlbumImages(album, variant, images);
    closeImagePicker();
    renderPanel();
    renderPreview();
    saveSoon();
    showToast("展示图片已替换。");
  }

  function chooseAsset(mode, variant = "main", categoryName = "") {
    ELEMENTS.assetFileInput.value = "";
    ELEMENTS.assetFileInput.dataset.mode = mode;
    ELEMENTS.assetFileInput.dataset.albumId = selectedAlbumId;
    ELEMENTS.assetFileInput.dataset.variant = variant;
    ELEMENTS.assetFileInput.dataset.categoryName = categoryName;
    ELEMENTS.assetFileInput.click();
  }

  function openCropEditor(type, targetId, assetId = "") {
    let src = "";
    let frame = normalizeFrame();
    let title = "调整图片展示区域";
    let ratio = 4.6;
    if (type === "hero") {
      src = state.profile.hero;
      frame = normalizeFrame(state.profile.heroFrame);
      title = "首页视觉 · 顶部背景";
      ratio = 5.3;
    } else if (type === "category-banner") {
      ensureCategoryMeta();
      const meta = state.categoryMeta[targetId];
      if (!meta) return;
      src = meta.banner || state.albums.find((album) => (album.category || "其他作品") === targetId)?.cover || "";
      frame = normalizeFrame(meta.bannerFrame);
      title = `${meta.title || targetId} · 分类横幅`;
    } else if (type === "category-strip") {
      const album = getAlbum(targetId);
      if (!album) return;
      const albumSettings = categoryAlbumLayout(state.categoryMeta?.[album.category || "其他作品"], album.id);
      const image = [...albumImages(album, "main"), ...albumImages(album, "aplus")]
        .find((item) => item.id === assetId);
      src = image?.src || album.cover || albumImages(album, "main")[0]?.src || "";
      frame = categoryStripFrame(album, image);
      title = `${image?.title || album.title} · 右侧展示图片`;
      ratio = albumSettings.layout === "grid" ? 1 : 3;
    } else if (type === "cover") {
      const album = getAlbum(targetId);
      if (!album) return;
      src = album.cover;
      frame = normalizeFrame(album.coverFrame);
      title = `${album.title} · 作品封面`;
      ratio = 1;
    }
    const previewElement = type === "hero"
      ? ELEMENTS.sitePreview.querySelector(".site-resume-banner")
      : type === "category-banner"
        ? [...ELEMENTS.sitePreview.querySelectorAll("[data-category-banner]")].find((element) => element.dataset.categoryBanner === targetId)
        : type === "category-strip"
          ? ELEMENTS.sitePreview.querySelector(`[data-category-strip-key="${CSS.escape(`${targetId}:${assetId}`)}"]`)
        : ELEMENTS.sitePreview.querySelector(`.site-album[data-album-id="${CSS.escape(targetId)}"] .site-album-media`);
    const previewRect = previewElement?.getBoundingClientRect();
    if (previewRect?.width && previewRect?.height) ratio = previewRect.width / previewRect.height;
    if (!src) {
      showToast("请先上传图片，再调整展示区域。", true);
      return;
    }
    cropTarget = { type, targetId, assetId, frame, ratio };
    ELEMENTS.cropTitle.textContent = title;
    ELEMENTS.cropRatioLabel.textContent = type === "hero"
      ? "页面最终显示范围 · 首页顶部宽幅背景"
      : type === "category-banner"
        ? "页面最终显示范围 · 横向分类横幅"
        : type === "category-strip"
          ? "页面最终显示范围 · 右侧展示图片"
        : "页面最终显示范围 · 作品封面";
    ELEMENTS.cropStage.style.width = "100%";
    ELEMENTS.cropStage.style.aspectRatio = String(ratio);
    ELEMENTS.cropImage.src = src;
    ELEMENTS.cropZoom.value = String(frame.zoom);
    ELEMENTS.cropZoomOutput.textContent = `${Math.round(frame.zoom * 100)}%`;
    applyCropFrame();
    ELEMENTS.cropDialog.showModal();
    requestAnimationFrame(() => {
      if (ELEMENTS.cropImage.complete) handleCropImageLoad();
    });
  }

  function applyCropFrame() {
    if (!cropTarget) return;
    ELEMENTS.cropZoom.value = String(cropTarget.frame.zoom);
    ELEMENTS.cropZoomOutput.textContent = `${Math.round(cropTarget.frame.zoom * 100)}%`;
    updateCropSelection();
  }

  function cropSelectionSize() {
    if (!cropTarget) return { width: 100, height: 100 };
    const sourceRatio = (ELEMENTS.cropImage.naturalWidth && ELEMENTS.cropImage.naturalHeight)
      ? ELEMENTS.cropImage.naturalWidth / ELEMENTS.cropImage.naturalHeight
      : cropTarget.ratio;
    const targetRatio = cropTarget.ratio;
    let width = 100;
    let height = 100;
    if (targetRatio >= sourceRatio) height = (sourceRatio / targetRatio) * 100;
    else width = (targetRatio / sourceRatio) * 100;
    const zoom = normalizeFrame(cropTarget.frame).zoom;
    return {
      width: Math.max(8, width / zoom),
      height: Math.max(8, height / zoom)
    };
  }

  function updateCropSelection() {
    if (!cropTarget || !ELEMENTS.cropSelection) return;
    const frame = normalizeFrame(cropTarget.frame);
    const size = cropSelectionSize();
    const left = frame.x * (100 - size.width) / 100;
    const top = frame.y * (100 - size.height) / 100;
    ELEMENTS.cropSelection.style.left = `${left}%`;
    ELEMENTS.cropSelection.style.top = `${top}%`;
    ELEMENTS.cropSelection.style.width = `${size.width}%`;
    ELEMENTS.cropSelection.style.height = `${size.height}%`;
  }

  function handleCropImageLoad() {
    if (!cropTarget || !ELEMENTS.cropImage.naturalWidth || !ELEMENTS.cropImage.naturalHeight) return;
    const sourceRatio = ELEMENTS.cropImage.naturalWidth / ELEMENTS.cropImage.naturalHeight;
    ELEMENTS.cropStage.style.aspectRatio = `${ELEMENTS.cropImage.naturalWidth} / ${ELEMENTS.cropImage.naturalHeight}`;
    ELEMENTS.cropStage.style.width = `min(100%, calc(56vh * ${sourceRatio}))`;
    updateCropSelection();
  }

  function handleCropPointerDown(event) {
    if (!cropTarget || (event.pointerType === "mouse" && event.button !== 0)) return;
    event.preventDefault();
    ELEMENTS.cropStage.setPointerCapture(event.pointerId);
    const size = cropSelectionSize();
    cropDrag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      frame: { ...cropTarget.frame },
      width: size.width,
      height: size.height
    };
    ELEMENTS.cropStage.classList.add("is-dragging");
  }

  function handleCropPointerMove(event) {
    if (!cropDrag || event.pointerId !== cropDrag.pointerId) return;
    const rect = ELEMENTS.cropStage.getBoundingClientRect();
    const availableX = Math.max(1, rect.width * (1 - cropDrag.width / 100));
    const availableY = Math.max(1, rect.height * (1 - cropDrag.height / 100));
    cropTarget.frame.x = Math.max(0, Math.min(100, cropDrag.frame.x + ((event.clientX - cropDrag.startX) / availableX) * 100));
    cropTarget.frame.y = Math.max(0, Math.min(100, cropDrag.frame.y + ((event.clientY - cropDrag.startY) / availableY) * 100));
    applyCropFrame();
  }

  function handleCropPointerUp(event) {
    if (cropDrag && ELEMENTS.cropStage.hasPointerCapture(cropDrag.pointerId)) {
      ELEMENTS.cropStage.releasePointerCapture(cropDrag.pointerId);
    }
    cropDrag = null;
    ELEMENTS.cropStage.classList.remove("is-dragging");
  }

  function handleCropZoom() {
    if (!cropTarget) return;
    cropTarget.frame.zoom = Number(ELEMENTS.cropZoom.value);
    applyCropFrame();
  }

  function resetCropEditor() {
    if (!cropTarget) return;
    cropTarget.frame = normalizeFrame();
    applyCropFrame();
  }

  function saveCropEditor() {
    if (!cropTarget) return;
    if (cropTarget.type === "hero") {
      state.profile.heroFrame = normalizeFrame(cropTarget.frame);
    } else if (cropTarget.type === "category-banner") {
      ensureCategoryMeta();
      state.categoryMeta[cropTarget.targetId].bannerFrame = normalizeFrame(cropTarget.frame);
    } else if (cropTarget.type === "category-strip") {
      const album = getAlbum(cropTarget.targetId);
      if (album) {
        if (!album.stripFrames) album.stripFrames = {};
        album.stripFrames[cropTarget.assetId || "cover"] = normalizeFrame(cropTarget.frame);
      }
    } else if (cropTarget.type === "cover") {
      const album = getAlbum(cropTarget.targetId);
      if (album) album.coverFrame = normalizeFrame(cropTarget.frame);
    }
    closeCropEditor();
    renderPanel();
    renderPreview();
    saveSoon();
    showToast("图片展示区域已更新。");
  }

  function closeCropEditor() {
    cropDrag = null;
    cropTarget = null;
    ELEMENTS.cropStage.classList.remove("is-dragging");
    if (ELEMENTS.cropDialog.open) ELEMENTS.cropDialog.close();
  }

  async function handleAssetFileInput() {
    const files = [...ELEMENTS.assetFileInput.files].filter((file) => file.type.startsWith("image/"));
    if (!files.length) return;
    const mode = ELEMENTS.assetFileInput.dataset.mode;
    const albumId = ELEMENTS.assetFileInput.dataset.albumId;
    const variant = ELEMENTS.assetFileInput.dataset.variant || "main";
    const categoryName = ELEMENTS.assetFileInput.dataset.categoryName || "";
    try {
      if (mode === "hero") {
        showProgress("正在处理首页图片", "自动压缩大尺寸图片");
        state.profile.hero = await fileToDataURL(files[0], 2400, 0.88);
      } else if (mode === "cover") {
        const album = getAlbum(albumId);
        if (!album) return;
        showProgress("正在处理封面", "自动压缩大尺寸图片");
        album.cover = await fileToDataURL(files[0], 2400, 0.88);
      } else if (mode === "category-banner") {
        ensureCategoryMeta();
        if (!categoryName || !state.categoryMeta[categoryName]) return;
        showProgress("正在处理分类横幅", "建议使用横向构图图片");
        state.categoryMeta[categoryName].banner = await fileToDataURL(files[0], 2600, 0.88);
      } else if (mode === "media") {
        const album = getAlbum(albumId);
        if (!album) return;
        showProgress(`正在上传 ${files.length} 张${variant === "aplus" ? " A+" : "主副图"}`, "图片会按选择顺序加入作品集");
        const targetImages = [...albumImages(album, variant)];
        for (let index = 0; index < files.length; index += 1) {
          const file = files[index];
          const src = await fileToDataURL(file, 2400, 0.88);
          targetImages.push({
            id: uid("image"),
            title: file.name.replace(/\.[^.]+$/, "") || `${variant === "aplus" ? "A+" : "主图"} ${targetImages.length + 1}`,
            src
          });
          if (variant === "main" && !album.cover && index === 0) album.cover = src;
        }
        setAlbumImages(album, variant, targetImages);
      }
      hideProgress();
      renderPanel();
      renderPreview();
      saveSoon();
      showToast("图片已添加。");
      if (mode === "hero") openCropEditor("hero", "profile");
      if (mode === "category-banner") openCropEditor("category-banner", categoryName);
      if (mode === "cover") openCropEditor("cover", albumId);
    } catch (error) {
      hideProgress();
      showToast("图片处理失败，请尝试 JPG、PNG 或 WebP 文件。", true);
    }
  }

  function bindDropTargets() {
    ELEMENTS.panelContent.querySelectorAll("[data-drop]").forEach((target) => {
      target.addEventListener("dragover", (event) => {
        event.preventDefault();
        target.classList.add("is-dragging");
      });
      target.addEventListener("dragleave", () => target.classList.remove("is-dragging"));
      target.addEventListener("drop", async (event) => {
        event.preventDefault();
        target.classList.remove("is-dragging");
        const files = [...event.dataTransfer.files].filter((file) => file.type.startsWith("image/"));
        if (!files.length) return;
        await addFilesToAlbum(
          files,
          target.dataset.drop,
          target.dataset.albumId,
          target.dataset.variant || "main",
          target.dataset.categoryName || ""
        );
      });
    });
  }

  async function addFilesToAlbum(files, mode, albumId, variant = "main", categoryName = "") {
    try {
      if (mode === "hero") {
        showProgress("正在处理首页图片", "自动压缩大尺寸图片");
        state.profile.hero = await fileToDataURL(files[0], 2400, 0.88);
      } else {
        const album = getAlbum(albumId || selectedAlbumId);
        if (!album) return;
        showProgress(`正在上传 ${files.length} 张图片`, "处理完成后会自动保存");
        if (mode === "cover") {
          album.cover = await fileToDataURL(files[0], 2400, 0.88);
        } else if (mode === "category-banner") {
          ensureCategoryMeta();
          if (!categoryName || !state.categoryMeta[categoryName]) return;
          state.categoryMeta[categoryName].banner = await fileToDataURL(files[0], 2600, 0.88);
        } else {
          const targetImages = [...albumImages(album, variant)];
          for (const file of files) {
            const src = await fileToDataURL(file, 2400, 0.88);
            targetImages.push({
              id: uid("image"),
              title: file.name.replace(/\.[^.]+$/, "") || `${variant === "aplus" ? "A+" : "主图"} ${targetImages.length + 1}`,
              src
            });
            if (variant === "main" && !album.cover) album.cover = src;
          }
          setAlbumImages(album, variant, targetImages);
        }
      }
      hideProgress();
      renderPanel();
      renderPreview();
      saveSoon();
      showToast("图片已添加。");
      if (mode === "hero") openCropEditor("hero", "profile");
      if (mode === "category-banner") openCropEditor("category-banner", categoryName);
      if (mode === "cover") openCropEditor("cover", albumId || selectedAlbumId);
    } catch {
      hideProgress();
      showToast("图片处理失败，请换一个文件重试。", true);
    }
  }

  function moveImage(imageId, direction, variant = "main") {
    const album = getAlbum(selectedAlbumId);
    if (!album) return;
    const images = [...albumImages(album, variant)];
    const index = images.findIndex((image) => image.id === imageId);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= images.length) return;
    [images[index], images[nextIndex]] = [images[nextIndex], images[index]];
    setAlbumImages(album, variant, images);
    renderPanel();
    renderPreview();
    saveSoon();
  }

  function deleteImage(imageId, variant = "main") {
    const album = getAlbum(selectedAlbumId);
    if (!album) return;
    setAlbumImages(album, variant, albumImages(album, variant).filter((image) => image.id !== imageId));
    renderPanel();
    renderPreview();
    saveSoon();
  }

  async function fileToDataURL(file, maxDimension = 2400, quality = 0.88) {
    if (!file.type.startsWith("image/")) throw new Error("Unsupported file");
    if (file.type === "image/svg+xml" || file.type === "image/gif") {
      return blobToDataURL(file);
    }
    let bitmap;
    try {
      bitmap = await createImageBitmap(file);
    } catch {
      return blobToDataURL(file);
    }
    const width = bitmap.width;
    const height = bitmap.height;
    const scale = Math.min(1, maxDimension / Math.max(width, height));
    const targetWidth = Math.max(1, Math.round(width * scale));
    const targetHeight = Math.max(1, Math.round(height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const context = canvas.getContext("2d", { alpha: true });
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
    bitmap.close?.();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", quality));
    return blob ? blobToDataURL(blob) : canvas.toDataURL("image/jpeg", quality);
  }

  function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }

  function clearHoverCloseTimer() {
    clearTimeout(hoverCloseTimer);
  }

  function closeHoverPreview() {
    clearTimeout(hoverPreviewTimer);
    clearTimeout(hoverCloseTimer);
    hoveredAlbumId = "";
    hoveredVariant = "main";
    hoveredCard = null;
    ELEMENTS.hoverPreview.classList.remove("is-visible");
    ELEMENTS.hoverPreview.setAttribute("aria-hidden", "true");
    ELEMENTS.hoverPreview.innerHTML = "";
  }

  function scheduleCloseHoverPreview() {
    clearTimeout(hoverCloseTimer);
    hoverCloseTimer = window.setTimeout(closeHoverPreview, 220);
  }

  function handlePreviewPointerOver(event) {
    const card = event.target.closest("[data-album-id]");
    if (!card) return;
    const album = getAlbum(card.dataset.albumId);
    if (!album) return;
    clearTimeout(hoverPreviewTimer);
    clearHoverCloseTimer();
    const preferredVariant = defaultHoverVariant(card, album);
    if (hoveredAlbumId === album.id && ELEMENTS.hoverPreview.classList.contains("is-visible")) {
      if (hoveredCard !== card || hoveredVariant !== preferredVariant) {
        showHoverPreview(card, album, preferredVariant);
      }
      return;
    }
    hoverPreviewTimer = window.setTimeout(() => showHoverPreview(card, album, preferredVariant), 380);
  }

  function defaultHoverVariant(card, album) {
    const preferred = card?.dataset.previewVariant === "aplus" ? "aplus" : "main";
    if (albumImages(album, preferred).length) return preferred;
    return albumImages(album, "main").length ? "main" : "aplus";
  }

  function showHoverPreview(card, album, preferredVariant = "") {
    if (!card.isConnected) return;
    hoveredCard = card;
    hoveredAlbumId = album.id;
    hoveredVariant = preferredVariant || defaultHoverVariant(card, album);
    renderHoverPreview(album, hoveredVariant);
    ELEMENTS.hoverPreview.classList.add("is-visible");
    ELEMENTS.hoverPreview.setAttribute("aria-hidden", "false");
    positionHoverPreview(card);
  }

  function handleHoverPointerMove(event) {
    if (!ELEMENTS.hoverPreview.classList.contains("is-visible") || !hoveredCard) return;
    const cardRect = hoveredCard.getBoundingClientRect();
    const previewRect = ELEMENTS.hoverPreview.getBoundingClientRect();
    const insideCard = event.clientX >= cardRect.left && event.clientX <= cardRect.right && event.clientY >= cardRect.top && event.clientY <= cardRect.bottom;
    const insidePreview = event.clientX >= previewRect.left && event.clientX <= previewRect.right && event.clientY >= previewRect.top && event.clientY <= previewRect.bottom;
    if (insideCard || insidePreview) {
      clearHoverCloseTimer();
      return;
    }
    scheduleCloseHoverPreview();
  }

  function renderHoverPreview(album, variant) {
    const privateAlbum = isPrivateAlbum(album);
    const mainImages = albumImages(album, "main");
    const aplusImages = albumImages(album, "aplus");
    const images = variant === "aplus" ? aplusImages : mainImages;
    const displayFont = state.theme.font === "sans"
      ? '"Aptos Display", "Segoe UI", "Microsoft YaHei", sans-serif'
      : state.theme.font === "mono"
        ? '"Cascadia Mono", Consolas, "Microsoft YaHei", monospace'
        : 'Georgia, "Times New Roman", "Songti SC", serif';
    ELEMENTS.hoverPreview.setAttribute("style", [
      themeVars(state.theme),
      `--font-display:${displayFont}`,
      '--font-body:"Aptos", "Segoe UI", "Microsoft YaHei", sans-serif'
    ].join(";"));
    ELEMENTS.hoverPreview.innerHTML = `
      <div class="site-hover-card">
        <div class="site-hover-topline">
          <div class="site-hover-tabs" role="tablist" aria-label="作品图类型">
            <button class="${variant === "main" ? "is-active" : ""}" type="button" data-hover-variant="main" ${mainImages.length ? "" : "disabled"}>主副图 <small>${mainImages.length}</small></button>
            <button class="${variant === "aplus" ? "is-active" : ""}" type="button" data-hover-variant="aplus" ${aplusImages.length ? "" : "disabled"}>A+ <small>${aplusImages.length}</small></button>
          </div>
        </div>
        ${privateAlbum
          ? `<div class="site-hover-lock">${icon("lock", 24)}<strong>此作品集已加密</strong><p>${escapeHTML(album.passwordHint || "点击卡片并输入密码后查看完整内容。")}</p></div>`
          : images.length
            ? `<div class="site-hover-media">
                <div class="site-hover-scroll">${images.map((image, index) => `<figure><img src="${escapeAttr(image.src)}" alt="${escapeAttr(image.title)}" /><figcaption>${String(index + 1).padStart(2, "0")} / ${escapeHTML(image.title)}</figcaption></figure>`).join("")}</div>
                <span class="site-hover-scroll-hint">向下滑动查看</span>
              </div>`
            : `<div class="site-hover-lock">${icon("image", 24)}<strong>还没有${variant === "aplus" ? " A+ " : "主副图"}图片</strong><p>在左侧作品编辑中上传后即可预览。</p></div>`}
        <div class="site-hover-footer">
          <div>
            <span>${escapeHTML(album.category || "SELECTED WORK")} / ${escapeHTML(album.year || "")}</span>
            <strong>${escapeHTML(album.title)}</strong>
          </div>
          <button type="button" data-hover-open>${privateAlbum ? "输入密码" : "打开完整作品"} ${icon("arrow-right", 12)}</button>
        </div>
      </div>
    `;
  }

  function positionHoverPreview(card) {
    const rect = card.getBoundingClientRect();
    const width = Math.min(760, window.innerWidth - 28);
    ELEMENTS.hoverPreview.style.width = `${width}px`;
    const measuredHeight = Math.min(ELEMENTS.hoverPreview.scrollHeight || 500, window.innerHeight - 28);
    const left = Math.max(14, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - 14));
    const preferredTop = rect.top + rect.height / 2 - measuredHeight / 2;
    const top = Math.max(14, Math.min(preferredTop, window.innerHeight - measuredHeight - 14));
    ELEMENTS.hoverPreview.style.left = `${left}px`;
    ELEMENTS.hoverPreview.style.top = `${top}px`;
  }

  function handleHoverPreviewClick(event) {
    if (event.target.closest(".site-hover-scroll")) return;
    const tab = event.target.closest("[data-hover-variant]");
    if (tab) {
      const album = getAlbum(hoveredAlbumId);
      if (!album) return;
      hoveredVariant = tab.dataset.hoverVariant;
      renderHoverPreview(album, hoveredVariant);
      positionHoverPreview(hoveredCard);
      return;
    }
    const openButton = event.target.closest("[data-hover-open]");
    if (!openButton) return;
    const album = getAlbum(hoveredAlbumId);
    if (!album) return;
    const variant = hoveredVariant;
    closeHoverPreview();
    if (isPrivateAlbum(album)) openUnlockDialog(album);
    else openAlbumViewer(album, variant);
  }

  function handlePreviewClick(event) {
    closeHoverPreview();
    const scrollTarget = event.target.closest("[data-scroll]");
    if (scrollTarget) {
      const target = ELEMENTS.sitePreview.querySelector(`#${scrollTarget.dataset.scroll}`);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const moduleButton = event.target.closest("[data-module-id]");
    if (moduleButton) {
      const module = state.modules.find((item) => item.id === moduleButton.dataset.moduleId);
      if (module) openModule(module);
      return;
    }
    const albumButton = event.target.closest("[data-album-id]");
    if (!albumButton) return;
    const album = getAlbum(albumButton.dataset.albumId);
    if (!album) return;
    const variant = albumButton.dataset.previewVariant || "main";
    if (isPrivateAlbum(album)) {
      openUnlockDialog(album);
    } else {
      openAlbumViewer(album, variant);
    }
  }

  function handleModuleEditPointerDown(event) {
    if (activePanel !== "modules" || (event.pointerType === "mouse" && event.button !== 0)) return;
    const resizeHandle = event.target.closest("[data-module-resize]");
    if (!resizeHandle) return;
    const moduleId = resizeHandle.dataset.moduleResize;
    const module = state.modules.find((item) => item.id === moduleId);
    const moduleCard = event.target.closest("[data-module-edit-card]");
    if (!module || !moduleCard) return;
    event.preventDefault();
    event.stopPropagation();

    const startX = event.clientX;
    const startY = event.clientY;
    const startHeight = Math.max(180, Math.min(620, Number(module.cardHeight) || 222));
    const startSize = module.size === "full" ? "full" : "half";
    let changed = false;
    document.body.classList.add("module-resizing");

    const finish = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", finish);
      window.removeEventListener("pointercancel", finish);
      document.body.classList.remove("module-resizing");
      if (!changed) return;
      renderPreview();
      saveSoon();
    };

    const move = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) changed = true;
      const height = Math.max(180, Math.min(620, startHeight + deltaY));
      module.cardHeight = Math.round(height);
      module.size = Math.abs(deltaX) > 70 ? (deltaX > 0 ? "full" : "half") : startSize;
      moduleCard.style.setProperty("--module-height", `${module.cardHeight}px`);
      moduleCard.classList.toggle("is-full", module.size === "full");
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", finish, { once: true });
    window.addEventListener("pointercancel", finish, { once: true });
  }

  function openModule(module) {
    const linkedAlbum = module.targetAlbumId ? getAlbum(module.targetAlbumId) : null;
    if (linkedAlbum) {
      if (isPrivateAlbum(linkedAlbum)) openUnlockDialog(linkedAlbum);
      else openAlbumViewer(linkedAlbum);
      return;
    }
    openFeatureDetail(module);
  }

  function openFeatureDetail(module) {
    const blocks = String(module.details || "")
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter(Boolean);
    ELEMENTS.featureDialogKicker.textContent = module.kicker || "SELECTED PROJECTS";
    ELEMENTS.featureDialogTitle.textContent = module.title || "模块标题";
    ELEMENTS.featureDialogDescription.textContent = module.description || "";
    ELEMENTS.featureDialogBody.innerHTML = blocks.length
      ? blocks.map((block, index) => {
          const lines = block.split("\n");
          const title = lines.length > 1 ? lines.shift() : "";
          return `
            <section class="feature-detail-item">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <div>
                ${title ? `<h3>${escapeHTML(title)}</h3>` : ""}
                <p>${escapeHTML(lines.join("\n")).replace(/\n/g, "<br>")}</p>
              </div>
            </section>
          `;
        }).join("")
      : `<p class="feature-empty">编辑这个模块的“点击后的详细文字”，内容会显示在这里。</p>`;
    ELEMENTS.featureDialog.showModal();
  }

  function openUnlockDialog(album) {
    unlockTargetId = album.id;
    ELEMENTS.unlockForm.reset();
    ELEMENTS.unlockMessage.textContent = "";
    ELEMENTS.unlockPassword.type = "password";
    ELEMENTS.unlockTitle.textContent = album.title;
    ELEMENTS.unlockAlbumName.textContent = album.passwordHint
      ? `输入访问密码后查看完整内容。${album.passwordHint}`
      : "输入访问密码后查看完整内容。";
    ELEMENTS.unlockDialog.showModal();
    setTimeout(() => ELEMENTS.unlockPassword.focus(), 30);
  }

  function closeUnlockDialog() {
    unlockTargetId = "";
    ELEMENTS.unlockDialog.close();
  }

  function handleUnlockSubmit(event) {
    event.preventDefault();
    const album = getAlbum(unlockTargetId);
    if (!album) return;
    const password = ELEMENTS.unlockPassword.value;
    if (password !== album.password) {
      ELEMENTS.unlockMessage.textContent = "密码不正确，请重试。";
      ELEMENTS.unlockPassword.select();
      return;
    }
    ELEMENTS.unlockDialog.close();
    unlockTargetId = "";
    openAlbumViewer(album);
  }

  function openAlbumViewer(album, variant = "main") {
    const mainImages = albumImages(album, "main");
    const aplusImages = albumImages(album, "aplus");
    if (!mainImages.length && !aplusImages.length) {
      showToast("这个作品集还没有图片。", true);
      return;
    }
    currentAlbum = album;
    currentVariant = albumImages(album, variant).length ? variant : mainImages.length ? "main" : "aplus";
    currentImageIndex = 0;
    renderAlbumViewer();
    if (!ELEMENTS.albumDialog.open) ELEMENTS.albumDialog.showModal();
  }

  function renderAlbumViewer() {
    const images = albumImages(currentAlbum, currentVariant);
    if (!images.length) return;
    const image = images[currentImageIndex];
    const mainCount = albumImages(currentAlbum, "main").length;
    const aplusCount = albumImages(currentAlbum, "aplus").length;
    ELEMENTS.albumDialogKicker.textContent = `${currentAlbum.category || "SELECTED WORK"} / ${currentAlbum.year || ""}`;
    ELEMENTS.albumDialogTitle.textContent = currentAlbum.title;
    ELEMENTS.albumVariantTabs.innerHTML = `
      <button class="${currentVariant === "main" ? "is-active" : ""}" type="button" data-album-viewer-variant="main" ${mainCount ? "" : "disabled"}>主副图 <small>${mainCount}</small></button>
      <button class="${currentVariant === "aplus" ? "is-active" : ""}" type="button" data-album-viewer-variant="aplus" ${aplusCount ? "" : "disabled"}>A+ <small>${aplusCount}</small></button>
    `;
    ELEMENTS.albumMainImage.src = image.src;
    ELEMENTS.albumMainImage.alt = image.title;
    ELEMENTS.albumImageCaption.textContent = `${image.title} · ${currentImageIndex + 1} / ${images.length}`;
    ELEMENTS.albumThumbnails.innerHTML = images.map((item, index) => `
      <button class="album-thumbnail ${index === currentImageIndex ? "is-active" : ""}" type="button" data-image-index="${index}" aria-label="查看 ${escapeAttr(item.title)}">
        <img src="${escapeAttr(item.src)}" alt="" />
      </button>
    `).join("");
  }

  function showPreviousImage() {
    const images = albumImages(currentAlbum, currentVariant);
    if (!images.length) return;
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    renderAlbumViewer();
  }

  function showNextImage() {
    const images = albumImages(currentAlbum, currentVariant);
    if (!images.length) return;
    currentImageIndex = (currentImageIndex + 1) % images.length;
    renderAlbumViewer();
  }

  function closeAlbumViewer() {
    if (ELEMENTS.albumDialog.open) ELEMENTS.albumDialog.close();
    currentAlbum = null;
    currentImageIndex = 0;
    currentVariant = "main";
  }

  async function resetProject() {
    if (!window.confirm("恢复到示例内容？当前作品、图片和密码会被替换。建议先导出项目备份。")) return;
    state = normalizeState(createInitialState());
    selectedAlbumId = "";
    activePanel = "profile";
    renderPanel();
    renderPreview();
    setPreviewViewport("desktop");
    await saveNow();
    showToast("已恢复示例内容。");
  }

  function slugify(value) {
    const slug = String(value || "portfolio")
      .trim()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();
    return slug || "portfolio";
  }

  async function exportProjectFile() {
    await saveNow();
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    downloadBlob(blob, `${slugify(state.profile.name)}-folio-project.json`);
    showToast("项目文件已导出，可稍后重新导入继续编辑。");
  }

  async function handleProjectFileInput() {
    const file = ELEMENTS.projectFileInput.files?.[0];
    if (!file) return;
    try {
      const raw = JSON.parse(await file.text());
      if (!raw.profile || !Array.isArray(raw.albums)) throw new Error("Invalid project");
      state = normalizeState(raw);
      selectedAlbumId = "";
      activePanel = "profile";
      renderPanel();
      renderPreview();
      await saveNow();
      showToast("项目已导入。");
    } catch {
      showToast("无法识别这个项目文件，请选择由本工具导出的 JSON。", true);
    }
  }

  async function publishSite() {
    showProgress("正在加密与打包页面", "图片较多时可能需要几秒钟");
    try {
      await saveNow();
      const html = await buildExportHTML();
      downloadBlob(new Blob([html], { type: "text/html;charset=utf-8" }), `${slugify(state.profile.name)}-portfolio.html`);
      showToast("发布页已导出，可以直接上传到任意静态网站空间。");
    } catch (error) {
      console.error(error);
      showToast("发布页生成失败，请确认页面通过本地服务器打开后重试。", true);
    } finally {
      hideProgress();
    }
  }

  async function openPreviewPage() {
    const previewWindow = window.open("about:blank", "_blank");
    if (!previewWindow) {
      showToast("浏览器拦截了新窗口，请允许弹出窗口后重试。", true);
      return;
    }
    previewWindow.document.write("<!doctype html><title>正在生成预览…</title><body style='margin:0;display:grid;place-items:center;min-height:100vh;background:#171914;color:#f7f3e8;font:14px sans-serif'>正在生成作品集预览…</body>");
    try {
      const html = await buildExportHTML();
      const url = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }));
      previewWindow.location.replace(url);
      setTimeout(() => URL.revokeObjectURL(url), 120000);
    } catch (error) {
      console.error(error);
      previewWindow.close();
      showToast("预览页生成失败，请通过本地服务器打开工具后重试。", true);
    }
  }

  async function buildExportHTML() {
    const cssText = await getStylesheetText();
    const exportedAlbums = [];
    for (let index = 0; index < state.albums.length; index += 1) {
      const album = state.albums[index];
      updateProgress(`正在处理作品 ${index + 1} / ${state.albums.length}`, album.title);
      const hydrated = {
        ...album,
        cover: await inlineAsset(album.cover),
        images: [],
        variants: {
          main: [],
          aplus: []
        }
      };
      for (const variant of ["main", "aplus"]) {
        for (const image of albumImages(album, variant)) {
          hydrated.variants[variant].push({ ...image, src: await inlineAsset(image.src) });
        }
      }
      hydrated.images = hydrated.variants.main;
      if (!hydrated.cover && hydrated.images[0]) hydrated.cover = hydrated.images[0].src;

      if (album.password) {
        const encrypted = await encryptJSON(hydrated, album.password);
        exportedAlbums.push({
          id: album.id,
          title: album.title,
          subtitle: album.subtitle,
          category: album.category,
          year: album.year,
          summary: album.summary,
          visible: album.visible !== false,
          private: true,
          imageCount: albumImages(album, "main").length,
          aplusCount: albumImages(album, "aplus").length,
          passwordHint: album.passwordHint,
          encrypted
        });
      } else {
        exportedAlbums.push({
          ...hydrated,
          password: "",
          passwordHint: ""
        });
      }
    }

    const hydratedCategoryMeta = {};
    for (const [name, meta] of Object.entries(ensureCategoryMeta())) {
      hydratedCategoryMeta[name] = {
        ...meta,
        banner: await inlineAsset(meta.banner)
      };
    }

    const exportProject = {
      version: state.version,
      profile: {
        ...state.profile,
        hero: await inlineAsset(state.profile.hero)
      },
      theme: clone(state.theme),
      modules: clone(state.modules),
      sections: clone(state.sections),
      customModules: clone(state.customModules),
      categoryMeta: hydratedCategoryMeta,
      albums: exportedAlbums
    };
    const initialView = {
      ...exportProject,
      albums: exportProject.albums.map((album) => ({
        ...album,
        images: album.private ? [] : album.images
      }))
    };
    const rootTheme = themeVars(exportProject.theme);
    const initialSite = portfolioMarkup(initialView, { year: new Date().getFullYear() });
    const dataJson = JSON.stringify(exportProject)
      .replace(/</g, "\\u003c")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");
    const runtime = `(${exportedViewerRuntime.toString()})(FOLIO_DATA);`;
    const title = `${state.profile.name || "Portfolio"} · Portfolio`;
    return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex,nofollow" />
  <title>${escapeHTML(title)}</title>
  <style>${cssText}
    html, body { min-height: 100%; overflow: auto; background: ${safeCssColor(exportProject.theme.bg, "#f1eee6")}; }
    body.export-page { display: block; }
    .export-page .site-preview { height: auto; min-height: 100vh; overflow: visible; }
    .export-page .site-nav { position: absolute; }
    .export-page .album-dialog { z-index: 50; }
    .export-page .unlock-dialog { z-index: 60; }
    .export-page .toast { z-index: 80; }
  </style>
</head>
<body class="export-page">
  <div id="export-site" class="site-preview" style="${escapeAttr(rootTheme)}" data-layout="${escapeAttr(exportProject.theme.layout)}" data-font="${escapeAttr(exportProject.theme.font)}" data-density="${escapeAttr(exportProject.theme.density)}">
    ${initialSite}
  </div>
  <dialog class="album-dialog" id="album-dialog" aria-labelledby="album-dialog-title">
    <div class="album-dialog-shell">
      <header class="album-dialog-head">
        <div><p class="eyebrow" id="album-dialog-kicker">SELECTED WORK</p><h2 id="album-dialog-title"></h2><div class="album-variant-tabs" id="album-variant-tabs"></div></div>
        <button class="icon-button icon-button-light" type="button" data-export-action="close-album" aria-label="关闭作品预览">${icon("x", 16)}</button>
      </header>
      <div class="album-viewer">
        <div class="album-viewer-main">
          <button class="viewer-arrow" type="button" data-export-action="previous-image" aria-label="上一张">${icon("arrow-left", 17)}</button>
          <figure><img id="album-main-image" alt="" /><figcaption id="album-image-caption"></figcaption></figure>
          <button class="viewer-arrow" type="button" data-export-action="next-image" aria-label="下一张">${icon("arrow-right", 17)}</button>
        </div>
        <div class="album-thumbnails" id="album-thumbnails"></div>
      </div>
    </div>
  </dialog>
  <dialog class="unlock-dialog" id="unlock-dialog" aria-labelledby="unlock-title">
    <form method="dialog" class="unlock-card" id="unlock-form">
      <button class="icon-button unlock-close" type="button" data-export-action="close-unlock" aria-label="关闭密码窗口">${icon("x", 16)}</button>
      <span class="unlock-mark" aria-hidden="true">${icon("lock", 18)}</span>
      <p class="eyebrow">PRIVATE COLLECTION</p>
      <h2 id="unlock-title">此作品集已加密</h2>
      <p id="unlock-album-name">输入访问密码后查看完整内容。</p>
      <label class="field"><span>访问密码</span><span class="input-with-action"><input id="unlock-password" type="password" autocomplete="off" maxlength="128" required placeholder="输入作品集密码" /><button type="button" class="field-action" data-export-action="toggle-password">显示</button></span></label>
      <p class="form-message" id="unlock-message" role="alert"></p>
      <button class="button button-primary button-wide" type="submit">${icon("unlock", 16)}<span>解锁作品集</span></button>
      <p class="unlock-note">此页面中的私密作品图经过加密，密码不会保存在链接中。</p>
    </form>
  </dialog>
  <dialog class="feature-dialog" id="feature-dialog" aria-labelledby="feature-dialog-title">
    <article class="feature-sheet">
      <button class="icon-button icon-button-light feature-close" type="button" data-export-action="close-feature" aria-label="关闭详情">${icon("x", 16)}</button>
      <p class="eyebrow" id="feature-dialog-kicker"></p>
      <h2 id="feature-dialog-title"></h2>
      <p class="feature-intro" id="feature-dialog-description"></p>
      <div class="feature-detail-body" id="feature-dialog-body"></div>
      <button class="button button-primary" type="button" data-export-action="close-feature">返回作品集</button>
    </article>
  </dialog>
  <div class="site-hover-preview" id="site-hover-preview" aria-hidden="true"></div>
  <div class="toast" id="export-toast" role="status" aria-live="polite"></div>
  <script>
    const FOLIO_DATA = ${dataJson};
    ${runtime}
  </script>
</body>
</html>`;
  }

  async function getStylesheetText() {
    if (ASSET_CACHE.has("__stylesheet__")) return ASSET_CACHE.get("__stylesheet__");
    const response = await fetch("./styles.css", { cache: "no-cache" });
    if (!response.ok) throw new Error("Stylesheet unavailable");
    const text = await response.text();
    ASSET_CACHE.set("__stylesheet__", text);
    return text;
  }

  async function inlineAsset(src) {
    if (!src) return "";
    if (src.startsWith("data:") || src.startsWith("blob:")) return src;
    if (ASSET_CACHE.has(src)) return ASSET_CACHE.get(src);
    const response = await fetch(new URL(src, window.location.href));
    if (!response.ok) throw new Error(`Unable to load asset: ${src}`);
    const blob = await response.blob();
    const dataUrl = await blobToDataURL(blob);
    ASSET_CACHE.set(src, dataUrl);
    return dataUrl;
  }

  function randomBytes(length) {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return bytes;
  }

  function bytesToBase64(bytes) {
    let binary = "";
    const chunk = 0x8000;
    for (let index = 0; index < bytes.length; index += chunk) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
    }
    return btoa(binary);
  }

  function base64ToBytes(value) {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
  }

  async function deriveKey(password, salt, iterations) {
    const material = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
      material,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  async function encryptJSON(value, password) {
    if (!crypto.subtle) throw new Error("WebCrypto unavailable");
    const iterations = 180000;
    const salt = randomBytes(16);
    const iv = randomBytes(12);
    const key = await deriveKey(password, salt, iterations);
    const encoded = new TextEncoder().encode(JSON.stringify(value));
    const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
    return {
      algorithm: "AES-GCM",
      kdf: "PBKDF2-SHA256",
      iterations,
      salt: bytesToBase64(salt),
      iv: bytesToBase64(iv),
      data: bytesToBase64(new Uint8Array(encrypted))
    };
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }

  function showProgress(title, detail) {
    ELEMENTS.progressTitle.textContent = title;
    ELEMENTS.progressDetail.textContent = detail;
    ELEMENTS.progressOverlay.hidden = false;
  }

  function updateProgress(title, detail) {
    ELEMENTS.progressTitle.textContent = title;
    ELEMENTS.progressDetail.textContent = detail;
  }

  function hideProgress() {
    ELEMENTS.progressOverlay.hidden = true;
  }

  function showToast(message, isError = false) {
    clearTimeout(toastTimer);
    ELEMENTS.toast.textContent = message;
    ELEMENTS.toast.classList.toggle("is-error", isError);
    ELEMENTS.toast.classList.add("is-visible");
    toastTimer = setTimeout(() => ELEMENTS.toast.classList.remove("is-visible"), 3200);
  }

  function exportedViewerRuntime(DATA) {
    const site = document.getElementById("export-site");
    const albumDialog = document.getElementById("album-dialog");
    const unlockDialog = document.getElementById("unlock-dialog");
    const unlockForm = document.getElementById("unlock-form");
    const unlockPassword = document.getElementById("unlock-password");
    const unlockMessage = document.getElementById("unlock-message");
    const unlockTitle = document.getElementById("unlock-title");
    const unlockAlbumName = document.getElementById("unlock-album-name");
    const featureDialog = document.getElementById("feature-dialog");
    const featureKicker = document.getElementById("feature-dialog-kicker");
    const featureTitle = document.getElementById("feature-dialog-title");
    const featureDescription = document.getElementById("feature-dialog-description");
    const featureBody = document.getElementById("feature-dialog-body");
    const albumTitle = document.getElementById("album-dialog-title");
    const albumKicker = document.getElementById("album-dialog-kicker");
    const mainImage = document.getElementById("album-main-image");
    const caption = document.getElementById("album-image-caption");
    const thumbnails = document.getElementById("album-thumbnails");
    const albumVariantTabs = document.getElementById("album-variant-tabs");
    const hoverPreview = document.getElementById("site-hover-preview");
    const toast = document.getElementById("export-toast");
    let unlockTarget = "";
    let activeAlbum = null;
    let activeIndex = 0;
    let activeVariant = "main";
    let hoveredAlbumId = "";
    let hoveredVariant = "main";
    let hoveredCard = null;
    let hoverTimer = 0;
    let hoverCloseTimer = 0;
    let toastTimer = 0;

    function escapeHTML(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function base64ToBytes(value) {
      const binary = atob(value);
      const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
      return bytes;
    }

    async function decryptJSON(payload, password) {
      const salt = base64ToBytes(payload.salt);
      const iv = base64ToBytes(payload.iv);
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveKey"]
      );
      const key = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: payload.iterations, hash: "SHA-256" },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
      );
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        base64ToBytes(payload.data)
      );
      return JSON.parse(new TextDecoder().decode(decrypted));
    }

    function showToast(message, error = false) {
      clearTimeout(toastTimer);
      toast.textContent = message;
      toast.classList.toggle("is-error", error);
      toast.classList.add("is-visible");
      toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3000);
    }

    function findAlbum(id) {
      return DATA.albums.find((album) => album.id === id);
    }

    function albumImages(album, variant = "main") {
      if (variant === "aplus") return album?.variants?.aplus || [];
      return album?.variants?.main || album?.images || [];
    }

    function runtimeIcon(name, size = 14) {
      const paths = {
        lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
        image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
        arrow: '<path d="m9 18 6-6-6-6"/>'
      };
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || "") + "</svg>";
    }

    function safeColor(value, fallback) {
      return /^#[0-9a-f]{6}$/i.test(String(value || "")) ? value : fallback;
    }

    function openFeature(module) {
      const blocks = String(module.details || "")
        .split(/\n\s*\n/)
        .map((block) => block.trim())
        .filter(Boolean);
      featureKicker.textContent = module.kicker || "SELECTED PROJECTS";
      featureTitle.textContent = module.title || "模块标题";
      featureDescription.textContent = module.description || "";
      featureBody.innerHTML = blocks.length
        ? blocks.map((block, index) => {
            const lines = block.split("\n");
            const title = lines.length > 1 ? lines.shift() : "";
            return '<section class="feature-detail-item"><span>' + String(index + 1).padStart(2, "0") +
              '</span><div>' + (title ? "<h3>" + escapeHTML(title) + "</h3>" : "") +
              "<p>" + escapeHTML(lines.join("\n")).replace(/\n/g, "<br>") + "</p></div></section>";
          }).join("")
        : '<p class="feature-empty">暂无更多详情。</p>';
      featureDialog.showModal();
    }

    function openModule(module) {
      const linkedAlbum = module.targetAlbumId ? findAlbum(module.targetAlbumId) : null;
      if (linkedAlbum) {
        if (linkedAlbum.private) openUnlock(linkedAlbum);
        else openAlbum(linkedAlbum);
        return;
      }
      openFeature(module);
    }

    function openUnlock(album) {
      unlockTarget = album.id;
      unlockForm.reset();
      unlockPassword.type = "password";
      unlockMessage.textContent = "";
      unlockTitle.textContent = album.title;
      unlockAlbumName.textContent = album.passwordHint
        ? "输入访问密码后查看完整内容。" + album.passwordHint
        : "输入访问密码后查看完整内容。";
      unlockDialog.showModal();
      setTimeout(() => unlockPassword.focus(), 30);
    }

    function closeUnlock() {
      unlockDialog.close();
      unlockTarget = "";
    }

    function closeHover() {
      clearTimeout(hoverTimer);
      clearTimeout(hoverCloseTimer);
      hoveredAlbumId = "";
      hoveredVariant = "main";
      hoveredCard = null;
      hoverPreview.classList.remove("is-visible");
      hoverPreview.setAttribute("aria-hidden", "true");
      hoverPreview.innerHTML = "";
    }

    function scheduleHoverClose() {
      clearTimeout(hoverCloseTimer);
      hoverCloseTimer = setTimeout(closeHover, 220);
    }

    function defaultHoverVariant(card, album) {
      const preferred = card?.dataset.previewVariant === "aplus" ? "aplus" : "main";
      if (albumImages(album, preferred).length) return preferred;
      return albumImages(album, "main").length ? "main" : "aplus";
    }

    function showHover(card, album, preferredVariant = "") {
      hoveredCard = card;
      hoveredAlbumId = album.id;
      hoveredVariant = preferredVariant || defaultHoverVariant(card, album);
      renderHover(album, hoveredVariant);
      hoverPreview.classList.add("is-visible");
      hoverPreview.setAttribute("aria-hidden", "false");
      positionHover(card);
    }

    function positionHover(card) {
      const rect = card.getBoundingClientRect();
      const width = Math.min(760, window.innerWidth - 28);
      hoverPreview.style.width = width + "px";
      const measuredHeight = Math.min(hoverPreview.scrollHeight || 500, window.innerHeight - 28);
      const left = Math.max(14, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - 14));
      const preferredTop = rect.top + rect.height / 2 - measuredHeight / 2;
      const top = Math.max(14, Math.min(preferredTop, window.innerHeight - measuredHeight - 14));
      hoverPreview.style.left = left + "px";
      hoverPreview.style.top = top + "px";
    }

    function handleHoverPointerMove(event) {
      if (!hoverPreview.classList.contains("is-visible") || !hoveredCard) return;
      const cardRect = hoveredCard.getBoundingClientRect();
      const previewRect = hoverPreview.getBoundingClientRect();
      const insideCard = event.clientX >= cardRect.left && event.clientX <= cardRect.right && event.clientY >= cardRect.top && event.clientY <= cardRect.bottom;
      const insidePreview = event.clientX >= previewRect.left && event.clientX <= previewRect.right && event.clientY >= previewRect.top && event.clientY <= previewRect.bottom;
      if (insideCard || insidePreview) {
        clearTimeout(hoverCloseTimer);
        return;
      }
      scheduleHoverClose();
    }

    function renderHover(album, variant) {
      const mainImages = albumImages(album, "main");
      const aplusImages = albumImages(album, "aplus");
      const images = variant === "aplus" ? aplusImages : mainImages;
      const theme = DATA.theme || {};
      const bg = safeColor(theme.bg, "#f1eee6");
      const surface = safeColor(theme.surface, "#dfd8ca");
      const text = safeColor(theme.text, "#181a16");
      const muted = safeColor(theme.muted, "#6a6b64");
      const accent = safeColor(theme.accent, "#d75536");
      const line = safeColor(theme.line, "#c9c2b3");
      const displayFont = theme.font === "sans"
        ? '"Aptos Display", "Segoe UI", "Microsoft YaHei", sans-serif'
        : theme.font === "mono"
          ? '"Cascadia Mono", Consolas, "Microsoft YaHei", monospace'
          : 'Georgia, "Times New Roman", "Songti SC", serif';
      hoverPreview.setAttribute("style", [
        "--site-bg:" + bg,
        "--site-surface:" + surface,
        "--site-text:" + text,
        "--site-muted:" + muted,
        "--site-accent:" + accent,
        "--site-line:" + line,
        '--font-display:' + displayFont,
        '--font-body:"Aptos", "Segoe UI", "Microsoft YaHei", sans-serif'
      ].join(";"));
      hoverPreview.innerHTML = '<div class="site-hover-card">' +
        '<div class="site-hover-topline">' +
          '<div class="site-hover-tabs" role="tablist" aria-label="作品图类型">' +
            '<button class="' + (variant === "main" ? "is-active" : "") + '" type="button" data-hover-variant="main" ' + (mainImages.length ? "" : "disabled") + '>主副图 <small>' + mainImages.length + '</small></button>' +
            '<button class="' + (variant === "aplus" ? "is-active" : "") + '" type="button" data-hover-variant="aplus" ' + (aplusImages.length ? "" : "disabled") + '>A+ <small>' + aplusImages.length + '</small></button>' +
          '</div>' +
        '</div>' +
        (album.private
          ? '<div class="site-hover-lock">' + runtimeIcon("lock", 24) + '<strong>此作品集已加密</strong><p>' + escapeHTML(album.passwordHint || "点击卡片并输入密码后查看完整内容。") + '</p></div>'
          : images.length
            ? '<div class="site-hover-media"><div class="site-hover-scroll">' + images.map((image, index) => '<figure><img src="' + escapeHTML(image.src) + '" alt="' + escapeHTML(image.title) + '"/><figcaption>' + String(index + 1).padStart(2, "0") + " / " + escapeHTML(image.title) + '</figcaption></figure>').join("") + '</div><span class="site-hover-scroll-hint">向下滑动查看</span></div>'
            : '<div class="site-hover-lock">' + runtimeIcon("image", 24) + '<strong>暂无作品图</strong><p>切换到可用的作品图类型查看。</p></div>') +
        '<div class="site-hover-footer"><div><span>' + escapeHTML(album.category || "SELECTED WORK") + " / " + escapeHTML(album.year || "") +
        '</span><strong>' + escapeHTML(album.title) + '</strong></div><button type="button" data-hover-open>' + (album.private ? "输入密码" : "打开完整作品") + " " + runtimeIcon("arrow", 12) + '</button></div></div>';
    }

    function renderAlbum() {
      const images = albumImages(activeAlbum, activeVariant);
      if (!images.length) return;
      const image = images[activeIndex];
      const mainCount = albumImages(activeAlbum, "main").length;
      const aplusCount = albumImages(activeAlbum, "aplus").length;
      albumKicker.textContent = (activeAlbum.category || "SELECTED WORK") + " / " + (activeAlbum.year || "");
      albumTitle.textContent = activeAlbum.title;
      albumVariantTabs.innerHTML =
        '<button class="' + (activeVariant === "main" ? "is-active" : "") + '" type="button" data-export-variant="main" ' + (mainCount ? "" : "disabled") + '>主副图 <small>' + mainCount + '</small></button>' +
        '<button class="' + (activeVariant === "aplus" ? "is-active" : "") + '" type="button" data-export-variant="aplus" ' + (aplusCount ? "" : "disabled") + '>A+ <small>' + aplusCount + '</small></button>';
      mainImage.src = image.src;
      mainImage.alt = image.title || "";
      caption.textContent = (image.title || "作品图") + " · " + (activeIndex + 1) + " / " + images.length;
      thumbnails.innerHTML = images.map((item, index) => (
        '<button class="album-thumbnail ' + (index === activeIndex ? "is-active" : "") + '" type="button" data-export-image="' + index + '" aria-label="查看作品图">' +
        '<img src="' + escapeHTML(item.src) + '" alt="" /></button>'
      )).join("");
    }

    function openAlbum(album, variant = "main") {
      const mainImages = albumImages(album, "main");
      const aplusImages = albumImages(album, "aplus");
      if (!mainImages.length && !aplusImages.length) {
        showToast("这个作品集暂时没有图片。", true);
        return;
      }
      activeAlbum = album;
      activeVariant = albumImages(album, variant).length ? variant : mainImages.length ? "main" : "aplus";
      activeIndex = 0;
      renderAlbum();
      albumDialog.showModal();
    }

    site.addEventListener("pointerover", (event) => {
      const card = event.target.closest("[data-album-id]");
      if (!card) return;
      const album = findAlbum(card.dataset.albumId);
      if (!album) return;
      clearTimeout(hoverTimer);
      clearTimeout(hoverCloseTimer);
      const preferredVariant = defaultHoverVariant(card, album);
      if (hoveredAlbumId === album.id && hoverPreview.classList.contains("is-visible")) {
        if (hoveredCard !== card || hoveredVariant !== preferredVariant) showHover(card, album, preferredVariant);
        return;
      }
      hoverTimer = setTimeout(() => showHover(card, album, preferredVariant), 380);
    });

    hoverPreview.addEventListener("pointerenter", () => clearTimeout(hoverCloseTimer));
    document.addEventListener("pointermove", handleHoverPointerMove);

    hoverPreview.addEventListener("click", (event) => {
      if (event.target.closest(".site-hover-scroll")) return;
      const tab = event.target.closest("[data-hover-variant]");
      if (tab) {
        const album = findAlbum(hoveredAlbumId);
        if (!album) return;
        hoveredVariant = tab.dataset.hoverVariant;
        renderHover(album, hoveredVariant);
        positionHover(hoveredCard);
        return;
      }
      const openButton = event.target.closest("[data-hover-open]");
      if (!openButton) return;
      const album = findAlbum(hoveredAlbumId);
      if (!album) return;
      const variant = hoveredVariant;
      closeHover();
      if (album.private) openUnlock(album);
      else openAlbum(album, variant);
    });

    site.addEventListener("click", (event) => {
      closeHover();
      const scrollButton = event.target.closest("[data-scroll]");
      if (scrollButton) {
        document.getElementById(scrollButton.dataset.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      const moduleCard = event.target.closest("[data-module-id]");
      if (moduleCard) {
        const module = DATA.modules.find((item) => item.id === moduleCard.dataset.moduleId);
        if (module) openModule(module);
        return;
      }
      const card = event.target.closest("[data-album-id]");
      if (!card) return;
      const album = findAlbum(card.dataset.albumId);
      if (!album) return;
      const variant = card.dataset.previewVariant || "main";
      if (album.private) openUnlock(album);
      else openAlbum(album, variant);
    });

    unlockForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const album = findAlbum(unlockTarget);
      if (!album?.encrypted) return;
      const button = unlockForm.querySelector("button[type='submit']");
      button.disabled = true;
      unlockMessage.textContent = "正在验证密码…";
      try {
        const decrypted = await decryptJSON(album.encrypted, unlockPassword.value);
        unlockDialog.close();
        unlockTarget = "";
        openAlbum(decrypted);
      } catch {
        unlockMessage.textContent = "密码不正确，请重试。";
        unlockPassword.select();
      } finally {
        button.disabled = false;
      }
    });

    albumDialog.addEventListener("click", (event) => {
      if (event.target === albumDialog) albumDialog.close();
      const variantButton = event.target.closest("[data-export-variant]");
      if (variantButton) {
        activeVariant = variantButton.dataset.exportVariant;
        activeIndex = 0;
        renderAlbum();
        return;
      }
      const thumb = event.target.closest("[data-export-image]");
      if (thumb) {
        activeIndex = Number(thumb.dataset.exportImage);
        renderAlbum();
      }
    });

    unlockDialog.addEventListener("click", (event) => {
      if (event.target === unlockDialog) closeUnlock();
    });

    featureDialog.addEventListener("click", (event) => {
      if (event.target === featureDialog) featureDialog.close();
    });

    document.addEventListener("click", (event) => {
      const action = event.target.closest("[data-export-action]")?.dataset.exportAction;
      if (!action) return;
      if (action === "close-album") albumDialog.close();
      if (action === "close-unlock") closeUnlock();
      if (action === "close-feature") featureDialog.close();
      if (action === "toggle-password") {
        const showing = unlockPassword.type === "text";
        unlockPassword.type = showing ? "password" : "text";
        event.target.closest("button").textContent = showing ? "显示" : "隐藏";
      }
      if (action === "previous-image" && albumImages(activeAlbum, activeVariant).length) {
        const images = albumImages(activeAlbum, activeVariant);
        activeIndex = (activeIndex - 1 + images.length) % images.length;
        renderAlbum();
      }
      if (action === "next-image" && albumImages(activeAlbum, activeVariant).length) {
        const images = albumImages(activeAlbum, activeVariant);
        activeIndex = (activeIndex + 1) % images.length;
        renderAlbum();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (albumDialog.open && event.key === "ArrowLeft") {
        const images = albumImages(activeAlbum, activeVariant);
        activeIndex = (activeIndex - 1 + images.length) % images.length;
        renderAlbum();
      }
      if (albumDialog.open && event.key === "ArrowRight") {
        const images = albumImages(activeAlbum, activeVariant);
        activeIndex = (activeIndex + 1) % images.length;
        renderAlbum();
      }
    });
  }

  init().catch((error) => {
    console.error(error);
    document.body.innerHTML = '<main style="padding:40px;font-family:sans-serif"><h1>页面未能启动</h1><p>请刷新页面后重试。</p></main>';
  });
})();
