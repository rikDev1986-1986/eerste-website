
  
  // timeline.js
  document.addEventListener("DOMContentLoaded", () => {
    const userLang = navigator.language || navigator.userLanguage;
    const isDutch = userLang.startsWith("nl");
    const container = document.querySelector(".projects-grid");
    const navNl = document.getElementById("nav-months-nl");
    const navEn = document.getElementById("nav-months-en");
    const addedMonths = new Set();
    
    fetch("projects.json")
      .then(response => response.json())
      .then(projects => {
        // Sorteer projecten op datum (nieuwste boven)
        projects.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        let lastMonth = "";
        
        projects.forEach(project => {
          const date = new Date(project.date);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          
          // Voeg maand-menu toe in navigatie (één keer per unieke maand)
          if (!addedMonths.has(monthKey)) {
            addedMonths.add(monthKey);
            
            const nlItem = document.createElement("li");
            nlItem.innerHTML = `<a href="#month-${monthKey}">${date.toLocaleString("nl-NL", { month: "long" })} ${date.getFullYear()}</a>`;
            navNl?.appendChild(nlItem);
            
            const enItem = document.createElement("li");
            enItem.innerHTML = `<a href="#month-${monthKey}">${date.toLocaleString("en-GB", { month: "long" })} ${date.getFullYear()}</a>`;
            navEn?.appendChild(enItem);
          }
          
          // Voeg maand-label toe aan projectenoverzicht
          const monthId = `month-${monthKey}`;
          if (monthKey !== lastMonth) {
            lastMonth = monthKey;
            const monthHeader = document.createElement("div");
            monthHeader.className = "month-divider";
            monthHeader.id = monthId;
            monthHeader.innerHTML = `
            <div class="diamond"></div>
            <div class="month-label">
              ${isDutch 
                ? `${date.toLocaleString("nl-NL", { month: "long" })} ${date.getFullYear()}`
                : `${date.toLocaleString("en-GB", { month: "long" })} ${date.getFullYear()}`
              }
            </div>
          `;
            container.appendChild(monthHeader);
          }
          
          // Voeg projectkaart toe
          const card = document.createElement("div");
          card.className = "project-card";
          card.innerHTML = `
          <a href="${project.link}" target="_blank">
            <img src="${project.image}" alt="${project.title}" />
            <h4>${project.title}</h4>
            <p class="project-date">${isDutch 
              ? date.toLocaleDateString("nl-NL")
              : date.toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" })
            }</p>
          </a>
        `;
          container.appendChild(card);
        });
      });
    
    // Hamburger menu toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    }
    
    // Verander kleur hamburger bij scroll
    window.addEventListener("scroll", () => {
      if (hamburger) {
        if (window.scrollY > 100) {
          hamburger.classList.add("scrolled");
        } else {
          hamburger.classList.remove("scrolled");
        }
      }
    });
  });
