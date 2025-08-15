# ObodoFarm 🌾

**A Decentralized Cooperative Platform for African Smallholder Farmers**

[![Hackathon](https://img.shields.io/badge/Status-MVP%20Hackathon-orange)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Avalanche](https://img.shields.io/badge/Blockchain-Avalanche%20Subnet-red)](https://www.avax.network/)

## 🎯 Problem Statement

Smallholder farmers and livestock keepers in Nigeria face a triple bottleneck:

1. **Low Production Capacity**: Reliance on harmful chemicals or slow manual organic production due to lack of tools, capital, and secure land access
2. **Post-Harvest Losses**: Pests, poor feed management, and limited veterinary knowledge leading to crop spoilage and livestock deaths
3. **Broken First-Mile Logistics**: Expensive, slow, unreliable transport from farm to market with no cost-sharing mechanisms

## 💡 Solution

ObodoFarm is a **Farmer Cooperative-as-a-Service** that digitizes trust, aggregates supply, and unlocks working capital for smallholders through:

- **On-chain governance** for transparent cooperative decision-making
- **Tokenized pre-sales** and provenance tracking
- **Offline-first access** via USSD + mobile app for feature phones
- **Shared logistics network** ("Uber for Small Farm Produce")
- **AI-powered advisory** via SMS for farming best practices

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js (React-based, mobile-responsive)
- **Backend**: Express.js with MongoDB
- **Blockchain**: Avalanche Subnet (ObodoFarm Subnet)
- **Smart Contracts**: Avalanche Starter Kit (Solidity + OpenZeppelin)
- **Mobile Integration**: Africa's Talking (USSD + SMS)
- **AI Advisory**: Weather API + template-based crop tips

### System Components

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Blockchain    │
│   (Next.js)     │◄──►│  (Express.js)   │◄──►│ (Avalanche Sub) │
│                 │    │   (MongoDB)     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       ▲                       ▲
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   USSD/SMS      │    │   AI Advisory   │    │ Smart Contracts │
│ (Africa'sTalk)  │    │  (Weather API)  │    │ (Governance)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 MVP Features (Hackathon Scope)

### Core Functionality

1. **📱 Mobile/USSD Onboarding**

   - Local language support (English, Pidgin, Hausa, Igbo, Yoruba)
   - Basic farmer profile (name, farm size, crop type)
   - Feature phone compatibility

2. **🏦 F-Credit Identity System**

   - Alternative data credit scoring
   - Community-based trust scoring
   - Reputation tracking

3. **🗳️ DAO Governance Lite**

   - Proposal creation and voting UI
   - On-chain vote recording
   - Transparent fund allocation

4. **💰 Smart Contract Integration**

   - Profit-sharing contracts
   - Automated fund distribution
   - Escrow for logistics payments

5. **🛒 Marketplace & Tokenization**

   - Crop listing interface
   - Tokenized harvest futures (ERC-721)
   - Pre-sale buyer commitments

6. **🚛 Logistics Network**

   - Transport slot booking
   - GPS tracking simulation
   - Cost-sharing mechanisms

7. **🤖 AI Farming Advisor**
   - Weather-based crop tips
   - SMS notifications
   - Pest control guidance

## 📋 Installation & Setup

### Prerequisites

- Node.js 18+
- MongoDB 6.0+
- Avalanche CLI
- Africa's Talking API credentials

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/obodofarm.git
cd obodofarm
```

### 2. Smart Contracts Setup

```bash
cd contracts
npm install

# Initialize Avalanche subnet
avalanche subnet create obodofarm-subnet
avalanche subnet deploy obodofarm-subnet

# Deploy contracts
npm run deploy:testnet
```

### 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env

# Configure environment variables
# MONGODB_URI=mongodb://localhost:27017/obodofarm
# AVALANCHE_RPC_URL=your_subnet_rpc_url
# AFRICAS_TALKING_API_KEY=your_api_key
# WEATHER_API_KEY=your_weather_api_key

npm run dev
```

### 4. Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local

# Configure Next.js environment variables
# NEXT_PUBLIC_API_URL=http://localhost:3001
# NEXT_PUBLIC_CHAIN_ID=your_subnet_chain_id

npm run dev
```

## 🌟 Demo Script (5 Minutes)

### For Hackathon Judges

1. **Hook (30s)**: "Nigeria loses 40% of harvests post-production. Farmers earn 60% less due to middlemen."

2. **Onboarding Demo (45s)**:

   - Dial `*123*456#` → Create farmer profile → Show F-Credit score

3. **Governance Proof (45s)**:

   - Create cooperative proposal for ₦50,000 farm inputs
   - Cast votes → Display blockchain transaction hash

4. **Finance Demo (45s)**:

   - Simulate pooled funding → Execute profit-share contract
   - Show automated fund distribution on-chain

5. **Marketplace (30s)**:

   - List 1 tonne of cassava → Buyer pre-purchase
   - Mint tokenized harvest future

6. **AI Advisory (30s)**:

   - Display SMS: "Rain expected. Apply organic neem oil for pest control."

7. **Ask (15s)**: "We need pilot partners and warehouse connections."

## 💼 Business Model

### Revenue Streams

- **Transaction Fees**: 2-5% marketplace commission
- **Logistics Fees**: 10% of transport cost
- **Microloan Interest**: 15-20% APR spread
- **Storage Fees**: Warehouse receipt services
- **Data Services**: Farm-level analytics to agribusinesses
- **Carbon Credits**: Verified organic farming practices

### Conservative Projections

- 1,000 farmers (Hackathon pilot)
- Average GMV per farmer: $150/year
- Platform commission: 3%
- **Total Revenue**: ~$4,500 (pilot phase)

_Scale target: 100,000 farmers = $450,000 annual commission revenue_

## 📊 Key Performance Indicators

- **Gross Merchandise Value (GMV)**
- **Monthly Active Farmers**
- **Average Revenue Per User (ARPU)**
- **Loan Default Rate**
- **Transport Cost Reduction %**
- **Post-Harvest Loss Reduction %**

## 🚧 Development Roadmap

### Phase 1 (Hackathon - 7 Days)

- [ ] USSD onboarding flow
- [ ] Basic DAO voting mechanism
- [ ] Smart contract deployment
- [ ] Marketplace MVP
- [ ] SMS integration

### Phase 2 (Post-Hackathon - 3 Months)

- [ ] Pilot with 1,000 farmers in 1 LGA
- [ ] Advanced logistics tracking
- [ ] Mobile app (offline-first)
- [ ] Partnership integrations

### Phase 3 (Scale - 12 Months)

- [ ] Multi-state deployment
- [ ] Advanced AI advisory
- [ ] Carbon credit integration
- [ ] Institutional investor onboarding

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### Development Team Roles

- **Product Lead**: User research, feature prioritization
- **Smart Contract Dev**: Solidity, Avalanche integration
- **Frontend Dev**: Next.js, mobile-responsive UI
- **Backend Dev**: Express.js APIs, database design
- **Mobile Integrator**: USSD/SMS, Africa's Talking

## 🔒 Security & Compliance

- Community-based KYC for farmer verification
- Legal cooperative structure for regulatory compliance
- Smart contract audits planned for mainnet deployment
- GDPR-compliant data handling

## 📞 Contact & Support

- **Email**: --
- **Twitter**: --
- **Telegram**: --

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Nigeria's Ministry of Agriculture
- Local cooperative unions
- Avalanche Foundation
- Africa's Talking API
- Hackathon organizing committee

---

_Building the future of African agriculture, one farmer at a time._ 🌱
