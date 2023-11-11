---
tags: post
deck: Tensor Calculus
title: "Tensor notations"
showTitle: true
date: 2023-11-11
layout: post.njk
description: Tensor calculus is a branch of mathematics that extends the well-established principles of linear algebra in higher dimensions. In its essence, tensor calculus deals with tensors, which are mathematical objects that generalize the concepts of scalars and vectors to higher dimensions. Scalars are rank-0 tensors, representing simple quantitiesthat are described by a single number, such as temperature or mass. Tensors, on the other hand, can be thought of as multi-dimensional arrays, where each element is identified by a set of indices and can encapsulate more complex data structures and relationships. 

permalink: /journal/tensor-notations/
--- 

Tensor calculus is a branch of mathematics that extends the well-established principles of linear algebra in higher dimensions. In its essence, tensor calculus deals with tensors, which are mathematical objects that generalize the concepts of scalars and vectors to higher dimensions. Scalars are rank-0 tensors, representing simple quantities that are described by a single number, such as temperature or mass. Tensors, on the other hand, can be thought of as multi-dimensional arrays, where each element is identified by a set of indices and can encapsulate more complex data structures and relationships. 

The roots of tensor calculus are deeply embedded in the works of mathematicians such as Gregorio Ricci-Curbastro and his student Tullio Levi-Civita [1]. Their pioneering work provided the mathematical tools necessary for formulating theories that have shaped the landscape of modern physics and engineering disciplines, and to not forget, continuum mechanics. As I'm revising tensor calculus in the context of my studies in continuum mechanics, I find it important to learn these fundamental concepts.

Understanding tensors is essential for analyzing the stress, strain, and deformation of materials under various forces, a central theme in continuum mechanics. This note serves as a refresher and an archive as I go deeper into tensor maths.

The _rank_ or order of a tensor is foundational in tensor calculus, indicating the number of dimensions or indices required to describe it. Scalars are tensors of rank 0, representing simple quantities without direction. Vectors, tensors of rank 1, have both magnitude and direction, and matrices are rank-2 tensors, which can be visualized as two-dimensional grids of numbers.

When representing tensors, _direct notation_, or invariant notation is often used to denote a tensor in a generalized form, such as $T$ for a tensor that could represent anything from a scalar field to a multi-dimensional dataset. Direct notation is particularly beneficial when the specific components of the tensor are not the immediate focus, allowing for a concise representation of equations and operations.

$$
\boldsymbol{\sigma} \quad \text{or} \quad \underline{\sigma}
$$

_Indicial notation_, on the other hand, specifies each index of a tensor and is essential for detailed component analysis. For example, the stress tensor in continuum mechanics, represented as $\sigma_{ij}$, uses indicial notation to describe the internal forces within a material where $i$ and $j$ represent the respective plane and direction.

<p>
$$
\begin{bmatrix*} \mathbf{\sigma} \end{bmatrix*} = \begin{bmatrix*}
    \sigma_{11} & \sigma_{12} & \sigma_{13} \\
    \sigma_{21} & \sigma_{22} & \sigma_{23} \\
    \sigma_{31} & \sigma_{32} & \sigma_{33}
\end{bmatrix*}
$$
</p>

In tensor operations, the _summation convention_ introduced by Einstein is a key concept, simplifying the notation of tensor equations by implying a sum over repeated indices. When an index variable appears twice in a single term, it indicates summation over that index. For instance, consider the tensor equation for the inner product of two vectors $a_i$ and $b_i$:

$$
a_i b_i = \sum_{i=1}^3 a_i b_i
$$

Here, the repeated index $i$ is summed over, meaning that we add together the products of the corresponding components of vectors $a$ and $b$. In this example, $i$ is a _dummy index_ because it is used for the summation and does not appear in the final result. If we were to write out the summation for a 3-dimensional space explicitly, it would look like this:

$$
a_i b_i = a_1 b_1 + a_2 b_2 + a_3 b_3
$$

