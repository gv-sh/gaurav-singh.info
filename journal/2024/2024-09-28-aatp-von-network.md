---
tags: post
deck: academic
title: "[Draft] Setting up VON network"
showTitle: true
date: 2024-10-14
layout: post.njk
description: 
keywords: 
permalink: /journal/aatp-von-network/
--- 

The VON Network is a decentralized identity network that enables organizations to issue and verify cryptographically secure credentials using the Hyperledger Indy framework. It supports privacy-preserving, self-sovereign identity management, primarily for organizational use cases [1]. 

Run the following commands on a Ubuntu 20.04 (LTS) x64 server instance to setup the VON Network.

```
sudo apt update
sudo apt upgrade
```
```bash 
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

```bash
docker login
```

```bash
sudo docker run hello-world
```

```bash
apt install unzip
curl -L https://github.com/bcgov/von-network/archive/main.zip > bcovrin.zip && \
    unzip bcovrin.zip && \
    cd von-network-main && \
    chmod a+w ./server/
```

```bash
./manage build
```

```bash
./manage start 170.64.157.197 WEB_SERVER_HOST_PORT=80 "LEDGER_INSTANCE_NAME=AATP_Ledger" REGISTER_NEW_DIDS=True &
```

The VON Network will be running on port 80 and can be accessed at [http://170.64.236.3](http://170.64.236.3).

```
./manage logs
```
---

1. Hu, S. Y., Chen, J. F., & Chen, T. H. (2006). VON: a scalable peer-to-peer network for virtual environments. IEEE Network, 20(4), 22-31.