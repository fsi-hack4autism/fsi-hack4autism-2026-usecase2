# Autism Longitudinal Profile Data Model

## Category Summary

This model organizes autism support information across 17 key dimensions:

1. **Identity & Personal Context** — Demographics, diagnoses, personal identity
2. **Developmental History** — Milestones, early signs, parent observations
3. **Diagnostic & Clinical Evaluations** — Assessment scores and clinician narratives
4. **Communication Profile** — Expressive, receptive, social, and supported communication
5. **Sensory & Regulation Profile** — Sensory processing, regulation indicators, and supports
6. **Executive Functioning & Daily Living** — Planning, task initiation, and independence levels
7. **Education History** — Schools, programs, academics, and educational turning points
8. **Employment & Vocational Profile** — Work history, workplace strengths/challenges, career interests
9. **Strengths, Interests & Talents** — Special interests, cognitive strengths, achievements
10. **Social & Relationship Profile** — Relationships, social preferences, masking costs
11. **Mental Health & Wellbeing** — Mental health history, protective factors, crisis history
12. **Supports, Services & Interventions** — Therapies, support outcomes, and effectiveness tracking
13. **Environmental Fit Profile** — Helpful and difficult environments
14. **Goal & Growth Tracking** — Personal goals, growth narrative, self-reflection
15. **Timeline & Event System** — Chronological events with source attribution
16. **Source & Evidence Layer** — Attribution, confidence levels, and evidence types
17. **Ethical & Privacy Design** — Permissions, consent tracking, and strengths-based framing

---

## Core Design Principle

A high-quality autism support profile should answer:

> “Who is this person, what helps them succeed, what challenges them, and how have they grown?”

The system should avoid becoming a deficit-only medical archive. Instead, it should capture:

- capabilities,
- regulation patterns,
- environmental fit,
- lived experience,
- strengths,
- and longitudinal growth.

---

# Recommended Data Categories

## 1. Identity & Personal Context

### Demographics

- Name / preferred name
- Pronouns
- Birth year
- Languages spoken
- Cultural background
- Geographic region
- Family structure

### Neurotype & Diagnoses

- Autism diagnosis history
- Diagnostic level/specifiers
- Co-occurring conditions
  - ADHD
  - Anxiety
  - Dyspraxia
  - Intellectual disability
  - Epilepsy
  - Learning disorders
  - OCD
  - Sleep disorders
- Diagnostic uncertainty or reassessments

### Personal Identity

- Self-identity statements
- Special interests
- Motivators
- Values
- Personality descriptors
- Communication preferences

---

## 2. Developmental History

### Early Childhood Development

#### Milestones

- Speech/language milestones
- Motor milestones
- Toilet training
- Feeding history
- Sleep patterns
- Social engagement patterns
- Play styles

#### Early Signs

- Sensory differences
- Repetitive behaviors
- Hyperfocus
- Regression periods
- Emotional regulation patterns

#### Parent/Caregiver Observations

- Concerns raised
- Strengths observed
- Environmental triggers
- Soothing strategies

---

## 3. Diagnostic & Clinical Evaluations

### Evaluations

- Autism assessments
- Cognitive testing
- Speech-language evaluations
- Occupational therapy evaluations
- Psychoeducational assessments
- Behavioral assessments
- Adaptive functioning assessments

### Structured Scores

Store both:

- Raw scores
- Interpretations

Examples:

- IQ/cognitive profile
- Adaptive functioning
- Executive functioning
- Sensory processing
- Language comprehension
- Emotional regulation

### Clinician Narrative

Preserve qualitative observations, not just scores.

---

## 4. Communication Profile

### Expressive Communication

- Spoken language
- AAC use
- Sign language
- Typing/writing preference
- Gestural communication

### Receptive Communication

- Literal interpretation tendencies
- Processing speed
- Multi-step instruction challenges
- Preferred information formats

### Social Communication

- Conversation style
- Eye contact preferences
- Reciprocity patterns
- Group interaction comfort
- Online vs in-person communication

### Communication Supports

- Visual schedules
- Written instructions
- Processing time
- Predictability supports

---

## 5. Sensory & Regulation Profile

### Sensory Processing

Track:

- Sensitivity
- Seeking
- Avoidance
- Neutral

Modalities:

- Sound
- Light
- Touch
- Texture
- Taste
- Smell
- Movement/vestibular
- Proprioception
- Temperature
- Crowding/social density

### Regulation Indicators

- Stress signals
- Shutdown indicators
- Meltdown indicators
- Burnout patterns
- Recovery needs

### Regulation Supports

- Stimming preferences
- Safe spaces
- Movement breaks
- Noise reduction
- Compression/deep pressure
- Solitude needs

---

## 6. Executive Functioning & Daily Living

### Executive Function

- Task initiation
- Working memory
- Planning
- Time awareness
- Transitions
- Cognitive flexibility
- Decision fatigue

### Daily Living Skills

- Hygiene
- Cooking
- Transportation
- Financial skills
- Medication management
- Household routines

### Independence Profile

Track:

- Independent
- Assisted
- Supervised
- Unsupported difficulty

---

## 7. Education History

### School Timeline

- Schools attended
- Program types
- Inclusion/support models
- Homeschooling periods
- Postsecondary education

### Academic Profile

Separate:

