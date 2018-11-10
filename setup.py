#!/usr/bin/env python

import os
import sys

from setuptools import setup, find_packages


if sys.argv[-1] == 'publish':
    os.system('python setup.py sdist upload')
    sys.exit()

try:
    import pypandoc
    readme = pypandoc.convert('README.md', 'rst')
    history = pypandoc.convert('CHANGELOG.md', 'rst')
except (IOError, ImportError):
    readme = open('README.md').read()
    history = open('CHANGELOG.md').read()

# Get rid of Sphinx markup
history = history.replace('.. :changelog:', '')

setup_args = dict(
    name='dlgr_contrib.normal_form_games',
    version='0.1.0',
    description='A simple Dallinger experiment.',
    long_description=readme + '\n\n' + history,
    author='Fred Callaway & Karreskog',
    author_email='fredcallaway@gmail.com',
    url='https://github.com/fredcallaway/dlgr_contrib.normal_form_games',
    packages=find_packages('.'),
    package_dir={'': '.'},
    namespace_packages=['dlgr_contrib'],
    include_package_data=True,
    install_requires=[
        'setuptools',
    ],
    license='MIT',
    zip_safe=False,
    keywords='Dallinger normal_form_games',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Natural Language :: English',
        'Programming Language :: Python :: 2.7',
    ],
    entry_points={
        'dallinger.experiments': [
            'TestExperiment = dlgr_contrib.normal_form_games.experiment:TestExperiment',
        ],
    },
)

setup(**setup_args)
