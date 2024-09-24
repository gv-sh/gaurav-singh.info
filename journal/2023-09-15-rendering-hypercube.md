---
tags: post
deck: Math vis
title: "Rendering Hypercube"
showTitle: true
date: 2023-09-15
cover: /assets/sketches/sketch_hypercube.gif
layout: post.njk
description: The hypercube, or more commonly known as the tesseract, is a geometric marvel that exists in four-dimensional space. If you've ever been entranced by the tesseract scene in the movie "Interstellar", you've already had a cinematic glimpse of this concept. But how do we visualize a 4D object in our 3D world and then render it on a 2D screen?
keywords: Gaurav Singh, personal website, 2023, hypercube, tesseract, 4D object, 3D world, 2D screen, movie "Interstellar", geometric marvel, four-dimensional space, visualizing 4D, rendering 4D, computational geometry, data visualisation, machine learning, human-computer interaction, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, design, embodied self-monitoring, motorbike commuting, bike area network, modular platform, personal informatics, cloud-based platform, interactive prototype, situated memory, self-efficacy, well-being, senior citizens, digital technology, real-time data visualization, posture tracking, in-situ evaluation, user experience design, community engagement, ethical technology, interdisciplinary studies, technology innovation, educational technology, algorithmic design, interactive media
permalink: /journal/rendering-hypercube/
--- 

![Hypercube](/assets/sketches/sketch_hypercube.gif)
_Hypercube_

The hypercube, or more commonly known as the tesseract, is a geometry that exists in four-dimensional space. If you've ever been entranced by the tesseract scene in the movie "Interstellar", you've already had a cinematic glimpse of this concept. But how do we visualize a 4D object in our 3D world and then render it on a 2D screen?

Mathematically, a point on a line can be represented by a single number $x$, on a plane by a pair $(x, y)$, and in space by a triplet $(x, y, z)$. The fourth dimension is a bit trickier. Imagine a new axis, $w$, that's perpendicular to the other three. This gives us a 4D point represented as $(x, y, z, w)$. Just as a square is to a cube, a cube is to a hypercube. It's the 4D analog of our familiar 3D cube. If you've ever wondered how a cube would cast a shadow in 4D, it would look like a hypercube!

Each vertex of a hypercube in 4D space can be represented by a 4-bit binary number. Mathematically, a vertex in n-dimensional space can be represented as:

<p>$$ V = (b_1, b_2, ..., b_n) $$</p>

where each $b_i$ is a bit (0 or 1).

The relationship between vertices and edges in the hypercube is fascinating. Using combinatorics, we can determine that a hypercube has $2^4 = 16$ vertices and $4 \times 2^3 = 32$ edges.

_Projection_ is the mathematical principle of mapping points from a higher-dimensional space to a lower one. Think of how a 3D object casts a 2D shadow. That shadow is a projection! Visualizing a 4D object in 3D space is akin to understanding how a 3D object casts a 2D shadow. This involves "slicing" the 4D object in such a way that we can understand its structure in 3D.

In 4D space, we have hyperplanes like the XY and ZW planes. A point can be rotated around these planes using rotation matrices. Introducing the concept of hyperplanes in 4D, we can represent a rotation in the XY plane as:

<p>$$
\begin{bmatrix*}[r]
\cos(ax) & -\sin(ax) & 0 & 0 \\
\sin(ax) & \cos(ax) & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 
\end{bmatrix*}
$$</p>

After rotation, we need to give the illusion of depth. This is achieved using perspective projection. The mathematics of perspective division involves dividing by the fourth dimension, $w$, to achieve this effect:

<p>$$ \text{projected}[x,y,z] = \left[ \frac{pt[x]}{2 - pt[w]}, \frac{pt[y]}{2 - pt[w]}, \frac{pt[z]}{2 - pt[w]} \right] $$</p>

The final step involves understanding orthographic vs. perspective projection. In simple terms, it's about how we view the 3D object on our 2D screen.

Modern computer graphics handle this transformation using a series of matrix multiplications. The viewport transformation, for instance, ensures that the 3D object fits within the bounds of our screen, while the role of the camera determines from which angle we view the object.