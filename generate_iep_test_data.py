"""
generate_iep_test_data.py

Generates synthetic IEP (Individualized Education Program) test data
modeled after the structure of three real IEP documents:
  - MZ_IEP_6_7_2024  : 11-year-old, ASD, Nashoba Learning Group (ABA-intensive)
  - AK_IEP_2024      : 19-year-old, ASD + Intellectual + Neurological, Cardinal Cushing (residential)
  - AK_IEP_Draft_2025: 21-year-old, same student, updated draft IEP

All personally-identifying values are replaced with plausible synthetic data.
No real names, DOBs, SASIDs, addresses, or phone numbers are used.

Output: iep_test_data.json  (array of synthetic IEP records)
        iep_test_data.csv   (flat summary row per student-IEP)
"""

import json
import csv
import random
import uuid
from datetime import date, timedelta
from pathlib import Path

# ── Seed for reproducibility ────────────────────────────────────────────────
random.seed(42)

# ── Reference pools ──────────────────────────────────────────────────────────

FIRST_NAMES_M = [
    "Ethan", "Marcus", "Daniel", "Tyler", "Jordan", "Nathan", "Caleb",
    "Owen", "Isaiah", "Liam", "Noah", "Aiden", "Lucas", "Mason", "Logan",
]
FIRST_NAMES_F = [
    "Sophia", "Emma", "Olivia", "Ava", "Isabella", "Mia", "Charlotte",
    "Amelia", "Harper", "Evelyn", "Abigail", "Emily", "Ella", "Scarlett",
]
LAST_NAMES = [
    "Thompson", "Rivera", "Patel", "Chen", "Nguyen", "Robinson", "Martinez",
    "Clark", "Lewis", "Walker", "Hall", "Young", "Allen", "Hernandez", "King",
    "Wright", "Scott", "Green", "Baker", "Nelson",
]

DISABILITIES = [
    ["Autism"],
    ["Autism", "Intellectual Impairment"],
    ["Autism", "Intellectual Impairment", "Neurological Impairment"],
    ["Autism", "Neurological Impairment"],
    ["Intellectual Impairment"],
    ["Intellectual Impairment", "Health Impairment"],
]

PLACEMENTS = [
    {"type": "Separate Day School - Private", "name": "Nashoba Learning Group",
     "city": "Billerica, MA", "residential": False},
    {"type": "Residential School", "name": "Cardinal Cushing Centers",
     "city": "Hanover, MA", "residential": True},
    {"type": "Residential School", "name": "Perkins School for the Blind",
     "city": "Watertown, MA", "residential": True},
    {"type": "Separate Day School - Private", "name": "May Institute",
     "city": "Randolph, MA", "residential": False},
    {"type": "Separate Day School - Public", "name": "Collaborative for Educational Services",
     "city": "Northampton, MA", "residential": False},
    {"type": "Substantially Separate", "name": "Regional Public School",
     "city": "Springfield, MA", "residential": False},
]

SENDING_DISTRICTS = [
    "Brookline Public Schools", "Franklin Public Schools", "Newton Public Schools",
    "Lexington Public Schools", "Weston Public Schools", "Natick Public Schools",
    "Framingham Public Schools", "Needham Public Schools",
]

GOAL_AREAS_YOUNG = [
    "Behavior", "Social and Communication", "English Language Arts",
    "Math and Science", "Daily Living Skills", "Occupational Therapy",
]
GOAL_AREAS_TRANSITION = [
    "Functional Life Skills", "Vocational Independence",
    "Receptive and Pragmatic Language", "ADL/IADL",
    "Community", "Vocational Exploration", "Communication", "Praxis",
]

