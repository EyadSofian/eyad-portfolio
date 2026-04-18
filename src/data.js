export const PROJECTS = [
  {
    id: 1, emoji: "📞", color: "#10B981", cat: "AI & Automation",
    title: "Call Quality Auditing System", client: "Engosoft", year: "2025",
    tags: ["n8n", "Groq Whisper", "GPT-4o", "Pinecone", "Odoo CRM"],
    desc: "32–40 node n8n pipeline that automatically transcribes Arabic call recordings and evaluates agent performance across 46+ quality criteria with AI scoring.",
    metrics: { "Nodes": "32–40", "Criteria": "46+", "Scoring": "A–F" },
    flow: ["Yeastar PBX", "Download WAV", "Groq Whisper STT", "GPT-4o Evaluate", "Pinecone RAG", "Score Recalc", "Odoo CRM", "Email Report"],
    demo: "https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2025/12/14/16/20251214162629-RCBC4P4N.json",
    repo: "https://github.com/EyadSofian/chatwoot-botpress-bridge"
  },
  {
    id: 2, emoji: "🎓", color: "#8B5CF6", cat: "Conversational AI",
    title: "Majed — AI Educational Copilot", client: "Engosoft Training", year: "2025–2026",
    tags: ["Botpress", "Gemini 2.5 Flash", "n8n", "Odoo", "Google Calendar"],
    desc: "Full-stack Arabic AI copilot for engineering trainees — generates study plans, quizzes, schedules sessions, and hands off to human agents.",
    metrics: { "Workflows": "3+", "Assessment": "30 Q's", "Languages": "Any" },
    flow: ["Student Message", "Botpress Autonomous", "Gemini 2.5 Flash", "n8n Webhook", "PDF/Word Gen", "Email Delivery", "Calendar Sync"],
    demo: "https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/02/11/18/20260211184124-KE13UNZE.json",
    repo: null
  },
  {
    id: 3, emoji: "🤖", color: "#EF4444", cat: "Conversational AI",
    title: "Fahad — Customer Service Bot", client: "Engosoft", year: "2025",
    tags: ["Botpress", "Gemini 2.5 Flash", "Chatwoot", "Node.js", "n8n"],
    desc: "Production chatbot with 3 autonomous AI agents handling inquiries, operations, and sales — with seamless bot-to-human handoff via custom bridge.",
    metrics: { "Flows": "6", "Nodes": "25+", "AI Agents": "3" },
    flow: ["Customer Msg", "Language Detect", "Autonomous Node", "Knowledge Base", "Sales/Ops Route", "Chatwoot Bridge", "Human Agent"],
    demo: "https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2025/12/14/16/20251214162629-RCBC4P4N.json",
    repo: "https://github.com/EyadSofian/chatwoot-botpress-bridge"
  },
  {
    id: 4, emoji: "🛒", color: "#F59E0B", cat: "Integration",
    title: "Shopify → Odoo Real-Time Sync", client: "Engosoft", year: "2025",
    tags: ["n8n", "Shopify API", "Odoo 18", "Webhooks"],
    desc: "Webhook-triggered real-time order sync with barcode product matching and two-step order creation to handle Odoo One2many fields.",
    metrics: { "Sync": "Real-time", "Entities": "5", "Response": "<200ms" },
    flow: ["Shopify Order", "Webhook Trigger", "HTTP 200 Dedup", "Match Customer", "Match Products", "Create SO", "Update Lines"],
    demo: null, repo: null
  },
  {
    id: 5, emoji: "📄", color: "#06B6D4", cat: "AI & Automation",
    title: "CV Screening & Ranking", client: "Engosoft HR", year: "2025",
    tags: ["n8n", "GPT-4o-mini", "GPT-4o", "Google Sheets", "Telegram"],
    desc: "AI-powered HR pipeline: receives CVs via Telegram, analyzes individually, batch-ranks candidates, and sends accept/reject emails automatically.",
    metrics: { "AI Models": "2", "Output": "Ranked", "Notify": "Auto" },
    flow: ["Telegram CV", "GPT-4o-mini Analyze", "GPT-4o Rank", "Google Sheets", "HTML Email"],
    demo: null, repo: null
  },
  {
    id: 6, emoji: "💊", color: "#A78BFA", cat: "Conversational AI",
    title: "XQ Pharma — Doctor AI", client: "XQ Pharma", year: "2023–2024",
    tags: ["Botpress", "NLP", "WhatsApp", "Messenger", "Knowledge Base"],
    desc: "Multichannel AI agent for customer inquiries + Doctor AI assistant for pharmacy staff with drug interaction and dosage information.",
    metrics: { "Response": "↓60%", "Manual Entry": "↓80%", "Channels": "3" },
    flow: ["WA/Messenger/Web", "Botpress NLU", "Intent Route", "Doctor AI KB", "Order Process", "Sheets Sync"],
    demo: null, repo: null
  },
  {
    id: 7, emoji: "⚙️", color: "#14B8A6", cat: "RPA",
    title: "UiPath — Yeastar PBX Automation", client: "Engosoft", year: "2025",
    tags: ["UiPath", "Python", "Yeastar PBX", "Google Drive", "n8n"],
    desc: "RPA bot automates PBX UI, Python watchdog extracts recordings, uploads to Drive, and triggers the transcription pipeline.",
    metrics: { "Bot": "Yasster_Bot", "Files": ".tar/.wav", "Proxy": "Railway" },
    flow: ["UiPath Bot", "PBX UI Action", "Python Watchdog", ".tar Extract", "Drive Upload", "n8n Webhook"],
    demo: null, repo: "https://github.com/EyadSofian/yeastar-bridge"
  },
  {
    id: 8, emoji: "📱", color: "#3B82F6", cat: "Meta & CRM",
    title: "Meta + Odoo CRM Integration", client: "Multiple Clients", year: "2024–2025",
    tags: ["WhatsApp API", "Messenger", "Odoo CRM", "n8n", "Botpress"],
    desc: "Unified lead capture from WhatsApp & Messenger into Odoo CRM with UTM tracking — deployed across Egypt and Gulf markets.",
    metrics: { "Channels": "WA + FB", "CRM": "Odoo", "Markets": "EG/GCC" },
    flow: ["WA Business", "Messenger", "Botpress Bot", "n8n Process", "Odoo CRM Lead", "UTM Track"],
    demo: null, repo: null
  },
  {
    id: 9, emoji: "🌐", color: "#22D3EE", cat: "Web",
    title: "Engosoft Landing Page", client: "Engosoft", year: "2025–2026",
    tags: ["React", "Vite", "Vercel", "Web3Forms"],
    desc: "React SPA with 7-step needs assessment form, Web3Forms lead capture, and WhatsApp booking integration.",
    metrics: { "Steps": "7", "Stack": "React/Vite", "Deploy": "Vercel" },
    flow: ["Visitor Lands", "Services Browse", "7-Step Form", "Web3Forms API", "WhatsApp Notify", "Calendar Book"],
    demo: "https://engosoft-landing-page.vercel.app", repo: null
  },
  {
    id: 10, emoji: "👥", color: "#34D399", cat: "Conversational AI",
    title: "Engosoft HR Bot", client: "Engosoft", year: "2026",
    tags: ["n8n", "Telegram", "OpenAI", "Pinecone", "Odoo"],
    desc: "Telegram HR bot: employees ask policy questions → AI answers via Pinecone RAG. HR managers broadcast announcements to all or new hires via Odoo.",
    metrics: { "Status": "Live", "RAG": "Pinecone", "Broadcast": "Odoo" },
    flow: ["Telegram Msg", "Parse & Route", "OpenAI + RAG", "Pinecone KB", "Odoo Employees", "Broadcast All"],
    demo: null, repo: null
  },
  {
    id: 11, emoji: "📊", color: "#FB923C", cat: "AI & Automation",
    title: "ERP AI Chatbot — Odoo Sales", client: "Engosoft", year: "2025",
    tags: ["OpenAI", "Odoo 18", "n8n", "Sales Module"],
    desc: "AI chatbot querying Odoo sales data with natural language — automated suggestions and email-to-opportunity note sync.",
    metrics: { "AI": "OpenAI", "ERP": "Odoo 18", "Module": "Sales" },
    flow: ["User Query", "OpenAI Parse", "Odoo API Call", "Data Transform", "Response Gen", "Email Sync"],
    demo: null, repo: null
  },
  {
    id: 12, emoji: "🔗", color: "#F97316", cat: "Integration",
    title: "Chatwoot–Botpress Bridge", client: "Engosoft", year: "2025",
    tags: ["Node.js", "Express.js", "Chatwoot", "Botpress", "Coolify"],
    desc: "Custom Node.js bridge: bidirectional webhooks, HITL state tracking, context reset on agent↔bot transitions. Self-hosted on Coolify.",
    metrics: { "Endpoints": "2", "State": "Tracked", "Deploy": "Coolify" },
    flow: ["Botpress Reply", "Express Server", "State Check", "Chatwoot API", "Agent Handoff", "Context Reset"],
    demo: null, repo: "https://github.com/EyadSofian/chatwoot-botpress-bridge"
  }
];

