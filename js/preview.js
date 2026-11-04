/**
 * ResumeCraft for Students — Live Resume Renderer & Template Engine (with Photo Option & Indian Placement Standard)
 */

const resumePreview = {
  render(data) {
    const doc = document.getElementById("resumeDocument");
    if (!doc) return;

    // Apply template class and CSS variables
    const template = data.styling?.template || "modern-tech";
    doc.className = `resume-sheet template-${template}`;
    doc.style.setProperty("--accent-color", data.styling?.accentColor || "#4f46e5");
    doc.style.setProperty("--font-resume", data.styling?.fontFamily || "Inter, sans-serif");

    // Check if resume is completely blank (clean state)
    const isBlank = !data.personal?.fullName && !data.personal?.email && !data.personal?.targetRole;

    if (template === "creative-split") {
      doc.innerHTML = this.renderCreativeSplit(data, isBlank);
    } else if (template === "classic-academic") {
      doc.innerHTML = this.renderClassicAcademic(data, isBlank);
    } else if (template === "placement-standard") {
      doc.innerHTML = this.renderPlacementStandard(data, isBlank);
    } else {
      doc.innerHTML = this.renderStandardLayout(data, template, isBlank);
    }
  },

  // Standard Top-to-Bottom Layout (Modern Tech & Minimalist Clean)
  renderStandardLayout(data, template, isBlank) {
    const { personal, summary, education, projects, experience, skills, leadership, certifications, styling } = data;
    const showPhoto = styling?.showPhoto && Boolean(personal.photo);

    return `
      <!-- Header Area -->
      <header class="res-header ${showPhoto ? 'with-photo-header' : ''}">
        ${showPhoto ? `
          <div class="res-photo-wrapper">
            <img src="${personal.photo}" alt="Profile Photo" class="res-photo-img">
          </div>
        ` : ""}
        <div class="res-header-info">
          <h1 class="res-name ${!personal.fullName ? 'placeholder-text' : ''}">
            ${this.escape(personal.fullName || "Your Full Name")}
          </h1>
          <div class="res-headline ${!personal.targetRole ? 'placeholder-text' : ''}">
            ${this.escape(personal.targetRole || "Target Job / Internship Title (e.g. SDE Trainee)")}
          </div>
          
          <div class="res-contact-bar">
            ${personal.email ? `<span class="res-contact-item">📧 <a href="mailto:${personal.email}">${this.escape(personal.email)}</a></span>` : `<span class="res-contact-item placeholder-text">📧 student@college.edu</span>`}
            ${personal.phone ? `<span class="res-contact-item">📱 ${this.escape(personal.phone)}</span>` : `<span class="res-contact-item placeholder-text">📱 +91 98765 43210</span>`}
            ${personal.location ? `<span class="res-contact-item">📍 ${this.escape(personal.location)}</span>` : `<span class="res-contact-item placeholder-text">📍 City, India</span>`}
            ${personal.linkedin ? `<span class="res-contact-item">🔗 <a href="https://${this.cleanUrl(personal.linkedin)}" target="_blank">${this.cleanUrl(personal.linkedin)}</a></span>` : ""}
            ${personal.github ? `<span class="res-contact-item">💻 <a href="https://${this.cleanUrl(personal.github)}" target="_blank">${this.cleanUrl(personal.github)}</a></span>` : ""}
            ${personal.portfolio ? `<span class="res-contact-item">🌐 <a href="https://${this.cleanUrl(personal.portfolio)}" target="_blank">${this.cleanUrl(personal.portfolio)}</a></span>` : ""}
          </div>
        </div>
      </header>

      ${isBlank ? `
        <div class="blank-resume-notice">
          <span>✨ Answer the questions on the left to see your live resume update here!</span>
        </div>
      ` : ""}

      <!-- Summary / Objective -->
      ${summary && summary.trim() ? `
        <section class="res-section">
          <div class="res-section-title">Career Objective / Summary</div>
          <p style="font-size: 12.8px; line-height: 1.5; color: #334155;">${this.escape(summary)}</p>
        </section>
      ` : ""}

      <!-- Education Section (CGPA out of 10) -->
      ${education && education.length > 0 && education.some(e => e.institution) ? `
        <section class="res-section">
          <div class="res-section-title">Education & Academic Background</div>
          ${education.filter(e => e.institution).map(edu => `
            <div class="res-item">
              <div class="res-item-row">
                <span class="res-item-primary">${this.escape(edu.institution)}</span>
                <span class="res-item-location">${this.escape(edu.location || "")}</span>
              </div>
              <div class="res-item-row">
                <span class="res-item-secondary">${this.escape(edu.degree)} ${edu.gpa ? `— <strong style="color:var(--accent-color);">CGPA: ${this.escape(edu.gpa)}</strong>` : ""}</span>
                <span class="res-item-date">${this.escape(edu.startDate || "")} ${edu.startDate && edu.endDate ? "–" : ""} ${this.escape(edu.endDate || "")}</span>
              </div>
              ${edu.honors ? `<div style="font-size:12px; color:#475569; margin-top:2px;"><em>Honors / Rank:</em> ${this.escape(edu.honors)}</div>` : ""}
              ${edu.coursework ? `<div style="font-size:12px; color:#475569; margin-top:2px;"><em>Relevant Coursework:</em> ${this.escape(edu.coursework)}</div>` : ""}
            </div>
          `).join("")}
        </section>
      ` : ""}

      <!-- Technical & Soft Skills -->
      ${skills && (skills.languages || skills.tools || skills.frameworks || skills.concepts) ? `
        <section class="res-section">
          <div class="res-section-title">Technical & Professional Skills</div>
          <div class="res-skills-list">
            ${skills.languages ? `<div class="skill-row"><span class="skill-category-label">Languages: </span>${this.escape(skills.languages)}</div>` : ""}
            ${skills.frameworks ? `<div class="skill-row"><span class="skill-category-label">Frameworks & Libraries: </span>${this.escape(skills.frameworks)}</div>` : ""}
            ${skills.tools ? `<div class="skill-row"><span class="skill-category-label">Tools & Databases: </span>${this.escape(skills.tools)}</div>` : ""}
            ${skills.concepts ? `<div class="skill-row"><span class="skill-category-label">Core Concepts: </span>${this.escape(skills.concepts)}</div>` : ""}
          </div>
        </section>
      ` : ""}

      <!-- Projects Section -->
      ${projects && projects.length > 0 && projects.some(p => p.title) ? `
        <section class="res-section">
          <div class="res-section-title">Key Projects & Technical Implementations</div>
          ${projects.filter(p => p.title).map(proj => `
            <div class="res-item">
              <div class="res-item-row">
                <div>
                  <span class="res-item-primary">${this.escape(proj.title)}</span>
                  ${proj.role ? `<span style="font-size:12.5px; color:#475569; font-weight:500;"> | ${this.escape(proj.role)}</span>` : ""}
                  ${proj.technologies ? `<span style="font-size:12px; color:#64748b; font-style:italic;"> (${this.escape(proj.technologies)})</span>` : ""}
                </div>
                ${proj.link ? `<a href="https://${this.cleanUrl(proj.link)}" target="_blank" style="font-size:11.5px; color:var(--accent-color); text-decoration:none;">🔗 Live Demo / Code</a>` : ""}
              </div>
              ${proj.bullets && proj.bullets.length > 0 && proj.bullets.some(b => b.trim()) ? `
                <ul class="res-bullets">
                  ${proj.bullets.filter(b => b.trim()).map(b => `<li>${this.formatBullet(b)}</li>`).join("")}
                </ul>
              ` : ""}
            </div>
          `).join("")}
        </section>
      ` : ""}

      <!-- Work Experience & Internships -->
      ${experience && experience.length > 0 && experience.some(e => e.organization) ? `
        <section class="res-section">
          <div class="res-section-title">Internships & Work Experience</div>
          ${experience.filter(e => e.organization).map(exp => `
            <div class="res-item">
              <div class="res-item-row">
                <span class="res-item-primary">${this.escape(exp.role || "")}</span>
                <span class="res-item-date">${this.escape(exp.startDate || "")} ${exp.startDate && exp.endDate ? "–" : ""} ${this.escape(exp.endDate || "")}</span>
              </div>
              <div class="res-item-row">
                <span class="res-item-secondary">${this.escape(exp.organization)}</span>
                <span class="res-item-location">${this.escape(exp.location || "")}</span>
              </div>
              ${exp.bullets && exp.bullets.length > 0 && exp.bullets.some(b => b.trim()) ? `
                <ul class="res-bullets">
                  ${exp.bullets.filter(b => b.trim()).map(b => `<li>${this.formatBullet(b)}</li>`).join("")}
                </ul>
              ` : ""}
            </div>
          `).join("")}
        </section>
      ` : ""}

      <!-- Leadership, Clubs & Activities -->
      ${leadership && leadership.length > 0 && leadership.some(l => l.organization) ? `
        <section class="res-section">
          <div class="res-section-title">Positions of Responsibility & Clubs</div>
          ${leadership.filter(l => l.organization).map(lead => `
            <div class="res-item">
              <div class="res-item-row">
                <span class="res-item-primary">${this.escape(lead.role || "")} — ${this.escape(lead.organization)}</span>
                <span class="res-item-date">${this.escape(lead.date || "")}</span>
              </div>
              ${lead.bullets && lead.bullets.length > 0 && lead.bullets.some(b => b.trim()) ? `
                <ul class="res-bullets">
                  ${lead.bullets.filter(b => b.trim()).map(b => `<li>${this.formatBullet(b)}</li>`).join("")}
                </ul>
              ` : ""}
            </div>
          `).join("")}
        </section>
      ` : ""}

      <!-- Certifications -->
      ${certifications && certifications.length > 0 && certifications.some(c => c.name) ? `
        <section class="res-section">
          <div class="res-section-title">Certifications & Accolades</div>
          <div style="font-size:12.5px; line-height:1.6; color:#334155;">
            ${certifications.filter(c => c.name).map(cert => `
              <div>• <strong>${this.escape(cert.name)}</strong> — ${this.escape(cert.issuer || "")} ${cert.date ? `(${this.escape(cert.date)})` : ""}</div>
            `).join("")}
          </div>
        </section>
      ` : ""}
    `;
  },

  // Indian Placement Standard Template (Photo top-right, clear campus placement layout)
  renderPlacementStandard(data, isBlank) {
    const { personal, summary, education, projects, experience, skills, leadership, certifications, styling } = data;
    const showPhoto = styling?.showPhoto && Boolean(personal.photo);

    return `
      <div class="placement-header-block">
        <div class="placement-title-col">
          <h1 class="res-name ${!personal.fullName ? 'placeholder-text' : ''}">${this.escape(personal.fullName || "Your Full Name")}</h1>
          <div class="res-headline ${!personal.targetRole ? 'placeholder-text' : ''}">${this.escape(personal.targetRole || "B.Tech Student / SDE Intern")}</div>
          <div class="res-contact-bar" style="margin-top:6px;">
            ${personal.email ? `<span class="res-contact-item">📧 ${this.escape(personal.email)}</span>` : ""}
            ${personal.phone ? `<span class="res-contact-item">📱 ${this.escape(personal.phone)}</span>` : ""}
            ${personal.location ? `<span class="res-contact-item">📍 ${this.escape(personal.location)}</span>` : ""}
            ${personal.linkedin ? `<span class="res-contact-item">🔗 ${this.cleanUrl(personal.linkedin)}</span>` : ""}
            ${personal.github ? `<span class="res-contact-item">💻 ${this.cleanUrl(personal.github)}</span>` : ""}
          </div>
        </div>

        ${showPhoto ? `
          <div class="placement-photo-box">
            <img src="${personal.photo}" alt="Student Photo" class="placement-photo-img">
          </div>
        ` : ""}
      </div>

      <hr class="placement-divider">

      ${summary && summary.trim() ? `
        <section class="res-section" style="margin-top:12px;">
          <div class="res-section-title">Summary / Objective</div>
          <p style="font-size: 12.8px; line-height: 1.5; color: #334155;">${this.escape(summary)}</p>
        </section>
      ` : ""}

      ${education && education.length > 0 && education.some(e => e.institution) ? `
        <section class="res-section">
          <div class="res-section-title">Academic Qualifications</div>
          ${education.filter(e => e.institution).map(edu => `
            <div class="res-item">
              <div class="res-item-row">
                <span class="res-item-primary">${this.escape(edu.institution)}</span>
                <span class="res-item-date">${this.escape(edu.startDate || "")} ${edu.startDate && edu.endDate ? "–" : ""} ${this.escape(edu.endDate || "")}</span>
              </div>
              <div class="res-item-row">
                <span class="res-item-secondary">${this.escape(edu.degree)} ${edu.gpa ? `| <strong style="color:var(--accent-color);">CGPA: ${this.escape(edu.gpa)}</strong>` : ""}</span>
                <span class="res-item-location">${this.escape(edu.location || "")}</span>
              </div>
              ${edu.coursework ? `<div style="font-size:12px; color:#475569; margin-top:2px;">Coursework: ${this.escape(edu.coursework)}</div>` : ""}
            </div>
          `).join("")}
        </section>
      ` : ""}

      ${skills && (skills.languages || skills.tools || skills.frameworks || skills.concepts) ? `
        <section class="res-section">
          <div class="res-section-title">Technical Proficiencies</div>
          <div class="res-skills-list">
            ${skills.languages ? `<div class="skill-row"><span class="skill-category-label">Languages: </span>${this.escape(skills.languages)}</div>` : ""}
            ${skills.frameworks ? `<div class="skill-row"><span class="skill-category-label">Frameworks: </span>${this.escape(skills.frameworks)}</div>` : ""}
            ${skills.tools ? `<div class="skill-row"><span class="skill-category-label">Tools & Databases: </span>${this.escape(skills.tools)}</div>` : ""}
            ${skills.concepts ? `<div class="skill-row"><span class="skill-category-label">Core Fundamentals: </span>${this.escape(skills.concepts)}</div>` : ""}
          </div>
        </section>
      ` : ""}

      ${projects && projects.length > 0 && projects.some(p => p.title) ? `
        <section class="res-section">
          <div class="res-section-title">Projects & Practical Work</div>
          ${projects.filter(p => p.title).map(proj => `
            <div class="res-item">
              <div class="res-item-row">
                <span class="res-item-primary">${this.escape(proj.title)} ${proj.technologies ? `<span style="font-size:12px; color:#64748b; font-weight:normal;">[${this.escape(proj.technologies)}]</span>` : ""}</span>
                ${proj.link ? `<a href="https://${this.cleanUrl(proj.link)}" target="_blank" style="font-size:11.5px; color:var(--accent-color);">Link</a>` : ""}
              </div>
              ${proj.bullets ? `
                <ul class="res-bullets">
                  ${proj.bullets.filter(b => b.trim()).map(b => `<li>${this.formatBullet(b)}</li>`).join("")}
                </ul>
              ` : ""}
            </div>
          `).join("")}
        </section>
      ` : ""}

      ${experience && experience.length > 0 && experience.some(e => e.organization) ? `
        <section class="res-section">
          <div class="res-section-title">Internships & Work Experience</div>
          ${experience.filter(e => e.organization).map(exp => `
            <div class="res-item">
              <div class="res-item-row">
                <span class="res-item-primary">${this.escape(exp.role || "")} — ${this.escape(exp.organization)}</span>
                <span class="res-item-date">${this.escape(exp.startDate || "")} - ${this.escape(exp.endDate || "")}</span>
              </div>
              ${exp.bullets ? `
                <ul class="res-bullets">
                  ${exp.bullets.filter(b => b.trim()).map(b => `<li>${this.formatBullet(b)}</li>`).join("")}
                </ul>
              ` : ""}
            </div>
          `).join("")}
        </section>
      ` : ""}

      ${leadership && leadership.length > 0 && leadership.some(l => l.organization) ? `
        <section class="res-section">
          <div class="res-section-title">Extracurriculars & Leadership</div>
          ${leadership.filter(l => l.organization).map(lead => `
            <div class="res-item">
              <div class="res-item-row">
                <span class="res-item-primary">${this.escape(lead.role || "")} — ${this.escape(lead.organization)}</span>
                <span class="res-item-date">${this.escape(lead.date || "")}</span>
              </div>
              ${lead.bullets ? `
                <ul class="res-bullets">
                  ${lead.bullets.filter(b => b.trim()).map(b => `<li>${this.formatBullet(b)}</li>`).join("")}
                </ul>
              ` : ""}
            </div>
          `).join("")}
        </section>
      ` : ""}
    `;
  },

  // Ivy League / Academic Classic Layout
  renderClassicAcademic(data, isBlank) {
    return this.renderStandardLayout(data, "classic-academic", isBlank);
  },

  // Creative Split (2 Columns)
  renderCreativeSplit(data, isBlank) {
    const { personal, summary, education, projects, experience, skills, leadership, certifications, styling } = data;
    const showPhoto = styling?.showPhoto && Boolean(personal.photo);

    return `
      <aside class="split-sidebar">
        ${showPhoto ? `
          <div class="split-photo-container">
            <img src="${personal.photo}" alt="Profile Photo" class="split-photo-img">
          </div>
        ` : ""}
        <h1 class="res-name ${!personal.fullName ? 'placeholder-text' : ''}" style="font-size: 20px;">
          ${this.escape(personal.fullName || "Your Full Name")}
        </h1>
        <div class="res-headline ${!personal.targetRole ? 'placeholder-text' : ''}" style="font-size:12px; margin-bottom:14px;">
          ${this.escape(personal.targetRole || "Target Role")}
        </div>

        <!-- Contact Details -->
        <div class="res-section" style="margin-top:8px;">
          <div class="res-section-title" style="font-size:11.5px;">Contact</div>
          <div style="display:flex; flex-direction:column; gap:5px; font-size:11.2px; color:#475569;">
            ${personal.email ? `<div>📧 ${this.escape(personal.email)}</div>` : ""}
            ${personal.phone ? `<div>📱 ${this.escape(personal.phone)}</div>` : ""}
            ${personal.location ? `<div>📍 ${this.escape(personal.location)}</div>` : ""}
            ${personal.linkedin ? `<div>🔗 ${this.cleanUrl(personal.linkedin)}</div>` : ""}
            ${personal.github ? `<div>💻 ${this.cleanUrl(personal.github)}</div>` : ""}
          </div>
        </div>

        <!-- Education in Sidebar -->
        ${education && education.length > 0 && education.some(e => e.institution) ? `
          <div class="res-section">
            <div class="res-section-title" style="font-size:11.5px;">Education</div>
            ${education.filter(e => e.institution).map(edu => `
              <div style="margin-bottom:8px; font-size:11.5px;">
                <div style="font-weight:700; color:#0f172a;">${this.escape(edu.institution)}</div>
                <div style="color:#475569;">${this.escape(edu.degree)}</div>
                <div style="color:#64748b; font-size:11px;">${this.escape(edu.endDate || "")}</div>
                ${edu.gpa ? `<div style="font-weight:700; font-size:11px; color:var(--accent-color);">CGPA: ${this.escape(edu.gpa)}</div>` : ""}
              </div>
            `).join("")}
          </div>
        ` : ""}

        <!-- Skills in Sidebar -->
        ${skills && (skills.languages || skills.tools || skills.frameworks) ? `
          <div class="res-section">
            <div class="res-section-title" style="font-size:11.5px;">Skills</div>
            <div style="display:flex; flex-direction:column; gap:6px; font-size:11.2px;">
              ${skills.languages ? `<div><strong>Languages:</strong><br>${this.escape(skills.languages)}</div>` : ""}
              ${skills.frameworks ? `<div><strong>Frameworks:</strong><br>${this.escape(skills.frameworks)}</div>` : ""}
              ${skills.tools ? `<div><strong>Tools:</strong><br>${this.escape(skills.tools)}</div>` : ""}
            </div>
          </div>
        ` : ""}
      </aside>

      <div class="split-main">
        ${summary ? `
          <section class="res-section" style="margin-top:0;">
            <div class="res-section-title">Career Objective</div>
            <p style="font-size: 12.8px; line-height: 1.5; color: #334155;">${this.escape(summary)}</p>
          </section>
        ` : ""}

        <!-- Projects -->
        ${projects && projects.length > 0 && projects.some(p => p.title) ? `
          <section class="res-section">
            <div class="res-section-title">Projects</div>
            ${projects.filter(p => p.title).map(proj => `
              <div class="res-item">
                <div class="res-item-row">
                  <span class="res-item-primary">${this.escape(proj.title)}</span>
                  ${proj.link ? `<a href="https://${this.cleanUrl(proj.link)}" target="_blank" style="font-size:11.5px; color:var(--accent-color);">Link</a>` : ""}
                </div>
                ${proj.technologies ? `<div style="font-size:11.5px; color:#64748b; font-style:italic;">Tech: ${this.escape(proj.technologies)}</div>` : ""}
                ${proj.bullets ? `
                  <ul class="res-bullets">
                    ${proj.bullets.filter(b => b.trim()).map(b => `<li>${this.formatBullet(b)}</li>`).join("")}
                  </ul>
                ` : ""}
              </div>
            `).join("")}
          </section>
        ` : ""}

        <!-- Experience -->
        ${experience && experience.length > 0 && experience.some(e => e.organization) ? `
          <section class="res-section">
            <div class="res-section-title">Experience & Internships</div>
            ${experience.filter(e => e.organization).map(exp => `
              <div class="res-item">
                <div class="res-item-row">
                  <span class="res-item-primary">${this.escape(exp.role || "")}</span>
                  <span class="res-item-date">${this.escape(exp.startDate || "")} - ${this.escape(exp.endDate || "")}</span>
                </div>
                <div class="res-item-secondary">${this.escape(exp.organization)}</div>
                ${exp.bullets ? `
                  <ul class="res-bullets">
                    ${exp.bullets.filter(b => b.trim()).map(b => `<li>${this.formatBullet(b)}</li>`).join("")}
                  </ul>
                ` : ""}
              </div>
            `).join("")}
          </section>
        ` : ""}

        <!-- Leadership -->
        ${leadership && leadership.length > 0 && leadership.some(l => l.organization) ? `
          <section class="res-section">
            <div class="res-section-title">Leadership & Activities</div>
            ${leadership.filter(l => l.organization).map(lead => `
              <div class="res-item">
                <div class="res-item-row">
                  <span class="res-item-primary">${this.escape(lead.role || "")}</span>
                  <span class="res-item-date">${this.escape(lead.date || "")}</span>
                </div>
                <div class="res-item-secondary">${this.escape(lead.organization)}</div>
                ${lead.bullets ? `
                  <ul class="res-bullets">
                    ${lead.bullets.filter(b => b.trim()).map(b => `<li>${this.formatBullet(b)}</li>`).join("")}
                  </ul>
                ` : ""}
              </div>
            `).join("")}
          </section>
        ` : ""}
      </div>
    `;
  },

  formatBullet(text) {
    return this.escape(text);
  },

  cleanUrl(url) {
    if (!url) return "";
    return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  },

  escape(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
};