RELATED_SERVICES = [
    {"service": "ABA Therapy",             "provider": "Trained ABA Therapist"},
    {"service": "Speech and Language",     "provider": "SLP/SLPA"},
    {"service": "Occupational Therapy",    "provider": "OTR/COTA"},
    {"service": "Behavior Consultation",   "provider": "BCBA"},
    {"service": "Case Management",         "provider": "Student Program Coordinator"},
    {"service": "Residential",             "provider": "Residential Life Skills Instructor"},
    {"service": "Functional Life Skills/Vocational", "provider": "Special Education Teacher"},
]

PARENT_LANGUAGES = [
    "English", "Mandarin Chinese / English", "Spanish / English",
    "Haitian Creole / English", "Portuguese / English", "Vietnamese / English",
]

ACCOMMODATIONS_POOL = [
    "Gain student's attention prior to engaging",
    "Break down multi-step directions with modeling/repetition",
    "Use of first/then language",
    "Check back for comprehension",
    "Additional processing/response time",
    "Access to visual supports",
    "Daily visual schedule",
    "Visual timer for transitions",
    "Access to noise-dampening headphones",
    "Access to fidgets/sensory strategies",
    "Prompts to use fist bumps only (boundary support)",
    "Access to social stories",
    "Highly structured routine across settings",
    "Access to breaks/movement breaks",
    "Scribe for longer written output or option to type",
    "Use of calculator for mathematical computations",
    "Preferential seating away from doors/windows",
    "Slant board and weighted pencil when writing",
    "Staff within arm's reach during community outings",
    "Male staff required for bathroom supervision",
    "Preview community experience and expectations",
    "Use of word 'pause' instead of 'stop'",
    "Mnemonic/sing-song devices for multi-step recall",
    "Bold lines for cutting with scissors",
    "Use of elevator when available (cataplexy protocol)",
]

STRENGTHS_POOL = [
    "Strong memory skills",
    "Enjoys music and singing",
    "Excellent reader",
    "Participates willingly in all activities",
    "Gets along well with peers",
    "Enthusiastic community participation",
    "Strong vocabulary",
    "Responds well to visual schedules",
    "Hard-working and kind",
    "Enjoys outdoor activities (swings, trampoline)",
    "Motivated by preferred activities",
    "Benefits from mnemonic devices",
    "Good self-advocate for own needs",
    "Enjoys arts and crafts",
    "Strong interest in geography and maps",
]

BEHAVIORAL_CONCERNS_POOL = [
    "Self-injurious behavior (SIB): pinching, biting",
    "Aggression: hitting, slapping",
    "Screaming / disruptive vocalizations",
    "Elopement / wandering",
    "Difficulty with transitions from preferred activities",
    "Sexualized touch-seeking behaviors",
    "Low tolerance for noise",
    "Fixation on specific topics or items",
    "Difficulty waiting",
    "Resistance to unfamiliar people/places",
    "Bathrooming accidents (BMs in clothing)",
    "Swiping materials off desk when non-compliant",
    "Running to bathroom when overexcited",
]

TRANSITION_INTERESTS_POOL = [
    "Making beds", "Walking dogs", "Stocking shelves",
    "Recycling", "Laundry / folding", "Greenhouse / horticulture",
    "Culinary / food prep", "Shredding / clerical", "Central supply / deliveries",
    "Cleaning / janitorial", "Craft boutique / thrift store",
]

# ── Helpers ──────────────────────────────────────────────────────────────────

def fake_sasid():
    return str(random.randint(1_000_000_00, 9_999_999_99))

def fake_school_id():
    return str(random.randint(100_000, 999_999))

def fake_dob(min_age: int, max_age: int) -> date:
    today = date.today()
    days = random.randint(min_age * 365, max_age * 365)
    return today - timedelta(days=days)

def age_on(dob: date, ref: date) -> int:
    return ref.year - dob.year - ((ref.month, ref.day) < (dob.month, dob.day))

def fake_iep_date(base: date | None = None) -> tuple[date, date]:
    """Returns (start_date, end_date) ~1 year span."""
    if base is None:
        base = date.today() - timedelta(days=random.randint(0, 365))
    end = date(base.year + 1, base.month, base.day)
    return base, end

