---
layout: base.njk
title: Research
sidebar: true
pagination: 
    data: collections.research
    size: 5
    alias: entries
---

Applications of ML in context of HCI/Engineering; Complex data visualization; Image processing

_Further interests._ High-performance visualization tools, large-sized graphs, optimal graph drawing algorithms, OpenGL or WebGL contexts, algorithmic explainability, natural science, tacit knowledge, human-computer interaction (HCI), artificial intelligence, interaction design, ethical conflicts, archiving, accessibility beyond internet, recreational mathematics, pedagogy, engaging learning environments, mathematical activities.

_Orientation._ Human-centered design (HCD), open-access knowledge, open source, lesser-restricted licensing.

<div class="spacer"></div>

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
        {{ entry.data.date | postDate }}{% if entry.data.attribution %} ● {{ entry.data.attribution }}{% endif %}
    {% endif %}
    </p>
    <p>{{ entry.content }}</p>
    {% if entry.data.showFurther %}
        <p><a href="{{ entry.url }}">View more</a></p>
    {% endif %}
</div>
<div class="spacer"></div>
{% endfor %}