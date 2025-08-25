<template>
  <div 
    class="intelligence-panel-container"
    :class="{ 
      'has-insights': hasInsights,
      'is-loading': isLoading,
      'is-expanded': isExpanded,
      'is-visible': isVisible
    }"
  >
    <!-- Panel Header - Always visible -->
    <div class="panel-header" @click="toggleExpanded">
      <div class="header-content">
        <div class="panel-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L12 3M12 21L12 22M4.22 4.22L4.93 4.93M19.07 19.07L19.78 19.78M2 12L3 12M21 12L22 12M4.22 19.78L4.93 19.07M19.07 4.93L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h3 class="panel-title">Sales Intelligence</h3>
        <button 
          @click.stop="toggleExpanded" 
          class="expand-toggle"
        >
          <svg :class="{ 'rotated': isExpanded }" width="16" height="16" viewBox="0 0 16 16">
            <path d="M8 10.5L3 5.5h10l-5 5z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      <div class="confidence-badge" v-if="confidence > 0 && hasInsights">
        <span class="confidence-value">{{ confidence }}%</span>
        <span class="confidence-label">match</span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="panel-loading">
      <div class="loading-pulse"></div>
      <span>Analyzing customer profile...</span>
    </div>

    <!-- Empty State -->
    <div v-if="!hasInsights && !isLoading && isExpanded" class="panel-empty">
      <p>Start filling out the form to see real-time sales intelligence</p>
    </div>

    <!-- Main Content -->
    <transition name="panel-fade">
      <div v-if="hasInsights && !isLoading && isExpanded" class="panel-content">
        
        <!-- Primary Message -->
        <div class="primary-message" v-if="primaryMessage">
          <p>{{ primaryMessage }}</p>
        </div>

        <!-- Key Statistics -->
        <div class="insight-section key-stats" v-if="keyStats && keyStats.length">
          <h4>
            <span class="section-icon">📊</span>
            Key Numbers
          </h4>
          <div class="stats-grid">
            <div v-for="stat in keyStats" :key="stat.label" class="stat-item">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Talking Points -->
        <div class="insight-section talking-points" v-if="talkingPoints && talkingPoints.length">
          <h4>
            <span class="section-icon">💬</span>
            Talking Points
          </h4>
          <ul class="points-list">
            <li v-for="(point, index) in talkingPoints" :key="index">
              <span class="point-bullet">▸</span>
              {{ point }}
            </li>
          </ul>
        </div>

        <!-- Objection Handler -->
        <div class="insight-section objection-handler" v-if="objectionHandler">
          <h4>
            <span class="section-icon">🛡️</span>
            If They Hesitate
          </h4>
          <div class="objection-content">
            <p>{{ objectionHandler }}</p>
          </div>
        </div>

        <!-- Urgency Message -->
        <div class="insight-section urgency-message" v-if="urgencyMessage">
          <h4>
            <span class="section-icon">⚡</span>
            Create Urgency
          </h4>
          <div class="urgency-content">
            <p>{{ urgencyMessage }}</p>
          </div>
        </div>

        <!-- Competitive Intel -->
        <div class="insight-section competitive-intel" v-if="competitiveIntel">
          <h4>
            <span class="section-icon">🎯</span>
            Competitive Edge
          </h4>
          <div class="competitive-content">
            <p>{{ competitiveIntel }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="panel-actions">
          <button @click="copyInsights" class="action-btn copy-btn">
            <span>📋</span>
            Copy All
          </button>
          <button @click="refreshInsights" class="action-btn refresh-btn">
            <span>🔄</span>
            Refresh
          </button>
          <button @click="requestAIInsights" class="action-btn ai-btn" v-if="!aiInsightsLoaded && aiEnabled">
            <span>✨</span>
            AI Insights
          </button>
        </div>
      </div>
    </transition>

    <!-- Minimized State Indicator -->
    <div v-if="!isExpanded" class="minimized-indicator">
      <span v-if="hasInsights">{{ insightCount }} insights available</span>
      <span v-else>Click to expand</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntelligencePanel',
  
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  
  data() {
    return {
      // Core state - START EXPANDED BY DEFAULT
      isLoading: false,
      isExpanded: true, // Changed from false to true
      isVisible: true, // Added visibility flag
      aiInsightsLoaded: false,
      
      // Intelligence content
      primaryMessage: '',
      keyStats: [],
      talkingPoints: [],
      objectionHandler: '',
      urgencyMessage: '',
      competitiveIntel: '',
      confidence: 0,
      
      // Default intelligence rules
      defaultIntelligenceRules: {
        regions: {
          'SEQ': {
            message: 'Southeast Queensland enjoys premium solar conditions',
            stats: [
              { label: 'Peak Sun Hours', value: '5.2' },
              { label: 'Generation Boost', value: '+15%' }
            ],
            points: [
              '5.2 peak sun hours daily average',
              '15% better generation than southern states',
              'Consistent performance year-round'
            ]
          },
          'Brisbane': {
            message: 'Brisbane offers excellent solar potential',
            stats: [
              { label: 'Peak Sun Hours', value: '5.1' },
              { label: 'Payback Period', value: '3-4 years' }
            ],
            points: [
              'Strong solar irradiance levels',
              'Feed-in tariff optimization opportunities',
              'Minimal weather disruption'
            ]
          },
          'South East Queensland': {
            message: 'Southeast Queensland enjoys premium solar conditions',
            stats: [
              { label: 'Peak Sun Hours', value: '5.2' },
              { label: 'Generation Boost', value: '+15%' }
            ],
            points: [
              '5.2 peak sun hours daily average',
              '15% better generation than southern states',
              'Consistent performance year-round'
            ]
          },
          'Queensland': {
            message: 'Queensland offers exceptional solar potential',
            stats: [
              { label: 'Peak Sun Hours', value: '5.3' },
              { label: 'Solar Advantage', value: 'Top 3 Globally' }
            ],
            points: [
              'Among world's best solar resources',
              'Government rebates available',
              'Year-round generation capacity'
            ]
          }
        },
        billRanges: {
          '$0-$100': {
            message: 'Even modest bills benefit significantly from solar',
            objection: 'System pays for itself in 4-5 years, then pure savings',
            points: [
              'Typical 40-60% bill reduction',
              'Protection from rising energy costs',
              'Increase property value'
            ]
          },
          '$100-$200': {
            message: 'The sweet spot for solar ROI',
            objection: 'Less than current monthly bill for complete daytime energy freedom',
            urgency: 'Electricity prices rising 8% annually - act now to lock in savings',
            points: [
              'Typical payback: 3-4 years',
              'Monthly savings: $100-150',
              '25-year savings: $30,000-40,000'
            ]
          },
          '$200-$300': {
            message: 'High usage perfect for maximum solar benefit',
            objection: 'Large system justified by high consumption',
            urgency: 'STC rebates decreasing - save $1,500+ by acting now',
            points: [
              'Potential 70-90% bill reduction',
              'Fast payback under 3 years',
              'Consider battery for 24/7 savings'
            ]
          },
          '$300+': {
            message: 'Prime candidate for full energy independence',
            objection: 'System cost less than 2 years of current bills',
            urgency: 'Battery rebates available now, reducing next quarter',
            points: [
              'Potential for $0 electricity bills',
              'Maximum system size recommended',
              'Battery storage highly beneficial'
            ]
          }
        },
        systemCombos: {
          'pv_only_low': {
            competitive: 'Solar-only systems offer the fastest payback and lowest complexity'
          },
          'pv_only_high': {
            competitive: 'High usage makes solar extremely cost-effective with rapid ROI'
          },
          'pv_battery_low': {
            competitive: 'Battery provides energy security and future-proofing for modest users'
          },
          'pv_battery_high': {
            competitive: 'Full energy independence possible - eliminate bills entirely'
          }
        }
      }
    }
  },
  
  computed: {
    // WeWeb property accessors - Now binding to individual form fields for real-time updates
    region() {
      // Try multiple possible sources for region data
      return this.content.region || 
             this.content.state || 
             this.content.customerRegion || 
             ''
    },
    monthlyBill() {
      // Try multiple possible sources for bill data
      return this.content.monthlyBill || 
             this.content.billRange || 
             this.content.electricityBill || 
             ''
    },
    systemType() {
      return this.content.systemType || 
             this.content.selectedSystemType || 
             ''
    },
    energyUsage() {
      return this.content.energyUsage || 
             this.content.dailyUsage || 
             ''
    },
    futureNeeds() {
      return this.content.futureNeeds || 
             this.content.futurePlans || 
             ''
    },
    selectedPackage() {
      return this.content.selectedPackage || {}
    },
    intelligenceRules() {
      return this.content.intelligenceRules || this.defaultIntelligenceRules
    },
    aiEnabled() {
      return this.content.aiEnabled || false
    },
    apiEndpoint() {
      return this.content.apiEndpoint || '/api/sales-intelligence'
    },
    
    // Computed properties
    hasInsights() {
      return this.primaryMessage || 
             this.keyStats.length > 0 || 
             this.talkingPoints.length > 0 ||
             this.objectionHandler ||
             this.urgencyMessage ||
             this.competitiveIntel
    },
    
    insightCount() {
      let count = 0
      if (this.primaryMessage) count++
      if (this.keyStats.length > 0) count++
      if (this.talkingPoints.length > 0) count++
      if (this.objectionHandler) count++
      if (this.urgencyMessage) count++
      if (this.competitiveIntel) count++
      return count
    }
  },
  
  watch: {
    region: 'updateIntelligence',
    monthlyBill: 'updateIntelligence',
    systemType: 'updateIntelligence',
    energyUsage: 'updateIntelligence',
    futureNeeds: 'updateIntelligence',
    selectedPackage: 'updateIntelligence'
  },

  mounted() {
    this.updateIntelligence()
    this.setupEventListeners()
    // Ensure panel is visible on mount
    this.isVisible = true
    this.isExpanded = true
  },

  methods: {
    updateIntelligence() {
      // Reset state
      this.resetIntelligence()
      
      // Build intelligence based on available data
      if (this.region) {
        this.applyRegionIntelligence()
      }
      
      if (this.monthlyBill) {
        this.applyBillIntelligence()
      }
      
      if (this.systemType && this.monthlyBill) {
        this.applyComboIntelligence()
      }
      
      if (this.selectedPackage && Object.keys(this.selectedPackage).length > 0) {
        this.applyPackageIntelligence()
      }
      
      // Calculate confidence
      this.calculateConfidence()
      
      // Emit event for WeWeb
      this.emitIntelligenceUpdate()
    },
    
    applyRegionIntelligence() {
      // Try to match region with various formats
      const regionData = this.findRegionMatch(this.region)
      if (regionData) {
        this.primaryMessage = regionData.message
        this.keyStats = [...(this.keyStats || []), ...(regionData.stats || [])]
        this.talkingPoints = [...(this.talkingPoints || []), ...(regionData.points || [])]
      }
    },
    
    findRegionMatch(region) {
      if (!region) return null
      
      // Direct match
      if (this.intelligenceRules.regions[region]) {
        return this.intelligenceRules.regions[region]
      }
      
      // Try case-insensitive match
      const regionLower = region.toLowerCase()
      for (const [key, value] of Object.entries(this.intelligenceRules.regions)) {
        if (key.toLowerCase() === regionLower) {
          return value
        }
      }
      
      // Try partial match
      for (const [key, value] of Object.entries(this.intelligenceRules.regions)) {
        if (regionLower.includes(key.toLowerCase()) || key.toLowerCase().includes(regionLower)) {
          return value
        }
      }
      
      return null
    },
    
    applyBillIntelligence() {
      const billData = this.findBillRange(this.monthlyBill)
      if (billData) {
        if (!this.primaryMessage) {
          this.primaryMessage = billData.message
        }
        if (billData.objection) {
          this.objectionHandler = billData.objection
        }
        if (billData.urgency) {
          this.urgencyMessage = billData.urgency
        }
        if (billData.points) {
          this.talkingPoints = [...(this.talkingPoints || []), ...billData.points]
        }
      }
    },
    
    applyComboIntelligence() {
      const comboKey = this.getComboKey()
      const comboData = this.intelligenceRules.systemCombos[comboKey]
      if (comboData && comboData.competitive) {
        this.competitiveIntel = comboData.competitive
      }
    },
    
    applyPackageIntelligence() {
      if (this.selectedPackage) {
        const packageStats = []
        if (this.selectedPackage.size) {
          packageStats.push({ label: 'System Size', value: this.selectedPackage.size + 'kW' })
        }
        if (this.selectedPackage.monthlySavings) {
          packageStats.push({ label: 'Monthly Savings', value: '$' + this.selectedPackage.monthlySavings })
        }
        this.keyStats = [...this.keyStats, ...packageStats]
      }
    },
    
    calculateConfidence() {
      let score = 0
      if (this.region) score += 25
      if (this.monthlyBill) score += 25
      if (this.systemType) score += 25
      if (this.selectedPackage && Object.keys(this.selectedPackage).length > 0) score += 25
      this.confidence = score
    },
    
    findBillRange(bill) {
      if (!bill) return null
      const billRanges = this.intelligenceRules.billRanges
      // Direct match
      if (billRanges[bill]) {
        return billRanges[bill]
      }
      // Try to match by parsing the bill value
      // This handles cases where bill might be a different format
      return billRanges[bill] || null
    },
    
    getComboKey() {
      const billCategory = this.monthlyBill?.includes('100') ? 'low' : 'high'
      const systemKey = this.systemType?.replace('_system', '').replace('-', '_')
      return `${systemKey}_${billCategory}`
    },
    
    resetIntelligence() {
      this.primaryMessage = ''
      this.keyStats = []
      this.talkingPoints = []
      this.objectionHandler = ''
      this.urgencyMessage = ''
      this.competitiveIntel = ''
      this.confidence = 0
    },
    
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
      
      // Emit WeWeb event
      this.$emit('trigger-event', {
        name: 'panel:expanded',
        event: {
          isExpanded: this.isExpanded
        }
      })
    },
    
    async copyInsights() {
      const text = this.formatInsightsAsText()
      try {
        await navigator.clipboard.writeText(text)
        
        // Emit WeWeb event
        this.$emit('trigger-event', {
          name: 'insights:copied',
          event: {
            content: text
          }
        })
        
        // Show feedback (you might want to emit a toast event)
        console.log('Insights copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy insights:', err)
      }
    },
    
    refreshInsights() {
      this.updateIntelligence()
    },
    
    async requestAIInsights() {
      if (!this.aiEnabled) return
      
      this.isLoading = true
      
      try {
        const formData = {
          region: this.region,
          monthlyBill: this.monthlyBill,
          systemType: this.systemType,
          energyUsage: this.energyUsage,
          futureNeeds: this.futureNeeds,
          selectedPackage: this.selectedPackage
        }
        
        // Emit WeWeb event for AI request
        this.$emit('trigger-event', {
          name: 'ai:requested',
          event: {
            formData: formData
          }
        })
        
        const response = await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })
        
        if (response.ok) {
          const aiInsights = await response.json()
          this.mergeAIInsights(aiInsights)
          this.aiInsightsLoaded = true
        }
      } catch (error) {
        console.error('Failed to fetch AI insights:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    mergeAIInsights(aiInsights) {
      if (aiInsights.primaryMessage) {
        this.primaryMessage = aiInsights.primaryMessage
      }
      if (aiInsights.talkingPoints) {
        this.talkingPoints = [...this.talkingPoints, ...aiInsights.talkingPoints]
      }
      if (aiInsights.competitiveIntel) {
        this.competitiveIntel = aiInsights.competitiveIntel
      }
      // Merge other AI insights as needed
    },
    
    formatInsightsAsText() {
      let text = 'Sales Intelligence Summary\n'
      text += '========================\n\n'
      
      if (this.primaryMessage) {
        text += `Primary Message: ${this.primaryMessage}\n\n`
      }
      
      if (this.keyStats.length > 0) {
        text += 'Key Statistics:\n'
        this.keyStats.forEach(stat => {
          text += `• ${stat.label}: ${stat.value}\n`
        })
        text += '\n'
      }
      
      if (this.talkingPoints.length > 0) {
        text += 'Talking Points:\n'
        this.talkingPoints.forEach(point => {
          text += `• ${point}\n`
        })
        text += '\n'
      }
      
      if (this.objectionHandler) {
        text += `Objection Handler: ${this.objectionHandler}\n\n`
      }
      
      if (this.urgencyMessage) {
        text += `Urgency Message: ${this.urgencyMessage}\n\n`
      }
      
      if (this.competitiveIntel) {
        text += `Competitive Intel: ${this.competitiveIntel}\n\n`
      }
      
      return text
    },
    
    setupEventListeners() {
      // Listen for external updates if needed
      window.addEventListener('intelligence-update', this.handleExternalUpdate)
    },
    
    handleExternalUpdate(event) {
      if (event.detail) {
        // Update with external data
        Object.assign(this, event.detail)
      }
    },
    
    emitIntelligenceUpdate() {
      // Emit WeWeb event
      this.$emit('trigger-event', {
        name: 'intelligence:updated',
        event: {
          hasInsights: this.hasInsights,
          confidence: this.confidence,
          insights: {
            primary: this.primaryMessage,
            stats: this.keyStats,
            points: this.talkingPoints,
            objection: this.objectionHandler,
            urgency: this.urgencyMessage,
            competitive: this.competitiveIntel
          }
        }
      })
    }
  },
  
  beforeUnmount() {
    window.removeEventListener('intelligence-update', this.handleExternalUpdate)
  }
}
</script>

