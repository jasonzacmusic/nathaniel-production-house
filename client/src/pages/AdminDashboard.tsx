import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import {
  Music, LogOut, Plus, Trash2, Save, Piano, Guitar, Package,
  Users, MessageSquare, Settings, ExternalLink, Edit, Loader2,
  Eye, EyeOff, Link, Copy, Share2, FileText, Globe, Check, X, Video
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type { InstrumentRecommendation, GearListing, AffiliatePartner, ContactMessage, ShareableLink } from "@shared/schema";
import { getAllPages, updatePageVisibility } from "@/config/siteConfig";

const SITE_DOMAIN = "https://studio.nathanielschool.com";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function adminApiRequest(method: string, url: string, data?: unknown) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders()
    }
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  const response = await fetch(url, options);
  if (response.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
    throw new Error("Unauthorized");
  }
  return response;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("instruments");
  const [isVerifying, setIsVerifying] = useState(true);
  
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setLocation("/admin");
        return;
      }
      
      try {
        const response = await fetch("/api/admin/verify", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) {
          localStorage.removeItem("adminToken");
          setLocation("/admin");
        }
      } catch {
        localStorage.removeItem("adminToken");
        setLocation("/admin");
      } finally {
        setIsVerifying(false);
      }
    };
    
    verifyToken();
  }, [setLocation]);
  
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleLogout = async () => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    localStorage.removeItem("adminToken");
    toast({ title: "Logged out", description: "See you next time!" });
    setLocation("/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">NPH Admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="button-logout">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="instruments" className="flex items-center gap-2">
              <Piano className="w-4 h-4" />
              <span className="hidden sm:inline">Instruments</span>
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Marketplace</span>
            </TabsTrigger>
            <TabsTrigger value="partners" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Partners</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Pages</span>
            </TabsTrigger>
            <TabsTrigger value="share-links" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share Links</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="instruments">
            <InstrumentsManager />
          </TabsContent>
          <TabsContent value="marketplace">
            <MarketplaceManager />
          </TabsContent>
          <TabsContent value="partners">
            <PartnersManager />
          </TabsContent>
          <TabsContent value="messages">
            <MessagesViewer />
          </TabsContent>
          <TabsContent value="pages">
            <PageVisibilityManager />
          </TabsContent>
          <TabsContent value="share-links">
            <ShareLinksManager />
          </TabsContent>
          <TabsContent value="settings">
            <SettingsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function InstrumentsManager() {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Record<string, string>>({});
  const [newItem, setNewItem] = useState({
    category: "piano",
    name: "",
    model: "",
    priceRange: "",
    amazonLink: "",
    bajaaoLink: "",
    description: "",
    features: "",
    recommendation: "budget",
    displayOrder: 0
  });

  const { data: instruments, isLoading } = useQuery<InstrumentRecommendation[]>({
    queryKey: ["/api/instruments/recommendations"]
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof newItem) => adminApiRequest("POST", "/api/instruments/recommendations", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/instruments/recommendations"] });
      toast({ title: "Success", description: "Instrument added successfully" });
      setNewItem({ category: "piano", name: "", model: "", priceRange: "", amazonLink: "", bajaaoLink: "", description: "", features: "", recommendation: "budget", displayOrder: 0 });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, string> }) =>
      adminApiRequest("PATCH", `/api/instruments/recommendations/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/instruments/recommendations"] });
      toast({ title: "Updated", description: "Instrument updated" });
      setEditingId(null);
      setEditData({});
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApiRequest("DELETE", `/api/instruments/recommendations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/instruments/recommendations"] });
      toast({ title: "Deleted", description: "Instrument removed" });
    }
  });

  const startEdit = (item: InstrumentRecommendation) => {
    setEditingId(item.id);
    setEditData({
      name: item.name || "",
      model: item.model || "",
      priceRange: item.priceRange || "",
      amazonLink: item.amazonLink || "",
      bajaaoLink: item.bajaaoLink || "",
      description: item.description || "",
      recommendation: item.recommendation || "budget",
      category: item.category || "piano",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Instrument Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label>Category</Label>
              <Select value={newItem.category} onValueChange={(v) => setNewItem({ ...newItem, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="piano">Piano & Keys</SelectItem>
                  <SelectItem value="guitar">Guitar</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Name</Label>
              <Input value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} placeholder="Brand Name" />
            </div>
            <div>
              <Label>Model</Label>
              <Input value={newItem.model} onChange={(e) => setNewItem({ ...newItem, model: e.target.value })} placeholder="Model Number" />
            </div>
            <div>
              <Label>Price Range</Label>
              <Input value={newItem.priceRange} onChange={(e) => setNewItem({ ...newItem, priceRange: e.target.value })} placeholder="₹10,000 - ₹15,000" />
            </div>
            <div>
              <Label>Amazon Link</Label>
              <Input value={newItem.amazonLink} onChange={(e) => setNewItem({ ...newItem, amazonLink: e.target.value })} placeholder="https://amazon.in/..." />
            </div>
            <div>
              <Label>Bajaao Link</Label>
              <Input value={newItem.bajaaoLink} onChange={(e) => setNewItem({ ...newItem, bajaaoLink: e.target.value })} placeholder="https://bajaao.com/..." />
            </div>
            <div>
              <Label>Level</Label>
              <Select value={newItem.recommendation} onValueChange={(v) => setNewItem({ ...newItem, recommendation: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} placeholder="Why we recommend this..." rows={2} />
            </div>
          </div>
          <Button className="mt-4" onClick={() => createMutation.mutate(newItem)} disabled={createMutation.isPending}>
            <Plus className="w-4 h-4 mr-2" />
            Add Instrument
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Recommendations</CardTitle>
          <CardDescription>Click the edit icon to modify, or delete</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : instruments && instruments.length > 0 ? (
            <div className="space-y-2">
              {instruments.map((item) => (
                <div key={item.id} className="border rounded-md">
                  {editingId === item.id ? (
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label className="text-xs">Name</Label>
                          <Input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                        </div>
                        <div>
                          <Label className="text-xs">Model</Label>
                          <Input value={editData.model} onChange={(e) => setEditData({ ...editData, model: e.target.value })} />
                        </div>
                        <div>
                          <Label className="text-xs">Price Range</Label>
                          <Input value={editData.priceRange} onChange={(e) => setEditData({ ...editData, priceRange: e.target.value })} />
                        </div>
                        <div>
                          <Label className="text-xs">Amazon Link</Label>
                          <Input value={editData.amazonLink} onChange={(e) => setEditData({ ...editData, amazonLink: e.target.value })} />
                        </div>
                        <div>
                          <Label className="text-xs">Bajaao Link</Label>
                          <Input value={editData.bajaaoLink} onChange={(e) => setEditData({ ...editData, bajaaoLink: e.target.value })} />
                        </div>
                        <div>
                          <Label className="text-xs">Level</Label>
                          <Select value={editData.recommendation} onValueChange={(v) => setEditData({ ...editData, recommendation: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="budget">Budget</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="professional">Professional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Description</Label>
                        <Textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} rows={2} />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => updateMutation.mutate({ id: item.id, data: editData })} disabled={updateMutation.isPending}>
                          <Save className="w-3 h-3 mr-1" /> Save
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => { setEditingId(null); setEditData({}); }}>
                          <X className="w-3 h-3 mr-1" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 hover-elevate">
                      <div>
                        <p className="font-medium">{item.name} {item.model}</p>
                        <p className="text-sm text-muted-foreground">{item.category} • {item.recommendation} • {item.priceRange}</p>
                      </div>
                      <div className="flex gap-1">
                        {item.amazonLink && (
                          <Button variant="ghost" size="icon" asChild>
                            <a href={item.amazonLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => startEdit(item)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(item.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No recommendations yet. Add your first one above.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function MarketplaceManager() {
  const { toast } = useToast();
  const [subTab, setSubTab] = useState("pending");

  const { data: stats } = useQuery<any>({
    queryKey: ["/api/admin/marketplace/stats"],
    queryFn: async () => {
      const res = await adminApiRequest("GET", "/api/admin/marketplace/stats");
      return res.json();
    },
  });

  const { data: pendingListings, isLoading: pendingLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/marketplace/pending"],
    queryFn: async () => {
      const res = await adminApiRequest("GET", "/api/admin/marketplace/pending");
      return res.json();
    },
  });

  const { data: allListings, isLoading: allLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/marketplace/all"],
    queryFn: async () => {
      const res = await adminApiRequest("GET", "/api/admin/marketplace/all");
      return res.json();
    },
  });

  const { data: users, isLoading: usersLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const res = await adminApiRequest("GET", "/api/admin/users");
      return res.json();
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => adminApiRequest("PATCH", `/api/admin/marketplace/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/marketplace"] });
      toast({ title: "Approved", description: "Listing is now live" });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => adminApiRequest("PATCH", `/api/admin/marketplace/${id}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/marketplace"] });
      toast({ title: "Rejected", description: "Listing rejected" });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => adminApiRequest("DELETE", `/api/admin/marketplace/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/marketplace"] });
      toast({ title: "Removed", description: "Listing removed" });
    },
  });

  const banMutation = useMutation({
    mutationFn: ({ id, banned }: { id: string; banned: boolean }) =>
      adminApiRequest("PATCH", `/api/admin/users/${id}/ban`, { banned }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Updated", description: "User status updated" });
    },
  });

  const { data: zoomSlots } = useQuery<any[]>({
    queryKey: ["/api/admin/zoom-slots"],
    queryFn: async () => { const res = await adminApiRequest("GET", "/api/admin/zoom-slots"); return res.json(); },
  });

  const { data: zoomRequests } = useQuery<any[]>({
    queryKey: ["/api/admin/zoom-requests"],
    queryFn: async () => { const res = await adminApiRequest("GET", "/api/admin/zoom-requests"); return res.json(); },
  });

  const createSlotMutation = useMutation({
    mutationFn: (data: {date: string; timeSlot: string; zoomAccount: string}) =>
      adminApiRequest("POST", "/api/admin/zoom-slots", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/zoom-slots"] });
      toast({ title: "Slot Created" });
    },
  });

  const deleteSlotMutation = useMutation({
    mutationFn: (id: string) => adminApiRequest("DELETE", `/api/admin/zoom-slots/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/zoom-slots"] });
      toast({ title: "Slot Removed" });
    },
  });

  const approveZoomMutation = useMutation({
    mutationFn: ({ id, zoomLink }: { id: string; zoomLink: string }) =>
      adminApiRequest("PATCH", `/api/admin/zoom-requests/${id}/approve`, { zoomLink }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/zoom-requests"] });
      toast({ title: "Approved", description: "Zoom link sent to buyer and seller" });
    },
  });

  const cancelZoomMutation = useMutation({
    mutationFn: (id: string) => adminApiRequest("PATCH", `/api/admin/zoom-requests/${id}/cancel`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/zoom-requests"] });
      toast({ title: "Cancelled" });
    },
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = { pending: "bg-yellow-600", active: "bg-green-600", sold: "bg-gray-500", rejected: "bg-red-600", removed: "bg-red-800" };
    return <Badge className={`${colors[status] || "bg-gray-500"} text-xs`}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{stats.totalListings}</p><p className="text-xs text-muted-foreground">Total Listings</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-yellow-500">{stats.pendingListings}</p><p className="text-xs text-muted-foreground">Pending</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-green-500">{stats.activeListings}</p><p className="text-xs text-muted-foreground">Active</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-gray-400">{stats.soldListings}</p><p className="text-xs text-muted-foreground">Sold</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{stats.totalUsers}</p><p className="text-xs text-muted-foreground">Users</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-red-500">{stats.bannedUsers}</p><p className="text-xs text-muted-foreground">Banned</p></CardContent></Card>
        </div>
      )}

      {/* Sub-tabs */}
      <div className="flex gap-2 border-b pb-2">
        {["pending", "all", "users"].map((tab) => (
          <Button key={tab} variant={subTab === tab ? "default" : "ghost"} size="sm" onClick={() => setSubTab(tab)} className="capitalize">
            {tab === "pending" ? `Pending Review (${pendingListings?.length || 0})` : tab === "all" ? "All Listings" : "Users"}
          </Button>
        ))}
        <Button key="zoom" variant={subTab === "zoom" ? "default" : "ghost"} size="sm" onClick={() => setSubTab("zoom")}>
          Zoom Calls ({zoomRequests?.length || 0})
        </Button>
      </div>

      {/* Pending Review */}
      {subTab === "pending" && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Review</CardTitle>
            <CardDescription>Approve or reject user-submitted listings</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin" /></div>
            ) : !pendingListings?.length ? (
              <p className="text-muted-foreground text-center py-8">No pending listings</p>
            ) : (
              <div className="space-y-3">
                {pendingListings.map((listing: any) => (
                  <div key={listing.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{listing.title}</p>
                        <p className="text-sm text-muted-foreground">{listing.category} • {listing.condition} • {listing.city}</p>
                        <p className="text-lg font-bold text-green-500 mt-1">{formatPrice(listing.price)}</p>
                        {listing.description && <p className="text-sm mt-1 line-clamp-2">{listing.description}</p>}
                        <p className="text-xs text-muted-foreground mt-2">By: {listing.seller?.displayName || "Unknown"} ({listing.seller?.city})</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => approveMutation.mutate(listing.id)} disabled={approveMutation.isPending}>
                          <Check className="w-3 h-3 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => rejectMutation.mutate(listing.id)} disabled={rejectMutation.isPending}>
                          <X className="w-3 h-3 mr-1" /> Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* All Listings */}
      {subTab === "all" && (
        <Card>
          <CardHeader>
            <CardTitle>All Marketplace Listings</CardTitle>
          </CardHeader>
          <CardContent>
            {allLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin" /></div>
            ) : !allListings?.length ? (
              <p className="text-muted-foreground text-center py-8">No listings</p>
            ) : (
              <div className="space-y-2">
                {allListings.map((listing: any) => (
                  <div key={listing.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{listing.title} {statusBadge(listing.status)}</p>
                      <p className="text-sm text-muted-foreground">{listing.category} • {formatPrice(listing.price)} • {listing.city} • By: {listing.seller?.displayName || "Unknown"}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeMutation.mutate(listing.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Users */}
      {subTab === "users" && (
        <Card>
          <CardHeader>
            <CardTitle>Marketplace Users</CardTitle>
            <CardDescription>Manage registered marketplace users</CardDescription>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin" /></div>
            ) : !users?.length ? (
              <p className="text-muted-foreground text-center py-8">No registered users yet</p>
            ) : (
              <div className="space-y-2">
                {users.map((user: any) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">
                        {user.displayName || user.email}
                        {user.isBanned && <Badge className="bg-red-600 text-xs ml-2">Banned</Badge>}
                      </p>
                      <p className="text-sm text-muted-foreground">{user.email} • {user.phone} • {user.city}</p>
                    </div>
                    <Button
                      variant={user.isBanned ? "outline" : "destructive"}
                      size="sm"
                      onClick={() => banMutation.mutate({ id: user.id, banned: !user.isBanned })}
                    >
                      {user.isBanned ? "Unban" : "Ban"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Zoom */}
      {subTab === "zoom" && (
        <div className="space-y-6">
          {/* Pending Zoom Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Zoom Verification Requests</CardTitle>
              <CardDescription>Buyers requesting live gear inspection</CardDescription>
            </CardHeader>
            <CardContent>
              {!zoomRequests?.length ? (
                <p className="text-muted-foreground text-center py-4">No pending requests</p>
              ) : (
                <div className="space-y-3">
                  {zoomRequests.map((req: any) => (
                    <div key={req.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Listing: {req.listing?.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Buyer: {req.buyer?.displayName} ({req.buyer?.phone})
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Slot: {req.slot?.date} {req.slot?.timeSlot} ({req.slot?.zoomAccount})
                          </p>
                          {req.buyerNotes && <p className="text-sm mt-1">Notes: {req.buyerNotes}</p>}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => {
                            const link = prompt("Enter Zoom meeting link:");
                            if (link) approveZoomMutation.mutate({ id: req.id, zoomLink: link });
                          }}>Approve</Button>
                          <Button size="sm" variant="destructive" onClick={() => cancelZoomMutation.mutate(req.id)}>Cancel</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Manage Slots */}
          <Card>
            <CardHeader>
              <CardTitle>Available Zoom Slots</CardTitle>
              <CardDescription>Manage time slots for gear verification calls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 mb-4 flex-wrap">
                {/* Simple add slot form - inline */}
                <ZoomSlotForm onSubmit={(data) => createSlotMutation.mutate(data)} />
              </div>
              <div className="space-y-2">
                {zoomSlots?.map((slot: any) => (
                  <div key={slot.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{slot.date} - {slot.timeSlot}</p>
                      <p className="text-sm text-muted-foreground">{slot.zoomAccount} {!slot.isAvailable && "(Booked)"}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteSlotMutation.mutate(slot.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function ZoomSlotForm({ onSubmit }: { onSubmit: (data: { date: string; timeSlot: string; zoomAccount: string }) => void }) {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [account, setAccount] = useState("music@nathanielschool.com");

  return (
    <div className="flex gap-2 items-end flex-wrap">
      <div>
        <Label className="text-xs">Date</Label>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-40" />
      </div>
      <div>
        <Label className="text-xs">Time Slot</Label>
        <Input value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} placeholder="10:00 AM - 10:30 AM" className="w-52" />
      </div>
      <div>
        <Label className="text-xs">Zoom Account</Label>
        <Select value={account} onValueChange={setAccount}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="music@nathanielschool.com">music@nathanielschool.com</SelectItem>
            <SelectItem value="tech@nathanielschool.com">tech@nathanielschool.com</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button size="sm" onClick={() => { if (date && timeSlot) { onSubmit({ date, timeSlot, zoomAccount: account }); setDate(""); setTimeSlot(""); } }}>
        <Plus className="w-3 h-3 mr-1" /> Add Slot
      </Button>
    </div>
  );
}

function PartnersManager() {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Record<string, string>>({});
  const [newItem, setNewItem] = useState({
    name: "",
    type: "software",
    description: "",
    commission: "",
    dealLink: "",
    logoUrl: ""
  });

  const { data: partners, isLoading } = useQuery<AffiliatePartner[]>({
    queryKey: ["/api/partners"]
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof newItem) => adminApiRequest("POST", "/api/partners", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      toast({ title: "Success", description: "Partner added" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, string> }) =>
      adminApiRequest("PATCH", `/api/partners/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      toast({ title: "Updated", description: "Partner updated" });
      setEditingId(null);
      setEditData({});
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApiRequest("DELETE", `/api/partners/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      toast({ title: "Deleted", description: "Partner removed" });
    }
  });

  const startEdit = (item: AffiliatePartner) => {
    setEditingId(item.id);
    setEditData({
      name: item.name || "",
      type: item.type || "software",
      description: item.description || "",
      commission: item.commission || "",
      dealLink: item.dealLink || "",
      logoUrl: item.logoUrl || "",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Partner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} placeholder="Partner name" />
            </div>
            <div>
              <Label>Type</Label>
              <Select value={newItem.type} onValueChange={(v) => setNewItem({ ...newItem, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Commission/Deal</Label>
              <Input value={newItem.commission} onChange={(e) => setNewItem({ ...newItem, commission: e.target.value })} placeholder="25% Off" />
            </div>
            <div>
              <Label>Deal Link</Label>
              <Input value={newItem.dealLink} onChange={(e) => setNewItem({ ...newItem, dealLink: e.target.value })} placeholder="https://..." />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} rows={2} />
            </div>
          </div>
          <Button className="mt-4" onClick={() => createMutation.mutate(newItem)} disabled={createMutation.isPending}>
            <Plus className="w-4 h-4 mr-2" />
            Add Partner
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Partners</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : partners && partners.length > 0 ? (
            <div className="space-y-2">
              {partners.map((item) => (
                <div key={item.id} className="border rounded-md">
                  {editingId === item.id ? (
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Name</Label>
                          <Input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                        </div>
                        <div>
                          <Label className="text-xs">Type</Label>
                          <Select value={editData.type} onValueChange={(v) => setEditData({ ...editData, type: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="software">Software</SelectItem>
                              <SelectItem value="hardware">Hardware</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Commission/Deal</Label>
                          <Input value={editData.commission} onChange={(e) => setEditData({ ...editData, commission: e.target.value })} />
                        </div>
                        <div>
                          <Label className="text-xs">Deal Link</Label>
                          <Input value={editData.dealLink} onChange={(e) => setEditData({ ...editData, dealLink: e.target.value })} />
                        </div>
                        <div>
                          <Label className="text-xs">Logo URL</Label>
                          <Input value={editData.logoUrl} onChange={(e) => setEditData({ ...editData, logoUrl: e.target.value })} />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Description</Label>
                        <Textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} rows={2} />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => updateMutation.mutate({ id: item.id, data: editData })} disabled={updateMutation.isPending}>
                          <Save className="w-3 h-3 mr-1" /> Save
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => { setEditingId(null); setEditData({}); }}>
                          <X className="w-3 h-3 mr-1" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.type} • {item.commission}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => startEdit(item)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(item.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No partners yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function MessagesViewer() {
  const { data: messages, isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact"]
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
        <CardDescription>Messages from the contact form</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : messages && messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="p-4 border rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{msg.name}</p>
                    <p className="text-sm text-muted-foreground">{msg.email} • {msg.phone}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ""}
                  </p>
                </div>
                <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No messages yet.</p>
        )}
      </CardContent>
    </Card>
  );
}

function SiteLinksCard() {
  const { toast } = useToast();
  const pages = getAllPages();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const publicPages = pages.filter(p => !p.isAnchor && p.path !== "/admin" && p.path !== "/admin/dashboard");

  const copyUrl = async (page: { id: string; path: string }) => {
    const url = `${SITE_DOMAIN}${page.path}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedId(page.id);
      setTimeout(() => setCopiedId(null), 2000);
      toast({ title: "Copied!", description: url });
    } catch {
      toast({ title: "URL", description: url, duration: 10000 });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Site Links
        </CardTitle>
        <CardDescription>Copy-pastable links to all pages on your site</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {publicPages.map((page) => {
            const url = `${SITE_DOMAIN}${page.path}`;
            return (
              <div
                key={page.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card group"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{page.label}</p>
                  <p className="text-xs text-muted-foreground font-mono truncate">{url}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-3 shrink-0"
                  onClick={() => copyUrl(page)}
                >
                  {copiedId === page.id ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function PageVisibilityManager() {
  const { toast } = useToast();
  const pages = getAllPages();

  const { data: pageSettings, isLoading } = useQuery<{ pageId: string; visible: boolean }[]>({
    queryKey: ["/api/page-settings"]
  });

  const [localVisibility, setLocalVisibility] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (pageSettings) {
      const visMap = pageSettings.reduce((acc, s) => ({ ...acc, [s.pageId]: s.visible }), {} as Record<string, boolean>);
      setLocalVisibility(visMap);
    }
  }, [pageSettings]);

  const toggleMutation = useMutation({
    mutationFn: async ({ pageId, visible }: { pageId: string; visible: boolean }) => {
      const response = await adminApiRequest("PATCH", `/api/page-settings/${pageId}`, { visible });
      return response.json();
    },
    onSuccess: (_, variables) => {
      updatePageVisibility(variables.pageId, variables.visible);
      queryClient.invalidateQueries({ queryKey: ["/api/page-settings"] });
      toast({
        title: variables.visible ? "Page Shown" : "Page Hidden",
        description: `Page visibility updated`
      });
    }
  });

  const getVisibility = (pageId: string, defaultVisible: boolean) => {
    if (pageId in localVisibility) return localVisibility[pageId];
    return defaultVisible;
  };

  const handleToggle = (pageId: string, currentVisible: boolean) => {
    const newVisible = !currentVisible;
    setLocalVisibility(prev => ({ ...prev, [pageId]: newVisible }));
    toggleMutation.mutate({ pageId, visible: newVisible });
  };

  return (
    <div className="space-y-6">
      <SiteLinksCard />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Page Visibility
          </CardTitle>
          <CardDescription>Control which pages are visible on the website navigation</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {pages.filter(p => !p.isAnchor).map((page) => {
                const isVisible = getVisibility(page.id, page.visible);
                return (
                  <div
                    key={page.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    data-testid={`page-visibility-${page.id}`}
                  >
                    <div className="flex items-center gap-4">
                      {isVisible ? (
                        <Eye className="w-5 h-5 text-green-500" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium">{page.label}</p>
                        <p className="text-sm text-muted-foreground">{page.path}</p>
                      </div>
                    </div>
                    <Switch
                      checked={isVisible}
                      onCheckedChange={() => handleToggle(page.id, isVisible)}
                      disabled={toggleMutation.isPending}
                      data-testid={`switch-${page.id}`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ShareLinksManager() {
  const { toast } = useToast();
  const pages = getAllPages();
  const [newLink, setNewLink] = useState({ targetPage: "/obs-guide", label: "", code: "" });
  
  const { data: shareLinks, isLoading } = useQuery<ShareableLink[]>({
    queryKey: ["/api/share-links"]
  });
  
  const createMutation = useMutation({
    mutationFn: async (data: typeof newLink) => {
      const response = await adminApiRequest("POST", "/api/share-links", data);
      return response.json();
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/share-links"] });
      const url = `${SITE_DOMAIN}/s/${data.code}`;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(url);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = url;
          textArea.style.position = "fixed";
          textArea.style.left = "-9999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        }
        toast({ title: "Link Created & Copied", description: url });
      } catch {
        toast({ title: "Link Created", description: url, duration: 10000 });
      }
      setNewLink({ targetPage: "/obs-guide", label: "", code: "" });
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApiRequest("DELETE", `/api/share-links/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/share-links"] });
      toast({ title: "Deleted", description: "Share link removed" });
    }
  });
  
  const copyToClipboard = async (code: string) => {
    const url = `${SITE_DOMAIN}/s/${code}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      toast({ title: "Copied!", description: url });
    } catch (err) {
      toast({ title: "Link URL", description: url, duration: 10000 });
    }
  };
  
  const getFullUrl = (code: string) => `${SITE_DOMAIN}/s/${code}`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Shareable Link
          </CardTitle>
          <CardDescription>Generate easy-to-share links to specific pages for your students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Target Page</Label>
              <Select value={newLink.targetPage} onValueChange={(v) => setNewLink({ ...newLink, targetPage: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {pages.filter(p => !p.isAnchor && p.path !== "/").map(page => (
                    <SelectItem key={page.id} value={page.path}>{page.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Label (optional)</Label>
              <Input 
                value={newLink.label} 
                onChange={(e) => setNewLink({ ...newLink, label: e.target.value })} 
                placeholder="e.g. For Piano Class" 
              />
            </div>
            <div>
              <Label>Custom Code (optional)</Label>
              <Input 
                value={newLink.code} 
                onChange={(e) => setNewLink({ ...newLink, code: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })} 
                placeholder="e.g. piano-setup" 
              />
            </div>
          </div>
          <Button 
            className="mt-4" 
            onClick={() => createMutation.mutate(newLink)}
            disabled={createMutation.isPending}
          >
            <Link className="w-4 h-4 mr-2" />
            Create Link
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Share Links</CardTitle>
          <CardDescription>Links you can share with students</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : shareLinks?.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No share links created yet</p>
          ) : (
            <div className="space-y-3">
              {shareLinks?.map((link) => (
                <div 
                  key={link.id} 
                  className="flex items-center justify-between p-4 rounded-lg border bg-card"
                  data-testid={`share-link-${link.id}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-primary" />
                      <p className="font-medium">{link.label || link.targetPage}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getFullUrl(link.code)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Target: {link.targetPage} | Clicks: {link.accessCount || 0}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyToClipboard(link.code)}
                      data-testid={`copy-link-${link.id}`}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => deleteMutation.mutate(link.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`delete-link-${link.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsManager() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    phone_langford: "",
    phone_sahakar: "",
    email: "",
    whatsapp: ""
  });

  const { data: config } = useQuery<{ key: string; value: string }[]>({
    queryKey: ["/api/config"]
  });

  useEffect(() => {
    if (config) {
      const configMap = config.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {} as Record<string, string>);
      setSettings({
        phone_langford: configMap.phone_langford || "",
        phone_sahakar: configMap.phone_sahakar || "",
        email: configMap.email || "",
        whatsapp: configMap.whatsapp || ""
      });
    }
  }, [config]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      await Promise.all([
        adminApiRequest("PUT", "/api/config/phone_langford", { value: settings.phone_langford }),
        adminApiRequest("PUT", "/api/config/phone_sahakar", { value: settings.phone_sahakar }),
        adminApiRequest("PUT", "/api/config/email", { value: settings.email }),
        adminApiRequest("PUT", "/api/config/whatsapp", { value: settings.whatsapp })
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/config"] });
      toast({ title: "Saved", description: "Settings updated successfully" });
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
        <CardDescription>Contact information displayed on the website</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Phone (Langford Town)</Label>
            <Input value={settings.phone_langford} onChange={(e) => setSettings({ ...settings, phone_langford: e.target.value })} />
          </div>
          <div>
            <Label>Phone (Sahakar Nagar)</Label>
            <Input value={settings.phone_sahakar} onChange={(e) => setSettings({ ...settings, phone_sahakar: e.target.value })} />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
          </div>
          <div>
            <Label>WhatsApp Link</Label>
            <Input value={settings.whatsapp} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} placeholder="https://wa.me/..." />
          </div>
        </div>
        <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
}