def pick(lst, n=None):
    if n is None:
        return random.choice(lst)
    return random.sample(lst, min(n, len(lst)))

def fake_name(gender="M"):
    first = pick(FIRST_NAMES_M if gender == "M" else FIRST_NAMES_F)
    last  = pick(LAST_NAMES)
    return first, last

def fake_phone():
    area = random.randint(200, 999)
    mid  = random.randint(200, 999)
    end  = random.randint(1000, 9999)
    return f"({area}) {mid}-{end}"

def fake_address():
    num    = random.randint(10, 999)
    streets = ["Maple St", "Oak Ave", "Elm Rd", "Washington Blvd",
               "Lincoln Ave", "Cedar Ln", "Park Dr", "Main St"]
    cities  = ["Franklin, MA 02038", "Brookline, MA 02445",
               "Newton, MA 02458", "Natick, MA 01760",
               "Lexington, MA 02420", "Needham, MA 02492"]
    return f"{num} {pick(streets)}, {pick(cities)}"

def build_goal(area: str, goal_num: int, age: int) -> dict:
    """Construct a plausible IEP goal dict."""
    transition = age >= 14
    num_objectives = random.randint(3, 6)
    objectives = []
    for i in range(1, num_objectives + 1):
        objectives.append({
            "objective_id": f"{goal_num}.{i:02d}",
            "description": f"[Objective {goal_num}.{i:02d} for {area}] — "
                           f"Student will demonstrate skill with ≥80% accuracy "
                           f"across 3 consecutive sessions with ≥2 staff.",
        })
    return {
        "goal_number": goal_num,
        "goal_area": area,
        "measurable_annual_goal": (
            f"Student will demonstrate improvement in {area.lower()} "
            f"as measured by the following objectives."
        ),
        "criteria": "80% accuracy in 4 out of 5 opportunities observed",
        "measurement_method": pick(["Data Collection", "Observation", "Work Samples",
                                    "Data Collection and Observation"]),
        "reporting_schedule": pick(["End of Quarter", "Bi-weekly", "Monthly"]),
        "responsible_person": pick(["Special Education Teacher", "SLP/SLPA",
                                    "OTR/COTA", "BCBA", "Case Manager"]),
        "objectives": objectives,
    }

def build_services(placement: dict, age: int) -> list[dict]:
    """Pick a realistic set of related services."""
    services = []
    if placement["residential"]:
        pool = [s for s in RELATED_SERVICES if s["service"] != "ABA Therapy"]
        core = pick(pool, random.randint(4, 6))
        # Always include residential for residential placements
        res = {"service": "Residential", "provider": "Residential Life Skills Instructor"}
        if res not in core:
            core.append(res)
    else:
        # ABA-intensive day program
        core = [{"service": "ABA Therapy", "provider": "Trained ABA Therapist"}]
        extras = [s for s in RELATED_SERVICES if s["service"] != "ABA Therapy"
                  and s["service"] != "Residential"]
        core += pick(extras, random.randint(2, 4))

    for svc in core:
        if svc["service"] == "ABA Therapy":
            freq = "30 hours/week"
        elif svc["service"] == "Residential":
            freq = "8160 min/week"
        elif svc["service"] in ("Speech and Language", "Occupational Therapy"):
            freq = f"{random.choice([30,45,60])} min/week"
        elif svc["service"] == "Behavior Consultation":
            freq = "30 min/month"
        else:
            freq = f"{random.choice([30,60])} min/week"
        services.append({
            "service": svc["service"],
            "provider_role": svc["provider"],
            "location": "Special Education Setting",
            "frequency": freq,
            "type": "Direct" if svc["service"] in ("ABA Therapy", "Speech and Language",
                                                     "Occupational Therapy", "Residential",
                                                     "Functional Life Skills/Vocational")
                    else "Consultation",
        })
    return services

