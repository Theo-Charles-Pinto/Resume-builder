/**
 * ResumeCraft for Students — Company Fit & Compatibility Radar Engine (with Indian & Global Top Recruiters)
 */

const companyFitManager = {
  // Comprehensive database of top Indian campus recruiters, unicorns & global tech giants
  companies: [
    // --- Indian Product Companies & Unicorns ---
    {
      id: "flipkart",
      name: "Flipkart",
      category: "Indian Product",
      roleTypes: "SDE-1, Product, Data Engineer",
      badgeColor: "#2874F0",
      logo: "🛍️",
      description: "India's e-commerce giant. High bar for Data Structures, Algorithms, low-level design, and scalable backend services.",
      keywords: [
        "java", "python", "c++", "data structures", "algorithms", "dsa", 
        "system design", "mysql", "redis", "kafka", "scalability", "git", 
        "microservices", "spring", "docker", "fastapi"
      ],
      idealTraits: [
        "Strong problem-solving in DSA (LeetCode / Codeforces / GeeksforGeeks)",
        "Deep understanding of OOPs, DBMS, Operating Systems & Networks",
        "At least 1-2 robust full-stack or backend projects"
      ],
      customTip: "Flipkart placement rounds focus heavily on DSA and clean Object-Oriented design. Clearly explain your data structures in your project bullets."
    },
    {
      id: "zoho",
      name: "Zoho Corporation",
      category: "Indian Product",
      roleTypes: "Software Developer, QA, Web Developer",
      badgeColor: "#D32F2F",
      logo: "⚡",
      description: "Pure product engineering powerhouse. Rejects textbook buzzwords—tests pure logic, recursion, C/Java coding, and foundational problem solving.",
      keywords: [
        "java", "c", "c++", "problem solving", "algorithms", "oops", 
        "data structures", "javascript", "sql", "logic", "web development", 
        "clean code", "html", "css"
      ],
      idealTraits: [
        "Raw analytical thinking, recursion, and pattern solving",
        "Solid grasp of Java or C/C++ memory and fundamentals",
        "Practical passion for building real software from scratch"
      ],
      customTip: "Zoho values practical builders who understand basic code without relying on heavy frameworks. Highlight projects you built from scratch."
    },
    {
      id: "razorpay_cred",
      name: "Razorpay / CRED",
      category: "Indian FinTech",
      roleTypes: "SDE Intern, Frontend, Backend Trainee",
      badgeColor: "#0C2340",
      logo: "💳",
      description: "Elite Indian FinTech unicorns. Demands exceptional UI craft, React, Go/Java microservices, and high-availability payment security.",
      keywords: [
        "react", "typescript", "golang", "java", "node.js", "next.js", 
        "rest apis", "postgresql", "redis", "docker", "payments", 
        "security", "microservices", "clean ui", "tailwind"
      ],
      idealTraits: [
        "Polished, production-ready React / TypeScript frontend or Go/Java backend",
        "Understanding of API security, caching, and financial transactions",
        "High aesthetic and UX design sensibility"
      ],
      customTip: "Razorpay and CRED look for high craftsmanship. Provide clickable GitHub demo links and highlight clean UI/UX standards."
    },
    {
      id: "swiggy_zomato",
      name: "Swiggy / Zomato",
      category: "Indian Product",
      roleTypes: "Associate SDE, Full-Stack, Mobile Dev",
      badgeColor: "#FC8019",
      logo: "🛵",
      description: "Fast-moving consumer tech at massive scale. Emphasizes real-time geolocation, caching, React Native/Flutter, and sub-second response times.",
      keywords: [
        "react", "react native", "node.js", "python", "golang", "redis", 
        "mongodb", "postgresql", "websockets", "microservices", "docker", 
        "concurrency", "mobile", "rest"
      ],
      idealTraits: [
        "Experience with real-time web applications or mobile apps",
        "Familiarity with websockets, geolocation, or caching with Redis",
        "Quantified project bullets highlighting user scale and latency"
      ],
      customTip: "Mention real-time features you have built (e.g. notifications, live tracking, websockets) in your project descriptions."
    },

    // --- Top Indian Campus Recruiters & Service Giants ---
    {
      id: "tcs",
      name: "TCS (Digital & Ninja)",
      category: "Indian IT / Campus",
      roleTypes: "TCS Digital (Prime), TCS Ninja",
      badgeColor: "#1B365D",
      logo: "🏛️",
      description: "India's largest IT recruiter. The premium 'TCS Digital' and 'Prime' bands look for 8.0+ CGPA, competitive coding, Java/Python, and cloud certifications.",
      keywords: [
        "java", "python", "sql", "c++", "oops", "data structures", 
        "cloud", "aws", "azure", "machine learning", "cgpa", "git", 
        "communication", "agile", "dbms"
      ],
      idealTraits: [
        "Good academic standing (CGPA 7.5 - 8.5+ out of 10)",
        "Familiarity with core Java, Python, and SQL queries",
        "Foundations in Cloud (AWS/Azure) or AI/ML basics"
      ],
      customTip: "For the top-tier TCS Digital package (₹7-9 LPA+), highlight your high CGPA, coding contest rankings, and cloud certifications."
    },
    {
      id: "infosys",
      name: "Infosys (Specialist Programmer & DSE)",
      category: "Indian IT / Campus",
      roleTypes: "Specialist Programmer (SP), DSE, Systems Engineer",
      badgeColor: "#007CC3",
      logo: "🏢",
      description: "Hires across India through InfyTQ and HackWithInfy. High-paying Specialist Programmer (₹9.5 LPA) role tests high-level DSA and Dynamic Programming.",
      keywords: [
        "java", "python", "c++", "dynamic programming", "graphs", 
        "data structures", "algorithms", "sql", "hackwithinfy", "oops", 
        "dbms", "full-stack"
      ],
      idealTraits: [
        "Proficiency in solving complex Dynamic Programming and Graph problems",
        "Strong fundamentals in Relational Databases (DBMS) and SQL",
        "Consistent academic track record (CGPA out of 10)"
      ],
      customTip: "The InfyTQ & HackWithInfy rounds reward strong problem solvers. Emphasize your algorithmic coursework and programming contest achievements."
    },

    // --- Global Tech Giants & Big Tech ---
    {
      id: "google",
      name: "Google",
      category: "Big Tech",
      roleTypes: "Software Engineering Intern, SDE-1",
      badgeColor: "#4285F4",
      logo: "🌐",
      description: "Values algorithmic excellence, distributed systems, clean code, open-source impact, and high problem-solving velocity.",
      keywords: [
        "python", "c++", "java", "go", "algorithms", "data structures", 
        "scalability", "distributed", "system design", "linux", "git", 
        "research", "hackathon", "fastapi"
      ],
      idealTraits: [
        "Strong fundamentals in Data Structures & Big-O complexity",
        "At least 2 hands-on projects with measurable performance metrics",
        "Coursework in Algorithms, Operating Systems, or Databases"
      ],
      customTip: "Google recruiters look for engineering rigor. Highlight the 'Why' and Big-O efficiency in your project bullet points."
    },
    {
      id: "microsoft",
      name: "Microsoft",
      category: "Big Tech",
      roleTypes: "Software Intern, Cloud Engineer, PM",
      badgeColor: "#00A4EF",
      logo: "💻",
      description: "Prized for collaborative engineering, Azure cloud systems, TypeScript/C#, and student leadership or mentorship.",
      keywords: [
        "c#", "typescript", "azure", "react", "python", "cloud", 
        "collaboration", "mentorship", "full-stack", "teaching", "git", 
        "sql", "agile"
      ],
      idealTraits: [
        "Demonstrated teamwork or student club mentorship",
        "Modern cloud familiarity (Azure/AWS) or full-stack web builds",
        "Strong object-oriented programming principles"
      ],
      customTip: "Microsoft values growth mindset. Feature your student community involvement and technical leadership."
    },
    {
      id: "amazon",
      name: "Amazon & AWS",
      category: "Big Tech",
      roleTypes: "SDE Intern, Cloud Support, Systems",
      badgeColor: "#FF9900",
      logo: "📦",
      description: "Obsessed with customer impact, ownership, quantifiable metrics (%, numbers), and scalable microservices.",
      keywords: [
        "aws", "java", "python", "cloud", "microservices", "docker", 
        "sql", "apis", "ownership", "optimization", "metrics", "scale"
      ],
      idealTraits: [
        "Quantified bullets with concrete numbers (e.g. 'boosted by 35%', 'reduced latency by 200ms')",
        "Experience building or deploying backend microservices on AWS or containers",
        "Demonstrated end-to-end project ownership"
      ],
      customTip: "Amazon evaluates via Leadership Principles. Every bullet point should quantify the customer outcome or performance boost."
    },
    {
      id: "goldman",
      name: "Goldman Sachs & FinTech",
      category: "Finance & FinTech",
      roleTypes: "Quantitative Analyst, Engineering Analyst",
      badgeColor: "#0284c7",
      logo: "🏦",
      description: "Prioritizes analytical and quantitative rigor, low-latency Java/C++/Python, financial modeling, and strong academic CGPA.",
      keywords: [
        "python", "java", "c++", "sql", "financial modeling", 
        "analytics", "gpa", "cgpa", "risk", "quantitative", 
        "statistics", "data science"
      ],
      idealTraits: [
        "High academic performance (CGPA ≥ 8.5 / 10 strongly preferred)",
        "Quantitative problem solving using Python, Pandas, or SQL",
        "High precision and attention to data integrity"
      ],
      customTip: "Goldman campus hiring filters for top academic standing and mathematical rigor. Highlight your CGPA and quantitative subjects."
    }
  ],

  activeFilter: "all",

  init() {
    this.render();
  },

  // Calculate Match % based on resume text, skills, projects, CGPA out of 10
  evaluateFit(company, resume) {
    if (!resume) return { score: 0, matchedKeywords: [], missingKeywords: [], status: "Low" };

    // Aggregate all text from resume into a searchable lowercase corpus
    const fullText = [
      resume.personal?.targetRole || "",
      resume.summary || "",
      resume.skills?.languages || "",
      resume.skills?.frameworks || "",
      resume.skills?.tools || "",
      resume.skills?.concepts || "",
      (resume.education || []).map(e => `${e.degree} ${e.coursework} ${e.honors} ${e.gpa}`).join(" "),
      (resume.projects || []).map(p => `${p.title} ${p.technologies} ${(p.bullets || []).join(" ")}`).join(" "),
      (resume.experience || []).map(e => `${e.role} ${e.organization} ${(e.bullets || []).join(" ")}`).join(" "),
      (resume.leadership || []).map(l => `${l.role} ${l.organization} ${(l.bullets || []).join(" ")}`).join(" ")
    ].join(" ").toLowerCase();

    // Check keyword overlaps
    const matchedKeywords = [];
    const missingKeywords = [];

    company.keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "i");
      if (regex.test(fullText)) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    const keywordRatio = matchedKeywords.length / (company.keywords.length || 1);
    let baseScore = Math.round(keywordRatio * 55);

    // Structural Bonuses:
    // 1. Projects bonus (up to 15 pts)
    const validProjects = (resume.projects || []).filter(p => p.title?.trim()).length;
    if (validProjects >= 2) baseScore += 15;
    else if (validProjects === 1) baseScore += 8;

    // 2. Metrics in bullets bonus (up to 12 pts)
    let hasMetrics = false;
    (resume.projects || []).forEach(p => (p.bullets || []).forEach(b => {
      if (/\b\d+(\.\d+)?%?|\$\d+|\b\d+\+/i.test(b)) hasMetrics = true;
    }));
    if (hasMetrics) baseScore += 12;

    // 3. CGPA out of 10 evaluation bonus (up to 10 pts)
    const hasEdu = (resume.education || []).some(e => e.institution && e.degree);
    if (hasEdu) baseScore += 6;
    const gpaStr = resume.education && resume.education[0]?.gpa;
    if (gpaStr) {
      // Check for 8.0+ or 9.0+ CGPA out of 10 or 80%+
      if (/8\.[5-9]|9\.[0-9]|10(\.0)?|8[5-9]%|9[0-9]%/i.test(gpaStr)) {
        baseScore += 6; // High honors CGPA
      } else if (/7\.[5-9]|8\.[0-4]|7[5-9]%/i.test(gpaStr)) {
        baseScore += 4; // Good solid CGPA
      }
    }

    // 4. Role alignment bonus
    const targetRole = (resume.personal?.targetRole || "").toLowerCase();
    if (targetRole.includes("software") || targetRole.includes("engineer") || targetRole.includes("intern") || targetRole.includes("developer")) {
      baseScore += 5;
    }

    // Clamp score
    const finalScore = Math.max(30, Math.min(97, baseScore));

    let status = "Moderate Fit";
    let statusClass = "badge-mid";
    if (finalScore >= 85) {
      status = "High Match 🔥";
      statusClass = "badge-high";
    } else if (finalScore >= 70) {
      status = "Strong Contender ⚡";
      statusClass = "badge-strong";
    } else {
      status = "Needs Alignment 🎯";
      statusClass = "badge-low";
    }

    return {
      score: finalScore,
      status,
      statusClass,
      matchedKeywords: matchedKeywords.slice(0, 6),
      missingKeywords: missingKeywords.slice(0, 4)
    };
  },

  render() {
    const container = document.getElementById("companiesGrid");
    if (!container) return;

    const resume = window.app ? window.app.getResumeData() : initialResumeData;

    // Calculate fits and sort by score descending
    const fits = this.companies.map(c => {
      const evaluation = this.evaluateFit(c, resume);
      return { company: c, ...evaluation };
    });

    // Filter by active category
    const filtered = this.activeFilter === "all" 
      ? fits 
      : fits.filter(f => f.company.category.toLowerCase().includes(this.activeFilter.toLowerCase()));

    // Sort descending by score
    filtered.sort((a, b) => b.score - a.score);

    // Update Top Match preview in ATS bar
    const topMatch = fits.slice().sort((a, b) => b.score - a.score)[0];
    const topFitBadge = document.getElementById("topCompanyFitBadge");
    if (topFitBadge && topMatch) {
      topFitBadge.innerHTML = `🏢 Top Fit: <strong>${topMatch.company.name} (${topMatch.score}%)</strong>`;
    }

    container.innerHTML = filtered.map(item => `
      <div class="company-card">
        <div class="company-card-header">
          <div class="company-logo-group">
            <span class="company-logo" style="background: ${item.company.badgeColor}15; color: ${item.company.badgeColor};">
              ${item.company.logo}
            </span>
            <div>
              <h3 class="company-name">${item.company.name}</h3>
              <span class="company-category">${item.company.category} • ${item.company.roleTypes}</span>
            </div>
          </div>
          
          <div class="company-score-pill ${item.statusClass}">
            <span class="score-pct">${item.score}%</span>
            <span class="score-tag">${item.status}</span>
          </div>
        </div>

        <p class="company-desc">${item.company.description}</p>

        <!-- Match Progress Bar -->
        <div class="company-meter">
          <div class="company-meter-fill" style="width: ${item.score}%; background: ${item.company.badgeColor};"></div>
        </div>

        <!-- Matched Strengths -->
        <div class="company-tags-section">
          <span class="tags-label">Your Matched Strengths:</span>
          <div class="tags-list">
            ${item.matchedKeywords.length > 0 
              ? item.matchedKeywords.map(k => `<span class="tag-pill match">✓ ${k}</span>`).join("")
              : `<span class="text-muted text-xs">Start filling your skills & projects on the left</span>`
            }
          </div>
        </div>

        <!-- Missing / Target keywords -->
        ${item.missingKeywords.length > 0 ? `
          <div class="company-tags-section">
            <span class="tags-label">Keywords to Add for +15% Boost:</span>
            <div class="tags-list">
              ${item.missingKeywords.map(k => `<span class="tag-pill missing">+ ${k}</span>`).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Custom Recruiter Advice -->
        <div class="company-tip-box">
          <span class="tip-sparkle">💡</span>
          <span class="tip-text"><strong>Placement Tip:</strong> ${item.company.customTip}</span>
        </div>
      </div>
    `).join("");
  },

  setFilter(category) {
    this.activeFilter = category;
    
    // Update filter buttons UI
    document.querySelectorAll(".company-filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-filter") === category);
    });

    this.render();
  }
};
