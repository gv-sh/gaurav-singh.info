---
title: Harr-cascade based detection
date: 2011-05-10T00:00:00.000Z
image: /assets/images/2011/harr.jpg
id: 2-03
root: 2
slug: harr-cascade-based-detection
---
<img src="/assets/images/2011/harr.jpg"/>

_An example of early Haar-like features used by Viola and Jones in 2001 [^1], and tilted extensions proposed by Lienhart and Maydt [^5]._

The aim of this 2011 study was to build an efficient face detection system that could still find faces in hard conditions: low light, partial obstruction, and changing facial expressions. I used the Harr cascade mechanism [^1][^2] and the Adaboost algorithm [^3][^4], which hold up well under those conditions.
 
I looked closely at how the Harr cascade and Adaboost work and where they could be applied in face detection. The Harr cascade is a machine-learning approach where a cascade function, trained on positive and negative images, uses a series of simple features called Harr features to detect faces. The function runs in stages that discard non-facial regions, continuing until a face is found or the region is dismissed. Adaboost (Adaptive Boosting) works alongside it, combining weak classifiers into a strong one through ensemble learning. For face detection, Adaboost picks the most relevant Harr features and weights them, so the system focuses on the parts of the face that matter most and gets more accurate.

The study also drew a line between face detection and face recognition. Detection is about locating a face in an image or video frame; recognition is about identifying a specific person from their facial features. The two get conflated, and keeping them apart matters.

The work showed that learning-based face detection, using Harr cascade and Adaboost, could extend HCI systems past traditional input methods. It also flagged how much bias can creep into the way these systems are trained and built, which affects both fairness and accuracy, and how much room there still is to develop the approach further.

Looked at together, the project showed what learning-based detection can do while making clear that bias and the detection-versus-recognition distinction both need attention. Those were the insights I took from it toward more accurate and fairer face detection.

This was part of the pre-thesis project for my undergraduate degree. Looking back, it leaned more on implementation than on the theory behind the algorithms, and it could have done more to think critically about the algorithms and their biases.

[^1]: Viola, Paul, and Michael J. Jones. 'Robust Real-Time Face Detection'. International Journal of Computer Vision 57, no. 2 (May 2004): 137-54. doi:[10.1023/B:VISI.0000013087.49260.fb](https://doi.org/10.1023/B:VISI.0000013087.49260.fb)
[^2]: Lienhart, R., and J. Maydt. 'An Extended Set of Haar-like Features for Rapid Object Detection'. In Proceedings. International Conference on Image Processing, 1:I-900-I-903. Rochester, NY, USA: IEEE, 2002. doi:[10.1109/ICIP.2002.1038171](https://doi.org/10.1109/ICIP.2002.1038171)
[^3]: Freund, Yoav, and Robert E. Schapire. 'A Desicion-Theoretic Generalization of on-Line Learning and an Application to Boosting'. In Computational Learning Theory, edited by Paul Vitányi, 904:23-37. Berlin, Heidelberg: Springer Berlin Heidelberg, 1995. doi:[https://doi.org/10.1007/3-540-59119-2\_166](https://doi.org/10.1007/3-540-59119-2\_166)
[^4]: Hastie, Trevor, Saharon Rosset, Ji Zhu, and Hui Zou. 'Multi-Class AdaBoost'. Statistics and Its Interface 2, no. 3 (2009): 349-60. doi:[10.4310/SII.2009.v2.n3.a8](https://doi.org/10.4310/SII.2009.v2.n3.a8)
[^5]: Lienhart, R., and J. Maydt. 'An Extended Set of Haar-like Features for Rapid Object Detection'. In Proceedings. International Conference on Image Processing, 1:I-900-I–903. Rochester, NY, USA: IEEE, 2002. doi:[10.1109/ICIP.2002.1038171](https://doi.org/10.1109/ICIP.2002.1038171)
