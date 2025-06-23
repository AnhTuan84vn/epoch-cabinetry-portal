import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock product data for demonstration purposes
const mockProducts = [
  { id: 'prod-001', name: 'Base Cabinet 36" - Modern Lux', series: 'Modern Lux', style: 'Shaker', color: 'White', category: 'Base Cabinets', unitPrice: 450.00 },
  { id: 'prod-002', name: 'Wall Cabinet 30" - Modern Lux', series: 'Modern Lux', style: 'Slab', color: 'Grey', category: 'Wall Cabinets', unitPrice: 300.00 },
  { id: 'prod-003', name: 'Tall Cabinet 84" - Classic Elegance', series: 'Classic Elegance', style: 'Raised Panel', color: 'Espresso', category: 'Tall Cabinets', unitPrice: 800.00 },
  { id: 'prod-004', name: 'Drawer Base 24" - Urban Loft', series: 'Urban Loft', style: 'Shaker', color: 'Natural Wood', category: 'Base Cabinets', unitPrice: 550.00 },
  { id: 'prod-005', name: 'Pantry Unit 90" - Modern Lux', series: 'Modern Lux', style: 'Slab', color: 'White', category: 'Tall Cabinets', unitPrice: 1200.00 },
  { id: 'prod-006', name: 'Corner Base Cabinet - Classic Elegance', series: 'Classic Elegance', style: 'Raised Panel', color: 'Grey', category: 'Base Cabinets', unitPrice: 650.00 },
  { id: 'prod-007', name: 'Wine Rack Insert - Urban Loft', series: 'Urban Loft', style: 'Shaker', color: 'Natural Wood', category: 'Accessories', unitPrice: 150.00 },
  { id: 'prod-010', name: 'Spice Rack Pullout - Urban Loft', series: 'Urban Loft', style: 'Raised Panel', color: 'Grey', category: 'Accessories', unitPrice: 100.00 },
  { id: 'prod-008', name: 'Island Base 48" - Modern Lux', series: 'Modern Lux', style: 'Shaker', color: 'White', category: 'Base Cabinets', unitPrice: 900.00 },
  { id: 'prod-009', name: 'Glass Door Wall Cabinet - Classic Elegance', series: 'Classic Elegance', style: 'Slab', color: 'Espresso', category: 'Wall Cabinets', unitPrice: 400.00 },
];

/**
 * Main App component that orchestrates the entire dealer portal UI.
 * Manages active main menu and sub-menu states for navigation.
 */
