# 🔗 Sync

> **One chat experience. Multiple ways to connect.**

**Sync** is a long-term communication platform designed to evolve from a traditional internet-based real-time messaging application into an offline-capable and decentralized communication system.

The core idea is simple:

> **The way a message travels can change. The messaging experience shouldn't.**

---

# 🎯 Vision

Most messaging applications depend on internet connectivity and centralized servers.

Sync explores a different approach.

The application will gradually support multiple communication modes:

```text
┌────────────────────────────┐
│    Communication Mode      │
├────────────────────────────┤
│ 🌍 Internet                │
│ 📡 Local Network           │
│ 🤝 Peer-to-Peer            │
│ 🕸 Mesh Network             │
└────────────────────────────┘
```

Users interact with the same messaging interface regardless of the underlying communication method.

The project will be developed incrementally. Each phase introduces a new networking model while preserving the core messaging experience.

---

# 🗺 Project Roadmap

## 🌍 Phase 1 — Internet Communication

**Status:** 🚧 Current Phase

### Goal

Build a production-quality real-time messaging application using a traditional client-server architecture.

This phase establishes the application's foundation before experimenting with decentralized communication.

### Core Features

* User registration and authentication
* User profiles
* One-to-one conversations
* Group conversations
* Real-time messaging
* Online/offline presence
* Typing indicators
* Message delivery/read status
* Image and file sharing
* Message search
* Notifications
* Responsive interface

### Initial Technology Stack

**Frontend**

* React
* JavaScript/TypeScript
* Tailwind CSS

**Backend**

* Node.js
* Express

**Database**

* MongoDB

**Real-Time Communication**

* Socket.IO

**Authentication**

* JWT

> The technology stack may evolve when there is a clear engineering reason to change it.

### Engineering Concepts

# Phase 1 focuses on:

* Client-server architecture
* REST API design
* WebSockets
* Authentication
* Authorization
* Database modelling
* Real-time event handling
* State management
* Error handling
* Security fundamentals
* Deployment
* Clean code and project architecture

---

# 📡 Phase 2 — Local Network Communication

**Status:** 🔒 Future

### Goal

Allow devices connected to the same local network to communicate without requiring internet access.

```text
             Wi-Fi Router
                 │
       ┌─────────┼─────────┐
       │         │         │
    Device A  Device B  Device C

          Internet ❌
      Local Communication ✅
```

### Topics to Explore

* TCP/IP
* TCP and UDP sockets
* LAN communication
* Local device discovery
* Network addressing
* Connection management
* Message delivery without cloud infrastructure

---

# 🤝 Phase 3 — Peer-to-Peer Communication

**Status:** 🔒 Future

### Goal

Enable devices to communicate directly without depending on a traditional internet server.

```text
Device A  ←────────→  Device B
```

Potential technologies and approaches may include:

* Wi-Fi Direct
* Bluetooth
* WebRTC
* Peer-to-peer networking protocols

### Topics to Explore

* Peer discovery
* Direct connections
* Connection negotiation
* NAT traversal
* Data synchronization
* Offline message handling
* Device-to-device communication

The exact implementation will be researched when this phase begins.

---

# 🕸 Phase 4 — Mesh Communication

**Status:** 🔒 Future

### Goal

Explore decentralized communication where participating devices can relay messages for one another.

Example network:

```text
A ───── B ───── C ───── D
```

If **A** cannot communicate directly with **D**, another device may relay the message:

```text
A → B → C → D
```

The long-term objective is communication without requiring a central messaging server.

### Topics to Explore

* Mesh networking
* Multi-hop communication
* Routing algorithms
* Distributed systems
* Network topology
* Fault tolerance
* Node discovery
* Duplicate-message prevention
* Message propagation
* Network partitions

This is an experimental long-term phase and its architecture will be designed only after the previous networking models are understood.

---

# 🏗 Architectural Principle

One of Sync's most important long-term design goals is to **separate the messaging experience from the mechanism used to transport messages.**

Conceptually, the application should be able to request:

```text
sendMessage(message)
```

without the messaging interface needing to understand whether the message travels through:

```text
Internet Transport
        │
Local Network Transport
        │
Peer-to-Peer Transport
        │
Mesh Transport
```

Conceptually:

```text
                  ┌──────────────────┐
                  │    Sync UI       │
                  └────────┬─────────┘
                           │
                     Messaging Layer
                           │
                  ┌────────▼─────────┐
                  │ Transport Layer  │
                  └────────┬─────────┘
                           │
          ┌────────────────┼─────────────────┐
          │                │                 │
       Internet           LAN               P2P
                                             │
                                            Mesh
```

The exact architecture will evolve as the project develops rather than being prematurely fixed.

---

# 🔐 Security

Security will become increasingly important as Sync evolves.

Areas to explore include:

* Secure authentication
* Authorization
* Secure message transport
* End-to-end encryption
* Key management
* Device identity
* Message integrity
* Abuse prevention

End-to-end encryption is intentionally **not part of the initial implementation**. It will be introduced only after the underlying messaging system is stable and its security requirements are properly understood.

---

# 🚀 Future Capabilities

These features are intentionally outside the initial scope and may be introduced later.

* Voice messages
* Message reactions
* Reply/forward messages
* Voice calls
* Video calls
* Screen sharing
* End-to-end encryption
* Offline message queues
* Multi-device synchronization
* Push notifications
* Advanced file sharing
* Message backup and recovery

Features will be added based on learning value and architectural fit rather than simply attempting to replicate every feature of existing messaging applications.