- Aptitude
- Achievement
- Engagement

Areas:

- Reading
- Writing
- Math
- Science
- Creativity
- Technology
- Problem-solving

### Support History

- IEP/IPP history
- Accommodations
- EA/support worker involvement
- Assistive technology
- Classroom modifications

### Social Experiences

- Friendships
- Bullying history
- Group participation
- Extracurriculars

### Educational Turning Points

Track:

- Successful interventions
- School transitions
- Burnout periods
- Major growth periods

---

## 8. Employment & Vocational Profile

### Work History

- Jobs
- Volunteer roles
- Internships
- Supported employment

### Workplace Strengths

Examples:

- Pattern recognition
- Persistence
- Technical focus
- Creativity
- Accuracy

### Workplace Challenges

- Ambiguity
- Interruptions
- Sensory overload
- Meetings
- Social expectations
- Multitasking

### Accommodations

- Remote work
- Written communication
- Noise control
- Flexible scheduling

### Career Interests

- Passions
- Long-term goals
- Meaningful work environments

---

## 9. Strengths, Interests & Talents

### Special Interests

Track:

- Duration
- Intensity
- Learning depth
- Functional role

### Cognitive Strengths

- Memory
- Systems thinking
- Creativity
- Analytical reasoning
- Empathy
- Visual thinking

### Talents & Achievements

- Awards
- Projects
- Hobbies
- Self-taught skills
- Artistic work

---

## 10. Social & Relationship Profile

### Relationships

- Family dynamics
- Friendships
- Mentorships
- Romantic relationships
- Community belonging

### Social Preferences

- Group size comfort
- Structured vs spontaneous interaction
- Online community participation

### Social Fatigue

- Masking cost
- Recovery time
- Burnout triggers

---

## 11. Mental Health & Wellbeing

### Mental Health History

- Anxiety
- Depression
- Trauma
- Burnout
- Self-esteem
- Emotional regulation

### Protective Factors

- Supportive people
- Interests
- Routines
- Environments
- Coping strategies

### Crisis History

Carefully permissioned and privacy-protected.

---

## 12. Supports, Services & Interventions

### Therapies & Supports

- Occupational therapy
- Speech therapy
- CBT
- Social groups
- Coaching
- AAC support

### Intervention Outcomes

Track:

- Benefit
- Harm
- Neutrality
- Individual preference

---

## 13. Environmental Fit Profile

### Helpful Environments

- Quiet spaces
- Structured expectations
- Flexible pacing
- Small groups
- Remote interaction

### Difficult Environments

- Unpredictability
- Sensory chaos
- Excessive social ambiguity
- Rapid task switching

---

## 14. Goal & Growth Tracking

### Personal Goals

- Independence
- Friendships
- Communication
- Education
- Employment
- Emotional regulation

### Growth Narrative

Capture:

- Breakthroughs
- Resilience
- Adaptive strategies
- Emerging strengths

### Self-Reflection

The individual’s own voice should be central whenever possible.

---

## 15. Timeline & Event System

You likely need:

- Chronological events
- Tagged domains
- Source attribution
- Confidence levels
- Narrative summaries

### Event Types

- Evaluation
- Diagnosis
- School transition
- Major achievement
- Burnout period
- Therapy start/end
- Accommodation change
- Life transition

---

## 16. Source & Evidence Layer

For every data point track:

- Source
- Author
- Date
- Confidence
- Structured vs subjective
- Verified vs anecdotal

Possible sources:

- Parents
- Clinicians
- Teachers
- Self-report
- Report documents
- Observations

---

## 17. Ethical & Privacy Design

### Avoid

- Purely deficit framing
- Functioning-label reduction
- “Severity score” identity collapse

### Support

- Autonomy
- Self-advocacy
- Strengths-based narratives
- Editable self-representation

### Permissions Model

Different visibility levels:

- Self
- Parent
- Clinician
- School
- Employer
- Support worker

### Consent Tracking

Especially important when:

- Minors age into adulthood
- Caregivers previously controlled records

---

# Suggested High-Level Schema

```text
Person
 ├── Identity
 ├── Timeline Events
 ├── Evaluations
 ├── Communication Profile
 ├── Sensory Profile
 ├── Education History
 ├── Employment History
 ├── Strengths & Interests
 ├── Supports & Interventions
 ├── Goals & Growth
 ├── Environmental Fit
 ├── Wellbeing
 └── Sources & Permissions
```

---

# Most Valuable Advanced Features

## Pattern Detection

Identify:

- Burnout precursors
- Successful supports
- Environmental mismatch patterns
- Transition risks

## Narrative Synthesis

Generate:

- Strengths summaries
- Accommodation recommendations
- Transition reports
- “About me” profiles

## Longitudinal Growth Visualization

Show:

- Skill growth
- Independence gains
- Communication evolution
- Support need changes over time

## Contextual Recommendations

Example:

> “Written instructions and reduced transition frequency correlate with improved school participation.”

---

# Final Design Principle

Many autistic adults strongly dislike systems that:

- Over-medicalize them
- Preserve only deficits
- Speak about them instead of with them

The highest-quality systems:

- Preserve the individual’s voice
- Allow disagreement with evaluations
- Track flourishing, not just impairment
- Recognize that support needs fluctuate by environment and stress load
