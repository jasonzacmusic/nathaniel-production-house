import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth, authApiRequest } from "@/hooks/useAuth";
import { queryClient } from "@/lib/queryClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MARKETPLACE_CATEGORIES, LISTING_CONDITIONS, INDIAN_CITIES } from "@shared/schema";
import { Plus, Edit, Trash2, CheckCircle, Loader2, Save, Package } from "lucide-react";

interface Listing {
  id: string;
  title: string;
  category: string;
  condition: string;
  price: number;
  description: string | null;
  imageUrls: string | null;
  city: string;
  status: string;
  viewCount: number | null;
  createdAt: string;
  updatedAt: string;
}

export default function MyAccount() {
  const { user, isLoading: authLoading, logout, updateProfile } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("listings");

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    displayName: "",
    phone: "",
    city: "",
    bio: "",
  });

  // Sell gear form state
  const [sellForm, setSellForm] = useState({
    title: "",
    category: "",
    condition: "",
    price: "",
    description: "",
    imageUrls: "",
    city: "",
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        displayName: user.displayName || "",
        phone: user.phone || "",
        city: user.city || "",
        bio: user.bio || "",
      });
      if (!sellForm.city) {
        setSellForm((prev) => ({ ...prev, city: user.city || "" }));
      }
    }
  }, [user]);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/auth");
    }
  }, [authLoading, user, setLocation]);

  // Fetch my listings
  const {
    data: listings = [],
    isLoading: listingsLoading,
  } = useQuery<Listing[]>({
    queryKey: ["marketplace-my-listings"],
    queryFn: async () => {
      const res = await authApiRequest("GET", "/api/marketplace-my-listings");
      if (!res.ok) throw new Error("Failed to fetch listings");
      return res.json();
    },
    enabled: !!user,
  });

  // Mark as sold mutation
  const markSoldMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await authApiRequest("PATCH", `/api/marketplace/${id}/sold`);
      if (!res.ok) throw new Error("Failed to mark as sold");
    },
    onSuccess: () => {
      toast({ title: "Listing marked as sold" });
      queryClient.invalidateQueries({ queryKey: ["marketplace-my-listings"] });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // Delete listing mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await authApiRequest("DELETE", `/api/marketplace/${id}`);
      if (!res.ok) throw new Error("Failed to delete listing");
    },
    onSuccess: () => {
      toast({ title: "Listing deleted" });
      queryClient.invalidateQueries({ queryKey: ["marketplace-my-listings"] });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // Create listing mutation
  const createMutation = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await authApiRequest("POST", "/api/marketplace", data);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create listing");
      }
    },
    onSuccess: () => {
      toast({ title: "Listing created!", description: "It will be reviewed before going live." });
      queryClient.invalidateQueries({ queryKey: ["marketplace-my-listings"] });
      setSellForm({
        title: "",
        category: "",
        condition: "",
        price: "",
        description: "",
        imageUrls: "",
        city: user?.city || "",
      });
      setActiveTab("listings");
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // Profile update mutation
  const profileMutation = useMutation({
    mutationFn: async (data: { displayName?: string; phone?: string; city?: string; bio?: string }) => {
      await updateProfile(data);
    },
    onSuccess: () => {
      toast({ title: "Profile updated" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  function handleCreateListing(e: React.FormEvent) {
    e.preventDefault();
    const urls = sellForm.imageUrls
      .split(",")
      .map((u) => u.trim())
      .filter(Boolean);
    createMutation.mutate({
      title: sellForm.title,
      category: sellForm.category,
      condition: sellForm.condition,
      price: Number(sellForm.price),
      description: sellForm.description || undefined,
      imageUrls: JSON.stringify(urls),
      city: sellForm.city,
    });
  }

  function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    profileMutation.mutate({
      displayName: profileForm.displayName,
      phone: profileForm.phone,
      city: profileForm.city,
      bio: profileForm.bio || undefined,
    });
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Pending</Badge>;
      case "sold":
        return <Badge variant="secondary">Sold</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "removed":
        return <Badge variant="destructive">Removed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="sell">Sell Gear</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Tab 1: My Listings */}
          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  My Listings
                </CardTitle>
                <CardDescription>Manage your gear listings</CardDescription>
              </CardHeader>
              <CardContent>
                {listingsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : listings.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">No listings yet.</p>
                    <p className="text-sm">Create your first listing!</p>
                    <Button
                      className="mt-4"
                      onClick={() => setActiveTab("sell")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Listing
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {listings.map((listing) => (
                      <div
                        key={listing.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-border rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium truncate">{listing.title}</h3>
                            {getStatusBadge(listing.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Rs. {listing.price.toLocaleString("en-IN")} &middot;{" "}
                            {new Date(listing.createdAt).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {listing.status === "active" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => markSoldMutation.mutate(listing.id)}
                                disabled={markSoldMutation.isPending}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark Sold
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </>
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteMutation.mutate(listing.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Sell Gear */}
          <TabsContent value="sell">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Sell Your Gear
                </CardTitle>
                <CardDescription>
                  List your musical instruments and gear for sale. Listings are reviewed before going live.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateListing} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g. Yamaha PSR-E473 Keyboard"
                      value={sellForm.title}
                      onChange={(e) => setSellForm({ ...sellForm, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={sellForm.category}
                        onValueChange={(v) => setSellForm({ ...sellForm, category: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {MARKETPLACE_CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="condition">Condition</Label>
                      <Select
                        value={sellForm.condition}
                        onValueChange={(v) => setSellForm({ ...sellForm, condition: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {LISTING_CONDITIONS.map((cond) => (
                            <SelectItem key={cond.value} value={cond.value}>
                              {cond.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price (Rs.)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="e.g. 15000"
                        value={sellForm.price}
                        onChange={(e) => setSellForm({ ...sellForm, price: e.target.value })}
                        required
                        min={1}
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">City</Label>
                      <Select
                        value={sellForm.city}
                        onValueChange={(v) => setSellForm({ ...sellForm, city: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDIAN_CITIES.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your gear, include any details about usage, accessories included, etc."
                      value={sellForm.description}
                      onChange={(e) => setSellForm({ ...sellForm, description: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="imageUrls">Image URLs (comma-separated)</Label>
                    <Input
                      id="imageUrls"
                      placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                      value={sellForm.imageUrls}
                      onChange={(e) => setSellForm({ ...sellForm, imageUrls: e.target.value })}
                    />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Listings are reviewed before going live. You will be notified once approved.
                  </p>

                  <Button
                    type="submit"
                    disabled={createMutation.isPending || !sellForm.title || !sellForm.category || !sellForm.condition || !sellForm.price || !sellForm.city}
                  >
                    {createMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4 mr-2" />
                    )}
                    Create Listing
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Profile */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Member since {new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user.email} disabled />
                  </div>

                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={profileForm.displayName}
                      onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="profileCity">City</Label>
                    <Select
                      value={profileForm.city}
                      onValueChange={(v) => setProfileForm({ ...profileForm, city: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIAN_CITIES.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      placeholder="Tell others about yourself and your music"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Button type="submit" disabled={profileMutation.isPending}>
                      {profileMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save Profile
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        logout();
                        setLocation("/");
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
