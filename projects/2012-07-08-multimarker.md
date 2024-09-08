---
tags: post
title: Interactive multimarker tracking and AR in low light or partially obstruction
showTitle: true
date: 2012-07-08
deck: Computer vision
cover: /assets/images/2012/multimarker.jpg
layout: post.njk
description: The primary aim of this project was to develop a method capable of tracking multiple coded markers simultaneously, robustly, and accurately in real-time, particularly in challenging conditions such as low light or partially obstructed images. Existing single object tracking methods faced limitations in scaling with the number of objects, necessitating a more efficient approach to handle multiple markers. Additionally, the project sought to compute the locations and orientations of these markers to embed 2D/3D virtual objects onto the video sequence and enable interaction with the markers/virtual objects in the physical setting.
permalink: /projects/interactive-multimarker-tracking-and-ar-in-low-light-or-partially-obstruction/
--- 

<img src="/assets/images/2012/multimarker.jpg"/>

_ArUco markers_
 
The primary aim of this project was to develop a method capable of tracking multiple coded markers simultaneously, robustly, and accurately in real-time, particularly in challenging conditions such as low light or partially obstructed images. Existing single object tracking methods faced limitations in scaling with the number of objects, necessitating a more efficient approach to handle multiple markers. Additionally, the project sought to compute the locations and orientations of these markers to embed 2D/3D virtual objects onto the video sequence and enable interaction with the markers/virtual objects in the physical setting.

The proposed method combined object detection and tracking techniques to effectively manage multiple coded marker tracking in real-time. This approach was demonstrated on several real sequences, highlighting its capability to track multiple markers concurrently under various conditions, including low light and partial obstructions. The detected locations were used to compute the markers' positions and orientations, enabling the embedding of 2D/3D virtual objects onto the video sequence. The project also showcased the ability to interact with the markers/virtual objects by partially or fully obstructing the markers in the physical setting.

The new method that tracks multiple coded markers in real-time proved to be robust and accurate, which performed well in challenging conditions such as low light and partially obstructed images. By taking advantage of both object detection and tracking, the developed method demonstrated its potential for real-world applications requiring simultaneous tracking of multiple markers. The experiment effectively utilized the detected locations to compute the positions and orientations of the markers, enabling the integration of 2D/3D virtual objects onto the video sequence. The ability to interact with the markers/virtual objects in the physical setting, even with partial or full obstructions, showcased the versatility and practicality of the proposed method.

The study formed as thesis project for my undergraduate degree. In retrospect, the study focussed more on implementation than on the theoretical aspects of the algorithms, including a more critical understanding of algorithms and related biases.