export const CATEGORIES = ["All", "Conversational AI", "AI & Automation", "Integration", "RPA", "Meta & CRM", "Web"];

export const SKILLS = [
  ["n8n", 95], ["Botpress", 95], ["Odoo 17/18", 85], ["OpenAI / GPT-4o", 90],
  ["Gemini 2.5 Flash", 85], ["Pinecone", 80], ["Chatwoot", 85], ["UiPath (RPA)", 75],
  ["Python", 80], ["JavaScript / Node.js", 85], ["Flutter / Dart", 70], ["React", 75],
  ["Docker / Coolify", 75], ["Groq Whisper (STT)", 85], ["WhatsApp Business API", 85],
  ["Shopify API", 80], ["LLM Fine-tuning (QLoRA)", 75], ["Arabic NLP", 85],
  ["Prompt Engineering", 90], ["Hugging Face", 75], ["Make / Zapier", 70], ["Firebase", 75]
];

export const EXPERIENCE = [
  {
    role: "AI Product & Technology Specialist", co: "Engosoft Training & Consulting",
    period: "November 2025 – Present", type: "Full-time Remote", current: true,
    bullets: [
      "Engineered a 32-node call quality auditing system: Yeastar PBX → Groq Whisper Arabic STT → GPT-4o evaluation (46 criteria) → Pinecone RAG → Odoo CRM",
      "Built 'Majed' AI educational copilot with Botpress + Gemini 2.5 Flash — study plans, quizzes, scheduling, and HITL handoff",
      "Created 'Fahad' customer service bot: 3 autonomous nodes, Arabic/English detection, Chatwoot bridge for live agent handoff",
      "Designed real-time Shopify → Odoo 18 order sync with webhook dedup and barcode matching",
      "Built Telegram HR bot with OpenAI + Pinecone RAG for employee Q&A and Odoo broadcast",
      "Developed React landing page with 7-step assessment form deployed on Vercel"
    ]
  },
  {
    role: "AI Solutions Engineer", co: "XQ Pharma",
    period: "2023 – End of 2024", type: "Full-time", current: false,
    bullets: [
      "Built multichannel AI agent (WhatsApp, Messenger, Web) — reduced response time by 60%",
      "Developed 'Doctor AI' assistant for drug interactions, dosage, and product info using NLP + knowledge base",
      "Automated order processing with Google Sheets — reduced manual data entry by 80%",
      "Created internal decision support tools for inventory and customer service"
    ]
  },
  {
    role: "AI Chatbot Developer", co: "Terynova",
    period: "2025", type: "Freelance", current: false,
    bullets: [
      "E-commerce chatbot with Shopify integration: real-time product sync, shipping tracking, order management",
      "Multi-channel purchase workflows with automated customer notifications"
    ]
  },
  {
    role: "AI & Automation Developer", co: "Wonder of Women",
    period: "Dec 2023 – Feb 2024", type: "Contract", current: false,
    bullets: [
      "Beauty industry chatbot with NLP-based preference analysis",
      "Automated client onboarding and follow-up sequences across multiple channels"
    ]
  },
  {
    role: "Chatbot Developer", co: "Al-Bakry Overseas",
    period: "Sep – Nov 2023", type: "Contract", current: false,
    bullets: [
      "Tourism chatbot: dynamic preference collection + real-time pricing integration",
      "Multi-platform deployment (Messenger, WhatsApp) with CRM lead capture"
    ]
  }
];

export const CERTS = [
  { name: "Botpress Certified Partner", color: "#10B981", link: "https://botpress.com/experts/eyad-sofian" },
  { name: "DeepLearning.AI — Prompt Engineering", color: "#8B5CF6" },
  { name: "DeepLearning.AI — LLM Fine-tuning", color: "#A78BFA" },
  { name: "Hugging Face — LLM Training", color: "#F59E0B" }
];
