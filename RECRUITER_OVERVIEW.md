# ACLyze AI — Recruiter Overview

ACLyze AI is an academic full-stack prototype for AI-assisted knee MRI classification and result visualization. It connects an Angular frontend, a Node.js API, and a FastAPI model service to demonstrate an end-to-end medical-imaging workflow.

## Important scope and safety notice

This project is intended for educational and research demonstration only. It is not a medical device, has not been clinically validated, and must not be used for diagnosis, treatment, or other clinical decisions.

## Shawky Elsayed's contribution

- Built and integrated Angular product workflows for MRI upload, result review, role-based dashboards, and downloadable reports.
- Implemented Node.js API capabilities including authentication, authorization, real-time updates, and media/report handling.
- Integrated the external FastAPI model service and surfaced predictions and explainability visualizations in the web experience.
- Contributed to responsive UI implementation, animation, API documentation, and deployment-oriented setup.

Team history and repository commits remain the source of truth for exact ownership.

## Demo status

The frontend and supporting services have been deployed using free-tier platforms. Free resources may sleep, cold-start, expire, or become temporarily unavailable, so an end-to-end hosted demo is not guaranteed to remain continuously online.

Recruiters can still evaluate the project through:

- the screenshots and walkthrough video linked in the main README;
- the public frontend and model repositories;
- local setup instructions;
- the documented architecture and API surface.

## What this project demonstrates

- Full-stack Angular and Node.js integration
- JWT authentication and role-based access control
- FastAPI model-service integration
- Real-time application events with Socket.IO
- File, image, and report handling
- Explainability-oriented visualizations
- Responsive dashboards and administrative workflows

## Known limitations

- Academic prototype rather than a regulated clinical product
- Model quality depends on the training data and validation methodology
- Hosted services may be unavailable because they use free infrastructure
- Predictions require qualified human review and are not medical conclusions
