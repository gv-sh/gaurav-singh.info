---
name: Comment
description: Use this template to add a comment on the website.
title: "[Comment] Your comment title"
labels: comment
assignees: null
---

## Comment

Please provide your comment below:

---

### Additional Information
- **Page URL:** {{ page.url }}
- **Date:** {{ "now" | date: "%Y-%m-%d" }}
- **Your Name:** {{ name | default: "Anonymous" }}
- **Your Email:** {{ email | default: "No email provided" }}
- **Your Website:** {{ website | default: "No website" }}