---
title: ReRide
date: 2019-12-30T00:00:00.000Z
id: 2-08
root: 2
slug: reride
---
<img src="/assets/images/2019/reride-new.jpg"/>

_Cover_

This project is a continuation of the original ReRide design experiment started by [Dr.Naveen Bagalkot](/notes/dr-naveen-bagalkot/) and Suraj Baadkar at Srishti Institute of Art, Design & Technology, Bangalore, in collaboration with Tomas Sokoler at the Digital Design Department at the IT University of Copenhagen.

The motorcycle could soon be the new frontier for the exploration of human interaction with advanced digital technology. In this paper we present a demo of a system designed and implemented as platform exploring the design of personal informatics tools for motorbike commuting and help us conduct in-situ evaluation of such tools. We present the system architecture and demonstrate the capabilities of the system by presenting a case instantiation in the form of an interactive soft-and- hardware prototype that collects rider’s posture data, visualizes the data on the motorbike dashboard in real-time, and pushes the data to the cloud server for later retrieval. (Excerpt from the demo paper we submitted for Interact 2017 conference)

_2019 iteration._ Building on what we learned in 2017, the team worked on a more stable platform and on figuring out which data points actually mattered for estimating posture. That pushed us toward camera systems as a way to capture posture data. The 2019 build used an 8 MP NoIR camera with an RPi Zero, which could pick out markers placed on the rider's helmet and body and work out the coordinates of the head and shoulders. From those coordinates we could read proximity and orientation, and get a decent picture of the rider's posture. The architecture this time was built for modularity and fast prototyping, so we could change the system quickly as we went.

_2017 iteration._ The 2017 prototype gave riders real-time feedback on their posture and riding. Sensor points on the rider's body and on the bike captured posture, lean angles, and general performance; the data was processed live and shown on the motorbike dashboard as glanceable feedback, so a rider could check themselves on the move. It was also sent to a remote server for storage, so riders could look back over a ride afterwards. We demonstrated and evaluated it at the Interact 2017 conference at IIT Bombay.

_Technical challenges._ The first demonstration ran into several problems. The main one was the Genuino board, which couldn't handle simultaneous BLE connections from multiple sensors; that caused trouble in the visualisation app, with mistimed handshakes and connection latency. The board also couldn't hold a continuous power supply for long, which undercut the BLE polling. We also needed better sensor placement to get more accurate posture data, and set out to fix all of this in later iterations.

_Camera system challenges._ The camera approach to posture estimation showed promise but leaned on face recognition, which was a real problem in live conditions on busy Indian roads and heavy traffic. Even so, we kept exploring whether a camera-only system could estimate posture in real time.

_Fixing the tech stack._ Choosing a technology stack for a moving prototype was hard. To keep things compatible, easy to collaborate on, and flexible, we settled on a consistent framework with fewer dependencies, and kept the codebase well documented so it would be easier to build on and scale later.

ReRide is a research project building a platform for motorcycle riders to work with their own data before, during, and after a commute. The prototype gathers and visualises posture data in real time and stores it for later analysis. The aim is to push on how people interact with digital technology while commuting by motorbike, and what that could mean for rider experience, safety, and performance. We've been inviting the personal informatics and HCI communities to take part.
