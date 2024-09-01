---
layout: base.njk
title: Research
sidebar: true
pagination: 
    data: collections.research
    size: 5
    alias: entries
---
Please check my [CV](/cv/) for a list of my research interests.

---

<div class="spacer"></div>

{% for entry in entries %}
<div class="item">
    {% if entry.data.cover %}
        <img src="{{ entry.data.cover }}" alt="{{ entry.data.title }}">
    {% endif %}
    <h6>{{ entry.data.deck }}</h6>
    <h3>{{ entry.data.title }}</h3>
    <p class="meta">
    {% if entry.data.date %}
        {{ entry.data.date | postDate }}{% if entry.data.attribution %} / {{ entry.data.attribution }}{% endif %}
    {% endif %}
    </p>
    <p>{{ entry.content }}</p>
    {% if entry.data.showFurther %}
        <p><a href="{{ entry.url }}">View more</a></p>
    {% endif %}
</div>
<div class="spacer"></div>
{% endfor %}