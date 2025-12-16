# Replit.md

## Overview

This is a Node.js utility library project focused on mathematical, statistical, and AI-related operations. The repository contains custom helper libraries for common programming tasks, mathematical computations (permutations, combinations, sequences), statistical analysis (mean, median, mode, regression), and integrations with generative AI services (OpenAI, Claude, Google Gemini). There's also an incomplete neural network implementation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Core Design Pattern
The project follows a **modular utility library pattern** where functionality is split across specialized files:

- **silly-libs.js** - Core utilities (logging, type checking, object merging, data transformation)
- **silly-math-libs.js** - Mathematical functions (permutations, combinations, factorial, summation/product operators)
- **silly-statistics-libs.js** - Statistical functions (min, max, mean, median, mode, sampling)
- **NN.js** - Neural network implementation (incomplete, uses Matrix class for weights/biases)

### Code Style Conventions
- Uses destructured imports from local modules
- Greek symbols used for mathematical notation (Σ for sum, Π for product, π for pi)
- Custom logging functions (clog, dlog) wrap console.log with additional features
- Null is aliased as `ø` for brevity

### Neural Network Architecture
The NN.js file implements a basic feedforward neural network with:
- Input → Hidden → Output layer structure
- Sigmoid activation function
- Matrix-based weight and bias storage
- Note: Depends on an external Matrix class that is not included in the repository

### Entry Point
- **index.js** serves as the main entry point and demonstration file
- Most code is commented out, suggesting it's used for experimentation

## External Dependencies

### AI/ML Services
- **@anthropic-ai/sdk** (v0.24.1) - Claude AI integration
- **@google/generative-ai** (v0.1.3) - Google Gemini integration  
- **openai** (v4.52.0) - OpenAI GPT integration

### Data & HTTP
- **axios** (v1.6.7) - HTTP client for API requests
- **cheerio** (v1.0.0-rc.12) - HTML parsing/web scraping
- **node-fetch** (v3.2.6) - Fetch API polyfill for Node.js

### Analysis
- **regression** (v2.0.1) - Statistical regression analysis library

### Type Definitions
- **@types/node** (v18.0.6) - TypeScript definitions for Node.js (used for IDE support)