const App = () => {
  // State to manage the active main menu item selected by the user.
  const [activeMainMenu, setActiveMainMenu] = useState('Dashboard');
  // State to manage the active sub-menu item for the 'Quotations' section.
  const [activeQuotationSubMenu, setActiveQuotationSubMenu] = useState('Project');
  // State to manage the active sub-menu item for the 'Users & Settings' section.
  const [activeUserSettingsSubMenu, setActiveUserSettingsSubMenu] = useState('Dealer Profile');
  // State to manage the active sub-menu item for 'Orders & Deliveries' section.
  const [activeOrdersSubTab, setActiveOrdersSubTab] = useState('All Orders');

  /**
   * Renders the appropriate content component based on the active main menu item.
   * This acts as a router for the single-page application structure.
   */
  const renderContent = () => {
    switch (activeMainMenu) {
      case 'Dashboard':
        return <DashboardContent />;
      case 'Product Catalog':
        return <ProductCatalogContent />;
      case 'Quotations':
        return <QuotationsContent activeSubMenu={activeQuotationSubMenu} />;
      case 'Orders & Deliveries':
        return <OrdersAndDeliveriesContent activeSubTab={activeOrdersSubTab} setActiveSubTab={setActiveOrdersSubTab} />;
      case 'Payments':
        return <PaymentsContent />;
      case 'Settings':
        return <UserSettingsContent activeSubMenu={activeUserSettingsSubMenu} />;
      case 'Returns & Warranties':
        return <ReturnsWarrantiesContent />;
      case 'Documents & Resources':
        return <DocumentsResourcesContent />;
      default:
        return <DashboardContent />; // Default to Dashboard
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-800">
      {/* Top Navigation Bar: Contains logo, main menu links, and user avatar */}
      <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg p-4">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main flex container for the navigation bar row */}
          <div className="flex items-center h-16 w-full">
            {/* Logo or Brand Name for EPOCH Cabinetry - Fixed size */}
            <div className="flex-shrink-0 flex items-center pr-4">
              <span className="text-white text-2xl font-bold rounded-lg px-2 py-1">EPOCH Cabinetry</span>
            </div>

            {/* Main Navigation Links - Flexible and allows items to shrink and wrap */}
            <div className="flex items-center flex-grow overflow-hidden">
              <div className="flex items-center space-x-2 flex-wrap md:flex-nowrap w-full justify-center">
                {/* Dashboard Button */}
                <button
                  className={`text-white text-base font-medium px-2 py-1 rounded-lg transition duration-300 ease-in-out flex-shrink-0 text-center whitespace-normal ${
                    activeMainMenu === 'Dashboard' ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-500'
                  }`}
                  onClick={() => {
                    setActiveMainMenu('Dashboard');
                    setActiveQuotationSubMenu('Project');
                    setActiveUserSettingsSubMenu('Dealer Profile');
                    setActiveOrdersSubTab('All Orders');
                  }}
                >
                  Dashboard
                </button>

                {/* Product Catalog Button */}
                <button
                  className={`text-white text-base font-medium px-2 py-1 rounded-lg transition duration-300 ease-in-out flex-shrink-0 text-center whitespace-normal ${
                    activeMainMenu === 'Product Catalog' ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-500'
                  }`}
                  onClick={() => {
                    setActiveMainMenu('Product Catalog');
                    setActiveQuotationSubMenu('Project');
                    setActiveUserSettingsSubMenu('Dealer Profile');
                    setActiveOrdersSubTab('All Orders');
                  }}
                >
                  Product<br />Catalog
                </button>

                {/* Quotations Button */}
                <button
                  className={`text-white text-base font-medium px-2 py-1 rounded-lg transition duration-300 ease-in-out flex-shrink-0 text-center whitespace-normal ${
                    activeMainMenu === 'Quotations' ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-500'
                  }`}
                  onClick={() => {
                    setActiveMainMenu('Quotations');
                    setActiveOrdersSubTab('All Orders');
                  }}
                >
                  Quotations
                </button>

                {/* Orders & Deliveries Button */}
                <button
                  className={`text-white text-base font-medium px-2 py-1 rounded-lg transition duration-300 ease-in-out flex-shrink-0 text-center whitespace-normal ${
                    activeMainMenu === 'Orders & Deliveries' ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-500'
                  }`}
                  onClick={() => setActiveMainMenu('Orders & Deliveries')}
                >
                  Orders &<br />Deliveries
                </button>

                {/* Payments Button */}
                <button
                  className={`text-white text-base font-medium px-2 py-1 rounded-lg transition duration-300 ease-in-out flex-shrink-0 text-center whitespace-normal ${
                    activeMainMenu === 'Payments' ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-500'
                  }`}
                  onClick={() => {
                    setActiveMainMenu('Payments');
                    setActiveQuotationSubMenu('Project');
                    setActiveUserSettingsSubMenu('Dealer Profile');
                    setActiveOrdersSubTab('All Orders');
                  }}
                >
                  Payments
                </button>

                {/* Returns & Warranties Button */}
                <button
                  className={`text-white text-base font-medium px-2 py-1 rounded-lg transition duration-300 ease-in-out flex-shrink-0 text-center whitespace-normal ${
                    activeMainMenu === 'Returns & Warranties' ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-500'
                  }`}
                  onClick={() => {
                    setActiveMainMenu('Returns & Warranties');
                    setActiveQuotationSubMenu('Project');
                    setActiveUserSettingsSubMenu('Dealer Profile');
                    setActiveOrdersSubTab('All Orders');
                  }}
                >
                  Returns &<br />Warranties
                </button>

                {/* Documents & Resources Button */}
                <button
                  className={`text-white text-base font-medium px-2 py-1 rounded-lg transition duration-300 ease-in-out flex-shrink-0 text-center whitespace-normal ${
                    activeMainMenu === 'Documents & Resources' ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-500'
                  }`}
                  onClick={() => {
                    setActiveMainMenu('Documents & Resources');
                    setActiveQuotationSubMenu('Project');
                    setActiveUserSettingsSubMenu('Dealer Profile');
                    setActiveOrdersSubTab('All Orders');
                  }}
                >
                  Documents &<br />Resources
                </button>

                {/* Settings Button - Moved to this position */}
                <button
                  className={`text-white text-base font-medium px-2 py-1 rounded-lg transition duration-300 ease-in-out flex-shrink-0 text-center whitespace-normal ${
                    activeMainMenu === 'Settings' ? 'bg-blue-600 shadow-md' : 'hover:bg-blue-500'
                  }`}
                  onClick={() => setActiveMainMenu('Settings')}
                >
                  Settings
                </button>
              </div>
            </div>
            {/* User Profile / Avatar Section - Fixed size, pushed to far right */}
            <div className="flex items-center pl-4 flex-shrink-0">
              <img
                src="https://placehold.co/40x40/FFFFFF/000000?text=JD" // Placeholder avatar with initials
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-white mr-2"
              />
              <span className="text-white text-lg font-medium">John D.</span> {/* Display short user name */}
            </div>
          </div>
        </div>
      </nav>

      {/* Conditional Sub-menu Tabs for Quotations, Orders & Deliveries, and Settings */}
      {(activeMainMenu === 'Quotations' || activeMainMenu === 'Settings' || activeMainMenu === 'Orders & Deliveries') && (
        <div className="bg-blue-100 py-3 shadow-inner">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-4 justify-center">
              {activeMainMenu === 'Quotations' && (
                <>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
                      activeQuotationSubMenu === 'Project'
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'text-blue-800 hover:bg-blue-200'
                    }`}
                    onClick={() => setActiveQuotationSubMenu('Project')}
                  >
                    Project
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
                      activeQuotationSubMenu === 'Add Products'
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'text-blue-800 hover:bg-blue-200'
                    }`}
                    onClick={() => setActiveQuotationSubMenu('Add Products')}
                  >
                    Add Products
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
                      activeQuotationSubMenu === 'Review & Approve'
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'text-blue-800 hover:bg-blue-200'
                    }`}
                    onClick={() => setActiveQuotationSubMenu('Review & Approve')}
                  >
                    Review & Approve
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
                      activeQuotationSubMenu === 'Existing Quotations'
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'text-blue-800 hover:bg-blue-200'
                    }`}
                    onClick={() => setActiveQuotationSubMenu('Existing Quotations')}
                  >
                    Existing Quotations
                  </button>
                </>
              )}

              {activeMainMenu === 'Orders & Deliveries' && (
                <>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
                      activeOrdersSubTab === 'All Orders'
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'text-blue-800 hover:bg-blue-200'
                    }`}
                    onClick={() => setActiveOrdersSubTab('All Orders')}
                  >
                    All Orders
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
                      activeOrdersSubTab === 'Deliveries'
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'text-blue-800 hover:bg-blue-200'
                    }`}
                    onClick={() => setActiveOrdersSubTab('Deliveries')}
                  >
                    Deliveries
                  </button>
                </>
              )}

              {activeMainMenu === 'Settings' && (
                <>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
                      activeUserSettingsSubMenu === 'Dealer Profile'
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'text-blue-800 hover:bg-blue-200'
                    }`}
                    onClick={() => setActiveUserSettingsSubMenu('Dealer Profile')}
                  >
                    Dealer Profile
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
                      activeUserSettingsSubMenu === 'User Management'
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'text-blue-800 hover:bg-blue-200'
                    }`}
                    onClick={() => setActiveUserSettingsSubMenu('User Management')}
                  >
                    User Management
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
                      activeUserSettingsSubMenu === 'Notifications'
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'text-blue-800 hover:bg-blue-200'
                    }`}
                    onClick={() => setActiveUserSettingsSubMenu('Notifications')}
                  >
                    Notifications
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
                      activeUserSettingsSubMenu === 'Security'
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'text-blue-800 hover:bg-blue-200'
                    }`}
                    onClick={() => setActiveUserSettingsSubMenu('Security')}
                  >
                    Security
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area: Renders content based on active menu/sub-menu */}
      <main className="container mx-auto px-4 py-8 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-xl min-h-[calc(100vh-160px)]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

