// Water Quality Usage Predictor - JavaScript

// Drinking water standards
const drinkingStandards = {
  ph: { min: 6.5, max: 8.5, ideal_min: 7.0, ideal_max: 8.0 },
  hardness: { soft: 120, moderate: 180, hard: 180 },
  solids: { ideal: 300, acceptable: 500, needs_treatment: 500 },
  chloramines: { max: 4 },
  sulfate: { max: 250 },
  conductivity: { min: 200, max: 800 },
  organic_carbon: { ideal: 5 },
  trihalomethanes: { max: 80 },
  turbidity: { ideal: 1, acceptable: 5 }
};

// Treatment methods data
const treatmentMethods = {
  ph: {
    issue: 'Acidic or Alkaline water',
    methods: [
      {
        name: 'Neutralizing Filter',
        description: 'Uses calcium carbonate bed to neutralize acidity',
        effectiveness: 'High',
        steps: [
          'Install neutralizing filter with calcium carbonate media',
          'Water passes through filter, acid is neutralized',
          'Backwash filter periodically',
          'Replenish media as it dissolves'
        ]
      },
      {
        name: 'Chemical Feed Pump',
        description: 'Injects soda ash solution to adjust pH',
        effectiveness: 'High',
        steps: [
          'Install chemical feed pump',
          'Mix soda ash solution in tank',
          'Pump injects solution into water supply',
          'Monitor and adjust dosage'
        ]
      },
      {
        name: 'Aeration',
        description: 'Removes CO2 to reduce acidity',
        effectiveness: 'Moderate',
        steps: [
          'Expose water to air in aeration tank',
          'CO2 escapes, raising pH',
          'Allow settling time',
          'Filter if needed'
        ]
      }
    ]
  },
  hardness: {
    issue: 'High mineral content',
    methods: [
      {
        name: 'Water Softener (Ion Exchange)',
        description: 'Replaces calcium/magnesium with sodium',
        effectiveness: 'Very High (90-95%)',
        steps: [
          'Water flows through resin bed with sodium ions',
          'Calcium/magnesium exchange with sodium',
          'Soft water exits system',
          'Regenerate resin with salt brine periodically'
        ]
      },
      {
        name: 'Reverse Osmosis',
        description: 'Removes minerals through membrane',
        effectiveness: 'Very High (95-99%)',
        steps: [
          'Pre-filter to remove particles',
          'Push water through RO membrane under pressure',
          'Membrane blocks minerals',
          'Collect purified water'
        ]
      }
    ]
  },
  solids: {
    issue: 'High Total Dissolved Solids',
    methods: [
      {
        name: 'Reverse Osmosis (RO)',
        description: 'Most effective - removes 95-99% of TDS',
        effectiveness: 'Very High (95-99%)',
        steps: [
          'Pre-filtration to remove sediments',
          'Force water through semipermeable membrane',
          'Dissolved solids blocked by membrane',
          'Collect pure water, discharge concentrate',
          'Post-filter for taste'
        ]
      },
      {
        name: 'Distillation',
        description: 'Boils water and collects steam',
        effectiveness: 'Very High (99%+)',
        steps: [
          'Heat water to boiling point',
          'Collect water vapor/steam',
          'Cool steam in condenser',
          'Collect purified water, TDS left behind'
        ]
      }
    ]
  },
  chloramines: {
    issue: 'High disinfectant levels',
    methods: [
      {
        name: 'Catalytic Carbon Filter',
        description: 'Iron-catalyzed carbon breaks down chloramines',
        effectiveness: 'Very High',
        steps: [
          'Water flows through catalytic carbon filter',
          'Chloramines break down into ammonia and chloride',
          'Requires longer contact time',
          'Replace filter as per schedule'
        ]
      },
      {
        name: 'Reverse Osmosis',
        description: 'RO membranes remove chloramines',
        effectiveness: 'High (85-95%)',
        steps: [
          'Pre-filter to protect membrane',
          'Water pushed through RO membrane',
          'Chloramines blocked by membrane',
          'Collect purified water'
        ]
      }
    ]
  },
  sulfate: {
    issue: 'High sulfate content',
    methods: [
      {
        name: 'Reverse Osmosis',
        description: 'Removes 93-99% of sulfate',
        effectiveness: 'Very High (93-99%)',
        steps: [
          'Pre-filter water',
          'Force water through RO membrane',
          'Membrane blocks sulfate ions',
          'Collect low-sulfate water'
        ]
      },
      {
        name: 'Distillation',
        description: 'Nearly 100% sulfate removal',
        effectiveness: 'Very High (99%+)',
        steps: [
          'Boil water to create steam',
          'Sulfate remains in boiling container',
          'Condense steam to pure water',
          'Collect distilled water'
        ]
      }
    ]
  },
  conductivity: {
    issue: 'Abnormal electrical conductivity',
    methods: [
      {
        name: 'Reverse Osmosis',
        description: 'Reduces conductivity by removing ions',
        effectiveness: 'Very High',
        steps: [
          'Pre-filter water',
          'Force through RO membrane',
          'Ions blocked, reducing conductivity',
          'Collect purified water'
        ]
      }
    ]
  },
  organic_carbon: {
    issue: 'High organic content',
    methods: [
      {
        name: 'Enhanced Coagulation',
        description: 'Removes organic precursors',
        effectiveness: 'High',
        steps: [
          'Lower pH to 4-5 for better coagulation',
          'Add increased coagulant dose',
          'Allow settling to remove organic matter',
          'Filter remaining particles'
        ]
      },
      {
        name: 'Activated Carbon Adsorption',
        description: 'Adsorbs dissolved organics',
        effectiveness: 'High',
        steps: [
          'Water passes through activated carbon bed',
          'Organic molecules adsorb onto carbon',
          'Collect treated water',
          'Replace or regenerate carbon'
        ]
      }
    ]
  },
  trihalomethanes: {
    issue: 'High THM levels',
    methods: [
      {
        name: 'Granular Activated Carbon',
        description: 'Adsorbs THMs from water',
        effectiveness: 'High',
        steps: [
          'Water flows through GAC filter bed',
          'THMs adsorb onto carbon surface',
          'Collect filtered water',
          'Replace carbon when saturated'
        ]
      },
      {
        name: 'Reverse Osmosis',
        description: 'Removes THMs through membrane',
        effectiveness: 'Very High (90-95%)',
        steps: [
          'Pre-filter to remove chlorine',
          'Force water through RO membrane',
          'THMs blocked by membrane',
          'Collect purified water'
        ]
      }
    ]
  },
  turbidity: {
    issue: 'High water cloudiness',
    methods: [
      {
        name: 'Coagulation-Flocculation-Sedimentation',
        description: 'Chemical process to remove particles',
        effectiveness: 'High',
        steps: [
          'Add coagulants to bind particles',
          'Gentle mixing forms larger flocs',
          'Allow flocs to settle to bottom',
          'Decant clear water from top'
        ]
      },
      {
        name: 'Multi-Media Filtration',
        description: 'Physical filtration layers',
        effectiveness: 'High',
        steps: [
          'Water flows through sand/gravel/charcoal layers',
          'Particles trapped in filter pores',
          'Clear water passes through',
          'Backwash filters periodically'
        ]
      }
    ]
  }
};

