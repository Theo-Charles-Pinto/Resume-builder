/**
 * ResumeCraft for Students — Guided Question Wizard Manager
 */

const wizardManager = {
  currentStepIndex: 0,

  init() {
    this.renderStepPills();
    this.renderCurrentQuestion();
    this.bindEvents();
  },

  bindEvents() {
    const prevBtn = document.getElementById("wizPrevBtn");
    const nextBtn = document.getElementById("wizNextBtn");
    const skipBtn = document.getElementById("wizSkipBtn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.prevStep());
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.nextStep());
    }

    if (skipBtn) {
      skipBtn.addEventListener("click", () => this.nextStep());
    }
  },

  renderStepPills() {
    const pillsContainer = document.getElementById("stepPills");
    if (!pillsContainer) return;

    pillsContainer.innerHTML = wizardSteps.map((step, idx) => `
      <button class="step-pill ${idx === this.currentStepIndex ? 'active' : ''} ${idx < this.currentStepIndex ? 'completed' : ''}" 
              data-step-idx="${idx}" 
              title="${step.title}">
        <div class="step-pill-circle">${idx < this.currentStepIndex ? '✓' : step.stepNum}</div>
        <div class="step-pill-label">${step.stepLabel}</div>
      </button>
    `).join("");

    pillsContainer.querySelectorAll(".step-pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        const idx = parseInt(pill.getAttribute("data-step-idx"), 10);
        this.jumpToStep(idx + 1);
      });
    });

    // Update track progress fill
    const trackFill = document.getElementById("stepProgressFill");
    if (trackFill) {
      const pct = (this.currentStepIndex / (wizardSteps.length - 1)) * 100;
      trackFill.style.width = `${pct}%`;
    }
  },

  jumpToStep(stepNumber) {
    const targetIdx = Math.max(0, Math.min(stepNumber - 1, wizardSteps.length - 1));
    this.currentStepIndex = targetIdx;
    this.renderStepPills();
    this.renderCurrentQuestion();
  },

  prevStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.renderStepPills();
      this.renderCurrentQuestion();
    }
  },

  nextStep() {
    if (this.currentStepIndex < wizardSteps.length - 1) {
      this.currentStepIndex++;
      this.renderStepPills();
      this.renderCurrentQuestion();
    } else {
      // Completed last step! Trigger toast and prompt download
      window.app && window.app.showToast("🎉 All resume steps completed! Preview and download your PDF now.", "success");
    }
  },

  renderCurrentQuestion() {
    const wrapper = document.getElementById("wizardCardWrapper");
    if (!wrapper) return;

    const step = wizardSteps[this.currentStepIndex];
    const data = window.app ? window.app.getResumeData() : initialResumeData;

    // Update Step Counters
    const stepNumEl = document.getElementById("wizStepNum");
    const totalStepsEl = document.getElementById("wizTotalSteps");
    const prevBtn = document.getElementById("wizPrevBtn");
    const nextBtn = document.getElementById("wizNextBtn");

    if (stepNumEl) stepNumEl.textContent = step.stepNum;
    if (totalStepsEl) totalStepsEl.textContent = wizardSteps.length;
    if (prevBtn) prevBtn.disabled = this.currentStepIndex === 0;
    if (nextBtn) {
      nextBtn.innerHTML = this.currentStepIndex === wizardSteps.length - 1 
        ? `Finish & Review <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>` 
        : `Next Step <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
    }

    let formHtml = "";
    switch (step.type) {
      case "target":
        formHtml = this.renderTargetForm(data);
        break;
      case "contact":
        formHtml = this.renderContactForm(data);
        break;
      case "education":
        formHtml = this.renderEducationForm(data);
        break;
      case "projects":
        formHtml = this.renderProjectsForm(data);
        break;
      case "experience":
        formHtml = this.renderExperienceForm(data);
        break;
      case "skills":
        formHtml = this.renderSkillsForm(data);
        break;
      case "leadership":
        formHtml = this.renderLeadershipForm(data);
        break;
      case "summary":
        formHtml = this.renderSummaryForm(data);
        break;
      default:
        formHtml = `<p>Step content</p>`;
    }

    wrapper.innerHTML = `
      <div class="wizard-card">
        <div class="question-header">
          <span class="question-step-tag">Question ${step.stepNum} of ${wizardSteps.length}</span>
          <h2 class="question-title">${step.title}</h2>
          <p class="question-subtitle">${step.subtitle}</p>
        </div>

        <div class="student-tip-box">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            <strong>Student Pro-Tip:</strong> ${step.tip}
          </div>
        </div>

        <div class="question-body">
          ${formHtml}
        </div>
      </div>
    `;

    this.attachFieldListeners(wrapper);
  },

  /* ================= Question Form Renderers ================= */

  renderTargetForm(data) {
    const current = data.personal.targetRole || "";
    const suggestions = [
      "Software Engineering Intern",
      "Product Management Intern",
      "Data Analyst Intern",
      "Financial Analyst Intern",
      "Digital Marketing Intern",
      "UI/UX Design Intern",
      "Research Assistant"
    ];

    return `
      <div class="form-grid form-grid-1">
        <div class="form-group">
          <label class="form-label">
            Target Job Title / Headline
            <span class="field-hint">e.g. "Software Engineering Intern" or "Marketing Analyst"</span>
          </label>
          <input type="text" class="form-input" id="wiz_targetRole" value="${this.escape(current)}" placeholder="Enter your target role...">
          
          <div style="margin-top: 0.65rem;">
            <span style="font-size: 0.78rem; font-weight: 600; color: var(--text-muted);">Quick Suggestions:</span>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
              ${suggestions.map(s => `
                <button type="button" class="verb-chip" onclick="wizardManager.setTargetRole('${s}')">${s}</button>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  setTargetRole(val) {
    const input = document.getElementById("wiz_targetRole");
    if (input) {
      input.value = val;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  },

  renderContactForm(data) {
    const p = data.personal;
    const showPhoto = data.styling?.showPhoto;

    return `
      <!-- Photo Option Box -->
      <div class="photo-option-card">
        <div class="photo-option-header">
          <div>
            <span class="photo-option-title">📷 Resume Profile Photo Option</span>
            <p class="field-hint">Include or omit formal photo anytime (ATS text vs. Campus placement standard)</p>
          </div>
          <label class="modern-toggle">
            <input type="checkbox" id="wiz_showPhotoToggle" ${showPhoto ? 'checked' : ''}>
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div id="photoUploadRow" style="${showPhoto ? 'display:flex;' : 'display:none;'}; align-items:center; gap:12px; margin-top:10px;">
          <div class="photo-preview-avatar" id="photoPreviewThumb">
            ${p.photo ? `<img src="${p.photo}" alt="Headshot" class="avatar-img">` : `<span>👤</span>`}
          </div>
          <div style="flex:1;">
            <input type="file" id="wizPhotoFileInput" accept="image/*" class="form-input" style="padding: 4px 8px; font-size: 0.8rem;">
            <span class="field-hint">Upload clean headshot (.jpg, .png, max 3MB)</span>
          </div>
          ${p.photo ? `<button type="button" class="btn btn-sm btn-ghost" style="color:var(--danger);" onclick="wizardManager.removePhoto()">Remove</button>` : ''}
        </div>
      </div>

      <div class="form-grid" style="margin-top: 1rem;">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-input" id="wiz_fullName" value="${this.escape(p.fullName)}" placeholder="e.g. Rahul Sharma">
        </div>

        <div class="form-group">
          <label class="form-label">Email Address <span class="field-hint">(College or personal email)</span></label>
          <input type="email" class="form-input" id="wiz_email" value="${this.escape(p.email)}" placeholder="e.g. rahul.sharma@college.edu">
        </div>

        <div class="form-group">
          <label class="form-label">Phone Number</label>
          <input type="text" class="form-input" id="wiz_phone" value="${this.escape(p.phone)}" placeholder="e.g. +91 98765 43210">
        </div>

        <div class="form-group">
          <label class="form-label">Current City & State <span class="field-hint">(e.g. Bengaluru, India)</span></label>
          <input type="text" class="form-input" id="wiz_location" value="${this.escape(p.location)}" placeholder="e.g. Bengaluru, Karnataka (Open to Relocation)">
        </div>

        <div class="form-group">
          <label class="form-label">LinkedIn Profile URL</label>
          <input type="text" class="form-input" id="wiz_linkedin" value="${this.escape(p.linkedin)}" placeholder="linkedin.com/in/yourname">
        </div>

        <div class="form-group">
          <label class="form-label">GitHub URL <span class="optional">(Optional)</span></label>
          <input type="text" class="form-input" id="wiz_github" value="${this.escape(p.github)}" placeholder="github.com/username">
        </div>

        <div class="form-group full-width">
          <label class="form-label">Portfolio / Linktree <span class="optional">(Optional)</span></label>
          <input type="text" class="form-input" id="wiz_portfolio" value="${this.escape(p.portfolio)}" placeholder="yourportfolio.dev">
        </div>
      </div>
    `;
  },

  removePhoto() {
    const data = window.app.getResumeData();
    data.personal.photo = "";
    data.styling.showPhoto = false;
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
    window.app.showToast("📷 Photo removed from resume.", "info");
  },

  renderEducationForm(data) {
    const list = data.education || [];
    return `
      <div class="item-repeater-list" id="wizEduList">
        ${list.map((edu, idx) => `
          <div class="repeater-card" data-idx="${idx}">
            <div class="repeater-header">
              <span class="repeater-title"><span class="item-index-badge">${idx + 1}</span> College & Degree</span>
              ${list.length > 1 ? `<button type="button" class="delete-item-btn" onclick="wizardManager.removeEducation(${idx})">🗑️ Remove</button>` : ""}
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">College / University / School</label>
                <input type="text" class="form-input wiz-edu-field" data-idx="${idx}" data-field="institution" value="${this.escape(edu.institution)}" placeholder="e.g. National Institute of Technology (NIT)">
              </div>
              <div class="form-group">
                <label class="form-label">Degree & Branch</label>
                <input type="text" class="form-input wiz-edu-field" data-idx="${idx}" data-field="degree" value="${this.escape(edu.degree)}" placeholder="e.g. B.Tech in Computer Science & Engineering">
              </div>
              <div class="form-group">
                <label class="form-label">Start Year</label>
                <input type="text" class="form-input wiz-edu-field" data-idx="${idx}" data-field="startDate" value="${this.escape(edu.startDate)}" placeholder="e.g. Aug 2023">
              </div>
              <div class="form-group">
                <label class="form-label">Graduation Year <span class="field-hint">(Expected)</span></label>
                <input type="text" class="form-input wiz-edu-field" data-idx="${idx}" data-field="endDate" value="${this.escape(edu.endDate)}" placeholder="e.g. May 2027">
              </div>
              <div class="form-group">
                <label class="form-label">CGPA (out of 10) / % <span class="optional">(e.g. 8.5 / 10)</span></label>
                <input type="text" class="form-input wiz-edu-field" data-idx="${idx}" data-field="gpa" value="${this.escape(edu.gpa)}" placeholder="e.g. 8.85 / 10 CGPA">
              </div>
              <div class="form-group">
                <label class="form-label">Honors & Rank <span class="optional">(Top 5%, Scholar)</span></label>
                <input type="text" class="form-input wiz-edu-field" data-idx="${idx}" data-field="honors" value="${this.escape(edu.honors)}" placeholder="e.g. Department Rank 3, Merit Scholar">
              </div>
              <div class="form-group full-width">
                <label class="form-label">Relevant Coursework <span class="field-hint">(Core subjects)</span></label>
                <input type="text" class="form-input wiz-edu-field" data-idx="${idx}" data-field="coursework" value="${this.escape(edu.coursework)}" placeholder="e.g. Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks">
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      <button type="button" class="add-item-btn" style="margin-top: 1rem;" onclick="wizardManager.addEducation()">
        + Add Another Degree / School (e.g. Class 12 / High School)
      </button>
    `;
  },

  addEducation() {
    const data = window.app.getResumeData();
    data.education = data.education || [];
    data.education.push({
      id: "edu_" + Date.now(),
      institution: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      honors: "",
      coursework: ""
    });
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
  },

  removeEducation(idx) {
    const data = window.app.getResumeData();
    data.education.splice(idx, 1);
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
  },

  renderProjectsForm(data) {
    const list = data.projects || [];
    return `
      <div class="item-repeater-list" id="wizProjectsList">
        ${list.map((proj, pIdx) => `
          <div class="repeater-card" data-idx="${pIdx}">
            <div class="repeater-header">
              <span class="repeater-title"><span class="item-index-badge">${pIdx + 1}</span> ${proj.title ? this.escape(proj.title) : "New Project"}</span>
              <button type="button" class="delete-item-btn" onclick="wizardManager.removeProject(${pIdx})">🗑️ Remove</button>
            </div>
            
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Project Title</label>
                <input type="text" class="form-input wiz-proj-field" data-pidx="${pIdx}" data-field="title" value="${this.escape(proj.title)}" placeholder="e.g. Campus Food Sharing Web App">
              </div>
              <div class="form-group">
                <label class="form-label">Your Role <span class="optional">(Lead, Full-Stack, Solo)</span></label>
                <input type="text" class="form-input wiz-proj-field" data-pidx="${pIdx}" data-field="role" value="${this.escape(proj.role)}" placeholder="e.g. Solo Developer or Team Lead">
              </div>
              <div class="form-group">
                <label class="form-label">Technologies Used <span class="field-hint">(Comma separated)</span></label>
                <input type="text" class="form-input wiz-proj-field" data-pidx="${pIdx}" data-field="technologies" value="${this.escape(proj.technologies)}" placeholder="e.g. React, Node.js, PostgreSQL, Tailwind">
              </div>
              <div class="form-group">
                <label class="form-label">Project Link / Repo / Demo <span class="optional">(Optional)</span></label>
                <input type="text" class="form-input wiz-proj-field" data-pidx="${pIdx}" data-field="link" value="${this.escape(proj.link)}" placeholder="e.g. github.com/username/project">
              </div>

              <!-- Bullet Points for this Project -->
              <div class="form-group full-width">
                <label class="form-label">
                  What did you build and what was the impact?
                  <span class="field-hint">Aim for 2-3 bullets with numbers/metrics</span>
                </label>

                <!-- Bullet Smart Formula Helper -->
                <div class="bullet-smart-helper">
                  <div class="bullet-helper-title">
                    <span>⚡ Quick Formula:</span>
                    <span class="bullet-formula-badge">[Strong Action Verb]</span> + <span>[What you built / Tool]</span> + <span>[Measurable Result / Impact]</span>
                  </div>
                  <div class="quick-verbs-row">
                    <span style="font-size:0.75rem; color:var(--text-muted); margin-right:4px;">Starter verbs:</span>
                    <button type="button" class="verb-chip" onclick="wizardManager.insertVerb(${pIdx}, 'Architected')">Architected</button>
                    <button type="button" class="verb-chip" onclick="wizardManager.insertVerb(${pIdx}, 'Engineered')">Engineered</button>
                    <button type="button" class="verb-chip" onclick="wizardManager.insertVerb(${pIdx}, 'Designed')">Designed</button>
                    <button type="button" class="verb-chip" onclick="wizardManager.insertVerb(${pIdx}, 'Automated')">Automated</button>
                    <button type="button" class="verb-chip" onclick="wizardManager.insertVerb(${pIdx}, 'Implemented')">Implemented</button>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px;" id="projBulletsContainer_${pIdx}">
                  ${(proj.bullets || [""]).map((b, bIdx) => `
                    <div style="display: flex; gap: 6px; align-items: center;">
                      <input type="text" class="form-input wiz-proj-bullet" 
                             data-pidx="${pIdx}" data-bidx="${bIdx}" 
                             value="${this.escape(b)}" 
                             placeholder="e.g. Built automated REST APIs processing 500+ requests with 99.9% uptime.">
                      <button type="button" class="btn-icon" title="Remove bullet" onclick="wizardManager.removeProjBullet(${pIdx}, ${bIdx})">✕</button>
                    </div>
                  `).join("")}
                </div>

                <button type="button" class="btn-link" style="margin-top: 6px;" onclick="wizardManager.addProjBullet(${pIdx})">
                  + Add another bullet point
                </button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      <button type="button" class="add-item-btn" style="margin-top: 1rem;" onclick="wizardManager.addProject()">
        + Add Another Project (Hackathon, Class Project, Personal App)
      </button>
    `;
  },

  addProject() {
    const data = window.app.getResumeData();
    data.projects = data.projects || [];
    data.projects.push({
      id: "proj_" + Date.now(),
      title: "",
      role: "",
      technologies: "",
      link: "",
      bullets: [""]
    });
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
  },

  removeProject(idx) {
    const data = window.app.getResumeData();
    data.projects.splice(idx, 1);
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
  },

  addProjBullet(pIdx) {
    const data = window.app.getResumeData();
    data.projects[pIdx].bullets = data.projects[pIdx].bullets || [];
    data.projects[pIdx].bullets.push("");
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
  },

  removeProjBullet(pIdx, bIdx) {
    const data = window.app.getResumeData();
    data.projects[pIdx].bullets.splice(bIdx, 1);
    if (data.projects[pIdx].bullets.length === 0) data.projects[pIdx].bullets.push("");
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
  },

  insertVerb(pIdx, verb) {
    const container = document.getElementById(`projBulletsContainer_${pIdx}`);
    if (container) {
      const firstInput = container.querySelector(".wiz-proj-bullet");
      if (firstInput) {
        if (!firstInput.value.trim()) {
          firstInput.value = `${verb} `;
        } else {
          firstInput.value = `${verb} ${firstInput.value}`;
        }
        firstInput.focus();
        firstInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  },

  renderExperienceForm(data) {
    const list = data.experience || [];
    return `
      <div class="item-repeater-list" id="wizExpList">
        ${list.length === 0 ? `
          <div style="background: #ffffff; border: 1px dashed #cbd5e1; border-radius: var(--radius-md); padding: 1.5rem; text-align: center;">
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
              No formal work experience yet? <strong>That is completely fine for students!</strong>
            </p>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
              Campus jobs, Teaching Assistant roles, tutoring, or lab work count here. If you don't have any, just skip this step!
            </p>
            <button type="button" class="btn btn-secondary btn-sm" onclick="wizardManager.addExperience()">+ Add Campus Job / Internship</button>
          </div>
        ` : ""}

        ${list.map((exp, eIdx) => `
          <div class="repeater-card" data-idx="${eIdx}">
            <div class="repeater-header">
              <span class="repeater-title"><span class="item-index-badge">${eIdx + 1}</span> ${exp.role ? this.escape(exp.role) : "New Role"}</span>
              <button type="button" class="delete-item-btn" onclick="wizardManager.removeExperience(${eIdx})">🗑️ Remove</button>
            </div>
            
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Company / Department / Organization</label>
                <input type="text" class="form-input wiz-exp-field" data-eidx="${eIdx}" data-field="organization" value="${this.escape(exp.organization)}" placeholder="e.g. University CS Department or Startup XYZ">
              </div>
              <div class="form-group">
                <label class="form-label">Job Title / Role</label>
                <input type="text" class="form-input wiz-exp-field" data-eidx="${eIdx}" data-field="role" value="${this.escape(exp.role)}" placeholder="e.g. Undergraduate Teaching Assistant">
              </div>
              <div class="form-group">
                <label class="form-label">Location</label>
                <input type="text" class="form-input wiz-exp-field" data-eidx="${eIdx}" data-field="location" value="${this.escape(exp.location)}" placeholder="e.g. Austin, TX or Remote">
              </div>
              <div class="form-group">
                <label class="form-label">Dates Employed</label>
                <div style="display: flex; gap: 6px;">
                  <input type="text" class="form-input wiz-exp-field" data-eidx="${eIdx}" data-field="startDate" value="${this.escape(exp.startDate)}" placeholder="e.g. Jan 2025">
                  <input type="text" class="form-input wiz-exp-field" data-eidx="${eIdx}" data-field="endDate" value="${this.escape(exp.endDate)}" placeholder="e.g. Present">
                </div>
              </div>

              <!-- Bullet Points for this Experience -->
              <div class="form-group full-width">
                <label class="form-label">Key Responsibilities & Quantified Achievements</label>
                <div style="display: flex; flex-direction: column; gap: 6px;" id="expBulletsContainer_${eIdx}">
                  ${(exp.bullets || [""]).map((b, bIdx) => `
                    <div style="display: flex; gap: 6px; align-items: center;">
                      <input type="text" class="form-input wiz-exp-bullet" 
                             data-eidx="${eIdx}" data-bidx="${bIdx}" 
                             value="${this.escape(b)}" 
                             placeholder="e.g. Mentored 40+ students weekly, improving average test scores by 12%.">
                      <button type="button" class="btn-icon" title="Remove bullet" onclick="wizardManager.removeExpBullet(${eIdx}, ${bIdx})">✕</button>
                    </div>
                  `).join("")}
                </div>

                <button type="button" class="btn-link" style="margin-top: 6px;" onclick="wizardManager.addExpBullet(${eIdx})">
                  + Add another bullet point
                </button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      ${list.length > 0 ? `
        <button type="button" class="add-item-btn" style="margin-top: 1rem;" onclick="wizardManager.addExperience()">
          + Add Another Experience
        </button>
      ` : ""}
    `;
  },

  addExperience() {
    const data = window.app.getResumeData();
    data.experience = data.experience || [];
    data.experience.push({
      id: "exp_" + Date.now(),
      organization: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "Present",
      bullets: [""]
    });
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
  },

  removeExperience(idx) {
    const data = window.app.getResumeData();
    data.experience.splice(idx, 1);
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
  },

  addExpBullet(eIdx) {
    const data = window.app.getResumeData();
    data.experience[eIdx].bullets = data.experience[eIdx].bullets || [];
    data.experience[eIdx].bullets.push("");
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
  },

  removeExpBullet(eIdx, bIdx) {
    const data = window.app.getResumeData();
    data.experience[eIdx].bullets.splice(bIdx, 1);
    if (data.experience[eIdx].bullets.length === 0) data.experience[eIdx].bullets.push("");
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
  },

  renderSkillsForm(data) {
    const s = data.skills || {};
    return `
      <div class="form-grid form-grid-1">
        <div class="form-group">
          <label class="form-label">
            Programming & Spoken Languages
            <span class="field-hint">Comma separated</span>
          </label>
          <input type="text" class="form-input" id="wiz_skills_languages" value="${this.escape(s.languages || "")}" placeholder="e.g. Python, Java, JavaScript, TypeScript, SQL, C++">
        </div>

        <div class="form-group">
          <label class="form-label">
            Frameworks & Libraries
            <span class="field-hint">Comma separated</span>
          </label>
          <input type="text" class="form-input" id="wiz_skills_frameworks" value="${this.escape(s.frameworks || "")}" placeholder="e.g. React, Node.js, Express, Next.js, Pandas, TailwindCSS">
        </div>

        <div class="form-group">
          <label class="form-label">
            Tools, Platforms & Databases
            <span class="field-hint">Comma separated</span>
          </label>
          <input type="text" class="form-input" id="wiz_skills_tools" value="${this.escape(s.tools || "")}" placeholder="e.g. Git, GitHub, Docker, Postman, PostgreSQL, Figma, VS Code">
        </div>

        <div class="form-group">
          <label class="form-label">
            Core Concepts & Methodologies
            <span class="field-hint">Comma separated</span>
          </label>
          <input type="text" class="form-input" id="wiz_skills_concepts" value="${this.escape(s.concepts || "")}" placeholder="e.g. Data Structures & Algorithms, REST APIs, Agile/Scrum, CI/CD">
        </div>
      </div>
    `;
  },

  renderLeadershipForm(data) {
    const list = data.leadership || [];
    return `
      <div class="item-repeater-list" id="wizLeadList">
        ${list.map((lead, lIdx) => `
          <div class="repeater-card" data-idx="${lIdx}">
            <div class="repeater-header">
              <span class="repeater-title"><span class="item-index-badge">${lIdx + 1}</span> ${lead.organization ? this.escape(lead.organization) : "Club / Activity"}</span>
              <button type="button" class="delete-item-btn" onclick="wizardManager.removeLeadership(${lIdx})">🗑️ Remove</button>
            </div>
            
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Club / Student Organization / Event</label>
                <input type="text" class="form-input wiz-lead-field" data-lidx="${lIdx}" data-field="organization" value="${this.escape(lead.organization)}" placeholder="e.g. ACM Student Chapter or Robotics Club">
              </div>
              <div class="form-group">
                <label class="form-label">Your Role / Title</label>
                <input type="text" class="form-input wiz-lead-field" data-lidx="${lIdx}" data-field="role" value="${this.escape(lead.role)}" placeholder="e.g. Workshop Director or VP of Finance">
              </div>
              <div class="form-group full-width">
                <label class="form-label">Dates / Academic Year</label>
                <input type="text" class="form-input wiz-lead-field" data-lidx="${lIdx}" data-field="date" value="${this.escape(lead.date)}" placeholder="e.g. Aug 2024 - Present">
              </div>

              <!-- Bullets -->
              <div class="form-group full-width">
                <label class="form-label">Key Initiatives & Impact</label>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  ${(lead.bullets || [""]).map((b, bIdx) => `
                    <div style="display: flex; gap: 6px; align-items: center;">
                      <input type="text" class="form-input wiz-lead-bullet" 
                             data-lidx="${lIdx}" data-bidx="${bIdx}" 
                             value="${this.escape(b)}" 
                             placeholder="e.g. Organized 4 technical workshops attended by 120+ students.">
                      <button type="button" class="btn-icon" title="Remove bullet" onclick="wizardManager.removeLeadBullet(${lIdx}, ${bIdx})">✕</button>
                    </div>
                  `).join("")}
                </div>

                <button type="button" class="btn-link" style="margin-top: 6px;" onclick="wizardManager.addLeadBullet(${lIdx})">
                  + Add another bullet point
                </button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      <button type="button" class="add-item-btn" style="margin-top: 1rem;" onclick="wizardManager.addLeadership()">
        + Add Student Club, Volunteer Work, or Leadership
      </button>
    `;
  },

  addLeadership() {
    const data = window.app.getResumeData();
    data.leadership = data.leadership || [];
    data.leadership.push({
      id: "lead_" + Date.now(),
      organization: "",
      role: "",
      date: "",
      bullets: [""]
    });
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
  },

  removeLeadership(idx) {
    const data = window.app.getResumeData();
    data.leadership.splice(idx, 1);
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
  },

  addLeadBullet(lIdx) {
    const data = window.app.getResumeData();
    data.leadership[lIdx].bullets = data.leadership[lIdx].bullets || [];
    data.leadership[lIdx].bullets.push("");
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
  },

  removeLeadBullet(lIdx, bIdx) {
    const data = window.app.getResumeData();
    data.leadership[lIdx].bullets.splice(bIdx, 1);
    if (data.leadership[lIdx].bullets.length === 0) data.leadership[lIdx].bullets.push("");
    window.app.updateResumeData(data);
    this.renderCurrentQuestion();
  },

  renderSummaryForm(data) {
    const current = data.summary || "";
    return `
      <div class="form-grid form-grid-1">
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <label class="form-label">Professional Summary / Objective</label>
            <button type="button" class="btn btn-secondary btn-sm" onclick="wizardManager.autoGenerateSummary()">
              ✨ Auto-Generate Pitch
            </button>
          </div>
          <textarea class="form-textarea" id="wiz_summary" rows="4" placeholder="Write a 2-3 sentence elevator pitch highlighting your degree, strengths, and what internship you seek...">${this.escape(current)}</textarea>
          <div class="field-hint" id="summaryCharCount">Tip: Keep between 150 - 280 characters to preserve 1-page fit.</div>
        </div>

        <div style="background: var(--bg-subtle); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-top: 0.5rem;">
          <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--text-primary);">
            Ready to Download?
          </h4>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
            Check your ATS score widget at the top left. If you're happy with the preview on the right, click the button below to download your print-ready PDF!
          </p>
          <button type="button" class="btn btn-primary btn-sm" onclick="window.exportManager && window.exportManager.downloadPDF()">
            📥 Download My Resume PDF
          </button>
        </div>
      </div>
    `;
  },

  autoGenerateSummary() {
    const data = window.app.getResumeData();
    const role = data.personal?.targetRole || "Software Engineering Intern";
    const edu = data.education && data.education[0];
    const degree = edu?.degree || "Computer Science student";
    const inst = edu?.institution || "University";

    const generated = `Ambitious ${degree} at ${inst} passionate about building scalable, user-centric solutions. Possesses strong foundations in modern frameworks, collaborative problem-solving, and clean code. Seeking a competitive ${role} to deliver tangible value.`;

    const textarea = document.getElementById("wiz_summary");
    if (textarea) {
      textarea.value = generated;
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      window.app.showToast("✨ Generated tailored student summary!", "info");
    }
  },

  /* ================= Live Input Event Delegation ================= */

  attachFieldListeners(container) {
    const data = window.app.getResumeData();

    // Photo Toggle Listener
    const photoToggle = container.querySelector("#wiz_showPhotoToggle");
    if (photoToggle) {
      photoToggle.addEventListener("change", (e) => {
        data.styling.showPhoto = e.target.checked;
        const uploadRow = document.getElementById("photoUploadRow");
        if (uploadRow) {
          uploadRow.style.display = e.target.checked ? "flex" : "none";
        }
        window.app.updateResumeData(data, false);
      });
    }

    // Photo File Input Listener
    const photoInput = container.querySelector("#wizPhotoFileInput");
    if (photoInput) {
      photoInput.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          if (file.size > 3 * 1024 * 1024) {
            window.app.showToast("⚠️ Image size exceeds 3MB. Please choose a smaller photo.", "warn");
            return;
          }
          const reader = new FileReader();
          reader.onload = (ev) => {
            data.personal.photo = ev.target.result;
            data.styling.showPhoto = true;
            window.app.updateResumeData(data, true);
            window.app.showToast("📷 Photo attached to resume!", "success");
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Direct input listeners with auto-save & preview sync
    container.querySelectorAll("input, textarea, select").forEach(el => {
      el.addEventListener("input", (e) => {
        const id = e.target.id;
        const val = e.target.value;

        // Personal Contact Fields
        if (id === "wiz_fullName") data.personal.fullName = val;
        if (id === "wiz_targetRole") data.personal.targetRole = val;
        if (id === "wiz_email") data.personal.email = val;
        if (id === "wiz_phone") data.personal.phone = val;
        if (id === "wiz_location") data.personal.location = val;
        if (id === "wiz_linkedin") data.personal.linkedin = val;
        if (id === "wiz_github") data.personal.github = val;
        if (id === "wiz_portfolio") data.personal.portfolio = val;
        if (id === "wiz_summary") data.summary = val;

        // Skills fields
        if (id === "wiz_skills_languages") data.skills.languages = val;
        if (id === "wiz_skills_frameworks") data.skills.frameworks = val;
        if (id === "wiz_skills_tools") data.skills.tools = val;
        if (id === "wiz_skills_concepts") data.skills.concepts = val;

        // Education fields
        if (e.target.classList.contains("wiz-edu-field")) {
          const idx = parseInt(e.target.getAttribute("data-idx"), 10);
          const field = e.target.getAttribute("data-field");
          if (data.education[idx]) data.education[idx][field] = val;
        }

        // Project fields
        if (e.target.classList.contains("wiz-proj-field")) {
          const pidx = parseInt(e.target.getAttribute("data-pidx"), 10);
          const field = e.target.getAttribute("data-field");
          if (data.projects[pidx]) data.projects[pidx][field] = val;
        }
        if (e.target.classList.contains("wiz-proj-bullet")) {
          const pidx = parseInt(e.target.getAttribute("data-pidx"), 10);
          const bidx = parseInt(e.target.getAttribute("data-bidx"), 10);
          if (data.projects[pidx]?.bullets) data.projects[pidx].bullets[bidx] = val;
        }

        // Experience fields
        if (e.target.classList.contains("wiz-exp-field")) {
          const eidx = parseInt(e.target.getAttribute("data-eidx"), 10);
          const field = e.target.getAttribute("data-field");
          if (data.experience[eidx]) data.experience[eidx][field] = val;
        }
        if (e.target.classList.contains("wiz-exp-bullet")) {
          const eidx = parseInt(e.target.getAttribute("data-eidx"), 10);
          const bidx = parseInt(e.target.getAttribute("data-bidx"), 10);
          if (data.experience[eidx]?.bullets) data.experience[eidx].bullets[bidx] = val;
        }

        // Leadership fields
        if (e.target.classList.contains("wiz-lead-field")) {
          const lidx = parseInt(e.target.getAttribute("data-lidx"), 10);
          const field = e.target.getAttribute("data-field");
          if (data.leadership[lidx]) data.leadership[lidx][field] = val;
        }
        if (e.target.classList.contains("wiz-lead-bullet")) {
          const lidx = parseInt(e.target.getAttribute("data-lidx"), 10);
          const bidx = parseInt(e.target.getAttribute("data-bidx"), 10);
          if (data.leadership[lidx]?.bullets) data.leadership[lidx].bullets[bidx] = val;
        }

        // Sync with app state
        window.app.updateResumeData(data, false); // false = do not re-render current question to keep focus
      });
    });
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
