---
tags: post
deck: academic
title: "[Draft] AATP Demo"
showTitle: true
date: 2024-10-07
layout: post.njk
description: 
keywords: 
permalink: /journal/aatp-demo/
--- 
 
### Project Overview
This project aims to enhance Australia's agricultural traceability initiatives to improve food security, safety, and agility. The primary goal is to design and implement a prototype of the Australian Agricultural Traceability Protocol (AATP)-enabled Agri Food Product Passport [1]. This prototype will utilize Decentralized Identity (DI) based W3C verifiable credentials and Decentralized Identifiers, leveraging open-source tools. The system will demonstrate the capability to issue and verify product credentials, establish a DI wallet, and create a verifiable data registry (VDR). Ultimately, this project seeks to ensure food security, safety, and agility through a product passport system with conformity credentials and traceability for specific products or batch identifiers.

### Setup VON Network
```
git clone https://github.com/bcgov/von-network
```


PORTS="8080:8080 8000:8000 9000:9000" \
scripts/run_docker start — wallet-type indy \
   --endpoint http://127.0.0.1:8040 \
   --label aatp.farmer.agent \
   --inbound-transport http 0.0.0.0 8040 \
   --outbound-transport http \
   --admin 0.0.0.0 8041 \
   --admin-insecure-mode \
   --wallet-type askar \
   --wallet-name aatp.farmer.agent.wallet \
   --wallet-key aatp.farmer.agent.key \
   --preserve-exchange-records \
   --auto-provision \
   --genesis-url http://170.64.169.233:9000/genesis \
   --trace-target log \
   --trace-tag acapy.events \
   --trace-label aatp.farmer.agent.trace \
   --auto-ping-connection \
   --auto-respond-credential-proposal \
   --auto-respond-credential-offer \
   --auto-respond-credential-request

### Setting up agents

```
GENESIS_FILE=http://170.64.169.233/genesis DEFAULT_POSTGRES=true python3 -m runners.faber --port 8020
```

#### Farmer Agent

- Role: Credential issuer (for agricultural produce details).
- Use Case: The farmer is responsible for issuing verifiable credentials about their agricultural products (e.g., type, quantity, harvest date). They can also receive credentials (e.g., work certification).
- Responsibilities:
  - Create and manage Decentralized Identifiers (DIDs) for themselves.
  - Issue verifiable credentials about produce.
  - Store their credentials (e.g., certifications or training).

#### Supplier/Distributor Agent

- Role: Credential verifier and holder.
- Use Case: The supplier verifies the farmer’s credentials (agricultural produce) and holds the credentials. They can also issue credentials downstream, such as logistics credentials related to packaging or transport.
- Responsibilities:
  - Verify credentials issued by the farmer.
  - Store verified credentials.
  - Optionally, issue credentials about the product’s transportation, packaging, or quality.

#### Consumer Agent

- Role: Credential verifier.
- Use Case: Consumers verify the authenticity of the product they purchase. They use credentials issued by both farmers and suppliers to ensure the product’s provenance and quality.
- Responsibilities:
  - Verify the entire chain of credentials issued by the farmer and supplier.
  - Check if the product meets expected standards (e.g., organic certification).

#### Regulatory Body Agent

- Role: Credential issuer and verifier.
- Use Case: The regulatory body ensures compliance with agricultural laws and standards. They issue verifiable credentials to farmers or suppliers certifying that their products meet specific regulations.
- Responsibilities:
  - Issue certifications (e.g., organic certifications, compliance with regulations).
  - Verify the credentials issued by farmers and suppliers to ensure compliance.

#### Retailer Agent

- Role: Credential verifier and holder.
- Use Case: The retailer verifies the credentials of products received from suppliers before selling them to consumers. They may also hold credentials for their inventory.
- Responsibilities:
  - Verify that the credentials received from suppliers and farmers are valid.
  - Optionally, hold or issue credentials about the product’s condition or inventory.

#### Logistics Agent