---

# 📚 What I Want to Learn

Sync is primarily an **engineering learning project**.

Through its different stages, the project aims to explore:

### Software Engineering

* Full-stack application development
* API design
* Software architecture
* Database design
* Testing
* Deployment
* Maintainable codebases

### Real-Time Systems

* WebSockets
* Event-driven architecture
* Presence systems
* Real-time synchronization

### Computer Networks

* TCP/IP
* UDP
* Socket programming
* LAN communication
* Peer-to-peer networking
* Network discovery
* Routing

### Distributed Systems

* Decentralized communication
* Fault tolerance
* Message propagation
* Synchronization
* Network partitions

### Security

* Authentication
* Authorization
* Encryption
* Identity
* Secure communication

---

# 📌 Development Principles

Sync will follow several rules throughout development.

### 1. Build Incrementally

Each communication model is its own milestone.

```text
Internet
   ↓
Local Network
   ↓
Peer-to-Peer
   ↓
Mesh
```

A phase does not need to begin until the previous phase is stable enough.

### 2. Understand Before Implementing

Every major technology or architectural decision should be understood before being added.

### 3. AI Is a Mentor, Not the Developer

AI may be used for:

* Understanding concepts
* Discussing architecture
* Debugging
* Reviewing code
* Comparing approaches
* Research guidance

The implementation and engineering decisions should remain understood and owned by the developer.

### 4. Avoid Feature Creep

A feature should not be added simply because another messaging application has it.

It should contribute to:

* the core communication experience,
* engineering learning,
* or the long-term architecture.

### 5. Architecture Can Evolve

Early architectural decisions are not assumed to be perfect.

Refactoring is part of the project.

### 6. Quality Over Feature Count

Five well-engineered features are more valuable than twenty partially implemented ones.

---

# 🚧 Current Scope

Development currently focuses **only on Phase 1**.

```text
                    SYNC

Phase 1     Internet Messaging       🚧 CURRENT
Phase 2     Local Network            🔒 FUTURE
Phase 3     Peer-to-Peer             🔒 FUTURE
Phase 4     Mesh Network             🔒 FUTURE
```

The later phases define the direction of the project, but they should **not distract from completing the current phase.**

---

# 🏁 Long-Term Goal

Sync begins as a conventional real-time messaging application.

Over time, the goal is to progressively remove infrastructure dependencies:

```text
Central Server
      ↓
Internet removed
      ↓
Local Network
      ↓
Router dependency reduced
      ↓
Direct Peer Communication
      ↓
Multi-Hop Communication
      ↓
Decentralized Network
```

The final objective is to explore how a single communication platform can operate across **centralized, local, peer-to-peer, and decentralized networking models** while maintaining a consistent user experience.

---

## Sync

**One interface. Multiple networks. Communication that adapts.**
* MongoDB
* Socket.IO
* JWT

### Concepts

* Authentication
* Authorization
* REST APIs
* WebSockets
* Database Design
* Deployment
* Clean Architecture

---

## Phase 2 — Local Network Communication

**Goal**

Allow users on the **same Wi-Fi network** to communicate without internet access.

### Learn

* TCP/IP
* UDP
* Socket Programming
* Local Network Discovery
* LAN Communication

---

## Phase 3 — Peer-to-Peer Communication

**Goal**

Remove the need for a Wi-Fi router.

Devices communicate directly.

### Possible Technologies

* Wi-Fi Direct
* Bluetooth
* Peer-to-Peer Networking

### Learn

* Peer Discovery
* Connection Management
* Synchronization
* Device-to-Device Communication

---

## Phase 4 — Mesh Networking

**Goal**

Create a decentralized messaging system.

Every device acts as a relay.

Example:

```
A ---- B ---- C ---- D

Message

A → B → C → D
```

No internet.

No central server.

### Learn

* Distributed Systems
* Routing Algorithms
* Fault Tolerance
* Network Topologies
* Mesh Networking

---

# 🏗 Architecture Goal

The UI should never know **how** messages are delivered.

It should simply call:

```
sendMessage(message)
```

Internally, the application decides which transport layer to use.

```
InternetTransport

LocalNetworkTransport

PeerTransport

MeshTransport
```

This allows new communication methods to be added without changing the user interface.

---

# 🚀 Future Enhancements

* Voice Messages
* Voice Calls
* Video Calls
* End-to-End Encryption
* Message Reactions
* File Sharing
* Offline Message Queue
* Multiple Device Sync
* Push Notifications
* Screen Sharing

---

# 📚 Learning Goals

This project is not just about building a chat application.

It is about learning:

* Full-Stack Development
* Computer Networks
* Distributed Systems
* System Design
* Software Architecture
* Scalability
* Real-Time Communication
* Security

---

# 💡 Future Project Ideas

## DSA Operating System

An operating-system-inspired learning platform for Data Structures & Algorithms.

Possible Features

* Desktop Interface
* Terminal
* Interactive Visualizers
* Notes
* Progress Tracking
* AI Assistant
* Coding Workspace

**Status:** Planned after gaining more production development experience.

---

# 📌 Development Rules

* Build everything from scratch.
* Understand every line of code.
* Use AI as a mentor, not as a code generator.
* Focus on engineering decisions, not just finishing features.
* Complete one phase before starting the next.

---

# 🎯 Final Goal

Build a communication platform that can evolve from a traditional cloud-based messaging app into a decentralized, offline-capable communication system while keeping the same user experience.

This project is a long-term engineering journey, not just a clone of an existing application.
