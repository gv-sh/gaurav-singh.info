---
title: Primes
date: 2013-03-05
layout: base.njk
--- 

For as long as I remember, I always had a deep interest in prime numbers. And for that, this certainly makes the cut to be a notes post here. As I'm writing this post, I'm unsure about the tone and content of this notes in future, but would like it to not just have research notes but also about my first-hand experiences. Prime Numbers are the building blocks of the numbers and perhaps the processes of the Universe, as I like to think. They have special properties and some very profound applications in science and nature. However simple their definition may be, we still do not have a formula for it. I find the fundamental theorem of arithmetic [1] fairly straightforward and the fact that only primes can not be expressed as the product of other (positive natural) numbers, is a very intuitive implication that I think most would be able to understand.

Prime makes the composite numbers. But, what are primes made up of? Are prime numbers the result of how we framed the rules of Maths to be? Or did it always existed? Well whether or not if it is real, it has irrespectively awakened my curiosity to study it and perhaps define a formula. How can something that appears simple and yet not understood entirely? Aren't primes transcendental?

That being said, I'm sometimes put down by imagining the incredible literature available on the Prime numbers, which is already studied for more than 2000 years. The earliest surviving records of the explicit study of prime numbers come from ancient Greek mathematics [2]. Imagine what could be possibly appealing about these numbers for the ancient Greeks? What might have been their motivations? Euclid's Elements (c. 300 BC) proved the infinitude of primes and showed how to construct a perfect number from a Mersenne prime [3]. Pierre de Fermat (1640) stated Fermat's little theorem and investigated the primality of Fermat numbers [4]. Christian Goldbach (1742) formulated Goldbach's conjecture, that every even number is the sum of two primes [5]. Leonhard Euler (18th century) proved several important theorems related to primes, including Alhazen's conjecture and the divergence of the sum of the reciprocals of primes [3]. Bernhard Riemann (1859) outlined a proof for the conjecture that as $x$ tends to infinity, the number of primes up to x is asymptotic to $x/\log x$, which was completed by Hadamard and de la Vallée Poussin in 1896 as the prime number theorem [6].

'There are two facts about the distribution of prime numbers of which I hope to convince you so overwhelmingly that they will be permanently engraved in your hearts. The first is that, despite their simple definition and role as the building blocks of the natural numbers, the prime numbers grow like weeds among the natural numbers, seeming to obey no other law than that of chance, and nobody can predict where the next one will sprout. The second fact is even more astonishing, for it states just the opposite: that the prime numbers exhibit stunning regularity, that there are laws governing their behavior, and that they obey these laws with almost military precision'. — D. Zagier at a lecture (1975)

Intrinsically, I looked for the hidden visual model but never could able to get past any existing research. It is incredibly distracting as it appears to follow an unknown rule. Prime numbers have indisputably kept me occupied for a few years now. And with the computers we have now, it is probably going to be the very exciting era for mathematical research and a significant leap is not so far away.

I began looking at the sequence and what a fantastic puzzle this is! The distribution despite following a rule does not let us pinpoint the next occurrence of prime. Is Mathematics advance enough to write a solution? Or it will remain in the class of hard problems which cannot be otherwise solved by non-brute force approach.

'Mathematicians have tried in vain to this day to discover some order in the sequence of prime numbers, and we have reason to believe that it is a mystery into which the mind will never penetrate'. — Euler

A prime number is a positive integer $p>1$ that has no positive integer divisors other than $1$ and $p$ itself. And a method for determining whether a number is prime or not is called as Primality Test.

<p>
$$ \mathbb{P} = { x \in \mathbb{Z}{+} \text{ s.t } x \neq a \times b \text{ | } a,b > 1 \in \mathbb{Z}{+} } $$
</p>

While it's quite simple to identify small prime numbers, the problem appears when number grow large as it then needs to be checked far more times to decide its primality. To start with, trial division is the simplest method to test primality where given number is checked for its divisibility by numbers smaller than itself. function

Lets consider function $\omega(x)$ which represents the number of distinct prime factors of $x$, which can be defined as: $$ x = \prod{i=1}^{\omega(x)} p{i}^{\alpha\_{i}} $$

With this, set $\mathbb{P}$ can be now rewritten as (for the sake of understanding the implementation): 

<p>
$$
\mathbb{P} = { x \in \mathbb{Z}{+} \text{ s.t } \omega(x) = 2 \text{ | } x = \prod{i=1}^{\omega(x)} p{i}^{\alpha{i}} } $$
</p>

This can be implemented (in Python) to write primality test as:

```python
def omega(x):
    distinct_factors = 0
    for i in range(x):
        if x%i == 0:
            distinct_factors += 1
    return distinct_factors
```

