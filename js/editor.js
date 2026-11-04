/**
 * ResumeCraft for Students — Full Form Section Editor (Mode 2)
 */

const editorManager = {
  init() {
    this.renderSections();
  },

  renderSections() {
    const container = document.getElementById("editorSectionsAccordion");
    if (!container) return;

    const data = window.app.getResumeData();

    container.innerHTML = `
      <!-- 1. Contact & Personal Info -->
      <div class="accordion-item open">
        <div class="accordion-header" onclick="editorManager.toggleAccordion(this)">
          <div class="accordion-title-wrap">
            <span>👤</span>
            <span>Contact & Target Role</span>
          </div>
          <span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input ed-field" data-path="personal.fullName" value="${this.escape(data.personal.fullName)}">
            </div>
            <div class="form-group">
              <label class="form-label">Target Role / Headline</label>
              <input type="text" class="form-input ed-field" data-path="personal.targetRole" value="${this.escape(data.personal.targetRole)}">
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input ed-field" data-path="personal.email" value="${this.escape(data.personal.email)}">
            </div>
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input type="text" class="form-input ed-field" data-path="personal.phone" value="${this.escape(data.personal.phone)}">
            </div>
            <div class="form-group">
              <label class="form-label">Location</label>
              <input type="text" class="form-input ed-field" data-path="personal.location" value="${this.escape(data.personal.location)}">
            </div>
            <div class="form-group">
              <label class="form-label">LinkedIn URL</label>
              <input type="text" class="form-input ed-field" data-path="personal.linkedin" value="${this.escape(data.personal.linkedin)}">
            </div>
            <div class="form-group">
              <label class="form-label">GitHub URL</label>
              <input type="text" class="form-input ed-field" data-path="personal.github" value="${this.escape(data.personal.github)}">
            </div>
            <div class="form-group">
              <label class="form-label">Portfolio URL</label>
              <input type="text" class="form-input ed-field" data-path="personal.portfolio" value="${this.escape(data.personal.portfolio)}">
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Summary -->
      <div class="accordion-item">
        <div class="accordion-header" onclick="editorManager.toggleAccordion(this)">
          <div class="accordion-title-wrap">
            <span>📝</span>
            <span>Professional Summary</span>
          </div>
          <span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body">
          <div class="form-group">
            <textarea class="form-textarea ed-field" data-path="summary" rows="3">${this.escape(data.summary)}</textarea>
          </div>
        </div>
      </div>

      <!-- 3. Education -->
      <div class="accordion-item">
        <div class="accordion-header" onclick="editorManager.toggleAccordion(this)">
          <div class="accordion-title-wrap">
            <span>🎓</span>
            <span>Education (${(data.education || []).length})</span>
          </div>
          <span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body">
          <div class="item-repeater-list">
            ${(data.education || []).map((edu, idx) => `
              <div class="repeater-card">
                <div class="repeater-header">
                  <span class="repeater-title">${edu.institution || "School #" + (idx + 1)}</span>
                  <button type="button" class="delete-item-btn" onclick="editorManager.removeEduItem(${idx})">🗑️</button>
                </div>
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">Institution</label>
                    <input type="text" class="form-input ed-edu" data-idx="${idx}" data-field="institution" value="${this.escape(edu.institution)}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Degree & Major</label>
                    <input type="text" class="form-input ed-edu" data-idx="${idx}" data-field="degree" value="${this.escape(edu.degree)}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Graduation Date</label>
                    <input type="text" class="form-input ed-edu" data-idx="${idx}" data-field="endDate" value="${this.escape(edu.endDate)}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">CGPA (out of 10) / %</label>
                    <input type="text" class="form-input ed-edu" data-idx="${idx}" data-field="gpa" value="${this.escape(edu.gpa)}" placeholder="e.g. 8.75 / 10">
                  </div>
                  <div class="form-group full-width">
                    <label class="form-label">Relevant Coursework</label>
                    <input type="text" class="form-input ed-edu" data-idx="${idx}" data-field="coursework" value="${this.escape(edu.coursework)}">
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
          <button type="button" class="add-item-btn" style="margin-top: 0.75rem;" onclick="editorManager.addEduItem()">+ Add Education Entry</button>
        </div>
      </div>

      <!-- 4. Projects -->
      <div class="accordion-item">
        <div class="accordion-header" onclick="editorManager.toggleAccordion(this)">
          <div class="accordion-title-wrap">
            <span>🚀</span>
            <span>Projects (${(data.projects || []).length})</span>
          </div>
          <span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body">
          <div class="item-repeater-list">
            ${(data.projects || []).map((proj, pIdx) => `
              <div class="repeater-card">
                <div class="repeater-header">
                  <span class="repeater-title">${proj.title || "Project #" + (pIdx + 1)}</span>
                  <button type="button" class="delete-item-btn" onclick="editorManager.removeProjItem(${pIdx})">🗑️</button>
                </div>
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">Project Title</label>
                    <input type="text" class="form-input ed-proj" data-pidx="${pIdx}" data-field="title" value="${this.escape(proj.title)}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Role</label>
                    <input type="text" class="form-input ed-proj" data-pidx="${pIdx}" data-field="role" value="${this.escape(proj.role)}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Tech Stack</label>
                    <input type="text" class="form-input ed-proj" data-pidx="${pIdx}" data-field="technologies" value="${this.escape(proj.technologies)}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Link</label>
                    <input type="text" class="form-input ed-proj" data-pidx="${pIdx}" data-field="link" value="${this.escape(proj.link)}">
                  </div>
                  <div class="form-group full-width">
                    <label class="form-label">Bullet Points</label>
                    <div style="display:flex; flex-direction:column; gap:4px;">
                      ${(proj.bullets || [""]).map((b, bIdx) => `
                        <div style="display:flex; gap:6px;">
                          <input type="text" class="form-input ed-proj-bullet" data-pidx="${pIdx}" data-bidx="${bIdx}" value="${this.escape(b)}">
                          <button type="button" class="btn-icon" onclick="editorManager.removeProjBullet(${pIdx}, ${bIdx})">✕</button>
                        </div>
                      `).join("")}
                    </div>
                    <button type="button" class="btn-link" style="margin-top:4px;" onclick="editorManager.addProjBullet(${pIdx})">+ Add bullet</button>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
          <button type="button" class="add-item-btn" style="margin-top: 0.75rem;" onclick="editorManager.addProjItem()">+ Add Project</button>
        </div>
      </div>

      <!-- 5. Experience -->
      <div class="accordion-item">
        <div class="accordion-header" onclick="editorManager.toggleAccordion(this)">
          <div class="accordion-title-wrap">
            <span>💼</span>
            <span>Experience (${(data.experience || []).length})</span>
          </div>
          <span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body">
          <div class="item-repeater-list">
            ${(data.experience || []).map((exp, eIdx) => `
              <div class="repeater-card">
                <div class="repeater-header">
                  <span class="repeater-title">${exp.role || "Experience #" + (eIdx + 1)}</span>
                  <button type="button" class="delete-item-btn" onclick="editorManager.removeExpItem(${eIdx})">🗑️</button>
                </div>
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">Company / Organization</label>
                    <input type="text" class="form-input ed-exp" data-eidx="${eIdx}" data-field="organization" value="${this.escape(exp.organization)}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Role</label>
                    <input type="text" class="form-input ed-exp" data-eidx="${eIdx}" data-field="role" value="${this.escape(exp.role)}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Start Date</label>
                    <input type="text" class="form-input ed-exp" data-eidx="${eIdx}" data-field="startDate" value="${this.escape(exp.startDate)}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">End Date</label>
                    <input type="text" class="form-input ed-exp" data-eidx="${eIdx}" data-field="endDate" value="${this.escape(exp.endDate)}">
                  </div>
                  <div class="form-group full-width">
                    <label class="form-label">Bullet Points</label>
                    <div style="display:flex; flex-direction:column; gap:4px;">
                      ${(exp.bullets || [""]).map((b, bIdx) => `
                        <div style="display:flex; gap:6px;">
                          <input type="text" class="form-input ed-exp-bullet" data-eidx="${eIdx}" data-bidx="${bIdx}" value="${this.escape(b)}">
                          <button type="button" class="btn-icon" onclick="editorManager.removeExpBullet(${eIdx}, ${bIdx})">✕</button>
                        </div>
                      `).join("")}
                    </div>
                    <button type="button" class="btn-link" style="margin-top:4px;" onclick="editorManager.addExpBullet(${eIdx})">+ Add bullet</button>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
          <button type="button" class="add-item-btn" style="margin-top: 0.75rem;" onclick="editorManager.addExpItem()">+ Add Experience</button>
        </div>
      </div>

      <!-- 6. Skills -->
      <div class="accordion-item">
        <div class="accordion-header" onclick="editorManager.toggleAccordion(this)">
          <div class="accordion-title-wrap">
            <span>🛠️</span>
            <span>Skills & Proficiencies</span>
          </div>
          <span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body">
          <div class="form-grid form-grid-1">
            <div class="form-group">
              <label class="form-label">Languages</label>
              <input type="text" class="form-input ed-field" data-path="skills.languages" value="${this.escape(data.skills.languages)}">
            </div>
            <div class="form-group">
              <label class="form-label">Frameworks</label>
              <input type="text" class="form-input ed-field" data-path="skills.frameworks" value="${this.escape(data.skills.frameworks)}">
            </div>
            <div class="form-group">
              <label class="form-label">Tools & Databases</label>
              <input type="text" class="form-input ed-field" data-path="skills.tools" value="${this.escape(data.skills.tools)}">
            </div>
            <div class="form-group">
              <label class="form-label">Concepts</label>
              <input type="text" class="form-input ed-field" data-path="skills.concepts" value="${this.escape(data.skills.concepts)}">
            </div>
          </div>
        </div>
      </div>

      <!-- 7. Leadership & Clubs -->
      <div class="accordion-item">
        <div class="accordion-header" onclick="editorManager.toggleAccordion(this)">
          <div class="accordion-title-wrap">
            <span>🏆</span>
            <span>Leadership & Extracurriculars (${(data.leadership || []).length})</span>
          </div>
          <span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body">
          <div class="item-repeater-list">
            ${(data.leadership || []).map((lead, lIdx) => `
              <div class="repeater-card">
                <div class="repeater-header">
                  <span class="repeater-title">${lead.organization || "Club #" + (lIdx + 1)}</span>
                  <button type="button" class="delete-item-btn" onclick="editorManager.removeLeadItem(${lIdx})">🗑️</button>
                </div>
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">Organization</label>
                    <input type="text" class="form-input ed-lead" data-lidx="${lIdx}" data-field="organization" value="${this.escape(lead.organization)}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Role</label>
                    <input type="text" class="form-input ed-lead" data-lidx="${lIdx}" data-field="role" value="${this.escape(lead.role)}">
                  </div>
                  <div class="form-group full-width">
                    <label class="form-label">Date</label>
                    <input type="text" class="form-input ed-lead" data-lidx="${lIdx}" data-field="date" value="${this.escape(lead.date)}">
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
          <button type="button" class="add-item-btn" style="margin-top: 0.75rem;" onclick="editorManager.addLeadItem()">+ Add Club / Activity</button>
        </div>
      </div>
    `;

    this.bindEditorInputs(container);
  },

  toggleAccordion(headerEl) {
    const item = headerEl.closest(".accordion-item");
    if (item) {
      item.classList.toggle("open");
    }
  },

  bindEditorInputs(container) {
    const data = window.app.getResumeData();

    container.querySelectorAll("input, textarea").forEach(input => {
      input.addEventListener("input", (e) => {
        const val = e.target.value;

        // Direct path
        const path = e.target.getAttribute("data-path");
        if (path) {
          const parts = path.split(".");
          if (parts.length === 1) data[parts[0]] = val;
          if (parts.length === 2) data[parts[0]][parts[1]] = val;
        }

        // Education
        if (e.target.classList.contains("ed-edu")) {
          const idx = parseInt(e.target.getAttribute("data-idx"), 10);
          const field = e.target.getAttribute("data-field");
          if (data.education[idx]) data.education[idx][field] = val;
        }

        // Project
        if (e.target.classList.contains("ed-proj")) {
          const pidx = parseInt(e.target.getAttribute("data-pidx"), 10);
          const field = e.target.getAttribute("data-field");
          if (data.projects[pidx]) data.projects[pidx][field] = val;
        }
        if (e.target.classList.contains("ed-proj-bullet")) {
          const pidx = parseInt(e.target.getAttribute("data-pidx"), 10);
          const bidx = parseInt(e.target.getAttribute("data-bidx"), 10);
          if (data.projects[pidx]?.bullets) data.projects[pidx].bullets[bidx] = val;
        }

        // Experience
        if (e.target.classList.contains("ed-exp")) {
          const eidx = parseInt(e.target.getAttribute("data-eidx"), 10);
          const field = e.target.getAttribute("data-field");
          if (data.experience[eidx]) data.experience[eidx][field] = val;
        }
        if (e.target.classList.contains("ed-exp-bullet")) {
          const eidx = parseInt(e.target.getAttribute("data-eidx"), 10);
          const bidx = parseInt(e.target.getAttribute("data-bidx"), 10);
          if (data.experience[eidx]?.bullets) data.experience[eidx].bullets[bidx] = val;
        }

        // Leadership
        if (e.target.classList.contains("ed-lead")) {
          const lidx = parseInt(e.target.getAttribute("data-lidx"), 10);
          const field = e.target.getAttribute("data-field");
          if (data.leadership[lidx]) data.leadership[lidx][field] = val;
        }

        window.app.updateResumeData(data, false);
      });
    });
  },

  addEduItem() {
    wizardManager.addEducation();
    this.renderSections();
  },

  removeEduItem(idx) {
    wizardManager.removeEducation(idx);
    this.renderSections();
  },

  addProjItem() {
    wizardManager.addProject();
    this.renderSections();
  },

  removeProjItem(idx) {
    wizardManager.removeProject(idx);
    this.renderSections();
  },

  addProjBullet(pIdx) {
    wizardManager.addProjBullet(pIdx);
    this.renderSections();
  },

  removeProjBullet(pIdx, bIdx) {
    wizardManager.removeProjBullet(pIdx, bIdx);
    this.renderSections();
  },

  addExpItem() {
    wizardManager.addExperience();
    this.renderSections();
  },

  removeExpItem(idx) {
    wizardManager.removeExperience(idx);
    this.renderSections();
  },

  addExpBullet(eIdx) {
    wizardManager.addExpBullet(eIdx);
    this.renderSections();
  },

  removeExpBullet(eIdx, bIdx) {
    wizardManager.removeExpBullet(eIdx, bIdx);
    this.renderSections();
  },

  addLeadItem() {
    wizardManager.addLeadership();
    this.renderSections();
  },

  removeLeadItem(idx) {
    wizardManager.removeLeadership(idx);
    this.renderSections();
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