<style scoped>
/* Container Styles - NO BORDER */
.intelligence-panel-container {
  background: rgba(255, 255, 255, 0.98);
  border: none; /* Removed border as requested */
  border-radius: 8px;
  padding: 0;
  margin: 0; /* Removed margin to hug container */
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  min-height: 60px;
  width: 100%;
}

.intelligence-panel-container.has-insights {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.intelligence-panel-container.is-visible {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* Header Styles - MATCHING SALES COACH BUTTON */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #6BB6FF; /* Same as Sales Coach button */
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: background 0.3s ease;
}

.panel-header:hover {
  background: #5CA5EE; /* Same hover as Sales Coach button */
}

.header-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Icon instead of emoji */
.panel-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel-icon svg {
  width: 20px;
  height: 20px;
  color: #003478; /* Dark blue to match Sales Coach */
}

.panel-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #003478; /* Dark blue text like Sales Coach */
}

.expand-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  color: #003478;
  transition: transform 0.3s ease;
}

.expand-toggle svg {
  transition: transform 0.3s ease;
}

.expand-toggle svg.rotated {
  transform: rotate(180deg);
}

/* Confidence Badge */
.confidence-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background: white;
  padding: 4px 12px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.confidence-value {
  font-size: 18px;
  font-weight: bold;
  color: #003478;
}

