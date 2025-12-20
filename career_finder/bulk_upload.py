import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'career_finder.settings')
django.setup()

from API.models import CareerPath

def populate_data():
    careers = [
        {"title": "Backend Developer", "category": "Technology", "required_skills": "Python, Django, SQL", "min_salary": 70000, "max_salary": 130000, "difficulty_level": "Intermediate", "description": "Builds server-side logic."},
        {"title": "Frontend Developer", "category": "Technology", "required_skills": "React, JavaScript, CSS", "min_salary": 65000, "max_salary": 120000, "difficulty_level": "Intermediate", "description": "Builds user interfaces."},
        {"title": "Data Analyst", "category": "Data", "required_skills": "Excel, SQL, Tableau", "min_salary": 55000, "max_salary": 95000, "difficulty_level": "Beginner", "description": "Interprets data for business."},
        {"title": "DevOps Engineer", "category": "Technology", "required_skills": "Docker, AWS, Linux", "min_salary": 90000, "max_salary": 160000, "difficulty_level": "Advanced", "description": "Manages infrastructure."},
        {"title": "UX Designer", "category": "Design", "required_skills": "Figma, Research, Prototyping", "min_salary": 60000, "max_salary": 110000, "difficulty_level": "Beginner", "description": "Designs user experiences."},
        {"title": "Cybersecurity Analyst", "category": "Technology", "required_skills": "Network Security, Linux, Python", "min_salary": 80000, "max_salary": 150000, "difficulty_level": "Advanced", "description": "Protects systems from attacks."},
        {"title": "Product Manager", "category": "Management", "required_skills": "Agile, Strategy, Communication", "min_salary": 85000, "max_salary": 145000, "difficulty_level": "Intermediate", "description": "Oversees product development."},
        {"title": "Financial Analyst", "category": "Finance", "required_skills": "Excel, Accounting, Modeling", "min_salary": 60000, "max_salary": 105000, "difficulty_level": "Intermediate", "description": "Evaluates financial data."},
        {"title": "AI Engineer", "category": "Technology", "required_skills": "Python, PyTorch, Linear Algebra", "min_salary": 110000, "max_salary": 200000, "difficulty_level": "Advanced", "description": "Builds machine learning models."},
        {"title": "Cloud Architect", "category": "Technology", "required_skills": "AWS, Azure, Networking", "min_salary": 100000, "max_salary": 180000, "difficulty_level": "Advanced", "description": "Designs cloud systems."}
    ]

    for item in careers:
        CareerPath.objects.get_or_create(title=item['title'], defaults=item)
    
    print(f"Successfully added {len(careers)} career paths!")

if __name__ == "__main__":
    populate_data()