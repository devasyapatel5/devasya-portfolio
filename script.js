document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("mainNav");
    const topBtn = document.getElementById("topBtn");
    const year = document.getElementById("year");

    year.textContent = new Date().getFullYear();

    window.addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", window.scrollY > 35);
        topBtn.classList.toggle("show", window.scrollY > 500);
    });

    topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            const menu = document.getElementById("navMenu");
            if (menu.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(menu).hide();
            }
        });
    });

    // Terminal typing effect
    const command = "whoami";
    const commandEl = document.getElementById("typingCommand");
    const outputEl = document.getElementById("terminalOutput");

    let i = 0;
    function typeCommand() {
        if (i < command.length) {
            commandEl.textContent += command[i++];
            setTimeout(typeCommand, 90);
        } else {
            setTimeout(showTerminalOutput, 300);
        }
    }

    function showTerminalOutput() {
        outputEl.innerHTML = `
            <div><span class="label">name:</span> DEVASYA PATEL</div>
            <div><span class="label">role:</span> CSE Student / Developer</div>
            <br>
            <div><span class="prompt">devasya@portfolio:~$</span> skills</div>
            <div><span class="label">→</span> Python &nbsp; Java &nbsp; Web Development</div>
            <br>
            <div><span class="prompt">devasya@portfolio:~$</span> status</div>
            <div class="term-good">READY TO BUILD ✓</div>
        `;
    }
    setTimeout(typeCommand, 500);

    // Workout planner
    const selections = {
        goal: "Muscle Gain",
        experience: "Beginner",
        days: "3"
    };

    document.querySelectorAll(".choice-grid").forEach(group => {
        const groupName = group.dataset.group;
        group.querySelectorAll(".choice").forEach(button => {
            button.addEventListener("click", () => {
                group.querySelectorAll(".choice").forEach(b => b.classList.remove("active"));
                button.classList.add("active");
                selections[groupName] = button.dataset.value;
            });
        });
    });

    const plans = {
        "3": [
            ["MONDAY", "Chest + Triceps"],
            ["TUESDAY", "Rest / Recovery"],
            ["WEDNESDAY", "Back + Biceps"],
            ["THURSDAY", "Rest / Recovery"],
            ["FRIDAY", "Legs + Core"],
            ["WEEKEND", "Rest / Light Activity"]
        ],
        "4": [
            ["MONDAY", "Chest + Triceps"],
            ["TUESDAY", "Back + Biceps"],
            ["WEDNESDAY", "Rest / Recovery"],
            ["THURSDAY", "Shoulders + Core"],
            ["FRIDAY", "Legs"],
            ["WEEKEND", "Rest / Light Activity"]
        ],
        "5": [
            ["MONDAY", "Chest + Triceps"],
            ["TUESDAY", "Back + Biceps"],
            ["WEDNESDAY", "Legs"],
            ["THURSDAY", "Shoulders + Core"],
            ["FRIDAY", "Full Body"],
            ["WEEKEND", "Rest / Light Activity"]
        ]
    };

    function renderWorkout() {
        const result = document.getElementById("workoutResult");
        const meta = document.getElementById("planMeta");
        meta.textContent = `${selections.days} DAYS • ${selections.experience.toUpperCase()}`;

        result.innerHTML = "";
        plans[selections.days].forEach((item, index) => {
            const rest = item[1].toLowerCase().includes("rest");
            const card = document.createElement("div");
            card.className = `day-card ${rest ? "rest" : ""}`;
            card.style.animationDelay = `${index * 60}ms`;
            card.innerHTML = `<small>${item[0]}</small><h4>${item[1]}</h4>`;
            result.appendChild(card);
        });
    }

    document.getElementById("generateWorkout").addEventListener("click", () => {
        renderWorkout();
    });

    renderWorkout();
});