.confidence-label {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
}

/* Empty State */
.panel-empty {
  padding: 30px;
  text-align: center;
  color: #666;
  font-style: italic;
}

/* Loading State */
.panel-loading {
  padding: 30px;
  text-align: center;
  color: #666;
}

.loading-pulse {
  width: 40px;
  height: 40px;
  margin: 0 auto 10px;
  border: 3px solid #e0e0e0;
  border-top-color: #6BB6FF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Content Styles */
.panel-content {
  padding: 20px;
  max-height: 600px;
  overflow-y: auto;
  background: white;
}

/* Primary Message */
.primary-message {
  background: #f0f7ff;
  border-left: 4px solid #003478;
  padding: 12px 16px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.primary-message p {
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  color: #003478;
}

/* Insight Sections */
.insight-section {
  margin-bottom: 24px;
}

.insight-section h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-icon {
  font-size: 16px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
}

.stat-item {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e0e0e0;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #003478;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
}

/* Points List */
.points-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.points-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.5;
}

.point-bullet {
  color: #92C467; /* Brand green */
  font-weight: bold;
  flex-shrink: 0;
}

/* Objection Handler */
.objection-handler .objection-content {
  background: #fff3cd;
  border: 1px solid #ffc107;
  padding: 12px;
  border-radius: 6px;
}

.objection-content p {
  margin: 0;
  font-size: 14px;
  color: #856404;
}

/* Urgency Message */
.urgency-message .urgency-content {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 12px;
  border-radius: 6px;
}

.urgency-content p {
  margin: 0;
  font-size: 14px;
  color: #721c24;
  font-weight: 500;
}

/* Competitive Intel */
.competitive-intel .competitive-content {
  background: #d4edda;
  border: 1px solid #c3e6cb;
  padding: 12px;
  border-radius: 6px;
}

.competitive-content p {
  margin: 0;
  font-size: 14px;
  color: #155724;
}

/* Action Buttons */
.panel-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  background: white;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #f8f9fa;
  border-color: #003478;
  transform: translateY(-1px);
}

