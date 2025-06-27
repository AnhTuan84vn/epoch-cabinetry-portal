import React, { useState, useEffect, useCallback } from 'react';

// Main App Component
const App = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile menu toggle

  // Tailwind CSS classes for consistent styling
  const headerClasses = "bg-[#2A5255] text-white p-4 flex justify-between items-center shadow-md";
  const navItemClasses = "px-4 py-2 hover:bg-[#3d6e71] transition-colors duration-200 rounded-md cursor-pointer";
  const activeNavItemClasses = "bg-[#4CAF50] text-white rounded-md"; // Example active state color
  const pageContainerClasses = "p-6 bg-gray-100 min-h-screen";
  const cardClasses = "bg-white p-6 rounded-lg shadow-md";
  const buttonClasses = "bg-[#4CAF50] hover:bg-[#3d8b40] text-white px-4 py-2 rounded-md transition-colors duration-200";
  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 p-2";
  const tableHeaderClasses = "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tableRowClasses = "px-6 py-4 whitespace-nowrap text-sm text-gray-900";
  const tabItemClasses = "px-4 py-2 text-gray-600 border-b-2 border-transparent hover:border-green-500 hover:text-green-700 transition-colors duration-200 cursor-pointer";
  const activeTabItemClasses = "border-green-500 text-green-700 font-semibold";

  // Function to render page content based on activePage state
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard cardClasses={cardClasses} buttonClasses={buttonClasses} />;
      case 'catalogs':
        return <Catalogs cardClasses={cardClasses} buttonClasses={buttonClasses} />;
      case 'quotation': // This case now handles the entire Quotations section with its internal tabs
        return <QuotationsManagement
                  cardClasses={cardClasses}
                  buttonClasses={buttonClasses}
                  inputClasses={inputClasses}
                  tableHeaderClasses={tableHeaderClasses}
                  tableRowClasses={tableRowClasses}
                  tabItemClasses={tabItemClasses}
                  activeTabItemClasses={activeTabItemClasses}
               />;
      case 'deliveries':
        return <Deliveries cardClasses={cardClasses} buttonClasses={buttonClasses} inputClasses={inputClasses} tableHeaderClasses={tableHeaderClasses} tableRowClasses={tableRowClasses} tabItemClasses={tabItemClasses} activeTabItemClasses={activeTabItemClasses} />;
      case 'payments':
        return <Payments cardClasses={cardClasses} buttonClasses={buttonClasses} tableHeaderClasses={tableHeaderClasses} tableRowClasses={tableRowClasses} tabItemClasses={tabItemClasses} activeTabItemClasses={activeTabItemClasses} />;
      case 'returns-warranties':
        return <ReturnsWarranties cardClasses={cardClasses} buttonClasses={buttonClasses} tableHeaderClasses={tableHeaderClasses} tableRowClasses={tableRowClasses} tabItemClasses={tabItemClasses} activeTabItemClasses={activeTabItemClasses} />;
      case 'resources':
        return <Resources cardClasses={cardClasses} buttonClasses={buttonClasses} />;
      case 'users-settings':
        return <UsersSettings cardClasses={cardClasses} buttonClasses={buttonClasses} inputClasses={inputClasses} tableHeaderClasses={tableHeaderClasses} tableRowClasses={tableRowClasses} tabItemClasses={tabItemClasses} activeTabItemClasses={activeTabItemClasses} />;
      default:
        return <Dashboard cardClasses={cardClasses} buttonClasses={buttonClasses} />;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900">
      {/* Header */}
      <header className={headerClasses}>
        {/* Company Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="https://i.postimg.cc/prrnW5rf/Epoch-Logo.png"
            alt="Epoch Cabinetry Logo"
            className="h-10 w-auto rounded-md" // Adjusted height and width to auto for better aspect ratio with a real logo
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x40/2A5255/FFFFFF?text=EPOCH+LOGO"; }} // Fallback
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className={`${navItemClasses} ${activePage === 'dashboard' ? activeNavItemClasses : ''}`} onClick={() => setActivePage('dashboard')}>Dashboard</div>
          <div className={`${navItemClasses} ${activePage === 'catalogs' ? activeNavItemClasses : ''}`} onClick={() => setActivePage('catalogs')}>Catalogs</div>
          <div className={`${navItemClasses} ${activePage === 'quotation' ? activeNavItemClasses : ''}`} onClick={() => setActivePage('quotation')}>Quotations</div>
          <div className={`${navItemClasses} ${activePage === 'deliveries' ? activeNavItemClasses : ''}`} onClick={() => setActivePage('deliveries')}>Deliveries</div>
          <div className={`${navItemClasses} ${activePage === 'payments' ? activeNavItemClasses : ''}`} onClick={() => setActivePage('payments')}>Payments</div>
          <div className={`${navItemClasses} ${activePage === 'returns-warranties' ? activeNavItemClasses : ''}`} onClick={() => setActivePage('returns-warranties')}>Returns & Warranties</div>
          <div className={`${navItemClasses} ${activePage === 'resources' ? activeNavItemClasses : ''}`} onClick={() => setActivePage('resources')}>Resources</div>
          <div className={`${navItemClasses} ${activePage === 'users-settings' ? activeNavItemClasses : ''}`} onClick={() => setActivePage('users-settings')}>Users & Settings</div>
        </nav>

        {/* User and Notification Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            {/* Notification Icon (Lucide-react bell icon) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell cursor-pointer">
              <path d="M6 8a6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">3</span> {/* Example: Notification Count */}
          </div>
          {/* User Icon (Lucide-react user icon) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-circle-2 cursor-pointer">
            <path d="M18 20a6 6 0 0 0-12 0" />
            <circle cx="12" cy="10" r="4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-[#2A5255] text-white p-4 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden z-50`}>
        <div className="flex justify-end mb-4">
          <button onClick={() => setIsSidebarOpen(false)} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col space-y-2">
          <div className={`${navItemClasses} ${activePage === 'dashboard' ? activeNavItemClasses : ''}`} onClick={() => { setActivePage('dashboard'); setIsSidebarOpen(false); }}>Dashboard</div>
          <div className={`${navItemClasses} ${activePage === 'catalogs' ? activeNavItemClasses : ''}`} onClick={() => { setActivePage('catalogs'); setIsSidebarOpen(false); }}>Catalogs</div>
          <div className={`${navItemClasses} ${activePage === 'quotation' ? activeNavItemClasses : ''}`} onClick={() => { setActivePage('quotation'); setIsSidebarOpen(false); }}>Quotations</div>
          <div className={`${navItemClasses} ${activePage === 'deliveries' ? activeNavItemClasses : ''}`} onClick={() => { setIsSidebarOpen(false); setActivePage('deliveries'); }}>Deliveries</div>
          <div className={`${navItemClasses} ${activePage === 'payments' ? activeNavItemClasses : ''}`} onClick={() => { setIsSidebarOpen(false); setActivePage('payments'); }}>Payments</div>
          <div className={`${navItemClasses} ${activePage === 'returns-warranties' ? activeNavItemClasses : ''}`} onClick={() => { setIsSidebarOpen(false); setActivePage('returns-warranties'); }}>Returns & Warranties</div>
          <div className={`${navItemClasses} ${activePage === 'resources' ? activeNavItemClasses : ''}`} onClick={() => { setIsSidebarOpen(false); }}>Resources</div>
          <div className={`${navItemClasses} ${activePage === 'users-settings' ? activeNavItemClasses : ''}`} onClick={() => { setActivePage('users-settings'); setIsSidebarOpen(false); }}>Users & Settings</div>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className={pageContainerClasses}>
        {renderPage()}
      </main>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ cardClasses, buttonClasses }) => {
  // Placeholder for chart data and options (using recharts could be a good next step)
  const chartPlaceholder1 = "https://placehold.co/400x200/FFFFFF/000000?text=Sales+by+Salesman+Graph";
  const chartPlaceholder2 = "https://placehold.co/400x200/FFFFFF/000000?text=Sales+by+Collections+Graph";

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Key Metrics in Box Format */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`${cardClasses} flex flex-col items-center justify-center text-center p-4`}>
          <h2 className="text-lg font-semibold text-gray-700">Pending Quotations</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">12</p>
        </div>
        <div className={`${cardClasses} flex flex-col items-center justify-center text-center p-4`}>
          <h2 className="text-lg font-semibold text-gray-700">Open Orders</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">8</p>
        </div>
        <div className={`${cardClasses} flex flex-col items-center justify-center text-center p-4`}>
          <h2 className="text-lg font-semibold text-gray-700">Scheduled Deliveries</h2>
          <p className="text-4xl font-bold text-yellow-600 mt-2">5</p>
        </div>
        <div className={`${cardClasses} flex flex-col items-center justify-center text-center p-4`}>
          <h2 className="text-lg font-semibold text-gray-700">Pending Invoices</h2>
          <p className="text-4xl font-bold text-red-600 mt-2">3</p>
        </div>
      </div>

      {/* Notifications */}
      <div className={`${cardClasses} mb-8`}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>New quotation #2024-001 submitted for review.</li>
          <li>Order #ORD-5678 is scheduled for delivery tomorrow.</li>
          <li>Invoice #INV-9101 is due in 3 days.</li>
        </ul>
      </div>

      {/* Sales Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={cardClasses}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Sales by Salesman</h2>
            <select className="border border-gray-300 rounded-md p-2">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
            </select>
          </div>
          <img src={chartPlaceholder1} alt="Sales by Salesman Graph" className="w-full h-auto rounded-md" />
        </div>
        <div className={cardClasses}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Sales by Collections</h2>
            <select className="border border-gray-300 rounded-md p-2">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
            </select>
          </div>
          <img src={chartPlaceholder2} alt="Sales by Collections Graph" className="w-full h-auto rounded-md" />
        </div>
      </div>
    </div>
  );
};

// Catalogs Component
const Catalogs = ({ cardClasses, buttonClasses }) => {
  // Helper to map SW color names to approximate hex codes
  const getCssColor = (swColorName) => {
    switch (swColorName) {
      case "Extra White (SW 7006)": return "#F8F8F8"; // Very light off-white
      case "Mindful Gray (SW 7016)": return "#C0C0C0"; // Light gray
      case "Naval (SW 6244)": return "#000080"; // Deep navy blue
      case "Pure White (SW 7005)": return "#FFFFFF"; // Pure white
      case "Sea Salt (SW 6204)": return "#D4E1E1"; // Soft green-gray
      case "Hardware (SW 6172)": return "#555B5B"; // Dark gray/brown
      case "Early American (SW 3144)": return "#A0522D"; // Sienna (reddish-brown)
      case "Walnut (SW 3148)": return "#5C3500"; // Dark brown
      case "Fruitwood (SW 3137)": return "#D2B48C"; // Tan (golden-brown)
      default: return "#CCCCCC"; // Default light gray for unknown colors
    }
  };

  const collections = [
    {
      name: "Modern & Minimalism",
      colors: ["Extra White (SW 7006)", "Mindful Gray (SW 7016)", "Naval (SW 6244)"],
      description: "Sleek lines, uncluttered spaces, and a focus on functionality define this collection. Perfect for contemporary homes seeking a refined and simple aesthetic.",
      designPhilosophy: ["Clean Design", "Functional Elegance", "Contemporary Appeal"],
      image: "https://placehold.co/300x200/D0D3D4/2C3E50?text=Modern+Minimalism"
    },
    {
      name: "Classical & Transitional",
      colors: ["Pure White (SW 7005)", "Sea Salt (SW 6204)", "  Hardware (SW 6172)"],
      description: "Blending timeless elegance with modern sensibilities, this collection offers a balanced and inviting feel. Ideal for those who appreciate traditional charm with a fresh twist.",
      designPhilosophy: ["Timeless Charm", "Balanced Design", "Versatile Style"],
      image: "https://placehold.co/300x200/A2D9CE/1F618D?text=Classical+Transitional"
    },
    {
      name: "Artisans",
      colors: ["Early American (SW 3144)", "Walnut (SW 3148)", "Fruitwood (SW 3137)"],
      woodChoices: ["White Oak", "Maple", "Cherry"],
      description: "Crafted with passion and precision, the Artisans collection highlights the natural beauty of wood. Each piece is a testament to traditional craftsmanship, bringing warmth and character to any space.",
      designPhilosophy: ["Handcrafted Quality", "Natural Beauty", "Rich Character"],
      image: "https://placehold.co/300x200/F1C40F/8E44AD?text=Artisans"
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Catalogs</h1>
      <p className="mb-8 text-gray-600">Explore our exquisite cabinetry collections, each designed to bring unique style and functionality to any home. Click on a collection to discover more.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection, index) => (
          <div key={index} className={`${cardClasses} flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer`}>
            <img src={collection.image} alt={collection.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{collection.name}</h2>
            <p className="text-gray-600 text-sm mb-4">{collection.description}</p>
            <div className="text-left w-full px-4">
              <h3 className="text-md font-medium text-gray-700 mb-2">Design Philosophy:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                {collection.designPhilosophy.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
              <h3 className="text-md font-medium text-gray-700 mb-2">Colors:</h3>
              <div className="flex flex-wrap gap-2 mb-4"> {/* Use flexbox for horizontal layout of color circles */}
                {collection.colors.map((colorName, i) => (
                  <div
                    key={i}
                    title={colorName} // Show color name on hover
                    className="w-8 h-8 rounded-full border border-gray-300 cursor-help shadow-sm" // Bigger circle, subtle shadow
                    style={{ backgroundColor: getCssColor(colorName) }}
                  ></div>
                ))}
              </div>
              {collection.woodChoices && (
                <>
                  <h3 className="text-md font-medium text-gray-700 mb-2">Wood Choices:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                    {collection.woodChoices.map((wood, i) => (
                      <li key={i}>{wood}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <button className={buttonClasses}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// QuotationsManagement Component - This component now encapsulates all quotation-related tabs
const QuotationsManagement = ({ cardClasses, buttonClasses, inputClasses, tableHeaderClasses, tableRowClasses, tabItemClasses, activeTabItemClasses }) => {
  const [activeSubTab, setActiveSubTab] = useState('project'); // project, quotation-builder, review-approve, existing-quotations, build-as-you-go

  // Mock data for existing projects and quotations (shared across tabs)
  const mockProjects = [
    { id: 'PROJ-001', name: 'Kitchen Remodel - Smith', status: 'In Progress' },
    { id: 'PROJ-002', name: 'Bathroom Vanities - Jones', status: 'Completed' },
    { id: 'PROJ-003', name: 'New Home Build - Davis', status: 'Pending Review' },
  ];

  const mockExistingQuotations = [
    { id: 'QUO-001', projectName: 'Smith Kitchen', date: '2023-01-15', value: '$15,500', status: 'Approved' },
    { id: 'QUO-002', projectName: 'Jones Bath', date: '2023-02-20', value: '$7,200', status: 'Submitted' },
    { id: 'QUO-003', projectName: 'Davis New Build', date: '2023-03-10', value: '$25,000', status: 'Draft' },
  ];

  // Mock data for available products (shared across tabs that need it)
  const availableProducts = [
    { id: 'PROD-001', name: 'Base Cabinet 12" (Modern-White Oak)', unitPrice: 280.00, collection: 'Modern & Minimalism', doorStyle: 'Slab', drawerStyle: 'Slab', color: 'Extra White (SW 7006)', woodSpecies: 'White Oak', boxConstruction: 'Frameless' },
    { id: 'PROD-002', name: 'Wall Cabinet 30" (Classical-Maple)', unitPrice: 400.00, collection: 'Classical & Transitional', doorStyle: 'Shaker', drawerStyle: 'Shaker', color: 'Pure White (SW 7005)', woodSpecies: 'Maple', boxConstruction: 'Framed' },
    { id: 'PROD-003', name: 'Pantry Cabinet (Artisans-Cherry)', unitPrice: 950.00, collection: 'Artisans', doorStyle: 'Raised Panel', drawerStyle: 'Standard', color: 'Walnut (SW 3148)', woodSpecies: 'Cherry', boxConstruction: 'Framed' },
    { id: 'PROD-004', name: 'Base Cabinet 24" (Modern-Maple)', unitPrice: 350.00, collection: 'Modern & Minimalism', doorStyle: 'Slab', drawerStyle: 'Slab', color: 'Mindful Gray (SW 7016)', woodSpecies: 'Maple', boxConstruction: 'Frameless' },
  ];

  // State for Quotation Builder (specific to "Quotation" and "Review & Approve" tabs)
  const [quotationItems, setQuotationItems] = useState([
    { id: 'PROD-001', product: 'Base Cabinet 12" (Modern-White Oak)', quantity: 1, unitPrice: 280.00, total: 280.00 },
    { id: 'PROD-002', product: 'Wall Cabinet 30" (Classical-Maple)', quantity: 2, unitPrice: 400.00, total: 800.00 },
  ]);
  const [shippingCost, setShippingCost] = useState(0);
  const [assemblyCharges, setAssemblyCharges] = useState(0);
  const [discountRate, setDiscountRate] = useState(0); // in percent
  const [discountAmount, setDiscountAmount] = useState(0);
  const [specialNotes, setSpecialNotes] = useState('');
  const [roomSpecifiedDelivery, setRoomSpecifiedDelivery] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(''); // New state for selected project ID

  // State for Product Selector dropdowns (specific to "Quotation" tab)
  const [selectedCollection, setSelectedCollection] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedDoorStyle, setSelectedDoorStyle] = useState('');
  const [selectedDrawerStyle, setSelectedDrawerStyle] = useState('');
  const [selectedWoodSpecies, setSelectedWoodSpecies] = useState('');
  const [selectedBoxConstruction, setSelectedBoxConstruction] = useState('');

  // Filtered products based on selection criteria (for conceptual display)
  const filteredProducts = availableProducts.filter(product => {
    return (selectedCollection === '' || product.collection === selectedCollection) &&
           (selectedColor === '' || product.color === selectedColor) &&
           (selectedDoorStyle === '' || product.doorStyle === selectedDoorStyle) &&
           (selectedDrawerStyle === '' || product.drawerStyle === selectedDrawerStyle) &&
           (selectedWoodSpecies === '' || product.woodSpecies === selectedWoodSpecies) &&
           (selectedBoxConstruction === '' || product.boxConstruction === selectedBoxConstruction);
  });

  // Calculate totals for quotation
  const subtotal = quotationItems.reduce((sum, item) => sum + item.total, 0);
  const totalItems = quotationItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalDiscount = (subtotal * (discountRate / 100)) + parseFloat(discountAmount);
  const grandTotal = subtotal + parseFloat(shippingCost) + parseFloat(assemblyCharges) - totalDiscount;

  // Get selected project name for display
  const currentProjectName = selectedProjectId
    ? mockProjects.find(p => p.id === selectedProjectId)?.name
    : 'No Project Selected';


  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...quotationItems];
    const quantity = parseInt(newQuantity);
    if (quantity > 0) { // Ensure quantity is at least 1
      updatedItems[index].quantity = quantity;
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice;
      setQuotationItems(updatedItems);
    } else if (quantity === 0) {
      // Option to remove item if quantity is 0
      setQuotationItems(updatedItems.filter((_, i) => i !== index));
    }
  };

  const addProductToQuotation = (productToAdd) => {
    setQuotationItems(prevItems => {
      // Check if product already exists in quotation
      const existingItemIndex = prevItems.findIndex(item => item.id === productToAdd.id);

      if (existingItemIndex > -1) {
        // If exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        updatedItems[existingProductIndex].total = updatedItems[existingProductIndex].quantity * updatedItems[existingProductIndex].unitPrice;
        return updatedItems;
      } else {
        // If not, add new product
        return [...prevItems, {
          id: productToAdd.id,
          product: productToAdd.name, // Use the full name from availableProducts
          quantity: 1,
          unitPrice: productToAdd.unitPrice,
          total: productToAdd.unitPrice
        }];
      }
    });
  };

  const handleNewProject = () => {
    alert("New Project button clicked! (Implement new project creation logic here)");
    // Here you would typically navigate to a new project creation form or open a modal
  };

  // Render content based on active sub-tab
  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case 'project':
        return (
          <div className={cardClasses}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
                <input type="text" id="projectName" name="projectName" className={inputClasses} placeholder="e.g., Smith Kitchen Remodel" />
              </div>
              <div>
                <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer Name</label>
                <input type="text" id="customer" name="customer" className={inputClasses} placeholder="e.g., John Smith" />
              </div>
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone Number</label>
                <input type="text" id="telephone" name="telephone" className={inputClasses} placeholder="e.g., +1 (555) 123-4567" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">Delivery Address</label>
                <textarea id="deliveryAddress" name="deliveryAddress" rows="3" className={inputClasses} placeholder="Street, City, State, Postal Code"></textarea>
              </div>
              <div>
                <label htmlFor="deliveryNote" className="block text-sm font-medium text-gray-700">Delivery Note</label>
                <input type="text" id="deliveryNote" name="deliveryNote" className={inputClasses} placeholder="e.g., Leave package at back door" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="roomSpecifiedDelivery" name="roomSpecifiedDelivery" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" checked={roomSpecifiedDelivery} onChange={(e) => setRoomSpecifiedDelivery(e.target.checked)} />
                <label htmlFor="roomSpecifiedDelivery" className="ml-2 block text-sm text-gray-900">Room specified delivery</label>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Existing Projects</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className={tableHeaderClasses}>Project Number</th>
                    <th className={tableHeaderClasses}>Project Name</th>
                    <th className={tableHeaderClasses}>Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockProjects.map((project) => (
                    <tr key={project.id}>
                      <td className={tableRowClasses}>{project.id}</td>
                      <td className={tableRowClasses}>{project.name}</td>
                      <td className={tableRowClasses}>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'quotation-builder':
        return (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Product Selector Section - Now on the left/top */}
            <div className={`${cardClasses} flex-1 lg:w-1/2`}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Selector</h2>
              <div className="flex justify-end mb-4 space-x-2">
                <button className={buttonClasses}>Import CSV</button>
              </div>

              <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Filter Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="collection" className="block text-sm font-medium text-gray-700">Collection</label>
                    <select id="collection" name="collection" className={inputClasses} value={selectedCollection} onChange={(e) => setSelectedCollection(e.target.value)}>
                      <option value="">All Collections</option>
                      <option value="Modern & Minimalism">Modern & Minimalism</option>
                      <option value="Classical & Transitional">Classical & Transitional</option>
                      <option value="Artisans">Artisans</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                    <select id="color" name="color" className={inputClasses} value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                      <option value="">All Colors</option>
                      <option value="Extra White (SW 7006)">Extra White (SW 7006)</option>
                      <option value="Mindful Gray (SW 7016)">Mindful Gray (SW 7016)</option>
                      <option value="Naval (SW 6244)">Naval (SW 6244)</option>
                      <option value="Pure White (SW 7005)">Pure White (SW 7005)</option>
                      <option value="Sea Salt (SW 6204)">Sea Salt (SW 6204)</option>
                      <option value="Hardware (SW 6172)">Hardware (SW 6172)</option>
                      <option value="Early American (SW 3144)">Early American (SW 3144)</option>
                      <option value="Walnut (SW 3148)">Walnut (SW 3148)</option>
                      <option value="Fruitwood (SW 3137)">Fruitwood (SW 3137)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="doorStyle" className="block text-sm font-medium text-gray-700">Door Style</label>
                    <select id="doorStyle" name="doorStyle" className={inputClasses} value={selectedDoorStyle} onChange={(e) => setSelectedDoorStyle(e.target.value)}>
                      <option value="">All Door Styles</option>
                      <option value="Slab">Slab</option>
                      <option value="Shaker">Shaker</option>
                      <option value="Raised Panel">Raised Panel</option>
                      {/* Add more door styles as needed */}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="drawerStyle" className="block text-sm font-medium text-gray-700">Drawer Style</label>
                    <select id="drawerStyle" name="drawerStyle" className={inputClasses} value={selectedDrawerStyle} onChange={(e) => setSelectedDrawerStyle(e.target.value)}>
                      <option value="">All Drawer Styles</option>
                      <option value="Slab">Slab</option>
                      <option value="Shaker">Shaker</option>
                      <option value="Standard">Standard</option>
                      {/* Add more drawer styles as needed */}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="woodSpecies" className="block text-sm font-medium text-gray-700">Wood Species</label>
                    <select id="woodSpecies" name="woodSpecies" className={inputClasses} value={selectedWoodSpecies} onChange={(e) => setSelectedWoodSpecies(e.target.value)}>
                      <option value="">All Wood Species</option>
                      <option value="White Oak">White Oak</option>
                      <option value="Maple">Maple</option>
                      <option value="Cherry">Cherry</option>
                      {/* Add more wood species as needed */}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="boxConstruction" className="block text-sm font-medium text-gray-700">Box Construction</label>
                    <select id="boxConstruction" name="boxConstruction" className={inputClasses} value={selectedBoxConstruction} onChange={(e) => setSelectedBoxConstruction(e.target.value)}>
                      <option value="">All Box Constructions</option>
                      <option value="Framed">Framed</option>
                      <option value="Frameless">Frameless</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">Matching Products:</h3>
                <div className="max-h-80 overflow-y-auto pr-2 border-t border-gray-200 pt-4">
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                      {filteredProducts.map((product) => (
                        <div key={product.id} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                          <div>
                            <p className="font-medium text-gray-800">{product.name}</p>
                            <p className="text-sm text-gray-600">${product.unitPrice.toFixed(2)}</p>
                          </div>
                          <button
                            className={`${buttonClasses} px-3 py-1 text-sm`}
                            onClick={() => addProductToQuotation(product)}
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-4">No products match the selected criteria.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quotation Details - Now on the right/bottom */}
            <div className={`${cardClasses} flex-1 lg:w-1/2`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Quotations Details:</h2>
                <div className="flex items-center space-x-2">
                  <select
                    id="selectProject"
                    className={inputClasses}
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                  >
                    <option value="">-- Select Project --</option>
                    {mockProjects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                  <button className={buttonClasses} onClick={handleNewProject}>New Project</button>
                </div>
              </div>

              <p className="text-lg font-semibold text-gray-800 mb-3">Current Project: {currentProjectName}</p>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className={tableHeaderClasses}>Product</th>
                      <th className={tableHeaderClasses}>Quantity</th>
                      <th className={tableHeaderClasses}>Unit Price</th>
                      <th className={tableHeaderClasses}>Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quotationItems.map((item, index) => (
                      <tr key={item.id}>
                        <td className={tableRowClasses}>{item.product}</td>
                        <td className={tableRowClasses}>
                          <input
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                            className={`${inputClasses} w-20`}
                          />
                        </td>
                        <td className={tableRowClasses}>${item.unitPrice.toFixed(2)}</td>
                        <td className={tableRowClasses}>${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                    {quotationItems.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center py-4 text-gray-500">No products added to quotation.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Quotation Summary Fields and Special Notes */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-col items-end space-y-3 w-full">
                  <div className="flex justify-between w-full md:w-1/2">
                    <span className="text-gray-700 font-medium">Subtotal:</span>
                    <span className="text-gray-900 font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between w-full md:w-1/2">
                    <label htmlFor="shippingCost" className="text-gray-700 font-medium">Shipping Cost:</label>
                    <input type="number" id="shippingCost" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} className={`${inputClasses} w-1/2 text-right`} />
                  </div>
                  <div className="flex justify-between w-full md:w-1/2">
                    <label htmlFor="assemblyCharges" className="text-gray-700 font-medium">Other Charges:</label>
                    <input type="number" id="assemblyCharges" value={assemblyCharges} onChange={(e) => setAssemblyCharges(e.target.value)} className={`${inputClasses} w-1/2 text-right`} />
                  </div>
                  <div className="flex justify-between w-full md:w-1/2">
                    <label htmlFor="discountRate" className="block text-sm font-medium text-gray-700">Discount Rate (%):</label>
                    <input type="number" id="discountRate" value={discountRate} onChange={(e) => setDiscountRate(e.target.value)} className={`${inputClasses} w-1/2 text-right`} />
                  </div>
                  <div className="flex justify-between w-full md:w-1/2">
                    <label htmlFor="discountAmount" className="block text-sm font-medium text-gray-700">Discount Amount ($):</label>
                    <input type="number" id="discountAmount" value={discountAmount} onChange={(e) => setDiscountAmount(e.target.value)} className={`${inputClasses} w-1/2 text-right`} />
                  </div>
                  <div className="flex justify-between w-full md:w-1/2">
                    <span className="text-gray-700 font-medium">Total Discount:</span>
                    <span className="text-gray-900 font-semibold">-${totalDiscount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between w-full md:w-1/2">
                    <span className="text-xl font-bold text-gray-800">Grand Total:</span>
                    <span className="text-xl font-bold text-green-600">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className="w-full mt-4">
                  <label htmlFor="specialNotes" className="block text-sm font-medium text-gray-700 mb-1">Special Notes for Quotation:</label>
                  <textarea id="specialNotes" value={specialNotes} onChange={(e) => setSpecialNotes(e.target.value)} rows="5" className={inputClasses}></textarea>
                </div>
              </div>
            </div>
          </div>
        );
      case 'build-as-you-go':
          return <BuildAsYouGo
                      cardClasses={cardClasses}
                      buttonClasses={buttonClasses}
                      inputClasses={inputClasses}
                      tableHeaderClasses={tableHeaderClasses}
                      tableRowClasses={tableRowClasses}
                      mockProjects={mockProjects} // Pass mockProjects to BuildAsYouGo
                  />;
      case 'review-approve':
        return (
          <div className={cardClasses}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Review & Approve Quotation</h2>
            <div className="flex space-x-4 mb-6">
              <button className={buttonClasses}>Edit</button>
              <button className={buttonClasses}>Submit</button>
              <button className={buttonClasses}>Approve</button>
              <button className={buttonClasses}>Generate External Quotation</button>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">Quotation Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div><span className="font-medium">Project Name:</span> {"Smith Kitchen Remodel"}</div>
              <div><span className="font-medium">Contact Person:</span> {"John Smith"}</div>
              <div><span className="font-medium">Expected Delivery:</span> {"2023-07-15"}</div>
              <div><span className="font-medium">Total Items:</span> {totalItems}</div>
              <div><span className="font-medium">Subtotal:</span> ${subtotal.toFixed(2)}</div>
              <div><span className="font-medium">Shipping:</span> ${shippingCost.toFixed(2)}</div>
              <div><span className="font-medium">Other Charges:</span> ${assemblyCharges.toFixed(2)}</div>
              <div><span className="font-medium">Discount:</span> ${totalDiscount.toFixed(2)}</div>
              <div className="md:col-span-2 text-xl font-bold text-green-600">
                <span className="font-medium text-gray-800">Grand Total:</span> ${grandTotal.toFixed(2)}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">Special Notes:</h3>
            <div className="p-4 bg-gray-50 rounded-md border border-gray-200 mb-6">
              <p className="text-gray-700 whitespace-pre-wrap">{specialNotes || "No special notes."}</p>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">Quotation Details:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className={tableHeaderClasses}>Product</th>
                    <th className={tableHeaderClasses}>Quantity</th>
                    <th className={tableHeaderClasses}>Unit Price</th>
                    <th className={tableHeaderClasses}>Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quotationItems.map((item, index) => (
                    <tr key={index}>
                      <td className={tableRowClasses}>{item.product}</td>
                      <td className={tableRowClasses}>{item.quantity}</td>
                      <td className={tableRowClasses}>${item.unitPrice.toFixed(2)}</td>
                      <td className={tableRowClasses}>${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'existing-quotations':
        return (
          <div className={cardClasses}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Existing Quotations</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className={tableHeaderClasses}>Quotation Number</th>
                    <th className={tableHeaderClasses}>Project Name</th>
                    <th className={tableHeaderClasses}>Quotation Date</th>
                    <th className={tableHeaderClasses}>Quotation Value</th>
                    <th className={tableHeaderClasses}>Status</th>
                    <th className={tableHeaderClasses}>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockExistingQuotations.map((quotation) => (
                    <tr key={quotation.id}>
                      <td className={tableRowClasses}>{quotation.id}</td>
                      <td className={tableRowClasses}>{quotation.projectName}</td>
                      <td className={tableRowClasses}>{quotation.date}</td>
                      <td className={tableRowClasses}>{quotation.value}</td>
                      <td className={tableRowClasses}>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          quotation.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          quotation.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {quotation.status}
                        </span>
                      </td>
                      <td className={tableRowClasses}>
                        <button className="text-green-600 hover:text-green-900 mr-2">View</button>
                        <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Quotations Management</h1>

      <div className="flex border-b border-gray-200 mb-6">
        <div className={`${tabItemClasses} ${activeSubTab === 'project' ? activeTabItemClasses : ''}`} onClick={() => setActiveSubTab('project')}>Project</div>
        <div className={`${tabItemClasses} ${activeSubTab === 'quotation-builder' ? activeTabItemClasses : ''}`} onClick={() => setActiveSubTab('quotation-builder')}>Quotation</div>
        <div className={`${tabItemClasses} ${activeSubTab === 'build-as-you-go' ? activeTabItemClasses : ''}`} onClick={() => setActiveSubTab('build-as-you-go')}>Build as you go</div>
        <div className={`${tabItemClasses} ${activeSubTab === 'review-approve' ? activeTabItemClasses : ''}`} onClick={() => setActiveSubTab('review-approve')}>Review & Approve</div>
        <div className={`${tabItemClasses} ${activeSubTab === 'existing-quotations' ? activeTabItemClasses : ''}`} onClick={() => setActiveSubTab('existing-quotations')}>Existing Quotations</div>
      </div>

      {renderSubTabContent()}
    </div>
  );
};

// BuildAsYouGo Component (New)
const BuildAsYouGo = ({ cardClasses, buttonClasses, inputClasses, tableHeaderClasses, tableRowClasses, mockProjects }) => { // Destructure table classes and mockProjects
  // Helper functions for calculation (defined inside component for direct access to state setters if needed, or outside if pure)
  const getCalculatedPrice = useCallback((product, globalConfig) => {
      let price = product.basePrice;
      // Apply global configuration modifiers
      if (product.priceModifiers) {
          for (const key in product.priceModifiers) {
              // Ensure the global config option exists and has a modifier for the specific value
              if (globalConfig[key] && product.priceModifiers[key][globalConfig[key]]) {
                  price *= product.priceModifiers[key][globalConfig[key]];
              }
          }
      }
      return price;
  }, []);

  const getCalculatedLeadTime = useCallback((product, globalConfig) => {
      let leadTime = product.baseLeadTime;
      // Apply global configuration modifiers
      if (product.leadTimeModifiers) {
          for (const key in product.leadTimeModifiers) {
              // Ensure the global config option exists and has a modifier for the specific value
              if (globalConfig[key] && product.leadTimeModifiers[key][globalConfig[key]]) {
                  leadTime += product.leadTimeModifiers[key][globalConfig[key]];
              } else if (product.leadTimeModifiers[key] && typeof product.leadTimeModifiers[key] === 'number') {
                  leadTime += product.leadTimeModifiers[key];
              }
          }
      }
      return leadTime;
  }, []);


  const availableProductsList = [
    {
      id: 'prod-1', name: 'Base Cabinet 24"', category: 'Base Cabinets', basePrice: 300.00, baseLeadTime: 2,
      configOptions: { // Define all possible config options for this product type
        collection: ['Modern & Minimalism', 'Classical & Transitional'],
        color: ['Extra White (SW 7006)', 'Pure White (SW 7005)', 'Mindful Gray (SW 7016)', 'Naval (SW 6244)'],
        doorStyle: ['Slab', 'Shaker'],
        drawerStyle: ['Slab', 'Standard'],
        woodSpecies: ['White Oak', 'Maple'],
        boxConstruction: ['Framed', 'Frameless']
      },
      priceModifiers: {
        woodSpecies: { 'White Oak': 1.1, 'Maple': 1.05 },
        boxConstruction: { 'Frameless': 1.03 }
      },
      leadTimeModifiers: {
        woodSpecies: { 'White Oak': 1 },
        boxConstruction: { 'Frameless': 0.5 }
      }
    },
    {
      id: 'prod-2', name: 'Wall Cabinet 30"x30"', category: 'Wall Cabinets', basePrice: 350.00, baseLeadTime: 3,
      configOptions: {
        collection: ['Modern & Minimalism', 'Artisans'],
        color: ['Naval (SW 6244)', 'Walnut (SW 3148)', 'Mindful Gray (SW 7016)'],
        doorStyle: ['Shaker', 'Raised Panel'],
        drawerStyle: ['Standard'],
        woodSpecies: ['Cherry', 'Maple'],
        boxConstruction: ['Framed']
      },
      priceModifiers: {
        woodSpecies: { 'Cherry': 1.15, 'Maple': 1.08 }
      },
      leadTimeModifiers: {
        woodSpecies: { 'Cherry': 1.5 }
      }
    },
    {
      id: 'prod-3', name: 'Pantry Cabinet 36"x84"', category: 'Tall Cabinets', basePrice: 950.00, baseLeadTime: 4,
      configOptions: {
        collection: ['Modern & Minimalism', 'Classical & Transitional', 'Artisans'],
        color: ['Extra White (SW 7006)', 'Naval (SW 6244)', 'Hardware (SW 6172)', 'Fruitwood (SW 3137)'],
        doorStyle: ['Slab', 'Shaker', 'Raised Panel'],
        drawerStyle: ['Slab', 'Standard'],
        woodSpecies: ['White Oak', 'Maple', 'Cherry'],
        boxConstruction: ['Framed', 'Frameless']
      },
      priceModifiers: {
        woodSpecies: { 'White Oak': 1.2, 'Maple': 1.1, 'Cherry': 1.3 },
        color: { 'Naval (SW 6244)': 1.02 }
      },
      leadTimeModifiers: {
        collection: { 'Artisans': 2 }
      }
    },
    {
      id: 'prod-4', name: 'Island Unit 72"', category: 'Islands', basePrice: 1200.00, baseLeadTime: 5,
      configOptions: {
        collection: ['Modern & Minimalism', 'Classical & Transitional', 'Artisans'],
        color: ['Extra White (SW 7006)', 'Naval (SW 6244)', 'Hardware (SW 6172)', 'Fruitwood (SW 3137)'],
        doorStyle: ['Slab', 'Shaker', 'Raised Panel'],
        drawerStyle: ['Slab', 'Standard'],
        woodSpecies: ['White Oak', 'Maple', 'Cherry'],
        boxConstruction: ['Framed', 'Frameless']
      },
      priceModifiers: {
        woodSpecies: { 'White Oak': 1.2, 'Maple': 1.1, 'Cherry': 1.3 },
        color: { 'Naval (SW 6244)': 1.02 }
      },
      leadTimeModifiers: {
        collection: { 'Artisans': 2 }
      }
    },
    {
        id: 'prod-5', name: 'Appliance Panel', category: 'Accessories', basePrice: 150.00, baseLeadTime: 1,
        configOptions: {
            collection: ['Modern & Minimalism'],
            color: ['Extra White (SW 7006)'],
            woodSpecies: ['Maple']
        },
        priceModifiers: {},
        leadTimeModifiers: {}
    }
  ];

  const uniqueCategories = [...new Set(availableProductsList.map(p => p.category))];

  // Global configuration states
  const [globalConfig, setGlobalConfig] = useState({
    collection: '',
    color: '',
    doorStyle: '',
    drawerStyle: '',
    woodSpecies: '',
    boxConstruction: ''
  });

  // Products added to the current build, with their initial details (price/leadtime will update based on globalConfig)
  const [currentBuildProducts, setCurrentBuildProducts] = useState(() => {
    // Initialize with example products and calculate their initial price/leadtime
    const initialProducts = [
        { id: 'prod-1', name: 'Base Cabinet 24"', quantity: 2, basePrice: 300.00, baseLeadTime: 2 },
        { id: 'prod-2', name: 'Wall Cabinet 30"x30"', quantity: 1, basePrice: 350.00, baseLeadTime: 3 },
    ];
    return initialProducts.map(product => ({
      ...product,
      // Pass empty object as initial globalConfig since it's not set yet
      calculatedPrice: getCalculatedPrice(product, {}),
      calculatedLeadTime: getCalculatedLeadTime(product, {})
    }));
  });

  // State for project selection within BuildAsYouGo
  const [selectedProjectId, setSelectedProjectId] = useState('');

  // Effect to recalculate prices and lead times when globalConfig changes
  useEffect(() => {
    setCurrentBuildProducts(prevProducts =>
      prevProducts.map(product => ({
        ...product,
        calculatedPrice: getCalculatedPrice(product, globalConfig),
        calculatedLeadTime: getCalculatedLeadTime(product, globalConfig)
      }))
    );
  }, [globalConfig, getCalculatedPrice, getCalculatedLeadTime]);


  // Filter products based on selected category before displaying in the available list
  const [selectedCategory, setSelectedCategory] = useState(''); // Define selectedCategory here
  const productsToShow = availableProductsList.filter(product => {
      // Ensure selectedCategory is properly referenced from component's state
      return (selectedCategory === '' || product.category === selectedCategory);
  });

  // Handler for adding a product to the build list
  const handleAddProductToBuild = (productToAdd) => {
      setCurrentBuildProducts(prev => {
          // Check if product (by ID) already exists in build
          const existingProductIndex = prev.findIndex(p => p.id === productToAdd.id);

          if (existingProductIndex > -1) {
              // If exists, increment quantity
              const updatedProducts = [...prev];
              updatedProducts[existingProductIndex].quantity += 1;
              // Recalculate price and lead time based on current global config
              updatedProducts[existingProductIndex].calculatedPrice = getCalculatedPrice(productToAdd, globalConfig);
              updatedProducts[existingProductIndex].calculatedLeadTime = getCalculatedLeadTime(productToAdd, globalConfig);
              return updatedProducts;
          } else {
              // If not, add new product with quantity 1
              return [...prev, {
                  ...productToAdd,
                  quantity: 1,
                  calculatedPrice: getCalculatedPrice(productToAdd, globalConfig),
                  calculatedLeadTime: getCalculatedLeadTime(productToAdd, globalConfig)
              }];
          }
      });
  };

  // Handler for changing quantity of a product in the current build
  const handleBuildProductQuantityChange = (productId, newQuantity) => {
      setCurrentBuildProducts(prev => {
          let quantity = parseInt(newQuantity);
          if (isNaN(quantity) || quantity < 0) quantity = 0;

          if (quantity === 0) {
              return prev.filter(p => p.id !== productId); // Remove product if quantity is 0
          }

          return prev.map(product => {
              if (product.id === productId) {
                  return {
                      ...product,
                      quantity: quantity,
                      calculatedPrice: getCalculatedPrice(product, globalConfig)
                  };
              }
              return product;
          });
      });
  };

  // Handler for new project button
  const handleNewProject = () => {
    alert("New Project button clicked! (Implement new project creation logic here)");
  };

  // Calculate overall total price and longest lead time for the entire build
  const overallTotalPrice = currentBuildProducts.reduce((sum, p) => sum + (p.calculatedPrice * p.quantity), 0);
  const overallMaxLeadTime = currentBuildProducts.reduce((max, p) => Math.max(max, p.calculatedLeadTime || 0), 0);


  return (
    <div className={cardClasses}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Build as you go</h2>
        <p className="text-gray-600 mb-4">
            Select products and their configurations to see real-time price and lead time estimations.
        </p>

        {/* Outer flex container for two main columns */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Left Column: Stacks Available Products and Global Configuration */}
            <div className="flex flex-col gap-6 lg:w-1/2">
                {/* Available Products Section */}
                <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Available Products to Add</h3>
                    <div className="mb-4">
                        <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">Product Category</label>
                        <select
                            id="productCategory"
                            className={inputClasses}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {uniqueCategories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="max-h-60 overflow-y-auto pr-2">
                        {productsToShow.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className={tableHeaderClasses}>Product</th>
                                        <th className={tableHeaderClasses}>Base Price</th>
                                        <th className={tableHeaderClasses}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsToShow.map(product => (
                                        <tr key={product.id}>
                                            <td className={tableRowClasses}>
                                                <p className="font-medium text-gray-800">{product.name}</p>
                                                <p className="text-xs text-gray-500">Category: {product.category}</p>
                                            </td>
                                            <td className={tableRowClasses}>${product.basePrice.toFixed(2)}</td>
                                            <td className={tableRowClasses}>
                                                <button
                                                    className={`${buttonClasses} px-3 py-1 text-sm`}
                                                    onClick={() => handleAddProductToBuild(product)}
                                                >
                                                    Add to Build
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-500 py-4 col-span-full">No products match the selected category.</p>
                        )}
                    </div>
                </div>

                {/* Global Configuration Filters moved here */}
                <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Global Configuration for Build</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="globalCollection" className="block text-sm font-medium text-gray-700">Collection</label>
                            <select
                                id="globalCollection"
                                className={inputClasses}
                                value={globalConfig.collection}
                                onChange={(e) => setGlobalConfig(prev => ({ ...prev, collection: e.target.value }))}
                            >
                                <option value="">Default/Any</option>
                                {/* Populate unique collections from availableProductsList for dropdown */}
                                {[...new Set(availableProductsList.flatMap(p => p.configOptions.collection || []))].map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="globalColor" className="block text-sm font-medium text-gray-700">Color</label>
                            <select
                                id="globalColor"
                                className={inputClasses}
                                value={globalConfig.color}
                                onChange={(e) => setGlobalConfig(prev => ({ ...prev, color: e.target.value }))}
                            >
                                <option value="">Default/Any</option>
                                {[...new Set(availableProductsList.flatMap(p => p.configOptions.color || []))].map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="globalDoorStyle" className="block text-sm font-medium text-gray-700">Door Style</label>
                            <select
                                id="globalDoorStyle"
                                className={inputClasses}
                                value={globalConfig.doorStyle}
                                onChange={(e) => setGlobalConfig(prev => ({ ...prev, doorStyle: e.target.value }))}
                            >
                                <option value="">Default/Any</option>
                                {[...new Set(availableProductsList.flatMap(p => p.configOptions.doorStyle || []))].map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="globalDrawerStyle" className="block text-sm font-medium text-gray-700">Drawer Style</label>
                            <select
                                id="globalDrawerStyle"
                                className={inputClasses}
                                value={globalConfig.drawerStyle}
                                onChange={(e) => setGlobalConfig(prev => ({ ...prev, drawerStyle: e.target.value }))}
                            >
                                <option value="">Default/Any</option>
                                {[...new Set(availableProductsList.flatMap(p => p.configOptions.drawerStyle || []))].map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="globalWoodSpecies" className="block text-sm font-medium text-gray-700">Wood Species</label>
                            <select
                                id="globalWoodSpecies"
                                className={inputClasses}
                                value={globalConfig.woodSpecies}
                                onChange={(e) => setGlobalConfig(prev => ({ ...prev, woodSpecies: e.target.value }))}
                            >
                                <option value="">Default/Any</option>
                                {[...new Set(availableProductsList.flatMap(p => p.configOptions.woodSpecies || []))].map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="globalBoxConstruction" className="block text-sm font-medium text-gray-700">Box Construction</label>
                            <select
                                id="globalBoxConstruction"
                                className={inputClasses}
                                value={globalConfig.boxConstruction}
                                onChange={(e) => setGlobalConfig(prev => ({ ...prev, boxConstruction: e.target.value }))}
                            >
                                <option value="">Default/Any</option>
                                {[...new Set(availableProductsList.flatMap(p => p.configOptions.boxConstruction || []))].map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Your Current Build, spanning full height */}
            <div className="flex flex-col flex-1 gap-6"> {/* Added flex-col and gap-6 to stack children */}
                <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Your Current Build</h3>
                      <div className="flex items-center space-x-2">
                        <select
                          id="selectProject"
                          className={inputClasses}
                          value={selectedProjectId}
                          onChange={(e) => setSelectedProjectId(e.target.value)}
                        >
                          <option value="">-- Select Project --</option>
                          {mockProjects.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                          ))}
                        </select>
                        <button className={buttonClasses} onClick={handleNewProject}>New Project</button>
                      </div>
                    </div>

                    <p className="text-lg font-semibold text-gray-800 mb-3">Current Project: {selectedProjectId ? mockProjects.find(p => p.id === selectedProjectId)?.name : 'No Project Selected'}</p>


                    {currentBuildProducts.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">No products in your current build. Add some from above!</p>
                    ) : (
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                            {currentBuildProducts.map(product => (
                                <div key={product.id} className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                                    {/* Upper Section: Product, Quantity, Unit Price, Total */}
                                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-200">
                                        <h4 className="font-semibold text-gray-800">{product.name}</h4>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="number"
                                                min="0"
                                                value={product.quantity}
                                                onChange={(e) => handleBuildProductQuantityChange(product.id, e.target.value)}
                                                className={`${inputClasses} w-20 text-right`}
                                            />
                                            <span className="text-sm text-gray-600">x ${product.calculatedPrice.toFixed(2)}</span> {/* Display calculated unit price */}
                                            <span className="font-bold text-green-700">=${(product.calculatedPrice * product.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Removed the individual configuration choices from here */}
                                    {/* Removed "Estimated Lead Time" from individual product display */}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Overall Summary */}
                <div className="p-4 border border-gray-200 rounded-md bg-white shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Overall Summary</h3>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Total Price:</span>
                        <span className="text-2xl font-bold text-green-600">${overallTotalPrice.toFixed(2)}</span>
                    </div>
                    {/* New fields: Shipping Cost, Assembling charge, Other charges, Discount */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
                        <div className="flex justify-between items-center">
                            <label htmlFor="buildShippingCost" className="text-gray-700 font-medium">Shipping Cost:</label>
                            <input
                                type="number"
                                id="buildShippingCost"
                                value={globalConfig.shippingCost || 0}
                                onChange={(e) => setGlobalConfig(prev => ({ ...prev, shippingCost: parseFloat(e.target.value) || 0 }))}
                                className={`${inputClasses} w-24 text-right`}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="buildAssemblyCharge" className="text-gray-700 font-medium">Assembly Charge:</label>
                            <input
                                type="number"
                                id="buildAssemblyCharge"
                                value={globalConfig.assemblyCharge || 0}
                                onChange={(e) => setGlobalConfig(prev => ({ ...prev, assemblyCharge: parseFloat(e.target.value) || 0 }))}
                                className={`${inputClasses} w-24 text-right`}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="buildOtherCharges" className="text-gray-700 font-medium">Other Charges:</label>
                            <input
                                type="number"
                                id="buildOtherCharges"
                                value={globalConfig.otherCharges || 0}
                                onChange={(e) => setGlobalConfig(prev => ({ ...prev, otherCharges: parseFloat(e.target.value) || 0 }))}
                                className={`${inputClasses} w-24 text-right`}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="buildDiscountRate" className="text-gray-700 font-medium">Discount (%):</label>
                            <input
                                type="number"
                                id="buildDiscountRate"
                                value={globalConfig.discountRate || 0}
                                onChange={(e) => setGlobalConfig(prev => ({ ...prev, discountRate: parseFloat(e.target.value) || 0 }))}
                                className={`${inputClasses} w-24 text-right`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-700 font-medium">Total Discount:</span>
                        {/* Calculate discount amount based on total price and discount rate */}
                        <span className="text-red-600 font-bold">-${(overallTotalPrice * ((globalConfig.discountRate || 0) / 100)).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-3">
                        <span className="text-xl font-bold text-gray-800">Grand Total:</span>
                        <span className="text-2xl font-bold text-green-600">${(overallTotalPrice + (globalConfig.shippingCost || 0) + (globalConfig.assemblyCharge || 0) + (globalConfig.otherCharges || 0) - (overallTotalPrice * ((globalConfig.discountRate || 0) / 100))).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-medium">Longest Estimated Lead Time:</span>
                        <span className="text-xl font-bold">{overallMaxLeadTime} weeks</span>
                    </div>
                    <button className={`${buttonClasses} w-full mt-6`}>Generate Quotation from Build</button>
                </div>
            </div>
        </div>
    </div>
  );
};


// Deliveries Component
const Deliveries = ({ cardClasses, buttonClasses, inputClasses, tableHeaderClasses, tableRowClasses, tabItemClasses, activeTabItemClasses }) => {
  const [activeTab, setActiveTab] = useState('all-orders'); // all-orders, room-by-room-setup, all-deliveries

  const mockOrders = [
    { id: 'ORD-001', projectName: 'Smith Kitchen', date: '2023-01-20', value: '$15,500', status: 'Processing', items: [{name: 'Base Cabinet', qty: 5}, {name: 'Wall Cabinet', qty: 4}] },
    { id: 'ORD-002', projectName: 'Jones Bath', date: '2023-03-01', value: '$7,200', status: 'Shipped', items: [{name: 'Vanity 30"', qty: 1}, {name: 'Mirror', qty: 1}] },
  ];

  const mockDeliveries = [
    { id: 'ORD-001', projectName: 'Smith Kitchen', value: '$15,500', requiredDate: '2023-07-01', scheduledDate: '2023-06-30', actualDate: '-', status: 'Scheduled', tracking: 'TRK12345' },
    { id: 'ORD-002', projectName: 'Jones Bath', date: '2023-03-05', scheduledDate: '2023-03-04', actualDate: '2023-03-04', status: 'Delivered', tracking: 'TRK67890' },
  ];

  // State for Room by Room Delivery Setup
  const [selectedOrderForRoomSetup, setSelectedOrderForRoomSetup] = useState('');
  // roomsData structure: { orderId: [{ roomName: 'Kitchen', products: [{name: 'productA', qty: 2}] }] }
  const [roomsData, setRoomsData] = useState({});
  const [newRoomName, setNewRoomName] = useState('');
  const [productToAddToRoom, setProductToAddToRoom] = useState({ name: '', qty: 1 });

  // Handle selecting an order for room setup
  const handleOrderSelection = (orderId) => {
    setSelectedOrderForRoomSetup(orderId);
    // Initialize rooms for this order if not already present
    if (!roomsData[orderId]) {
      setRoomsData(prev => ({ ...prev, [orderId]: [] }));
    }
  };

  // Handle adding a new room to the selected order
  const handleAddRoom = () => {
    if (selectedOrderForRoomSetup && newRoomName.trim() !== '') {
      setRoomsData(prev => ({
        ...prev,
        [selectedOrderForRoomSetup]: [...(prev[selectedOrderForRoomSetup] || []), { name: newRoomName.trim(), products: [] }]
      }));
      setNewRoomName('');
    }
  };

  // Handle adding a product to a specific room within the selected order
  const handleAddProductToRoom = (roomName) => {
    if (selectedOrderForRoomSetup && productToAddToRoom.name.trim() !== '') {
      setRoomsData(prev => {
        const updatedOrderRooms = prev[selectedOrderForRoomSetup].map(room => {
          if (room.name === roomName) {
            const existingProductIndex = room.products.findIndex(p => p.name === productToAddToRoom.name.trim());
            if (existingProductIndex > -1) {
              const updatedProducts = [...room.products];
              updatedProducts[existingProductIndex].qty += parseInt(productToAddToRoom.qty);
              return { ...room, products: updatedProducts };
            } else {
              return { ...room, products: [...room.products, { name: productToAddToRoom.name.trim(), qty: parseInt(productToAddToRoom.qty) }] };
            }
          }
          return room;
        });
        return { ...prev, [selectedOrderForRoomSetup]: updatedOrderRooms };
      });
      setProductToAddToRoom({ name: '', qty: 1 }); // Reset product input
    }
  };


  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Deliveries</h1>

      <div className="flex border-b border-gray-200 mb-6">
        <div className={`${tabItemClasses} ${activeTab === 'all-orders' ? activeTabItemClasses : ''}`} onClick={() => setActiveTab('all-orders')}>All Orders</div>
        <div className={`${tabItemClasses} ${activeTab === 'room-by-room-setup' ? activeTabItemClasses : ''}`} onClick={() => setActiveTab('room-by-room-setup')}>Room by Room Delivery Setup</div>
        <div className={`${tabItemClasses} ${activeTab === 'all-deliveries' ? activeTabItemClasses : ''}`} onClick={() => setActiveTab('all-deliveries')}>All Deliveries</div>
      </div>

      {activeTab === 'all-orders' && (
        <div className={cardClasses}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">All Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className={tableHeaderClasses}>Order ID</th>
                  <th className={tableHeaderClasses}>Project Name</th>
                  <th className={tableHeaderClasses}>Order Date</th>
                  <th className={tableHeaderClasses}>Order Value</th>
                  <th className={tableHeaderClasses}>Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockOrders.map((order) => (
                  <tr key={order.id}>
                    <td className={tableRowClasses}>{order.id}</td>
                    <td className={tableRowClasses}>{order.projectName}</td>
                    <td className={tableRowClasses}>{order.date}</td>
                    <td className={tableRowClasses}>{order.value}</td>
                    <td className={tableRowClasses}>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'room-by-room-setup' && (
        <div className={cardClasses}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Room by Room Delivery Setup</h2>

          <div className="mb-6">
            <label htmlFor="selectOrder" className="block text-sm font-medium text-gray-700">Select Order:</label>
            <select
              id="selectOrder"
              className={inputClasses}
              value={selectedOrderForRoomSetup}
              onChange={(e) => handleOrderSelection(e.target.value)}
            >
              <option value="">-- Select an Order --</option>
              {mockOrders.map(order => (
                <option key={order.id} value={order.id}>{order.id} - {order.projectName}</option>
              ))}
            </select>
          </div>

          {selectedOrderForRoomSetup && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Configure Rooms for Order: {selectedOrderForRoomSetup}</h3>

              {/* Add New Room */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="New Room Name (e.g., Kitchen, Master Bath)"
                  className={`${inputClasses} flex-grow`}
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                />
                <button className={buttonClasses} onClick={handleAddRoom}>Add Room</button>
              </div>

              {/* List of Configured Rooms */}
              {roomsData[selectedOrderForRoomSetup]?.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto p-2 border border-gray-200 rounded-md bg-white">
                  {roomsData[selectedOrderForRoomSetup].map((room, roomIndex) => (
                    <div key={room.name} className="border p-4 rounded-md bg-gray-50">
                      <h4 className="text-md font-semibold text-gray-800 mb-2">{room.name}</h4>

                      {/* Products in this Room */}
                      {room.products.length > 0 ? (
                        <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
                          {room.products.map((product, prodIndex) => (
                            <li key={prodIndex}>{product.name} (Qty: {product.qty})</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 mb-2">No products assigned to this room yet.</p>
                      )}

                      {/* Add Product to this Room */}
                      <div className="flex gap-2 mt-3">
                        <input
                          type="text"
                          placeholder="Product Name"
                          className={`${inputClasses} flex-grow`}
                          value={productToAddToRoom.name}
                          onChange={(e) => setProductToAddToRoom(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <input
                          type="number"
                          min="1"
                          placeholder="Qty"
                          className={`${inputClasses} w-16`}
                          value={productToAddToRoom.qty}
                          onChange={(e) => setProductToAddToRoom(prev => ({ ...prev, qty: parseInt(e.target.value) || 1 }))}
                        />
                        <button
                          className={`${buttonClasses} px-3 py-1 text-sm`}
                          onClick={() => handleAddProductToRoom(room.name)}
                        >
                          Add Product
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 mt-4 p-4 border border-dashed border-gray-300 rounded-md text-center">
                  Select an order and add your first room to begin setting up deliveries.
                </p>
              )}
              <button className={`${buttonClasses} mt-6`}>Save Room Delivery Setup</button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'all-deliveries' && (
        <div className={cardClasses}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">All Deliveries</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className={tableHeaderClasses}>Order ID</th>
                  <th className={tableHeaderClasses}>Project Name</th>
                  <th className={tableHeaderClasses}>Order Date</th>
                  <th className={tableHeaderClasses}>Order Value</th>
                  <th className={tableHeaderClasses}>Status</th>
                  <th className={tableHeaderClasses}>Tracking Number</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockDeliveries.map((delivery) => (
                  <tr key={delivery.id}>
                    <td className={tableRowClasses}>{delivery.id}</td>
                    <td className={tableRowClasses}>{delivery.projectName}</td>
                    <td className={tableRowClasses}>{delivery.value}</td>
                    <td className={tableRowClasses}>{delivery.requiredDate}</td>
                    <td className={tableRowClasses}>{delivery.scheduledDate}</td>
                    <td className={tableRowClasses}>{delivery.actualDate}</td>
                    <td className={tableRowClasses}>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        delivery.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {delivery.status}
                      </span>
                    </td>
                    <td className={tableRowClasses}>{delivery.tracking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'payment-history' && (
        <div className={cardClasses}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className={tableHeaderClasses}>Invoice No</th>
                  <th className={tableHeaderClasses}>Project Name</th>
                  <th className={tableHeaderClasses}>Payment Date</th>
                  <th className={tableHeaderClasses}>Payment Amount</th>
                  <th className={tableHeaderClasses}>Payment Method</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPaymentHistory.map((payment) => (
                  <tr key={payment.no}>
                    <td className={tableRowClasses}>{payment.no}</td>
                    <td className={tableRowClasses}>{payment.projectName}</td>
                    <td className={tableRowClasses}>{payment.paymentDate}</td>
                    <td className={tableRowClasses}>${parseFloat(payment.amount).toFixed(2)}</td>
                    <td className={tableRowClasses}>{payment.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Returns & Warranties Component
const ReturnsWarranties = ({ cardClasses, buttonClasses, tableHeaderClasses, tableRowClasses, tabItemClasses, activeTabItemClasses }) => {
  const [activeTab, setActiveTab] = useState('returns-history'); // returns-history, warranties-history

  const mockReturnsHistory = [
    { id: 'RET-001', orderId: 'ORD-001', date: '2023-06-01', reason: 'Damaged item', status: 'Pending Approval' },
    { id: 'RET-002', orderId: 'ORD-999', date: '2023-05-10', reason: 'Wrong size', status: 'Approved' },
  ];

  const mockWarrantiesHistory = [
    { id: 'WAR-001', product: 'Cabinet Door', date: '2023-04-20', issue: 'Hinge broken', status: 'Under Review' },
    { id: 'WAR-002', product: 'Drawer Slide', date: '2023-03-01', issue: 'Sticky mechanism', status: 'Resolved' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Returns & Warranties</h1>

      <div className="flex space-x-4 mb-6">
        <button className={buttonClasses}>Submit Return Request</button>
        <button className={buttonClasses}>Submit Warranty Request</button>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <div className={`${tabItemClasses} ${activeTab === 'returns-history' ? activeTabItemClasses : ''}`} onClick={() => setActiveTab('returns-history')}>Returns History</div>
        <div className={`${tabItemClasses} ${activeTab === 'warranties-history' ? activeTabItemClasses : ''}`} onClick={() => setActiveTab('warranties-history')}>Warranties History</div>
      </div>

      {activeTab === 'returns-history' && (
        <div className={cardClasses}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Returns History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className={tableHeaderClasses}>Return ID</th>
                  <th className={tableHeaderClasses}>Order ID</th>
                  <th className={tableHeaderClasses}>Date</th>
                  <th className={tableHeaderClasses}>Reason</th>
                  <th className={tableHeaderClasses}>Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockReturnsHistory.map((item) => (
                  <tr key={item.id}>
                    <td className={tableRowClasses}>{item.id}</td>
                    <td className={tableRowClasses}>{item.orderId}</td>
                    <td className={tableRowClasses}>{item.date}</td>
                    <td className={tableRowClasses}>{item.reason}</td>
                    <td className={tableRowClasses}>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Pending Approval' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'warranties-history' && (
        <div className={cardClasses}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Warranties History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className={tableHeaderClasses}>Warranty ID</th>
                  <th className={tableHeaderClasses}>Product</th>
                  <th className={tableHeaderClasses}>Date</th>
                  <th className={tableHeaderClasses}>Issue</th>
                  <th className={tableHeaderClasses}>Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockWarrantiesHistory.map((item) => (
                  <tr key={item.id}>
                    <td className={tableRowClasses}>{item.id}</td>
                    <td className={tableRowClasses}>{item.product}</td>
                    <td className={tableRowClasses}>{item.date}</td>
                    <td className={tableRowClasses}>{item.issue}</td>
                    <td className={tableRowClasses}>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Resources Component
const Resources = ({ cardClasses, buttonClasses }) => {
  const resourceCategories = [
    { title: "Product Documentation", description: "Access detailed specifications, assembly guides, and care instructions for all Epoch Cabinetry products." },
    { title: "Marketing Materials", description: "Download high-resolution images, brochures, and promotional content to support your sales efforts." },
    { title: "Training Resources", description: "Find webinars, tutorials, and guides to enhance your product knowledge and sales techniques." },
    { title: "Company Policies & Legal", description: "Review our latest company policies, terms of service, and legal documents." },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Resources</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resourceCategories.map((category, index) => (
          <div key={index} className={cardClasses}>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{category.title}</h2>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <button className={buttonClasses}>Browse Resources</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Users & Settings Component
const UsersSettings = ({ cardClasses, buttonClasses, inputClasses, tableHeaderClasses, tableRowClasses, tabItemClasses, activeTabItemClasses }) => {
  const [activeTab, setActiveTab] = useState('dealer-info'); // dealer-info, user-management, notifications, security

  // Mock data for dealer information
  const [dealerInfo, setDealerInfo] = useState({
    name: 'Epoch Cabinets Inc.',
    id: 'DLR-007',
    contactPerson: 'Jane Doe',
    email: 'jane.doe@epochcabinets.com',
    telephone: '+1 (123) 456-7890',
    address: '123 Cabinetry Lane\nSuite 100\nWoodville, CA 90210',
    businessHours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    logo: 'https://placehold.co/150x80/EEEEEE/333333?text=Dealer+Logo',
  });

  // Mock data for user management
  const mockUsers = [
    { id: 'USR-001', name: 'Alice Smith', email: 'alice.s@example.com', role: 'Admin', status: 'Active' },
    { id: 'USR-002', name: 'Bob Johnson', email: 'bob.j@example.com', role: 'Sales', status: 'Active' },
    { id: 'USR-003', name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Viewer', status: 'Inactive' },
  ];


  const handleDealerInfoChange = (e) => {
    const { name, value } = e.target;
    setDealerInfo({ ...dealerInfo, [name]: value });
  };

  const handleUpdateDealerInfo = () => {
    alert("Dealer information updated!"); // Replace with real update logic
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Users & Settings</h1>

      <div className="flex border-b border-gray-200 mb-6">
        <div className={`${tabItemClasses} ${activeTab === 'dealer-info' ? activeTabItemClasses : ''}`} onClick={() => setActiveTab('dealer-info')}>Dealer Information</div>
        <div className={`${tabItemClasses} ${activeTab === 'user-management' ? activeTabItemClasses : ''}`} onClick={() => setActiveTab('user-management')}>User Management</div>
        <div className={`${tabItemClasses} ${activeTab === 'notifications' ? activeTabItemClasses : ''}`} onClick={() => setActiveTab('notifications')}>Notifications</div>
        <div className={`${tabItemClasses} ${activeTab === 'security' ? activeTabItemClasses : ''}`} onClick={() => setActiveTab('security')}>Security</div>
      </div>

      {activeTab === 'dealer-info' && (
        <div className={cardClasses}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Dealer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dealerName" className="block text-sm font-medium text-gray-700">Dealer Name</label>
              <input type="text" id="dealerName" name="name" value={dealerInfo.name} onChange={handleDealerInfoChange} className={inputClasses} />
            </div>
            <div>
              <label htmlFor="dealerId" className="block text-sm font-medium text-gray-700">Dealer ID</label>
              <input type="text" id="dealerId" name="id" value={dealerInfo.id} readOnly className={inputClasses + " bg-gray-50 cursor-not-allowed"} />
            </div>
            <div>
              <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Contact Person</label>
              <input type="text" id="contactPerson" name="contactPerson" value={dealerInfo.contactPerson} onChange={handleDealerInfoChange} className={inputClasses} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" value={dealerInfo.email} onChange={handleDealerInfoChange} className={inputClasses} />
            </div>
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone</label>
              <input type="tel" id="telephone" name="telephone" value={dealerInfo.telephone} onChange={handleDealerInfoChange} className={inputClasses} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <textarea id="address" name="address" rows="4" value={dealerInfo.address} onChange={handleDealerInfoChange} className={inputClasses}></textarea>
            </div>
            <div>
              <label htmlFor="businessHours" className="block text-sm font-medium text-gray-700">Business Hours</label>
              <input type="text" id="businessHours" name="businessHours" value={dealerInfo.businessHours} onChange={handleDealerInfoChange} className={inputClasses} />
            </div>
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Current Logo</label>
              <img src={dealerInfo.logo} alt="Dealer Logo" className="mt-1 h-20 w-auto rounded-md border border-gray-200 p-1" />
              <button className={`${buttonClasses} mt-2`}>Change Logo</button>
            </div>
          </div>
          <button className={`${buttonClasses} mt-6`} onClick={handleUpdateDealerInfo}>Update Information</button>
        </div>
      )}

      {activeTab === 'user-management' && (
        <div className={cardClasses}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Management</h2>
          <p className="text-gray-600 mb-4">Manage users who have access to your dealer portal account.</p>
          <button className={buttonClasses}>Add New User</button>
          
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className={tableHeaderClasses}>User ID</th>
                  <th className={tableHeaderClasses}>Name</th>
                  <th className={tableHeaderClasses}>Email</th>
                  <th className={tableHeaderClasses}>Role</th>
                  <th className={tableHeaderClasses}>Status</th>
                  <th className={tableHeaderClasses}>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockUsers.map((user) => (
                  <tr key={user.id}>
                    <td className={tableRowClasses}>{user.id}</td>
                    <td className={tableRowClasses}>{user.name}</td>
                    <td className={tableRowClasses}>{user.email}</td>
                    <td className={tableRowClasses}>{user.role}</td>
                    <td className={tableRowClasses}>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-110 text-red-800' // Using custom red for inactive
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className={tableRowClasses}>
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className={cardClasses}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h2>
          <p className="text-gray-600 mb-4">Configure your notification preferences.</p>
          <div className="space-y-4">
            <div className="flex items-center">
              <input type="checkbox" id="notifyQuotations" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
              <label htmlFor="notifyQuotations" className="ml-2 block text-sm text-gray-900">Email me about new quotation statuses</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="notifyDeliveries" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
              <label htmlFor="notifyDeliveries" className="ml-2 block text-sm text-gray-900">Email me about delivery updates</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="notifyInvoices" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
              <label htmlFor="notifyInvoices" className="ml-2 block text-sm text-gray-900">Email me about pending invoices</label>
            </div>
          </div>
          <button className={`${buttonClasses} mt-6`}>Save Notification Settings</button>
        </div>
      )}

      {activeTab === 'security' && (
        <div className={cardClasses}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Security Settings</h2>
          <p className="text-gray-600 mb-4">Manage your account security.</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
              <input type="password" id="currentPassword" className={inputClasses} />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
              <input type="password" id="newPassword" className={inputClasses} />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input type="password" id="confirmPassword" className={inputClasses} />
            </div>
          </div>
          <button className={`${buttonClasses} mt-6`}>Change Password</button>
        </div>
      )}
    </div>
  );
};

export default App;
