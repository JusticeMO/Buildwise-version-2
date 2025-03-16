
import { Bell, CreditCard, PieChart, FileText, Calendar, PhoneCall, Mail, Smartphone, BarChart4, CheckCircle, Clock, Receipt, CalendarClock, Landmark, Phone } from 'lucide-react';
import React from 'react';

export interface RentFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  details?: {
    subTitle: string;
    description: string;
    benefits: string[];
    icon?: React.ReactNode;
  }[];
}

export const rentFeatures: RentFeature[] = [
  {
    title: "Automated Reminders",
    description: "Customizable rent reminders sent via SMS, email, or app notifications to reduce late payments.",
    icon: <Bell className="text-primary" size={20} />,
    details: [
      {
        subTitle: "Multi-Channel Notifications",
        description: "Reach tenants through their preferred communication channels for maximum effectiveness.",
        icon: <PhoneCall className="text-primary" size={20} />,
        benefits: [
          "SMS alerts for immediate attention",
          "Email notifications with payment details and history",
          "Push notifications through the tenant mobile app",
          "WhatsApp integration for convenient reminders"
        ]
      },
      {
        subTitle: "Smart Scheduling",
        description: "Intelligent reminder system that adapts to tenant behavior.",
        icon: <Calendar className="text-primary" size={20} />,
        benefits: [
          "Customizable reminder frequency (weekly, 3-days, 1-day before due date)",
          "Follow-up reminders for overdue payments",
          "Time-zone aware scheduling for international property owners",
          "Seasonal payment schedule adjustments"
        ]
      },
      {
        subTitle: "Personalization Options",
        description: "Tailor reminders to build better landlord-tenant relationships.",
        icon: <Mail className="text-primary" size={20} />,
        benefits: [
          "Custom messaging templates with property branding",
          "Personalized greeting and tenant name",
          "Include specific payment instructions and options",
          "Multilingual support for diverse tenant communities"
        ]
      }
    ]
  },
  {
    title: "Flexible Payment Options",
    description: "Accept M-Pesa, bank transfers, cards, and more with automatic reconciliation.",
    icon: <CreditCard className="text-primary" size={20} />,
    details: [
      {
        subTitle: "Mobile Money Integration",
        description: "Seamless integration with Kenya's most popular payment platforms.",
        icon: <Phone className="text-primary" size={20} />,
        benefits: [
          "M-Pesa direct integration with payment tracking",
          "Airtel Money support for broader coverage",
          "Automatic payment confirmation via SMS",
          "Unique payment reference codes for each transaction"
        ]
      },
      {
        subTitle: "Traditional Banking Options",
        description: "Support for conventional banking methods with automated tracking.",
        icon: <Landmark className="text-primary" size={20} />,
        benefits: [
          "Direct bank transfer tracking through bank APIs",
          "Manual bank deposit recording and verification",
          "Standing order and direct debit setup assistance",
          "Multi-currency support for international property owners"
        ]
      },
      {
        subTitle: "Card Payments",
        description: "Modern card payment solutions for tech-savvy tenants.",
        icon: <CreditCard className="text-primary" size={20} />,
        benefits: [
          "Credit and debit card processing with major networks",
          "Recurring payment setup for hassle-free rent collection",
          "Secure payment gateway with PCI compliance",
          "Instant payment confirmation and receipt generation"
        ]
      }
    ]
  },
  {
    title: "Payment Tracking",
    description: "Real-time dashboard showing paid, pending, and overdue rent payments across all units.",
    icon: <PieChart className="text-primary" size={20} />,
    details: [
      {
        subTitle: "Real-Time Analytics",
        description: "Comprehensive payment tracking across your entire property portfolio.",
        icon: <BarChart4 className="text-primary" size={20} />,
        benefits: [
          "Live payment status updates as payments are processed",
          "Property-level and unit-level payment reports",
          "Payment trend analysis and forecasting",
          "Custom dashboards for property managers and owners"
        ]
      },
      {
        subTitle: "Payment Status Management",
        description: "Clear categorization and management of all payment statuses.",
        icon: <CheckCircle className="text-primary" size={20} />,
        benefits: [
          "Color-coded payment status indicators (paid, pending, overdue)",
          "Automated status updates based on payment verification",
          "Payment history archiving and retrieval",
          "Dispute flagging and resolution tracking"
        ]
      },
      {
        subTitle: "Landlord Notifications",
        description: "Stay informed about your rental income without constant monitoring.",
        icon: <Clock className="text-primary" size={20} />,
        benefits: [
          "Daily payment summaries via email or SMS",
          "Instant notifications for large payments",
          "Overdue payment alerts with suggested actions",
          "Monthly collection reports with financial analysis"
        ]
      }
    ]
  },
  {
    title: "Digital Receipts",
    description: "Automatic generation and distribution of rent receipts to tenants via email or SMS.",
    icon: <FileText className="text-primary" size={20} />,
    details: [
      {
        subTitle: "Automated Documentation",
        description: "Instantly generate professional receipts for every payment.",
        icon: <Receipt className="text-primary" size={20} />,
        benefits: [
          "Custom receipt templates with property branding",
          "Compliance with local tax and housing regulations",
          "Digital signatures for legal validity",
          "Payment history included on each receipt"
        ]
      },
      {
        subTitle: "Multi-Channel Delivery",
        description: "Ensure tenants always have access to their payment records.",
        icon: <Smartphone className="text-primary" size={20} />,
        benefits: [
          "Automatic email delivery with PDF attachments",
          "SMS with secure receipt download links",
          "In-app access to all historical receipts",
          "Option for scheduled monthly receipt summaries"
        ]
      },
      {
        subTitle: "Record Management",
        description: "Comprehensive record-keeping for landlords and tenants.",
        icon: <FileText className="text-primary" size={20} />,
        benefits: [
          "Centralized storage of all payment records",
          "Easy export for accounting and tax purposes",
          "Tenant portal with access to personal payment history",
          "Advanced search and filtering of payment records"
        ]
      }
    ]
  },
  {
    title: "Payment Plans",
    description: "Create custom payment plans for tenants needing flexible arrangements.",
    icon: <Calendar className="text-primary" size={20} />,
    details: [
      {
        subTitle: "Custom Scheduling",
        description: "Accommodate various tenant needs with flexible payment structures.",
        icon: <CalendarClock className="text-primary" size={20} />,
        benefits: [
          "Weekly, bi-weekly, or monthly payment cycles",
          "Split payment options for roommates or families",
          "Seasonal adjustments for businesses with cyclical income",
          "Deposit distribution across multiple months"
        ]
      },
      {
        subTitle: "Payment Restructuring",
        description: "Manage tenant financial hardships while protecting your income.",
        icon: <CreditCard className="text-primary" size={20} />,
        benefits: [
          "One-click payment plan creation for late payments",
          "Automated installment tracking and reminders",
          "Partial payment acceptance with balance tracking",
          "Late fee adjustments based on payment plan compliance"
        ]
      },
      {
        subTitle: "Documentation & Agreements",
        description: "Legally sound payment arrangements with clear terms.",
        icon: <FileText className="text-primary" size={20} />,
        benefits: [
          "Digital payment plan agreements with e-signatures",
          "Payment plan history for tenant reliability assessment",
          "Automatic payment plan expiration and renewal notices",
          "Integration with lease agreements and amendments"
        ]
      }
    ]
  }
];
