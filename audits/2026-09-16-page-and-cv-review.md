# Page and CV review — 16 September 2026

## Implemented: Deconstructing Algorithms and homepage footer

- Scoped the note-title spacing rule to the article title. Previously `.note h2` removed the top margin from every section heading.
- Made the article title the page's H1; the author/home link is no longer the H1. Sections remain H2s.
- Replaced image and video caption paragraphs with `figure`/`figcaption` markup and consistent, slightly smaller captions.
- Added the six images' intrinsic dimensions to reserve space while they load. The first image loads eagerly; subsequent images and video embeds remain lazy-loaded.
- Limited the portrait photograph to 440px wide while preserving its full image and aspect ratio.
- Underlined links in article prose so colour is not their only distinguishing feature.
- Simplified abstract wording, clarified the Oribaka transition, and standardised the impact-investment subtitle. Student authorship and project claims are preserved.
- Changed the homepage's CV, Blog and email links from a column to a row, retaining wrapping for narrow screens and enlarged text. Links themselves stay intact. The shared footer also keeps each individual link together.
- Updated the stylesheet cache key.

## CV review scope

Reviewed both complete, two-page PDFs visually and through text extraction, plus their HTML templates, shared data, print styles and PDF-generation script. The PDFs are tagged and their text is extractable. This is not a claim of certification against accessibility or applicant-tracking standards. CV files have not been revised or re-exported in this pass.

## Highest-priority fixes

| Priority | Finding | Proposed revision |
| --- | --- | --- |
| High | Both CV templates strip `Thesis I supervised;` from supervision entries. A reader sees titles and student names without an explicit account of your role. | Split `Thesis supervision` from `Academic service`, or label each thesis `Supervisor` and retain student names. Keep the Greenbox awards attributed to the students if adding their outcomes. |
| High | Both web CVs display two raster pages side by side at every width. The actual HTML is clipped to 1px, including focusable links. On a phone, a page preview becomes too small to read; keyboard users can reach invisible links. | Provide a visible, selectable HTML reading view, with the PDF download prominent. If keeping previews, stack them on mobile and make the HTML view an explicit option with sensible focus handling. |
| High | Print body text is 8.5pt. Professional page two is dense, while academic page two has considerable unused space. | Trial 10–10.5pt with a tighter line height around 1.4; edit and repaginate each CV independently. Add name and page number to continuation pages. Keep two pages only if content remains comfortably readable. |
| High | The payments role is a long list of product areas and technologies, with no specific delivery or outcome evidence. | Replace it with 2–4 concise bullets covering ownership, one shipped improvement, one reliability/integration result and the relevant stack. Add numbers only when you can substantiate them. |
| Medium | The professional CV's second page substantially duplicates the academic CV: six publications, teaching, awards and supervision. | Retain 2–3 relevant publications, shorten older academic material, and give current engineering work and shipped projects more space. |
| Medium | The academic CV describes active research, but its only academic-experience entry ends in 2022. Mathscapes appears only in the profile. | Add a dated independent-research entry if accurate, with projects, methods, contributions and outputs. Do not infer an appointment from a publication affiliation. |

## Professional CV: suggested revision

Suggested order: profile → technical skills → experience → selected projects → education → selected publications/recognition.

A shorter profile grounded in the existing content:

> Software developer building payment systems with C#, .NET, TypeScript and Vue, with a research background in applied machine learning and mathematical modelling. Previously led a postgraduate design-computation programme and founded an experimental mathematics lab.

- Replace “bank-account runs” with the precise term an outside engineering reader would recognise, after confirming what it means in this role.
- “Payments Technology Company” is generic. Use the employer name if appropriate, or make the anonymisation intentional and descriptive. Do not infer or expose it from unrelated information.
- Turn `Selected work` from four bare links into two or three short entries explaining the product/problem, your contribution and the result. Ink Signal is a useful candidate for showing shipped software; the present CV gives readers no explanation of what it is.
- Put LinkedIn near GitHub in the contact line if you want recruiters to use it. `Gold Coast, QLD, Australia` may orient readers better than the suburb alone; use your preferred location wording.
- Clarify the overlapping Srishti/Topcoder chronology. Part-time is already labelled; order the two consistently by recency or state a clear grouping.
- Retain the strongest recent distinctions and reduce older competition placements unless relevant to the role.

