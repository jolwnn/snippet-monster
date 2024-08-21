# Snippet Monster

## Your Code, Perfectly Curated
Snippet Monster is a web application designed to help developers organise and manage their commonly used code snippets efficiently. This small passion project was built at the end of my internship at Vucar, serving as a culmination of the skills I learned and applied during my time there. As someone who often copies and pastes commonly used pieces of code—such as terminal commands and self-designed React components—into notes apps, I created Snippet Monster to streamline the process of storing and retrieving code snippets. I was also curious about how my favourite notes apps, such as Notion, work, and hence I built Snippet Monster as a simplified editor and storage system with basic features, to gain a deeper understanding of the underlying mechanisms that power such applications.

Try it out here! [](https://snippet-monster.vercel.app/)

## Features

- **Organized Snippet Management**: Store code snippets with titles, descriptions, tags, and code previews.
- **Efficient Search**: Quickly find snippets using keywords or tags.
- **User Authentication**: Securely log in and manage your own snippets.
- **Autosave**: Real-time saving of your snippets as you type.
- **Responsive Design**: A user-friendly interface that adapts to all devices.
- **Snippet Sharing**: (Coming Soon) Share your snippets with others easily.
- **Folder Hierarchies**: (Coming Soon) Organize your snippets into folders.

<p align="center">
  <img src="https://github.com/user-attachments/assets/3d964ee6-9f83-4525-b1e3-941432150fb0" alt="landing-preview" width="50%">
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/ed8fd7c8-ef20-4891-8cd1-3dae0112c2c8" alt="login-preview" width="50%">
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/ceaef7b4-1514-4ede-ab9e-d2ab9b71b193" alt="dashboard-preview" width="50%">
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/2f7e2637-4d97-427d-966d-db91ca7909c3" alt="editor-preview" width="50%">
</p>

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend and Auth**: Supabase (PostgreSQL), Drizzle ORM, Node.js
- **Deployment**: Vercel, but was also successfully attempted with Nginx and AWS EC2

## Installation

To run Snippet Monster locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/snippet-monster.git
   cd snippet-monster
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following:

   ```bash
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**

   Visit `http://localhost:8083` to see Snippet Monster in action.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Forking or Cloning
If you choose to fork or clone this repository, please give me proper credit by linking back to my github here: [jolwnn](https://github.com/jolwnn). I put significant time and effort in designing and building the application, and your acknowledgment is greatly appreciated. Thanks!
