---
layout: base.njk
title: C. Vitae
sidebar: true
---

Full name: Gaurav Singh \
Location: Gold Coast, Australia \
Connect: [Email](mailto:gv-sh@outlook.com), [Website](https://gaurav-singh.info), [Github](https://github.com/gv-sh), [OrcID](https://orcid.org/my-orcid?orcid=0000-0003-1651-6602)


###### Education
2023-25*: Masters + Research dissert., IT + Data analytics; Griffith \
2013-15: ADP, Innovation and Experience Design; Srishti, India \
2008-12: Bachelors, Computer Science & Engg.; JNTU-A, India

###### Other coursework
2015: The science of everyday thinking, UoQ, Aus; 12 weeks <sup>R</sup> \
2014: Relativity and Astrophysics, Cornell, USA: 8 weeks <sup>R</sup>
 
###### Professional experience
Apr'08-Present: Founder, Mathscapes, India \
Apr'15-Present: Co-founder, M56, India \
Jul'22-Jan'23: RA to Dr. Javanbakht <sup>R</sup>, Griffith, Aus \
Jul’17-Sep’22: Faculty, Srishti-Manipal, India \
Jan'18-Nov'22: Design copilot <sup>R</sup>, Topcoder, Inc., USA \
Feb’16-Dec’16: RA, Art in Transit, Srishti, India \
May'14-Jul'14: Research Intern, S.Labs, India \
Nov'08-Apr'15: Designer, Independent

###### Research publications
{% for entry in collections.research %} {{ entry.data.date | postYear }}: <a href="{{ entry.url }}">{{ entry.data.title }}</a> {% if entry.last %}{% else %} {% endif %}
{% endfor %}

###### Teaching
{% for entry in collections.teaching %} {{ entry.data.date | postYear }}: {{ entry.data.title }} {% if entry.data.meta %} [{{ entry.data.meta }}] {% endif %} {% if entry.last %}{% else %} {% endif %}
{% endfor %}

###### Thesis projects mentored
2020: Discovering Algorithmic Literacy through Explainable AI. D Dixit, S Singh. BDes VC, BDes HCD resp. \
2020: Financial indicators that motivate impact investment behaviour. A Avadhana, N Patny, S Mishra. BDes HCD \
2013: Location and arrival prediction+. Shobha R, Pavani A, Kalpana, BTech IT

###### Conferences
2018: Co-chair, Demo track – IndiaHCI 2018, Bangalore \
2017: Organising team, Cumulus Conference 2017, Bangalore \
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
NB: Co-facilitated course with Dr.Naveen Bagalkot \
RS: Co-facilitated course with (Dr.) Riyaz Shaikh \
VC: Co-facilitated course with Dr.Venkat Chilukuri

---

A print and more detailed version of this CV is available on [request](mailto:gv-sh@outlook.com).