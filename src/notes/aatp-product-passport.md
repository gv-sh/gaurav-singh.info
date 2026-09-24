---
title: "AATP: building an agricultural traceability demonstrator"
slug: aatp-product-passport
date: 2026-09-24
description: "A 2024 master’s project at Griffith University, supervised by the team at Anonyome Labs."
kind: project
---

I led software development and built the complete demonstrator, using the Australian Agriculture Traceability Protocol (AATP) and existing decentralised identity infrastructure. The application connected credential issuance with a product-trace view, making the protocol tangible through a working software workflow.

## The problem

A product’s history spans several participants and events: who produced it, how it was certified, when it was packaged and how it was transported. A traceability application needs to connect those records while preserving their individual meaning. The [AATP framework](https://www.agtraceaus.com.au/aatp) provides the broader protocol context for this project.

## Architecture and contribution

I built the application software around Python/Flask, ACA-Py agents and VON Network, integrating digital identity wallets with agricultural credential schemas. Web and command-line interfaces exposed the underlying operations.

<div class="case-architecture" role="group" aria-label="Demonstrator architecture">
<ol>
<li>Web forms and a command-line interface collect schema, connection and credential inputs.</li>
<li>Python application modules send requests to the ACA-Py-compatible agent API and return results to the interfaces.</li>
<li>The agent handles identity and credential exchange with a digital wallet; the VON Network/Indy ledger supports the identity infrastructure.</li>
<li>The trace view retrieves credential records and selects those associated with a product identifier.</li>
</ol>
</div>

The software covered schema creation, credential definitions, invitations and connections, credential issuance and retrieval, and product tracing. The schemas represented users, producers, products, certification, packaging, transportation and other supply-chain roles and events.

## An implementation decision: trace by product identifier

The trace view extracts attributes from credential records and filters them using the product ID. That connects product, packaging and transportation records through a shared identifier while keeping the stages as distinct credentials. The interface can then present the records associated with a particular product.

This makes consistent identifiers and schema fields part of the application’s behaviour, rather than simply documentation. A credential record needs to carry the expected product identifier to appear in that trace.

## Integration work

The development environment crossed macOS, Ubuntu, virtual machines and Docker. My troubleshooting record documents Indy/OpenSSL compatibility problems, agent startup configuration, container name resolution, port forwarding and access to ledger genesis transactions.

I worked through these by checking agent and container logs, configuring compatible dependencies and transport options, and checking service startup order and network bindings. The application’s identity workflow depended on those components being able to communicate.

## Demonstrated workflow and evaluation

The project demonstration followed a producer connecting a wallet, receiving credentials, registering a product, adding packaging and transport records, and retrieving its trace. The delivered software included both the credential operations and the trace interface.

The repository also contains mocked unit tests for credential-definition retrieval, creation and issuance. Those tests exercise API-wrapper behaviour; they are separate from a live agent-and-wallet demonstration.

The deliverable was a master’s software demonstrator. Production deployment, independent security certification and nationwide adoption are outside the results claimed here.

[Back to the professional CV](/cv/)
