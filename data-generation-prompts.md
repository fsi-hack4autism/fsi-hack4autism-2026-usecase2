### **1\. IEP Document Analyzer and Summarizer**

This feature needs to understand the structure and language of IEPs to translate and summarize them.

#### **A. Plain Language Translation**

*   **Dataset:** A paired dataset of IEP excerpts containing jargon and their corresponding plain-language explanations.
    
*   "You are an expert in special education law and communication. Generate 10 examples of text commonly found in an Individualized Education Program (IEP). For each example, first provide the 'Jargon-Heavy Version' as it might appear in the legal document. Then, provide the 'Plain Language Version' that explains the same concept clearly and simply to a parent with no background in education. Format each as a pair.**Example:Jargon-Heavy Version:** 'The student's deficits in phonological processing and decoding impact their ability to access the general education curriculum.'**Plain Language Version:** 'Your child has difficulty with sounding out words, which makes it hard for them to keep up with reading and other subjects in their regular classes.'"
    

#### **B. "IEP at a Glance" Dashboard**

*   **Dataset:** A collection of full, synthetic IEP documents and a corresponding JSON object for each, containing the key extracted data points for a dashboard.
    
*   "Generate a complete, realistic, but fictional Individualized Education Program (IEP) for a 5th-grade student named 'Leo' with a specific learning disability in reading. The IEP should include a PLAAFP, measurable annual goals (at least 3), a detailed service delivery grid (with frequency, duration, location), and a list of accommodations.After generating the full IEP text, extract the key information into a structured JSON object with the following schema:JSON{ "studentName": "Leo", "disabilityCategory": "Specific Learning Disability", "annualGoals": \[ { "goalID": 1, "subject": "Reading Fluency", "summary": "Increase reading speed to 90 words per minute." }, { "goalID": 2, "subject": "Reading Comprehension", "summary": "Answer 'who, what, where, when, why' questions about a grade-level text." } \], "services": \[ { "service": "Specialized Reading Instruction", "provider": "Special Education Teacher", "frequency": "3 times per week", "duration": "45 minutes per session", "location": "Resource Room" }, { "service": "Speech-Language Therapy", "provider": "SLP", "frequency": "1 time per week", "duration": "30 minutes per session", "location": "Therapy Office" } \], "accommodations": \[ "Extended time on tests (50%)", "Access to audiobooks for grade-level texts", "Preferential seating near the teacher" \]}\`\`\`"
    

### **2\. Parent and Student Empowerment Suite**

This feature focuses on generating supportive content based on IEP information.

#### **A. Meeting Prep Generator**

*   **Dataset:** A collection of potentially problematic or vague IEP excerpts paired with a list of specific, probing questions a parent could ask.
    
*   "Generate 5 examples of vague or incomplete statements from a draft IEP. For each example, create a list of 3-4 specific, constructive questions a parent should ask during the IEP meeting to get more clarity and ensure the plan is robust.**Example:Vague IEP Statement:** 'Sarah will make progress in math.'**Generated Parent Questions:**'How will we measure what "progress" looks like? Can we define a specific skill, like solving multi-digit addition problems?''What is her current skill level in math so we have a baseline to measure from?''What specific teaching strategies or supports will be used to help her make this progress?'"
    

#### **B. Student-Friendly IEP Creator**

*   **Dataset:** A set of standard IEP goals and accommodations paired with simplified, age-appropriate versions (e.g., for elementary, middle, and high school levels).
    
*   "Take the following standard IEP goal and rewrite it for three different students: an 8-year-old (2nd grade), a 12-year-old (7th grade), and a 16-year-old (10th grade). The rewritten versions should be in the first person ('I will...'), use simple language, and suggest a visual icon that could represent the goal.**Standard Goal:** 'Given a grade-level text, the student will identify the main idea and provide three supporting details from the text with 80% accuracy in 4 out of 5 trials.'**Example Output for 8-year-old:My Goal:** 'I will be able to find the 'big idea' of a story and find three things from the story that prove it.'**Icon:** A trophy or a star."
    

### **3\. Data Synthesis and Goal Generation (for Educators)**

This feature helps educators process data and draft key IEP sections.

#### **A. PLAAFP Synthesizer**

