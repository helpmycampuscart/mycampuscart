
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { ProductGrid } from "@/components/marketplace/ProductGrid";
import { useProducts } from "@/hooks/useProducts";

export const Marketplace = () => {
  const navigate = useNavigate();
  const { products, loading, fetchProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  useEffect(() => {
    fetchProducts({
      category: selectedCategory,
      location: selectedLocation,
      searchTerm: searchTerm
    });
  }, [searchTerm, selectedCategory, selectedLocation]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLocation("all");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="max-w-7xl mx-auto p-6">
          <MarketplaceHeader onBackClick={() => navigate('/dashboard')} />
          
          <MarketplaceFilters
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedLocation={selectedLocation}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onLocationChange={setSelectedLocation}
          />

          <div className="mb-6">
            <p className="text-muted-foreground">
              {loading ? 'Loading...' : `${products.length} ${products.length === 1 ? 'item' : 'items'} found`}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <ProductGrid 
              products={products}
              onClearFilters={handleClearFilters}
            />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};
