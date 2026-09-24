# CV project selection — 24 September 2026

## Decision

Replace Ink Signal and Deconstructing Algorithms in the professional CV with the AATP-based agricultural product passport, auxetic deformation detection, and heavy-transport decarbonisation modelling. The user confirmed a combined software-engineering and applied-ML audience and explicitly excluded Iterflow as too weak for this selection. The selection demonstrates API development and identity-system integration, scientific ML, and nonlinear modelling with concrete outputs. The academic CV already includes the publications and teaching studio and is unchanged.

## Evidence for the selected entries

### AATP-based agricultural product passport

- The user confirmed that he led development and built the entire software demonstrator during his master's degree using the available VON Network and AATP protocol. This direct clarification establishes implementation ownership beyond the narrower API-developer role label in the planning document. The project documentation identifies it as a Griffith work-integrated-learning team prototype.
- The user confirmed supervision by the team at Anonyome Labs and requested this wording for the CV. The CV credits this industry supervision while preserving his software-development leadership and complete implementation ownership.
- Reviewed the private `agri-passport-design` repository through the user's GitHub connection. `docs/03_team-organisation.md` names Gaurav as API developer and student liaison, responsible for designing and implementing the passport and VDR APIs, demonstrating digital identity wallet functionality, and maintaining documentation. It also lists lead development and DI/API integration among his responsibilities.
- `api/aatp-ui.py` implements Flask routes for schema management, credential definitions and issuance, invitations/connections, and product-trace views. `api/credential.py` calls ACA-Py-compatible credential endpoints. The README documents wallet onboarding and issuance workflows covering producers, certification, products, packaging and transport.
- `api/schema/` contains the corresponding domain schemas; the trace view filters credential records by product identifier. This supports concrete prototype scope, not a claim of operating a national traceability platform.
- The [official AATP overview](https://www.agtraceaus.com.au/aatp) supplies protocol context only. The student implementation is distinct from authorship of the national protocol. The CV does not link to the private repository or suggest that the official protocol site documents the student's implementation.
- No unsupported deployment, compliance, security-audit, client-score or performance claims are included. Source files were inspected, but the prototype was not executed in this CV task.

### Auxetic deformation detection

- [Publisher record](https://journals.sagepub.com/doi/10.1177/20414196241281069) and [publisher-deposited abstract](https://api.crossref.org/works/10.1177/20414196241281069).
- Supports finite-element training data, K-means image labels, logistic regression, and detection of four of six deformation modes.
- Four of six is a count of deformation modes, not classification accuracy. No accuracy percentage is inferred.
- Uses the 2025 issue year, consistent with the existing bibliography; the online-first date is in 2024.
- “Co-developed” preserves collaborative attribution. Public records do not establish a detailed division of implementation responsibilities.

### Heavy-transport decarbonisation modelling

- [Published paper](https://doi.org/10.1142/S0218348X26400633) and [publisher-deposited abstract](https://api.crossref.org/works/10.1142/S0218348X26400633).
- Supports the integration of SEEA-aligned Australian emissions factors and fleet-transition economics, nonlinear technology learning and grid dynamics, and evaluation of lifecycle emissions, total ownership costs and ROI across 270 scenarios over a 25-year horizon.
- Model outputs are scenario results, not observed fleet savings or deployment outcomes. The CV describes analytical scope without claiming realised business impact.
- Link to the paper. Do not claim that the public [digital-twin repository](https://github.com/gv-sh/digital-twin) is the paper's complete implementation: its [Monte Carlo class](https://github.com/gv-sh/digital-twin/blob/main/digital_twin/simulation/monte_carlo.py) returns fixed summary values and a generic normal sample; one [fleet optimisation function](https://github.com/gv-sh/digital-twin/blob/main/digital_twin/optimization/fleet_optimizer.py) returns a fixed technology mix. Other functions contain real calculations, but the README alone overstates implementation completeness.

## Alternatives considered

| Candidate | What it would demonstrate | Selection judgement |
| --- | --- | --- |
| [SpecGen / sg2](https://github.com/gv-sh/sg2) | React/Express application, content generation, admin workflows, data persistence and deployment | A potential replacement for the transport entry in a full-stack-only CV. README and source tree reviewed; implementation and deployment outcomes need closer verification before stronger claims. |
| [ReRide](https://doi.org/10.1145/3294109.3300986) | Modular sensing, real-time posture estimation and embodied interaction | Strong alternative for embedded systems or HCI roles and useful evidence of earlier experience. [Conference programme](https://tei.acm.org/2019/program/program-overview.html) supports the platform and real-time posture focus. Establish individual engineering responsibilities before claiming sole architecture ownership. |
| [Visual-mathematical literacy](https://doi.org/10.1088/3049-4761/ae7df3) | Research on representation choices in applied ML | Retain in selected publications. Publisher full text was inaccessible during this review; do not introduce detailed method or result claims solely from an aggregator. |
| [Ink Signal](https://gaurav-singh.info/ink-signal/) | Shipped design tooling and visual craft | Useful portfolio work, but the present description gives less evidence of technical depth than the selected three. |
| Deconstructing Algorithms | Teaching, supervision and research facilitation | Better represented by the academic CV's teaching section. |
| Mosaic, math-utils, svideo, graphverse, geometric-figma | Mobile, mathematical utilities, distributed playback and creative tools | Reviewed repository descriptions/READMEs; documentation is too thin or generic to outrank the selected candidates without further investigation. |

## Scope of verification

Reviewed the gv-sh repository inventory and Mathscapes repositories, shortlisted project READMEs, selected implementation/test files, and publication records. This was an evidence review for CV wording, not a complete code audit or independent replication of the studies.

## Validation

- Production build and all 20 existing tests passed; `git diff --check` passed.
- Regenerated the professional PDF and both WebP page previews, including their copies in the built site. Updated the professional CV asset cache key.
- PDF metadata confirms two A4 pages; extracted text contains all three project descriptions on page one.
- Visually inspected both rendered pages. No clipped text, overlapping content, or broken project entries; existing type size and page break are preserved.

## Further CV revision

The user requested recommendations 2–5 and excluded recommendation 1 (rewriting Pay Advantage). Its wording and the shared employment data remain unchanged.

- Sharpened the profile around payment-system development and published applied ML/modelling research.
- Added dated project headings, implementation decisions, demonstrated scope and research results. Current employment and selected projects occupy page one; earlier employment, education, compact publications and recognition occupy page two. Full publication citations remain in the unchanged academic CV.
- Added public AATP and auxetic-ML case studies and linked them from the CV. The AATP page documents ownership, architecture, product-ID tracing and the demonstration workflow without exposing the private repository. The research page distinguishes four-mode coverage from classification accuracy and avoids unsupported evaluation claims.
- AATP's 2024 date is supported by the repository's October 2024 implementation history. Additional detail comes from `docs/07_troubleshooting.md` (agent/ledger connectivity, Docker, macOS/Ubuntu and Indy/OpenSSL compatibility) and `tests/test_credential.py` (mocked credential API tests). Troubleshooting activity is not described as independently verified production reliability; mocked tests are not presented as end-to-end validation.
- Rebuilt the site and professional PDF/previews. All 20 existing tests passed; the PDF contains two A4 pages with 10-point body text. Both rendered PDF pages were visually inspected and their case-study/DOI links checked.
- Both case studies passed desktop (1100 px) and mobile (390 px) browser checks: no horizontal overflow, one main heading, valid JSON-LD and working internal links. Light desktop and dark mobile screenshots were visually inspected.

## Consistent CV formatting

- Applied shared entry-title emphasis across the academic and professional CVs and matched their second-page continuation headers.
- Removed the name hyperlink on both CV routes and removed the professional-only enlarged heading. Both names inherit the body-text size (10 points in the PDFs).
- Regenerated both PDFs and all four previews; confirmed two A4 pages each and visually inspected every rendered page. Verified both built name headings contain plain text without anchors. Build, all 20 existing tests and whitespace checks passed.

## Subsequent user refinements

- Names link home on the CV webpages only; print uses plain text at body size. The Professional/Academic switcher is screen-only. Cross-references between the PDFs and the AATP project-title hyperlink were removed.
- The academic appointment title now explicitly states “Head of Programme, M.Des Design Computation”, as clarified by the user.
- Professional selected publications now use the same full-citation include as the academic CV, retaining three selected articles and removing the separate first-author statement.
- Expanded technical skills using inspected implementation evidence: `aqi-synthetic-research/src/models/base.py` and `src/models/transformer/gpt.py` use PyTorch/PyTorch Lightning for generative modelling; `src/optimization/hyperopt.py` creates and runs Optuna studies; `src/training/wandb_callbacks.py` logs metrics and artifacts with Weights & Biases. These support framework and experiment-tool skills, not a claim of production ML deployment.
- `sg2/src/server/services.ts` implements chat-completion and image-generation API calls, parameterised prompts and SQLite operations. Its application source supports React, Node.js/Express and TypeScript. Existing AATP evidence supports Python/Flask, Docker and Linux; this site's workflow files substantiate GitHub Actions build/deployment use. No RAG, fine-tuning or agent-framework expertise was inferred.
- The academic skills section is placed on page one, near the research profile. Both CVs retain the shared font sizing and citation formatting.
- The user's final selections emphasise automated testing/delivery and ML experiment tracking/optimisation in the professional CV, and generative time-series modelling, simulation-based ML and representation/feature design in the academic CV. Model serving/monitoring was also selected but remains pending a concrete experience clarification; it is not yet claimed as an existing skill. Regenerated both PDFs/previews and visually checked all four pages; both remain two pages.
- Final user refinements remove second-page continuation headers, describe the 2011/2012 Topcoder finals as invitations, replace “founded” with “set up” for the Experimental Maths Lab, and add a subtle Barely Discernible blog link to both footers. Both PDF blog annotations were verified. Screen navigation and linked names remain; PDF names stay plain text and PDFs do not cross-link. All four final pages were visually checked, and the build, 20 existing tests and whitespace checks passed before commit.

## Design, engineering and final typography refinements

- All CV text now inherits one size, including project dates and context. Added the user's LinkedIn profile to both contact lines. PDF font-specification checks confirm a single reported size in each PDF; both remain two A4 pages.
- The user clarified expertise in human-centred design and experience design and a background spanning engineering and design schools. Both profiles and skills sections now state these disciplines explicitly alongside engineering and ML.
- Existing evidence supplies the supporting detail: the Innovation & Experience Design qualification, Design Computation programme leadership, interaction-design/HCI teaching, Topcoder design facilitation, and HCI publications. The professional selection now includes the 2019 ReRide paper as a fourth full citation. Teaching wording connects design/HCI with programming, ML and physical computing. No unsupported user-research methods, impact metrics or institutional appointments were added.
- Regenerated both PDFs and all previews and visually reviewed all four pages with the final design/engineering content. Local build and whitespace checks passed.
- Blog footers now show the full clickable URL on a separate line. Selected skills, ownership/results and leadership/teaching phrases use light lime highlighting (`#dfff85`) with black text and exact print colours. The highlight style preserves inherited font size; regenerated PDFs still report one text size and two pages each. All four highlighted pages were visually checked.
