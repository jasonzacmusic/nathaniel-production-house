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
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  Music, LogOut, Plus, Trash2, Save, Piano, Guitar, Package, 
  Users, MessageSquare, Settings, ExternalLink, Edit
} from "lucide-react";
import type { InstrumentRecommendation, GearListing, AffiliatePartner, ContactMessage } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("instruments");
  
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin");
    }
  }, [setLocation]);

  const handleLogout = () => {
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
          <TabsList className="grid w-full grid-cols-5 mb-8">
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
    mutationFn: (data: typeof newItem) => apiRequest("POST", "/api/instruments/recommendations", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/instruments/recommendations"] });
      toast({ title: "Success", description: "Instrument added successfully" });
      setNewItem({ category: "piano", name: "", model: "", priceRange: "", amazonLink: "", bajaaoLink: "", description: "", features: "", recommendation: "budget", displayOrder: 0 });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/instruments/recommendations/${id}`),
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
    mutationFn: (data: typeof newItem) => apiRequest("POST", "/api/gear", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gear"] });
      toast({ title: "Success", description: "Gear listing added" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/gear/${id}`),
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
    mutationFn: (data: typeof newItem) => apiRequest("POST", "/api/partners", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      toast({ title: "Success", description: "Partner added" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/partners/${id}`),
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
        apiRequest("PUT", "/api/config/phone_langford", { value: settings.phone_langford }),
        apiRequest("PUT", "/api/config/phone_sahakar", { value: settings.phone_sahakar }),
        apiRequest("PUT", "/api/config/email", { value: settings.email }),
        apiRequest("PUT", "/api/config/whatsapp", { value: settings.whatsapp })
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
