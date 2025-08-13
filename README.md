# ObodoFarm 🌾

**A Decentralized Cooperative Platform for African Smallholder Farmers**

[![Hackathon](https://img.shields.io/badge/Status-Hackathon%20MVP-orange)](https://github.com/obodofarm)
[![Blockchain](https://img.shields.io/badge/Blockchain-Avalanche%20Subnet-red)](https://www.avax.network/)
[![Platform](https://img.shields.io/badge/Platform-Mobile%20%7C%20USSD%20%7C%20Web-blue)](https://github.com/obodofarm)

> Empowering smallholder farmers through decentralized cooperation, shared resources, and transparent first-mile logistics.

## 🎯 Problem Statement

Smallholder farmers in Nigeria (and across Africa) face a triple bottleneck that limits their productivity and profitability:

1. **Low Production Capacity**: Farmers rely on harmful chemical inputs or slow manual organic production due to lack of tools, capital, and secure land access
2. **Post-Harvest Losses**: Poor pest management, inadequate feed, and lack of veterinary knowledge lead to significant crop spoilage and livestock deaths
3. **Broken First-Mile Logistics**: High transport costs, unreliable delivery, and no cost-sharing mechanisms prevent farmers from accessing profitable markets

**The Impact**: Despite having the skills, farmers remain trapped in low-yield, low-income cycles while missing out on formal finance opportunities.

## 💡 Solution

ObodoFarm is a **Farmer Cooperative-as-a-Service** platform that digitizes trust, aggregates supply, and unlocks working capital through:

- **On-chain governance** for transparent decision-making
- **Tokenized pre-sales** and provenance tracking
- **Offline-first access** via USSD and field agents
- **Shared logistics network** ("Uber for Farm Produce")

### Core Features

#### 🤝 Production Boost Layer

- **Resource Pooling**: Cooperative funds provide shared equipment, organic inputs, and seeds
- **Democratic Proposals**: On-chain voting system for funding requests
- **Knowledge Hub**: Best practices for organic farming and livestock management

#### 🚛 First-Mile Logistics Network

- **Shared Transport**: GPS-tracked rides with cost-sharing among farmers
- **Route Optimization**: Match farmers with available drivers/vehicles
- **Payment Escrow**: Automated payment release upon delivery confirmation

#### 💰 Financial Infrastructure

- **F-Credit Scoring**: Alternative credit assessment using farming data
- **Tokenized Futures**: Pre-sale harvest tokens for buyer guarantees
- **Transparent Lending**: Community-backed microcredit with on-chain tracking

## 🏗️ Architecture

### Blockchain Infrastructure

- **Primary Network**: ObodoFarm Avalanche Subnet
- **Smart Contracts**: Solidity-based contracts for governance, payments, and tokenization
- **Testnet**: Deployed on Avalanche Fuji for development and testing

### Technology Stack

- **Backend**: Node.js/FastAPI + PostgreSQL
- **Frontend**: React (mobile-responsive)
- **Mobile Access**: USSD integration via Africa'sTalking
- **Messaging**: SMS integration for AI advisory and alerts
- **Storage**: IPFS for metadata and receipts

### Accessibility

- **USSD Support**: Works on feature phones (\*347# shortcode)
- **Local Languages**: Multi-language support starting with Nigerian languages
- **Offline-First**: Field agents enable participation in low-connectivity areas

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 16.0.0
PostgreSQL >= 12
Avalanche CLI
Foundry (for smart contracts)
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/obodofarm/platform
cd obodofarm-platform
```

2. **Install dependencies**

```bash
npm install
cd contracts && forge install
```

3. **Set up environment variables**

```bash
cp .env.example .env
# Configure your Avalanche subnet RPC, Africa'sTalking API keys, etc.
```

4. **Deploy smart contracts**

```bash
cd contracts
forge script script/Deploy.s.sol --rpc-url $OBODOFARM_SUBNET_RPC --broadcast
```

5. **Start the application**

```bash
npm run dev
```

### USSD Testing

Dial `*347*1#` on your mobile device to test the onboarding flow.

## 📱 Demo Flow

### For Farmers

1. **Onboard** via USSD (`*347*1#`) or mobile app
2. **Create Profile** (name, farm size, crop/livestock type)
3. **Submit Proposals** for tools, inputs, or transport needs
4. **Vote** on community proposals using F-Credit weight
5. **Book Transport** and track deliveries
6. **Receive** AI-powered farming tips via SMS

### For Drivers/Logistics Partners

1. **Register** as transport provider
2. **Accept** transport requests from farmers
3. **Track** deliveries via GPS
4. **Receive** automatic payment upon completion

### For Buyers/Investors

1. **Browse** farmer profiles and upcoming harvests
2. **Purchase** tokenized harvest futures
3. **Track** provenance and delivery
4. **Invest** in cooperative lending pools

## 💼 Business Model

### Revenue Streams

- **Marketplace Commission**: 2-5% of gross merchandise value (GMV)
- **Logistics Fees**: Transport facilitation and GPS tracking
- **Microloan Interest**: Spread on community-backed lending
- **Storage Fees**: Warehouse receipt and inventory management
- **Data & SaaS**: Subscription fees from agribusinesses for verified farm data
- **Carbon Credits**: Revenue from verified organic farming practices

### Unit Economics (Conservative Scenario)

- 100,000 farmers × $150 annual GMV = $15M total GMV
- 3% commission = $450K annual revenue
- Plus lending, logistics, and data revenue streams

## 📊 Key Performance Indicators

### Hackathon Demo Metrics

- ✅ **Farmer Signups**: USSD onboarding completions
- ✅ **On-Chain Votes**: Testnet transactions recorded
- ✅ **Smart Contract Execution**: Profit-share distributions
- ✅ **Marketplace Activity**: Pre-sale token minting
- ✅ **AI Advisory**: SMS tips delivered

### Production KPIs

- Gross Merchandise Value (GMV)
- Monthly Active Farmers (MAU)
- Transport cost reduction %
- Loan default rates
- Average revenue per farmer
- Customer acquisition cost (CAC)

## 🌍 Market Opportunity

### Target Market

- **Primary**: Smallholder farmers in Nigeria (10M+ farmers)
- **Secondary**: Livestock keepers and rural cooperatives
- **Expansion**: West Africa, then continent-wide

### Market Size

- **TAM**: $90B agricultural financing gap in Africa
- **SAM**: $15B Nigerian agricultural market
- **SOM**: 2M smallholder farmers accessible via mobile/USSD

## 🤝 Partnerships

### Current Integration Partners

- **Africa'sTalking**: USSD and SMS infrastructure
- **Local Cooperatives**: Community trust and adoption
- **Transport Providers**: Last-mile delivery network

### Seeking Partners

- Agricultural extension officers
- Commodity buyers and processors
- Warehouse and storage providers
- Impact investors and development finance

## 📋 Roadmap

### Phase 1: MVP (Hackathon - 7 Days) ✅

- [x] USSD onboarding system
- [x] Basic DAO governance (proposals + voting)
- [x] Smart contract deployment on ObodoFarm subnet
- [x] Logistics booking mockup
- [x] AI advisory SMS integration

### Phase 2: Pilot (3 Months)

- [ ] Deploy in 1 Local Government Area (LGA)
- [ ] Onboard 2,000 farmers
- [ ] Establish transport network
- [ ] Begin microcredit operations

### Phase 3: Scale (6-12 Months)

- [ ] Expand to 5 LGAs
- [ ] Add livestock management features
- [ ] Integrate carbon credit marketplace
- [ ] Launch farmer insurance products

## 🔒 Security & Compliance

### Regulatory Approach

- **Legal Structure**: Registered cooperative framework in Nigeria
- **KYC/AML**: Phone-based identity with community attestations
- **Token Classification**: Utility tokens and warehouse receipts (not securities)
- **Data Protection**: GDPR-compliant data handling

### Technical Security

- **Smart Contract Auditing**: OpenZeppelin-based contracts
- **Multi-sig Governance**: Community treasury management
- **Privacy**: Zero-knowledge proofs for sensitive farmer data

## 🏆 Competitive Advantage

### Differentiation from Existing Solutions

- **vs. One Acre Fund**: Decentralized governance vs. top-down approach
- **vs. AFEX**: Direct farmer ownership vs. corporate platform
- **vs. Babban Gona**: Tokenized transparency vs. traditional cooperative
- **vs. Other Fintechs**: Agricultural focus with logistics integration

### Key Differentiators

1. **True Farmer Ownership**: DAO governance with F-Credit weighted voting
2. **Integrated Logistics**: Production + first-mile delivery in one platform
3. **Offline Accessibility**: USSD works on any mobile phone
4. **Transparent Finance**: On-chain loan tracking and profit sharing

## 👥 Contributing

We welcome contributions from developers, agricultural experts, and community organizers!

### Development Setup

```bash
# Fork the repository
git clone https://github.com/yourusername/obodofarm
cd obodofarm

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and test
npm test

# Submit pull request
```

### Community Guidelines

- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)
- Check existing [Issues](https://github.com/obodofarm/platform/issues)
- Join our [Discord](https://discord.gg/obodofarm) for discussions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

### Team

- **Product Lead**: [@teamlead](https://twitter.com/teamlead)
- **Technical Lead**: [@techguru](https://twitter.com/techguru)
- **Field Operations**: [@fieldops](https://twitter.com/fieldops)

### Community

- 🐦 **Twitter**: [@ObodoFarmAfrica](https://twitter.com/ObodoFarmAfrica)
- 💬 **Discord**: [Join our community](https://discord.gg/obodofarm)
- 📧 **Email**: hello@obodofarm.org
- 🌐 **Website**: [obodofarm.org](https://obodofarm.org)

### Support

- 📖 **Documentation**: [docs.obodofarm.org](https://docs.obodofarm.org)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/obodofarm/platform/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/obodofarm/platform/discussions)

---

**Built with ❤️ for African farmers | Powered by Avalanche Subnet Technology**

> _"Connecting farmers to prosperity, one harvest at a time."_
