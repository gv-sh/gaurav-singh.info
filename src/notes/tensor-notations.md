---
title: Tensor calculus notation
date: 2023-11-11T00:00:00.000Z
id: 3-27
root: 3
slug: tensor-notations
---
Tensor calculus extends linear algebra into higher dimensions. It deals with tensors, mathematical objects that generalise scalars and vectors. A scalar is a rank-0 tensor, a single number like temperature or mass. A tensor, more generally, is a multi-dimensional array where each element is picked out by a set of indices, and it can hold more complex structure and relationships. These notes summarise the key ideas of tensor notation from _Continuum Mechanics and Thermodynamics_ by Tadmor and others [^1].

Tensor calculus goes back to mathematicians like Gregorio Ricci-Curbastro and his student Tullio Levi-Civita [^2]. Their work gave later theories in physics and engineering, continuum mechanics included, the tools they needed. I'm revising it now for my own studies in continuum mechanics, so it's worth getting these basics down.

Tensors are what you need to analyse the stress, strain, and deformation of materials under load, which is much of continuum mechanics. This note is a refresher and an archive as I go deeper into the maths.

The _rank_ or order of a tensor is basic to all of this: it is the number of indices you need to describe it. Scalars have rank 0, simple quantities with no direction. Vectors are rank 1, with magnitude and direction. Matrices are rank-2 tensors, two-dimensional grids of numbers.

_Direct notation_, or invariant notation, writes a tensor in a general form, such as $T$ for something that could be anything from a scalar field to a multi-dimensional dataset. It is handy when the individual components aren't the point and you just want a compact way to write equations and operations.

$$
\boldsymbol{\sigma} \quad \text{or} \quad \underline{\sigma}
$$

_Indicial notation_, on the other hand, specifies each index of a tensor and is essential for detailed component analysis. For example, the stress tensor in continuum mechanics, represented as $\sigma_{ij}$, uses indicial notation to describe the internal forces within a material where $i$ and $j$ represent the respective plane and direction.

$$
\begin{bmatrix} \mathbf{\sigma} \end{bmatrix} = \begin{bmatrix}
    \sigma_{11} & \sigma_{12} & \sigma_{13} \\
    \sigma_{21} & \sigma_{22} & \sigma_{23} \\
    \sigma_{31} & \sigma_{32} & \sigma_{33}
\end{bmatrix}
$$

In tensor operations, the _summation convention_ introduced by Einstein is a key concept, simplifying the notation of tensor equations by implying a sum over repeated indices. When an index variable appears twice in a single term, it indicates summation over that index. For instance, consider the tensor equation for the inner product of two vectors $a_i$ and $b_i$:

$$
a_i b_i = \sum_{i=1}^3 a_i b_i
$$

Here, the repeated index $i$ is summed over, meaning that we add together the products of the corresponding components of vectors $a$ and $b$. In this example, $i$ is a _dummy index_ because it is used for the summation and does not appear in the final result. If we were to write out the summation for a 3-dimensional space explicitly, it would look like this:

$$
a_i b_i = a_1 b_1 + a_2 b_2 + a_3 b_3
$$

This convention greatly reduces the notational complexity, especially when dealing with higher-rank tensors and more complex operations. The indices that are not summed over are the _free indices_, and they appear in the final expression, marking the components of the resulting tensor. The summation convention keeps the notation compact, which helps a lot with the messier equations in physics, engineering, and machine learning.

Rank-2 tensors, or matrices, are the most common tensors used in machine learning, and they are often represented using the Einstein summation convention. For example, the matrix-vector product of a matrix $A_{ij}$ and a vector $x_j$ can be written as:

$$
y_i = A_{ij} x_j
$$

Here, the index $j$ is summed over, and the resulting vector $y_i$ is the product of the matrix $A_{ij}$ and the vector $x_j$. The summation convention is also used to represent the matrix-matrix product of two matrices $A_{ij}$ and $B_{jk}$ as:

$$
C_{ik} = A_{ij} x_{j} = \begin{bmatrix}
    A_{11} & A_{12} & A_{13} \\
    A_{21} & A_{22} & A_{23} \\
    A_{31} & A_{32} & A_{33}
    \end{bmatrix} \begin{bmatrix} 
    x_1 \\
    x_2 \\
    x_3
    \end{bmatrix}
$$


The _Kronecker delta_, $\delta_{ij}$, is a simple yet powerful function used throughout tensor calculus and is defined as:

$$
\delta_{ij} = 
\begin{cases} 
0 & \text{if } i \neq j, \\
1 & \text{if } i = j.
\end{cases}
$$

It appears naturally in the identity matrix of linear algebra, where $I_{ij} = \delta_{ij}$, and serves a role in simplifying tensor equations and in operations like the inner product of vectors. Alternatively, _iverson brackets_ may be used to represent the Kronecker delta, as in:

$$
\delta_{ij} = [i = j]
$$

The _permutation symbol_, also known as the Levi-Civita symbol and denoted as $\epsilon_{ijk}$, is used to define the orientation of a set of vectors. In vector calculus, it is critical for describing the cross product of vectors, as in the equation:

$$
[v \times w]_i = \epsilon_{ijk} v_j w_k.
$$

The permutation symbol is defined as:

$$
\varepsilon_{ijk} = 
\begin{cases}
1 & \text{if } i, j, k \text{ form an even permutation of } 1, 2, 3, \\
-1 & \text{if } i, j, k \text{ form an odd permutation of } 1, 2, 3, \\
0 & \text{if } i, j, k \text{ do not form a permutation of } 1, 2, 3.
\end{cases}
$$

An even permutation is one that can be obtained by swapping two elements an even number of times, and an odd permutation is one that can be obtained by swapping two elements an odd number of times. The permutation symbol is also used to define the determinant of a matrix, as in:

$$
\det(A) = \varepsilon_{ijk} A_{1i} A_{2j} A_{3k}
$$

This symbol also appears in the field of ML, particularly in algorithms that involve multi-dimensional array manipulations.

Once the notation is second nature, tensor calculus itself becomes usable, and it's what you need to model complex systems in physics, engineering, and ML. Its structure is clean and precise, which is a good part of why it holds up across such different problems.

--- 
[^1]: Tadmor, Ellad B., et al. Continuum Mechanics and Thermodynamics: From Fundamental Concepts to Governing Equations. Cambridge University Press, 2012.

[^2]: Ricci, M. M. G., and T. Levi-Civita. ‘Méthodes de calcul différentiel absolu et leurs applications’. Mathematische Annalen, vol. 54, no. 1–2, Mar. 1900, pp. 125–201. DOI.org (Crossref), [https://doi.org/10.1007/BF01454201](https://doi.org/10.1007/BF01454201).