// Comprehensive treatment process
const comprehensiveProcess = [
  {
    stage: 1,
    name: 'Pre-Treatment & Screening',
    purpose: 'Remove large particles and debris',
    methods: ['Screen/Strainer', 'Sedimentation'],
    duration: '1-2 hours',
    icon: '🔍'
  },
  {
    stage: 2,
    name: 'Coagulation & Flocculation',
    purpose: 'Remove suspended solids, reduce turbidity',
    methods: ['Add coagulants (alum/ferric salts)', 'Gentle mixing', 'Form larger flocs'],
    duration: '30-60 minutes',
    icon: '🌀'
  },
  {
    stage: 3,
    name: 'Sedimentation/Clarification',
    purpose: 'Allow particles to settle',
    methods: ['Settling tank', 'Flocs sink to bottom'],
    duration: '2-4 hours',
    icon: '⬇️'
  },
  {
    stage: 4,
    name: 'pH Adjustment',
    purpose: 'Adjust pH to 6.5-8.5',
    methods: ['Add lime/soda ash (acidic water)', 'Add acid (alkaline water)', 'Aeration'],
    duration: '15-30 minutes',
    icon: '⚖️'
  },
  {
    stage: 5,
    name: 'Primary Filtration',
    purpose: 'Remove remaining particles',
    methods: ['Sand filter', 'Multi-media filter', 'Activated carbon filter'],
    duration: 'Continuous flow',
    icon: '🔬'
  },
  {
    stage: 6,
    name: 'Advanced Treatment',
    purpose: 'Remove specific contaminants',
    methods: ['Reverse Osmosis (TDS, hardness, sulfate)', 'Ion Exchange (hardness)', 'Activated Carbon (THMs, chloramines)'],
    duration: 'Continuous flow',
    icon: '💎'
  },
  {
    stage: 7,
    name: 'Disinfection',
    purpose: 'Kill remaining microorganisms',
    methods: ['Chlorination (0.2-0.5 ppm residual)', 'UV light', 'Ozonation'],
    duration: '30 minutes contact time',
    icon: '🦠'
  },
  {
    stage: 8,
    name: 'Final Polishing',
    purpose: 'Final quality improvement',
    methods: ['Activated carbon (taste/odor)', 'pH stabilization', 'Remineralization (if using RO)'],
    duration: 'Continuous flow',
    icon: '✨'
  },
  {
    stage: 9,
    name: 'Quality Testing',
    purpose: 'Verify water meets standards',
    methods: ['Test pH, TDS, turbidity', 'Test chlorine residual', 'Microbiological testing'],
    duration: '15-30 minutes',
    icon: '✅'
  }
];

