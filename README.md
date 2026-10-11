# ACCESS CONTROL: Understanding DAC, MAC, RBAC, and ABAC
### Interactive Masterclass Presentation & Cyber Simulation Lab

A premium, classroom-ready, 16-slide interactive web presentation and authorization simulation sandbox exploring **Discretionary Access Control (DAC)**, **Mandatory Access Control (MAC)**, **Role-Based Access Control (RBAC)**, and **Attribute-Based Access Control (ABAC)**.

Built with **React**, **TypeScript**, **Vite**, **Lucide Icons**, and **Recharts**.

---

## 🛡️ Core Highlights

- **Genuine 16:9 Slide Experience**: Centered, responsive widescreen presentation canvas with step-by-step navigation, animated progress bar, slide counter, and overview matrix.
- **Presenter Notes on Every Slide**: Dedicated slide notes drawer (`N` or Notes button) featuring a 30–60 second spoken delivery script, key talking points, and pacing stopwatch.
- **Hands-on Interactive Simulators**:
  1. **DAC Simulator**: Live Unix `chmod` octal calculator with user/group/world toggles and simulated actor access tests (`rwx`).
  2. **MAC Simulator**: Multilevel Security (MLS) kernel validator testing Bell-LaPadula (*No Read Up, No Write Down*) and Biba (*No Read Down, No Write Up*) rules.
  3. **RBAC Simulator**: Hospital EHR role selector with live entitlement matrix and **Separation of Duties (SoD)** validation.
  4. **ABAC Simulator**: Dynamic runtime context evaluator testing Subject, Resource, Action, and Environment attributes (Network, Device, Time) with XACML / Open Policy Agent (OPA) logic and **Emergency Break-Glass** overrides.
  5. **Model Comparison Matrix & Radar**: Multi-variable comparison table, interactive model focus filter, Recharts radar chart, and "Which Model Should You Choose?" decision guide.
  6. **Privilege Creep Timeline**: Interactive demonstration of how employees accumulate orphan permissions over multi-year career transitions.
  7. **College Examination Portal Case Study**: Multi-stakeholder analysis illustrating why pure DAC fails and how a hybrid MAC + RBAC + ABAC architecture protects examination integrity.
  8. **5-Question Scored Certification Quiz**: Interactive assessment with immediate pedagogical explanations, score calculations, and celebratory confetti upon completion.

---

## 🎨 Cyber Design System & Palette

Designed with high-assurance defense and SOC operations aesthetics:
- **Midnight Navy Background**: `#080D1B`
- **Surface Elevation Cards**: `#111A2E` / `#15223D`
- **Borders & Dividers**: `#1E3156`
- **Electric Blue**: `#4F8CFF`
- **Cyber Cyan**: `#35D5E8`
- **Integrity Green**: `#36D399`
- **Warning Amber**: `#FFBF69`
- **Alert Coral**: `#FF5C8A`
- **Primary Typography**: `#F3F6FC`
- **Secondary / Muted Text**: `#A8B3C7` / `#64748B`

---

## 📑 16-Slide Curriculum Roadmap

