 # 🛡️ PhishAI - AI-Powered Phishing Detection & Training 🧠🎯  

🔮 **Website:** [PhishAI.co](https://phishai.co/) 

---
## 🚀 Introduction  
Phishing is one of the most **dangerous and deceptive** cyber threats today. Attackers use emails, websites, and messages to trick individuals into revealing sensitive information like passwords, banking details, and personal data. The consequences? **Financial losses, identity theft, and corporate data breaches.**  

**Introducing PhishAI** – an **AI-driven, interactive phishing detection and training platform** that helps individuals and businesses **identify, analyze, and defend against phishing attacks**.  

---

## 🔥 Why PhishAI?  
### The Problem:  
📌 90% of data breaches are caused by phishing.  
📌 Social engineering attacks are becoming more sophisticated.  
📌 Employees and individuals lack proper phishing awareness training.  

### The Solution:  
✅ **AI-Powered Phishing Detection:** Uses **AWS Bedrock, Amazon Polly, and SageMaker** to **analyze emails and links** in real-time.  
✅ **Real-World Phishing Training:** Interactive scenarios that **simulate phishing emails, calls, and websites**.  
✅ **Gamified Learning Experience:** Score points, level up, and become a phishing expert!  
✅ **Enterprise-Grade Security Training:** Helps businesses **train employees and reduce cybersecurity risks**.  

---

## 🏗️ Project Structure  
```plaintext
📦 PhishAI
├── 📜 LICENSE
├── 📜 README.md
├── 🏢 app
│   ├── 🛠️ handlers
│   │   ├── scenario_handler.py         # Handles different phishing training scenarios
│   │   └── user_response_handler.py    # Processes user responses in training sessions
│   ├── 🏗️ lambda
│   │   ├── main.py                     # AWS Lambda function for processing phishing detections
│   │   └── requirements.txt            # Dependencies for Lambda
│   └── 🛠️ utils
│       ├── bedrock_client.py           # AWS Bedrock API integration for AI analysis
│       ├── polly_client.py             # AWS Polly for voice-based phishing training
│       └── sagemaker_client.py         # AWS SageMaker for ML-powered phishing detection
├── 📖 docs
│   ├── 🖼️ architecture_diagram.png     # System architecture overview
│   ├── 📜 design_decisions.md          # Explanation of tech stack and decisions
│   └── 🚀 roadmap.md                   # Future improvements and features
├── 🌐 frontend
│   ├── 📜 README.md                     # Frontend documentation
│   ├── 📜 eslint.config.js              # Linter configuration
│   ├── 📜 index.html                     # Main entry point for the frontend
│   ├── 📜 package.json                   # Frontend dependencies
│   ├── 🎨 postcss.config.js              # CSS processing setup
│   ├── 🖼️ public/
│   │   ├── favicon1.png                  # App favicon
│   │   ├── images/
│   │   │   └── facebook-logo.png          # Example phishing email logo
│   │   └── vite.svg                       # Vite logo for UI
│   ├── 🖌️ src/
│   │   ├── 🖥️ App.jsx                    # Main React component
│   │   ├── 🖼️ assets/
│   │   │   └── react.svg                  # React logo asset
│   │   ├── 🛠️ components/
│   │   │   ├── 🔐 AuthForm.jsx            # Authentication form (future feature)
│   │   │   ├── ✉️ ContactForm.jsx         # Contact support form
│   │   │   ├── 📧 ScenarioDisplay.jsx     # Displays phishing training scenarios
│   │   │   └── 🛠️ ui/
│   │   │       ├── 🚨 alert.jsx           # Custom alert component
│   │   │       └── 📝 card.jsx            # Reusable UI card component
│   │   ├── ⚙️ config/
│   │   │   └── 📜 scenarios.js           # Phishing training scenarios
│   │   ├── 🎨 index.css                   # Global CSS styles
│   │   └── 🚀 main.jsx                    # React app entry point
│   ├── 🎨 tailwind.config.js              # Tailwind CSS configuration
│   └── 🛠️ vite.config.js                  # Vite build configuration
├── ☁️ infrastructure
│   ├── 📦 lambda_package.zip             # Packaged Lambda function for AWS
│   ├── 📜 main.tf                         # Terraform infrastructure definition
│   ├── 📜 outputs.tf                      # Terraform output variables
│   ├── 📜 providers.tf                    # Terraform provider configurations
│   ├── 📜 terraform.tfstate               # Terraform state file
│   └── 📜 variables.tf                    # Terraform variables
├── 🤖 models
│   └── 🧠 model_configs/
│       └── stable_diffusion_config.json   # AI model configuration
├── 📜 package-lock.json                    # Dependency lockfile
├── 🎭 scenarios
│   └── 📜 prompts/
│       ├── 📜 Lvl 1 scam.txt              # Beginner phishing scenario
│       ├── 📜 Lvl 2 RealEmail.txt         # Legitimate email scenario
│       ├── 📜 Lvl 3 scam2.txt             # Intermediate phishing scenario
│       ├── 📜 Lvl 4 ScamEmail.txt         # Advanced phishing scenario
│       ├── 📜 Lvl 5 RealEmail.txt         # Another legitimate email example
│       └── 📜 scam_call2.txt              # Phone call phishing script
└── 🛠️ test
│   ├── 🔍 integration/
│   │   └── 🧪 test_api_calls.py           # Tests for API calls
│   └── 🧪 unit/
│       └── 🧪 test_scenario_logic.py      # Tests for phishing scenario logic
``` 
---

## 🛠️ How PhishAI Works  

1️⃣ **Real-Time Phishing Detection**  
🔹 Uses **AWS Bedrock** to analyze emails & URLs for phishing indicators.  
🔹 Flags **suspicious content, bad links, and social engineering tactics**.  

2️⃣ **AI-Powered Phishing Simulations**  
🔹 Provides **interactive email & call-based phishing scenarios**.  
🔹 Uses **AWS Polly** to generate **realistic voice phishing** attacks.  

3️⃣ **Machine Learning-Based Threat Analysis**  
🔹 Uses **AWS SageMaker** for advanced **phishing detection models**.  
🔹 Learns from user behavior to **improve security awareness**.  

4️⃣ **Gamified Training Experience**  
🔹 Users **earn points & progress through levels** to become cybersecurity experts!  
🔹 Features **real-world phishing examples** to test your skills.  

---

## 🔮 Future Roadmap  
✔️ **Multi-Language Support** 🌍  
✔️ **AI Chatbot for Phishing Queries** 🤖  
✔️ **Integration with Security Awareness Platforms** 🔐  

---

## 📢 Stay Secure!  
Phishing attacks are **constantly evolving** – but with PhishAI, you and your team can stay **one step ahead**. Whether you’re an **individual, business, or security professional**, PhishAI **empowers you** with the tools needed to **identify, prevent, and educate** against phishing threats.  

🔹 **Ready to start your AI-driven security training?** Contact us today! 📩  

---
## 📩 Contact & Support  

📧 **Email (not set up yet):** support@phishai.co  
📞 **Phone (not set up yet):** +1-800-PHISH-AI  
🌐 **Website:** [PhishAI.co](https://phishai.co/)  
🔗 **LinkedIn (not set up yet):** [linkedin.com/company/PHISHAI](https://www.linkedin.com/in/amiya-islam-devopsengineer/)  

---
## 💡 Stay Secure. Stay Ahead. Choose **PhishAI**. 🛡️🔍  