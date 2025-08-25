# Dynamic Sales Intelligence Panel - WeWeb Component

A sophisticated sales intelligence component for the RACQ Solar Estimator that provides real-time, contextual guidance as customers fill out forms. Built specifically for WeWeb deployment.

![RACQ Solar Colors](https://img.shields.io/badge/RACQ-Yellow-%23FFE600) ![Vue.js](https://img.shields.io/badge/Vue.js-Component-4FC08D) ![WeWeb](https://img.shields.io/badge/WeWeb-Compatible-blue)

## 🎯 Overview

The Dynamic Sales Intelligence Panel transforms static form completion into an intelligent sales enablement experience by:

- **Progressive Intelligence**: Information builds as more customer data is collected
- **Contextual Insights**: Region-specific, bill-specific, and system-specific guidance
- **Real-time Updates**: Panel updates automatically as form fields change
- **Multi-Device Support**: Responsive design with special mobile positioning
- **AI Integration**: Optional AI-powered insights via API endpoint

## 🏗️ Component Structure

```
intelligence-panel/
├── package.json              # WeWeb package configuration
├── ww-config.js             # WeWeb component settings & events
├── src/
│   └── wwElement.vue        # Main Vue component
└── README.md                # This file
```

## ⚙️ WeWeb Configuration

### Properties

| Property | Type | Description | Bindable |
|----------|------|-------------|----------|
| `region` | Text | Customer's region/location | ✅ |
| `monthlyBill` | Text | Customer's monthly electricity bill range | ✅ |
| `systemType` | Text | Selected solar system type (pv_only, pv_battery, etc.) | ✅ |
| `energyUsage` | Text | Customer's energy usage patterns | ✅ |
| `futureNeeds` | Text | Future energy needs (EV, pool, etc.) | ✅ |
| `selectedPackage` | Object | Currently selected package details | ✅ |
| `intelligenceRules` | Object | Custom intelligence rules and data | ✅ |
| `aiEnabled` | Boolean | Enable AI-enhanced insights | ✅ |
| `apiEndpoint` | Text | AI API endpoint URL | ✅ |

### Events

| Event | Description | Payload |
|-------|-------------|---------|
| `intelligence:updated` | Fired when panel updates with new insights | `{hasInsights, confidence, insights}` |
| `panel:expanded` | Fired when panel is expanded/collapsed | `{isExpanded}` |
| `insights:copied` | Fired when insights are copied to clipboard | `{content}` |
| `ai:requested` | Fired when AI insights are requested | `{formData}` |

## 🎨 Visual Design

### RACQ Brand Colors
- **Primary Yellow**: `#FFE600` (panel headers, accents)
- **RACQ Blue**: `#003478` (text, confidence indicators)
- **Gradients**: Subtle gradients for modern appearance

### Responsive Layout
- **Desktop**: Right sidebar or inline positioning
- **Tablet**: Collapsible panel with expanded states
- **Mobile**: Fixed bottom panel with slide-up interaction

## 🧠 Intelligence Rules

The component includes built-in intelligence rules that can be customized:

### Default Regions
```javascript
{
  'SEQ': {
    message: 'Southeast Queensland enjoys premium solar conditions',
    stats: [
      { label: 'Peak Sun Hours', value: '5.2' },
      { label: 'Generation Boost', value: '+15%' }
    ],
    points: [/* talking points */]
  }
}
```

### Bill Ranges
```javascript
{
  '$100-$200': {
    message: 'The sweet spot for solar ROI',
    objection: 'Less than current monthly bill for complete daytime energy freedom',
    urgency: 'Electricity prices rising 8% annually - act now',
    points: [/* contextual points */]
  }
}
```

### System Combinations
```javascript
{
  'pv_battery_high': {
    competitive: 'Full energy independence possible - eliminate bills entirely'
  }
}
```

## 🔧 Usage in WeWeb

### 1. Add Component
1. Import component into WeWeb from this repository
2. Drag onto page where sales intelligence is needed
3. Configure properties in the component settings

### 2. Bind Form Data
```javascript
// Example WeWeb variable bindings
region: variables.customerRegion
monthlyBill: variables.billRange
systemType: variables.selectedSystemType
selectedPackage: variables.currentPackage
```

### 3. Listen to Events
```javascript
// Handle intelligence updates
onIntelligenceUpdated: (event) => {
  // Access insights: event.insights
  // Update other components based on confidence: event.confidence
}

// Handle panel interactions
onPanelExpanded: (event) => {
  // Track user engagement: event.isExpanded
}
```

## 🤖 AI Integration

### Enable AI Features
1. Set `aiEnabled` to `true`
2. Configure `apiEndpoint` to your AI service
3. Handle `ai:requested` events for custom processing

### Expected AI API Response
```javascript
{
  "primaryMessage": "Enhanced AI insight message",
  "talkingPoints": ["AI-generated point 1", "AI-generated point 2"],
  "competitiveIntel": "AI competitive advantage insight",
  "confidence": 95
}
```

## 📱 Responsive Behavior

### Desktop (>768px)
- Full sidebar or inline positioning
- All features visible simultaneously
- Hover effects and smooth transitions

### Tablet (768px-480px)
- Collapsible panel design
- Touch-friendly expand/collapse
- Optimized button layouts

### Mobile (<480px)
- Fixed bottom positioning
- Slide-up interaction
- Minimized teaser state
- Full-screen overlay when expanded

## 🎯 Key Features

### Progressive Intelligence
- **25% confidence**: Region selected
- **50% confidence**: Region + Monthly bill
- **75% confidence**: Region + Bill + System type  
- **100% confidence**: All form fields completed

### Content Sections
1. **Primary Message**: Main insight for current customer profile
2. **Key Statistics**: Important numbers and metrics
3. **Talking Points**: Bullet points for sales conversations
4. **Objection Handlers**: Responses to common hesitations
5. **Urgency Messages**: Time-sensitive motivators
6. **Competitive Intel**: Advantages over competitors

### Interactive Features
- **Copy All**: Copy formatted insights to clipboard
- **Refresh**: Manually refresh intelligence
- **AI Insights**: Request enhanced AI analysis
- **Expand/Collapse**: Control panel visibility

## 🚀 Deployment

### WeWeb Integration
1. **Repository**: Connect WeWeb to this GitHub repository
2. **Branch**: Always use `main` branch (per WeWeb guidelines)  
3. **Updates**: Push directly to main for automatic deployment
4. **Versioning**: Increment `package.json` version for updates

### Testing
```bash
# Local development (if using WeWeb CLI)
npm install
npm run serve

# Access at http://localhost:3000
```

## 🔧 Development

### Local Setup
1. Clone repository
2. Install WeWeb CLI: `npm install -g @weweb/cli`
3. Install dependencies: `npm install`
4. Start development server: `npm run serve`

### Making Changes
1. **Never use branches** - update main directly
2. Test changes locally before pushing
3. Increment version in `package.json`
4. Commit with descriptive message
5. Push to main branch

## 📈 Performance

### Optimizations
- **Debounced Updates**: 750ms delay on form field changes
- **Efficient Watchers**: Only watch bound properties
- **Lazy Loading**: AI insights loaded on demand
- **Minimal Renders**: Smart computed properties

### Bundle Size
- **Component**: ~23KB (including styles)
- **Dependencies**: None (uses Vue from WeWeb)
- **Load Time**: <100ms typical

## 🎨 Customization

### Override Intelligence Rules
```javascript
// Custom rules via WeWeb binding
intelligenceRules: {
  regions: {
    'CustomRegion': {
      message: 'Custom regional insight',
      stats: [/* custom stats */],
      points: [/* custom points */]
    }
  }
}
```

### Style Modifications
The component uses scoped CSS. To override:
```css
/* Global styles in WeWeb */
.intelligence-panel-container.has-insights {
  border-color: #your-color !important;
}
```

## 📊 Analytics & Events

### Tracking Opportunities
- Panel expansion rates
- Insight copy actions  
- AI request frequency
- Form completion correlation
- Confidence score distribution

### WeWeb Event Integration
All component events are compatible with WeWeb's workflow system for tracking and automation.

## 🛠️ Troubleshooting

### Common Issues

#### Component Not Appearing
- Verify repository connection in WeWeb
- Check main branch is selected
- Confirm package.json has correct WeWeb fields

#### Properties Not Updating  
- Ensure properties are properly bound in WeWeb
- Check variable names match exactly
- Verify data types match configuration

#### Events Not Firing
- Confirm event listeners are set up in WeWeb
- Check event names match exactly
- Verify payload structure handling

#### Mobile Layout Issues
- Test on actual devices, not just browser DevTools
- Verify viewport meta tag on page
- Check for conflicting fixed positioning

## 📚 Resources

- [WeWeb Documentation](https://docs.weweb.io/)
- [Vue.js Guide](https://vuejs.org/guide/)
- [RACQ Solar Brand Guidelines](internal)
- [Component Development Guide](https://github.com/GEMRACQSolar/racqsolar-documentation/blob/main/WEWEB_COMPONENT_DEVELOPMENT_GUIDE.md)

## 📝 License

Private - RACQ Solar / GEM Energy Australia

---

**Built with ❤️ for RACQ Solar**  
*Empowering sales conversations with intelligent insights*