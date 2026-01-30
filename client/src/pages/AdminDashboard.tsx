import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Eye, EyeOff, Link, Copy, Share2, FileText
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type { InstrumentRecommendation, GearListing, AffiliatePartner, ContactMessage, ShareableLink } from "@shared/schema";
import { getAllPages, updatePageVisibility } from "@/config/siteConfig";

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
  const [editingItem, setEditingItem] = useState<InstrumentRecommendation | null>(null);
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

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApiRequest("DELETE", `/api/instruments/recommendations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/instruments/recommendations"] });
      toast({ title: "Deleted", description: "Instrument removed" });
    }
  });

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
          <CardDescription>Click to edit or delete instrument recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : instruments && instruments.length > 0 ? (
            <div className="space-y-2">
              {instruments.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-md hover-elevate">
                  <div>
                    <p className="font-medium">{item.name} {item.model}</p>
                    <p className="text-sm text-muted-foreground">{item.category} • {item.recommendation} • {item.priceRange}</p>
                  </div>
                  <div className="flex gap-2">
                    {item.amazonLink && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={item.amazonLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(item.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
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
  const [newItem, setNewItem] = useState({
    name: "",
    category: "keyboards",
    description: "",
    price: 0,
    originalPrice: 0,
    imageUrl: "",
    amazonLink: "",
    bajaaoLink: "",
    soundGlitzLink: "",
    isSold: false
  });

  const { data: listings, isLoading } = useQuery<GearListing[]>({
    queryKey: ["/api/gear"]
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof newItem) => adminApiRequest("POST", "/api/gear", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gear"] });
      toast({ title: "Success", description: "Gear listing added" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApiRequest("DELETE", `/api/gear/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gear"] });
      toast({ title: "Deleted", description: "Listing removed" });
    }
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Gear Listing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label>Name</Label>
              <Input value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} placeholder="Item name" />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={newItem.category} onValueChange={(v) => setNewItem({ ...newItem, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="keyboards">Keyboards</SelectItem>
                  <SelectItem value="guitars">Guitars</SelectItem>
                  <SelectItem value="drums">Drums</SelectItem>
                  <SelectItem value="pro_audio">Pro Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price (₹)</Label>
              <Input type="number" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value) || 0 })} />
            </div>
            <div>
              <Label>Original Price (₹)</Label>
              <Input type="number" value={newItem.originalPrice} onChange={(e) => setNewItem({ ...newItem, originalPrice: parseInt(e.target.value) || 0 })} />
            </div>
            <div>
              <Label>Amazon Link</Label>
              <Input value={newItem.amazonLink} onChange={(e) => setNewItem({ ...newItem, amazonLink: e.target.value })} placeholder="https://amazon.in/..." />
            </div>
            <div>
              <Label>Bajaao Link</Label>
              <Input value={newItem.bajaaoLink} onChange={(e) => setNewItem({ ...newItem, bajaaoLink: e.target.value })} placeholder="https://bajaao.com/..." />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} rows={2} />
            </div>
          </div>
          <Button className="mt-4" onClick={() => createMutation.mutate(newItem)} disabled={createMutation.isPending}>
            <Plus className="w-4 h-4 mr-2" />
            Add Listing
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Listings</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : listings && listings.length > 0 ? (
            <div className="space-y-2">
              {listings.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.category} • ₹{item.price?.toLocaleString()}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(item.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No listings yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function PartnersManager() {
  const { toast } = useToast();
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

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApiRequest("DELETE", `/api/partners/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      toast({ title: "Deleted", description: "Partner removed" });
    }
  });

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
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.type} • {item.commission}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(item.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/share-links"] });
      toast({ title: "Link Created", description: "Share link created successfully" });
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
  
  const copyToClipboard = (code: string) => {
    const url = `${window.location.origin}/s/${code}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Copied!", description: "Link copied to clipboard" });
  };
  
  const getFullUrl = (code: string) => `${window.location.origin}/s/${code}`;
  
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
