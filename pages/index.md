---
layout: base.njk
title: Index
description: Index of Gaurav's personal website
keywords: Gaurav Singh, personal website, index, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, computer science, design, art, creative practice, innovation, experience design, programming, computational thinking, societal impact, technology innovation, Griffith Gold Coast, Griffith University Gold Coast, Australia Gold Coast, India, interdisciplinary studies, ethical technology, data ethics, user experience design, computational creativity, visual storytelling, digital art, academic research, community engagement, technology and society, educational technology, design thinking, software development, algorithmic design, interactive media, embodied self-monitoring, personal informatics, self-efficacy, situated memory, motorbike riding, bike area network, modular platform, cloud-based platform, interactive prototype, well-being, senior citizens, real-time data visualization, posture tracking, in-situ evaluation, user experience design, community engagement, ethical technology, interdisciplinary studies, technology innovation, educational technology, algorithmic design, interactive media
sidebar: true
permalink: /index/
---

{% assign allLinks = "" | split: "" %}
{% for entry in collections.all %}
  {% if entry.url != page.url and entry.data.index != false %}
    {% assign link = entry.data.title | append: "|" | append: entry.url %}
    {% assign allLinks = allLinks | push: link %}
  {% endif %}
{% endfor %}

{% assign sortedLinks = allLinks | sort %}

{% assign groupedLinks = "" | split: "" %}
{% for link in sortedLinks %}
  {% assign linkParts = link | split: "|" %}
  {% assign title = linkParts[0] %}
  {% assign url = linkParts[1] %}
  {% assign firstLetter = title | slice: 0 | upcase %}
  
  {% assign groupFound = false %}
  {% assign newGroupedLinks = "" | split: "" %}
  {% for group in groupedLinks %}
    {% if group.first == firstLetter and groupFound == false %}
      {% assign groupFound = true %}
      {% assign updatedGroup = group | push: link %}
      {% assign newGroupedLinks = newGroupedLinks | push: updatedGroup %}
    {% else %}
      {% assign newGroupedLinks = newGroupedLinks | push: group %}
    {% endif %}
  {% endfor %}
  
  {% if groupFound == false %}
    {% assign newGroup = "" | split: "" | push: firstLetter | push: link %}
    {% assign newGroupedLinks = newGroupedLinks | push: newGroup %}
  {% endif %}
  
  {% assign groupedLinks = newGroupedLinks %}
{% endfor %}

{% assign groupedLinks = groupedLinks | sort %}

{% for group in groupedLinks %}
### {{ group.first }}
{% for link in group offset:1 %}{% assign linkParts = link | split: "|" %}{% assign title = linkParts[0] %}{% assign url = linkParts[1] %}
[{{ title }}]({{ url }})  {% endfor %}
{% endfor %}
