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
      // Sorteer projecten op datum (nieuwste eerst)
      projects.sort((a, b) => new Date(b.date) - new Date(a.date));

      let lastMonth = "";

      projects.forEach(project => {
        const date = new Date(project.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        const monthLabelNL = `${date.toLocaleString("nl-NL", { month: "long" })} ${date.getFullYear()}`;
        const monthLabelEN = `${date.toLocaleString("en-GB", { month: "long" })} ${date.getFullYear()}`;
        const monthId = `month-${monthKey}`;

        if (!addedMonths.has(monthKey)) {
          addedMonths.add(monthKey);

          const nlItem = document.createElement("li");
          nlItem.innerHTML = `<a href="#${monthId}">${monthLabelNL}</a>`;
          navNl?.appendChild(nlItem);

          const enItem = document.createElement("li");
          enItem.innerHTML = `<a href="#${monthId}">${monthLabelEN}</a>`;
          navEn?.appendChild(enItem);

          const monthHeader = document.createElement("div");
          monthHeader.className = "month-divider";
          monthHeader.id = monthId;
          monthHeader.innerHTML = `
            <div class="diamond"></div>
            <div class="month-label">${isDutch ? monthLabelNL : monthLabelEN}</div>
          `;
          container.appendChild(monthHeader);

          lastMonth = monthKey;
        }

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

  // Hamburger toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Scroll effect voor hamburger
  window.addEventListener("scroll", () => {
    if (hamburger) {
      hamburger.classList.toggle("scrolled", window.scrollY > 100);
    }
  });
});
