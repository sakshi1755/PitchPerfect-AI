import { FileText,TrendingUp,Users, Target,CheckCircle,Download,Sparkles} from "lucide-react"

 export const examples = [
    {
      title: "Tech Startup - AI Platform",
      industry: "Technology",
      stage: "Series A",
      score: "8.7/10",
      description: "AI-powered customer service automation platform targeting enterprise clients",
      strengths: "Strong technical team, clear market need, proven traction with pilot customers",
      improvements: "Need more detailed competitive analysis and customer acquisition cost breakdown",
      sampleContent: `Problem: Customer service teams are overwhelmed with repetitive inquiries, leading to poor customer experience and high operational costs.

Solution: Our AI platform automates 80% of customer inquiries using natural language processing, reducing response time from hours to seconds.

Market: $24B customer service software market growing at 15% annually.

Team: Former Google AI engineers with 10+ years experience in machine learning and enterprise software.

Traction: 3 pilot customers, $50K ARR, 95% customer satisfaction rate.

Business Model: SaaS subscription starting at $5K/month per 1000 tickets processed.

Funding: Seeking $2M Series A to scale engineering team and expand sales.`,
    },
    {
      title: "HealthTech - Remote Monitoring",
      industry: "Healthcare",
      stage: "Seed",
      score: "7.4/10",
      description: "Wearable device for continuous health monitoring of chronic disease patients",
      strengths: "FDA approval pathway clear, strong clinical validation, experienced healthcare team",
      improvements: "Revenue model needs refinement, go-to-market strategy requires more detail",
      sampleContent: `Problem: 133M Americans have chronic diseases requiring constant monitoring, but current solutions are invasive and expensive.

Solution: Non-invasive wearable device that continuously monitors vital signs and alerts healthcare providers to anomalies.

Market: $2.4B remote patient monitoring market, expected to reach $5.6B by 2025.

Team: Former Mayo Clinic physicians and biomedical engineers with 15+ years in medical device development.

Clinical Validation: 6-month study with 200 patients showed 40% reduction in hospital readmissions.

Regulatory: FDA 510(k) pathway identified, pre-submission meeting scheduled.

Business Model: B2B2C model selling to healthcare systems at $200/device + $50/month monitoring fee.

Funding: Seeking $1.5M seed funding for FDA submission and pilot program expansion.`,
    },
    {
      title: "FinTech - SMB Lending",
      industry: "Financial Services",
      stage: "Pre-seed",
      score: "6.9/10",
      description: "Alternative lending platform for small businesses using AI credit assessment",
      strengths: "Innovative credit scoring model, large addressable market, experienced fintech team",
      improvements: "Regulatory compliance strategy unclear, need stronger risk management framework",
      sampleContent: `Problem: 70% of small business loan applications are rejected by traditional banks, leaving a $150B funding gap.

Solution: AI-powered lending platform that analyzes alternative data sources to provide faster, more accurate credit decisions.

Market: $663B small business lending market with 27M potential customers in the US.

Team: Former executives from Goldman Sachs and Kabbage with deep lending and risk management experience.

Technology: Proprietary ML model analyzes 500+ data points including social media, transaction history, and industry trends.

Early Results: 15% default rate vs 25% industry average, 24-hour approval process vs 30-day traditional timeline.

Business Model: Origination fees (2-5%) plus interest spread, targeting $10M loan volume in year one.

Funding: Seeking $500K pre-seed for regulatory compliance and initial loan fund.`,
    },
  ]

 export const steps = [
    {
      title: "Upload Your Pitch",
      description: "Upload your pitch deck (PDF, PPT) or paste your content directly into the text area.",
      icon: FileText,
      tips: [
        "Include all key sections: problem, solution, market, team, traction",
        "Keep slides concise and visually appealing",
        "Ensure financial projections are realistic and well-supported",
      ],
    },
    {
      title: "AI Analysis",
      description:
        "Our AI analyzes your pitch across 50+ criteria including clarity, market opportunity, and team strength.",
      icon: Sparkles,
      tips: [
        "Analysis takes 30-60 seconds using Google Gemini AI",
        "We evaluate structure, content, and presentation",
        "Scoring is based on successful pitch patterns",
      ],
    },
    {
      title: "Review Results",
      description: "Get detailed feedback with scores out of 10, strengths, improvements, and investor questions.",
      icon: TrendingUp,
      tips: [
        "Focus on areas with lowest scores first",
        "Use recommendations to strengthen weak points",
        "Prepare for potential investor questions",
      ],
    },
    {
      title: "Download & Iterate",
      description: "Download your analysis report and use insights to improve your pitch for better investor outcomes.",
      icon: Download,
      tips: [
        "Save report for future reference",
        "Share with team members for feedback",
        "Re-analyze after making improvements",
      ],
    },
  ]

  export const BestPitchPractices=[
    {
      title: "Clear Problem Statement",
      description:
        "Start with a compelling problem that your target market genuinely faces. Use data and real examples.",
      icon: Target,
      color: "red",
    },
    {
      title: "Unique Value Proposition",
      description: "Clearly articulate what makes your solution different and why customers will choose you.",
      icon: Sparkles,
      color: "purple",
    },
    {
      title: "Market Opportunity",
      description: "Size your market realistically and show clear path to capturing meaningful share.",
      icon: TrendingUp,
      color: "blue",
    },
    {
      title: "Strong Team",
      description:
        "Highlight relevant experience and complementary skills that inspire confidence in execution.",
      icon: Users,
      color: "green",
    },
    {
      title: "Proven Traction",
      description: "Show evidence of customer demand through sales, partnerships, or user growth metrics.",
      icon: CheckCircle,
      color: "emerald",
    },
    {
      title: "Realistic Financials",
      description: "Present achievable projections with clear assumptions and path to profitability.",
      icon: FileText,
      color: "orange",
    },
  ]