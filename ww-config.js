export default {
  editor: {
    label: {
      en: "Sales Intelligence Panel"
    },
    icon: "lightbulb",
    customStylePropertiesOrder: [],
    customSettingsPropertiesOrder: [
      "positionMode",
      "region",
      "monthlyBill", 
      "systemType",
      "energyUsage",
      "futureNeeds",
      "selectedPackage",
      "intelligenceRules",
      "aiEnabled",
      "apiEndpoint"
    ]
  },
  
  properties: {
    positionMode: {
      label: {
        en: "Position Mode"
      },
      type: "Select",
      options: {
        options: [
          { value: "fixed-right", label: "Fixed Right (Default)" },
          { value: "inline", label: "Inline with Content" },
          { value: "bottom", label: "Fixed Bottom" }
        ]
      },
      bindable: true,
      defaultValue: "fixed-right"
    },
    region: {
      label: {
        en: "Customer Region"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    monthlyBill: {
      label: {
        en: "Monthly Bill Range"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    systemType: {
      label: {
        en: "System Type"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    energyUsage: {
      label: {
        en: "Energy Usage"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    },
    futureNeeds: {
      label: {
        en: "Future Energy Needs"
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