/**
 * Dashboard Content Component
 * Displays sales performance charts and upcoming deliveries.
 */
const DashboardContent = () => {
  // Mock data for Sales by Sales User chart
  const salesByUser = [
    { name: 'John Doe', 'Total Sales': 55200 },
    { name: 'Jane Smith', 'Total Sales': 48150 },
    { name: 'Peter Jones', 'Total Sales': 32900 },
  ];

  // Mock data for Sales by Product Series chart
  const salesByProduct = [
    { name: 'Modern Lux', 'Total Sales': 35800 },
    { name: 'Classic Elegance', 'Total Sales': 42500 },
    { name: 'Urban Loft', 'Total Sales': 23750 },
  ];

  // Mock data for Upcoming Deliveries table (now moved to Orders & Deliveries page)
  // This data will be part of the Deliveries sub-tab within OrdersAndDeliveriesContent
  const upcomingDeliveries = [
    { orderId: '#EPOCH-003', clientName: 'Emily White', deliveryDate: '2025-07-01', status: 'Pending Shipment' },
    { orderId: '#EPOCH-004', clientName: 'David Lee', deliveryDate: '2025-07-05', status: 'Processing' },
    { orderId: '#EPOCH-005', clientName: 'Jessica Kim', deliveryDate: '2025-07-10', status: 'Confirmed' },
  ];


  return (
    <div>
      <h2 className="text-3xl font-extrabold text-blue-800 mb-6">Dashboard</h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        Welcome to your EPOCH Cabinetry Dealer Portal Dashboard! Here you'll find a quick overview of your key activities,
        including recent orders, pending quotations, and important performance insights.
      </p>

      {/* Existing Dashboard Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 shadow-md border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Pending Quotations</h3>
          <p className="text-3xl font-bold text-blue-900">7</p>
          <p className="text-sm text-gray-600 mt-2">New quotations awaiting your review.</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 shadow-md border border-green-200">
          <h3 className="text-xl font-semibold text-green-700 mb-2">Recent Orders</h3>
          <p className="text-3xl font-bold text-green-900">3</p>
          <p className="text-sm text-gray-600 mt-2">Orders placed in the last 7 days.</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6 shadow-md border border-yellow-200">
          <h3 className="text-xl font-semibold text-yellow-700 mb-2">Messages</h3>
          <p className="text-3xl font-bold text-yellow-900">2</p>
          <p className="text-sm text-gray-600 mt-2">Unread messages from EPOCH support.</p>
        </div>
      </div>

      {/* Charts for Sales Performance: Arranged horizontally for widescreen */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Sales by Sales User Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex-1">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">Sales Performance by Sales User</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={salesByUser}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" angle={-15} textAnchor="end" height={50} />
              <YAxis stroke="#6b7280" />
              <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />
              <Legend />
              <Bar dataKey="Total Sales" fill="#4299e1" barSize={30} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Product Series Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex-1">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">Sales by Product Series</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={salesByProduct}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" angle={-15} textAnchor="end" height={50} />
              <YAxis stroke="#6b7280" />
              <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />
              <Legend />
              <Bar dataKey="Total Sales" fill="#68d391" barSize={30} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Placeholder for the Upcoming Deliveries, as it's now part of Orders & Deliveries page */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">Upcoming Deliveries (See Orders & Deliveries)</h3>
        <p className="text-gray-600">Detailed upcoming delivery schedules can now be found under the "Orders & Deliveries" section.</p>
      </div>
    </div>
  );
};

/**
 * Product Catalog Content Component
 * Displays a list of products with filtering options.
 */
const ProductCatalogContent = () => (
  <div>
    <h2 className="text-3xl font-extrabold text-blue-800 mb-6">Product Catalog</h2>
    <p className="text-gray-700 leading-relaxed">
      Explore the complete range of EPOCH Cabinetry products. Use the filters below to refine your search by style,
      material, finish, and more. Detailed product specifications, pricing, and high-resolution images are available
      for each item.
    </p>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Placeholder Product Cards - example of responsive grid */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-4 shadow-md border border-gray-200">
          <img
            src={`https://placehold.co/300x200/CBD5E1/475569?text=Cabinet+Series+${i}`}
            alt={`Cabinet Series ${i}`}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Elegant Series {i}</h3>
          <p className="text-gray-600 text-sm">
            Modern design with premium finishes. Ideal for contemporary kitchens.
          </p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            View Details
          </button>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Quotations Content Component
 * Manages different sub-tabs related to quotations (Project, Add Products, Review & Approve, Existing Quotations).
 */
const QuotationsContent = ({ activeSubMenu }) => {
  // Options for product selector filters based on mockProducts
  const productSeriesOptions = Array.from(new Set(mockProducts.map(p => p.series)));
  const doorStyleOptions = Array.from(new Set(mockProducts.map(p => p.style)));
  const colorOptions = Array.from(new Set(mockProducts.map(p => p.color)));
  const categoryOptions = Array.from(new Set(mockProducts.map(p => p.category)));

  // State for product filters
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // State for quotation items (products currently in the quote)
  const [quotationItems, setQuotationItems] = useState([
    { id: 'prod-001', product: 'Base Cabinet 36" - Modern Lux', quantity: 2, unitPrice: 450.00 },
    { id: 'prod-003', product: 'Tall Cabinet 84" - Classic Elegance', quantity: 1, unitPrice: 800.00 },
  ]);

  // State for additional charges/discounts in the quote
  const [shippingRate, setShippingRate] = useState(150.00);
  const [additionalCharges, setAdditionalCharges] = useState(50.00);
  const [discount, setDiscount] = useState(25.00);

  // Effect to filter products dynamically whenever filter selections change
  useEffect(() => {
    let currentFiltered = mockProducts;

    if (selectedSeries) {
      currentFiltered = currentFiltered.filter(p => p.series === selectedSeries);
    }
    if (selectedStyle) {
      currentFiltered = currentFiltered.filter(p => p.style === selectedStyle);
    }
    if (selectedColor) {
      currentFiltered = currentFiltered.filter(p => p.color === selectedColor);
    }
    if (selectedCategory) {
      currentFiltered = currentFiltered.filter(p => p.category === selectedCategory);
    }
    setFilteredProducts(currentFiltered);
  }, [selectedSeries, selectedStyle, selectedColor, selectedCategory]);

  /**
   * Handles adding a product to the quotation list.
   * If the product already exists, increments its quantity. Otherwise, adds it as a new item.
   */
  const handleAddProductToQuotation = (productToAdd) => {
    setQuotationItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === productToAdd.id);

      if (existingItemIndex > -1) {
        // If item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // If item does not exist, add it with quantity 1
        return [...prevItems, {
          id: productToAdd.id,
          product: productToAdd.name,
          quantity: 1,
          unitPrice: productToAdd.unitPrice
        }];
      }
    });
  };

  // Calculate total quotation value dynamically
  const subtotal = quotationItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const grandTotal = subtotal + shippingRate + additionalCharges - discount;

  /**
   * Renders content specific to the active sub-menu of the Quotations section.
   */
  const renderQuotationSubContent = () => {
    switch (activeSubMenu) {
      case 'Project':
        return (
          <div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Project Details</h3>
            <p className="text-gray-700 mb-6">
              Start a new quotation by entering project details, client information, and delivery preferences.
              This section helps you organize your projects efficiently.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="projectName" className="text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input type="text" id="projectName" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Smith Kitchen Renovation" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="contactPerson" className="text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input type="text" id="contactPerson" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Jane Smith" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="expectedDeliveryDate" className="text-sm font-medium text-gray-700 mb-1">Expected Delivery Date</label>
                <input type="date" id="expectedDeliveryDate" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="deliveryAddress" className="text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <input type="text" id="deliveryAddress" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 123 Main St" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="postalCode" className="text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input type="text" id="postalCode" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 90210" />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label htmlFor="deliveryNotes" className="text-sm font-medium text-gray-700 mb-1">Delivery Notes</label>
                <textarea id="deliveryNotes" rows="3" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Any specific instructions for delivery..."></textarea>
              </div>
            </div>
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-colors">
              Save Project Details
            </button>
          </div>
        );
      case 'Add Products':
        return (
          <div>
            <div className="flex justify-between items-center mb-4"> {/* Flex container for header and button */}
              <h3 className="text-2xl font-semibold text-blue-700">Add Products to Quotation</h3>
              {/* Import CSV */}
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-colors">
                Import CSV File
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Browse the product catalog and add cabinets, accessories, and other items to your current quotation.
              Specify quantities and any custom modifications required.
            </p>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Product Selector Area */}
              <div className="flex-1 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Product Catalog</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col">
                    <label htmlFor="productSeries" className="text-sm font-medium text-gray-700 mb-1">Product Series</label>
                    <select id="productSeries" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={selectedSeries} onChange={(e) => setSelectedSeries(e.target.value)}>
                      <option value="">All Series</option>
                      {productSeriesOptions.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="doorStyle" className="text-sm font-medium text-gray-700 mb-1">Door Style</label>
                    <select id="doorStyle" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)}>
                      <option value="">All Styles</option>
                      {doorStyleOptions.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="color" className="text-sm font-medium text-gray-700 mb-1">Color</label>
                    <select id="color" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                      <option value="">All Colors</option>
                      {colorOptions.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select id="category" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                      <option value="">All Categories</option>
                      {categoryOptions.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                </div>

                {/* Filtered Product List */}
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {filteredProducts.map(product => (
                        <li key={product.id} className="py-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600">${product.unitPrice.toFixed(2)}</p>
                          </div>
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded-lg transition-colors"
                            onClick={() => handleAddProductToQuotation(product)}
                          >
                            Add to Quotation
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No products match your filter criteria.</p>
                  )}
                </div>
              </div>

              {/* Quotation Content Section - Displays added products and totals */}
              <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Quotation Items</h4>
                <div className="overflow-x-auto mb-6 max-h-[300px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Product</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotationItems.length > 0 ? (
                        quotationItems.map(item => (
                          <tr key={item.id}>
                            <td className="px-4 py-3 whitespace-nowrap">{item.product}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{item.quantity}</td>
                            <td className="px-4 py-3 whitespace-nowrap">${item.unitPrice.toFixed(2)}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-4 py-4 text-center text-gray-500">No products added to quotation.</td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td colSpan="3" className="px-4 py-3 text-right font-semibold text-gray-700">Subtotal:</td>
                        <td className="px-4 py-3 font-bold text-gray-900 text-right">${subtotal.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Shipping, Charges, Discounts - Vertically aligned with total */}
                <div className="mt-8 flex justify-end">
                  <div className="w-full md:w-1/2 lg:w-2/3 space-y-4"> {/* Adjusted width for better alignment */}
                    <div className="flex justify-between items-center">
                      <label htmlFor="shippingRate" className="text-sm font-medium text-gray-700">Shipping Rates ($)</label>
                      <input
                        type="number"
                        id="shippingRate"
                        className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-32 text-right"
                        value={shippingRate}
                        onChange={(e) => setShippingRate(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label htmlFor="additionalCharges" className="text-sm font-medium text-gray-700">Add Charges ($)</label>
                      <input
                        type="number"
                        id="additionalCharges"
                        className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-32 text-right"
                        value={additionalCharges}
                        onChange={(e) => setAdditionalCharges(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label htmlFor="discount" className="text-sm font-medium text-gray-700">Discount ($)</label>
                      <input
                        type="number"
                        id="discount"
                        className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-32 text-right"
                        value={discount}
                        onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-colors w-full">
                      Recalculate Total
                    </button>
                    <div className="text-right pt-4 border-t border-gray-200 mt-4">
                      <p className="text-2xl font-bold text-blue-800">Grand Total: ${grandTotal.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Review & Approve':
        return (
          <div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Review & Approve Quotation</h3>
            <p className="text-gray-700 mb-6">
              Review the complete quotation details before taking final actions.
            </p>

            {/* Action Buttons for Review & Approve - MOVED TO TOP */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center mb-8">
              <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors">
                Save as Draft
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors">
                Generate PDF Quotation
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors">
                Approve Quotation
              </button>
            </div>

            {/* Quotation Summary */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200 mb-8">
              <h4 className="text-xl font-semibold text-blue-800 mb-3">Quotation Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <p><strong>Project Name:</strong> Smith Kitchen Renovation (Mock)</p>
                <p><strong>Contact Person:</strong> Jane Smith (Mock)</p>
                <p><strong>Expected Delivery:</strong> 2025-08-15 (Mock)</p>
                <p><strong>Total Items:</strong> {quotationItems.length}</p>
                <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
                <p><strong>Shipping:</strong> ${shippingRate.toFixed(2)}</p>
                <p><strong>Other Charges:</strong> ${additionalCharges.toFixed(2)}</p>
                <p><strong>Discount:</strong> ${discount.toFixed(2)}</p>
                <p className="col-span-full text-2xl font-bold text-blue-800 mt-4">Grand Total: ${grandTotal.toFixed(2)}</p>
              </div>
            </div>

            {/* Quotation Details (Product List for Review) */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Quotation Details</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Product</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotationItems.length > 0 ? (
                      quotationItems.map(item => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 whitespace-nowrap">{item.product}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{item.quantity}</td>
                          <td className="px-4 py-3 whitespace-nowrap">${item.unitPrice.toFixed(2)}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-4 py-4 text-center text-gray-500">No products added to quotation.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Existing Quotations':
        const existingQuotations = [
          { qNo: 'Q-2025-001', projectName: 'Brown Bathroom Remodel', draftDate: '2025-05-20', approvalDate: '2025-05-22', value: 8500.00, status: 'Approved' },
          { qNo: 'Q-2025-002', projectName: 'Miller Living Room Cabinets', draftDate: '2025-05-25', approvalDate: '-', value: 3200.00, status: 'Draft' },
          { qNo: 'Q-2025-003', projectName: 'Johnson Kitchen Refresh', draftDate: '2025-06-01', approvalDate: '2025-06-05', value: 11200.00, status: 'Ordered' },
          { qNo: 'Q-2025-004', projectName: 'Davis Office Storage', draftDate: '2025-06-10', approvalDate: '-', value: 4500.00, status: 'Pending Review' },
        ];
        return (
          <div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Existing Quotations</h3>
            <p className="text-gray-700 mb-6">
              View, manage, and track the status of all your submitted and draft quotations.
              You can search, filter, duplicate, or revise existing quotations.
            </p>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Quotation No.</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Draft Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quotation Value ($)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {existingQuotations.map((quote, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{quote.qNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{quote.projectName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{quote.draftDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{quote.approvalDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${quote.value.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          quote.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          quote.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                          quote.status === 'Ordered' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {quote.status}
                        </span>
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
      <h2 className="text-3xl font-extrabold text-blue-800 mb-6">Quotations</h2>
      <div className="space-y-4">
        {renderQuotationSubContent()}
      </div>
    </div>
  );
};

/**
 * Orders and Deliveries Content Component
 * Displays lists of all orders and deliveries in separate tabs.
 */
const OrdersAndDeliveriesContent = ({ activeSubTab, setActiveSubTab }) => {
  // Mock data for Order List
  const allOrders = [
    { orderId: '#EPOCH-001', clientName: 'Sarah Johnson', orderDate: '2024-06-15', status: 'Processing', total: 7500.00 },
    { orderId: '#EPOCH-002', clientName: 'Michael Green', orderDate: '2024-06-10', status: 'Shipped', total: 12100.00 },
    { orderId: '#EPOCH-003', clientName: 'Emily White', orderDate: '2025-06-20', status: 'Pending Shipment', total: 9500.00 },
  ];

  // Mock data for Deliveries
  const deliveries = [
    { project: 'Smith Kitchen Renovation', deliveryDate: '2025-07-01', estArrival: '2025-07-03', status: 'In Transit' },
    { project: 'Johnson Bathroom Update', deliveryDate: '2025-07-05', estArrival: '2025-07-07', status: 'Scheduled' },
    { project: 'Miller Living Space', deliveryDate: '2025-06-25', estArrival: '2025-06-27', status: 'Delivered' },
  ];

  const renderOrdersAndDeliveriesContent = () => {
    switch (activeSubTab) {
      case 'All Orders':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">All Orders</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{order.orderId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.clientName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.orderDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Shipped' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">${order.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Deliveries':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Deliveries</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Arrival</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((delivery, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{delivery.project}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{delivery.deliveryDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{delivery.estArrival}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          delivery.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                          delivery.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {delivery.status}
                        </span>
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
      {/* Orders & Deliveries Sub-tabs */}
      <div className="bg-blue-100 py-3 shadow-inner rounded-lg mb-6">
        <div className="flex space-x-4 justify-center">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
              activeSubTab === 'All Orders'
                ? 'bg-blue-700 text-white shadow-md'
                : 'text-blue-800 hover:bg-blue-200'
            }`}
            onClick={() => setActiveSubTab('All Orders')}
          >
            All Orders
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
              activeSubTab === 'Deliveries'
                ? 'bg-blue-700 text-white shadow-md'
                : 'text-blue-800 hover:bg-blue-200'
            }`}
            onClick={() => setActiveSubTab('Deliveries')}
          >
            Deliveries
          </button>
        </div>
      </div>
      {renderOrdersAndDeliveriesContent()}
    </div>
  );
};


const PaymentsContent = () => {
  const [pendingInvoices, setPendingInvoices] = useState([
    { id: 'INV-003', orderId: '#EPOCH-005', projectName: 'Smith Kitchen Renovation', dueDate: '2025-07-01', amount: 9500.00 },
    { id: 'INV-004', orderId: '#EPOCH-006', projectName: 'Johnson Bathroom Update', dueDate: '2025-07-15', amount: 6200.00 },
  ]);

  const [paymentHistory, setPaymentHistory] = useState([
    { invoiceId: 'INV-001', orderId: '#EPOCH-001', projectName: 'Brown Home Office', paymentDate: '2024-06-16', amount: 3750.00, status: 'Paid' },
    { invoiceId: 'INV-002', orderId: '#EPOCH-002', projectName: 'Miller Living Space', paymentDate: '2024-06-11', amount: 6050.00, status: 'Paid' },
  ]);

  const handleMakePayment = (invoiceId) => {
    // Simulate payment processing
    setPendingInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
    const paidInvoice = pendingInvoices.find(inv => inv.id === invoiceId);
    if (paidInvoice) {
      setPaymentHistory(prev => [...prev, {
        invoiceId: paidInvoice.id,
        orderId: paidInvoice.orderId,
        projectName: paidInvoice.projectName, // Include project name
        paymentDate: new Date().toISOString().slice(0, 10), // Current date
        amount: paidInvoice.amount,
        status: 'Paid'
      }]);
    }
    // Using a custom message box instead of alert()
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50';
    messageBox.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <p class="text-xl font-semibold mb-4">Payment Initiated!</p>
        <p class="text-gray-700">Payment for Invoice ID: ${invoiceId} has been simulated.</p>
        <button id="closeMessageBox" class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">OK</button>
      </div>
    `;
    document.body.appendChild(messageBox);
    document.getElementById('closeMessageBox').onclick = () => {
      document.body.removeChild(messageBox);
    };
  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-blue-800 mb-6">Payments</h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        View your payment history, manage invoices, and make payments for your EPOCH Cabinetry orders.
        All transactions are securely processed.
      </p>

      {/* Pending Invoices Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-red-700 mb-4">Pending Invoices</h3>
        {pendingInvoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Invoice ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount ($)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{invoice.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{invoice.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{invoice.projectName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{invoice.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${invoice.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors"
                        onClick={() => handleMakePayment(invoice.id)}
                      >
                        Make Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No pending invoices at this time.</p>
        )}
      </div>

      {/* Payment History Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">Payment History</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Invoice ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.length > 0 ? (
              paymentHistory.map((payment, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.invoiceId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.orderId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.paymentDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${payment.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">No payment history available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserSettingsContent = ({ activeSubMenu }) => {
  // Mock data for User Management
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', role: 'Sales User', status: 'Active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Viewer', status: 'Inactive' },
  ]);

  // Mock data for Notifications
  const [notificationSettings, setNotificationSettings] = useState({
    newOrders: true,
    quotationUpdates: true,
    announcements: false,
    deliveryAlerts: true,
    marketingEmails: false,
  });

  const handleNotificationChange = (e) => {
    setNotificationSettings({
      ...notificationSettings,
      [e.target.name]: e.target.checked,
    });
  };

  const renderUserSettingsSubContent = () => {
    switch (activeSubMenu) {
      case 'Dealer Profile':
        return (
          <div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Dealer Profile</h3>
            <p className="text-gray-700 mb-6">
              Manage your company's profile information, including contact details, billing address, and business hours.
              Ensure your information is up-to-date for seamless communication and operations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-purple-50 rounded-lg p-6 border border-purple-200">
              <div className="flex flex-col">
                <label htmlFor="companyName" className="text-sm font-medium text-gray-700 mb-1">Company Name</label>
                {/* Added onChange handler */}
                <input type="text" id="companyName" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="EPOCH Cabinetry Dealer Inc." onChange={() => {}} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dealerId" className="text-sm font-medium text-gray-700 mb-1">Dealer ID</label>
                {/* Added readOnly explicitly */}
                <input type="text" id="dealerId" className="p-2 border border-gray-300 rounded-lg bg-gray-100" value="DEP-00789" readOnly />
              </div>
              <div className="flex flex-col">
                <label htmlFor="contactEmail" className="text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                {/* Added onChange handler */}
                <input type="email" id="contactEmail" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="contact@yourdealer.com" onChange={() => {}} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                {/* Added onChange handler */}
                <input type="tel" id="phoneNumber" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="+1 (555) 123-4567" onChange={() => {}} />
              </div>
              <div className="flex flex-col col-span-full">
                <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1">Address</label>
                {/* Added onChange handler */}
                <input type="text" id="address" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="123 Dealer Main St, Suite 100" onChange={() => {}} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1">City</label>
                {/* Added onChange handler */}
                <input type="text" id="city" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Anytown" onChange={() => {}} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="state" className="text-sm font-medium text-gray-700 mb-1">State/Province</label>
                {/* Added onChange handler */}
                <input type="text" id="state" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="CA" onChange={() => {}} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="zipCode" className="text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
                {/* Added onChange handler */}
                <input type="text" id="zipCode" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="90210" onChange={() => {}} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="country" className="text-sm font-medium text-gray-700 mb-1">Country</label>
                {/* Added onChange handler */}
                <input type="text" id="country" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value="United States" onChange={() => {}} />
              </div>
              <div className="flex flex-col col-span-full">
                <label htmlFor="businessHours" className="text-sm font-medium text-gray-700 mb-1">Business Hours</label>
                {/* Added onChange handler */}
                <textarea id="businessHours" rows="2" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Mon-Fri: 9:00 AM - 5:00 PM" onChange={() => {}}></textarea>
              </div>
            </div>
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-colors">
              Update Profile
            </button>
          </div>
        );
      case 'User Management':
        return (
          <div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">User Management</h3>
            <p className="text-gray-700 mb-6">
              Add, edit, or remove users from your dealer account. Assign roles and permissions to control access
              to different sections of the portal.
            </p>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-end mb-4">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
                  Add New User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Fixed whitespace issue in mapping */}
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Notifications':
        return (
          <div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Notifications</h3>
            <p className="text-gray-700 mb-6">
              Configure your notification preferences. Choose how you want to receive alerts for new orders,
              quotation updates, important announcements, and more.
            </p>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newOrders"
                    name="newOrders"
                    checked={notificationSettings.newOrders}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="newOrders" className="ml-3 text-gray-700">Email me about new orders</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="quotationUpdates"
                    name="quotationUpdates"
                    checked={notificationSettings.quotationUpdates}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="quotationUpdates" className="ml-3 text-gray-700">Email me about quotation updates (e.g., approval, rejection)</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="announcements"
                    name="announcements"
                    checked={notificationSettings.announcements}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="announcements" className="ml-3 text-gray-700">Email me about system announcements and important news</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="deliveryAlerts"
                    name="deliveryAlerts"
                    checked={notificationSettings.deliveryAlerts}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="deliveryAlerts" className="ml-3 text-gray-700">Email me about upcoming deliveries</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="marketingEmails"
                    name="marketingEmails"
                    checked={notificationSettings.marketingEmails}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="marketingEmails" className="ml-3 text-gray-700">Receive marketing and promotional emails</label>
                </div>
              </div>
              <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-colors">
                Save Notification Preferences
              </button>
            </div>
          </div>
        );
      case 'Security':
        return (
          <div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Security Settings</h3>
            <p className="text-gray-700 mb-6">
              Enhance the security of your account. Change your password, enable two-factor authentication,
              and review your recent login activity.
            </p>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 space-y-8">
              {/* Change Password */}
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Change Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="currentPassword" className="text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input type="password" id="currentPassword" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="newPassword" className="text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input type="password" id="newPassword" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input type="password" id="confirmPassword" className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                </div>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-colors">
                  Update Password
                </button>
              </div>

              {/* Two-Factor Authentication */}
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Two-Factor Authentication (2FA)</h4>
                <p className="text-gray-700 mb-4">Add an extra layer of security to your account.</p>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-medium text-gray-800">2FA Status: <span className="text-red-600 font-bold">Disabled</span></span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>

              {/* Recent Login Activity */}
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Recent Login Activity</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device/Browser</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Using static data for demo, these should be dynamically populated in a real app */}
                      {users.map((user, index) => ( // Use index for a stable key here
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">2025-06-21 14:30</td>
                          <td className="px-6 py-4 whitespace-nowrap">192.168.1.10</td>
                          <td className="px-6 py-4 whitespace-nowrap">Ho Chi Minh City, Vietnam</td>
                          <td className="px-6 py-4 whitespace-nowrap">Chrome on Windows</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-blue-800 mb-6">Settings</h2> {/* Updated heading */}
      <div className="space-y-4">
        {renderUserSettingsSubContent()}
      </div>
    </div>
  );
};

const ReturnsWarrantiesContent = () => {
  // State to manage the active sub-tab for Returns & Warranties
  const [activeRnWSubTab, setActiveRnWSubTab] = useState('Returns History');

  // Mock data for Return Requests
  const [returnRequests, setReturnRequests] = useState([
    { id: 'RTN-001', date: '2025-05-10', product: 'Defective Base Cabinet (Prod-001)', reason: 'Damaged in transit', status: 'Pending Review', resolution: 'N/A' },
    { id: 'RTN-002', date: '2025-05-15', product: 'Incorrect Wall Cabinet (Prod-002)', reason: 'Wrong item shipped', status: 'Approved', resolution: 'Replacement Shipped' },
    { id: 'RTN-003', date: '2025-06-01', product: 'Scratched Tall Cabinet (Prod-003)', reason: 'Customer damage', status: 'Rejected', resolution: 'Repair options provided' },
  ]);

  // Mock data for Warranty Claims
  const [warrantyClaims, setWarrantyClaims] = useState([
    { id: 'WTY-001', date: '2025-04-20', product: 'Cabinet Door Hinge (Prod-005)', issue: 'Loose hinge, squeaking', status: 'Under Investigation', resolution: 'N/A' },
    { id: 'WTY-002', date: '2025-05-05', product: 'Cabinet Finish (Prod-008)', issue: 'Fading color', status: 'Approved', resolution: 'Refinishing service scheduled' },
    { id: 'WTY-003', date: '2025-06-12', product: 'Drawer Glides (Prod-004)', issue: 'Sticking drawer', status: 'Closed', resolution: 'Replacement parts sent' },
  ]);

  const renderRnWContent = () => {
    switch (activeRnWSubTab) {
      case 'Returns History':
        return (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 w-full">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Return Requests History</h3>
            {returnRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Request ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Resolution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {returnRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{request.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.reason}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            request.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                            request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.resolution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No return requests found.</p>
            )}
          </div>
        );
      case 'Warranties History':
        return (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 w-full">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Warranty Claims History</h3>
            {warrantyClaims.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Claim ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Resolution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warrantyClaims.map((claim) => (
                      <tr key={claim.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{claim.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{claim.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{claim.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{claim.issue}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            claim.status === 'Under Investigation' ? 'bg-yellow-100 text-yellow-800' :
                            claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800' // Using blue for 'Closed'
                          }`}>
                            {claim.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{claim.resolution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No warranty claims found.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-blue-800 mb-6">Returns & Warranties</h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        Initiate product returns and manage warranty claims for EPOCH Cabinetry products.
        Access our comprehensive return policy and warranty guidelines here.
      </p>

      {/* Submit Request Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 rounded-lg p-6 shadow-md border border-red-200">
          <h3 className="text-xl font-semibold text-red-700 mb-2">Submit a Return Request</h3>
          <p className="text-sm text-gray-600">
            Fill out the return request form for damaged or incorrect items.
          </p>
          <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Start Return
          </button>
        </div>
        <div className="bg-orange-50 rounded-lg p-6 shadow-md border border-orange-200">
          <h3 className="text-xl font-semibold text-orange-700 mb-2">Submit a Warranty Claim</h3>
          <p className="text-sm text-gray-600">
            File a claim for product defects covered under warranty.
          </p>
          <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Start Claim
          </button>
        </div>
      </div>

      {/* Returns & Warranties History Tabs */}
      <div className="bg-blue-100 py-3 shadow-inner rounded-lg mb-6">
        <div className="flex space-x-4 justify-center">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
              activeRnWSubTab === 'Returns History'
                ? 'bg-blue-700 text-white shadow-md'
                : 'text-blue-800 hover:bg-blue-200'
            }`}
            onClick={() => setActiveRnWSubTab('Returns History')}
          >
            Returns History
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out ${
              activeRnWSubTab === 'Warranties History'
                ? 'bg-blue-700 text-white shadow-md'
                : 'text-blue-800 hover:bg-blue-200'
            }`}
            onClick={() => setActiveRnWSubTab('Warranties History')}
          >
            Warranties History
          </button>
        </div>
      </div>

      {/* Conditional rendering of content based on active sub-tab */}
      {renderRnWContent()}
    </div>
  );
};

/**
 * Documents & Resources Content Component
 * Organizes various documents into categories.
 */
const DocumentsResourcesContent = () => (
  <div>
    <h2 className="text-3xl font-extrabold text-blue-800 mb-6">Documents & Resources</h2>
    <p className="text-gray-700 leading-relaxed mb-8">
      Find all essential documents, marketing materials, technical specifications, and training resources
      to support your sales and installation processes.
    </p>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <div className="bg-teal-50 rounded-lg p-6 shadow-md border border-teal-200">
        <h3 className="text-xl font-semibold text-teal-700 mb-2">Product Documentation</h3>
        <p className="text-sm text-gray-600">Access installation guides, technical specifications, and product manuals.</p>
        <button className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          View Documentation
        </button>
      </div>
      <div className="bg-lime-50 rounded-lg p-6 shadow-md border border-lime-200">
        <h3 className="text-xl font-semibold text-lime-700 mb-2">Training Resources</h3>
        <p className="text-sm text-gray-600">Improve your product knowledge and sales techniques with our training modules and webinars.</p>
        <button className="mt-4 bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Access Training
        </button>
      </div>
      <div className="bg-cyan-50 rounded-lg p-6 shadow-md border border-cyan-200">
        <h3 className="text-xl font-semibold text-cyan-700 mb-2">Marketing Materials</h3>
        <p className="text-sm text-gray-600">Download high-resolution images, brochures, videos, and other promotional assets.</p>
        <button className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Download Assets
        </button>
      </div>
      <div className="bg-purple-50 rounded-lg p-6 shadow-md border border-purple-200">
        <h3 className="text-xl font-semibold text-purple-700 mb-2">Company Policies & Legal</h3>
        <p className="text-sm text-gray-600">Review dealer agreements, privacy policies, terms of service, and other legal documents.</p>
        <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          View Policies
        </button>
      </div>
    </div>
  </div>
);

// This is the default export for the React app.
export default App;
