
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  onImageUploaded?: () => void;
}

const ImageUpload = ({ onImageUploaded }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    alt_text: '',
    collection: '',
    display_order: 0
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      // Upload file to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `portfolio/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      // Save metadata to database
      const { error: dbError } = await supabase
        .from('portfolio_images')
        .insert({
          title: formData.title,
          description: formData.description,
          image_url: publicUrl,
          alt_text: formData.alt_text,
          collection: formData.collection,
          display_order: formData.display_order
        });

      if (dbError) throw dbError;

      toast({
        title: "Success!",
        description: "Image uploaded successfully"
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        alt_text: '',
        collection: '',
        display_order: 0
      });
      setSelectedFile(null);
      
      if (onImageUploaded) {
        onImageUploaded();
      }

    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 border border-border rounded-lg">
      <h3 className="text-xl font-light tracking-wider">Upload New Image</h3>
      
      <div className="space-y-4">
        <Input
          placeholder="IMAGE TITLE"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="bg-transparent border-muted-foreground/30"
        />
        
        <Textarea
          placeholder="DESCRIPTION"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="bg-transparent border-muted-foreground/30 resize-none"
        />
        
        <Input
          placeholder="ALT TEXT"
          value={formData.alt_text}
          onChange={(e) => setFormData(prev => ({ ...prev, alt_text: e.target.value }))}
          className="bg-transparent border-muted-foreground/30"
        />
        
        <Input
          placeholder="COLLECTION NAME"
          value={formData.collection}
          onChange={(e) => setFormData(prev => ({ ...prev, collection: e.target.value }))}
          className="bg-transparent border-muted-foreground/30"
        />
        
        <Input
          type="number"
          placeholder="DISPLAY ORDER"
          value={formData.display_order}
          onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
          className="bg-transparent border-muted-foreground/30"
        />
        
        <div className="space-y-2">
          <label htmlFor="file-upload" className="block text-sm tracking-widest text-muted-foreground">
            SELECT IMAGE FILE
          </label>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="bg-transparent border-muted-foreground/30"
          />
        </div>
        
        {selectedFile && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Selected: {selectedFile.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedFile(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
        
        <Button
          onClick={uploadImage}
          disabled={uploading || !selectedFile || !formData.title}
          className="w-full bg-foreground text-background hover:bg-foreground/90 tracking-wider"
        >
          {uploading ? "UPLOADING..." : "UPLOAD IMAGE"}
          <Upload className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