## Academic CV: suggested revision

Suggested order: research profile → education → research experience → publications → academic appointments/teaching → supervision → service → awards and grants → methods.

- The research profile, research interests and methods repeat machine learning, computer vision, generative modelling and inference. Give each section a distinct purpose: questions investigated, evidence of work, and practical methods.
- Add one or two sentences on the master's thesis methods and findings, if supported. Expand AQI to “air quality index” outside the formal thesis title. Preserve the official title verbatim.
- Make the teaching record concrete: selected course names, degree level, leadership dates, cohort sizes or curriculum responsibilities where documented. The “30 courses and workshops, 2013–2022” claim extends beyond the listed 2017–2022 faculty appointment; identify the earlier teaching context if retaining the claim.
- Separate the Adobe design grants from awards; add project/purpose, your role and funding amount only if documented and appropriate to disclose.
- Consider adding relevant talks, reviewing or research software/data only where evidence exists. An academic CV can grow beyond two pages when substantive material warrants it.

## Bibliography and copy consistency

- Use one bibliography style, with full venue, year, volume/issue and pages or article number where available. Current abbreviated venues duplicate years, e.g. `TEI 2019, 443-450, 2019`.
- The visual-mathematical literacy author order in the CV is correct: Gaurav Singh, then Rahul Singh Dhari. The publisher-deposited [Crossref record](https://api.crossref.org/works/10.1088/3049-4761/ae7df3) supplies **2(2), 025004 (2026)**. Do not use the different ordering in an aggregator's display to change the CV.
- The auxetics paper's **2025** citation year is supported by its issue publication, despite an October 2024 online-first date. The [publisher record](https://journals.sagepub.com/doi/10.1177/20414196241281069) gives **16(4), 853–877**. This is missing detail, not a wrong-year error.
- The [UniSC repository record](https://research.usc.edu.au/esploro/outputs/journalArticle/Techno-Economic-Pathways-Modeling-And-Nonlinear-Optimized/991239298702621?institution=61USC_INST&recordUsage=false&skipUsageReporting=true) supplies **Fractals 34(8), 1–25 (2026)**. Verify the publisher's preferred article identifier when standardising the full citation.
- Use Australian spelling in original prose, but preserve official degree and publication titles. Consider spelling out `Bachelor of Technology` while retaining the official qualification designation.
- Remove `References available on request` unless it serves a particular application. Shorten the duplicate links appendix; preserve clickable links and a useful plain-text website/contact address.
- Add punctuation between award titles and awarding bodies rather than relying only on spacing.

## Generation maintenance

The PDF generator assumes exactly two preview pages. If a CV grows, subsequent pages are silently omitted from the website; if it shrinks, preview generation fails. Derive the preview count from the generated PDF or explicitly validate the expected two-page count. Rebuild PDFs and all preview images together after content changes, then check page breaks, text extraction, link destinations and the web reading view.

## Information needed for substantive revisions

1. Target roles for the professional CV, and two or three current-job achievements you can substantiate.
2. Dates, status and concrete outputs of independent research/Mathscapes work.
3. Thesis methods/results, teaching scope and grant details you want included.

These are evidence gaps for a later content revision, not reasons to defer the page fixes above.

## Validation

- Production build passed; all 20 existing tests passed; `git diff --check` passed.
- Inspected homepage renders at 1100px and 540px, the complete article at 1000px in light mode, and the complete article at 540px in dark mode. The footer stayed on one row, captions remained attached to their media, and both video thumbnails rendered.
- A 390px CLI screenshot clipped a wider browser layout, so it was not treated as a valid phone-viewport check. A true phone/emulated-device check remains advisable.
- Inspected all four pages of the two original CV PDFs. No missing pages or clipped content found; the content and layout recommendations above remain proposals.