// Features data
const features = [
  { name: 'ph', label: 'pH Level', min: 0, max: 14, mean: 7.07, unit: '', icon: '🌡️', required: true },
  { name: 'hardness', label: 'Hardness', min: 47.43, max: 323.12, mean: 204.39, unit: 'mg/L', icon: '💎', required: true },
  { name: 'solids', label: 'Total Dissolved Solids', min: 320.94, max: 61227.20, mean: 16775.92, unit: 'ppm', icon: '⚗️', required: true },
  { name: 'sulfate', label: 'Sulfate', min: 129, max: 481.03, mean: 353.06, unit: 'mg/L', icon: '🧪', required: true },
  { name: 'chloramines', label: 'Chloramines', min: 0.35, max: 13.13, mean: 7.17, unit: 'ppm', icon: '💧', required: false },
  { name: 'conductivity', label: 'Conductivity', min: 181.48, max: 753.34, mean: 415.16, unit: 'μS/cm', icon: '⚡', required: false },
  { name: 'organic_carbon', label: 'Organic Carbon', min: 2.20, max: 28.30, mean: 14.70, unit: 'ppm', icon: '🌿', required: false },
  { name: 'trihalomethanes', label: 'Trihalomethanes', min: 0.74, max: 124, mean: 70.22, unit: 'μg/L', icon: '☣️', required: false },
  { name: 'turbidity', label: 'Turbidity', min: 1.45, max: 6.74, mean: 3.87, unit: 'NTU', icon: '🌊', required: false }
];

// Default values for optional parameters
const defaultValues = {
  chloramines: 7.17,
  conductivity: 415.16,
  organic_carbon: 14.70,
  trihalomethanes: 70.22,
  turbidity: 3.87
};

// Usage types
const usageTypes = {
  'Drinking': { color: '#4CAF50', icon: '🚰', description: 'Safe for drinking and consumption' },
  'Cooking': { color: '#2196F3', icon: '🍳', description: 'Suitable for cooking and food preparation' },
  'Bathing': { color: '#FF9800', icon: '🚿', description: 'Appropriate for bathing and personal hygiene' },
  'Cleaning': { color: '#9C27B0', icon: '🧹', description: 'Best for cleaning and washing purposes' }
};

