export default {
  editor: {
    label: {
      en: "Sales Intelligence Panel"
    },
    icon: "lightbulb",
    customStylePropertiesOrder: [],
    customSettingsPropertiesOrder: [
      "region",
      "state",
      "customerRegion",
      "monthlyBill",
      "billRange",
      "electricityBill",
      "systemType",
      "selectedSystemType",
      "energyUsage",
      "dailyUsage",
      "futureNeeds",
      "futurePlans",
      "selectedPackage",
      "intelligenceRules",
      "aiEnabled",
      "apiEndpoint"
    ]
  },
  
  properties: {
    // Multiple region options for flexibility
    region: {
      label: {
        en: "Customer Region"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    state: {
      label: {
        en: "State (Alternative)"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    customerRegion: {
      label: {
        en: "Customer Region (Alternative)"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    
    // Multiple bill options for flexibility
    monthlyBill: {
      label: {
        en: "Monthly Bill Range"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    billRange: {
      label: {
        en: "Bill Range (Alternative)"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    electricityBill: {
      label: {
        en: "Electricity Bill (Alternative)"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    
    // System type options
    systemType: {
      label: {
        en: "System Type"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    selectedSystemType: {
      label: {
        en: "Selected System Type (Alternative)"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    
    // Energy usage options
    energyUsage: {
      label: {
        en: "Energy Usage"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    dailyUsage: {
      label: {
        en: "Daily Usage (Alternative)"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    
    // Future needs options
    futureNeeds: {
      label: {
        en: "Future Energy Needs"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    futurePlans: {
      label: {
        en: "Future Plans (Alternative)"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    
    selectedPackage: {
      label: {
        en: "Selected Package"
      },
      type: "Object",
      bindable: true,
      defaultValue: {}
    },
    intelligenceRules: {
      label: {
        en: "Intelligence Rules"
      },
      type: "Object",
      bindable: true,
      defaultValue: {
        regions: {},
        billRanges: {},
        systemCombos: {}
      }
    },
    aiEnabled: {
      label: {
        en: "AI Enhancement Enabled"
      },
      type: "OnOff",
      bindable: true,
      defaultValue: false
    },
    apiEndpoint: {
      label: {
        en: "AI API Endpoint"
      },
      type: "Text",
      bindable: true,
      defaultValue: "/api/sales-intelligence"
    }
  },
  
  triggerEvents: [
    {
      name: "intelligence:updated",
      label: { en: "Intelligence Updated" },
      event: {
        hasInsights: "",
        confidence: "",
        insights: {}
      },
      default: true
    },
    {
      name: "panel:expanded",
      label: { en: "Panel Expanded" },
      event: {
        isExpanded: ""
      }
    },
    {
      name: "insights:copied",
      label: { en: "Insights Copied" },
      event: {
        content: ""
      }
    },
    {
      name: "ai:requested",
      label: { en: "AI Insights Requested" },
      event: {
        formData: {}
      }
    }
  ]
}