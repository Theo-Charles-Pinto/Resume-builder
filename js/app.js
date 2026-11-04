/**
 * ResumeCraft for Students — Application Bootstrap & Event Conductor
 */

class App {
  constructor() {
    this.resumeData = null;
    this.currentMode = "wizard"; // 'wizard' | 'companies' | 'editor'
    this.zoomLevel = 1.0;
    this.isAutoFitMode = true;
  }

  init() {
    // 1. Load from localStorage or start with clean blank resume (NO prefill as requested)
    let saved = exportManager.loadFromLocalStorage();
    if (saved && saved.personal?.fullName === "Alex Rivera") {
      // Clear previously prefilled mock data so user gets a fresh start
      saved = null;
      try { localStorage.removeItem(exportManager.storageKey); } catch (e) {}
    }
    this.resumeData = saved ? saved : JSON.parse(JSON.stringify(initialResumeData));

    // Ensure styling object exists
    if (!this.resumeData.styling) {
      this.resumeData.styling = {
        template: "modern-tech",
        accentColor: "#4f46e5",
        fontFamily: "Inter, sans-serif",
        showPhoto: false,
        zoom: 1
      };
    }

    // 2. Initialize Sub-modules
    exportManager.init();
    wizardManager.init();
    editorManager.init();
    companyFitManager.init();
    resumePreview.render(this.resumeData);
    atsChecker.updateUI(this.resumeData);

    // 3. Bind UI event listeners
    this.bindHeaderEvents();
    this.bindToolbarEvents();
    this.bindModals();
    this.initActionVerbsModal();

    // 4. Initial Screen Fit & Window Resize Observer
    setTimeout(() => {
      this.autoFitZoom();
    }, 150);

    window.addEventListener("resize", () => {
      if (this.isAutoFitMode) {
        this.autoFitZoom();
      }
    });
  }

  getResumeData() {
    return this.resumeData;
  }

  updateResumeData(newData, reRenderWizard = false) {
    this.resumeData = newData;
    exportManager.saveToLocalStorage(this.resumeData);
    resumePreview.render(this.resumeData);
    atsChecker.updateUI(this.resumeData);
    companyFitManager.render();

    if (reRenderWizard && this.currentMode === "wizard") {
      wizardManager.renderCurrentQuestion();
    }
  }

  loadCustomData(profileData) {
    this.resumeData = JSON.parse(JSON.stringify(profileData));
    exportManager.saveToLocalStorage(this.resumeData);

    // Sync template selector and color swatches
    this.syncToolbarControls();

    wizardManager.jumpToStep(1);
    editorManager.renderSections();
    companyFitManager.render();
    resumePreview.render(this.resumeData);
    atsChecker.updateUI(this.resumeData);
  }

  /* ================= Fluid Auto-Fit Sizing System ================= */

  autoFitZoom() {
    const viewport = document.getElementById("previewViewport");
    const paperWrapper = document.getElementById("paperWrapper");
    const zoomLevelText = document.getElementById("zoomLevelText");
    if (!viewport || !paperWrapper) return;

    // Available viewport margins
    const padX = 36;
    const padY = 36;
    const availW = Math.max(300, viewport.clientWidth - padX);
    const availH = Math.max(400, viewport.clientHeight - padY);

    // Standard A4 paper pixel dimensions
    const paperW = 794;
    const paperH = 1123;

    // Compute ideal scale to fit viewport neatly
    let fitScale = Math.min(availW / paperW, availH / paperH);

    // If screen height is tight on laptops, fit width with smooth vertical scroll
    if (fitScale < 0.62) {
      fitScale = Math.min(availW / paperW, 0.95);
    }

    fitScale = Math.max(0.48, Math.min(fitScale, 1.0));
    this.zoomLevel = fitScale;
    this.isAutoFitMode = true;

    paperWrapper.style.transform = `scale(${fitScale})`;
    if (zoomLevelText) {
      zoomLevelText.textContent = `${Math.round(fitScale * 100)}%`;
    }
  }

  setManualZoom(level) {
    this.isAutoFitMode = false;
    this.zoomLevel = Math.max(0.45, Math.min(1.4, level));

    const paperWrapper = document.getElementById("paperWrapper");
    const zoomLevelText = document.getElementById("zoomLevelText");

    if (paperWrapper) {
      paperWrapper.style.transform = `scale(${this.zoomLevel})`;
    }
    if (zoomLevelText) {
      zoomLevelText.textContent = `${Math.round(this.zoomLevel * 100)}%`;
    }
  }

