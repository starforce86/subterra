# Subterra Data Services #

subterradataservices.com is a data repository for mineral ownership rights information for various properties around the country. It includes a document archive that supports ownership rights and allows property owners to define inheritance structure within their family.

The application makes collected and organized information of use to companies or professionals looking to obtain mineral ownership information without spending significant resource or hiring outside help. Thus providing opportunities in the form of referrals to purchase mineral rights and explore lands at a profit.

## Technology Stack and Integrations ###

### Backend

- Python 3.6
  - Django 3.2
  - Django REST Framework 3.12
- PostgreSQL 14.5
- Redis 7.0

### Frontend

- Nginx 1.22 (stable)
- Node 19.4
- Typescript 4.9
- React 18.2

## Development Setup ###

### Prerequisites

- Docker and Docker Compose
- Git

1. Clone this repository
1. Create `.env` by copying `.env.template` and configure at least the following:
   - Django secret key
   - Database (PostgreSQL) connection details
1. Start the containers with `docker-compose up -d`

NOTE: Installation of frontend Node modules on a fresh Docker build may take time to complete. Until then, navigating to the site may result to 502 error.

### Contribution guidelines ###

* IDE configuration
  * Check and enable support for EditorConfig, see https://editorconfig.org/ for more information
* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact
