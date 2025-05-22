# Personal Wallet Frontend Application

## 🚀 Getting Started

### Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm**: Usually comes with Node.js installation
- **Git**: For cloning the repository ([Download Git](https://git-scm.com/))

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone <https://github.com/jasper-tech/Personal-Wallet.git>
   cd personal-wallet
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   This command will install all required packages including:

   - Next.js and React
   - TypeScript and type definitions
   - Tailwind CSS and PostCSS
   - Lucide React icons
   - Recharts for data visualization
   - Other development dependencies

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

4. **Open Your Browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm run dev`: Starts the development server with hot reload
- `npm run build`: Creates an optimized production build
- `npm run start`: Runs the production build (requires `npm run build` first)
- `npm run lint`: Runs ESLint to check code quality
- `npm run type-check`: Runs TypeScript compiler to check types

### Development Environment Setup

1. **Verify Installation**

   ```bash
   node --version  # Should show v18.0.0 or higher
   npm --version   # Should show 8.0.0 or higher
   ```

2. **Environment Configuration**
   The application uses mock data and doesn't require environment variables for basic functionality.

3. **Code Editor Setup** (Recommended)
   - Install VS Code extensions:
     - TypeScript and JavaScript Language Features
     - Tailwind CSS IntelliSense
     - ESLint
     - Prettier

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adapted layout with collapsible navigation
- **Mobile**: Touch-optimized interface with bottom navigation

## 🧪 Mock Data

The application uses realistic mock data including:

- Sample transactions with various categories and statuses
- Contact lists for fund transfers
- Historical spending data for charts and analytics
- Account balance and financial statistics

## 🔧 Customization

### Styling

- Modify `tailwind.config.js` for custom colors and themes
- Update component styles in individual component files
- Global styles can be modified in `src/styles/globals.css`

### Data Structure

- Transaction types and categories can be modified in `src/types/`
- Mock data can be updated in `src/data/`

### Production Build

```bash
npm run build
npm run start
```

## 📄 License

This project was created as an assignment.

## 🆘 Troubleshooting

### Common Issues

1. **Node modules not found**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Port already in use**

   ```bash
   npm run dev -- -p 3001  # Use different port
   ```

3. **TypeScript errors**

   ```bash
   npm run type-check  # Check for type errors
   ```

   ```

   ```

**Built with Next.js, TypeScript, and Tailwind CSS**
