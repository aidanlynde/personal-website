export type LeadStatus =
  | 'new'
  | 'needs_review'
  | 'ready_for_outreach'
  | 'contacted'
  | 'meeting_scheduled'
  | 'proposal_sent'
  | 'won'
  | 'lost'

export type LeadType =
  | 'Startup'
  | 'Small Business'
  | 'Family Business'
  | 'Referral Partner'
  | 'Enterprise'
  | 'Other'

export type RecommendedOffer =
  | 'Software Clarity Audit'
  | 'Prototype to Production'
  | 'MVP Build Sprint'
  | 'AI Workflow Automation'

export type RelationshipWarmth = 'cold' | 'warm' | 'hot'

export type Priority = 'high' | 'medium' | 'low'

export interface Lead {
  id: string

  // Raw intake
  source_text: string | null
  linkedin_profile_url: string | null
  linkedin_post_url: string | null
  company_website: string | null
  personal_context: string | null
  voice_transcript: string | null

  // Person (AI extracted)
  name: string | null
  title: string | null
  company: string | null

  // Company (AI extracted)
  industry: string | null
  company_description: string | null
  company_size: string | null

  // Relationship
  relationship_context: string | null
  relationship_warmth: RelationshipWarmth | null

  // Classification
  lead_type: LeadType | null
  recommended_offer: RecommendedOffer | null

  // Score
  lead_score: number | null
  score_reasoning: string | null

  // CRM status
  status: LeadStatus
  priority: Priority
  tags: string[]

  // AI generated content
  ai_summary: string | null
  why_this_lead: string | null
  conversation_starter: string | null
  suggested_outreach: string | null
  questions_to_ask: string[] | null
  potential_opportunities: string | null
  potential_risks: string | null

  // Accuracy fields
  facts: string | null
  ai_inferences: string | null
  missing_information: string | null

  // User-supplied context fields
  what_caught_attention: string | null
  possible_opportunity: string | null
  possible_service_fit: string | null
  additional_notes: string | null
  manual_notes: string | null
  next_followup_date: string | null

  // Raw AI output
  ai_analysis_json: Record<string, unknown> | null

  created_at: string
  updated_at: string
}

export interface LeadSummary {
  id: string
  name: string | null
  company: string | null
  title: string | null
  lead_type: LeadType | null
  recommended_offer: RecommendedOffer | null
  lead_score: number | null
  status: LeadStatus
  priority: Priority
  relationship_warmth: RelationshipWarmth | null
  tags: string[]
  created_at: string
  updated_at: string
}

export interface AIAnalysis {
  person: {
    name: string | null
    title: string | null
    company: string | null
  }
  company_info: {
    industry: string | null
    description: string | null
    estimated_size: string | null
    size_confidence: 'fact' | 'inference' | 'unknown'
  }
  relationship: {
    how_known: string | null
    warmth: RelationshipWarmth
    warmth_reasoning: string
  }
  lead_classification: LeadType
  recommended_offer: RecommendedOffer
  lead_score: number
  score_reasoning: string
  ai_summary: string
  why_this_lead: string
  conversation_starter: string
  suggested_outreach: string
  questions_to_ask: string[]
  potential_opportunities: string
  potential_risks: string
  facts: string
  ai_inferences: string
  missing_information: string
}

export interface CRMStats {
  total: number
  new: number
  needs_review: number
  ready_for_outreach: number
  contacted: number
  meeting_scheduled: number
  proposal_sent: number
  won: number
  lost: number
}

export interface LeadIntakeInput {
  source_text: string
  linkedin_profile_url?: string
  linkedin_post_url?: string
  company_website?: string
  personal_context?: string
  voice_transcript?: string
  what_caught_attention?: string
  possible_opportunity?: string
  possible_service_fit?: string
  additional_notes?: string
}

export interface SessionData {
  isAuthenticated?: boolean
}
