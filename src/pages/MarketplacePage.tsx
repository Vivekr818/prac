import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  Rating,
  Badge,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  FavoriteOutlined as FavoriteIcon,
  ShoppingCart as CartIcon,
  Eco as EcoIcon,
  LocalShipping as ShippingIcon,
  Verified as VerifiedIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Store as StoreIcon,
} from '@mui/icons-material';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  seller: string;
  rating: number;
  reviews: number;
  ecoScore: number;
  badges: string[];
  inStock: boolean;
  carbonNeutral: boolean;
  recycled: boolean;
}

const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Bamboo Fiber Water Bottle',
    description: 'Eco-friendly water bottle made from sustainable bamboo fiber. BPA-free and biodegradable.',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
    category: 'Drinkware',
    seller: 'EcoLife Store',
    rating: 4.8,
    reviews: 156,
    ecoScore: 95,
    badges: ['Carbon Neutral', 'Biodegradable'],
    inStock: true,
    carbonNeutral: true,
    recycled: false,
  },
  {
    id: '2',
    name: 'Solar Power Bank 20000mAh',
    description: 'Portable solar charger with high-capacity battery. Perfect for outdoor adventures and emergency backup.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop',
    category: 'Electronics',
    seller: 'GreenTech Solutions',
    rating: 4.6,
    reviews: 89,
    ecoScore: 88,
    badges: ['Solar Powered', 'Energy Efficient'],
    inStock: true,
    carbonNeutral: true,
    recycled: false,
  },
  {
    id: '3',
    name: 'Organic Cotton Tote Bag Set',
    description: 'Set of 3 reusable shopping bags made from 100% organic cotton. Machine washable and durable.',
    price: 19.99,
    originalPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
    category: 'Bags',
    seller: 'Sustainable Living Co',
    rating: 4.9,
    reviews: 234,
    ecoScore: 92,
    badges: ['Organic', 'Reusable'],
    inStock: true,
    carbonNeutral: false,
    recycled: false,
  },
  {
    id: '4',
    name: 'Recycled Plastic Outdoor Chair',
    description: 'Comfortable outdoor chair made from 100% recycled ocean plastic. Weather-resistant and stylish.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
    category: 'Furniture',
    seller: 'Ocean Rescue Furniture',
    rating: 4.7,
    reviews: 67,
    ecoScore: 90,
    badges: ['Ocean Plastic', 'Recycled'],
    inStock: true,
    carbonNeutral: true,
    recycled: true,
  },
  {
    id: '5',
    name: 'LED Plant Growing Light',
    description: 'Energy-efficient LED grow light for indoor plants. Full spectrum lighting with timer function.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop',
    category: 'Gardening',
    seller: 'Urban Garden Supply',
    rating: 4.5,
    reviews: 123,
    ecoScore: 85,
    badges: ['Energy Efficient', 'Indoor Growing'],
    inStock: true,
    carbonNeutral: false,
    recycled: false,
  },
  {
    id: '6',
    name: 'Compost Bin with Tumbler',
    description: 'Dual-chamber composting tumbler for efficient organic waste processing. Easy to use and maintain.',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop',
    category: 'Gardening',
    seller: 'CompostMaster',
    rating: 4.8,
    reviews: 45,
    ecoScore: 98,
    badges: ['Waste Reduction', 'Organic'],
    inStock: true,
    carbonNeutral: true,
    recycled: false,
  },
  {
    id: '7',
    name: 'Beeswax Food Wraps Set',
    description: 'Reusable food wraps made from organic cotton and natural beeswax. Plastic-free food storage solution.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop',
    category: 'Kitchen',
    seller: 'Zero Waste Kitchen',
    rating: 4.9,
    reviews: 189,
    ecoScore: 94,
    badges: ['Plastic-Free', 'Natural'],
    inStock: true,
    carbonNeutral: false,
    recycled: false,
  },
  {
    id: '8',
    name: 'Electric Bike Conversion Kit',
    description: 'Convert your regular bike to electric with this easy-to-install kit. Reduce carbon footprint while commuting.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300&h=300&fit=crop',
    category: 'Transportation',
    seller: 'EcoBike Tech',
    rating: 4.4,
    reviews: 78,
    ecoScore: 87,
    badges: ['Carbon Reduction', 'Electric'],
    inStock: false,
    carbonNeutral: true,
    recycled: false,
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export const MarketplacePage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Add error handling
  try {

  const categories = ['All', 'Drinkware', 'Electronics', 'Bags', 'Furniture', 'Gardening', 'Kitchen', 'Transportation'];

  const filteredProducts = demoProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = tabValue === 0 || product.category === categories[tabValue];
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (productId: string) => {
    setCartItems(prev => [...prev, productId]);
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getEcoScoreColor = (score: number) => {
    if (score >= 90) return '#4CAF50';
    if (score >= 80) return '#8BC34A';
    if (score >= 70) return '#FFC107';
    return '#FF9800';
  };

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: '#2c3e50', mb: 2 }}>
            🛒 Eco Marketplace
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Discover sustainable products that make a difference for our planet
          </Typography>
          
          {/* Search Bar */}
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Search eco-friendly products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3 }
              }}
            />
          </Box>
        </Box>

        {/* Category Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={(_, newValue) => setTabValue(newValue)} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
              }
            }}
          >
            {categories.map((category, index) => (
              <Tab key={category} label={category} />
            ))}
          </Tabs>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  },
                }}
              >
                {/* Product Image */}
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setSelectedProduct(product)}
                  />
                  
                  {/* Badges */}
                  <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {product.originalPrice && (
                      <Chip label="SALE" size="small" sx={{ backgroundColor: '#f44336', color: 'white', fontWeight: 600 }} />
                    )}
                    {!product.inStock && (
                      <Chip label="OUT OF STOCK" size="small" sx={{ backgroundColor: '#757575', color: 'white' }} />
                    )}
                  </Box>

                  {/* Favorite Button */}
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      '&:hover': { backgroundColor: 'white' },
                    }}
                    onClick={() => handleToggleFavorite(product.id)}
                  >
                    <FavoriteIcon sx={{ color: favorites.includes(product.id) ? '#f44336' : '#ccc' }} />
                  </IconButton>

                  {/* Eco Score */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      backgroundColor: getEcoScoreColor(product.ecoScore),
                      color: 'white',
                      borderRadius: '50%',
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                    }}
                  >
                    {product.ecoScore}
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Product Name */}
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1, fontSize: '1rem' }}>
                    {product.name}
                  </Typography>

                  {/* Seller */}
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                    by {product.seller}
                  </Typography>

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {product.description.substring(0, 80)}...
                  </Typography>

                  {/* Rating */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={product.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="caption" sx={{ ml: 1 }}>
                      ({product.reviews})
                    </Typography>
                  </Box>

                  {/* Eco Badges */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {product.badges.slice(0, 2).map((badge) => (
                      <Chip
                        key={badge}
                        label={badge}
                        size="small"
                        icon={<EcoIcon />}
                        sx={{
                          backgroundColor: '#e8f5e8',
                          color: '#2e7d32',
                          fontSize: '0.7rem',
                        }}
                      />
                    ))}
                  </Box>

                  {/* Price */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                        ${product.price}
                      </Typography>
                      {product.originalPrice && (
                        <Typography variant="caption" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                          ${product.originalPrice}
                        </Typography>
                      )}
                    </Box>
                    {product.carbonNeutral && <EcoIcon sx={{ color: '#4CAF50' }} />}
                  </Box>

                  {/* Add to Cart Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={!product.inStock}
                    onClick={() => handleAddToCart(product.id)}
                    sx={{
                      backgroundColor: '#4CAF50',
                      '&:hover': { backgroundColor: '#45a049' },
                      '&:disabled': { backgroundColor: '#e0e0e0' },
                    }}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <EcoIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No products found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or browse different categories
            </Typography>
          </Box>
        )}

        {/* Floating Cart Button */}
        <Badge badgeContent={cartItems.length} color="error">
          <Fab
            color="primary"
            aria-label="shopping cart"
            sx={{
              position: 'fixed',
              bottom: { xs: 90, md: 20 },
              right: 20,
              backgroundColor: '#4CAF50',
              '&:hover': { backgroundColor: '#45a049' },
            }}
          >
            <CartIcon />
          </Fab>
        </Badge>

        {/* Sell Products FAB */}
        <Fab
          color="secondary"
          aria-label="sell products"
          sx={{
            position: 'fixed',
            bottom: { xs: 160, md: 90 },
            right: 20,
            backgroundColor: '#2196f3',
            '&:hover': { backgroundColor: '#1976d2' },
          }}
        >
          <StoreIcon />
        </Fab>

        {/* Product Detail Dialog */}
        <Dialog
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          maxWidth="md"
          fullWidth
        >
          {selectedProduct && (
            <>
              <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{selectedProduct.name}</Typography>
                <IconButton onClick={() => setSelectedProduct(null)}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      style={{ width: '100%', borderRadius: 8 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {selectedProduct.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating value={selectedProduct.rating} precision={0.1} readOnly />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({selectedProduct.reviews} reviews)
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                        ${selectedProduct.price}
                      </Typography>
                      {selectedProduct.originalPrice && (
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                          ${selectedProduct.originalPrice}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {selectedProduct.badges.map((badge) => (
                        <Chip
                          key={badge}
                          label={badge}
                          icon={<VerifiedIcon />}
                          sx={{ backgroundColor: '#e8f5e8', color: '#2e7d32' }}
                        />
                      ))}
                    </Box>

                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={!selectedProduct.inStock}
                      onClick={() => {
                        handleAddToCart(selectedProduct.id);
                        setSelectedProduct(null);
                      }}
                      sx={{
                        backgroundColor: '#4CAF50',
                        '&:hover': { backgroundColor: '#45a049' },
                      }}
                    >
                      {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
  } catch (error) {
    console.error('MarketplacePage error:', error);
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">Marketplace Loading...</Typography>
        <Typography variant="body2" color="text.secondary">
          Please refresh the page if this persists.
        </Typography>
      </Box>
    );
  }
};