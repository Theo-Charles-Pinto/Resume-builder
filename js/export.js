/**
 * ResumeCraft for Students — PDF Generation, JSON Import/Export & Local Storage Persistence
 */

const exportManager = {
  storageKey: "resumecraft_student_resume_v1",

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const downloadPdfBtn = document.getElementById("downloadPdfBtn");
    const printBtn = document.getElementById("printBtn");
    const exportJsonBtn = document.getElementById("exportJsonBtn");
    const importJsonBtn = document.getElementById("importJsonBtn");
    const jsonFileInput = document.getElementById("jsonFileInput");

    if (downloadPdfBtn) {
      downloadPdfBtn.addEventListener("click", () => this.downloadPDF());
    }

    if (printBtn) {
      printBtn.addEventListener("click", () => this.printResume());
    }

    if (exportJsonBtn) {
      exportJsonBtn.addEventListener("click", () => this.exportJSON());
    }

    if (importJsonBtn && jsonFileInput) {
      importJsonBtn.addEventListener("click", () => jsonFileInput.click());
      jsonFileInput.addEventListener("change", (e) => this.handleFileImport(e));
    }
  },

  // High-Precision PDF Download via Print Engine
  downloadPDF() {
    const data = window.app.getResumeData();
    const studentName = data.personal?.fullName?.trim() || "Student";
    const cleanFileName = `${studentName.replace(/[^a-zA-Z0-9_-]/g, "_")}_Resume`;

    // Save previous document title
    const originalTitle = document.title;
    document.title = cleanFileName;

    window.app.showToast("📄 Preparing PDF print dialog... Select 'Save as PDF'", "info");

    // Small delay to allow any pending DOM updates to finish
    setTimeout(() => {
      window.print();
      document.title = originalTitle;
    }, 250);
  },

  printResume() {
    window.print();
  },

  // Export full resume data as a readable .json file
  exportJSON() {
    const data = window.app.getResumeData();
    const studentName = data.personal?.fullName?.trim() || "Student";
    const filename = `${studentName.replace(/[^a-zA-Z0-9_-]/g, "_")}_Resume_Backup.json`;

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    window.app.showToast("💾 Resume saved as JSON successfully!", "success");
  },

  // Import existing resume .json file
  handleFileImport(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.personal) {
          window.app.loadCustomData(parsed);
          window.app.showToast("📂 Resume loaded successfully!", "success");
        } else {
          window.app.showToast("⚠️ Invalid resume JSON format.", "error");
        }
      } catch (err) {
        window.app.showToast("⚠️ Error parsing JSON file.", "error");
      }
    };
    reader.readAsText(file);
    event.target.value = ""; // Reset file input
  },

  // LocalStorage Auto-Save
  saveToLocalStorage(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      const pill = document.getElementById("autoSaveStatus");
      if (pill) {
        pill.classList.add("saving");
        pill.textContent = "✓ Auto-saved";
        setTimeout(() => pill.classList.remove("saving"), 600);
      }
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  },

  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
    return null;
  }
};
