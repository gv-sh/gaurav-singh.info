---
layout: base.njk
title: Peers
description: Peers
keywords: Gaurav Singh, personal website, peers, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, design, embodied self-monitoring, motorbike commuting, bike area network, modular platform, personal informatics, cloud-based platform, interactive prototype, situated memory, self-efficacy, well-being, senior citizens, digital technology, real-time data visualization, posture tracking, in-situ evaluation, user experience design, community engagement, ethical technology, interdisciplinary studies, technology innovation, educational technology, algorithmic design, interactive media
permalink: /peers/
---

{% for entry in collections.peers %}<a href="{{ entry.url }}">{{ entry.data.title }}</a><br/>
{% endfor %}