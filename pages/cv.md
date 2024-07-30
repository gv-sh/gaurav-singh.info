---
layout: base.njk
title: CV
sidebar: true
permalink: /cv/
---

Full name: Gaurav Singh \
Location: Gold Coast, Australia \
Connect: [<i class="bi bi-envelope-at"></i> Email](mailto:gv-sh@outlook.com), [Website](https://gaurav-singh.info), [Github <i class="bi bi-box-arrow-up-right"></i>](https://github.com/gv-sh), [OrcID <i class="bi bi-box-arrow-up-right"></i>](https://orcid.org/my-orcid?orcid=0000-0003-1651-6602), [Linkedin <i class="bi bi-box-arrow-up-right"></i>](https://linkedin.com/in/gv-sh)

#### Area of interest

_Primary interest._ Applications of ML in context of HCI/Engineering; Complex data visualization; Image processing

_Further interests._ High-performance visualization tools, large-sized graphs, optimal graph drawing algorithms, OpenGL or WebGL contexts, algorithmic explainability, natural science, tacit knowledge, human-computer interaction (HCI), artificial intelligence, interaction design, ethical conflicts, archiving, accessibility beyond internet, recreational mathematics, pedagogy, engaging learning environments, mathematical activities.

_Orientation_. Human-centered design (HCD), open-access knowledge, open source, lesser-restricted licensing.

#### Skills and competencies

_Machine Learning_ \
Working experience with Generative AI models; Python \
Appliying ML in Engineering + HCI contexts \
Computer vision and mathematical image processing \
Experience with PyTorch, Scikit-learn, Tensorflow

_Mathematical Modelling_ \
Theoretical mathematical models \
Differential equations + Discrete maths \
Deterministic and statistical models \
L-systems + Automata theory + Game theory

_CS and Computer Graphics_ \
Experience in scientific computing: C, C++, Lisp, Python \
Fundamental rendering algorithms + OpenGL/GLSL \
Three.js + D3.js + MatPlotLib + GGPlot \
P5/OpenFrameworks + Creative coding

_Interface and experience design_ \
User research + Wireframing + Prototyping \
Human-centered design principles \
User interface and experience design \
Adobe XD + Sketch + Figma + Adobe Illustrator

_Web and Application Development_ \
Front-end technologies: JS + HTML + CSS \
Experience in React for building user interfaces \
Back-end development using Flask and Python \
Version control systems like Git

_Writing and Visualization_ \
Technical writing + documentation \
Creative writing and storytelling \
Design and programming for data visualization \
Infographics design + Interactive media

#### Education

###### Formal
<i class="bi bi-dot"></i> 2023-25: [Masters + Research dissertation, IT+; Griffith, Australia](/education/masters/) \
<i class="bi bi-check"></i> 2013-15: [ADP, Innovation and Experience Design; Srishti, India](/education/adp-ied/) \
<i class="bi bi-check"></i> 2008-12: [Bachelors, Computer Science & Engg.; JNTU-A, India](/education/bachelors-cs/)

###### Other coursework
<i class="bi bi-check"></i> 2015: [The science of everyday thinking, UoQ, Aus; 12 weeks <sup>R</sup> <i class="bi bi-box-arrow-up-right"></i>](https://verify.edx.org/cert/9675d109fabd4904b0892335d0bb37d5) \
<i class="bi bi-check"></i> 2014: [Relativity and Astrophysics, Cornell, USA: 8 weeks <sup>R</sup> <i class="bi bi-box-arrow-up-right"></i>](https://verify.edx.org/cert/2c48cfb34351461fa7a74eaf989c0a6f)
 
#### Work and Academic experience

###### Professional experience
<i class="bi bi-dot"></i> Apr'08-Present: [Founder at Mathscapes, India](/work/founder-at-mathscapes/) \
<i class="bi bi-dot"></i> Apr'15-Present: [Co-founder at M56, India](/work/co-founder-at-m56/) \
<i class="bi bi-check"></i> Jul'22-Jan'23: [RA to Dr. Javanbakht <sup>R</sup>, Griffith, Australia](/work/ra-to-dr-javanbakht/) \
<i class="bi bi-check"></i> Jan'18-Nov'22: [Design copilot <sup>R</sup> at Topcoder, Inc., USA](/work/design-copilot-at-tc/) \
<i class="bi bi-check"></i> Jul’17-Sep’22: [Faculty member at Srishti-Manipal, India](/work/faculty-member-at-srishti-manipal/) \
<i class="bi bi-check"></i> Feb’16-Dec’16: [RA at Art in Transit, Srishti, India](/work/research-assistant-at-ait/) \
<i class="bi bi-check"></i> May'14-Jul'14: [Research intern at S.Labs, India](/work/research-intern-at-slabs/) \
<i class="bi bi-check"></i> Nov'08-Apr'15: [Independent designer](/work/independent-designer/)

###### Research publications
{% for entry in collections.research %} {{ entry.data.date | postYear }}: <a href="{{ entry.url }}" title="{{ entry.data.title }}">{{ entry.data.title | truncate: 50 }}</a> {% if entry.last %}{% else %} {% endif %}
{% endfor %}

<i class="bi bi-info-circle"></i> For detailed descriptions, please check [Research](/research/) page.

###### Teaching
{% for entry in collections.teaching %} {{ entry.data.date | postYear }}: {{ entry.data.title }} {% if entry.data.meta %} [{{ entry.data.meta }}] {% endif %} {% if entry.last %}{% else %} {% endif %}
{% endfor %}

<i class="bi bi-info-circle"></i> For detailed descriptions, please check [Teaching](/teaching/) page.

###### Thesis projects mentored
2020: [Discovering Algorithmic Literacy through Explainable AI](/projects/deconstructing-algorithms-2020/). D Dixit, [S Singh](/students/simran-singh/). BDes VC, BDes HCD resp. \
2020: [Financial indicators that motivate impact investment behaviour](/projects/deconstructing-algorithms-2020/). [A Avadhana](/students/apoorva-avadhana/), N Patny, S Mishra. BDes HCD \
2013: Location and arrival prediction+. Shobha R, Pavani A, Kalpana, BTech IT

###### Conferences
2018: Co-chair, Demo track – [IndiaHCI 2018](https://indiahci.org/2018/), Bangalore \
2017: Organising team, [Cumulus Conference 2017](https://cumulusassociation.org/wp-content/uploads/2021/10/Letters-To-The-Future-1.pdf), Bangalore \
2011: Participant, Pragnya 2011 NTS, JNTU-H, India \
2010 and '11: Participant, Gravitas ITF, VIT, India 

###### Recognition
2023: Grant, Adobe Fund for Design 2023 \
2021: Grant, Adobe Fund for Design 2021 \
2017: Design Champion, Topcoder Open 2017 India Regionals \
2012: Invited & Finalist; Rank #6 Studio, TCO12, USA \
2011: Invited & Finalist; Rank #11 Studio, TCO11, USA

---

ADP: Advanced Diploma Program - Post grad.\
CSE: Computer Science and Engineering \
NTS: National Technical Symposium \
ITF: International Technology Festival \
HCD: Human Centered Design \
IT: Information Technology \
VC: Visual Communication \
BDes: Bachelor of Design \
<sup>R</sup>: Remote \
NB: Co-facilitated course with [Dr.Naveen Bagalkot](/mentors/naveen-bagalkot/) \
RS: Co-facilitated course with (Dr.) Riyaz Shaikh \
VC: Co-facilitated course with [Dr.Venkat Chilukuri](/mentors/venkat-chilukuri/)