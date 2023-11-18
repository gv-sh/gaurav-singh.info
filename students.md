---
layout: base.njk
title: Students
---

{% for entry in collections.students %}<a href="{{ entry.url }}">{{ entry.data.title }}</a><br/>
{% endfor %}

If you have been a student in any of my classes and would not mind being listed here, please send me a message.