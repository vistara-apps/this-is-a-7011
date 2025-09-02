# GigsLocal

GigsLocal is a neighborhood marketplace for tasks and skills, connecting individuals in a local community to find and offer micro-gigs and skill-based collaborative projects.

![GigsLocal Screenshot](https://api.dicebear.com/7.x/identicon/svg?seed=gigslocal&backgroundColor=6366f1)

## Features

### Micro-Gig Discovery
- Browse and apply for short-term, paid tasks posted by others in your immediate vicinity
- Search by distance and task type
- Quickly find and earn money from nearby tasks that fit your schedule and location

### Skill-Based Project Board
- Post or find local projects or collaborations that require specific skills
- Connect with local collaborators for projects
- Filter projects by required skills

### In-App Messaging & Collaboration
- Secure in-app chat for discussing gig details
- Coordinate collaboration on projects
- Streamlined communication between users

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Authentication**: Farcaster, RainbowKit
- **Backend**: Supabase
- **Payments**: Web3 payments with transaction fees

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase account
- Farcaster/Neynar API key
- WalletConnect Project ID

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/gigslocal.git
   cd gigslocal
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file based on `.env.example` and fill in your API keys:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Supabase Schema

The application uses the following Supabase tables:

### Users
- `user_id` (primary key)
- `farcaster_id`
- `username`
- `profile_picture_url`
- `location`
- `skills` (array)
- `bio`
- `wallet_address`
- `created_at`

### Gigs
- `gig_id` (primary key)
- `poster_id` (foreign key to users)
- `title`
- `description`
- `location_proximity`
- `payment_amount`
- `status` (open, in_progress, completed, cancelled)
- `created_at`
- `expires_at`
- `assigned_user_id` (foreign key to users, optional)

### Gig Applicants
- `gig_id` (foreign key to gigs)
- `user_id` (foreign key to users)
- `status` (pending, accepted, rejected)
- `created_at`

### Projects
- `project_id` (primary key)
- `creator_id` (foreign key to users)
- `title`
- `description`
- `required_skills` (array)
- `status` (seeking_members, in_progress, completed, cancelled)
- `created_at`
- `completed_at` (optional)

### Project Members
- `project_id` (foreign key to projects)
- `user_id` (foreign key to users)
- `role` (creator, member)
- `joined_at`

### Conversations
- `conversation_id` (primary key)
- `participants` (array of user_ids)
- `gig_id` (foreign key to gigs, optional)
- `project_id` (foreign key to projects, optional)
- `created_at`
- `updated_at`

### Messages
- `message_id` (primary key)
- `conversation_id` (foreign key to conversations)
- `sender_id` (foreign key to users)
- `content`
- `timestamp`
- `read_by` (array of user_ids)

### Payments
- `payment_id` (primary key)
- `gig_id` (foreign key to gigs)
- `amount`
- `fee_amount`
- `fee_percentage`
- `total_amount`
- `status` (pending, completed, failed)
- `payer_address`
- `created_at`

### Notifications
- `id` (primary key)
- `user_id` (foreign key to users)
- `type` (gig_application, project_join, message, payment)
- `message`
- `read` (boolean)
- `data` (JSON)
- `created_at`

## Business Model

GigsLocal uses a micro-transaction business model with:
- 5-10% transaction fee on completed micro-gigs
- Optional premium features for project creators (e.g., featured listings)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