// Quick fill data
const quickFillData = {
  high: { ph: 7.0, hardness: 180.0, solids: 8000.0, chloramines: 7.0, sulfate: 350.0, conductivity: 400.0, organic_carbon: 14.0, trihalomethanes: 65.0, turbidity: 3.5 },
  moderate: { ph: 8.5, hardness: 240.0, solids: 22000.0, chloramines: 9.5, sulfate: 400.0, conductivity: 550.0, organic_carbon: 18.0, trihalomethanes: 85.0, turbidity: 5.0 },
  low: { ph: 10.0, hardness: 300.0, solids: 50000.0, chloramines: 12.0, sulfate: 450.0, conductivity: 720.0, organic_carbon: 25.0, trihalomethanes: 110.0, turbidity: 6.5 }
};

// Toggle advanced section
function toggleAdvanced() {
  const advancedSection = document.getElementById('advancedSection');
  const toggleIcon = document.getElementById('toggleIcon');
  const toggleBtn = document.querySelector('.form__toggle');
  const defaultHint = document.getElementById('defaultHint');
  
  if (advancedSection.style.display === 'none') {
    advancedSection.style.display = 'block';
    toggleIcon.textContent = '▲';
    toggleBtn.classList.add('active');
    defaultHint.style.display = 'none';
  } else {
    advancedSection.style.display = 'none';
    toggleIcon.textContent = '▼';
    toggleBtn.classList.remove('active');
    defaultHint.style.display = 'block';
  }
}

// Form validation
const inputs = document.querySelectorAll('.form__input');
inputs.forEach(input => {
  input.addEventListener('input', function() {
    validateInput(this);
  });
  
  input.addEventListener('blur', function() {
    validateInput(this);
  });
});

function validateInput(input) {
  const min = parseFloat(input.min);
  const max = parseFloat(input.max);
  const value = parseFloat(input.value);
  
  if (input.value === '') {
    input.classList.remove('valid', 'invalid');
    return;
  }
  
  if (value >= min && value <= max) {
    input.classList.add('valid');
    input.classList.remove('invalid');
  } else {
    input.classList.add('invalid');
    input.classList.remove('valid');
  }
}

// Quick fill functions
function fillHighQuality() {
  fillFormWithData(quickFillData.high);
}

function fillModerateQuality() {
  fillFormWithData(quickFillData.moderate);
}

function fillLowQuality() {
  fillFormWithData(quickFillData.low);
}

function fillFormWithData(data) {
  Object.keys(data).forEach(key => {
    const input = document.getElementById(key);
    if (input) {
      input.value = data[key];
      validateInput(input);
      
      // Add animation
      input.style.animation = 'none';
      setTimeout(() => {
        input.style.animation = 'pulse 0.5s ease-out';
      }, 10);
    }
  });
}

// Reset form
function resetForm() {
  document.getElementById('waterForm').reset();
  inputs.forEach(input => {
    input.classList.remove('valid', 'invalid');
  });
  document.getElementById('resultsSection').style.display = 'none';
}

// Form submission
const form = document.getElementById('waterForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Check if required inputs are valid
  let allRequiredValid = true;
  const requiredFields = ['ph', 'hardness', 'solids', 'sulfate'];
  
  requiredFields.forEach(fieldName => {
    const input = document.getElementById(fieldName);
    validateInput(input);
    if (input.classList.contains('invalid') || input.value === '') {
      allRequiredValid = false;
    }
  });
  
  if (!allRequiredValid) {
    alert('Please fill all required parameters (marked with *)!');
    return;
  }
  
  // Show loading state
  const analyzeBtn = document.getElementById('analyzeBtn');
  const btnText = analyzeBtn.querySelector('.btn__text');
  const btnLoader = analyzeBtn.querySelector('.btn__loader');
  
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline-block';
  analyzeBtn.disabled = true;
  form.style.opacity = '0.6';
  
  // Simulate prediction delay
  setTimeout(() => {
    analyzeWater();
    
    // Reset button
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
    analyzeBtn.disabled = false;
    form.style.opacity = '1';
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, 1500);
});

