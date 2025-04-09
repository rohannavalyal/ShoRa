# ShoRa

ShoRa is a modern property rental platform built with Next.js, offering a seamless experience for property listing, booking, and management.

## Features

- **Property Listings**: Browse and search through available properties with detailed information and images
- **User Authentication**: Secure login and registration system
- **Reservations**: Book properties and manage your reservations
- **Favorites**: Save and manage your favorite properties
- **Property Management**: List and manage your own properties
- **Interactive Map**: View property locations with an integrated map interface
- **Responsive Design**: Fully optimized for all devices

## Tech Stack

- **Frontend**: Next.js 13 with App Router, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js
- **Maps**: Leaflet
- **UI Components**: Custom components with modern design

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in `.env`:
   ```
   DATABASE_URL=your_mongodb_url
   NEXTAUTH_SECRET=your_secret
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/app` - Main application code using Next.js 13 App Router
- `/components` - Reusable React components
- `/hooks` - Custom React hooks
- `/prisma` - Database schema and migrations
- `/public` - Static assets

## Deployment

The application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com)
3. Configure your environment variables
4. Deploy!

## Troubleshooting

### Common Issues and Solutions

#### Markdown Preview Issues
- **Syntax Errors**: If the preview isn't rendering correctly, check for:
  - Unclosed tags or brackets
  - Malformed frontmatter
  - Missing line breaks between sections
  - **Solution**: Use a Markdown editor (VS Code, Dillinger) to validate syntax

#### Performance Issues
- **Large File Size**: If the README contains many images or is very large:
  - Remove unnecessary content
  - Optimize image sizes
  - Host large media files externally
  - **Solution**: Keep content concise and well-organized

#### Encoding Problems
- **Character Encoding**: If you see garbled text or strange characters:
  - Ensure the file is saved in UTF-8 encoding
  - Remove any invisible control characters
  - **Solution**: Use a modern text editor (VS Code, Notepad++) to convert to UTF-8

#### Build and Preview
- **Development Server Issues**:
  - Clear your browser cache
  - Try an incognito window
  - Restart the development server
  - **Solution**: Run `npm run dev` in a fresh terminal

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.