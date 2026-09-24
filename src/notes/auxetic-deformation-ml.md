---
title: "Detecting deformation modes with machine learning"
slug: auxetic-deformation-ml
date: 2026-09-24
description: "A research case study with Rahul Singh Dhari and Zia Javanbakht. Published online in 2024 and in the 2025 journal issue."
kind: project
---

I co-developed a machine-learning workflow to recognise deformation modes in re-entrant honeycomb auxetics.

## Problem and method

Tracing plastic hinges across successive deformed configurations requires repeated visual interpretation. Our workflow used finite-element simulation data, K-means image labelling and logistic regression to automate mode detection.

<div class="case-architecture" role="group" aria-label="Research workflow">
<ol>
<li>Generate deformed configurations through finite-element analysis.</li>
<li>Construct image labels using K-means clustering.</li>
<li>Use logistic regression to classify deformation modes.</li>
</ol>
</div>

## Result and scope

The study detected four of six modes: X, distorted X, V, and V + Z + V. This describes mode coverage, not an accuracy percentage. It does not establish performance on other geometries or physical test data.

The method connects simulation, label construction and classification. Its result therefore needs to be interpreted within that pipeline’s representation choices and tested scope.

[Read the paper in International Journal of Protective Structures](https://doi.org/10.1177/20414196241281069), by Gaurav Singh, Rahul Singh Dhari and Zia Javanbakht.

[Back to the professional CV](/cv/)