// Prediction logic
function analyzeWater() {
  console.log('=== Starting Water Analysis ===');
  // Get input values with defaults for optional fields
  const ph = parseFloat(document.getElementById('ph').value);
  const hardness = parseFloat(document.getElementById('hardness').value);
  const solids = parseFloat(document.getElementById('solids').value);
  const sulfate = parseFloat(document.getElementById('sulfate').value);
  
  // Optional fields with defaults
  const chloraminesInput = document.getElementById('chloramines').value;
  const chloramines = chloraminesInput ? parseFloat(chloraminesInput) : defaultValues.chloramines;
  
  const conductivityInput = document.getElementById('conductivity').value;
  const conductivity = conductivityInput ? parseFloat(conductivityInput) : defaultValues.conductivity;
  
  const organicCarbonInput = document.getElementById('organic_carbon').value;
  const organicCarbon = organicCarbonInput ? parseFloat(organicCarbonInput) : defaultValues.organic_carbon;
  
  const trihalomethanesInput = document.getElementById('trihalomethanes').value;
  const trihalomethanes = trihalomethanesInput ? parseFloat(trihalomethanesInput) : defaultValues.trihalomethanes;
  
  const turbidityInput = document.getElementById('turbidity').value;
  const turbidity = turbidityInput ? parseFloat(turbidityInput) : defaultValues.turbidity;
  
  // Track which fields used defaults
  const usedDefaults = {
    chloramines: !chloraminesInput,
    conductivity: !conductivityInput,
    organic_carbon: !organicCarbonInput,
    trihalomethanes: !trihalomethanesInput,
    turbidity: !turbidityInput
  };
  
  // Simple prediction logic
  let prediction = 'Cleaning';
  let confidence = 70;
  
  // Drinking water criteria (most stringent)
  if (ph >= 6.5 && ph <= 8.5 && 
      solids < 15000 && 
      turbidity < 5 && 
      chloramines < 10 &&
      hardness < 200) {
    prediction = 'Drinking';
    confidence = 85 + Math.floor(Math.random() * 10);
  }
  // Cooking criteria
  else if (ph >= 6 && ph <= 9 && 
           hardness < 180 &&
           solids < 20000 &&
           turbidity < 5.5) {
    prediction = 'Cooking';
    confidence = 80 + Math.floor(Math.random() * 10);
  }
  // Bathing criteria
  else if (hardness < 220 && 
           chloramines < 10 &&
           turbidity < 6 &&
           ph >= 6 && ph <= 9) {
    prediction = 'Bathing';
    confidence = 75 + Math.floor(Math.random() * 15);
  }
  // Default to cleaning
  else {
    prediction = 'Cleaning';
    confidence = 70 + Math.floor(Math.random() * 15);
  }
  
  // Display results
  const inputValues = {
    ph, hardness, solids, chloramines, sulfate, conductivity,
    organic_carbon: organicCarbon, trihalomethanes, turbidity
  };
  
  console.log('Input Values:', inputValues);
  console.log('Prediction:', prediction, 'Confidence:', confidence);
  
  displayResults(prediction, confidence, inputValues, usedDefaults);
  
  // CRITICAL: Display treatment recommendations
  console.log('=== Calling displayTreatmentRecommendations ===');
  displayTreatmentRecommendations(inputValues);
  console.log('=== Finished displayTreatmentRecommendations ===');
}

// Display results
function displayResults(prediction, confidence, inputValues, usedDefaults) {
  const resultsSection = document.getElementById('resultsSection');
  const resultsCard = resultsSection.querySelector('.results__card');
  const resultIcon = document.getElementById('resultIcon');
  const resultTitle = document.getElementById('resultTitle');
  const resultDescription = document.getElementById('resultDescription');
  const confidenceValue = document.getElementById('confidenceValue');
  const resultsSummary = document.getElementById('resultsSummary');
  
  // Set prediction data
  const usageType = usageTypes[prediction];
  resultIcon.textContent = usageType.icon;
  resultTitle.textContent = prediction;
  resultDescription.textContent = usageType.description;
  confidenceValue.textContent = `${confidence}%`;
  
  // Set color theme
  resultsCard.className = 'results__card ' + prediction.toLowerCase();
  resultTitle.style.color = usageType.color;
  
  // Create summary grid
  resultsSummary.innerHTML = '';
  features.forEach(feature => {
    const value = inputValues[feature.name];
    const usedDefault = usedDefaults && usedDefaults[feature.name];
    const item = document.createElement('div');
    item.className = 'results__item';
    item.innerHTML = `
      <span class="results__item-label">
        ${feature.icon} ${feature.label}
        ${usedDefault ? '<span class="results__default-badge">default</span>' : ''}
      </span>
      <span class="results__item-value">${value.toFixed(2)} ${feature.unit}</span>
    `;
    resultsSummary.appendChild(item);
  });
  
  // Show results section
  resultsSection.style.display = 'block';
}

