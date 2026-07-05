---
title: Reading Shannon on information theory
date: 2011-11-03T00:00:00.000Z
id: 3-23
root: 3
slug: shannon
---
In 2008, in my first year of engineering, I got interested in memory-efficient data structures and algorithms. That, together with an earlier [interest in prime numbers](/notes/primes/), led me to information entropy, which I first read about in Claude Shannon's paper 'A Mathematical Theory of Communication.'[^1] Shannon was an American mathematician and electrical engineer, often called the 'father of information theory.' His work reshaped digital circuit design and communication theory. In the paper he introduced entropy as a measure of how much information a message carries, an idea a lot of modern technology was later built on. It also got me wanting to write compression algorithms of my own, something I still hope to get to one day. In this note I'll summarise the paper, look at its impact and its limits, and say why it still matters.

Shannon, C. E. 'A Mathematical Theory of Communication.' Bell System Technical Journal 27, no. 3 (July 1948): 379-423. doi:[10.1002/j.1538-7305.1948.tb01338.x](https://doi.org/10.1002/j.1538-7305.1948.tb01338.x)
 
Shannon published the paper in 1948. Most of the attention until then had gone to making communication channels more reliable; Shannon instead set out to quantify the information in a message itself. He introduced information entropy, a measure of the randomness or uncertainty of a message. Shannon's formula for entropy is $$ H(X) = - \\sum\_{x} p(x) \\log p(x),$$ where $p(x)$ is the probability distribution of possible messages. He also gave a method for encoding information for efficient transmission and storage, and introduced channel capacity, the maximum amount of information a channel can carry. He described redundancy, which sets how efficient a transmission is, and error-correcting codes, which let you detect and fix errors along the way. A lot of modern communication and digital circuit design still rests on this work.

His ideas turn up all over the place: in communication systems, in coding and compression algorithms, and in whole fields like information theory, coding theory, and signal processing. For me, the paper was the push to look into compression, which I still want to build something in. His idea of entropy made it clearer how much data can actually be compressed and stored, and it sent me reading about Huffman coding [^2], arithmetic coding [^3], and Lempel-Ziv-Welch coding [^4].

The work has its limits too, and I came across a few critiques, though I'm sorry to say I didn't keep the references. One is that Shannon's model assumes a noiseless channel, which real systems rarely are. Another asks whether the model accounts for the complexity and context-dependence of natural language.

[^1]: Shannon, C. E. 'A Mathematical Theory of Communication.' Bell System Technical Journal 27, no. 3 (July 1948): 379-423. doi:[10.1002/j.1538-7305.1948.tb01338.x](https://doi.org/10.1002/j.1538-7305.1948.tb01338.x)
[^2]: Huffman, David. 'A Method for the Construction of Minimum-Redundancy Codes.' Proceedings of the IRE 40, no. 9 (September 1952): 1098-1101. doi:[10.1109/JRPROC.1952.273898](https://doi.org/10.1109/JRPROC.1952.273898)
[^3]: Pasco, Richard Clark (May 1976). Source coding algorithms for fast data compression (PhD). Stanford Univ. CiteSeerX 10.1.1.121.3377
[^4]: Welch. 'A Technique for High-Performance Data Compression.' Computer 17, no. 6 (June 1984): 8-19. doi:[10.1109/MC.1984.1659158](https://doi.org/10.1109/MC.1984.1659158)
