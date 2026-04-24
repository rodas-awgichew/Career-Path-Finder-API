"""
  Calculates a simple match score between a user's skills
  and the required skills of a career path.
"""

def calculate_match_score(user_skills, career_skills):
    if not user_skills or not career_skills:
        return 0.0
    user_set = {s.strip().lower() for s in user_skills.split(',') if s.strip()}
    career_set = {s.strip().lower() for s in career_skills.split(',') if s.strip()}
    matches = user_set.intersection(career_set)
    return round((len(matches) / len(career_set)) * 100, 2)