// Analyze water parameters against drinking standards
function analyzeParameter(paramName, value) {
  const standards = drinkingStandards[paramName];
  if (!standards) return { status: 'good', message: 'Within acceptable range' };
  
  let status = 'good';
  let message = 'Within drinking water standards';
  let rangeText = '';
  
  switch(paramName) {
    case 'ph':
      rangeText = `${standards.ideal_min} - ${standards.ideal_max}`;
      if (value < standards.min || value > standards.max) {
        status = 'poor';
        message = value < standards.min ? 'Too acidic' : 'Too alkaline';
      } else if (value < standards.ideal_min || value > standards.ideal_max) {
        status = 'warning';
        message = 'Acceptable but not ideal';
      }
      break;
      
    case 'hardness':
      rangeText = `< ${standards.moderate} mg/L`;
      if (value > standards.hard) {
        status = 'poor';
        message = 'Hard water';
      } else if (value > standards.soft) {
        status = 'warning';
        message = 'Moderately hard';
      }
      break;
      
    case 'solids':
      rangeText = `< ${standards.acceptable} ppm`;
      if (value > standards.needs_treatment) {
        status = 'poor';
        message = 'Exceeds acceptable limit';
      } else if (value > standards.ideal) {
        status = 'warning';
        message = 'Higher than ideal';
      }
      break;
      
    case 'chloramines':
      rangeText = `< ${standards.max} ppm`;
      if (value > standards.max) {
        status = 'warning';
        message = 'Exceeds EPA limit';
      }
      break;
      
    case 'sulfate':
      rangeText = `< ${standards.max} mg/L`;
      if (value > standards.max) {
        status = 'warning';
        message = 'Exceeds WHO/EPA guideline';
      }
      break;
      
    case 'conductivity':
      rangeText = `${standards.min} - ${standards.max} μS/cm`;
      if (value < standards.min || value > standards.max) {
        status = 'warning';
        message = 'Outside acceptable range';
      }
      break;
      
    case 'organic_carbon':
      rangeText = `< ${standards.ideal} ppm`;
      if (value > standards.ideal * 2) {
        status = 'poor';
        message = 'Significantly elevated';
      } else if (value > standards.ideal) {
        status = 'warning';
        message = 'Higher than ideal';
      }
      break;
      
    case 'trihalomethanes':
      rangeText = `< ${standards.max} μg/L`;
      if (value > standards.max) {
        status = 'warning';
        message = 'Exceeds EPA limit';
      }
      break;
      
    case 'turbidity':
      rangeText = `< ${standards.acceptable} NTU`;
      if (value > standards.acceptable) {
        status = 'poor';
        message = 'Exceeds acceptable limit';
      } else if (value > standards.ideal) {
        status = 'warning';
        message = 'Higher than ideal';
      }
      break;
  }
  
  return { status, message, rangeText };
}

