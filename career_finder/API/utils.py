def calculate_match_score(user_skills, career_skills):
    if not user_skills or not career_skills:
        return 0.0

    user_set = set(user_skills.lower().split(','))
    career_set = set(career_skills.lower().split(','))

    matches = user_set.intersection(career_set)

    score = (len(matches) / len(career_set)) * 100
    return round(score, 2)
