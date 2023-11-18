---
layout: base.njk
title: Years in review
permalink: /years-in-review/
---

{% for entry in collections.journal %}{% if entry.data.deck == "Year in Review" %}<a href="{{ entry.url }}">{{ entry.data.title }}</a><br/>{% endif %}{% endfor %}