.action-btn span {
  font-size: 14px;
}

/* Minimized Indicator - BRAND GREEN */
.minimized-indicator {
  padding: 12px 20px;
  text-align: center;
  font-size: 13px;
  color: #92C467; /* Brand green */
  background: #f8f9fa;
  border-radius: 0 0 8px 8px;
  cursor: pointer;
  font-weight: 500;
}

.minimized-indicator:hover {
  background: #f0f1f2;
}

/* Transitions */
.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.panel-fade-enter-from,
.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Desktop - Positioned to hug form */
@media (min-width: 1024px) {
  .intelligence-panel-container {
    /* Remove fixed positioning to let it flow with form */
    position: relative;
    width: 100%;
    max-width: 100%;
  }
}

/* Tablet - Responsive width */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .panel-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
  
  .panel-header {
    padding: 12px 16px;
  }
  
  .panel-content {
    padding: 16px;
  }
}

/* Mobile - Bottom sheet style */
@media (max-width: 480px) {
  .intelligence-panel-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    border-radius: 12px 12px 0 0;
    z-index: 1000;
  }
  
  .intelligence-panel-container:not(.is-expanded) {
    transform: translateY(calc(100% - 60px));
  }
  
  .intelligence-panel-container.is-expanded {
    transform: translateY(0);
    max-height: 80vh;
  }
  
  .panel-content {
    max-height: calc(80vh - 120px);
  }
}
</style>