```python
def is_prime(x):
    if x == 1:
        return False
    if omega(x)==2:
        return True
    return False
```

This is of course not efficient. The algorithm takes at least x steps to conclude primality. The omega(x) keeps counting the distinct\_factors even after exceeding 2, which is not necessary because it already means that the given number is COMPOSITE. To remove those extra steps, we can rewrite the definition of P where we no longer count the ω(x) but check if x is divisible by all the positive integers more than 1 and lesser than x. In fact, the definition will still build the same set but only be implemented in a different way.

```python
def is_prime(x):
    if x == 1:
        return False
    for i in range(2,x):
        if x%i == 0:
            return False
    return True
```

Now by removing 1 and going only till x-1, we can conclude as soon as we find any number perfectly dividing the x, without actually keeping track of factor count.

The implementation will now have a much lesser running time.

```python
def is_prime(x):
    if x == 1:
        return False
    for i in range(2,x):
        if x%i == 0:
            return False
    return True
```

My coding style is largely influenced and driven by mathematics and in my opinion, this makes it much easier to implement. In future, I wish to write and create artifacts for illustrating the parallels largely between mathematics and coding for - demystifying coding for math enthusiasts and exercise coding to improve myself.

Prime numbers have a wide range of applications, including cryptography, random number generation, and factorization. They are used in widely-used encryption algorithms such as RSA [7], Diffie-Hellman [8], and Elliptic Curve Cryptography [9]. They are also important for generating random numbers, as their unpredictability and randomness make them ideal for generating random numbers in algorithms such as Blum-Blum-Shub [10] and Mersenne Twister [11]. In factorization, prime numbers are used to break down larger composite numbers into their prime factors, which is important for cryptographic key generation and other applications. Prime numbers may also have significance in nature and the universe, with patterns in the distribution of natural resources, biological systems, and energy and matter distribution potentially being linked to the properties of prime numbers.

---

1. Gauss, Carl Friedrich (1986), Disquisitiones Arithemeticae (Second, corrected edition), translated by Clarke, Arthur A., New York: Springer, ISBN 978-0-387-96254-2
2. Gillings, R. J. ‘The Recto of the Rhind Mathematical Papyrus How Did the Ancient Egyptian Scribe Prepare It?’ Archive for History of Exact Sciences 12, no. 4 (August 1974): 291–98. doi: [10.1007/BF01307175](https://doi.org/10.1007/BF01307175)
3. Stillwell, John. Mathematics and Its History. 3rd ed. Undergraduate Texts in Mathematics. New York: Springer, 2010.
4. Sandifer, Charles Edward. How Euler Did It. Spectrum Series, v. 3. Washington, DC: Mathematical Association of America, 2007.
5. Wang, Yuan, ed. The Goldbach Conjecture. 2nd ed. Series in Pure Mathematics, v. 4. River Edge, NJ: World Scientific, 2002.
6. Bambah, R. P., V. C. Dumir, and R. J. Hans-Gill. Number Theory. Basel: Birkhäuser Verlag, 2000.
7. Rivest, R. L., A. Shamir, and L. Adleman. 'A Method for Obtaining Digital Signatures and Public-Key Cryptosystems.' Communications of the ACM 21, no. 2 (February 1978): 120–26. doi:[https://doi.org/10.1145/359340.359342](10.1007/BF01307175)
8. Merkle, Ralph C. 'Secure Communications over Insecure Channels.' Communications of the ACM 21, no. 4 (April 1978): 294–99. doi:[10.1145/359460.359473](https://doi.org/10.1145/359460.359473)
9. Koblitz, Neal. 'Elliptic Curve Cryptosystems.' Mathematics of Computation 48, no. 177 (1987): 203–9. doi:[10.1090/S0025-5718-1987-0866109-5](https://doi.org/10.1090/S0025-5718-1987-0866109-5)
10. Blum, L., M. Blum, and M. Shub. 'A Simple Unpredictable Pseudo-Random Number Generator.' SIAM Journal on Computing 15, no. 2 (May 1986): 364–83. doi:[10.1137/0215025](https://doi.org/10.1137/0215025)
11. Matsumoto, Makoto, and Takuji Nishimura. 'Mersenne Twister: A 623-Dimensionally Equidistributed Uniform Pseudo-Random Number Generator.' ACM Transactions on Modeling and Computer Simulation 8, no. 1 (January 1998): 3–30. doi:[10.1145/272991.272995](https://doi.org/10.1145/272991.272995)
12. Havil, Julian (2003), Gamma: Exploring Euler's Constant, Princeton University Press, ISBN 978–0–691–09983–5
13. Riesel Hans. Prime numbers and computer methods for factorization, 1994