// Display treatment recommendations
function displayTreatmentRecommendations(inputValues) {
  console.log('displayTreatmentRecommendations called with:', inputValues);
  
  const treatmentSection = document.getElementById('treatmentSection');
  const parameterAnalysisGrid = document.getElementById('parameterAnalysisGrid');
  const treatmentMethodsSection = document.getElementById('treatmentMethodsSection');
  
  console.log('Treatment section element:', treatmentSection);
  console.log('Parameter grid element:', parameterAnalysisGrid);
  console.log('Methods section element:', treatmentMethodsSection);
  
  // Clear previous content
  parameterAnalysisGrid.innerHTML = '';
  treatmentMethodsSection.innerHTML = '';
  
  // Analyze all parameters
  const analyses = [];
  const problematicParams = [];
  
  features.forEach(feature => {
    const value = inputValues[feature.name];
    const analysis = analyzeParameter(feature.name, value);
    
    console.log(`Analyzing ${feature.name}: value=${value}, status=${analysis.status}`);
    
    analyses.push({
      ...feature,
      value,
      ...analysis
    });
    
    if (analysis.status !== 'good') {
      console.log(`${feature.name} needs treatment!`);
      problematicParams.push({
        name: feature.name,
        label: feature.label,
        icon: feature.icon,
        value,
        unit: feature.unit,
        ...analysis
      });
    }
  });
  
  console.log('Total problematic parameters:', problematicParams.length);
  console.log('Problematic params:', problematicParams.map(p => p.name));
  
  // Display parameter analysis cards
  analyses.forEach(param => {
    const card = document.createElement('div');
    card.className = `param-card status-${param.status}`;
    
    const statusIcon = param.status === 'good' ? '✅' : (param.status === 'warning' ? '⚠️' : '❌');
    const statusText = param.status === 'good' ? 'Good' : (param.status === 'warning' ? 'Needs Treatment' : 'Poor');
    
    card.innerHTML = `
      <div class="param-card__header">
        <div class="param-card__name">
          <span class="param-card__icon">${param.icon}</span>
          <span>${param.label}</span>
        </div>
        <div class="param-card__status">
          <span>${statusIcon}</span>
          <span>${statusText}</span>
        </div>
      </div>
      <div class="param-card__value">${param.value.toFixed(2)} ${param.unit}</div>
      <div class="param-card__range">
        <strong>Ideal range:</strong> ${param.rangeText}
      </div>
    `;
    
    parameterAnalysisGrid.appendChild(card);
  });
  
  // Display treatment methods or success message
  if (problematicParams.length === 0) {
    console.log('No problematic parameters - showing success message');
    treatmentMethodsSection.innerHTML = `
      <div class="treatment__success-message">
        <div class="treatment__success-icon">✅</div>
        <h3 class="treatment__success-title">Excellent Water Quality!</h3>
        <p class="treatment__success-text">Your water meets drinking standards. All parameters are within acceptable ranges.</p>
      </div>
    `;
  } else {
    console.log('Found problematic parameters - generating treatment methods...');
    const methodsTitle = document.createElement('h3');
    methodsTitle.className = 'treatment__section-title';
    methodsTitle.textContent = 'Recommended Treatment Methods';
    treatmentMethodsSection.appendChild(methodsTitle);
    
    problematicParams.forEach(param => {
      console.log(`Creating treatment section for: ${param.name}`);
      const treatment = treatmentMethods[param.name];
      if (!treatment) {
        console.warn(`No treatment methods found for ${param.name}`);
        return;
      }
      
      const methodDiv = document.createElement('div');
      methodDiv.className = 'treatment-method';
      
      const issueText = param.status === 'poor' ? 
        `Your water has ${param.message.toLowerCase()} ${param.label} (${param.value.toFixed(2)} ${param.unit})` :
        `Your ${param.label} level (${param.value.toFixed(2)} ${param.unit}) ${param.message.toLowerCase()}`;
      
      methodDiv.innerHTML = `
        <div class="treatment-method__header">
          <h4 class="treatment-method__title">
            <span>${param.icon}</span>
            <span>${param.label} Treatment</span>
          </h4>
          <p class="treatment-method__issue"><strong>Issue:</strong> ${issueText}</p>
          <p class="treatment-method__target"><strong>Target:</strong> Ideal range: ${param.rangeText}</p>
        </div>
        <div class="treatment-method__content">
          <p class="treatment-method__subtitle">Recommended Methods:</p>
          <div class="treatment-method__cards" id="methods-${param.name}"></div>
        </div>
      `;
      
      treatmentMethodsSection.appendChild(methodDiv);
      
      // Add method cards
      const methodsContainer = methodDiv.querySelector(`#methods-${param.name}`);
      console.log(`Adding ${treatment.methods.length} methods for ${param.name}`);
      treatment.methods.forEach((method, index) => {
        const methodCard = document.createElement('div');
        methodCard.className = 'method-card';
        methodCard.innerHTML = `
          <button class="method-card__toggle" onclick="toggleMethodSteps('${param.name}', ${index})">
            <div class="method-card__info">
              <div class="method-card__name">${method.name}</div>
              <div class="method-card__description">${method.description}</div>
              <span class="method-card__effectiveness">Effectiveness: ${method.effectiveness}</span>
            </div>
            <span class="method-card__arrow">▼</span>
          </button>
          <div class="method-card__steps" id="steps-${param.name}-${index}">
            ${method.steps.map((step, i) => `
              <div class="method-step">
                <div class="method-step__number">${i + 1}</div>
                <div class="method-step__text">${step}</div>
              </div>
            `).join('')}
          </div>
        `;
        methodsContainer.appendChild(methodCard);
      });
    });
  }
  
  // Display comprehensive treatment process
  console.log('Displaying comprehensive treatment process...');
  displayComprehensiveProcess();
  
  // Show treatment section - CRITICAL!
  console.log('Setting treatment section display to block');
  treatmentSection.style.display = 'block';
  
  // Force visibility
  treatmentSection.style.opacity = '1';
  treatmentSection.style.visibility = 'visible';
  
  console.log('Treatment section final display:', window.getComputedStyle(treatmentSection).display);
  console.log('=== Treatment recommendations display complete ===');
}

