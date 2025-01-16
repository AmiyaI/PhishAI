// src/config/scenarios.js
export const scenarios = {
    email: [
      {
        id: 'email-1',
        type: 'security_alert',
        from: 'security@faceboock.com',
        subject: 'Account Security Alert',
        content: {
          title: 'Account Security Alert',
          body: 'We have detected suspicious activity on your account. To protect your information, please click the link below to verify your identity:',
          link: 'https://faceboock.com/account/verify?id=12345&token=abc123',
          footer: `Failure to verify your account may result in account suspension.
          
  Sincerely,
  Facebook Security Team`,
          contact: 'davebunson@faceboock.com',
        },
        redFlags: ['Misspelled domain name', 'Urgency in message', 'Suspicious link'],
        isPhishing: true,
      },
      {
        id: 'email-2',
        type: 'payment_notification',
        from: 'billing@amaz0n.com',
        subject: 'Your Recent Amazon Purchase',
        content: {
          title: 'Order Confirmation #AMZ-89562',
          body: 'We noticed an unusual purchase on your account for $499.99. If you didn\'t make this purchase, click below to dispute the charge:',
          link: 'https://amaz0n.com/billing/dispute',
          footer: `Amazon Billing Department
  This is an automated message.`,
          contact: 'support@amaz0n.com',
        },
        redFlags: ['Misspelled domain', 'Creating urgency', 'Unusual purchase alert'],
        isPhishing: true,
      },
      {
        id: 'email-3',
        type: 'it_support',
        from: 'helpdesk@company-corp.net',
        subject: 'Immediate Action Required: Password Reset',
        content: {
          title: 'Mandatory Password Reset',
          body: 'Due to a recent security update, all employees must reset their passwords within 24 hours. Click here to maintain access:',
          link: 'https://company-corp.net.password-reset.ru/login',
          footer: `IT Support Team
  URGENT: Account suspension if not completed`,
          contact: 'support@company-corp.net',
        },
        redFlags: ['Suspicious domain extension', 'Time pressure', 'Generic sender'],
        isPhishing: true,
      },
      {
        id: 'email-4',
        type: 'invoice',
        from: 'invoicing@microsoft.com',
        subject: 'Your Microsoft 365 Invoice',
        content: {
          title: 'Microsoft 365 Subscription Renewal',
          body: `Your Microsoft 365 subscription has been renewed. Please find your invoice attached.
  
  Subscription: Microsoft 365 Business Standard
  Amount: $12.50
  Period: 01/15/2025 - 02/14/2025`,
          link: 'https://microsoft.com/billing',
          footer: `Microsoft Billing
  This is an automated message.`,
          contact: 'billing@microsoft.com',
        },
        redFlags: [],
        isPhishing: false,
      },
      {
        id: 'email-5',
        type: 'prize_notification',
        from: 'prize@luckydraw-winner.com',
        subject: 'Congratulations! You\'ve Won!',
        content: {
          title: '🎉 YOU ARE OUR LUCKY WINNER! 🎉',
          body: 'Dear Lucky User,\n\nYou have been randomly selected to receive a prize of $1,000,000! To claim your prize, please verify your identity by providing your bank details:',
          link: 'https://luckydraw-winner.com/claim-prize',
          footer: `Lucky Draw International
  Reply within 24 hours to claim your prize!`,
          contact: 'claim@luckydraw-winner.com',
        },
        redFlags: ['Unknown sender', 'Too good to be true', 'Requests banking information'],
        isPhishing: true,
      },
    ],
    voice: [
      {
        id: 'voice-1',
        type: 'social_security',
        caller: 'SSA Officer',
        script: `Hello, this is Officer Moore from the Social Security Administration. We've detected some suspicious activity on your Social Security account. To verify your identity and prevent your account from being suspended, I'll need to confirm your Social Security number.`,
        redFlags: ['Government agency calling', 'Requests SSN', 'Creating urgency'],
        isPhishing: true,
      },
      {
        id: 'voice-2',
        type: 'tech_support',
        caller: 'Microsoft Support',
        script: `Hi, I'm calling from Microsoft Technical Support. Our systems have detected a virus on your computer that's stealing your personal information. I can help you remove it, but first I'll need remote access to your computer.`,
        redFlags: ['Unsolicited tech support', 'Requests remote access', 'Creating fear'],
        isPhishing: true,
      },
      {
        id: 'voice-3',
        type: 'bank_fraud',
        caller: 'Bank Security',
        script: `This is the fraud department of your bank. We've noticed suspicious transactions on your account. To secure your account, please verify your card number and CVV.`,
        redFlags: ['Requests card details', 'Generic bank reference', 'Urgent tone'],
        isPhishing: true,
      },
      {
        id: 'voice-4',
        type: 'utility_company',
        caller: 'Energy Provider',
        script: `This is your energy provider. Your account is seriously past due and service will be disconnected in one hour unless you make an immediate payment using a prepaid card.`,
        redFlags: ['Immediate threat', 'Requests prepaid card', 'High pressure'],
        isPhishing: true,
      },
      {
        id: 'voice-5',
        type: 'irs_scam',
        caller: 'IRS Agent',
        script: `I am calling from the IRS regarding a tax fraud case against your name. There is a warrant for your arrest unless you immediately pay the outstanding amount using gift cards.`,
        redFlags: ['IRS impersonation', 'Mentions arrest', 'Requests gift cards'],
        isPhishing: true,
      },
    ],
    web: [
      {
        id: 'web-1',
        type: 'login_page',
        url: 'https://faceboock.com/login',
        title: 'Facebook Login',
        content: {
          logo: '/images/facebook-logo.png',
          formFields: ['email', 'password'],
          submitButton: 'Log In',
        },
        redFlags: ['Misspelled domain', 'Subtle logo differences', 'HTTP instead of HTTPS'],
        isPhishing: true,
      },
      {
        id: 'web-2',
        type: 'banking_portal',
        url: 'https://secure-banking.chase-verify.com',
        title: 'Chase Online Banking',
        content: {
          logo: '/images/chase-logo.png',
          formFields: ['username', 'password', 'security questions'],
          submitButton: 'Secure Login',
        },
        redFlags: ['Suspicious subdomain', 'Additional security questions', 'Different URL structure'],
        isPhishing: true,
      },
      {
        id: 'web-3',
        type: 'payment_portal',
        url: 'https://paypa1.com/login',
        title: 'PayPal Login',
        content: {
          logo: '/images/paypal-logo.png',
          formFields: ['email', 'password'],
          submitButton: 'Log In Securely',
        },
        redFlags: ['Number instead of letter', 'Different font', 'Modified logo'],
        isPhishing: true,
      },
      {
        id: 'web-4',
        type: 'google_docs',
        url: 'https://docs.google.com-share.to/document',
        title: 'Google Docs - Sign In',
        content: {
          logo: '/images/google-logo.png',
          formFields: ['email', 'password'],
          submitButton: 'Next',
        },
        redFlags: ['Unusual domain structure', 'Different URL pattern', 'Modified Google interface'],
        isPhishing: true,
      },
      {
        id: 'web-5',
        type: 'microsoft_365',
        url: 'https://login.microsoft0ffice.com',
        title: 'Microsoft 365 Login',
        content: {
          logo: '/images/microsoft-logo.png',
          formFields: ['email', 'password'],
          submitButton: 'Sign In',
        },
        redFlags: ['Zero instead of O', 'Incorrect domain', 'Slight visual differences'],
        isPhishing: true,
      },
    ],
  }