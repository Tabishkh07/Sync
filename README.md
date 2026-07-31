# 🌐 Relay (Working Title)

> **A modular communication platform that evolves from a cloud-based chat application into a fully decentralized messaging system.**

---

# 🎯 Vision

Instead of building four separate projects, build **one application** that supports multiple communication methods.

The user chooses **how messages travel**, while the chat experience remains the same.

```
┌─────────────────────┐
│ Choose Communication│
├─────────────────────┤
│ 🌍 Internet         │
│ 📡 Local Network    │
│ 🤝 Peer-to-Peer     │
│ 🕸 Mesh Network      │
└─────────────────────┘
```

The UI stays the same.

Only the communication layer changes.

---

# 🗺 Roadmap

## Phase 1 — Internet Communication ✅

**Goal**

Build a production-grade real-time chat application.

### Features

* User Authentication
* User Profiles
* One-to-One Chat
* Group Chat
* Online/Offline Status
* Typing Indicator
* Read Receipts
* Image & File Sharing
* Search Messages
* Notifications
* Responsive UI

### Technologies

* React
* Node.js
* Express
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