# ── Core record builder ───────────────────────────────────────────────────────

def build_iep_record(profile: str = "young") -> dict:
    """
    profile: 'young'      → ages 8–13  (e.g. MZ-type)
             'transition' → ages 18–21 (e.g. AK-type)
    """
    gender = pick(["M", "F"], 1)[0] if random.random() > 0.3 else "M"  # slight M bias matching docs
    first, last = fake_name(gender)
    full_name = f"{first} {last}"

    if profile == "young":
        dob = fake_dob(8, 13)
    else:
        dob = fake_dob(18, 21)

    iep_start, iep_end = fake_iep_date()
    age_at_iep = age_on(dob, iep_start)

    disabilities = pick(DISABILITIES)
    placement    = pick(PLACEMENTS)
    district     = pick(SENDING_DISTRICTS)

    # Goals
    if profile == "young":
        goal_areas = pick(GOAL_AREAS_YOUNG, random.randint(3, 6))
    else:
        goal_areas = pick(GOAL_AREAS_TRANSITION, random.randint(3, 5))

    goals = [build_goal(area, i + 1, age_at_iep) for i, area in enumerate(goal_areas)]

    # Accommodations
    accommodations = pick(ACCOMMODATIONS_POOL, random.randint(6, 12))

    # Behavioral concerns
    behavioral_concerns = pick(BEHAVIORAL_CONCERNS_POOL, random.randint(2, 5))

    # Strengths
    strengths = pick(STRENGTHS_POOL, random.randint(3, 6))

    # Services
    services = build_services(placement, age_at_iep)

    # Parent info
    parent1_lang = pick(PARENT_LANGUAGES)
    parent2_lang = pick(PARENT_LANGUAGES)

    # Transition fields (age 14+)
    transition_data = None
    if age_at_iep >= 14:
        transition_interests = pick(TRANSITION_INTERESTS_POOL, random.randint(2, 4))
        transition_data = {
            "projected_completion_date": str(date(iep_start.year + (22 - age_at_iep), 1, 25)),
            "completion_document": "Certificate of Attainment",
            "employment_interests": transition_interests,
            "living_preference": pick([
                "Group home near family",
                "Supported apartment",
                "Residential program",
                "Family home with supports",
            ]),
            "dds_referral_submitted": random.choice([True, False]),
            "chapter_688_referral": random.choice([True, False]),
            "extended_year_required": True,
        }

    record = {
        "record_id": str(uuid.uuid4()),
        "iep_type": "Annual Review",
        "iep_dates": {
            "start": str(iep_start),
            "end":   str(iep_end),
        },
        "student": {
            "full_name":       full_name,
            "sasid":           fake_sasid(),
            "school_id":       fake_school_id(),
            "dob":             str(dob),
            "age_at_iep":      age_at_iep,
            "gender":          gender,
            "grade":           str(min(12, max(1, age_at_iep - 5))) if age_at_iep < 18 else "SP",
            "primary_language": "English",
            "address":         fake_address(),
        },
        "disability_profile": {
            "primary_disabilities": disabilities,
            "english_learner":      False,
            "assistive_technology": random.choice([True, False]),
        },
        "sending_district": district,
        "placement": {
            "type":         placement["type"],
            "school_name":  placement["name"],
            "city":         placement["city"],
            "residential":  placement["residential"],
            "extended_year": True,
        },
        "parents_guardians": [
            {
                "relationship":     "Mother",
                "primary_language": parent1_lang,
                "phone":            fake_phone(),
                "email":            f"parent1_{random.randint(100,999)}@example.com",
            },
            {
                "relationship":     "Father",
                "primary_language": parent2_lang,
                "phone":            fake_phone(),
                "email":            f"parent2_{random.randint(100,999)}@example.com",
            },
        ],
        "present_levels": {
            "strengths":           strengths,
            "behavioral_concerns": behavioral_concerns,
            "accommodations":      accommodations,
            "nonparticipation_in_gen_ed": True,
            "nonparticipation_reason": (
                "Student requires intensive/specialized instruction; "
                "disability severity prevents satisfactory education in general ed with supplementary aids."
            ),
        },
        "goals": goals,
        "services": services,
        "assessments": {
            "mcas_participation": pick([
                "With accommodations",
                "Alternate assessment",
                "MCAS requirements met",
            ]),
            "accommodations_list": pick([
                ["Human read-aloud", "Separate setting", "Frequent breaks"],
                ["Scribe", "Human read-aloud", "Familiar test administrator"],
                ["Alternate assessment – all content areas"],
            ]),
        },
        "transition": transition_data,
        "meeting_info": {
            "date":    str(iep_start),
            "type":    "Annual Review",
            "next_annual_review": str(iep_end),
            "next_triennial_eval": str(iep_end + timedelta(days=365 * 2)),
        },
    }
    return record


