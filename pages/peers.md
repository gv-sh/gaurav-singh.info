---
layout: base.njk
title: Peers
permalink: /peers/
---

{% for entry in collections.peers %}<a href="{{ entry.url }}">{{ entry.data.title }}</a><br/>
{% endfor %}