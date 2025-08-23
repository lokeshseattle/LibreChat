---
description: Repository Information Overview
alwaysApply: true
---

# LibreChat Information

## Summary
LibreChat is an open-source chat platform that brings together multiple AI models in a ChatGPT-like interface. It supports various AI providers including OpenAI, Anthropic (Claude), AWS Bedrock, Google, Vertex AI, and custom endpoints. The platform offers features like code interpretation, web search, image generation, multimodal capabilities, and custom agents.

## Structure
- **api**: Backend server code built with Express.js
- **client**: Frontend React application
- **packages**: Shared libraries and modules
- **config**: Configuration scripts and utilities
- **e2e**: End-to-end testing with Playwright
- **docker**: Docker configuration files
- **helm**: Kubernetes Helm charts for deployment
- **utils**: Utility scripts and tools

## Language & Runtime
**Language**: JavaScript/TypeScript
**Version**: Node.js 20.x
**Build System**: npm/Vite
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- **Backend**: Express, Mongoose, Passport, OpenAI, Anthropic SDK, Google Generative AI
- **Frontend**: React, TanStack Query, Tailwind CSS, Radix UI, i18next
- **Database**: MongoDB, Meilisearch, PostgreSQL (with pgvector)
- **Tools**: Langchain, Model Context Protocol (MCP)

**Development Dependencies**:
- Jest, Playwright, ESLint, TypeScript, Prettier

## Build & Installation
```bash
# Install dependencies
npm ci

# Build frontend
npm run frontend

# Run backend
npm run backend

# Development mode
npm run frontend:dev
npm run backend:dev
```

## Docker
**Dockerfile**: Dockerfile, Dockerfile.multi
**Image**: ghcr.io/danny-avila/librechat-dev:latest
**Configuration**: docker-compose.yml with MongoDB, Meilisearch, and RAG API services

## Testing
**Framework**: Jest (unit tests), Playwright (e2e tests)
**Test Location**: 
- Unit tests: api/tests, client/src/tests
- E2E tests: e2e/specs
**Run Command**:
```bash
# Unit tests
npm run test:api
npm run test:client

# E2E tests
npm run e2e
```

## Main Features
- Multi-model AI chat interface
- Code interpreter with multiple language support
- Custom agents and tools integration
- Web search capabilities
- Image generation and editing
- Conversation management with presets
- Multimodal file interactions
- Multilingual UI support
- Authentication with various providers