  /* ================= Mode Switching ================= */

  bindHeaderEvents() {
    const modeWizardBtn = document.getElementById("modeWizardBtn");
    const modeCompaniesBtn = document.getElementById("modeCompaniesBtn");
    const modeEditorBtn = document.getElementById("modeEditorBtn");
    
    const wizContainer = document.getElementById("wizardContainer");
    const compContainer = document.getElementById("companiesContainer");
    const editContainer = document.getElementById("editorContainer");

    const switchMode = (mode) => {
      this.currentMode = mode;

      [modeWizardBtn, modeCompaniesBtn, modeEditorBtn].forEach(btn => {
        if (btn) {
          btn.classList.remove("active");
          btn.setAttribute("aria-selected", "false");
        }
      });

      if (wizContainer) wizContainer.style.display = "none";
      if (compContainer) compContainer.style.display = "none";
      if (editContainer) editContainer.style.display = "none";

      if (mode === "wizard") {
        if (modeWizardBtn) {
          modeWizardBtn.classList.add("active");
          modeWizardBtn.setAttribute("aria-selected", "true");
        }
        if (wizContainer) wizContainer.style.display = "flex";
        wizardManager.renderCurrentQuestion();
      } else if (mode === "companies") {
        if (modeCompaniesBtn) {
          modeCompaniesBtn.classList.add("active");
          modeCompaniesBtn.setAttribute("aria-selected", "true");
        }
        if (compContainer) compContainer.style.display = "flex";
        companyFitManager.render();
      } else if (mode === "editor") {
        if (modeEditorBtn) {
          modeEditorBtn.classList.add("active");
          modeEditorBtn.setAttribute("aria-selected", "true");
        }
        if (editContainer) editContainer.style.display = "flex";
        editorManager.renderSections();
      }
    };

    if (modeWizardBtn) modeWizardBtn.addEventListener("click", () => switchMode("wizard"));
    if (modeCompaniesBtn) modeCompaniesBtn.addEventListener("click", () => switchMode("companies"));
    if (modeEditorBtn) modeEditorBtn.addEventListener("click", () => switchMode("editor"));

    // ATS Top Company Fit Pill click jumps to Company Match tab
    const topFitBadge = document.getElementById("topCompanyFitBadge");
    if (topFitBadge) {
      topFitBadge.addEventListener("click", () => {
        switchMode("companies");
      });
    }

    // Sample Profile Dropdown Toggle
    const sampleBtn = document.getElementById("sampleBtn");
    const sampleMenu = document.getElementById("sampleMenu");

    if (sampleBtn && sampleMenu) {
      sampleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sampleBtn.parentElement.classList.toggle("open");
      });

      document.addEventListener("click", () => {
        sampleBtn.parentElement.classList.remove("open");
      });

