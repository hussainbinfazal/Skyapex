# Property Sale Deed Generator

A modern, full-stack web application that generates legally-formatted property sale deeds in PDF format. Built with Next.js, TypeScript, and features a beautiful, responsive user interface.

## 🚀 Features

- **Interactive Form Interface**: Clean, modern form with real-time validation
- **PDF Generation**: Automatically generates professionally formatted sale deeds
- **Data Validation**: Robust form validation using Zod schema validation
- **Responsive Design**: Mobile-first design that works on all devices
- **Database Integration**: Stores deed records in MongoDB
- **Indian Currency Formatting**: Displays amounts in Indian Rupee format
- **Real-time Feedback**: Loading states and success notifications
- **Download Management**: Automatic PDF download with proper filename

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls
- **Sonner** - Toast notifications

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Puppeteer** - PDF generation from HTML
- **Handlebars** - HTML template engine
- **Zod** - Runtime type validation

## 📁 Project Structure

```
├── components/
│   └── DeedPage.tsx          # Main form component
├── pages/api/
│   └── createdeed.ts         # API endpoint for PDF generation
├── model/
│   └── deedModel.ts          # MongoDB schema
├── config/
│   └── db.ts                 # Database connection
├── lib/
│   └── zodValidation.ts      # Form validation schemas
└── public/templates/
    └── deedTemplate.html     # PDF template
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/property-deed-generator.git
   cd property-deed-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📋 Usage

1. **Fill the Form**: Enter required property details:
   - Full Name
   - Father's Name
   - Property Size (sq.ft.)
   - Sale Amount (₹)
   - Date of Sale

2. **Validation**: The form validates all inputs in real-time using Zod schemas

3. **Generate PDF**: Click "Generate Property Deed" to create and download the PDF

4. **Download**: The PDF automatically downloads with the filename "SaleDeed.pdf"

## 🎯 Key Features Demonstrated

### Frontend Excellence
- **Modern UI/UX**: Beautiful gradient backgrounds, smooth animations, and responsive design
- **Form Handling**: Complex form state management with TypeScript
- **Real-time Validation**: Instant feedback with error states
- **Loading States**: Professional loading indicators and success messages

### Backend Proficiency
- **API Design**: RESTful API with proper HTTP methods and status codes
- **Database Operations**: MongoDB integration with Mongoose ODM
- **PDF Generation**: Server-side PDF creation using Puppeteer
- **Template Engine**: Dynamic HTML generation with Handlebars
- **Error Handling**: Comprehensive error handling and validation

### Full-Stack Integration
- **Type Safety**: End-to-end TypeScript implementation
- **Data Flow**: Seamless data flow from form to database to PDF
- **File Handling**: Proper file download and MIME type handling
- **Performance**: Optimized rendering and efficient API calls

## 🔐 Form Validation Schema

```typescript
const deedSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
  propertySize: z.string().min(1, "Property size is required"),
  saleAmount: z.number().min(1, "Sale amount must be greater than 0"),
  date: z.string().optional()
});
```

## 🔄 API Endpoints

### POST `/api/createdeed`
Generates a property sale deed PDF

**Request Body:**
```json
{
  "fullName": "John Doe",
  "fatherName": "Robert Doe",
  "propertySize": "1200",
  "saleAmount": 5000000,
  "date": "2024-01-15"
}
```

**Response:**
- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename=SaleDeed.pdf`
- Returns PDF buffer for download

## 🎨 Design Highlights

- **Gradient Backgrounds**: Beautiful blue-to-purple gradients
- **Glass Morphism**: Backdrop blur effects for modern appearance
- **Smooth Animations**: Hover effects and transitions
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Indian Formatting**: Proper INR currency display

## 📱 Mobile Responsive

The application is fully responsive with:
- Mobile-first design approach
- Adaptive grid layouts
- Touch-friendly interactions
- Optimized form fields for mobile input

## 🚀 Deployment Ready

The application is configured for easy deployment on:
- **Vercel** (recommended for Next.js)

## 🔮 Future Enhancements

- [ ] Multiple deed templates
- [ ] Digital signature integration
- [ ] Email delivery system
- [ ] Advanced search and filtering
- [ ] User authentication
- [ ] Deed history tracking
- [ ] Batch processing
- [ ] Legal compliance features

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**[Your Name]**
- GitHub: [@hussainbinfazal](https://github.com/hussainbinfazal)
- LinkedIn: [Mohammad Hussain Khan](https://github.com/hussainbinfazal)


---

**Note**: This project demonstrates full-stack development skills including modern React patterns, TypeScript, database integration, PDF generation, and responsive design. It showcases the ability to build complete, production-ready applications with proper error handling, validation, and user experience considerations.