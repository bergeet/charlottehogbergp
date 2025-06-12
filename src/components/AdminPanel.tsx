
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "./ImageUpload";
import { Trash2, Eye, EyeOff } from "lucide-react";

interface PortfolioImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  alt_text: string;
  collection: string;
  display_order: number;
  created_at: string;
}

const AdminPanel = () => {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const { toast } = useToast();

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading images",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id: string, imageUrl: string) => {
    try {
      // Delete from database
      const { error: dbError } = await supabase
        .from('portfolio_images')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      // Delete from storage
      const filePath = imageUrl.split('/').pop();
      if (filePath) {
        await supabase.storage
          .from('portfolio-images')
          .remove([`portfolio/${filePath}`]);
      }

      toast({
        title: "Success!",
        description: "Image deleted successfully"
      });

      fetchImages();
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg tracking-wider">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-light tracking-wider mb-4">
            ADMIN PANEL
          </h1>
          <div className="w-24 h-px bg-foreground mx-auto mb-8"></div>
          <Button
            onClick={() => setShowUpload(!showUpload)}
            className="bg-foreground text-background hover:bg-foreground/90 tracking-wider"
          >
            {showUpload ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showUpload ? "HIDE UPLOAD" : "SHOW UPLOAD"}
          </Button>
        </div>

        {showUpload && (
          <div className="mb-16">
            <ImageUpload onImageUploaded={fetchImages} />
          </div>
        )}

        <div className="space-y-8">
          <h2 className="text-2xl font-light tracking-wider">PORTFOLIO IMAGES ({images.length})</h2>
          
          {images.length === 0 ? (
            <p className="text-center text-muted-foreground">No images uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image.id} className="border border-border rounded-lg overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.alt_text}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium tracking-wider">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-muted-foreground">{image.description}</p>
                    )}
                    {image.collection && (
                      <p className="text-xs text-muted-foreground">Collection: {image.collection}</p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Order: {image.display_order}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteImage(image.id, image.image_url)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
