/**
 * ResumeCraft for Students — ATS Strength Meter & Smart Audit System
 */

const atsChecker = {
  // Comprehensive list of strong action verbs to check against
  strongActionVerbs: [
    "architected", "built", "coded", "configured", "deployed", "designed", "engineered", 
    "implemented", "integrated", "modeled", "programmed", "refactored", "automated",
    "spearheaded", "coordinated", "directed", "founded", "guided", "organized", 
    "mentored", "chaired", "facilitated", "empowered", "pioneered", "mobilized",
    "analyzed", "benchmarked", "calculated", "discovered", "evaluated", "examined", 
    "formulated", "investigated", "surveyed", "synthesized", "validated", "quantified",
    "accelerated", "boosted", "decreased", "enhanced", "expanded", "maximized", 
    "minimized", "optimized", "revamped", "streamlined", "strengthened", "upgraded",
    "authored", "collaborated", "demonstrated", "negotiated", "presented", "published", 
    "partnered", "trained", "instructed", "documented", "liaised", "pitched", "created",
    "conducted", "led", "developed", "managed", "resolved", "executed"
  ],

  evaluate(resume) {
    let score = 0;
    const maxScore = 100;
    const checklist = [];
    const recommendations = [];

    // 1. Personal & Contact Info (Total 20 pts)
    const hasName = Boolean(resume.personal?.fullName?.trim());
    const hasEmail = Boolean(resume.personal?.email?.trim() && resume.personal.email.includes("@"));
    const hasPhone = Boolean(resume.personal?.phone?.trim());
    const hasTargetRole = Boolean(resume.personal?.targetRole?.trim());
    const hasLinks = Boolean(resume.personal?.linkedin?.trim() || resume.personal?.github?.trim() || resume.personal?.portfolio?.trim());

    if (hasName && hasEmail && hasPhone) {
      score += 10;
      checklist.push({ title: "Core Contact Details", passed: true, note: "Name, email, and phone number are present." });
    } else {
      checklist.push({ title: "Core Contact Details", passed: false, note: "Missing valid email, phone, or full name." });
      recommendations.push({ text: "Add valid contact info", step: 2 });
    }

    if (hasTargetRole) {
      score += 5;
      checklist.push({ title: "Specific Target Role", passed: true, note: `Targeting: ${resume.personal.targetRole}` });
    } else {
      checklist.push({ title: "Target Role / Headline", passed: false, note: "Missing target role (e.g., Software Intern, Marketing Analyst)." });
      recommendations.push({ text: "+ Add target role title", step: 1 });
    }

    if (hasLinks) {
      score += 5;
      checklist.push({ title: "Professional Links", passed: true, note: "LinkedIn / GitHub / Portfolio included." });
    } else {
      checklist.push({ title: "Professional Links", passed: false, note: "Include LinkedIn or GitHub for recruiters to verify projects." });
      recommendations.push({ text: "+ Add LinkedIn or GitHub", step: 2 });
    }

    // 2. Education Section (Total 20 pts)
    const eduCount = (resume.education || []).filter(e => e.institution && e.degree).length;
    if (eduCount >= 1) {
      score += 15;
      checklist.push({ title: "Degree & Institution", passed: true, note: "University/School and Major are present." });
      
      const hasCoursework = resume.education.some(e => e.coursework?.trim()?.length > 10);
      if (hasCoursework) {
        score += 5;
        checklist.push({ title: "Relevant Coursework", passed: true, note: "Coursework highlights foundational knowledge." });
      } else {
        checklist.push({ title: "Relevant Coursework", passed: false, note: "Add 4-6 relevant subjects (e.g. Data Structures, DBMS, Operating Systems)." });
        recommendations.push({ text: "+ Add coursework", step: 3 });
      }
    } else {
      checklist.push({ title: "Education & CGPA", passed: false, note: "Students should list college name, degree, and CGPA out of 10." });
      recommendations.push({ text: "+ Add college & CGPA", step: 3 });
    }

    // 3. Projects Section (Total 25 pts) — Crucial for students!
    const validProjects = (resume.projects || []).filter(p => p.title?.trim());
    if (validProjects.length >= 2) {
      score += 15;
      checklist.push({ title: "Student Projects (2+)", passed: true, note: `${validProjects.length} projects showcase practical skills.` });
    } else if (validProjects.length === 1) {
      score += 8;
      checklist.push({ title: "Student Projects", passed: false, note: "Only 1 project. Aim for at least 2 distinct academic or personal projects." });
      recommendations.push({ text: "+ Add 2nd project", step: 4 });
    } else {
      checklist.push({ title: "Student Projects", passed: false, note: "No projects listed! For students, projects are the #1 differentiator." });
      recommendations.push({ text: "+ Add hands-on projects", step: 4 });
    }

    // Check project technologies
    const hasTechTags = validProjects.some(p => p.technologies?.trim()?.length > 3);
    if (hasTechTags) {
      score += 5;
      checklist.push({ title: "Project Tech Stack", passed: true, note: "Technologies specified for projects." });
    } else if (validProjects.length > 0) {
      checklist.push({ title: "Project Tech Stack", passed: false, note: "Specify tools used for each project (e.g., Python, React, Excel)." });
      recommendations.push({ text: "+ List tools used in projects", step: 4 });
    }

    // 4. Action Verbs & Measurable Metrics in Bullets (Total 15 pts)
    let totalBullets = 0;
    let actionVerbCount = 0;
    let quantifiedCount = 0;

    const allBullets = [];
    (resume.projects || []).forEach(p => (p.bullets || []).forEach(b => b.trim() && allBullets.push(b)));
    (resume.experience || []).forEach(e => (e.bullets || []).forEach(b => b.trim() && allBullets.push(b)));
    (resume.leadership || []).forEach(l => (l.bullets || []).forEach(b => b.trim() && allBullets.push(b)));

    totalBullets = allBullets.length;

    allBullets.forEach(bullet => {
      const firstWord = bullet.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, "");
      if (this.strongActionVerbs.includes(firstWord)) {
        actionVerbCount++;
      }
      // Check for metrics/numbers: digits, %, $, +, "k", "x"
      if (/\b\d+(\.\d+)?%?|\$\d+|\b\d+\+|\b\d+x\b/i.test(bullet)) {
        quantifiedCount++;
      }
    });

    if (actionVerbCount >= 3) {
      score += 8;
      checklist.push({ title: "Power Action Verbs", passed: true, note: `Found ${actionVerbCount} strong action verbs in your bullet points.` });
    } else {
      checklist.push({ title: "Power Action Verbs", passed: false, note: "Begin bullet points with strong verbs (Built, Spearheaded, Engineered)." });
      recommendations.push({ text: "+ Use stronger action verbs", step: 4 });
    }

    if (quantifiedCount >= 2) {
      score += 7;
      checklist.push({ title: "Quantified Results", passed: true, note: `Found ${quantifiedCount} quantified bullet points with numbers/metrics.` });
    } else {
      checklist.push({ title: "Quantified Results", passed: false, note: "Add numbers to bullets! (e.g., 'saved 3 hours', 'boosted users by 35%')." });
      recommendations.push({ text: "+ Add numbers & % metrics", step: 4 });
    }

    // 5. Skills Section (Total 10 pts)
    const hasLanguages = Boolean(resume.skills?.languages?.trim());
    const hasTools = Boolean(resume.skills?.tools?.trim());
    if (hasLanguages && hasTools) {
      score += 10;
      checklist.push({ title: "Categorized Skills", passed: true, note: "Technical tools and languages are clearly listed." });
    } else {
      score += 4;
      checklist.push({ title: "Categorized Skills", passed: false, note: "Ensure both languages/frameworks and tools are populated." });
      recommendations.push({ text: "+ Flesh out skills", step: 6 });
    }

    // 6. Summary / Objective (Total 5 pts)
    if (resume.summary?.trim()?.length > 40) {
      score += 5;
      checklist.push({ title: "Professional Summary", passed: true, note: "Elevator pitch is succinct and tailored." });
    } else {
      checklist.push({ title: "Professional Summary", passed: false, note: "Add a 2-3 sentence elevator pitch for quick scanning." });
      recommendations.push({ text: "+ Add brief summary", step: 8 });
    }

    // 7. Leadership / Extracurriculars (Total 5 pts)
    const leadCount = (resume.leadership || []).filter(l => l.organization?.trim()).length;
    if (leadCount >= 1) {
      score += 5;
      checklist.push({ title: "Extracurriculars / Clubs", passed: true, note: "Shows leadership, communication, and well-roundedness." });
    } else {
      checklist.push({ title: "Extracurriculars / Clubs", passed: false, note: "Listing student clubs, hackathons, or volunteer work boosts student resumes." });
      recommendations.push({ text: "+ Add campus club / leadership", step: 7 });
    }

    score = Math.min(score, maxScore);

    return {
      score,
      checklist,
      recommendations
    };
  },

  updateUI(resume) {
    const evaluation = this.evaluate(resume);
    const scoreVal = document.getElementById("atsScoreValue");
    const scoreFill = document.getElementById("atsMeterFill");
    const scoreStatus = document.getElementById("atsScoreStatus");
    const quickChips = document.getElementById("atsQuickChips");
    const auditList = document.getElementById("atsAuditList");

    if (scoreVal) scoreVal.textContent = evaluation.score;
    if (scoreFill) {
      scoreFill.style.width = `${evaluation.score}%`;
      if (evaluation.score >= 85) {
        scoreFill.style.background = "linear-gradient(90deg, #10b981, #059669)";
      } else if (evaluation.score >= 60) {
        scoreFill.style.background = "linear-gradient(90deg, #3b82f6, #10b981)";
      } else {
        scoreFill.style.background = "linear-gradient(90deg, #f59e0b, #ef4444)";
      }
    }

    if (scoreStatus) {
      if (evaluation.score >= 90) {
        scoreStatus.textContent = "Outstanding! Top 5% Student ATS Score 🎉";
      } else if (evaluation.score >= 75) {
        scoreStatus.textContent = "Strong Resume! A few quick tweaks to reach 90%+";
      } else if (evaluation.score >= 50) {
        scoreStatus.textContent = "Solid start — add more projects & metrics!";
      } else {
        scoreStatus.textContent = "Getting Started — follow the questions to build score.";
      }
    }

    // Quick Actionable Chips
    if (quickChips) {
      if (evaluation.recommendations.length === 0) {
        quickChips.innerHTML = `<span class="ats-chip pass">✨ All primary ATS checks passed! Ready for PDF download.</span>`;
      } else {
        quickChips.innerHTML = evaluation.recommendations.slice(0, 3).map(rec => `
          <button class="ats-chip warn" onclick="window.wizardManager && window.wizardManager.jumpToStep(${rec.step})">
            ${rec.text}
          </button>
        `).join("");
      }
    }

    // Detailed Checklist Modal Content
    if (auditList) {
      auditList.innerHTML = evaluation.checklist.map(item => `
        <div class="ats-check-item">
          <span class="ats-check-icon">${item.passed ? "✅" : "⚠️"}</span>
          <div>
            <div class="ats-check-title">${item.title}</div>
            <div class="ats-check-desc">${item.note}</div>
          </div>
        </div>
      `).join("");
    }
  }
};