      sampleMenu.querySelectorAll("a[data-sample]").forEach(item => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          const sampleKey = item.getAttribute("data-sample");
          if (sampleProfiles[sampleKey]) {
            this.loadCustomData(sampleProfiles[sampleKey]);
            this.showToast(`✨ Loaded ${item.textContent.trim()} profile!`, "success");
          }
          sampleBtn.parentElement.classList.remove("open");
        });
      });
    }

    // ATS Checklist Modal Trigger
    const viewAtsTipsBtn = document.getElementById("viewAtsTipsBtn");
    if (viewAtsTipsBtn) {
      viewAtsTipsBtn.addEventListener("click", () => {
        this.openModal("atsAuditModal");
      });
    }
  }

  /* ================= Preview Toolbar Controls ================= */

  bindToolbarEvents() {
    const templateSelect = document.getElementById("templateSelect");
    const fontSelect = document.getElementById("fontSelect");
    const colorSwatches = document.getElementById("colorSwatches");
    const zoomInBtn = document.getElementById("zoomInBtn");
    const zoomOutBtn = document.getElementById("zoomOutBtn");
    const zoomFitBtn = document.getElementById("zoomFitBtn");

    // Template Changer
    if (templateSelect) {
      templateSelect.value = this.resumeData.styling?.template || "modern-tech";
      templateSelect.addEventListener("change", (e) => {
        this.resumeData.styling.template = e.target.value;
        this.updateResumeData(this.resumeData);
      });
    }

    // Photo Option Toggle in Toolbar
    const toolbarPhotoToggle = document.getElementById("toolbarPhotoToggle");
    if (toolbarPhotoToggle) {
      toolbarPhotoToggle.checked = Boolean(this.resumeData.styling?.showPhoto);
      toolbarPhotoToggle.addEventListener("change", (e) => {
        this.resumeData.styling.showPhoto = e.target.checked;
        this.updateResumeData(this.resumeData);
        if (e.target.checked && !this.resumeData.personal.photo) {
          this.showToast("📷 Photo enabled! Click 'Question 2 (Contact & Photo)' to upload your photo.", "info");
        } else {
          this.showToast(e.target.checked ? "📷 Photo shown on resume" : "📄 Clean text ATS mode (Photo hidden)", "info");
        }
      });
    }

    // Font Changer
    if (fontSelect) {
      fontSelect.value = this.resumeData.styling?.fontFamily || "Inter, sans-serif";
      fontSelect.addEventListener("change", (e) => {
        this.resumeData.styling.fontFamily = e.target.value;
        this.updateResumeData(this.resumeData);
      });
    }

    // Color Swatches
    if (colorSwatches) {
      colorSwatches.querySelectorAll(".color-swatch").forEach(swatch => {
        swatch.addEventListener("click", () => {
          colorSwatches.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("active"));
          swatch.classList.add("active");
          const color = swatch.getAttribute("data-color");
          this.resumeData.styling.accentColor = color;
          this.updateResumeData(this.resumeData);
        });
      });
    }

    // Zoom Controls
    if (zoomInBtn) {
      zoomInBtn.addEventListener("click", () => this.setManualZoom(this.zoomLevel + 0.1));
    }
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener("click", () => this.setManualZoom(this.zoomLevel - 0.1));
    }
    if (zoomFitBtn) {
      zoomFitBtn.addEventListener("click", () => {
        this.autoFitZoom();
        this.showToast("⚡ Resume auto-fitted to your display size!", "info");
      });
    }
  }

  syncToolbarControls() {
    const templateSelect = document.getElementById("templateSelect");
    const fontSelect = document.getElementById("fontSelect");
    const colorSwatches = document.getElementById("colorSwatches");

    if (templateSelect && this.resumeData.styling?.template) {
      templateSelect.value = this.resumeData.styling.template;
    }
    const toolbarPhotoToggle = document.getElementById("toolbarPhotoToggle");
    if (toolbarPhotoToggle) {
      toolbarPhotoToggle.checked = Boolean(this.resumeData.styling?.showPhoto);
    }
    if (fontSelect && this.resumeData.styling?.fontFamily) {
      fontSelect.value = this.resumeData.styling.fontFamily;
    }
    if (colorSwatches && this.resumeData.styling?.accentColor) {
      colorSwatches.querySelectorAll(".color-swatch").forEach(s => {
        if (s.getAttribute("data-color") === this.resumeData.styling.accentColor) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
    }
  }

  /* ================= Action Verbs & Modals ================= */

  initActionVerbsModal() {
    const container = document.getElementById("verbsContainer");
    if (!container) return;

    let html = "";
    for (const [category, verbs] of Object.entries(studentActionVerbs)) {
      html += `
        <div class="verb-category">
          <div class="verb-category-title">${category}</div>
          <div class="verb-list">
            ${verbs.map(v => `<button type="button" class="verb-pill" onclick="app.copyVerb('${v}')">${v}</button>`).join("")}
          </div>
        </div>
      `;
    }
    container.innerHTML = html;

    const openBtn = document.getElementById("openActionVerbsBtn");
    if (openBtn) {
      openBtn.addEventListener("click", () => this.openModal("actionVerbsModal"));
    }
  }

  copyVerb(verb) {
    navigator.clipboard?.writeText(verb);
    this.showToast(`📋 Copied "${verb}" to clipboard!`, "info");
  }

  bindModals() {
    document.querySelectorAll("[data-close]").forEach(btn => {
      btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-close");
        this.closeModal(modalId);
      });
    });

    // Close on backdrop click
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          backdrop.style.display = "none";
        }
      });
    });
  }

  openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.style.display = "flex";
  }

  closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.style.display = "none";
  }

  /* ================= Toast Notification System ================= */

  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

// Global bootstrap on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
  window.wizardManager = wizardManager;
  window.editorManager = editorManager;
  window.exportManager = exportManager;
  window.resumePreview = resumePreview;
  window.atsChecker = atsChecker;
  window.companyFitManager = companyFitManager;
  window.app.init();
});