- Role: Credential issuer and verifier.
- Use Case: Logistics providers may issue verifiable credentials related to the transport and storage conditions of agricultural produce (e.g., temperature control, delivery dates).
- Responsibilities:
  - Issue credentials about the status and transport conditions of goods (e.g., transport time, storage conditions).
  - Verify credentials from the supplier or other logistics providers upstream.

#### End-Product Manufacturer Agent

- Role: Credential verifier and issuer.
- Use Case: Manufacturers that use the agricultural produce to create a final product (e.g., food processing companies) may verify the chain of credentials from the farmer and issue their own credentials for the final product.
- Responsibilities:
  - Verify credentials from the farmer and suppliers.
  - Issue credentials for processed or final products.

#### Verifiable Credential Consumer Wallet (Holder Agent)

- Role: Credential holder.
- Use Case: Individuals (consumers, farmers, etc.) can hold their verifiable credentials in a secure wallet. For example, a farmer might hold their certifications, while a consumer might hold the verified product credential.
- Responsibilities:
  - Store all verifiable credentials (e.g., in a Bifold or compatible wallet).
  - Provide credentials when required (e.g., when interacting with a verifier).

#### Verifier Agent

- Role: Credential verifier (can be a general agent).
- Use Case: A generalized agent can be set up to verify credentials as needed across the system, acting as an independent verifier for audits, inspections, or compliance checks.
- Responsibilities:
  - Request and verify credentials from any entity (farmer, supplier, retailer, etc.).
  - Store verified credentials and provide attestation when needed.

### Appendix 1: Definitions and Acronyms

###### Definitions
- **Australian Agricultural Traceability Protocol (AATP)**: A protocol aimed at enhancing food security, safety, and agility in Australia's agricultural sector through traceability.
- **Decentralized Identity (DI)**: A system of identity management that utilizes decentralized identifiers (DIDs) and verifiable credentials for secure and privacy-preserving data sharing.
- **Verifiable Data Registry (VDR)**: A registry used to store and verify product credentials, ensuring data integrity and traceability.
- **W3C Verifiable Credentials**: Standards developed by the World Wide Web Consortium (W3C) for issuing and verifying credentials in a decentralized manner.
- **Agri Food Product Passport**: A digital passport that includes traceability information, sustainability credentials, and conformity certifications for agricultural products.
- **Generative AI**: Artificial intelligence techniques that generate data, such as creating dummy data for credentials in this context.
- **Role-Based Access Control (RBAC)**: A method of regulating access to computer or network resources based on the roles of individual users within an organization.
- **ISO 22005**: An international standard for traceability in the food and feed chain, ensuring the transparency and safety of products.
- **JSON, XML, CSV**: Common data formats used for data exchange and interoperability among different systems.

###### Acronyms
- **AATP**: Australian Agricultural Traceability Protocol
- **DI**: Decentralized Identity
- **VDR**: Verifiable Data Registry
- **W3C**: World Wide Web Consortium
- **ICT**: Information and Communication Technology

---

1. Veritas Digital & Anonyome Labs. (2024). Project overview and client information: Enhancing agricultural traceability initiatives. AATP Project Brief.
2. Gaurav Singh, Arpita Dhar, Prathap Reddy K, Sheikh Ashik Rahman Elahi, Jins Albi, Albin John. (2024). Team overview and roles. AATP Project Documentation.
3. Hyperledger. (2020). Aries Cloud Agent Python: Identity management with decentralized protocols. Hyperledger Documentation. https://github.com/hyperledger/aries-cloudagent-python
4. World Wide Web Consortium (W3C). (2021). Verifiable data registries in decentralized ecosystems. W3C Standards Documentation. https://www.w3.org/TR/vc-data-model/
5. Hardt, D. (2012). The OAuth 2.0 authorization framework. Internet Engineering Task Force (IETF). https://tools.ietf.org/html/rfc6749
6. Sandhu, R., Coyne, E., Feinstein, H., & Youman, C. (1996). Role-based access control models. IEEE Computer, 29(2), 38-47. https://doi.org/10.1109/2.485845