This convention greatly reduces the notational complexity, especially when dealing with higher-rank tensors and more complex operations. The indices that are not summed over are known as _free indices_, and they appear in the final expression, indicating the components of the resulting tensor. Through the Einstein summation convention, tensor calculus achieves notational efficiency, making it easier to work with the complex equations that arise in physics, engineering, and machine learning.

Rank-2 tensors, or matrices, are the most common tensors used in machine learning, and they are often represented using the Einstein summation convention. For example, the matrix-vector product of a matrix $A_{ij}$ and a vector $x_j$ can be written as:

<p>
$$
y_i = A_{ij} x_j
$$
</p>

Here, the index $j$ is summed over, and the resulting vector $y_i$ is the product of the matrix $A_{ij}$ and the vector $x_j$. The summation convention is also used to represent the matrix-matrix product of two matrices $A_{ij}$ and $B_{jk}$ as:

<p>
$$
C_{ik} = A_{ij} x_{j} = \begin{bmatrix*}
    A_{11} & A_{12} & A_{13} \\
    A_{21} & A_{22} & A_{23} \\
    A_{31} & A_{32} & A_{33}
    \end{bmatrix*} \begin{bmatrix*} 
    x_1 \\
    x_2 \\
    x_3
    \end{bmatrix*}
$$
</p>


The _Kronecker delta_, $\delta_{ij}$, is a simple yet powerful function used throughout tensor calculus and is defined as:

<p>
$$
\delta_{ij} = 
\begin{cases} 
0 & \text{if } i \neq j, \\
1 & \text{if } i = j.
\end{cases}
$$
</p>

It appears naturally in the identity matrix of linear algebra, where $I_{ij} = \delta_{ij}$, and serves a role in simplifying tensor equations and in operations like the inner product of vectors. Alternatively, _iverson brackets_ may be used to represent the Kronecker delta, as in:

<p>
$$
\delta_{ij} = [i = j]
$$
</p>

The _permutation symbol_, also known as the Levi-Civita symbol and denoted as $\epsilon_{ijk}$, is used to define the orientation of a set of vectors. In vector calculus, it is critical for describing the cross product of vectors, as in the equation:

<p>
$$
[v \times w]_i = \epsilon_{ijk} v_j w_k.
$$
</p>

The permutation symbol is defined as:

<p>
$$
\varepsilon_{ijk} = 
\begin{cases}
1 & \text{if } i, j, k \text{ form an even permutation of } 1, 2, 3, \\
-1 & \text{if } i, j, k \text{ form an odd permutation of } 1, 2, 3, \\
0 & \text{if } i, j, k \text{ do not form a permutation of } 1, 2, 3.
\end{cases}
$$
</p>

An even permutation is one that can be obtained by swapping two elements an even number of times, and an odd permutation is one that can be obtained by swapping two elements an odd number of times. The permutation symbol is also used to define the determinant of a matrix, as in:

<p>
$$
\det(A) = \varepsilon_{ijk} A_{1i} A_{2j} A_{3k}
$$
</p>

This symbol also appears in the field of ML, particularly in algorithms that involve multi-dimensional array manipulations.

Through a good understanding of tensor notations, one gains the ability to tensor calculus, which is essential for modeling complex systems in physics, engineering, and ML. Further, logical structure of tensor calculus, with its notational clarity and mathematical rigor, provides a strong foundation for analyzing and solving a wide range of problems in these advanced fields.

--- 

1. Ricci, M. M. G., and T. Levi-Civita. ‘Méthodes de calcul différentiel absolu et leurs applications’. Mathematische Annalen, vol. 54, no. 1–2, Mar. 1900, pp. 125–201. DOI.org (Crossref), https://doi.org/10.1007/BF01454201.
2. Tadmor, Ellad B., et al. Continuum Mechanics and Thermodynamics: From Fundamental Concepts to Governing Equations. Cambridge University Press, 2012.
