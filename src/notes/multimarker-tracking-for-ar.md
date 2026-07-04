---
title: Multimarker tracking for AR
date: 2012-07-08T00:00:00.000Z
image: /assets/images/2012/multimarker.jpg
id: 2-07
root: 2
slug: multimarker-tracking-for-ar
---
<img src="/assets/images/2012/multimarker.jpg"/>

_ArUco markers_

The aim of this project was to track several coded markers at once, in real time, and to keep it accurate even in low light or when the markers were partly hidden. Existing single-object trackers didn't scale well as the number of objects grew, so I needed a more efficient approach. On top of tracking, the method had to compute each marker's position and orientation, so that 2D and 3D virtual objects could be pinned onto the video and you could interact with them by moving or covering the physical markers.

The method combined object detection with tracking, and I tested it on real footage. It held up under low light and partial occlusion, tracking several markers concurrently, and it let you interact with the virtual objects by partly or fully covering the real ones.

This was my undergraduate thesis project. Looking back, it leaned more on implementation than on the theory behind the algorithms, and it could have done more to think critically about the algorithms and their biases.