*   **Dataset:** A collection of raw, multi-source student data points and a corresponding fully-formed, compliant PLAAFP statement.
    
*   "You are a special education teacher. You have the following raw data for a fictional 4th-grade student named 'Maria'. Synthesize this data into a single, cohesive, data-driven PLAAFP statement. The PLAAFP must describe Maria's strengths, the impact of her disability on her involvement in the general curriculum, and her current academic and functional performance.**Raw Data:Standardized Test:** Woodcock-Johnson IV - Broad Reading: 75 (Below Average)**CBM Data:** Reads 3rd-grade passages at 55 words per minute (class average is 100 wpm).**Teacher Note:** 'Maria struggles to decode multi-syllable words. She avoids reading aloud in class.'**Parent Input:** 'She loves stories but gets frustrated when she has to read by herself. She's great at remembering details from stories read to her.'**Strength:** 'Excellent vocabulary and verbal reasoning skills.'"
    

#### **B. SMART Goal Recommender**

*   **Dataset:** A PLAAFP statement identifying a specific need, paired with a list of 3-5 well-written, compliant SMART goals.
    
*   "Given the following need identified in a student's PLAAFP, generate three distinct, measurable, and compliant SMART goals. Each goal should include a condition, the specific behavior, and a criterion for mastery.**Identified Need:** 'Based on classroom observation and frequency data, Alex uses negative language or puts his head down when faced with a non-preferred task, occurring in 4 out of 5 instances. This behavior impedes his ability to begin and complete his work.'**Example Output Goal:**'By the end of the IEP period, when presented with a non-preferred academic task, Alex will use a learned coping strategy (e.g., asking for a 2-minute break, using a positive self-talk phrase) instead of putting his head down, in 3 out of 4 opportunities as measured by a weekly frequency chart.'"
    

### **4\. Progress Monitoring and Reporting Assistant**

This feature automates the tracking and reporting of student progress.

#### **A. Automated Data Visualization**

*   **Dataset:** A SMART goal and a corresponding series of realistic, weekly data points over a reporting period (e.g., 9 weeks).
    
*   "Generate a 9-week set of synthetic progress monitoring data points for the following IEP goal. The data should show a trend where the student struggles for the first 3 weeks, begins to show progress after an intervention change, and is nearly on track to meet the goal by the end of the period.**Goal:** 'By May 2025, when given a 2nd-grade math worksheet, Maya will independently solve 8 out of 10 double-digit addition problems with regrouping.'**Example Output:**Week 1: 2/10Week 2: 1/10Week 3: 3/10 (Teacher notes: 'Introduced visual aids')Week 4: 5/10..."
    

#### **B. Draft Progress Reports**

*   **Dataset:** A SMART goal, a set of progress data, and a corresponding draft narrative for a progress report.
    
*   "You are a special education teacher writing a progress report. Given the goal and the data below, write a brief, parent-friendly narrative summarizing the student's progress. Include what's working and what the next steps will be.**Goal:** 'By the end of the semester, Jamal will write a complete 5-sentence paragraph containing a topic sentence, three supporting details, and a concluding sentence.'**Data:** 'Jamal is consistently writing 3-4 sentences but often forgets the concluding sentence. He is successfully using his graphic organizer to plan his topic sentence and details.'**Example Output Narrative:**'Jamal is making steady progress toward his writing goal. He is doing an excellent job using his graphic organizer to plan his paragraphs and is consistently writing strong topic sentences and supporting details. Our next step will be to focus specifically on adding a concluding sentence to wrap up his thoughts.'"
    

### **5\. Compliance and Quality Assurance**

This feature acts as a quality check for the IEP document.

#### **A. Compliance Checker**

*   **Dataset:** A collection of IEP goal statements, some compliant and some non-compliant, with labels and explanations for the errors.
    
*   "Generate 5 examples of non-compliant or poorly written IEP goals. For each goal, explain in 1-2 sentences _why_ it is non-compliant, referencing concepts like measurability, ambiguity, or time-bound criteria.**Example:Non-Compliant Goal:** 'The student will improve their attitude about school.'**Reason for Non-Compliance:** 'This goal is not measurable. "Attitude" is subjective and cannot be quantified without defining a specific, observable behavior.'"
