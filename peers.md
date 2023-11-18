---
layout: base.njk
title: Peers
---

{% for entry in collections.peers %}<a href="{{ entry.url }}">{{ entry.data.title }}</a><br/>
{% endfor %}