# ── Generate dataset ──────────────────────────────────────────────────────────

def generate_dataset(n_young: int = 30, n_transition: int = 20) -> list[dict]:
    records = []
    for _ in range(n_young):
        records.append(build_iep_record("young"))
    for _ in range(n_transition):
        records.append(build_iep_record("transition"))
    random.shuffle(records)
    return records


def write_json(records: list[dict], path: str) -> None:
    with open(path, "w", encoding="utf-8") as f:
        json.dump(records, f, indent=2, ensure_ascii=False)
    print(f"  ✓ JSON  → {path}  ({len(records)} records)")


def write_csv(records: list[dict], path: str) -> None:
    """Write a flat summary CSV — one row per IEP."""
    rows = []
    for r in records:
        s = r["student"]
        p = r["placement"]
        rows.append({
            "record_id":           r["record_id"],
            "iep_start":           r["iep_dates"]["start"],
            "iep_end":             r["iep_dates"]["end"],
            "student_name":        s["full_name"],
            "sasid":               s["sasid"],
            "dob":                 s["dob"],
            "age_at_iep":          s["age_at_iep"],
            "gender":              s["gender"],
            "grade":               s["grade"],
            "sending_district":    r["sending_district"],
            "primary_disabilities": " | ".join(r["disability_profile"]["primary_disabilities"]),
            "placement_type":      p["type"],
            "placement_school":    p["school_name"],
            "residential":         p["residential"],
            "extended_year":       p["extended_year"],
            "num_goals":           len(r["goals"]),
            "goal_areas":          " | ".join(g["goal_area"] for g in r["goals"]),
            "num_services":        len(r["services"]),
            "transition_flag":     r["transition"] is not None,
            "mcas_participation":  r["assessments"]["mcas_participation"],
            "assistive_technology": r["disability_profile"]["assistive_technology"],
            "english_learner":     r["disability_profile"]["english_learner"],
        })

    fieldnames = list(rows[0].keys())
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    print(f"  ✓ CSV   → {path}  ({len(rows)} rows, {len(fieldnames)} columns)")


# ── Main ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    out_dir = Path(__file__).parent

    print("Generating synthetic IEP test data …")
    records = generate_dataset(n_young=30, n_transition=20)   # 50 total

    json_path = out_dir / "iep_test_data.json"
    csv_path  = out_dir / "iep_test_data.csv"

    write_json(records, str(json_path))
    write_csv(records,  str(csv_path))

    # Quick sanity stats
    young_count = sum(1 for r in records if r["student"]["age_at_iep"] < 14)
    trans_count = len(records) - young_count
    residential = sum(1 for r in records if r["placement"]["residential"])
    print(f"\nSummary:")
    print(f"  Total records  : {len(records)}")
    print(f"  Young (8-13)   : {young_count}")
    print(f"  Transition 14+ : {trans_count}")
    print(f"  Residential    : {residential}")
    print(f"  Day programs   : {len(records) - residential}")
    print("\nDone.")
