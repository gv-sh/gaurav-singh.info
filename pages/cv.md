---
layout: base.njk
title: CV
sidebar: true
permalink: /cv/
---

Full name: Gaurav Singh \
Location: Gold Coast, Australia \
Connect: [<i class="bi bi-envelope-at"></i> Email](mailto:gv-sh@outlook.com), [Website](https://gaurav-singh.info), [Github <i class="bi bi-box-arrow-up-right"></i>](https://github.com/gv-sh), [OrcID <i class="bi bi-box-arrow-up-right"></i>](https://orcid.org/my-orcid?orcid=0000-0003-1651-6602), [Linkedin <i class="bi bi-box-arrow-up-right"></i>](https://linkedin.com/in/gv-sh)

#### Key professional skills

###### Problem solving
Ability to identify and solve complex problems attributing to emphasizing importance of lateral thinking and strong experience spanning across both engineering and design schools

###### Teaching and facilitation
5+ years of teaching exp. in leading design school in India
Last held position: Head of studies, M.Des - Design Computation at Srishti Manipal Institute, India

#### Relevant technical skills

###### Machine learning
<i class="bi bi-dot"></i> Appliying ML in Engineering + HCI contexts \
<i class="bi bi-dot"></i> Computer vision and mathematical image processing \
<i class="bi bi-dot"></i> Experience with PyTorch, Scikit-learn

###### CS and Computer Graphics
<i class="bi bi-dot"></i> Experience in scientific computing: C, C++, Python \
<i class="bi bi-dot"></i> Fundamental rendering algorithms + OpenGL/GLSL \
<i class="bi bi-dot"></i> Three.js + D3.js + MatPlotLib + GGPlot

#### Inclination

###### Primary interest
<i class="bi bi-dot"></i> Broad: Applications of ML in context of engineering \
<i class="bi bi-dot"></i> Specific: Complex data visualization and image processing

###### Further interests
<i class="bi bi-dot"></i> High-performance visualization tools \
<i class="bi bi-dot"></i> Optimal graph drawing algorithms

###### Orientation
<i class="bi bi-dot"></i> Broad: Human-centered design (HCD)\
<i class="bi bi-dot"></i> Specific 1: Algorithmic explanability \
<i class="bi bi-dot"></i> Specific 2: Lesser-restricted licensing

#### Education

###### Formal
<i class="bi bi-hourglass-split"></i> 2023-25: [Masters + Research dissertation, IT+; Griffith, Australia](/education/masters/) \
<i class="bi bi-check"></i> 2013-15: [ADP, Innovation and Experience Design; Srishti, India](/education/adp-ied/) \
<i class="bi bi-check"></i> 2008-12: [Bachelors, Computer Science & Engg.; JNTU-A, India](/education/bachelors-cs/)

###### Other coursework
<i class="bi bi-check"></i> 2015: [The science of everyday thinking, UoQ, Aus; 12 weeks <sup>R</sup> <i class="bi bi-box-arrow-up-right"></i>](https://verify.edx.org/cert/9675d109fabd4904b0892335d0bb37d5) \
<i class="bi bi-check"></i> 2014: [Relativity and Astrophysics, Cornell, USA: 8 weeks <sup>R</sup> <i class="bi bi-box-arrow-up-right"></i>](https://verify.edx.org/cert/2c48cfb34351461fa7a74eaf989c0a6f)
 
#### Work and Academic experience

###### Professional experience
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