<template>
  <div 
    class="intelligence-panel-container"
    :class="{ 
      'has-insights': hasInsights,
      'is-loading': isLoading,
      'is-expanded': isExpanded
    }"
  >
    <!-- Panel Header -->
    <div class="panel-header" @click="toggleExpanded">
      <div class="header-content">
        <div class="panel-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L12 3M12 21L12 22M4.22 4.22L4.93 4.93M19.07 19.07L19.78 19.78M2 12L3 12M21 12L22 12M4.22 19.78L4.93 19.07M19.07 4.93L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h3 class="panel-title">Sales Intelligence</h3>
      </div>
      <div class="confidence-badge" v-if="confidence > 0 && hasInsights">
        <span class="confidence-value">{{ confidence }}%</span>
        <span class="confidence-label">match</span>
      </div>
    </div>

    <!-- Content Area -->
    <transition name="panel-fade">
      <div v-if="isExpanded" class="panel-body">
        <!-- Loading State -->
        <div v-if="isLoading" class="panel-loading">
          <div class="loading-pulse"></div>
          <span>Analyzing customer profile...</span>
        </div>

        <!-- Empty State -->
        <div v-else-if="!hasInsights" class="panel-empty">
          <p>Start filling out the form to see real-time sales intelligence</p>
        </div>

        <!-- Main Content -->
        <div v-else class="panel-content">
          <!-- Primary Message -->
          <div class="primary-message" v-if="primaryMessage">
            <p>{{ primaryMessage }}</p>
          </div>

          <!-- Key Statistics -->
          <div class="insight-section key-stats" v-if="keyStats && keyStats.length">
            <h4>Key Numbers</h4>
            <div class="stats-grid">
              <div v-for="stat in keyStats" :key="stat.label" class="stat-item">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- Talking Points -->
          <div class="insight-section talking-points" v-if="talkingPoints && talkingPoints.length">
            <h4>Talking Points</h4>
            <ul class="points-list">
              <li v-for="(point, index) in talkingPoints" :key="index">
                {{ point }}
              </li>
            </ul>
          </div>

          <!-- Objection Handler -->
          <div class="insight-section objection-handler" v-if="objectionHandler">
            <h4>If They Hesitate</h4>
            <div class="objection-content">
              <p>{{ objectionHandler }}</p>
            </div>
          </div>

          <!-- Urgency Message -->
          <div class="insight-section urgency-message" v-if="urgencyMessage">
            <h4>Create Urgency</h4>
            <div class="urgency-content">
              <p>{{ urgencyMessage }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="panel-actions">
            <button @click="copyInsights" class="action-btn copy-btn">
              Copy All
            </button>
            <button @click="refreshInsights" class="action-btn refresh-btn">
              Refresh
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Minimized Indicator -->
    <div v-if="!isExpanded" class="minimized-indicator" @click="toggleExpanded">
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
      isLoading: false,
      isExpanded: true,
      primaryMessage: '',
      keyStats: [],
      talkingPoints: [],
      objectionHandler: '',
      urgencyMessage: '',
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
          'Queensland': {
            message: 'Queensland offers exceptional solar potential',
            stats: [
              { label: 'Peak Sun Hours', value: '5.3' },
              { label: 'Solar Advantage', value: 'Top 3 Globally' }
            ],
            points: [
              'Among world\'s best solar resources',
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
        }
      }
    }
  },
  
  computed: {
    region() {
      return this.content.region || ''
    },
    monthlyBill() {
      return this.content.monthlyBill || ''
    },
    systemType() {
      return this.content.systemType || ''
    },
    energyUsage() {
      return this.content.energyUsage || ''
    },
    futureNeeds() {
      return this.content.futureNeeds || ''
    },
    selectedPackage() {
      return this.content.selectedPackage || {}
    },
    intelligenceRules() {
      return this.content.intelligenceRules || this.defaultIntelligenceRules
    },
    
    hasInsights() {
      return this.primaryMessage || 
             this.keyStats.length > 0 || 
             this.talkingPoints.length > 0 ||
             this.objectionHandler ||
             this.urgencyMessage
    },
    
    insightCount() {
      let count = 0
      if (this.primaryMessage) count++
      if (this.keyStats.length > 0) count++
      if (this.talkingPoints.length > 0) count++
      if (this.objectionHandler) count++
      if (this.urgencyMessage) count++
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
  },

  methods: {
    updateIntelligence() {
      this.resetIntelligence()
      
      if (this.region) {
        this.applyRegionIntelligence()
      }
      
      if (this.monthlyBill) {
        this.applyBillIntelligence()
      }
      
      this.calculateConfidence()
      this.emitIntelligenceUpdate()
    },
    
    applyRegionIntelligence() {
      const regionData = this.intelligenceRules.regions[this.region]
      if (regionData) {
        this.primaryMessage = regionData.message
        this.keyStats = [...(regionData.stats || [])]
        this.talkingPoints = [...(regionData.points || [])]
      }
    },
    
    applyBillIntelligence() {
      const billData = this.intelligenceRules.billRanges[this.monthlyBill]
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
          this.talkingPoints = [...this.talkingPoints, ...billData.points]
        }
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
    
    resetIntelligence() {
      this.primaryMessage = ''
      this.keyStats = []
      this.talkingPoints = []
      this.objectionHandler = ''
      this.urgencyMessage = ''
      this.confidence = 0
    },
    
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
      
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
        this.$emit('trigger-event', {
          name: 'insights:copied',
          event: {
            content: text
          }
        })
      } catch (err) {
        console.error('Failed to copy insights:', err)
      }
    },
    
    refreshInsights() {
      this.updateIntelligence()
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
      
      return text
    },
    
    emitIntelligenceUpdate() {
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
            urgency: this.urgencyMessage
          }
        }
      })
    }
  }
}
</script>

<style scoped>
/* Container */
.intelligence-panel-container {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin: 0;
  width: 100%;
}

.intelligence-panel-container.has-insights {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

/* Header */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #6BB6FF;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: background 0.3s ease;
}

.panel-header:hover {
  background: #5CA5EE;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

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
  color: #003478;
}

.panel-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #003478;
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

/* Body */
.panel-body {
  padding: 20px;
  background: white;
}

/* Empty State */
.panel-empty {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px;
}

/* Loading State */
.panel-loading {
  text-align: center;
  color: #666;
  padding: 20px;
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

/* Content */
.panel-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Primary Message */
.primary-message {
  background: #f0f7ff;
  border-left: 4px solid #003478;
  padding: 12px 16px;
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
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.insight-section h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
  font-size: 14px;
  line-height: 1.5;
}

.points-list li:before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #92C467;
  font-weight: bold;
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

/* Action Buttons */
.panel-actions {
  display: flex;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.action-btn {
  flex: 1;
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

/* Minimized Indicator */
.minimized-indicator {
  padding: 12px 20px;
  text-align: center;
  font-size: 13px;
  color: #92C467;
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
  transition: all 0.3s ease;
}

.panel-fade-enter-from,
.panel-fade-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .panel-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
}
</style>