// Toggle method steps
function toggleMethodSteps(paramName, methodIndex) {
  console.log(`Toggling steps for ${paramName}, method ${methodIndex}`);
  const stepsDiv = document.getElementById(`steps-${paramName}-${methodIndex}`);
  const toggleBtn = stepsDiv.previousElementSibling;
  
  if (!stepsDiv) {
    console.error(`Steps div not found: steps-${paramName}-${methodIndex}`);
    return;
  }
  
  if (stepsDiv.classList.contains('active')) {
    console.log('Closing steps');
    stepsDiv.classList.remove('active');
    toggleBtn.classList.remove('active');
    stepsDiv.style.display = 'none';
  } else {
    console.log('Opening steps');
    stepsDiv.classList.add('active');
    toggleBtn.classList.add('active');
    stepsDiv.style.display = 'block';
  }
}

// Display comprehensive treatment process
function displayComprehensiveProcess() {
  const stagesContainer = document.getElementById('treatmentStages');
  stagesContainer.innerHTML = '';
  
  comprehensiveProcess.forEach(stage => {
    const stageCard = document.createElement('div');
    stageCard.className = 'stage-card';
    stageCard.innerHTML = `
      <div class="stage-card__header">
        <div class="stage-card__number">${stage.stage}</div>
        <div class="stage-card__title">${stage.name}</div>
        <div class="stage-card__icon">${stage.icon}</div>
      </div>
      <p class="stage-card__purpose"><strong>Purpose:</strong> ${stage.purpose}</p>
      <div class="stage-card__methods">
        <div class="stage-card__methods-title">Methods:</div>
        <ul class="stage-card__methods-list">
          ${stage.methods.map(method => `<li>${method}</li>`).join('')}
        </ul>
      </div>
      <span class="stage-card__duration">⏱️ Duration: ${stage.duration}</span>
    `;
    stagesContainer.appendChild(stageCard);
  });
}

// Toggle comprehensive process
function toggleComprehensiveProcess() {
  console.log('Toggling comprehensive process');
  const content = document.getElementById('comprehensiveContent');
  const arrow = document.getElementById('comprehensiveArrow');
  const toggleBtn = document.querySelector('.treatment__comprehensive-toggle');
  
  if (!content) {
    console.error('Comprehensive content div not found');
    return;
  }
  
  if (content.style.display === 'none' || content.style.display === '') {
    console.log('Opening comprehensive process');
    content.style.display = 'block';
    arrow.textContent = '▲';
    toggleBtn.classList.add('active');
  } else {
    console.log('Closing comprehensive process');
    content.style.display = 'none';
    arrow.textContent = '▼';
    toggleBtn.classList.remove('active');
  }
}

// Analyze again
function analyzeAgain() {
  console.log('Analyze again - hiding results');
  document.getElementById('resultsSection').style.display = 'none';
  document.getElementById('treatmentSection').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      border-color: #ddd;
    }
    50% {
      transform: scale(1.05);
      border-color: var(--color-primary);
    }
  }
`;
document.head.appendChild(style);