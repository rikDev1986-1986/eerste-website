// timeline.js
document.addEventListener("DOMContentLoaded", () => {
  const userLang = navigator.language || navigator.userLanguage;
  const isDutch = userLang.startsWith("nl");
  const container = document.querySelector(".projects-grid");
  
  fetch("projects.json")
    .then(response => response.json())
    .then(projects => {
      // Sorteer projecten op datum (nieuwste boven)
      projects.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      let lastMonth = "";
      
      projects.forEach(project => {
        const date = new Date(project.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
        
        // Voeg maand-marker toe als het een nieuwe maand is
        if (monthKey !== lastMonth) {
          lastMonth = monthKey;
          const monthHeader = document.createElement("div");
          monthHeader.className = "month-divider";
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
              ? new Date(project.date).toLocaleDateString("nl-NL")
              : new Date(project.date).toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" })
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
});