---
layout: base.njk
title: Store
sidebar: false
pagination: 
    data: collections.store
    size: 15
    alias: entries
---
Coming soon.

<!-- <div class="store">
{% for entry in entries %} <div><img src="{{ entry.data.cover }}"><div class="caption"><a href="{{ entry.url }}">{{ entry.data.title }}</a></div></div>{% endfor %}
</div>

<nav aria-labelledby="my-pagination">
  <ol>
    {%- for pageEntry in pagination.pages %}
        <li><a href="{{ pagination.hrefs[ forloop.index0 ] }}"{% if page.url == pagination.hrefs[ forloop.index0 ] %} aria-current="page"{% endif %}>{{ forloop.index }}</a></li>
    {%- endfor %}
  </ol>
</nav> -->