| Slide | Title | Category | Description & Interactive Feature |
| :---: | :--- | :---: | :--- |
| **01** | **Title & Orientation** | INTRODUCTION | Masterclass overview, four core pillars preview, quick start. |
| **02** | **Session Roadmap** | INTRODUCTION | 4-phase pedagogical curriculum with direct module jump links. |
| **03** | **What Is Access Control?** | FOUNDATIONS | Subject-Object Triad, IAAA model, and Anderson's 1972 Reference Monitor. |
| **04** | **Why It Matters** | FOUNDATIONS | CIA Triad, lateral movement, breach statistics, and compliance (HIPAA, PCI-DSS). |
| **05** | **Authentication vs Authorization** | FOUNDATIONS | Airport, hotel, and web token metaphors with interactive live comparison tester. |
| **06** | **Architecture & Workflow** | FOUNDATIONS | NIST / OASIS XACML 3.0 request flow (PEP ⇄ PDP ⇄ PIP ⇄ PAP) stepper. |
| **07** | **Discretionary Access Control (DAC)** | CORE MODELS | Owner autonomy, Unix `chmod` octals, and the Trojan Horse data leak risk. |
| **08** | **Mandatory Access Control (MAC)** | CORE MODELS | Multilevel clearances (Top Secret to Unclassified), Bell-LaPadula vs. Biba tester. |
| **09** | **Role-Based Access Control (RBAC)** | CORE MODELS | Enterprise roles, role hierarchy, clinical EHR matrix, and Separation of Duties. |
| **10** | **Attribute-Based Access Control (ABAC)** | CORE MODELS | Dynamic runtime context (Subject, Resource, Action, Environment) and Break-Glass. |
| **11** | **Model Comparison Matrix** | ANALYSIS | Comprehensive comparison table, Recharts radar chart, and decision tree guide. |
| **12** | **Real-World Applications** | ANALYSIS | Production architectures: AWS IAM, Healthcare EHR, Linux/SELinux, DoD, and SWIFT. |
| **13** | **Foundational Security Principles** | ANALYSIS | Principle of Least Privilege (PoLP), SoD, Default Deny, Need-to-Know, Defense in Depth. |
| **14** | **Security Challenges & Pitfalls** | ANALYSIS | Privilege creep timeline simulator, role explosion, and orphaned account hygiene. |
| **15** | **College Examination Portal Case Study** | CASE STUDY | University Examination System (EMS) simulation: CoE, Professor, Evaluator, Student. |
| **16** | **Conclusion, Scored Quiz & Wrap-Up** | EVALUATION | Interactive 5-question scored certification quiz, key takeaways, and references. |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>→</kbd> or <kbd>Space</kbd> | Next Slide |
| <kbd>←</kbd> or <kbd>Backspace</kbd> | Previous Slide |
| <kbd>F</kbd> | Toggle 16:9 Fullscreen Mode |
| <kbd>N</kbd> | Toggle Presenter Notes & Speech Pacing Stopwatch |
| <kbd>O</kbd> | Open 16-Slide Thumbnail Matrix Overview |
| <kbd>Esc</kbd> | Close open modals or exit Fullscreen |
| <kbd>?</kbd> | Display Keyboard Shortcuts Reference |
| <kbd>1</kbd> – <kbd>9</kbd> | Jump directly to slides 1 through 9 |

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### Installation & Run

1. Clone or open the repository:
   ```bash
   git clone <repository-url>
   cd access-control-presentation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

4. Run production build and type validation:
   ```bash
   npm run build
   ```

---

## 🌐 Deployment to Vercel (via GitHub)

This project is pre-configured for zero-configuration deployment on **Vercel** with `vercel.json` included.

### Option A: Deploy via GitHub (Recommended)

1. **Initialize Git & Commit**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete interactive access control presentation"
   ```

2. **Push to GitHub**:
   - Create a new repository on [GitHub](https://github.com/new).
   - Link and push:
     ```bash
     git remote add origin https://github.com/<your-username>/<your-repo-name>.git
     git branch -M main
     git push -u origin main
     ```

3. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New..."** > **"Project"**.
   - Select your GitHub repository.
   - Preset configurations are detected automatically:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Click **"Deploy"**. Your live interactive presentation URL will be provisioned in ~60 seconds!

### Option B: Deploy via Vercel CLI

If you have the Vercel CLI installed:
```bash
npm install -g vercel
vercel login
vercel
```
Follow the interactive prompts, accept default settings, and run `vercel --prod` to deploy to production.

---

## 📚 References & Standards

- **NIST SP 800-162**: *Guide to Attribute Based Access Control (ABAC) Definition and Considerations*
- **ANSI/INCITS 359-2004**: *Information Technology - Role Based Access Control*
- **Anderson, J. P. (1972)**: *Computer Security Technology Planning Study* (Reference Monitor Concept)
- **Bell, D. E., & LaPadula, L. J. (1973)**: *Secure Computer Systems: Mathematical Foundations*
- **Biba, K. J. (1977)**: *Integrity Considerations for Secure Computer Systems*
- **OASIS Standard**: *eXtensible Access Control Markup Language (XACML) Version 3.0*
