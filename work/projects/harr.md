---
title: Harr-cascade based detection
meta: 2011
date: 2011-05-10
image: /assets/images/2011/harr.jpg
layout: base.njk
--- 

<img src="/assets/images/2011/harr.jpg"/>

_An example of early Haar-like features used by Viola and Jones in 2001 [1], and tilted extensions proposed by Lienhart and Maydt [5]._

The primary aim of this 2011 study was to develop an efficient face detection system capable of accurately detecting faces in challenging conditions, such as low light, partial obstructions, and varying facial expressions. The study employed the Harr cascade mechanism [1, 2] and Adaboost algorithm [3, 4] for their robustness in face detection under complex conditions.
 
A thorough examination of the Harr cascade mechanism and Adaboost algorithm was conducted to understand their complexities and potential applications in face detection. The Harr cascade is a machine learning-based approach in which a cascade function, trained from positive and negative images, utilizes a series of simple features called Harr features to detect faces in images. This cascade function comprises multiple stages designed to discard non-facial regions, continuing until a possible face is detected or the region is dismissed as a non-face. The Adaboost (Adaptive Boosting) algorithm, employed in conjunction with the Harr cascade mechanism, enhances detection performance by combining weak classifiers into a strong classifier using ensemble learning. In the context of face detection, Adaboost selects the most relevant Harr features and assigns appropriate weights, enabling the system to focus on the most important aspects of the face and improving overall accuracy.

The study also focused on clarifying the distinction between face detection and face recognition. Face detection involves locating and identifying the presence of a face in an image or video frame, whereas face recognition identifies a specific individual based on their facial features. Understanding the nuances and differences between these two processes is essential.

The study demonstrated the potential of learning-based face detection systems, utilizing Harr cascade and Adaboost algorithms, for enhancing HCI systems beyond traditional input methods. It emphasized the importance of considering potential biases in the learning and implementation process of face detection systems to ensure equity and accuracy. The research highlighted the need for ongoing development in this area to create more equitable and accurate face detection systems.

The study on face detection using Harr cascade and Adaboost algorithms not only demonstrated the potential of learning-based face detection systems but also emphasized the importance of addressing biases and understanding the differences between face detection and face recognition. This research contributed valuable insights that could have been used towards development of more accurate and equitable face detection systems.

The study formed as a part of pre-thesis project for my undergraduate degree. In retrospect, the study focussed more on implementation than on the theoretical aspects of the algorithms, including a more critical understanding of algorithms and related biases.

1. Viola, Paul, and Michael J. Jones. 'Robust Real-Time Face Detection'. International Journal of Computer Vision 57, no. 2 (May 2004): 137-54. doi:[10.1023/B:VISI.0000013087.49260.fb](https://doi.org/10.1023/B:VISI.0000013087.49260.fb)
2. Lienhart, R., and J. Maydt. 'An Extended Set of Haar-like Features for Rapid Object Detection'. In Proceedings. International Conference on Image Processing, 1:I-900-I-903. Rochester, NY, USA: IEEE, 2002. doi:[10.1109/ICIP.2002.1038171](https://doi.org/10.1109/ICIP.2002.1038171)
3. Freund, Yoav, and Robert E. Schapire. 'A Desicion-Theoretic Generalization of on-Line Learning and an Application to Boosting'. In Computational Learning Theory, edited by Paul Vitányi, 904:23-37. Berlin, Heidelberg: Springer Berlin Heidelberg, 1995. doi:[https://doi.org/10.1007/3-540-59119-2\_166](https://doi.org/10.1007/3-540-59119-2\_166)
4. Hastie, Trevor, Saharon Rosset, Ji Zhu, and Hui Zou. 'Multi-Class AdaBoost'. Statistics and Its Interface 2, no. 3 (2009): 349-60. doi:[10.4310/SII.2009.v2.n3.a8](https://doi.org/10.4310/SII.2009.v2.n3.a8)
5. Lienhart, R., and J. Maydt. 'An Extended Set of Haar-like Features for Rapid Object Detection'. In Proceedings. International Conference on Image Processing, 1:I-900-I–903. Rochester, NY, USA: IEEE, 2002. doi:[10.1109/ICIP.2002.1038171](https://doi.org/10.1109/ICIP.2002.1038171)