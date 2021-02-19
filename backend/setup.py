import io
import re

from setuptools import find_packages, setup

dev_requirements = [
    'autopep8==1.5.5',
    'flake8==3.8.4',
    'isort==5.7.0'
]

run_requirements = [
    'bcrypt==3.2.0',
    'fastapi==0.63.0',
    'gunicorn==20.0.4',
    'httptools==0.1.1',
    'loguru==0.5.3',
    'PyJWT==2.0.1',
    'psycopg2==2.8.6',
    'SQLAlchemy==1.3.23',
    'uvicorn==0.13.3',
    'uvloop==0.15.0'
]

with io.open('api/__init__.py', encoding='utf8') as version_f:
    version_match = re.search(r"^__version__ = ['\"]([^'\"]*)['\"]",
                              version_f.read(), re.M)
    if version_match:
        version = version_match.group(1)
    else:
        raise RuntimeError("Unable to find version string.")

setup(
    name="essayb",
    version=version,
    author="essayb.com.br",
    author_email="essayb@gmail.com",
    packages=find_packages(),
    include_package_data=True,
    url="https://github.com/senavs/essayb.com.br",
    description="Advanced Software Lab (LAS) essay blog project.",
    zip_safe=False,
    install_requires=run_requirements,
    extras_require={
        'dev': dev_requirements
    },
    python_requires='>=3.9',
    keywords=()
)
